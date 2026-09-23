const OUT_OF_SCOPE = new Set([
  "assets", "money", "barter", "marketplace", "coins", "resources",
  "personalData", "productionData",
]);

export function clone(value) {
  return structuredClone(value);
}

export function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function requireId(value, label) {
  if (typeof value !== "string" || value.length === 0) throw new TypeError(`${label} must be a non-empty string`);
}

function unique(items, label) {
  const ids = new Set();
  for (const item of items) {
    requireId(item.id, `${label} id`);
    if (ids.has(item.id)) throw new TypeError(`duplicate ${label} id: ${item.id}`);
    ids.add(item.id);
  }
  return ids;
}

export function validateScenario(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new TypeError("scenario must be an object");
  for (const key of Object.keys(input)) if (OUT_OF_SCOPE.has(key)) throw new TypeError(`${key} is outside the agent-to-work harness scope`);
  requireId(input.id, "scenario id");
  if (!Number.isInteger(input.roundCount) || input.roundCount < 1) throw new TypeError("roundCount must be a positive integer");
  if (!input.policy || typeof input.policy !== "object") throw new TypeError("policy is required");
  requireId(input.policy.id, "policy id"); requireId(input.policy.version, "policy version"); requireId(input.policy.provenance, "policy provenance");
  if (!Array.isArray(input.agents) || !Array.isArray(input.tasks)) throw new TypeError("agents and tasks must be arrays");
  const agentIds = unique(input.agents, "agent");
  const taskIds = unique(input.tasks, "task");
  for (const agent of input.agents) {
    if (!Array.isArray(agent.qualifications) || !Array.isArray(agent.authorizations)) throw new TypeError(`agent ${agent.id} requires qualifications and authorizations`);
    if (!Number.isInteger(agent.capacity) || agent.capacity < 1) throw new TypeError(`agent ${agent.id} capacity must be positive integer`);
    if (agent.availableRounds !== undefined && (!Array.isArray(agent.availableRounds) || agent.availableRounds.some(r => !Number.isInteger(r) || r < 0))) throw new TypeError(`agent ${agent.id} availableRounds is invalid`);
  }
  for (const task of input.tasks) {
    if (!Array.isArray(task.requiredQualifications) || typeof task.domain !== "string") throw new TypeError(`task ${task.id} requirements are invalid`);
    if (!Number.isInteger(task.durationRounds) || task.durationRounds < 1) throw new TypeError(`task ${task.id} durationRounds must be positive integer`);
    if (!Number.isInteger(task.arrivalRound ?? 0) || (task.arrivalRound ?? 0) < 0) throw new TypeError(`task ${task.id} arrivalRound is invalid`);
    if (task.deadlineRound !== undefined && (!Number.isInteger(task.deadlineRound) || task.deadlineRound < 0)) throw new TypeError(`task ${task.id} deadlineRound is invalid`);
    if (task.incumbent !== undefined && !agentIds.has(task.incumbent)) throw new TypeError(`unknown incumbent ${task.incumbent}`);
    if ("inferredDeadline" in task) throw new TypeError("deadlines must be externally supplied fixture inputs");
  }
  const changes = input.authoritativeChanges ?? [];
  if (!Array.isArray(changes)) throw new TypeError("authoritativeChanges must be an array");
  for (const change of changes) {
    if (!Number.isInteger(change.round) || change.round < 0 || change.round >= input.roundCount) throw new TypeError("authoritative change round is invalid");
    requireId(change.provenance, "authoritative change provenance");
    if (["availability", "qualifications", "authorizations"].includes(change.type) && !agentIds.has(change.agentId)) throw new TypeError(`unknown agent ${change.agentId}`);
    if (["task-domain", "cancel-task"].includes(change.type) && !taskIds.has(change.taskId)) throw new TypeError(`unknown task ${change.taskId}`);
    if (change.type === "policy") {
      if (!change.policy) throw new TypeError("policy change requires policy");
      requireId(change.policy.id, "policy id"); requireId(change.policy.version, "policy version"); requireId(change.policy.provenance, "policy provenance");
    } else if (!["availability", "qualifications", "authorizations", "task-domain", "cancel-task"].includes(change.type)) throw new TypeError(`unknown authoritative change type: ${change.type}`);
  }
  return deepFreeze(clone(input));
}
