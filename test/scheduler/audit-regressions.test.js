import test from "node:test";
import assert from "node:assert/strict";
import { simulateScenario, approvingChecker } from "./harness.js";
import { validateScenario } from "./fixtures.js";

const agent = (id, extra = {}) => ({ id, qualifications: ["q"], authorizations: ["public"], capacity: 1, ...extra });
const task = (id, extra = {}) => ({ id, requiredQualifications: ["q"], domain: "public", durationRounds: 1, ...extra });
const scenario = extra => ({ id: "audit-synthetic", roundCount: 1, policy: { id: "candidate", version: "7", provenance: "synthetic:candidate" }, agents: [agent("a")], tasks: [task("t")], ...extra });
const run = (fixture, extra = {}) => simulateScenario({ scenario: fixture, checkAssignments: approvingChecker, ...extra });

test("A1: fallback checker and trace identify the actual executed policy", async () => {
  let received;
  let checkerState;
  const result = await run(scenario({}), {
    proposeAssignments: () => { throw new Error("candidate failure"); },
    checkAssignments: (proposal, snapshot) => {
      received = proposal; checkerState = snapshot;
      return approvingChecker(proposal);
    },
  });
  const round = result.rounds[0];
  assert.equal(round.records[0].source, "deterministic-fallback");
  assert.notEqual(received.policy.id, "candidate");
  assert.deepEqual(round.executedPolicy, received.policy);
  assert.deepEqual(checkerState.policy, received.policy);
  assert.deepEqual(round.requestedPolicy, scenario({}).policy);
  assert.deepEqual(received.requestedPolicy, round.requestedPolicy);
  assert.deepEqual(checkerState.requestedPolicy, round.requestedPolicy);
  assert.ok(received.policy.version && received.policy.provenance);
  assert.equal(Object.isFrozen(received.policy), true);
});

test("A1: direct baseline and failed-policy fallback use the same identity", async () => {
  const direct = await run(scenario({}));
  const fallback = await run(scenario({}), { proposeAssignments: () => { throw new Error("offline"); } });
  const candidate = await run(scenario({}), { proposeAssignments: () => ({ t: "a" }) });
  assert.deepEqual(direct.rounds[0].executedPolicy, fallback.rounds[0].executedPolicy);
  assert.notDeepEqual(direct.rounds[0].executedPolicy, candidate.rounds[0].executedPolicy);
  assert.deepEqual(candidate.rounds[0].executedPolicy, scenario({}).policy);
});

test("A2: contradictory authority updates reject regardless of identifiers or input order", () => {
  for (const [allow, deny] of [["a", "z"], ["z", "a"]]) {
    const changes = [
      { round: 0, type: "authorizations", agentId: "a", value: ["public"], provenance: allow },
      { round: 0, type: "authorizations", agentId: "a", value: [], provenance: deny },
    ];
    for (const authoritativeChanges of [changes, [...changes].reverse()]) {
      assert.throws(() => validateScenario(scenario({ authoritativeChanges })), /ambiguous same-round authority/);
    }
  }
});

test("A2: conflicting policy events reject but distinct-round updates remain valid", () => {
  const changes = [
    { round: 0, type: "policy", policy: { id: "p", version: "1", provenance: "p1" }, provenance: "event1" },
    { round: 0, type: "policy", policy: { id: "p", version: "2", provenance: "p2" }, provenance: "event2" },
  ];
  assert.throws(() => validateScenario(scenario({ authoritativeChanges: changes })), /ambiguous same-round authority/);
  assert.doesNotThrow(() => validateScenario(scenario({ roundCount: 2, authoritativeChanges: [changes[0], { ...changes[1], round: 1 }] })));
});

test("A3: waiting excludes productive rounds and distinguishes pause duration from total wait", async () => {
  const result = await run(scenario({ roundCount: 6, agents: [agent("a", { availableRounds: [0, 1, 3, 5] })], tasks: [task("t", { durationRounds: 4 })] }));
  const records = result.rounds.flatMap(r => r.records);
  assert.deepEqual(records.map(r => r.appliedAgentId), ["a", "a", null, "a", null, "a"]);
  assert.deepEqual(records.map(r => r.waitRounds), [0, 0, 1, 0, 1, 0]);
  assert.deepEqual(records.map(r => r.totalWaitRounds), [0, 0, 1, 1, 2, 2]);
  assert.deepEqual(records.map(r => r.ageRounds), [1, 2, 3, 4, 5, 6]);
  assert.equal(records[5].completed, true);
});

test("A3: consecutive waits accumulate only after arrival and reset after service", async () => {
  const result = await run(scenario({ roundCount: 4, agents: [agent("a", { availableRounds: [3] })], tasks: [task("t", { arrivalRound: 1 })] }));
  assert.equal(result.rounds[0].records.length, 0);
  assert.deepEqual(result.rounds.slice(1).map(r => [r.records[0].waitRounds, r.records[0].totalWaitRounds]), [[1, 1], [2, 2], [0, 2]]);
});

test("A4: Unicode agent and task permutations produce identical traces", async () => {
  const fixture = scenario({ roundCount: 2, agents: [agent("\u00e9"), agent("e\u0301")], tasks: [task("\u00f6"), task("o\u0308")] });
  const first = await run(fixture);
  const reversed = await run({ ...fixture, agents: [...fixture.agents].reverse(), tasks: [...fixture.tasks].reverse() });
  assert.deepEqual(first, reversed);
});

test("A4/A5: independent Unicode event permutations have a canonical trace", async () => {
  const changes = [
    { round: 0, type: "qualifications", agentId: "a", value: ["q"], provenance: "\u00e9" },
    { round: 0, type: "authorizations", agentId: "a", value: ["public"], provenance: "e\u0301" },
  ];
  const first = await run(scenario({ authoritativeChanges: changes }));
  const second = await run(scenario({ authoritativeChanges: [...changes].reverse() }));
  assert.deepEqual(first, second);
  assert.equal(first.rounds[0].authoritativeChanges.length, 2);
});

test("A5: traces retain authority receipts even when cancellation removes all work", async () => {
  const changes = [
    { round: 0, type: "availability", agentId: "a", value: [], provenance: "synthetic:unavailable" },
    { round: 0, type: "cancel-task", taskId: "t", provenance: "synthetic:cancel" },
    { round: 1, type: "policy", policy: { id: "candidate", version: "8", provenance: "synthetic:next-policy" }, provenance: "synthetic:policy-event" },
  ];
  const fixture = scenario({ roundCount: 2, authoritativeChanges: changes });
  const result = await run(fixture);
  assert.ok(JSON.stringify(result).includes("synthetic:cancel"));
  assert.deepEqual(result.rounds.map(r => r.records), [[], []]);
  assert.deepEqual(result.rounds.map(r => r.authorityVersion), [2, 3]);
  assert.deepEqual(result.rounds[1].authoritativeChanges, [changes[2]]);
  assert.deepEqual(result.rounds[0].authoritativeChanges.map(c => c.provenance), ["synthetic:cancel", "synthetic:unavailable"]);
  changes[2].policy.version = "mutated";
  assert.equal(result.rounds[1].authoritativeChanges[0].policy.version, "8");
  assert.throws(() => { result.rounds[1].authoritativeChanges[0].policy.version = "mutated"; }, TypeError);
});

test("A6: mutable object reason payloads fail closed without entering trace history", async () => {
  const reason = { code: "initial" };
  const result = await run(scenario({ roundCount: 2, tasks: [task("t", { durationRounds: 2 })] }), {
    checkAssignments: proposal => { reason.code = `round-${proposal.round}`; return { outcome: "approved", reason }; },
  });
  for (const round of result.rounds) {
    const record = round.records[0];
    assert.equal(record.appliedAgentId, null);
    assert.deepEqual(record.checker, { outcome: "failed", reason: "invalid-checker-response" });
  }
  reason.code = "after-return";
  assert.equal(result.rounds[0].records[0].checker.reason, "invalid-checker-response");
});

test("A6: reuse and mutation of valid checker results cannot rewrite prior evidence", async () => {
  const reply = { outcome: "approved", reason: "initial" };
  const result = await run(scenario({ roundCount: 2, tasks: [task("t", { durationRounds: 2 })] }), {
    checkAssignments: proposal => { reply.reason = `round-${proposal.round}`; return reply; },
  });
  reply.reason = "after-return";
  assert.deepEqual(result.rounds.map(r => r.records[0].checker.reason), ["round-0", "round-1"]);
  assert.equal(Object.isFrozen(reply), false);
  assert.equal(Object.isFrozen(result.rounds[0].records[0].checker), true);
});
