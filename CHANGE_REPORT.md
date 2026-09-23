# JON-80 ballot audit integrity fix

- Repository: `ptown16801-lang/concord`.
- Starting branch: `fix/jon80-append-only-audit-20260916`.
- Starting commit: `b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf`.
- Intended review base: `delivery/jon-80-recovery-20260916` (PR #8 recovery artifact).
- Authorization: the user's assessment/fixes/team request and JON-80's existing authorized implementation contract.

## Problem and correction

The recovered implementation allowed ballot attempt rows to be modified or
deleted. File-backed reproduction changed both accepted/rejected raw
submissions and deleted a rejected attempt; changes persisted after reopening.
SQLite `INSERT OR REPLACE` also bypassed a deletion-only guard with default
recursive-trigger settings.

Added schema triggers rejecting attempt updates/deletions and replacement
collisions. Accepted receipts receive insert-collision protection for their
primary key, both unique constraints, and explicit rowid. Triggers are
installed by the existing idempotent open-time migration, including on legacy
databases. Replaced the serialized Promise test with real competing child
processes sharing a database file.

## Files

- `src/governance/migrations/001_ballots.sql`: additive mutation/replacement guards.
- `test/ballots.test.js`: legacy upgrade, independent-connection mutation/replacement, reopen, and process-concurrency coverage.
- `test-support/ballot-submit-worker.mjs`: bounded separate-process submitter.
- `test-support/ballots-legacy.sql`: unchanged historical migration fixture from the starting commit.
- `docs/ballot-audit-integrity.md`: deployment, integrity boundary, and remaining review requirements.
- `CHANGELOG.md`: additive correction to the historical append-only/concurrency claims.
- `CHANGE_REPORT.md`: this delivery record.

## Verification

Local runtime: Node.js `v24.19.0`.

- `node --test test/ballots.test.js`: 9 passed, 0 failed.
- `npm test`: 32 passed, 0 failed.
- `npm run check`: passed.
- `git diff --check`: passed.
- No build/compile step exists in this package; no build was performed.

## Remaining boundaries

Schema/file-owning processes can bypass database triggers; process isolation,
file permissions, and authoritative writer access remain required. The fix
does not recover previously altered history or resolve eligibility/authentication
adapters, close-time semantics, or cross-track integration. Existing running
writers should be stopped and restarted during controlled deployment. Explicit
negative rowids are outside the API; conservative collision protection may
block inserts for legacy data containing the `-1` sentinel.

No merge, production deployment, dependency acceptance, or Linear execution
was performed. The original recovery branch and commit were left unchanged.
