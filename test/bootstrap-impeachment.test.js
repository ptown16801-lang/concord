import assert from "node:assert/strict";
import test from "node:test";

import {
  BootstrapImpeachmentService,
  accusationThreshold,
  bootstrapPanelSizes,
  selectBootstrapPanels,
  trialThreshold,
} from "../src/governance/index.js";

const people = (count, decorate = () => ({})) => Array.from({ length: count }, (_, index) => ({
  id: `person-${index + 1}`,
  divisionId: `division-${index % 4}`,
  eligible: true,
  ...decorate(index),
}));

test("uses the frozen capped proportional panel sizes", () => {
  assert.deepEqual(bootstrapPanelSizes(1), { accusation: 3, trial: 6 });
  assert.deepEqual(bootstrapPanelSizes(60), { accusation: 6, trial: 12 });
  assert.deepEqual(bootstrapPanelSizes(300), { accusation: 12, trial: 24 });
});

test("applies exact enhanced threshold cutovers", () => {
  assert.deepEqual([3, 4, 5, 6].map(accusationThreshold), [3, 3, 4, 4]);
  assert.deepEqual([6, 7, 8, 9].map(trialThreshold), [5, 6, 6, 6]);
});

test("waits when an independent disjoint pool cannot fill both panels", () => {
  const selection = selectBootstrapPanels({ candidates: people(8), population: 10, caseId: "case-1", accusedId: "accused" });
  assert.equal(selection.stage, "WAITING_FOR_INDEPENDENT_PARTICIPANTS");
  assert.equal(selection.available, 8);
});

test("excludes the accused, serving judges, conflicts, and ineligible identities", () => {
  const candidates = people(15);
  candidates[0].id = "accused";
  candidates[1].servingJudge = true;
  candidates[2].caseConflict = true;
  candidates[3].eligible = false;
  const selection = selectBootstrapPanels({ candidates, population: 10, caseId: "case-2", accusedId: "accused" });
  const ids = [...selection.accusation, ...selection.trial].map(({ id }) => id);
  assert.equal(selection.stage, "ACCUSATION_VOTING");
  assert.ok(!ids.some((id) => ["accused", "person-2", "person-3", "person-4"].includes(id)));
});

test("keeps accusation and trial rosters strictly disjoint", () => {
  const selection = selectBootstrapPanels({ candidates: people(20), population: 20, caseId: "case-3", accusedId: "accused" });
  const accusation = new Set(selection.accusation.map(({ id }) => id));
  assert.ok(selection.trial.every(({ id }) => !accusation.has(id)));
});

test("balances divisions without creating mandatory division seats", () => {
  const balanced = selectBootstrapPanels({ candidates: people(20), population: 20, caseId: "case-4", accusedId: "accused" });
  assert.equal(new Set(balanced.accusation.map(({ divisionId }) => divisionId)).size, 3);
  const oneDivision = selectBootstrapPanels({ candidates: people(20, () => ({ divisionId: "only" })), population: 20, caseId: "case-5", accusedId: "accused" });
  assert.equal(oneDivision.stage, "ACCUSATION_VOTING");
});

test("maturity is institution-specific", () => {
  const candidates = people(20, (index) => ({ houseMember: index < 3, senator: index >= 3 && index < 9 }));
  const selection = selectBootstrapPanels({ candidates, population: 20, caseId: "case-6", accusedId: "accused" });
  assert.equal(selection.accusationSource, "HOUSE");
  assert.equal(selection.trialSource, "SENATE");
  const mixed = people(20, (index) => ({ houseMember: index < 3, senator: index === 4 }));
  const fallback = selectBootstrapPanels({ candidates: mixed, population: 20, caseId: "case-7", accusedId: "accused" });
  assert.equal(fallback.accusationSource, "HOUSE");
  assert.equal(fallback.trialSource, "CIVILIAN_SORTITION");
});

test("service requires authenticated authorization and a persistence boundary", async () => {
  assert.throws(() => new BootstrapImpeachmentService({}), { code: "DURABLE_STORE_REQUIRED" });
  const service = fixtureService();
  await assert.rejects(service.openCase({ caseId: "case-auth", accusedId: "accused", candidates: people(20), actor: { id: "clerk" } }), { code: "UNAUTHORIZED" });
});

test("replacement expands deterministically and event replay preserves transitions", async () => {
  const service = fixtureService();
  let state = await service.openCase({ caseId: "case-replace", accusedId: "accused", candidates: people(20), actor: actor("clerk") });
  const outgoing = state.accusation[0].id;
  const expected = state.alternates[0].id;
  state = await service.replaceParticipant({ caseId: "case-replace", participantId: outgoing, actor: actor("clerk") });
  assert.equal(state.accusation.some(({ id }) => id === expected), true);
  assert.deepEqual(await service.getCase("case-replace"), state);
});

function actor(id) { return { id, authentication: { method: "test-fixture" } }; }

function fixtureService() {
  const streams = new Map();
  const store = {
    async load(caseId) { return structuredClone(streams.get(caseId) ?? []); },
    async append(caseId, version, events) {
      const stream = streams.get(caseId) ?? [];
      if (stream.length !== version) throw new Error("version conflict");
      streams.set(caseId, [...stream, ...structuredClone(events)]);
    },
  };
  return new BootstrapImpeachmentService({ eventStore: store,
    authorize: async () => true,
    eligibilityRegistry: { canCastNewBallot: () => ({ eligible: true }) },
    populationRegistry: { getPopulation: () => ({ living: 20 }) } });
}
