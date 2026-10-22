# Evidence snapshot: JON-58D — Exact electorate and D = B + U accounting

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `b3233d5f2515693088bd4550f8900e0d2cca90b9`; original SHA-256: `52d0260bb3926c006423237ec9d28ac7910faf2a30287d281d03ff910536c9f9`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-23T20:05:05.678Z
- Source date: 2026-09-23T20:05:05.678Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Routing clarification — September 23, 2026 consistency audit

JON-90 (private source reference withheld) is Canceled and confers no current workflow gate. Older references below to its being the sole native-workflow gate are historical. Current native status, issue-specific remaining scope, published artifacts, and latest explicit owner authorization govern. Preserve existing delivered work and accepted dependency pins; do not restart or create a replacement worker from the historical handoffs below.

## Status supersession — 2026-09-18 audit

Latest verified evidence returned this issue for revision under the status-evidence invariant. Current native tracking state is Backlog with no delegate; prior Todo/In Review/delegation language below is historical delivery/review context, not current disposition and not live execution evidence. Required next work is bounded to the recorded review amendments: receipt/event-derived accounting, durable authoritative close/recovery, producer-boundary acceptance, and explicit accepted pins.

---

## Acceptance-status correction — 2026-09-17

Historical correction restored In Review at that time to match then-current delivery evidence. Recovery PR JON-81: Recover existing exact electorate accounting implementation (private source reference withheld) is delivered, but the required receipt/event-derived accounting, durable authoritative close/recovery and producer-boundary acceptance are not recorded as accepted. JON-82 (private source reference withheld)'s delivered boundary contract (`6dbcd119-4771-4e2d-8152-321e4d0e7cc9`) explicitly does not accept producer revisions. Retain its design resolutions and all existing arithmetic/fixture evidence; do not recreate that work. This status repair changes no pins, dependencies or execution authorization.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** election/opening-roll B/U/D projection and frozen-result contract. **Historical disposition at that time:** preserve In Review and recovery PR JON-81: Recover existing exact electorate accounting implementation (private source reference withheld). **Design follow-up:** resolve JON-87 (private source reference withheld) IR-01/07/08/13/14 by defining receipt/event-derived accounting, durable close/version evidence and exact threshold scenarios. JON-80 (private source reference withheld) alone accepts ballots; JON-79 (private source reference withheld) supplies eligibility. This issue must not create another ballot-acceptance authority or repeat the existing arithmetic/fixture work. Shared interface resolution belongs to JON-82 (private source reference withheld).

---

## Interface-readiness handoff — 2026-09-16 audit

Complete JON-87 continuation (private source reference withheld) records exact inspected commits, current source contracts, proof limits and integration order.

IR-01/07/08/13/14: identity joins, authoritative close ordering, receipt/event-derived durable accounting, shared exports and recoverable frozen election results.

These are review/coordination findings for the existing scope and owners. Publication or this report does not accept a candidate, change dependency pins, start another worker, or authorize merge. Preserve the original recovery artifacts and resolve findings through the current project/assignment gates.

## VERIFIED RECOVERY DELIVERY — 2026-09-16

**Published and reviewable; not merged or accepted as integrated production code.**

* Draft PR: ptown16801-lang/concord#9 (private source reference withheld)
* Branch: `delivery/jon-81-recovery-20260916`
* Published SHA: `a090a67719681b04683f1f87c35d4080ea0854f5`
* Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`
* Exported tree and independently created GitHub tree exactly match: `053109bf4d49cbe571d9e938d3837cdfa41ae055`.
* Export comment: `48b0dad1-24ed-45e3-baaa-0d0bfdb224c6`; source snapshot: `7de92970cb913bb92d1ebbd127a354f94e72cc1b`. Original `cd516c4` was unavailable in the resumed sandbox. Content recovery is verified; old commit identity is not.
* Fresh CI: [https://github.com/ptown16801-lang/concord/actions/runs/35151691581](<https://github.com/ptown16801-lang/concord/actions/runs/35151691581>) — **Node 22.x and 24.x jobs both passed**, including `npm test` and `npm run check`.

Six existing changed paths were restored exactly on a separate recovery branch, not reimplemented. Cross-track review must ensure this accounting component consumes JON-80 (private source reference withheld)'s authoritative accepted receipts and JON-79 (private source reference withheld)'s state transitions instead of becoming a second independent ballot acceptance authority. Persistence and shared package/check/documentation reconciliation remain review/integration work. The accounting component's passing tests do not establish JON-82 (private source reference withheld) production integration.

No merge, implementation restart, or automatic downstream dispatch. JON-84 (private source reference withheld) remains informational; JON-90 (private source reference withheld) is the sole native-workflow gate.

---

Child of JON-58 (private source reference withheld). Implement exact authoritative election accounting.

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

This child is explicitly authorized for implementation now as one of the parallel JON-58 (private source reference withheld) tracks.

Work only within exact electorate accounting and threshold arithmetic. Use the existing Concord repository and authoritative-state architecture; verify repository, branch, and base commit before editing. Do not implement JON-59 (private source reference withheld) dual-census internals, quiz work, or unrelated subsystems.

Preserve the controlling definitions exactly: B is the accepted-ballot set including valid abstention; U is opening-roll nonvoters who remain eligible; B and U are disjoint; D=|B|+|U|; no threshold passes when D=0. Thresholds must be integer-exact, not floating-point derived.

Return a real GitHub branch/PR if remote write capability exists, exact commit, files changed, tests/results, assumptions, limitations, and blockers. If the environment cannot push to GitHub, report that capability blocker explicitly. Do not merge your own work or start recursive/paid delegation without authorization.
