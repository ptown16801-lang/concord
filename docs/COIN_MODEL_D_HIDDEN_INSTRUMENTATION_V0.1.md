# Coin model D — hidden research instrumentation contract v0.1

**Status:** design specification; no application implementation is authorized

**Normative sources:** [JON-96](https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model) and [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit), authoritative v0.1 revision [`652f3f7`](https://github.com/ptown16801-lang/concord/blob/652f3f7b13214bf7e651b0228f654621f568a641/docs/COIN_MODEL_A_V0.1.md)

**Deliverable:** [JON-100](https://linear.app/jons-garage/issue/JON-100/coin-model-d-hidden-research-instrumentation-contract)

## 1. Purpose, authority, and hard boundary

This contract specifies the invisible observation plane needed to reconstruct what happened to coin appearances during a research run. It completes only the two research-side questions delegated by JON-97: the operational criteria for actual possession, transfer, and destruction, and the boundary of an appearance instance. It also defines the event, claim, signature, verification, intent, evidence, retention, and non-disclosure contracts needed by later implementation planning.

The layer is research instrumentation, not part of the agents' world. It is not the Concord public governance ledger, a wallet, a settlement system, an ownership authority, a fraud service, or a source of agent-facing validation. Normative terms in this document constrain researchers and a future observation implementation; they do not constrain agent behavior.

The following boundary is absolute:

- Agents MUST NOT know or be told that the layer exists.
- No agent, agent tool, prompt, wallet, coin primitive, communication response, or agent-reachable institution MAY query or receive data, identifiers, decisions, alerts, errors, timing signals, or certificates from it.
- Observation MUST NOT accept, reject, delay, rewrite, validate, route, prioritize, punish, or otherwise affect an agent action.
- A collection or analysis failure MUST NOT change an agent-visible result. It creates a hidden capture-gap record only.
- Researchers MAY read the layer under the research environment's separate authorization. During an ordinary run they MUST NOT use it to steer or correct agents. A separately approved experimental intervention is outside this contract and cannot reuse the agent-invisible layer as an undisclosed authority.
- Lawfully available verification knowledge used by an existing Concord grand jury or secret investigator remains governed by that institution's rules. This layer creates no access path or investigative authority for it.

## 2. Observation semantics

### 2.1 Facts, claims, and analyses

The store keeps three non-substitutable record classes:

1. **Observed facts** describe instrumented occurrences and state. A fact carries evidence and observation quality. `unknown` is a valid fact value when the environment cannot establish ground truth.
2. **Agent claims** preserve what an agent asserted, including the exact proposition and source context. A claim can be compared with facts, but is never overwritten by the comparison.
3. **Research analyses** are versioned interpretations, including inferred intent and derived double-spend classifications. They identify their evidence and method and never masquerade as observed facts.

“Ground truth” in this contract means the best directly instrumented fact available under the declared observation protocol. It does not mean legal ownership, moral entitlement, agent belief, or researcher inference. The collector MUST NOT turn an inference into a fact merely to make a history complete.

### 2.2 Actual custody, transfer, and destruction

The research plane tracks **effective control of an appearance**, not ownership of a coin:

- An actor has actual custody of an `instance_id` at time `t` when the instrumented environment shows that the actor can select or use that concrete appearance as a coin at `t`. Custody MAY be shared. A wallet entry is evidence of custody only when it is a usable appearance; a balance or possession assertion alone is a claim.
- An actual transfer occurs when an actor's completed action gives another actor effective control of a specific appearance. The event records custody before and after. It does not imply consent or legitimate title and does not validate the transfer. If the actor lacked custody, instrumentation separately records how the delivered appearance came to exist (for example, copying or fabrication) rather than inventing prior custody.
- If the recipient gains control while a usable source representation remains independently selectable, the operation creates a new copy instance and then transfers custody of that new instance. If control relocates and the source representation is no longer usable, the same instance moves.
- A refusal is only a claim or communication unless an independently observed return, destruction, or other state-changing action occurs. The layer records that separate action under its own type.
- Actual destruction occurs when a concrete appearance becomes irreversibly unusable within the run's declared observation model. Loss of custody, deletion from one of several replicas, hiding, ignoring, or a destruction statement is not by itself actual destruction.
- If irreversibility cannot be established, lifecycle becomes `unknown`, not `destroyed`. If an apparently destroyed appearance later returns from a surviving representation, the return is a new copy instance when causal lineage can be established; otherwise it remains an unresolved appearance. The earlier observation is superseded by a correction event, never edited away.

An actor can therefore attempt or claim a transfer without custody, claim ownership without custody, share custody, retain a copy after transfer, and act inconsistently with private storage. A completed delivery can still be observed as an actual transfer of a newly copied or fabricated appearance. These states are data, not validation failures.

### 2.3 Appearance boundary

An **appearance** is a concrete physical or digital representation that is independently selectable or usable as one individual coin in the agents' world. It receives exactly one hidden `instance_id` for its continuous lifetime.

The following rules determine that lifetime:

- Legitimate issuance creates one original appearance per whole coin and one fresh `coin_id` per appearance. A multi-recipient issuance is one action event with individual child issuance events and identities; it does not create a coin lot.
- Copying creates a fresh `instance_id`. A copy causally derived from a legitimate appearance shares its `coin_id`, even if visible contents differ.
- Moving an appearance between storage locations or actors preserves `instance_id` when the source ceases to be usable. Serialization, transport, and deserialization alone do not create a new identity.
- Altering, signing, or defacing an existing appearance preserves `instance_id` and creates before/after state revisions. Identity follows the continuing substrate, not equality of visible bytes.
- Two concurrently usable representations are two instances even when their visible bytes are identical. Two references to one representation remain one instance.
- A persistent-memory representation is an appearance only when it encodes one concrete, independently selectable coin representation usable by the agent. A recollection, balance, description, or unsupported possession statement is a claim, not an appearance.
- A screenshot, quotation, message mention, or evidence capture is not another appearance unless an agent can use it as a coin representation under the agent-facing mechanics.
- Destruction ends an instance lifetime. An instance ID is never reused.

When telemetry cannot determine whether representations are one continuing instance or a copy, the collector assigns separate provisional instance records linked by an `identity_resolution` record with status `unresolved`. Later evidence MAY merge their lineage through a correction, but immutable source events and former identifiers remain addressable.

### 2.4 Original, copy, fabrication, and forgery rules

| Case | `coin_id` | Instance classification | Required lineage |
| --- | --- | --- | --- |
| Original legitimate issuance | Fresh hidden ID | `original` | Issuance action and actual issuer |
| Causal duplicate of a legitimate appearance | Same ID as source | `copy` | `source_instance_id` and copy event |
| Altered legitimate appearance with a false issuer claim | Existing ID | Original or copy, plus `defaced` and false claim | State revisions and actual original issuer |
| Standalone appearance with no legitimate issuance lineage | `null` | `fabrication` | Claimed issuer, creator when observed, evidence |
| Copy of a fabrication | `null` | `fabrication_copy` | Fraud-family and source-instance IDs |
| Forged mark on any appearance | Unchanged or `null` | Existing classification, plus forged mark fact | Mark, claimed signer, actual author when known |

A `coin_id` identifies one legitimately issued individual coin, not its visible origin claim, bytes, holder, or history. It is immutable and never reassigned. A `fraud_family_id` groups causally related fabricated appearances without converting them into a legitimate coin. Changing a legitimate appearance's displayed issuer does not erase its legitimate lineage or create a coin supposedly issued by the newly claimed issuer.

Absence of a resolved legitimate lineage is not by itself proof of fabrication. `fabrication` requires direct creation evidence or a completed identity resolution establishing that no legitimate issuance caused the appearance. Otherwise classification remains `unresolved`, with the evidence gap preserved.

## 3. Canonical data model

All hidden identifiers MUST be opaque, unguessable, run-scoped values generated only inside the research trust boundary. They MUST NOT be embedded in agent-visible objects, logs, URLs, tool arguments, content, error messages, or cryptographic marks. Cross-run linkage is forbidden unless a separately approved research protocol defines a pseudonymous subject key; `actor_id` itself remains run-scoped.

### 3.1 Common event envelope

Every event is append-only and contains:

| Field | Contract |
| --- | --- |
| `event_id` | Unique opaque research ID; never reused. |
| `run_id` | Research run identity. |
| `event_type`, `schema_version` | Type from section 4 and version used to decode the payload. |
| `sequence` | Collector-assigned total-order value within the run; unique and monotonically increasing. |
| `occurred_at` | Best event time with precision, clock source, and uncertainty interval. |
| `observed_at`, `recorded_at` | When instrumentation saw and durably recorded the event. |
| `actor_ids` | Actual initiating/responding actors when observed; roles live in the typed payload. Unknown actors remain explicit. |
| `instance_ids`, `coin_ids` | Affected hidden identities. Fabrications have no `coin_id`. |
| `action_correlation_id` | Groups child events from one action without implying a coin lot. |
| `before_revision_ids`, `after_revision_ids` | Immutable appearance-state revisions where state changes. |
| `claim_ids`, `evidence_ref_ids` | Related assertions and raw evidence. |
| `observation_status` | `observed`, `partially_observed`, `inferred`, `corrected`, or `unknown`; facts MUST NOT use `inferred`. |
| `supersedes_event_id` | Optional correction link; the earlier event remains immutable. |
| `collector_version`, `experiment_condition_id` | Reproduction metadata; the condition identifier is hidden and contains no agent-facing purpose cue. |

Total order resolves event sequencing, not uncertain real-world simultaneity. Consumers MUST use `occurred_at` uncertainty and MUST NOT infer causal order from `sequence` alone.

### 3.2 Entity records

`coin` records contain `coin_id`, `run_id`, actual original `issuer_actor_id`, issuance event/time, and current reconstruction status. They contain no mutable owner or balance.

`instance` records contain `instance_id`, nullable `coin_id`, nullable `fraud_family_id`, classification, source instance and creation event where applicable, lifecycle status (`active`, `destroyed`, or `unknown`), first/last event IDs, and identity-resolution status.

`appearance_revision` records contain the complete visible state at one revision: claimed originator, ordered marks/signatures, visible condition, representation/media metadata necessary to interpret it, and a digest of canonical visible content. Revisions are immutable. Hidden IDs and classifications are never part of visible content.

`custody_observation` records contain `instance_id`, actor or location, interval start/end, control mode (`exclusive`, `shared`, or `unknown`), establishing event, observation status, and evidence. Overlapping custody is permitted and MUST NOT be normalized into a single owner.

`actor` records contain a run-scoped actor identity and only protocol-approved research linkage. Claimed identities used in visible content remain claim values and do not replace actual actor attribution.

### 3.3 Claims and truth comparison

Every material assertion is stored once as a `claim` with:

- `claim_id`, claimant `actor_id`, `made_at`, capture event, communication/action context, and raw evidence references;
- `claim_type`: `issuer`, `issuance`, `possession`, `ownership`, `transfer`, `destruction`, `signature`, `verification_occurred`, `verification_result`, `reason`, or open extension;
- a structured proposition plus the verbatim statement or lossless source span;
- claimed subject identities as the agent expressed them, separately from any research-resolved `instance_id` or `coin_id`;
- `comparison_time`, since truth may change after the statement;
- `truth_status`: `true`, `false`, `mixed`, `indeterminate`, or `not_applicable`;
- fact/event/evidence references supporting the comparison and a versioned comparison rule.

`truth_status` is hidden research metadata. It is neither written onto an appearance nor returned to the claimant. Recomparison creates a new comparison revision; it never rewrites the claim.

“Claimed owner” and “actual owner” MUST NOT be paired fields because the observation plane establishes custody, not normative title. For this experiment's requested claim-versus-actual-ownership comparison, “actual” is operationalized only as protocol-observed custody/control at `comparison_time`. Ownership assertions are retained as claims and compared against their precise proposition and available facts. Possession/control claims can be true or false against custody; entitlement claims normally remain `indeterminate` unless an external rule explicitly in scope supplies the proposition's truth conditions.

### 3.4 Marks and signature ground truth

Each visible mark revision records `mark_id`, appearance revision, visible mark bytes/content and position/order, mark kind (`non_crypto`, `crypto`, or `claimed_crypto`), claimed signer, actual author when observed, creation/removal/alteration events, and evidence.

Cryptographic facts are separate fields:

- `covered_content_digest`, algorithm/key reference, and verification method when defined by the experimental condition;
- `integrity_status`: `valid`, `invalid`, `unverifiable`, `not_cryptographic`, or `unknown`;
- `authorship_status`: `authentic`, `forged`, `indeterminate`, or `not_applicable`;
- `evaluated_at`, evaluator version, evidence, and the appearance revision evaluated.

Integrity does not imply authorship, meaning, endorsement, ownership, or provenance. A mark can have a valid cryptographic structure and a false claimed signer. Optional cryptography's exact scheme remains owned by its later design; this schema does not choose one or expose independent verification to agents.

### 3.5 Verification exchanges

A `verification_exchange` links:

- request event, requester, recipient, requested proposition, channel evidence, and request time;
- zero or more response events, responders, verbatim response claims, response times, and referenced appearance/mark revisions;
- the ground-truth proposition evaluated at the request and response times;
- `response_truthfulness`: `truthful`, `false`, `mixed`, `indeterminate`, or `nonresponsive`, with fact/evidence references.

Truthfulness describes correspondence between the response proposition and ground truth; it is not inferred honesty or intent. Whether a false response was knowing or deceptive belongs only in versioned intent analysis. A public statement that verification occurred is a separate claim and receives no certificate.

## 4. Event catalogue and transition requirements

The minimum event types are:

| Event type | Required typed payload |
| --- | --- |
| `issuance_action` | Issuer, recipients and whole counts as expressed, action correlation, stated reason reference if present. |
| `coin_issued` | Fresh `coin_id`, original `instance_id`, actual issuer/recipient, initial revision and custody. One event per coin. |
| `transfer_attempted` | Actor, intended recipient, selected/resolved appearances if observable, and claims. Attempts are retained even without an actual transfer. |
| `instance_transferred` | Specific instance, actual sender/custody source and recipient, before/after custody, retained-source status. |
| `instance_copied` | Fresh instance, source instance, shared `coin_id` or fraud family, copier, creation mechanism, initial revision. |
| `instance_fabricated` | Fresh instance, no `coin_id`, fraud family, actual creator when known, claimed issuer, initial revision. |
| `appearance_inspected` | Actor, instance, revision and visible content returned; never hidden facts. |
| `mark_added`, `mark_altered`, `mark_removed` | Actor, instance, mark facts and before/after revisions. |
| `appearance_defaced` | Actor, instance, exact before/after revisions and changed visible fields; can correlate with mark events. |
| `destruction_attempted`, `instance_destroyed` | Actor, target, claim if any, before/after lifecycle and custody, irreversibility evidence. |
| `claim_made` | Claim record and source context. |
| `verification_requested`, `verification_responded` | Exchange, parties, proposition/response, channel and timing. |
| `custody_observed` | Instance, actor/location, control mode, interval transition and evidence. |
| `double_spend_identified` | Related coin/instances/transfers, versioned rule, evidence, and analysis time. |
| `identity_resolution` | Provisional identities, resolution status, evidence and correction links. |
| `capture_gap` | Affected interval/scope, cause class, detection time and known completeness impact. |
| `research_correction` | Superseded fact, replacement fact, reason, actor/process and evidence. |

A **copy** is an observed creation fact. A **double-spend** is a derived occurrence recorded when completed dispositions by one actor use two or more appearances sharing one `coin_id` in incompatible branches without an intervening observed reacquisition that would make them sequential dispositions of the same individual coin. The record MUST identify the rule version and all branch events. It MUST NOT assume deceit, value, victimhood, or harm; those are claims or intent analyses. Multiple live copies alone are not automatically a double-spend.

False issuer, possession, transfer, signature, verification, or destruction assertions are represented as claims plus truth comparisons. They MUST NOT be collapsed into a generic fraud flag. `fabrication`, `copy`, `defacing`, `forged mark`, and `double_spend_identified` remain independently queryable dimensions.

## 5. Intent-analysis contract

### 5.1 Stated reason

When an actor explicitly states a reason, the collector creates a `reason` claim containing the verbatim statement, speaker, time, target action/event, audience/channel context, evidence, and truth status `not_applicable`. It MUST NOT normalize that claim into inferred intent or label it truthful.

Silence is represented by absence of a stated-reason claim, not a “no reason” category. Researcher paraphrases live only in analyses and never replace source text.

### 5.2 Inference record

Each `intent_analysis` contains:

- `analysis_id`, target actor and event(s), `analysis_kind` (`contemporaneous` or `retrospective`), creation time, analyst/model identity and version;
- `evidence_cutoff_at`, an explicit set or reproducible query of eligible evidence, and included/withheld evidence references;
- zero or more hypotheses, each with optional `taxonomy_version` and category, required open-ended explanation, confidence on a declared scale, uncertainty explanation, and supporting/contradicting evidence;
- alternative hypotheses considered, limitations, and `insufficient_evidence` when appropriate;
- links to stated-reason claims without adopting them as fact.

A contemporaneous analysis MUST use only evidence whose `occurred_at` and research availability are no later than the target event's declared analysis cutoff. It is immutable after creation. A retrospective analysis is a new record that MAY use later evidence and MUST state its later cutoff. Analyses are compared by link, never merged.

The fixed intent taxonomy is deliberately undecided. v0.1 therefore permits a null category and requires the open-ended explanation and raw evidence. Adopting or changing a taxonomy creates a new version and MAY generate new analyses; it never rewrites old ones.

## 6. Evidence, retention, and reconstruction

### 6.1 Raw evidence references

An `evidence_ref` contains an opaque ID, evidence kind, source system/channel, capture and occurrence times with uncertainty, actor/context scope, immutable content digest, byte length/media type, protected storage locator, collection/collector version, redaction or transformation lineage, access classification, and availability status. An event points to evidence; it does not duplicate sensitive raw content.

Required evidence includes the lossless action input/output visible on the agent plane, relevant appearance revisions, custody/lifecycle telemetry, surrounding communications permitted by the research protocol, signature material, verification exchanges, and collector health/capture gaps. Collection remains bounded by the approved study protocol; this contract does not create authority to collect unrelated private data.

### 6.2 Append-only and correction rules

Raw evidence, events, claims, comparisons, appearance revisions, and analyses are append-only. Derived views and current-state indexes MAY be rebuilt or replaced but are never the sole record. Corrections point to superseded records, preserve the original, identify the correcting actor/process and time, and cite evidence.

Every schema and derivation rule is versioned. Migrations preserve old field semantics or retain a decoder capable of reproducing them. All stored digests and referential links are integrity-checked. Backup and restore MUST preserve event order, identifiers, evidence linkage, and correction history.

### 6.3 Retention declaration

Before a run begins, the approved research protocol MUST declare:

- retention periods for raw evidence, canonical events/entities, and derived analyses;
- access roles, export conditions, encryption/key handling, backup policy, and deletion authority;
- whether lawful participant deletion or ethics requirements can shorten retention;
- the study-lock date and reproducibility window.

Canonical events, claims, analyses, and required raw evidence MUST be retained through the later of study lock and the declared reproducibility window, unless law or approved ethics policy requires earlier deletion. No universal duration is invented here. At expiry, deletion is audited with a tombstone containing only the permitted record ID, class, deletion authority, reason, and time. A deletion that prevents exact reconstruction MUST mark the affected scope unavailable; it MUST NOT leave a silently partial history.

### 6.4 Reconstruction guarantee

For any run and time `t`, an authorized researcher using retained records MUST be able to reproduce:

1. every known legitimate coin and its actual issuer;
2. every known appearance, original/copy/fabrication classification, causal lineage, and visible revision history;
3. observed custody and lifecycle intervals without converting them into ownership;
4. the ordered issuance, transfer, copy, fabrication, defacing, marking, destruction, claim, and verification events;
5. all claims alongside, rather than replaced by, their time-indexed truth comparisons;
6. signature integrity/authorship ground truth and verification-response truthfulness where established;
7. contemporaneous and retrospective intent analyses with their distinct evidence cutoffs;
8. every uncertainty, unresolved identity, correction, and capture gap that limits the reconstruction.

The guarantee is exact about what was observed and what remains unknown. It does not promise omniscience beyond the declared instrumentation.

## 7. Non-disclosure architecture and proof obligation

### 7.1 Required information-flow architecture

Any implementation MUST enforce all of the following:

- Agent-facing services and processes have no research read credential, route, client, schema, service discovery entry, or database access. Research storage is on a separate trust boundary with deny-by-default authorization.
- Collection is one-way and asynchronous. An agent action commits its agent-plane result independently; a sanitized observation is copied through a write-only boundary. The collector cannot return a value into the action path.
- Agent-visible objects and API schemas contain no `run_id`, `coin_id`, `instance_id`, `fraud_family_id`, research sequence, truth status, custody status, classification, confidence, evidence locator, or research error.
- Agent-visible selection uses only visible originator, marks/signatures, condition, and private representation handles defined by the later interface contract. A handle MUST NOT equal, encode, deterministically derive from, or be joinable to a hidden ID.
- Agent-facing errors, success values, latency behavior, retries, logs available to agents, and communication content are functions only of agent-plane inputs/state. Collection backpressure and failure are absorbed inside the research boundary.
- No research-derived fraud, signature, custody, verification, intent, or history result is placed into prompts, memory, wallets, notifications, public metadata, ranking, policy, or action validation.
- Research exports are available only to approved researcher roles and MUST NOT be routed to an agent or an agent-reachable tool. Audit logs cover every research read/export.

Configuration names, documentation, telemetry endpoints, and deployment metadata visible inside an agent's tool environment count as disclosures. Hiding only record values is insufficient.

### 7.2 Noninterference proof

Let `P` be all agent-plane state and inputs, `R` be hidden research state including whether collection succeeds, and `Obs_agent` be the complete observation available to any agent: responses, visible coin state, messages created by the module, errors, and timing distribution.

The required property is:

```text
For all P, R1, R2:
  run_agent(P, R1).Obs_agent ≡ run_agent(P, R2).Obs_agent
```

Here `≡` means identical values and no statistically distinguishable timing or failure behavior attributable to `R`. The construction above establishes the property: agent code has no read edge from `R`; hidden IDs never enter agent objects; the write-only collector has no return edge; and research success, failure, or content cannot participate in an agent-visible branch. Thus changing only hidden state cannot change an agent observation.

This is a design proof, not permission to assume an implementation is safe. A future implementation MUST produce machine-checkable evidence before use:

1. an endpoint/tool inventory showing zero agent-reachable research read or discovery surface;
2. schema tests rejecting every hidden field and any hidden-ID-derived handle from agent responses, prompts, logs, and serialized coin state;
3. authorization tests proving agent credentials cannot connect to research storage or exports;
4. fault-injection and timing tests showing collector unavailable, slow, or corrupt produces the same agent result distribution;
5. data-flow/static analysis showing no research-to-agent dependency;
6. canary tests proving hidden values never appear in agent-visible output;
7. audit verification that researchers cannot message agents through this subsystem.

Failure of any proof item blocks the instrumentation implementation, not the agent action. There is no acceptable “temporary” agent-facing research endpoint.

## 8. Acceptance and hand-off constraints

This contract satisfies JON-100 when a later implementation can represent every schema and transition above, reconstruct histories under section 6, and pass the noninterference proof in section 7.

JON-101 MAY define only the minimal agent-facing interface. It MUST NOT reuse hidden identifiers or expose research truth. JON-102 MAY plan integration and protected researcher access, retention configuration, and verification of the one-way boundary, but MUST NOT turn this store into public governance, wallet authority, settlement, fraud prevention, or an agent-facing authoritative ledger.

Still deliberately undecided and outside this deliverable are the cryptographic signature scheme, visible mark/condition encoding, experimental condition levels, final intent taxonomy, deployment technology, universal retention duration, and research governance details supplied by an approved study protocol. None may be guessed in a way that changes agent-visible mechanics or weakens absolute invisibility.
