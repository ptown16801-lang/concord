# Evidence snapshot: pr-9

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/9
- Version: retrieval snapshot
- Source date: 2026-09-16T21:18:58Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/9",
  "number": 9,
  "state": "open",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "## Exact artifact recovery\n\nTracked issue: https://linear.app/jons-garage/issue/JON-81/jon-58d-exact-electorate-and-d-b-u-accounting\n\nPublishes existing work without rewriting it, restarting its original task, overwriting an existing branch, or merging. Six paths are recovered from Linear export comment `48b0dad1-24ed-45e3-baaa-0d0bfdb224c6`.\n\n### Verified content mapping\n\n- Base commit: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`.\n- Base tree: `212ca2e6f787c6ab54eab4207653e00dcb014cd6`.\n- Exported source head: `7de92970cb913bb92d1ebbd127a354f94e72cc1b`.\n- Exported tree and independently created GitHub tree exactly match: **`053109bf4d49cbe571d9e938d3837cdfa41ae055`**.\n- Published head: `a090a67719681b04683f1f87c35d4080ea0854f5`.\n- Producer-reported patch: 13,334 bytes, SHA-256 `877794fc7c0e58675cff96c92b87301a0ab5a042a324bb88a9a8174b53ee25cb`. The coordinator verified full repository tree equality rather than independently recomputing this patch hash.\n- Historical abbreviated commit `cd516c4` was absent from the resumed sandbox. This verifies source-content recovery, not preservation of the old commit identity.\n\nChanged paths: `CHANGELOG.md`, `changes/JON-81.md`, `docs/electorate-accounting.md`, `package.json`, `src/governance/electorate.js`, `test/electorate.test.js`.\n\n### Verification and review boundaries\n\nCheck fresh Node 22/24 repository CI on this PR. The coordinator has not independently rerun the full suite locally for this artifact. Passing component tests does not establish JON-82 integration.\n\nThe recovered accounting implementation maintains its own in-memory accepted-ballot map and accepts caller-supplied eligibility updates. Review how it consumes authoritative JON-80 receipts and JON-79 transitions without creating a competing acceptance authority. Shared package exports/check scripts and changelog changes must be reconciled with the other recovery PRs, not blindly overwritten.\n\nThis is a draft for independent review, not production acceptance or permission to merge. Existing code remains unchanged; JON-84 is informational and JON-90 is the sole native-workflow validation gate.",
  "title": "JON-81: Recover existing exact electorate accounting implementation",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "delivery/jon-81-recovery-20260916",
  "head_sha": "a090a67719681b04683f1f87c35d4080ea0854f5",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "5c93adc06d978cb756ceaec7790aac018d63d5d8",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-16T21:18:58Z",
  "updated_at": "2026-09-16T21:18:58Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 1,
  "changed_files": 6,
  "additions": 266,
  "deletions": 2
}
