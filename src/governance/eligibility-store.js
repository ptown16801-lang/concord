import { createHash } from "node:crypto";
import { isAbsolute } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { canonicalJson } from "./eligibility-authorization.js";
import { EligibilityTransitionError } from "./eligibility-errors.js";

const hash = (text) => createHash("sha256").update(text).digest("hex");
const corrupt = () => { throw new EligibilityTransitionError("CORRUPT_HISTORY", "Eligibility history failed integrity validation"); };
const schema = `
CREATE TABLE IF NOT EXISTS eligibility_metadata (
  singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
  schema_version INTEGER NOT NULL CHECK (schema_version = 1),
  authority_id TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS eligibility_requests (
  request_id TEXT PRIMARY KEY,
  receipt TEXT NOT NULL CHECK (json_valid(receipt)),
  digest TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS eligibility_events (
  version INTEGER PRIMARY KEY CHECK (version > 0),
  request_id TEXT NOT NULL REFERENCES eligibility_requests(request_id),
  payload TEXT NOT NULL CHECK (json_valid(payload)),
  previous_hash TEXT NOT NULL,
  event_hash TEXT NOT NULL
);
CREATE TRIGGER IF NOT EXISTS eligibility_sequence BEFORE INSERT ON eligibility_events
WHEN NEW.version != (SELECT COALESCE(MAX(version), 0) + 1 FROM eligibility_events)
BEGIN SELECT RAISE(ABORT, 'eligibility versions must append sequentially'); END;
CREATE TRIGGER IF NOT EXISTS eligibility_request_unique BEFORE INSERT ON eligibility_requests
WHEN EXISTS (SELECT 1 FROM eligibility_requests WHERE request_id = NEW.request_id)
BEGIN SELECT RAISE(ABORT, 'eligibility request cannot be replaced'); END;
CREATE TRIGGER IF NOT EXISTS eligibility_metadata_unique BEFORE INSERT ON eligibility_metadata
WHEN EXISTS (SELECT 1 FROM eligibility_metadata)
BEGIN SELECT RAISE(ABORT, 'eligibility metadata cannot be replaced'); END;
${["metadata", "requests", "events"].flatMap((table) => ["UPDATE", "DELETE"].map((operation) => `
CREATE TRIGGER IF NOT EXISTS eligibility_${table}_no_${operation.toLowerCase()}
BEFORE ${operation} ON eligibility_${table}
BEGIN SELECT RAISE(ABORT, 'eligibility history is append-only'); END;`)).join("\n")}
`;

/** Internal writer-owned store. Never hand this object or its file to clients. */
export class EligibilityStore {
  #db;
  #authorityId;

  constructor({ filename, authorityId, readOnly = false }) {
    if (typeof filename !== "string" || !isAbsolute(filename)) throw new TypeError("An absolute durable eligibility database filename is required");
    if (typeof authorityId !== "string" || !authorityId.trim()) throw new TypeError("An authorityId is required");
    this.#authorityId = authorityId;
    this.#db = new DatabaseSync(filename, { readOnly });
    try {
      this.#db.exec("PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
      if (!readOnly) {
        this.#db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = FULL; BEGIN IMMEDIATE;");
        try {
          this.#db.exec(schema);
          if (!this.#db.prepare("SELECT 1 FROM eligibility_metadata").get()) {
            this.#db.prepare("INSERT INTO eligibility_metadata VALUES (1, 1, ?)").run(authorityId);
          }
          this.#db.exec("COMMIT");
        } catch (error) {
          this.#db.exec("ROLLBACK");
          throw error;
        }
      }
      const metadata = this.#db.prepare("SELECT * FROM eligibility_metadata").all();
      if (metadata.length !== 1 || metadata[0].schema_version !== 1 || metadata[0].authority_id !== authorityId) {
        throw new EligibilityTransitionError("STORE_MISMATCH", "Unexpected eligibility store authority or schema");
      }
      this.snapshot();
    } catch (error) {
      this.#db.close();
      throw error;
    }
  }

  close() { this.#db.close(); }

  requestReceipt(requestId) {
    const row = this.#db.prepare("SELECT receipt, digest FROM eligibility_requests WHERE request_id = ?").get(requestId);
    if (!row) return null;
    if (hash(row.receipt) !== row.digest) corrupt();
    return JSON.parse(row.receipt);
  }

  snapshot() {
    // One SQL statement supplies a consistent committed snapshot, including receipts.
    const rows = this.#db.prepare(`SELECT e.*, r.receipt, r.digest FROM eligibility_events e
      FULL OUTER JOIN eligibility_requests r ON r.request_id = e.request_id ORDER BY e.version`).all();
    let previousHash = "";
    const requestCounts = new Map();
    const events = rows.map((row, index) => {
      if (!row.receipt || row.version !== index + 1 || row.previous_hash !== previousHash ||
          hash(row.receipt) !== row.digest ||
          hash(`${previousHash}\n${row.digest}\n${row.payload}`) !== row.event_hash) corrupt();
      const event = JSON.parse(row.payload);
      const receipt = JSON.parse(row.receipt);
      if (event.version !== row.version || event.authorization?.requestId !== row.request_id ||
          canonicalJson(event.authorization) !== canonicalJson(receipt.authorization) ||
          event.version <= receipt.expectedVersion || event.version > receipt.expectedVersion + receipt.commands.length) corrupt();
      const count = (requestCounts.get(row.request_id)?.count ?? 0) + 1;
      requestCounts.set(row.request_id, { count, expected: receipt.commands.length });
      previousHash = row.event_hash;
      return event;
    });
    if ([...requestCounts.values()].some(({ count, expected }) => count !== expected)) corrupt();
    return { authorityId: this.#authorityId, version: events.length, events, headHash: previousHash };
  }

  append({ expectedVersion, commands, authorization, buildEvents }) {
    this.#db.exec("BEGIN IMMEDIATE");
    try {
      const snapshot = this.snapshot();
      if (this.#db.prepare("SELECT 1 FROM eligibility_requests WHERE request_id = ?").get(authorization.requestId)) {
        throw new EligibilityTransitionError("REPLAYED_REQUEST", "This request already committed");
      }
      if (snapshot.version !== expectedVersion) {
        throw new EligibilityTransitionError("VERSION_CONFLICT", `Expected version ${expectedVersion}; current version is ${snapshot.version}`);
      }
      const events = buildEvents(snapshot);
      const receipt = canonicalJson({ expectedVersion, commands, authorization });
      const digest = hash(receipt);
      this.#db.prepare("INSERT INTO eligibility_requests VALUES (?, ?, ?)").run(authorization.requestId, receipt, digest);
      const insert = this.#db.prepare("INSERT INTO eligibility_events VALUES (?, ?, ?, ?, ?)");
      let previousHash = snapshot.headHash;
      for (const event of events) {
        const payload = canonicalJson(event);
        const eventHash = hash(`${previousHash}\n${digest}\n${payload}`);
        insert.run(event.version, authorization.requestId, payload, previousHash, eventHash);
        previousHash = eventHash;
      }
      this.#db.exec("COMMIT");
      return structuredClone(events);
    } catch (error) {
      this.#db.exec("ROLLBACK");
      throw error;
    }
  }
}
