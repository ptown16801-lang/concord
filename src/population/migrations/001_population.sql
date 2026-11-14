PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS population_identities (
  id TEXT PRIMARY KEY,
  division TEXT NOT NULL,
  identity_class TEXT NOT NULL,
  creation_route TEXT NOT NULL CHECK (creation_route IN (
    'founding', 'executive_authorization', 'agent_petition'
  )),
  created_by TEXT NOT NULL,
  authority_reference TEXT NOT NULL,
  created_at TEXT NOT NULL,
  terminal_at TEXT,
  terminal_reason TEXT,
  terminal_by TEXT,
  terminal_reference TEXT,
  CHECK (
    (terminal_at IS NULL AND terminal_reason IS NULL AND terminal_by IS NULL AND terminal_reference IS NULL)
    OR
    (terminal_at IS NOT NULL AND terminal_reason IS NOT NULL AND terminal_by IS NOT NULL AND terminal_reference IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS population_events (
  sequence INTEGER PRIMARY KEY AUTOINCREMENT,
  identity_id TEXT NOT NULL REFERENCES population_identities(id),
  event_type TEXT NOT NULL CHECK (event_type IN ('created', 'terminal')),
  actor_id TEXT NOT NULL,
  authority_reference TEXT NOT NULL,
  occurred_at TEXT NOT NULL,
  details TEXT NOT NULL,
  UNIQUE (identity_id, event_type)
);

-- This trigger is a last line of defence for every identity class and every
-- writer, including future hidden-investigator/dual-census integrations.
CREATE TRIGGER IF NOT EXISTS population_living_cap_insert
BEFORE INSERT ON population_identities
WHEN (SELECT COUNT(*) FROM population_identities WHERE terminal_at IS NULL) >= 300
BEGIN
  SELECT RAISE(ABORT, 'population ceiling of 300 reached');
END;

CREATE TRIGGER IF NOT EXISTS population_identity_immutable
BEFORE UPDATE OF id, division, identity_class, creation_route, created_by,
  authority_reference, created_at ON population_identities
BEGIN
  SELECT RAISE(ABORT, 'identity creation record is immutable');
END;

CREATE TRIGGER IF NOT EXISTS population_no_terminal_rewrite
BEFORE UPDATE OF terminal_at, terminal_reason, terminal_by, terminal_reference
ON population_identities
WHEN OLD.terminal_at IS NOT NULL
BEGIN
  SELECT RAISE(ABORT, 'terminal state is final');
END;

CREATE TRIGGER IF NOT EXISTS population_events_no_update
BEFORE UPDATE ON population_events
BEGIN
  SELECT RAISE(ABORT, 'population events are append-only');
END;

CREATE TRIGGER IF NOT EXISTS population_events_no_delete
BEFORE DELETE ON population_events
BEGIN
  SELECT RAISE(ABORT, 'population events are append-only');
END;
