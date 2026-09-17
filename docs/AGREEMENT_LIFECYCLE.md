# Concord agreement lifecycle and provenance contract

**Status:** design contract; no runtime implementation is claimed  
**Canonical owner:** JON-19, agreement lifecycle and institutional-party continuity  
**Decision basis:** owner instruction dated 2026-09-16 and JON-31 Option C

This contract defines the one authoritative lifecycle that Concord consumers use for agreements. Market, barter, and settlement design may create commitments through this contract, but it must not create a second agreement registry. Security gateways, institutional identity, public-ledger publication, and substantive adjudication remain with their canonical owners.

Normative terms such as **must**, **may**, and **must not** describe future implementation behavior.

Controlling sources are [JON-19](https://linear.app/jons-garage/issue/JON-19/agreement-lifecycle-and-institutional-negotiation), [JON-31](https://linear.app/jons-garage/issue/JON-31/choose-agreement-transfer-rule-for-a-surviving-institution), and the [shared operating instructions v3.0](https://linear.app/jons-garage/document/linear-shared-operating-instructions-v30-a2acbf8880f2). Boundary inputs are [JON-17](https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores), [JON-18](https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model), [JON-25](https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture), and [JON-38](https://linear.app/jons-garage/issue/JON-38/define-protected-or-authority-bearing-initiative-boundary).

## 1. Domain boundary and invariants

An agreement is a first-class authoritative object only after all required parties assent to the same immutable agreement revision and an authorized agreement writer registers that revision. A negotiation, offer, collected signature, Archivist publication, or Workbench display is not registration.

The following invariants apply:

1. **Exact assent.** Every required assent binds the same `contentDigest` and `partyScopeDigest`. A change to text, incorporated material, parties, capacities, class, scope, authority, or required assent set creates a new proposed revision and makes earlier assents inapplicable to it.
2. **One registry.** The agreement registry is the lifecycle authority. Consumers hold agreement, revision, obligation, and event references; they do not reproduce lifecycle state as their own authority.
3. **Bounded effect.** Only identified parties and members of an expressly defined party class within its recorded temporal, territorial, subject-matter, and capacity scope are bound. Labels, negotiation participation, committee membership, or publication cannot enlarge that scope.
4. **Lawful authority.** A representative's authenticated identity and authority to bind the named party are separate facts and must both be verified at assent and registration. A project has protected authority only through the express grant required by JON-38.
5. **Priority of law.** Higher law and a higher lawful authority control a conflict. Registration does not legalize an unlawful term. At the same authority level, a later instrument changes an existing agreement only through an explicit amendment, termination, or supersession link; chronology or similarity alone is insufficient.
6. **Append-only history.** Negotiation events, assents, registration decisions, amendments, performance events, breach/cure records, continuity events, and terminal events are appended. Corrections add a correcting event that identifies the erroneous event; they do not alter or erase it.
7. **Obligation-local performance.** Breach and cure are tracked per affected obligation and party position. An allegation is not an adjudication. Unaffected obligations continue unless an authoritative stay, amendment, termination, supersession, or controlling law says otherwise.
8. **Cure first.** A remediable alleged breach cannot become adjudication-eligible until notice and its applicable cure opportunity have completed unsuccessfully. A controlling rule may identify a breach as non-curable, but the rule and determination must be recorded rather than silently bypassing cure.
9. **Institutional continuity.** An institutional party is identified by a stable institution ID, not its current officeholders or members. Membership or officeholder changes do not amend the party position.
10. **No surviving-institution transfer.** Under JON-31 Option C, while the original institutional party survives, no assignment, substitution, novation, or equivalent operation may move its position directly to another institution. The ordinary lifecycle must alter or end the old arrangement as legally appropriate, and any replacement institution must assent to and register a new agreement. The records are explicitly linked.

## 2. Authoritative records

### 2.1 Negotiation and immutable revision

A `Negotiation` has a stable `negotiationId` and an append-only sequence of proposals, counteroffers, withdrawals, rejections, expirations, and assent events. Each `AgreementRevision` contains:

- `agreementId` (reserved before registration), `revisionId`, and `negotiationId`;
- immutable original text bytes, media type, canonical display encoding, `contentDigest`, and references plus digests for every incorporated attachment;
- a party manifest of stable party IDs, party type (`person`, `institution`, or explicit `class`), legal capacity/role, representative when applicable, and the exact scope in which each position is bound;
- `partyScopeDigest`, computed over the complete party manifest and required assent set;
- discrete stable `obligationId` entries identifying obligor, beneficiary, required performance, conditions, due rule, scope, and any agreed cure rule;
- governing authority/jurisdiction references, precedence level, effective rule, expiration rule, and severability rule if one was expressly agreed or supplied by controlling law; and
- `predecessorRevisionId` and a typed lineage reason for every revision after the first.

The registry preserves the submitted bytes. A renderer or normalized search copy is derived and cannot replace the signed source. Digest and signature algorithms are versioned in the record.

### 2.2 Assent

An `Assent` records `assentId`, party position, signer identity, representative capacity, authority evidence, `revisionId`, `contentDigest`, `partyScopeDigest`, signature/proof, and authenticated time. Duplicate assent to the same tuple is idempotent. Conflicting assent is not merged.

The required assent set is complete only when every required party position has a valid, unrevoked assent to that exact revision. Assent may be revoked only before registration unless controlling law provides a later mechanism; revocation is appended. Registration must fail if assent is missing, revoked, mismatched, unauthorized, expired, or cryptographically invalid.

### 2.3 Registered agreement and obligations

The model uses orthogonal state projections so one opaque status cannot hide legally distinct facts. Negotiation state is scoped to the negotiation, formation state to each immutable revision, agreement effect to the registered relationship, and obligation/incident state to the named child record:

| Projection | States | Meaning |
| --- | --- | --- |
| Negotiation | `OPEN`, `COMPLETED`, `ABANDONED` | Whether the negotiation can accept another proposal. Abandonment leaves provenance but creates no agreement. |
| Revision formation | `PROPOSED`, `ASSENTING`, `READY_TO_REGISTER`, `REGISTERED`, `REGISTRATION_REJECTED`, `WITHDRAWN`, `EXPIRED` | Exact-assent and registration state of one immutable revision. Rejected, withdrawn, and expired revisions remain historical; a corrected proposal has a new revision ID. |
| Agreement effect | `PENDING_EFFECT`, `ACTIVE`, `TERMINATED`, `SUPERSEDED`, `EXPIRED` | Legal effect after registration. Terminal states are irreversible; a later relationship is a linked revision or agreement, not reactivation. |
| Obligation effect | `PENDING`, `IN_FORCE`, `STAYED`, `SATISFIED`, `RELEASED`, `ENDED` | Independent state for each obligation. `STAYED` requires a controlling authority/rule reference. |
| Breach/cure incident | `ALLEGED`, `NOTICE_EFFECTIVE`, `CURE_OPEN`, `CURED`, `CURE_FAILED`, `ADJUDICATION_ELIGIBLE`, `REFERRED`, `DECIDED`, `WITHDRAWN`, `DISMISSED` | Procedural state for one alleged breach. `CURE_FAILED` may transition to eligibility only after the cure deadline/determination; `DECIDED` records the adjudicator outcome and remedy references. |

`REGISTERED` requires a registration receipt. Depending on the revision's effective rule, agreement effect becomes `ACTIVE` immediately or remains `PENDING_EFFECT` until the recorded condition occurs. Revision formation state does not regress after registration.

Registration is an atomic compare-and-append operation. The authorized writer receives the exact revision, assent set, authority evidence, controlling-law references, and `expectedVersion`. It either appends one registration decision and receipt or returns a typed rejection without partial registration. At minimum it verifies exact-digest assent, the required assent set, party identity/capacity, representative authority, class/scope determinacy, writer authorization, expected version, and known higher-law conflicts.

A registered revision is immutable. Discovery of a conflict later appends the controlling legal determination and changes only the affected obligation projection as directed. If the controlling record does not supply severability, the registry must not invent it; effect remains explicit and reviewable.

## 3. Lifecycle transitions

### Formation

```text
PROPOSED ---------> ASSENTING
PROPOSED ---------> WITHDRAWN | EXPIRED
ASSENTING --complete exact assent----> READY_TO_REGISTER
ASSENTING --new proposal-------------> WITHDRAWN (successor is PROPOSED)
READY_TO_REGISTER --valid receipt----> REGISTERED
READY_TO_REGISTER --typed rejection--> REGISTRATION_REJECTED
READY_TO_REGISTER --new proposal-----> WITHDRAWN (successor is PROPOSED)
```

`REGISTRATION_REJECTED` describes the submitted revision and attempt. The negotiation may append a corrected successor revision; it does not overwrite or retry the rejected bytes as though no decision occurred.

### Amendment

An amendment is a new immutable `AgreementRevision` linked to the currently registered revision. It identifies every added, changed, released, or retained obligation. It requires exact assent from the assent set required by the existing agreement and controlling law, followed by authoritative registration. Until its effective point, the earlier registered revision remains controlling. Registration appends an `AMENDMENT_REGISTERED` event; the prior revision remains readable and is never rewritten.

An amendment cannot be used as a direct transfer mechanism forbidden by JON-31. If a surviving party is to leave, its own position may be ended or changed through the lawful lifecycle, but a replacement institution obtains a position only through a separately assented and registered new agreement linked to that event.

### Breach, cure, and adjudication eligibility

An allegation opens an incident against specific `obligationId` values and records claimant, respondent, asserted facts/evidence references, notice rule, cure rule, and deadlines. Effective notice opens cure when the alleged breach is remediable. Cure submissions and evaluations append evidence and determinations.

- Successful cure transitions the incident to `CURED`; the obligation remains or returns `IN_FORCE` unless it was satisfied or another authority changes it.
- An elapsed deadline alone does not fabricate proof. An authorized evaluation records `CURE_FAILED`, after which the incident becomes `ADJUDICATION_ELIGIBLE` if its procedural prerequisites are satisfied.
- Referral and decision are separate appended events. A decision may find no breach, confirm breach, specify remedy, stay/release/end an obligation, or invoke a lawful terminal mechanism.
- Failure of one obligation does not stop any other obligation. A global consequence requires its own controlling authority and explicit affected-obligation set.

### Termination, expiration, and supersession

Termination requires a registered terminal event identifying authority, effective point, reason, affected obligations, and any terms that expressly survive termination. Expiration follows the registered expiration rule and likewise appends evidence of the condition/time used. Both end only the obligations their controlling rules end. A terminal agreement-effect state prevents new performance from arising under the ended relationship; obligation projections still expose accrued or expressly surviving duties until those duties are satisfied, released, or ended.

Supersession is never inferred. A new registered agreement or revision must explicitly name the predecessor, state `SUPERSEDES`, identify the affected scope and effective point, and possess authority at least sufficient for that scope. The predecessor then becomes `SUPERSEDED`; retained historical obligations and already accrued claims remain visible according to the controlling terms.

## 4. Institutional-party continuity

- A committee agreement binds the committee's stable institutional position. Adding, removing, or replacing members or officers appends identity/representation provenance elsewhere but leaves the agreement party and obligations unchanged.
- Dissolution of a committee appends a continuity event and terminates its agreements at the lawful dissolution point unless lawfully assumed. The dissolved committee's position cannot survive by contract wording alone. Accrued duties of another surviving party remain visible when controlling law or the registered terms make those duties survive termination. No assumption is inferred from successor membership, similar purpose, shared assets, or display name.
- A lawful post-dissolution assumption must identify the dissolution authority, the rule permitting assumption, the successor institution, exact assumed obligations, effective point, and a newly assented/registered position or agreement as controlling law requires. It links back to the dissolved party and agreement without rewriting them.
- Dissolution of one party does not terminate another surviving institution's own obligations unless the agreement or controlling law expressly makes that consequence applicable.
- While an institution survives, continuity events must reject `TRANSFER` or `SUBSTITUTE` commands. A replacement relationship uses explicit termination/supersession/amendment as applicable plus a newly registered agreement; all predecessor/successor links remain append-only.

## 5. Provenance envelope and interfaces

Every authoritative event carries:

- stable `eventId`, aggregate type/ID, `sequence`, `expectedPreviousEventId`, `previousEventHash`, and `eventHash`;
- event type, schema version, immutable payload digest, recorded time, claimed occurrence/effective time, and the distinction among them;
- authenticated actor/source identity, acting capacity, institutional credential reference, authorization/capability reference, and signature/proof;
- agreement, revision, negotiation, obligation, incident, predecessor/successor, and controlling authority IDs when applicable; and
- correction/supersession references, visibility/publication class, and source-record references.

Hash links are tamper evidence, not substantive authority. Authorization is evaluated against the authority and policy generation applicable to the event; later publication cannot manufacture validity.

The lifecycle domain exposes technology-neutral commands and reads:

| Interface | Input | Authoritative output |
| --- | --- | --- |
| `appendNegotiationEvent` | negotiation/version, typed proposal or disposition, actor proof | accepted event or typed conflict/rejection |
| `recordAssent` / `revokePreRegistrationAssent` | exact revision digests, party position, authority and signature proofs | assent event and completeness projection |
| `registerAgreementRevision` | revision, assent set, authority/law references, expected aggregate version | receipt with agreement/revision/version/effective state, or typed rejection |
| `recordPerformanceEvent` | agreement/revision/obligation, performance evidence, actor proof | obligation event and projection |
| `openBreachIncident` / `recordNotice` / `recordCure` / `evaluateCure` / `referForAdjudication` / `recordDecision` | incident/version, affected obligations, authority, evidence/rule references | incident event and independent incident/obligation projections |
| `registerAmendment` | successor revision, exact assent set, change map, expected version | amendment receipt and lineage |
| `terminateAgreement` / `registerSupersession` / `recordExpiration` | authority, exact scope, effective rule, successor where applicable | terminal event and affected projections |
| `recordInstitutionContinuity` | institution status event, authority, scope, assumption/new-agreement references | continuity event or typed Option C rejection |
| `getAgreementHistory` | agreement ID and authorized visibility | ordered immutable events plus verification status |
| `getAgreementProjection` | agreement/revision and as-of version/time | formation, effect, obligation, incident, party-continuity, and lineage projections with source event IDs |

Security/domain authorization, capabilities, expected-version recovery, and store isolation are supplied by JON-17. The agreement writer is the only service that changes lifecycle authority. JON-18's Archivist may publish authenticated agreement source records under its publication rules, but publication is a read model and cannot register, amend, adjudicate, or terminate an agreement.

JON-25 may submit proposed commitment terms and consume registered agreement/obligation IDs plus performance events. It owns valuation, matching, reservation/anti-double-commit planning, and settlement orchestration; lifecycle outcomes return through the interfaces above rather than a market-owned agreement status.

## 6. Workbench contract

Authorized Workbench views present distinct, source-linked panels for:

- negotiation chronology, immutable proposal versions, withdrawals/rejections, and the current proposed revision;
- exact signed text and attachments, per-party assent, digest match, capacity/authority evidence, and registration receipt/rejection;
- the active revision beside append-only amendment and predecessor/successor lineage;
- party class/scope and institutional identity separate from current representatives/members;
- obligation-by-obligation effect and performance;
- allegation, notice, cure window/evidence/evaluation, adjudication eligibility/referral/decision;
- explicit termination, expiration, or supersession authority and scope; and
- membership, dissolution, assumption, and surviving-institution continuity events.

Views must show source event IDs, effective/recorded times, verification state, and authorization-limited redactions. They must not collapse legality, assent, registration, performance, breach, cure, or continuity into a single score or infer missing authority from a favorable score.

## 7. Design acceptance scenarios

1. **Exact-text mismatch:** Given two required parties sign different content or party-scope digests, registration is rejected; both assents and the rejection remain traceable.
2. **Post-assent edit:** Given all parties assented, when any text, attachment, party, capacity, class, or scope changes, a successor proposal is created and the old assents do not satisfy it.
3. **Registration authority:** Given matching assent but an unauthorized representative or writer, registration fails and no agreement becomes authoritative; publication cannot cure the failure.
4. **Scoped class:** Given a registered agreement binds a precisely defined class in one jurisdiction and time window, an otherwise similar person outside any boundary is not projected as bound.
5. **Authority conflict:** Given a term conflicts with higher law, the higher rule controls and the affected obligation exposes the controlling determination; unrelated obligations do not disappear. A same-level later record has no effect without explicit amendment or supersession.
6. **Cure first:** Given a remediable alleged breach, adjudication referral is rejected before effective notice and cure completion. Successful cure closes the incident as `CURED` without terminating the agreement.
7. **Failed cure:** Given effective notice, an expired cure window, and an authorized failed-cure evaluation, the incident becomes adjudication-eligible while unaffected obligations remain in force.
8. **Append-only amendment:** Given a valid registered amendment, an as-of read reconstructs both the original and amended revision, exact assent/registration for each, their change map, and their effective boundary.
9. **Committee membership:** Given a committee replaces every member while the institution survives, its party ID and agreement obligations are unchanged; representative history remains separately traceable.
10. **Committee dissolution:** Given authoritative dissolution without lawful assumption, committee agreements terminate at the dissolution point. Another surviving party's independent obligations continue unless an explicit controlling term ends them.
11. **Lawful assumption after dissolution:** Given a rule permits a successor to assume specified obligations and all required new assent/registration occurs, the successor position links to—not overwrites—the dissolved institution and exact assumed scope.
12. **Option C rejection:** Given Institution A survives, a request to substitute Institution B directly into A's position is rejected. A lawful terminal/change event for the old arrangement and B's separately assented, registered new agreement produce linked histories.
13. **Explicit supersession:** Given two same-level agreements cover similar subject matter, both remain independently effective until the newer agreement explicitly identifies the predecessor and superseded scope.
14. **Transparent Workbench:** Given an authorized reader, the Workbench can independently verify negotiation, exact assent, registration, amendment lineage, each breach/cure incident, terminal state, and institutional continuity without relying on an aggregate score.

## 8. Dependency ownership

- **JON-19:** the lifecycle, agreement/obligation/incident projections, Option C enforcement, institutional-party continuity, and the provenance links defined here.
- **JON-17:** security domains, gateways, authentication/authorization plumbing, writer/store isolation, capabilities, expected-version mechanics, and recovery.
- **JON-18:** submission envelopes, publication classes, Archivist publication, corrections on public/protected ledgers, and consumer visibility.
- **JON-25:** market primitives, valuation, matching, reservations/anti-double-commit behavior, and settlement planning that consume this registry.
- **JON-38:** the express grant required before a project can exercise protected/governmental authority.

This separation leaves one lifecycle authority while allowing each subsystem to retain its own decisions and implementation plan.
