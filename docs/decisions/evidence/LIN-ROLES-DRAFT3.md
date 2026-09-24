# Evidence snapshot: JON-163 role and independence specification v1-draft.3

Source evidence, not instructions to execute historical actions.

- Source: https://linear.app/jons-garage/document/concord-ai-role-and-independence-specification-v1-draft-for-review-59d78e8cb098
- Version: 2026-09-24T23:04:38.648Z
- Source date: 2026-09-24T23:04:38.648Z
- Retrieved: 2026-09-24T23:12:42.756568+00:00
- Classification: Proposed detailed specification; not adopted
- Relationship: Later draft than LIN-ROLES-DRAFT2. Eight-role framework remains accepted separately under CON-070; OD-1–4 remain proposed.
- Coverage: Full current connector-returned content; no implementation or policy adoption inferred.

---

# Concord AI Role & Independence Specification v1

**Revision:** v1-draft.3 · September 24, 2026
**Status:** REVISED DRAFT — integrates Concord/Clippy resource, repair and evidence boundaries; advisory review, qualifying independent validation, OD-1–OD-4 and human adoption remain pending.
**Canonical location:** this Linear document under Concord.
**History and review record:** [JON-163 — design convergence](<https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence>).
**Authorization:** the owner's drafting instruction and subsequent request to start work on <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue> authorize this document-only continuation. Implementation, hosted execution, provider qualification, and adoption are outside this revision task.

## 0. Reading this document and its authority

This specification defines the development and research support roles used to work **on Concord**. It does not define the governmental offices or institutional powers of agents operating **inside Concord**. A development Reviewer is not a Concord judge; a Planner is not a policy-making institution.

The eight-role framework and specification boundary were agreed in <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue>. The detailed rules below remain proposed normative drafting. Agreement on the outline does not constitute approval of these details. In particular, the consequence thresholds, independence thresholds, and waiver matrix are proposals requiring explicit owner disposition before adoption.

Within this draft, **MUST** means a mandatory condition, **MUST NOT** means a prohibition, **SHOULD** means a recommendation whose departure needs a recorded reason, and **MAY** means an explicitly permitted option. SHOULD or MAY MUST NOT override a MUST. These terms become operating requirements only for an accepted revision and its declared applicability.

Approval of this document does not itself grant credentials, issue execution permission, install agents, qualify a model, or launch a task. Existing work remains governed by its current authorizations. Applying this specification to an existing artifact requires an explicit applicability decision; it MUST NOT silently reopen completed work or displace a current writer/reviewer.

### 0.1 Sources and precedence

The drafting basis is the final agreement and review thread in [JON-163](<https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence>), including Linear's framework-convergence reply of September 24, 2026, comment ID `b6f2133e-0cd3-46cd-a187-bf3c36d281ef`.

The [Mandatory Project Execution Safety Rule](<https://linear.app/jons-garage/document/mandatory-project-execution-safety-rule-af44c319d2b8>) and the [Workspace Linear operating policy](<https://linear.app/jons-garage/document/workspace-linear-operating-policy-native-workflow-61bf7beb7994>), including its external-system invocation boundary, remain applicable. Later explicit owner instructions control scope; an AI interpretation is not an owner amendment. A conflict affecting authority, independence, or safety MUST be recorded and escalated rather than silently resolved in favor of broader permissions.

### 0.2 Scope

In scope: eight Role Cards; reserved human authority; contribution and lineage records; consequence classification and routing; independence eligibility; evidence requirements, retention, and freshness; Integrator admission; bounded human exceptions; controlled amendments; review and adoption of this specification.

Out of scope: provider research, provider/model selection, model qualification or scoring, provider-specific tooling, agent installation/implementation, dispatch services, operational automation, Coding Sessions, Loops, purchases, deployments, and changes to Concord's substantive governing decisions. Examples below are specification consistency cases, not model benchmarks.

## 1. Human authority and common role boundaries

**HA-01.** Human owners retain goal/scope changes, adoption of implementation contracts, final acceptance, risk acceptance, merge authorization, deployment authorization, and amendment of governing decisions. Agents MAY propose those decisions but MUST NOT represent proposals as human approval. A review PASS is an evidence conclusion, not acceptance or a merge/deployment instruction.

**HA-02.** The eight roles are Planner, Builder, Reviewer, Verifier, Security/Governance Reviewer, Researcher, Integrator, and Release Steward. Roles describe capabilities, not additional management authority. No Supervisor, Dispatcher, Manager, or other ninth role is introduced here. One model may perform several roles on eligible, separately scoped work; changing its role does not erase prior contributions.

**HA-03.** Every task MUST identify its human accountable owner, deliverable, permitted writes, applicable policy revision, consequence classification, evidence requirements, and escalation destination. An agent MUST NOT self-expand those limits. A role description is an upper bound, not a credential grant. Effective permissions MUST be limited by the intersection of the Role Card, explicit task authorization, and actual tool/runtime controls. Unexpected broader access MUST NOT be used.

**HA-04.** Reports, logs, review findings, and other designated evidence outputs may be written where authorized even when implementation writes are prohibited. Read-only review MUST NOT be implemented merely by telling an unrestricted shell not to write. Any execution needed for review or verification requires a bounded environment with approved scratch/output locations and no unauthorized source, credential, network, or production access. This is a requirement on future execution; this document does not implement that environment.

**HA-05.** Only one active Integrator may write to Concord's designated shared integration target at a time. Builders may write separately authorized branches/components without overlapping ownership. Existing integration ownership is preserved until explicitly reassigned. An Integrator may prepare a shared candidate but cannot authorize merging it into the protected release/main target or deploying it.

**HA-06.** Missing scope, missing evidence, blocked permissions, or unclear authority MUST produce a visible BLOCKED result, not a substitute execution path. Agents MUST NOT enable paid services, Coding Sessions, Loops, credits, broader access, or delegation merely to get around a limitation.

**HA-07.** A successful connector/API/MCP operation proves only the operation actually performed. Handoff creation, agent invocation, execution, review, and acceptance are distinct events. A comment, mention, assignment, or status change MUST NOT be reported as agent execution or agreement without a returned response or verifiable execution record. Silence is not approval. A native-UI action still required from the owner MUST be stated plainly.

## 2. Shared Lineage & Independence Contract

### 2.1 Unit of assessment

**LI-01.** Independence is assessed for a specific validation claim about a specific artifact revision under a specific policy revision. It is not a permanent quality of a role name, provider, account, or agent.

An artifact may be code, a plan, architecture, requirements, a test strategy, a research memo, a review report, an integration result, or a release package. Repository artifacts MUST identify the repository, base and head commits, covered paths/commit range, and any uncommitted changes. A non-code artifact MUST identify its canonical document/record, revision, exact reviewable content snapshot or content digest, and dependencies. Branch names, mutable titles, and links alone are insufficient version evidence.

The validation target MUST include governing inputs that materially determine the claim: relevant requirements, architecture, security assumptions, tests/oracles, and derived evidence. Evidence for one subset MUST NOT be generalized to the entire artifact.

### 2.2 Required lineage record

**LI-02.** Each contribution and validation attempt MUST record the following. Unavailable information MUST be marked UNKNOWN with a reason; it MUST NOT be invented. NOT APPLICABLE requires an explanation.

| Field | Required content |
| -- | -- |
| Record and task identity | Unique work-record identifier, date/time, canonical issue, artifact identifier, human accountable owner |
| Model provenance | Actual provider, model family, reported model/version identifier, and the basis for each assertion; distinguish an alias from an immutable version |
| Agent/session identity | Actual app-user/client identity, available runtime session/run identity, parent/subagent relationships, and whether an identifier is only a locally assigned record label |
| Role at contribution | Role occupied during each relevant contribution, including previous roles |
| Contribution history | Direct and indirect contribution to requirements, plans, architecture, assumptions, code, tests, prior reviews, or derived artifacts; include links and scope |
| Artifact provenance | Repository/branch/base/head/commit range and relevant paths, or document/revision/content snapshot for non-code work |
| Context and dependencies | Governing input versions, instruction/role-card versions, task-specific shared prompts/context, reused conclusions, relevant memory, and artifact dependencies |
| Tools and permissions | Tools available, effective permissions granted, tools/operations actually used, relevant runtime/environment configuration, and any permission changes |
| Shared provenance | Known common model ancestry/fine-tuning where relevant, orchestration, operator influence, mutable workspace, credentials, memory, tool configuration, and reused derived evidence |
| Evidence and conflicts | Evidence references, provenance basis, disclosed uncertainty/conflicts of interest, consequence classification, and the independence decision with reason codes |

**LI-03.** Identity and permissions SHOULD be supported by service/runtime/tool records rather than an agent's assertion alone. The record MUST distinguish observed evidence, self-reported information, and unavailable information. A changed app-user display name, new chat, provider endpoint, or role card MUST NOT erase a contribution history. Parent/subagent contributions and transferred memory MUST be traced when they influenced the target.

Only materially relevant provenance is required for a particular gate. The independence decision MUST declare which fields are required and why. Unknown required lineage fails that gate; unknown irrelevant details MUST NOT be used to claim diversity. Undisclosed training data is not treated as known separate provenance merely because providers differ.

### 2.3 Prior contribution and indirect influence

**LI-04.** A material contribution includes authoring or changing a governing requirement, acceptance criterion, architecture, security assumption, implementation, authoritative test oracle/test strategy, or evidence conclusion that the candidate would subsequently validate. Supplying those through a subagent, shared memory, copied solution, or task-specific instruction also counts. Changing provider or session does not remove the influence.

Reading the same accepted requirements and inspecting the same artifact is necessary for review and is not, by itself, authorship. Common generic role instructions, a human owner who only supplies scope, or a common test runner do not automatically disqualify a candidate. Their influence MUST be recorded and evaluated. An operator supplying a desired answer or a solution derived from the producer is materially different from merely assigning a task.

**LI-05.** Prior material contribution creating self-validation disqualifies a candidate before provider diversity can help. A contributor MUST NOT independently validate its own artifact, plan, tests, or evidence; nor validate another artifact whose governing claim materially relies on its own material contribution, whether or not that contribution was separately reviewed or accepted.

A Reviewer may report a defect or request evidence without thereby becoming the implementer. If it designs the fix, rewrites acceptance criteria, supplies the authoritative oracle, or edits the implementation, that contribution MUST be added and eligibility reassessed. Rechecking its prior findings is a continuation of the same review lineage, never a new independent review. A Reviewer cannot fill the separate Verifier slot for that artifact; a Verifier cannot independently endorse its own verification evidence. Doubt about material influence blocks qualifying validation until resolved.

Observations and supplemental tests generated during an authorized independent assessment are outputs of that assessment, not retroactive authorship of the production artifact. They MUST be recorded as validator-authored evidence, not separately represented as independently validated by their author. Changing the governing oracle, accepted specification, or implementation crosses into a material production contribution and requires reassessment.

### 2.4 Decision and integrity requirements

**LI-06.** Required separation is consequence-dependent. Same-provider/different-session validation is conditionally eligible, never automatically independent. Different providers are also not sufficient by themselves. A wrapper or reseller around the same model family does not establish separate model ancestry.

**LI-07.** Eligibility MUST be evaluated before a candidate is given authority to produce qualifying validation, using the target's validated consequence level and the routing table. A candidate's self-declaration is evidence to inspect, not authorization. A candidate MUST NOT be the sole authority approving its own eligibility. A named authorized human or noncontributing review actor must attest the decision; this uses an existing responsibility rather than creating a new management role. The decision record MUST name the target, claim, applicable policy, classification, candidate, relevant producers, prior-contribution check, shared provenance, missing fields, conclusion, deciding actor, and evidence references.

An eligibility-deciding actor MAY subsequently serve as Reviewer, Verifier, or Security/Governance Reviewer only if independently eligible for that specific lane. Its own lane eligibility MUST be attested by another authorized deciding actor under this clause; deciding another candidate's eligibility does not approve its own. Both decision records MUST remain separately reviewable. Eligibility attestation alone does not fill a validation lane, and the separate-execution restrictions in RT-03 still apply.

**LI-08.** A failed independence gate prohibits counting the output as independent validation. It does not prohibit explicitly authorized collaborative review, investigation, or advisory feedback. Such output MUST be labeled non-independent/advisory, and MUST NOT silently satisfy a mandatory independent gate.

**LI-09.** Provenance records and decision corrections MUST be append-only in meaning: preserve the original record and add a superseding entry with reason, actor, and time. Required evidence MUST remain available for as long as any decision or supported release relies on it. Deletion, redaction, migration, or access loss requires an impact assessment and must not leave a gate relying on unverifiable evidence. Restrict sensitive raw records; retain access-controlled verification references without putting secrets or unrelated personal data in public comments. No current storage is claimed to be cryptographically immutable merely because it is in Linear.

**Retention readiness — proposed OD-4.** Before adoption, the owner MUST record a retention-system decision naming the accountable custodian and locations for preserved revisions, append-only contribution/decision history, content digests or exact snapshots, access-controlled evidence references, and exception expiry/revocation records. The decision MUST specify access, correction, retrieval, migration and access-loss handling, and include inspectable evidence that the chosen process can preserve and retrieve the required records. An authorized manual process may suffice; this clause does not require a new service or authorize implementation. Until that decision and evidence exist, retention readiness remains unresolved.

## 3. Consequence classification — proposed normative baseline

The thresholds and floors in this section are **Owner Decision OD-1**. They are proposed for review, not previously approved decisions.

**OD-1 proportionality question.** The owner must explicitly decide whether every L1 artifact requires both qualifying assessment lanes shown below, or whether a precisely bounded alternative is justified for reversible descriptive work. Claim-bounded source/identity/consistency checks already qualify as non-code Verifier methods under EV-01; they do not remove the separate Verifier actor. Any proposal to combine or omit a lane must define eligible claims and exclusions and reconcile LI-05, RT-03, Role Cards, and the waiver matrix before adoption. This revision retains the two-lane proposal; it does not approve a shortcut.

**CC-01.** Classification MUST reflect the effect of an incorrect artifact or decision, not its file type, task size, cost, urgency, or author's confidence. The highest applicable trigger governs. A small policy change can be High consequence; a long descriptive report is not automatically High.

| Level | Objective trigger | Minimum controls |
| -- | -- | -- |
| L1 — Low | Non-executable, reversible presentation or descriptive work that does not alter governing requirements, security assumptions, substantive behavior, protected data, or acceptance criteria | Accepted scope; versioned artifact and lineage; independent Reviewer; separate Verifier evidence appropriate to the claim; human final acceptance |
| L2 — Medium | Executable behavior, interfaces, dependencies, architecture, authoritative technical plans, research used as an implementation basis, test strategies/oracles, or integration preparation, without an L3 trigger | L1 controls; reviewed implementation contract; claim-to-evidence coverage; separate qualifying Reviewer and Verifier; bounded execution and regression/impact evidence; security review when the scope affects a security/governance boundary |
| L3 — High | Authorization, identity, privileges, capability lifecycle, institutional/governing rules, protected or sealed data, authoritative state transitions, irreversible/destructive effects, security assumptions, release/deployment admission, or this specification's authority/independence controls | L2 controls; mandatory qualifying Security/Governance Reviewer; stricter separation in section 4; explicit named-human acceptance of the exact candidate; no waiver of security/authority or required independent-validation gates |

**CC-02.** Minimum floors are: implementation architecture L2; security/governance architecture and security assumptions L3; shared integration admission at least L2 and never below its highest component/dependency impact; protected merge admission at least L2, or L3 for an L3-triggering change; production release/deployment admission L3. This specification and substantive amendments to it are L3. A draft may be discussed before satisfying its acceptance gates, but MUST NOT be treated as an approved implementation contract.

**CC-03.** A contributor MAY propose a classification and rationale but MUST NOT be the sole classifier of its own artifact. A noncontributing Reviewer, Security/Governance Reviewer, or appropriately authorized noncontributing human MUST confirm the applicable triggers/floors. This confirmation is part of those existing responsibilities, not a new role. The record MUST identify proposer, confirmer, trigger, affected claims, dependencies, and policy revision. Human ownership alone is not an independent classification check.

**CC-04.** Conflicting classifications MUST be escalated to the human owner with the evidence. Pending resolution, the higher credible level governs permitted assessment, but normal admission remains blocked. Missing classification is UNKNOWN, not Low. No contributor or Integrator may lower the level to obtain an available reviewer or avoid a gate. A human resolution MUST follow the normative triggers; changing a trigger/floor requires a controlled amendment.

**CC-05.** Separately bounded artifacts MAY have different levels when their interfaces and claims are explicitly separable. Splitting a change into sub-issues MUST NOT hide combined effects or reduce the integration-level controls. Plans and tests that determine a High-consequence behavior inherit that consequence for the relevant claims.

## 4. Normative routing decision table

The precise separation thresholds in this section are **Owner Decision OD-2**. They operationalize the frozen principles without assigning any provider to a role.

### 4.1 Decision procedure

**RT-01.** Before qualifying validation, the deciding actor MUST:

1. Identify the exact artifact, claim, relevant production/dependency lineage, applicable policy, and confirmed consequence level. Unresolved classification blocks admission.
2. Check direct/indirect prior material contribution. Disqualifying self-validation fails immediately, regardless of provider diversity.
3. Check required lineage completeness and authenticity. UNKNOWN or unverifiable required facts produce BLOCKED, not presumed independence.
4. Evaluate session/agent identity, shared model family/provider, transferred memory/context, derived conclusions, operator influence, and other materially shared provenance.
5. Apply the level-specific threshold below and the Role Card restrictions. A failed earlier rule cannot be repaired by a later row.
6. Record ELIGIBLE, DISQUALIFIED, or BLOCKED with the exact scope, evidence, limitations, and reason. Conditional cases MUST be resolved by an explicit recorded decision before an output can count as qualifying evidence.

ELIGIBLE means permitted to perform the specified independent assessment; it does not mean the artifact passed. DISQUALIFIED identifies a known conflict or insufficient separation. BLOCKED identifies insufficient evidence, classification, authorization, or unresolved uncertainty.

### 4.2 Routing matrix

| Candidate condition | L1 | L2 | L3 |
| -- | -- | -- | -- |
| Material contribution to the target claim or its governing requirements/plan/code/tests/security assumptions | DISQUALIFIED | DISQUALIFIED | DISQUALIFIED |
| Same contributing execution/session, including a role change or renamed identity | DISQUALIFIED | DISQUALIFIED | DISQUALIFIED |
| Required lineage, classification, or relevant contribution history unknown/unverifiable | BLOCKED | BLOCKED | BLOCKED |
| Different session, same provider and model family; no prior contribution or disqualifying shared context | Conditionally eligible after documented isolation/provenance check | Insufficient as the sole qualifying validator; advisory only | Insufficient as the sole qualifying validator; advisory only |
| Different session and model family, same provider; no prior contribution or disqualifying shared context | Conditionally eligible | Conditionally eligible only with an explicit routing rationale confirming materially separate work/context | Insufficient as the sole qualifying validator; advisory only |
| Different provider but same underlying model family or materially inherited producer context | Apply same-family rule; transferred material contribution disqualifies | Apply same-family rule; transferred material contribution disqualifies | Insufficient; a reseller/provider name change does not establish separation |
| Different provider and model family, separate execution, no prior material contribution, sufficient lineage, no disqualifying shared context | Eligible subject to Role Card and task authorization | Eligible subject to Role Card and task authorization | Eligible subject to Role Card and task authorization |
| Shared repository snapshot, generic role instructions, or approved test-runner implementation only | Not automatically disqualifying; assess contamination and conflicts | Same | Same |
| Current Reviewer proposed as the separate Verifier, or vice versa, for the same artifact | DISQUALIFIED for the second independent slot | DISQUALIFIED for the second independent slot | DISQUALIFIED for the second independent slot |
| Valid human exception for a permitted missing coverage item | Does not change independence eligibility | Does not change independence eligibility | Does not change independence eligibility |

**RT-02.** These comparisons are made against every materially relevant contributing lineage, not just the last code author. A provider-diverse reviewer who authored the plan fails. An eligible reviewer for one component is not automatically eligible for the combined integration result.

**RT-03.** Reviewer, Verifier, and required Security/Governance Reviewer MUST be separate assessment executions/actors for the same artifact. They MUST NOT consume one another's conclusions as a substitute for their own initial assessment. Findings may be reconciled afterward with the exposure recorded. Multiple reports from one shared execution are one evidence lineage, not multiple independent validations.

Distinct validating actors do not automatically require three different vendors. The model-family/provider threshold is applied against material contributors for each target claim. Shared provenance between validation actors MUST still be assessed and recorded; no one may claim they are statistically independent merely because the routing gate passed. A Verifier checking a Reviewer's report as a separate artifact is evaluated against that report's own production lineage.

**RT-04.** Human approval is not independent validation. A noncontributing human may perform a documented review/verification duty when specifically authorized for that scope; contribution, evidence, and conflict rules still apply. Provider/model fields are NOT APPLICABLE for the human's own assessment, with any AI assistance recorded and evaluated. A human rubber-stamping a conflicted model's conclusions is not a new independent evidence path.

**RT-05.** When no eligible candidate is available, the qualifying gate remains blocked. Availability, expense, urgency, a role rename, or selecting another provider MUST NOT justify relabeling conflicted work. Additional non-independent advisory work may proceed only within its own authorization.

## 5. Common evidence, freshness, and output contract

### 5.1 Evidence package

**EV-01.** Every deliverable MUST contain: task/scope reference; applicable policy/Role Card version; classification; artifact revision; contributor lineage; claims and governing requirement references; underlying evidence; limitations and missing coverage; dependencies; result; next required human/review action. Validation deliverables additionally MUST include the pre-assessment independence decision and the actual permissions/tools used.

Executable evidence MUST identify commands, working revision, environment/dependency/tool configuration, start/end time, exit status, full relevant output, skipped or filtered tests, and changed files. A count such as 'all tests passed' without commands and underlying output is insufficient. Tests written by the Builder may be reproduced, but passing them alone does not establish that their oracle or requirement coverage is correct.

Non-code verification MUST use appropriate evidence such as source-to-claim tracing, version comparisons, contradiction checks, requirement coverage, and worked decision cases. It MUST NOT fabricate command logs or test counts for document review.

Every validator-authored supplemental test or observation MUST identify its author and exact evidence revision, target artifact/revision, claim being checked, governing requirement and oracle basis (with source/version), observed result, and scope limitations. The package MUST distinguish reproducing an accepted oracle from authoring or changing that oracle. A governing-oracle change triggers LI-05 reassessment; linking a supplemental check does not independently certify that check or its author.

**EV-02.** Findings MUST identify the affected requirement/claim, artifact location, supporting evidence, consequence, and disposition. Reproducible defects and unresolved assumptions MUST be distinguished. A role cannot dispose of a blocking finding merely by changing a label. Corrections require fresh evidence and the appropriate independent confirmation.

### 5.2 Evidence freshness

**EV-03.** Evidence is valid only for its recorded coverage and dependencies. It MUST be re-evaluated when any of the following materially changes: artifact content or covered commits; governing requirements/architecture/policy/security assumptions; relevant tests/oracles; execution environment/tool configuration; model/context/lineage facts affecting the independence decision; consequence classification; or another relied-upon dependency. Discovery of inaccurate provenance also triggers re-evaluation.

**EV-04.** Carry-forward requires a recorded impact assessment by an eligible noncontributing reviewer. The record MUST identify old/new versions, changes, affected and unaffected claims, supporting comparison, and the basis for preserving any evidence. Unchanged evidence for unaffected claims may be carried forward with an explicit mapping. Affected claims require new validation. Broad changes, uncertain impact, or unreliable provenance require revalidation of all potentially affected claims. A Builder or Integrator's assertion that a change is harmless is not enough.

A different commit hash does not automatically invalidate every unchanged claim, and an unchanged filename does not preserve evidence. Material dependency changes govern the decision. The proposed v1 policy uses dependency-based freshness, not an invented universal age limit. Time-limited exceptions and other explicit expiry conditions still apply.

**EV-05.** An integration result is a new artifact. Component evidence may be carried forward only where the impact assessment supports it. Conflict resolutions or combined behavior require fresh review/verification of the affected result before protected merge or release. The Integrator cannot independently validate its own reconciliation.

### 5.3 Outputs and status language

**EV-06.** Role outputs use DELIVERED, PASS WITHIN SCOPE, FAIL, or BLOCKED as appropriate, with precise coverage. A PASS MUST NOT imply human acceptance, deployment readiness beyond scope, or an independently validated result when required gates are missing.

Admission records use NORMAL-ADMISSIBLE, EXCEPTION-AUTHORIZED / NOT FULLY VALIDATED, or BLOCKED. These are evidence dispositions, not new Linear workflow states or instructions to automatically change issue status. An artifact with missing evidence MUST NOT receive a misleading 'pass with exceptions' label that obscures an unsatisfied mandatory gate.

### 5.4 Resource and correction boundaries — proposed integration of Clippy learning

The owner authorized starting the Concord/Clippy integration proposal on September 24, 2026. WF-01–WF-06 add proposed duties and evidence boundaries to this draft; they do not adopt a budget, install an executor or prescribe a dispatcher protocol. The detailed execution mechanics listed in section 12.3 are deferred to a separately authorized execution contract. The eight roles and OD-1–OD-4 remain unchanged.

**WF-01 — Shared objective allowance.** Before a covered execution is authorized, its work package MUST identify a stable objective ID, applicable aggregate allowance and units, consumed/reserved balance, accounting coverage and unknowns, and the named human authority for changes. All attributable parent work, planning, research, consultation, implementation, review, verification, security assessment, integration, packaging and repairs MUST share that allowance. Session, role, issue, filename, provider or restart changes MUST NOT renew it. Required assessment capacity MUST be reserved before implementation consumes the available allowance. Owner idle time between completed runs is excluded. Accounting MUST distinguish direct observations, estimates and reservations, reconcile overlap without counting inherited cumulative telemetry twice, and preserve unknown usage as unknown. A future contract choosing role-time MUST define how simultaneous actor intervals are charged; overlapping observation of the same activity is not a second activity. Missing usable allowance blocks allowance-dependent execution, not an already authorized document discussion under the current first-adoption baseline. This draft cannot retroactively authorize or debit work under an unrelated project allowance.

**WF-02 — Bounded evidence-driven correction.** An accepted implementation contract MAY preauthorize one targeted correction per stable defect signature, inside its unchanged remaining aggregate allowance. Eligibility requires an independently evidenced, reproducible in-scope failed criterion, a concrete corrective hypothesis, preserved starting revision/rejection, and enough capacity for required reassessment. The Builder develops and implements the hypothesis; a Reviewer may identify a defect without designing its fix. If any validator materially designs the fix or changes a governing oracle, LI-05 requires eligibility reassessment for affected claims.

Within that preauthorization, a qualifying correction does not require repeated human permission or a new planning cycle. The eligible Reviewer rechecks the defect and affected criteria as continuation of its existing lineage; a separate Verifier reproduces relevant claims; required Security/Governance Reviewer coverage remains. A correction creates a new artifact, so EV-03–EV-05 apply. Final acceptance remains human under HA-01; Clippy's delegated QA acceptance does not transfer.

Stop correction attempts for a repeated failed hypothesis, no measurable improvement against the failed criterion, exhausted allowance, absent concrete hypothesis, an unmet external prerequisite, or changed scope, criteria, cost, access, security or authority. A new label or cosmetic variation does not reset the defect signature or allowance. A materially different hypothesis requires new evidence and a fresh eligibility decision within the existing contract; it does not grant an additional correction automatically. If the contract's correction entitlement is spent, another attempt needs an explicit bounded human authorization without an implicit allowance increase. Scope/architecture/criteria ambiguity returns to planning; an ordinary known defect does not. This clause grants no correction authority before the applicable contract is adopted and the work authorized.

**WF-03 — Evidence and execution states.** Reports MUST distinguish responsibility, template, actual executor identity, verified capability/access, invocation, observed run, assessment, human acceptance and operational activation. Evidence MUST name the revision, environment, observation time and scope that it establishes. A role label, installation, passing fixture, connector write or saved decision MUST NOT substitute for another state. Historical rejected and inconclusive receipts MUST be retained with explicit supersession; a current summary MUST identify the latest supported disposition. These are evidence states, not new Linear statuses, and HA-07 continues to govern external invocation claims.

**WF-04 — Honest enforcement scope.** Any future execution contract MUST declare its controlled launch routes, bypasses and unknown coverage, and the evidence required before claiming enforcement or activation. Interactive clients, native collaboration, arbitrary shell/direct scripts, remote asynchronous jobs and other projects are not automatically controlled by a local ledger. Instructions, concurrency caps and token telemetry MUST NOT be represented as a hard subscription-credit cap. Development acceptance MUST NOT be reported as operational activation. Implementation mechanisms and tests belong to that later contract; this role specification neither installs nor requires a particular supervisor, scheduler or webhook service.

**WF-05 — Management responsibility.** Linear remains the management record for scope, accountable ownership, real dependencies, decisions and issue state. Any local execution ledger MUST remain limited to technical execution records and evidence references rather than duplicating project management. Authorized existing roles may maintain their work records; this does not create a ninth Coordinator/Dispatcher/Manager role or grant cross-project choreography. Material management changes require applicable owner authority and Linear consultation; routine application of accepted rules does not require repeated endorsement. Consultation is advisory where the consulted actor contributed to the design and cannot satisfy an independent gate. A status label alone is not evidence of readiness or acceptance.

**WF-06 — Reuse and retention.** Fresh matching evidence SHOULD be reused rather than repeating broad collection without a changed claim or unresolved risk. Any carry-forward MUST satisfy EV-04's eligible noncontributing impact assessment and exact claim/version mapping; new or affected claims require reassessment. Records MUST distinguish source facts, inference, proposals and unknowns. OD-4 MUST establish inspectable preservation/retrieval readiness for the actual evidence relied upon. A local hash/snapshot proves an identified copy exists, not protected retention, independent validation or full adoption readiness. No existing or completed work becomes subject to this proposed revision without CH-02's applicability and transition decision.

## 6. Eight Role Cards

All cards incorporate sections 1–5, including the full lineage fields and evidence contract. Permissions below are maximum capabilities, exercised only under explicit task authorization. No card grants access simply because a model is assigned to it.

### RC-01 — Planner

**Purpose.** Translate an accepted human goal into a proposed architecture, bounded implementation scope, interfaces, invariants, dependencies, and acceptance criteria. Architecture is included; no separate Architect role is created.

**Inputs.** Accepted goal and decision references; current source requirements; existing architecture/artifacts and ownership; constraints; unresolved decisions; proposed or confirmed consequence classification.

**Permissions and tools.** Read authorized Linear/project/repository/reference material; create or edit designated planning documents; propose issue breakdowns, criteria, and dependencies; record questions. Creating or changing actual issue scope requires the corresponding task authorization.

**Prohibited actions.** Production-code changes, widening scope, changing governing decisions, lowering consequence floors, approving its own architecture, marking its proposal accepted, merge or deployment. A plan cannot authorize its own implementation.

**Required evidence.** Requirement-to-design mapping, source decision references, alternatives and rationale, interface/invariant definitions, dependency and impact analysis, explicit assumptions, proposed classification and independent confirmation requirements, testable acceptance criteria.

**Required output.** A versioned PROPOSED IMPLEMENTATION CONTRACT with boundaries, open issues, required review lanes, and human decisions. It becomes an accepted contract only after qualifying independent review, resolution of mandatory findings, and human adoption of the exact revision.

**Escalation.** Conflicting owner decisions, missing requirements, changed scope, unresolved safety/authority assumptions, unavailable qualifying review, or classification disagreement.

**Independence restrictions.** The Planner cannot independently validate its plan or downstream claims materially determined by it. Ordinary architecture requires Reviewer review; security/authority-sensitive architecture also requires Security/Governance Reviewer review. Later role changes retain the planning contribution.

**Lineage recorded.** Common record plus authored requirements/criteria, plan revision, assumption/interface contributions, inherited sources, and all downstream artifacts relying on them.

### RC-02 — Builder

**Purpose.** Implement the exact approved, bounded contract and produce inspectable code and evidence.

**Inputs.** Human-authorized scope; reviewed/adopted contract and criteria; repository/base commit; assigned branch/component; confirmed consequence; permission limits; required verification commands and deliverables.

**Permissions and tools.** Read authorized project context; edit only assigned implementation/test/documentation paths; run approved tools/tests in the bounded environment; commit/push the assigned branch and prepare a draft pull request when specifically authorized.

**Prohibited actions.** Shared integration/protected-branch writes outside its scope; merging/deploying; self-acceptance; changing the approved contract or weakening tests to conceal failure; altering review/evidence records; using unrelated credentials/data; overlapping another writer's scope.

**Required evidence.** Exact base/head and diff; requirement-to-change mapping; test additions and provenance; commands, outputs, skipped tests, environment and exit status; deviations, remaining defects, and changed dependencies.

**Required output.** BUILDER ARTIFACT plus evidence package. Delivery states what was built and tested; it does not certify independent validation or acceptance.

**Escalation.** A required design/scope change, contract contradiction, unavailable dependency, unexpected permissions, unsafe side effect, failing required test, or branch ownership conflict.

**Independence restrictions.** Cannot independently review/verify/security-validate its own changes or tests, or approve their admission. Its own tests and explanations are producer evidence to be inspected, not independent evidence.

**Lineage recorded.** Common record plus code/test authorship, commit range, generated code sources, subagents, authoring context, dependencies changed, and actual filesystem/Git/network operations.

### RC-03 — Reviewer

**Purpose.** Assess whether a proposed plan or implementation satisfies its governing requirements, including completeness, consistency, and whether the evidence actually supports its claims.

**Inputs.** Exact review target, accepted upstream requirements, relevant decisions, complete diff/document revision, tests and evidence, classification, disclosed producer lineage, and recorded eligibility for this assessment.

**Permissions and tools.** Read authorized target/history/context; inspect underlying evidence; run approved bounded checks in an isolated environment; write findings and review reports. The working source stays unchanged; permitted scratch/output writes are recorded.

**Prohibited actions.** Editing the implementation or governing requirements it reviews; becoming a hidden coauthor of fixes; merging/deploying; human acceptance; reviewing its own contributions as independent; replacing missing evidence with confidence or another review's conclusion.

**Required evidence.** Requirement/claim coverage matrix, inspected locations and versions, concrete findings with reproduction or source evidence, test adequacy assessment, scope exclusions, and its own independence decision.

**Required output.** REVIEW REPORT: PASS WITHIN SCOPE, FAIL, or BLOCKED, with findings, limitations, and required follow-up. A plan review and an implementation review are separately scoped artifacts, not one transferable approval.

**Escalation.** Ambiguous requirements, material self-contribution, inability to inspect evidence, policy conflicts, uncovered high-impact behavior, or uncertainty about the review target.

**Independence restrictions.** Cannot be its target's contributing Planner/Builder or its separate Verifier. A prior review may be continued but cannot be counted again as another independent lane. Designing a fix triggers a lineage reassessment.

**Lineage recorded.** Common record plus reviewed claims, pre/post exposure to other findings, review iterations, any repair suggestions that became design contributions, and exact covered revisions.

### RC-04 — Verifier

**Purpose.** Independently reproduce claimed results and confirm evidence provenance, coverage, and artifact identity.

**Inputs.** Exact artifact/revision, governing criteria, producer claims, source logs and commands, documented environment, relevant tests/oracles, classification, and recorded eligibility.

**Permissions and tools.** Read source and evidence; execute approved checks in an independently prepared bounded environment; write logs and supplemental verification scripts only in designated evidence/scratch locations; report reproducibility and gaps.

**Prohibited actions.** Implementation writes, patching the target to make a check pass, silently replacing a command/environment, altering producer logs, relying on reported success without reproduction, serving as the target's separate Reviewer, acceptance/merge/deployment.

**Required evidence.** Actual commands and outputs or document/source verification methods; exact revision and environment; discrepancies from the claimed procedure; skipped/unavailable checks; observed results; coverage; preserved logs; pre/post source-state comparison.

**Required output.** VERIFICATION REPORT distinguishing reproduced, contradicted, and not verified claims. Unavailable execution is BLOCKED for that claim, not PASS. A successful run is not proof that all requirements or security properties were tested.

**Escalation.** Unreproducible environment, unavailable artifacts, unsafe execution, inconsistent versions, inadequate oracle provenance, hidden filtering, or unverifiable lineage.

**Independence restrictions.** Cannot independently verify work it planned/built or an authoritative test/oracle it previously authored. May produce new supplemental observations during the assessment, but cannot independently certify those evidence artifacts themselves. Must be distinct from Reviewer and required security-review execution.

**Lineage recorded.** Common record plus execution environment, reproduced commands/results, test/oracle sources, supplemental evidence authored, and evidence differences from the producer's run.

### RC-05 — Security/Governance Reviewer

**Purpose.** Perform two explicit duties within one role: security assurance of access/data/side effects, and governance assurance of policy, authority, process, and evidence constraints. An authorized adversarial mode may actively seek counterexamples.

**Inputs.** Target revision and design, authority/permission boundaries, governing policy, threat assumptions, data classifications, capability/state-transition contracts, producer/evidence lineage, classification, and eligibility decision.

**Permissions and tools.** Read authorized designs/code/policies/logs; trace permission and authority paths; execute explicitly authorized synthetic adversarial fixtures in a bounded environment; produce counterexamples and review evidence. Live systems, third-party targets, secrets, or destructive tests require separate explicit authorization and are not granted by this card.

**Prohibited actions.** Changing the policy or implementation being reviewed; granting privileges; waiving a finding; risk acceptance; disclosing protected data; treating adversarial scope as unrestricted attack permission; merge/deployment.

**Required evidence.** Separate security and governance coverage; affected invariants and trust assumptions; evidence paths and attack preconditions; reproducible counterexamples where available; inspected controls; residual risks; coverage limits; classification/independence decision.

**Required output.** SECURITY/GOVERNANCE REPORT with separate findings for the two duties, overall scoped disposition, and explicit unresolved blockers. Red-team findings must separate demonstrated failures from hypotheses.

**Escalation.** Potential authority bypass, protected-data exposure, unauthorized state changes, unreviewed security assumptions, unclear attack permission, conflicting policy, or evidence that a requested exception covers a security-critical gap.

**Independence restrictions.** Cannot independently validate its own security design/assumptions, implementation, or authoritative tests. Must not replace the separate Reviewer or Verifier with the same assessment execution.

**Lineage recorded.** Common record plus threat/policy assumptions authored or inherited, reviewed permission paths, fixture provenance, adversarial permissions, and known uncovered boundaries.

### RC-06 — Researcher

**Purpose.** Investigate an authorized question using internal records and external sources; produce evidence and alternatives without turning a research conclusion into a project decision.

**Inputs.** Scoped question, accepted constraints, required source standards, relevant prior work, data-access boundaries, and intended use/consequence of the resulting memo.

**Permissions and tools.** Read authorized records and sources; use approved research/search tools; perform bounded analysis; write sourced research memos and source/provenance indexes. Source acquisition and experiments remain subject to the task's own permission and cost limits.

**Prohibited actions.** Product implementation, provider qualification under this drafting task, autonomous architecture adoption, changing governing requirements, scope expansion, undisclosed purchases, acceptance/merge/deployment, representing speculation as sourced fact.

**Required evidence.** Claim-to-source citations, source dates/versions and relevant passages, methods and search limits, conflicting evidence, reuse of prior work, assumptions, uncertainty, and clear separation of source fact, inference, proposal, and unknown.

**Required output.** RESEARCH MEMO with findings, alternatives, limitations, decision questions, and evidence references. Recommendations remain proposals; the Planner and human owner decide how they become requirements.

**Escalation.** Missing evidence, contradictory primary records, protected information, unavailable source access, paid acquisition, or research that changes the authorized question.

**Independence restrictions.** Cannot independently validate downstream claims materially based on its own research conclusions or assumptions. Citation verification by the author is self-checking, not a separate independent source audit.

**Lineage recorded.** Common record plus source versions, derived claims, analysis artifacts, and specific assumptions/requirements that adopted the research.

### RC-07 — Integrator

**Purpose.** Reconcile admitted components into one designated shared candidate while preserving accepted scope and evidence boundaries.

**Inputs.** Explicit integration mandate and target; active exclusive writer identity; exact component artifacts/base/head revisions; accepted scopes; independent reviews; verifier evidence; required security review; classification; freshness assessments; any permitted human exception records.

**Permissions and tools.** Inspect component evidence; perform the admission checks in section 7; reconcile admitted components in the authorized integration workspace/branch; run approved combined checks; create candidate commits and evidence manifests. These technical operations do not confer protected merge or release authority.

**Prohibited actions.** Competing shared writers, waiving gates, creating/broadening human exceptions, admitting stale/incomplete/conflicted evidence as valid, unapproved redesign, silently changing a reviewed component, independently validating its own reconciliation, protected merge/deployment.

**Required evidence.** Per-component admission decisions with exact versions, all underlying review/verification references, exception checks, target-before/after identifiers, resolution diffs, combined-test outputs, impact analysis, and post-integration review requirements.

**Required output.** INTEGRATION CANDIDATE and admission ledger, explicitly distinguishing component intake from validation of the resulting combined artifact. Candidate delivery is not release readiness.

**Escalation.** Missing evidence, ambiguous lineage/classification, expired exception, shared ownership conflict, semantic conflict requiring new design, unresolved security finding, or an integrated result not covered by prior evidence.

**Independence restrictions.** Cannot supply independent evidence for a component/result it materially contributed to. Producer or diagnostic checks remain useful but cannot replace required independent review/verification. Result validation must be performed outside its contribution lineage.

**Lineage recorded.** Common record plus admitted component versions, target ownership, every conflict resolution and resulting commit, evidence carried forward, and claims requiring fresh assessment.

### RC-08 — Release Steward

**Purpose.** Assemble an exact, inspectable readiness package for a human release decision; packaging is not acceptance.

**Inputs.** Exact candidate/release revision; accepted scope; integration admission ledger; final independent evidence; unresolved finding/exception register; provenance, dependencies, and applicable release checklist.

**Permissions and tools.** Read authorized artifacts and evidence; verify that references resolve and match the candidate; assemble manifests, release notes, checklists, and readiness summaries in designated locations; request missing evidence.

**Prohibited actions.** Merge or deployment, declaring a release accepted, changing code to resolve a readiness defect, lowering consequence or evidence requirements, hiding exceptions, inventing test/review results, treating its packaging checks as a substitute independent Verifier report.

**Required evidence.** Candidate identifier/digest or exact commit; requirements/coverage index; reviewer and verifier records; security disposition; integration result evidence; dependency versions; documented rollback/recovery readiness where required; exceptions with expiry; missing items; final human decision reference when one exists.

**Required output.** RELEASE EVIDENCE PACKAGE with READY FOR HUMAN DECISION or BLOCKED, never 'released' without an actual authorized release record. Any exception-authorized input remains visibly marked, and release requires its own consequence-level gates.

**Escalation.** Mismatched/stale artifacts, absent independent evidence, missing release authorization, unresolved security finding, expired exception, unclear rollback/recovery prerequisites, or concealed qualification limits.

**Independence restrictions.** Assembly may reference evidence from contributors but MUST NOT count the Steward's own work as independent validation of the release package or underlying artifact. Human release authority remains separate even when all evidence is present.

**Lineage recorded.** Common record plus package version, included evidence identities, source candidate, packaging contributions, known omissions, and actual human acceptance/merge/deployment records if subsequently supplied.

## 7. Integrator Admission Contract

### 7.1 Component intake

**IA-01.** Before modifying the designated shared candidate, the Integrator MUST record the result of every gate below for each component. It MUST inspect the underlying evidence, not only a PASS label or link title.

| Gate | Required evidence |
| -- | -- |
| G1 — Scope and authorization | Accepted scope, reviewed/adopted contract where applicable, human accountable owner, exact authorized integration operation/target |
| G2 — Classification | Confirmed consequence level, applicable floor/trigger, independent classification confirmation, no unresolved classification conflict |
| G3 — Artifact identity | Exact Builder artifact/version, complete intended diff, target/base version, declared paths and dependency versions |
| G4 — Lineage | Sufficient verified required lineage, candidate eligibility decisions, no disqualifying self-validation or ambiguity hidden by a role/provider change |
| G5 — Independent review | Required qualifying review reports, underlying requirement/claim checks, findings dispositions, exact reviewed revisions |
| G6 — Verifier evidence | Separate qualifying verification report, actual results and coverage, reproducibility/provenance records, explicit missing checks |
| G7 — Security/governance | Required qualifying specialist review, no unresolved blocking security/authority finding, no missing mandatory security/governance coverage |
| G8 — Freshness and coverage | Evidence matches versions/dependencies; carry-forward assessments and any required revalidation exist; no unexplained stale or missing underlying evidence |
| G9 — Exceptions | Each unsatisfied waivable item has a valid named-human exception under section 8; all non-waivable gates remain satisfied; exception status remains explicit |
| G10 — Writer and target integrity | Exclusive current integration writer/target, authorized operation, expected target version, no overlapping writer or unexplained branch movement |

**IA-02.** No Integrator-generated assertion may replace required independent evidence. Integrator diagnostics and packaging checks MUST be labeled as such. A reviewer conclusion without accessible supporting evidence, a self-authored validation, or a human exception presented as a PASS MUST be rejected.

**IA-03.** The admission record MUST contain: unique record ID; time and actor; target and component versions; scope/contract/policy references; classification; each gate result and evidence reference; missing/failed items; valid exception identifiers; final disposition; authorized operation; and expected target-before/result-after identifiers. Corrections supersede rather than erase earlier decisions. A decision is invalid for an unrecorded target revision.

The ledger MUST link the IA-05 impact assessment for the exact resulting candidate and list component claim IDs whose evidence was invalidated or whose claims were changed, plus newly created integration claims. Each entry MUST identify affected evidence, required fresh assessment, and current disposition; carried-forward claims MUST link the EV-04 basis. Before a result exists these fields are explicitly pending, never presumed unchanged. Post-write entries are appended against the actual result revision and MUST be complete before protected merge/release reliance.

Immediately before the shared write, the Integrator MUST confirm that the authorization, target version, ownership, evidence, and exceptions still match the admission record. A mismatch blocks the write pending reconciliation. This specifies required behavior; it does not claim a transaction/locking implementation already exists.

### 7.2 Reconciliation and post-integration validation

**IA-04.** Admission of components authorizes only the already-approved reconciliation scope. A semantic conflict that changes a requirement, architecture, security assumption, interface contract, or accepted behavior MUST return to planning/owner review. It cannot be treated as a routine merge resolution.

**IA-05.** The combined candidate MUST receive an impact assessment identifying changed/combined claims, any carried-forward evidence, and fresh review/verification requirements. Mandatory post-integration checks apply to the new candidate before protected merge/release. The Integrator is a contributor to its resolutions and cannot independently validate them.

**IA-06.** NORMAL-ADMISSIBLE requires all applicable mandatory gates satisfied. An unsatisfied item may support EXCEPTION-AUTHORIZED / NOT FULLY VALIDATED intake only under section 8. Otherwise the disposition is BLOCKED. Failed post-integration validation leaves the candidate unaccepted; it does not retroactively make component reports false beyond their original scope, nor authorize release.

## 8. Human Exception Rule and gate waivability

The specific waiver map is **Owner Decision OD-3**. The conservative draft default is non-waivable unless the table explicitly permits the narrow exception.

For the potentially waivable L1/L2 coverage row, **one item** means a single named supplementary claim/check on a single artifact revision. A bundle of claims or checks is not one item. The Integrator MUST assess all applicable exceptions together: multiple concurrent or overlapping exceptions MUST NOT aggregate into coverage for more than that one supplementary item on the same artifact revision. A new revision requires a new matching decision and cannot carry an exception forward by title or lineage alone. This limit remains part of proposed OD-3, not approved policy.

**HX-01.** Only a named, authorized human may grant a permitted exception. An exception is authorization to proceed with specified residual uncertainty; it MUST NOT change history, create missing evidence, establish independence, or turn a failed test into a pass. Agents may document a request but MUST NOT issue, renew, broaden, or impersonate the authorization.

| Gate/item | Proposed v1 waiver policy |
| -- | -- |
| Human scope/authority; exact artifact identity; confirmed classification and minimum floor; exclusive writer/target integrity | Non-waivable |
| Disqualifying self-validation; unknown/unverifiable required lineage; false provenance or fabricated evidence | Non-waivable |
| Required independent architecture/implementation review, separate Verifier report, or mandatory Security/Governance Reviewer report | Non-waivable; absence of an eligible reviewer is not an exception |
| Unresolved blocking defect, security/authority finding, protected-data risk, or mandatory security coverage gap | Non-waivable |
| Freshness/provenance needed to know what was actually assessed; inaccessible underlying mandatory evidence | Non-waivable |
| L1/L2: one explicitly identified non-security supplementary verification-coverage item, such as an additional noncritical environment check, while qualifying review and Verifier reports exist | Potentially waivable only after an eligible noncontributing reviewer documents bounded impact and confirms it does not hide a failed mandatory behavior/security check; all other gates must pass |
| Any L3 mandatory item; protected release/deployment authorization | Non-waivable under v1 |
| A gate not listed as waivable | Non-waivable |

**HX-02.** The exception record MUST identify: human authorizer and authority basis; exact artifact/version, operation/target and consequence; affected gate/coverage item; missing or failed evidence; reason; impact/residual risk; reviewer impact assessment; scope and restrictions; explicit expiry and review trigger; compensating measures where applicable; withdrawal conditions; and authorizer/time. The record MUST be verifiably human-authored or human-approved. A connector write under the owner's account is not, by itself, proof of the owner's approval.

**HX-03.** Before exceptional admission, the Integrator MUST verify the record's authenticity, the gate's waivability at that consequence level, exact artifact and operation match, unexpired/unrevoked validity, and satisfaction of every non-waivable gate. An exception cannot lower the classification or authorize unrelated downstream operations. A Low/Medium exception for candidate preparation cannot authorize a High-consequence release.

**HX-04.** The affected record and downstream evidence package MUST retain the visible status EXCEPTION-AUTHORIZED / NOT FULLY VALIDATED until the missing requirement is independently satisfied for the current artifact. Expiry or revocation blocks further reliance/progression; it triggers human-directed disposition of anything already produced. No automatic rollback/deletion/deployment behavior is authorized here.

**HX-05.** A non-waivable gate can change only through the controlled amendment process for a future applicable specification revision. Neither an Integrator nor an ad hoc human exception may silently bypass it. Historical failed/missing evidence remains recorded even after a policy amendment.

## 9. Controlled amendments, internal review, and adoption

**CH-01.** Every substantive change MUST have a new revision, preserved prior content, change rationale, affected rules/claims, author lineage, consequence impact, and review requirements. An accepted revision MUST NOT be silently overwritten. Editorial-only changes require an explicit finding that they do not change duties, permissions, evidence gates, classifications, or meaning.

**CH-02.** Substantive amendments are L3 under the proposed floor and require a qualifying independent review of the changed controls, verification of internal consistency/traceability, appropriate Security/Governance Reviewer coverage, and named-human adoption. A contributor cannot classify its own amendment alone or validate it as independent. Adoption MUST state the exact revision, effective scope/date, superseded revision, and transition/revalidation requirements.

**CH-03.** This first draft MUST receive both an internal consistency check and a qualifying independence review before being treated as approved. Their purpose and provenance MUST be distinguished. Review of the agreed outline is not review of this completed text. Author self-checking and feedback by earlier framework contributors are valuable continuity checks, but do not satisfy qualifying independent-validation gates.

A first-revision review uses the agreed <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue> principles as its controlling baseline and evaluates the proposed detailed tables explicitly; it MUST NOT claim this unaccepted draft has already granted itself authority. Missing reviewer lineage or unresolved owner decisions MUST remain visible. No provider research or benchmarking is needed to label an existing review as advisory versus qualifying.

**CH-04.** The human owner decides the unresolved drafting choices and final adoption only after the required reviews and corrections. If qualifying evidence cannot be established, approval remains blocked rather than being inferred from agreement between drafting participants. The owner may seek a suitably independent human review without selecting model providers in this task.

**CH-05.** Model qualification, provider assignments/research, agent implementation, and operational automation remain separate future work. Completing a review or accepting this document MUST NOT automatically start them; a subsequent explicit scope authorization is required.

## 10. Specification consistency cases

These cases state expected interpretations for document review. They are **not executed tests**, model benchmarks, or a claim that enforcement software exists.

| Case | Expected disposition |
| -- | -- |
| Builder changes role name to Reviewer and evaluates its own commit | DISQUALIFIED; preserve contribution lineage |
| Reviewer uses a different provider but authored the governing plan | DISQUALIFIED; provider diversity cannot repair self-validation |
| L1 candidate uses the same provider/family in a distinct execution with no contribution, adequate lineage, and recorded isolation assessment | Conditionally eligible; record the decision before counting validation |
| L3 candidate changes API reseller but uses the producer's same model family | Insufficient separation for sole qualifying validation |
| Required runtime lineage is unavailable | BLOCKED for that qualifying gate; advisory output may be separately authorized |
| Separate reviewers inspect the same immutable repository snapshot | Not automatically disqualifying; shared mutable memory or inherited conclusions must be assessed separately |
| Reviewer reports a defect, then Builder independently fixes it | Same review may continue within its lineage; not a second independent lane; designing/editing the fix requires reassessment |
| Verifier writes a new supplemental check while independently observing Builder code | Record verifier-authored evidence; do not claim that the same Verifier independently validated its own check |
| Integrator resolves a semantic conflict and relies only on the two original component PASS reports | Combined result remains unvalidated for changed claims; fresh independent assessment required |
| Human says to proceed with missing security review | Non-waivable gate remains blocked under proposed v1; a comment does not manufacture evidence |
| Valid L2 exception covers one bounded supplementary environment check | Exceptional candidate intake only if all other gates pass; label NOT FULLY VALIDATED; no implied release authorization |
| Tool configuration or security assumption changes after verification | Re-evaluate coverage/freshness; revalidate affected claims before reliance |
| A contributor alone labels its own authority-sensitive change Low | Invalid classification; apply High trigger and obtain proper confirmation |
| A comment asking Linear to review is successfully saved | Handoff recorded only; require an actual response before claiming review occurred |
| Linear or ChatGPT reviews this specification after materially helping design it | Advisory/internal consistency feedback, not qualifying independent validation of their own design |
| Eligibility decider later takes a qualifying assessment lane | Requires its own separately attested eligibility and reviewable decision record; no self-approved eligibility |
| L1 source comparison is described as claim-bounded verification | Permitted verification method; does not remove the separate Verifier lane under the retained proposal |
| Supplemental check omits its oracle source or covered claim | Incomplete EV-01 evidence; do not infer coverage or independent certification |
| Two L2 exceptions each name a different supplementary check on the same revision | Aggregated scope exceeds proposed OD-3; exceptional admission blocked |
| Result ledger omits a claim changed by integration | Impact/freshness record incomplete; protected merge/release reliance blocked |
| Retention location is named but records cannot be retrieved | OD-4 readiness unresolved; adoption remains pending |

| New issue/session/provider is used for the same correction objective | Retain the same allowance, defect history and contribution lineage; no renewal |
| Independently reproduced in-scope defect has a Builder hypothesis and remaining preauthorized correction/assessment capacity | One bounded correction may proceed under the adopted contract; separate assessment and human final acceptance remain |
| Reviewer supplies the repair design | Reassess LI-05 eligibility for affected claims; do not count that contribution as independent validation |
| A repeated hypothesis fails or the correction entitlement is exhausted | Stop; relabeling the attempt cannot renew authorization |
| Clippy QA receipt says accepted | Evidence only for its recorded Clippy scope; does not grant Concord final acceptance |
| Budget code passed fixture tests but operational policy is disabled | Report development testing only; no active enforcement claim |
| Attributable usage is unavailable | Record unknown coverage; do not record zero or invent remaining capacity |
| Existing authorized document discussion has no newly adopted execution ledger | May continue under its actual authorization; no inferred implementation or assessment-launch allowance |

## 11. Owner decisions and review checklist

### 11.1 Decisions still requiring owner disposition

| Decision | Proposed choice in this draft | Adoption status |
| -- | -- | -- |
| OD-1 — Consequence definitions and floors | L1/L2/L3 triggers in section 3; architecture at least L2; security/governance assumptions and this specification L3; shared/protected integration at least L2; release/deployment admission L3 | PROPOSED — not owner-approved |
| OD-2 — Precise independence thresholds | Same-family validation conditional only at L1; L2 same-provider/different-family conditional; L3 separate provider and family from material contributors; separate Reviewer/Verifier/specialist executions; no claim of statistical independence | PROPOSED — not owner-approved |
| OD-3 — Non-waivable gates and exception scope | Section 8 non-waivable default; at most one named supplementary non-security claim/check per L1/L2 artifact revision, assessed across applicable exceptions; no L3 mandatory-gate waiver | PROPOSED — not owner-approved |
| OD-4 — Retention readiness | LI-09: name custodian, storage locations and access/correction/retrieval process for snapshots, lineage, evidence and exception history; establish inspectable readiness before adoption; no implementation authorized here | PROPOSED — not owner-approved |

All other new drafting detail also remains reviewable. The four entries identify choices requiring explicit owner direction; they are not permission to silently approve the rest. OD-1 includes the L1 review-burden question in section 3. OD-4 records the retention-readiness choice requested by the v1-draft.1 advisory review.

### 11.2 Required review coverage

The internal review MUST examine: consistency with the eight frozen roles; separation between development capabilities and Concord institutional authority; reviewed Planner contracts; prior-contribution disqualification; consequence-before-threshold ordering; same-provider conditional eligibility; shared context/infrastructure treatment; model-wrapper identity; role-specific permissions and sandbox limits; separation of intake from post-integration validation; stale evidence and carry-forward; waiver-map consistency; evidence retention and sensitive-data handling; human amendment/acceptance authority; and lack of autonomous dispatch/execution; WF-01–WF-06 allowance/correction/evidence duties, including their separation from deferred runtime mechanics.

Review findings MUST identify clause ID, conflict or missing rule, consequence, supporting text, and the smallest proposed correction. A qualifying review MUST also supply its own lineage and independence decision. Merely declaring 'no contradiction' is not enough without coverage and supporting analysis.

## 12. Authoring lineage, review status, and change record

### 12.1 Preserved initial submission record — v1-draft.1

The following records describe the initial submission and its then-current review state. The current state and revision authorship are recorded in section 12.3.

**Authoring record:** `JON-163-spec-v1-draft.1` is a document work-record label, not a provider-generated session ID.

**Actual author:** ChatGPT acting in the Planner/document-authoring capacity in the owner's current conversation. Provider: OpenAI. Exact model-family/immutable runtime version and provider session ID are not independently attested by the available Linear connector and are recorded as UNKNOWN for claims requiring that attestation. No model qualification or independence claim follows from the author identity.

**Prior contribution:** material contribution to this framework's requirements, architecture, independence rules, proposed consequence/waiver tables, and the entire draft. This author is disqualified from qualifying independent validation of those contributions. Linear also materially contributed to the framework through the <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue> design-convergence thread; its follow-up may provide advisory internal consistency feedback, not independent validation of its own design contributions. Linear's underlying model/provider is not inferred from its app-user name.

**Context:** the owner's conversation decisions, current <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue> description/comments, current Concord project record, workspace operating policy, and Mandatory Project Execution Safety Rule. No provider research, repository edits, test execution, agent installation, or operational automation forms part of this drafting task.

**Tools and write scope:** Linear connector reads/searches and authorized writes to this canonical document, the <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue> linkage/status record, and its review-handoff comment. Connector records may attribute writes to the connected human account; that is not a claim that the human authored or accepted the generated specification. Existing repository branches, active implementation/integration ownership, agent delegates, Coding Session/Loop settings, and AI-credit settings remain outside this task's write scope.

**Review states at submission:** initial author structural/consistency self-check completed, which is not independent validation; advisory internal consistency review pending; qualifying independent review pending/unassigned; OD-1/OD-2/OD-3 pending; human acceptance pending. The September 24 framework agreement does not cover approval of this completed draft.

**Change record:** v1-draft.1 is the initial full specification derived from the agreed <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue> framework. It supplies the eight cards and proposed operationally checkable rules without selecting models or implementing enforcement. Any substantive correction after review submission receives a new draft revision and a recorded change summary.

### 12.2 Preserved revision v1-draft.2 — advisory corrections, September 24, 2026

**Preserved source:** [Exact v1-draft.1 content snapshot](<https://linear.app/jons-garage/document/historical-snapshot-jon-163-role-and-independence-specification-v1-f6cd7ca6c7b3>). The snapshot preserves the connector-returned prior text; its document title identifies it as historical. Preservation is not a claim of cryptographic immutability.

**Work-record label:** `JON-163-spec-v1-draft.2`; this is a locally assigned record label, not a runtime session identifier.

**Revision author and lineage:** Codex, provider OpenAI, acting as document author in the current owner conversation. System-reported family is GPT-6; immutable model version and provider-issued runtime/session identity are UNKNOWN for independently attested lineage. This author consumed the entire v1-draft.1 specification, <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue> discussion including Linear's actual advisory response, and project/workspace safety records, then materially authored the changes below. The revision author is a contributor and is not eligible to independently validate these changes. No independence conclusion is inferred from switching application name or conversation.

**Authorization/context:** owner's request, “See if you can start work on Jon 163.” Continuation is limited to the existing document-review scope. Current user instructions disabling choreography supersede historical project choreography text. No delegation or new workload execution is implied.

**Tools/permissions actually used:** Linear connector reads of <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue>, comments, specification, referenced safety/workspace policies and Concord project; document search; local terminal viewer check and read-only repository/guidance inspection; in-memory draft comparisons; writes preserving the prior document and revising this canonical document and <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue>'s delivery description. The local terminal sandbox failed during inspection; approved escalated commands performed read-only inspection. No repository files, branches, source code, execution settings, ownership, permissions, provider assignments or issue acceptance status were changed. Available tools are not blanket authorization.

**Observed review evidence:** Linear's comment `4b7e68ca-5cf7-467d-b020-80d0f85da977`, September 24, 2026, under handoff `6ede18b0-5664-49ca-b5aa-c38b807a5092` on <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue>, explicitly reports full review of **v1-draft.1**, no blocking contradiction within its stated advisory scope, and six nonblocking corrections. It discloses prior framework contribution. This is an actual returned response, not an inferred invocation or independent validation. It does not cover v1-draft.2.

| Advisory finding | Revision response | Disposition |
| -- | -- | -- |
| CC-01/CC-02, OD-1: L1 burden | Section 3 explicitly distinguishes claim-bounded verification methods from omitting or combining lanes; records the owner's proportionality choice | Question clarified; two-lane proposal retained; owner decision pending |
| LI-07, RT-01/RT-03: eligibility decider later validates | LI-07 permits a lane only with separately attested eligibility and reviewable records; no self-approval | Proposed correction incorporated; revised-text review pending |
| LI-05, RC-04, EV-01: supplemental tests lack explicit claim/oracle links | EV-01 requires target/claim/oracle-source mapping, provenance and scope limitations for supplemental evidence | Proposed correction incorporated; revised-text review pending |
| IA-01/IA-05/EV-05: integration claim tracking | IA-03 links changed, invalidated and new claims to evidence and required fresh assessments for the resulting revision | Proposed correction incorporated; revised-text review pending |
| HX-01–HX-04, OD-3: meaning of one supplementary item | HX-01 bounds the item to one named claim/check on one revision and prevents aggregation through multiple exceptions | Proposed correction incorporated; OD-3 still pending |
| LI-09/CH/section 12: future retention decision | LI-09 and OD-4 name custodian, record locations and inspectable preservation/retrieval readiness before adoption | Decision requirement proposed; system choice and readiness evidence pending |

**Author consistency check:** Reviewed the changes against LI-04/LI-05 and RT-03 (no manufactured independence), EV-01 (non-code evidence), EV-04/EV-05 and IA-05 (freshness and result-specific assessment), HX-01–HX-05 (bounded exceptions), and CH-01–CH-05 (revision/adoption boundaries). Added six worked consistency cases. Eight Role Cards are retained. These are document comparisons and author checks, not executed tests or qualifying review. The changes refine normative detail and therefore require substantive review; they are not classified as editorial-only. The proposed L3 floor applies for planning review coverage, with independent classification confirmation still outstanding.

**Current state:** v1-draft.1 advisory review received; v1-draft.2 author checks completed and corrections delivered; advisory review of the revised text pending; qualifying independent review/verification/security-governance coverage pending; OD-1/OD-2/OD-3/OD-4 pending; retention readiness unresolved; human adoption pending. No prior review is automatically carried forward as approval of the changed claims.

**Remaining acceptance work:** Review this exact revision against the agreed framework and changes above; establish reviewer lineage/eligibility and independent classification; obtain qualifying review evidence under the agreed first-adoption baseline; resolve OD-1 through OD-4 and any findings; then record named-human adoption of the exact revision, applicability and transition. Review evidence must distinguish advisory feedback from qualifying validation. This record neither appoints nor invokes a reviewer. Provider research/qualification and implementation require separately authorized future scope.

### 12.3 Current revision — v1-draft.3, September 24, 2026

**Authorization:** the owner's instruction, “Let's initiate the work proposal, open it up and start it,” starts the previously prepared CONCORD-WF-001 integration work at its next eligible document-review step. It does not resolve OD-1–OD-4, adopt this revision, assign providers, authorize additional spending or activate execution infrastructure.

**Author and lineage:** OpenAI Codex, the same document-authoring contributor that prepared CONCORD-WF-001 v0.1 in the owner's conversation. This author materially contributes to the new boundaries and cannot independently validate them. Runtime describes the assistant as GPT-6-based; exact immutable model version and independently attested provider run ID remain UNKNOWN. Local /root is a conversation label, not such an attestation. Linear materially shaped the framework and can supply advisory continuity feedback only.

**Inputs:** the owner's two handoffs; the live canonical draft.2; <issue id="c88f1d74-34dc-4e07-aa74-e61fc1b9a73d" href="https://linear.app/jons-garage/issue/JON-163/concord-ai-role-and-independence-specification-design-convergence">JON-163</issue> discussion; the saved CONCORD-WF-001 v0.1 proposal and source snapshots; the recorded Clippy operating agreement and <issue id="6c88857e-60ed-424f-bf1b-18169b7c6d3e" href="https://linear.app/jons-garage/issue/JON-160/build-local-automation-runner-and-clippy-configuration">JON-160</issue>/172/174 evidence from that reconciliation. Historical Clippy test receipts were not rerun. Clippy's 870-second last-observed remainder is not a current or transferable Concord balance.

**Author reconciliation findings:** (1) WF-04's proposed atomic reservation/locking/process-recovery mechanics exceed this specification's frozen implementation boundary, so retain only honest enforcement-scope duties here and defer mechanics; (2) do not require an independent Reviewer to design a repair hypothesis, which could invalidate its eligibility; (3) distinguish routine preauthorized repair from a fresh entitlement after one correction is spent; (4) do not turn a proposed allowance rule into a retroactive barrier to authorized document work; (5) preserve human acceptance and separate assessment lanes rather than importing Clippy QA authority. These are author findings, not independent review conclusions.

| Proposal item | Draft.3 treatment | Remaining decision |
| -- | -- | -- |
| WF-01 aggregate allowance | Section 5.4 defines attribution, unknowns, reservation and no-reset duties | Numeric allowance, unit/overlap rules and enforcement design belong to a future authorized work package |
| WF-02 bounded correction | Section 5.4 defines contract preauthorization, independent evidence, Builder hypothesis, stop rules and reassessment | Future contract must explicitly adopt a finite entitlement and resources |
| WF-03 evidence states | Section 5.4 connects receipts to HA-07/EV-06 without inventing statuses | Actual executor/access/activation evidence still required |
| WF-04 enforcement boundary | Section 5.4 requires honest coverage claims only | Atomic admission, malformed-state denial, deduplication, crash reservations, confirmed exit and recovery tests deferred |
| WF-05 native management | Section 5.4 retains existing responsibility and consultation boundary | No management agent or choreography authorized |
| WF-06 reuse/retention | Section 5.4 references EV-04 and OD-4; no relaxed freshness gate | Custodian, access/retrieval/correction readiness and independent evidence remain pending |

**Deferred execution acceptance examples, not normative runtime design:** atomic reservation before controlled launches; denial of exhausted/malformed accounting; duplicate suppression; conservative crash/restart reconciliation; confirmed process termination before concurrency release; registered-task intake rather than issue-prose commands; representative actual-runtime and unattended-access receipts before activation. These remain future design/test questions, not an implementation plan approved by this specification.

**Checks:** author comparison preserves all eight Role Cards, LI/RT independence rules, Integrator admission, waiver table and proposed OD-1–OD-4 dispositions. Eight document consistency cases added. Author readback and content comparisons are not independent validation or runtime tests.

**Current gates:** revised-text advisory review; qualifying independent classification/review/verification/security coverage under CH-03's first-adoption baseline; explicit OD-1–OD-4 dispositions; retention readiness; named-human exact-revision adoption. No model qualification, agent implementation, operational activation, cross-project reassignment or protected merge/deployment follows from publication. Actual consultation responses and subsequent corrections must be recorded separately; a posted request alone proves only a handoff.
