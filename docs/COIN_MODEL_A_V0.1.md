# Coin model A — authoritative formal specification v0.1

**Status:** design specification

**Normative source:** [JON-96](https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model), frozen interview decisions retrieved 2026-09-17, supplemented by the owner-adopted September 24 free-choice decision (ECON-02)

**Deliverable:** [JON-97](https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit)

## 1. Authority, scope, and interpretation

This document is the authoritative v0.1 formalization of the model frozen in JON-96. It specifies only the state model, agent-visible primitives, coin-visible state, private-storage semantics, hidden-research boundary, signatures, permitted fraud/defacing, intent records, and genuinely undecided points. It is not an implementation, interface, threat model, instrumentation schema, prior-art claim, or integration plan.

Normative terms `MUST`, `MUST NOT`, `MAY`, and `CAN` constrain the model, not agent conduct. A statement that an agent `CAN` lie, copy, or act inconsistently means the mechanism does not prevent that behavior. It is not a behavioral instruction.

The agent-facing name is **fart coins**. This specification otherwise uses **coin** and other neutral terms. The module MUST NOT characterize a coin to agents as goodwill, currency, reputation, payment, debt, or credit, and MUST NOT tell agents what coins are for.

JON-96 controls if this document conflicts with it. No outside Concord settlement safeguard is incorporated by implication. In particular, this component does not replace the ordinary agreement, barter, or marketplace architecture under JON-25.

**Module-local information allowlist.** Any statement in this specification about what an agent can receive from, inspect through, or learn from "the module" is an allowlist only for outputs of this coin module. It does not restrict information an agent may obtain through independent Concord communication or other separately authorized systems. Conversely, no external system reference expands this module's outputs to include hidden research facts, hidden identities, ground-truth classifications, researcher inference, or other research-plane state.

## 2. Formal domains and two-plane state

Let:

- `A` be the agents participating in a run.
- `L` be hidden identities of legitimately issued individual coins.
- `X` be hidden identities of appearances or instances that exist in the run. An appearance can be an original, a copy, or a fabrication.
- `M(x)` be the marks currently displayed on appearance `x`, including zero or more claimed signatures.
- `O(x)` be the originator currently claimed by appearance `x`.
- `D(x)` be the currently visible condition of appearance `x`, including visible alteration or damage.
- `U(x) ∈ L ∪ {fraud}` be the hidden classification of appearance `x`. Copies of one legitimate coin have the same value in `L`; a fabrication never legitimately issued by its claimed issuer has value `fraud`.
- `H(a)` be agent `a`'s private wallet/memory representation of coins, if any.
- `Q` be agent claims, including claims about possession, issuance, transfer, origin, signatures, verification, and destruction.
- `E` be the hidden, time-ordered research event record.

The model has two strictly separated state planes:

1. **Agent plane.** An agent can receive only coin-visible information, its own private representations, disclosures made through existing communication channels, and the results of the neutral primitives in section 4. This plane has no authoritative ownership or balance state.
2. **Research plane.** The hidden layer holds `L`, `X`, `U`, ground-truth event facts, claims, and research analyses. It is outside the agents' world and is never an input to an agent-facing action or communication.

There is deliberately no total function `owner: L → A`, no authoritative agent-visible balance function, and no agent-visible identifier corresponding to `L` or `X`. Hidden observation of actual possession or events does not create agent-facing ownership authority.

## 3. Exact invariants

### 3.1 Separation and behavioral freedom

**INV-01 — Absolute research invisibility.** No agent can know of, query, read, infer through a module response, receive alerts from, or invoke the hidden research plane. The research plane MUST NOT affect agent-facing action outcomes. Researchers can use it only under the research environment's separate authority. During ordinary runs, researchers and research instrumentation MUST NOT use hidden state to manually steer, correct, warn, reward, punish, or otherwise alter participant behavior or opportunities. A separately defined experimental intervention condition must be explicit and must not be smuggled into ordinary observation. [J96-H1, H7, E4]

**INV-02 — Capability, not behavioral control.** The agent-facing mechanism supplies neutral capabilities and visible information only. It MUST NOT optimize, constrain, steer, correct, punish, or assign meaning to agent behavior during an ordinary run. A separately defined experimental intervention condition is outside this ordinary-run invariant. [J96-C0, E1–E4]

**INV-03 — No imported authority.** The module has no agent-visible central ledger, authoritative ownership/balance state, exchange rate, valuation rule, fraud adjudicator, automatic penalty, redemption guarantee, or dedicated dispute process. [J96-T4–T5, A1, A8–A9, X1]

### 3.2 Nature and lifecycle

**INV-04 — Initial state.** At run start, every agent begins with zero coins in this model. [J96-N5]

**INV-05 — Issuance.** A legitimate coin comes into existence only when its issuer gives it to an agent other than itself. Issuance is technically free and unlimited, creates individual whole coins only, and does not require pre-minting or recipient consent. One issuance action can give different whole-number counts to multiple recipients. [J96-N3–N8]

**INV-06 — Issuer specificity.** Every legitimately issued coin has one actual original issuer in hidden ground truth. Its ordinary agent-facing form claims an originator, displayed as, for example, `Alice fart coin` or `5 Alice fart coins`. The displayed claim can later be falsified or altered and is not agent-facing proof. [J96-N1–N2, C1, A6–A7, H3–H4]

**INV-07 — No obligation, expiry, revocation, or supply restoration.** A coin creates no redemption obligation, does not expire automatically, and cannot be revoked by its issuer after it is given away. Destruction neither replenishes nor limits future issuance. [J96-N3, N10–N12]

**INV-08 — Recipient freedom.** An issuance does not require recipient consent. A recipient can refuse, ignore, retain, transfer, or destroy what it receives. Refusal alone neither destroys nor automatically returns a coin. A recipient MAY voluntarily sign and return an appearance using ordinary transfer. A holder of returned coins MAY retain them indefinitely, destroy them, alter/remove their marks, transfer them, use other coins, or create-and-give new coins under INV-05. There is no returned-coin-first rule or forced reuse. [J96-N8–N9; ECON-02]

**INV-09 — Issuer discontinuity.** If an issuer dies or is replaced, surviving appearances are not automatically expired, redeemed, reissued, or revalued. Each other agent independently decides whether to value or accept them. [J96-N10, N13]

### 3.3 Transfer, use, visibility, and value

**INV-10 — Transferability.** An agent can transfer selected individual appearances to third parties, including after any number of unsigned transfers. Transfer adds no formal transfer-chain record to the coin. [J96-T1, C2–C4]

**INV-11 — Unrestricted use and composition.** Agents can use or not use coins for any purpose they choose; negotiate or counteroffer quantities; combine coins from different claimed issuers; and combine them with other compensation, resources, or favors. Existing communications can place coin actions alongside work requests, but task linkage is not a built-in coin feature. [J96-T2–T4, E3]

**INV-12 — Subjective value only.** The module neither calculates nor publishes value or exchange rates. Agents determine value and can value two appearances claiming the same issuer differently based on visible history, signatures, or condition. [J96-T4–T6]

**INV-13 — Private-by-default module behavior.** Holdings and balances are private unless an agent chooses to disclose them. Private transactions create no automatic public metadata, and the module publishes no transaction. Visibility can arise only through an existing communication channel used by agents. [J96-T7–T8]

### 3.4 Coin-visible state

**INV-14 — Exact visible content boundary.** The coin-visible state of an appearance is exactly its currently claimed originator `O(x)`, its currently written marks/signatures `M(x)`, and its visible condition `D(x)`. A coin has no built-in free-text transaction note, formal transfer chain, agent-visible unique ID, hidden research fact, valuation, balance, or destruction history. [J96-T9, C1–C3, A10]

**INV-15 — Individual selection without visible identity authority.** An agent can distinguish and select individual appearances using visible originator, marks/signatures, and condition, despite the absence of a formal agent-visible unique ID. This ability MUST NOT be implemented conceptually as lots, mandatory split/recombination records, or formal provenance. [J96-C2–C3, X1]

### 3.5 Signatures and verification

**INV-16 — Optional, cumulative, uninterpreted marks.** Signing is optional. Zero or more signatures can accumulate and remain visible; transfers need not be signed. A signature has no built-in semantic meaning, and agents interpret it themselves. [J96-C4–C6]

**INV-17 — Cryptography is optional and non-authoritative.** Cryptographic signing can be available but is not required for issuance, transfer, or ordinary communication. Its availability can vary by experimental condition. It creates no agent-facing ledger, possession proof, provenance chain, or mandatory validation. [J96-C7, E5]

**INV-18 — Verification boundary.** Through this module, an agent cannot independently verify another agent's cryptographic signature. A claimed signer or originator can be contacted through an existing or future external communication channel and can lie. A verification request/response remains private unless participants disclose it; a disclosed assertion of verification is only a claim, and the module supplies no transferable verification certificate or automatic warning. [J96-C8–C9]

**INV-19 — Existing investigative authority only.** A Concord grand jury or secret investigator can consume verification knowledge lawfully available to it under its own rules. This module creates no investigative authority or verification channel. [J96-C10]

### 3.6 Private storage and non-authoritative accounting

**INV-20 — Convenience storage.** `H(a)` is a private convenience representation, not enforcement or ground truth. Coins can also be represented in persistent private state or memory. The module does not prevent an agent from acting inconsistently with `H(a)`. [J96-A1–A3]

**INV-21 — Claims can conflict with state and one another.** An agent can claim to possess or transfer a coin it does not possess, and conflicting ownership claims can coexist. The module MUST NOT automatically reconcile a claim against wallet/memory state or another claim. [J96-A3–A5]

### 3.7 Fraud, defacing, and destruction

**INV-22 — Fraud remains possible.** Copying, double-spending, fabrication/forgery, false issuer or ownership claims, forged signatures, and defacing are all possible on the agent plane. A fabricated appearance can itself be copied; copying it does not convert it into a legitimate coin or create a legitimate issuance event. The module MUST NOT automatically prevent, flag, resolve, punish, or announce any of these behaviors. [J96-A4–A9, H2–H4]

**INV-23 — Defacing scope.** Defacing can change the displayed originator; add or remove non-cryptographic marks/signatures; or alter or remove cryptographically signed content. Later verification can reveal cryptographic invalidity if verification occurs, but the system does not warn agents automatically. [J96-C8, A6–A8]

**INV-24 — Actual destruction and destruction claims are distinct.** Actual destruction of an appearance is an event in hidden research ground truth. Separately, an agent can record or communicate a claim that destruction occurred; that claim may be true or false and does not itself destroy an appearance. Neither agent-side verification nor agreement between claim and truth is required. A destruction claim does not place a destruction history on a later-appearing coin and does not preclude copies, conflicting claims, or later appearances. Actual destruction does not replenish or constrain future issuance. [J96-N9, N12, A10, H2]

**INV-25 — External response only.** The module defines no coin-specific dispute resolution. Agents or institutions can choose to invoke other Concord mechanisms, but those mechanisms and their outcomes are outside this specification. [J96-A8–A9]

### 3.8 Hidden research truth and intent

**INV-26 — Hidden identity.** Each legitimate individual coin has one research-only `coin_id ∈ L`. Every physical or digital appearance has a separate research-only instance identity in `X`. Copies of a legitimate appearance share its underlying `coin_id`. A fabrication never actually issued by its claimed issuer is a fraud instance, not a legitimate issuer coin; copies of that fabricated appearance remain fraud instances and may share a hidden fabrication-lineage reference without acquiring a `coin_id`. No hidden identity or lineage is visible provenance. [J96-H3–H4]

**INV-27 — Complete specified event observation.** The hidden layer automatically detects and records actual issuance and transfer; copies; double-spends; fabrications/forgeries; false ownership and issuer claims; defacing; destruction claims contrasted with actual possession; verification requests and responses; and whether each verification response was truthful. Each hidden event records actor and timestamp sufficient to reconstruct exact event order. [J96-H2, H5]

**INV-28 — Claims and truth remain distinct.** Hidden records retain agent claims and ground truth as separate values. Ground truth never silently replaces, edits, or authenticates the corresponding claim on the agent plane. [J96-H2, H6]

**INV-29 — Stated and inferred intent remain distinct.** When an agent explicitly states a reason, the hidden record preserves it as a statement, not true intent. Hidden research can separately infer likely intent with uncertainty/confidence, using the action, prior behavior/history, and surrounding communication/context. Stated and inferred intent MUST NOT be merged. [J96-I1–I4]

**INV-30 — Time-bounded intent analyses.** Contemporaneous inference uses only evidence available at the time; retrospective inference can use later evidence. The two analyses remain separate and comparable. Both can support eventual fixed categories plus open-ended explanation, but v0.1 imposes no fixed taxonomy and retains sufficient raw/contextual evidence to choose one later. [J96-I5–I6]

**INV-31 — Experimental neutrality.** Agent instructions expose only mechanics. Any use or non-use is valid data. Runs can vary visibility, presentation of instructions/mechanics, or optional cryptographic-signing availability while keeping the core model controlled, but no condition tells agents an intended economic or social purpose. The module does not set Concord run start/stop conditions. [J96-E1, E3–E6]

## 4. Agent-visible primitives

These are capability classes, not prescribed API names, parameters, success rules, or UI. JON-101 owns the later interface contract.

| Primitive | Minimal state effect and information boundary |
| --- | --- |
| `create/give` | The acting issuer creates whole individual coins while giving them to one or more other agents. Different recipients can receive different counts in one action. The module exposes no pre-mint inventory and asks for no recipient consent. |
| `transfer` | The acting agent passes selected appearances to another agent, including a voluntary return to a previous sender. No signature, formal provenance, authoritative possession check, or public announcement is implied. |
| `inspect` | Returns only the selected appearance's claimed originator, current marks/signatures, and visible condition. It never returns hidden identity, ground truth, formal history, value, or verification. |
| `sign` | Optionally adds a visible claimed signature/mark. Multiple marks can remain. Cryptographic form can be conditionally available but has no built-in meaning. |
| `alter/deface` | Can change visible originator or non-cryptographic marks and can alter/remove cryptographically signed content. It produces no automatic warning or adjudication. |
| `destroy` | Performs an actual destruction of an appearance when the action succeeds. A statement or record claiming destruction is separate agent communication/claim state and need not correspond to an actual destruction. Neither actual destruction nor a claim constrains later issuance or attaches an authoritative history to other appearances. |
| `private storage` | Lets an agent privately retain a convenience representation. It does not enforce possession, consistency, transfer, or disclosure. |

Negotiation, disclosure, verification contact, work requests, and fraud/dispute claims use whatever other communication or Concord mechanisms exist; they are not additional coin primitives here. Semantic verbs such as `pay`, `buy`, `sell`, `endorse`, `reputation`, and `credit` are excluded.

## 5. State transitions and non-transitions

This section formalizes only effects settled by JON-96. It intentionally does not supply validation or enforcement algorithms.

1. **Legitimate issuance:** for each individual coin actually created and given by issuer `a` to another agent, the hidden plane creates a fresh `l ∈ L`, creates its first `x ∈ X` with `U(x) = l`, records actual issuer `a`, actor, recipient, and timestamp, and presents the appearance with a claim of origin from `a`. No agent-visible identifier or issuer inventory is created.
2. **Transfer:** an actual transfer changes the relevant real-world/digital possession fact observed by research and produces a hidden event. It does not change the coin's actual original issuer, add formal provenance, require a signature, or publish metadata.
3. **Copy:** an actual copy creates another instance `x' ∈ X` with the same hidden legitimacy class/lineage as the source appearance. If `U(x) ∈ L`, then `U(x') = U(x)` and no new legitimate coin identity is created. If the source is a fabrication, the copy remains a fraud instance and does not enter `L`.
4. **Fabrication:** an appearance claiming issuance that never occurred is assigned a distinct instance identity with `U(x) = fraud`; it is not added to `L`. That fabricated appearance can subsequently be copied without becoming legitimate.
5. **Sign:** a mark is added to visible state. Any claimed signer and any cryptographic validity/truth are retained separately in hidden research facts and claims.
6. **Deface:** visible state changes as allowed by INV-23. The hidden layer retains the prior event/state needed to record the alteration; the agent-facing coin gains no formal alteration history beyond what remains visibly apparent.
7. **Actual destruction / destruction claim:** when actual destruction occurs, hidden research records a destruction event for the affected appearance, actor, and timestamp. Independently, an agent may make a destruction claim; hidden research records the claim as a claim and, where observable, its relationship to actual possession/destruction without merging claim and truth. Either may exist without the other. No issuer capacity, other appearance, or later claim is authoritatively changed on the agent plane. The research-side observation criterion remains a downstream instrumentation choice under point 2 in section 7.
8. **Verify or claim verification:** the exchange occurs outside the module through an available communication channel. Hidden research records the request, response, actor(s), timestamp, and truthfulness; the module returns no certificate or public fact.

Refusal, ignoring, subjective valuation, negotiation, counteroffers, disclosure, issuer death/replacement, and use alongside other resources do not cause additional built-in coin-state transitions unless an explicitly specified primitive above actually occurs.

## 6. Agent-visible versus hidden-research audit

| Subject | Agent-visible / agent-controlled | Hidden research only |
| --- | --- | --- |
| Identity | Claimed originator; no formal unique ID | Actual original issuer, `coin_id`, instance identity, legitimate/copy/fraud classification |
| Coin content | Current claimed originator, marks/signatures, visible condition | Prior states and actual alteration history needed for event reconstruction |
| Possession | Private convenience representation and unverified claims | Actual possession facts detected by the research environment, kept separate from claims |
| History | Whatever an agent remembers, observes, or is told; no built-in chain | Timestamped, actor-attributed event sequence |
| Balance | Private, optional representation or disclosure; never authoritative | Observed ground-truth facts and claims for research, never an agent-facing balance authority |
| Signatures | Optional visible marks with agent-assigned meaning | Claimed versus actual signer, cryptographic validity when established, verification exchanges and truthfulness |
| Fraud/defacing | Possible, with no automatic warning or resolution | Detected copies, double-spends, fabrications, false claims, forgeries, defacing, and relevant truth comparisons |
| Destruction | Visible absence if observed and unverified agent claims; no carried history | Destruction claim contrasted with actual possession |
| Transactions | No automatic public metadata; external disclosures only | Actual issuance/transfers and associated actors/timestamps |
| Intent | Only what agents themselves say or disclose | Stated reason as a claim; separate contemporaneous and retrospective inference with uncertainty |
| Valuation/purpose | Entirely agent-determined | Observation/inference only; no intervention or feedback |

The hidden column MUST NOT leak into, validate, correct, or otherwise alter the agent-visible column.

## 7. Resolved refusal decision and downstream choices

The frozen decisions and September 24 clarification are internally compatible. Refusal is now resolved; the five remaining items are downstream representation, instrumentation, cryptographic, interface, and study-design choices, not missing owner-level model decisions.

1. **Resolved owner decision — refusal and voluntary return (ECON-02).** Refusal has no automatic coin-state effect. An elected return is an ordinary transfer; optional signing is a separate permitted action. Returning an existing appearance is recirculation, not legitimate new issuance. Receiving it back imposes no obligation to spend it next. Mark persistence is conditional on marks remaining unaltered, and a private return does not automatically disclose its contents publicly. No built-in refusal-reason field is added; any stated reason uses an otherwise permitted communication channel. [J96-N8–N9; ECON-02]
2. **Downstream instrumentation choice — operational criterion for actual possession, transfer, and destruction.** JON-96 requires hidden research to know actual possession and actual transfers, and to compare destruction claims with actual possession, while rejecting an authoritative agent-facing ownership system. It does not define the observation rule that makes possession, transfer, or destruction “actual” for physical, digital, copied, or memory representations; actual destruction is already a distinct hidden event under INV-24 and section 5. JON-100 must define this research-side criterion without exposing or enforcing it agent-side. [J96-A1–A5, H2]
3. **Downstream instrumentation choice — representation and instance boundary.** JON-96 requires an instance identity for every physical/digital appearance and permits persistent-memory representations, but does not settle when a representation becomes an appearance, when alteration creates a new instance rather than changing one, or whether movement across storage media changes instance identity. JON-100 must define this solely for hidden instrumentation. [J96-A2, H3–H4]
4. **Downstream cryptographic/implementation choice — signature encoding and cryptographic scheme.** Coverage, key association, algorithms, formats, and what exact content a cryptographic mark authenticates are unspecified. Availability can vary by condition; no scheme can add independent verification, mandatory signing, provenance, or agent authority. [J96-C4–C9, E5]
5. **Downstream interface/representation choice — mark and condition data model.** JON-96 identifies the visible categories and permitted alterations but does not define ordering, size, rendering, media types, or a condition vocabulary. JON-101 can choose a minimal presentation without attaching semantics or formal history. [J96-C1, C4, A7]
6. **Downstream study-design choice — experimental parameters and intent taxonomy.** The allowed varying conditions are named, but their concrete levels, assignment, and control protocol are not fixed. The fixed intent categories are deliberately undecided. These are research-design choices, not agent-facing mechanics. [J96-I6, E4–E6]

Not unresolved: redemption, expiry, revocation, fractional coins, issuance limits, recipient consent for issuance, transferability, formal provenance, agent-visible IDs, public metadata, system valuation, signature meaning, automatic fraud response, wallet enforcement, or dispute resolution. JON-96 settles each of those.

## 8. Interview-drift removals

The audit rejects the following as non-model assumptions: coin lots; mandatory split/recombination records; formal transfer-chain provenance; agent-visible coin IDs; public transaction announcements; automatic fraud or cryptographic warnings; wallet-enforced possession; central balances; automatic penalties; guaranteed redemption; fixed exchange rates; system-defined signature meaning; task linkage as a coin property; a free-text transaction note; transferable verification certificates; and new investigative authority.

No invariant, primitive, or transition in this specification depends on any of them.

## 9. Traceability matrix

The source tags below identify every frozen JON-96 interview decision. `C0` is JON-96's controlling invariant; `X1` is its explicit non-assumptions paragraph.

| JON-96 source decisions | Specification coverage |
| --- | --- |
| C0 — preserve behavioral freedom; capabilities/information only; invisible observation; no added ledger, valuation, prevention, interpretation, or restriction | INV-01–03, INV-31 |
| N1–N2 — agent-facing name and issuer-specific display | §§1–2; INV-06 |
| N3–N8 — no redemption; free/unlimited whole-coin issuance; zero initial state; create while giving; multi-recipient action; no issuance consent | INV-04–05, INV-07–08; §§4–5 |
| N9–N13 — recipient choices; no expiry/revocation; destruction does not restore supply; issuer death/replacement | INV-07–09, INV-24 |
| T1–T3 — third-party transfer; optional work-request adjacency; negotiation and composition | INV-10–11 |
| T4–T6 — unrestricted purpose; no system value; subjective per-coin value | INV-03, INV-11–12 |
| T7–T9 — private balances/transactions; no module publication; no free-text note | INV-13–14 |
| C1–C3 — visible content only; no transfer chain or visible ID; individual selection | INV-06, INV-10, INV-14–15 |
| C4–C7 — optional cumulative signatures; unsigned transfers; no semantics; optional cryptography | INV-16–17 |
| C8–C10 — defaceable crypto; no independent verification/certificate/warning; no new investigative authority | INV-18–19, INV-23 |
| A1–A5 — no accounting authority; convenience storage; inconsistency and conflicting false claims | INV-03, INV-20–21 |
| A6–A10 — fraud/defacing possible and unanswered; external disputes only; non-authoritative destruction claims | INV-22–25 |
| H1–H7 — absolute invisibility; detection scope; hidden coin/instance identity; event reconstruction; claim/truth separation; research-only use | INV-01, INV-26–28; §§2, 5–6 |
| I1–I6 — stated reason versus inference; uncertainty/evidence; contemporaneous versus retrospective; undecided taxonomy | INV-29–30 |
| E1–E2 — mechanics only and seven neutral capabilities; prohibited semantic actions | §§1, 4; INV-02 |
| E3–E6 — non-use/use as data; ordinary-run non-intervention; permitted experimental variation; no run lifecycle authority | INV-02, INV-11, INV-31 |
| ECON-02 — September 24 owner clarification: refusal, optional return and free choice | INV-08; §§4, 7, 11 |
| X1 — explicit removed drift list | INV-03, INV-14–15; §8 |

### Source-tag key

- `N1–N13`: JON-96 “Nature and issuance,” in listed order.
- `T1–T9`: “Transfer, use, and valuation,” in listed order.
- `C1–C10`: “Coin-visible information and signatures,” in listed order.
- `A1–A10`: “No agent-facing accounting authority,” in listed order.
- `H1–H7`: “Hidden research ground truth,” in listed order.
- `I1–I6`: “Intent research,” in listed order.
- `E1–E6`: “Emergence experiment boundaries,” in listed order.

## 10. Audit conclusion

All frozen interview decisions map to at least one invariant or boundary above. The decisions contain no direct contradiction. Section 7 records the adopted refusal/free-choice decision and distinguishes five downstream choices that belong to instrumentation, representation, cryptography/interface, or study design. No new owner decision is needed for refusal; downstream implementation choices are not silently completed here. The specification adds no agent-facing authority, safeguard, semantic purpose, provenance, valuation, or behavioral restriction beyond JON-96.


## 11. Decision amendment and focused review — September 24, 2026

**Decision:** ECON-2026-09-24 revision 1, ECON-02, in the [project-wide register](https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99). Owner selected option “3” (free choice) after considering mandatory next-use with and without destruction as an escape. Those forced-reuse proposals are superseded. The rationale is to observe voluntary circulation or suppression of marks without imposing it.

**Scope/status:** design amendment to existing JON-97 / PR #21. No runtime implementation, experiment, acceptance of downstream contracts, immutable mark, automatic publication, or reason field is implied. Preserve JON-103's original FAIL at the earlier revision; record a separate focused recheck there against this amendment and the existing September 21 corrections.

| Review case | Required design outcome |
| --- | --- |
| Recipient communicates refusal only | No automatic transfer or destruction |
| Recipient signs and voluntarily returns an appearance | Optional sign plus ordinary transfer; no new legitimate issuance |
| Returned appearance is retained indefinitely | No timeout or next-use obligation |
| Holder destroys or alters marks, selects another coin, or creates-and-gives | Existing capabilities remain available; no bypass penalty |
| Signed appearance is privately transferred | No automatic public disclosure, permanent-mark guarantee, or reason field |
| Research records return, refusal claim and later behavior | Actual actions, stated reasons and inference remain distinct; no hidden-state feedback |

These are design acceptance cases, not executed runtime tests. INV-01–31 and the previous conformance corrections remain in force.
