import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const migration = readFileSync(
  fileURLToPath(new URL("./migrations/001_initial.sql", import.meta.url)),
  "utf8",
);

function json(value) {
  return JSON.stringify(value ?? {});
}

function parseRows(rows) {
  return rows.map((row) => ({
    ...row,
    rawPayload: JSON.parse(row.rawPayload),
  }));
}

export class FingerSqliteRepository {
  constructor(filename = ":memory:") {
    this.database = new DatabaseSync(filename);
    this.database.exec(migration);
  }

  close() {
    this.database.close();
  }

  getSessionVersions(sessionId) {
    const row = this.database
      .prepare(
        `
      SELECT finger_version AS fingerVersion,
        concord_version AS concordVersion, concord_build AS concordBuild
      FROM finger_sessions WHERE id = ?
    `,
      )
      .get(sessionId);
    if (!row) throw new Error(`Finger session not found: ${sessionId}`);
    return { ...row };
  }

  assertArtifactSession(sessionId, artifactId) {
    const row = this.database
      .prepare(
        "SELECT session_id AS sessionId FROM finger_artifacts WHERE id = ?",
      )
      .get(artifactId);
    if (!row) throw new Error(`Finger artifact not found: ${artifactId}`);
    if (row.sessionId !== sessionId) {
      throw new Error(
        "Finger source artifacts must belong to the same session",
      );
    }
  }

  createSession(session) {
    this.database
      .prepare(
        `
      INSERT INTO finger_sessions (
        id, subject_key, concord_session_id, finger_version, concord_version,
        concord_build, started_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      )
      .run(
        session.id,
        session.subjectKey ?? null,
        session.concordSessionId ?? null,
        session.fingerVersion,
        session.concordVersion,
        session.concordBuild,
        session.startedAt,
        session.createdAt,
      );
  }

  appendEvents(sessionId, events, createdAt) {
    if (events.length === 0) return;
    const versions = this.getSessionVersions(sessionId);
    const insert = this.database.prepare(`
      INSERT INTO finger_events (
        session_id, sequence, occurred_at_ms, event_type, pointer_kind,
        contact_id, raw_x, raw_y, normalized_x, normalized_y, raw_payload,
        finger_version, concord_version, concord_build, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    this.database.exec("BEGIN IMMEDIATE");
    try {
      for (const event of events) {
        insert.run(
          sessionId,
          event.sequence,
          event.occurredAtMs,
          event.eventType,
          event.pointerKind ?? null,
          event.contactId == null ? null : String(event.contactId),
          event.rawX ?? null,
          event.rawY ?? null,
          event.normalizedX ?? null,
          event.normalizedY ?? null,
          json(event.rawPayload),
          versions.fingerVersion,
          versions.concordVersion,
          versions.concordBuild,
          createdAt,
        );
      }
      this.database.exec("COMMIT");
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }

  addArtifact(artifact) {
    this.database
      .prepare(
        `
      INSERT INTO finger_artifacts (
        id, session_id, kind, object_key, sha256, byte_length, content_type,
        source_artifact_id, finger_version, concord_version, concord_build,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      )
      .run(
        artifact.id,
        artifact.sessionId,
        artifact.kind,
        artifact.objectKey,
        artifact.sha256,
        artifact.byteLength,
        artifact.contentType,
        artifact.sourceArtifactId ?? null,
        artifact.fingerVersion,
        artifact.concordVersion,
        artifact.concordBuild,
        artifact.createdAt,
      );
  }

  addAnalysisGeneration(generation) {
    this.database.exec("BEGIN IMMEDIATE");
    try {
      generation.generation = this.database
        .prepare(
          `
        SELECT COALESCE(MAX(generation), 0) + 1 AS generation
        FROM finger_analysis_generations WHERE session_id = ?
      `,
        )
        .get(generation.sessionId).generation;
      this.database
        .prepare(
          `
        INSERT INTO finger_analysis_generations (
          id, session_id, generation, analyzer, analyzer_version,
          source_artifact_id, manifest_artifact_id, configuration,
          finger_version, concord_version, concord_build, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        )
        .run(
          generation.id,
          generation.sessionId,
          generation.generation,
          generation.analyzer,
          generation.analyzerVersion,
          generation.sourceArtifactId,
          generation.manifestArtifactId,
          json(generation.configuration),
          generation.fingerVersion,
          generation.concordVersion,
          generation.concordBuild,
          generation.createdAt,
        );
      this.database.exec("COMMIT");
      return generation.generation;
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }

  linkConcordSummary(sessionId, summaryType, summaryId, linkedAt) {
    this.database
      .prepare(
        `
      INSERT OR IGNORE INTO finger_concord_summary_links
        (session_id, summary_type, summary_id, linked_at)
      VALUES (?, ?, ?, ?)
    `,
      )
      .run(sessionId, summaryType, summaryId, linkedAt);
  }

  completeSession(sessionId, status, endedAt) {
    const result = this.database
      .prepare(
        `
      UPDATE finger_sessions SET status = ?, ended_at = ?
      WHERE id = ? AND status = 'active'
    `,
      )
      .run(status, endedAt, sessionId);
    if (result.changes !== 1)
      throw new Error(`Active Finger session not found: ${sessionId}`);
  }

  queryEvents(sessionId, options = {}) {
    const clauses = ["session_id = ?"];
    const values = [sessionId];
    if (options.fromMs != null) {
      clauses.push("occurred_at_ms >= ?");
      values.push(options.fromMs);
    }
    if (options.toMs != null) {
      clauses.push("occurred_at_ms <= ?");
      values.push(options.toMs);
    }
    if (options.eventType != null) {
      clauses.push("event_type = ?");
      values.push(options.eventType);
    }
    const limit = options.limit ?? 10_000;
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100_000) {
      throw new RangeError("Event query limit must be between 1 and 100000");
    }
    values.push(limit);
    const rows = this.database
      .prepare(
        `
      SELECT sequence, occurred_at_ms AS occurredAtMs, event_type AS eventType,
        pointer_kind AS pointerKind, contact_id AS contactId, raw_x AS rawX,
        raw_y AS rawY, normalized_x AS normalizedX,
        normalized_y AS normalizedY, raw_payload AS rawPayload
      FROM finger_events WHERE ${clauses.join(" AND ")}
      ORDER BY occurred_at_ms, sequence LIMIT ?
    `,
      )
      .all(...values);
    return parseRows(rows);
  }

  getHistory(subjectKey) {
    return this.database
      .prepare(
        `
      SELECT s.id, s.concord_session_id AS concordSessionId,
        s.finger_version AS fingerVersion, s.concord_version AS concordVersion,
        s.concord_build AS concordBuild, s.started_at AS startedAt,
        s.ended_at AS endedAt, s.status,
        (SELECT COUNT(*) FROM finger_events e WHERE e.session_id = s.id) AS eventCount,
        (SELECT COUNT(*) FROM finger_analysis_generations g WHERE g.session_id = s.id) AS analysisCount
      FROM finger_sessions s
      WHERE s.subject_key = ? AND s.status != 'purge_pending'
      ORDER BY s.started_at DESC
    `,
      )
      .all(subjectKey);
  }

  beginPurge(sessionId, requestedBy, reason, requestedAt) {
    const existing = this.database
      .prepare(
        `
      SELECT object_keys AS objectKeys FROM finger_purge_audit
      WHERE session_id = ? AND completed_at IS NULL
    `,
      )
      .get(sessionId);
    if (existing) return JSON.parse(existing.objectKeys);

    this.database.exec("BEGIN IMMEDIATE");
    try {
      const keys = this.database
        .prepare(
          `
        SELECT DISTINCT target.object_key AS objectKey
        FROM finger_artifacts target
        WHERE target.session_id = ?
          AND NOT EXISTS (
            SELECT 1 FROM finger_artifacts retained
            WHERE retained.object_key = target.object_key
              AND retained.session_id != target.session_id
          )
      `,
        )
        .all(sessionId)
        .map(({ objectKey }) => objectKey);
      const result = this.database
        .prepare(
          `
        UPDATE finger_sessions SET status = 'purge_pending' WHERE id = ?
      `,
        )
        .run(sessionId);
      if (result.changes !== 1)
        throw new Error(`Finger session not found: ${sessionId}`);
      this.database
        .prepare(
          `
        INSERT INTO finger_purge_audit (
          session_id, requested_by, reason, requested_at, object_keys
        ) VALUES (?, ?, ?, ?, ?)
      `,
        )
        .run(sessionId, requestedBy, reason, requestedAt, JSON.stringify(keys));
      this.database.exec("COMMIT");
      return keys;
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }

  finishPurge(sessionId, completedAt) {
    this.database.exec("BEGIN IMMEDIATE");
    try {
      const result = this.database
        .prepare(
          `
        DELETE FROM finger_sessions WHERE id = ? AND status = 'purge_pending'
      `,
        )
        .run(sessionId);
      if (result.changes !== 1) {
        throw new Error(`Pending Finger purge not found: ${sessionId}`);
      }
      this.database
        .prepare(
          `
        UPDATE finger_purge_audit SET completed_at = ? WHERE session_id = ?
      `,
        )
        .run(completedAt, sessionId);
      this.database.exec("COMMIT");
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }
}
