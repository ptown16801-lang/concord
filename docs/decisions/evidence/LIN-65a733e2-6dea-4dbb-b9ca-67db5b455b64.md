# Evidence snapshot: JON-87 — published-source interface/readiness continuation v1.0

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `b684f82436d008b1f3243e3f9d35794f559a211c`; original SHA-256: `de736a9eb0cc707956239589f5dbf2660161aa75678fdd02884e9a1af9e295b8`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-16T23:43:32.607Z
- Source date: 2026-09-16T23:43:32.607Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

# JON-87 (private source reference withheld) interface/readiness continuation

**Report version:** 1.0-continuation
**Evidence cut:** 2026-09-16, approximately 23:33–23:38 UTC
**Executor:** current authorized team session, specialist `/root/repository_delivery_audit`; no new remote worker or original-task restart.
**Disposition:** COMPLETE READ-ONLY PREPARATION REPORT; PRODUCER_ACCEPTANCE_PENDING; PRODUCTION_INTEGRATION_NOT_RUN.

This is a newly prepared continuation using producer artifacts that are now available. It is **not** a recovery of the original worker's reported local commit `9ec89e8`, and it makes no claim of content equivalence to that unavailable report. Preserve the original task (private conversation reference withheld) and its history.

## 1. Result and boundary

All four producer implementations can now be inspected at exact published commits. They do not yet form one authoritative, durable, transactionally coordinated population/eligibility/ballot/accounting system. The main integration blockers are identity normalization/classification, authenticated persistent eligibility, a shared event/close ordering contract, receipt-derived accounting, and a sealed versioned census interface.

The JON-80 (private source reference withheld) follow-up fixes its specific attempt-history mutation/replacement defect and supplies actual independent-process concurrency coverage. It does not solve eligibility authentication, cross-store races, or acceptance. JON-59 (private source reference withheld)'s R/T/C/P/K model remains a **specification-only consumer boundary** in the inspected artifacts.

Assumption used for this audit: current Linear execution contracts and their recorded accepted rules control the requirements; immutable Git source controls what these candidates actually implement. Neither issue state nor CI success grants acceptance. This follows the inspected repository `PROJECT_RECORD.md` and workflow v1.3. No older founding-population number or special add-agent petition percentage is substituted for current JON-58 (private source reference withheld).

No production code was changed, no commits/pushes/merges were made, no implementation was dispatched, and no tests were rerun for this continuation. The only newly authored artifact is this report. No private source packet is included or uploaded.

## 2. Inspected versions and provenance

### Governing records

| Record | Revision / last update actually read (UTC) | Relevance |
| -- | -- | -- |
| JON-87 (private source reference withheld) | CURRENT EXECUTION CONTRACT v1.0, current missing-delivery checkpoint; updated 2026-09-16 23:14:24.694 | Complete matrix, bounded continuation allowed, no duplicate worker |
| JON-58 (private source reference withheld) | Current coordination checkpoint and accepted rules; updated 23:28:28.024 | Population, franchise, B/U/D and exact threshold rules |
| JON-78 (private source reference withheld) | Recovery delivery plus authorized producer contract; updated 23:28:21.258 | Population owner |
| JON-79 (private source reference withheld) | Recovery delivery plus authorized producer contract; updated 23:00:31.722 | Eligibility owner |
| JON-80 (private source reference withheld) | Follow-up candidate plus preserved recovery contract; updated 23:13:09.539 | Ballot/attempt owner |
| JON-81 (private source reference withheld) | Recovery delivery plus authorized producer contract; updated 21:22:38.515 | Accounting owner |
| JON-82 (private source reference withheld) | CURRENT EXECUTION CONTRACT v1.1 plus current review checkpoint; updated 23:29:46.837 | Combined integration remains gated |
| JON-59 (private source reference withheld) | Current recovered controlling census model; updated 17:47:37.174 | Sealed census, reservations, protected recovery unit and access boundaries |
| Workflow document 41214e01-4eca-40ff-8d12-a912d830bc1b (private source reference withheld) | v1.3; updated 23:13:09.033; preserved v1.1 expansion also read | Current-team fixes, project dispatch gate, ownership, preservation and no automatic rollout |

Times in the table are the source metadata observed during this pass, not claims of agent activity.

### Repository and candidate pins

Repository metadata confirms `ptown16801-lang/concord`, repository ID `1372818161`. The actual default branch is `ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f`, at `40f647e5b8d23307f713fc3a3753a1d3a46611cb`. It is not assumed to be `main`.

The read-only local inspection checkout was `/workspace/scratch/e5cf86e79014/concord-workflow-fixes`, branch `fix/linear-dispatch-gate-20260916`, HEAD `3465d56bb133959443cee18c4e8404dd163c074d`; its worktree was clean at inspection. Producer source was read with `git show <exact-sha>:<path>`, not inferred from that checkout's HEAD. Remote branch metadata independently matched all candidate pins below. No `AGENTS.md` appears in the complete trees of these five candidate commits.

| Producer | Exact inspected commit | Published artifact | Source proof / acceptance |
| -- | -- | -- | -- |
| JON-78 (private source reference withheld) | `882dcffb31b520c6f9458984a35745c8b4bfa3b8` | ptown16801-lang/concord#6 (private source reference withheld) | VERIFIED source; unaccepted recovery candidate |
| JON-79 (private source reference withheld) | `51a102259785a5b53dc6ec4bc4bbca54c4a8fc37` | ptown16801-lang/concord#7 (private source reference withheld) | VERIFIED source; unaccepted recovery candidate |
| JON-80 (private source reference withheld) original | `b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf` | ptown16801-lang/concord#8 (private source reference withheld) | VERIFIED source; original provenance preserved |
| JON-80 (private source reference withheld) follow-up | `5f5a28d46cfa62d1222e74563b1dc8e281b7c73f` | ptown16801-lang/concord#12 (private source reference withheld), based on PR ptown16801-lang/concord#8 (private source reference withheld)'s exact commit | VERIFIED source; partial correction, unaccepted candidate |
| JON-81 (private source reference withheld) | `a090a67719681b04683f1f87c35d4080ea0854f5` | ptown16801-lang/concord#9 (private source reference withheld) | VERIFIED source; unaccepted recovery candidate |
| JON-59 (private source reference withheld) | No candidate implementation supplied by its current contract | Backlog; blocked by JON-82 (private source reference withheld) | SPECIFIED_ONLY; IMPLEMENTATION_UNVERIFIED |

All four recovery branches share the default baseline above. Their package versions are all `0.1.0`, which therefore does not distinguish their interface revisions. Their `engines.node` entries are `>=22.5`; this repository setting must not be imposed on another project. Commit pins, rather than package version alone, identify this matrix.

### Source reference key

* **P78:** [population registry](<https://github.com/ptown16801-lang/concord/blob/882dcffb31b520c6f9458984a35745c8b4bfa3b8/src/population/registry.js>), [population schema](<https://github.com/ptown16801-lang/concord/blob/882dcffb31b520c6f9458984a35745c8b4bfa3b8/src/population/migrations/001_population.sql>), and [population tests](<https://github.com/ptown16801-lang/concord/blob/882dcffb31b520c6f9458984a35745c8b4bfa3b8/test/population-registry.test.js>).
* **P79:** [eligibility module](<https://github.com/ptown16801-lang/concord/blob/51a102259785a5b53dc6ec4bc4bbca54c4a8fc37/src/governance/eligibility.js>), [eligibility exports](<https://github.com/ptown16801-lang/concord/blob/51a102259785a5b53dc6ec4bc4bbca54c4a8fc37/src/governance/index.js>), and [eligibility tests](<https://github.com/ptown16801-lang/concord/blob/51a102259785a5b53dc6ec4bc4bbca54c4a8fc37/test/eligibility.test.js>).
* **P80:** [ballot module](<https://github.com/ptown16801-lang/concord/blob/b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf/src/governance/ballots.js>) and [original schema](<https://github.com/ptown16801-lang/concord/blob/b9f2c7e3c4d6f341e704a7940f6ce2a68ca8ccaf/src/governance/migrations/001_ballots.sql>).
* **P80F:** [follow-up schema](<https://github.com/ptown16801-lang/concord/blob/5f5a28d46cfa62d1222e74563b1dc8e281b7c73f/src/governance/migrations/001_ballots.sql>), [follow-up tests](<https://github.com/ptown16801-lang/concord/blob/5f5a28d46cfa62d1222e74563b1dc8e281b7c73f/test/ballots.test.js>), and [integrity boundary](<https://github.com/ptown16801-lang/concord/blob/5f5a28d46cfa62d1222e74563b1dc8e281b7c73f/docs/ballot-audit-integrity.md>).
* **P81:** [accounting module](<https://github.com/ptown16801-lang/concord/blob/a090a67719681b04683f1f87c35d4080ea0854f5/src/governance/electorate.js>), [interface documentation](<https://github.com/ptown16801-lang/concord/blob/a090a67719681b04683f1f87c35d4080ea0854f5/docs/electorate-accounting.md>), and [accounting tests](<https://github.com/ptown16801-lang/concord/blob/a090a67719681b04683f1f87c35d4080ea0854f5/test/electorate.test.js>).

VERIFIED below means directly inspected implementation fact. SPECIFIED_ONLY means a current governing requirement with no matching delivered API established. MISSING means the required adapter, evidence or mechanism is absent from these inspected candidates. None of these labels means acceptance.

## 3. Versioned interface/readiness matrix

### 3.1 JON-78 (private source reference withheld): authoritative population and creation

| Dimension | Actual inspected interface and remaining boundary |
| -- | -- |
| Producer → consumers | `PopulationRegistry` exports via `./population`; intended consumers are JON-79 (private source reference withheld) eligibility, JON-82 (private source reference withheld) integration and authorized JON-59 (private source reference withheld) census/capacity logic. No delivered adapter connects them. |
| Identity keys | `createIdentity({id, division, identityClass, creationRoute, createdBy, authorityReference, createdAt, details})`; `markTerminal({id, reason, actorId, authorityReference, occurredAt, details})`. Registry IDs and divisions are nonblank strings retained verbatim. Class/division are not validated against a canonical enumeration/registry. |
| Read/output authority | `getIdentity(id)` returns lifecycle/class/division and attribution fields; `getPopulation()` returns `living, ceiling, available`; `getEvents(id)` returns that identity's ordered audit events; `hasCapacity(amount=1)` is a live-count check. SQLite rows are this component's authority, but caller-supplied actor/reference strings are not authenticated. |
| Schema/version | `001_population.sql`: `population_identities` plus `population_events`; identity primary key; event sequence and unique `(identity_id,event_type)`; created/terminal event types. No exposed schema generation or signed snapshot token. Use the exact P78 commit as candidate API version. |
| Event ordering | Global SQLite autoincrement `sequence`; API reads per identity in sequence order. Caller timestamps need only be parseable and are returned unnormalized; no monotonic-time or creation-before-death enforcement. No global event-cursor API or cross-producer order token. |
| Transaction / expected version | Identity creation plus creation audit, or terminal update plus terminal audit, uses `BEGIN IMMEDIATE`/COMMIT and rollback. Trigger caps living rows at 300 regardless of class. Terminal update uses `WHERE terminal_at IS NULL`. No caller expected version, shared unit-of-work API, reservations or eligibility transaction. Each registry opens its own SQLite connection. |
| Retry / idempotency | Duplicate identity IDs fail; repeated terminal updates fail. This prevents repeated successful mutations through the API but is not a request-idempotency receipt. Ambiguous commit/reply failure requires reconciliation using identity/events; no protocol specifies it. |
| Failure behavior | Validation throws before transaction; insert/audit failures rollback the transaction. Five-second SQLite busy timeout. Schema exposes `database` publicly; raw-write/schema/file authorization is outside this module. |
| Proof / readiness | VERIFIED local cap and transaction mechanisms; test source covers near-cap competing workers, duplicates, terminal updates and rollback. Source does not implement authenticated lawful creation, P/K commitment capacity, sealed snapshots or the JON-59 (private source reference withheld) access boundary. Candidate remains unaccepted. |

### 3.2 JON-79 (private source reference withheld): authoritative franchise transitions

| Dimension | Actual inspected interface and remaining boundary |
| -- | -- |
| Producer → consumers | `EligibilityRegistry`, `EligibilityEventType`, `EligibilityTransitionError`, exported via `./governance`. Intended consumers: JON-80 (private source reference withheld) acceptance, JON-81 (private source reference withheld) U membership, JON-82 (private source reference withheld) verification; JON-59 (private source reference withheld)'s authenticated C4/lifecycle evidence is an input boundary. |
| Identity keys | Commands use `identityId`, `proceedingId`, `convictionId`, `allegationId`; C4 uses `affectedIdentityIds` plus `authentication`. Commands normalize IDs with trimming. `IDENTITY_REGISTERED` creates its own identity entry without a population lookup or class restriction. |
| Authority / events | Event types: registration, allegation, formal proceeding opened/closed, C4 creation event open/restriction closed, death, capital termination, felony entered. Mere allegation remains eligible; death/capital termination final; felony bar permanent. C4 merely requires a nonblank `authentication.authorityId`; no signature/role/policy validation occurs. Other commands have no authority verifier. |
| Schema/version | Private in-memory `#events` array and `#states` Map; no persistent store, import/restart loader or schema migration. Events expose `version, effectiveAt, recordedAt`. `version` is current array length, not an externally durable generation. |
| Event ordering | `applyBatch` assigns incrementing event versions and rejects a decreasing effective time relative to prior/batch events; equal times are permitted. `stateAt(identityId,{version,at})` replays filtered events. No relationship to population sequence, ballot receipt order or close transaction is implemented. |
| Transaction / expected version | `apply(command,options)` / `applyBatch(commands,{expectedVersion=this.version})` clone state, reduce all commands, and publish the in-memory batch only if successful. Explicit stale versions fail, but the caller may omit the version. No shared database transaction or cross-process synchronization. |
| Consumer reads | `canCastNewBallot(identityId,{at})` returns eligibility/reason. `electionStatus(identityId,{closesAt,acceptedBallotAt,at})` trusts a supplied accepted timestamp and preserves it; it does not verify a JON-80 (private source reference withheld) receipt. `auditLog({afterVersion})` returns cloned events. |
| Retry / failure | Selected repeated state transitions fail; allegations have no unique event-ID deduplication. Version conflict, invalid time, unknown identity and invalid transitions throw; failed batches leave in-memory state unchanged. Restart loses state. |
| Proof / readiness | VERIFIED reducer behavior; inspected nine tests cover branch-level temporal semantics and rollback. Persistent authoritative eligibility, genuine authentication, identity-class exclusion and durable cross-producer order are MISSING. |

### 3.3 JON-80 (private source reference withheld): first-valid ballot and attempt history

| Dimension | Actual inspected interface and remaining boundary |
| -- | -- |
| Producer → consumers | `BallotBox(filename,{authorizeSubmission,now,id})`, `submit(submission)`, `getAccepted(electionId,identityId)`, `getAttempts(electionId,identityId)`; JON-81 (private source reference withheld) must consume accepted receipts, not independently accept ballots. JON-59 (private source reference withheld) may consume narrowly authorized attribution for an exact sealed creation resolution; no such adapter is delivered. |
| Keys / accepted values | Submission `electionId,identityId,sourceType,choice,submittedAt`; source must equal `constitutional_ballot`; choices are `yes,no,abstain`. Identity/election strings are trimmed. Generated attempt ID and receipt ID default to UUIDs. Unique acceptance key is `(election_id,identity_id)`. |
| Authority handoff | Synchronous `authorizeSubmission({database,electionId,identityId,recordedAt})` must return `onOpeningRoll,eligible,closesAt`. The module checks truthiness of the first two fields, not strict booleans, and validates close-time parseability. It provides a callback seam, not the authenticated authoritative adapter itself. |
| Schema/version | `001_ballots.sql`: durable `ballot_attempts` and `accepted_ballots`; receipt primary key, unique attempt reference, unique election/identity. Receipt includes choice, accepted time and SHA-256 of serialized submission. No opening-roll snapshot ID, eligibility event version, authority/policy generation, authenticated actor proof or schema version is stored in the receipt. |
| Event ordering | Attempts are read by SQLite rowid. `recordedAt` is captured **before** `BEGIN IMMEDIATE`; client `submittedAt` is retained but not used to override close. Late comparison is `recordedAt > closesAt`, so equality is currently accepted. There is no election-open timestamp check or persistent closed-state token in this component. |
| Transaction / expected version | Authorization callback, duplicate check and attempt/receipt insertion occur inside one SQLite write transaction. Callback may read colocated authoritative state using the supplied connection. A callback reading JON-79 (private source reference withheld)'s separate in-memory state does not establish cross-process atomicity. No explicit expected eligibility/opening-roll version. |
| Retry / idempotency | Each call creates a new audited attempt. A valid eligible retry before close yields duplicate and original receipt; an ineligible/late retry is classified earlier and retains the original accepted row but need not return its receipt ID. No client request-idempotency key. Malformed corrections are separate attempts. |
| Failure behavior | Application rejections are persisted in the transaction. Callback exceptions, invalid authoritative close, insertion errors or busy failure abort rather than create a durable attempt/failure entry; busy acquisition occurs before the try/rollback block. Fail-closed acceptance is not the same as complete failure-audit coverage. |
| Original / follow-up protection | P80 protects accepted rows from UPDATE/DELETE but lacks matching attempt guards. P80F adds attempt UPDATE/DELETE and INSERT-collision guards, plus accepted-receipt collision guards for receipt ID, attempt ID, election/identity and explicit rowid. This covers replacement with recursive triggers disabled. It does not control schema/file-owning writers. |
| Proof / readiness | VERIFIED P80/P80F source; P80F tests include legacy upgrade/reopen, independent connection mutation and replacement rejection, and two child-process submitters. Current records link passing CI. Follow-up remains an unaccepted partial correction; auth, ordering and integration remain MISSING. |

### 3.4 JON-81 (private source reference withheld): opening roll, B/U/D and exact thresholds

| Dimension | Actual inspected interface and remaining boundary |
| -- | -- |
| Producer → consumers | `ElectorateAccounting(openingRoll,{eligible=openingRoll})`, `recordBallot(identity,choice)`, `setEligibility(identity,boolean)`, `snapshot()`, `close()`, `attempts`; exported via `./governance/electorate`. Consumers include constitutional decision logic and JON-82 (private source reference withheld); any JON-59 (private source reference withheld) creation-resolution tally must preserve authorized receipt provenance. |
| Identity / election keys | Opening roll is any iterable of nonempty string identities; duplicates are rejected. IDs are not trimmed; whitespace-only strings pass. Election identity, roll snapshot/version and receipt IDs are absent. One instance implicitly represents one election. |
| Source authority | Opening roll and eligibility come directly from caller values. `recordBallot` accepts first on-roll/currently eligible identity into its own Map without calling JON-80 (private source reference withheld) or requiring a receipt. It deliberately does not interpret choice, so arbitrary values can enter B through this public API. |
| Schema/version | All roll, eligibility, ballot and attempt state is in memory; no event ID, persistent schema, restart loader or monotonic revision. Exact P81 commit is the candidate interface revision. |
| Event ordering | JavaScript call order only. `close()` flips an in-memory boolean; subsequent ballot/eligibility writes throw. No close timestamp, event cutoff, durable freeze or tie ordering with JON-79 (private source reference withheld)/80. |
| Transaction / expected version | No database transaction, expected version, authoritative event cursor or commit receipt. Atomicity is limited to one synchronous in-memory method call. |
| B/U/D semantics | Within this instance, accepted identities form B, eligible on-roll nonvoters form U, and D is their combined length. Sets/Map provide uniqueness and disjointness; post-ballot eligibility loss leaves B intact. Abstention can enter B. This is correct local set behavior, not proof that B represents actual authoritative receipts. |
| Thresholds / retry / failure | BigInt arithmetic computes ceil(3D/5), ceil(2D/3), ceil(3D/4), floor(D/2)+1 and D. `thresholdPasses` explicitly requires D>0 and rejects affirmative>D. Raw `electorateThresholds(0)` yields zero for several thresholds, so consumers must use the pass guard. Duplicate calls add local attempts and retain first choice; no external event deduplication. Invalid inputs/closed mutations throw. |
| Proof / readiness | VERIFIED pure arithmetic/local set invariants; inspected six tests. Persistent receipt-derived accounting, authenticated event consumption and durable close remain MISSING. |

### 3.5 JON-59 (private source reference withheld): authorized census/capacity consumer

| Dimension | Current specification and inspected implementation boundary |
| -- | -- |
| Producer → consumer authority | Consume the one population authority established by JON-78 (private source reference withheld)/JON-82 (private source reference withheld); do not independently create a second population authority or mutate ballot history. JON-59 (private source reference withheld) itself remains gated behind JON-82 (private source reference withheld). |
| Identity keys | Canonical genuine identity, immutable permanent division and identity class, plus creation/mission/authorization provenance; E-COAIA/L-COAIA/CRA exclusions from franchise. No published census API/key schema is established by these artifacts. |
| Snapshot / schema | R is an ordered-cutoff phase snapshot of living ordinary/E/L identities in their divisions, excluding CRA and pending creations. T is live ordinary/E/L; C is all living CRA; P is unexpired reservations; K is a protected unused recovery unit. R/T are sealed. Snapshot ID/schema generation/commitment format remain SPECIFIED_ONLY. |
| Capacity semantics | G=T+C<=300 and T+C+P+K<=300; routine creation requires/preserves K=1. P78 only enforces living<=300 and returns 300-living; it has no P/K state. CRA active-role uniqueness is also absent from P78's generic class strings. |
| Event ordering | R freezes at a phase cutoff while T/C change with genuine creation/lawful end; reservation expiry must be ordered. Investigator end is permanent and cannot resurrect/reassign an identity. No shared ordered-cutoff/event-version interface is delivered. |
| Transaction / expected version | Capacity reservation, authorized creation, reservation consumption/expiry and lawful end must reconcile against the same authority, fail closed on missing/incompatible state/seals/AGT generations, and not overcommit. No callable reservation/clearance or CAS interface is established here. |
| Secrecy / reads | Public/executive output may expose permitted ordinary information and certified allocation/integrity references, not sealed R/T, covert counts or true headroom. Authorized custodians see only their scoped archives. P78's unrestricted `getPopulation().available` and class-bearing `getIdentity` must not be exposed directly as public census endpoints. |
| Retry / failure | No delivered idempotency or reconciliation protocol. Required future contract must bind reservation/creation/termination IDs and versions, prevent duplicate units, and fail closed without revealing protected membership. |
| Proof / readiness | SPECIFIED_ONLY for census requirements; MISSING implementation/proof in reviewed candidate set. This report neither creates nor dispatches JON-59 (private source reference withheld). |

## 4. Concrete discrepancies and owner actions

These findings come from source inspection; scenario outcomes below are reasoned consequences, not newly executed tests.

| ID | Exact evidence | Affected owners / required coordination |
| -- | -- | -- |
| IR-01: identity normalization mismatch | P78 `requiredString` (lines 17–21) returns original strings; P79 `requireId` (232) trims; P80 `text` (22–24) trims; P81 `identitySet` (116–128) retains strings. P79 `stateAt` validates but does not use the trimmed return before lookup (86–98). | JON-78 (private source reference withheld)/79/80/81 via JON-82 (private source reference withheld): define one immutable ID format and rejection/normalization policy at ingress; do not silently merge already-issued IDs. Prove equivalent producer/consumer identity joins. |
| IR-02: second identity authority and missing class exclusion | P79 registration (149–152) creates a new eligible identity without P78 lookup; `initialState`/decision has no class. JON-58 (private source reference withheld) excludes players, E/L/CRA and nonexistent identities from new ballots. | JON-78 (private source reference withheld)/79: derive registration and immutable class from population authority, enforce nonvoting classes before roll creation and each new-ballot decision. Add authenticated lifecycle consumption and no resurrection. |
| IR-03: eligibility durability and authentication absent | P79 state/events are only private memory (27–37); C4 check merely tests nonblank authorityId (130–145); other consequential commands lack authority verification. Its test passes a literal signature string without validation. | JON-79 (private source reference withheld): deliver durable authoritative events/restart semantics and verified institutional authorization/role/policy evidence. Persist event/authority provenance; retain local reducer tests as unit evidence only. |
| IR-04: incomplete event identity validation | P79 uses `command.proceedingId && requireId(...)` (155); formal opening then inserts the resulting undefined/empty value into its Set (160–164). Allegation IDs are not deduplicated. | JON-79 (private source reference withheld): validate required event identifiers and define replay/retry identities; add targeted malformed-transition and duplicate-event cases. This is an implementation repair, not a new governance choice. |
| IR-05: no atomic population→eligibility lifecycle | P78 commits its own connection; P79 has separate memory and no durable consumer cursor. A death/population commit and franchise transition cannot currently share a recoverable transaction. | JON-78 (private source reference withheld)/79/82: agree a transaction or durable ordered handoff with expected versions and reconciliation. A delayed/failed consumer must fail closed for new actions rather than silently diverge. |
| IR-06: ballot authorization/version evidence missing | P80 callback reads supplied values; receipt schema stores no opening-roll/eligibility/authority revision. JON-79 (private source reference withheld)'s `electionStatus` accepts a supplied timestamp without receipt lookup. | JON-79 (private source reference withheld)/80/82: bind acceptance to authenticated identity, roll revision, authoritative eligibility/close version and receipt provenance; enforce strict callback contract. Do not pass arbitrary booleans or timestamps as proof. |
| IR-07: close and revocation ordering unresolved | P80 captures time before acquiring its write lock (48–62), later checks that earlier time (81); it accepts equality at close. P79 treats equality as open (106–123); P81 closes solely when called. | JON-79 (private source reference withheld)/80/81/82: specify the authoritative ordering point and same-instant behavior from controlling rules, then test lock waits, revocation/receipt order and durable close. No unsupported new close convention is adopted here. |
| IR-08: accounting is a competing acceptance path | P81 `recordBallot` (63–73) writes its own Map with arbitrary choice and no receipt; docs call it the authoritative first-valid interface. `setEligibility` accepts any caller boolean. | JON-81 (private source reference withheld) with JON-79 (private source reference withheld)/80: consume verified producer receipts/events with idempotent durable cursors or derive directly from the authoritative snapshot. Keep valid abstention in B, retain B after disqualification, and derive U only from eligible opening-roll nonvoters. |
| IR-09: failure audit is incomplete | P80 callback/close errors and database failures rollback instead of retaining attempts; lock acquisition failure occurs before its try block. P78 likewise rolls back failed creation/audit, with no separate failed-attempt ledger. | JON-78 (private source reference withheld)/80/82: distinguish transaction rollback from required durable failure/security evidence; design retries and failure reporting without accidentally accepting an action or overwriting prior history. |
| IR-10: living cap is not commitment capacity | P78 `hasCapacity` uses only living count; its 299→300 test contains no P/K. JON-59 (private source reference withheld) additionally requires P+K and routine K=1. | JON-78 (private source reference withheld)/82 first define consumer contract; JON-59 (private source reference withheld) implementation later owns its authorized reservation semantics. Preserve G<=300 while distinguishing lawful protected-reserve consumption from ordinary creation; do not label every 299→300 routine creation lawful under JON-59 (private source reference withheld). |
| IR-11: census snapshot/secrecy boundary absent | P78 has per-ID history and unrestricted class/headroom reads, but no sealed R cutoff, authorized global cursor or redacted certified-allocation API. JON-59 (private source reference withheld) forbids public true headroom/covert counts. | JON-78 (private source reference withheld)/82 define versioned authorized census interface; JON-59 (private source reference withheld) consumes it after its gate. Do not publish raw global counts or hand all institutions an unrestricted registry. |
| IR-12: raw population replacement requires review | P78 schema guards updates of identity fields and terminal rewrites, but has no BEFORE INSERT collision guard for identities/events; event no-delete triggers alone do not establish replacement resistance with SQLite's default recursive-trigger behavior. | JON-78 (private source reference withheld): review raw-write `INSERT OR REPLACE`/rowid/unique-key paths and process/file authority; require targeted proof before treating schema as universally immutable. This is source-identified risk, not a new execution result. P80F addresses only ballots. |
| IR-13: shared export collision | P79's `src/governance/index.js` exports eligibility; P80's independently added same file exports only ballots. Producer package export/check changes and changelog/README edits overlap; P81 adds `./governance/electorate`. | JON-82 (private source reference withheld) integration owner reconciles exports/package/docs additively at one combined commit after accepted pins. Do not overwrite one branch's index/package with another. |
| IR-14: no durable frozen accounting result | P81 close/roll/B/U are memory-only, no election ID/version; restart cannot reconstruct a certified closed result from this API. | JON-81 (private source reference withheld)/82: pin election and opening-roll IDs, accepted receipt set, eligibility cutoff and close revision in recoverable authoritative evidence. Verify restoration after close cannot rewrite D. |
| IR-15: follow-up pin is distinct from recovery pin | P80F changes migration/tests/docs only; P80 ballot authorization/time behavior is unchanged. Current JON-80 (private source reference withheld) says it is an unaccepted partial follow-up. | JON-80 (private source reference withheld)/82 record original→follow-up lineage and explicit acceptance evidence before replacing a dependency pin. Do not keep reporting the original attempt-mutation defect as unfixed in P80F, or claim all JON-80 (private source reference withheld) requirements passed. |

## 5. Required handoff contracts — proposals, not existing APIs

The following is a coordination checklist to resolve the discrepancies. Field concepts are proposed requirements for interface review; they are not claims that functions or schemas already exist.

| Boundary | Minimum information/guarantee to agree before use |
| -- | -- |
| Population → eligibility | Canonical identity/class/division; attributed creation/terminal event ID; immutable lifecycle; durable population revision and consumer checkpoint; authenticated allowed event source; ordered or atomic application; duplicate-safe replay and discrepancy escalation. |
| Population → census | Authorized sealed snapshot at ordered cutoff plus live capacity revision; immutable class/division; lifecycle cursor; explicit P/K reservation ownership; no raw roster/headroom exposure outside least-knowledge scope. Snapshot remains separate from voting roll. |
| Eligibility + opening roll → ballot intake | Authenticated submitting identity; exact election/roll revision; eligible-at-authoritative-order-point result and evidence; close state/version; transaction consistency or durable conditional commit; nonvoting class exclusions; unavailable authority fails closed. |
| Ballot intake → accounting | Immutable accepted receipt bound to election/identity/choice/source and authority versions; accepted-versus-rejected distinction; duplicate-safe consumption; no independent acceptance decision; retained valid abstention and post-disqualification B membership. |
| Eligibility → accounting | Ordered genuine eligibility events and durable consumer cursor; opening-roll membership; changes only affect eligible nonvoters in U; accepted identities remain in B; close cutoff enforced durably. |
| Accounting → decisions / census creation authorization | Election-specific frozen B/U/D with disjointness/uniqueness, affirmative valid receipt attribution, exact threshold pass guard including D=0, versioned close evidence and authorized access. An abstention in B is not an affirmative creation authorization. |
| All authoritative writers → audit/recovery | Authenticated source identity, unique event/request identity, expected revision, committed revision, attributable failure category, recovery/reconciliation policy, permitted redacted reads and process/file boundaries. Avoid a new universal authority owned by CRA. |

## 6. Proposed integration order and gates

1. **Preserve delivery evidence and accept specific producer revisions.** Keep PRs ptown16801-lang/concord#6 (private source reference withheld)–9 and ptown16801-lang/concord#12 (private source reference withheld) distinct. Resolve producer review findings through their existing owners. Record accepted commit/interface pins explicitly. Published branches and this report alone do not start JON-82 (private source reference withheld). JON-90 (private source reference withheld) remains the native workflow gate; JON-84 (private source reference withheld) remains informational.
2. **Coordinate identity/event/authorization contracts before adapters.** Set canonical key rules, class/division semantics, durable ordering/version meanings, authority verification, required event IDs, and ambiguous-retry reconciliation. This is specification coordination; no product integration is performed by this report.
3. **Make population/lifecycle and eligibility a durable coherent authority.** Establish restart-safe events and authorized writes; eliminate independently registered nonexistent/nonvoting identities; prove death/conviction/formal/C4 transitions cannot leave new-ballot eligibility silently stale.
4. **Bind ballot acceptance to that authority and election state.** Review/adopt the P80F audit correction as an explicit candidate pin. Implement and verify the genuine authoritative adapter, signed/attributable identity evidence, close/revocation order, versioned acceptance proof and failure-audit policy.
5. **Make accounting a receipt/event consumer.** Reuse exact arithmetic, but derive B from valid JON-80 (private source reference withheld) receipts and U from eligible opening-roll nonvoters. Persist or reconstruct election/roll/cutoff/close state. Reject independent arbitrary acceptance; retain abstention and already valid ballots exactly as JON-58 (private source reference withheld) requires.
6. **Define the** JON-59 (private source reference withheld) **consumer contract inside** JON-82 (private source reference withheld)**.** Specify sealed R snapshots, live T/C, capacity revision and P/K reservation boundary, class immutability, authorized redacted reads and fail-closed prerequisites. This interface preparation does not launch the gated JON-59 (private source reference withheld) implementation.
7. **Only after authorized dispatch, reconcile shared files and verify one exact combined SHA.** JON-82 (private source reference withheld) owns exports/package/docs integration, production adapters, migrations and integration tests. Incorporate JON-88 (private source reference withheld) fixtures through real APIs; standalone fixture validation remains distinct from production integration.
8. **Record independent combined evidence before downstream release.** Required evidence includes genuine competing writers, crash/restart/replay, near-cap reservations, authorization failure, close/revocation races, B/U disjointness and D equality, D=0, abstention, post-ballot disqualification, restoration timing, nonvoting classes, secrecy and immutable history. Then perform the existing review/acceptance gates. No automatic merge, downstream dispatch or owner-gate closure follows.

## 7. Proof inventory and limitations

| Track | Existing evidence inspected or linked | What this continuation does not claim |
| -- | -- | -- |
| JON-78 (private source reference withheld) | Six focused tests present; current issue links [CI run 35150591366](<https://github.com/ptown16801-lang/concord/actions/runs/35150591366>), Node22/24 passed | No rerun, full authorization proof, P/K proof, sealed census proof or combined acceptance |
| JON-79 (private source reference withheld) | Nine reducer tests present; current issue links [CI run 35150977255](<https://github.com/ptown16801-lang/concord/actions/runs/35150977255>), Node22/24 passed | No durable restart or authentication proof; literal test evidence is not cryptographic verification |
| JON-80 (private source reference withheld) original | Original behavior/source and receipt schema inspected; issue links [CI run 35151386266](<https://github.com/ptown16801-lang/concord/actions/runs/35151386266>) | Original Promise callbacks did not establish process concurrency; original attempt protection remained incomplete |
| JON-80 (private source reference withheld) follow-up | Nine focused tests include independent processes, legacy upgrade/reopen and independent SQLite mutation attempts; current issue links [CI run 35161033240](<https://github.com/ptown16801-lang/concord/actions/runs/35161033240>), Node22/24 passed; prior current-team local run recorded 9 focused/32 full passes | No tests rerun in this continuation; no authority adapter, cross-store ordering, schema/file isolation or overall JON-80 (private source reference withheld) acceptance |
| JON-81 (private source reference withheld) | Six arithmetic/local-accounting tests present; current issue links [CI run 35151691581](<https://github.com/ptown16801-lang/concord/actions/runs/35151691581>), Node22/24 passed | No receipt-derived production accounting or restart/close proof |
| JON-59 (private source reference withheld) / combined | Current JON-59 (private source reference withheld)/JON-82 (private source reference withheld) contracts inspected; no combined implementation SHA delivered here | SPECIFIED_ONLY / PRODUCTION_INTEGRATION_NOT_RUN |

The source and test files were directly inspected at their stated pins. CI links/statuses in the table are recorded existing evidence read from current issue contracts, not newly launched checks. Source inspection establishes code behavior/omissions, not successful adversarial execution of every scenario.

The P80F collision guards deliberately fail closed for certain legacy explicit negative-rowid cases, including SQLite's -1 unassigned-rowid sentinel; this is documented by the follow-up and remains a compatibility consideration. No trigger can substitute for an authorized writer process and protected database file. Historical tampering cannot be reconstructed merely by adding guards.

No raw archived constitution/source packet was retrieved or exported for this continuation; current accepted Linear rules were used as specified by JON-87 (private source reference withheld). This is not a full governing-source authenticity audit and does not duplicate JON-89 (private source reference withheld) or JON-88 (private source reference withheld). The original JON-87 (private source reference withheld) report remains unavailable; this new deliverable closes only the specifically authorized continuation/report-delivery gap when retained and linked by the coordinator.

## 8. Handoff checkpoint

* **Contract revision:** JON-87 (private source reference withheld) v1.0 plus current scoped-continuation checkpoint; workflow v1.3.
* **Executor:** current team specialist `/root/repository_delivery_audit`; no new remote task link created.
* **Repository:** `ptown16801-lang/concord`; source pins and default branch recorded above.
* **Completed:** all four producer boundaries plus JON-59 (private source reference withheld) consumer mapped; source/reference/version register; identity/authority/schema/order/transaction/retry/failure/proof matrix; fifteen actionable discrepancies; proposed integration order.
* **Evidence:** immutable GitHub source links, direct local object inspection, live current Linear contracts and repository branch metadata.
* **Remaining:** original report recovery if desired as historical provenance; producer fixes/review/accepted pins; authorized JON-82 (private source reference withheld) combined implementation/verification; JON-59 (private source reference withheld) implementation after its gate.
* **Blocker for this report:** NONE. Integration blockers remain explicitly listed.
* **Next action:** coordinator retains/links this versioned continuation on JON-87 (private source reference withheld) for review, then routes findings to existing producer owners without starting duplicate tasks. JON-82 (private source reference withheld)/JON-59 (private source reference withheld) gates remain unchanged.
