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

function fields(value, allowed, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new TypeError(`${label} must be an object`);
  for (const key of Object.keys(value)) if (!allowed.includes(key)) throw new TypeError(`${label}.${key} is outside the synthetic schema`);
}

function strings(value, label) {
  if (!Array.isArray(value)) throw new TypeError(`${label} must be an array`);
  for (const item of value) requireId(item, label);
}

function policyRecord(policy, registry) {
  fields(policy, ["id", "version", "provenance"], "policy");
  for (const key of ["id", "version", "provenance"]) requireId(policy[key], `policy ${key}`);
  const key = JSON.stringify([policy.id, policy.version]);
  if (registry.has(key) && registry.get(key) !== policy.provenance) throw new TypeError("policy version cannot change provenance");
  registry.set(key, policy.provenance);
}

export function validateScenario(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new TypeError("scenario must be an object");
  for (const key of Object.keys(input)) if (OUT_OF_SCOPE.has(key)) throw new TypeError(`${key} is outside the agent-to-work harness scope`);
  fields(input, ["id", "roundCount", "policy", "agents", "tasks", "authoritativeChanges"], "scenario");
  requireId(input.id, "scenario id");
  if (!Number.isInteger(input.roundCount) || input.roundCount < 1) throw new TypeError("roundCount must be a positive integer");
  const policies = new Map();
  policyRecord(input.policy, policies);
  if (!Array.isArray(input.agents) || !Array.isArray(input.tasks)) throw new TypeError("agents and tasks must be arrays");
  const agentIds = unique(input.agents, "agent");
  const taskIds = unique(input.tasks, "task");
  for (const agent of input.agents) {
    fields(agent, ["id", "qualifications", "authorizations", "capacity", "availableRounds"], "agent");
    strings(agent.qualifications, "qualifications"); strings(agent.authorizations, "authorizations");
    if (!Array.isArray(agent.qualifications) || !Array.isArray(agent.authorizations)) throw new TypeError(`agent ${agent.id} requires qualifications and authorizations`);
    if (!Number.isInteger(agent.capacity) || agent.capacity < 1) throw new TypeError(`agent ${agent.id} capacity must be positive integer`);
    if (agent.availableRounds !== undefined && (!Array.isArray(agent.availableRounds) || agent.availableRounds.some(r => !Number.isInteger(r) || r < 0))) throw new TypeError(`agent ${agent.id} availableRounds is invalid`);
  }
  for (const task of input.tasks) {
    fields(task, ["id", "requiredQualifications", "domain", "durationRounds", "arrivalRound", "deadlineRound", "incumbent", "urgency"], "task");
    strings(task.requiredQualifications, "requiredQualifications"); requireId(task.domain, "domain");
    if (task.urgency !== undefined) requireId(task.urgency, "urgency");
    if (!Array.isArray(task.requiredQualifications) || typeof task.domain !== "string") throw new TypeError(`task ${task.id} requirements are invalid`);
    if (!Number.isInteger(task.durationRounds) || task.durationRounds < 1) throw new TypeError(`task ${task.id} durationRounds must be positive integer`);
    if (!Number.isInteger(task.arrivalRound ?? 0) || (task.arrivalRound ?? 0) < 0) throw new TypeError(`task ${task.id} arrivalRound is invalid`);
    if (task.deadlineRound !== undefined && (!Number.isInteger(task.deadlineRound) || task.deadlineRound < 0)) throw new TypeError(`task ${task.id} deadlineRound is invalid`);
    if (task.incumbent !== undefined && !agentIds.has(task.incumbent)) throw new TypeError(`unknown incumbent ${task.incumbent}`);
    if ("inferredDeadline" in task) throw new TypeError("deadlines must be externally supplied fixture inputs");
  }
  const changes = input.authoritativeChanges ?? [];
  if (!Array.isArray(changes)) throw new TypeError("authoritativeChanges must be an array");
  const changeIds = new Set();
  for (const change of changes) {
    const extra = change.type === "policy" ? ["policy"] : change.type === "cancel-task" ? ["taskId"] : change.type === "task-domain" ? ["taskId", "value"] : ["agentId", "value"];
    fields(change, ["round", "type", "provenance", ...extra], "change");
    if (!Number.isInteger(change.round) || change.round < 0 || change.round >= input.roundCount) throw new TypeError("authoritative change round is invalid");
    requireId(change.provenance, "authoritative change provenance");
    if (changeIds.has(change.provenance)) throw new TypeError("duplicate authoritative change provenance");
    changeIds.add(change.provenance);
    if (change.type === "availability" && (!Array.isArray(change.value) || change.value.some(r => !Number.isInteger(r) || r < 0))) throw new TypeError("invalid availability change");
    if (["qualifications", "authorizations"].includes(change.type)) strings(change.value, change.type);
    if (change.type === "task-domain") requireId(change.value, "task domain change");
    if (["availability", "qualifications", "authorizations"].includes(change.type) && !agentIds.has(change.agentId)) throw new TypeError(`unknown agent ${change.agentId}`);
    if (["task-domain", "cancel-task"].includes(change.type) && !taskIds.has(change.taskId)) throw new TypeError(`unknown task ${change.taskId}`);
    if (change.type === "policy") {
      policyRecord(change.policy, policies);
    } else if (!["availability", "qualifications", "authorizations", "task-domain", "cancel-task"].includes(change.type)) throw new TypeError(`unknown authoritative change type: ${change.type}`);
  }
  return deepFreeze(clone(input));
}
