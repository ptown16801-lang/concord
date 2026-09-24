# Evidence snapshot: pr-6

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/6
- Version: retrieval snapshot
- Source date: 2026-09-16T21:07:27Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/6",
  "number": 6,
  "state": "open",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "## Exact artifact recovery \u2014 no reimplementation\n\nRecovers the existing JON-78 Codex work through the authenticated GitHub connector. The original task and implementation remain preserved. No default-branch update or merge was performed.\n\nTracked issue: https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement\n\n### Provenance verified before publication\n\n- Confirmed base commit: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`\n- Base tree: `212ca2e6f787c6ab54eab4207653e00dcb014cd6`\n- Source export: Linear comment `8d01de44-48a0-4de8-8200-0e40b0d67efc` in the existing JON-78 Codex thread.\n- Complete patch: **22,416 bytes / 554 lines**.\n- Independently recomputed SHA-256: `a4ce1059cd769e7aa7ea8a661259674b1f015d6e1cdde13f8b50c267eafb288c` \u2014 exact match.\n- Exported source tree and GitHub-created tree both: `67d3849e05f9e0740ec6831163b60084016abd2f` \u2014 exact match across the repository contents.\n- Published commit: `882dcffb31b520c6f9458984a35745c8b4bfa3b8`.\n\nThe resumed Codex sandbox reported head `e49fd6c6005e064041631b844c3a1e3c6780a3fd`. Its earlier local commit IDs `bb762c2e36eea5c8ae67f0c13b68b16f6ef851c6` and `088cd81588550935113c94c56e4a1e7ba369766c` were unavailable there. This PR preserves the verified exported content; it does not claim those historical commit identities were recovered. Downstream pins must be updated explicitly only after review of the published artifact.\n\n### Scope\n\nNine changed paths: `.nvmrc`, `CHANGELOG.md`, `README.md`, `package.json`, `src/population/index.js`, `src/population/registry.js`, `src/population/migrations/001_population.sql`, `test-support/population-create-worker.js`, and `test/population-registry.test.js`. All changes come from the checksum-verified existing export.\n\n### Independent verification performed\n\n- Patch byte-count, line-count and SHA-256 matched the producer's export.\n- All six newly added file blobs matched the full-index patch SHA values.\n- Extracted the exact population implementation/fixtures into an isolated verification directory: `node --test test/population-registry.test.js` under **Node 22.16.0** \u2014 **6 passed, 0 failed**.\n- Full repository testing was not run in that isolated directory; it contains only the recovered focused-test subset. The coordinator's separate container could not clone GitHub due to its own DNS limitation. That is not evidence of a failure in the successfully validated Linear native workflow.\n- Full Node 22/24 repository CI must be checked on this PR before acceptance.\n\n### Review / limitations\n\nThis is artifact delivery, not constitutional acceptance, full integration verification, or permission to merge. Preserve JON-85's prerequisite gate until both its population and eligibility inputs are available and reviewed. JON-84 remains informational; JON-90 is the sole new native-workflow validation issue. The first malformed Markdown export was rejected; only the corrected long-fence export with the verified digest was used.",
  "title": "JON-78: Recover verified population registry and 300-cap implementation",
  "base": "ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "delivery/jon-78-recovery-20260916",
  "head_sha": "882dcffb31b520c6f9458984a35745c8b4bfa3b8",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "4bd9622269dce0006c3281a05b262c3c95cb9980",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-16T21:07:27Z",
  "updated_at": "2026-09-16T21:07:27Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 1,
  "changed_files": 9,
  "additions": 462,
  "deletions": 3
}
