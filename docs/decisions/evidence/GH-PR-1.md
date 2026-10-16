# Evidence snapshot: pr-1

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/1
- Version: retrieval snapshot
- Source date: 2026-09-16T15:43:38Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/1",
  "number": 1,
  "state": "closed",
  "merged": false,
  "mergeable": false,
  "draft": true,
  "body": "Adds server-side Finger processing that reconstructs ordered replay frames from stored raw events and generates position, dwell-time, and movement-path layers for touch, mouse, stylus, and combined views. Supports compatible multi-session aggregation with path provenance and append-only analysis generations.\n\nTests cover replay ordering, raw scroll retention, pointer-specific views, multi-touch flattening, browser-relative timing, dwell clamping, aggregation, generation preservation, and empty captures.",
  "title": "Implement Finger replay and heat-map processing",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "899bfe6437ac29299436b54ef5fadc316d18ca5f",
  "head": "ptown16801/jon-73-finger-replay-and-heat-map-processing-4879",
  "head_sha": "b04bbe4af6e20374d4392924d29a2adb2efd72c7",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": null,
  "diff": null,
  "comments": null,
  "created_at": "2026-09-16T09:54:52Z",
  "updated_at": "2026-09-16T15:43:38Z",
  "closed_at": "2026-09-16T15:43:38Z",
  "merged_at": null,
  "commits": 1,
  "changed_files": 7,
  "additions": 606,
  "deletions": 1
}
