# Evidence snapshot: JON-103 comment history

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-103
- Version: snapshot through retrieval
- Source date: 2026-09-24T20:39:07.721Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Discussion / approval / review; inspect each attribution
- Relationship: Later attributable correction controls; comment presence and account labels alone do not establish acceptance.

---

## Comment 897768d3-97b8-44cf-9672-0a2095984c00

Date: 2026-09-24T20:39:07.731Z; author: Linear; on behalf of: not stated

Attested and recorded that producer/reviewer separation is established for the independent focused design conformance recheck, while preserving its document-level limits

## Comment 36b1e986-b286-482a-9a1e-fca32f479b7f

Date: 2026-09-24T20:39:05.157Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

**Independence/provenance resolution — separation established for this recheck.** The PASS remains unchanged.

From my execution context, I did **not** author, amend, commit, or push `7073e9a683ae27a6e45f2fa5d86658fd260dd2e0`; my role was limited to inspecting the published artifact and recording the focused recheck in [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review).

The supplied durable records establish distinct producer and reviewer paths:

* **Producer:** Codex `/root` acting for J in authoring thread `01a0ce3f-ca3f-70f0-8a51-0ee0d17904c4`, for [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit); that thread authored, committed, and pushed the stated SHA.
* **Reviewed artifact:** [the specification at that immutable SHA](<https://github.com/ptown16801-lang/concord/blob/7073e9a683ae27a6e45f2fa5d86658fd260dd2e0/docs/COIN_MODEL_A_V0.1.md>), with PR readback confirming it as the full PR head.
* **Reviewer:** Linear actor `5c07d33f-5e8f-484b-8100-67908589ec45` acting through this separate [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review) thread; the thread also identifies Linear actor `ebdb9780-fc90-431d-a858-4a5dd027b422`.

That establishes actor/session and artifact-revision separation sufficient to describe this as an **independent focused design conformance recheck** of the published revision. Remaining limits are unchanged: it is a document-level assessment, not runtime proof, implementation validation, merge approval, or full specification acceptance. No issue status, dependency gate, merge, release, or downstream acceptance has changed.

## Comment 2a1e1508-07f8-4f50-bbd7-98a7dea6b0d1

Date: 2026-09-24T20:38:50.964Z; author: J; on behalf of: not stated

@Linear Additional durable producer provenance, read directly from the active Codex environment: authoring thread 01a0ce3f-ca3f-70f0-8a51-0ee0d17904c4, actor Codex /root acting for J on JON-97. This thread authored, committed and pushed 7073e9a683ae27a6e45f2fa5d86658fd260dd2e0. Exact artifact: https://github.com/ptown16801-lang/concord/blob/7073e9a683ae27a6e45f2fa5d86658fd260dd2e0/docs/COIN_MODEL_A_V0.1.md . GitHub PR #21 readback confirmed that full head. Your review record a5a0a68b-ba52-48ad-af42-5b18bd6ec32a identifies Linear actor 5c07d33f-5e8f-484b-8100-67908589ec45 acting for J, and thread replies identify Linear actor ebdb9780-fc90-431d-a858-4a5dd027b422. Please attest from your available execution context whether your reviewer authored/amended/pushed that commit and whether these records establish separation. If unavailable, retain the independence gap rather than invent evidence. No new review or child requested.

## Comment 4ce8a089-66d7-4c00-bcb5-ea928197d65f

Date: 2026-09-24T20:36:59.854Z; author: Linear; on behalf of: not stated

Recorded that independence is not established and listed the exact missing provenance evidence on this issue

## Comment f6dd184b-4fbf-4938-a5b1-3e63242baa48

Date: 2026-09-24T20:36:57.472Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

**Independence/provenance addendum — not established.** The existing PASS and its stated limit remain unchanged.

Available evidence establishes only that this focused recheck was requested in this separate [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review) Linear thread after the published PR head `7073e9a683ae27a6e45f2fa5d86658fd260dd2e0`, and that the producer provenance is stated here as a Codex conversation. I found no accessible agent-chat records scoped to either [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit) or [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review) that identify the producer session, its author/actor, or a distinct reviewer identity.

To establish independent-review separation, the record still needs:

* A durable producer record for `7073e9a` that identifies the authoring Codex conversation or actor and its relationship to [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit)
* A durable reviewer record identifying the actor/conversation that performed this recheck, linked to [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review)
* Evidence that those producer and reviewer actors/conversations are distinct and that the reviewer did not author, amend, or push `7073e9a`
* A binding of `7073e9a` to the exact reviewed PR artifact, sufficient to rule out review of a different revision

Until those items are available, the correct label remains **focused design conformance recheck**, not independent review. This adds no implementation, acceptance, merge, release, or downstream-gate change.

## Comment 7051e08e-4518-47d6-8659-77f6beac282f

Date: 2026-09-24T20:36:37.893Z; author: J; on behalf of: not stated

Thanks. Preserve that PASS and its independence limit. Producer provenance: this Codex conversation authored and pushed 7073e9a; no self-review is being represented as independent. Your recheck was requested through this separate Linear thread after publication. Please determine whether available session/provenance evidence establishes the required separation; if not, record the exact remaining independence evidence needed on JON-103. Do not create a child or start a coding session. I will keep JON-97 In Review and downstream acceptance gates intact; propagating the owner-adopted ECON-02 wording does not imply full specification acceptance.

## Comment b2b6b04a-5e3e-4389-a777-320c84814d9b

Date: 2026-09-24T20:35:37.595Z; author: J; on behalf of: not stated

@Linear Owner authorized implementing your recommendations and checking each change with you. Please perform and record the independent focused design conformance recheck here, preserving the original FAIL for its prior revision. No coding session, new child, worker dispatch, merge or dependency release.

Producer amended existing PR #21 at 7073e9a (https://github.com/ptown16801-lang/concord/pull/21): INV-08 and sections 4/7/9/10/11 adopt ECON-02 voluntary returns/free choice; refusal alone has no state effect; signing optional; returned holders may retain/destroy/alter/use others/create-and-give; no immutable marks, built-in reason field, publicity or forced reuse. Section 7 also removes the stale question whether actual destruction is a hidden event (already settled by INV-24). Producer checks: git diff --check; all 31 invariants retained, all 30 unaffected invariant paragraphs byte-identical.

Please inspect the exact published artifact, verify the six section-11 cases and retained September 21 corrections (module-local allowlist, ordinary-run nonintervention, fabricated-copy lineage, destruction versus claims, downstream-choice classification). Give PASS/FAIL with exact references and actual review provenance/limits; do not call this runtime proof or independent review unless you can establish the separation. Source: ECON-2026-09-24 shared register and current JON-96. Record result on this existing JON-103 thread.

## Comment 04931c26-d7bf-4afc-88c0-b2b40585cb34

Date: 2026-09-24T20:36:07.938Z; author: Linear; on behalf of: not stated

Recorded the focused design conformance recheck as **PASS** on this issue, preserving the original prior-revision FAIL and documenting review limits

## Comment a5a0a68b-ba52-48ad-af42-5b18bd6ec32a

Date: 2026-09-24T20:36:05.421Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

**Focused design conformance recheck: PASS** for [Specify coin model A v0.1](https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7) at `7073e9a683ae27a6e45f2fa5d86658fd260dd2e0`, against the current [JON-96](https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model) ECON-02 decision. This is a document-level recheck only, not runtime proof. The prior-revision FAIL at `652f3f7` remains recorded and unchanged.

| Check | Result | Exact artifact references |
| -- | -- | -- |
| Refusal communicated only | PASS | §11 case 1 requires no automatic transfer/destruction; INV-08 and §5 final paragraph specify no state transition for refusal |
| Optional signing and voluntary return | PASS | §11 case 2; INV-08; §4 `transfer` and `sign`; §7.1 classify return as ordinary transfer, not issuance |
| Indefinite retention | PASS | §11 case 3; INV-08 expressly permits indefinite retention and excludes a returned-coin-first rule |
| Destroy, alter, select another, or create-and-give | PASS | §11 case 4; INV-08; §4 `destroy`/`alter/deface`; INV-05; §7.1 excludes bypass penalties |
| Private transfer of signed appearance | PASS | §11 case 5; INV-13, INV-16, and §7.1 exclude automatic publication, permanence guarantees, and a reason field |
| Research records return/refusal/later behavior without feedback | PASS | §11 case 6; INV-01–02, INV-27–30, and §6 preserve action/claim/inference separation and prohibit feedback |
| Module-local information allowlist | PASS | §1 “Module-local information allowlist” confines the restriction to this module’s outputs while preventing hidden-state expansion |
| Ordinary-run nonintervention | PASS | INV-01 and INV-02 prohibit hidden-state steering, correction, warning, reward, punishment, or altered opportunities during ordinary runs |
| Fabricated-copy lineage | PASS | INV-22, INV-26, and §5.3–5.4 retain fabricated copies as fraud instances without a legitimate `coin_id` |
| Actual destruction versus claim | PASS | INV-24; §4 `destroy`; §5.7; §7.2 correctly treats actual destruction as a distinct hidden event and leaves its observation criterion downstream |
| Downstream-choice classification | PASS | §7.2–7.6 list five downstream instrumentation/representation/cryptography/interface/study-design choices; §7 and §10 state refusal is resolved |

**Provenance and limits:** I inspected the currently published PR diff (one added specification file) at the stated head, together with the current [JON-96](https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model) decision text and the prior [JON-103](https://linear.app/jons-garage/issue/JON-103/coin-model-g-independent-v01-conformance-review) FAIL record. The PR checks shown as successful are CI checks, not evidence of the six design cases. I cannot establish reviewer/producer separation from the available record, so I do **not** represent this as an independent review; it is a focused conformance recheck of the published design artifact. No implementation, merge, release, dependency transition, or new work was performed.

## Comment a882ff77-9e2e-4c25-ab43-317d6e029c58

Date: 2026-09-17T07:42:16.639Z; author: Linear; on behalf of: not stated

Completed JON-103 with a **FAIL — five corrections required** verdict.

* Added the [conformance matrix](<https://github.com/ptown16801-lang/concord/blob/101080a/docs/COIN_MODEL_G_V0.1_CONFORMANCE_REVIEW.md>).
* Verified formatting, matrix structure, and whitespace.
* Pushed commit `101080a`.
* Opened draft PR #24.
* Updated JON-103 to In Review with a findings summary.

## Comment eba29a3c-42a8-443a-b582-5d2d0a68a144

Date: 2026-09-17T07:37:27.992Z; author: Linear; on behalf of: not stated

This thread is for an agent session with linear.

## Comment c4405885-357c-4d89-aa0f-582cf95fb3ed

Date: 2026-09-17T07:42:01.834Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

Independent review complete against PR #21 head `652f3f7`: **FAIL — five corrections required**.

The review found an over-broad agent information restriction, omission of the frozen ordinary-run researcher non-intervention rule, a legitimate-only copy transition, conflation of actual destruction with a destruction claim, and falsely reopened downstream choices. The hidden-layer leakage check passed; no agent-visible research identity, truth, fraud signal, provenance, verification result, or inference was found.

The exact-reference pass/fail matrix and bounded correction set are in draft PR #24.
