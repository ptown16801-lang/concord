# Evidence snapshot: pr-8

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/8
- Version: retrieval snapshot
- Source date: 2026-09-16T21:15:46Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/8",
  "number": 8,
  "state": "open",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "## Exact artifact recovery\n\nTracks https://linear.app/jons-garage/issue/JON-80/jon-58c-immutable-ballot-receipt-and-submission-handling\n\nNo reimplementation, original-session restart, default-branch overwrite, or merge. Seven paths restored from the existing task's actual export in Linear comment `6d51351c-234c-4c4d-870a-12672a5e231b`.\n\n- Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb` / tree `212ca2e6f787c6ab54eab4207653e00dcb014cd6`.\n- Export source head: `3de9607cf14d1ad491088d4036ff45c5914cab2a`.\n- Source tree and independently created GitHub tree **exactly match**: `265f03fc2bb270906eb10eaa65b135de02a4b32e`.\n- Published SHA: `b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf`.\n- Producer-reported patch: 16,712 bytes, SHA-256 `5455d5fb4acb626c4e2d9ccc9ec86ca23bb534f65e27862708a38fd2be7511df`. Coordinator verified full tree equality rather than independently recomputing this patch hash.\n- Original local SHA `51f20acb99b0ffdb308d9e5e97eac56ae1850f37` was unavailable in the rehydrated producer sandbox. Content recovery is verified; original commit identity is not recovered.\n\nFresh full Node 22/24 CI must be reviewed. No local full-suite rerun was performed by the coordinator for this artifact.\n\n## Review remains required\n\nPublication does not mean production acceptance. Review especially the append-only protection of `ballot_attempts` (the supplied migration protects accepted ballots, not attempt rows with equivalent triggers), genuine multi-process concurrency rather than serialized Promise callbacks, authoritative authorization adapters, and close-time boundary semantics. Preserve source unchanged for this recovery PR; reconcile findings through explicit review, not silent edits.\n\nThe separate JON-79 export also adds `src/governance/index.js`; do not blindly apply these branches sequentially or overwrite one export with the other. Integration must reconcile shared package/docs/module-export paths. JON-84 remains informational; JON-90 is the sole native-workflow validation issue. Do not merge automatically.",
  "title": "JON-80: Recover existing immutable ballot intake implementation",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "delivery/jon-80-recovery-20260916",
  "head_sha": "b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "ee9fb4a3ef75a88ac3dfd9e9bae651648276c5dd",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-16T21:15:46Z",
  "updated_at": "2026-09-16T21:15:46Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 1,
  "changed_files": 7,
  "additions": 308,
  "deletions": 2
}
