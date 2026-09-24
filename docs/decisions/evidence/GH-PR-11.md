# Evidence snapshot: pr-11

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/11
- Version: retrieval snapshot
- Source date: 2026-09-23T13:35:38Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/11",
  "number": 11,
  "state": "closed",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "## Retired workflow proposal \u2014 September 23, 2026\n\nClosed during the owner-authorized cross-work conflict reconciliation. This proposal contains native-delivery/shared dispatch gates retired by PR #30. The current [integration candidate #37](https://github.com/ptown16801-lang/concord/pull/37) preserves the runtime-only preflight and excludes these gates. Future planner work must be ported against current policy rather than importing this branch wholesale. Existing commits and branches remain available as provenance; this closure is not production acceptance or a merge.\n\n---\n\nRuntime-only preflight allowed project identity, dependency acceptance, and active-work conflicts to remain unchecked. This PR adds a reusable, read-only dispatch validator with explicit profiles and assignment contracts. Mandatory profile gates and permissions cannot be omitted by an assignment; published and accepted dependencies require exact commit pins and evidence references.\n\nConcord settings are separate from the generic validator. The native profile deliberately retains unknown saved runtime/environment values and requires JON-90. It cannot silently inherit this ChatGPT session's local runtime. The recovered producer commits remain candidates, not accepted dependencies.\n\nCI now explicitly runs the JON-88 standalone validator whenever its fixture directory is present. This branch does not incorporate the fixture pack or claim production integration.\n\nValidation: Linux Node 24.19.0; 40 focused checks and 63 full tests passed, npm run check and git diff --check passed. The actual published JON-88 pack separately passed 19 fixtures/13 threshold vectors. Published tree 47d96a844303780bd1dddcb1c43d24b88e07fe8a exactly matches the tested staged tree. Node 22/24 repository CI will provide published-candidate checks.\n\nLimits: reviewed JSON consistency is not remote authenticity, an installed Linear interceptor, an atomic scheduling lock, or saved native environment verification. Coordinator must refresh evidence, honor results, and enforce provider/file permissions. No production modules, existing recovery branches, PR #5, default branch, or Finger milestone changed. No merge/deployment requested.\n\nFull scope and evidence: CHANGE_REPORT.md and qa/dispatch/README.md. Related tracking: JON-90 / Concord workflow contract.",
  "title": "Guard project dispatch and run standalone fixture validation",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "fix/linear-dispatch-gate-20260916",
  "head_sha": "3465d56bb133959443cee18c4e8404dd163c074d",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "3960bfa6fe7e317a4c2234098822874417c8eefd",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-16T23:08:58Z",
  "updated_at": "2026-09-23T13:35:38Z",
  "closed_at": "2026-09-23T13:35:37Z",
  "merged_at": null,
  "commits": 1,
  "changed_files": 11,
  "additions": 670,
  "deletions": 0
}
