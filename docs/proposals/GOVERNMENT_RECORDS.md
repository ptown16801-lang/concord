# Government records: database design proposal

Status: **architectural proposal**, derived from an unpublished analysis dated
October 13, 2026. The domain map, SQL kernel and derivative flows below are design
alternatives. They are not an accepted schema, an implemented integration, or a
fresh audit of the published code. No decision change is made here.

The source analysis names several pull requests and an integration head, but does
not pin an exact commit for all twelve code comparisons in §2. Those comparisons
are preserved as historical design questions. Each needs source-version recovery
and a check against the intended implementation revision before it can be reported
as a current defect. A later fix may already address it.

This edition retains the substantive database design while qualifying that evidence
limit and reconciling the known Archivist, admission and founding-count mismatches.
See the [security contract](../SECURITY_DOMAIN_CONTRACT.md),
[identity contract](../IDENTITY_PERSISTENCE_CONTRACT.md),
[scheduler contract](../SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md),
[population and voting guide](../architecture/POPULATION_AND_VOTING.md),
[Archivist design](../design/ARCHIVIST_PUBLICATION.md), and
[implementation status](../PROJECT_STATUS.md). The governing
[decision register](../../DECISIONS.md) retains its authority and its documented
reconciliation limits. Older contract language does not override later CON-045/046.

Source identifiers such as IR-07 identify the historical interface-readiness
analysis; the question and its design consequence are reproduced here so readers
do not need access to that record.

## 1. The governing idea

Concord's records aren't one database with permissions on top. The rules make them a **federation of sealed domains**. Each domain has its own gateway, authorization, reader, writer, store, keys, backups, Linux UID and audit stream (Security contract §1.1–1.2, CON-040). Information may cross a boundary only as a **separately authorized derivative** (CON-062), produced by the source domain for a named purpose and audience, and minimized to what that purpose needs.

So the schema question is really three questions:

1. **Which domains exist, and what does each one own?** (§3)
2. **What kernel does every domain share?** (§4)
3. **What exactly is allowed to cross, in what shape?** (§5)

The proposal concentrates on cross-domain information and authority: a locally correct component does not by itself establish a correct integrated boundary.

---

## 2. Historical code comparisons requiring reconciliation

The following twelve comparisons were written on October 13, 2026. The described
behavior is **what that analysis reported**, not a freshly verified finding. File
names and symbol names identify the inspection targets, but the original analysis
does not establish a complete exact-revision baseline. The final column is a
proposed design response, not an instruction to replace current code. In
particular, no trigger should be removed until a verified replacement preserves
the invariant it enforces.

| # | Historical inspection target | Behavior reported on October 13 | Boundary or question identified | Proposed design consequence |
|---|---|---|---|---|
| C1 | `src/population/migrations/001_population.sql` trigger `population_living_cap_insert`; comment says it is the last line of defence "for every identity class … including future hidden-investigator/dual-census integrations" | Enforces the 300 cap by counting living rows in the population table, which implies E-COAIA/L-COAIA/CRA rows live in the same table | CON-008/009: R and T are sealed; rosters, class counts, combined covert counts and true headroom must not be visible to public/executive views. Security contract §2 puts sealed census in its own domain. JON-87 IR-11 flags `getPopulation().available` and class-bearing `getIdentity` as unsafe | Keep authoritative cap enforcement within the sealed boundary; ordinary/public readers must not obtain covert identities or true headroom. The proposed clearance/reservation interface is in §5.2. The mere presence of a count does not establish a disclosure, intent or adjudicated offense; actual readers and derivative paths need inspection |
| C2 | Same file | Cap is `living >= 300`. No P, no K | `T + C + P + K <= 300`; routine creation requires K=1 (CON-008, IR-10) | Routine creation must stop when headroom including the reserve unit is exhausted. That arithmetic can only be done inside the sealed domain |
| C3 | `population_identities` | Terminal state is an in-place `UPDATE` of `terminal_*` columns; no BEFORE INSERT collision guards | Append-only history; IR-12 notes the same REPLACE/rowid risk already fixed for ballots | Identity row = immutable facts only. Lifecycle = events. Current state = projection |
| C4 | `bootstrap-impeachment-approved-v1.md` §5: `ConflictSnapshot.knownInvestigators[]`, `PanelRecord.exclusions[{identityId, reasonCode}]` | Panel composition records carry investigator identities and per-person exclusion reasons | CON-009 (investigator rosters sealed), CON-034 (no public event may reveal a sealed investigation's existence, target, timing), CON-018 (procedure public, evidence need-to-know) | Panel records need two layers: a public procedural record with coarse, non-revealing reason classes, and a protected exclusion record in the custodian domain. Exclusion input arrives as a sealed attestation, not a list of investigators (§5.4) |
| C5 | `impeachment-store.js` + `impeachment-service.js` | One SQLite file and one `case:<id>` stream hold both the House accusation stage and the Senate trial stage, under one writer | Domain-local writer per protected domain; accusation and trial strictly separated (CON-016/017); chamber archives separate (CON-040) | Procedural composition can arguably share a "proceedings" domain, since the spec bars evidence from it. But accusation-side and trial-side events need distinct writer principals, and nothing evidentiary may enter that stream. Needs a decision (§6 Q3) |
| C6 | `001_ballots.sql` | All ballots, including `choice` and `raw_submission`, are in one general table with no domain or classification column | L-COAIA creation-resolution ballots are sealed chamber-custody records (CON-009, JON-59), and C4 later needs authenticated attribution of YES voters | Sealed creation ballots must live in the chamber's protected domain, not the general ballot store (§3, §5.5) |
| C7 | `ballots.js` line 50 vs 62 | `recordedAt` taken **before** `BEGIN IMMEDIATE`; `>` comparison accepts a ballot at exactly close time | IR-07: close/revocation ordering unresolved | Take the ordering token inside the write lock. Store close as an event in the election stream. Same-instant rule must come from the controlling rules, not the code |
| C8 | `001_ballots.sql` receipt | Receipt stores no opening-roll ID/version, eligibility version, authority or policy generation | IR-06, CON-011 | Receipt must bind roll version + consumed eligibility attestation + policy generation |
| C9 | JON-79 `eligibility.js` | In-memory; `IDENTITY_REGISTERED` creates identities with no population lookup; C4 authority is a non-blank string | IR-02/03 | Eligibility is its own durable domain and consumes registry events; it must never mint identities |
| C10 | JON-81 `electorate.js` | Accepts ballots into its own Map | IR-08: competing acceptance path | Accounting is a pure projection over accepted receipts; no write path of its own |
| C11 | `ballots.js`, `registry.js` | Failures roll back and leave no durable trace | IR-09; CON-043 failure ledger | Failure evidence is written in a separate transaction/ledger after rollback |
| C12 | `sandbox/runtime.js` | Good: `operations`, `reservations`, `audit`, `delivered` (outbox), `policy_archive`, domain-mismatch check | — | This plus `impeachment-store.js` (streams, command idempotency, `impeachment_sources`) is the best existing pattern. Generalize it (§4) |

---

## 3. Proposed domain map

This map groups records by protection and writer responsibility. It is a design
alternative for applying the security contract, not proof that every row is an
accepted or implemented physical domain. Each actual protected domain requires
its own store, key root, writer identity and backup scope. The unresolved grouping
choices remain in §6; a logical separation in this table does not settle them.
The owner column names component responsibility, not a new appointment or grant.

| Domain | Owner | Holds | Never collapse with |
|---|---|---|---|
| **Population registry (ordinary)** | Population registry component | Ordinary identities: ID, division, creation route, authority, lifecycle events | Sealed census; eligibility; any covert identity |
| **Sealed census / capacity** | Sealed census authority | E-COAIA, L-COAIA, CRA identities and lifecycle; R snapshots, live T, C, P reservations, K; reconciliation | Public population view, scheduler queue, investigatory archives |
| **Eligibility / franchise** | Eligibility component | Franchise events (formal proceeding, C4 open/close, felony entered, death/capital termination, restoration), projection | Registry (consumes it); ballots (feeds them) |
| **Elections and ballots (ordinary)** | Election and accounting components | Elections, frozen opening rolls, attempts, accepted receipts, close events, certified results | Forum reactions (The Form, JON-20); sealed creation ballots |
| **House sealed custody** | House presiding officer | L-COAIA proposals, creation-resolution ballots, mission records for House investigators | Senate/Judiciary custody; executive |
| **Senate sealed custody** | Senate presiding senator | Same, for the Senate | House/Judiciary custody; executive |
| **Executive sealed custody** | Executive | E-COAIA creation, assignment, deactivation (the executive may know only its own) | L-COAIA records; census raw counts |
| **House / Senate / Judiciary investigatory archives** | Each institution | Investigation membership, missions, working material, evidence, refusal records (CON-034) | Each other; global search payload index; general legislative/court stores |
| **Proceedings (procedural)** | Proceedings components | Case streams: stage entries, snapshots consumed, panel records (public layer), charges, verdicts, appeals, finality certificates | Evidence (which stays in archives) |
| **Court records** | Judiciary | Dockets, rulings, precedent, C4 event-merits records | Judiciary investigatory archive |
| **Restrictions** | Restrictions component | Restriction orders, reviews, renewals, dormancy, supersession, discrepancies | Eligibility (it feeds eligibility events) |
| **Agreements** | Agreement component | Negotiations, revisions, assents, registrations, obligations, incidents, continuity | Market/settlement (JON-25 consumes it) |
| **Scheduler (global)** | Global scheduler | Opaque envelopes, reservations, checker results, petitions | Every protected domain's internal queue |
| **Domain-local schedulers** | Each protected domain | Internal queues and staffing | Global scheduler |
| **Petition-credit ledger** | Petition-credit component | Credits, consumption, refunds | Scheduler (stores receipts, never a shadow balance) |
| **Identity history** | Identity component | Complete raw interaction history per identity | Archive/publication; private memory |
| **Identity-private memory / workfiles** | Identity component | Per-identity partitions, each its own UID/key scope | Every other identity; institutional archive |
| **Archivist public ledger** | Archivist | Published records only | Source records; protected records |
| **Publication verification compartment** | Archivist | Only the minimum authorized approved package and verification material required for publication; no automatic custody of source archives | Public ledger; full protected institutional and investigatory source records |
| **Secret failure ledger** | Archivist | Failed publication/auth/security attempts | Public ledger; security audit |
| **Disclosure ledger** | Archivist | Every redacted/authorized disclosure package and its authority | Source archives (disclosure does not make them public) |
| **Security audit** | Security component | Security events, exposure/read receipts | Payload warehouses; publication |
| **Hidden research layer** | Hidden research / CON-051 | Coin and other research observations | Everything agent-visible; may never leak into errors, timing, counts or handles |
| **Artifact archive** | Artifact archive component | Reference artifact identity/hashes/locations | Public ledger (not a competing one) |
| **Research Library** | Research Library component | GOV bibliographic identities; Drive is canonical for PDFs | Any governance store |
| **Finger behavioral capture** | Finger | Already-built SQLite/object store | Governance identity (an anonymous cookie is not an identity) |

Two design choices need explicit qualification:

- **Ordinary registry and covert identity ownership.** Covert identities must not
  enter political opening rolls or B/U/D. This proposal places their raw identity
  records behind sealed custody and gives ordinary consumers only authorized
  derivatives. The physical registry split, identity namespace and authoritative
  lifecycle interfaces still need reconciliation with the accepted logical
  population model; exclusion from voting is not by itself proof of a particular
  storage topology.
- **Ballot custody.** Ordinary election ballots, each chamber's sealed creation
  ballots and procedural panel ballots have different readers and authority.
  Shared immutable-storage code is possible, while physical boundaries and writer
  separation must follow the applicable domain decisions. This proposal does not
  adopt a universal ballot store.

---

## 4. Kernel tables every domain shares

The historical analysis proposes reusing event-stream, idempotency, admission and
outbox patterns rather than duplicating their enforcement. The SQL below is
preserved as an **illustrative, unexecuted schema alternative**, not a migration.
It omits the complete trigger/authorization implementation and does not prove
append-only enforcement by itself.

Three unresolved compatibility points are visible in this sketch:

- `body_jcs` names RFC 8785, whereas the admission contract at commit
  `b813e15b33741b5c4ed982be6598193166124f96` uses the `concord.json/v1`
  canonical form and integer restrictions (`contracts/admission.js`). Choose and version a
  compatible format before implementation; the sketch does not change that wire
  contract.
- `consumed_inputs` uniqueness and one-use capability keys must be checked against
  actual derivative identities, repeated authorized consumption and replay scope.
- `operations.deadline` and the illustrative `aborted` outcome do not create an
  expiry/cancellation route for admitted work. Their representation needs
  reconciliation with CON-045/046. An admitted operation retains its approved
  scope through revocation/expiry and must pause safely when required audit
  collection is unavailable; technical conflicts remain explicit.

```sql
-- One per domain database. Opening a file with a different domain_id aborts
-- (already done in sandbox/runtime.js via meta 'domain').
CREATE TABLE domain_meta (
  domain_id TEXT PRIMARY KEY, schema_generation INTEGER NOT NULL,
  registry_version TEXT NOT NULL, created_at TEXT NOT NULL
) STRICT;

-- The authority. Everything else is a projection.
CREATE TABLE events (
  stream_id      TEXT NOT NULL,          -- 'identity:…', 'election:…', 'case:…'
  stream_version INTEGER NOT NULL,       -- expected-version CAS
  domain_seq     INTEGER NOT NULL UNIQUE,-- total order inside the domain
  event_id       TEXT NOT NULL UNIQUE,
  event_type     TEXT NOT NULL,
  schema_version INTEGER NOT NULL,
  body_jcs       BLOB NOT NULL,          -- RFC 8785 canonical JSON
  body_hash      BLOB NOT NULL,
  prev_hash      BLOB NOT NULL,          -- per-domain chain (tamper evidence only)
  -- time: keep all three (JON-15 §8, CON-005, CON-019)
  effective_at   TEXT,                   -- legal effect
  occurred_at    TEXT,                   -- claimed real-world time
  recorded_at    TEXT NOT NULL,          -- taken INSIDE the write lock (C7)
  -- authority (CON-038, CON-045)
  actor_identity TEXT NOT NULL, actor_capacity TEXT NOT NULL,
  workload_id    TEXT NOT NULL, writer_service TEXT NOT NULL,
  authority_ref  TEXT NOT NULL,          -- express grant / order / rule
  operation_id   TEXT,                   -- admitted operation, if any
  capability_id  TEXT,
  policy_gen     TEXT NOT NULL, compat_digest BLOB NOT NULL,
  -- record semantics (CON-042, JON-18)
  record_kind    TEXT NOT NULL,          -- proposal|motion|ballot|minutes|directive|case|agreement|communication|protected
  corrects_event TEXT, supersedes_event TEXT,
  pub_class      TEXT NOT NULL,          -- immediate|scheduled|protected|nonpublic
  signature      BLOB NOT NULL, signer_key_ref TEXT NOT NULL,
  PRIMARY KEY (stream_id, stream_version)
) STRICT, WITHOUT ROWID;

-- Request idempotency (impeachment_commands pattern). Same id + different digest = conflict.
CREATE TABLE commands (
  command_id TEXT PRIMARY KEY, stream_id TEXT NOT NULL,
  request_digest BLOB NOT NULL, response_jcs BLOB NOT NULL
) STRICT, WITHOUT ROWID;

-- Every cross-domain input this domain relied on, verbatim (impeachment_sources pattern).
CREATE TABLE consumed_inputs (
  derivative_id TEXT PRIMARY KEY, issuer_domain TEXT NOT NULL,
  derivative_type TEXT NOT NULL, issuer_version INTEGER NOT NULL,
  body_jcs BLOB NOT NULL, body_hash BLOB NOT NULL, signature BLOB NOT NULL,
  consumed_by_event TEXT NOT NULL, UNIQUE (issuer_domain, derivative_type, issuer_version)
) STRICT, WITHOUT ROWID;

-- Admission of an operation; immutable once written (CON-045: cannot be canceled).
CREATE TABLE operations (
  operation_id TEXT PRIMARY KEY, envelope_jcs BLOB NOT NULL, envelope_hash BLOB NOT NULL,
  participant_domains TEXT NOT NULL, expected_versions TEXT NOT NULL,
  authority_snapshot_hash BLOB NOT NULL, admitted_at TEXT NOT NULL, deadline TEXT,
  outcome TEXT CHECK (outcome IN ('committed','aborted','in_doubt')),  -- one-way from NULL
  outcome_event TEXT
) STRICT, WITHOUT ROWID;

CREATE TABLE capability_uses (            -- one-use capabilities, consumed atomically with the effect
  capability_id TEXT PRIMARY KEY, operation_id TEXT NOT NULL, consumed_event TEXT NOT NULL
) STRICT, WITHOUT ROWID;

CREATE TABLE outbox (                     -- delivery obligation committed with the event (JON-79 "atomic handoff")
  outbox_id TEXT PRIMARY KEY, event_id TEXT NOT NULL, destination TEXT NOT NULL,
  derivative_type TEXT NOT NULL, created_at TEXT NOT NULL
) STRICT, WITHOUT ROWID;
CREATE TABLE outbox_delivered (outbox_id TEXT PRIMARY KEY, receipt_hash BLOB NOT NULL, delivered_at TEXT NOT NULL) STRICT, WITHOUT ROWID;

CREATE TABLE exposure_receipts (          -- who saw what, under which authority (CON-041; never deleted on expiry)
  receipt_id TEXT PRIMARY KEY, viewer_identity TEXT NOT NULL, classification TEXT NOT NULL,
  selector_hash BLOB NOT NULL, authority_ref TEXT NOT NULL, capability_id TEXT NOT NULL,
  exposed_at TEXT NOT NULL
) STRICT, WITHOUT ROWID;

CREATE TABLE discrepancies (              -- JON-61 safety rule: never auto-repair; route to independent review
  discrepancy_id TEXT PRIMARY KEY, class TEXT NOT NULL, implicated_authority TEXT NOT NULL,
  expected_state_hash BLOB, observed_state_hash BLOB, evidence_refs TEXT NOT NULL,
  opened_event TEXT NOT NULL, review_decision_event TEXT
) STRICT, WITHOUT ROWID;

CREATE TABLE checkpoints_external (       -- head hashes anchored outside the domain (JON-132: in-DB chain ≠ proof)
  domain_seq INTEGER PRIMARY KEY, head_hash BLOB NOT NULL, anchor_ref TEXT NOT NULL, anchored_at TEXT NOT NULL
) STRICT, WITHOUT ROWID;
```

**How the kernel is enforced.**

- **Writer-only access.** Only the domain writer UID can open the file read-write (Security contract §2 Linux profile). The writer runs a fixed allowlist of prepared statements, and an SQLite authorizer callback denies UPDATE/DELETE on protected tables. Triggers stay as the backup layer: the existing `no_update`/`no_delete`/`no_replace` set, applied by the shared library.
- **Kernel guards, generated per table.** BEFORE INSERT collision guards on every unique key (which is what closed the REPLACE hole for ballots). `operations.outcome` and `discrepancies.review_decision_event` may only change NULL → value, once.
- **Failure evidence survives rollback (C11).** On rollback the writer opens a second transaction and appends a failure event to the domain's failure stream. If that is protected-class, it is also delivered to the secret failure ledger via outbox.
- **Audit outage (CON-046).** Distinguish the required pre-effect collector
  availability check from delivery of a post-commit receipt. Collector unavailability
  pauses admitted effects while preserving the operation. A failed post-commit
  delivery leaves a durable retry obligation; it does not undo an effect or authorize
  executing it again. The exact recovery protocol must reconcile its admitted intent,
  durable effect and delivery record without fabricating evidence.

---

## 5. What crosses domain boundaries, and how

### 5.1 One derivative envelope for every crossing

Everything in §5.2–5.8 uses this shape. It is the database-level form of "cross-domain disclosure needs separately authorized derivatives" (CON-062):

```text
derivative_id, derivative_type, schema_version
issuer_domain, issuer_version (issuer's domain_seq high-water mark)
audience_domain, audience_service, purpose_code (closed vocabulary)
authority_ref (what permits this disclosure), minimization_class
subject_refs   -- opaque, audience-specific references (see below), never raw IDs
                  unless the audience is authorized for raw IDs
assertions     -- the minimum facts the audience needs
not_before, expires_at, one_use
issuer_signature, issuer_key_ref
```

**Audience-specific references.** The proposal sketches
`subject_ref = HMAC(issuer_domain_key, audience_domain || purpose || subject_id)`
for a subject the audience is not entitled to identify. This is a design sketch,
not an anonymity guarantee. Use an unambiguous encoded namespace, scoped key
management and explicit rotation/replay rules. Shared assertions, timing and small
cohorts can still enable linkage or differencing. The issuer may resolve a reference
only through the authorized dereference path; the full derivative needs inference
review, including what two recipients can learn together.

**Rules applied to every derivative type.**

- **Free text is rejected.** Vocabularies are versioned (Scheduler contract §3.2).
- **Small cohorts are suppressed or bucketed** before issue (CON-062, Scheduler §3.2).
- **Permission filtering comes first.** It happens before counts, layouts, search, caches or export (CON-062). A derivative may not carry a count that a cohort can be subtracted from.
- **Denials don't reveal existence.** Errors and refusals look the same as "no such record" unless policy allows otherwise (Security §4).
- **Stale data shows as stale.** Missing, stale, frozen or incompatible values are typed, never `0`/empty/healthy (Security §9).
- **Both ends keep a copy.** The receiver stores the derivative verbatim in `consumed_inputs`, and the issuer records an outbox row plus, when it is a disclosure, a disclosure-ledger entry.

### 5.2 Identity creation and the population ceiling

This proposed response to historical C1/C2 makes creation a coordinated operation
across the capacity and identity-custody boundaries. Its reservation states and
transitions are not yet an implemented or accepted interface:

1. The creation route's authority is evidenced: Executive authorization or an agent petition (CON-010, no special supermajority).
2. **Sealed census** checks `T + C + P + K <= 300` with K=1 preserved. It appends a `P` reservation event and issues a `capacity_clearance` derivative: `{reservation_ref, expires_at}`. It contains **no headroom, no counts, no class**.
3. **Population registry** consumes the clearance in the same admitted operation and appends `identity.created`. Its outbox sends `reservation.consumed` back to the census, which converts P → T.
4. **Expiry and admission.** A reservation that has not been bound into lawful
   admission may expire by a census event. The interface must distinguish this
   pre-admission state from a reservation already bound to admitted work; expiry
   cannot cancel that admitted operation under CON-045.
5. **Covert creations** (E-COAIA in executive custody, L-COAIA in chamber custody) never touch the ordinary registry. The census and the custody domain do the same dance between themselves.

**What public and executive readers get.** A `certified_allocation` derivative: House size, apportionment, Electoral College allocation, and an integrity commitment. Small-domain counts can be enumerated from a plain hash, so the proposal requires
review of a keyed or appropriately salted commitment and its disclosure context.
Neither the name "commitment" nor adding a salt proves secrecy; verify entropy,
key custody, authorized opening and linkage resistance. This is a disclosure-risk
observation, not an adjudication of an offense.

### 5.3 Lifecycle → eligibility → ballots → accounting

This is the IR-05/06/07/08 chain made durable:

```text
registry ──identity.created / identity.terminal──► eligibility (consumes via cursor)
restrictions / courts / Senate ──franchise events──► eligibility
eligibility ──eligibility_attestation{subject, election, eligible, as_of_version}──► ballots
ballots ──accepted receipts──► accounting projection (same domain, read-only)
```

- **Eligibility.** It keeps a `consumer_cursor(issuer_domain, last_seq)` per source and refuses new-ballot decisions when its cursor lags the source's attested high-water mark. Missing data fails closed.
- **Elections domain tables.**
  - `elections`: id, electorate kind, rule version, close rule.
  - `opening_rolls`: election_id, identity_ref, frozen at a roll event, plus a roll hash.
  - `ballot_attempts` and `accepted_receipts`, with `UNIQUE(election_id, identity_ref)`.
  - `election_close`: an event in the election stream.
  - `certified_results`: B, U, D, threshold rule version, receipt-set hash, roll hash, close event.
- **What a receipt binds (C8).** Roll version, consumed eligibility attestation ID, policy generation, and authority. The attempt's `recorded_at` and the close check both happen under the same lock as the close event (C7).
- **Accounting (C10)** is a deterministic query over receipts plus the eligibility projection as of close. B, U and D are recomputed and compared with the certified row. Abstention stays in B. A post-ballot disqualification leaves the ballot in B. Restoration after close cannot change the certified row (CON-011/012).

### 5.4 Panels, conflicts and investigators (proposed response to C4)

A panel draw needs to exclude "anyone known at assignment time to have investigated the case" without revealing who the investigators are.

- **Attestation instead of a list.** Each investigatory archive and custody domain issues a `panel_exclusion_attestation` to the proceedings domain: `{case_ref, stage, excluded_subject_refs[] (HMAC per case), reason_class: 'PROTECTED_CONFLICT'}`.
- **Public procedural layer.** The panel record keeps exclusions as `{subject_ref, reason_class}` where reason classes are coarse and shared: `UNAVAILABLE`, `CONFLICT`, `INELIGIBLE`. An investigator exclusion is indistinguishable from any other conflict.
- **Protected custodian record.** The real reason and source event stay in the custodian domain, available to authorized review (CON-034 pattern).
- **Replay still works.** The seed commitment, algorithm version and snapshot references need a reviewed
  public representation. Publishing raw identifiers or an enumerable exclusion-set
  hash can itself reveal a protected conflict. The exact protected exclusion set
  and replay evidence remain available to an authorized reviewer; the public
  derivative must independently pass minimization and inference review.

### 5.5 C4: the longest cross-domain chain in the rules

This is a proposed end-to-end data-flow model, not an independently accepted
complete procedure. Each transfer requires the relevant authority, permitted
audience and current procedural rules. It touches several domains, with a secrecy
boundary at each step:

1. **Chamber sealed custody.** Sealed proposal, CRA capacity clearance, and the creation-resolution ballot (only valid authenticated YES votes authorize).
2. **District court.** It receives the sealed creation record as a `sealed_record_transfer` derivative; the disclosure is logged. It opens `C4_CREATION_EVENT_OPEN` with an authenticated affected-identity list.
3. **Eligibility.** It consumes `C4_CREATION_EVENT_OPEN` and applies temporary ineligibility, which starts only at that event (CON-012).
4. **Affected identities.** They get the admissible record via the disclosure ledger, at least two complete defense turns after actual access, and the appeal windows (CON-021). Each window is an event with `effective_at` and the actual-access time, because the clock runs from actual access, not from issue.
5. **Finality certificate.** It is issued after the appeals, plus one full administrative turn (CON-020/021). The certificate records the notices, windows, filings and rulings it relied on.
6. **Attribution verification.** The chamber domain issues `affirmative_voter_attestation{resolution_ref, proposer_ref, yes_voter_refs[]}`. NO, abstain, nonvote and malformed ballots are excluded by construction, not by filter.
7. **Terminal effects.** Each derivative termination is its own admitted operation. It writes the terminal event in the registry (for an L-COAIA, in the census), the eligibility event, and Tombstone credential revocation (JON-60). Retained valid ballots stay intact.

Schema implications:

- **Per-identity references.** The chamber ballot store must be able to produce a per-identity, per-resolution attestation without exposing the rest of the chamber's sealed ballots. Store `(resolution_id, identity_id, choice, receipt_hash)` so a single-resolution projection is cheap and complete.
- **Stays.** Appeal stays are events on the case stream that downstream termination operations must read before admission.

### 5.6 Defense disclosure (CON-018)

The following is a proposed protected disclosure-ledger shape, intended to capture
the record needed under CON-018. A listed recipient is the recipient of the
authorized package, not automatically a reader of every ledger field. In
particular, source hashes, redaction maps and exposure receipts remain protected
unless their own disclosure is authorized:

```text
disclosure_id, case_ref, recipient (accused | trial body | grand jury | court | public)
authority_ref, source_domain, source_record_hashes[]
package_hash, redaction_map_hash, derivation_method
basis: relied_upon | exculpatory | necessary_for_defense | lawful_end_of_secrecy
reliance_withdrawn_event (if redaction prevented meaningful defense and the prosecution stopped relying on it)
disclosed_at, exposure_receipt_ids[]
```

The "do not rely on hidden material" alternative has to be a recordable event, so the proceedings domain can mechanically check that every relied-upon item has a disclosure or a withdrawal.

### 5.7 Scheduler

Global scheduler tables contain only the opaque envelope fields listed in Scheduler contract §3.2, with signature and expected envelope version. They never hold names, missions, case identity or queue position.

- **Separate state axes.** Allocation, authorization, checker and petition state are separate columns or streams, never one `status` (§4).
- **No scores.** No composite score column may exist (§2, §12).
- **Petition credits** are receipts from the credit ledger. Duplicates consume a credit and get no refund (CON-033).

### 5.8 Publication

The updated Archivist design distinguishes source custody from publication custody:

1. The source institution keeps its protected original and authorizes a minimized
   publication package through a typed, signed submission.
2. The Archivist checks the authenticated submitting identity, signature, express
   publication authority, package integrity and release conditions. Authentication
   alone is not authority to publish.
3. Only the approved public package enters the public ledger. The minimum authorized
   verification material may enter the separate verification compartment; this
   does not transfer the full institutional or investigatory archive.
4. Failed verification is recorded in protected failure evidence with non-revealing
   public responses. Source references and hashes appear publicly only when their
   disclosure is independently authorized; a hash may reveal membership or permit
   guessing even when the protected payload is absent.

Publication does not grant source authority or rewrite the original. The accepted
October 10 remedy process is temporary emergency suppression followed by independent
review, recorded reasons and an appeal route to restore access. Protected evidence
retention and append-only correction/serving history remain mandatory. Exact actors,
criteria, durations, deadlines and restoration authority remain to be bound. See
[Archivist publication](../design/ARCHIVIST_PUBLICATION.md) for the maintained
design and those unresolved details.

---

## 6. Design questions retained from the October 13 analysis

These are historical design questions, not assertions that the project has made
no later decision. Reconcile the relevant versioned decisions and component
contracts before treating any row as an unresolved owner decision. This document
does not assign work or adopt answers.

| # | Question | Why it matters for the schema |
|---|---|---|
| Q1 | Are ordinary elections secret-ballot, roll-call, or does it depend on body and type? C4 needs YES attribution for creation resolutions; publishable legislative decisions go out immediately. | Decides whether `choice` and `identity` may sit in one publishable row or must be split, with only counts published |
| Q2 | Do E-COAIA/L-COAIA identities ever appear under their real ID outside sealed custody, for example when acting in ordinary work? | If yes, every domain they touch needs per-domain pseudonyms, and the census becomes the only mapping |
| Q3 | Is the impeachment case stream one "proceedings" domain with distinct House and Senate writer principals, or two domains handing off at `CHARGED`? (C5) | Writer isolation and the backup boundary |
| Q4 | Grand-jury compulsory process (CON-037 says "if implemented"): does it get its own domain? | It needs its own evidence store separate from the chamber archives it draws on |
| Q5 | If the Scrutinizer (Oct 3 concept doc) is adopted, is it limited to public-ledger reads plus formal notices? | It must not become a universal reader; the safe default is public read plus its own notice stream |
| Q6 | What exactly is "same-instant" at election close? (IR-07) | The close-ordering rule in §5.3 |
| Q7 | Where does K live, and who may consume it for CRA recovery? | Census reservation semantics |
| Q8 | The inherited forty-founder baseline is retained, with qualified original numeric-approval provenance. Later September 30 recovery records clarify that status; public default decision entries CON-007/082 still require reconciliation. | Use the [population and voting guide](../architecture/POPULATION_AND_VOTING.md) for the source qualification; this proposal does not reopen or independently adopt the count |

---

## 7. Implementation dependencies and verification limits

These relationships make the proposal reviewable without authorizing execution:

- A shared kernel needs demonstrated append-only enforcement, collision guards,
  command idempotency, failure evidence after rollback, delivery recovery and
  external anchoring. A hash chain inside the same writable store is not external
  proof of integrity.
- A capacity-clearance replacement must preserve the cap, reserve and admission
  invariants before an existing registry guard can change. Test ordinary and covert
  creation, concurrent reservations, replay, expiry before admission, and interruption
  after admission without exposing sealed counts.
- Durable eligibility consumption and versioned attestations must precede any claim
  that ballots bind a current eligibility decision. Receipt certification then needs
  frozen-roll, close-order and post-ballot-disqualification checks.
- Panel exclusions, chamber ballots and the C4 chain need domain-specific disclosure
  tests, including whether public reason classes, hashes and timing reveal a protected
  investigation. Their procedural details must match the applicable accepted revision.
- Publication depends on an approved package and explicit release authority. Test
  both failed verification and the retained correction/serving record; source custody
  is not transferred merely because publication was requested.

No SQL execution, schema migration, code change or current-defect certification is
part of this document. The twelve historical comparisons remain reconciliation
inputs until their exact inspected versions and present implementation are checked.
