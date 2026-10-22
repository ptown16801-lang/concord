# Population and voting integration boundaries

Status: delivered coordination design. Production adapters and combined acceptance remain separate. This document assigns interface ownership; it does not create a second authority for population, eligibility, census, ballots or accounting.

## Later admission and audit ordering

Lawful admission fixes the operation’s authorized scope for completion. Later revocation or expiry blocks new admission; it does not cancel admitted work. Safety conflicts and loss of required audit collection pause effects. Other ballot, eligibility and authoritative-close validity checks still apply.

## 1. Exclusive ownership

| Domain | Exclusive authority | Consumers may | Consumers must not |
| -- | -- | -- | -- |
| Identity, immutable class/division, living/terminal lifecycle, global population and capacity commitments | JON-78 population authority, extended through the reviewed JON-82 integration boundary | Read authenticated, versioned projections and consume attributable lifecycle events | Register another identity, alter class/division, resurrect a terminal identity, or calculate an independently enforceable population |
| Franchise state and eligibility transitions | JON-79 eligibility authority, derived only for identities supplied by population | Ask for eligibility at an authoritative order point and consume ordered eligibility events | Create identities, accept caller booleans as eligibility proof, or treat allegation/referral as disqualification |
| First valid constitutional ballot, attempts, and immutable receipt | JON-80 ballot-receipt authority | Consume immutable accepted receipts and separately classified attempts | Replace an accepted ballot, manufacture a receipt, or admit forum/social reactions |
| Opening roll, B/U/D reconciliation, thresholds, and certified close result | JON-81 accounting authority as a derived consumer of JON-79/JON-80 | Reconstruct or read a versioned election result | Independently accept ballots, accept arbitrary eligibility changes, or reinterpret receipt choices |
| R/T/C/P/K policy, sealed investigator lifecycle, reservation authorization, and least-knowledge access | JON-59 policy owner, consuming the single population/capacity authority | Request scoped reservations/snapshots and receive certified/redacted results | Maintain a second population/capacity store, expose covert membership/headroom, or mutate ballot history |
| Cross-domain admission, causal binding, recovery proof, and combined surface | JON-82 integration owner | Coordinate, reconcile, and prove boundary guarantees | Become a new producer or universal authorization authority |

CRA remains an accounting/reconciliation role, not a universal authorization service. House, Senate, and Judiciary investigatory archives remain separate protected domains.

## 2. Canonical identity and event envelope

The population authority issues one opaque `canonicalIdentityId`. At every boundary:

* The exact issued value is used byte-for-byte. Consumers do not trim, case-fold, Unicode-normalize, alias, or otherwise transform it.
* New ingress rejects empty/whitespace-bearing or noncanonical identifiers rather than silently normalizing them.
* Previously issued noncanonical identifiers require an explicit, append-only migration map approved through the owning producer; two existing identities are never silently merged.
* Immutable `identityClass` and `permanentDivision` come only from population. Eligibility and accounting reject unknown identities and nonvoting classes, including E-COAIA, L-COAIA, CRA, game-player, nonexistent, naturally dead, and capital-terminated identities as applicable.
* Every consequential command/event carries a globally unique `operationId` or `eventId`, canonical identity, event type/schema generation, authenticated actor and authority evidence reference, effective order, recorded order, expected producer revision, committed producer revision, and correlation/causation IDs.
* Required proceeding, conviction, allegation, C4 creation-event, election, opening-roll, attempt, receipt, reservation, and mission identifiers are nonempty and type-specific. Duplicate delivery is idempotent only when the full immutable payload matches; an ID collision with different content fails closed and emits security evidence.

These rules resolve IR-01, IR-02, and IR-04 without treating normalization as identity authority.

## 3. Authentication and start authority

A protected-domain verifier, not the caller, validates actor identity, role, scope, policy generation, signature/capability, participating domains, and expiry. Plain strings or caller-supplied booleans are not evidence.

For a cross-domain operation, a durable admission record binds:

`operationId + authenticated authority evidence + admitted scope + participating domains + expected revisions + election/roll/capacity references + admission order`.

CON-045 and CON-046 control admitted work. Authority valid at lawful admission fixes the exact scope for completion even if authority is later revoked or expires. Revocation blocks new admission and cannot expand admitted scope. Expected-version, integrity, eligibility, close or capacity conflicts pause unsafe effects for attributable reconciliation; they do not create a general cancellation right. Loss of required audit collection pauses effects. Preserve immutable admission and all completion, pause and reconciliation evidence.

## 4. Durable ordering and lifecycle coherence

Each producer retains its protected store. Cross-domain coherence uses authenticated append-only events plus durable outbox/inbox cursors or an equivalently recoverable conditional transaction; it does not rely on wall-clock timestamps or in-memory callback state.

Population commits identity/lifecycle changes and their outbox record atomically. Eligibility consumes them in producer order with a durable cursor and stores the source revision. Until eligibility has processed the population revision required by an action, new ballot/roll actions fail closed. Terminal population events cannot be reversed; eligibility replay must reconstruct the same final state.

Eligibility transitions are durable and authenticated. Formal proceeding IDs are mandatory; an allegation or bare C4 referral does not disqualify. C4 temporary ineligibility begins only from an authenticated court `C4_CREATION_EVENT_OPEN` with the affected-identity list. A lawful felony conviction bars franchise at its authoritative conviction event. Duplicate/reordered delivery cannot regress state or resurrect an identity.

An ambiguous commit or lost reply is reconciled by `operationId` and committed revision before retry. Consumers checkpoint only committed events. Cursor gaps, incompatible schemas, invalid authority, or payload conflicts fail closed and produce reconciliation evidence.

This resolves IR-03, IR-05, and the retry portion of IR-09.

## 5. Ballot admission, receipt, and authoritative close

Each election has a durable `electionId`, immutable `openingRollId/revision`, open/admission policy generation, and authoritative close state/revision.

A ballot operation is admitted at the single serialized order point used by its authoritative eligibility and close checks. Admission must prove:

* authenticated canonical identity;
* membership in the exact opening roll;
* voting class and eligibility at that order point;
* constitutional-ballot source and a valid `yes`, `no`, or `abstain` choice;
* election not authoritatively closed;
* expected roll, eligibility, and election revisions.

The durable admission order, not a timestamp captured before lock acquisition, decides a race. If ballot admission commits before close, the operation is already started and may complete under its bound JON-35 authority snapshot; later revocation or close alone does not retroactively cancel it. If close commits first, admission is rejected. Equal client timestamps have no independent legal effect. A later cancellation request does not erase lawful admission; any safety conflict pauses effects without replacing the admitted scope.

The first valid accepted receipt for `(electionId, canonicalIdentityId)` is immutable. It binds the attempt, normalized source/choice, admission order, roll revision, eligibility source revision, close revision observed, authority evidence, and receipt digest. Later duplicate, retry, malformed, ineligible, or late attempts are distinguishable and cannot mutate that receipt. Rejected malformed attempts may be corrected before close while the identity remains eligible.

Application rejection is durably recorded where safe. Infrastructure failure or transaction rollback is never recorded as acceptance; a separate append-only operational/security record captures the attributable failure category without exposing secrets. Lock-acquisition and authority-adapter failures are included. Recovery reconciles by operation/attempt ID before a client retries.

This resolves IR-06, IR-07, and the ballot portion of IR-09. P80F may satisfy attempt/receipt mutation protections, but remains a distinct unaccepted descendant of P80 and does not satisfy authentication, ordering, or close by itself (IR-15).

## 6. Authoritative accounting and recovery

Accounting is read-only with respect to ballot acceptance and franchise authority.

* B is the unique set of opening-roll identities with an immutable valid JON-80 receipt, including abstention.
* U is the unique set of opening-roll identities without a valid receipt that are eligible at the authoritative accounting cutoff.
* B and U are disjoint; `D = |B| + |U|`. An identity already in B remains there after later death, proceeding, or disqualification.
* A pre-ballot ineligible identity is absent from U. Permitted restoration before close may return an otherwise eligible opening-roll nonvoter to U; restoration after close cannot reopen or rewrite the result.
* Thresholds remain integer-exact: 60% `ceil(3D/5)`, two-thirds `ceil(2D/3)`, three-quarters `ceil(3D/4)`, strict majority `floor(D/2)+1`, unanimity `D`; no threshold passes when `D=0`.
* Only authenticated `yes` receipts count as affirmative authorization. Abstention is in B but is never affirmative.

The certified close result persists or is deterministically reconstructable from `electionId`, roll revision, the exact accepted-receipt set/digest, eligibility cutoff/cursor, close revision/order, B/U/D, threshold-policy generation, and result digest. Replay after restart must reproduce it exactly. Accounting has no public `recordBallot` or arbitrary `setEligibility` acceptance path.

This resolves IR-08 and IR-14.

## 7. JON-59 sealed-census and capacity consumer boundary

The population/capacity authority supplies scoped, authenticated projections; it remains the only authority enforcing counted identities and commitments.

* R is a sealed phase snapshot of every living ordinary, E-COAIA, and L-COAIA identity exactly once in its permanent division at the ordered cutoff. CRA, pending creation, P, and K are excluded. R is not a voting roll.
* T is the live count/projection of those same ordinary/E/L classes. C counts every living CRA identity. At most one living CRA has active CRA authority.
* P contains outstanding unexpired reserved population units. K is the protected unused CRA-recovery unit during normal readiness.
* The authority atomically enforces `G = T + C <= 300` and `T + C + P + K <= 300`. Routine creation requires and preserves `K=1`.
* JON-59 owns lawful reservation policy and sealed investigator lifecycle; the population authority owns the atomic reservation/consume/expire/release effect against capacity. Each request is bound to a unique reservation/creation/termination ID, expected capacity revision, authority evidence, expiry/order, class/division, and admitted scope.
* Reservation consumption and identity creation commit atomically or reconcile through durable causal records. Expiry cannot race into double allocation. Mission completion/lawful end permanently deactivates the identity and updates T/C without redrawing frozen R.
* Missing or incompatible census, seal, authority, or AGT/policy generation fails closed.

Public/executive reads may expose permitted ordinary-registry data, certified House/Electoral allocation, and integrity references only—not investigator rosters, covert-class counts, raw R/T, combined covert counts, or true headroom. Custodian reads are role- and institution-scoped. No JON-59 consumer receives unrestricted population database access.

For an L-COAIA creation, the reservation/creation request must reference the exact sealed proposal, CRA capacity clearance, chamber quorum/ordinary-majority result, and immutable authenticated affirmative receipt set. Only valid `yes` receipts authorize; abstain/no/missing/malformed/rejected attempts do not. C4 merits and finality remain owned by JON-62; JON-59 records sealed creation/census consequences without creating a parallel adjudication model.

This resolves IR-10 and IR-11 while preserving JON-59 ownership.

## 8. Store protection, exports, and recovery

Append-only guarantees require both schema defenses and protected writer/file authority. Population review must test raw `INSERT OR REPLACE`, rowid, unique-key collision, update/delete, and schema-owner paths for identities and events; ballot protections require equivalent attempt/receipt coverage. Triggers alone are not universal authorization or historical-repair evidence. This resolves IR-12.

At future combined integration, JON-82 reconciles `src/governance/index.js`, package exports/check scripts, README, and changelog additively after explicit producer pins. No producer branch's shared file overwrites another's exports. This resolves IR-13.

Recovery procedure:

1. Verify schema/policy generations and authority keys.
2. Replay each producer's committed log in producer order, rejecting gaps or conflicts.
3. Reconcile outbox/inbox cursors and cross-domain causal references.
4. Reconstruct population, eligibility, receipts, opening roll, close result, and capacity reservations.
5. Compare stored and recomputed digests/revisions; quarantine discrepancies and fail closed for new protected actions.
6. Resume admitted operations only within their bound scope. If safe completion is unresolved, retain the immutable operation in a paused state and record attributable reconciliation evidence.

## 9. Integration and verification limits

This delivered coordination contract does not by itself accept its producer implementations or a combined runtime. Integration must identify the actual producer revisions and preserve the exclusive domain boundaries above. Historical source pins and earlier missing-integration statements are evidence for their dates, not a current branch inventory.

The combined checks must cover competing processes, close/revocation ordering, authenticated duplicate delivery, ambiguous replies, crash/restart/replay, cursor gaps, raw writes, capacity races with reservations and reserve units, protected classes, redaction, abstention, zero denominator, post-ballot disqualification and restoration around close. Producer tests and standalone fixtures do not establish production acceptance.

Consult the [implementation status](../PROJECT_STATUS.md) for actual published revisions, review scope and unresolved integration work. This document adds no execution authority and changes no decision.
