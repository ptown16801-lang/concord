#!/usr/bin/env node
/**
 * Read-only preflight, never a dispatcher or remote authorization mechanism.
 * The observer/runner must obtain and review evidence independently. Matching JSON
 * proves only snapshot consistency: it does not authenticate a snapshot, execute
 * commands, attest a Linear environment, or prevent changes after this check.
 * Scope containment is lexical; a runner must also resolve filesystem symlinks,
 * recheck target state, and enforce permissions at the actual write.
 */
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const TRUST_BOUNDARY = 'Reviewed snapshot consistency only; no remote verification, dispatch, or permission enforcement.';
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value)
  && [Object.prototype, null].includes(Object.getPrototypeOf(value));
const text = value => typeof value === 'string' && value.length > 0
  && value === value.trim() && !/[\x00-\x1f\x7f]/.test(value);
const version = value => Number.isSafeInteger(value) && value > 0;
const commit = value => typeof value === 'string' && /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/.test(value);
const branch = value => text(value) && !/^[/-]|[/.]$|\.\.|@\{|[\s~^:?*\[\\]|\/\//.test(value)
  && value !== '@' && value.split('/').every(part => !part.startsWith('.') && !part.endsWith('.lock'));
const safePath = value => text(value) && (value === '.' || (!/[\\:%*?\[\]{}]/.test(value)
  && value.split('/').every(part => part !== '' && part !== '.' && part !== '..')));
const within = (path, directory) => directory === '.' || path === directory || path.startsWith(`${directory}/`);
const overlap = (left, right) => within(left, right) || within(right, left);

export function validateDispatch(profile, assignment, observed, { now = Date.now() } = {}) {
  const failures = [];
  const fail = (code, path, message) => failures.push({ code, path, message });
  const result = () => ({ status: failures.length ? 'blocked' : 'ready',
    assignmentId: record(assignment) && text(assignment.assignmentId) ? assignment.assignmentId : null,
    failures, trustBoundary: TRUST_BOUNDARY });
  const check = (condition, code, path, message) => { if (!condition) fail(code, path, message); };
  function shape(value, name, fields) {
    const code = `INVALID_${name.split('.')[0].toUpperCase()}`;
    if (!record(value)) { fail(code, name, 'Expected a plain object.'); return; }
    for (const [key, predicate] of Object.entries(fields)) {
      check(predicate(value[key]), code, `${name}.${key}`, 'Missing or malformed required field.');
    }
  }
  function array(value, name, predicate, nonempty = false, uniqueKey = item => item) {
    const code = `INVALID_${name.split('.')[0].toUpperCase()}`;
    if (!Array.isArray(value)) { fail(code, name, 'Expected an explicit array.'); return; }
    check(!nonempty || value.length > 0, code, name, 'Array must not be empty.');
    const seen = new Set();
    value.forEach((item, index) => {
      check(predicate(item), code, `${name}[${index}]`, 'Malformed array entry.');
      if (predicate(item)) {
        const key = uniqueKey(item);
        check(!seen.has(key), code, `${name}[${index}]`, 'Duplicate array entry.');
        seen.add(key);
      }
    });
  }
  const identity = value => record(value) && ['workspaceId', 'teamId', 'projectId'].every(key => text(value[key]));
  const repository = value => record(value) && text(value.id) && text(value.fullName)
    && /^[^/\s]+\/[^/\s]+$/.test(value.fullName) && safePath(value.directory);
  const base = value => record(value) && branch(value.branch) && commit(value.commit);
  const runtime = value => record(value) && text(value.name) && text(value.version);
  const environment = value => record(value) && text(value.id);
  const source = value => record(value) && text(value.id) && text(value.revision);
  const dependency = value => record(value) && text(value.id) && commit(value.commit);

  shape(profile, 'profile', { schemaVersion: value => value === 1, profileId: text, profileVersion: version,
    project: identity, repository, base, runtime, environment,
    maxObservationAgeSeconds: value => version(value) && value <= 86400 });
  shape(assignment, 'assignment', { schemaVersion: value => value === 1, assignmentId: text,
    profileId: text, profileVersion: version, owner: text,
    authorization: value => record(value) && typeof value.authorized === 'boolean' && text(value.evidenceId) });
  shape(observed, 'observed', { schemaVersion: value => value === 1, profileId: text, profileVersion: version,
    checkedAt: value => text(value) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(value)
      && Number.isFinite(Date.parse(value)),
    project: identity, repository, base,
    runtime: value => runtime(value) && typeof value.verified === 'boolean',
    environment: value => environment(value) && typeof value.verified === 'boolean' });
  array(profile?.sources, 'profile.sources', source, true, item => item.id);
  array(profile?.requiredPermissions, 'profile.requiredPermissions', text);
  array(profile?.requiredGates, 'profile.requiredGates', text);
  array(assignment?.scope, 'assignment.scope', safePath, true);
  array(assignment?.requiredPermissions, 'assignment.requiredPermissions', text);
  array(assignment?.sourceIds, 'assignment.sourceIds', text, true);
  array(assignment?.dependencies, 'assignment.dependencies', dependency, false, item => item.id);
  array(assignment?.acceptanceCriteria, 'assignment.acceptanceCriteria', text, true);
  array(assignment?.deliverables, 'assignment.deliverables', text, true);
  array(assignment?.requiredGates, 'assignment.requiredGates', text);
  array(observed?.permissions, 'observed.permissions', text);
  array(observed?.sources, 'observed.sources', source, false, item => item.id);
  array(observed?.dependencies, 'observed.dependencies', item => dependency(item)
    && typeof item.published === 'boolean' && typeof item.accepted === 'boolean'
    && (!item.published || text(item.publicationEvidenceId))
    && (!item.accepted || text(item.acceptanceEvidenceId)), false, item => item.id);
  array(observed?.activeAssignments, 'observed.activeAssignments', item => record(item)
    && text(item.assignmentId) && ['queued', 'running', 'completed', 'failed', 'cancelled'].includes(item.status)
    && Array.isArray(item.scope) && item.scope.length > 0 && item.scope.every(safePath), false, item => item.assignmentId);
  array(observed?.authorizations, 'observed.authorizations', item => record(item) && text(item.evidenceId)
    && text(item.assignmentId) && typeof item.authorized === 'boolean', false, item => item.evidenceId);
  array(observed?.gates, 'observed.gates', item => record(item) && text(item.id)
    && typeof item.passed === 'boolean' && text(item.evidenceId), false, item => item.id);
  check(Number.isFinite(now), 'INVALID_CLOCK', 'now', 'A valid current timestamp is required.');
  if (failures.length) return result();

  for (const [name, candidate] of [['assignment', assignment], ['observed', observed]]) {
    check(candidate.profileId === profile.profileId, 'PROFILE_ID_MISMATCH', `${name}.profileId`, 'Profile identity differs.');
    check(candidate.profileVersion === profile.profileVersion, 'PROFILE_VERSION_MISMATCH', `${name}.profileVersion`, 'Revalidate the current profile version.');
  }
  for (const key of ['workspaceId', 'teamId', 'projectId']) {
    check(observed.project[key] === profile.project[key], 'PROJECT_IDENTITY_MISMATCH', `observed.project.${key}`, 'Project identity differs.');
  }
  for (const key of ['id', 'fullName', 'directory']) {
    check(observed.repository[key] === profile.repository[key], 'REPOSITORY_MISMATCH', `observed.repository.${key}`, 'Repository identity or directory differs.');
  }
  for (const key of ['branch', 'commit']) {
    check(observed.base[key] === profile.base[key], 'BASE_CHANGED', `observed.base.${key}`, 'Base reference changed; review and repin before dispatch.');
  }
  for (const key of ['name', 'version']) {
    check(observed.runtime[key] === profile.runtime[key], 'RUNTIME_MISMATCH', `observed.runtime.${key}`, 'Runtime differs from this project profile.');
  }
  check(observed.runtime.verified, 'RUNTIME_UNVERIFIED', 'observed.runtime.verified', 'Runtime verification is required.');
  check(observed.environment.id === profile.environment.id, 'ENVIRONMENT_MISMATCH', 'observed.environment.id', 'Execution environment differs.');
  check(observed.environment.verified, 'ENVIRONMENT_UNVERIFIED', 'observed.environment.verified', 'Environment verification is required.');
  const age = now - Date.parse(observed.checkedAt);
  check(age >= 0, 'OBSERVATION_IN_FUTURE', 'observed.checkedAt', 'Observation must not be future dated.');
  check(age <= profile.maxObservationAgeSeconds * 1000, 'OBSERVATION_STALE', 'observed.checkedAt', 'Refresh observations before dispatch.');

  assignment.scope.forEach((path, index) => check(within(path, profile.repository.directory),
    'SCOPE_OUTSIDE_PROJECT', `assignment.scope[${index}]`, 'Scope must remain inside the verified project directory.'));
  [...new Set([...profile.requiredPermissions, ...assignment.requiredPermissions])].forEach(permission => check(observed.permissions.includes(permission),
    'PERMISSION_MISSING', 'observed.permissions', `Missing required permission: ${permission}`));
  assignment.sourceIds.forEach(id => {
    const expected = profile.sources.find(item => item.id === id);
    const actual = observed.sources.find(item => item.id === id);
    check(Boolean(expected), 'SOURCE_UNPINNED', 'assignment.sourceIds', `No authoritative source pinned for: ${id}`);
    check(Boolean(actual), 'SOURCE_UNVERIFIED', 'observed.sources', `Missing source observation: ${id}`);
    if (expected && actual) check(actual.revision === expected.revision, 'SOURCE_CHANGED', 'observed.sources', `Source revision changed: ${id}`);
  });
  assignment.dependencies.forEach(expected => {
    const actual = observed.dependencies.find(item => item.id === expected.id);
    check(Boolean(actual), 'DEPENDENCY_MISSING', 'observed.dependencies', `Dependency not observed: ${expected.id}`);
    if (!actual) return;
    check(actual.commit === expected.commit, 'DEPENDENCY_COMMIT_MISMATCH', 'observed.dependencies', `Dependency commit differs: ${expected.id}`);
    check(actual.published, 'DEPENDENCY_UNPUBLISHED', 'observed.dependencies', `Dependency is not published: ${expected.id}`);
    check(actual.accepted, 'DEPENDENCY_UNACCEPTED', 'observed.dependencies', `Dependency has not been accepted: ${expected.id}`);
  });
  observed.activeAssignments.filter(item => ['queued', 'running'].includes(item.status)).forEach(active => {
    check(active.assignmentId !== assignment.assignmentId, 'DUPLICATE_ACTIVE_ASSIGNMENT', 'observed.activeAssignments', `Assignment already active: ${active.assignmentId}`);
    check(!active.scope.some(path => assignment.scope.some(target => overlap(path, target))),
      'ACTIVE_SCOPE_CONFLICT', 'observed.activeAssignments', `Scope conflicts with active work: ${active.assignmentId}`);
  });
  const authorization = observed.authorizations.find(item => item.evidenceId === assignment.authorization.evidenceId);
  check(assignment.authorization.authorized && authorization?.authorized === true
    && authorization.assignmentId === assignment.assignmentId, 'EXECUTION_NOT_AUTHORIZED',
    'assignment.authorization', 'Explicit authorization evidence must match this assignment.');
  [...new Set([...profile.requiredGates, ...assignment.requiredGates])].forEach(id => {
    const gate = observed.gates.find(item => item.id === id);
    check(gate?.passed === true, 'PREREQUISITE_GATE_UNSATISFIED', 'observed.gates', `Required gate is not passed: ${id}`);
  });
  return result();
}

function main(args) {
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node qa/dispatch/dispatch-gate.mjs --profile FILE --assignment FILE --observed FILE\nRead-only reviewed-snapshot validation. Exit 0: ready; 1: blocked; 2: input error.');
    return;
  }
  try {
    const options = new Map();
    for (let index = 0; index < args.length; index += 2) {
      const flag = args[index];
      if (!['--profile', '--assignment', '--observed'].includes(flag) || options.has(flag)
        || !args[index + 1] || args[index + 1].startsWith('--')) throw new Error('Supply each required input flag exactly once.');
      options.set(flag, args[index + 1]);
    }
    if (options.size !== 3) throw new Error('Required inputs: --profile FILE --assignment FILE --observed FILE.');
    const inputs = ['--profile', '--assignment', '--observed'].map(flag => {
      const path = options.get(flag);
      if (!statSync(path).isFile() || statSync(path).size > 1024 * 1024) throw new Error(`${flag} must name a regular JSON file no larger than 1 MiB.`);
      return JSON.parse(readFileSync(path, 'utf8'));
    });
    const report = validateDispatch(...inputs);
    console.log(JSON.stringify(report, null, 2));
    process.exitCode = report.status === 'ready' ? 0 : 1;
  } catch (error) {
    console.log(JSON.stringify({ status: 'blocked', assignmentId: null,
      failures: [{ code: 'INPUT_ERROR', path: 'cli', message: error.message }], trustBoundary: TRUST_BOUNDARY }, null, 2));
    process.exitCode = 2;
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main(process.argv.slice(2));
