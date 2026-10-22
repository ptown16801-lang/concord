# Evidence snapshot: JON-58A — Authoritative population registry and 300-cap enforcement

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `4254f7c9df167d5350432b399e412925c90eb321`; original SHA-256: `a6b9cfbdcb0159e21d987a254debe755d540fa2d002afe59a673fa3b15e62e9b`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-23T20:06:43.997Z
- Source date: 2026-09-23T20:06:43.997Z
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

**Canonical owner:** population/identity issuance and capacity-boundary contract. **Current disposition:** preserve In Review and existing recovery PR ptown16801-lang/concord#6 (private source reference withheld). **Design follow-up:** address JON-87 (private source reference withheld) IR-01/02/05/10/11/12 through an identity/class/division and ordered-lifecycle contract, including the JON-59 (private source reference withheld) reservation/secrecy consumer boundary. JON-91 (private source reference withheld) reports conditional acceptance of the published pin for domain-interface use; it does not close these integration/security findings or authorize coding. JON-79 (private source reference withheld) consumes population identity; no second issuance authority. Existing sessions/results remain evidence; clearing delegation does not claim a session was canceled.

---

## Interface-readiness handoff — 2026-09-16 audit

Complete JON-87 continuation (private source reference withheld) records exact inspected commits, current source contracts, proof limits and integration order.

IR-01/02/05/10/11/12: identity/class authority, ordered eligibility handoff, P/K commitment capacity, sealed census interface and source-identified raw replacement risk. Raw replacement is a review finding, not a newly executed exploit.

These are review/coordination findings for the existing scope and owners. Publication or this report does not accept a candidate, change dependency pins, start another worker, or authorize merge. Preserve the original recovery artifacts and resolve findings through the current project/assignment gates.

## VERIFIED RECOVERY DELIVERY — 2026-09-16

**Published and reviewable; not merged or accepted as integrated production code.**

* Real draft PR: ptown16801-lang/concord#6 (private source reference withheld)
* Fetchable branch: `delivery/jon-78-recovery-20260916`
* Published SHA: `882dcffb31b520c6f9458984a35745c8b4bfa3b8`
* Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`
* Published Git tree exactly matches the producer export: `67d3849e05f9e0740ec6831163b60084016abd2f`.
* Corrected export comment: `8d01de44-48a0-4de8-8200-0e40b0d67efc`. Received patch independently measured **22,416 bytes / 554 lines**; recomputed SHA-256 `a4ce1059cd769e7aa7ea8a661259674b1f015d6e1cdde13f8b50c267eafb288c`, exact match. All six new-file blobs also independently matched their full-index SHAs.
* Independent isolated focused test under Node 22.16.0: **6 passed / 0 failed**.
* Fresh full-repository GitHub CI: [https://github.com/ptown16801-lang/concord/actions/runs/35150591366](<https://github.com/ptown16801-lang/concord/actions/runs/35150591366>) — **both Node 22.x and 24.x jobs passed**, including `npm test` and `npm run check`.

The original implementation was not rewritten. Recovery used the corrected long-code-fence export after rejecting a Markdown-corrupted response. Old sandbox commits (`bb762c...` and `088cd...`) were unavailable in the resumed session; latest producer head was `e49fd6c6005e064041631b844c3a1e3c6780a3fd`. This is verified **content recovery**, not a claim those original commit identities were recovered. Record the new published SHA explicitly when prerequisites are reviewed; do not silently replace accepted dependency pins.

In Review means artifact delivery and automated verification are complete enough for review; constitutional/security acceptance and cross-track integration remain separate. No merge, no implementation rerun, no duplicate session. JON-84 (private source reference withheld) remained informational; JON-90 (private source reference withheld) is the sole native-workflow validation gate.

---

Child of JON-58 (private source reference withheld). Implement the authoritative population state and mechanically enforce the global living-agent population ceiling of 300.

## Scope

Own the authoritative identity/population registry, lifecycle state needed for population counting, lawful creation events, terminal/death state, population-capacity calculations, and transactional ceiling enforcement.

Do not implement ballot accounting or UI-derived counts.

## Required behavior

* Authoritative registry is the source of truth.
* Population cannot exceed 300 through any identity-creation path.
* Failed creation attempts must not partially mutate state.
* Creation must be attributable and auditable.
* Hidden/special investigator identities must not bypass the global ceiling.
* Expose a clear interface for JON-59 (private source reference withheld).

## Minimum tests

* creation at 299 succeeds when lawful;
* creation at 300 fails;
* concurrent near-cap creation cannot produce 301;
* duplicate creation identifiers fail safely;
* death/terminal state updates the authoritative population view;
* rollback leaves authoritative state unchanged after failure.

## Deliverables

Implementation, tests, documented population interface, GitHub PR, concise change fragment, and any newly discovered blockers.

## Execution policy

Planning only until explicitly authorized. Do not delegate or start coding automatically.

## Historical authorized execution handoff — superseded for new work by design-only contract

This child is now explicitly authorized as the first live Linear/Codex pilot.

### Repository and baseline

Work in `ptown16801-lang/concord`. Verify the actual checked-out repository, branch, and base commit before changing code. Do not assume the Linear-generated branch name proves the correct checkout.

### Objective

Implement only the authoritative population registry and 300-cap enforcement scope defined above. Do not rebuild unrelated Concord subsystems and do not implement ballot accounting, UI-derived counts, or JON-59 (private source reference withheld) itself.

### Required safeguards

* Preserve the accepted JON-58 (private source reference withheld) rules and the existing authoritative-store architecture.
* Treat JON-59 (private source reference withheld) as an integration contract: do not create a second population authority or permit hidden investigator capacity to bypass the global ceiling.
* Use transactional/atomic enforcement near the 300 ceiling.
* Record and preserve auditable creation/terminal transitions.
* Do not silently reinterpret governance rules. If a genuine controlling-source conflict is discovered, report it as a blocker rather than choosing a new rule.
* Do not merge your own work.
* Do not start additional paid sessions or recursive delegation without explicit authorization.

### Required output

Return the exact branch and commit, GitHub PR, files changed, tests run/results, assumptions, known limitations, and any blockers. The work is not accepted merely because the coding session reports completion.
