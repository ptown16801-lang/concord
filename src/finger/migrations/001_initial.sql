PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = FULL;

CREATE TABLE IF NOT EXISTS finger_sessions (
  id TEXT PRIMARY KEY,
  subject_key TEXT,
  concord_session_id TEXT,
  finger_version TEXT NOT NULL,
  concord_version TEXT NOT NULL,
  concord_build TEXT NOT NULL,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'closed', 'purge_pending')),
  created_at TEXT NOT NULL
) STRICT;

CREATE INDEX IF NOT EXISTS finger_sessions_subject_time
  ON finger_sessions(subject_key, started_at);
CREATE INDEX IF NOT EXISTS finger_sessions_concord_session
  ON finger_sessions(concord_session_id);

CREATE TABLE IF NOT EXISTS finger_events (
  session_id TEXT NOT NULL REFERENCES finger_sessions(id) ON DELETE CASCADE,
  sequence INTEGER NOT NULL CHECK (sequence >= 0),
  occurred_at_ms REAL NOT NULL CHECK (occurred_at_ms >= 0),
  event_type TEXT NOT NULL,
  pointer_kind TEXT,
  contact_id TEXT,
  raw_x REAL,
  raw_y REAL,
  normalized_x REAL,
  normalized_y REAL,
  raw_payload TEXT NOT NULL CHECK (json_valid(raw_payload)),
  finger_version TEXT NOT NULL,
  concord_version TEXT NOT NULL,
  concord_build TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (session_id, sequence)
) STRICT;

CREATE INDEX IF NOT EXISTS finger_events_time
  ON finger_events(session_id, occurred_at_ms, sequence);
CREATE INDEX IF NOT EXISTS finger_events_kind_time
  ON finger_events(event_type, occurred_at_ms);

CREATE TABLE IF NOT EXISTS finger_artifacts (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES finger_sessions(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  object_key TEXT NOT NULL,
  sha256 TEXT NOT NULL CHECK (length(sha256) = 64),
  byte_length INTEGER NOT NULL CHECK (byte_length >= 0),
  content_type TEXT NOT NULL,
  source_artifact_id TEXT REFERENCES finger_artifacts(id),
  finger_version TEXT NOT NULL,
  concord_version TEXT NOT NULL,
  concord_build TEXT NOT NULL,
  created_at TEXT NOT NULL,
  retention TEXT NOT NULL DEFAULT 'permanent' CHECK (retention = 'permanent')
) STRICT;

CREATE INDEX IF NOT EXISTS finger_artifacts_session_kind
  ON finger_artifacts(session_id, kind, created_at);
CREATE INDEX IF NOT EXISTS finger_artifacts_object_key
  ON finger_artifacts(object_key);

CREATE TABLE IF NOT EXISTS finger_analysis_generations (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES finger_sessions(id) ON DELETE CASCADE,
  generation INTEGER NOT NULL CHECK (generation > 0),
  analyzer TEXT NOT NULL,
  analyzer_version TEXT NOT NULL,
  source_artifact_id TEXT NOT NULL REFERENCES finger_artifacts(id),
  manifest_artifact_id TEXT NOT NULL REFERENCES finger_artifacts(id),
  configuration TEXT NOT NULL CHECK (json_valid(configuration)),
  finger_version TEXT NOT NULL,
  concord_version TEXT NOT NULL,
  concord_build TEXT NOT NULL,
  created_at TEXT NOT NULL,
  UNIQUE (session_id, generation)
) STRICT;

CREATE INDEX IF NOT EXISTS finger_analysis_session_time
  ON finger_analysis_generations(session_id, created_at);

CREATE TABLE IF NOT EXISTS finger_concord_summary_links (
  session_id TEXT NOT NULL REFERENCES finger_sessions(id) ON DELETE CASCADE,
  summary_type TEXT NOT NULL,
  summary_id TEXT NOT NULL,
  linked_at TEXT NOT NULL,
  PRIMARY KEY (session_id, summary_type, summary_id)
) STRICT;

CREATE INDEX IF NOT EXISTS finger_summary_reverse_lookup
  ON finger_concord_summary_links(summary_type, summary_id);

CREATE TABLE IF NOT EXISTS finger_purge_audit (
  session_id TEXT PRIMARY KEY,
  requested_by TEXT NOT NULL,
  reason TEXT NOT NULL,
  requested_at TEXT NOT NULL,
  completed_at TEXT,
  object_keys TEXT NOT NULL CHECK (json_valid(object_keys))
) STRICT;

CREATE TRIGGER IF NOT EXISTS finger_events_no_update
BEFORE UPDATE ON finger_events
BEGIN
  SELECT RAISE(ABORT, 'Finger events are immutable');
END;

CREATE TRIGGER IF NOT EXISTS finger_sessions_guard_delete
BEFORE DELETE ON finger_sessions
WHEN NOT EXISTS (
  SELECT 1 FROM finger_purge_audit WHERE session_id = OLD.id
)
BEGIN
  SELECT RAISE(ABORT, 'Finger sessions require an audited purge');
END;

CREATE TRIGGER IF NOT EXISTS finger_events_guard_delete
BEFORE DELETE ON finger_events
WHEN NOT EXISTS (
  SELECT 1 FROM finger_purge_audit WHERE session_id = OLD.session_id
)
BEGIN
  SELECT RAISE(ABORT, 'Finger events require an audited purge');
END;

CREATE TRIGGER IF NOT EXISTS finger_artifacts_guard_delete
BEFORE DELETE ON finger_artifacts
WHEN NOT EXISTS (
  SELECT 1 FROM finger_purge_audit WHERE session_id = OLD.session_id
)
BEGIN
  SELECT RAISE(ABORT, 'Finger artifacts require an audited purge');
END;

CREATE TRIGGER IF NOT EXISTS finger_analysis_guard_delete
BEFORE DELETE ON finger_analysis_generations
WHEN NOT EXISTS (
  SELECT 1 FROM finger_purge_audit WHERE session_id = OLD.session_id
)
BEGIN
  SELECT RAISE(ABORT, 'Finger analysis generations require an audited purge');
END;

CREATE TRIGGER IF NOT EXISTS finger_analysis_no_update
BEFORE UPDATE ON finger_analysis_generations
BEGIN
  SELECT RAISE(ABORT, 'Finger analysis generations are immutable');
END;

CREATE TRIGGER IF NOT EXISTS finger_artifacts_no_update
BEFORE UPDATE ON finger_artifacts
BEGIN
  SELECT RAISE(ABORT, 'Finger artifacts are immutable');
END;
