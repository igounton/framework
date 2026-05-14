#!/usr/bin/env node
'use strict';

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const BUILD_SCRIPT = path.join(__dirname, 'build-index.js');
const LOG_DIR = process.env.CLAUDE_PLUGIN_DATA
  ? path.join(process.env.CLAUDE_PLUGIN_DATA, 'routing')
  : path.join(os.homedir(), '.claude', 'plugins', 'data', 'aidd-context', 'routing');

function passthrough() { process.exit(0); }

function main() {
  try { fs.mkdirSync(LOG_DIR, { recursive: true }); } catch { /* ignore */ }
  const logPath = path.join(LOG_DIR, 'last-build.log');

  const r = spawnSync(process.execPath, [BUILD_SCRIPT], {
    encoding: 'utf8',
    timeout: 25000,
  });

  const log = [
    `[${new Date().toISOString()}] build-on-session`,
    `exit ${r.status}`,
    '--- stdout ---',
    r.stdout || '',
    '--- stderr ---',
    r.stderr || '',
  ].join('\n');

  try { fs.writeFileSync(logPath, log); } catch { /* ignore */ }
  passthrough();
}

try { main(); } catch { passthrough(); }
