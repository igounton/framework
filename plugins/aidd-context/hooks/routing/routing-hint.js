#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { tokenize } = require('./lib/tokenize');
const { scoreDoc } = require('./lib/bm25');
const { dataDir, INSTALLED_PLUGINS } = require('./lib/paths');

const DATA_DIR = dataDir();
const BUILD_SCRIPT = path.join(__dirname, 'bin', 'build-index.js');
const MAX_HINTS = 3;

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (c) => { data += c; });
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', () => resolve(''));
  });
}

function passthrough() { process.exit(0); }

function spawnDetachedRebuild() {
  try {
    const child = spawn(process.execPath, [BUILD_SCRIPT], {
      detached: true,
      stdio: 'ignore',
    });
    child.unref();
  } catch { /* fail silent */ }
}

function maybeAsyncRebuild() {
  try {
    if (!fs.existsSync(INSTALLED_PLUGINS)) return;
    const manifestPath = path.join(DATA_DIR, 'manifest.json');
    if (!fs.existsSync(manifestPath)) return spawnDetachedRebuild();
    const m = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const installedMtime = fs.statSync(INSTALLED_PLUGINS).mtimeMs;
    const builtAt = new Date(m.built_at).getTime();
    if (Number.isFinite(builtAt) && installedMtime > builtAt) spawnDetachedRebuild();
  } catch { /* fail silent */ }
}

function loadIndex() {
  try {
    const index = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'index.json'), 'utf8'));
    const thresholds = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'thresholds.json'), 'utf8'));
    return { index, thresholds };
  } catch {
    return null;
  }
}

function scoreSkills(tokens, index) {
  const bySkill = new Map();
  for (const doc of index.scenarios) {
    if (doc.polarity !== 'pos') continue;
    const raw = scoreDoc(tokens, doc, index.idf, index.avgdl);
    const cur = bySkill.get(doc.skill) || 0;
    if (raw > cur) bySkill.set(doc.skill, raw);
  }
  const out = [];
  for (const [skill, score] of bySkill) out.push({ skill, score });
  out.sort((a, b) => b.score - a.score);
  return out;
}

async function main() {
  let payload = {};
  try { payload = JSON.parse(await readStdin()); } catch { return passthrough(); }
  const prompt = payload.prompt;
  if (!prompt || typeof prompt !== 'string') return passthrough();
  if (prompt.trim().startsWith('/')) return passthrough();

  maybeAsyncRebuild();
  const loaded = loadIndex();
  if (!loaded) return passthrough();
  const { index, thresholds } = loaded;

  const { tokens, negated } = tokenize(prompt);
  if (tokens.length === 0 || negated) return passthrough();

  const scored = scoreSkills(tokens, index);
  const filtered = scored.filter(s => {
    const t = thresholds[s.skill];
    return t && t.status !== 'excluded' && t.tau != null && s.score >= t.tau;
  });

  if (filtered.length === 0) return passthrough();

  const top = filtered.slice(0, MAX_HINTS);
  const sum = top.reduce((a, b) => a + b.score, 0);
  const matches = top.map(m => ({
    skill: m.skill,
    score: m.score,
    confidence: sum > 0 ? m.score / sum : 0,
  }));

  const lines = matches
    .map(m => `- ${m.skill} (${Math.round(m.confidence * 100)}% confidence, score ${m.score.toFixed(2)})`)
    .join('\n');
  const note = matches.length > 1
    ? '\nMultiple candidates ranked by relative confidence. Pick the one matching user intent.'
    : '';
  const text = `Routing hint (BM25, deterministic, build ${index.build_hash.slice(0, 8)}):\n${lines}${note}`;

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext: text,
    },
  }));
  process.exit(0);
}

main().catch(() => passthrough());
