import { DatabaseSync } from 'node:sqlite';
import { canonical, digest, fail, requireId } from './bootstrap-impeachment.js';

/** Shared local transaction boundary. Keep the file private to trusted writers. */
export class ImpeachmentStore {
  #db;
  constructor(filename) {
    requireId(filename);
    if (filename === ':memory:') fail('DURABLE_STORE_REQUIRED');
    this.#db = new DatabaseSync(filename);
    this.#db.exec(`PRAGMA busy_timeout=5000; PRAGMA synchronous=FULL; PRAGMA foreign_keys=ON;
      CREATE TABLE IF NOT EXISTS impeachment_events (
        stream TEXT NOT NULL, version INTEGER NOT NULL, body TEXT NOT NULL,
        PRIMARY KEY(stream,version));
      CREATE TABLE IF NOT EXISTS impeachment_commands (
        stream TEXT NOT NULL, command_id TEXT NOT NULL, digest TEXT NOT NULL, response TEXT NOT NULL,
        PRIMARY KEY(stream,command_id));
      CREATE TABLE IF NOT EXISTS impeachment_sources (
        scope TEXT NOT NULL, version INTEGER NOT NULL, snapshot_id TEXT NOT NULL, digest TEXT NOT NULL,
        PRIMARY KEY(scope,version), UNIQUE(scope,snapshot_id));`);
    for (const table of ['impeachment_events', 'impeachment_commands', 'impeachment_sources']) {
      this.#db.exec(`CREATE TRIGGER IF NOT EXISTS ${table}_no_update BEFORE UPDATE ON ${table}
        BEGIN SELECT RAISE(ABORT,'append-only journal'); END;
        CREATE TRIGGER IF NOT EXISTS ${table}_no_delete BEFORE DELETE ON ${table}
        BEGIN SELECT RAISE(ABORT,'append-only journal'); END;
        CREATE TRIGGER IF NOT EXISTS ${table}_no_replace BEFORE INSERT ON ${table}
        WHEN EXISTS (SELECT 1 FROM ${table} WHERE rowid=NEW.rowid)
        BEGIN SELECT RAISE(ABORT,'append-only journal'); END;`);
    }
    // BEFORE INSERT guards are needed even when recursive_triggers is disabled.
    this.#db.exec(`CREATE TRIGGER IF NOT EXISTS impeachment_event_key BEFORE INSERT ON impeachment_events
      WHEN EXISTS (SELECT 1 FROM impeachment_events WHERE stream=NEW.stream AND version=NEW.version)
      BEGIN SELECT RAISE(ABORT,'duplicate event'); END;
      CREATE TRIGGER IF NOT EXISTS impeachment_command_key BEFORE INSERT ON impeachment_commands
      WHEN EXISTS (SELECT 1 FROM impeachment_commands WHERE stream=NEW.stream AND command_id=NEW.command_id)
      BEGIN SELECT RAISE(ABORT,'duplicate command'); END;
      CREATE TRIGGER IF NOT EXISTS impeachment_source_key BEFORE INSERT ON impeachment_sources
      WHEN EXISTS (SELECT 1 FROM impeachment_sources WHERE scope=NEW.scope AND (version=NEW.version OR snapshot_id=NEW.snapshot_id))
      BEGIN SELECT RAISE(ABORT,'duplicate source'); END;`);
  }
  close() { this.#db.close(); }
  load(stream) { return this.#db.prepare('SELECT body FROM impeachment_events WHERE stream=? ORDER BY version').all(stream).map(r => JSON.parse(r.body)); }
  transact(command, principal, reducer) {
    const stream = requireId(command.stream), commandId = requireId(command.commandId);
    const requestDigest = digest({ command, principal });
    this.#db.exec('BEGIN IMMEDIATE');
    try {
      const prior = this.#db.prepare('SELECT digest,response FROM impeachment_commands WHERE stream=? AND command_id=?').get(stream, commandId);
      if (prior) {
        if (prior.digest !== requestDigest) fail('COMMAND_ID_CONFLICT');
        this.#db.exec('COMMIT'); return JSON.parse(prior.response);
      }
      const history = this.load(stream);
      if (command.expectedVersion !== history.length) fail('VERSION_CONFLICT');
      const events = reducer(history, this.#db);
      if (!Array.isArray(events) || !events.length) fail('EMPTY_TRANSACTION');
      const stamped = events.map((event, index) => ({ ...event, actorId: principal.id, commandId, recordedAt: new Date().toISOString(), version: history.length + index + 1 }));
      const insert = this.#db.prepare('INSERT INTO impeachment_events(stream,version,body) VALUES (?,?,?)');
      for (const event of stamped) insert.run(stream, event.version, canonical(event));
      const response = [...history, ...stamped];
      this.#db.prepare('INSERT INTO impeachment_commands VALUES (?,?,?,?)').run(stream, commandId, requestDigest, canonical(response));
      this.#db.exec('COMMIT'); return response;
    } catch (error) { this.#db.exec('ROLLBACK'); throw error; }
  }
  rememberSource(scope, source) {
    if (!Number.isSafeInteger(source?.version) || source.version < 0 || !source.snapshotId) fail('INPUT_DISCREPANCY', 'INVALID_SOURCE_VERSION');
    const hash = digest(source);
    const latest = this.#db.prepare("SELECT MAX(version) AS version FROM impeachment_sources WHERE scope=?").get(scope);
    if (latest.version !== null && source.version < latest.version) fail("INPUT_DISCREPANCY", "STALE_SOURCE");
    const existing = this.#db.prepare('SELECT * FROM impeachment_sources WHERE scope=? AND (version=? OR snapshot_id=?)').all(scope, source.version, source.snapshotId);
    if (existing.length) {
      if (existing.length !== 1 || existing[0].version !== source.version || existing[0].snapshot_id !== source.snapshotId || existing[0].digest !== hash) fail('INPUT_DISCREPANCY', 'NON_IDEMPOTENT_SOURCE');
    } else {
      const last = this.#db.prepare('SELECT MAX(version) AS version FROM impeachment_sources WHERE scope=?').get(scope);
      if (last.version !== null && source.version < last.version) fail('INPUT_DISCREPANCY', 'STALE_SOURCE');
      this.#db.prepare('INSERT INTO impeachment_sources VALUES (?,?,?,?)').run(scope, source.version, source.snapshotId, hash);
    }
  }
}
