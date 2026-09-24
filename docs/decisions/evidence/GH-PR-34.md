# Evidence snapshot: pr-34

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/34
- Version: retrieval snapshot
- Source date: 2026-09-24T05:27:48Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/34",
  "number": 34,
  "state": "open",
  "merged": false,
  "mergeable": true,
  "draft": true,
  "body": "Adds Concord's local Microsoft Agent Governance Toolkit sandbox: signed requests, durable admission/reservations, transactional writes, collector-outage pause/resume, and Linux confinement probes. Approved actions survive later permission expiry or revocation and resume without duplicate effects.\n\nCurrent review freeze: `1731602de02cef6fb0228f155202beeed844c295`, based on consolidated `7ba5bc5c5a975d72298540e9aa776504d5b4f263`.\n\nThe latest correction prevents identity/policy validation from aging past expiry before the recorded approval time. Both expiry checks now use the same final `approvedAt` value stored with the approval, before nonce consumption. At/after expiry, admission records a sanitized denial and leaves no consumed nonce, operation, reservation or domain effect. Requests approved before expiry still complete after later expiry/revocation.\n\nRetains earlier arbitrary-rejection denial logging, committed-result immutability, SQLite replacement guards, collector-history reconciliation, complete signed-policy archive, locked dependency installation and independent Node matrix jobs.\n\nValidation: six new monotonic-clock boundary cases cover identity and policy just before, at and after expiry; three fail on unchanged 7ba5bc5 and all six pass after correction. Clean npm ci --ignore-scripts reports zero vulnerabilities; syntax/whitespace checks and all 73 tests pass locally on Node 22.23.2 and 24.21.0. Fresh push/PR CI runs are attached to this exact head. Real Linux confinement was not re-certified: this host currently blocks Bubblewrap namespace creation through AppArmor; earlier confinement evidence belongs to earlier heads.\n\nIndependent acceptance remains with the existing JON-135 reviewer. This is a local synthetic subsystem, not production service separation or remote collector guarantees. Draft for review; no merge/deploy approval. The separately pinned aggregate PR #37 at 931aaec has not silently consumed this new producer revision.\n\nTracking: https://linear.app/jons-garage/issue/JON-130 (expiry evidence), https://linear.app/jons-garage/issue/JON-132 (transactional admission), https://linear.app/jons-garage/issue/JON-133 (verification), https://linear.app/jons-garage/issue/JON-135 (independent review), https://linear.app/jons-garage/issue/JON-138 (parent).",
  "title": "Add Concord governance sandbox and audit remediation",
  "base": "Develo",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "jon-138-governance-audit-remediation",
  "head_sha": "1731602de02cef6fb0228f155202beeed844c295",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "d45d8205096489b983c387e98c70b7cc5ef5dde8",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-23T12:37:49Z",
  "updated_at": "2026-09-24T05:27:48Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 6,
  "changed_files": 23,
  "additions": 2016,
  "deletions": 1
}
