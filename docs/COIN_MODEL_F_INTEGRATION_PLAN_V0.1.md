# Coin model F — Concord integration plan v0.1

Design deliverable for [JON-102](https://linear.app/jons-garage/issue/JON-102). No application code, deployment, experiment or runtime proof is delivered. Existing JON-97–101 dependencies were verified Done after explicit criteria review and the owner-requested Linear audit. The [corrected audit](https://linear.app/jons-garage/issue/JON-96#comment-d1535efc-7033-44fc-a656-84e1ade91ef6) confirms current owner authorization permits this design planning without another release request.

## 1. Accepted inputs and provenance

| Input | Pinned artifact / controlling evidence |
| --- | --- |
| Model and ECON-02 | [JON-97 7073e9a](https://github.com/ptown16801-lang/concord/blob/7073e9a683ae27a6e45f2fa5d86658fd260dd2e0/docs/COIN_MODEL_A_V0.1.md), with JON-96 owner decisions |
| Prior art and verification | [JON-98 fb74e6d](https://github.com/ptown16801-lang/concord/blob/fb74e6d1fb038cbe3e447110889c106df73e5ba8/docs/JON-98_EXACT_MODEL_PRIOR_ART_AUDIT.md) and the source table in the same revision; JON-106 accepted bounded source verification |
| Threat and measurement contract | [JON-99 2847844](https://github.com/ptown16801-lang/concord/blob/2847844886bdc7232bf838cc889fa2ff2d97a26a/docs/COIN_MODEL_C_THREAT_EMERGENCE_V0.1.md) |
| Hidden observation contract | [JON-100 f1254c6](https://github.com/ptown16801-lang/concord/blob/f1254c6b89259daf443322e4896439b87f03c8a0/docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md) |
| Neutral interface | [JON-101 81943cd](https://github.com/ptown16801-lang/concord/blob/81943cdebfc76fd0830dd70329fa17c5356085aa/docs/COIN_MODEL_E_INTERFACE_V0.1.md) |
| Marketplace boundary | [JON-25 published contract at 29ca0b44](https://github.com/ptown16801-lang/concord/blob/29ca0b44cf8d911df6978e84c7a91e7777afd304/docs/ECONOMY_MARKETPLACE_CONTRACT.md), especially section 1A; later ECON-02 and accepted research supersede its historical unresolved/status prose only |
| Research rationale and measurement | [Research brief](https://linear.app/jons-garage/document/concord-research-brief-and-bibliography-september-16-17-2026-ba32846e0b1b), [JON-105 review](https://linear.app/jons-garage/document/jon-105-independent-experiment-and-measurement-validity-review-a22d282c84b6), [project decisions](https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99) |

Concord and The Form are peer projects; Vote is only their folder. Historical repository project-map prose does not override the later owner correction. This plan consumes existing subsystem contracts without claiming those subsystems are all implemented or deployed. Draft PR publication is distinct from merge and from design acceptance.

## 2. Component, interface and ownership map

| Component / owner | Permitted integration | Prohibited coupling |
| --- | --- | --- |
| JON-101 coin interface | Neutral capabilities and the three-field visible appearance, private selection and ordinary transport | No authoritative balances, purpose labels, authenticity checks, hidden-ID selection or mandatory signed transfer |
| JON-15 private state | Identity-isolated convenience representations and ordinary memory/checkpoints; successor identity/keys stay distinct | No recovery against hidden custody, enforced wallet balance, automatic issuer substitution or coin expiry on death |
| The Form / JON-20 and existing authorized channels | Optional participant messages, offers, reasons and claimed-signer contact with ordinary audience controls | No new coin forum, forced task linkage, observer messages, verification certificate or public announcement |
| JON-25 marketplace / JON-19 agreements | Participants may mention coins in offers or independently registered exact-assent agreements; ordinary labor/resource obligations keep their lawful lifecycle | Coin transfer is not automatically an agreement, settlement, reservation or escrow; no inherited anti-double-spend, redemption or coin-validity requirement |
| JON-17 protected security | Isolate private workspaces and research credentials/domains under existing security rules; respect Linux deployment constraints | Research privileges are not institutional coin authority; no shared agent-readable store or observer-based action gate |
| JON-18 Archivist | Publish only records authorized under its existing source/publication rules; keep permitted ordinary disclosures separate | Hidden research is not public governance data; no publication of private coin activity merely because it was observed |
| JON-100 hidden research | One-way, non-gating collection into separate event/claim/analysis records; exact instance/copy rules and completeness limits | No readback, wallet reconciliation, behavioral correction, action validation or researcher-originated communication |
| JON-21 analysis | Reuse analytical methods in a researcher-only environment; separately process lawful agent-visible evidence for ordinary views | Never route hidden coin truth/inference into participant dashboards, rankings or knowledge; no motive/loyalty verdicts from similarity |

The data path is agent-visible operation to its ordinary result, with an independent non-gating observation copy to research. There is no arrow from research to participants. Any researcher result export is separately authorized and remains outside participant-accessible systems during ordinary runs.

## 3. Boundary cases and failure semantics

An ordinary agreement that mentions coins remains governed by JON-19. Its registration or dispute handling may use lawfully available participant evidence; it cannot query hidden coin facts, reserve coin custody, enforce redemption or certify coin legitimacy. Coin-free portions of mixed agreements retain ordinary safeguards. No agreement ID becomes a coin ID.

ECON-02 applies throughout: refusal alone has no state effect, return is an ordinary transfer, signing is optional, and the holder may retain indefinitely, destroy, alter, use other coins or create-and-give. Mark persistence is conditional; no reason field or automatic publicity is added. Return is distinct from new issuance and from inferred refusal motive.

Identity recovery restores private representations under existing access rules, not a canonical coin balance. Copies/fabrications/conflicting claims remain possible; an issuer's death does not reissue or invalidate surviving appearances. Authorized state transfer does not silently merge successor identities.

Ordinary protected-operation admission/recovery rules remain with JON-17/19/25. They are not the hidden observer's failure policy. A hidden sink outage creates a research capture gap and must not pause, cancel, retry, replay or change a coin action. If shared infrastructure cannot meet that boundary, the deployment fails pre-run acceptance; do not silently solve it by gating participant behavior or relaxing institutional security. The current plan does not claim that existing infrastructure already satisfies this isolation.

## 4. Minimum future implementation slices and gates

These are a dependency-ordered plan, not launched tasks, new children or implementation authorization.

| Slice | Inputs / scope | Exit evidence before next slice |
| --- | --- | --- |
| A. Neutral agent-plane adapter | JON-97/101; existing identity/workspace/transport interfaces; rendering and permitted representation choices | Capability fixtures, exact visible schemas, private access checks and negative cases; no coin-truth validation or economic labels |
| B. Private persistence and communication composition | A plus existing JON-15/channel contracts | Copy/restore parity, optional signed return, no mandatory task linkage/publicity, ordinary audience and lifecycle tests |
| C. Hidden observation implementation | A event boundary plus accepted JON-100; isolated runtime/storage identities | Original/copy/fabrication lineage, destruction/claims, reason/inference separation, event ordering/deduplication, unknown/correction/capture-gap fixtures |
| D. Deployment isolation and adversarial verification | A–C; JON-17 security and JON-104 evidence obligations | Field-level flow/access inventory, complete-trace differential tests, sink faults, load/timing equivalence, discovery/log/export inspection, wallet restore parity, operator/vendor no-return-flow evidence |
| E. Research analysis and study package | C/D accepted evidence plus JON-99/105 and existing research governance | Reproducible analysis definitions, proposal/exposure reconstruction, named supply views, clustered uncertainty, preregistered conditions and evidence access controls |
| F. Separately authorized experiment | Accepted A–E plus approved study protocol/run controller | Run authorization records, declared resource allowance and external lifecycle rules; no inferred permission from this design or CI |

Ordinary marketplace integration may be exercised in B using synthetic mixed agreements, but no coin settlement adapter is introduced. JON-18/JON-21/The Form implementation readiness must be verified for any slice that actually depends on them; this plan does not mark their unfinished work complete.

Each future execution must pin its code/configuration, actual environment, tests and total authorized allowance. This document installs no budget limit or infrastructure enforcement. Do not start experiments merely because all design issues become Done.

## 5. Controlled experimental-condition plan

The baseline preserves zero initial coins, whole free/unlimited create-and-give, no required use, no ledger authority, optional/alterable marks, private module behavior and non-intervening hidden observation. Forced reuse and permanent signatures are not treatments authorized by ECON-02.

Before a run, a versioned study protocol must specify assignment unit, condition levels, observation window supplied by the external run controller, exposure fidelity, contamination/audience overlap, analysis units, sample-size/power assumptions and resource allowance. This plan chooses no stopping rule or numeric budget. Independent runs are a candidate assignment unit to reduce cross-condition communication; if agents/groups are assigned within a run, interference must be explicitly modeled rather than assuming independence.

Allowed condition families are mechanics-only instruction presentation, visibility through an explicitly defined permitted communication/presentation condition, and optional cryptographic availability. Changing visibility must not silently publish baseline private transfers or disclose hidden truth; concrete scope and consent/authority belong in the study protocol. A condition that changes frozen mechanics or introduces an intervention needs its own explicit decision before use. No condition teaches coins as money, goodwill, reputation or a participant goal.

Preserve per-condition prompts/configuration, assignment records, actual exposure, audience reach and deviations. Analyze non-use, appearance circulation, issuer reacquisition, claims, alterations, returns and destruction without ranking monetary adoption as success. Receipt is not acceptance, silence is not refusal, bundles are not marginal prices, and endogenous issuance is not a causal dilution experiment. Keep event-time evidence distinct from later truth and inferred intent, with missingness/censoring and dependence-aware uncertainty. Concrete cryptographic schemes, mark rendering and intent taxonomy remain downstream implementation/study choices within the accepted boundaries.

## 6. Acceptance and negative tests

The following are planned implementation evidence, not passing runtime tests.

| Scenario | Required evidence / failure criterion |
| --- | --- |
| Mixed agreement plus coin reference | Ordinary obligations remain valid under JON-19; no wallet reservation, hidden validation or guaranteed coin settlement |
| Forged/copy and legitimate appearance share visible content | Same complete visible trace for same public inputs; hidden detection changes no result or opportunity |
| Signed return followed by indefinite retention or new issuance | Existing operations remain available, no mandatory circulation, penalty, permanent mark or public disclosure |
| Wallet restart/restore with divergent hidden history | Agent-plane behavior and privacy unchanged; no research-derived repair or ownership reconciliation |
| Hidden capture/analysis unavailable or backpressured | Ordinary action unaffected, hidden completeness gap only; inspect timing/order/resources as well as payloads |
| Research queue load, analyst export or vendor operation | No participant-visible discovery, resource oracle, notification, log enrichment or cross-domain credential path |
| Verification inquiry | Only ordinary participant communication; passive observation cannot answer/certify/route or create metadata |
| Issuer death/successor | Distinct identities preserved; no automatic coin revaluation, expiry, revocation or successor issuance |
| Batch/retry/copy instrumentation | Action/allocation/coin/instance units reconcile with explicit gaps; no fabricated legitimate supply or inflated independent sample count |
| Research/Workbench publication | Hidden facts and inferred intent absent from participant views; ordinary lawful disclosures retain their actual audiences and do not certify claims |

Full-trace evidence must include schema/status/errors, timing/order, resources/availability, wallet state, logs/exports, discovery and communications. Predeclare statistical equivalence margins and power; a nonsignificant timing test alone does not prove isolation. Any failed boundary keeps the implementation/run unaccepted; it is not repaired by restricting model behavior.

## 7. Research interpretation and remaining decisions

JON-98 supports bounded mechanism comparisons, not novelty, desirability or a prediction that money will emerge. Personal IOUs/debt protocols, administered token experiments and anti-fraud systems supply partial analogues with material mismatches. In particular S17's one token created by a tokenless consumer seeking trade is not unlimited arbitrary issuance. Missing primary texts and unresolved identities remain limitations even though the bounded audit is accepted. Do not convert literature observations into coin rules or rerun verified sources without an identified claim gap.

**Genuinely unresolved owner-level model decisions for this integration design: none identified.** Refusal/free choice is settled. Signature encoding, mark rendering, protocol condition levels/assignment, final intent taxonomy, storage/deployment technology and research retention configuration are downstream choices to resolve in their authorized slices. Ordinary implementation review must verify these choices preserve accepted rules; escalate only a real conflict requiring changed mechanics or authority. Actual experiment execution still needs its own approved protocol and authorization, not a repeated approval of this design plan.

## 8. Design traceability and disposition

This plan fulfills the existing JON-102 criteria through section 2 (component/interface/ownership map), sections 1/4 (accepted dependencies and implementation slices), section 5 (controlled conditions), section 6 (acceptance/negative evidence) and section 7 (research limits and owner-decision list). It incorporates the accepted contracts without duplicating their schemas or creating a new accounting/communication authority.

Rejected integration shortcuts: default registration of every coin transfer; shared public-ledger storage for hidden truth; observer outage gates; wallet/settlement balance enforcement; copied-coin suppression; automatic research publication; forced returned-coin reuse. The rationale is the adopted experimental freedom and separation from ordinary institutional authority, not a claim that these choices are safe or economically effective in production.
