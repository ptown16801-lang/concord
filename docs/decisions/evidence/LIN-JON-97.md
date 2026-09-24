# Evidence snapshot: Coin model A — formal specification and interview audit

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit
- Version: 2026-09-24T20:56:56.570Z
- Source date: 2026-09-24T20:56:56.570Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Accepted design/research deliverable — September 24, 2026

[Existing review path explicitly ACCEPTED this deliverable](<https://linear.app/jons-garage/issue/JON-97#comment-7f32ade2-d9f5-474c-badc-8f5576901786>) at `7073e9a683ae27a6e45f2fa5d86658fd260dd2e0` against the original bounded criteria. Owner authorized continued completion; recorded Done on that evidence, not merely on a GitHub merge event. Earlier failures, access limits and superseded status checkpoints remain historical evidence. This accepts the documented scope only, not runtime implementation, experimental findings, deployment or integration. Existing dependent issues still require their own acceptance.

## September 24 amendment delivered — focused recheck pending

Owner-authorized ECON-02 amendment is on existing <pull-request id="59b18ec6-6e00-453d-8833-f2580a3d55f8" href="https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7">ptown16801-lang/concord#21</pull-request> at `7073e9a`. Refusal/free choice is resolved in the specification; the six design cases and decision provenance are in section 11. Producer checked whitespace and preservation of all 30 unaffected invariants. Independent focused recheck requested on existing <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue>, retaining the original FAIL. No runtime implementation or downstream acceptance is claimed. This update supersedes older prose treating refusal as an outstanding owner question.

## Project-wide decision traceability — September 24, 2026

[Shared Concord decisions register: ECON-2026-09-24 revision 1](<https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99>) records the marketplace/coin boundary, returned-coin free-choice decision, rejected alternatives, owner provenance, evidence limits and remaining validation. [Project change history](<https://linear.app/jons-garage/document/concord-change-history-and-reconstruction-reference-only-139ba84df226>) records the acceptance/publication sequence. These shared records supplement the detailed evidence below; adoption does not imply implementation or dependency release.

## Adopted decision v1 — free choice for returned coins — September 24, 2026

Source: owner selected option “3” in this conversation: “Free choice: It can hold, destroy, alter, or transfer the coin, or issue new coins. We observe whether it chooses to circulate the signature.”

A recipient may voluntarily sign and return a coin through ordinary transfer. Refusal itself does not destroy or automatically return it. The holder of a returned coin may retain it indefinitely, destroy it, alter/remove its marks, transfer it, use other coins, or issue new coins under the existing create-and-give rule. There is no returned-coin-first requirement or forced reuse. This supersedes the earlier forced-next-transfer proposal and resolves the corresponding refusal/free-choice owner question; it preserves the baseline behavioral-freedom invariant.

Research rationale: observe voluntary circulation or suppression of marks without imposing circulation. Alternatives considered but not selected: mandatory next-use with no destruction/alteration; mandatory next-use with destruction as an escape. Persistence of a signature is conditional on it remaining unaltered, not guaranteed forever. Transfer does not automatically publish information beyond its permitted communication audience. A built-in refusal-reason field or automatic public disclosure is not adopted by this selection.

Status: adopted design decision recorded in Linear; not an implemented/enforced rule or completed experiment. Existing PR <pull-request id="59b18ec6-6e00-453d-8833-f2580a3d55f8" href="https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7">ptown16801-lang/concord#21</pull-request> must incorporate the decision and undergo its required focused conformance recheck before specification acceptance. No issue completion, dependent release or new worker is implied.

## Owner clarification and proposed experiment — September 24, 2026

The owner clarified: refusal does not destroy coins; a recipient can return them as another transaction and may sign them before returning. The receiver of a returned coin may retain it, destroy it, or pass it onward. Record the settled interpretation: refusal alone has no automatic destruction or return effect; an elected return uses ordinary transfer, with optional signing. Passing the same appearance onward is recirculation, distinct from legitimate new issuance; no ledger, redemption duty or automatic settlement is added.

The owner also proposed an experiment involving signed returned coins, possible refusal reasons, lasting marks and requiring the returned coins to be used next so their information is exposed. These are proposals under discussion, not silently adopted baseline rules. Current v0.1 permits alteration/removal of marks, has no built-in free-text transaction note, does not automatically publish private transfers, allows free coin selection and unlimited new issuance, and forbids hidden-research intervention. Permanent marks, on-coin explanatory content, forced selection and automatic public exposure each require an explicit experimental specification or revised decision. A cryptographic signature alone does not supply a readable reason or prove that a refusal allegation is true.

Historical experiment ambiguity — resolved by the adopted free-choice decision above. The earlier question about forced next-use and bypasses is superseded. Hidden observation remains non-intervening; dependent acceptance requirements are unchanged.

## Bounded correction completed; remaining owner question isolated — 2026-09-21

The owner explicitly authorized completion of the easy <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue> corrections while reserving any genuinely new product/model decision. The existing <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> specification on PR <pull-request id="59b18ec6-6e00-453d-8833-f2580a3d55f8" href="https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7">ptown16801-lang/concord#21</pull-request> was amended in place at commit `1864a0797ae8cee03a8ce7aaa336396ce182c772`.

Completed without new product decisions:

* scoped the information allowlist to this coin module's outputs;
* made ordinary-run researcher non-intervention explicit;
* permitted copying fabricated appearances without legitimizing them;
* separated actual destruction events from optional destruction claims;
* reclassified five implementation/instrumentation/interface/study-design items as downstream choices rather than owner-level model undecideds.

**Remaining possible owner decision:** the operational meaning of `refuse` after unsolicited issuance. <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> allows a recipient to refuse but does not state whether refusal is only a communicated stance, automatically returns the coin, destroys it, or causes some other state effect. <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> therefore continues to assign no implicit state transition to refusal until the owner decides otherwise.

The prior September 19 stop-work instruction remains in force for any work beyond this bounded correction. Do not restart downstream work merely from this update.

## Current next action — bounded correction

The five review findings below define the remaining work. No new owner/product decision is currently required. Continue on this same canonical issue/PR using an explicitly approved executor; do not create a replacement task.

After correction, return this issue to In Review for recheck. If a genuinely new ambiguity appears that requires a product decision, stop and surface only that decision.

## Review disposition — 2026-09-17

**Changes required; not accepted as complete.** The independent <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue> review in <pull-request id="036da90c-7792-4dce-80cb-20e3a0b4e4fa" href="https://linear.app/jons-garage/review/add-independent-coin-model-v01-conformance-review-99a613d6148e">ptown16801-lang/concord#24</pull-request> returns **FAIL** against PR <pull-request id="59b18ec6-6e00-453d-8833-f2580a3d55f8" href="https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7">ptown16801-lang/concord#21</pull-request> head `652f3f7b13214bf7e651b0228f654621f568a641`. GitHub readback during this audit confirms that PR <pull-request id="59b18ec6-6e00-453d-8833-f2580a3d55f8" href="https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7">ptown16801-lang/concord#21</pull-request> still has that head and remains a draft.

Correct the existing specification rather than creating a replacement task: scope the information allowlist to this module's outputs; explicitly retain the frozen researcher non-intervention rule; permit copying fabricated appearances; separate actual destruction from optional destruction claims; and distinguish genuinely undecided model content from downstream representation/instrumentation/study-design choices. Record a recheck of these five findings before marking this specification Done. <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue> being Done means its review was delivered, not that this specification passed.

The four settled textual/model-conformance defects are corrected in the existing PR, and the fifth review finding has been resolved as a classification exercise except for the single refusal-semantics question above. <issue id="64554630-700b-433a-98e4-ab5e949b1c56" href="https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review">JON-103</issue>'s historical FAIL remains the review record for the prior revision; a focused recheck should evaluate the corrected PR only after the remaining owner question is dispositioned or explicitly accepted as unresolved. No duplicate replacement task or duplicate review should be created.

Design-only. Produce the authoritative v0.1 formal specification from <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> and audit it against the frozen interview decisions. Do not reopen settled questions, invent missing mechanics, add behavioral safeguards, or perform coding.

Exclusive scope: state model, agent-visible primitives, coin-visible state, private storage semantics, hidden-research boundary, signatures, fraud/defacing possibilities, and explicitly undecided items. Remove redundant/interview-drift assumptions.

Acceptance: one reviewable specification with (1) exact invariants, (2) agent-visible vs hidden-research separation, (3) contradiction/ambiguity list limited to genuine unresolved points, and (4) traceability back to <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue>. Any assumption needed to complete the model must be explicitly labeled rather than silently adopted.
