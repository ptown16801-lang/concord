# Scheduler, legality checker, and continuity contract

**Contract revision:** 1.0

**Record date:** 2026-09-17

**Scope:** Concord design contract; no scheduler runtime is implemented by this revision.

## 1. Purpose and authority boundary

Concord uses a split architecture:

- a privileged, non-agent scheduler performs deterministic capacity allocation;
- protected domains schedule their internal work and disclose only opaque envelopes to the global allocator;
- an independent checker evaluates a proposed allocation against objective, machine-testable rules;
- authorization services decide whether an actor or initiative may exercise authority; and
- constitutional and legal institutions decide urgency, admissibility, interpretation, remedies, and procedural fairness.

The scheduler does not create urgency, legal importance, authorization, entitlement, merit, guilt, or procedural fairness. It does not rank people. It may only apply the lawful operational inputs supplied to it: capacity, qualification, experience, workload, continuity, bottlenecks, deadline and urgency classes, continuity risk, minimum service floors, and applicable rotation rules.

The checker is not a second optimizer. It may reject an allocation for an objective violation, but it may not reject one merely because another lawful allocation would score better. An interpretive dispute is never converted into a mechanical violation.

This contract consumes, without redefining:

- JON-17 domain-local authorization and authoritative-writer boundaries;
- JON-32's separate admission gate for an interpretive petition after a no-objective-violation checker result;
- JON-33's petition-credit accounting, including credit consumption by duplicate petitions and withdrawals;
- JON-38's requirement for an express, scoped authority grant; and
- JON-61's self-representation, evidence-access, preparation-time, communication, response, and minimum-service safeguards.

## 2. Four independent decision dimensions

Every proposed allocation retains four separately sourced dimensions. No API, stored record, or Workbench view may compress them into one score.

| Dimension | Question | Authoritative source | Scheduler treatment |
| --- | --- | --- | --- |
| Capacity | Can qualified capacity fit the interval while preserving workload and service floors? | capacity and qualification attestations | computes allocation |
| Priority | Which lawful urgency, deadline, criticality, and continuity classes apply? | legislation or competent institutional process | consumes; never invents |
| Legality | Does the concrete proposal violate an objective scheduling rule? | independent checker using a pinned rule version | must pass before commitment |
| Authorization | May the work and assigned participant exercise the requested authority? | domain authorization service and express grant record | requires a valid receipt; never grants |

A green value in one dimension cannot cure a failure in another. In particular, spare capacity does not confer authorization, high urgency does not cure illegality, and a checker pass does not decide interpretive legality or fairness.

## 3. Records and minimum disclosure

All identifiers below are opaque, non-semantic values. Records are append-only or versioned; a later event supersedes an earlier effective value without erasing it. Each event carries an event ID, aggregate ID, prior-version expectation, timestamp or logical interval, actor/service identity, reason code, policy generation, and provenance references.

### 3.1 Queue item

A queue item contains:

- `queue_item_id` and owning `domain_id`;
- `visibility`: `PUBLIC` or `PROTECTED`;
- a public descriptor, when public, or an opaque envelope reference, when protected;
- requested interval/window, duration class, divisible/indivisible flag, and capacity units;
- qualification and experience requirements as predicates, not named preferred people;
- lawful urgency, deadline, office/system criticality, and continuity-risk classes with issuer receipts;
- minimum service-floor and procedural-floor constraints that the allocation must preserve;
- continuity dependency and last safe handoff checkpoint;
- authorization receipt or `AUTHORIZATION_PENDING`, including an express-grant reference when protected/governmental authority is involved;
- eligibility-attestation generation and expiry;
- checker rule version, scheduler rule version, and rollout cohort;
- independent allocation, checker, petition/review, and outage states; and
- links to append-only proposal, decision, handoff, donation, continuation, and challenge events.

The queue item must not contain a scheduler-authored importance value, personal rank, merits assessment, allegation, evidence, protected membership, protected mission, or substantive protected case identity.

### 3.2 Opaque protected-domain envelope

The protected domain keeps identities, allegations, evidence, internal queue order, internal staffing, and work-product references inside its authorization boundary. Its signed envelope exposes only the scheduling metadata needed globally:

```text
envelope_id, domain_id, schema_version, issuer, issued_at, expires_at
capacity_units, duration_class, interval_window, divisibility
qualification_predicates, experience_band, eligibility_attestation
lawful_urgency_class, deadline_class, criticality_class, continuity_risk
minimum_service_floor, procedural_floor_constraints
continuity_dependency, essential_continuity_category_or_none
authorization_status_receipt, express_grant_reference_if_required
policy_generation, expected_envelope_version, integrity_signature
```

Classes must come from a versioned lawful vocabulary. Free text and semantic identifiers are rejected at the global boundary. Buckets should be coarse enough to resist linkage and differencing attacks. The global allocator returns only reservation identifiers, interval/capacity results, reason codes, and required checkpoint references. A domain-local mediator resolves those results to local people and work.

Public projections may show aggregate capacity, published public items, service-floor health, rule versions, rollout phase, and checker/outage health. Protected projections use aggregates or opaque IDs and suppress small cohorts, exact timing, and combinations that could reveal protected membership, mission, case identity, allegations, or queue order.

## 4. Independent state axes

State axes must not be represented as one overloaded `status` field.

### 4.1 Allocation state

```text
RECEIVED
  -> HELD_FOR_INPUT          missing/expired authorization or eligibility receipt
  -> QUEUED                  complete lawful input envelope
  -> PROPOSED                deterministic candidate allocation recorded
  -> CHECK_PENDING           candidate sent to the independent checker
  -> RESERVED                checker passed; interval reserved but not started
  -> ACTIVE                  checkpointed work is executing
  -> HANDOFF_PENDING         work stopped at or approaching a safe checkpoint
  -> COMPLETED

PROPOSED/CHECK_PENDING -> BLOCKED_OBJECTIVE
QUEUED/RESERVED/ACTIVE/HANDOFF_PENDING -> FROZEN_CHECKER_OUTAGE
RESERVED/ACTIVE -> PAUSED_BY_AUTHORITY
any nonterminal state -> CANCELLED_BY_AUTHORITY
```

`HELD_FOR_INPUT` is not an authorization denial: the scheduler records the status supplied by the authorization owner. `BLOCKED_OBJECTIVE` records exact failed predicates and cannot be overridden by optimizer preference. Resumption creates a new proposal/version; it does not rewrite the blocked or frozen event.

### 4.2 Authorization state (authoritative input)

`PENDING`, `VALID`, `SUSPENDED`, `REVOKED`, or `EXPIRED`. Concord verifies issuer, scope, subject/resource binding, policy generation, capability lifetime/use count, and expected version. It does not mint or reinterpret the grant. Scheduling, labeling, protection, privileged creation, or archive placement never changes this axis to `VALID`.

### 4.3 Checker state

`UNCHECKED`, `CHECKING_PRIMARY`, `CHECKING_STANDBY`, `PASSED`, `OBJECTIVE_VIOLATION`, or `UNAVAILABLE`. A result records the checker identity/role, same-domain approval, input proposal hash, rule version, tested predicates, deterministic result, and evidence references.

### 4.4 Petition and review state

`NONE`, `FILED`, `DUPLICATE`, `WITHDRAWN`, `ADMISSION_PENDING`, `NOT_ADMITTED`, `ADMITTED`, `ADJUDICATION_PENDING`, or `RESOLVED`.

This axis does not mutate the checker result. A petition may challenge a passed proposal, but only an independently authoritative stay, restriction, or remedy changes whether the allocation may proceed. The scheduler records and applies that separate directive without deciding its merits.

Petition-credit accounting belongs to its authoritative ledger. Filing consumes one available credit atomically before routing. A duplicate and a withdrawal both leave that credit consumed. A duplicate does not inherit a refund if an earlier petition succeeds. Only an independently recorded successful qualifying petition produces the adopted success refund; qualifying-work renewal and the empirically calibrated bank cap remain ledger rules. Concord stores ledger receipt IDs and outcomes, never a shadow balance.

## 5. Allocation and legality sequence

1. The owning domain authenticates the request, verifies its authority boundary, and issues either a public request or a signed opaque envelope.
2. Concord verifies envelope integrity, freshness, expected version, lawful vocabulary, authorization receipt, eligibility attestation, and required fields. Invalid or missing input is held; Concord does not repair it by inference.
3. The scheduler excludes candidates that fail qualification, authorization, availability, workload ceiling, minimum-service floor, procedural floor, or known conflict predicates.
4. It applies the supplied urgency/deadline classes and then continuity, bottleneck reduction, workload balance, experience, and fair rotation according to the pinned legislated rule version. Stable opaque tie-breakers make replay deterministic.
5. The scheduler emits a proposal and an explanation vector. The vector reports each dimension and tie-break separately; it is not a scalar score.
6. The independent checker evaluates only objective predicates against the exact proposal hash and rule version.
7. An objective violation automatically blocks commitment and records the failed predicates. The scheduler may create a new proposal, which receives a new check.
8. A pass permits reservation, subject to still-valid authorization and inputs. It does not certify legal interpretation, procedural fairness, accusation merit, or optimizer optimality.
9. A challenge after a pass first preserves the proposal, checker result, petition, and credit receipt. JON-32's neutral admission gate decides only whether a legitimate interpretive legal question exists. If admitted, the competent court decides it; if not admitted, the checker result remains unchanged.
10. Every stay, remedy, reschedule, cancellation, or completion is a new attributable event linked to the original chain.

## 6. Staffing, fairness, and high-impact proceedings

Qualification and authorization are hard gates. Experience may be a minimum predicate or a lawful balancing input, never a proxy for personal worth. Workload ceilings and minimum service floors prevent starvation. Fair rotation is evaluated among otherwise lawful candidates and retains prior selection/deferral history so repeated ties do not always favor the same participant.

Continuity preference may retain a qualified participant when handoff cost or safety is documented, but it cannot bypass a service floor, deadline class, rotation limit, authorization, recusal/conflict predicate, or checker rule. A lawful priority class changes queue treatment; it does not change anyone's rights or the merits of their work.

High-impact proceedings can receive additional qualified capacity or earlier intervals when their authoritative envelopes and available capacity support that result. This must remain an emergent allocation effect, not personal privilege. Before proposing it, the scheduler mechanically verifies that ordinary minimum service floors remain satisfied and that neither self-represented side is materially weakened in preparation time, relied-upon evidence access, communication/response capacity, scheduling opportunity, or ability to present its own case. If those facts require interpretation, the scheduler holds for an authoritative input or directive; it does not decide legal fairness.

Concord allocates time, capacity, and access windows. It does not assign or recognize lawyers, counsel, public defenders, advocates, or representatives for a party.

## 7. Checker continuity and outage state model

Each protected scheduling domain designates one primary checker and, optionally, an independently approved same-domain standby. Approval, generation compatibility, health lease, and capability scope are verified before use.

```text
PRIMARY_AVAILABLE
  -> PRIMARY_DEGRADED
  -> STANDBY_ACTIVE          primary lease unavailable; approved standby lease valid
  -> CHECKER_UNAVAILABLE     neither valid checker is available
  -> RECOVERING              checker restored; frozen proposals revalidated
  -> PRIMARY_AVAILABLE
```

The standby restores availability only. It checks proposals that lack a completed valid result; it cannot rehear, override, or supply a second opinion on a primary result. A rule-version change or changed proposal requires a fresh check because the input changed, not because a second opinion was requested.

When neither checker is available:

- affected ordinary work moves to `FROZEN_CHECKER_OUTAGE` at the last safe checkpoint;
- no new affected ordinary reservation may commit;
- only a category predesignated by lawful authority as essential continuity may proceed;
- essential work proceeds only for the minimum scope and interval in its signed designation, with valid authorization and qualification, under the last compatible pinned rule version;
- no actor, scheduler, or operator may label work essential during the outage to bypass the freeze; and
- outage, attempted bypasses, essential uses, checkpoint state, and recovery are recorded append-only.

On restoration, Concord verifies checker/policy compatibility, expires stale reservations, and rechecks every frozen or essential-continuity proposal whose inputs, authorization, rule version, or interval changed. Work resumes from a recorded checkpoint; no outage result is silently backfilled.

## 8. Handoff checkpoints

A checkpoint is a domain-authored safe boundary, not a copy of protected work. It includes an opaque work/version reference, completion fraction or phase class, outstanding dependency classes, reserved resource state, next permissible action class, expiry, integrity digest, and authorized custodian. Public checkpoints omit protected details.

A handoff requires:

1. an immutable checkpoint event from the outgoing interval;
2. domain confirmation that the checkpoint is safe and complete enough to transfer;
3. current qualification, eligibility, authorization, and conflict attestations for the incoming participant;
4. capacity/service-floor validation for both releasing and receiving schedules;
5. a new proposal and checker result for the changed assignment; and
6. explicit acceptance linked to both participants' interval records.

If any required receipt is absent or a protected domain is unavailable, the item remains `HANDOFF_PENDING` or freezes. The global allocator never opens protected work to manufacture a checkpoint.

## 9. Interval donation

An interval donation transfers offered capacity, not priority, authorization, qualification, or a right to choose the recipient. Donation states are `OFFERED`, `VALIDATED`, `ALLOCATED`, `CONSUMED`, `RETURNED`, `WITHDRAWN`, or `EXPIRED`.

- The donor authenticates an offer with interval, capacity units, permitted scope, and expiry.
- Validation ensures the offer is voluntary, unencumbered, and will not breach the donor's workload, service, continuity, or procedural floors.
- The scheduler allocates donated capacity through the ordinary eligibility, priority, rotation, authorization, and checker path.
- The donor may withdraw unallocated capacity; allocation acceptance pins the interval unless a lawful cancellation rule applies.
- Unused capacity returns or expires according to the recorded rule. It creates no petition credit, queue priority, personal favor, reciprocal obligation, or authority grant.

Protected donors and recipients remain opaque to the global allocator unless separately authorized for disclosure.

## 10. Continuation requests

A continuation request asks to extend an active assignment past a checkpoint. It is not an entitlement and does not modify urgency. It records the current allocation, requested interval, checkpoint, continuity rationale class, remaining-work class, participant consent/availability, and domain attestations.

The scheduler treats the request as a new versioned proposal. It may preserve the incumbent only when qualification and authorization remain valid, continuity benefit is recognized by the pinned rules, checker availability exists, and workload, rotation, deadlines, ordinary service floors, and every party's procedural floors remain satisfied. Denial returns the work to ordinary allocation at the checkpoint; it is not an adverse merits or fairness ruling.

## 11. Scheduler-rule rollout

A scheduler rule changes only after legislation or another competent rulemaking act supplies an authenticated rule artifact. The artifact identifies its authority, exact version/hash, effective scope, deterministic migration behavior, safety invariants, observability measures, stage gates, rollback target, and sunset/review terms.

Rollout states are:

```text
PROPOSED -> ENACTED -> SYNTHETIC -> CANARY -> BROADER -> GENERAL
                         |           |          |
                         +--------> ROLLED_BACK
any active stage -----------------> SUSPENDED_BY_AUTHORITY
```

- `SYNTHETIC` replays versioned fabricated and de-identified edge cases without affecting live allocations.
- `CANARY` applies only to an expressly permitted low-risk cohort while the prior version remains available.
- `BROADER` expands only to the enacted scope after recorded stage-gate evidence.
- `GENERAL` occurs only after all enacted gates pass and the authorized effective event is recorded.

Stage advancement is attributable and never automatic merely because time elapsed or an optimizer metric improved. At every stage Concord compares rule violations, service-floor breaches, starvation/rotation distribution, missed deadlines, handoff disruption, outage behavior, protected-data leakage, and unexplained allocation changes. Legality and authorization are invariant gates, not rollout metrics to trade off. A rollback pins new proposals to the prior authorized version; already active work follows the enacted migration rule and is never silently rewritten.

## 12. Workbench presentation contract

Workbench views use four adjacent lanes or columns—Capacity, Lawful priority inputs, Checker legality, and Authorization—plus separate continuity/outage and petition/adjudication timelines. Each value shows its issuer, freshness, version, and reason code. A user can inspect why a proposal was selected by viewing the ordered constraint/tie-break vector.

Forbidden presentations include:

- a composite rank, readiness, fairness, risk, or confidence score;
- ordering people by office, status, perceived worth, accusation, or merits;
- treating `PASSED` as legally fair, authorized, or optimal;
- treating authorization as inferred from scheduling or protected labeling;
- showing protected names, exact queue position, membership, mission, case identity, allegations, or evidence in a public/global view; and
- presenting standby output as an appeal or alternate opinion.

Distinct colors may supplement labels but never carry the distinction alone. Every blocked/frozen state includes a textual reason and responsible next authority, without exposing protected substance.

## 13. Acceptance scenarios

1. **Ordinary public allocation:** two qualified candidates fit; the pinned rotation rule selects one. The proposal shows capacity and rotation reasons separately, passes the checker, and reserves without a composite score.
2. **Lawful urgency input:** an institution supplies an authenticated deadline/urgency class. The item advances mechanically; the scheduler cannot raise that class or describe the work as more important.
3. **Protected allocation:** the global allocator receives a coarse signed envelope and returns an opaque reservation. Public/global records reveal no case identity, allegation, internal queue order, or local assignee.
4. **No express authority:** an otherwise qualified protected initiative lacks a valid JON-38 grant receipt. It is held for authorization; scheduling and a protected label do not confer authority.
5. **Objective violation:** a proposal breaches a workload ceiling. The checker records the exact predicate and blocks it automatically; a new compliant proposal receives its own check.
6. **Optimizer disagreement:** the checker prefers another qualified candidate but finds no rule breach. It must pass; optimizer preference is not a legality failure.
7. **Interpretive challenge:** a passed action is challenged on a constitutional interpretation. The checker result is preserved, a credit receipt is linked, and the separate admission gate—not the scheduler/checker—routes or rejects the question.
8. **Duplicate petition:** the ledger marks the filing duplicate. Its consumed credit is not refunded or merged, even if the earlier petition later succeeds.
9. **Standby activation:** the primary loses its lease before checking a proposal. A compatible approved same-domain standby checks it. The standby cannot revisit an existing primary result.
10. **Total checker outage:** both leases fail. Ordinary affected work freezes at checkpoints. Only a previously designated essential category proceeds for its authorized minimum interval, and recovery triggers required rechecks.
11. **High-impact proceeding:** extra capacity is available and lawful inputs justify expedition. Allocation proceeds only while ordinary service floors and both self-represented sides' procedural floors remain satisfied; no personal rank is stored.
12. **Handoff:** an active worker becomes unavailable. Protected details remain local, a safe checkpoint is recorded, the replacement passes current eligibility/authorization and a fresh check, and the event chain remains auditable.
13. **Donation:** a person offers an interval. The offer cannot name an ineligible favorite or raise priority; unused capacity returns under the pinned rule and creates no credit or reciprocal claim.
14. **Continuation:** an incumbent requests another interval. Continuity is recorded separately, and the request is denied if it would breach a service floor or rotation constraint; denial makes no fairness or merits judgment.
15. **Canary regression:** a new enacted rule increases service-floor breaches in its canary cohort. Advancement stops and the authorized rollback is recorded; legality/authorization gates were never relaxed.
16. **Public visualization:** capacity is healthy, urgency is high, checker state is unavailable, and authorization is valid. The Workbench shows all four facts separately and the resulting freeze, not an averaged amber score.

## 14. Implementation handoff gates

Runtime implementation requires separate authorization. Before implementation begins, owners must pin schemas/vocabularies, authoritative service interfaces, legislated allocation rules, essential-continuity designations, service/procedural floor predicates, checker deployment/approval identities, and rollout stage gates. Tests must replay every acceptance scenario across public and protected projections and prove deterministic results from the same versioned inputs.

This design does not authorize Concord to implement JON-17 authorization, JON-61 adjudication, or any unresolved policy value. Those systems remain external authorities consumed through authenticated, versioned receipts.
