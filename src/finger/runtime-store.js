import { createHash, randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { gzipSync, gunzipSync } from 'node:zlib';
import { processFingerSession } from './processing/processor.js';

const SESSION_STATES = new Set(['active', 'completed', 'closed', 'partial', 'failed']);

function requiredString(value, name, maximum = 256) {
  if (typeof value !== 'string' || value.length === 0 || value.length > maximum) {
    throw new TypeError(`${name} must be a non-empty string no longer than ${maximum} characters`);
  }
  return value;
}

function optionalString(value, name, maximum = 4096) {
  if (value == null) return null;
  if (typeof value !== 'string' || value.length > maximum) {
    throw new TypeError(`${name} must be a string no longer than ${maximum} characters`);
  }
  return value;
}

function plainObject(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }
  return value;
}

function json(value) {
  return JSON.stringify(value ?? null);
}

function parseJson(value) {
  return value == null ? null : JSON.parse(value);
}

function now() {
  return new Date().toISOString();
}

function databaseNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function capturedAt(event) {
  return databaseNumber(event.elapsedMs)
    ?? databaseNumber(event.eventTimestamp)
    ?? databaseNumber(event.timestamp)
    ?? databaseNumber(event.timeStamp)
    ?? databaseNumber(event.clientTimestamp);
}

function transaction(database, operation) {
  database.exec('BEGIN IMMEDIATE');
  try {
    const result = operation();
    database.exec('COMMIT');
    return result;
  } catch (error) {
    database.exec('ROLLBACK');
    throw error;
  }
}

function mapSession(row) {
  if (!row) return null;
  return {
    id: row.id,
    associationId: row.association_id,
    userId: row.user_id,
    status: row.status,
    startedAt: row.started_at,
    endedAt: row.ended_at,
    fingerVersion: row.finger_version,
    concordVersion: row.concord_version,
    capabilities: parseJson(row.capabilities_json),
    context: parseJson(row.context_json),
    eventCount: Number(row.event_count),
    summary: parseJson(row.summary_json),
  };
}

function artifactPath(root, relativePath) {
  const destination = path.resolve(root, relativePath);
  if (!destination.startsWith(`${path.resolve(root)}${path.sep}`)) {
    throw new TypeError('Finger artifact path escapes the configured object root');
  }
  return destination;
}

export class FingerRuntimeStore {
  constructor({ dataDir, fingerVersion = '0.1.0', concordVersion = 'development' }) {
    this.dataDir = path.resolve(requiredString(dataDir, 'dataDir', 4096));
    this.objectDir = path.join(this.dataDir, 'objects');
    this.fingerVersion = requiredString(fingerVersion, 'fingerVersion');
    this.concordVersion = requiredString(concordVersion, 'concordVersion');
    this.database = null;
  }

  initialize() {
    mkdirSync(this.objectDir, { recursive: true, mode: 0o700 });
    this.database = new DatabaseSync(path.join(this.dataDir, 'finger.sqlite'));
    this.database.exec(`
      PRAGMA foreign_keys = ON;
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = FULL;
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        association_id TEXT NOT NULL,
        user_id TEXT,
        status TEXT NOT NULL,
        started_at TEXT NOT NULL,
        ended_at TEXT,
        finger_version TEXT NOT NULL,
        concord_version TEXT NOT NULL,
        capabilities_json TEXT NOT NULL,
        context_json TEXT NOT NULL,
        event_count INTEGER NOT NULL DEFAULT 0,
        summary_json TEXT
      ) STRICT;
      CREATE INDEX IF NOT EXISTS sessions_association_started ON sessions(association_id, started_at DESC);
      CREATE INDEX IF NOT EXISTS sessions_user_started ON sessions(user_id, started_at DESC);
      CREATE TABLE IF NOT EXISTS events (
        session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
        sequence INTEGER NOT NULL,
        finger_version TEXT NOT NULL,
        concord_version TEXT NOT NULL,
        captured_at REAL,
        event_type TEXT,
        pointer_type TEXT,
        pointer_id TEXT,
        client_x REAL,
        client_y REAL,
        normalized_x REAL,
        normalized_y REAL,
        raw_json TEXT NOT NULL,
        PRIMARY KEY(session_id, sequence)
      ) STRICT;
      CREATE INDEX IF NOT EXISTS events_session_time ON events(session_id, captured_at);
      CREATE INDEX IF NOT EXISTS events_session_pointer ON events(session_id, pointer_type);
      CREATE TABLE IF NOT EXISTS artifacts (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
        analysis_id TEXT,
        kind TEXT NOT NULL,
        finger_version TEXT NOT NULL,
        concord_version TEXT NOT NULL,
        relative_path TEXT NOT NULL UNIQUE,
        encoding TEXT NOT NULL,
        byte_length INTEGER NOT NULL,
        created_at TEXT NOT NULL
      ) STRICT;
      CREATE INDEX IF NOT EXISTS artifacts_session_kind ON artifacts(session_id, kind, created_at);
      CREATE TABLE IF NOT EXISTS analyses (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
        generation INTEGER NOT NULL,
        algorithm_version TEXT NOT NULL,
        finger_version TEXT NOT NULL,
        concord_version TEXT NOT NULL,
        created_at TEXT NOT NULL,
        replay_artifact_id TEXT NOT NULL REFERENCES artifacts(id),
        heatmap_artifact_id TEXT NOT NULL REFERENCES artifacts(id),
        summary_json TEXT NOT NULL,
        UNIQUE(session_id, generation)
      ) STRICT;
      CREATE INDEX IF NOT EXISTS analyses_session_generation ON analyses(session_id, generation DESC);
    `);
    const artifactColumns = this.database.prepare('PRAGMA table_info(artifacts)').all();
    if (!artifactColumns.some((column) => column.name === 'sha256')) {
      this.database.exec('ALTER TABLE artifacts ADD COLUMN sha256 TEXT');
    }
    return this;
  }

  close() {
    this.#db().close();
    this.database = null;
  }

  #db() {
    if (!this.database) throw new Error('FingerRuntimeStore has not been initialized');
    return this.database;
  }

  #requireSession(sessionId) {
    requiredString(sessionId, 'sessionId');
    const row = this.#db().prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId);
    if (!row) throw new Error(`Finger session not found: ${sessionId}`);
    return row;
  }

  #writeArtifact(sessionId, kind, value, analysisId = null) {
    this.#requireSession(sessionId);
    requiredString(kind, 'kind');
    const id = randomUUID();
    // Artifact storage paths are generated only from a server UUID; caller
    // controlled session ids never participate in filesystem path resolution.
    const relativePath = path.join(id.slice(0, 2), `${id}.json.gz`);
    const destination = artifactPath(this.objectDir, relativePath);
    const body = gzipSync(Buffer.from(json(value)), { level: 9 });
    const sha256 = createHash('sha256').update(body).digest('hex');
    mkdirSync(path.dirname(destination), { recursive: true, mode: 0o700 });
    writeFileSync(destination, body, { flag: 'wx', mode: 0o600 });
    this.#db().prepare(`
      INSERT INTO artifacts(id, session_id, analysis_id, kind, finger_version, concord_version,
        relative_path, encoding, byte_length, created_at, sha256)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'gzip+json', ?, ?, ?)
    `).run(id, sessionId, analysisId, kind, this.fingerVersion, this.concordVersion,
      relativePath, body.byteLength, now(), sha256);
    return id;
  }

  createSession(input = {}) {
    plainObject(input, 'session');
    const id = input.id == null ? randomUUID() : requiredString(input.id, 'id');
    const associationId = requiredString(input.associationId ?? input.actorId ?? randomUUID(), 'associationId');
    const userId = optionalString(input.userId, 'userId');
    const capabilities = input.capabilities == null ? {} : plainObject(input.capabilities, 'capabilities');
    const context = input.context ?? {
      visitId: input.visitId ?? null,
      trigger: input.trigger ?? null,
      metadata: input.metadata ?? {},
    };
    plainObject(context, 'context');
    const startedAt = input.startedAt == null ? now() : requiredString(input.startedAt, 'startedAt');

    this.#db().prepare(`
      INSERT INTO sessions(id, association_id, user_id, status, started_at, finger_version,
        concord_version, capabilities_json, context_json)
      VALUES (?, ?, ?, 'active', ?, ?, ?, ?, ?)
    `).run(id, associationId, userId, startedAt,
      optionalString(input.fingerVersion, 'fingerVersion') ?? this.fingerVersion,
      optionalString(input.concordVersion, 'concordVersion') ?? this.concordVersion,
      json(capabilities), json(context));

    if (input.initialDom != null) this.#writeArtifact(id, 'initial-dom', input.initialDom);
    return this.getSession(id);
  }

  appendEvents(sessionId, events) {
    const session = this.#requireSession(sessionId);
    if (session.status !== 'active') throw new Error(`cannot append events to ${session.status} session`);
    if (!Array.isArray(events) || events.length === 0) throw new TypeError('events must be a non-empty array');
    for (const event of events) plainObject(event, 'event');

    const database = this.#db();
    const insert = database.prepare(`
      INSERT INTO events(session_id, sequence, finger_version, concord_version, captured_at,
        event_type, pointer_type, pointer_id,
        client_x, client_y, normalized_x, normalized_y, raw_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const start = Number(database.prepare('SELECT COALESCE(MAX(sequence), -1) + 1 AS value FROM events WHERE session_id = ?').get(sessionId).value);
    transaction(database, () => {
      events.forEach((event, offset) => {
        insert.run(sessionId, start + offset, this.fingerVersion, this.concordVersion,
          capturedAt(event),
          event.type ?? null, event.pointerType ?? event.inputType ?? null,
          event.pointerId == null ? (event.identifier == null ? null : String(event.identifier)) : String(event.pointerId),
          databaseNumber(event.clientX) ?? databaseNumber(event.x),
          databaseNumber(event.clientY) ?? databaseNumber(event.y),
          databaseNumber(event.normalizedX), databaseNumber(event.normalizedY), json(event));
      });
      database.prepare('UPDATE sessions SET event_count = event_count + ? WHERE id = ?').run(events.length, sessionId);
    });
    this.#writeArtifact(sessionId, 'raw-event-batch', { firstSequence: start, events });
    return events.length;
  }

  finalizeSession(sessionId, input = {}) {
    const session = this.#requireSession(sessionId);
    plainObject(input, 'finalization');
    if (session.status !== 'active') throw new Error(`session is already ${session.status}`);
    const status = input.status ?? 'completed';
    if (!SESSION_STATES.has(status) || status === 'active') throw new TypeError('invalid final session status');
    if (input.events?.length) this.appendEvents(sessionId, input.events);
    if (input.finalDom != null) this.#writeArtifact(sessionId, 'final-dom', input.finalDom);

    const events = this.#readEvents(sessionId);
    const rawArtifactId = this.#writeArtifact(sessionId, 'raw-session', {
      session: mapSession(this.#requireSession(sessionId)),
      events,
      finalization: input,
    });
    const endedAt = input.endedAt == null ? now() : requiredString(input.endedAt, 'endedAt');
    const summary = {
      eventCount: events.length,
      rawArtifactId,
      pointerTypes: [...new Set(events.map((event) => event.pointerType).filter(Boolean))],
      observedMaxContacts: input.observedMaxContacts ?? null,
      completionReason: input.reason ?? null,
    };
    this.#db().prepare('UPDATE sessions SET status = ?, ended_at = ?, summary_json = ? WHERE id = ?')
      .run(status, endedAt, json(summary), sessionId);
    return this.getSession(sessionId);
  }

  #readEvents(sessionId) {
    return this.#db().prepare('SELECT raw_json FROM events WHERE session_id = ? ORDER BY sequence').all(sessionId)
      .map((row) => parseJson(row.raw_json));
  }

  #latestArtifactValue(sessionId, kind) {
    const row = this.#db().prepare(`
      SELECT id FROM artifacts WHERE session_id = ? AND kind = ? ORDER BY created_at DESC, id DESC LIMIT 1
    `).get(sessionId, kind);
    return row ? this.getArtifact(row.id).value : null;
  }

  getSession(sessionId, { includeEvents = false } = {}) {
    requiredString(sessionId, 'sessionId');
    const result = mapSession(this.#db().prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId));
    if (!result) return null;
    result.actorId = result.userId ?? result.associationId;
    result.visitId = result.context?.visitId ?? null;
    result.trigger = result.context?.trigger ?? null;
    if (includeEvents) result.events = this.#readEvents(sessionId);
    result.artifacts = this.#db().prepare(`
      SELECT id, kind, encoding, byte_length AS byteLength, created_at AS createdAt, sha256
      FROM artifacts WHERE session_id = ? ORDER BY created_at, id
    `).all(sessionId);
    result.analyses = this.#db().prepare(`
      SELECT id, generation, algorithm_version AS algorithmVersion, created_at AS createdAt,
        replay_artifact_id AS replayArtifactId, heatmap_artifact_id AS heatmapArtifactId,
        summary_json AS summaryJson
      FROM analyses WHERE session_id = ? ORDER BY generation DESC
    `).all(sessionId).map(({ summaryJson, ...row }) => ({ ...row, summary: parseJson(summaryJson) }));
    return result;
  }

  getArtifact(sessionId, artifactId = sessionId) {
    if (arguments.length === 1) sessionId = null;
    requiredString(artifactId, 'artifactId');
    const row = sessionId
      ? this.#db().prepare('SELECT * FROM artifacts WHERE id = ? AND session_id = ?').get(artifactId, sessionId)
      : this.#db().prepare('SELECT * FROM artifacts WHERE id = ?').get(artifactId);
    if (!row) throw new Error(`Finger artifact not found: ${artifactId}`);
    const compressed = readFileSync(artifactPath(this.objectDir, row.relative_path));
    if (row.sha256) {
      const actual = createHash('sha256').update(compressed).digest('hex');
      if (actual !== row.sha256) throw new Error(`Finger artifact integrity check failed: ${artifactId}`);
    }
    const data = gunzipSync(compressed);
    return {
      id: row.id,
      sessionId: row.session_id,
      analysisId: row.analysis_id,
      kind: row.kind,
      sha256: row.sha256 ?? null,
      createdAt: row.created_at,
      contentType: 'application/json; charset=utf-8',
      data,
      value: parseJson(data.toString('utf8')),
    };
  }

  getHistory(subject = {}, options = {}) {
    if (typeof subject === 'string') subject = { associationId: subject };
    const { associationId, userId, limit = options.limit ?? 100 } = subject;
    if (!associationId && !userId) throw new TypeError('associationId or userId is required');
    if (!Number.isInteger(limit) || limit < 1 || limit > 1_000) throw new TypeError('limit must be an integer from 1 to 1000');
    const column = associationId ? 'association_id' : 'user_id';
    const value = requiredString(associationId ?? userId, associationId ? 'associationId' : 'userId');
    return this.#db().prepare(`SELECT * FROM sessions WHERE ${column} = ? ORDER BY started_at DESC LIMIT ?`)
      .all(value, limit).map(mapSession);
  }

  compareHistories(subjects, options = {}) {
    if (!Array.isArray(subjects) || subjects.length < 2) throw new TypeError('at least two subjects are required');
    const actors = subjects.map((subject) => {
      if (typeof subject === 'string') {
        return { actorId: subject, sessions: this.getHistory(subject, options) };
      }
      return { subject: plainObject(subject, 'subject'), sessions: this.getHistory(subject, options) };
    });
    return { actors };
  }

  generateAnalysis(sessionId, { algorithmVersion = '1.0.0', options = {} } = {}) {
    const session = this.getSession(sessionId, { includeEvents: true });
    if (!session) throw new Error(`Finger session not found: ${sessionId}`);
    requiredString(algorithmVersion, 'algorithmVersion');
    plainObject(options, 'options');
    const rawSession = this.#latestArtifactValue(sessionId, 'raw-session');
    const firstEventViewport = session.events.find((event) => event?.viewport)?.viewport ?? null;
    const source = {
      ...session,
      viewport: session.context?.viewport ?? firstEventViewport,
      initialDom: this.#latestArtifactValue(sessionId, 'initial-dom'),
      finalDom: this.#latestArtifactValue(sessionId, 'final-dom'),
      events: [
        ...session.events,
        ...(rawSession?.finalization?.mutations ?? []).map((mutation) => ({
          type: 'mutation',
          timestamp: mutation.timestamp,
          elapsedMs: mutation.elapsedMs,
          mutation,
        })),
      ],
    };
    const output = processFingerSession(source, options);
    const database = this.#db();
    const generation = Number(database.prepare('SELECT COALESCE(MAX(generation), 0) + 1 AS value FROM analyses WHERE session_id = ?').get(sessionId).value);
    const analysisId = randomUUID();
    const replayArtifactId = this.#writeArtifact(sessionId, 'replay', output.replay, analysisId);
    const heatmapArtifactId = this.#writeArtifact(sessionId, 'heatmaps', output.heatMaps, analysisId);
    const summary = {
      eventCount: session.events.length,
      durationMs: output.bounds.durationMs,
      sampleCounts: Object.fromEntries(Object.entries(output.heatMaps.views)
        .map(([key, value]) => [key, value.position.sampleCount])),
      sourceSha256: output.source.sha256,
    };
    database.prepare(`
      INSERT INTO analyses(id, session_id, generation, algorithm_version, finger_version,
        concord_version, created_at,
        replay_artifact_id, heatmap_artifact_id, summary_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(analysisId, sessionId, generation, algorithmVersion, this.fingerVersion,
      this.concordVersion, now(), replayArtifactId, heatmapArtifactId, json(summary));
    return { id: analysisId, sessionId, generation, algorithmVersion, replayArtifactId, heatmapArtifactId, summary };
  }
}

export function initializeRuntimeStore(options) {
  return new FingerRuntimeStore(options).initialize();
}
