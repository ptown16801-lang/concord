# Evidence snapshot: Build Concord scheduler simulation and test harness

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `c4b52828026144df646c45644e3214d8d74da20a`; original SHA-256: `4f4221996f9c45ad73140be2fdb0dd22a3afa0a2f471291acc8add58d423c147`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-24T03:03:32.844Z
- Source date: 2026-09-24T03:03:32.844Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current delivery and acceptance handoff — September 23, 2026

Canonical delivered harness: ptown16801-lang/concord#33 (private source reference withheld), `e4b979dea42e606bc8ac0b64b458bb084d8ad3a6`. JON-139 (private source reference withheld)'s six corrections are Done. JON-140's bounded review (private source reference withheld) is delivered; J retains human acceptance. This issue remains In Review, and JON-127 (private source reference withheld) comparative execution awaits JON-140 (private source reference withheld) acceptance. Reuse the delivered harness and existing review; previous cloud delivery failures and old In Progress statements are historical. The recorded Codex delegate is provenance, not evidence of a running worker or authority to relaunch one.

Create the shared Concord-specific simulation and test scenarios needed to evaluate scheduler approaches under JON-16 (private source reference withheld) and JON-127 (private source reference withheld).

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

**Binding sources:** JON-16 (private source reference withheld) and the Scheduler Research &amp; Selection Record — 2026-09-21 (private source reference withheld). They define the accepted boundaries; do not infer missing authority from repository code.

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
