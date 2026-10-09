# Vote / Concord project record

**Record date:** 2026-09-16  
**Purpose:** give the project one explicit source-ordering and reconciliation record without deleting or rewriting historical artifacts.

## 1. Project boundary

- **Vote** is the canonical top-level project.
- **Voat** is a folder name, not a competing project identity.
- **Concord** is an implementation and UI surface inside Vote.
- This GitHub repository currently contains a focused Concord implementation area, especially the **Finger** subsystem. It is not by itself the complete Vote project archive.

The Research Library status workbook also records Vote as the boundary owner and Concord as an implementation/UI consumer. That distinction should be retained in future documentation and issue naming.

## 2. Source precedence

When records disagree, do not silently merge incompatible facts. Use this order unless a later explicit user decision says otherwise:

1. **Later explicit user decisions and accepted corrections.** A later unambiguous decision supersedes an older conflicting proposal or assumption.
2. **Current executable source and tests for implementation facts.** GitHub code says what the present repository actually implements; documentation cannot claim a feature is enforced when the code does not enforce it.
3. **Current canonical status/index records for external artifacts.** For the Research Library, the `Vote Research Library — Archiver and Identity Audit` workbook's `Current Status` sheet is the current artifact/status index.
4. **Newest reconciled decision records for the period they cover.** For the September 11–13 governance-design record set found in the project library, `DECISIONS_agreements_updated_20260912.md` is the newest general reconciliation found during this audit. Later topic-specific accepted records and later explicit user decisions remain additive/superseding.
5. **Newest applicable Workbench artifact for UI behavior, subject to a canonical artifact index when one exists.** A Workbench is an implementation snapshot, not authority to overwrite a later explicit decision.
6. **Older decision files, change reports, drafts, conflict reviews, and snapshots.** Preserve them as provenance. They can explain how the project evolved but should not be treated as independently current when a newer reconciliation exists.

## 3. Decision-file reconciliation

The file library contains multiple files named `DECISIONS.md`, along with dated/specialized variants such as:

- `DECISIONS_before_late_addendum_20260911.md`
- `DECISIONS_updated.md`
- `DECISIONS_relational_updated.md`
- `DECISIONS_agreements_updated_20260912.md`
- `DECISIONS(1).md`

These are **not** to be collapsed by deleting old copies. They are historical snapshots and audit evidence.

A known identifier correction is already documented inside the reconciled decision record:

- `DEC-004` remains the pre-existing player-state-ownership decision.
- authoritative game persistence/exports is `DEC-007`, not `DEC-004`;
- separate protected government datastores is `DEC-008`.

Where an older file uses an earlier proposed identifier, preserve the old text but use the corrected identifiers in current references. Repeated copies of the same user acceptance are one decision, not separate approvals.

## 4. Workbench and Research Library reconciliation

The Research Library `Current Status` sheet records:

- canonical project: **Vote**;
- Concord role: **implementation / UI surface**;
- a merged Research Library Workbench artifact named `Concord_Workbench-3-Research-Library.html`;
- recorded SHA-256: `580d95545b68316a492651cf5df422ae94f6eb2c9bca84fde34984411e880b6f`;
- implemented route states `#/research-library` and `#/research-library/GOV-###`;
- arbitrary cross-module Search/Learning/Data Atlas path acceptance still in progress;
- static-schema normalization still TODO; and
- live-browser acceptance blocked in the restricted runtime used for that audit.

The file-library search performed for this reconciliation found `Concord_Workbench-3.html` and earlier Workbench copies, but did **not** independently locate the exact `Concord_Workbench-3-Research-Library.html` bytes. Therefore this repository record treats the workbook's artifact name/hash as the canonical index entry and does not claim an independent byte-for-byte verification of that external artifact.

## 5. Finger reconciliation

### Canonical storage/identity foundation

The repository's previously merged persistence branch is retained as the canonical Finger backend foundation because it already provides:

- server-generated capture IDs;
- signed HttpOnly anonymous identity cookies;
- a server-side hook for authenticated Concord identity;
- strict SQLite queryable history;
- content-addressed immutable object storage;
- server-owned Finger/Concord version stamps;
- append-only analysis-generation metadata;
- Concord summary-link metadata; and
- an audited purge mechanism.

### Replay branch

The replay/heat-map draft branch contributed the storage-independent processor and regression tests. That code is incorporated into the canonical reconciliation as a library, with compatibility fixes for collector-relative timing and per-event viewport dimensions.

### End-to-end collector branch

The end-to-end draft branch contributed the browser interaction flow, demo concepts, and capture behavior. Its alternate server/store/admin implementation was **not** adopted wholesale because it duplicated the already-merged persistence authority and produced inconsistent identity/access/filesystem behavior.

The browser collector is instead adapted to the canonical single-request ingestion endpoint. This preserves one backend source of truth.

## 6. Change-log policy

`CHANGELOG.md` is the canonical implementation change log for this repository going forward.

Rules:

- Historical commits, PR descriptions, and old change reports remain provenance.
- Current changes should be summarized in `CHANGELOG.md` once, with links/references to the underlying commits or PRs when useful.
- Do not duplicate the same accepted change as multiple independent milestones merely because it appears in several old files.
- Corrections are additive: record what was wrong, what supersedes it, and retain the old source rather than silently rewriting history.

## 7. Current repository branch state

At the start of this audit the repository default branch had a feature-specific name: `ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f`. It already included the merged persistence PR and was therefore used as the safest code baseline.

A reconciliation branch, `audit/concord-reconciliation-20260916`, was created from that exact baseline. The two divergent Finger draft branches were reviewed and selectively reconciled into it rather than force-merged.

Once the final exact-tree CI checks pass, the reconciliation branch is suitable to become the current code state. The unusual default-branch name is an organizational issue; changing the repository's default-branch setting is separate from code correctness and should not be confused with choosing a different implementation baseline.

## 8. Records that remain historical, not current proof

Examples found during the audit include old conflict reviews, status outputs, prior decision snapshots, and older Workbench files. A historical test status such as a prior `STATUS.json` does not prove the current Finger repository passes those same checks. Likewise, a conflict review of an older Constitution version documents that review period; it does not by itself establish the current state of a later design.

Current implementation claims should always be backed by current code/tests or by the current artifact/status index applicable to that subsystem.
