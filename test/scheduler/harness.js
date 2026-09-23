import { deepFreeze, validateScenario } from "./fixtures.js";
import { deterministicBaseline, isEligible } from "./baseline.js";

const byId = values => [...values].sort((a, b) => a.id.localeCompare(b.id));

function applyChange(state, change) {
  if (change.type === "policy") state.policy = structuredClone(change.policy);
  else if (change.type === "cancel-task") state.tasks.find(t => t.id === change.taskId).cancelled = true;
  else if (change.type === "task-domain") state.tasks.find(t => t.id === change.taskId).domain = change.value;
  else {
    const agent = state.agents.find(a => a.id === change.agentId);
    if (change.type === "availability") agent.availableRounds = structuredClone(change.value);
    else agent[change.type] = structuredClone(change.value);
  }
  state.authorityVersion++;
}

export async function simulateScenario({ scenario, proposeAssignments, checkAssignments }) {
  const source = validateScenario(scenario);
  const state = {
    agents: structuredClone(source.agents),
    tasks: source.tasks.map(t => ({ ...structuredClone(t), arrivalRound: t.arrivalRound ?? 0, remaining: t.durationRounds, incumbent: t.incumbent ?? null })),
    policy: structuredClone(source.policy), authorityVersion: 0,
  };
  const history = Object.fromEntries(state.agents.map(a => [a.id, 0]));
  const trace = [];
  for (let round = 0; round < source.roundCount; round++) {
    for (const change of (source.authoritativeChanges ?? []).filter(c => c.round === round).sort((a,b) => a.provenance.localeCompare(b.provenance))) applyChange(state, change);
    const active = byId(state.tasks.filter(t => !t.cancelled && t.arrivalRound <= round && t.remaining > 0));
    const snapshot = deepFreeze(structuredClone({ round, agents: state.agents, tasks: active, policy: state.policy, authorityVersion: state.authorityVersion }));
    const baseline = deterministicBaseline({ agents: state.agents, tasks: active, round, history });
    let proposals;
    let policyFailure = null;
    try {
      proposals = proposeAssignments ? await proposeAssignments(snapshot) : baseline;
      if (!proposals || typeof proposals !== "object" || Array.isArray(proposals)) throw new TypeError("invalid policy proposal");
      proposals = deepFreeze(structuredClone(proposals));
    } catch {
      policyFailure = "policy-failed";
      proposals = baseline;
    }
    const load = Object.fromEntries(state.agents.map(a => [a.id, 0]));
    const records = [];
    for (const task of active) {
      const proposedAgentId = proposals[task.id] ?? null;
      const proposal = deepFreeze({ id: `${round}:${task.id}`, round, taskId: task.id, agentId: proposedAgentId, policy: structuredClone(state.policy) });
      let checker;
      try { checker = await checkAssignments(proposal, snapshot); }
      catch (error) { checker = { outcome: "failed", reason: error?.code ?? "checker-error" }; }
      if (!checker || !["approved", "rejected", "failed"].includes(checker.outcome)) checker = { outcome: "failed", reason: "invalid-checker-response" };
      // A deterministic proposer is never a substitute for checker authority.
      // This initial harness has no essential-continuity exemption or standby.
      let agentId = checker.outcome === "approved" ? proposedAgentId : null;
      const agent = state.agents.find(a => a.id === agentId);
      if (agentId !== null && (!agent || !isEligible(agent, task, round, load[agentId]))) agentId = null;
      if (agentId !== null) load[agentId]++;
      const previous = task.incumbent;
      const continuation = previous !== null && previous === agentId;
      const handoff = previous !== null && agentId !== null && previous !== agentId;
      if (agentId !== null) { task.remaining--; task.incumbent = agentId; history[agentId]++; }
      records.push({ taskId: task.id, proposedAgentId, checker: { outcome: checker.outcome, reason: checker.reason ?? null }, appliedAgentId: agentId, source: agentId === null ? "none" : policyFailure ? "deterministic-fallback" : "candidate", policyFailure, fallbackProposedAgentId: checker.outcome === "failed" ? baseline[task.id] : null, continuation, handoff, completed: task.remaining === 0, remaining: task.remaining, gap: agentId === null ? (checker.outcome === "failed" ? "checker-unavailable" : checker.outcome === "rejected" ? "checker-rejected" : "capacity-or-eligibility") : null, waitRounds: agentId === null ? round - task.arrivalRound + 1 : 0, deadlineRound: task.deadlineRound ?? null, urgency: task.urgency ?? null });
    }
    trace.push({ round, authorityVersion: state.authorityVersion, policy: structuredClone(state.policy), records });
  }
  return deepFreeze({ scenarioId: source.id, rounds: trace, history: Object.fromEntries(Object.entries(history).sort()) });
}

export const approvingChecker = proposal => ({ outcome: "approved", reason: proposal.agentId === null ? "explicit-gap" : "synthetic-approved" });
