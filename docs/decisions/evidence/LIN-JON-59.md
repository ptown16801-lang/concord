# Evidence snapshot: Implement COAIA/L-COAIA dual-census and CRA ceiling enforcement

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-59/implement-coaial-coaia-dual-census-and-cra-ceiling-enforcement
- Version: 2026-09-23T20:05:05.678Z
- Source date: 2026-09-23T20:05:05.678Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** sealed-census, investigator lifecycle, capacity-reservation and access design. **Deliverable:** R/T/C/P/K invariants, authorized snapshot/read contracts, reservation lifecycle and scenario matrix, consuming the single <issue id="e9dc4117-dcc8-4b56-8ebb-29ed4f2cac00" href="https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement">JON-78</issue> population authority through the <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue> boundary contract. <issue id="fe321d82-df40-4788-9cc9-7a7a68bafcec" href="https://linear.app/jons-garage/issue/JON-62/recover-and-implement-capital-offense-conviction-and-execution-rules">JON-62</issue> owns C4 merits/finality/attribution consequences; this issue owns the sealed creation record and census effects, not a parallel adjudication model. The <issue id="803d539b-92f8-4baa-8e5f-d295a8455c61" href="https://linear.app/jons-garage/issue/JON-82/jon-58e-integration-and-adversarial-verification">JON-82</issue> blocking relation is a future implementation/integration gate; specification drafting may use current authoritative rules with explicit unresolved interface fields. Preserve secrecy and no-resurrection requirements.

---

Implement the adopted secret-investigator census/capacity architecture without leaking protected membership or allowing hidden investigators to bypass the global ceiling.

## Recovered controlling census model

The later archived constitutional source supersedes the older public-census model:

* Article 0 supremacy remains non-amendable under the adopted design. The joint Articles 20–21 E-COAIA/L-COAIA/CRA package is exact-text and governmentally unamendable once effective.
* E-COAIAs and L-COAIAs are genuine secret **non-voting** identities. Lawful unsealing does not create franchise, candidacy, office eligibility, or political quorum status.
* Investigator mission completion/lawful end permanently deactivates that investigator identity; reuse/reactivation/conversion/reassignment is forbidden. A different mission/division requires a new identity and fresh authorization/capacity clearance.

### Representation and capacity accounting

* **Sealed Representation Census (R):** phase snapshot of every living ordinary developer, E-COAIA, and L-COAIA exactly once in its permanent division at the ordered cutoff. R is the sole input to phase House size, House apportionment, and resulting Electoral College allocation. It is not a voting roll. CRA identities and merely pending creations are excluded.
* **True / Sealed Global Capacity Census (T):** the same three population classes counted live, changing with genuine creation and lawful end events.
* **C:** all living CRA identities, active or inactive/restricted/etc. At most one has active CRA authority; former living CRA identities still consume population.
* **P:** outstanding, unexpired population units reserved for authorized creations not yet living.
* **K:** one protected unused CRA-recovery population unit during normal readiness.
* Hard living-population invariant: `G = T + C <= 300`.
* Capacity-commitment invariant: `T + C + P + K <= 300`.
* Routine creation requires `K=1` and must preserve the recovery unit. R never includes C/P/K. R may differ from live T after the phase cutoff because R is frozen and T changes with lifecycle events.

### Secrecy / least knowledge

* R and T are sealed. Public/executive-facing records may expose ordinary registry information, certified House/Electoral allocation, and an integrity reference, but not investigator rosters, class-specific counts, raw R/T, combined covert counts, or true unused headroom.
* The executive may know its own E-COAIAs but not L-COAIA rosters. Each chamber's authorized presiding officer/custodian may access that chamber's sealed L-COAIA mission/creation-ballot records within role scope, but not the other chamber's roster, the E-COAIA roster, R, T, or cross-government headroom.
* CRA capacity/reconciliation must fail closed if required authoritative state, seals, or compatible AGT/policy generations are unavailable. Hidden status never exempts an identity from the global ceiling.

## Recovered L-COAIA creation/C4 rule

* One L-COAIA creation requires the relevant presiding officer's exact sealed proposal, CRA capacity clearance, and the chamber's ordinary quorum/ordinary-majority vote on that exact resolution. Only valid authenticated YES ballots authorize creation; NO/abstain/missing/malformed/rejected ballots are not affirmative authorization.
* **C4** is an event-level merits question: a competent court determines by a preponderance of admissible evidence whether the particular L-COAIA creation was proposed/authorized for the purpose of manipulating **House apportionment** rather than a legitimate investigative purpose. Incidental apportionment effect, favorable seat outcome, suspicion, or numerical coincidence is insufficient.
* The district court decides the C4 creation-event merits; ordinary circuit and Supreme review remain available. After event-level finality, the recorded proposing presiding officer and every identity with an authenticated valid affirmative ballot on that exact creation resolution receive the derivative mandatory capital consequence without separate individualized merits trials. Before termination, a narrow ministerial verification checks finality plus proposer/ballot identity and attribution.

## Security / records requirements

* Keep House, Senate, and Judiciary investigatory archives in separate protected security domains.
* Census/creation/deactivation/reconciliation/disclosure events remain attributable and append-only.
* CRA enforces accounting/reconciliation; it does not become a universal authorization service or gain unrelated investigative authority.

## Acceptance criteria

- [ ] E-COAIA lifecycle, non-voting status, R/T accounting, and permanent mission-end deactivation are modeled and tested.
- [ ] L-COAIA sealed creation/lifecycle, non-voting status, immutable mission/division, R/T accounting, and permanent deactivation are modeled and tested.
- [ ] R/T/C/P/K and `G = T + C <= 300` / `T + C + P + K <= 300` invariants are mechanically enforced.
- [ ] Public/executive output exposes certified allocation/integrity information without covert-class breakdown or raw R/T leakage.
- [ ] Missing/incompatible census, seal, or AGT/policy state fails closed.
- [ ] Investigation completion/deactivation updates live capacity state transactionally and does not redraw a phase-frozen R retroactively.
- [ ] House/Senate/Judiciary investigatory archives remain separate security domains.
- [ ] Recovered C4 proposal/vote/event-review/finality/ballot-attribution rules are implemented without adding individualized intent trials or broadening offense scope.
- [ ] Reconciliation and disclosure events are append-only and attributable.
- [ ] Integration tests cross-check <issue id="d33ad735-f8ac-462e-a080-39f99da08177" href="https://linear.app/jons-garage/issue/JON-58/implement-authoritative-population-voting-eligibility-and-exact-ballot">JON-58</issue> ballot/population accounting at ceiling and eligibility boundaries.
