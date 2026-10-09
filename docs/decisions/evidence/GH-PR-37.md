# Evidence snapshot: pr-37

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/37
- Version: retrieval snapshot
- Source date: 2026-09-24T10:45:44Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/37",
  "number": 37,
  "state": "open",
  "merged": false,
  "mergeable": false,
  "draft": true,
  "body": "Independent producer branches collide in package wiring, governance exports and documentation, and a separate eligibility implementation cannot replace the API pinned by bootstrap impeachment. This composes the delivered libraries with additive exports/scripts and explicit dependency fingerprints; incompatible eligibility substitution fails the compatibility check.\n\nCurrent integration head: `6cf4eab09836d42d4b83a7fc1862442fdc38c3ff`.\n\nRefreshed inputs, each consumed once:\n- Bootstrap PR #36: `e2e23849a2e5e128f7f46f35712499f16fb98ef9`, including the independently verified source-discrepancy review gate.\n- AGT PR #34: `1731602de02cef6fb0228f155202beeed844c295`. The only new producer delta from aggregate `931aaec` is the approval-time identity/policy expiry correction over `7ba5bc5`, with six boundary regressions. Runtime, regression tests and governance docs match the producer exactly; the changelog is consolidated.\n- Finger PR #38: `b81cca12f6d5cde714f30031a8a78dab95d97daf`, preserving both canonical recovered blobs exactly.\n\nPopulation `882dcffb31b520c6f9458984a35745c8b4bfa3b8` and eligibility `51a102259785a5b53dc6ec4bc4bbca54c4a8fc37` remain pinned. Alternative `638ce897` is excluded. All other producer inputs, package wiring, lockfile and compatibility guard are unchanged; complete provenance is in docs/INTEGRATION_RECONCILIATION.md.\n\nValidation: clean npm ci --ignore-scripts (zero vulnerabilities), combined syntax/API and compatibility checks, exact AGT producer blob comparisons, unchanged protected inputs, git diff --check, and all 192 runner entries on Node 22.23.2 and 24.21.0 pass (188 named tests plus four scheduler helper modules). Fresh remote Node 22/24 push and PR CI pass on this head.\n\nAggregate remains a draft for review. These are integration verification results, not independent AGT/aggregate acceptance or certification of external authorities. JON-135's recorded reviewer and parent are archived; reviewer availability remains unresolved. No competing review has been started. Scheduler acceptance remains JON-140/J's gate for JON-127 and its separately authorized execution.\n\nHost-side confinement evidence: after loading the purpose-built Bubblewrap AppArmor profile, `npm run governance:isolation` and `npm run governance:isolated-demo` passed as uid 1000 with their own Bubblewrap boundary active. The profile and loaded-profile evidence are host configuration, not repository artifacts, and CI does not run these probes. This certifies only the documented synthetic local isolation scope, not production IPC, key management, backup policy or authenticated network transport.\n\nNo merge, deployment, production-wide transaction coordination, or eligibility migration.\n\nTracking: https://linear.app/jons-garage/issue/JON-141\n",
  "title": "Reconcile Concord governance, scheduler and archive review branches",
  "base": "Develo",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "codex/jon-141-conflict-integration",
  "head_sha": "6cf4eab09836d42d4b83a7fc1862442fdc38c3ff",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "f04a2f6e4c1a1439f4319ed4cda7e66d762ef98e",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-23T13:33:08Z",
  "updated_at": "2026-09-24T10:45:44Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 37,
  "changed_files": 75,
  "additions": 7066,
  "deletions": 184
}
