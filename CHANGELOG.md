# Decision maintenance — 2026-09-24

Prepared a source-backed root master and historical reconciliation on an isolated
branch; added maintenance instructions, reproducible summary and offline-capable
validation. No substantive policy adoption or product implementation is claimed.
Published for review as PR41; integration remains pending. See `docs/decisions/RECEIPT.md`.

The reconciliation-difference audit records JON-163 draft.3 and its actual advisory
response, preserves the existing CONCORD-WF-002 consultation instruction and ID,
corrects stale publication/project-identity wording, and indexes newer local work
without repeating or merging it. See `docs/decisions/RECONCILIATION_AUDIT_2026-09-24.md`.

# Changelog

This file consolidates the implementation history that was previously split across divergent Finger branches and pull-request descriptions. Historical branches/commits remain available as provenance; this log records the reconciled state rather than rewriting those histories.

## 2026-11-10 — AGT governance sandbox

### Added

- Added the AGT governance sandbox: admission contracts in `contracts/`, local examples in `examples/agt-local/`, the adapter, policy worker, policy evidence and sandbox runtime in `src/governance/`, three AGT test files, and the sandbox, audit and JON-132 rowid-repair documents. AGT files are identical to the head of PR #50 (`9e40e86`), which carries the audit fixes from PR #34 and the rowid approval repair, except `examples/agt-local/isolation.js` and `docs/decisions/JON132_ROWID_REPAIR_20261014.md`, which have machine paths removed.
- Added the `@microsoft/agent-governance-sdk` 5.0.0 dependency (with a `js-yaml` 5.4.2 override of the SDK's pinned 5.2.1, kept from PR #34 to address the YAML denial-of-service advisory GHSA-pm4m-ph32-ghv5), its lockfile entries, the `governance:*` scripts, and `npm ci --ignore-scripts` in CI.
- Nothing else from draft PR #37 (voting, bootstrap impeachment, population, eligibility, archive verifier, runtime preflight, review workflow, decision register changes) is included. No decision change.

## 2026-11-09 — Finger removed

### Removed

- Removed Finger (the browser interaction-capture demo) from the repository: `src/finger/`, `src/server.js`, the `public/` demo files, the four Finger test files, the `package.json` Finger exports and `start` script, and the Finger component reference. The project owner decided Finger is not part of Concord. Earlier entries below and the dated records under `docs/` are unchanged historical records; git history keeps the removed files. The default branch no longer has a runnable application or a startup command.

## Unreleased — reconciliation audit, 2026-09-16

### Added

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
