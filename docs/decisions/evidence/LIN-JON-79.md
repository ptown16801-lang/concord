# Evidence snapshot: JON-58B — Eligibility lifecycle and franchise-state transitions

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `cebc87beb67b28143c49124289f026025e232d91`; original SHA-256: `a978f3760e04808ab599eb4bb72a2659900419123e279a8209666971abfe0e98`. The public file has a different checksum and is not the original frozen snapshot.

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

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** eligibility/franchise event and projection contract. **Current disposition:** preserve In Review and recovery PR ptown16801-lang/concord#7 (private source reference withheld). **Design follow-up:** specify the durable authenticated event boundary, required event IDs, replay identity and population/ballot ordering from JON-87 (private source reference withheld) IR-01–07. JON-91 (private source reference withheld)'s conditional domain-interface acceptance explicitly depends on trusted authentication and durable storage/replay; it is not acceptance as an independently authenticated durable authority. JON-78 (private source reference withheld) owns identity issuance; JON-80 (private source reference withheld) owns ballot acceptance; JON-81 (private source reference withheld) consumes eligibility events. Preserve prior sessions/results without restarting.

---

## Interface-readiness handoff — 2026-09-16 audit

Complete JON-87 continuation (private source reference withheld) records exact inspected commits, current source contracts, proof limits and integration order.

IR-01–07: consistent identity/class handling, durable authenticated eligibility, required event identifiers, replay identity, and atomic/ordered population-ballot handoffs.

These are review/coordination findings for the existing scope and owners. Publication or this report does not accept a candidate, change dependency pins, start another worker, or authorize merge. Preserve the original recovery artifacts and resolve findings through the current project/assignment gates.

## VERIFIED RECOVERY DELIVERY — 2026-09-16

**Published and reviewable; not merged or accepted as an integrated authority.**

* Real draft PR: ptown16801-lang/concord#7 (private source reference withheld)
* Fetchable branch: `delivery/jon-79-recovery-20260916`
* Published SHA: `51a102259785a5b53dc6ec4bc4bbca54c4a8fc37`
* Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`
* GitHub-created tree exactly matches the exported source tree: `c2f0cb37a3851350164df8dcc523b1b42d18ab94`.
* Source: comment `5522042e-0e33-48c8-8bf3-49b4b8e6c536` from the existing Codex task. Original local SHA `aaeee2c1951a4fa00c24ff55ac1f95e5acd9a770` was unavailable in the resumed sandbox; current exported snapshot reported `c4687f30b8483944f4a4323df98e65d8e8115917`. This recovery verifies content equality, not original commit identity.
* Fresh GitHub CI: [https://github.com/ptown16801-lang/concord/actions/runs/35150977255](<https://github.com/ptown16801-lang/concord/actions/runs/35150977255>) — **Node 22.x and Node 24.x jobs both passed**, including `npm test` and `npm run check`. This is the new full-suite evidence; the old Node-20 failure is not being represented as a pass.

The source implementation was not redone, edited, or merged. The connector published its exact exported tree in a separate recovery branch. Required review still includes authority/persistence/authentication boundaries and cross-track integration. The in-memory history implementation and caller-provided authentication evidence need review against controlling requirements; tree equivalence and passing tests alone are not constitutional/security approval.

JON-85 (private source reference withheld) may inspect this fetchable artifact once explicitly continued, but its old unavailable dependency pin must not be silently substituted. No restart, new coding session, merge, or automatic successor dispatch was performed. JON-84 (private source reference withheld) remains informational; JON-90 (private source reference withheld) remains the sole native-workflow gate.

---

Child of JON-58 (private source reference withheld). Implement authoritative, versioned voting-eligibility transitions.

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

This child is explicitly authorized for implementation now as one of the parallel JON-58 (private source reference withheld) tracks.

Work only within the eligibility/franchise-state scope defined above. Use the existing Concord repository and authoritative-state architecture; verify repository, branch, and base commit before editing. Do not implement ballot counting, exact D/B/U arithmetic, JON-59 (private source reference withheld) dual-census internals, quiz work, or unrelated subsystems.

Preserve the adopted distinctions among allegation, formal proceeding, C4 event opening, death/capital termination, felony conviction, temporary restoration, and post-ballot disqualification. Do not collapse these into one generic restriction flag.

Return a real GitHub branch/PR if remote write capability exists, exact commit, files changed, tests/results, assumptions, limitations, and blockers. If the execution environment cannot push to GitHub, report that capability blocker explicitly. Do not merge your own work or start recursive/paid delegation without authorization.
