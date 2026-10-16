# Evidence snapshot: Build Concord scheduler simulation and test harness

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-128/build-concord-scheduler-simulation-and-test-harness
- Version: 2026-09-24T03:03:32.844Z
- Source date: 2026-09-24T03:03:32.844Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current delivery and acceptance handoff — September 23, 2026

Canonical delivered harness: <pull-request id="72e734b7-7fea-4710-96c7-0295339ef9a4" href="https://linear.app/jons-garage/review/add-deterministic-concord-scheduler-simulation-harness-2efbb11d017a">ptown16801-lang/concord#33</pull-request>, `e4b979dea42e606bc8ac0b64b458bb084d8ad3a6`. <issue id="b27b486a-c91e-4240-930b-e89283d5880d" href="https://linear.app/jons-garage/issue/JON-139/correct-six-scheduler-harness-audit-findings-in-pr-33">JON-139</issue>'s six corrections are Done. [JON-140's bounded review](<https://linear.app/jons-garage/issue/JON-140#comment-fb65ae04-cccd-4a8b-af44-8c37e8600d41>) is delivered; J retains human acceptance. This issue remains In Review, and <issue id="a37bce59-5662-4821-a42b-1092b7523792" href="https://linear.app/jons-garage/issue/JON-127/validate-concord-scheduler-implementation-approaches">JON-127</issue> comparative execution awaits <issue id="bc24626d-a347-4bb8-9b0c-3f2f1e4e1a64" href="https://linear.app/jons-garage/issue/JON-140/review-corrected-scheduler-harness-for-jon-128-acceptance">JON-140</issue> acceptance. Reuse the delivered harness and existing review; previous cloud delivery failures and old In Progress statements are historical. The recorded Codex delegate is provenance, not evidence of a running worker or authority to relaunch one.

Create the shared Concord-specific simulation and test scenarios needed to evaluate scheduler approaches under <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue> and <issue id="a37bce59-5662-4821-a42b-1092b7523792" href="https://linear.app/jons-garage/issue/JON-127/validate-concord-scheduler-implementation-approaches">JON-127</issue>.

Include normal load, overload, scarce qualified capacity, protected/public workload competition, continuity-sensitive work, starvation pressure, handoff pressure, deadline collisions, policy switching, checker failure/fallback, authoritative-state changes, and adversarial cases.

Keep this evaluation-only. Do not select a scheduler technology, implement a production scheduler, or invent weights for the unranked owner goals.

Scope ends after the deterministic baseline and validated harness are delivered. Keep GP, LLM, and approved-policy-selection experiments as separate later issues.

For otherwise-equal eligible assignments, the deterministic baseline uses fair rotation based on prior assignment history.

The first harness covers agent-to-work assignments only. It excludes assets, money, barter, marketplace logic, and resource-allocation mechanisms.

Use synthetic, non-sensitive agents and workloads only. Do not include protected-domain, personal, or production data in the initial fixtures.

Use discrete synthetic scheduling rounds rather than real-time clocks so scenarios are repeatable and comparable.

Every synthetic task includes a duration measured in scheduling rounds to model capacity, continuity, and handoffs.

The baseline keeps an eligible agent on unfinished work before assigning a replacement, unless an authoritative restriction or unavailability requires reassignment.

When no qualified agent is available, leave the task unassigned and report a capacity/eligibility gap; never assign it to an unqualified agent.

Deadlines and urgency are externally supplied authoritative fixture inputs. The scheduler must not infer or invent them.

## Codex handoff packet — September 21, 2026

**Binding sources:** <issue id="f09ba0e6-2b82-46c4-84a1-33d67565be4e" href="https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control">JON-16</issue> and the <document id="40eb029a-3b96-40b4-877f-b85d4818790d" href="https://linear.app/jons-garage/document/scheduler-research-and-selection-record-2026-09-21-a4799a7b5614">Scheduler Research &amp; Selection Record — 2026-09-21</document>. They define the accepted boundaries; do not infer missing authority from repository code.

For this harness, preserve these requirements:

* the scheduler is a mechanical proposer, not a legal, political, or authorization authority;
* eligibility, capacity, lawful priority, legality, and authorization remain separate inputs rather than one optimizer score;
* protected workloads expose only synthetic opaque scheduling metadata; never include substantive protected data;
* an injected checker decides whether a proposal may apply; rejection is never applied, and checker failure is distinct from rejection;
* deterministic fallback is required, but it must not invent authority or bypass checker/authorization boundaries;
* policy identity, version, provenance, and effective-round changes must be recorded immutably in the synthetic trace;
* report continuity, fair rotation, starvation, and handoffs separately; do not invent weights or a composite score;
* GP, LLM generation, portfolio selection, live adaptation, shadowing, and canary promotion are not part of this initial harness implementation.

Before implementation, return any unresolved checker request/response fields, fallback behavior, or authority-precedence question as a blocker rather than guessing.
