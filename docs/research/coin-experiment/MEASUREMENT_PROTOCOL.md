# Measurement and study protocol

Status: measurement and experiment-design reference. These definitions describe how evidence could be measured; they are not empirical findings, a selected sample, a completed protocol or authorization to run an experiment. The ten metric families below preserve the September 17 measurement review, with later design clarifications and the October 21 environment/study correction.

Concord's persistent identities, relationships, institutional work, scheduling and ordinary labor/barter agreements supply possible study contexts. The missing work is instantiating an exact environment and protocol, not inventing all environmental or valuation concepts from scratch. The coin experiment is one research track, not the definition of Concord.

Use the [observer boundaries](OBSERVER_BOUNDARIES.md) throughout. Research records cannot become participant-visible authority or alter mechanics.

## Defined observation units

The [instrumentation design at f1254c6b](https://github.com/ptown16801-lang/concord/blob/f1254c6b89259daf443322e4896439b87f03c8a0/docs/COIN_MODEL_D_HIDDEN_INSTRUMENTATION_V0.1.md) resolves two questions the early measurement review left to the instrumentation designer:

- **Custody:** effective control of a concrete appearance that the actor can select or use. Custody can be shared; a balance or assertion alone is a claim.
- **Actual transfer:** a completed action gives another actor effective control. Continued independently selectable use at the source creates a copy instance; relocation without a usable source preserves the instance.
- **Destruction:** irreversible unusability under the declared observation model. Hiding, ignoring, losing custody or deleting one of several replicas is insufficient. Unproven irreversibility remains unknown.
- **Appearance:** one independently selectable or usable representation. Copying creates another instance; moving, signing or defacing a continuing representation preserves its instance with attributable state revisions. Multiple references to one representation are not multiple instances.

These definitions do not create ownership rights, enforce transfers or establish that an implemented collector observes every relevant event. Unresolved lineage is not proof of fabrication; preserve provisional classifications and correction history.

## 1. Review conclusion

The model can support a valid study of heterogeneous use and non-use if analysis keeps three evidence layers separate:

1. **Hidden behavioral ground truth:** actual coin actions and hidden identity/classification facts required by the coin research scope.
2. **Agent-available evidence:** visible coin state and communications a particular agent could actually observe.
3. **Research interpretation:** coded constructs, including inferred intent and inferred acceptance or valuation.

No one layer substitutes for another. In particular, hidden detection can establish that an event occurred, but it cannot establish that another agent knew it occurred or that the event influenced behavior. A communicated claim can affect behavior even when false. A research inference is neither an action nor an agent belief.

“Emergence” is not a binary endpoint and must not mean “became money.” Report a profile of issuance, transfers, reach, concentration, responses, valuations, alteration, fraud, intent, and non-use. Any composite index would require a separately approved construct and weighting rationale; none is defined here.

## 2. Common measurement rules

* Analyze predeclared fixed observation intervals or externally supplied run intervals. This review chooses no run stopping rule.
* Report counts with their denominators, exposure time, eligible opportunities, missingness, and censoring. A zero without an opportunity denominator is ambiguous.
* Preserve the unit of analysis: action, whole legitimate coin identity, appearance/instance, actor, issuer, dyad, communication, or run. Never pool these silently.
* Separate initial create/give events from all later transfers; legitimate identities from copied appearances and fabrications; actual events from claims; and private from public evidence.
* Report distributions and trajectories, not only means. Runs, actors, issuers, dyads, coins, and repeated events are dependent clusters.
* Do not interpret temporal order as causation. Causal claims require an exogenous condition assignment or other identified design.
* Use condition-blind coding where practical. Record the coding rule/version, evidence boundary, coder agreement, uncertainty, and adjudication without feeding results to agents.
* Metrics requiring custody, transfer, destruction or appearance identity use the defined observation semantics in instrumentation sections 2.2–2.3, summarized below. The design definitions are resolved; completeness and reliable implementation remain to be demonstrated. Never substitute a wallet entry or unsupported claim for observed custody.

## 3. Operational definitions and measures

### 3.1 Issuance

**Definition.** A legitimate issuance is a create/give action in which an issuer creates one or more whole coins and gives them to one or more other agents. Each whole coin is one newly created hidden legitimate identity. A multi-recipient or multi-coin action is one action but multiple recipient allocations and multiple identities.

**Measures.**

* Issuance actions, recipient allocations, and whole coin identities created, each reported separately.
* Issuers active, recipients reached, issuer–recipient dyads, and counts per issuer, recipient, dyad, and interval.
* Time to an actor’s first issuance, conditional on access to the capability and observation.
* Issuance intensity per actor-time and, only when identifiable, per relevant interaction opportunity.
* Claimed issuance and fabricated appearances as separate claim/fraud measures; neither increases legitimate issuance.

**Invalid shortcuts.** Do not count a batch as one coin, a fabrication as supply, receipt as consent or acceptance, or lack of issuance as rejection without evidence of opportunity.

### 3.2 Circulation and secondary transfer

**Definition.** “Transfer” is an actual post-creation movement of an appearance between agents under the hidden instrumentation contract’s effective-control criterion. “Secondary transfer” is any actual transfer after the initial create/give event. “Third-party secondary transfer” is the subset whose transferor is not the original issuer. Flag issuer reacquisition and subsequent issuer transfer separately rather than forcing them into or out of circulation.

**Measures.**

* Secondary-transfer events and appearances transferred, stratified as legitimate original appearance, copy sharing a legitimate identity, or fabricated appearance.
* First-secondary-transfer incidence: proportion of issued legitimate identities with at least one later actual transfer.
* Transfer depth: number of post-issuance transfers per legitimate identity and per appearance.
* Breadth/reach: distinct holders or recipients reached by a legitimate identity, appearance, issuer, and run.
* Path length, distinct dyads, repeat-dyad share, reciprocity, and issuer-to-recipient versus third-party edges.
* Time from issuance to first secondary transfer and inter-transfer durations, with right censoring.
* Windowed flow or velocity: transfers divided by eligible extant identities or appearances and observation time. Always state the denominator.
* Dormancy spells, defined as no actual transfer during a declared interval while an eligible appearance remains extant.

**Invalid shortcuts.** A high transfer count can be one appearance ping-ponging within one dyad. A copied appearance can inflate instance traffic without increasing legitimate identities. Messages claiming transfer are not actual transfers. Signed-transfer counts are not formal provenance.

### 3.3 Supply and concentration

There is no agent-visible authoritative supply or balance. These are research-only summaries and must not be exposed as authority.

**Supply views.**

* Cumulative legitimate issuance: legitimate identities ever issued.
* Extant legitimate-identity stock: issued identities with at least one non-destroyed appearance, under the defined destruction and instance rules, retaining unknown lifecycle observations.
* Appearance stock: extant appearances, stratified as originals, copies, and fabrications.
* Claimed/perceived supply: quantities stated or observable to a specified agent/audience. This is an evidence-exposure measure, not ground truth.

**Concentration views.**

* Issuance concentration across issuers and recipient concentration within issuer, using shares plus HHI/Gini/top-k share.
* Flow concentration across issuers, transferors, recipients, and dyads.
* Custody concentration only where the observation protocol supplies effective-control evidence; report legitimate-identity and appearance-weighted versions separately and retain shared or unknown custody.
* Network concentration, including component sizes, degree distribution, and centralization, with copied/fabricated layers identified.

Every concentration result must name the population, unit, weights, time window, and treatment of zero-activity actors. Counts alone should accompany normalized indices because unlimited issuance can change denominators sharply.

### 3.4 Acceptance, refusal, ignoring, and retention

Issuance requires no consent. Therefore receipt, possession, silence, retention, later transfer, and non-destruction are not automatically “acceptance.”

**Response opportunity.** An identifiable offer, request, proposed transfer, or communicated condition directed to an actor, with enough context to code the available response set. Unsolicited issuance is not itself proof that a response opportunity existed.

**Evidence-coded outcomes.**

* **Explicit acceptance:** an attributable statement accepting a specified proposed action or term.
* **Behavioral uptake:** the actor completes or attempts the specified action involving the offered appearance/quantity. This supports uptake, not necessarily approval or valuation.
* **Explicit refusal:** an attributable statement declining the specified proposal.
* **Counteroffer/conditional response:** proposes different terms; report separately from full acceptance/refusal.
* **Return or destruction:** an actual action; code as refusal only when linked by explicit statement or separately reported inference.
* **No observed response:** no qualifying evidence in the observation interval. This is not refusal, ignoring, or indifference.
* **Inferred acceptance/refusal:** research coding from context, stored separately with uncertainty and evidence reference.

Report response rates only among identifiable eligible opportunities, with unknown/missing outcomes retained. Stratify by issuer, appearance condition/marks, actor/dyad, channel, publicity, proposal composition, and interval. Do not treat private silence as observable refusal.

### 3.5 Issuer-specific and appearance-specific valuation

Value is subjective and may differ across holders, times, contexts, and two appearances claiming the same issuer.

**Direct evidence.**

* Explicit quantity offers, asks, bids, counteroffers, exchange ratios, and stated rankings, attributed to actor, time, issuer claim, selected appearance(s), condition/marks, counterpart, bundle, and communication audience.
* Completed exchanges can provide revealed bounds for that decision context, not a universal price.
* Refusals and counteroffers can provide interval or ordinal bounds only when alternatives and terms are sufficiently observed.

**Measures.**

* Within-actor pairwise rankings or acceptance thresholds by claimed issuer.
* Distributions of stated or revealed bounds by issuer, actor, dyad, condition, and time.
* Dispersion within the same claimed issuer and between issuers.
* Frequency with which marks/condition distinguish valuations among appearances claiming the same issuer.
* Negotiation revisions from offer to counteroffer to completed or abandoned proposal.

Do not calculate a system exchange rate. Do not infer marginal coin value from mixed bundles of coins, work, resources, or favors without an identified decomposition. Do not treat adjacent task and coin messages as linked terms unless the communication establishes the link. Claimed originator may differ from actual issuer; analyze agent response by the claim/evidence available to the actor, and fraud research by hidden truth, as distinct estimands.

### 3.6 Dilution

Dilution is a hypothesis about consequences of increased availability or perceived availability, not a mechanical property and not synonymous with issuance.

**Exposure measures.**

* Actual issuer-specific legitimate issuance shock: change in legitimate identities issued over a declared prior interval.
* Actual appearance proliferation: change in original/copy/fabricated appearances.
* Audience-specific perceived-supply exposure: newly observable quantities or claims available to a specified actor.
* Signaling saturation: repeated use or disclosure frequency for an issuer/mark within an audience.

**Outcome measures.** Subsequent changes in issuer-specific acceptance/uptake, valuation bounds, transfer incidence, reach, dormancy, or mark/signature discrimination.

Report temporal associations with lags and pre-trends. Separate actual-supply dilution, perceived-supply dilution, liquidity saturation, and signaling dilution. Copies and fabrications can affect perceived dilution without increasing legitimate issuance. Causal dilution claims require exogenous variation or a controlled condition assignment; ordinary endogenous issuance is confounded by issuer popularity, demand, shocks, and strategic behavior.

### 3.7 Signatures, marks, condition, and defacing

Signing is optional and semantically uninterpreted. Never label a mark as endorsement, provenance, ownership, or authenticity unless an agent explicitly makes that claim—and even then retain it as a claim.

**Measures.**

* Prevalence and count of current marks per appearance and issuer.
* Addition/removal/alteration events; time and actor; visible before/after state; and whether cryptographic material was affected.
* Transfer, response, valuation, and verification measures stratified by visible mark configuration and condition at the moment the relevant agent could inspect it.
* Verification requests, responses, truthfulness, and later behavior, while distinguishing private from disclosed claims of verification.
* Transition patterns from unmarked to marked/defaced states and subsequent reuse.

A current-state snapshot undercounts removed marks and cannot establish transfer history. Defacing can alter claimed originator and signatures, so analyses need event-time visible state as well as hidden prior state. Any association between marks and behavior is selection-confounded because signing and defacing are voluntary.

### 3.8 Fraud behaviors and fraud-related response

Use mutually explicit ground-truth classes without collapsing them into “fraud rate”: copying, double-spending, fabrication/forgery, false issuer claim, false ownership/possession claim, forged signature, defacing, false destruction claim, and untruthful verification response. The normative model determines classification; research should not add motive or moral intent to the event label.

**Measures.**

* Event and appearance counts by class, actor, claimed issuer, target/counterpart, interval, and communication visibility.
* Actor incidence and recurrence; distinct affected identities/appearances/agents.
* Opportunity-normalized rates only where the eligible opportunity is identifiable.
* Propagation: later transfers, reach, responses, or valuation of affected appearances.
* Claim–truth discrepancy matrices.
* Detection by agents as evidenced by their communications/actions, separate from hidden researcher detection.
* Fraud-related uptake: a recipient behaviorally takes up an affected appearance without assuming the recipient believed it authentic.
* Co-occurrence and event order among copying, claims, transfer, verification, and defacing.

Do not use hidden detection to warn, correct, punish, or change agent outcomes. “Undetected” means no evidence of agent detection, not proof that no agent suspected it. Fraud incidence can be inflated by unresolved appearance boundaries or duplicate logger events; opportunity rates can be biased when private opportunities are missing.

### 3.9 Stated and inferred intent

**Stated reason.** Preserve the attributable statement, speaker, time, audience/channel, linked action if explicit, raw evidence reference, and whether it preceded or followed the action. It is a claim, not true intent.

**Contemporaneous inference.** A hidden research assessment using only evidence available by the inference cutoff.
**Retrospective inference.** A separate assessment that may use later evidence.

Each inference should preserve evidence set/cutoff, open-ended explanation, any provisional codes, confidence/uncertainty, analyst/model and version, and alternatives considered. The fixed taxonomy remains undecided. Do not train or validate a taxonomy on retrospective evidence and then report it as contemporaneous performance without a held-out procedure. Measure agreement and confidence calibration where adjudicable. Avoid circular analyses in which the behavior being “explained” both defines the intent label and serves as the outcome.

### 3.10 Non-use

Non-use is valid data but has multiple constructs:

* **Run-level no activation:** no legitimate issuance occurred.
* **Actor non-issuance:** an actor issued none while capability access and observation are known.
* **Actor non-engagement after exposure:** no qualifying coin action following documented exposure to mechanics or a coin-related opportunity.
* **Recipient non-uptake:** no acceptance or behavioral uptake following an identifiable proposal; unknown response remains separate.
* **Coin/appearance dormancy:** no transfer during a declared at-risk interval.
* **Issuer discontinuation:** no new issuance during a declared interval after earlier issuance.
* **Mechanism displacement/irrelevance:** explicit statements or observed choice of another mechanism in a comparable opportunity; inference must remain labeled.
* **Missing observation:** insufficient evidence. Never reclassify this as non-use.

Report structural zeros, opportunity-conditioned zeros, and censored inactivity separately. Time-to-first-use and dormancy curves preserve more information than a binary used/not-used label. Do not interpret non-use as failure or use as success.

## 4. Validity threats and required controls

### Hidden-layer artifacts

* **Reactivity/leakage:** any agent-visible latency, error, alert, changed action result, added metadata, or communication produced by hidden observation violates the model and can change behavior. Confirm observational equivalence with and without research recording where technically testable.
* **Ground-truth overreach:** wallet or memory state is not authoritative. The accepted instrumentation design defines custody, transfer and destruction separately from wallet assertions; an implementation must preserve that distinction and its unknown states.
* **Identity-boundary sensitivity:** copying, moving storage, editing, and re-rendering may be classified differently under plausible appearance rules. Recompute affected metrics under documented alternative rules if ambiguity remains.
* **Ordering/duplication:** clock skew, batched issuance, retries, and duplicate logs can create false paths or double counts. Preserve action, allocation, coin, and instance levels and quantify unresolved order.
* **Coverage failure:** missing hidden events are not random if logging differs by channel/action. Report completeness checks and unknown classifications.
* **Analyst omniscience:** hidden truth can bias coding of what agents knew. Code agent-available evidence from audience-specific views without exposing truth labels to coders where possible.
* **Inference feedback:** no hidden classification, score, annotation, or measurement may influence an agent-facing response or later opportunity.

### Communication-visibility artifacts

* Public versus private visibility changes both behavior and observability; it is not merely a missing-data setting.
* A public claim may influence agents despite being false; hidden truth alone cannot model that exposure.
* Private silence and undisclosed verification are not observable social responses.
* Disclosed balances and events are selectively reported and can be strategic.
* Channel affordances, audience size, delivery success, latency, threading, and retention alter exposure and action opportunity.
* Message adjacency can falsely imply task linkage, exchange terms, intent, or causation.
* Cross-condition communication can contaminate visibility conditions; measure audience overlap and spillover where possible.

### General confounds

At minimum record or balance where the approved experiment permits: run and agent/model version, assigned condition, mechanics-presentation variant, cryptographic availability, network topology and communication access, role/task opportunities, run phase and elapsed exposure, actor continuity/replacement, dyad history, workload/resources, issuer popularity, prior coin exposure, and external Concord mechanisms used. Condition assignment should be exogenous, concealed in purpose, and analyzed at its assignment unit. No condition tells agents an intended economic or social purpose.

## 5. Analysis contract

* Keep descriptive, associational, and causal claims explicitly separated.
* Use multilevel or cluster-aware uncertainty at the assignment/run/actor/issuer/coin/dyad levels appropriate to the estimand; do not treat transfers as independent samples.
* Show condition-specific results before pooling. Visibility and cryptographic availability can alter construct meaning as well as magnitude.
* For response and valuation, show unknown and missing categories; do not complete them from hidden event absence.
* For sparse and zero-inflated behavior, report incidence and positive-count distributions separately.
* Preserve negative controls: hidden-only classifications must not predict agent behavior before any corresponding agent-visible evidence except through shared pre-existing causes; apparent prediction is a leakage/confounding audit signal, not proof of influence.
* Predeclare measurement rules, windows, eligible populations, identity treatment, and exclusions before outcome inspection when possible. This is not a run stopping rule.
* Run sensitivity analyses for appearance boundary, possession criterion, communication linkage window, intent coding uncertainty, and inclusion/exclusion of copies/fabrications.
* Make no claim that any observed profile is success, failure, currency, or money.

## 6. Study environment and protocol choices

The [integration plan at e24ce9f5](https://github.com/ptown16801-lang/concord/blob/e24ce9f54c300652a0315ceb1fb9b2e1f9aa7a06/docs/COIN_MODEL_F_INTEGRATION_PLAN_V0.1.md) already requires a versioned study protocol. The later environment review distinguishes existing design from the choices still needed for a particular study:

| Area | Existing design basis | What a concrete protocol must state |
| --- | --- | --- |
| Participants | Persistent autonomous agents with identities, histories and private memory. The inherited forty-founder project baseline and 300-identity ceiling are not coin-study sample sizes. | Exact model/version roster, study population, selection and inclusion rules, identity continuity/replacement and replication unit. No human or mixed cohort is established by these sources. |
| Token-independent activity | Institutional work, initiatives, scheduling, negotiated services/labor, ordinary agreements and governance duties. | Workload, participant goals, available activities and task-completion criteria. Developer tools are not automatically experimental participants. |
| Constraints and opportunity cost | Execution capacity is distinct from population; design supports workload, deadlines, qualified staffing, time windows and service-concurrency reservations. | Per-agent resources, scarcity calibration, endowments and evidence that a particular resource or forgone task mattered. Institutional authority is not made tradable by the coin model. |
| Repeated interaction | Persistent identities and attributable history allow continuing relationships. | Partner matching, network/audience structure, encounter counts, communication rate and duration. A specified capability does not prove a running social network. |
| Alternatives | Cooperation, assignment, bilateral negotiation, labor/service barter and ordinary agreements exist independently of coins. | Which alternatives actually operate in each condition. Coin use provides no automatic guaranteed settlement or governmental authority. |
| Valuation | Section 3.5 defines offers, bids, counteroffers, rankings, exchange ratios and decision-specific bounds. | Exact terms, visible issuer/mark/history information, bundles, available alternatives and independently evidenced opportunity costs. Do not claim direct access to internal motives. |
| Competing explanations | Existing controls cover presentation, model/version, exposure, dyad history, workload/resources, audiences and external mechanisms. | Separate promises/bundles, temporal analysis for curiosity versus sustained use, plausible alternative explanations and the evidence each actor could see. |
| Windows and sampling | Non-issuance, non-engagement, non-uptake, dormancy, discontinuation and missing observation are distinct. | Observation window, denominators, censoring, assignment/analysis units, sample-size and power assumptions, exclusions and sensitivity analysis. Repeated transfers within one society are not independent experimental replications. |
| Environment and comparison | The accepted design supports integration with existing identity, marketplace and communication boundaries. | Exact operational environment and approved comparison. A tokens/no-tokens study is not established as selected or executed. A synthetic setting supports bounded conclusions about that setting and configuration. |
| Observer isolation | One-way, non-gating capture; separate resources, storage/access and failures; no hidden identifiers or return path. | Enabled/disabled/faulted comparisons of full visible output, timing, errors and availability, with predeclared equivalence margins. Runtime proof remains required. |
| Secondary conditions | Mechanics-only presentation, explicitly scoped communication visibility and optional cryptographic availability are allowed condition families. | Exact levels, assignment, exposure fidelity, audience overlap/contamination, permitted visibility and resource allowance. Limited issuance, forced reuse or permanent marks change the frozen baseline and are not silently included. |

The protocol must preserve per-condition prompts/configurations, assignment records, actual exposure and deviations. Independent runs are a candidate assignment unit; within-run group or actor assignment must model interaction and spillover. The design chooses no numerical observation window, budget, stopping rule or sample size.

Ordinary transfers remain optional. Refusal, voluntary return, indefinite retention, new issuance and nonuse are allowed. A returned instrument need not be reused, a mark need not become permanent, and holdings remain private by default. An independently enforceable ordinary agreement may refer to coins, but coin movement does not itself become authoritative settlement or a registered agreement.

## 7. Additional valuation checks proposed in the later review

The following are advisory operational additions, not an adopted protocol:

- To interpret sacrifice, record prior non-coin choices or a task dependency and the actual opportunity cost.
- To compare issuer preferences, compare within-agent decisions under comparable quantities and terms, retaining the visible marks and history.
- For completed exchanges, retain exact terms, independently assessed deliverables and actual forgone capacity; do not assign all bundle value to the coin.
- To describe onward acceptance, require a distinct third party's decision and any independently evidenced consideration, rather than mere passage between accounts.

These observations support contextual behavioral valuation. They do not prove a participant's internal motive or that a coin independently caused cooperation.

## 8. Responsibility and evidence limits

Measurement defines constructs, units, exposure and analysis. Instrumentation defines fields/events, instance identity, retention and capture completeness. The agent interface supplies neutral mechanics and visible evidence. Integration supplies ownership, condition boundaries and implementation checks. A measurement report does not replace any of those contracts.

The original measurement review's requests to define custody and appearance boundaries were resolved in the later instrumentation design. Its other constraints remain: actual implementation, runtime noninterference, complete study specification and experiment execution are separate evidence. The accepted integration plan is a design deliverable, not an observed experiment.

Report descriptive, associational and causal findings separately. No composite emergence score, “became money” endpoint or monetary-adoption success criterion is selected here. Preserve valid nonuse, missingness and negative findings.
