# Evidence snapshot: pr-36

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/36
- Version: retrieval snapshot
- Source date: 2026-09-23T14:17:08Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/36",
  "number": 36,
  "state": "open",
  "merged": false,
  "mergeable": false,
  "draft": false,
  "body": "The recovered JON-85 cloud implementation used panel sizes and accusation thresholds that contradicted frozen specification revision 1.0, and assigned the trial roster before the required fresh snapshot. This PR preserves that recovered code in its first commit, then corrects stage sizing, independent House/Senate maturity, proportional sortition, exclusions, trial-capacity reservation, replacement, and frozen-stage behavior.\n\nAdds signed commands, a SQLite event/command journal with durable idempotency and competing-writer protection, and a durable wrapper around the unchanged accepted eligibility reducer. Includes the frozen source export, recovery provenance, requirement-to-test mapping and integration contract in `docs/specs/bootstrap-impeachment.md`.\n\nLocal continuation also rejects malformed participation identities and source references before trial selection, while preserving legitimate batch source events and duplicate identity deduplication. README documents running the recovered branch locally without a cloud task.\n\nIndependent JON-86 finding F1 identified that newer source versions could bypass mandatory discrepancy review. Both stages now retain a durable hold until a permitted RESOLVE_REVIEW command receives an attributable competent independent decision from the trusted review adapter, bound to the case, stage and discrepancy. Resolution requires a fresh seed commitment; ordinary WAITING retries remain available. Six regressions cover this correction, including invalid receipts, permissions, restart and repeat discrepancies. Independent JON-86 retest delivered a bounded PASS at this exact head and closed F1: [review report](https://linear.app/jons-garage/document/jon-86-independent-bootstrap-verification-2026-09-23-bba70d15b466). The independent reviewer reran all 73 tests and seven additional review-gate probes on Node 22 and 24. Human acceptance and production integration remain separate.\n\nValidation on Linux / Node v22.23.2: **73 tests passed**, including **35 impeachment checks**, a real two-process writer race, restart/replay, and actual population/eligibility integration. Syntax and whitespace checks passed. Sandbox-only localhost failures were rerun successfully on the host.\n\nThis is a review candidate, not production acceptance. Office/role/voting/evidence/review adapters require trusted integrations; the tests use fixtures for those boundaries. Conviction emits the removal/appeal handoff without executing those separate authorities. No merge or deployment.\n\nCanonical implementation: https://linear.app/jons-garage/issue/JON-85\nIndependent verification: https://linear.app/jons-garage/issue/JON-86\nCloud recovery source: https://chatgpt.com/codex/tasks/task_e_6aab5590b558832583d47839f7a416da\nBase: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`\nHead: `e2e23849a2e5e128f7f46f35712499f16fb98ef9`\n\n\n",
  "title": "JON-85: recover and correct frozen bootstrap impeachment implementation",
  "base": "Develo",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "codex/jon-85-bootstrap-recovery",
  "head_sha": "e2e23849a2e5e128f7f46f35712499f16fb98ef9",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "ac96ca42c627afff5c0eb8ae469366cb222e9bd3",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-23T13:19:15Z",
  "updated_at": "2026-09-23T14:17:08Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 4,
  "changed_files": 20,
  "additions": 2356,
  "deletions": 3
}
