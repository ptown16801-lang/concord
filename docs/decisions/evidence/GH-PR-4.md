# Evidence snapshot: pr-4

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/4
- Version: retrieval snapshot
- Source date: 2026-09-16T15:43:22Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/4",
  "number": 4,
  "state": "closed",
  "merged": true,
  "mergeable": false,
  "draft": false,
  "body": "## Purpose\n\nConsolidates the September 16 Vote/Concord audit into one coherent Finger implementation and one canonical set of repository records, while preserving historical branches and external decision snapshots as provenance.\n\n## Implementation reconciliation\n\n- Keeps the already-merged signed-identity / SQLite / content-addressed persistence stack as the authoritative Finger backend.\n- Adapts the deployable browser collector to the canonical single-request ingestion endpoint and preserves the non-blocking admission/navigation behavior.\n- Incorporates replay and touch/mouse/stylus/combined heat-map processing as a storage-independent derived-analysis library.\n- Preserves real collector-relative event timing and inferred pointer kind in durable history.\n- Removes caller-controlled session IDs from filesystem paths and tightens object/file permissions.\n- Makes trusted Concord-user header identity explicitly opt-in at a protected upstream boundary.\n- Removes the redundant persistent browser association identifier, redacts editable/form DOM contents, and avoids retaining literal keyboard characters.\n- Adds the standalone beta/demo page, package exports, deterministic package metadata, and branch-safe CI.\n\n## Record reconciliation\n\n- Adds a consolidated CHANGELOG.md.\n- Adds PROJECT_RECORD.md with Vote/Concord boundaries, source precedence, decision-record reconciliation, and external Workbench/Research Library status.\n- Adds docs/AUDIT_2026-09-16.md with findings, repairs, known gaps, and evidence limits.\n- Historical decision/Workbench copies are intentionally preserved rather than silently rewritten or deleted.\n\n## Verification\n\nGitHub Actions run 35117040704 completed successfully at head `2aa91aac38f89ed0521ef1a31f02bc98532f3a24` on Node.js 22 and Node.js 24, running both `npm run check` and `npm test`.\n\nThe remaining documented gaps are normal follow-on engineering items (real-browser automation, production administrative authorization surface, automatic analysis scheduling through the existing append-only persistence interface, and operational backup/key policy), not contradictions requiring a design decision.",
  "title": "Reconcile Vote/Concord project records and Finger beta",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "784f01bdb6b431fb8e380c84b41d4711ae645e18",
  "head": "audit/concord-reconciliation-20260916",
  "head_sha": "2aa91aac38f89ed0521ef1a31f02bc98532f3a24",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "2d56d946eeb6c6fe7ea7c11992f3cfe1a22fed7d",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-16T15:43:05Z",
  "updated_at": "2026-09-16T15:43:22Z",
  "closed_at": "2026-09-16T15:43:21Z",
  "merged_at": "2026-09-16T15:43:21Z",
  "commits": 29,
  "changed_files": 22,
  "additions": 1806,
  "deletions": 85
}
