#!/usr/bin/env node
/**
 * list-rules.mjs (source)
 *
 * Synced to plugins/aidd-context/skills/06-discovery/scripts/list-rules.mjs.
 * Keep both copies in sync when this source changes.
 *
 * Inventory project rules from the single canonical, tool-agnostic surface.
 *
 * Location (see aidd-context:03-context-generate/references/ai-mapping.md,
 * "## Rules (canonical, all tools)"):
 *   - aidd_docs/rules/**\/*.md
 *
 * Rules are no longer per-tool. There is one shape, read by every tool.
 * The script normalises every entry to:
 *   { path, name, description, paths }
 *
 *   - path        : path relative to --root (defaults to cwd)
 *   - name        : derived from the filename (without .md)
 *   - description : frontmatter `description` (empty when absent)
 *   - paths       : frontmatter `paths` glob array (omitted when absent = general rule)
 *
 * Exit code 0; empty array when aidd_docs/rules does not exist or contains no rules.
 */

import { existsSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { argv, cwd, exit, stderr, stdout } from 'node:process';

const RULES_DIR = 'aidd_docs/rules';
const EXT = '.md';

function parseArgs(args) {
  let root = cwd();
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--root' && args[i + 1]) {
      root = resolve(args[i + 1]);
      i++;
    }
  }
  return { root };
}

async function walk(dir, ext) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full, ext)));
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      out.push(full);
    }
  }
  return out;
}

function extractFrontmatter(content) {
  if (!content.startsWith('---')) return null;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return null;
  return content.slice(4, end).replace(/^\n/, '');
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseInlineList(value) {
  if (!value.startsWith('[') || !value.endsWith(']')) return null;
  const inner = value.slice(1, -1).trim();
  if (inner === '') return [];
  return inner.split(',').map((part) => stripQuotes(part.trim()));
}

function stripInlineComment(line) {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === '#' && !inSingle && !inDouble && (i === 0 || /\s/.test(line[i - 1]))) {
      return line.slice(0, i).trimEnd();
    }
  }
  return line;
}

function parseFrontmatter(raw) {
  const fm = {};
  let currentKey = null;
  let listAcc = null;
  for (const rawLine of raw.split('\n')) {
    const line = stripInlineComment(rawLine);
    if (!line.trim()) continue;

    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && currentKey && listAcc) {
      listAcc.push(stripQuotes(listItem[1].trim()));
      continue;
    }

    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.*)$/);
    if (!kv) continue;
    const [, key, rawValue] = kv;
    const value = rawValue.trim();
    if (value === '') {
      currentKey = key;
      listAcc = [];
      fm[key] = listAcc;
    } else {
      const inlineList = parseInlineList(value);
      fm[key] = inlineList !== null ? inlineList : stripQuotes(value);
      currentKey = null;
      listAcc = null;
    }
  }
  return fm;
}

function nameFromPath(relativePath, ext) {
  const base = relativePath.split('/').pop();
  return base.endsWith(ext) ? base.slice(0, -ext.length) : base;
}

async function main() {
  const { root } = parseArgs(argv.slice(2));
  const absolute = join(root, RULES_DIR);

  const aggregated = [];

  if (existsSync(absolute)) {
    const dirStat = await stat(absolute).catch(() => null);
    if (dirStat && dirStat.isDirectory()) {
      const files = await walk(absolute, EXT);
      for (const file of files) {
        const relPath = relative(root, file);
        const content = await readFile(file, 'utf8');
        const rawFm = extractFrontmatter(content);
        const fm = rawFm ? parseFrontmatter(rawFm) : {};

        const hasPaths = Array.isArray(fm.paths) && fm.paths.length > 0;
        aggregated.push({
          path: relPath,
          name: nameFromPath(relPath, EXT),
          description: typeof fm.description === 'string' ? fm.description : '',
          ...(hasPaths ? { paths: fm.paths } : {}),
        });
      }
    }
  }

  stdout.write(JSON.stringify(aggregated, null, 2) + '\n');
}

main().catch((err) => {
  stderr.write(`error: ${err.message}\n`);
  exit(1);
});
