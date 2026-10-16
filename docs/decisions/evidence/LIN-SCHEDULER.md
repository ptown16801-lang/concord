# Evidence snapshot: Scheduler Research & Selection Record — 2026-09-21

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/document/scheduler-research-and-selection-record-2026-09-21-a4799a7b5614
- Version: 2026-09-22T01:26:51.527Z
- Source date: 2026-09-22T01:26:51.527Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Purpose and authority

This document records later scheduler research and owner-selected implementation requirements without altering the accepted scheduler/checker boundary contract in <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue>.

**Binding authority:** <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue>, “Scheduler, legality checker, and continuity control,” remains the accepted scheduler/checker/continuity contract. This document does not reopen, rewrite, or supersede <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue>.

No scheduler technology, algorithm, model family, or external project is selected by this document.

## Status classes

* **Binding:** <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue> and its incorporated authority/security/legal boundaries.
* **Owner requirement:** explicit implementation-selection constraints chosen by the owner.
* **Evaluation framework:** rules for future comparative validation.
* **Research candidate:** an approach worth testing; not adopted.
* **Unresolved:** requires later evidence or owner decision.

## Owner requirements

### 1. Live adaptation — HYBRID

Concord may automatically switch among already approved scheduler policies.

Newly generated or evolved policies must be created outside the live authority path and validated before they become eligible for use.

Generation alone never grants production authority.

### 2. Explainability — MOSTLY EXPLAINABLE

Live scheduling decisions must have meaningful, reconstructable explanations.

Approved internal scoring, optimization, or model components may be partly opaque.

This choice does not assume or select a neural network and does not weaken the explicit legality or authorization boundaries.

### 3. Deterministic fallback — REQUIRED

Concord must retain a known deterministic baseline scheduler.

The baseline must be available when an adaptive policy fails, is unavailable, is withdrawn, cannot be validated, or otherwise becomes unsuitable for continued use.

### 4. Owner optimization goals — UNRANKED

The owner selected these four goals without ranking or weighting them:

* preserve continuity;
* fair rotation;
* prevent starvation;
* minimize handoffs.

Do not invent weights or priority order among these goals.

Future validation must expose tradeoffs among them rather than collapsing them into an arbitrary composite score.

### 5. New-policy deployment — SHADOW, THEN STAGED CANARY

A candidate policy must not move directly from generation into live authority.

The required promotion path is:

1. offline validation;
2. shadow operation against real workloads without control authority;
3. evidence review/comparison;
4. tightly bounded staged canary;
5. broader approval only if evidence supports promotion.

## Future validation framework

This framework is for a future bounded validation issue. It is not a rewrite of <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue> and does not authorize implementation work by itself.

### Hard gates

A candidate is disqualified from live use if it fails any of these:

* legality boundary compliance;
* authorization boundary compliance;
* protected-domain opacity;
* protected-data exposure checks: any unauthorized or unnecessary exposure of protected data is a blocking failure;
* immutable policy identity and versioning: a validated policy must have a stable identity/version and may not change after validation without becoming a new policy version that requires revalidation;
* complete policy provenance sufficient to trace source, generation method, validation evidence, approvals, deployment history, and rollback target;
* safe rollback, with evidence that rollback succeeds;
* deterministic fallback compatibility;
* required deployment controls, including validation, shadowing, canary evidence, and approval.

Hard-gate failures are blocking failures, not tradeoffs.

### Owner goals

The four owner goals remain unweighted:

* continuity;
* fair rotation;
* starvation prevention;
* fewer handoffs.

Validation must report candidate behavior separately on each goal and surface conflicts between them.

### Common test scenarios

Every serious candidate should be evaluated against the same Concord-specific scenarios, including at minimum:

* normal load;
* overload;
* scarce qualified capacity;
* protected/public workload competition;
* deadline collisions;
* continuity-sensitive work;
* starvation risk;
* handoff pressure;
* policy-switch event;
* checker failure and fallback;
* authoritative-state change during scheduling;
* adversarial or stress cases relevant to <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue>.

### Separate measurements

Do not reduce all results to one arbitrary score.

Report separately where applicable:

* legality violations;
* authorization violations;
* secrecy/opacity violations;
* continuity;
* rotation fairness;
* starvation behavior;
* handoff count;
* deadline performance;
* throughput;
* idle qualified capacity;
* stability under changing conditions;
* policy-switch overhead;
* latency;
* compute requirements;
* explainability quality;
* reproducibility;
* rollback/fallback behavior.

### Evidence levels

Distinguish evidence sources:

1. paper/project claim only;
2. public implementation inspected;
3. implementation reproduced;
4. generic benchmark result reproduced;
5. Concord-specific workload result;
6. shadow-mode evidence;
7. staged-canary evidence.

Published benchmark performance alone is not enough to select a Concord scheduler.

### Cost and dependency reporting

For every serious candidate, report:

* license;
* required hardware;
* GPU requirement if any;
* local versus external/API dependency;
* recurring cost;
* estimated compute/runtime burden;
* whether the candidate can operate with zero additional paid services;
* maintenance/integration burden.

### Failure analysis

For every candidate, identify:

* likely failure modes;
* whether failure is detectable;
* rollback behavior;
* whether failure threatens only scheduling quality or could affect authority/secrecy;
* whether the deterministic baseline can take over safely.

### Integration burden

Report the Concord-specific infrastructure needed by each candidate, such as:

* simulator adapter;
* policy representation;
* selector;
* policy registry;
* explanation layer;
* validation harness;
* shadow-mode machinery;
* canary controls;
* provenance/audit storage;
* immutable policy identity/version registry;
* protected-data exposure instrumentation and checks.

## Evaluation layers

Future validation must not compare all researched systems as though they are interchangeable scheduler products. Separate the problem into layers and evaluate each layer on its own role.

### Layer 1 — Baseline policy execution

Purpose: execute a deterministic, known-good scheduling policy and provide the required fallback/reference behavior.

Examples may include hand-authored symbolic or rule-based policies. Passing this layer does not determine how future policies are generated or selected.

### Layer 2 — Candidate-policy generation

Purpose: create candidate scheduling policies outside the live authority path.

Examples may include symbolic GP/GPHH, CCGP where applicable, and offline LLM artifact generation.

LLM use in this layer is limited to **offline artifact-generation experiments**. Do not assume a live model dependency, paid API, production authority, or direct promotion of generated artifacts.

A generated artifact remains non-authoritative until it separately passes the required validation and promotion path.

### Layer 3 — Approved-policy selection

Purpose: select among policies that have already passed validation and been approved for use.

A selection method is not itself a policy generator. A future selector may operate over hand-authored, GP-generated, LLM-generated, or other approved policies.

Portfolio-style approaches such as DSevolve are relevant here as research/prior art but remain unselected and unproven for Concord.

### Layer 4 — Evaluation infrastructure

Purpose: provide simulation, benchmarks, evidence collection, comparison, shadow evaluation, canary evidence, and reproducibility support.

Tools such as DynaSchedBench belong in this layer and must not be treated as scheduler-generation methods.

### First validation experiments

Frame the initial validation as four separable tests rather than a single winner-selection contest:

1. deterministic baseline-policy test;
2. one offline rule-generation test;
3. one offline LLM rule-generation test;
4. one approved-policy-selection test.

The output should identify which layers are viable, which fail hard gates, and which need more evidence. None of these experiments by itself selects the final scheduler architecture.

## Research candidates — UNSELECTED

The following remain research candidates only. Inclusion does not imply adoption:

* deterministic symbolic/rule-based scheduler approaches;
* DSevolve / portfolio-based dynamic scheduling;
* symbolic GP / GPHH;
* RACE-Sched-style challenger generation/evaluation architecture;
* CCGP;
* MHCRS;
* GOODRL;
* OGP;
* ModouGPT or other LLM-based rule-generation approaches;
* Autopoiesis as architectural prior art for self-evolving policy systems.

**DynaSchedBench** is evaluation/benchmark infrastructure, not a scheduler-generation method.

No candidate should be architected into Concord merely because it appears promising. Each must be proven against the common framework.

### DSevolve-specific owner instruction

DSevolve may be included and evaluated because its offline portfolio generation / online selection pattern appears relevant to the hybrid requirement.

It is **not selected**.

Do not build Concord around DSevolve, a DSevolve-inspired architecture, or its dependencies unless comparative validation proves the fit and the owner later approves that direction.

## Unresolved decision

The four owner goals are intentionally unranked.

A future validation may reveal unavoidable conflicts, for example:

* preventing starvation may increase handoffs;
* preserving continuity may reduce rotation fairness;
* reducing handoffs may delay lower-priority work.

Validation must show these conflicts explicitly.

Do not invent weights, ranking, or a conflict-resolution rule.

If a technology choice cannot be made without resolving these conflicts, return the concrete tradeoff to the owner for a decision.

## Next step

Do not create scheduler implementation work yet.

After this record is reviewed, create one bounded validation issue whose purpose is to compare candidate approaches against <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue> and this framework.

The validation issue must not assume a winner and must not implement DSevolve, GP, an LLM scheduler, RL, CCGP, or any other candidate simply because it is under evaluation.
