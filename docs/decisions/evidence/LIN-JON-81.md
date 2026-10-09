# Evidence snapshot: JON-58D — Exact electorate and D = B + U accounting

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-81/jon-58d-exact-electorate-and-d-b-u-accounting
- Version: 2026-09-23T20:05:05.678Z
- Source date: 2026-09-23T20:05:05.678Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Routing clarification — September 23, 2026 consistency audit

<issue id="19637321-042f-49cb-b95f-1372c253a2ce" href="https://linear.app/jons-garage/issue/JON-90/enable-concord-linear-coding-sessions-environment">JON-90</issue> is Canceled and confers no current workflow gate. Older references below to its being the sole native-workflow gate are historical. Current native status, issue-specific remaining scope, published artifacts, and latest explicit owner authorization govern. Preserve existing delivered work and accepted dependency pins; do not restart or create a replacement worker from the historical handoffs below.

## Status supersession — 2026-09-18 audit

Latest verified evidence returned this issue for revision under the status-evidence invariant. Current native tracking state is Backlog with no delegate; prior Todo/In Review/delegation language below is historical delivery/review context, not current disposition and not live execution evidence. Required next work is bounded to the recorded review amendments: receipt/event-derived accounting, durable authoritative close/recovery, producer-boundary acceptance, and explicit accepted pins.

---

## Acceptance-status correction — 2026-09-17

Historical correction restored In Review at that time to match then-current delivery evidence. Recovery PR <pull-request id="c4fb51ab-1da7-4251-a7d6-e514c373bd7c" href="https://linear.app/jons-garage/review/jon-81-recover-existing-exact-electorate-accounting-implementation-31e3f3e26f39">JON-81: Recover existing exact electorate accounting implementation</pull-request> is delivered, but the required receipt/event-derived accounting, durable authoritative close/recovery and producer-boundary acceptance are not recorded as accepted. <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue>'s delivered boundary contract (`6dbcd119-4771-4e2d-8152-321e4d0e7cc9`) explicitly does not accept producer revisions. Retain its design resolutions and all existing arithmetic/fixture evidence; do not recreate that work. This status repair changes no pins, dependencies or execution authorization.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** election/opening-roll B/U/D projection and frozen-result contract. **Historical disposition at that time:** preserve In Review and recovery PR <pull-request id="c4fb51ab-1da7-4251-a7d6-e514c373bd7c" href="https://linear.app/jons-garage/review/jon-81-recover-existing-exact-electorate-accounting-implementation-31e3f3e26f39">JON-81: Recover existing exact electorate accounting implementation</pull-request>. **Design follow-up:** resolve <issue id="99b1f17f-3716-40af-b9fa-c65c845d6d5f" href="https://linear.app/jons-garage/issue/JON-87/jon-82a-cross-track-interface-and-integration-readiness-audit">JON-87</issue> IR-01/07/08/13/14 by defining receipt/event-derived accounting, durable close/version evidence and exact threshold scenarios. <issue id="222e207e-e722-4b1e-bc8a-691f1c41d8e3" href="https://linear.app/jons-garage/issue/JON-80/jon-58c-immutable-ballot-receipt-and-submission-handling">JON-80</issue> alone accepts ballots; <issue id="e82052ce-bfca-4428-b2f2-c90f9128de43" href="https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions">JON-79</issue> supplies eligibility. This issue must not create another ballot-acceptance authority or repeat the existing arithmetic/fixture work. Shared interface resolution belongs to <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue>.

---

## Interface-readiness handoff — 2026-09-16 audit

[Complete JON-87 continuation](<https://linear.app/jons-garage/document/jon-87-published-source-interfacereadiness-continuation-v10-06a4bd4f959b>) records exact inspected commits, current source contracts, proof limits and integration order.

IR-01/07/08/13/14: identity joins, authoritative close ordering, receipt/event-derived durable accounting, shared exports and recoverable frozen election results.

These are review/coordination findings for the existing scope and owners. Publication or this report does not accept a candidate, change dependency pins, start another worker, or authorize merge. Preserve the original recovery artifacts and resolve findings through the current project/assignment gates.

## VERIFIED RECOVERY DELIVERY — 2026-09-16

**Published and reviewable; not merged or accepted as integrated production code.**

* Draft PR: <pull-request id="c4fb51ab-1da7-4251-a7d6-e514c373bd7c" href="https://linear.app/jons-garage/review/jon-81-recover-existing-exact-electorate-accounting-implementation-31e3f3e26f39">ptown16801-lang/concord#9</pull-request>
* Branch: `delivery/jon-81-recovery-20260916`
* Published SHA: `a090a67719681b04683f1f87c35d4080ea0854f5`
* Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`
* Exported tree and independently created GitHub tree exactly match: `053109bf4d49cbe571d9e938d3837cdfa41ae055`.
* Export comment: `48b0dad1-24ed-45e3-baaa-0d0bfdb224c6`; source snapshot: `7de92970cb913bb92d1ebbd127a354f94e72cc1b`. Original `cd516c4` was unavailable in the resumed sandbox. Content recovery is verified; old commit identity is not.
* Fresh CI: [https://github.com/ptown16801-lang/concord/actions/runs/35151691581](<https://github.com/ptown16801-lang/concord/actions/runs/35151691581>) — **Node 22.x and 24.x jobs both passed**, including `npm test` and `npm run check`.

Six existing changed paths were restored exactly on a separate recovery branch, not reimplemented. Cross-track review must ensure this accounting component consumes <issue id="222e207e-e722-4b1e-bc8a-691f1c41d8e3" href="https://linear.app/jons-garage/issue/JON-80/jon-58c-immutable-ballot-receipt-and-submission-handling">JON-80</issue>'s authoritative accepted receipts and <issue id="e82052ce-bfca-4428-b2f2-c90f9128de43" href="https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions">JON-79</issue>'s state transitions instead of becoming a second independent ballot acceptance authority. Persistence and shared package/check/documentation reconciliation remain review/integration work. The accounting component's passing tests do not establish <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue> production integration.

No merge, implementation restart, or automatic downstream dispatch. <issue id="0691be94-2cff-4aef-9190-4da85b926ead" href="https://linear.app/jons-garage/issue/JON-84/temporary-fresh-codex-internet-verification">JON-84</issue> remains informational; <issue id="19637321-042f-49cb-b95f-1372c253a2ce" href="https://linear.app/jons-garage/issue/JON-90/enable-concord-linear-coding-sessions-environment">JON-90</issue> is the sole native-workflow gate.

---

Child of <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue>. Implement exact authoritative election accounting.

## Definitions

* B = opening-roll identities whose valid accepted ballot exists, including valid abstention.
* U = opening-roll identities with no valid accepted ballot that remain eligible in that electorate.
* D = |B| + |U|.
* B and U are disjoint.
* Each identity can occur at most once.

## Threshold arithmetic

Implement as integer-exact authoritative calculations:

* 60% = ceil(3\*D/5)
* two-thirds = ceil(2\*D/3)
* three-quarters = ceil(3\*D/4)
* strict majority = floor(D/2)+1
* unanimity = D
  No threshold vote passes when D = 0.

Do not use floating-point percentages for authoritative threshold decisions.

## Minimum tests

D=0; D=1; boundary values around every threshold; abstention; pre-ballot disqualification; post-ballot disqualification; temporary loss/restoration before close; restoration after close; duplicate ballot; invariant checks proving B∩U=∅ and D=|B|+|U|.

## Deliverables

Implementation, tests, documented accounting interface, GitHub PR, change fragment, and blockers.

## Execution policy

Planning only until explicitly authorized. Do not delegate or start coding automatically.

## Historical authorized execution handoff — superseded for new work by design-only contract

This child is explicitly authorized for implementation now as one of the parallel <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue> tracks.

Work only within exact electorate accounting and threshold arithmetic. Use the existing Concord repository and authoritative-state architecture; verify repository, branch, and base commit before editing. Do not implement <issue id="f2fca42c-1775-4671-9155-c41d34e2415d" href="https://linear.app/jons-garage/issue/JON-59/implement-coaial-coaia-dual-census-and-cra-ceiling-enforcement">JON-59</issue> dual-census internals, quiz work, or unrelated subsystems.

Preserve the controlling definitions exactly: B is the accepted-ballot set including valid abstention; U is opening-roll nonvoters who remain eligible; B and U are disjoint; D=|B|+|U|; no threshold passes when D=0. Thresholds must be integer-exact, not floating-point derived.

Return a real GitHub branch/PR if remote write capability exists, exact commit, files changed, tests/results, assumptions, limitations, and blockers. If the environment cannot push to GitHub, report that capability blocker explicitly. Do not merge your own work or start recursive/paid delegation without authorization.
