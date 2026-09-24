import { createHash, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const migration = readFileSync(
  fileURLToPath(new URL("./migrations/001_ballots.sql", import.meta.url)),
  "utf8",
);

const CONSTITUTIONAL_SOURCE = "constitutional_ballot";
const choices = new Set(["yes", "no", "abstain"]);

function serialized(value) {
  try {
    return JSON.stringify(value ?? null);
  } catch {
    return JSON.stringify({ unrepresentable: true });
  }
}

function text(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/**
 * Durable, append-only ballot intake. authorizeSubmission is called while the
 * SQLite write transaction is held and must synchronously read authoritative
 * state (using the supplied database when that state is in the same database).
 */
export class BallotBox {
  constructor(filename = ":memory:", { authorizeSubmission, now, id } = {}) {
    if (typeof authorizeSubmission !== "function") {
      throw new TypeError("authorizeSubmission is required");
    }
    this.database = new DatabaseSync(filename);
    this.database.exec("PRAGMA busy_timeout = 5000");
    this.database.exec(migration);
    this.authorizeSubmission = authorizeSubmission;
    this.now = now ?? (() => new Date());
    this.id = id ?? randomUUID;
  }

  close() {
    this.database.close();
  }

  submit(submission) {
    const raw = serialized(submission);
    const recordedAt = this.now().toISOString();
    const submittedAt = text(submission?.submittedAt) ?? recordedAt;
    const attempt = {
      id: this.id(),
      electionId: text(submission?.electionId),
      identityId: text(submission?.identityId),
      sourceType: text(submission?.sourceType) ?? "unknown",
      submittedAt,
      recordedAt,
      raw,
    };

    this.database.exec("BEGIN IMMEDIATE");
    try {
      let result;
      if (attempt.sourceType !== CONSTITUTIONAL_SOURCE) {
        result = this.#reject(attempt, "wrong_source", "Only constitutional ballot submissions are accepted");
      } else if (!attempt.electionId || !attempt.identityId || !choices.has(submission?.choice)
        || !Number.isFinite(Date.parse(submittedAt))) {
        result = this.#reject(attempt, "malformed", "Election, identity, and a valid choice are required");
      } else {
        const authority = this.authorizeSubmission({
          database: this.database,
          electionId: attempt.electionId,
          identityId: attempt.identityId,
          recordedAt,
        });
        if (!authority?.onOpeningRoll || !authority?.eligible) {
          result = this.#reject(attempt, "ineligible", "Identity is not currently eligible on the opening roll");
        } else if (!Number.isFinite(Date.parse(authority.closesAt))) {
          throw new TypeError("Authoritative election close time is invalid");
        } else if (Date.parse(recordedAt) > Date.parse(authority.closesAt)) {
          result = this.#reject(attempt, "late", "Election is closed");
        } else {
          const existing = this.getAccepted(attempt.electionId, attempt.identityId);
          if (existing) {
            result = this.#reject(attempt, "duplicate", "A valid ballot was already accepted", existing.receiptId);
          } else {
            const receiptId = this.id();
            const digest = createHash("sha256").update(raw).digest("hex");
            this.#insertAttempt(attempt, "accepted", "First valid ballot accepted", receiptId);
            this.database.prepare(`INSERT INTO accepted_ballots
              (receipt_id, attempt_id, election_id, identity_id, choice, accepted_at, submission_digest)
              VALUES (?, ?, ?, ?, ?, ?, ?)`)
              .run(receiptId, attempt.id, attempt.electionId, attempt.identityId,
                submission.choice, attempt.recordedAt, digest);
            result = { accepted: true, disposition: "accepted", attemptId: attempt.id, receiptId };
          }
        }
      }
      this.database.exec("COMMIT");
      return result;
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }

  #reject(attempt, disposition, reason, receiptId = null) {
    this.#insertAttempt(attempt, disposition, reason, receiptId);
    return { accepted: false, disposition, attemptId: attempt.id, receiptId };
  }

  #insertAttempt(attempt, disposition, reason, receiptId) {
    this.database.prepare(`INSERT INTO ballot_attempts
      (id, election_id, identity_id, source_type, submitted_at, recorded_at,
       disposition, reason, raw_submission, accepted_receipt_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(attempt.id, attempt.electionId, attempt.identityId, attempt.sourceType,
        attempt.submittedAt, attempt.recordedAt, disposition, reason, attempt.raw, receiptId);
  }

  getAccepted(electionId, identityId) {
    return this.database.prepare(`SELECT receipt_id AS receiptId, attempt_id AS attemptId,
      election_id AS electionId, identity_id AS identityId, choice, accepted_at AS acceptedAt,
      submission_digest AS submissionDigest FROM accepted_ballots
      WHERE election_id = ? AND identity_id = ?`).get(electionId, identityId);
  }

  getAttempts(electionId, identityId) {
    return this.database.prepare(`SELECT id, election_id AS electionId, identity_id AS identityId,
      source_type AS sourceType, submitted_at AS submittedAt, recorded_at AS recordedAt,
      disposition, reason, raw_submission AS rawSubmission,
      accepted_receipt_id AS acceptedReceiptId FROM ballot_attempts
      WHERE election_id IS ? AND identity_id IS ? ORDER BY rowid`).all(electionId, identityId);
  }
}

export { CONSTITUTIONAL_SOURCE };
