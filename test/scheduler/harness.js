import { deepFreeze, validateScenario } from "./fixtures.js";
import { BASELINE_POLICY, deterministicBaseline, isEligible } from "./baseline.js";
import { byId, compareIds } from "./order.js";

function checkerEvidence(result) {
  // Copy at the boundary. Never store checker-owned values in historical records.
  const copy = structuredClone(result);
  if (!copy || typeof copy !== "object" || Array.isArray(copy)
      || !["approved", "rejected", "failed"].includes(copy.outcome)
      || (copy.reason !== undefined && copy.reason !== null && typeof copy.reason !== "string")) {
    return Object.freeze({ outcome: "failed", reason: "invalid-checker-response" });
  }
  return Object.freeze({ outcome: copy.outcome, reason: copy.reason ?? null });
}

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
    tasks: source.tasks.map(t => ({ ...structuredClone(t), arrivalRound: t.arrivalRound ?? 0, remaining: t.durationRounds, incumbent: t.incumbent ?? null, waitRounds: 0, totalWaitRounds: 0 })),
    policy: structuredClone(source.policy), authorityVersion: 0,
  };
  const history = Object.fromEntries(state.agents.map(a => [a.id, 0]));
  const trace = [];
  for (let round = 0; round < source.roundCount; round++) {
    // Validation rejects same-field conflicts. This order only canonicalizes
    // independent writes; provenance spelling never chooses authority precedence.
    const changes = (source.authoritativeChanges ?? []).filter(c => c.round === round)
      .sort((a, b) => compareIds(a.provenance, b.provenance));
    for (const change of changes) applyChange(state, change);
    const active = byId(state.tasks.filter(t => !t.cancelled && t.arrivalRound <= round && t.remaining > 0));
    const snapshot = deepFreeze(structuredClone({ round, agents: byId(state.agents), tasks: active, policy: state.policy, authorityVersion: state.authorityVersion }));
    const baseline = deterministicBaseline({ agents: state.agents, tasks: active, round, history });
    let proposals;
    let policyFailure = null;
    const requestedPolicy = deepFreeze(structuredClone(state.policy));
    let executedPolicy = proposeAssignments ? requestedPolicy : BASELINE_POLICY;
    try {
      proposals = proposeAssignments ? await proposeAssignments(snapshot) : baseline;
      if (!proposals || typeof proposals !== "object" || Array.isArray(proposals)) throw new TypeError("invalid policy proposal");
      proposals = deepFreeze(structuredClone(proposals));
    } catch {
      policyFailure = "policy-failed";
      proposals = baseline;
      executedPolicy = BASELINE_POLICY;
    }
    const checkerSnapshot = deepFreeze({ ...snapshot, policy: executedPolicy, requestedPolicy });
    const load = Object.fromEntries(state.agents.map(a => [a.id, 0]));
    const records = [];
    for (const task of active) {
      const proposedAgentId = Object.hasOwn(proposals, task.id) ? proposals[task.id] ?? null : null;
      const proposal = deepFreeze({ id: `${round}:${task.id}`, round, taskId: task.id, agentId: proposedAgentId, policy: executedPolicy, requestedPolicy });
      let checker;
      try { checker = checkerEvidence(await checkAssignments(proposal, checkerSnapshot)); }
      catch { checker = Object.freeze({ outcome: "failed", reason: "checker-error" }); }
      // A deterministic proposer is never a substitute for checker authority.
      // This initial harness has no essential-continuity exemption or standby.
      let agentId = checker.outcome === "approved" ? proposedAgentId : null;
      const agent = state.agents.find(a => a.id === agentId);
      if (agentId !== null && (!agent || !isEligible(agent, task, round, load[agentId]))) agentId = null;
      if (agentId !== null) load[agentId]++;
      const previous = task.incumbent;
      const continuation = previous !== null && previous === agentId;
      const handoff = previous !== null && agentId !== null && previous !== agentId;
      if (agentId !== null) {
        task.remaining--; task.incumbent = agentId; history[agentId]++;
        task.waitRounds = 0;
      } else {
        task.waitRounds++; task.totalWaitRounds++;
      }
      records.push(deepFreeze({
        taskId: task.id, proposedAgentId, checker, appliedAgentId: agentId,
        source: agentId === null ? "none" : policyFailure ? "deterministic-fallback" : proposeAssignments ? "candidate" : "baseline",
        policyFailure,
        fallbackProposal: checker.outcome === "failed" ? { agentId: baseline[task.id], policy: BASELINE_POLICY } : null,
        continuation, handoff, completed: task.remaining === 0, remaining: task.remaining,
        gap: agentId === null ? (checker.outcome === "failed" ? "checker-unavailable" : checker.outcome === "rejected" ? "checker-rejected" : "capacity-or-eligibility") : null,
        waitRounds: task.waitRounds, totalWaitRounds: task.totalWaitRounds,
        ageRounds: round - task.arrivalRound + 1,
        deadlineRound: task.deadlineRound ?? null, urgency: task.urgency ?? null,
      }));
    }
    trace.push(deepFreeze({
      round, authorityVersion: state.authorityVersion,
      requestedPolicy, executedPolicy,
      authoritativeChanges: structuredClone(changes), records,
    }));
  }
  return deepFreeze({ scenarioId: source.id, rounds: trace, history: Object.fromEntries(Object.entries(history).sort()) });
}

export const approvingChecker = proposal => ({ outcome: "approved", reason: proposal.agentId === null ? "explicit-gap" : "synthetic-approved" });
