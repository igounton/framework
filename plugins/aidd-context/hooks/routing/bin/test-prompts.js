#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { tokenize } = require('../lib/tokenize');
const { scoreDoc } = require('../lib/bm25');
const { dataDir } = require('../lib/paths');

const DATA_DIR = dataDir();
const TESTS_FILE = path.resolve(__dirname, '..', 'tests', 'held-out-prompts.json');
const MAX_HINTS = 3;

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function predict(prompt, index, thresholds) {
  if (!prompt || prompt.trim().startsWith('/')) return [];
  const { tokens, negated } = tokenize(prompt);
  if (tokens.length === 0 || negated) return [];
  const bySkill = new Map();
  for (const doc of index.scenarios) {
    if (doc.polarity !== 'pos') continue;
    const raw = scoreDoc(tokens, doc, index.idf, index.avgdl);
    const cur = bySkill.get(doc.skill) || 0;
    if (raw > cur) bySkill.set(doc.skill, raw);
  }
  const out = [];
  for (const [skill, score] of bySkill) {
    const t = thresholds[skill];
    if (!t || t.status === 'excluded' || t.tau == null) continue;
    if (score >= t.tau) out.push({ skill, score });
  }
  out.sort((a, b) => b.score - a.score);
  return out.slice(0, MAX_HINTS);
}

function evaluateCase(testCase, predictions) {
  const matchedSkills = predictions.map(p => p.skill);
  const top1 = matchedSkills[0] || null;
  const accepted = [testCase.expect, ...(testCase.also_accept || [])].filter(Boolean);

  if (testCase.expect === null) {
    return matchedSkills.length === 0 ? 'pass' : 'fail-fp';
  }
  if (top1 === testCase.expect) return 'pass';
  if (accepted.includes(top1)) return 'pass-alt';
  if (matchedSkills.includes(testCase.expect)) return 'pass-rank';
  if (matchedSkills.length === 0) return 'fail-miss';
  return 'fail-wrong';
}

function main() {
  const index = loadJson(path.join(DATA_DIR, 'index.json'));
  const thresholds = loadJson(path.join(DATA_DIR, 'thresholds.json'));
  const cases = loadJson(TESTS_FILE);

  console.log(`\nHeld-out tests (${cases.length} prompts) against build ${index.build_hash.slice(0, 8)}\n`);
  console.log('result        category               prompt → top match (score)');
  console.log('-'.repeat(90));

  const stats = { pass: 0, 'pass-alt': 0, 'pass-rank': 0, 'fail-fp': 0, 'fail-miss': 0, 'fail-wrong': 0 };
  const byCategory = {};

  for (const c of cases) {
    const preds = predict(c.prompt, index, thresholds);
    const verdict = evaluateCase(c, preds);
    stats[verdict] = (stats[verdict] || 0) + 1;
    byCategory[c.category] = byCategory[c.category] || { pass: 0, fail: 0 };
    byCategory[c.category][verdict.startsWith('pass') ? 'pass' : 'fail']++;

    const top = preds[0]
      ? `${preds[0].skill} (${preds[0].score.toFixed(2)})`
      : '∅';
    const expect = c.expect || '∅';
    const symbol = verdict.startsWith('pass') ? '✓' : '✗';
    const promptShort = (c.prompt || '<empty>').slice(0, 28).padEnd(28);
    console.log(`${symbol} ${verdict.padEnd(11)} ${c.category.padEnd(22)} "${promptShort}" → ${top}  [expect ${expect}]`);
  }

  console.log('\nStats:');
  console.log(`  pass        ${stats.pass}`);
  console.log(`  pass-alt    ${stats['pass-alt']}      (compound match)`);
  console.log(`  pass-rank   ${stats['pass-rank']}      (expected in matches but not top-1)`);
  console.log(`  fail-fp     ${stats['fail-fp']}      (matched when should be ∅)`);
  console.log(`  fail-miss   ${stats['fail-miss']}      (∅ when should match)`);
  console.log(`  fail-wrong  ${stats['fail-wrong']}      (wrong skill at top-1)`);

  const total = cases.length;
  const passed = stats.pass + stats['pass-alt'] + stats['pass-rank'];
  console.log(`\nOverall: ${passed}/${total} (${(passed / total * 100).toFixed(1)}%)`);

  console.log('\nBy category:');
  for (const [cat, s] of Object.entries(byCategory)) {
    console.log(`  ${cat.padEnd(24)} ${s.pass}/${s.pass + s.fail}`);
  }
}

main();
