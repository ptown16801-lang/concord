const sorted = values => [...values].sort((a, b) => a.id.localeCompare(b.id));

export function isEligible(agent, task, round, load = 0) {
  const available = agent.availableRounds === undefined || agent.availableRounds.includes(round);
  return available && load < agent.capacity && task.requiredQualifications.every(q => agent.qualifications.includes(q)) && agent.authorizations.includes(task.domain);
}

export function deterministicBaseline({ agents, tasks, round, history, assignments }) {
  const result = {};
  const load = Object.fromEntries(agents.map(a => [a.id, 0]));
  for (const task of sorted(tasks)) {
    const incumbent = task.incumbent && agents.find(a => a.id === task.incumbent);
    if (incumbent && isEligible(incumbent, task, round, load[incumbent.id])) {
      result[task.id] = incumbent.id; load[incumbent.id]++; continue;
    }
    const eligible = agents.filter(a => isEligible(a, task, round, load[a.id])).sort((a, b) =>
      (history[a.id] ?? 0) - (history[b.id] ?? 0) || a.id.localeCompare(b.id));
    const selected = eligible[0];
    result[task.id] = selected?.id ?? null;
    if (selected) load[selected.id]++;
  }
  return result;
}
