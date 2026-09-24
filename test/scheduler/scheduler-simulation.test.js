import test from "node:test";
import assert from "node:assert/strict";
import { approvingChecker, simulateScenario } from "./harness.js";
import { validateScenario } from "./fixtures.js";

const policy = { id: "baseline", version: "1", provenance: "fixture:policy-1" };
const agent = (id, extra = {}) => ({ id, qualifications: ["general"], authorizations: ["public"], capacity: 1, ...extra });
const task = (id, extra = {}) => ({ id, requiredQualifications: ["general"], domain: "public", durationRounds: 1, ...extra });
const scenario = extra => ({ id: "synthetic-scenario", roundCount: 2, policy, agents: [agent("a")], tasks: [task("t")], authoritativeChanges: [], ...extra });
const run = (fixture, options = {}) => simulateScenario({ scenario: fixture, checkAssignments: approvingChecker, ...options });

test("normal load produces a deterministic legal trace", async () => {
  const fixture = scenario({ tasks: [task("t", { durationRounds: 2 })] });
  assert.deepEqual(await run(fixture), await run(structuredClone(fixture)));
  assert.deepEqual((await run(fixture)).rounds.flatMap(r => r.records).map(r => r.appliedAgentId), ["a", "a"]);
});

test("otherwise-equal assignments rotate using prior assignment history", async () => {
  const fixture = scenario({ roundCount: 4, agents: [agent("b"), agent("a")], tasks: [task("one", { arrivalRound: 0 }), task("two", { arrivalRound: 1 }), task("three", { arrivalRound: 2 }), task("four", { arrivalRound: 3 })] });
  const result = await run(fixture);
  assert.deepEqual(result.rounds.flatMap(r => r.records).filter(r => r.appliedAgentId).map(r => r.appliedAgentId), ["a", "b", "a", "b"]);
  assert.deepEqual(result, await run({ ...fixture, agents: [...fixture.agents].reverse(), tasks: [...fixture.tasks].reverse() }));
});

test("overload leaves excess work unassigned with a capacity gap", async () => {
  const result = await run(scenario({ roundCount: 1, tasks: [task("a"), task("b")] }));
  assert.equal(result.rounds[0].records.filter(r => r.appliedAgentId).length, 1);
  assert.equal(result.rounds[0].records.find(r => !r.appliedAgentId).gap, "capacity-or-eligibility");
});

test("scarce qualified capacity never assigns an unqualified agent", async () => {
  const fixture = scenario({ roundCount: 1, agents: [agent("idle"), agent("qualified", { qualifications: ["special"], availableRounds: [] })], tasks: [task("special", { requiredQualifications: ["special"] })] });
  assert.equal((await run(fixture)).rounds[0].records[0].appliedAgentId, null);
});

test("protected and public workloads respect authorization under competition", async () => {
  const fixture = scenario({ roundCount: 1, agents: [agent("public"), agent("protected", { authorizations: ["protected", "public"] })], tasks: [task("protected-work", { domain: "protected" }), task("public-work")] });
  const records = (await run(fixture)).rounds[0].records;
  assert.equal(records.find(r => r.taskId === "protected-work").appliedAgentId, "protected");
});

test("eligible incumbents continue unfinished work", async () => {
  const fixture = scenario({ agents: [agent("a"), agent("b")], tasks: [task("t", { durationRounds: 2, incumbent: "b" })] });
  assert.deepEqual((await run(fixture)).rounds.flatMap(r => r.records).map(r => r.appliedAgentId), ["b", "b"]);
});

test("authoritative unavailability forces a recorded legal handoff", async () => {
  const fixture = scenario({ agents: [agent("a"), agent("b")], tasks: [task("t", { durationRounds: 2, incumbent: "a" })], authoritativeChanges: [{ round: 1, type: "availability", agentId: "a", value: [], provenance: "fixture:a-offline" }] });
  const records = (await run(fixture)).rounds.flatMap(r => r.records);
  assert.deepEqual(records.map(r => r.appliedAgentId), ["a", "b"]); assert.equal(records[1].handoff, true);
});

test("checker rejection is not applied", async () => {
  const result = await run(scenario({ roundCount: 1 }), { proposeAssignments: () => ({ t: "a" }), checkAssignments: () => ({ outcome: "rejected", reason: "not-authorized" }) });
  assert.equal(result.rounds[0].records[0].appliedAgentId, null);
  assert.equal(result.rounds[0].records[0].gap, "checker-rejected");
});

test("checker failure records fallback proposal but freezes ordinary work", async () => {
  const fixture = scenario({ roundCount: 1 });
  const options = { proposeAssignments: () => ({ t: "missing" }), checkAssignments: () => { throw Object.assign(new Error("offline"), { code: "checker-unavailable" }); } };
  const result = await run(fixture, options);
  assert.deepEqual(result, await run(fixture, options));
  assert.equal(result.rounds[0].records[0].appliedAgentId, null);
  assert.equal(result.rounds[0].records[0].fallbackProposal.agentId, "a");
  assert.equal(result.rounds[0].records[0].source, "none");
  assert.equal(result.rounds[0].records[0].remaining, 1);
  assert.equal(result.rounds[0].records[0].gap, "checker-unavailable");
  assert.deepEqual(result.rounds[0].records[0].checker, { outcome: "failed", reason: "checker-error" });
});

test("policy switching records immutable provenance at the effective round", async () => {
  const fixture = scenario({ authoritativeChanges: [{ round: 1, type: "policy", policy: { id: "baseline", version: "2", provenance: "fixture:policy-2" }, provenance: "fixture:switch" }], tasks: [task("a"), task("b", { arrivalRound: 1 })] });
  const result = await run(fixture);
  assert.deepEqual(result.rounds.map(r => r.requestedPolicy.version), ["1", "2"]);
  assert.equal(result.rounds[0].records[0].taskId, "a"); assert.equal(result.rounds[1].records[0].taskId, "b");
});

test("authoritative qualification changes apply before scheduling", async () => {
  const fixture = scenario({ roundCount: 1, agents: [agent("a", { qualifications: [] })], authoritativeChanges: [{ round: 0, type: "qualifications", agentId: "a", value: ["general"], provenance: "fixture:qualification" }] });
  assert.equal((await run(fixture)).rounds[0].records[0].appliedAgentId, "a");
});

test("starvation pressure is reported independently from assignment history", async () => {
  const fixture = scenario({ roundCount: 4, tasks: [task("long", { durationRounds: 3 }), task("waiting")] });
  const records = (await run(fixture)).rounds.flatMap(r => r.records).filter(r => r.taskId === "waiting");
  assert.deepEqual(records.map(r => r.waitRounds), [1, 2, 3, 0]);
  assert.equal(records[3].appliedAgentId, "a");
});

test("handoff pressure remains observable without changing baseline continuity", async () => {
  const fixture = scenario({ agents: [agent("a"), agent("b")], tasks: [task("t", { durationRounds: 2, incumbent: "a" })] });
  const result = await run(fixture);
  assert.deepEqual(result.rounds.flatMap(r => r.records).map(r => ({ continuation: r.continuation, handoff: r.handoff })), [
    { continuation: true, handoff: false }, { continuation: true, handoff: false },
  ]);
});

test("deadline collisions preserve only externally supplied priorities", async () => {
  const fixture = scenario({ roundCount: 1, tasks: [task("urgent", { deadlineRound: 1, urgency: "urgent" }), task("routine", { deadlineRound: 1, urgency: "routine" })] });
  const records = (await run(fixture)).rounds[0].records;
  assert.deepEqual(records.map(r => [r.taskId, r.deadlineRound, r.urgency]), [["routine", 1, "routine"], ["urgent", 1, "urgent"]]);
});

test("supplied deadline and urgency are observed without inference", async () => {
  const fixture = scenario({ roundCount: 1, tasks: [task("with", { deadlineRound: 4, urgency: "high" }), task("without")] });
  const records = (await run(fixture)).rounds[0].records;
  assert.deepEqual(records.map(r => [r.taskId, r.deadlineRound, r.urgency]), [["with", 4, "high"], ["without", null, null]]);
});

test("malformed and out-of-scope fixtures fail closed", () => {
  for (const fixture of [scenario({ agents: [agent("a"), agent("a")] }), scenario({ tasks: [task("t", { durationRounds: 0 })] }), scenario({ money: [] }), scenario({ authoritativeChanges: [{ round: 0, type: "availability", agentId: "missing", value: [], provenance: "fixture:x" }] })]) assert.throws(() => validateScenario(fixture));
});

test("adapters cannot mutate frozen simulation snapshots or source fixtures", async () => {
  const fixture = scenario({ roundCount: 1 }); const before = structuredClone(fixture);
  const result = await run(fixture, { proposeAssignments: snapshot => { snapshot.agents[0].capacity = 99; return {}; } });
  assert.equal(result.rounds[0].records[0].source, "deterministic-fallback");
  assert.deepEqual(fixture, before);
});

test("new work cannot consume an eligible incumbent's capacity", async () => {
  const result = await run(scenario({ roundCount: 1, agents: [agent("a"), agent("b")], tasks: [task("a-new"), task("z-existing", { durationRounds: 2, incumbent: "a" })] }));
  const existing = result.rounds[0].records.find(r => r.taskId === "z-existing");
  assert.equal(existing.appliedAgentId, "a");
  assert.equal(existing.handoff, false);
});

test("outage preserves incumbent history and recovery requires approval", async () => {
  const fixture = scenario({ roundCount: 3, agents: [agent("a"), agent("b")], tasks: [task("t", { durationRounds: 3, incumbent: "b" })] });
  const result = await run(fixture, { checkAssignments: proposal => proposal.round === 1 ? { outcome: "failed" } : approvingChecker(proposal) });
  const records = result.rounds.flatMap(r => r.records);
  assert.deepEqual(records.map(r => r.appliedAgentId), ["b", null, "b"]);
  assert.deepEqual(records.map(r => r.remaining), [2, 2, 1]);
  assert.equal(records[2].continuation, true);
});

test("failed policy falls back only through an independent checker", async () => {
  for (const outcome of ["approved", "rejected", "failed"]) {
    let checked;
    const result = await run(scenario({ roundCount: 1 }), { proposeAssignments: () => { throw new Error("policy offline"); }, checkAssignments: proposal => { checked = proposal; return { outcome }; } });
    assert.equal(checked.agentId, "a");
    assert.equal(result.rounds[0].records[0].appliedAgentId, outcome === "approved" ? "a" : null);
  }
});

test("missing and malformed checkers never apply assignments", async () => {
  for (const checker of [undefined, () => null, () => ({ outcome: "unknown" })]) {
    const result = await run(scenario({ roundCount: 1 }), { checkAssignments: checker });
    assert.equal(result.rounds[0].records[0].appliedAgentId, null);
    assert.equal(result.rounds[0].records[0].remaining, 1);
  }
});

test("nested out-of-scope payloads and malformed changes are rejected", () => {
  const fixtures = [
    scenario({ tasks: [task("t", { money: 1 })] }),
    scenario({ agents: [agent("a", { personalData: { name: "synthetic" } })] }),
    scenario({ tasks: [task("t", { urgency: { secret: "synthetic" } })] }),
    scenario({ authoritativeChanges: [{ round: 0, type: "availability", agentId: "a", value: ["bad"], provenance: "event" }] }),
    scenario({ authoritativeChanges: [{ round: 0, type: "qualifications", agentId: "a", value: [{}], provenance: "event" }] }),
  ];
  for (const fixture of fixtures) assert.throws(() => validateScenario(fixture), TypeError);
});

test("policy provenance changes require a new identity or version", () => {
  assert.throws(() => validateScenario(scenario({ authoritativeChanges: [{ round: 0, type: "policy", policy: { ...policy, provenance: "changed" }, provenance: "switch" }] })), /cannot change provenance/);
});
