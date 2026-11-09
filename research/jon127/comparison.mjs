import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { simulateScenario, approvingChecker } from '../../test/scheduler/harness.js';
import { isEligible } from '../../test/scheduler/baseline.js';

// Offline, hand-authored rule for a bounded comparison. It has no authority.
function waitingFirst(snapshot) {
  const assignments = Object.create(null);
  const load = Object.fromEntries(snapshot.agents.map(a => [a.id, 0]));
  const order = (a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  const tasks = [...snapshot.tasks].sort((a, b) =>
    b.waitRounds - a.waitRounds || order(a, b));
  for (const task of tasks) {
    const incumbent = snapshot.agents.find(a => a.id === task.incumbent);
    const selected = incumbent && isEligible(incumbent, task, snapshot.round, load[incumbent.id])
      ? incumbent
      : [...snapshot.agents].sort(order)
          .find(a => isEligible(a, task, snapshot.round, load[a.id]));
    assignments[task.id] = selected?.id ?? null;
    if (selected) load[selected.id]++;
  }
  return assignments;
}

const agent = (id, extra = {}) => ({ id, qualifications: ['general'], authorizations: ['public'], capacity: 1, ...extra });
const task = (id, extra = {}) => ({ id, requiredQualifications: ['general'], domain: 'public', durationRounds: 1, ...extra });
const basePolicy = { id: 'synthetic-request', version: '1', provenance: 'JON-127-comparison-2026-11-01' };
const candidatePolicy = { id: 'offline-waiting-first', version: '1', provenance: 'JON-127-comparison-2026-11-01:hand-authored' };
const cases = [
  { id: 'normal', roundCount: 2, agents: [agent('a'), agent('b')], tasks: [task('one'), task('two')], authoritativeChanges: [] },
  { id: 'overload', roundCount: 5, agents: [agent('a')], tasks: [task('a-long', { durationRounds: 3 }), task('z-wait')], authoritativeChanges: [] },
  { id: 'scarce-protected', roundCount: 2, agents: [agent('public'), agent('protected', { authorizations: ['protected', 'public'], qualifications: ['general', 'special'] })], tasks: [task('private', { domain: 'protected', requiredQualifications: ['special'] }), task('public')], authoritativeChanges: [] },
  { id: 'starvation-handoff', roundCount: 5, agents: [agent('a', { qualifications: ['general', 'special'] }), agent('b')], tasks: [task('a-long', { durationRounds: 3, incumbent: 'a' }), task('z-wait', { requiredQualifications: ['special'] })], authoritativeChanges: [] },
  { id: 'authority-change', roundCount: 3, agents: [agent('a'), agent('b')], tasks: [task('continuing', { durationRounds: 3, incumbent: 'a' })], authoritativeChanges: [{ round: 1, type: 'availability', agentId: 'a', value: [], provenance: 'fixture:a-unavailable' }] },
  { id: 'checker-outage', roundCount: 3, agents: [agent('a')], tasks: [task('continuing', { durationRounds: 3 })], authoritativeChanges: [] },
  { id: 'candidate-failure', roundCount: 2, agents: [agent('a')], tasks: [task('work', { durationRounds: 2 })], authoritativeChanges: [] },
];

function summary(trace) {
  const records = trace.rounds.flatMap(r => r.records.map(x => ({ round: r.round, ...x })));
  const service = records.filter(r => r.appliedAgentId !== null);
  const firstService = Object.fromEntries([...new Set(records.map(r => r.taskId))].map(id => [id, service.find(r => r.taskId === id)?.round ?? null]));
  return {
    assignments: service.length,
    completed: records.filter(r => r.completed).length,
    unassignedTaskRounds: records.filter(r => r.appliedAgentId === null).length,
    continuations: records.filter(r => r.continuation).length,
    handoffs: records.filter(r => r.handoff).length,
    maxTotalWaitRounds: Math.max(0, ...records.map(r => r.totalWaitRounds)),
    firstService,
    agentAssignments: trace.history,
    checkerRejections: records.filter(r => r.checker.outcome === 'rejected').length,
    checkerFailures: records.filter(r => r.checker.outcome === 'failed').length,
    recordSequence: records.map(r => [r.round, r.taskId, r.appliedAgentId, r.remaining, r.gap]),
  };
}

const results = [];
for (const fixture of cases) {
  const checker = fixture.id === 'checker-outage'
    ? (proposal) => proposal.round === 1 ? { outcome: 'failed', reason: 'synthetic-checker-outage' } : approvingChecker(proposal)
    : approvingChecker;
  const propose = fixture.id === 'candidate-failure'
    ? (snapshot) => snapshot.round === 1 ? (() => { throw new Error('synthetic candidate failure'); })() : waitingFirst(snapshot)
    : waitingFirst;
  const baseline = await simulateScenario({ scenario: { ...fixture, policy: basePolicy }, checkAssignments: checker });
  const candidate = await simulateScenario({ scenario: { ...fixture, policy: candidatePolicy }, proposeAssignments: propose, checkAssignments: checker });
  for (const trace of [baseline, candidate]) {
    assert.equal(trace.rounds.flatMap(r => r.records).filter(r => r.checker.outcome !== 'approved' && r.appliedAgentId !== null).length, 0);
  }
  results.push({ id: fixture.id, baseline: summary(baseline), waitingFirst: summary(candidate) });
}
const evidence = { sourceRevision: 'e4b979dea42e606bc8ac0b64b458bb084d8ad3a6', purpose: 'Synthetic offline comparison only; no lawful urgency ranking, GP, LLM, approved policy selection, real checker, shadow run, or canary.', results };
const json = JSON.stringify(evidence, null, 2) + '\n';
writeFileSync(new URL('./comparison-results.json', import.meta.url), json);
console.log(JSON.stringify({ sha256: createHash('sha256').update(json).digest('hex'), results: results.map(({id, baseline, waitingFirst}) => ({id, baseline: {completed: baseline.completed, handoffs: baseline.handoffs, maxWait: baseline.maxTotalWaitRounds, firstService: baseline.firstService}, waitingFirst: {completed: waitingFirst.completed, handoffs: waitingFirst.handoffs, maxWait: waitingFirst.maxTotalWaitRounds, firstService: waitingFirst.firstService}})) }, null, 2));
