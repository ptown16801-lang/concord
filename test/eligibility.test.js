import assert from "node:assert/strict";
import { test } from "node:test";
import {
  EligibilityEventType as T,
} from "../src/governance/index.js";

import { at, fixture } from "../test-support/eligibility-fixture.js";
const register = (apply, identityId = "ordinary-1") =>
  apply({ type: T.IDENTITY_REGISTERED, identityId, effectiveAt: at(0) });

test("an allegation is audited but does not affect eligibility", (t) => {
  const { registry, apply } = fixture(t);
  register(apply);
  apply({ type: T.ALLEGATION_RECORDED, identityId: "ordinary-1", allegationId: "a-1", effectiveAt: at(1) });
  assert.deepEqual(registry.canCastNewBallot("ordinary-1", { at: at(2) }), { eligible: true, reason: null });
  assert.equal(registry.stateAt("ordinary-1").allegationCount, 1);
});

test("formal proceedings bar new ballots while retaining a ballot already accepted", (t) => {
  const { registry, apply } = fixture(t);
  register(apply);
  apply({ type: T.FORMAL_PROCEEDING_OPENED, identityId: "ordinary-1", proceedingId: "p-1", effectiveAt: at(10) });
  assert.deepEqual(registry.canCastNewBallot("ordinary-1", { at: at(11) }), { eligible: false, reason: "FORMAL_PROCEEDING" });
  assert.equal(registry.electionStatus("ordinary-1", { closesAt: at(50), acceptedBallotAt: at(5), at: at(11) }).status, "ACCEPTED");
});

test("pre-ballot death bars voting and post-ballot death retains acceptance", (t) => {
  const { registry, apply } = fixture(t);
  register(apply);
  apply({ type: T.DEATH_RECORDED, identityId: "ordinary-1", effectiveAt: at(10) });
  assert.equal(registry.canCastNewBallot("ordinary-1", { at: at(11) }).reason, "DECEASED");
  assert.deepEqual(registry.electionStatus("ordinary-1", { closesAt: at(50), acceptedBallotAt: at(5), at: at(20) }), {
    status: "ACCEPTED", retained: true, acceptedBallotAt: at(5),
  });
  assert.throws(() => apply({ type: T.FORMAL_PROCEEDING_OPENED, identityId: "ordinary-1", proceedingId: "late", effectiveAt: at(12) }), { code: "TERMINAL_IDENTITY" });
});

test("capital termination is a distinct final state", (t) => {
  const { registry, apply } = fixture(t);
  register(apply);
  apply({ type: T.CAPITAL_TERMINATION_RECORDED, identityId: "ordinary-1", effectiveAt: at(4) });
  assert.equal(registry.stateAt("ordinary-1").terminalStatus, "CAPITAL_TERMINATED");
  assert.throws(() => apply({ type: T.FELONY_CONVICTION_ENTERED, identityId: "ordinary-1", convictionId: "f", effectiveAt: at(5) }), { code: "TERMINAL_IDENTITY" });
});

test("felony conviction creates an immediate permanent franchise bar", (t) => {
  const { registry, apply } = fixture(t);
  register(apply);
  apply({ type: T.FELONY_CONVICTION_ENTERED, identityId: "ordinary-1", convictionId: "f-1", effectiveAt: at(10) });
  assert.equal(registry.canCastNewBallot("ordinary-1", { at: at(9) }).eligible, true);
  assert.equal(registry.canCastNewBallot("ordinary-1", { at: at(10) }).reason, "PERMANENT_FELONY_BAR");
  assert.throws(() => apply({ type: T.FELONY_CONVICTION_ENTERED, identityId: "ordinary-1", convictionId: "f-2", effectiveAt: at(11) }), { code: "REPEATED_TRANSITION" });
});

test("authenticated C4 creation restricts exactly its affected identities until restoration", (t) => {
  const { registry, apply } = fixture(t);
  register(apply, "ordinary-1");
  apply({ type: T.IDENTITY_REGISTERED, identityId: "ordinary-2", effectiveAt: at(0) });
  assert.throws(() => registry.apply({ type: T.C4_CREATION_EVENT_OPEN, proceedingId: "c4-1", affectedIdentityIds: ["ordinary-1"], effectiveAt: at(10) }, { expectedVersion: registry.version }), { code: "UNAUTHORIZED" });
  apply({ type: T.C4_CREATION_EVENT_OPEN, proceedingId: "c4-1", affectedIdentityIds: ["ordinary-1"], effectiveAt: at(10) });
  assert.equal(registry.canCastNewBallot("ordinary-1", { at: at(11) }).reason, "C4_TEMPORARY_RESTRICTION");
  assert.equal(registry.canCastNewBallot("ordinary-2", { at: at(11) }).eligible, true);
  apply({ type: T.C4_RESTRICTION_CLOSED, identityId: "ordinary-1", proceedingId: "c4-1", effectiveAt: at(20) });
  assert.equal(registry.electionStatus("ordinary-1", { closesAt: at(30), at: at(21) }).eligible, true);
});

test("restoration after close does not reopen the election", (t) => {
  const { registry, apply } = fixture(t);
  register(apply);
  apply({ type: T.FORMAL_PROCEEDING_OPENED, identityId: "ordinary-1", proceedingId: "p-1", effectiveAt: at(10) });
  apply({ type: T.FORMAL_PROCEEDING_CLOSED, identityId: "ordinary-1", proceedingId: "p-1", effectiveAt: at(40) });
  const status = registry.electionStatus("ordinary-1", { closesAt: at(30), at: at(50) });
  assert.equal(status.status, "CLOSED");
  assert.equal(status.eligible, false);
  assert.equal(status.reason, "FORMAL_PROCEEDING");
});

test("invalid and repeated transitions roll back an entire optimistic batch", (t) => {
  const { registry, apply, applyBatch } = fixture(t);
  register(apply);
  const version = registry.version;
  assert.throws(() => applyBatch([
    { type: T.ALLEGATION_RECORDED, identityId: "ordinary-1", allegationId: "a-1", effectiveAt: at(5) },
    { type: T.FORMAL_PROCEEDING_CLOSED, identityId: "ordinary-1", proceedingId: "missing", effectiveAt: at(6) },
  ], { expectedVersion: version }), { code: "INVALID_TRANSITION" });
  assert.equal(registry.version, version);
  assert.equal(registry.stateAt("ordinary-1").allegationCount, 0);
  assert.throws(() => register(apply), { code: "REPEATED_TRANSITION" });
  assert.throws(() => apply({ type: T.ALLEGATION_RECORDED, identityId: "ordinary-1", allegationId: "late", effectiveAt: at(3) }, { expectedVersion: 0 }), { code: "VERSION_CONFLICT" });
});

test("historical version reconstruction is auditable", (t) => {
  const { registry, apply } = fixture(t);
  register(apply);
  apply({ type: T.FORMAL_PROCEEDING_OPENED, identityId: "ordinary-1", proceedingId: "p-1", effectiveAt: at(10) });
  apply({ type: T.FORMAL_PROCEEDING_CLOSED, identityId: "ordinary-1", proceedingId: "p-1", effectiveAt: at(20) });
  assert.equal(registry.stateAt("ordinary-1", { version: 2 }).eligible, false);
  assert.equal(registry.stateAt("ordinary-1", { version: 3 }).eligible, true);
  assert.deepEqual(registry.auditLog().map(({ version }) => version), [1, 2, 3]);
});
