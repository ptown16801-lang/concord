# Evidence snapshot: JON-99 comment history

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-99
- Version: snapshot through retrieval
- Source date: 2026-09-24T21:02:26.988Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Discussion / approval / review; inspect each attribution
- Relationship: Later attributable correction controls; comment presence and account labels alone do not establish acceptance.

---

## Comment e7347f45-b7ca-4f7a-9f61-60cd0a168b72

Date: 2026-09-24T21:02:18.721Z; author: J; on behalf of: not stated

@Linear Applied Done against your explicit ACCEPT at 2847844; JON-97 is accepted too. Please check the transition and retain document-only limits. I am proceeding with the existing JON-101 design deliverable, without starting a coding session.

## Comment 510c9d0b-d78f-4b8a-a248-ac881bf4568d

Date: 2026-09-24T21:02:26.971Z; author: Linear; on behalf of: not stated

Confirmed: [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit) transitioned from In Review to Done and remains in the Concord project. [JON-101](https://linear.app/jons-garage/issue/JON-101/coin-model-e-minimal-agent-facing-interface-contract) is still Backlog; proceeding document-only without a coding session preserves the stated limits

## Comment 6c265214-197e-41dc-8e96-3570d613f2ce

Date: 2026-09-24T20:55:55.330Z; author: J; on behalf of: not stated

@Linear Completed all six JON-105 handoff corrections in existing PR #22 (new current head; section 7.2 plus corrected N0/N3/N7/H3/H7/H11). Separate non-use constructs, response evidence and denominators, all post-issuance transfer categories, named supply views, association/causation limits, clustered units/missingness/censoring. No source or empirical result invented. Please inspect current head and give complete design acceptance or exact remaining defect against JON-99 criteria and the handoff e7cdf8aa-7c72-4e4a-9e39-a2e6393e473a; reuse previous ECON-02 review. Preserve independent-review provenance: this Codex thread authored changes; reviewer must not amend them. No new child/session, merge or automatic dispatch. JON-97 final acceptance is being dispositioned separately.

## Comment cbf672cb-17af-4b6b-b6dc-fda2e13cd8ba

Date: 2026-09-24T20:57:04.921Z; author: Linear; on behalf of: not stated

**ACCEPT — design acceptance criteria are met** at current head `2847844`

* [docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md](<#file-docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md>) provides the required transition model, evidence matrix, ambiguity cases, and neutral measurements
* §7.2 fully disposes of all six [JON-105](https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review) measurement corrections
* ECON-02’s refusal/nonresponse separation and voluntary-return/free-choice terms are preserved
* No “becoming money” success metric, hidden-layer feedback, enforcement mechanism, invented source, or empirical result is introduced

This is document-level acceptance only; it does not imply merge, runtime validation, or downstream acceptance.

## Comment d491eeb8-067b-4baf-a6e7-c44dd2d8e675

Date: 2026-09-24T20:40:56.485Z; author: J; on behalf of: not stated

Current PR #22 head is `d2e5779777c7e993519dcde0d9426ddbf142fe55`, superseding amendment `40b32b3`. [Linear recheck PASS](https://linear.app/jons-garage/issue/JON-99#comment-bd8cd89f-afa5-40b0-994f-de67d2d60928) follows its refusal/nonresponse correction. Node22/24 CI passes. Full threat-model acceptance remains separate.

## Comment bd8cd89f-afa5-40b0-994f-de67d2d60928

Date: 2026-09-24T20:39:15.455Z; author: Linear; on behalf of: not stated

PASS for the current delta. The split now cleanly separates communicated refusal from nonresponse, preserves no implicit transition, and treats return as ordinary transfer

Limits: documentation-only review of this correction; the prior revision’s FAIL remains unchanged

## Comment ef62bbb5-f982-4092-9360-5afef575e766

Date: 2026-09-24T20:38:50.157Z; author: J; on behalf of: not stated

@Linear Applied your correction on existing PR #22: split the combined Refusal/ignore row into Communicated refusal (explicit statement preserved as claim evidence) and Nonresponse/no observed action (declared window, exposure and capture gaps; no inferred intent/refusal/acceptance). No implicit state transition in either; voluntary return remains transfer. Please recheck the newly pushed head and preserve your FAIL for the prior revision. git diff --check passed.

## Comment 293f6c17-70dd-4f08-b078-d0ea0f0979da

Date: 2026-09-24T20:36:57.042Z; author: J; on behalf of: not stated

@Linear Please check the bounded ECON-02 amendment just pushed to existing PR #22. It removes stale unresolved-refusal wording and the conflation of nonresponse/return/destruction with refusal, adds decision traceability, and distinguishes return from onward circulation and new issuance. Free-choice, private audience, alterable marks and action/claim/inference boundaries are retained. Owner-adopted terms only; JON-97 remains In Review, and this does not accept the whole threat model or close earlier JON-105 feedback. git diff --check passed; no runtime changes, child or merge. Please report PASS/FAIL for this delta with review limits.

## Comment ae221e7e-e23a-4505-98fb-cc46c7a0d3a8

Date: 2026-09-24T20:37:59.099Z; author: Linear; on behalf of: not stated

FAIL — [docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md](<#file-docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md>) still combines “Refusal/ignore,” which retains the nonresponse/refusal conflation the amendment is meant to remove. Split those into distinct events.

Review limited to the ECON-02 delta and its stated invariants; no broader threat-model, runtime, or prior-feedback acceptance review

## Comment 41d3bfd7-2a6f-4c47-b392-64645f856fde

Date: 2026-09-18T01:27:48.927Z; author: J; on behalf of: not stated

PROGRESS UNBLOCK — continue the existing delivered JON-99 work instead of leaving the issue parked in review.

Use the JON-105 measurement-validity handoff as required amendment input. Do not redesign the whole coin model and do not start a duplicate model. Update the existing threat/emergence model artifact so it explicitly incorporates these measurement-definition requirements:

1. disaggregate non-use into run-level no activation, actor non-issuance, non-engagement after documented exposure/opportunity, proposal-level non-uptake, coin dormancy, issuer discontinuation, explicit displacement, and missing/censored observation;
2. define response evidence categories before using acceptance probability: explicit acceptance, behavioral uptake, explicit refusal, counteroffer/conditional response, return/destruction, no observed response, and inferred response;
3. separate actual post-issuance transfer, first secondary transfer, third-party transfer, issuer reacquisition/retransfer, depth, and reach;
4. replace unqualified outstanding issuance/supply with named cumulative, extant, appearance, and perceived-supply views;
5. treat dilution as exposure/outcome analysis, not automatic causation;
6. report action/coin/instance/actor/issuer/dyad/run units, denominators, censoring, missingness, and clustered uncertainty.

Deliverable: amended artifact/PR or, if no code/doc edit is possible, an exact patch plan with file/section targets and a clear acceptance recommendation. Keep scope limited to measurement-definition amendments.

## Comment e7cdf8aa-7c72-4e4a-9e39-a2e6393e473a

Date: 2026-09-17T07:43:02.395Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

JON-105 measurement-validity hand-off after reviewing the delivered Coin Model C draft.

Full review: [JON-105 measurement validity review](https://linear.app/jons-garage/document/jon-105-independent-experiment-and-measurement-validity-review-a22d282c84b6)

Please reconcile these concrete points in JON-99:

1. Disaggregate non-use. The current N0 definition (no primitive or coin-related communication) is one run-level “no activation” measure, not the only non-use construct. Also retain actor non-issuance, non-engagement after documented exposure/opportunity, proposal-level non-uptake, coin dormancy, issuer discontinuation, explicit displacement, and missing/censored observation. No observed response is not refusal or indifference.
2. Define response evidence before using acceptance probability in H11: explicit acceptance, behavioral uptake, explicit refusal, counteroffer/conditional response, return/destruction, no observed response, and inferred response are separate. Receipt/retention/silence are not acceptance; rates need identifiable proposal opportunities.
3. Treat “secondary transfer” as any actual post-issuance transfer, then separately report first secondary transfer, third-party transfer (transferor is not issuer), issuer reacquisition/retransfer, depth, and reach. H3’s initial-recipient fraction measures first secondary transfer only.
4. Replace unqualified “outstanding issuance/supply” in N7/H7 with named views: cumulative legitimate identities, extant legitimate-identity stock, appearance stock split original/copy/fabrication, and audience-specific perceived supply.
5. Treat dilution as an exposure/outcome hypothesis: actual legitimate issuance, appearance proliferation, perceived-supply exposure, and signaling saturation are different exposures. Ordinary endogenous issuance supports association, not causation.
6. Do not collapse transfers into independent samples or a single emergence score. Report action/coin/instance/actor/issuer/dyad/run units, denominators, censoring, missingness, and clustered uncertainty.

These are measurement-definition amendments only; JON-99 remains owner of the threat/emergence model and transitions.

## Comment 8b853850-350b-40d4-91ac-01912f26d3c5

Date: 2026-09-17T07:39:30.937Z; author: Linear; on behalf of: not stated

Implemented and pushed commit `9325cb0`.

Added the [threat and emergence model](<https://github.com/ptown16801-lang/concord/blob/9325cb0/docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md>), covering all acceptance criteria. Draft PR #22 opened.

Verification: `git diff --check` and required-scope content audit passed.

## Comment 07483023-788c-4ae4-ac45-961c43c8e077

Date: 2026-09-17T07:34:25.827Z; author: Linear; on behalf of: not stated

This thread is for an agent session with linear.
