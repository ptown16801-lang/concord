# Concord marketplace and deal-making contract

**Design record:** JON-25

**Record date:** 2026-09-17

**Status:** design contract; no product implementation or component selection is authorized by this record

## 1. Decision and boundaries

Concord should model barter, labor, services, and reciprocal obligations as negotiated agreements whose commitments can be matched and settled. It should not model them as opaque token transfers.

The marketplace owns discovery, offers, matching proposals, capacity reservations, performance receipts, and settlement projections. It does **not** own another agreement lifecycle. A deal becomes binding only through JON-19's canonical exact-assent and authoritative-registration path. Amendments, breach, cure, adjudication eligibility, supersession, termination, and party continuity also remain JON-19 states and events.

The design composes with these canonical owners:

| Concern | Canonical owner | Marketplace dependency |
| --- | --- | --- |
| Agreement validity and lifecycle | [JON-19](https://linear.app/jons-garage/issue/JON-19/agreement-lifecycle-and-institutional-negotiation) | Register the exact accepted deal text and project its lifecycle; never maintain an independent binding-state flag. |
| Surviving-party substitution | [JON-31 Option C](https://linear.app/jons-garage/issue/JON-31/choose-agreement-transfer-rule-for-a-surviving-institution) | No transfer while the original institution survives; use the ordinary amendment/termination/supersession and new-agreement path. |
| Authorization and authoritative writes | [JON-17](https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores) | Route protected reads/writes through the appropriate gateway, domain authorization service, and dedicated writer using compatible policy generations, expiring/one-use capabilities, and expected versions. |
| Publication and provenance | [JON-18](https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model) | Submit authenticated source records to the Archivist; only the Archivist writes public-ledger entries. Protected negotiation material does not become public merely because it exists. |
| Protected authority | [JON-38 Option A](https://linear.app/jons-garage/issue/JON-38/define-protected-or-authority-bearing-initiative-boundary) | A market listing, match, or deal conveys no governmental/protected authority without a separate express lawful grant. |

The authoritative marketplace can use ordinary transactional storage, signatures, content hashes, hash-linked events, Merkle commitments, and append-only records. A blockchain or cryptocurrency network is not a source of authority, consensus, identity, settlement finality, or provenance in this architecture.

## 2. Chosen market primitives

No single mechanism fits skilled labor, divisible goods, contingent services, and coalitions. Concord should expose a small family of mechanisms behind one offer and commitment vocabulary.

| Primitive | Use | Decision |
| --- | --- | --- |
| Request for quote / proposal | Heterogeneous skilled work, negotiated services, scoped obligations | **Default.** Supports qualifications, milestones, alternatives, and explicit acceptance terms. |
| Bilateral alternating offers | A selected pair negotiating exact scope, consideration, dates, or remedies | **Default negotiation mechanism.** Every counteroffer replaces a referenced proposal; silence is never assent. |
| Sealed-bid auction or procurement | Comparable offers where early bid disclosure would distort behavior | **Supported.** Commit hashes before the deadline, reveal afterward, and record non-reveals; the result is a match proposal, not a binding deal. |
| Continuous double auction / order book | Standardized, divisible service slots or fungible deliverables | **Optional constrained mechanism.** Only for offers sharing an exact schema/version; price-time priority is deterministic and published. |
| Package/combinatorial matching | Barter cycles, bundles, complements, and multi-party exchanges | **Supported with bounded search.** The solver returns a complete proposed package plus objective/explanation, never partial hidden commitments. |
| Posted offer | A standing, versioned offer with explicit eligibility and capacity | **Supported.** Acceptance still requires capacity reservation and JON-19 registration. |

English, multi-attribute, and prediction-market auctions are not initial primitives. They add strategic or financial semantics without improving the core labor/barter contract. A mechanism profile must name its rule version, eligibility rules, tie breaker, deadline/time source, visibility class, withdrawal rule, and deterministic replay inputs.

Matching is advisory. A ranking, auction close, or solver result cannot itself bind a party, spend capacity, transfer authority, or establish fulfillment.

## 3. Canonical marketplace objects

All authoritative objects have a stable ID, schema version, owning security domain, created-at authority/time source, authenticated actor/source, content hash, visibility class, and append-only predecessor/supersession links where applicable.

### 3.1 Service and skill vocabulary

`ServiceDefinition` describes the work rather than asserting that a provider can perform it:

- versioned taxonomy identifier and human-readable scope;
- deliverables and objective acceptance tests;
- units, divisibility, location/mode, prerequisites, dependencies, and exclusions;
- scheduling, concurrency, lead-time, and cancellation constraints;
- evidence and reviewer requirements; and
- default risk, cure, and dispute fields that an offer may narrow or replace explicitly.

`CapabilityClaim` links a party to a `ServiceDefinition` and records claim type (`self_asserted`, `credentialed`, `observed`, or `institutionally_verified`), issuer when present, evidence references, validity interval, limitations, and verification status. It is never silently promoted from behavioral inference to a credential.

`CapacitySlot` is the spendable scheduling primitive: provider, service/version, quantity/unit, time window, concurrency pool, jurisdiction/domain constraints, and current expected version. Capacity is not reputation and is not an agreement obligation until registration.

### 3.2 Offers and packages

An `OfferRevision` is an immutable proposal containing:

- offer and revision IDs plus the revision it replaces;
- authenticated proposer and eligible counterparty set or discovery audience;
- offered and requested `CommitmentTerm` arrays;
- exact service/deliverable definitions and referenced capacity requirements;
- consideration, which may be money-like units, goods, labor, services, promises, or a typed combination;
- milestones, dependencies, deadlines, acceptance evidence, reviewers, cure windows, remedies, cancellation/expiry, confidentiality, and governing authority/jurisdiction;
- mechanism profile, visibility/publication class, and disclosure consent;
- any package-level `all_or_none` and conditional clauses; and
- content hash and signature over canonical bytes.

A `CommitmentTerm` names exactly one obligor, one or more beneficiaries, the deliverable or obligation, quantity/unit, due/activation condition, acceptance rule, capacity resource, and failure/cure terms. Terms may reference each other through explicit dependency edges. Cycles are allowed only within an atomic all-or-none package and must pass legality and feasibility checks.

A `MatchProposal` contains the selected offer revisions, proposed party/term mapping, score components, constraints checked, algorithm and rule version, deterministic tie-break result, and expiry. It is nonbinding and cannot be mutated into an agreement. Assent creates an exact agreement candidate referencing the proposal and all accepted offer hashes.

### 3.3 Evidence and projections

Negotiation actions, concessions, counterpart selection, performance submissions, acceptance/rejection, cure, and breach references enter the longitudinal evidence model as typed observations with source, time, confidence/verification class, and access policy. Formal political affiliation is stored only in its authoritative affiliation domain and is never derived from this evidence.

Research projections may describe observed patterns such as “accepted three shorter deadlines after counteroffers.” They must retain their feature/model version and source links and be labeled as analysis, not as intention, preference, loyalty, ideology, deception, or other mind-reading. These projections cannot grant authority, establish breach, change eligibility, or become agreement facts.

## 4. Negotiation protocol

1. **Discover:** authorized parties read visibility-filtered service definitions, claims, and offers. Protected eligibility, capacity, queue, membership, and mission metadata remain hidden from unauthorized views.
2. **Propose:** the proposer signs an immutable offer revision. Validation checks schema, authority, legality hooks, time source, service versions, and requested capacity shape.
3. **Counter or withdraw:** a counteroffer cites the revision it replaces. Withdrawal/expiry prevents future acceptance but does not erase the revision or observations already lawfully made.
4. **Match:** a mechanism evaluates only eligible current revisions. It emits a replayable, expiring `MatchProposal` with reasons and constraints.
5. **Prepare:** every obligor obtains short-lived reservations for the capacity/resources required by the exact candidate hash. Preparation checks expected versions and authority but creates no agreement.
6. **Assent:** every required party signs the same canonical agreement bytes and candidate hash. Any textual or term change produces a new candidate and requires new assent.
7. **Register:** the JON-19 authoritative registration operation consumes all valid reservations atomically with the exact candidate. Success records the agreement ID on each reservation; failure consumes no capacity and releases or expires the reservations.
8. **Perform and settle:** milestone submissions and determinations reference the registered agreement and append evidence. Settlement projects JON-19 state and releases future reserved capacity only when the controlling lifecycle event permits it.

Messages are idempotent by `(operation_id, actor, candidate_hash)`. Retries return the recorded result. A signature over one candidate cannot be replayed for another candidate, mechanism, domain, or registration operation.

Silence, ranking, provisional award, bid reveal, solver output, partial signature, resource reservation, delivery attempt, or payment instruction is not assent or registration.

## 5. Anti-double-commit contract

The market security domain maintains an authoritative `CapacityReservation` ledger through its JON-17 writer. Each reservation includes resource/slot ID, quantity, interval, agreement-candidate hash, owner, expiry, state, expected resource version, operation ID, and one-use capability ID.

The invariant for every capacity resource and overlapping interval is:

`registered quantity + live reserved quantity <= authoritative capacity`

The writer enforces the invariant with serializable transactions or equivalent compare-and-swap semantics. Reads used to prepare a write carry expected versions; a stale version fails closed. A reservation capability is scoped to one candidate hash, one operation, one quantity, one domain, and one expiry, and is consumed once. Locking only in a matching engine or client is insufficient.

For a multi-party package, one coordinator records a prepare set containing all required reservation IDs and expected versions. Registration either consumes the complete set and registers the exact agreement through JON-19, or consumes none. Expired, revoked-before-admission, mismatched, missing, or already-consumed reservations abort the package. A lawfully admitted cross-domain operation follows JON-17/JON-35 ordering: later revocation alone does not cancel it, while all other validity and lawful-cancellation checks remain effective.

Recovery freezes affected writes, preserves the intent/result evidence, and reconciles by operation ID before reopening. It must never guess that an uncertain registration failed and reallocate capacity. A recorded committed result wins over a retry; otherwise an authorized recovery decision records abort or completion with provenance.

## 6. Multi-party deals

A multi-party deal is one JON-19 agreement with a directed commitment graph, not a loose collection of bilateral agreements, when the package is declared `all_or_none`. Nodes are parties; edges are typed obligations. The package states:

- required parties and exact assent quorum (normally all obligors and any party whose rights/remedies change);
- dependency graph and whether milestones may settle independently;
- package feasibility constraints and reservation set;
- allocation/tie-break objective and complete solver explanation;
- failure propagation: which dependent terms pause, which unaffected obligations continue, and which cure paths apply; and
- exit, replacement, and dissolution behavior consistent with JON-19 and JON-31.

If obligations are intentionally severable, they should be separately registered agreements connected by disclosed dependency references. The UI must not imply atomicity across independently registered agreements.

Coalition membership does not substitute coalition assent or individual assent. A committee obligation follows JON-19 continuity rules across membership changes. A surviving institution cannot have its position reassigned; replacement requires the adopted ordinary lifecycle and linked new agreement.

## 7. Settlement, failure, and dispute rules

Settlement is an authoritative recording operation, not a claim that real-world labor can be rolled back atomically.

- A milestone settles only after the agreement's named acceptance rule is satisfied by an authorized determination or exact automatic test.
- The settlement record names the agreement/term/milestone, submitted evidence, determiner, result, quantities, time, source versions, and resulting releases or reciprocal entitlements.
- Digitally controlled reciprocal entitlements may be released atomically in the same authoritative transaction. External delivery/payment instructions remain pending until independently evidenced; compensation is never marked complete merely because an instruction was sent.
- Partial fulfillment is recorded only when the term defines measurement and partial acceptance. Otherwise evidence remains submitted/pending.
- Rejection must state the applicable acceptance criterion and evidence. It does not erase delivery evidence.
- Apparent nonperformance enters JON-19's breach/cure path. Cure is offered first where the controlling agreement/law requires it; failed cure becomes adjudication-eligible. The marketplace does not adjudicate the dispute.
- Unaffected obligations continue. Only explicit dependency, lawful suspension, amendment, supersession, termination, or adjudicative order changes them.
- Cancellation, expiry, breach, cure, adjudication, and termination release capacity only according to the canonical lifecycle event and effective time. Historical utilization remains append-only.

Escrow, deposits, bonds, credits, or account balances are optional typed commitment resources governed by their own lawful authority. They are not required foundational currency, and their transfer cannot bypass assent, registration, or provenance.

## 8. Valuation and utility hooks

Valuation is a replaceable decision-support interface, not authority:

```text
evaluate(actor_scope, candidate_hash, feature_snapshot_refs, constraints,
         objective_version, policy_version) ->
  {score_components, hard_constraint_results, uncertainty, explanation,
   adapter_id, adapter_version, input_commitment_hash}
```

An actor may keep private utility weights private. The authoritative record stores the disclosed result/explanation and a commitment to exact private inputs when audit or later authorized reveal is required; it must not publish protected inputs. Shared mechanisms publish their objective, constraints, normalization, tie breaker, and algorithm version before use.

Hooks may consider declared cost, time, risk tolerance, verified qualifications, capacity, delivery evidence, and observed agreement history when lawful. They may not treat inferred political affinity as formal affiliation, infer mental state, use protected attributes without authority, silently convert missing evidence into a negative fact, or let a composite reputation score decide breach or eligibility. Counterpart diversity/fairness analysis is reported as a separate research projection.

Every outcome must be reproducible from retained, access-authorized inputs or explicitly marked non-reproducible with the missing input reason. Model updates never rewrite old scores; they append a new projection.

## 9. Authority, persistence, and publication

Authoritative marketplace writes follow Agent → Gateway → authorized mediator → domain authorization → market-domain Writer → authoritative store. The writer verifies synchronized compatible AGT/policy generations and fails closed on mismatch. The market store is not a public ledger and does not collapse institutional, investigatory, Research Library, or artifact stores.

The append-only event stream records offer revisions, withdrawals, commitments/reveals, match proposals, reservations, assent references, registration results, performance evidence, settlement projections, failures, and corrections. Snapshots and indexes are rebuildable projections. Canonical event bytes are signed and hash-linked; batches may be committed with Merkle roots for efficient inclusion proofs. These integrity tools do not create political authority or decentralized consensus.

Publication class is evaluated per record/field. Public offer/result records are submitted by the authenticated source to the JON-18 Archivist, which verifies source identity and alone publishes. Protected negotiation, private valuation, failed authentication/policy attempts, and disclosure packages follow JON-18's protected failure/disclosure contracts. A published correction links to, but never overwrites, its predecessor.

## 10. Workbench contract

The Workbench should provide linked, role-filtered views rather than one economy score:

1. **Market board:** offers/RFQs, mechanism, exact revision, expiry, units, eligibility summary, and capacity availability ranges without protected detail.
2. **Deal room:** side-by-side immutable revisions, semantic term diff, signatures still required, reservation expiry, and a clear distinction among proposal, prepared, assented, and registered.
3. **Commitment graph:** parties and obligation edges, dependency/atomic-package boundary, milestones, current JON-19 lifecycle projection, and unaffected obligations.
4. **Capacity timeline:** available/reserved/registered quantities, conflicts, expiries, and expected-version failures for authorized users.
5. **Settlement ledger:** milestone evidence, acceptance criteria, determinations, reciprocal releases, cure deadlines, and dispute/adjudication references.
6. **Mechanism replay:** eligible inputs, commit/reveal status, ranking or solver objective, excluded constraints, deterministic tie break, and rule/adapter versions.
7. **Provenance inspector:** signatures, hashes, predecessor links, Merkle inclusion proof, source store, Archivist publication link/class, correction chain, and access-redaction reason.
8. **Research lens:** separately labeled longitudinal observations and model projections with source coverage and uncertainty; formal affiliation, credentials, agreement facts, and behavioral analysis remain visually and structurally distinct.

Every view must show whether data is authoritative, submitted evidence, or derived analysis. Redaction must not reveal the existence or size of protected queues, membership, missions, bids, capacity, or counterpart sets.

## 11. Open-source component comparison

This is an options comparison, not a code-selection decision. Any adopted library runs as an untrusted/replayable computation adapter; Concord remains authoritative for identity, authorization, persistence, agreement registration, and publication.

| Candidate | Useful fit | Authority/audit/persistence assessment | Disposition |
| --- | --- | --- | --- |
| [**NegMAS**](https://github.com/yasserfarouk/negmas) (Python, open source) | Bilateral/multi-party automated negotiation, alternating-offer mechanisms, utility functions, and research experiments | Strongest conceptual fit for negotiation research and replay. Its sessions/utilities are not Concord authority; inputs/outputs must be canonicalized, versioned, constrained, and persisted by Concord. | **Preferred prototype adapter** for negotiation and utility experiments, subject to license/version/security review at selection time. |
| [**Mesa**](https://github.com/projectmesa/mesa) (Python, open source) | Agent-based market simulations, schedulers, data collection, scenario comparison | Strong research/simulation fit but no binding marketplace, security gateway, agreement lifecycle, or settlement authority. Simulation outputs must remain derived research records. | **Preferred simulation harness**, not runtime market infrastructure. |
| [**exchange-core**](https://github.com/exchange-core/exchange-core) (Java, open source) | Deterministic high-throughput order-book matching and replay concepts | Useful only for standardized divisible slots. Financial account/order semantics poorly represent negotiated labor, provenance, cure, or multi-party barter; its journal cannot replace the authoritative store. | **Reference/optional constrained adapter**, not the core model. |
| [**GNU Taler**](https://git.taler.net/) (free software, centralized non-blockchain payment system) | Privacy-oriented monetary payment/escrow ideas without foundational blockchain | Better architectural alignment than cryptocurrency, but it settles money rather than skills, obligations, or agreement lifecycle. Separate payment-domain integration would still require authority and evidence adapters. | **Future payment rail candidate only**, not marketplace foundation. |
| [**Hyperledger Fabric**](https://github.com/hyperledger/fabric) / cryptocurrency DEX frameworks | Replicated ledgers, signatures, hash chains, atomic asset swaps | Consensus/token ownership would create a competing authority and persistence model; smart-contract finality cannot establish Concord agreement validity or real-world labor fulfillment. | **Rejected as foundational technology.** Reuse cryptographic patterns, not the ledger. |
| [**OpenBazaar-style decentralized markets**](https://github.com/OpenBazaar/openbazaar-go) | Listings and peer discovery | Decentralized/cryptocurrency assumptions, weak institutional authority integration, and unsuitable protected-data/publication boundaries. | **Rejected as foundation.** UI/discovery ideas may be studied independently. |

Before adoption, a separate implementation task must pin repository/release, verify current license and maintenance/security posture, test deterministic replay and resource bounds, define the adapter failure boundary, and prove that the component cannot write authoritative records directly.

## 12. Design acceptance scenarios

1. **Exact assent:** A provider accepts revision 4 while the requester edits one deadline. Registration rejects the mismatched hashes; the edit becomes revision 5 and all required parties must assent again.
2. **Concurrent capacity:** Two matches prepare the same final service slot. Only the transaction with the current expected version reserves it; the other fails closed and neither ranking is portrayed as a deal.
3. **Atomic barter cycle:** A owes labor to B, B goods to C, and C service to A in an all-or-none package. One missing/expired reservation aborts registration with no agreement and no consumed capacity.
4. **Retry after uncertain response:** Registration commits but the client times out. A retry with the same operation ID returns the original agreement/result and cannot consume reservations twice.
5. **Partial real-world delivery:** Labor is submitted but reciprocal external payment is not evidenced. The labor milestone may be accepted, payment remains pending, and the system does not claim atomic rollback or full settlement.
6. **Cure-first failure:** A missed milestone creates evidence and invokes the registered cure window. Unaffected terms continue; only failed cure makes the matter adjudication-eligible.
7. **Institutional replacement:** A surviving institution's counterparty proposes substituting another institution. The marketplace refuses a transfer operation and points to JON-31's amendment/termination/supersession plus new-agreement route.
8. **Authority separation:** A winning bidder is labeled a protected project. The win grants no protected authority; only an express JON-38-compliant authorization record can do so.
9. **Publication boundary:** A public award and protected private bids exist. The Archivist publishes the authorized award/correction chain; protected bids and failed-authentication details remain in their proper protected records.
10. **Behavior versus affiliation:** A model detects repeat counterpart selection correlated with a group. The Workbench labels this as a versioned observation with uncertainty and does not create/change a formal affiliation or assert motive.
11. **Mechanism replay:** Equal sealed bids are resolved by the predeclared deterministic tie breaker. An authorized reviewer can reproduce the result from committed inputs and rule version without exposing private bids publicly.
12. **Adapter compromise:** A matcher emits an allocation that includes an ineligible party or exceeds capacity. Authoritative validation rejects it; the adapter has no capability to register an agreement or write the ledger.
13. **Policy mismatch:** A gateway uses an incompatible policy generation during prepare. The operation fails closed, no reservation is created, and the protected failure is routed under JON-18 rules.
14. **Correction without erasure:** Acceptance evidence is later found incorrect. A signed correction/supersession event preserves the original, updates the lifecycle projection through authorized process, and produces an Archivist-linked correction when publishable.

The design is accepted when each scenario can be represented without a second agreement registry, a client-side capacity lock, an opaque settlement state, a foundational blockchain, or a path that turns behavioral inference into formal political fact.
