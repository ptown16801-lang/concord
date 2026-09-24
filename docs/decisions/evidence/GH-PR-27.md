# Evidence snapshot: pr-27

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/27
- Version: retrieval snapshot
- Source date: 2026-09-18T05:18:40Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/27",
  "number": 27,
  "state": "open",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "## Purpose\nRemove obsolete project hierarchy and accumulated historical workflow instructions from the default entry-point documents, without changing application behavior.\n\n## Changes\n- Correct README and PROJECT_RECORD: Concord and The Form are peer projects; Vote is their folder, not a parent project.\n- Make current task scope/holds and explicit coding authorization controlling instead of dated snapshot instructions.\n- Describe project-first, on-demand context selection rather than loading deferred trees and repeated exclusions.\n- Preserve the original PROJECT_RECORD as `docs/history/PROJECT_RECORD_2026-09-16.md` using the exact original blob `6ce2d1e9124ce595aaf84509b658e30ce328a759`.\n- Preserve the former full README as `docs/reference/FINGER_BETA_2026-09-16.md` using exact original blob `18440f9cf30be4978f338fcad05c63617d8f1215`. Existing beta technical and privacy guidance is retained, not deleted.\n\n## Provenance / verification\nBase: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`.\nHead: `881ce1ef6ca84aba94f293125f2bd8beb74ffb24`.\nCreated from the base tree and changed only the four listed Markdown paths. Application source, tests, package files and CI are unchanged. No application build or tests were run for this documentation-only change; this is not a new implementation-verification claim.\n\nNo merge, deployment, default-branch change, agent launch, or reopening of held work is authorized by this PR. Current operational Linear changes are independent of this proposed repository documentation update. The default-branch documents are unchanged until normal review and authorized integration occur.",
  "title": "docs: partition obsolete workflow instructions from current Concord routing",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "maintenance/workflow-partition-20260918",
  "head_sha": "881ce1ef6ca84aba94f293125f2bd8beb74ffb24",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "cbce8cec43637ef016ec28487a8fc35c1cea7696",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-18T05:18:40Z",
  "updated_at": "2026-09-18T05:18:40Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 1,
  "changed_files": 4,
  "additions": 228,
  "deletions": 184
}
