PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS ballot_attempts (
  id TEXT PRIMARY KEY,
  election_id TEXT,
  identity_id TEXT,
  source_type TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  recorded_at TEXT NOT NULL,
  disposition TEXT NOT NULL CHECK (disposition IN
    ('accepted', 'duplicate', 'malformed', 'ineligible', 'late', 'wrong_source')),
  reason TEXT NOT NULL,
  raw_submission TEXT NOT NULL,
  accepted_receipt_id TEXT
);

CREATE TABLE IF NOT EXISTS accepted_ballots (
  receipt_id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL UNIQUE REFERENCES ballot_attempts(id),
  election_id TEXT NOT NULL,
  identity_id TEXT NOT NULL,
  choice TEXT NOT NULL,
  accepted_at TEXT NOT NULL,
  submission_digest TEXT NOT NULL,
  UNIQUE (election_id, identity_id)
);

CREATE INDEX IF NOT EXISTS ballot_attempt_election_identity
  ON ballot_attempts(election_id, identity_id, submitted_at);

CREATE TRIGGER IF NOT EXISTS accepted_ballots_no_update
BEFORE UPDATE ON accepted_ballots
BEGIN
  SELECT RAISE(ABORT, 'accepted ballots are immutable');
END;

CREATE TRIGGER IF NOT EXISTS accepted_ballots_no_delete
BEFORE DELETE ON accepted_ballots
BEGIN
  SELECT RAISE(ABORT, 'accepted ballots are immutable');
END;

CREATE TRIGGER IF NOT EXISTS ballot_attempts_no_update
BEFORE UPDATE ON ballot_attempts
BEGIN
  SELECT RAISE(ABORT, 'ballot attempts are append-only');
END;

CREATE TRIGGER IF NOT EXISTS ballot_attempts_no_delete
BEFORE DELETE ON ballot_attempts
BEGIN
  SELECT RAISE(ABORT, 'ballot attempts are append-only');
END;

-- REPLACE implicitly deletes conflicting rows without firing delete triggers
-- when recursive_triggers is off. Reject collisions before SQLite can replace
-- history, including an explicitly supplied rowid. These schema-level guards
-- also apply to independent connections with default PRAGMA settings.
CREATE TRIGGER IF NOT EXISTS ballot_attempts_no_replace
BEFORE INSERT ON ballot_attempts
WHEN EXISTS (
  SELECT 1 FROM ballot_attempts
  WHERE id = NEW.id OR rowid = NEW.rowid
)
BEGIN
  SELECT RAISE(ABORT, 'ballot attempts are append-only');
END;

CREATE TRIGGER IF NOT EXISTS accepted_ballots_no_replace
BEFORE INSERT ON accepted_ballots
WHEN EXISTS (
  SELECT 1 FROM accepted_ballots
  WHERE receipt_id = NEW.receipt_id
    OR attempt_id = NEW.attempt_id
    OR (election_id = NEW.election_id AND identity_id = NEW.identity_id)
    OR rowid = NEW.rowid
)
BEGIN
  SELECT RAISE(ABORT, 'accepted ballots are immutable');
END;
