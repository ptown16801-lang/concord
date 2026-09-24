# Evidence snapshot: pr-12

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/12
- Version: retrieval snapshot
- Source date: 2026-09-16T23:09:30Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/12",
  "number": 12,
  "state": "open",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "The recovered ballot implementation allowed accepted/rejected attempt history to be updated or deleted. INSERT OR REPLACE could also overwrite history despite delete guards when recursive_triggers was disabled.\n\nThis focused follow-up adds UPDATE/DELETE attempt guards and insert-collision guards for attempt IDs/rowids and every existing accepted-receipt unique key/rowid. The existing idempotent migration installs guards on legacy databases. Tests verify unchanged history across independent connections and reopening, including REPLACE with recursive_triggers OFF. The serialized Promise-based submission test is replaced with two child processes, independent BallotBox connections, one SQLite file, and a readiness barrier.\n\nBase is the preserved PR #8 recovery branch at b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf. This PR targets that branch for a minimal review diff; it does not merge or rewrite the recovery artifact.\n\nValidation: Linux Node 24.19.0; 9 focused tests / 32 full tests passed; npm run check and git diff --check passed. Published tree de86e5a0212747ded8b9827fcd92544163c338a5 matches the locally tested staged tree. Independent read-only review completed. Repository CI will check the published candidate on Node 22 and 24.\n\nLimits: triggers do not protect against schema/file-owning processes. Existing writers require controlled restart on deployment. No historical repair, eligibility/authentication adapter, close-time atomicity, production integration acceptance, merge, or deployment is claimed. Explicit negative rowids are outside the API; conservative collision guard fails closed for legacy -1 sentinel rows.\n\nSee CHANGE_REPORT.md and docs/ballot-audit-integrity.md. Related Linear: JON-80, JON-82.",
  "title": "JON-80: preserve ballot audit history and verify competing writers",
  "base": "delivery/jon-80-recovery-20260916",
  "base_sha": "b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf",
  "head": "fix/jon80-append-only-audit-20260916",
  "head_sha": "5f5a28d46cfa62d1222e74563b1dc8e281b7c73f",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "bf390614ae88a5ddc9030b8cc0c278522ffb5413",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-16T23:09:30Z",
  "updated_at": "2026-09-16T23:09:30Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 1,
  "changed_files": 7,
  "additions": 371,
  "deletions": 12
}
