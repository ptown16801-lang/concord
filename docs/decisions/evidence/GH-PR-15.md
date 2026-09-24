# Evidence snapshot: pr-15

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/15
- Version: retrieval snapshot
- Source date: 2026-09-17T03:17:31Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/15",
  "number": 15,
  "state": "open",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "Defines Concord\u2019s canonical design-only identity/persistence contract while keeping population, terminal effects, protected authorization, and publication with their existing owners.\n\n- Separates governance identity from sessions, residency, keys, checkpoints, and derived views.\n- Specifies durable boundaries, checkpoint provenance, fail-closed reconstruction order, and Linux identity-storage isolation.\n- Defines authorized pre-death successor transfer, history/current-authorization search semantics, Workbench lifecycle projections, and design acceptance cases.\n- Documents the existing Finger association boundary without treating it as governance identity.\n\nVerification: `npm run check`; `npm test` (23 tests passed).",
  "title": "Define persistent identity and succession contract",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "ptown16801/jon-15-persistent-identity-memory-and-succession-model-d6b3",
  "head_sha": "1e86688cc2ed45b174d675d353c47b96c8d5bbec",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "58f1dfd7ccb795cc16165ddfee7d9941ef7ebce1",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-17T03:17:31Z",
  "updated_at": "2026-09-17T03:17:31Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 1,
  "changed_files": 3,
  "additions": 320,
  "deletions": 0
}
