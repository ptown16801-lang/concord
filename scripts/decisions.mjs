#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

export const digest = text => createHash('sha256').update(text).digest('hex');
const idPattern = /^(?:CON-\d{3}|ECON-\d{2}|DEC-\d{3})$/;
const fields = ['Status', 'Scope', 'Acceptance', 'Acceptance date', 'Sources', 'Supersedes', 'Implementation', 'Verification', 'Rationale'];
export function parseMaster(text) {
  const entries = [];
  const headings = [...text.matchAll(/^### (\S+) — (.+)$/gm)];
  if ((text.match(/^### /gm) || []).length !== headings.length) throw new Error('Malformed decision heading');
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const block = text.slice(h.index + h[0].length, headings[i + 1]?.index ?? text.length);
    const meta = {};
    for (const m of block.matchAll(/^- ([\w ]+): (.*)$/gm)) {
      if (!fields.includes(m[1])) continue;
      if (m[1] in meta) throw new Error(`${h[1]} duplicate field ${m[1]}`);
      meta[m[1]] = m[2].trim();
    }
    entries.push({ id: h[1], title: h[2], meta, block });
  }
  return entries;
}
export function validate(text, sources, root, { allowMissingSummary = false } = {}) {
  const errors = [];
  let entries;
  try { entries = parseMaster(text); } catch (e) { return [e.message]; }
  if (!entries.length) errors.push('No decisions found');
  const ids = new Set();
  for (const e of entries) {
    if (!idPattern.test(e.id)) errors.push(`Malformed ID ${e.id}`);
    if (ids.has(e.id)) errors.push(`Duplicate ID ${e.id}`);
    ids.add(e.id);
    if (!text.includes(`<a id="${e.id}"></a>`)) errors.push(`${e.id} missing stable anchor`);
    for (const f of fields) if (!e.meta[f]) errors.push(`${e.id} missing ${f}`);
    if (!['Accepted', 'Proposed', 'Superseded', 'Unresolved'].includes(e.meta.Status)) errors.push(`${e.id} invalid status`);
    if (e.meta.Status === 'Accepted' && /^Unavailable:/i.test(e.meta.Acceptance || '')) errors.push(`${e.id} Accepted without acceptance evidence`);
    const date = e.meta['Acceptance date'] || '';
    if (!/^\d{4}-\d{2}-\d{2}(?:\b|$)|^Unavailable: .+/.test(date)) errors.push(`${e.id} invalid or unexplained acceptance date`);
    const refs = [...(e.meta.Sources || '').matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
    if (!refs.length) errors.push(`${e.id} missing source references`);
    for (const [, id, path] of refs) {
      const s = sources[id];
      if (!s) { errors.push(`${e.id} unknown source ${id}`); continue; }
      if (s.snapshot !== path) errors.push(`${e.id} source path mismatch ${id}`);
    }
  }
  for (const [id, s] of Object.entries(sources)) {
    for (const field of ['location', 'version', 'date', 'classification', 'scope', 'relationship', 'snapshot', 'sha256']) {
      if (typeof s[field] !== 'string' || !s[field].trim()) errors.push(`${id} missing source ${field}`);
    }
    if (s.snapshot && root) {
      const p = resolve(root, s.snapshot);
      if (relative(root, p).startsWith('..')) errors.push(`${id} source outside repository`);
      else if (!existsSync(p)) errors.push(`${id} missing snapshot`);
      else if (digest(readFileSync(p)) !== s.sha256) errors.push(`${id} snapshot digest mismatch`);
    }
  }
  const edges = new Map(entries.map(e => [e.id, e.meta.Supersedes === 'None' ? [] : (e.meta.Supersedes || '').split(/,\s*/)]));
  for (const [id, targets] of edges) for (const target of targets) {
    if (!ids.has(target)) errors.push(`${id} unknown supersession ${target}`);
    else if (entries.find(e => e.id === target).meta.Status !== 'Superseded') errors.push(`${id} supersedes non-Superseded ${target}`);
  }
  const visited = new Set(), active = new Set();
  function visit(id) {
    if (active.has(id)) { errors.push(`Supersession cycle at ${id}`); return; }
    if (visited.has(id)) return;
    active.add(id);
    for (const next of edges.get(id) || []) if (ids.has(next)) visit(next);
    active.delete(id); visited.add(id);
  }
  for (const id of ids) visit(id);
  // Only master links are live navigation. Frozen source documents retain their original historical links.
  for (const [, raw] of text.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^https?:\/\//.test(raw)) continue; // no network checks, including private links
    const [path, anchor] = raw.split('#');
    if ((!path || path === 'DECISIONS.md') && anchor && /^(CON|ECON|DEC)-/.test(anchor) && !ids.has(anchor)) errors.push(`Broken decision reference ${anchor}`);
    if (path && root) {
      if (relative(root, resolve(root, path)).startsWith('..')) errors.push(`Local link outside repository ${path}`);
      else if (!existsSync(resolve(root, path)) && !(allowMissingSummary && path === 'CURRENT_DECISIONS.md')) errors.push(`Broken local link ${path}`);
    }
  }
  return [...new Set(errors)];
}
export function generateSummary(text) {
  const entries = parseMaster(text);
  return `# Current Concord decisions — generated navigation\n\n` +
    `DO NOT EDIT. The sole master is [DECISIONS.md](DECISIONS.md) on designated integration branch \`Develo\` in \`ptown16801-lang/concord\`.\n` +
    `This branch remains a candidate until integrated. Read entry scope, acceptance and implementation limits.\n\n` +
    `Master SHA-256 (exact UTF-8 bytes): \`${digest(text)}\`\n\n` +
    `Coverage: ${text.match(/coverage (\d{4}-\d{2}-\d{2})/)?.[1] || 'Unavailable'}. This is source coverage, not a fresh remote read.\n` +
    `Resolve the containing source commit with \`git log -1 --format=%H -- DECISIONS.md\`; the content digest is not a commit ID.\n\n` +
    `| ID | Status | Decision |\n| --- | --- | --- |\n` +
    entries.map(e => `| [${e.id}](DECISIONS.md#${e.id}) | ${e.meta.Status} | ${e.title.replaceAll('|', '\\|')} |`).join('\n') + '\n';
}
export function validateDisposition(body, knownIds) {
  const lines = (body || '').split('\n').filter(l => /^Decision impact:/.test(l));
  if (lines.length !== 1) return ['Exactly one Decision impact disposition is required'];
  if (lines[0] === 'Decision impact: No decision change') return [];
  const m = lines[0].match(/^Decision impact: Updated ((?:CON-\d{3}|ECON-\d{2}|DEC-\d{3})(?:, (?:CON-\d{3}|ECON-\d{2}|DEC-\d{3}))*)$/);
  if (!m) return ['Use Decision impact: No decision change or Decision impact: Updated ID, ID'];
  const ids = m[1].split(', ');
  return ids.filter((id, i) => !knownIds.has(id) || ids.indexOf(id) !== i).map(id => `Invalid/duplicate disposition ID ${id}`);
}
export function preflight(root, expectedHead, expectedCanonical, offline = false) {
  if (!/^[a-f0-9]{40}$/.test(expectedHead || '') || !/^[a-f0-9]{40}$/.test(expectedCanonical || '')) throw new Error('Provide full --expected-head and --expected-canonical SHAs');
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  if (git('rev-parse', 'HEAD') !== expectedHead) throw new Error('HEAD moved: reconcile before committing');
  if (git('rev-parse', 'refs/remotes/origin/Develo') !== expectedCanonical) throw new Error('Canonical tracking revision moved: reconcile before committing');
  if (!offline) {
    const remote = git('ls-remote', 'origin', 'refs/heads/Develo').split(/\s/)[0];
    if (remote !== expectedCanonical) throw new Error('Remote canonical branch moved: fetch and reconcile before committing');
  }
  return `HEAD ${expectedHead}\nCanonical ${expectedCanonical}\nSynchronization: ${offline ? 'OFFLINE/cached refs only; remote not freshly checked' : 'live remote revision matched'}\n` +
    `Other local changes to review (including untracked):\n${git('status', '--short')}\n` +
    `Active worktrees:\n${git('worktree', 'list', '--porcelain')}\n` +
    `Human semantic review still required; this check cannot establish acceptance or exclude concurrent edits after this instant.`;
}
function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const text = readFileSync(resolve(root, 'DECISIONS.md'), 'utf8');
  const sources = JSON.parse(readFileSync(resolve(root, 'docs/decisions/sources.json'), 'utf8'));
  const [command = 'check', ...args] = process.argv.slice(2);
  if (command === 'generate') {
    const errors = validate(text, sources, root, { allowMissingSummary: true });
    if (errors.length) throw new Error(errors.join('\n'));
    writeFileSync(resolve(root, 'CURRENT_DECISIONS.md'), generateSummary(text));
    console.log('Generated CURRENT_DECISIONS.md from master bytes');
  } else if (command === 'check') {
    const errors = validate(text, sources, root);
    if (!existsSync(resolve(root, 'CURRENT_DECISIONS.md')) || readFileSync(resolve(root, 'CURRENT_DECISIONS.md'), 'utf8') !== generateSummary(text)) errors.push('Generated summary drift: run npm run decisions:generate');
    if (errors.length) throw new Error(errors.join('\n'));
    console.log(`${parseMaster(text).length} decisions and ${Object.keys(sources).length} source records valid; summary matches`);
  } else if (command === 'disposition') {
    const event = JSON.parse(readFileSync(args[0] || process.env.GITHUB_EVENT_PATH, 'utf8'));
    if (!event.pull_request) throw new Error('PR event required');
    const errors = validateDisposition(event.pull_request.body, new Set(parseMaster(text).map(e => e.id)));
    if (errors.length) throw new Error(errors.join('\n'));
    console.log('PR decision-impact disposition present; semantic accuracy requires review');
  } else if (command === 'preflight') {
    const option = name => args[args.indexOf(name) + 1];
    console.log(preflight(root, args.includes('--expected-head') ? option('--expected-head') : '', args.includes('--expected-canonical') ? option('--expected-canonical') : '', args.includes('--offline')));
  } else throw new Error(`Unknown command ${command}`);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(); } catch (e) { console.error(e.message); process.exitCode = 1; }
}
