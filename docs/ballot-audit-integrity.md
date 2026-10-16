# JON-80 ballot audit integrity follow-up

This change is based on the recovered JON-80 artifact at
`b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf` ([PR #8](https://github.com/ptown16801-lang/concord/pull/8)).
Its original branch and commit remain the recovery evidence. This follow-up
addresses the audit-history and concurrency-test gaps recorded in
[JON-80](https://linear.app/jons-garage/issue/JON-80/jon-58c-immutable-ballot-receipt-and-submission-handling).

The recovered schema protected accepted ballots from direct updates/deletion,
but allowed attempt history to be edited and rejected attempts to be deleted.
SQLite replacement writes can also bypass deletion triggers when
`recursive_triggers` is disabled. Changing an attempt's raw submission could
therefore leave a receipt pointing to different data than its recorded digest.

The additive migration now:

- rejects all updates/deletions of `ballot_attempts`;
- rejects attempt insertions that collide with an existing ID or explicit rowid;
- rejects accepted-ballot insertions that collide with an existing receipt ID,
  attempt ID, election/identity pair, or explicit rowid.

The insertion guards run before conflict replacement, so they also protect
independent SQLite connections with recursive triggers disabled. Ordinary
append operations continue through `BallotBox.submit()`. Future unique
constraints must be added to the relevant collision guard as well.

`BallotBox` already executes the idempotent migration whenever it opens a
database. Reopening with this version installs the new triggers on existing
tables without rebuilding them or altering historical rows. Existing history
is preserved as found; the migration cannot reconstruct records already
tampered with or removed before the upgrade. Existing running writers should
be stopped for controlled deployment and restarted with the upgraded version.

The regression tests create an old-schema database from
`test-support/ballots-legacy.sql`, which is the exact migration from the pinned
recovery commit. They populate all six attempt dispositions, install the new
guards through a normal `BallotBox` open, exercise mutation/replacement from an
independent connection, and verify unchanged history after reopening. The
concurrency test uses two child processes with separate database connections
and an IPC readiness barrier. Both submit for the same identity/election; one
receipt and both audited attempts must survive reopening. Worker deadlines and
test cleanup prevent abandoned processes and temporary databases.

These are integrity controls within the existing writer boundary. A process
that can drop triggers, modify SQLite schema, replace the database file, or
write arbitrary bytes can bypass them. Linux process/file isolation and the
authorized writer service remain required. Explicit negative rowids are not
part of the `BallotBox` API; the conservative rowid collision check can reject
new inserts if legacy data uses SQLite's `-1` unassigned-rowid sentinel.

This change does not implement or approve authoritative eligibility adapters,
credential verification, election-close boundary semantics, or integration
with JON-78/79/81. The recovered JON-80 draft and downstream acceptance gates
remain separate from this fix.
