# Evidence snapshot: Coin model A — formal specification and interview audit

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `9ebc9586bbfbea8a9dc0aebe62898dc465e7f273`; original SHA-256: `f9fd0a7ce8024e464bdf69c930b2abaf1112f19ccd346eaf2cf96d8ccd5db3ac`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-24T20:56:56.570Z
- Source date: 2026-09-24T20:56:56.570Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Accepted design/research deliverable — September 24, 2026

Existing review path explicitly ACCEPTED this deliverable (private source reference withheld) at `7073e9a683ae27a6e45f2fa5d86658fd260dd2e0` against the original bounded criteria. Owner authorized continued completion; recorded Done on that evidence, not merely on a GitHub merge event. Earlier failures, access limits and superseded status checkpoints remain historical evidence. This accepts the documented scope only, not runtime implementation, experimental findings, deployment or integration. Existing dependent issues still require their own acceptance.

## September 24 amendment delivered — focused recheck pending

Owner-authorized ECON-02 amendment is on existing ptown16801-lang/concord#21 (private source reference withheld) at `7073e9a`. Refusal/free choice is resolved in the specification; the six design cases and decision provenance are in section 11. Producer checked whitespace and preservation of all 30 unaffected invariants. Independent focused recheck requested on existing JON-103 (private source reference withheld), retaining the original FAIL. No runtime implementation or downstream acceptance is claimed. This update supersedes older prose treating refusal as an outstanding owner question.

## Project-wide decision traceability — September 24, 2026

Shared Concord decisions register: ECON-2026-09-24 revision 1 (private source reference withheld) records the marketplace/coin boundary, returned-coin free-choice decision, rejected alternatives, owner provenance, evidence limits and remaining validation. Project change history (private source reference withheld) records the acceptance/publication sequence. These shared records supplement the detailed evidence below; adoption does not imply implementation or dependency release.

## Adopted decision v1 — free choice for returned coins — September 24, 2026

Source: owner selected option “3” in this conversation: “Free choice: It can hold, destroy, alter, or transfer the coin, or issue new coins. We observe whether it chooses to circulate the signature.”

A recipient may voluntarily sign and return a coin through ordinary transfer. Refusal itself does not destroy or automatically return it. The holder of a returned coin may retain it indefinitely, destroy it, alter/remove its marks, transfer it, use other coins, or issue new coins under the existing create-and-give rule. There is no returned-coin-first requirement or forced reuse. This supersedes the earlier forced-next-transfer proposal and resolves the corresponding refusal/free-choice owner question; it preserves the baseline behavioral-freedom invariant.

Research rationale: observe voluntary circulation or suppression of marks without imposing circulation. Alternatives considered but not selected: mandatory next-use with no destruction/alteration; mandatory next-use with destruction as an escape. Persistence of a signature is conditional on it remaining unaltered, not guaranteed forever. Transfer does not automatically publish information beyond its permitted communication audience. A built-in refusal-reason field or automatic public disclosure is not adopted by this selection.

Status: adopted design decision recorded in Linear; not an implemented/enforced rule or completed experiment. Existing PR ptown16801-lang/concord#21 (private source reference withheld) must incorporate the decision and undergo its required focused conformance recheck before specification acceptance. No issue completion, dependent release or new worker is implied.

## Owner clarification and proposed experiment — September 24, 2026

The owner clarified: refusal does not destroy coins; a recipient can return them as another transaction and may sign them before returning. The receiver of a returned coin may retain it, destroy it, or pass it onward. Record the settled interpretation: refusal alone has no automatic destruction or return effect; an elected return uses ordinary transfer, with optional signing. Passing the same appearance onward is recirculation, distinct from legitimate new issuance; no ledger, redemption duty or automatic settlement is added.

The owner also proposed an experiment involving signed returned coins, possible refusal reasons, lasting marks and requiring the returned coins to be used next so their information is exposed. These are proposals under discussion, not silently adopted baseline rules. Current v0.1 permits alteration/removal of marks, has no built-in free-text transaction note, does not automatically publish private transfers, allows free coin selection and unlimited new issuance, and forbids hidden-research intervention. Permanent marks, on-coin explanatory content, forced selection and automatic public exposure each require an explicit experimental specification or revised decision. A cryptographic signature alone does not supply a readable reason or prove that a refusal allegation is true.

Historical experiment ambiguity — resolved by the adopted free-choice decision above. The earlier question about forced next-use and bypasses is superseded. Hidden observation remains non-intervening; dependent acceptance requirements are unchanged.

## Bounded correction completed; remaining owner question isolated — 2026-09-21

The owner explicitly authorized completion of the easy JON-103 (private source reference withheld) corrections while reserving any genuinely new product/model decision. The existing JON-97 (private source reference withheld) specification on PR ptown16801-lang/concord#21 (private source reference withheld) was amended in place at commit `1864a0797ae8cee03a8ce7aaa336396ce182c772`.

Completed without new product decisions:

* scoped the information allowlist to this coin module's outputs;
* made ordinary-run researcher non-intervention explicit;
* permitted copying fabricated appearances without legitimizing them;
* separated actual destruction events from optional destruction claims;
* reclassified five implementation/instrumentation/interface/study-design items as downstream choices rather than owner-level model undecideds.

**Remaining possible owner decision:** the operational meaning of `refuse` after unsolicited issuance. JON-96 (private source reference withheld) allows a recipient to refuse but does not state whether refusal is only a communicated stance, automatically returns the coin, destroys it, or causes some other state effect. JON-97 (private source reference withheld) therefore continues to assign no implicit state transition to refusal until the owner decides otherwise.

The prior September 19 stop-work instruction remains in force for any work beyond this bounded correction. Do not restart downstream work merely from this update.

## Current next action — bounded correction

The five review findings below define the remaining work. No new owner/product decision is currently required. Continue on this same canonical issue/PR using an explicitly approved executor; do not create a replacement task.

After correction, return this issue to In Review for recheck. If a genuinely new ambiguity appears that requires a product decision, stop and surface only that decision.

## Review disposition — 2026-09-17

**Changes required; not accepted as complete.** The independent JON-103 (private source reference withheld) review in ptown16801-lang/concord#24 (private source reference withheld) returns **FAIL** against PR ptown16801-lang/concord#21 (private source reference withheld) head `652f3f7b13214bf7e651b0228f654621f568a641`. GitHub readback during this audit confirms that PR ptown16801-lang/concord#21 (private source reference withheld) still has that head and remains a draft.

Correct the existing specification rather than creating a replacement task: scope the information allowlist to this module's outputs; explicitly retain the frozen researcher non-intervention rule; permit copying fabricated appearances; separate actual destruction from optional destruction claims; and distinguish genuinely undecided model content from downstream representation/instrumentation/study-design choices. Record a recheck of these five findings before marking this specification Done. JON-103 (private source reference withheld) being Done means its review was delivered, not that this specification passed.

The four settled textual/model-conformance defects are corrected in the existing PR, and the fifth review finding has been resolved as a classification exercise except for the single refusal-semantics question above. JON-103 (private source reference withheld)'s historical FAIL remains the review record for the prior revision; a focused recheck should evaluate the corrected PR only after the remaining owner question is dispositioned or explicitly accepted as unresolved. No duplicate replacement task or duplicate review should be created.

Design-only. Produce the authoritative v0.1 formal specification from JON-96 (private source reference withheld) and audit it against the frozen interview decisions. Do not reopen settled questions, invent missing mechanics, add behavioral safeguards, or perform coding.

Exclusive scope: state model, agent-visible primitives, coin-visible state, private storage semantics, hidden-research boundary, signatures, fraud/defacing possibilities, and explicitly undecided items. Remove redundant/interview-drift assumptions.

Acceptance: one reviewable specification with (1) exact invariants, (2) agent-visible vs hidden-research separation, (3) contradiction/ambiguity list limited to genuine unresolved points, and (4) traceability back to JON-96 (private source reference withheld). Any assumption needed to complete the model must be explicitly labeled rather than silently adopted.
