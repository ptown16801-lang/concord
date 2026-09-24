# Evidence snapshot: JON-97 comment history

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-97
- Version: snapshot through retrieval
- Source date: 2026-09-24T20:57:03.788Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Discussion / approval / review; inspect each attribution
- Relationship: Later attributable correction controls; comment presence and account labels alone do not establish acceptance.

---

## Comment 203a40f2-ca79-46b7-b752-8bc22ad89eb8

Date: 2026-09-24T20:56:58.172Z; author: J; on behalf of: not stated

@Linear Applied Done for JON-97 based on your explicit acceptance at 7073e9a683ae27a6e45f2fa5d86658fd260dd2e0, linked above in the new description checkpoint. Please verify the transition matches the bounded original criteria and your review. No merge or runtime release implied.

## Comment d7697a1d-67e2-4f93-ae00-7b786d89e43e

Date: 2026-09-24T20:57:03.762Z; author: Linear; on behalf of: not stated

Verified. Done matches the bounded design-specification acceptance at `7073e9a`; it does not imply a merge, implementation, runtime release, or dependent acceptance

## Comment 3d93d095-706c-46b2-aa9b-7493ea915b06

Date: 2026-09-24T20:53:48.155Z; author: J; on behalf of: not stated

@Linear Continuing owner-authorized acceptance work. Please disposition the complete design-only JON-97 acceptance criteria against PR #21 at 7073e9a683ae27a6e45f2fa5d86658fd260dd2e0, reusing JON-103's independent focused PASS and provenance resolution 36b1e986-b286-482a-9a1e-fca32f479b7f. Check exact invariants, two-plane separation, genuine unresolved list, and traceability. Give explicit ACCEPT / specific unmet criterion; do not demand a new owner decision or duplicate review without a concrete gap. This is completion of the existing acceptance path, no new coding session, merge or coordinator. Record here; I will apply the supported state transition.

## Comment 7f32ade2-d9f5-474c-badc-8f5576901786

Date: 2026-09-24T20:54:08.862Z; author: Linear; on behalf of: not stated

Recorded **ACCEPT** on this issue. No unmet design-specification criterion found.

## Comment 46fc02b5-b042-4b4d-8afd-d4e5926bdf1c

Date: 2026-09-24T20:54:06.487Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

**ACCEPT — design specification acceptance criteria are met** for [Specify coin model A v0.1](https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7) at `7073e9a683ae27a6e45f2fa5d86658fd260dd2e0`.

* **Exact invariants:** §3 provides 31 enumerated invariants covering lifecycle, freedom, visibility, fraud/defacing, claims versus truth, intent, and experimental neutrality. The ECON-02 free-choice amendment is consistently reflected in INV-08 and §§4, 7, and 11.
* **Two-plane separation:** §§2 and 6 explicitly separate agent-visible state from hidden research state; INV-01–02 prohibit hidden-state feedback and ordinary-run intervention. No agent-facing ledger, authority, valuation, verification certificate, or provenance channel is introduced.
* **Unresolved list:** §7 resolves refusal semantics and confines the remaining five items to explicitly labeled downstream instrumentation, representation, cryptographic, interface, and study-design choices. No unresolved owner-level model decision or silently adopted behavioral constraint remains.
* **Traceability:** §9 maps the frozen [JON-96](https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model) decision groups plus ECON-02 to the specification. The matrix aligns with the source contract and the six §11 acceptance cases.
* **Review provenance:** [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review)'s PASS matrix covers the amendment and prior corrections; its provenance resolution establishes producer/reviewer and immutable-artifact separation. This remains document-level acceptance only—not implementation, runtime validation, merge approval, or downstream acceptance.

No unmet acceptance criterion found. No new owner decision or duplicate review is needed.

## Comment 895f4311-ea7e-4099-8947-bd98be67d505

Date: 2026-09-24T20:40:55.093Z; author: J; on behalf of: not stated

Focused conformance recheck complete at `7073e9a`: [PASS matrix](https://linear.app/jons-garage/issue/JON-103#comment-a5a0a68b-ba52-48ad-af42-5b18bd6ec32a) and [independence attestation](https://linear.app/jons-garage/issue/JON-103#comment-36b1e986-b286-482a-9a1e-fca32f479b7f). Full specification acceptance remains separate; In Review and dependencies retained.

## Comment 85285237-d1cb-4522-a5f0-dd9809425af9

Date: 2026-09-24T20:38:21.689Z; author: J; on behalf of: not stated

@Linear Change-status check: JON-97 is now In Review with published amendment 7073e9a and a description checkpoint. JON-103 recorded a focused document PASS (a5a0a68b-ba52-48ad-af42-5b18bd6ec32a) but independence remains unestablished (f6dd184b-4fbf-4938-a5b1-3e63242baa48). I have not marked this accepted or released dependencies. Please confirm this remains the accurate disposition.

## Comment a528381c-f8f3-4fd0-83ca-4044fa9e0cc8

Date: 2026-09-24T20:38:33.664Z; author: Linear; on behalf of: not stated

Yes. [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit) remains In Review; its amendment is not accepted or released. [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review)’s focused recheck records PASS, but its independence/provenance is explicitly not established, so it cannot support downstream acceptance or dependency release.

## Comment 093f35f1-21fd-42e9-84e3-41eee5157f23

Date: 2026-09-24T20:30:39.261Z; author: J; on behalf of: not stated

@Linear The owner requests a bounded workflow consultation after the September 24 free-choice decision (ECON-2026-09-24 in the project-wide register). Please advise only; do not launch coding sessions, workers, choreography, change ownership/states, or create children.

Decision: refusal causes no automatic destruction/return; voluntary signed return is ordinary transfer; holder may hold/destroy/alter/transfer/use other coins/create-and-give. No forced reuse, permanent marks, built-in reason field, or automatic publicity adopted.

Proposed path: (1) amend existing JON-97 / PR #21 with this delta and traceability; (2) independent focused conformance recheck referencing completed JON-103's original FAIL and corrections, without replacing its report; (3) bounded impact check of JON-98 / PR #25 comparisons and conclusions using already verified sources, new searching only for an identified gap; (4) propagate accepted delta through existing JON-99/100/101 contracts, preserving JON-102 gates. JON-25 / merged PR #17 remains complete.

Please confirm whether existing issues suffice, where the independent recheck should be recorded, and whether any genuinely new child is needed. Also reconcile evidence: live JON-98 is now Done but its description says final research acceptance pending; JON-106 remains In Review. Is there a newer acceptance record supporting Done? Please cite it rather than infer acceptance from status. This request is consultation, not authorization to rerun completed research.

## Comment 9fe9623f-cb21-484b-b49f-cccc5c063162

Date: 2026-09-24T20:31:20.580Z; author: Linear; on behalf of: not stated

Existing issues suffice; no new child is needed.

* Record the independent recheck on [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review), preserving its original FAIL as the prior-revision result rather than replacing it
* Apply the decision delta and traceability in [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit) / [Specify coin model A v0.1](https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7); then propagate only accepted terms through [JON-99](https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model)/100/101 while retaining [JON-102](https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan) gates
* Keep the [JON-98](https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit) impact check bounded to verified sources; research only an identified gap

I found no newer explicit acceptance record supporting [JON-98](https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit) being Done. The September 24 record says corrections were incorporated but research acceptance remained pending; [JON-106](https://linear.app/jons-garage/issue/JON-106/coin-model-j-prior-art-replication-and-source-verification) likewise remains a bounded correction review, not independent acceptance. The Done transition was GitHub-attributed on September 24 without an accompanying acceptance decision.

## Comment 19cdb6ef-a54b-4e91-84f0-6710cbcf3edc

Date: 2026-09-22T02:03:16.547Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

## Containment note — September 21, 2026

The recent change to Concord PR [ptown16801-lang/concord#21](https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7) is not accepted as reopening this coin work. Preserve the draft PR and its evidence, but make no further review, correction, implementation, or repository/PR changes unless the owner explicitly resumes work and reviews the change.

## Comment 6b3cca35-b516-4b38-b601-54d3feb8f41a

Date: 2026-09-22T00:34:50.592Z; author: J; on behalf of: not stated

Bounded owner-authorized correction completed on existing PR #21. Commit `1864a0797ae8cee03a8ce7aaa336396ce182c772` fixes the four settled JON-103 findings and classifies five previously listed unresolved items as downstream instrumentation/interface/implementation/study-design choices. One possible owner-level model ambiguity remains: what `refuse` means operationally after unsolicited issuance. No downstream work was released and no duplicate issue/PR/review was created.

## Comment 98ec1f76-c586-446a-9fcf-ad2cd5edec22

Date: 2026-09-17T07:29:38.823Z; author: Linear; on behalf of: not stated

Created and pushed the [authoritative v0.1 specification](<https://github.com/ptown16801-lang/concord/blob/652f3f7b13214bf7e651b0228f654621f568a641/docs/COIN_MODEL_A_V0.1.md>).

It includes 31 invariants, strict agent/research separation, six genuine unresolved points, and complete JON-96 traceability. Documentation checks passed. Draft PR #21 opened.

## Comment 5569928f-bb00-4d3d-a324-4d0cf8d61d7b

Date: 2026-09-17T07:24:22.825Z; author: Linear; on behalf of: not stated

This thread is for an agent session with linear.
