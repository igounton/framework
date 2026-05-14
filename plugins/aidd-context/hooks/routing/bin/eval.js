#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { scoreDoc } = require('../lib/bm25');
const { dataDir } = require('../lib/paths');

const DATA_DIR = dataDir();

const F1_GLOBAL_MIN = 0.70;
const F1_PER_SKILL_MIN = 0.55;
const COLLISION_MAX = 0.60;

function loadJson(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

function predictLOO(scenario, allScenarios, idf, avgdl) {
  const others = allScenarios.filter(s =>
    s.polarity === 'pos' && !(s.skill === scenario.skill && s.prompt === scenario.prompt));
  const bySkill = new Map();
  for (const doc of others) {
    const score = scoreDoc(scenario.tokens, doc, idf, avgdl);
    const cur = bySkill.get(doc.skill) || 0;
    if (score > cur) bySkill.set(doc.skill, score);
  }
  return bySkill;
}

function evalAll(index, thresholds) {
  const { idf, avgdl, scenarios } = index;
  const perSkill = {};
  for (const skillId of Object.keys(thresholds)) {
    perSkill[skillId] = { TP: 0, FP: 0, FN: 0, TN: 0, n_pos: 0, n_neg: 0 };
  }

  for (const s of scenarios) {
    const scores = predictLOO(s, scenarios, idf, avgdl);
    const matched = new Set();
    for (const [skill, score] of scores) {
      const t = thresholds[skill];
      if (!t || t.status === 'excluded' || t.tau == null) continue;
      if (score >= t.tau) matched.add(skill);
    }

    if (s.polarity === 'pos') {
      const expected = s.skill;
      perSkill[expected].n_pos++;
      if (matched.has(expected)) perSkill[expected].TP++;
      else perSkill[expected].FN++;
      for (const m of matched) {
        if (m !== expected) perSkill[m].FP++;
      }
    } else {
      const owner = s.skill;
      perSkill[owner].n_neg++;
      if (matched.has(owner)) perSkill[owner].FP++;
      else perSkill[owner].TN++;
    }
  }

  const results = {};
  let globalTP = 0, globalFP = 0, globalFN = 0;
  for (const [skill, m] of Object.entries(perSkill)) {
    const t = thresholds[skill];
    if (t.status === 'excluded') {
      results[skill] = { status: 'excluded', n_pos: m.n_pos, n_neg: m.n_neg };
      continue;
    }
    const precision = m.TP + m.FP === 0 ? 0 : m.TP / (m.TP + m.FP);
    const recall = m.TP + m.FN === 0 ? 0 : m.TP / (m.TP + m.FN);
    const f1 = precision + recall === 0 ? 0 : 2 * precision * recall / (precision + recall);
    results[skill] = {
      precision: round(precision), recall: round(recall), f1: round(f1),
      TP: m.TP, FP: m.FP, FN: m.FN, TN: m.TN,
      tau: round(t.tau),
      n_pos: m.n_pos, n_neg: m.n_neg,
    };
    globalTP += m.TP; globalFP += m.FP; globalFN += m.FN;
  }
  const gp = globalTP + globalFP === 0 ? 0 : globalTP / (globalTP + globalFP);
  const gr = globalTP + globalFN === 0 ? 0 : globalTP / (globalTP + globalFN);
  const gf1 = gp + gr === 0 ? 0 : 2 * gp * gr / (gp + gr);

  return { perSkill: results, global: { precision: round(gp), recall: round(gr), f1: round(gf1) } };
}

function collisionMatrix(index, thresholds) {
  const { idf, avgdl, scenarios } = index;
  const skills = Object.keys(thresholds).filter(s => thresholds[s].status !== 'excluded');
  const matrix = {};
  for (const expected of skills) {
    matrix[expected] = {};
    const ownPos = scenarios.filter(s => s.skill === expected && s.polarity === 'pos');
    for (const target of skills) {
      const targetPos = scenarios.filter(s => s.skill === target && s.polarity === 'pos');
      let sum = 0, count = 0;
      for (const q of ownPos) {
        let best = 0;
        for (const doc of targetPos) {
          if (q === doc) continue;
          const s = scoreDoc(q.tokens, doc, idf, avgdl);
          if (s > best) best = s;
        }
        const tau = thresholds[target].tau;
        sum += best >= tau ? 1 : 0;
        count++;
      }
      matrix[expected][target] = count ? round(sum / count) : 0;
    }
  }
  return matrix;
}

function round(x, d = 3) { return Math.round(x * 10 ** d) / 10 ** d; }

function printTable(perSkill, global) {
  console.log('\nPer-skill (LOO):');
  console.log('skill                                  P      R      F1     TP  FP  FN  TN  τ');
  for (const [skill, r] of Object.entries(perSkill)) {
    if (r.status === 'excluded') {
      console.log(`${skill.padEnd(38)} excluded (n_pos=${r.n_pos}, n_neg=${r.n_neg})`);
      continue;
    }
    console.log(`${skill.padEnd(38)} ${pad(r.precision)} ${pad(r.recall)} ${pad(r.f1)} ${pad2(r.TP)} ${pad2(r.FP)} ${pad2(r.FN)} ${pad2(r.TN)}  ${r.tau}`);
  }
  console.log(`\nGlobal: P=${global.precision}  R=${global.recall}  F1=${global.f1}`);
}

function pad(x) { return x.toFixed(3).padEnd(6); }
function pad2(x) { return String(x).padStart(2); }

function printCollision(matrix) {
  const skills = Object.keys(matrix);
  if (skills.length === 0) return;
  console.log('\nCollision matrix (rows=query skill, cols=target skill — fraction matched above τ):');
  const header = '                                      ' + skills.map(s => s.split(':').pop().padStart(8)).join(' ');
  console.log(header);
  for (const r of skills) {
    const row = r.padEnd(38) + skills.map(c => round(matrix[r][c]).toFixed(2).padStart(8)).join(' ');
    console.log(row);
  }
}

function checkGate(results, matrix) {
  const failures = [];
  if (results.global.f1 < F1_GLOBAL_MIN) {
    failures.push(`global F1 ${results.global.f1} < ${F1_GLOBAL_MIN}`);
  }
  for (const [skill, r] of Object.entries(results.perSkill)) {
    if (r.status === 'excluded') continue;
    if (r.f1 < F1_PER_SKILL_MIN) {
      failures.push(`${skill} F1 ${r.f1} < ${F1_PER_SKILL_MIN}`);
    }
  }
  for (const [row, cols] of Object.entries(matrix)) {
    for (const [col, v] of Object.entries(cols)) {
      if (row !== col && v > COLLISION_MAX) {
        failures.push(`collision ${row} → ${col}: ${v} > ${COLLISION_MAX}`);
      }
    }
  }
  return failures;
}

function main() {
  const index = loadJson(path.join(DATA_DIR, 'index.json'));
  const thresholds = loadJson(path.join(DATA_DIR, 'thresholds.json'));
  const results = evalAll(index, thresholds);
  const matrix = collisionMatrix(index, thresholds);
  printTable(results.perSkill, results.global);
  printCollision(matrix);
  const failures = checkGate(results, matrix);
  fs.writeFileSync(path.join(DATA_DIR, 'metrics.json'),
    JSON.stringify({ results, collision: matrix, gate: { passed: failures.length === 0, failures } }, null, 2));
  if (failures.length) {
    console.log('\nGATE FAILED:');
    failures.forEach(f => console.log(`  - ${f}`));
    process.exit(1);
  }
  console.log('\nGate PASSED ✓');
}

main();
