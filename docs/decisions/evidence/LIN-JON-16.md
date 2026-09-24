# Evidence snapshot: Scheduler, legality checker, and continuity control

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control
- Version: 2026-09-23T12:45:04.084Z
- Source date: 2026-09-23T12:45:04.084Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Delivery disposition — 2026-09-17

Design draft delivered in PR <pull-request id="13dfd584-39ed-4969-8443-27c4fd944731" href="https://linear.app/jons-garage/review/define-scheduler-legality-checker-and-continuity-contract-05f2d52ecd5c">ptown16801-lang/concord#20</pull-request> at `c86701512a64c58ade9707d8368a48bad1e8fc03`, matching producer receipt `bc0eea15-4654-403a-995e-a2ea825d14a2`. In Review reflects pending design acceptance, not completed production implementation. Preserve the delivered contract and recorded checks rather than treating the finished producer response as a live worker.

## Current design-only contract — 2026-09-16 owner instruction

**Canonical owner:** scheduler, checker and continuity design. **Deliverable:** queue/opaque-envelope contract, mechanical legality versus interpretive-admission sequence, outage/standby state model and acceptance scenarios. Consume <issue id="f022c6cc-c2a0-49ee-a561-344b00e15b24" href="https://linear.app/jons-garage/issue/JON-32/define-adjudication-route-after-checker-finds-no-objective-violation">JON-32</issue>'s settled admission gate, <issue id="89c08f78-bc85-4799-8a16-64b4dacc9701" href="https://linear.app/jons-garage/issue/JON-33/resolve-petition-credit-duplicate-and-refund-accounting">JON-33</issue>'s settled petition-credit rule, <issue id="0e2b75a9-7954-475f-9f92-88519081f6ff" href="https://linear.app/jons-garage/issue/JON-38/define-protected-or-authority-bearing-initiative-boundary">JON-38</issue>'s express-authority rule and <issue id="389526da-d8a3-47cf-b522-c1c132c7da30" href="https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary">JON-61</issue>'s self-representation/fairness safeguards. <issue id="23e7c7df-a9fe-4ba3-b920-5079a466bb25" href="https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores">JON-17</issue> owns authorization; <issue id="389526da-d8a3-47cf-b522-c1c132c7da30" href="https://linear.app/jons-garage/issue/JON-61/implement-constitutional-branch-succession-impeachment-and-judiciary">JON-61</issue> owns legal adjudication. No fresh policy-option interview or scheduler implementation.

---

Implement the accepted split scheduling/checker architecture and expose it coherently through Concord.

## Accepted model

* Scheduler is a privileged non-agent mechanical supervisor.
* Global allocator sees opaque capacity/eligibility envelopes; protected domains retain local scheduling details.
* Urgency is decided democratically, not invented by the scheduler.
* Staffing considers qualification, experience, workload, continuity and fair rotation.
* Independent checker tests legality/permissibility rather than optimizer preference.
* Objective mechanical violations block automatically; interpretive disputes route to adjudication.
* Approved same-domain standby restores checker availability but cannot act as a second opinion.
* If primary and standby are unavailable, ordinary affected work freezes. Only predesignated essential continuity categories may proceed.
* Scheduler-rule changes use legislation plus staged synthetic/canary/broader rollout.

## Work

Model queue state, public/protected visibility, eligibility, petition/review state, outage handling, handoff checkpoints, interval donation, continuation requests and staged rule rollout. Workbench visualizations must distinguish capacity, priority, legality and authorization rather than compressing them into one score.

## Correlation with impeachment/resource-allocation interview — controlling clarification

The scheduler must not invent legal importance, rank people, or decide procedural fairness. Institutional/legal processes establish lawful urgency inputs such as active impeachment status, temporary restrictions, office/system criticality, deadlines, continuity risk, and minimum procedural requirements. The scheduler then mechanically allocates qualified capacity according to those inputs.

High-impact proceedings may receive more resources and move faster when that improves system operations and capacity exists, but this is an emergent allocation effect rather than a personal privilege for high-ranking actors. Allocation must preserve minimum service floors for ordinary work and must not materially weaken either side's self-representation capacity, preparation time, evidence access, ability to communicate/respond, or opportunity to present its own case.

Scheduler role:

* evaluate objective capacity, qualification, workload, continuity, bottlenecks, deadlines, and minimum service floors;
* accept lawful urgency/criticality envelopes rather than creating them;
* preserve protected-domain opacity by consuming only the minimum scheduling metadata needed;
* never decide whether a schedule is legally fair or whether an accusation is meritorious.

Fairness disputes remain with the applicable constitutional/legal process. All parties are self-represented; the scheduler allocates time/capacity/access resources but does not assign lawyers, counsel, public defenders, or advocates. The independent checker continues to test legality/permissibility rather than optimizer preference.

For protected proceedings, a domain may expose an opaque envelope such as urgency class, deadline class, eligible-capacity requirement, and continuity dependency without disclosing substantive case identity or allegations to the global allocator.
