import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync(new URL('../.github/workflows/grok-review-packet.yml', import.meta.url), 'utf8');
const source = workflow.split('          script: |\n')[1].split('\n').map(line => line.replace(/^ {12}/, '')).join('\n');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const run = new AsyncFunction('github', 'context', 'core', 'require', 'process', source);

async function packetFor(files, { fork = false, prior = false } = {}) {
  let packet, fetched = 0, created = 0, updated = 0;
  const summaries = [];
  const listFiles = () => {};
  const paginate = async () => prior ? [{ id: 9, body: '<!-- concord-grok-review-packet -->' }] : [];
  paginate.iterator = async function* (method) {
    assert.equal(method, listFiles);
    for (let i = 0; i < files.length; i += 100) { fetched++; yield { data: files.slice(i, i + 100) }; }
  };
  const github = { paginate, rest: {
    pulls: { listFiles },
    checks: { listForRef: async () => ({ data: { check_runs: [] } }) },
    issues: {
      listComments: () => {},
      createComment: async ({ body }) => { created++; packet = body; },
      updateComment: async ({ body, comment_id }) => { assert.equal(comment_id, 9); updated++; packet = body; },
    },
  } };
  const context = { repo: { owner: 'test', repo: 'fixture' }, payload: { pull_request: {
    number: 42, title: 'Synthetic test', body: 'No execution', changed_files: files.length,
    head: { sha: 'test-revision', repo: { fork } },
  } } };
  await run(github, context, { notice() {} }, name => {
    assert.equal(name, 'fs'); return { appendFileSync: (_path, text) => summaries.push(text) };
  }, { env: { GITHUB_STEP_SUMMARY: 'mock-summary' } });
  return { packet, fetched, created, updated, summaries };
}

test('review packet handles more than 300 changed files without requesting the whole diff', async () => {
  const files = Array.from({ length: 301 }, (_, i) => ({ filename: `file-${i}.js`, status: 'modified', patch: '+ok' }));
  const result = await packetFor(files);
  assert.equal(result.fetched, 4);
  assert.equal(result.created, 1);
  assert.match(result.packet, /file-300\.js/);
  assert.match(result.packet, /All API-provided file patches/);
  assert.doesNotMatch(result.packet, /Partial diff excerpt/);
});

test('packet cap stops pagination and updates the existing marked comment', async () => {
  const files = Array.from({ length: 301 }, (_, i) => ({ filename: `file-${i}.js`, status: 'modified', patch: '+'.repeat(30_000) }));
  const result = await packetFor(files, { prior: true });
  assert.equal(result.fetched, 1);
  assert.equal(result.created, 0);
  assert.equal(result.updated, 1);
  assert.match(result.packet, /Partial diff excerpt/);
  assert.ok(result.packet.length < 40_000);
  assert.doesNotMatch(result.packet, /file-1\.js/);
});

test('missing binary or oversized patches are explicitly marked incomplete', async () => {
  const result = await packetFor([{ filename: 'image.png', status: 'added' }]);
  assert.match(result.packet, /GitHub did not provide this file patch/);
  assert.match(result.packet, /Partial diff excerpt/);
});

test('fork remains blocked without fetching files or writing comments', async () => {
  const result = await packetFor([], { fork: true });
  assert.equal(result.fetched, 0);
  assert.equal(result.created + result.updated, 0);
  assert.match(result.summaries.join(''), /BLOCKED/);
});
