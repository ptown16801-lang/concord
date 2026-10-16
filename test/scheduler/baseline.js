import { byId, compareIds } from "./order.js";

// This identifies the implementation used by the harness, not a fixture's
// requested candidate. Change the version when the baseline algorithm changes.
export const BASELINE_POLICY = Object.freeze({
  id: "synthetic-deterministic-baseline",
  version: "2",
  provenance: "test/scheduler/baseline.js#v2",
});

export function isEligible(agent, task, round, load = 0) {
  const available = agent.availableRounds === undefined || agent.availableRounds.includes(round);
  return available && load < agent.capacity && task.requiredQualifications.every(q => agent.qualifications.includes(q)) && agent.authorizations.includes(task.domain);
}

export function deterministicBaseline({ agents, tasks, round, history }) {
  const result = Object.create(null);
  const load = Object.fromEntries(agents.map(a => [a.id, 0]));
  const projectedHistory = { ...history };
  for (const task of byId(tasks)) {
    const incumbent = task.incumbent && agents.find(a => a.id === task.incumbent);
    if (incumbent && isEligible(incumbent, task, round, load[incumbent.id])) {
      result[task.id] = incumbent.id; load[incumbent.id]++; projectedHistory[incumbent.id]++;
    }
  }
  for (const task of byId(tasks)) {
    if (Object.hasOwn(result, task.id)) continue;
    const eligible = agents.filter(a => isEligible(a, task, round, load[a.id])).sort((a, b) =>
      (projectedHistory[a.id] ?? 0) - (projectedHistory[b.id] ?? 0) || compareIds(a.id, b.id));
    const selected = eligible[0];
    result[task.id] = selected?.id ?? null;
    if (selected) { load[selected.id]++; projectedHistory[selected.id]++; }
  }
  return result;
}
