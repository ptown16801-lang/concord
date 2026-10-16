# Evidence snapshot: pr-10

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/10
- Version: retrieval snapshot
- Source date: 2026-09-16T21:21:19Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/10",
  "number": 10,
  "state": "open",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "## Exact recovery of the existing preparation artifact\n\nTracks https://linear.app/jons-garage/issue/JON-88/jon-82b-independent-adversarial-fixtures-and-test-harness-preparation\n\nNine new files under `qa/jon58/`, recovered from the existing Codex task's actual patch in Linear comment `1b8e984e-b8af-447e-9e83-2b6db71d5d80`. No production code, package metadata, default branch, original session, or prior implementation was overwritten or recreated. No merge.\n\n### Content provenance\n\n- Base SHA: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`; base tree: `212ca2e6f787c6ab54eab4207653e00dcb014cd6`.\n- Source snapshot SHA: `4180dcab808bef5755dfaaa2de88b2b110f3c87b`.\n- **Exported source tree and independently created GitHub tree exactly match:** `bd7eb75e94cb461a5ad7a5c576d8c9ecc718ed73`.\n- Published SHA: `c27389240d16d81e21f7b92fd25ea5fa5537205d`.\n- Producer-reported patch: 31,900 bytes / 495 lines, SHA-256 `b304c16c8a12fce8e40e9bddad61e53c6d7127a9014e3e599398033ac4a66b29`. The coordinator verified full Git tree equality rather than independently recomputing the patch-byte hash.\n- Original local SHA `badb889fe231dffe85038b7e4c869bf6b36a115f` was absent from the rehydrated producer object database/reflog. This is verified content recovery, not recovery of that old commit object.\n\n### Scope and verification boundary\n\nThe pack describes 19 synthetic cases and 13 exact-threshold vectors. Its original producer reported a successful standalone validator with fixture digest `8338c0ec5438a72d0e6784a85b9ad9b7a198a0b46edafb54d5584e4a25734ad6`.\n\nFresh repository CI must be checked separately. The repository's existing `npm test` is not proof that `node qa/jon58/validate-fixtures.mjs` was run: this standalone validator is not a test-discovery filename. Record an explicit validator execution before calling that verification fresh.\n\n**ADAPTER_PENDING / PRODUCTION_INTEGRATION_NOT_RUN.** These labels remain in force. Fixture schema/arithmetic validation is not JON-82 production integration, real concurrency/crash testing, source-complete governance review, or owner approval. No adapter implementation is included. Do not merge automatically. JON-84 remains informational and JON-90 is the sole new-workflow gate.",
  "title": "JON-88: Recover existing adversarial fixture pack and validator",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "delivery/jon-88-recovery-20260916",
  "head_sha": "c27389240d16d81e21f7b92fd25ea5fa5537205d",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "509d93c88b7391da3b5d5c38d958b66cdddc7ad5",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-16T21:21:19Z",
  "updated_at": "2026-09-16T21:21:19Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 1,
  "changed_files": 9,
  "additions": 441,
  "deletions": 0
}
