import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
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

test("competing processes persist one accepted ballot and both attempts", { timeout: 20_000 }, async (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), "concord-ballot-race-"));
  const filename = path.join(directory, "ballots.sqlite");
  const workers = [];
  t.after(async () => {
    await Promise.all(workers.map(async ({ child }) => {
      if (child.exitCode !== null || child.signalCode !== null) return;
      const exited = new Promise((resolve) => child.once("exit", resolve));
      child.kill("SIGKILL");
      await exited;
    }));
    rmSync(directory, { recursive: true, force: true });
  });
  fixture(filename).box.close();
  workers.push(startSubmissionWorker(filename, "yes"), startSubmissionWorker(filename, "no"));
  await Promise.all(workers.map(({ ready }) => ready));
  for (const { child } of workers) child.send("submit");
  const results = await Promise.all(workers.map(({ complete }) => complete));
  assert.deepEqual(results.map(({ result }) => result.disposition).sort(), ["accepted", "duplicate"]);
  const winner = results.find(({ result }) => result.accepted);
  const duplicate = results.find(({ result }) => !result.accepted);
  assert.equal(duplicate.result.receiptId, winner.result.receiptId);

  const { box } = fixture(filename);
  try {
    assert.equal(box.getAccepted(valid.electionId, valid.identityId).choice, winner.choice);
    assert.equal(box.getAccepted(valid.electionId, valid.identityId).receiptId, winner.result.receiptId);
    assert.deepEqual(box.getAttempts(valid.electionId, valid.identityId)
      .map(({ disposition }) => disposition), ["accepted", "duplicate"]);
  } finally {
    box.close();
  }
});

function startSubmissionWorker(filename, choice) {
  const child = fork(new URL("../test-support/ballot-submit-worker.mjs", import.meta.url),
    [filename, choice], { stdio: ["ignore", "ignore", "pipe", "ipc"] });
  let stderr = "";
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => { stderr += chunk; });
  let readyResolve;
  let readyReject;
  const ready = new Promise((resolve, reject) => { readyResolve = resolve; readyReject = reject; });
  let completeResolve;
  let completeReject;
  const complete = new Promise((resolve, reject) => { completeResolve = resolve; completeReject = reject; });
  // Both promises are consumed below; attach handlers before an early worker failure.
  ready.catch(() => {});
  complete.catch(() => {});
  let result;
  const fail = (error) => { readyReject(error); completeReject(error); };
  const deadline = setTimeout(() => {
    fail(new Error(`Ballot worker timed out: ${stderr}`));
    child.kill("SIGKILL");
  }, 15_000);
  child.on("message", (message) => {
    if (message.type === "ready") readyResolve();
    if (message.type === "result") result = message;
  });
  child.once("error", (error) => { clearTimeout(deadline); fail(error); });
  child.once("exit", (code, signal) => {
    clearTimeout(deadline);
    if (code !== 0 || !result) {
      fail(new Error(`Ballot worker failed (${code ?? signal}): ${stderr}`));
    } else {
      completeResolve(result);
    }
  });
  return { child, ready, complete };
}

test("legacy attempt history gains durable mutation guards on every disposition", (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), "concord-ballot-upgrade-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const filename = path.join(directory, "ballots.sqlite");
  const legacy = new DatabaseSync(filename);
  try {
    legacy.exec(readFileSync(new URL("../test-support/ballots-legacy.sql", import.meta.url), "utf8"));
    const insert = legacy.prepare(`INSERT INTO ballot_attempts
      (id, election_id, identity_id, source_type, submitted_at, recorded_at,
       disposition, reason, raw_submission, accepted_receipt_id)
      VALUES (?, 'election-1', 'agent-1', 'constitutional_ballot', ?, ?, ?, 'original', '{}', NULL)`);
    for (const disposition of ["accepted", "duplicate", "malformed", "ineligible", "late", "wrong_source"]) {
      insert.run(disposition, valid.submittedAt, valid.submittedAt, disposition);
    }
    legacy.exec(`INSERT INTO accepted_ballots VALUES
      ('receipt-1', 'accepted', 'election-1', 'agent-1', 'yes', '2026-09-16T11:00:00.000Z', 'original-digest')`);
    assert.equal(legacy.prepare("SELECT COUNT(*) AS count FROM sqlite_schema WHERE name = 'ballot_attempts_no_update'")
      .get().count, 0);
  } finally {
    legacy.close();
  }
  fixture(filename).box.close(); // Existing databases receive the additive migration on open.
  const independent = new DatabaseSync(filename);
  let original;
  try {
    independent.exec("PRAGMA recursive_triggers = OFF");
    original = independent.prepare("SELECT rowid, * FROM ballot_attempts ORDER BY rowid").all();
    for (const row of original) {
      assert.throws(() => independent.prepare("UPDATE ballot_attempts SET raw_submission = 'tampered' WHERE id = ?")
        .run(row.id), /append-only/);
      assert.throws(() => independent.prepare("DELETE FROM ballot_attempts WHERE id = ?").run(row.id), /append-only/);
      assert.throws(() => independent.prepare(`INSERT OR REPLACE INTO ballot_attempts
        SELECT id, election_id, identity_id, source_type, submitted_at, recorded_at,
          disposition, 'tampered', raw_submission, accepted_receipt_id FROM ballot_attempts WHERE id = ?`)
        .run(row.id), /append-only/);
      assert.throws(() => independent.prepare(`INSERT OR REPLACE INTO ballot_attempts
        (rowid, id, election_id, identity_id, source_type, submitted_at, recorded_at,
         disposition, reason, raw_submission, accepted_receipt_id)
        SELECT rowid, id || '-replacement', election_id, identity_id, source_type, submitted_at, recorded_at,
          disposition, 'tampered', raw_submission, accepted_receipt_id FROM ballot_attempts WHERE id = ?`)
        .run(row.id), /append-only/);
    }
    assert.deepEqual(independent.prepare("SELECT rowid, * FROM ballot_attempts ORDER BY rowid").all(), original);
    const receipt = independent.prepare("SELECT rowid, * FROM accepted_ballots").get();
    const columns = ["receipt_id", "attempt_id", "election_id", "identity_id", "choice", "accepted_at", "submission_digest"];
    for (const collision of ["receipt_id", "attempt_id", "electorate", "rowid"]) {
      const candidate = { ...receipt, receipt_id: "new-receipt", attempt_id: "malformed", election_id: "new-election", identity_id: "new-identity", choice: "no" };
      if (collision === "electorate") {
        candidate.election_id = receipt.election_id;
        candidate.identity_id = receipt.identity_id;
      } else if (collision !== "rowid") candidate[collision] = receipt[collision];
      const keys = collision === "rowid" ? ["rowid", ...columns] : columns;
      assert.throws(() => independent.prepare(`INSERT OR REPLACE INTO accepted_ballots
        (${keys.join(", ")}) VALUES (${keys.map(() => "?").join(", ")})`)
        .run(...keys.map((key) => candidate[key])), /immutable/);
      assert.deepEqual(independent.prepare("SELECT rowid, * FROM accepted_ballots").get(), receipt);
    }
  } finally {
    independent.close();
  }
  const { box } = fixture(filename);
  try {
    assert.deepEqual(box.database.prepare("SELECT rowid, * FROM ballot_attempts ORDER BY rowid").all(), original);
    assert.equal(box.getAccepted(valid.electionId, valid.identityId).submissionDigest, "original-digest");
    assert.equal(box.submit({ ...valid, identityId: "agent-2" }).accepted, true);
    assert.equal(box.submit({ ...valid, identityId: "agent-2", choice: "no" }).disposition, "duplicate");
  } finally {
    box.close();
  }
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
