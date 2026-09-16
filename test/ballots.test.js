import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { BallotBox, CONSTITUTIONAL_SOURCE } from "../src/governance/index.js";

const close = "2026-09-16T12:00:00.000Z";
const valid = {
  electionId: "election-1",
  identityId: "agent-1",
  choice: "yes",
  sourceType: CONSTITUTIONAL_SOURCE,
  submittedAt: "2026-09-16T11:00:00.000Z",
};

function fixture(filename = ":memory:") {
  const state = {
    onOpeningRoll: true,
    eligible: true,
    closesAt: close,
    receivedAt: "2026-09-16T11:00:01.000Z",
  };
  const box = new BallotBox(filename, {
    authorizeSubmission: () => ({ ...state }),
    now: () => new Date(state.receivedAt),
  });
  return { box, state };
}

test("two simultaneous valid submissions accept at most one immutable ballot", async () => {
  const { box } = fixture();
  const [first, second] = await Promise.all([
    Promise.resolve().then(() => box.submit(valid)),
    Promise.resolve().then(() => box.submit({ ...valid, choice: "no" })),
  ]);

  assert.equal([first, second].filter((result) => result.accepted).length, 1);
  assert.equal(box.getAccepted("election-1", "agent-1").choice, "yes");
  assert.deepEqual(box.getAttempts("election-1", "agent-1").map((row) => row.disposition),
    ["accepted", "duplicate"]);
  box.close();
});

test("valid then duplicate preserves the original receipt and choice", () => {
  const { box } = fixture();
  const accepted = box.submit(valid);
  const duplicate = box.submit({ ...valid, choice: "abstain" });
  assert.equal(duplicate.receiptId, accepted.receiptId);
  assert.equal(box.getAccepted(valid.electionId, valid.identityId).choice, "yes");
  assert.throws(() => box.database.prepare("UPDATE accepted_ballots SET choice = 'no'").run(),
    /immutable/);
  box.close();
});

test("malformed attempt can be corrected while eligible", () => {
  const { box } = fixture();
  assert.equal(box.submit({ ...valid, choice: "maybe" }).disposition, "malformed");
  assert.equal(box.submit(valid).disposition, "accepted");
  assert.deepEqual(box.getAttempts(valid.electionId, valid.identityId).map((row) => row.disposition),
    ["malformed", "accepted"]);
  box.close();
});

test("malformed attempt cannot be corrected after disqualification", () => {
  const { box, state } = fixture();
  box.submit({ ...valid, choice: null });
  state.eligible = false;
  assert.equal(box.submit(valid).disposition, "ineligible");
  assert.equal(box.getAccepted(valid.electionId, valid.identityId), undefined);
  box.close();
});

test("late submissions and post-close retries are audited without replacement", () => {
  const { box, state } = fixture();
  state.receivedAt = "2026-09-16T12:00:00.001Z";
  // A forged pre-close client timestamp cannot bypass the authoritative clock.
  assert.equal(box.submit(valid).disposition, "late");
  state.receivedAt = "2026-09-16T11:00:01.000Z";
  const accepted = box.submit(valid);
  state.receivedAt = "2026-09-17T00:00:00.000Z";
  const retry = box.submit({ ...valid, choice: "no" });
  assert.equal(retry.disposition, "late");
  assert.equal(box.getAccepted(valid.electionId, valid.identityId).receiptId, accepted.receiptId);
  box.close();
});

test("post-ballot disqualification does not remove the accepted ballot", () => {
  const { box, state } = fixture();
  const accepted = box.submit(valid);
  state.eligible = false;
  assert.equal(box.submit({ ...valid, choice: "no" }).disposition, "ineligible");
  assert.equal(box.getAccepted(valid.electionId, valid.identityId).receiptId, accepted.receiptId);
  box.close();
});

test("forum and social objects cannot enter the constitutional ballot path", () => {
  const { box } = fixture();
  for (const sourceType of ["forum_reaction", "social_reaction"]) {
    assert.equal(box.submit({ ...valid, sourceType }).disposition, "wrong_source");
  }
  assert.equal(box.getAccepted(valid.electionId, valid.identityId), undefined);
  assert.equal(box.getAttempts(valid.electionId, valid.identityId).length, 2);
  box.close();
});

test("accepted receipts and rejected attempts reconstruct after restart", () => {
  const directory = mkdtempSync(path.join(tmpdir(), "concord-ballots-"));
  const filename = path.join(directory, "ballots.sqlite");
  let fixtureValue = fixture(filename);
  const receipt = fixtureValue.box.submit(valid).receiptId;
  fixtureValue.box.submit({ ...valid, choice: "no" });
  fixtureValue.box.close();

  fixtureValue = fixture(filename);
  assert.equal(fixtureValue.box.getAccepted(valid.electionId, valid.identityId).receiptId, receipt);
  assert.deepEqual(fixtureValue.box.getAttempts(valid.electionId, valid.identityId)
    .map((row) => row.disposition), ["accepted", "duplicate"]);
  fixtureValue.box.close();
  rmSync(directory, { recursive: true, force: true });
});
