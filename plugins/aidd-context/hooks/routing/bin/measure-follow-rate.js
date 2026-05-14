#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const PROJECTS_DIR = path.join(os.homedir(), '.claude', 'projects');

function parseArgs() {
  const a = process.argv.slice(2);
  const opts = { since: null, projectFilter: null, verbose: false };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--since') opts.since = new Date(a[++i]).getTime();
    else if (a[i] === '--project') opts.projectFilter = a[++i];
    else if (a[i] === '-v' || a[i] === '--verbose') opts.verbose = true;
  }
  return opts;
}

function listSessions(opts) {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const sessions = [];
  for (const projectDir of fs.readdirSync(PROJECTS_DIR)) {
    if (opts.projectFilter && !projectDir.includes(opts.projectFilter)) continue;
    const fullDir = path.join(PROJECTS_DIR, projectDir);
    if (!fs.statSync(fullDir).isDirectory()) continue;
    for (const file of fs.readdirSync(fullDir)) {
      if (!file.endsWith('.jsonl')) continue;
      const fullFile = path.join(fullDir, file);
      const stat = fs.statSync(fullFile);
      if (opts.since && stat.mtimeMs < opts.since) continue;
      sessions.push({ project: projectDir, file: fullFile, mtime: stat.mtimeMs });
    }
  }
  return sessions.sort((a, b) => b.mtime - a.mtime);
}

function readJsonl(file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const out = [];
  for (const line of lines) {
    if (!line.trim()) continue;
    try { out.push(JSON.parse(line)); } catch { /* skip malformed */ }
  }
  return out;
}

function extractText(message) {
  if (!message) return '';
  const c = message.message?.content;
  if (typeof c === 'string') return c;
  if (Array.isArray(c)) {
    return c.filter(p => p?.type === 'text' && typeof p.text === 'string')
      .map(p => p.text).join('\n');
  }
  return '';
}

function parseHintContent(content) {
  if (!Array.isArray(content)) return null;
  const text = content.find(s => typeof s === 'string' && /Routing hint/i.test(s));
  if (!text) return null;
  const skills = [];
  const re = /-\s+([\w\-:]+)\s+\((\d+)%\s+confidence/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    skills.push({ skill: m[1], confidence: parseInt(m[2], 10) });
  }
  if (skills.length === 0) {
    const reSimple = /-\s+([\w\-:]+)\s+\(score/g;
    while ((m = reSimple.exec(text)) !== null) skills.push({ skill: m[1], confidence: null });
  }
  return skills.length ? skills : null;
}

function findLaunchSkill(content) {
  if (typeof content === 'string') {
    const m = content.match(/Launching skill:\s*([\w\-:]+)/);
    return m ? m[1] : null;
  }
  if (Array.isArray(content)) {
    for (const part of content) {
      if (part?.type === 'text' && part.text) {
        const m = part.text.match(/Launching skill:\s*([\w\-:]+)/);
        if (m) return m[1];
      }
      if (part?.type === 'tool_result' && typeof part.content === 'string') {
        const m = part.content.match(/Launching skill:\s*([\w\-:]+)/);
        if (m) return m[1];
      }
      if (part?.type === 'tool_result' && Array.isArray(part.content)) {
        for (const sub of part.content) {
          if (typeof sub === 'string') {
            const m = sub.match(/Launching skill:\s*([\w\-:]+)/);
            if (m) return m[1];
          }
          if (sub?.type === 'text' && sub.text) {
            const m = sub.text.match(/Launching skill:\s*([\w\-:]+)/);
            if (m) return m[1];
          }
        }
      }
    }
  }
  return null;
}

function isCommandWrapper(content) {
  if (typeof content !== 'string') return false;
  return /^<(local-command-|command-name)/.test(content);
}

function analyzeSession(messages) {
  const turns = [];
  let pendingUserPrompt = null;
  let pendingHint = null;

  const flushPending = () => {
    if (pendingUserPrompt !== null) {
      turns.push({ prompt: pendingUserPrompt, hint: pendingHint, skill_invoked: null });
      pendingUserPrompt = null;
      pendingHint = null;
    }
  };

  for (const m of messages) {
    if (m.type === 'user' && m.message?.role === 'user') {
      const content = m.message.content;
      const launched = findLaunchSkill(content);
      if (launched) {
        flushPending();
        const last = turns[turns.length - 1];
        if (last && !last.skill_invoked) last.skill_invoked = launched;
        continue;
      }
      if (typeof content === 'string' && content && !isCommandWrapper(content)) {
        flushPending();
        pendingUserPrompt = content;
      }
    } else if (m.type === 'attachment' && m.attachment?.hookName === 'UserPromptSubmit') {
      const skills = parseHintContent(m.attachment.content);
      if (skills) pendingHint = skills;
    } else if (m.type === 'assistant') {
      flushPending();
      const lastTurn = turns[turns.length - 1];
      if (lastTurn) {
        const launched = findLaunchSkill(m.message?.content);
        if (launched && !lastTurn.skill_invoked) lastTurn.skill_invoked = launched;
      }
    }
  }
  flushPending();
  return turns;
}

function classifyTurn(t) {
  const hintTop1 = t.hint?.[0]?.skill || null;
  const hintAll = t.hint ? t.hint.map(s => s.skill) : [];
  if (!t.hint && !t.skill_invoked) return 'no-hint-no-skill';
  if (!t.hint && t.skill_invoked) return 'missed-by-router';
  if (t.hint && !t.skill_invoked) return 'hint-ignored';
  if (hintTop1 === t.skill_invoked) return 'follow-top1';
  if (hintAll.includes(t.skill_invoked)) return 'follow-in-topk';
  return 'wrong-route';
}

function round(x, d = 1) { return Math.round(x * 10 ** d) / 10 ** d; }

function main() {
  const opts = parseArgs();
  const sessions = listSessions(opts);
  if (sessions.length === 0) {
    console.error('No sessions found.');
    process.exit(1);
  }

  const overall = {
    'follow-top1': 0,
    'follow-in-topk': 0,
    'wrong-route': 0,
    'hint-ignored': 0,
    'missed-by-router': 0,
    'no-hint-no-skill': 0,
  };
  const bySkillInvoked = {};
  const examples = { 'wrong-route': [], 'hint-ignored': [], 'missed-by-router': [] };

  let totalSessions = 0;
  let totalTurns = 0;

  for (const s of sessions) {
    const messages = readJsonl(s.file);
    if (messages.length === 0) continue;
    totalSessions++;
    const turns = analyzeSession(messages);
    for (const t of turns) {
      totalTurns++;
      const verdict = classifyTurn(t);
      overall[verdict]++;

      const skill = t.skill_invoked || '(none)';
      if (!bySkillInvoked[skill]) {
        bySkillInvoked[skill] = { 'follow-top1': 0, 'follow-in-topk': 0, 'wrong-route': 0, 'missed-by-router': 0, total: 0 };
      }
      bySkillInvoked[skill][verdict] = (bySkillInvoked[skill][verdict] || 0) + 1;
      bySkillInvoked[skill].total++;

      if (examples[verdict] && examples[verdict].length < 5) {
        examples[verdict].push({
          prompt: (t.prompt || '').slice(0, 60),
          hint_top1: t.hint?.[0]?.skill || null,
          skill_invoked: t.skill_invoked,
          session: path.basename(s.file, '.jsonl').slice(0, 8),
        });
      }
    }
  }

  console.log(`\nSessions analyzed: ${totalSessions}`);
  console.log(`Total turns: ${totalTurns}\n`);

  const hinted = overall['follow-top1'] + overall['follow-in-topk'] + overall['wrong-route'] + overall['hint-ignored'];
  const followed = overall['follow-top1'] + overall['follow-in-topk'];
  const followRate = hinted ? round(followed / hinted * 100) : 0;
  const top1Rate = hinted ? round(overall['follow-top1'] / hinted * 100) : 0;

  console.log('=== Overall ===');
  console.log(`hint emitted        : ${hinted}`);
  console.log(`  follow top-1      : ${overall['follow-top1']}   (${hinted ? round(overall['follow-top1'] / hinted * 100) : 0}%)`);
  console.log(`  follow in top-K   : ${overall['follow-in-topk']}   (${hinted ? round(overall['follow-in-topk'] / hinted * 100) : 0}%)`);
  console.log(`  wrong route       : ${overall['wrong-route']}   (Claude invoked a skill NOT in hint)`);
  console.log(`  hint ignored      : ${overall['hint-ignored']}   (Claude invoked no skill despite hint)`);
  console.log(`no hint emitted     : ${overall['missed-by-router'] + overall['no-hint-no-skill']}`);
  console.log(`  missed by router  : ${overall['missed-by-router']}   (Claude invoked skill we did NOT hint)`);
  console.log(`  no-skill-needed   : ${overall['no-hint-no-skill']}`);

  console.log(`\nFollow rate (top-K) : ${followRate}%`);
  console.log(`Top-1 match rate    : ${top1Rate}%`);

  console.log('\n=== By skill invoked ===');
  const skills = Object.entries(bySkillInvoked)
    .filter(([k]) => k !== '(none)')
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 20);
  if (skills.length === 0) {
    console.log('(no skill invocations found)');
  } else {
    console.log('skill                              total  top1  topk  wrong  missed');
    for (const [skill, s] of skills) {
      console.log(`${skill.padEnd(34)} ${String(s.total).padStart(5)}  ${String(s['follow-top1'] || 0).padStart(4)}  ${String(s['follow-in-topk'] || 0).padStart(4)}  ${String(s['wrong-route'] || 0).padStart(5)}  ${String(s['missed-by-router'] || 0).padStart(6)}`);
    }
  }

  if (opts.verbose) {
    console.log('\n=== Sample wrong-routes ===');
    for (const ex of examples['wrong-route']) {
      console.log(`  [${ex.session}] "${ex.prompt}"`);
      console.log(`     hint top-1: ${ex.hint_top1}  →  invoked: ${ex.skill_invoked}`);
    }
    console.log('\n=== Sample hint-ignored ===');
    for (const ex of examples['hint-ignored']) {
      console.log(`  [${ex.session}] "${ex.prompt}"`);
      console.log(`     hint top-1: ${ex.hint_top1}  →  invoked: nothing`);
    }
    console.log('\n=== Sample missed-by-router ===');
    for (const ex of examples['missed-by-router']) {
      console.log(`  [${ex.session}] "${ex.prompt}"`);
      console.log(`     hint: none  →  invoked: ${ex.skill_invoked}`);
    }
  }
}

main();
