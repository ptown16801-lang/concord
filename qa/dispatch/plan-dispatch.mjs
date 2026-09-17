/**
 * Pure dispatch planner for reviewed Linear snapshots.
 *
 * The caller is responsible for obtaining fresh provider data, atomically
 * reserving selected work, and rechecking state before applying any proposal.
 */

export const PREFERRED_WORK = Object.freeze([
  'design',
  'specification',
  'research',
  'architecture',
  'audit',
  'integration-planning',
  'project-management',
]);

const ACTIVE_STATES = new Set(['queued', 'started', 'review']);
const TERMINAL_STATES = new Set(['completed', 'canceled', 'duplicate']);
const EXCLUDED_SUBSYSTEMS = new Set(['finger-deployable-beta', 'quiz', 'adaptive-curriculum']);
const text = value => typeof value === 'string' && value.trim() === value && value.length > 0;
const scopeContains = (left, right) => left === right || right.startsWith(`${left}/`);
const scopeOverlaps = (left, right) => scopeContains(left, right) || scopeContains(right, left);
const scopesOverlap = (left, right) => left.some(a => right.some(b => scopeOverlaps(a, b)));

function malformed(snapshot) {
  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)
    || snapshot.schemaVersion !== 1 || snapshot.project !== 'Concord'
    || !Array.isArray(snapshot.issues) || !Array.isArray(snapshot.activeWork)) return true;
  const identifiers = new Set();
  for (const issue of snapshot.issues) {
    if (!issue || !text(issue.id) || identifiers.has(issue.id) || !text(issue.title)
      || !text(issue.project) || !text(issue.stateType) || !text(issue.workKind)
      || !Array.isArray(issue.scope) || issue.scope.length === 0 || !issue.scope.every(text)
      || !Array.isArray(issue.dependencies)) return true;
    identifiers.add(issue.id);
    if (!issue.dependencies.every(dependency => dependency && text(dependency.id)
      && (dependency.appliesTo === undefined || (Array.isArray(dependency.appliesTo)
        && dependency.appliesTo.length > 0 && dependency.appliesTo.every(text))))) return true;
  }
  return snapshot.activeWork.some(work => !work || !text(work.issueId)
    || !['queued', 'running', 'reviewing'].includes(work.status)
    || !Array.isArray(work.scope) || work.scope.length === 0 || !work.scope.every(text));
}

function preference(issue) {
  const kind = PREFERRED_WORK.indexOf(issue.workKind);
  return [kind === -1 ? PREFERRED_WORK.length : kind, issue.priority ?? 4, issue.id];
}

function compare(left, right) {
  const a = preference(left), b = preference(right);
  return a[0] - b[0] || a[1] - b[1] || a[2].localeCompare(b[2], 'en');
}

/**
 * Return proposals, never provider mutations. An unresolved dependency only
 * blocks the work kinds named by `appliesTo`; omitting it means all work.
 */
export function planDispatch(snapshot) {
  if (malformed(snapshot)) return {
    outcome: 'blocked', actions: [], skipped: [], blockers: [{ code: 'INVALID_SNAPSHOT' }],
  };

  const byId = new Map(snapshot.issues.map(issue => [issue.id, issue]));
  const actions = [];
  const skipped = [];
  const candidates = [];
  const reserved = snapshot.activeWork.map(work => ({ issueId: work.issueId, scope: work.scope }));

  for (const issue of snapshot.issues) {
    const skip = reason => skipped.push({ issueId: issue.id, reason });
    if (issue.project !== 'Concord') { skip('OUTSIDE_PROJECT'); continue; }
    if (TERMINAL_STATES.has(issue.stateType) || issue.retired) { skip('TERMINAL_OR_RETIRED'); continue; }
    if (EXCLUDED_SUBSYSTEMS.has(issue.subsystem)) { skip('EXCLUDED_SUBSYSTEM'); continue; }
    if (issue.ownerDeferred) { skip('OWNER_DEFERRED'); continue; }
    if (issue.canonicalIssueId && issue.canonicalIssueId !== issue.id) { skip('NONCANONICAL_DUPLICATE'); continue; }

    const active = snapshot.activeWork.find(work => work.issueId === issue.id);
    if (active) {
      actions.push({ type: 'continue', issueId: issue.id, activeStatus: active.status });
      continue;
    }

    if (issue.transitionEvidence?.evidenceId && issue.transitionEvidence?.targetState) {
      actions.push({ type: 'advance', issueId: issue.id, targetState: issue.transitionEvidence.targetState,
        evidenceId: issue.transitionEvidence.evidenceId });
      continue;
    }

    if (ACTIVE_STATES.has(issue.stateType)) { skip('ACTIVE_WITHOUT_DELEGATE'); continue; }
    if (issue.ownerDecisionRequired) {
      if (!issue.ownerGateId) actions.push({ type: 'owner-gate', issueId: issue.id, decision: issue.ownerDecision });
      else skip('OWNER_GATE_OPEN');
      continue;
    }
    if (issue.workKind === 'implementation' && !issue.implementationAuthorized) {
      skip('IMPLEMENTATION_NOT_AUTHORIZED');
      continue;
    }

    const unresolved = issue.dependencies.filter(dependency => {
      if (dependency.appliesTo && !dependency.appliesTo.includes(issue.workKind)) return false;
      const prerequisite = byId.get(dependency.id);
      return !prerequisite || prerequisite.stateType !== 'completed';
    });
    if (unresolved.length) {
      skipped.push({ issueId: issue.id, reason: 'UNRESOLVED_PREREQUISITE', dependencies: unresolved.map(item => item.id) });
      continue;
    }
    candidates.push(issue);
  }

  for (const issue of candidates.sort(compare)) {
    const conflict = reserved.find(active => active.issueId === issue.id || scopesOverlap(active.scope, issue.scope));
    if (conflict) {
      skipped.push({ issueId: issue.id, reason: conflict.issueId === issue.id ? 'DUPLICATE_ACTIVE_WORK' : 'SCOPE_CONFLICT',
        conflictingIssueId: conflict.issueId });
      continue;
    }
    actions.push({ type: 'dispatch', issueId: issue.id, workKind: issue.workKind, scope: [...issue.scope] });
    reserved.push({ issueId: issue.id, scope: issue.scope });
  }

  const useful = actions.some(action => ['continue', 'dispatch', 'advance'].includes(action.type));
  const blockers = useful ? [] : skipped.map(item => ({ issueId: item.issueId, code: item.reason }));
  return { outcome: useful ? 'successful' : 'blocked', actions, skipped, blockers };
}
