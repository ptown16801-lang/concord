# Temporary restriction procedures

Status: reviewed proposal, not adopted policy. The current research basis is consolidated revision 0.5 plus the 0.6 timing and boundary-order supplement. Older 0.3 and 0.4 drafts are superseded. Review of the proposal does not authorize implementation or resolve institutional trust, admission and usable-access dependencies.

## Part A — Procedure

## 1. Authority and scope

JON-61 adopted rules  control: Option D severity-based timing, independent review, no automatic suspension from impeachment alone, risk-targeted protection, self-representation, and deterministic reconciliation with actual independent discrepancy review. Bootstrap specification revision 1.0 §§5, 9–12 preserves authority, panel and evidence boundaries.
All new fields, class names and numerical procedures below are proposals. No new emergency power, tribunal composition, voting threshold, offense, or franchise rule is created. JON-79 owns franchise projections; JON-62/60 own terminal consequences.
Primary analogues already inspected: [FRCP 65](<https://www.law.cornell.edu/rules/frcp/rule_65>) for specific orders and bounded review; [18 USC 3142](<https://www.law.cornell.edu/uscode/text/18/3142>) for targeted conditions. These inform structure only; federal powers, standards, counsel and day counts are not imported.

## 2. Scope and proposed timing

Classify the actual aggregate burden, including overlapping orders, rather than the allegation's seriousness or officeholder's importance. Compare a specific operation/resource limit first, then a capability-group limit, then broader office-function limits. Every enlargement needs a recorded explanation of why narrower measures cannot address the concrete risk.

| Proposed class | Actual burden | Initial maximum | Maximum review interval |
| -- | -- | -- | -- |
| S1 limited | Narrow operation/resource; ordinary office function substantially available | 8 complete turns | 4 complete turns |
| S2 substantial | Multiple related operations or a substantial capability group unavailable | 4 complete turns | 2 complete turns |
| S3 severe | Broad otherwise-lawful office-function interference, only where existing law permits | 2 complete turns | 1 complete turn |

These are engineering starting values, not empirically validated optimums or adopted law. The 2:1 ratios make expiry and intermediate review distinct and monotonically shorten both as burden rises. Validate reviewer capacity and defense-access scenarios before adoption; a higher-order conflict overrides the candidate schedule.

Use the authoritative simulation turn sequence, not wall-clock time or the accused's allocated task count. An order effective at boundary t expires at boundary t+N; effectiveness mid-turn uses the next boundary as t, records the partial turn, and discloses that extra fraction. All boundary events require a defined phase order before implementation. Dormancy does not freeze or reset the clock. A qualifying review must finish before the earlier of nextReviewAt and expiresAt; renewal never follows merely from scheduling a review. The deadline rule and missed-review transition below are explicit candidate procedures, subject to adoption with the schedule.

No urgency or short review interval reduces meaningful self-defense or ordinary service floors. If required review cannot finish lawfully before nextReviewAt, the order's review-conditioned restrictive authority lapses at that deadline even if expiresAt is later. Record LAPSED_REVIEW with the missed deadline, last qualifying review and affected scope; cease enforcement based only on that order. Ordinary expiry remains a separate recorded event. Preserve other independently lawful live restrictions, removal and franchise bases; lapse is not a global restoration command. A pending review or appeal cannot extend either deadline. Any independently authorized emergency measure requires its own existing legal basis; this draft grants none. A genuine conflict between mandatory safeguards and the proposed schedule blocks only adoption of that schedule.

## 3. Attributable order and review

Proposed order fields: restrictionId, caseId, subjectId, version, sourceAuthority/rulesetVersion, decisionId, protected evidence references, public reason summary, concrete risk, scoped capabilities/resources, alternatives considered, aggregate burden/class, effectiveEvent, expiresAt, nextReviewAt and notice/access receipts.
Before effect: verify competent authority, required independent process, meaningful disclosure and opportunity to respond under existing rules, scope legality and narrower alternatives. Any exceptional automatic safeguard must cite its pre-existing trigger/authority. Charge alone is insufficient.
Review records current evidence, risk, burden, defense access, independent decision-maker eligibility, and one outcome: terminate, narrow, continue until existing expiry, or renew by a new attributable version. Continuation is not renewal. Let r be the authoritative completion boundary/phase of a timely qualifying review and I the applicable maximum review interval for the actual aggregate burden. A continue outcome sets nextReviewAt = min(existing expiresAt, r + I), while expiresAt stays unchanged. A narrow outcome following the same full qualifying review uses that rule; narrowing alone, an administrative update or a queued review cannot move either deadline later. Every outcome records old and new deadlines and its actual completion evidence. Renewal requires current necessity and alternatives analysis, new finite expiry and review deadlines; maximum renewal duration equals the class's initial maximum. Its first nextReviewAt is no later than min(new expiresAt, the qualifying renewal review's completion + I). No later start date creates an unreviewed extension. Retain cumulative restricted duration and renewal count to expose repeated renewals; no artificial reset through new IDs. Once LAPSED_REVIEW, ordinary continuation cannot revive the old version. Any later restriction requires a new attributable, prospectively effective order/version after the required current independent review and legal-authority checks. Preserve the lapse and unenforced interval; no backdating, retrospective cure or punishment for violating a lapsed basis. A verified dispute about whether review completed in time follows actual independent discrepancy review; an unverified late claim is not sufficient to resume enforcement.
A party may seek earlier modification on a material change. Narrowing is recorded promptly by competent authority. Escalation needs new risk findings and the stricter schedule, with no backdating or erasure of the prior deadline. Verification of a restriction violation uses the adopted more-likely-than-not standard and the same impeachment case; no automatic conviction or punishment is created.

## 4. States and reconciliation

Separate a legal order's history from its current effect. Proposed legal states: ISSUED, AMENDED, EXPIRED, REVOKED, INVALIDATED, SUPERSEDED. Add LAPSED_REVIEW to distinguish loss of review-conditioned authority from ordinary expiry. Effect may be ACTIVE, DORMANT or INACTIVE under the authoritative history; LAPSED_REVIEW cannot be ACTIVE. REVIEW_PENDING is a work flag, not an extension of authority.
Recompute each scoped prohibition from authenticated, causally ordered legal events and exact ruleset versions. Never restore a snapshot merely because a conviction flag changed.

| Event | Required result |
| -- | -- |
| Case ends without conviction | End case-based active temporary restrictions; retain provenance. Separate cases/bases are assessed separately. |
| Conviction bars the identical whole scope | Record supersession/dormancy and enforce conviction consequence once. |
| Conviction overlaps only part of the scope | Record overlap; distinct scope survives only with its own lawful continuing authority and deadlines. |
| Office removal makes scope inoperative | Dormant effect; preserve expiry/review history, do not reset time. A missed mandatory review records LAPSED_REVIEW even during dormancy. |
| Appeal pending | Removal stays effective; appeal alone neither restores powers nor renews restrictions. |
| Reversal or partial reversal | Recompute each affected count/scope; preserve valid surviving consequences. Reactivation requires a still-valid independent basis with explicit provenance, never resurrection of expired/revoked/invalidated or LAPSED_REVIEW authority. A dormant order can reactivate only while its expiry and current mandatory-review deadline remain unpassed, with completed qualifying review evidence and a still-lawful scoped basis; reactivation itself cannot move deadlines. |
| Procedural remand | No automatic old restriction restart. Any remaining/new protection needs a lawful basis. |
| Insufficiency reversal | No gap-filling retrial or new sanction disguised as reconciliation. |
| Repeated read of the same accepted history | Same projection, no extra effects. |
| Duplicate/stale legal transition (distinct from an authenticated committed-event transport retry under Part B), conflicting digest/order, impossible oscillation | Preserve evidence; open attributable discrepancy and require competent independent review before disputed restoration or sanctions. |
| Missing authentication/source history | Do not infer authority; isolate affected scope and route discrepancy. |

The checker may propose a repair but cannot decide a disputed legal question. Review records actual reviewer identity/competence/independence, evidence, decision and append-only correction. Fail closed only on implicated authority; this is not authority for unrelated deprivation.

## 5. Proposed interface

RestrictionEvent: eventId, restrictionId, caseId, subjectId, schemaVersion, rulesetVersion, issuingAuthority, authorityEvidenceRef, previousVersion, effectiveBoundary/phase, causalSourceIds, eventType, payloadDigest and protectedPayloadRef.
RestrictionProjection: historyVersion, scopedEffects with lawfulBasisRefs/expiry, dormant/superseded history references, unresolvedDiscrepancyIds, and projectionDigest.
AppealDisposition input belongs to JON-68: authenticated judgment/version, affected counts/scopes, remedy and effective legal event. The restriction domain computes consequences; JON-68 cannot issue a blanket restore.
JON-79 consumes authenticated consequences under its own eligibility rules. A generic restriction flag must not overwrite its distinct allegation/proceeding/conviction/ballot states. Transport authentication, durable storage and ordered delivery remain implementation/integration obligations, not proven by these field names. Part B specifies local atomic commit of the eligibility event/result/delivery obligation, without assuming a distributed transaction.

## 6. Review scenarios

| ID | Input | Expected |
| -- | -- | -- |
| R1 | Impeachment charge alone | No automatic restriction. |
| R2 | S1/S2/S3 effective at t | Proposed maxima t+8/t+4/t+2; review t+4/t+2/t+1. |
| R3 | Review queued, expiry reached | No implicit renewal; an earlier missed review has already lapsed that basis. |
| R4 | Two narrow orders collectively severe | Aggregate burden reclassified; no evasion by splitting. |
| R5 | Review faster than meaningful defense permits | No defense truncation; schedule/adoption conflict recorded, no invented emergency authority. |
| R6 | Removal followed by reversal after original expiry | No old-order resurrection. |
| R7 | Partial conviction/reversal, distinct live restriction | Per-scope provenance and lawful continuing basis required. |
| R8 | Identical history projected twice | Same result; zero additional consequences. |
| R9 | Duplicate transition or incompatible same-ID payload | Discrepancy preserved and independently resolved, no silent repair. |
| R10 | Conviction/nonconviction/conviction oscillation | Audit legal sequence; disputed states referred, no second punishment. |
| R11 | Dormancy then return to office | Clock not reset; current legal basis checked before reactivation. |
| R12 | Verified restriction violation | Separate offense within same case under adopted proof rule; escalation still risk-based. |

### Additional review-deadline traces (F67-1)

These are desk-analysis expectations, not executed software tests. All times below are simulation boundaries; implementation must first define the shared boundary phase order.

| ID | Scenario | Expected result |
| -- | -- | -- |
| R13 | S1 effective at 0, review deadline 4, expiry 8; no qualifying review finishes before 4 | At 4 record LAPSED_REVIEW, effect INACTIVE for that basis; no continued enforcement through 8. Independently lawful other bases remain. |
| R14 | Same S1 order; qualifying continue review finishes at 2 | nextReviewAt becomes min(8, 2+4)=6; expiry remains 8. Missing review at 6 lapses the basis. A review merely scheduled at 2 changes nothing. |
| R15 | Same S1 order becomes dormant at 1; no review before 4; return to office at 5 | Lapse is retained; no automatic reactivation despite expiry 8 being in the future. A prospective new order needs current qualifying review and lawful authority. |
| R16 | S2 effective at 0, review deadline 2, expiry 4; qualifying narrow review finishes at 1 and assessed aggregate class becomes S1 | nextReviewAt is min(4,1+4)=4; expiry remains 4. An administrative narrowing without full qualifying review retains the prior review deadline 2. |
| R17 | S1 review missed at 4; later qualifying decision at 5 authorizes a new lawful order | Old basis stays lapsed. New version is prospective, retains cumulative duration and lapse history, and sets finite expiry/review limits from its actual qualifying decision/effect rules. No retroactive restriction over 4–5. |
| R18 | Claimed completion at exactly a deadline but event phases are unspecified | Do not guess precedence; unresolved phase contract blocks implementation and the disputed claim follows the authorized discrepancy path. |

## Part B — Eligibility interface

## 1. Ownership

JON-67 defines restriction decisions, affected scope and their legal meaning. It does not write the eligibility reducer or authenticate itself by supplying a string.
JON-79 alone admits eligibility consequences through verified authorization, JON-78 identity binding, durable event/deduplication storage, eligibility projection and committed downstream delivery obligations. JON-80 owns ballot acceptance; JON-81 owns electorate accounting. JON-141 retains combined integration.
This interface specification specifies requirements to supply/consume that boundary; it does not redesign or claim delivery of JON-79's repair.

## 2. Delivery attempt versus legal event

A transmission attempt and a legal event are different identities.

* One unchanged legal event keeps its namespaced sourceEventId across retries/restarts. attemptId may change for transport tracing.
* The namespace derives from a verified source, not a caller's untrusted label. Preserve original decisionId/version and causal source references.
* Compare canonical event content with an explicitly versioned digest scheme. Include semantic payload, subject/registration references, authority decision and legal timing. Transport attempt time or reissued transport credentials must not silently create a new legal event.
* A same-source/same-ID/same-content retry of a committed event returns the retained result and committed version; no second transition or new delivery obligation. Current permission to read that receipt still applies. Never re-execute the original mutation because its response was lost.
* A changed payload under the same key, unauthorized source reuse, new-ID replay of an already applied decision, or contradictory/stale legal transition is a discrepancy, not a harmless retry. Retain evidence and route actual competent independent review under JON-61 before disputed restoration or sanctions.
* An unknown token after restart is not proof of a new event. JON-79 must reconstruct durable deduplication state; an unavailable/corrupt store cannot authorize blind replay. No unreviewed token-retention timeout is introduced.

Proposed operational interpretation for review, not an adopted exemption from JON-61: this clarifies Part A R9: a transport retry must not itself duplicate the legal transition; an attempted/observed duplicate transition remains subject to the adopted discrepancy rule.

## 3. Required input/result mapping — proposed names, not an implemented API

| Supplied semantic input | Boundary check owned by JON-79 |
| -- | -- |
| sourceSystem, sourceEventId, schemaVersion, canonicalizationVersion, payloadDigest | Bind source identity, validate supported version and stable retry identity/content |
| decisionId, decisionVersion, caseId, restrictionId, legalEventKind, causalSourceIds | Verify decision provenance and permitted transition; do not infer legal authority from IDs |
| subjectIdentityId, JON-78 registration event/version reference | Verify registered identity and correct lifecycle; no second identity issuance |
| scopedCapability/resource references, affected identity set where lawful, effectBasisRef | Determine whether any existing eligibility rule applies; no generic restriction-to-disqualification conversion |
| issuingAuthorityRef, authorityEvidenceRef, rulesetVersion | Independently verify issuer role, competence, scope and applicable authority; a supplied signature/hash alone is not authorization |
| legalEffectiveBoundary/phase, sourceDecisionSequence, expectedEligibilityVersion | Keep legal sequence distinct from arrival order and committed eligibility version; reject/hold unresolved gaps |

For lawful C4 events preserve the entire authenticated affected-identity set and its decision provenance; neither caller nor transport may add/remove members.
Proposed response: source key/digest, durableReceiptId, disposition, committedEligibilityVersion/sequence (only if committed), appliedEventIds, projectionVersion, downstreamObligationRef, and protected diagnostic/discrepancy reference.
Distinguish COMMITTED, ALREADY_COMMITTED, REJECTED and PENDING_RECONCILIATION. A valid event with no franchise consequence may be recorded as no-effect with explicit reasons, never portrayed as a grant of voting rights. Queued delivery is not consumer application. Error receipts disclose no unnecessary protected data.

## 4. Event-meaning map

The retained JON-79 export names the following existing event families; mappings below are conditional on verified governing authority, not direct callable authorizations.

| JON-67 source meaning | Eligibility treatment |
| -- | -- |
| Mere allegation, or a narrow office/resource restriction | No inferred franchise loss. ALLEGATION_RECORDED remains observational where applicable. |
| Lawful formal proceeding opens/closes | FORMAL_PROCEEDING_OPENED/CLOSED only with exact proceeding identity and authoritative legal event; expiry of a restriction does not close the case. |
| Lawful C4 creation or specific C4 restriction closes | C4_CREATION_EVENT_OPEN/C4_RESTRICTION_CLOSED only for that actual C4 event and affected identities. Ordinary impeachment restriction is not C4 by analogy. |
| Office restriction narrows, expires or becomes dormant | Reconcile office scope; do not clear other eligibility bases or emit a generic RESTORE. |
| Conviction/reversal relates to another scope | Pass specific disposition/provenance to the responsible domain; impeachment removal is not automatically a felony conviction, death, or terminal event. |
| No supported lawful mapping exists | Record an interface gap for JON-79/domain review; do not invent an event type or toggle eligibility. |

A closure removes only its identified live basis. Other open proceedings/C4 restrictions, felony bars or terminal state remain subject to their own rules. The retained reducer has no general reversal/clear-felony event; this research grants none.

## 5. Commit and election ordering

A source decision's legal time, network arrival, durable eligibility commit and downstream application are separate facts. Timestamp sorting alone cannot prove authoritative order.
The JON-79 repair must commit each admitted eligibility event, its stable identity/result and its downstream delivery obligation together. A crash after commit can require redelivery, not a second mutation. Consumers must confirm application with stable event identities. This local atomicity does not claim a distributed transaction or accepted ballot/close integration.
Required consumer evidence: which authoritative eligibility version governed ballot acceptance and which version/watermark governed election close. A receipt whose effect has not reached the required consumer is not proof that consumer enforced it.
Preserve valid already-accepted ballots; later disqualification does not erase them. A restored otherwise-eligible opening-roll nonvoter may return to the unvoted group before close, not after close. Do not infer opening-roll membership or nonvoter status from a restriction event.
When close/acceptance races with a late or contradictory legal event, preserve receipts and identify the affected disputed decision for the authorized reconciliation path. Do not backdate a commit, reopen a closed election, discard an accepted ballot or choose a timestamp tie-break as new policy. Exact ordering/serialization mechanism belongs to JON-79/80/81.

## 6. New scenario traces — design walkthrough, not executed software

| Trace | Expected evidence/outcome |
| -- | -- |
| Event e commits at v12; response lost; same e retried with stale expected v11 | Durable identity lookup establishes ALREADY_COMMITTED at v12, no second application; protected receipt access verified |
| Same e with altered affected set | Reject conflict, preserve both digests, independent discrepancy referral |
| Same decision retransmitted with a fresh event ID | Do not bypass deduplication/semantic validation; flag duplicate legal transition |
| Restart loses in-memory cache | Recover from durable source/result records; missing durable evidence blocks blind application |
| Ordinary office restriction expires while another formal proceeding remains | Office effect ends; independent franchise basis remains |
| C4 closure before close, accepted ballot exists | Retain accepted ballot; no second vote |
| Restoration arrives after authoritative election close | No reopening or retroactive new ballot; preserve actual receipt/order evidence |
| Eligibility commit succeeds, downstream delivery fails | Durable obligation remains pending; retry delivery only, no claim consumer applied |
| Caller asserts authorityId or unknown registration | No admitted state change without verified authority and JON-78 binding |

## 1. Numerical recommendation and feasibility

Retain S1 maximum/review 8/4 complete turns, S2 4/2, S3 2/1. The reason is a simple monotone schedule with an intermediate review in each initial maximum. These figures are engineering choices, not empirical optimums; no additional owner interview is needed for routine calibration under JON-61.

For each contemplated issuance/renewal, record actual notice/access, applicable protected preparation floor, earliest lawful completed review, eligible non-conflicted review capacity and required ordinary service coverage. An interval is feasible only if that review can lawfully complete by the published deadline. Lack of capacity never permits truncating defense, reducing quorum/independence or extending the restrictive order.

For planning only, if all reviews have equal unit cost, steady average demand is N1/4 + N2/2 + N3 completed reviews per turn. Example: 4 S1 + 2 S2 + 1 S3 produces average demand 3 reviews/turn. This is a lower-bound workload estimate, not a scheduling/admission proof: all seven can be due together, review costs differ, eligible bodies can differ and recusals matter. Check the actual per-deadline workload and eligibility, not average utilization alone. A reviewer/body slot cannot be double booked across overlapping cases.

Desk traces:

* One S3 review due next boundary with all required access, preparation and qualified review completed in time: continue only by attributable review.
* Same deadline but lawful preparation cannot complete until the following turn: existing basis lapses; a new restrictive order cannot bypass the same floor. No invented emergency authority.
* Seven synchronized reviews with only three eligible completion slots before their deadlines: at least four cannot be completed within that capacity assumption. Do not claim this workload is feasible because its long-run average is three.
* An S1 administrative narrowing does not consume a full review completion slot or extend review; a qualifying narrow review follows 0.5's bounded next-deadline calculation.
* A single reviewing body available for two cases cannot be treated as two independent resources.

Recommendation: keep the candidate schedule and apply these feasibility checks to real workload before operational acceptance. No actual staffing, case-duration or service-floor measurements are available in the inspected sources; their validation is an implementation/operational evidence requirement, not a reason to leave the design unspecified.

## 2. Proposed common turn boundary contract

Every authoritative timestamp includes turn, boundary phase and domain sequence, plus the governing clock/phase version. Phase numbers are candidate implementation names, not new institutional powers. They provide deterministic order only for otherwise lawful events; conflicts of legal authority remain for actual independent review.

At each boundary b, order these phases:

* P10 RECEIPTS: close the just-completed turn's published receipt window and retain all arrivals/attempts under authoritative receipt evidence. A filing defined as due at b is accepted through P10.
* P20 DECISIONS: record decisions/reviews actually completed by this point, with source authorization and causal predecessors. A later-arriving assertion cannot be backdated into P20.
* P30 DEADLINES: apply ordinary expiry and missed-review lapse against the authoritative history after P20. A review deadline is the pair (b,P30); a qualifying review recorded at (b,P20) is earlier than that deadline. Expiry at (b,P30) remains a strict endpoint unless lawful prospective replacement already exists.
* P40 PROJECTIONS: commit lawful domain consequences and required delivery obligations, preserving each domain's writer. Record whether required consumers actually applied them.
* P50 CLOSE/OPEN: perform only the specifically authorized close/open operation after its required domain evidence is ready. This phase grants no authority to create or reopen an election.

A complete turn is the interval between consecutive boundaries; boundary phases are ordered operations at that boundary, not additional fractional turns. A party entitled to a full turn can use the whole interval before P10 closes it; a review completed at the following P20 may satisfy the deadline at P30. All systems must use the same phase version for a dependent transaction; mismatch is a reported integration failure, not guessed time.

For an ordinary restriction effective mid-turn, do not count the remaining fraction as a complete turn. Retain 0.5's explicit next-boundary origin and disclose the partial-turn burden; N complete turns expire at (origin+N,P30). The maximum is therefore N complete turns plus the recorded initial fraction, never an undisclosed N-turn wall-time claim. Dormancy does not pause this clock. A higher-order bound incompatible with the fraction must control and blocks use of this candidate convention for that case.

Continuation review at (r,P20) sets nextReviewAt = (min(existing expiry turn,r+I),P30). It never extends expiresAt. Renewal/new prospective orders preserve previous deadlines/lapse history and follow 0.5's current-review and finite-maximum requirements.

## 3. Domain and late-event limits

Receipt order is not legal priority. A source's legal effective point, verified decision sequence, receiving commit and consumer application remain distinct. P20 cannot validate an unauthorized decision, adjudicate a source conflict or infer a missing predecessor. Preserve disputed claims and follow JON-61; do not use phases as an alternative tribunal.

Ballots are governed by the authoritative JON-79/80/81 sequence. A previously valid accepted ballot remains accepted after later disqualification. Within an election's published close boundary, intake receipt alone is not ballot acceptance. Close must name the resolved intake cutoff and eligibility/ballot watermarks; transactions admitted before the close cutoff are resolved under the agreed sequence before computing the result. Unresolved relevant delivery/ordering is reported as pending close reconciliation, not an invented final result. No votes received after the authorized cutoff enter the election while close processing waits. A closed election is never reopened by later restoration.

This is the proposed consumer requirement, not proof that JON-79/80/81 implement it. Exact transaction/locking details belong to JON-79's bounded repair contract and integration owners.

## 4. Boundary walkthroughs

| Case | Required proposed result |
| -- | -- |
| S1 effective boundary 0; review completes (4,P20); deadline (4,P30), expiry (8,P30) | Timely review; next deadline (8,P30), unchanged expiry |
| Same review only appears after (4,P30) | LAPSED_REVIEW retained; late receipt cannot cure it retrospectively |
| S3 review completes (1,P20) after a full preparation turn | May meet (1,P30) only if all actual protected-access/preparation requirements were met |
| Expiry and ordinary continuation at same boundary | Continuation cannot extend expiry; effect ends at P30 |
| Lawful renewal before expiry | New attributable version, finite deadlines and cumulative history; no hidden reset |
| Protected review evidence unavailable at P20 | No qualifying completion inferred; lapse at P30 for that basis |
| Ballot validly accepted before later disqualification | Keep ballot; no second vote or deletion |
| Restoration arrives after authorized cutoff but close publication is delayed | Do not admit a new ballot or reopen intake |
| Two systems disagree about phase version | Preserve receipts and report affected integration discrepancy; no timestamp guess |
