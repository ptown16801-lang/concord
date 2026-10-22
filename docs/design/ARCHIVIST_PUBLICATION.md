# Archivist records and publication

Status: proposed engineering contract, revision R20261010.2, with recorded design choices. The initial implementation is limited to standalone publication tests using synthetic records. Production writer, trust, collector and institutional authority bindings remain unresolved. The document records no implemented publication service.

## Design choices and boundaries

The first implementation is a disposable, deterministic synthetic publication component. It must not register an action in the existing governance runtime, introduce a second authoritative writer or claim integrated security acceptance.

Scheduled instructions remain unadmitted until their due point. Current identity, release permissions and compatible rules are checked at that point; lawful admission then fixes the exact scope. Later revocation or expiry prevents new admission while unsafe admitted effects pause.

The October 10, 2026 design record accepts temporary emergency suppression, followed by independent review, recorded reasons, and an appeal route to restore access. Protected evidence retention and append-only correction/serving-action history are mandatory. Exact institutional actors, emergency eligibility criteria, maximum temporary duration, review deadline, appeal body and restoration authority still require binding to accepted governance or an explicit owner decision. The Archivist cannot assign itself those powers. The accepted process does not authorize implementation or activation of suppression.

The current contract builds on [security domains](../SECURITY_DOMAIN_CONTRACT.md) and the [decision record](../../DECISIONS.md), particularly CON-040–046. Its local writer/audit reference is [the runtime at 55c91208](https://github.com/ptown16801-lang/concord/blob/55c91208a451099609af6b7820a2381c99f6f6dd/src/governance/sandbox/runtime.js); that reference does not implement a public append-only ledger.

## R2. Standalone boundary, ownership and protected inputs

The standalone component models publication behavior behind an explicit test-only writer interface. Its fixture namespace, data directories, signing roots and outputs must be visibly synthetic and disposable. Nothing is registered as a production service. No real credentials, institutional records, network service, scheduler infrastructure, JON-23 search service, Finger store or Research Library data are used. A stub index consumer suffices.

| Concern | Owner and standalone representation |
| -- | -- |
| Authentication, policy, admission and immutable authority snapshot | JON-17/JON-130 and JON-132 own these contracts. A trusted test boundary supplies a synthetic verified assertion and admitted snapshot using their relevant shapes. It is not an alternative authority service. The publication component cannot mint or expand them. |
| Public append and publication semantics | JON-18 owns behavior. One test-only writer owns one disposable ledger namespace. It has no production writer identity or credentials. |
| Pending admission, reservations and security pause | Security owner remains authoritative. Standalone fixtures represent these states; publication state mirrors referenced security facts and cannot independently turn a refusal into ADMITTED or clear a security pause. |
| Secret failure and disclosure ledgers | Their own JON-17 domain writers, with JON-18 defining record semantics. Separate test adapters/stores represent them. They are not the public writer, public database, audit collector, or original investigatory archive. Exact production identities are dependencies. |
| Public index and response delivery | Read-only projections and delivery adapters; neither can append, grant access or change a committed outcome. |

**Input custody is explicit.** Redaction and approval occur in the source/disclosure domain. For an ordinary public record, Archivist receives authorized exact public bytes and source authentication evidence. For a protected-derived record, it receives only the exact approved redacted package plus the minimum protected release attestation/reference needed to verify that package, institution, source version, audience and manifest. The protected original, investigator working material, and redaction rationale remain with their source owner. Archivist does not fetch original archives to recompute a protected-original digest; the trusted disclosure attestation binds the approved package to the source version. If that attestation cannot be verified, no publication is admitted.

`RECEIVED` in this contract means retention of the authorized inbound package, never a grant to retain whatever bytes an untrusted caller sends. Unexpected protected-original fields or unsupported critical fields cause bounded rejection; do not copy their values into diagnostics. Fixture case 6 therefore means **an upstream synthetic disclosure authority emits an authorized redacted package; the Archivist publishes only that package**. A canary in the upstream original must be absent from all Archivist stores, logs, receipts and public projections. Protected release references may be retained only in the authorized private verification compartment and never exposed through public aliases by default.

The original institutional independence, gateway/mediator/domain-authorization path, separate archives, sealed census, non-adjudication, correction history, recovery rules and read-side privacy requirements all remain. A valid signature establishes only its stated binding; it does not establish substantive legality, truth or a release grant.

## R3. Identities, signatures, deduplication and receipt access

### Immutable objects and signed bindings

Keep three objects separate:

1. **Source/disclosure evidence:** exact authorized package bytes, byte length, byte digest, immutable source identity/version, and the source or disclosure authority's signature/attestation. The original private source digest is never a public digest. Its verification belongs to the source/disclosure boundary when the original is withheld.
2. **Institutional publication instruction:** schema version, verified institution, operation ID, target ledger/domain, purpose, source record/version and package digest, requested publication class, schedule reference/due rule if any, release authority reference, public-field manifest digest, correction/supersession target IDs and versions, and any explicit republication authorization. The institutional signature covers these semantic fields as one unambiguous, versioned encoding. A separate authorized disclosure signature binds the exact package/audience/manifest when required. Unknown critical fields fail closed.
3. **Admission envelope:** the instruction digest and exact public-projection bytes/digest plus actual applicable rule versions, authority snapshot, domain/action/audience/purpose, expected ledger/target versions, one-use capability and compatibility evidence, bound by the existing security authorization contract. These are fixed at admission. A mediator cannot substitute any source, instruction, projection, purpose, target or expected version after signing/authorization.

Institutional signing and actor/workload request signing are distinct claims and may have different keys. Both must verify under their declared JON-17/JON-15 trust/identity bindings; a test actor signature is not silently promoted to institutional release authority. Synthetic rule records use a declared fixture trust profile representing that same owner contract, not an Archivist-created root. Production key algorithms, custody, historical validation and issuer mappings remain with those owners.

Public content is opaque bytes. Only envelope metadata conforming to `concord.json/v1` is canonicalized under that profile. Package digests cover exact bytes, not reparsed/reformatted JSON, normalized Unicode or line endings. A payload containing decimals or arbitrary Unicode can be carried byte-exactly; it is not passed through the integer-only metadata canonicalizer. Future implementation must choose a byte representation supported by the unchanged envelope rather than change the profile implicitly.

### Identifier scopes and replay rules

| Identifier | Rule |
| -- | -- |
| Submission/attempt ID | Identifies an inbound delivery attempt for protected attribution; it is not the publication deduplication key and cannot create a second effect. Transport challenge/nonce is separate from stable operation identity. |
| Operation/idempotency key | One canonical key `(target domain, verified institution, operation ID)`. Any externally named idempotency key must equal/bind to that key, not select a second namespace. Compare the immutable semantic instruction/admitted-envelope digest, excluding changing transport-attempt metadata. |
| Publication identity | Bind `(verified institution, source record ID, source version, target public ledger, publication purpose/class, authorized release identity/version)`. Reusing it through a different operation must not silently append again. An exact already-authorized publication returns an existing result only after receipt authorization; inconsistent bytes/targets conflict. |
| Additional lawful publication | Must name a distinct, explicitly authorized release/correction/supersession identity and pass the rule register. A new operation ID alone is not republication permission. The ordinary standalone fixture supplies no republication grant; production rules for additional releases remain source-authority mappings. |
| Public entry ID and ledger position | Opaque public entry ID and public-only committed position; neither exposes private operation IDs, protected source keys or audit sequence. Entries do not have mutable revisions. Source versions, publication positions and projection versions are distinct. |

Same key and same bound semantics: resolve the existing pending/committed/uncertain outcome and do not re-admit or append. Same key with changed semantics: protected conflict, no mutation. Cross-institution collisions occupy different namespaces and reveal no other institution's existence. Concurrent exact retries serialize against durable uniqueness constraints and produce one committed entry at most.

**A known ID or shared institution is not receipt authorization.** Every receipt lookup/replay response passes current gateway/domain read authorization for the authenticated principal/workload, purpose, audience, fields and operation. An already-admitted action can complete under CON-045 even if a caller later loses permission to read its outcome. Unauthorized/not-found/conflicting cross-scope queries have the same permitted external response class, with no protected existence detail; authorized operators get scoped diagnostics. Do not reveal the prior caller's receipt merely because the new caller belongs to the same institution.

## R4. Scheduled admission and state ownership

A routine instruction enters SCHEDULED **unadmitted**. Its signed schedule identity/due semantics are retained; current release authority/rule/identity and schedule compatibility are evaluated when it becomes due. If a later accepted schedule version changes the applicable due rule, resolve it under the schedule owner's declared version/compatibility policy; absent a valid mapping, await authority rather than inventing a due time. The standalone fixture specifies both versions and expected outcome explicitly. At release, bind the actual rule/version and expected versions into a new admission snapshot for that instruction. No source signature is forged to make its requested semantics match a changed rule.

Revocation before due/admission prevents admission. Missed runs retain original source, receipt and due times, then use current checks without duplicate append or backdating. Immediate records bypass routine batching but never security checks. A source's legal classification is supplied by authority; the component mechanically enforces the supplied kind/rule mapping. A source's substantive mislabeling is an authority issue, not something Archivist resolves by adjudication.

| State/axis | Meaning and owner |
| -- | -- |
| RECEIVED / VALIDATING / REFUSED / AWAITING_AUTHORITY / SCHEDULED | JON-18 processing facts before security admission. Refusal is not cancellation of admitted work. Retained data obeys R2. |
| ADMITTED / PAUSED | Projection of the security owner's durable immutable admission, reservation and waiting reason. Resume cannot replace the admitted request or reacquire authority as a disguised new operation. |
| COMMITTED | The test writer's durable atomic entry/outcome transaction succeeded. This fact survives response loss and collector-delivery failure. |
| IN_DOUBT | Store outcome cannot be verified; preserve evidence, freeze affected operations and reconcile by recorded identity/receipts. No blind replay or fabricated success. |
| Audit delivery | Separate `pending / confirmed / conflict-or-unavailable` status, derived from matching retained evidence and required collector receipts; not a replacement publication outcome. |
| Response delivery | Separate `not-sent / sent / unknown` fact; losing a response cannot turn COMMITTED into failed publication. |
| INDEX_PENDING / INDEXED | Derived consumer freshness only. Index loss does not undo or re-authorize an append. |

Stale expected versions after admission pause the immutable operation; no auto-merge, cancel, renumbering of expected versions, or scope rewrite. The security/recovery owner must resolve an actual technical conflict within CON-045, or escalate it explicitly if no compliant resolution exists. This design does not invent a cancellation deadline.

## R5. Enforceable standalone append store and exact audit ordering

### Store and trust boundary

Choose one disposable SQLite test-domain store for the test public entries and its private operation/outcome/reservation/audit bookkeeping. Public reads expose only the approved entry projection. This does not combine investigatory originals, failure/disclosure ledgers, Finger, or other domains into a shared database. Separate synthetic collector/failure/disclosure adapters keep those contracts distinct.

Schema-level guards deny UPDATE/DELETE of committed public entries and immutable request/outcome/audit evidence. Use durable unique keys for R3 operation/publication identity, entry ID and public position; guard INSERT OR REPLACE/UPSERT collision paths, including hidden `rowid`, `_rowid_` and `oid` aliases where rowid tables are used. Prefer explicit `WITHOUT ROWID` immutable tables where appropriate, and still test all accessible replacement paths. Existing schema guards in the candidate are a reference, not proof that a new table is guarded.

The initialized test writer connection must reject unauthorized DDL, trigger removal, writable-schema pragmas, attachment/extension loading and arbitrary SQL access; outsiders receive only narrow append/read fixture interfaces, never the connection or database path as authority. The bootstrap/migration fixture is separate and unavailable during operation. Store constraints, restricted writer operations and the no-raw-handle boundary must all be tested. These assertions cover supported test identities and SQL operations, **not** a hostile host administrator replacing a file or bypassing the process. Linux production isolation and recovery remain separate JON-17/JON-134 acceptance.

Within a serialized write transaction, allocate the next public position only for a successful public append. A rollback consumes no public position. Private failures, reservations, schedules, audit intents and protected events use independent internal sequencing. Public entry bytes and identity remain unchanged after later corrections. Corrections append new entries linking exact prior IDs/source versions; they never use UPDATE to rewrite the entry. Only private operational state allowed by the security contract may transition, with immutable attributable evidence.

### Local synthetic protocol (derived from the inspected JON-132 candidate)

This is an explicit design of the **standalone test model**, not modification or certification of JON-132. It preserves the candidate's local same-trusted-process failure model and does not claim a remote or cross-database atomic commit.

1. Before effects, the trusted fixture durably records the immutable admission, one-use admission consumption, reservation and approval audit evidence. Public ledger state is unchanged. This is the security owner's modeled transaction, not publication self-authorization.
2. Reconcile all required retained audit evidence to the separate local collector idempotently, checking exact receipt payloads even if a local delivery marker exists. Missing/conflicting collector history causes pause or existing controlled recovery; do not invent missing source history. Collector replacement is not satisfied by a stale local “delivered” marker.
3. Persist a collector execution-intent receipt bound to the operation and request digest. It says **intent**, never success.
4. Acquire the collector's real local write lock/availability guard. Within that guard begin the test-domain write transaction; re-read operation, reservation, expected ledger/target versions and bound projection. If already committed, select its outcome and skip mutation. Compute the exact prospective entry/result/commit-audit receipt, including fixed IDs and timestamp chosen within this attempt, and check collector compatibility for that exact receipt before any effect. Conflict rolls back the domain transaction with admission/reservation retained. No pre-commit success receipt is inserted.
5. Atomically commit **public entry + public-only position + immutable operation outcome + durable domain commit-audit/outbox evidence + permitted one-use execution transition/reservation release** in the same test-domain transaction. A uniqueness/version/constraint failure rolls the entire group back. This is the only publication effect point. An outbox alone is not an availability check: steps 2–4 remain mandatory.
6. Release the collector guard, then deliver the exact committed audit receipt idempotently. If post-commit delivery fails, retain COMMITTED with audit delivery pending/conflicting; never perform the append again. Reconcile the already-recorded outcome when the collector recovers. Return only a currently authorized receipt and truthful delivery status.

Public visibility in this bounded model begins from the durable domain commit, whose prerequisites include the collector intent and locked availability/compatibility check. It does not falsely claim that post-commit collector receipt delivery occurred atomically. Holding a live local collector transaction is meaningful only under the declared same-process collector model: there is no independent remote outage between a network “ready” response and the domain effect. Any production or different-process collector requires a separately reviewed failure/readiness protocol compatible with CON-046. No timeout, queue or preflight ping substitutes for it.

| Crash/fault window | Durable facts and required recovery |
| -- | -- |
| Before admission commits | No lawful admission or public effect; a later attempt must pass current checks. |
| After admission, before collector history/intent | Pending immutable work and reservation remain; collector unavailable/conflicting means no effect. |
| After intent, before collector lock or domain commit | Intent is not success. On restart reconcile history, recheck guard/versions and execute at most once. An intent without a committed outcome remains attributable. |
| During domain transaction, including after entry insertion but before commit | Entry, outcome, audit row and reservation changes roll back together; no public position is consumed. |
| After domain commit, before collector guard release/outcome delivery | COMMITTED remains authoritative. A collector failure cannot cause another append or falsely erase the entry. Replay only exact retained receipt evidence. |
| After audit confirmation, before caller receives response | Current receipt authorization then returns existing committed outcome; response-delivery uncertainty is separate. |
| Store integrity/outcome cannot be read reliably | IN_DOUBT/frozen; retain evidence and invoke existing controlled recovery. Do not guess from an intent, public cache or response timeout. |

For pre-admission refusals, the dedicated protected failure adapter records a bounded refusal event through its domain writer. If that writer/collector is unavailable, no publication is admitted and no durable failure-log success is claimed. Return the permitted generic unavailable/refusal class; an authorized operator may see `failure-recording-unavailable`. Retain only bounded sanitized evidence through the existing protected recovery contract when that contract is available. If no durable path exists, explicitly retain the evidence gap/unknown state; do not promise preservation the failed system could not provide, buffer protected payload into general logs, or introduce an emergency audit store. In a future implementation, no positive “recorded” acknowledgment precedes its writer receipt.

## R6. Privacy, correction and acceptance evidence

All original 16 scenarios (O1–O16), 12 addendum scenarios (A1–A12), and nine first-slice scenarios (S1–S9) remain requirements, indexed by their preserved order. They are **unexecuted**. O5 is clarified as enforcement of a supplied immediate-kind/rule mapping, not institutional adjudication. S6 uses the upstream approved-package boundary in R2. S9 uses a stub index. Scheduling, real disclosures, migration/recovery and protected-domain service behavior can have synthetic fixture checks, but their production/integration requirements are not satisfied by those checks.

| Preserved cases | Current contract and observable evidence to require |
| -- | -- |
| O1; S1 | R1/R2/R5: one test writer, one authorized append; outsiders/raw branch paths cannot invoke it. No production integration claim. |
| O2–O4; A2–A3; S2 | R2/R3: institutional match, exact bytes/version, independent credentials, declared historical trust and compatibility; altered or wrong-scope evidence causes no admission. |
| O5/O7; A4–A5 | R4: supplied immediate mapping bypasses routine batching; due-time current admission; outages preserve times and no duplicate/backdating. |
| O6/O10/O16; A1/A10; S6 | R2/R3/R6: no protected canary, existence, identifiers, selector, queue details or authority from a backlink. Failure-ledger access remains separately scoped. |
| O8; A7/A12; S3/S8 | R3/R5: exact replay returns authorized established outcome, changed semantics conflict, response loss never re-appends. |
| O9; A9; S5 | R3/R5: new linked correction, immutable prior bytes, typed edges; no inferred winner among conflicting substantive instructions. |
| O11/O12; A11 | R2/R5: separate exact package/audience disclosure evidence; partial/unknown delivery stays partial/unknown. Real disclosure execution excluded. |
| O13; S4 | R4/R5: revocation blocks future admission only; admitted version/integrity conflict pauses without scope rewrite. |
| O14; A6; S7 | R5: unavailable/conflicting collector pauses before effects; restart reconciles existing evidence and never duplicates. |
| O15 | R2/R5/R8: source recovery remains quarantine/approved promotion under its owner; unknown provenance remains unknown, never inferred from restored bytes. |
| A8; S9 | R4/R6: durable ledger outcome survives index failure; stub reports explicit freshness/lag. |

Additional design-derived tests, **also unexecuted**, are required for the affected slice/adapter:

* **N1 — SQL immutability:** UPDATE, DELETE, REPLACE, UPSERT and all applicable rowid-alias collisions under both recursive-trigger settings; deny schema/pragma bypass through the operational connection. Verify unchanged entry/request/outcome/audit bytes, not merely a returned error.
* **N2 — audit matrix:** each R5 boundary with process crash, collector unavailability/conflict, late domain rollback, collector replacement and matching receipt replay. Verify atomic domain group, retained admission/reservation, no premature success and at most one effect.
* **N3 — identity/replay:** concurrent duplicate attempts; same institution/key changed bytes; cross-institution key collision; different same-institution principal without receipt authority; authority revoked only for reading; alternate operation for identical publication; explicit authorized correction distinct from replay.
* **N4 — signing:** tamper individually with class, schedule, correction target, release identity, audience, field-manifest digest, source version, package bytes, domain, purpose and expected versions. Require the appropriate institutional/disclosure/admission binding failure before effects.
* **N5 — admission time:** revoke/change rule before due versus after lawful admission; overdue recovery; immediate record behind stalled routine queue; incompatible/unknown schedule-version mapping. Compare declared current-check behavior with preserved admitted authority.
* **N6 — public noninterference:** interleave protected/refused/paused operations between public appends using the same injected public times. Public positions, IDs generated independently of private counters, counts, autocomplete, facets, graph edges, errors, exports and cache keys must reveal no private operation count or identity. Ordinary time variation is not a proof of timing-channel absence; do not claim a production timing guarantee from this fixture.
* **N7 — custody and exact bytes:** upstream original canary never enters Archivist custody; approved package round-trips byte-exactly including decimal JSON text, Unicode and line endings; protected evidence/receipt fields do not escape their read authority.
* **N8 — ownership and state:** standalone test module has no action registration/runtime mutation or production writer identity; publication cannot self-admit/unpause; commit, audit delivery, response and index status remain separate through faults.
* **N9 — future remedy gate:** deny missing/wrong institution or scope, substituted entry/version, stale authorization and incomplete cache/export scope. Preserve protected evidence/correction history. This tests a proposed policy adapter only after the missing authority contract is defined; it is not authorization to suppress real content now.

Acceptance evidence must identify fixture/version, exact source revision, observed result, command and fault location; a proposed scenario, successful unrelated sandbox test or producer assertion is not execution evidence. Qualifying review remains separate under CON-070/JON-135.

## R7. Rule register, public views and state protection

The publication-rule register contains mechanical mappings supplied by proper institutions and verified through JON-17's trust/compatibility framework. It neither mints a root key nor grants the Archivist constitutional authority. Record each rule/version, issuing authority/source decision, permitted kind/class, exact package/audience/field limits, correction/republication permissions, applicable schedule and effective/compatibility interval. Reference existing security-policy evidence rather than duplicate its policy engine. A publication-rule version and a security-policy generation are separate identifiers bound together by an explicit compatibility assertion, not assumed identical merely by their numbers.

Public reads use only committed authorized public entries and separately authorized correction/provenance fields. Failure/disclosure stores and private audit/operation state never drive public counters. Unauthorized or unavailable source dereference grants no further access. Consumers preserve typed edges and unresolved competing instructions; an index rebuild cannot rewrite history or manufacture legal validity. Cache retention stays within authorized handling class. Public timestamps are actual attributable publication facts, not source timestamps rewritten to imply punctuality.

No new tamper-evidence mechanism is required for this standalone behavior slice. If a later audit claim uses a hash chain, its threat model must include a protected independent checkpoint/anchor and recovery authority. A rewritable self-contained chain or copied hash is not proof against privileged rewriting. The existing accepted recovery/exposure-history requirements remain unchanged.

## R8. Production dependencies and unresolved authority bindings

The recorded choices resolve slice mode and scheduled admission timing, and the October 10 process decision establishes temporary emergency suppression followed by independent review, recorded reasons and an appeal route to restore access. It leaves the institutional actors, emergency eligibility criteria, maximum temporary duration, review deadline, appeal body and restoration authority unbound. Production also requires institutional release mappings, trust roots/key custody, writer/service identities, stores/audit endpoints, a reviewed remote-collector protocol, routine cadence/latency targets and class-specific public-field manifests. These remain explicit dependencies; the accepted process is not reopened by identifying them.

**Erroneous-publication remedy:** model a separately authorized serving decision against exact public entry IDs/versions and exact protected fields/package, preserving the original in the properly protected evidence custody and appending correction/serving-action history. Do not delete or silently rewrite the historical entry. Record who authorized, jurisdiction, scope, effective point, reason classification, applicable projections/caches/exports, evidence custodian and reversal/review route. Public notice must itself be authorized and must not repeat the protected content. An institution's authorship or valid signature alone does not give blanket suppression power over another authority's records.

The serving action is not retroactive cancellation of an admitted publication operation. It governs subsequent reads/distribution under a separately authorized scope; existing CON-045 completion and CON-046 pauses remain. Cache invalidation and consumer refusal after an authorized serving change require explicit freshness/version rules; stale or unverified projections cannot keep serving the affected content by default. Already delivered external copies cannot be presumed recalled; retain accurate exposure and distribution uncertainty. No production suppression endpoint or permission exists merely because this design names one.

**Unresolved bindings before production remedy implementation:** Under the accepted temporary-emergency-suppression, independent-review, recorded-reasons and appeal process, identify the authorized institutional actors, emergency eligibility criteria, maximum temporary duration, review deadline, appeal body and restoration authority. Bind their jurisdiction and exact entry/field, audience, cross-institution and projection/cache/export scope to accepted governance or an explicit owner decision; identify the controlling rule/order and evidence custodian. Protected evidence retention and append-only correction/serving-action history remain mandatory. The process itself is already selected, and the Archivist must not invent the missing powers or limits. These bindings do not block delivery or review of the standalone synthetic design.

## Original acceptance scenarios O1–O16

These are future design/implementation acceptance criteria, not results of tests run in this task.

| Check | Required observable result | Source |
| --- | --- | --- |
| Branch or ordinary agent writes public store directly | Rejected; only dedicated Archivist writer can append. | CON-040/042; JON-17 |
| Authenticated House identity submits a Senate-signed record | No publication; protected attributable failure, with no public source leakage. | JON-18 institutional match |
| Signature valid but bytes or source version changed | Binding fails before publication. | JON-17 exact digest contract |
| Shared branch credential or incompatible policy generation | Admission fails; no permissive fallback. | CON-040/042 |
| Publishable decision or misconduct suspicion queued as routine | Immediate rule preserved; actual delay remains attributable. | JON-18 |
| Secret-investigator draft appears in public search/counts | No disclosure, including identifiers, digests and existence-sensitive errors. | CON-042/043; JON-17 |
| Routine schedule becomes due | Exact instructed record receives applicable security/publication checks; no automatic substantive validity claim. | JON-18; CON-045 |
| Same operation retries after a lost receipt | One append at most; existing commit returned or uncertainty retained. | JON-17 transaction contract |
| Correction or supersession submitted | New attributable entry and typed exact-version link; prior content unchanged; no Archivist adjudication. | CON-042 |
| Failure record requested by an ordinary consumer | Denied without protected existence leakage; authorized investigator access remains scoped. | CON-043 |
| Redacted package disclosed to grand jury | Exact recipient/package/authority/exposure recorded separately; source archive stays protected. | CON-043 |
| Partial or unknown disclosure delivery | Receipt says partial/unknown; no invented successful delivery. | JON-18 provenance; proposed receipt shape |
| Revocation or expiry occurs after admission | Preserve approved immutable work for completion; no new scope; unsafe conditions pause. | CON-045 |
| Required audit collector unavailable | No admitted effects proceed on local queue alone; durable pause/resume without duplicates. | CON-046 |
| Source recovered or migrated | Same-domain quarantine and approved promotion; recovered bytes not silently current authority. | CON-041; JON-17 |
| Atlas export or graph expands a protected backlink | Only authorized projection returned; consumer receives no writer/access authority. | JON-17; proposed consumer shape |

## Additional acceptance scenarios A1–A12

These extend, rather than replace or rerun, the existing sixteen-scenario matrix. They are unexecuted requirements.

* Missing classification rule: no publication, scoped authority gap, no secret-existence leak.
* Valid signature but wrong institutional release scope: no admission.
* Rotation across source issuance and submission: use the declared trust profile; unknown history remains unresolved.
* Due routine record after outage: preserve original times and instruction; no duplicate or fabricated punctuality.
* Immediate record plus stalled routine queue: routine scheduling cannot demote it; all security checks still apply.
* Collector conflict before effects: retain immutable pending work and reservation; no false committed receipt.
* Crash after ledger commit before caller response: reconcile existing outcome without a second entry.
* Ledger/index divergence: authoritative commit remains identifiable; projection reports lag without rewriting history.
* Conflicting correction branches: preserve both attributable records; no inferred substantive winner.
* Redacted publication correction: no protected content exposed by its reason, identifiers or backlinks.
* Lost or partial disclosure delivery: preserve uncertainty and exact audience/package evidence.
* Changed bytes under an existing operation ID: reject substitution and retain protected conflict evidence.

## First-slice acceptance scenarios S1–S9

Required initial cases:

1. One authorized ordinary-public synthetic decision appends exactly once.
2. A valid synthetic signature with wrong institutional/classification authority is refused.
3. Same operation and bytes returns the original result; changed bytes conflict.
4. Stale expected ledger version cannot silently overwrite or auto-merge.
5. A correction adds a new linked entry and leaves prior bytes intact.
6. A protected source produces only the exact authorized redacted projection, with no leaked identifiers or diagnostic fields.
7. Audit outage/conflict retains admitted scope without effects; replay after recovery produces no duplicate.
8. Crash after commit and before response recovers the committed outcome.
9. Public index failure leaves the ledger authoritative and explicitly marks index lag.
