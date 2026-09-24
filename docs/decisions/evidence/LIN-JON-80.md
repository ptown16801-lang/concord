# Evidence snapshot: JON-58C — Immutable ballot receipt and submission handling

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-80/jon-58c-immutable-ballot-receipt-and-submission-handling
- Version: 2026-09-23T20:05:05.678Z
- Source date: 2026-09-23T20:05:05.678Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Routing clarification — September 23, 2026 consistency audit

<issue id="19637321-042f-49cb-b95f-1372c253a2ce" href="https://linear.app/jons-garage/issue/JON-90/enable-concord-linear-coding-sessions-environment">JON-90</issue> is Canceled and confers no current workflow gate. Older references below to its being the sole native-workflow gate are historical. Current native status, issue-specific remaining scope, published artifacts, and latest explicit owner authorization govern. Preserve existing delivered work and accepted dependency pins; do not restart or create a replacement worker from the historical handoffs below.

## Status supersession — 2026-09-18 audit

Latest verified evidence returned this issue for revision under the status-evidence invariant. Current native tracking state is Backlog with no delegate; prior Todo/In Review/delegation language below is historical delivery/review context, not current disposition and not live execution evidence. Required next work is bounded to the recorded review amendments: authenticated/versioned eligibility, authoritative close ordering, failure auditing, accepted follow-up lineage, and integration pins.

---

## Acceptance-status correction — 2026-09-17

Historical correction restored In Review at that time to match then-current delivery evidence. PR <pull-request id="9031a197-4234-4551-9ab5-652a2d42eb80" href="https://linear.app/jons-garage/review/jon-80-recover-existing-immutable-ballot-intake-implementation-5cd483cccf05">JON-80: Recover existing immutable ballot intake implementation</pull-request> and corrective PR <pull-request id="629569e2-86d6-4cda-94e0-6cfb3ad7d691" href="https://linear.app/jons-garage/review/jon-80-preserve-ballot-audit-history-and-verify-competing-writers-d2b187048e21">JON-80: preserve ballot audit history and verify competing writers</pull-request> are delivered candidates, not recorded producer acceptance. <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue>'s boundary contract (`6dbcd119-4771-4e2d-8152-321e4d0e7cc9`) defines the required guarantees but explicitly does not accept producer revisions. Remaining local review covers authenticated/versioned eligibility, authoritative close ordering, failure auditing and accepted follow-up lineage. Preserve the existing correction and exact pins; do not recreate or rerun its implementation. This tracking correction starts no worker and changes no dependency or authorization.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** immutable accepted receipt and rejected-attempt contract. **Historical disposition at that time:** preserve In Review, original PR <pull-request id="9031a197-4234-4551-9ab5-652a2d42eb80" href="https://linear.app/jons-garage/review/jon-80-recover-existing-immutable-ballot-intake-implementation-5cd483cccf05">JON-80: Recover existing immutable ballot intake implementation</pull-request> and corrective PR <pull-request id="629569e2-86d6-4cda-94e0-6cfb3ad7d691" href="https://linear.app/jons-garage/review/jon-80-preserve-ballot-audit-history-and-verify-competing-writers-d2b187048e21">JON-80: preserve ballot audit history and verify competing writers</pull-request> with their separate exact pins. **Design follow-up:** specify authenticated/versioned eligibility and roll evidence, close ordering, failure-audit and receipt-consumer guarantees from <issue id="99b1f17f-3716-40af-b9fa-c65c845d6d5f" href="https://linear.app/jons-garage/issue/JON-87/jon-82a-cross-track-interface-and-integration-readiness-audit">JON-87</issue> IR-01/06/07/09/15. The recorded PR <pull-request id="629569e2-86d6-4cda-94e0-6cfb3ad7d691" href="https://linear.app/jons-garage/review/jon-80-preserve-ballot-audit-history-and-verify-competing-writers-d2b187048e21">JON-80: preserve ballot audit history and verify competing writers</pull-request> repair must not be reassigned as new work. <issue id="3adec4a1-9036-4132-80cd-fd0ffc3eb1d7" href="https://linear.app/jons-garage/issue/JON-81/jon-58d-exact-electorate-and-d-b-u-accounting">JON-81</issue> consumes this sole acceptance authority; <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue> owns shared-boundary coordination. Preserve sessions/results; no repeat implementation.

---

## Interface-readiness handoff — 2026-09-16 audit

[Complete JON-87 continuation](<https://linear.app/jons-garage/document/jon-87-published-source-interfacereadiness-continuation-v10-06a4bd4f959b>) records exact inspected commits, current source contracts, proof limits and integration order.

IR-01/06/07/09/15: identity joins, authenticated/versioned authorization, close ordering, failure-audit boundary and explicit acceptance of follow-up lineage. PR <pull-request id="629569e2-86d6-4cda-94e0-6cfb3ad7d691" href="https://linear.app/jons-garage/review/jon-80-preserve-ballot-audit-history-and-verify-competing-writers-d2b187048e21">ptown16801-lang/concord#12</pull-request> corrects the scoped history mutation/replacement issue but does not establish full integration acceptance.

These are review/coordination findings for the existing scope and owners. Publication or this report does not accept a candidate, change dependency pins, start another worker, or authorize merge. Preserve the original recovery artifacts and resolve findings through the current project/assignment gates.

## VERIFIED FOLLOW-UP CANDIDATE — 2026-09-16

Owner-authorized team assessment reproduced mutable ballot-attempt history and an INSERT OR REPLACE bypass. <pull-request id="629569e2-86d6-4cda-94e0-6cfb3ad7d691" href="https://linear.app/jons-garage/review/jon-80-preserve-ballot-audit-history-and-verify-competing-writers-d2b187048e21">ptown16801-lang/concord#12</pull-request> fixes attempt UPDATE/DELETE and replacement collisions for attempts/accepted receipts, with legacy-upgrade and true independent-process concurrency regressions.

Published head `5f5a28d46cfa62d1222e74563b1dc8e281b7c73f`, tree `de86e5a0212747ded8b9827fcd92544163c338a5`, target/base the original recovery branch at `b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf`. Original recovery provenance is intact. Local Node24.19: 9 focused/32 full tests, syntax/diff checks passed. [Published CI](<https://github.com/ptown16801-lang/concord/actions/runs/35161033240>) passes Node22.x and24.x. Independently visible in Linear Reviews.

Partial follow-up only: this does not grant producer acceptance or resolve authentication/eligibility adapters, close-time atomicity, writer process/file isolation, or <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue> integration. Keep In Review; do not auto-close from this follow-up PR. No merge, production deployment, or original worker restart occurred.

---

## VERIFIED RECOVERY DELIVERY — 2026-09-16

**Published and reviewable; not merged or accepted as integrated production code.**

* Draft PR: <pull-request id="9031a197-4234-4551-9ab5-652a2d42eb80" href="https://linear.app/jons-garage/review/jon-80-recover-existing-immutable-ballot-intake-implementation-5cd483cccf05">ptown16801-lang/concord#8</pull-request>
* Branch: `delivery/jon-80-recovery-20260916`
* Published SHA: `b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf`
* Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`
* Exported source tree and GitHub-created tree exactly match: `265f03fc2bb270906eb10eaa65b135de02a4b32e`.
* Export source comment: `6d51351c-234c-4c4d-870a-12672a5e231b`; source snapshot: `3de9607cf14d1ad491088d4036ff45c5914cab2a`. Historical local SHA `51f20acb99b0ffdb308d9e5e97eac56ae1850f37` was unavailable in the resumed sandbox. This verifies content recovery, not recovery of the old commit object.
* Fresh CI: [https://github.com/ptown16801-lang/concord/actions/runs/35151386266](<https://github.com/ptown16801-lang/concord/actions/runs/35151386266>) — **Node 22.x and 24.x jobs both passed**, including `npm test` and `npm run check`.

Seven original changed paths were recovered exactly on a separate branch; no implementation was redone. Review is still required: `ballot_attempts` does not have the same update/delete protections as `accepted_ballots`; the concurrency test uses synchronous calls queued through Promises rather than genuine competing processes; authoritative adapter/close-boundary semantics need verification. Shared `src/governance/index.js` differs from <issue id="e82052ce-bfca-4428-b2f2-c90f9128de43" href="https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions">JON-79</issue>'s separately added export and must be reconciled, not overwritten.

In Review reflects delivered source and automated checks, not integration/security approval. No merge or automatic downstream dispatch. <issue id="0691be94-2cff-4aef-9190-4da85b926ead" href="https://linear.app/jons-garage/issue/JON-84/temporary-fresh-codex-internet-verification">JON-84</issue> is informational; <issue id="19637321-042f-49cb-b95f-1372c253a2ce" href="https://linear.app/jons-garage/issue/JON-90/enable-concord-linear-coding-sessions-environment">JON-90</issue> is the sole native-workflow gate.

---

Child of <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue>. Implement first-valid-ballot immutability and auditable handling of rejected, duplicate, retried, and late submissions.

## Required behavior

* A first valid accepted ballot cannot be replaced.
* A duplicate valid submission cannot alter the accepted ballot.
* Rejected or malformed attempts remain auditable.
* A malformed/rejected attempt may be corrected before close only when the opening-roll identity remains eligible.
* Eligibility must be checked through authoritative state.
* Ballot acceptance must be atomic.
* Concurrent submissions from the same identity must result in at most one accepted ballot.
* Forum/social reactions can never enter this path.

## Minimum tests

Two simultaneous valid submissions; valid then duplicate; malformed then corrected; malformed then disqualified; late submission; post-close retry; post-ballot disqualification; social/forum object presented to ballot API; persistence/restart reconstruction.

## Deliverables

Implementation, tests, GitHub PR, change fragment, and blockers.

## Execution policy

Planning only until explicitly authorized. Do not delegate or start coding automatically.

## Historical authorized execution handoff — superseded for new work by design-only contract

This child is explicitly authorized for implementation now as one of the parallel <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue> tracks.

Work only within immutable ballot receipt/submission handling. Use the existing Concord repository and authoritative-state architecture; verify repository, branch, and base commit before editing. Do not implement exact D/B/U threshold arithmetic, <issue id="f2fca42c-1775-4671-9155-c41d34e2415d" href="https://linear.app/jons-garage/issue/JON-59/implement-coaial-coaia-dual-census-and-cra-ceiling-enforcement">JON-59</issue> dual-census internals, quiz work, or unrelated subsystems.

First-valid acceptance must be atomic and immutable. Duplicate/retry/late/rejected attempts must remain auditable without replacing the accepted ballot. Forum/social reaction paths must remain technically separate from constitutional ballot submission.

Return a real GitHub branch/PR if remote write capability exists, exact commit, files changed, tests/results, assumptions, limitations, and blockers. If the environment cannot push to GitHub, report that capability blocker explicitly. Do not merge your own work or start recursive/paid delegation without authorization.
