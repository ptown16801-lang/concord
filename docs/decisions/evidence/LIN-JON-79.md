# Evidence snapshot: JON-58B — Eligibility lifecycle and franchise-state transitions

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-79/jon-58b-eligibility-lifecycle-and-franchise-state-transitions
- Version: 2026-09-23T20:05:05.678Z
- Source date: 2026-09-23T20:05:05.678Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Routing clarification — September 23, 2026 consistency audit

<issue id="19637321-042f-49cb-b95f-1372c253a2ce" href="https://linear.app/jons-garage/issue/JON-90/enable-concord-linear-coding-sessions-environment">JON-90</issue> is Canceled and confers no current workflow gate. Older references below to its being the sole native-workflow gate are historical. Current native status, issue-specific remaining scope, published artifacts, and latest explicit owner authorization govern. Preserve existing delivered work and accepted dependency pins; do not restart or create a replacement worker from the historical handoffs below.

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** eligibility/franchise event and projection contract. **Current disposition:** preserve In Review and recovery PR <pull-request id="2c0919d3-97c3-4a34-a40d-c426c4e4cca8" href="https://linear.app/jons-garage/review/jon-79-recover-existing-eligibility-lifecycle-implementation-cc4a24578b3b">ptown16801-lang/concord#7</pull-request>. **Design follow-up:** specify the durable authenticated event boundary, required event IDs, replay identity and population/ballot ordering from <issue id="99b1f17f-3716-40af-b9fa-c65c845d6d5f" href="https://linear.app/jons-garage/issue/JON-87/jon-82a-cross-track-interface-and-integration-readiness-audit">JON-87</issue> IR-01–07. <issue id="79ac2c3d-cfbd-44b1-9c8f-18fd411bfb6c" href="https://linear.app/jons-garage/issue/JON-91/jon-85a-reconcile-recovered-jon-78jon-79-pins-and-unblock-bootstrap">JON-91</issue>'s conditional domain-interface acceptance explicitly depends on trusted authentication and durable storage/replay; it is not acceptance as an independently authenticated durable authority. <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue> owns identity issuance; <issue id="222e207e-e722-4b1e-bc8a-691f1c41d8e3" href="https://linear.app/jons-garage/issue/JON-80/jon-58c-immutable-ballot-receipt-and-submission-handling">JON-80</issue> owns ballot acceptance; <issue id="3adec4a1-9036-4132-80cd-fd0ffc3eb1d7" href="https://linear.app/jons-garage/issue/JON-81/jon-58d-exact-electorate-and-d-b-u-accounting">JON-81</issue> consumes eligibility events. Preserve prior sessions/results without restarting.

---

## Interface-readiness handoff — 2026-09-16 audit

[Complete JON-87 continuation](<https://linear.app/jons-garage/document/jon-87-published-source-interfacereadiness-continuation-v10-06a4bd4f959b>) records exact inspected commits, current source contracts, proof limits and integration order.

IR-01–07: consistent identity/class handling, durable authenticated eligibility, required event identifiers, replay identity, and atomic/ordered population-ballot handoffs.

These are review/coordination findings for the existing scope and owners. Publication or this report does not accept a candidate, change dependency pins, start another worker, or authorize merge. Preserve the original recovery artifacts and resolve findings through the current project/assignment gates.

## VERIFIED RECOVERY DELIVERY — 2026-09-16

**Published and reviewable; not merged or accepted as an integrated authority.**

* Real draft PR: <pull-request id="2c0919d3-97c3-4a34-a40d-c426c4e4cca8" href="https://linear.app/jons-garage/review/jon-79-recover-existing-eligibility-lifecycle-implementation-cc4a24578b3b">ptown16801-lang/concord#7</pull-request>
* Fetchable branch: `delivery/jon-79-recovery-20260916`
* Published SHA: `51a102259785a5b53dc6ec4bc4bbca54c4a8fc37`
* Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`
* GitHub-created tree exactly matches the exported source tree: `c2f0cb37a3851350164df8dcc523b1b42d18ab94`.
* Source: comment `5522042e-0e33-48c8-8bf3-49b4b8e6c536` from the existing Codex task. Original local SHA `aaeee2c1951a4fa00c24ff55ac1f95e5acd9a770` was unavailable in the resumed sandbox; current exported snapshot reported `c4687f30b8483944f4a4323df98e65d8e8115917`. This recovery verifies content equality, not original commit identity.
* Fresh GitHub CI: [https://github.com/ptown16801-lang/concord/actions/runs/35150977255](<https://github.com/ptown16801-lang/concord/actions/runs/35150977255>) — **Node 22.x and Node 24.x jobs both passed**, including `npm test` and `npm run check`. This is the new full-suite evidence; the old Node-20 failure is not being represented as a pass.

The source implementation was not redone, edited, or merged. The connector published its exact exported tree in a separate recovery branch. Required review still includes authority/persistence/authentication boundaries and cross-track integration. The in-memory history implementation and caller-provided authentication evidence need review against controlling requirements; tree equivalence and passing tests alone are not constitutional/security approval.

<issue id="2f07cdad-35d9-4aa3-a2d7-94164f116692" href="https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff">JON-85</issue> may inspect this fetchable artifact once explicitly continued, but its old unavailable dependency pin must not be silently substituted. No restart, new coding session, merge, or automatic successor dispatch was performed. <issue id="0691be94-2cff-4aef-9190-4da85b926ead" href="https://linear.app/jons-garage/issue/JON-84/temporary-fresh-codex-internet-verification">JON-84</issue> remains informational; <issue id="19637321-042f-49cb-b95f-1372c253a2ce" href="https://linear.app/jons-garage/issue/JON-90/enable-concord-linear-coding-sessions-environment">JON-90</issue> remains the sole native-workflow gate.

---

Child of <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue>. Implement authoritative, versioned voting-eligibility transitions.

## Scope

Own eligibility effects for ordinary living identities, formal proceedings, C4 temporary restrictions where applicable, death/capital termination, felony conviction, temporary restoration before close, and permanent franchise loss.

Do not implement ballot counting itself.

## Rules to preserve

* Mere allegation is not disqualification.
* Formal proceeding can bar new ballots under the controlling rule.
* C4 restriction begins only through the required authenticated creation event and affected-identity list.
* Death/capital termination is final.
* Lawful felony conviction creates the permanent franchise bar immediately at the conviction event.
* A temporary restriction that ends before election close may return an otherwise eligible opening-roll nonvoter to U.
* Restoration after close does not reopen the election.
* A valid ballot accepted before later disqualification remains accepted for that election.

## Minimum tests

Allegation without formal proceeding; pre/post-ballot formal proceeding; pre/post-ballot death; felony timing; temporary restriction/restoration; restoration after close; repeated/invalid transitions; rollback.

## Deliverables

Implementation, tests, auditable transition model, GitHub PR, change fragment, and blockers.

## Execution policy

Planning only until explicitly authorized. Do not delegate or start coding automatically.

## Historical authorized execution handoff — superseded for new work by design-only contract

This child is explicitly authorized for implementation now as one of the parallel <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue> tracks.

Work only within the eligibility/franchise-state scope defined above. Use the existing Concord repository and authoritative-state architecture; verify repository, branch, and base commit before editing. Do not implement ballot counting, exact D/B/U arithmetic, <issue id="f2fca42c-1775-4671-9155-c41d34e2415d" href="https://linear.app/jons-garage/issue/JON-59/implement-coaial-coaia-dual-census-and-cra-ceiling-enforcement">JON-59</issue> dual-census internals, quiz work, or unrelated subsystems.

Preserve the adopted distinctions among allegation, formal proceeding, C4 event opening, death/capital termination, felony conviction, temporary restoration, and post-ballot disqualification. Do not collapse these into one generic restriction flag.

Return a real GitHub branch/PR if remote write capability exists, exact commit, files changed, tests/results, assumptions, limitations, and blockers. If the execution environment cannot push to GitHub, report that capability blocker explicitly. Do not merge your own work or start recursive/paid delegation without authorization.
