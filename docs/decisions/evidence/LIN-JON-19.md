# Evidence snapshot: Agreement lifecycle and institutional negotiation

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `a411172634b0ebf27a72f11afb75f30e972cec69`; original SHA-256: `6e4a3e9e5b2efbf865343ca18d6c1c3b3f1ce4823bf78176acd834704b60e037`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-22T00:24:46.828Z
- Source date: 2026-09-22T00:24:46.828Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Delivery disposition — 2026-09-17

Design draft delivered in PR ptown16801-lang/concord#18 (private source reference withheld) at `462d774a133dd52186b52d5743894d9eccbfb93a`, matching producer receipt `a7ebfb71-a5da-480a-aa59-34ed595327d2`. In Review reflects pending acceptance of the agreement-lifecycle contract, not completed production implementation. Preserve the existing draft, acceptance scenarios and recorded checks rather than repeating the producer work.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** agreement lifecycle and institutional-party continuity. **Deliverable:** exact-assent/registration/amendment/breach/cure/termination state model and provenance contract. Reuse JON-31 (private source reference withheld) Option C; do not reopen transfer alternatives. JON-25 (private source reference withheld) consumes this lifecycle for barter/market commitments and owns valuation/matching/settlement planning, not a second agreement registry. Specify only this domain's interfaces and design acceptance scenarios.

---

Implement agreements as first-class authoritative objects in Concord.

Accepted lifecycle: exact mutual assent + authoritative registration; class/scope limits who is bound; higher law/higher lawful authority controls conflicts; same-level supersession must be explicit; cure-first breach handling; failed cure becomes adjudication-eligible; unaffected obligations continue; amendments form an append-only lineage; committee obligations survive membership changes; dissolution terminates committee agreements unless lawfully assumed; surviving institutions can retain their own surviving obligations.

Resolved by JON-31 (private source reference withheld) (Done), adopted Option C: do not transfer/substitute an agreement position while the original institution survives. Use the ordinary termination/supersession/amendment and new-agreement registration lifecycle as legally appropriate, retaining append-only provenance. Ordinary mechanics remain delegated; no repeat owner choice is required.

Workbench views should expose negotiation history, exact-text assent, registration, amendments, breach/cure state, termination/supersession and institutional party continuity without collapsing these into a single opaque score.
