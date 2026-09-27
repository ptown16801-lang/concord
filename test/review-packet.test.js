import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const workflow = readFileSync(new URL('../.github/workflows/grok-review-packet.yml', import.meta.url), 'utf8');
const script = workflow.split('          script: |\n')[1].split('\n').map(l => l.replace(/^            /, '')).join('\n');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const execute = new AsyncFunction('context', 'github', 'core', 'require', 'process', script);
const A = 'a'.repeat(40), B = 'b'.repeat(40), C = 'c'.repeat(40);
const marker = '<!-- concord-grok-review-packet -->\n# GROK REVIEW PACKET\n';
const initial = () => ({ number: 1, state: 'open', title: 'title', body: 'acceptance', merge_commit_sha: C,
  head: { sha: A, repo: { full_name: 'owner/repo' } }, base: { sha: B, repo: { full_name: 'owner/repo' } } });
async function run(options = {}) {
  const writes = [], requests = [], reads = [], notices = [];
  let prReads = 0;
  const pr = initial();
  if (options.fork) pr.head.repo.full_name = 'fork/repo';
  const github = {
    request: async (route, args) => { requests.push({ route, args }); return { data: options.diff ?? 'revision-pinned diff' }; },
    rest: {
      pulls: { get: async () => ({ data: options.changed && prReads++ > 0 ? { ...pr, ...options.changed } : structuredClone(pr) }) },
      checks: { listForRef: 'checks' }, repos: { listPullRequestsAssociatedWithCommit: 'associated' },
      issues: { listComments: 'comments', updateComment: async x => writes.push({ type: 'update', ...x }),
        createComment: async x => writes.push({ type: 'create', ...x }) }
    },
    paginate: async (method, args) => {
      reads.push({ method, args });
      if (method === 'associated') return [{ number: 1 }];
      if (method === 'comments') return options.comments ?? [];
      return options.checks ?? [{ id: 123, name: 'test (22.x)', status: 'completed', conclusion: 'success',
        completed_at: '2026-09-27T00:00:00Z', html_url: 'https://github.com/owner/repo/actions/runs/123' }];
    }
  };
  const eventName = options.eventName ?? 'pull_request';
  const context = { repo: { owner: 'owner', repo: 'repo' }, eventName, payload: {
    pull_request: { ...pr, head: { ...pr.head, sha: options.expected ?? A } },
    workflow_run: { head_sha: options.expected ?? A, head_repository: { full_name: options.runRepo ?? 'owner/repo' } },
    inputs: { pull_number: options.input ?? '1' }
  } };
  await execute(context, github, { notice: x => notices.push(x) }, name => {
    assert.equal(name, 'fs'); return { appendFileSync: () => {} };
  }, { env: { GITHUB_STEP_SUMMARY: 'fixture' } });
  return { writes, requests, reads, notices };
}
test('pins diff to immutable base/head and identifies head and merge check evidence', async () => {
  const r = await run();
  assert.equal(r.requests[0].args.basehead, `${B}...${A}`);
  assert.match(r.requests[0].route, /compare/);
  assert.deepEqual(r.reads.filter(x => x.method === 'checks').map(x => x.args.ref), [A, C]);
  assert.match(r.writes[0].body, /Snapshot time: /);
  assert.match(r.writes[0].body, /actions\/runs\/123/);
  assert.match(r.writes[0].body, /not a review verdict or approval/);
});
test('old queued event cannot fetch or publish a current-head packet', async () => {
  const r = await run({ expected: B }); assert.equal(r.requests.length, 0); assert.equal(r.writes.length, 0);
});
for (const [name, changed] of Object.entries({ head: { head: { sha: B, repo: { full_name: 'owner/repo' } } },
  base: { base: { sha: C, repo: { full_name: 'owner/repo' } } }, body: { body: 'new acceptance' }, closed: { state: 'closed' } })) {
  test(`refuses publication when ${name} changes during assembly`, async () => {
    assert.equal((await run({ changed })).writes.length, 0);
  });
}
test('quoted markers and spoofed bot usernames do not select human comments', async () => {
  const r = await run({ comments: [{ id: 42, user: { login: 'human', type: 'User' }, body: marker },
    { id: 43, user: { login: 'github-actions[bot]', type: 'User' }, body: marker }] });
  assert.equal(r.writes[0].type, 'create'); assert.equal(r.writes[0].comment_id, undefined);
});
test('updates only an authenticated bot-owned packet and blocks duplicates', async () => {
  const c = { id: 44, user: { login: 'github-actions[bot]', type: 'Bot' }, body: marker + 'old snapshot' };
  assert.equal((await run({ comments: [c] })).writes[0].comment_id, 44);
  assert.equal((await run({ comments: [c, { ...c, id: 45 }] })).writes.length, 0);
});
test('fork PR and untrusted workflow-run repository cannot write', async () => {
  assert.equal((await run({ fork: true })).writes.length, 0);
  assert.equal((await run({ eventName: 'workflow_run', runRepo: 'fork/repo' })).writes.length, 0);
});
test('workflow completion refreshes only matching current heads', async () => {
  assert.equal((await run({ eventName: 'workflow_run' })).writes.length, 1);
  assert.equal((await run({ eventName: 'workflow_run', expected: B })).writes.length, 0);
  assert.match(workflow, /workflow_run:[\s\S]*workflows: \[test\]/);
  assert.match(workflow, /edited, ready_for_review/);
});
test('manual refresh validates the PR number', async () => {
  assert.equal((await run({ eventName: 'workflow_dispatch' })).writes.length, 1);
  await assert.rejects(run({ eventName: 'workflow_dispatch', input: 'not-a-number' }), /invalid pull request/);
});
test('diff truncation and unknown checks remain explicit', async () => {
  const r = await run({ diff: 'x'.repeat(21000), checks: [] });
  assert.match(r.writes[0].body, /Locally capped/);
  assert.match(r.writes[0].body, /validation is UNKNOWN/);
  assert.doesNotMatch(r.writes[0].body, /Complete diff included/);
});
test('invalid diff response fails closed', async () => {
  await assert.rejects(run({ diff: {} }), /did not return text/);
});
test('non-ASCII packet exceeding byte cap does not publish partial instructions', async () => {
  const r = await run({ diff: '界'.repeat(21000) });
  assert.equal(r.writes.length, 0); assert.match(r.notices.join(), /byte limit/);
});
