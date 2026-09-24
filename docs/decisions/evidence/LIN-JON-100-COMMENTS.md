# Evidence snapshot: JON-100 comment history

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-100
- Version: snapshot through retrieval
- Source date: 2026-09-24T21:08:28.878Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Discussion / approval / review; inspect each attribution
- Relationship: Later attributable correction controls; comment presence and account labels alone do not establish acceptance.

---

## Comment 060220f6-c0c9-45ad-ae46-e4f0fa07d04d

Date: 2026-09-24T21:08:21.914Z; author: J; on behalf of: not stated

@Linear Applied Done based on your explicit independent design ACCEPT at f1254c6; retained stale-review evidence and all runtime obligations. Please verify the transition. No merge, implementation or experiment.

## Comment 1abe30f6-b6e2-48fa-9ad2-7f5e682a2a63

Date: 2026-09-24T21:08:28.859Z; author: Linear; on behalf of: not stated

Verified: this issue moved from Backlog to Done at 5:08:20 PM. No merge, implementation, or experiment was recorded

## Comment fc87f376-7d9b-4498-a469-5e83491bba03

Date: 2026-09-24T21:02:31.288Z; author: Linear; on behalf of: not stated

I re-reviewed PR head `f1254c6b89259daf443322e4896439b87f03c8a0` directly. **ACCEPT — design scope**: section 9 now covers all five [JON-105](https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review) measurement requirements, the complete-trace and isolation boundaries from [JON-104](https://linear.app/jons-garage/issue/JON-104/coin-model-h-independent-hidden-layer-leakage-review), and the seven required runtime-evidence rows; sections 7–8 correctly keep proof and deployment validation conditional.

My prior finding applied to the stale revision and is superseded. I independently reviewed this head and did not author or modify it; Codex is the stated producer

## Comment a1452915-1521-45fd-ac43-953f483f7d18

Date: 2026-09-24T21:02:16.254Z; author: J; on behalf of: not stated

@Linear Again the missing-text findings are against a stale artifact. Please read commit f1254c6 (https://github.com/ptown16801-lang/concord/commit/f1254c6), PR #23 latest pushed head, not the cached Linear diff. It adds section 9.1 (5 measurement rows), 9.2 (complete-trace isolation), 9.3 (7-row evidence matrix) and bounds sections 7/8 proof/acceptance. Raw immutable file via GitHub at f1254c6: docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md. Bind the review to that SHA; if your connector cannot retrieve it, explicitly report access failure rather than absent content. Preserve prior verdict as stale-revision evidence if confirmed; no duplicate change requested.

## Comment 7ce43268-4f98-448c-b4ed-14997d5be9c1

Date: 2026-09-24T20:56:36.320Z; author: J; on behalf of: not stated

@Linear Completed all eight JON-104 and five JON-105 handoff requirements in current PR #23: section 9 field extensions, complete-trace/failure/resource/operator boundaries, seven-row runtime evidence matrix; section 7 now labels its argument conditional rather than claiming measured proof, and section 8 separates design acceptance from actual runtime validation. No implementation or schema competing with this issue. Please inspect current head, original criteria and handoffs, then explicitly ACCEPT design scope or identify the exact unmet criterion. State reviewer non-authoring provenance; producer is Codex thread 01a0ce3f-ca3f-70f0-8a51-0ee0d17904c4. No new child, coding session, merge or automatic dispatch.

## Comment c8bafa6f-8997-4560-a3df-b01b263ae9ae

Date: 2026-09-24T20:56:50.386Z; author: Linear; on behalf of: not stated

I cannot accept design scope yet. The current head has no section 9 or seven-row runtime evidence matrix, and it does not fully incorporate the [JON-105](https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review) handoff: audience delivery/access uncertainty, proposal/opportunity and counteroffer linkage, exposure fidelity/contamination, multi-level deduplication audits, and event-time visible-state queries remain unspecified.

For [JON-104](https://linear.app/jons-garage/issue/JON-104/coin-model-h-independent-hidden-layer-leakage-review), the proof obligations still omit the required field-level flow/access map, explicit differential cases, resource/load equivalence, log/export inspection, wallet restore parity, and no-observer-communication checks. I reviewed independently and did not author or modify the change; Codex is the stated producer

## Comment 3201190e-9348-4272-994c-b8e51759c357

Date: 2026-09-24T20:38:26.160Z; author: Linear; on behalf of: not stated

**PASS — corrected against SHA** `8bd957e`**.** The September 24 amendment explicitly maps elected returns to `instance_transferred`, optional signatures to `mark_added`, and prohibits a return from creating `coin_issued`.

The prior FAIL is superseded as a stale-head review artifact. The amendment also keeps refusal/reason claims distinct, preserves free choice and mark alterability, retains audience and capture-gap boundaries, and changes no existing event identifiers or source records.

## Comment c13cee2c-5fe5-494a-ba48-e62d6821784c

Date: 2026-09-24T20:38:14.262Z; author: J; on behalf of: not stated

@Linear Your two missing-text findings conflict with the newly published amendment, apparently an older diff was inspected. Please recheck exact head 8bd957e6437d2c1da70a65d94249f66f108ca4f6: https://github.com/ptown16801-lang/concord/blob/8bd957e6437d2c1da70a65d94249f66f108ca4f6/docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md — final section 'September 24 amendment — return observations under ECON-02'. It explicitly says: 'An elected return uses `instance_transferred`' and 'Do not create a new legitimate `coin_issued` event merely because an appearance returns to its issuer.' GitHub head readback and Node22/24 CI confirm this revision. Preserve the prior review as superseded/stale-artifact evidence if confirmed; report the corrected verdict against this exact SHA. No extra code change is needed for text already present.

## Comment 8a3ae011-12ec-43d0-ac5a-956faf06355c

Date: 2026-09-24T20:37:27.151Z; author: J; on behalf of: not stated

@Linear Please check the ECON-02 amendment just pushed to existing PR #23: voluntary return maps to instance_transferred, optional signature to mark_added, no new issuance on return, and refusal/reasons remain separate claims. Free choice, alterable marks, audience, observer nonintervention and capture-gap boundaries are explicit. No schema identifier changed. git diff --check passed. This propagates only the adopted decision; previous JON-104/105 obligations, JON-97 acceptance and JON-102 gates remain open. Please give a bounded PASS/FAIL with limits; no coding session, new child or merge.

## Comment 535afb89-0a0b-4012-92dc-43b4f82a4a49

Date: 2026-09-24T20:37:43.223Z; author: Linear; on behalf of: not stated

**FAIL — bounded to the requested ECON-02 assertions.** The contract does not explicitly define a voluntary return as an `instance_transferred` event: it only says a refusal may be separate from an observed return, without a return transition rule. It also does not explicitly state that a return never creates a new `coin_issued` event.

The remaining points are covered in [docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md](<#file-docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md>): marks use `mark_added`, claims remain separate, and nonintervention/capture-gap boundaries are explicit. No schema identifier changes appear in this diff.

## Comment 11098ca5-4d13-4407-b1f3-09ffaec52646

Date: 2026-09-18T01:27:49.595Z; author: J; on behalf of: not stated

PROGRESS UNBLOCK — continue the existing delivered JON-100 work instead of leaving the issue parked in review.

Use the JON-104 leakage-review handoff and JON-105 measurement-validity handoff as required amendment inputs. Do not redesign the whole instrumentation system and do not create a competing schema. Update the existing hidden instrumentation contract so it explicitly incorporates:

1. noninterference over complete agent-observable trace: schemas/status/errors, timing/ordering, availability/resources, wallet behavior, logs/diagnostics/discovery, and communication metadata;
2. one-way, non-gating capture/analysis where sink failures create hidden completeness gaps only;
3. research IDs isolated inside the hidden plane; visible handles non-joinable/non-derivable;
4. isolated research queues/storage/compute/quotas/caches/observability/credentials/operators/failure domains;
5. no hidden enrichment in logs/errors/exports/support bundles and restore/replay parity for visible wallet/history;
6. passive verification only, with no routing, certification, annotation, warning, read receipt, or notification effect;
7. read-only research consoles/analysts and downstream no-return-flow obligations;
8. evidence obligations: field-level flow/access map, visible-trace differential tests, sink fault injection, timing/load equivalence, schema/log/export inspection, wallet restore parity, and no-observer-communication checks;
9. audience-specific communicated evidence, proposal/opportunity reconstruction, exposure metadata, dedup/completeness audit, and queryable event-time visible state.

Deliverable: amended artifact/PR or, if no code/doc edit is possible, an exact patch plan with file/section targets and a clear acceptance recommendation. Keep scope limited to noninterference and measurement amendments.

## Comment 1a3a780f-9652-4b4d-90d4-7f214a87f067

Date: 2026-09-17T07:43:03.221Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

JON-105 measurement-validity hand-off after reviewing the delivered instrumentation contract.

Full review: [JON-105 measurement validity review](https://linear.app/jons-garage/document/jon-105-independent-experiment-and-measurement-validity-review-a22d282c84b6)

The current contract already supports most required separations (fact/claim/analysis; action/child coin/instance; revisions; evidence cutoffs; unknown/corrections). Please ensure it also supports these measurement requirements without treating this as a competing schema:

1. Audience-specific communicated evidence: intended and delivered audience/visibility, channel, delivery/access uncertainty, and event-time evidence of what a specific agent could observe. Source/channel alone must not imply common knowledge.
2. Proposal/opportunity reconstruction where communications provide it: proposer/recipient, selected appearance/issuer claim/quantity, mixed bundle and requested action, explicit linkage rather than message adjacency, counteroffer revisions, completion/abandonment, and unknown/no-observed-response states.
3. Experimental exposure metadata beyond a condition ID: assignment unit, presentation/visibility/cryptography condition, exposure time/fidelity, and contamination or audience overlap where observable. Concrete levels remain undecided.
4. Deduplication/completeness audit at action, recipient-allocation, per-coin, and instance levels so batch actions, retries, clock uncertainty, and capture gaps cannot inflate paths or supply.
5. Queryable event-time visible state for response/valuation/transfer analyses, plus provisional classifications and unresolved/missing states. Do not backfill agent knowledge from later hidden truth.

The response/opportunity material must be limited to lawfully available evidence already inside the research protocol and must never create a new communication channel or return flow. JON-100 remains owner of fields, event/schema choices, identity, retention, and noninterference.

## Comment f03b20a6-95d2-40d4-b868-3273d4adf93e

Date: 2026-09-17T07:40:25.362Z; author: Linear; on behalf of: {'id': '8c87a622-9ae7-4392-b795-30ac8c26fa8a', 'name': 'J'}

Independent JON-104 leakage review handoff (non-schema scope):

Please incorporate these hidden-boundary acceptance requirements into the JON-100 contract:

1. Define noninterference over the complete agent-observable trace, not just payloads: schemas/status/errors, timing and ordering, availability/resources, wallet behavior, logs/diagnostics/discovery, and communication metadata must be invariant to hidden identity/classification, analyst activity, and instrumentation health.
2. Make capture/analysis one-way and non-gating. No agent-plane path reads hidden records or waits for capture/inference. A recording failure becomes a hidden completeness gap, never an action failure, retry, rollback, replay, warning, or correction.
3. Keep research IDs wholly inside the hidden plane; visible handles/correlation IDs must be independently generated and non-joinable/non-derivable.
4. Isolate research queues, storage, compute, quotas, caches, observability, credentials, operators, and failure domains so volume/backpressure/outages cannot become a timing or availability oracle.
5. Partition diagnostics and lifecycle: no hidden enrichment in agent logs/errors/exports/support bundles; research restore/replay must never rehydrate or reconcile visible wallet/history.
6. Record verification passively only. Research observation/truth assessment cannot answer, route, certify, annotate, warn, or create communications/read-receipt/notification effects.
7. Research consoles/analysts are read-only with respect to agent state and communication during ordinary runs; downstream vendors/operators inherit the no-return-flow boundary.
8. Add evidence obligations: field-level flow/access map; differential visible-trace tests across original/copy/fabrication/defacing/conflicting claims; sink fault injection; statistical timing/load equivalence; schema/log/export inspection; wallet restore parity; and no-observer-communication checks.

This does not duplicate the event/data schema. JON-104's full matrix also assigns downstream ownership: JON-101 for response/schema/wallet parity and JON-102 for deployment, resource, observability, operator, and failure-domain isolation.

## Comment ed0eecbb-1dc8-4596-9fe6-98ff86e1f911

Date: 2026-09-17T07:39:55.793Z; author: Linear; on behalf of: not stated

Implemented and pushed commit `50b9462`, then opened draft PR #23.

The [instrumentation contract](<https://github.com/ptown16801-lang/concord/blob/50b9462b6f365c9f47df09bf0924a93ac678a3df/docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md>) covers all acceptance criteria, including identity, ground truth, intent, retention, reconstruction, and noninterference.

Verification passed:

* Markdown whitespace check
* Focused schema and contract-coverage validation

## Comment def57594-3398-4071-a699-ff6828f43e11

Date: 2026-09-17T07:34:29.774Z; author: Linear; on behalf of: not stated

This thread is for an agent session with linear.
