import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validateDispatch } from './dispatch-gate.mjs';

const NOW = Date.parse('2026-09-16T18:00:00Z');
function fixture() {
  const profile = { schemaVersion: 1, profileId: 'project-alpha', profileVersion: 2,
    project: { workspaceId: 'workspace-one', teamId: 'team-one', projectId: 'project-one' },
    repository: { id: 'repo-one', fullName: 'example/alpha', directory: 'packages/alpha' },
    base: { branch: 'main', commit: 'a'.repeat(40) }, runtime: { name: 'python', version: '3.13.2' },
    environment: { id: 'authorized-local-host' }, maxObservationAgeSeconds: 300, requiredPermissions: [], requiredGates: [],
    sources: [{ id: 'requirements', revision: 'revision-2' }] };
  const assignment = { schemaVersion: 1, assignmentId: 'TASK-1', profileId: profile.profileId,
    profileVersion: 2, owner: 'implementation-agent', scope: ['packages/alpha/src'],
    requiredPermissions: ['repository:read', 'repository:write'], sourceIds: ['requirements'],
    dependencies: [{ id: 'TASK-0', commit: 'b'.repeat(40) }],
    acceptanceCriteria: ['Expected behavior verified by the task regression.'], deliverables: ['Reviewed implementation patch'],
    requiredGates: [], authorization: { authorized: true, evidenceId: 'owner-request-1' } };
  const observed = { schemaVersion: 1, checkedAt: '2026-09-16T17:59:00Z', profileId: profile.profileId,
    profileVersion: 2, project: structuredClone(profile.project), repository: structuredClone(profile.repository),
    base: structuredClone(profile.base), runtime: { ...profile.runtime, verified: true },
    environment: { ...profile.environment, verified: true }, permissions: [...assignment.requiredPermissions],
    sources: structuredClone(profile.sources), dependencies: [{ ...assignment.dependencies[0], accepted: true, published: true,
      publicationEvidenceId: 'published-commit-observation', acceptanceEvidenceId: 'accepted-review-record' }],
    activeAssignments: [], authorizations: [{ ...assignment.authorization, assignmentId: assignment.assignmentId }], gates: [] };
  return { profile, assignment, observed };
}
function run(value) { return validateDispatch(value.profile, value.assignment, value.observed, { now: NOW }); }
function blocked(mutate, code) {
  const value = fixture(); mutate(value);
  const report = run(value);
  assert.equal(report.status, 'blocked');
  assert.ok(report.failures.some(failure => failure.code === code), JSON.stringify(report));
}

test('valid non-Concord Python project is ready without inherited Node or Linear gates', () => {
  const value = fixture(), before = structuredClone(value);
  assert.equal(run(value).status, 'ready');
  assert.deepEqual(value, before, 'validation does not mutate its evidence');
});

for (const field of ['workspaceId', 'teamId', 'projectId']) test(`exact ${field} identity is required`, () =>
  blocked(({ observed }) => { observed.project[field] = 'wrong'; }, 'PROJECT_IDENTITY_MISMATCH'));
for (const field of ['id', 'fullName', 'directory']) test(`exact repository ${field} is required`, () =>
  blocked(({ observed }) => { observed.repository[field] = field === 'fullName' ? 'other/repo' : 'other'; }, 'REPOSITORY_MISMATCH'));
for (const target of ['assignment', 'observed']) test(`stale ${target} profile version blocks`, () =>
  blocked(value => { value[target].profileVersion = 1; }, 'PROFILE_VERSION_MISMATCH'));
test('another profile cannot borrow this project identity', () =>
  blocked(({ assignment }) => { assignment.profileId = 'concord'; }, 'PROFILE_ID_MISMATCH'));
for (const field of ['branch', 'commit']) test(`moved base ${field} requires repinning`, () =>
  blocked(({ observed }) => { observed.base[field] = field === 'branch' ? 'feature/other' : 'c'.repeat(40); }, 'BASE_CHANGED'));
test('expired observation blocks', () => blocked(({ observed }) => { observed.checkedAt = '2026-09-16T17:54:59Z'; }, 'OBSERVATION_STALE'));
test('future observation blocks', () => blocked(({ observed }) => { observed.checkedAt = '2026-09-16T18:00:01Z'; }, 'OBSERVATION_IN_FUTURE'));
test('runtime must match and be verified', () => {
  blocked(({ observed }) => { observed.runtime.name = 'node'; }, 'RUNTIME_MISMATCH');
  blocked(({ observed }) => { observed.runtime.verified = false; }, 'RUNTIME_UNVERIFIED');
});
test('local environment evidence cannot attest a different native environment', () => {
  blocked(({ observed }) => { observed.environment.id = 'linear-native'; }, 'ENVIRONMENT_MISMATCH');
  blocked(({ observed }) => { observed.environment.verified = false; }, 'ENVIRONMENT_UNVERIFIED');
});
test('all assignment permissions are required', () => blocked(({ observed }) => { observed.permissions.pop(); }, 'PERMISSION_MISSING'));
test('assignment cannot omit required profile permissions', () => blocked(({ profile, assignment, observed }) => {
  profile.requiredPermissions = ['repository:write']; assignment.requiredPermissions = []; observed.permissions = ['repository:read'];
}, 'PERMISSION_MISSING'));
test('source must be pinned and current', () => {
  blocked(({ assignment }) => { assignment.sourceIds = ['unknown']; }, 'SOURCE_UNPINNED');
  blocked(({ observed }) => { observed.sources = []; }, 'SOURCE_UNVERIFIED');
  blocked(({ observed }) => { observed.sources[0].revision = 'revision-3'; }, 'SOURCE_CHANGED');
});
test('upstream dependencies must exist, match, be published, and be accepted', () => {
  blocked(({ observed }) => { observed.dependencies = []; }, 'DEPENDENCY_MISSING');
  blocked(({ observed }) => { observed.dependencies[0].commit = 'c'.repeat(40); }, 'DEPENDENCY_COMMIT_MISMATCH');
  blocked(({ observed }) => { observed.dependencies[0].published = false; }, 'DEPENDENCY_UNPUBLISHED');
  blocked(({ observed }) => { observed.dependencies[0].accepted = false; }, 'DEPENDENCY_UNACCEPTED');
});
test('published and accepted dependencies require supporting evidence identifiers', () => {
  blocked(({ observed }) => { delete observed.dependencies[0].publicationEvidenceId; }, 'INVALID_OBSERVED');
  blocked(({ observed }) => { delete observed.dependencies[0].acceptanceEvidenceId; }, 'INVALID_OBSERVED');
});
for (const path of ['../alpha', '/packages/alpha', 'packages/alpha/../beta', 'packages//alpha', 'packages/alpha/./src',
  'packages\\alpha', 'C:/alpha', 'packages/alpha/%2e%2e/beta', 'packages/alpha/', 'packages/alpha/**']) {
  test(`unsafe or noncanonical scope rejected: ${path}`, () => blocked(({ assignment }) => { assignment.scope = [path]; }, 'INVALID_ASSIGNMENT'));
}
test('scope cannot escape project through an adjacent prefix or root', () => {
  blocked(({ assignment }) => { assignment.scope = ['packages/alpha-other']; }, 'SCOPE_OUTSIDE_PROJECT');
  blocked(({ assignment }) => { assignment.scope = ['.']; }, 'SCOPE_OUTSIDE_PROJECT');
});
test('root directory profiles explicitly allow repository-relative paths', () => {
  const value = fixture(); value.profile.repository.directory = value.observed.repository.directory = '.';
  value.assignment.scope = ['qa/dispatch']; assert.equal(run(value).status, 'ready');
});
test('duplicate active assignment and parent/child scope overlap block', () => {
  blocked(({ observed }) => { observed.activeAssignments = [{ assignmentId: 'TASK-1', scope: ['other'], status: 'running' }]; }, 'DUPLICATE_ACTIVE_ASSIGNMENT');
  for (const scope of ['packages', 'packages/alpha/src/file.py']) blocked(({ observed }) => {
    observed.activeAssignments = [{ assignmentId: 'TASK-OTHER', scope: [scope], status: 'queued' }];
  }, 'ACTIVE_SCOPE_CONFLICT');
});
test('completed and independently scoped assignments do not block reusable work', () => {
  const value = fixture(); value.observed.activeAssignments = [
    { assignmentId: 'TASK-OLD', scope: ['packages/alpha'], status: 'completed' },
    { assignmentId: 'TASK-OTHER', scope: ['packages/beta'], status: 'running' }];
  assert.equal(run(value).status, 'ready');
});
test('authorization cannot be omitted, denied, or borrowed from another assignment', () => {
  blocked(({ observed }) => { observed.authorizations = []; }, 'EXECUTION_NOT_AUTHORIZED');
  blocked(({ assignment }) => { assignment.authorization.authorized = false; }, 'EXECUTION_NOT_AUTHORIZED');
  blocked(({ observed }) => { observed.authorizations[0].authorized = false; }, 'EXECUTION_NOT_AUTHORIZED');
  blocked(({ observed }) => { observed.authorizations[0].assignmentId = 'OTHER'; }, 'EXECUTION_NOT_AUTHORIZED');
});
test('native gate blocks only assignments requiring it; informational gates do not override it', () => {
  const value = fixture(); value.observed.gates = [
    { id: 'JON-90', passed: false, evidenceId: 'native-check-blocked' },
    { id: 'JON-84', passed: true, evidenceId: 'informational-only' }];
  assert.equal(run(value).status, 'ready'); value.assignment.requiredGates = ['JON-90'];
  assert.equal(run(value).status, 'blocked'); value.observed.gates[0].passed = true;
  assert.equal(run(value).status, 'ready');
});
test('assignment cannot omit profile gates; independent profiles remain eligible', () => {
  const value = fixture(); value.profile.requiredGates = ['JON-90']; value.assignment.requiredGates = [];
  value.observed.gates = [{ id: 'JON-90', passed: false, evidenceId: 'native-check-blocked' }];
  const report = run(value); assert.equal(report.status, 'blocked');
  assert.ok(report.failures.some(failure => failure.code === 'PREREQUISITE_GATE_UNSATISFIED'));
  assert.equal(run(fixture()).status, 'ready');
  value.observed.gates[0].passed = true; assert.equal(run(value).status, 'ready');
});
test('missing, malformed, ambiguous, and empty required schema fails closed', () => {
  for (const target of ['profile', 'assignment', 'observed']) blocked(value => { value[target] = null; }, `INVALID_${target.toUpperCase()}`);
  blocked(({ assignment }) => { assignment.scope = []; }, 'INVALID_ASSIGNMENT');
  blocked(({ assignment }) => { assignment.acceptanceCriteria = []; }, 'INVALID_ASSIGNMENT');
  blocked(({ assignment }) => { delete assignment.requiredPermissions; }, 'INVALID_ASSIGNMENT');
  blocked(({ observed }) => { observed.sources.push({ id: 'requirements', revision: 'other' }); }, 'INVALID_OBSERVED');
  blocked(({ profile }) => { profile.maxObservationAgeSeconds = Infinity; }, 'INVALID_PROFILE');
});

test('CLI returns ready/blocked/input-error exits and never rewrites evidence files', () => {
  const directory = mkdtempSync(join(tmpdir(), 'dispatch-gate-'));
  const script = fileURLToPath(new URL('./dispatch-gate.mjs', import.meta.url));
  try {
    const value = fixture(); value.observed.checkedAt = new Date().toISOString();
    const args = Object.entries(value).flatMap(([key, data]) => {
      const path = join(directory, `${key}.json`); writeFileSync(path, JSON.stringify(data)); return [`--${key}`, path];
    });
    const call = input => spawnSync(process.execPath, [script, ...input], { encoding: 'utf8' });
    let child = call(args); assert.equal(child.status, 0, child.stdout); assert.equal(JSON.parse(child.stdout).status, 'ready');
    assert.deepEqual(JSON.parse(readFileSync(join(directory, 'observed.json'), 'utf8')), value.observed);
    value.observed.base.commit = 'c'.repeat(40); writeFileSync(join(directory, 'observed.json'), JSON.stringify(value.observed));
    child = call(args); assert.equal(child.status, 1); assert.equal(JSON.parse(child.stdout).status, 'blocked');
    writeFileSync(join(directory, 'observed.json'), '{'); child = call(args); assert.equal(child.status, 2);
    assert.equal(JSON.parse(child.stdout).failures[0].code, 'INPUT_ERROR');
    child = call(args.concat('--profile', join(directory, 'profile.json'))); assert.equal(child.status, 2);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
