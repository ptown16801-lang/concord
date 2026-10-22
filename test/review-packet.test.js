import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync(new URL('../.github/workflows/grok-review-packet.yml', import.meta.url), 'utf8');
const script = workflow.split('          script: |\n')[1].split('\n').map(line => line.replace(/^            /, '')).join('\n');
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const execute = new AsyncFunction('context', 'github', 'core', 'require', 'process', script);
const A = 'a'.repeat(40), B = 'b'.repeat(40), C = 'c'.repeat(40);
const marker = '<!-- concord-grok-review-packet -->';
const legacy = `${marker}\n# GROK REVIEW PACKET\n`;
const current = `${marker}\n# Pull request review context\n`;
const initial = () => ({ number: 1, state: 'open', title: 'PRIVATE_TITLE_SENTINEL',
  body: 'PRIVATE_BODY_SENTINEL https://private.invalid/access?token=PRIVATE_TOKEN_SENTINEL',
  merge_commit_sha: C, head: { sha: A, repo: { full_name: 'owner/repo' } },
  base: { sha: B, repo: { full_name: 'owner/repo' } } });

async function run(options = {}) {
  const writes = [], reads = [], notices = [], summaries = [];
  let prReads = 0;
  const pr = { ...initial(), ...options.pr };
  const forbidden = () => { throw new Error('PR content/check-result API must not be called'); };
  const github = {
    request: forbidden,
    rest: {
      pulls: {
        listFiles: 'forbidden-files',
        get: async args => {
          reads.push({ method: 'get', args });
          const value = options.changed && prReads++ >= 1 ? { ...pr, ...options.changed } : pr;
          return { data: structuredClone(value) };
        }
      },
      checks: { listForRef: 'forbidden-checks' },
      repos: { listPullRequestsAssociatedWithCommit: 'associated' },
      issues: {
        listComments: 'comments',
        updateComment: async value => writes.push({ type: 'update', ...value }),
        createComment: async value => writes.push({ type: 'create', ...value })
      }
    },
    paginate: async (method, args) => {
      reads.push({ method, args });
      if (method === 'associated') return options.associated ?? [{ number: 1 }];
      if (method === 'comments') {
        if (options.commentsError) throw new Error('comments unavailable');
        return options.comments ?? [];
      }
      return forbidden();
    }
  };
  github.paginate.iterator = forbidden;
  const context = {
    repo: { owner: 'owner', repo: 'repo' },
    eventName: options.eventName ?? 'pull_request',
    payload: {
      pull_request: { ...pr, head: { ...pr.head, sha: options.expected ?? A } },
      workflow_run: {
        head_sha: options.expected ?? A,
        head_repository: { full_name: options.runRepo ?? 'owner/repo' }
      },
      inputs: { pull_number: options.input ?? '1' }
    }
  };
  await execute(context, github, { notice: value => notices.push(value) }, name => {
    assert.equal(name, 'fs');
    return { appendFileSync: (_path, value) => summaries.push(value) };
  }, { env: { GITHUB_STEP_SUMMARY: 'fixture' } });
  return { writes, reads, notices, summaries };
}

test('publishes fixed navigation links and exact observed revisions without source or CI copies', async () => {
  const r = await run();
  assert.equal(r.writes.length, 1);
  const body = r.writes[0].body;
  assert.ok(body.startsWith(current));
  assert.match(body, new RegExp(`Head: \\x60${A}\\x60`));
  assert.match(body, new RegExp(`Base: \\x60${B}\\x60`));
  assert.match(body, /Observed at \d{4}-\d{2}-\d{2}T/);
  for (const url of ['https://github.com/owner/repo/pull/1)',
    'https://github.com/owner/repo/pull/1/files)',
    'https://github.com/owner/repo/pull/1/checks)',
    `https://github.com/owner/repo/compare/${B}...${A})`]) assert.ok(body.includes(url));
  assert.match(body, /not a provider review, independent verification, owner acceptance/);
  assert.deepEqual(r.reads.map(x => x.method), ['get', 'comments', 'get']);
  assert.doesNotMatch(JSON.stringify([r.writes, r.notices, r.summaries]), /PRIVATE_|private\.invalid|token=/);
});

test('large non-ASCII private title/body cannot enlarge or enter a comment or job summary', async () => {
  const r = await run({ pr: { title: 'PRIVATE_TITLE_' + '界'.repeat(10000), body: 'PRIVATE_BODY_' + '界'.repeat(200000) } });
  assert.equal(r.writes.length, 1);
  assert.ok(Buffer.byteLength(r.writes[0].body) < 2000);
  assert.doesNotMatch(JSON.stringify([r.writes, r.summaries, r.notices]), /PRIVATE_|界/);
});

test('old queued event cannot publish at a different current head', async () => {
  const r = await run({ expected: B });
  assert.equal(r.writes.length, 0);
  assert.deepEqual(r.reads.map(x => x.method), ['get']);
  assert.match(r.notices.join(), /STALE/);
});

for (const [name, changed] of Object.entries({
  head: { head: { sha: B, repo: { full_name: 'owner/repo' } } },
  base: { base: { sha: C, repo: { full_name: 'owner/repo' } } },
  merge: { merge_commit_sha: A }, title: { title: 'new title' },
  body: { body: 'new acceptance' }, closed: { state: 'closed' },
  repository: { head: { sha: A, repo: { full_name: 'fork/repo' } } },
  number: { number: 2 }
})) {
  test(`does not publish after concurrent ${name} change`, async () => {
    const r = await run({ changed });
    assert.equal(r.writes.length, 0);
    assert.match(r.notices.join(), /STALE/);
  });
}

test('does not select human, spoofed-type, or quoted-marker comments', async () => {
  const r = await run({ comments: [
    { id: 1, user: { login: 'human', type: 'User' }, body: legacy },
    { id: 2, user: { login: 'github-actions[bot]', type: 'User' }, body: legacy },
    { id: 3, user: { login: 'github-actions[bot]', type: 'Bot' }, body: 'Quoted:\n' + legacy },
    { id: 4, user: { login: 'other[bot]', type: 'Bot' }, body: current }
  ] });
  assert.equal(r.writes[0].type, 'create');
  assert.equal(r.writes[0].comment_id, undefined);
});

for (const [name, prefix] of Object.entries({ legacy, current, historical: `${marker}\n> Historical snapshot\n# GROK REVIEW PACKET\n` })) {
  test(`replaces the ${name} bot comment in place without retaining its copied private content`, async () => {
    const r = await run({ comments: [{ id: 44, user: { login: 'github-actions[bot]', type: 'Bot' },
      body: prefix + 'PRIVATE_DIFF_SENTINEL\nSTALE_CI_RESULT_SENTINEL' }] });
    assert.equal(r.writes.length, 1);
    assert.equal(r.writes[0].type, 'update');
    assert.equal(r.writes[0].comment_id, 44);
    assert.ok(r.writes[0].body.startsWith(current));
    assert.doesNotMatch(r.writes[0].body, /PRIVATE_DIFF_|STALE_CI_/);
  });
}

test('duplicate owned legacy/current comments block publication', async () => {
  const r = await run({ comments: [legacy, current].map((body, id) => ({ id, body,
    user: { login: 'github-actions[bot]', type: 'Bot' } })) });
  assert.equal(r.writes.length, 0);
  assert.match(r.notices.join(), /duplicate/);
});

test('fork, missing repository and foreign base cannot publish', async () => {
  for (const pr of [
    { head: { sha: A, repo: { full_name: 'fork/repo' } } },
    { head: { sha: A, repo: null } },
    { base: { sha: B, repo: { full_name: 'foreign/repo' } } }
  ]) assert.equal((await run({ pr })).writes.length, 0);
});

test('untrusted or invalid workflow-run source is blocked before any PR lookup', async () => {
  for (const options of [{ runRepo: 'fork/repo' }, { expected: 'bad-sha' }]) {
    const r = await run({ eventName: 'workflow_run', ...options });
    assert.equal(r.writes.length, 0);
    assert.equal(r.reads.length, 0);
  }
});

test('workflow completion refreshes matching heads once without fetching check results', async () => {
  const r = await run({ eventName: 'workflow_run', associated: [{ number: 1 }, { number: 1 }] });
  assert.equal(r.writes.length, 1);
  assert.equal(r.reads[0].args.commit_sha, A);
  assert.equal((await run({ eventName: 'workflow_run', expected: B })).writes.length, 0);
});

test('manual refresh validates an integer PR number and refreshes from the current API identity', async () => {
  const r = await run({ eventName: 'workflow_dispatch', pr: { head: { sha: C, repo: { full_name: 'owner/repo' } } } });
  assert.equal(r.writes.length, 1);
  assert.match(r.writes[0].body, new RegExp(`Head: \\x60${C}\\x60`));
  for (const input of ['not-a-number', '-1', '0', '1.5', '1e0', '0x1', ' 1', '1\n', '9007199254740992']) {
    await assert.rejects(run({ eventName: 'workflow_dispatch', input }), /invalid pull request/);
  }
});

test('invalid head/base and comment-read failures cannot produce a comment', async () => {
  for (const key of ['head', 'base']) {
    await assert.rejects(run({ pr: { [key]: { sha: 'invalid', repo: { full_name: 'owner/repo' } } } }), /Invalid immutable/);
  }
  await assert.rejects(run({ commentsError: true }), /comments unavailable/);
});

test('workflow retains shared serialization/manual and edit refresh without checking out or executing PR code', () => {
  assert.match(workflow, /^name: Pull request review context/m);
  assert.match(workflow, /group: concord-review-packet\n\s+cancel-in-progress: false/);
  assert.match(workflow, /types: \[opened, synchronize, reopened, edited, ready_for_review\]/);
  assert.match(workflow, /workflow_run:[\s\S]*workflows: \[test\]/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.doesNotMatch(workflow, /actions\/checkout|pull_request_target|\brun:|listForRef|listFiles|github\.request|checks: read/);
});
