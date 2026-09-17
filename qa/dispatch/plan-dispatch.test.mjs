import assert from 'node:assert/strict';
import { test } from 'node:test';
import { planDispatch } from './plan-dispatch.mjs';

const issue = (id, overrides = {}) => ({
  id, title: id, project: 'Concord', stateType: 'backlog', priority: 2,
  workKind: 'design', scope: [`domain/${id}`], dependencies: [], ...overrides,
});
const snapshot = (issues, activeWork = []) => ({ schemaVersion: 1, project: 'Concord', issues, activeWork });
const actions = plan => plan.actions.map(action => `${action.type}:${action.issueId}`);

test('dispatches several independent preferred workstreams without mutating the snapshot', () => {
  const input = snapshot([
    issue('RESEARCH', { workKind: 'research', priority: 1 }),
    issue('DESIGN', { workKind: 'design', priority: 3 }),
    issue('CODE', { workKind: 'implementation', implementationAuthorized: true, priority: 1 }),
  ]);
  const before = structuredClone(input), plan = planDispatch(input);
  assert.equal(plan.outcome, 'successful');
  assert.deepEqual(actions(plan), ['dispatch:DESIGN', 'dispatch:RESEARCH', 'dispatch:CODE']);
  assert.deepEqual(input, before);
});

test('excludes owner holds, retired work, noncanonical duplicates, Finger beta, and all quiz work', () => {
  const plan = planDispatch(snapshot([
    issue('HOLD', { ownerDeferred: true }),
    issue('OLD', { retired: true }),
    issue('DUP', { canonicalIssueId: 'CANONICAL' }),
    issue('FINGER', { subsystem: 'finger-deployable-beta' }),
    issue('QUIZ', { subsystem: 'quiz' }),
    issue('ADAPTIVE', { subsystem: 'adaptive-curriculum' }),
  ]));
  assert.equal(plan.outcome, 'blocked');
  assert.equal(plan.actions.length, 0);
  assert.deepEqual(new Set(plan.skipped.map(item => item.reason)),
    new Set(['OWNER_DEFERRED', 'TERMINAL_OR_RETIRED', 'NONCANONICAL_DUPLICATE', 'EXCLUDED_SUBSYSTEM']));
});

test('unresolved dependencies block only the work kinds they actually gate', () => {
  const dependency = issue('PRODUCER', { stateType: 'review' });
  const plan = planDispatch(snapshot([
    dependency,
    issue('DOC', { workKind: 'integration-planning', dependencies: [{ id: 'PRODUCER', appliesTo: ['implementation'] }] }),
    issue('BUILD', { workKind: 'implementation', implementationAuthorized: true,
      dependencies: [{ id: 'PRODUCER', appliesTo: ['implementation'] }] }),
  ]));
  assert.ok(actions(plan).includes('dispatch:DOC'));
  assert.ok(plan.skipped.some(item => item.issueId === 'BUILD' && item.reason === 'UNRESOLVED_PREREQUISITE'));
});

test('continues existing work and prevents duplicate or overlapping dispatch', () => {
  const plan = planDispatch(snapshot([
    issue('ACTIVE', { stateType: 'started', scope: ['governance/agreements'] }),
    issue('OVERLAP', { scope: ['governance/agreements/settlement'] }),
    issue('OTHER', { scope: ['governance/identity'] }),
  ], [{ issueId: 'ACTIVE', status: 'running', scope: ['governance/agreements'] }]));
  assert.deepEqual(actions(plan), ['continue:ACTIVE', 'dispatch:OTHER']);
  assert.ok(plan.skipped.some(item => item.issueId === 'OVERLAP' && item.reason === 'SCOPE_CONFLICT'));
});

test('advances state only with explicit reviewable evidence', () => {
  const plan = planDispatch(snapshot([
    issue('REVIEWED', { stateType: 'review', transitionEvidence: { targetState: 'Done', evidenceId: 'artifact-7' } }),
    issue('WAITING', { stateType: 'review' }),
  ]));
  assert.deepEqual(plan.actions, [{ type: 'advance', issueId: 'REVIEWED', targetState: 'Done', evidenceId: 'artifact-7' }]);
  assert.ok(plan.skipped.some(item => item.issueId === 'WAITING' && item.reason === 'ACTIVE_WITHOUT_DELEGATE'));
});

test('creates at most one concise owner gate and does not stop unrelated work', () => {
  const plan = planDispatch(snapshot([
    issue('DECISION', { ownerDecisionRequired: true, ownerDecision: 'Choose the retained protocol.' }),
    issue('READY'),
  ]));
  assert.deepEqual(actions(plan), ['owner-gate:DECISION', 'dispatch:READY']);
  assert.equal(plan.outcome, 'successful');
});

test('does not treat unauthorized implementation as the default queue', () => {
  const plan = planDispatch(snapshot([issue('CODE', { workKind: 'implementation' })]));
  assert.equal(plan.outcome, 'blocked');
  assert.equal(plan.skipped[0].reason, 'IMPLEMENTATION_NOT_AUTHORIZED');
});

test('fails closed for malformed or cross-project snapshots', () => {
  assert.deepEqual(planDispatch({ schemaVersion: 1, project: 'Vote', issues: [], activeWork: [] }).blockers,
    [{ code: 'INVALID_SNAPSHOT' }]);
  assert.deepEqual(planDispatch(snapshot([issue('BAD', { scope: [] })])).blockers, [{ code: 'INVALID_SNAPSHOT' }]);
});
