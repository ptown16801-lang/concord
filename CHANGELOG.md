# Changelog

This file consolidates the implementation history that was previously split across divergent Finger branches and pull-request descriptions. Historical branches/commits remain available as provenance; this log records the reconciled state rather than rewriting those histories.

## Unreleased — reconciliation audit, 2026-09-16

### Added

- Added authoritative exact electorate accounting for disjoint accepted-ballot
  and eligible-nonvoter sets, including integer-only threshold decisions.
- Reconciled the deployable Finger browser collector with the canonical single-request ingestion API.
- Added a standalone Finger demo page and static-file serving.
- Added deterministic replay and touch/mouse/stylus/combined heat-map processing utilities from the replay-processing branch.
- Added processing exports from the package/module boundary.
- Added a dependency-free `package-lock.json` matching the canonical package metadata.
- Added a branch-safe GitHub Actions test workflow for Node.js 22 and 24.
- Added regression coverage for filesystem traversal and collector-relative durable event timing.
- Added `PROJECT_RECORD.md` and `docs/AUDIT_2026-09-16.md` as canonical reconciliation/audit records.

### Changed

- Preserved the previously merged server-ingestion, signed identity-cookie, SQLite-history, content-addressed object-store, analysis-generation, Concord-linkage, and audited-purge architecture as the canonical persistence foundation.
- Reworked the collector submission format to the canonical `POST /api/finger/sessions` contract instead of adopting the divergent multi-route server implementation.
- Made authenticated `x-concord-user` trust explicitly opt-in with `FINGER_TRUST_CONCORD_USER_HEADER=true`; anonymous association remains server-authenticated by a signed HttpOnly cookie.
- Removed the collector's redundant persistent `localStorage` association ID; the signed server identity is the longitudinal association authority.
- Redacted editable/form content in DOM snapshots and mutation serialization, and stopped recording literal keyboard `event.key` characters while retaining structural key metadata.
- Preserved collector-relative timing (`elapsedMs`) when normalizing durable event rows instead of falling back to sequence numbers when browser events carry ISO timestamps.
- Made replay processing prefer collector-relative `elapsedMs` and accept per-event viewport dimensions when a top-level viewport is unavailable.
- Consolidated runtime environment parsing and normalized custom database/object-store paths before use.
- Restricted content-addressed object-store directories to mode `0700` and object files to mode `0600`.
- Extended `.gitignore` to cover both `var/` and `.finger-data/` runtime state.
- Updated package exports/scripts and reconciled README documentation with the actual runtime/security contract.

### Fixed

- Removed caller-controlled session IDs from filesystem directory construction in the simple development `FileFingerStore`; directories are now keyed by SHA-256 of the logical session ID.
- Added a regression test proving a path-like session ID cannot escape the configured store.
- Removed a duplicate staged runtime-store implementation after determining the existing content-addressed persistence layer was the stronger canonical authority.
- Removed a duplicate unused runtime configuration module after consolidating configuration in the server entry point.
- Avoided importing the divergent branch's administrative HTTP routes, whose behavior could allow reads when no admin token was configured.
- Avoided importing the divergent branch's default trust of client-controlled Concord identity headers/body fields.
- Avoided importing the divergent branch's artifact path construction that included a caller-controlled session ID.
- Corrected the CI trigger model so checks run on the actual repository branches rather than depending on a nonexistent `main` branch.

### Verification

- Initial reconciliation CI completed successfully on Node.js 22 and Node.js 24 after the storage hardening, processing merge, timing fixes, collector integration, package reconciliation, and workflow addition.
- A final exact-tree CI result is recorded in `docs/AUDIT_2026-09-16.md` after the documentation/configuration cleanup.

## 2026-09-16 — previously merged persistence baseline

The default branch already contained the work merged through PR #2, **Implement Finger raw storage and historical retention**. That baseline introduced:

- `FingerSqliteRepository` and the initial strict SQLite schema/migration;
- immutable event/artifact/analysis-generation controls;
- content-addressed `FileObjectStore` storage;
- `FingerPersistence` coordination and audited purge flow;
- `PersistentFingerStore` ingestion adapter;
- server-owned Finger/Concord version stamps;
- signed anonymous identity cookies and authenticated-user association hook; and
- non-blocking HTTP ingestion that always acknowledges the browser flow without exposing backend failure.

This baseline is retained rather than replaced by either divergent draft branch.

## 2026-09-16 — divergent draft branches reconciled

### PR #1 / replay and heat-map processing

Useful processing code and tests were incorporated into the reconciliation branch as a storage-independent library. It was adapted for collector-relative timing and per-event viewport data. The original draft PR is superseded by the reconciled implementation rather than merged verbatim.

### PR #3 / end-to-end collector

The browser interaction design, demo concepts, and useful runtime behavior were incorporated. The branch-specific server/store/admin implementation was not adopted wholesale because it duplicated the already-merged persistence architecture and introduced avoidable identity/access/path inconsistencies. The collector was instead adapted to the canonical ingestion/persistence stack.
