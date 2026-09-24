# Evidence snapshot: pr-32

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/32
- Version: retrieval snapshot
- Source date: 2026-09-23T12:30:51Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/32",
  "number": 32,
  "state": "open",
  "merged": false,
  "mergeable": false,
  "draft": true,
  "body": "JON-28 needs a way to distinguish local artifact integrity from historical upload claims. This adds a read-only manifest verifier and JSON CLI that stream SHA-256 checks, validate optional size and reference metadata, and report verified, mismatch, unavailable, or error without changing recorded delivery status.\n\nThe five-file diff contains only the archive library, CLI, tests, usage/evidence document, and changelog entry. `docs/ARTIFACT_MANIFEST.md` includes a runnable synthetic manifest and its generated four-outcome report. Tests cover invalid metadata, duplicate IDs, traversal, escaped symlinks, non-files, size/hash failures, missing files, streaming, and CLI exit codes.\n\nValidation: all 30 tests pass on Node 22.23.2 and 24.21.0; repository and new-file syntax checks and `git diff --check` pass. All four GitHub push/PR CI jobs passed on Node 22 and 24 at head e7462d860d5c4a17d7d1f6283bc25f23ebf3716a.\n\nRequires an operator-controlled stable directory. This is not an atomic filesystem snapshot or a sandbox against hostile concurrent parent-directory replacement. Hash equality does not certify manifest provenance or remote delivery. No scheduler, AGT, Finger, Research Library, package, or dependency changes. No upload, merge, deployment, or full archive-completion claim.\n\nPrepared following Linear\u2019s advisory guidance on [JON-28](https://linear.app/jons-garage/issue/JON-28/concord-artifact-archive). Review-only draft.\n",
  "title": "JON-28: verify local archive artifacts without implying delivery",
  "base": "Develo",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "codex/jon-28-artifact-manifest",
  "head_sha": "e7462d860d5c4a17d7d1f6283bc25f23ebf3716a",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "769af767836eb6438bf3565333c0986c56aa4d6f",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-23T12:21:53Z",
  "updated_at": "2026-09-23T12:30:51Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 2,
  "changed_files": 5,
  "additions": 433,
  "deletions": 0
}
