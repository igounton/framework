#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { tokenize } = require('../lib/tokenize');
const { buildIndex, scoreDoc } = require('../lib/bm25');
const { INSTALLED_PLUGINS, KNOWN_MARKETPLACES, dataDir } = require('../lib/paths');

const MIN_POS = 8;
const MIN_NEG = 2;

function parseArgs() {
  const a = process.argv.slice(2);
  const opts = { plugins: null, out: null, dryRun: false };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--plugins') opts.plugins = a[++i].split(',');
    else if (a[i] === '--out') opts.out = a[++i];
    else if (a[i] === '--dry-run') opts.dryRun = true;
  }
  return opts;
}

function tryReadJson(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return null; }
}

function resolvePluginDir(pluginName, marketplaceName, instances, markets) {
  const market = markets[marketplaceName];
  if (market?.source?.source === 'directory' && market.installLocation) {
    const marketDir = market.installLocation;
    const mp = tryReadJson(path.join(marketDir, '.claude-plugin', 'marketplace.json'));
    const entry = mp?.plugins?.find(p => p.name === pluginName);
    if (entry?.source) {
      const dir = path.resolve(marketDir, entry.source);
      if (fs.existsSync(dir)) return { dir, mode: 'directory-source' };
    }
  }
  if (instances?.[0]?.installPath && fs.existsSync(instances[0].installPath)) {
    return { dir: instances[0].installPath, mode: 'cache' };
  }
  return null;
}

function findScenarios(pluginFilter) {
  if (!fs.existsSync(INSTALLED_PLUGINS)) return [];
  const installed = tryReadJson(INSTALLED_PLUGINS);
  const markets = tryReadJson(KNOWN_MARKETPLACES) || {};
  if (!installed) return [];

  const out = [];
  for (const [pluginKey, instances] of Object.entries(installed.plugins || {})) {
    const [pluginName, marketplaceName] = pluginKey.split('@');
    if (pluginFilter && !pluginFilter.includes(pluginName)) continue;

    const resolved = resolvePluginDir(pluginName, marketplaceName, instances, markets);
    if (!resolved) continue;

    const skillsDir = path.join(resolved.dir, 'skills');
    if (!fs.existsSync(skillsDir)) continue;
    let skills;
    try { skills = fs.readdirSync(skillsDir); } catch { continue; }
    for (const skill of skills) {
      const evalsFile = path.join(skillsDir, skill, 'evals', 'scenarios.json');
      if (!fs.existsSync(evalsFile)) continue;
      const data = tryReadJson(evalsFile);
      if (!Array.isArray(data)) continue;
      const skillId = `${pluginName}:${skill}`;
      const mtime = fs.statSync(evalsFile).mtimeMs;
      for (const entry of data) {
        if (!entry || typeof entry.prompt !== 'string') continue;
        out.push({
          skill: skillId,
          prompt: entry.prompt,
          expect_action: entry.expect_action,
          polarity: entry.expect_action == null ? 'neg' : 'pos',
          _source: evalsFile,
          _mtime: mtime,
          _mode: resolved.mode,
        });
      }
    }
  }
  return out;
}

function tokenizeAll(scenarios) {
  for (const s of scenarios) {
    const tok = tokenize(s.prompt);
    s.tokens = tok.tokens;
    s.negated = tok.negated;
  }
  return scenarios;
}

function scorePositiveAgainstSkill(p, skillPositives, idf, avgdl, looSelf = false) {
  let best = 0;
  for (const doc of skillPositives) {
    if (looSelf && doc === p) continue;
    const s = scoreDoc(p.tokens, doc, idf, avgdl);
    if (s > best) best = s;
  }
  return best;
}

function f1AtThreshold(posScores, negScores, tau) {
  const TP = posScores.filter(s => s >= tau).length;
  const FN = posScores.length - TP;
  const FP = negScores.filter(s => s >= tau).length;
  const precision = TP + FP === 0 ? 0 : TP / (TP + FP);
  const recall = TP + FN === 0 ? 0 : TP / (TP + FN);
  const f1 = precision + recall === 0 ? 0 : 2 * precision * recall / (precision + recall);
  const beta2 = 4;
  const fbeta2 = beta2 * precision + recall === 0
    ? 0
    : (1 + beta2) * precision * recall / (beta2 * precision + recall);
  return { TP, FP, FN, precision, recall, f1, fbeta2 };
}

function calibrateThresholds(scenarios, index) {
  const skills = [...new Set(scenarios.map(s => s.skill))];
  const thresholds = {};
  for (const skillId of skills) {
    const skillScenarios = scenarios.filter(s => s.skill === skillId);
    const positives = skillScenarios.filter(s => s.polarity === 'pos');
    const negatives = skillScenarios.filter(s => s.polarity === 'neg');
    if (positives.length < MIN_POS || negatives.length < MIN_NEG) {
      thresholds[skillId] = {
        tau: null, f1: null,
        n_pos: positives.length, n_neg: negatives.length,
        status: 'excluded',
      };
      continue;
    }
    const posScores = positives.map(p =>
      scorePositiveAgainstSkill(p, positives, index.idf, index.avgdl, true));
    const negScores = negatives.map(n =>
      scorePositiveAgainstSkill(n, positives, index.idf, index.avgdl, false));

    const candidates = [...new Set([...posScores, ...negScores])]
      .filter(c => c > 0).sort((a, b) => a - b);
    if (candidates.length === 0) {
      thresholds[skillId] = {
        tau: null, f1: 0, recall: 0, precision: 0,
        n_pos: positives.length, n_neg: negatives.length, status: 'conflict',
      };
      continue;
    }
    let bestFbeta = -1, bestTau = 0, bestMetrics = null;
    for (let i = 0; i < candidates.length; i++) {
      const tau = i === 0 ? candidates[0] - 0.001 : (candidates[i - 1] + candidates[i]) / 2;
      if (tau <= 0) continue;
      const m = f1AtThreshold(posScores, negScores, tau);
      if (m.fbeta2 > bestFbeta) {
        bestFbeta = m.fbeta2; bestTau = tau; bestMetrics = m;
      }
    }
    thresholds[skillId] = {
      tau: bestTau,
      f1: bestMetrics.f1,
      fbeta2: bestMetrics.fbeta2,
      precision: bestMetrics.precision,
      recall: bestMetrics.recall,
      TP: bestMetrics.TP, FP: bestMetrics.FP, FN: bestMetrics.FN,
      n_pos: positives.length, n_neg: negatives.length,
      status: bestMetrics.f1 >= 0.60 ? 'ok' : 'conflict',
    };
  }
  return thresholds;
}

function buildHash(scenarios, index) {
  const h = crypto.createHash('sha256');
  const sorted = [...scenarios].sort((a, b) =>
    (a.skill + a.prompt).localeCompare(b.skill + b.prompt));
  for (const s of sorted) h.update(`${s.skill}|${s.prompt}|${s.expect_action}\n`);
  h.update(JSON.stringify({ K1: index.K1, B: index.B }));
  return h.digest('hex');
}

function cacheKey(scenarios) {
  const h = crypto.createHash('sha256');
  if (fs.existsSync(INSTALLED_PLUGINS)) h.update(fs.readFileSync(INSTALLED_PLUGINS));
  const sources = [...new Set(scenarios.map(s => s._source).filter(Boolean))].sort();
  for (const src of sources) {
    const stat = fs.statSync(src);
    h.update(`${src}|${stat.mtimeMs}\n`);
  }
  return h.digest('hex');
}

function main() {
  const opts = parseArgs();
  const outDir = opts.out ? path.resolve(opts.out) : dataDir();

  const scenarios = tokenizeAll(findScenarios(opts.plugins));
  if (scenarios.length === 0) {
    console.error(`[build-index] no scenarios found (out=${outDir})`);
    process.exit(1);
  }

  const ckey = cacheKey(scenarios);
  const manifestPath = path.join(outDir, 'manifest.json');
  const existing = tryReadJson(manifestPath);
  if (existing && existing.cache_key === ckey && !opts.dryRun) {
    try {
      const tmp = manifestPath + '.tmp.' + process.pid;
      fs.writeFileSync(tmp, JSON.stringify(
        { ...existing, built_at: new Date().toISOString() }, null, 2));
      fs.renameSync(tmp, manifestPath);
    } catch { /* ignore */ }
    console.log(`[build-index] cache hit (key=${ckey.slice(0, 12)}), skip rebuild`);
    return;
  }

  const index = buildIndex(scenarios);
  const thresholds = calibrateThresholds(scenarios, index);
  const hash = buildHash(scenarios, index);

  if (opts.dryRun) {
    console.log(`[build-index] dry-run scenarios=${scenarios.length} skills=${Object.keys(thresholds).length} cache_key=${ckey.slice(0, 12)}`);
    return;
  }

  fs.mkdirSync(outDir, { recursive: true });

  const writeAtomic = (file, content) => {
    const tmp = file + '.tmp.' + process.pid;
    fs.writeFileSync(tmp, content);
    fs.renameSync(tmp, file);
  };

  writeAtomic(path.join(outDir, 'index.json'), JSON.stringify({
    version: 1,
    build_hash: hash,
    params: { K1: index.K1, B: index.B },
    avgdl: index.avgdl,
    idf: index.idf,
    scenarios: scenarios.map(s => ({
      skill: s.skill, prompt: s.prompt,
      tokens: s.tokens, polarity: s.polarity,
    })),
  }, null, 2));

  writeAtomic(path.join(outDir, 'thresholds.json'),
    JSON.stringify(thresholds, null, 2));

  writeAtomic(path.join(outDir, 'manifest.json'), JSON.stringify({
    version: 1,
    build_hash: hash,
    cache_key: ckey,
    params: { K1: index.K1, B: index.B },
    plugins_filter: opts.plugins,
    scenarios_count: scenarios.length,
    positives: scenarios.filter(s => s.polarity === 'pos').length,
    negatives: scenarios.filter(s => s.polarity === 'neg').length,
    skills: Object.keys(thresholds).length,
    excluded_skills: Object.entries(thresholds)
      .filter(([, t]) => t.status === 'excluded').map(([k]) => k),
    conflict_skills: Object.entries(thresholds)
      .filter(([, t]) => t.status === 'conflict').map(([k]) => k),
    built_at: new Date().toISOString(),
  }, null, 2));

  console.log(`[build-index] built scenarios=${scenarios.length} skills=${Object.keys(thresholds).length} hash=${hash.slice(0, 12)}`);
  console.log(`[build-index] out=${outDir}`);
  const conflicts = Object.entries(thresholds).filter(([, t]) => t.status === 'conflict');
  if (conflicts.length) console.log(`[build-index] conflicts: ${conflicts.map(([k]) => k).join(', ')}`);
  const excluded = Object.entries(thresholds).filter(([, t]) => t.status === 'excluded');
  if (excluded.length) console.log(`[build-index] excluded: ${excluded.length} skills`);
}

main();
