# Eligibility boundary repair

Status: repair plan 0.1 with recorded design review. The proposed durable event/result/outbox boundary and trusted registry, authority and close adapters are not an implemented or accepted repair. Preserve the failing implementation’s exact version and test limitations until a separately verified code change supersedes them.

## 1. Objective, source and boundaries

Repair the authenticated, durable eligibility event boundary around the existing reducer, preserving its adopted allegation/proceeding/C4/felony/terminal distinctions and prior recovery provenance.

**Historical source-check observation — September 30, 2026:** the plan recorded PR ptown16801-lang/concord#7 as open, draft and unmerged, with head **51a102259785a5b53dc6ec4bc4bbca54c4a8fc37** and base **40f647e5b8d23307f713fc3a3753a1d3a46611cb**. That inspection read the exact head source and tests from local Git objects and matched them to the then-live PR head, extending the earlier retained-export-only inspection. It did not run the tests. These are the September 30 plan’s recorded observations, not fresh PR/source verification performed for this documentation repair.

Historical repair-scope source: the JON-79 planning contract inspected September 30, 2026. Required remediation in that plan: FAIL 878f4d1f. JON-91's older conditional domain acceptance is not a durable-authentication PASS.

Allowed future repair subsystem: src/governance eligibility boundary, its isolated local persistence, domain authorization/registry binding interfaces, delivery contract and focused tests. Excluded: constitutional changes, policy adoption, identity issuance, real ballot acceptance/counting, JON-62 terminal-authorization design, Finger behavior/storage/identity, servers/UI, paid APIs, hosted execution, provider substitution, billing changes, merge/deploy. JON-141 retains integration ownership. JON-85's bounded Done acceptance is not reopened.

## 2. Observed baseline and reuse

The September 30 inspection recorded the following at exact PR7 head `51a102259785a5b53dc6ec4bc4bbca54c4a8fc37`:

* src/governance/eligibility.js:27–34 keeps events and states only in memory; 44–74 clones and commits a batch only in process.
* :45 checks expectedVersion before any retry lookup; no stable event keys or durable result lookup exists.
* :54–69 rejects descending effectiveAt timestamps; it does not distinguish authoritative legal phase/causal sequence from arrival.
* :106–123 accepts an acceptedBallotAt argument for a projection; that argument is not proof of an authoritative JON-80 receipt.
* :130–145 accepts C4 authority through a caller-supplied nonblank authorityId; other command families lack a verifier.
* IDENTITY_REGISTERED creates local reducer state without a JON-78 registration reference.
* test/eligibility.test.js contains nine reducer tests covering semantics, in-memory rollback/versioning and historical queries. They do not exercise process restart, real authentication or consumer ordering. They were read, not rerun.
* src/governance/index.js exports the reducer types.
* src/finger/sqlite-repository.js already uses built-in node:sqlite, parameterized statements and BEGIN IMMEDIATE/COMMIT/ROLLBACK patterns. Reuse that established dependency/pattern, not Finger's database, schema, data or authority.
* src/finger/identity.js authenticates a Finger cookie. It does not establish judicial/institutional competence and must not be repurposed as a governance authority verifier.
* No usable governance authority-verification or JON-78 adapter implementation exists in this exact PR tree. That absence is a concrete binding dependency, not permission for a permissive stub in production.

## 3. Smallest proposed file set

These are intended future paths; new files do not exist at PR7 head.

| Path | Bounded change |
| -- | -- |
| src/governance/eligibility.js | Preserve transition meanings; expose controlled deterministic replay/reduction to the boundary, validate all required IDs including proceeding IDs, preserve in-memory class only as explicitly non-authoritative domain/testing surface |
| src/governance/eligibility-boundary.js (new) | Single admitted write path: verified authority/registration, durable identity lookup, expected-version transaction, source-order validation, result and outbox creation |
| src/governance/eligibility-store.js (new) | Dedicated node:sqlite store, transactions, append-only events/results, restart reconstruction and delivery/checkpoint state; no Finger DB reuse |
| src/governance/eligibility-contract.js (new) | Versioned typed envelope/result/canonicalization, exact field validation and adapter interfaces; no legal policy inference |
| src/governance/migrations/001_eligibility.sql (new) | Event/result uniqueness, ordered sequence, outbox and consumer acknowledgements; immutable evidence protected separately from mutable delivery state |
| src/governance/index.js | Export the guarded boundary/contract; distinguish raw reducer from an authenticated authoritative entry point |
| test/eligibility.test.js | Retain existing domain semantics; add missing required-ID and replay-equivalence cases |
| test/eligibility-boundary.test.js (new) | Authentication, registry binding, idempotency/conflicts, versions, atomicity and adapter-contract cases |
| test/eligibility-restart.test.js (new) | Separate-process restart, crash-before/after-commit and retry/delivery recovery |
| test/eligibility-ordering.test.js (new) | Model consumer receipts/watermarks, intake cutoff, close/restoration race and accepted-ballot retention |
| package.json | Extend syntax check to new JS modules; retain Node >=22.5 and existing dependencies/lockfile |
| README.md, CHANGELOG.md | Entry-point/trust requirements, migration/rollback limits and exact test/repair receipt |

No production auth provider or domain key source is invented in these files. Production construction requires actual bound adapters described next. Interface fakes may be used only in marked tests and do not satisfy integrated acceptance.

## 4. Required trusted bindings

The boundary constructor receives trusted local composition-time dependencies, never functions/allow flags from a command payload:

* authorityVerifier: verifies authenticated source identity, issuer's actual institutional role, allowed event kind and scope, decision/ruleset references and authority at the legally relevant time. Supplies immutable verification evidence references, not just boolean allow.
* registrationReader: verifies JON-78 authoritative identity/lifecycle/registration-event version, including every affected C4 identity. JON-79 neither issues a new identity nor trusts a caller's registry copy.
* orderedContext: supplies authoritative clock/phase version, legal source sequence/causal predecessors and transaction/close context under the agreed domain contract.
* receiptAuthorizer: checks current access to protected prior results on retries/readback.
* delivery consumer bindings: authenticated domain-specific JON-80/81 recipients and stable receipt/acknowledgement contracts.

Fail construction or admission when a mandatory trusted binding is absent, invalid, out of scope or version-incompatible. No default allow, auto-generated legal credential, header-trust shortcut or fallback to Finger identity.

Exact production binding implementations and accepted pins are **UNKNOWN at the inspected PR7 head**. The integrator must supply attributable existing implementations or separately bounded work before production acceptance. This plan does not label test-adapter success as clearing that dependency.

## 5. Proposed input, canonical identity and result

admitEvent input: sourceSystem/sourceEventId, schemaVersion/canonicalizationVersion, decisionId/version, legalEventKind, subject or exact affected set, JON-78 registration refs, case/proceeding/restriction/conviction references as required by that event, effectBasisRef, rulesetVersion, authorityEvidenceRef, legalEffective {turn,phase,clockVersion}, sourceDecisionSequence, causalSourceIds, semantic payload and expectedEligibilityVersion. Transport attemptId, receivedAt and transport credentials are separately retained.

Canonicalize validated typed semantic content deterministically: fixed schema field names, recursively sorted object keys, ordered arrays preserved, documented set-valued affected identities sorted after duplicate rejection, exact validated strings, integer-only sequence/turn/version fields. Reject unsupported/ambiguous values rather than coerce. Include semantic source/authority/ruleset/identity/timing references in the digest. Exclude attempt time, refreshed transport credentials and the optimistic concurrency precondition from legal-event identity; a retry does not become a new legal event merely because delivery metadata changes. Version the canonicalization rule and retain original protected input/evidence provenance. A digest is an integrity check, not authorization.

Durable unique key is verified source namespace plus sourceEventId; a secondary legal derivation identity prevents a new wrapper ID from applying the same source decision/domain/subject/scope twice. Mapping-version changes alone do not authorize a new consequence. Different semantic content under one key is a recorded conflict requiring the adopted discrepancy path.

Return source key/digest, disposition COMMITTED/ALREADY_COMMITTED/REJECTED/PENDING_RECONCILIATION, durableReceiptId, committedEligibilityVersion (only where applicable), appliedEventIds, projectionVersion, affected scoped basis, downstream obligation references and access-controlled diagnostics. No-effect is explicit and never a grant of franchise.

Initial durable API admits one source event/envelope per transaction, including an atomic C4 affected set. Existing raw reducer applyBatch remains a domain-testing primitive; it is not an unguarded production write route. A later multi-envelope admission API needs its own stable batch manifest/retry contract and is outside this smallest repair.

## 6. Transaction and recovery algorithm

1. Validate request structure and authenticate sender/current submission or receipt-read rights without disclosing protected prior results.
2. Inside a serialized local store transaction, look up the verified source event key. Same committed canonical content returns its existing result; do not reapply or require the old expectedVersion to equal the new current version. Conflicting content records a discrepancy, not a duplicate mutation.
3. For a genuinely new event, verify scoped legal authority, JON-78 identity references, immutable proof versions, expectedEligibilityVersion and causal/legal ordering. References validated outside the transaction require immutable version binding/revalidation at commit; mutable proof cannot be assumed stable through a race.
4. Reduce against reconstructed current domain state. Validate required identifiers for each kind. Do not admit an already-applied legal derivation under a fresh key.
5. In the same local transaction append source/event/verification evidence references, resulting domain sequence/projection, durable result and downstream delivery obligations. The transaction either contains all of these or none. A valid no-effect source still receives its durable result; no phantom voting-right change.
6. After commit, deliver pending obligations with stable event identities. Delivery failure does not roll back the lawful judgment or repeat the eligibility mutation. Each consumer commits application/deduplication and an acknowledgement under its own authority.
7. Persist authenticated per-consumer acknowledgements separately from immutable legal events. Track each consumer independently; one acknowledgement cannot mark every recipient applied. Retain replay identity without an unreviewed eviction timeout.
8. On process startup, validate schema/canonical versions, unique identities, contiguous committed sequence and referenced evidence integrity; replay committed events deterministically. Corrupt/missing state blocks affected admission and opens recovery review; it does not reset the registry to empty.
9. A crash before commit leaves no committed effect/obligation; a crash after commit but before response returns ALREADY_COMMITTED on retry; a crash during delivery resumes the original obligation. Disk/transaction errors never produce a success receipt.

SQLite transaction isolation supplies the local atomicity boundary, not a distributed all-domain transaction. Exact store durability configuration and crash behavior must be documented and exercised in the implemented candidate; defaults alone are not proof of persistence.

## 7. Timing, ballot and legal-meaning contract

Inputs consume provisional JON-67 0.5 + reviewed 0.6, and JON-68 0.5 + reviewed 0.6. These ordinary designs are proposals awaiting artifact acceptance, not newly adopted constitutional rules.

Keep legal effective order distinct from network arrival and eligibility commit sequence. Unknown predecessors or phase-version mismatches are held/disputed; no backdated commit or guessed timestamp tie-break. The exact numeric phases are versioned source input, not hard-coded legal authority.

Mappings: allegation/ordinary office restriction does not imply franchise loss; restriction expiry or LAPSED_REVIEW does not close a formal proceeding; actual formal/C4 closure removes only the identified basis; ordinary impeachment conviction/reversal is not automatically felony/terminal mutation; remand is not automatically proceeding closure; no generic RESTORE or clear-felony event is introduced. Unsupported lawful effects remain explicit mapping questions.

JON-80 supplies actual verified accepted-ballot receipts; do not accept a caller-created acceptedBallotAt as proof. JON-81 close uses opening-roll/ballot/eligibility watermarks and a fixed authorized intake cutoff. An accepted valid ballot survives later disqualification. Restoration before cutoff can affect only an otherwise eligible opening-roll nonvoter; after cutoff it cannot admit a new ballot even if close computation is delayed. Missing required consumer application produces a pending integration result, never a falsely certified final tally. No direct edits to JON-80/81 in this repair.

## 8. Acceptance matrix against the unresolved FAIL

| Requirement | Required implemented evidence |
| -- | -- |
| Restart durability | Spawn process A, commit, exit; process B opens same dedicated DB and reconstructs identical events, state and receipt identities |
| Crash atomicity | Inject failure before commit, after event staging, after result/outbox staging, after commit before reply; prove all-or-none local writes and truthful response |
| Durable idempotency | Same event before/after restart and with stale expectedVersion returns original receipt/version; zero extra effect/outbox |
| Conflicting ID/new-ID repeat | Alter payload/affected set/subject under same key; repeat source decision under new key; preserve conflict evidence and no extra effect |
| Authority on every command | Reject fake/nonblank authorityId, expired/out-of-scope or wrong-role proof, forged source and missing verifier; include non-C4 mutation kinds |
| Registry binding | Reject unknown/mismatched/wrong-lifecycle JON-78 identity; C4 mixed affected set rolls back fully |
| Concurrent version/source order | Two writers racing same expectedVersion cannot both commit; missing predecessor/phase-version mismatch never guessed into validity |
| Consumer recovery | Offline consumer, lost ACK, restart mid-delivery, two consumers with one ACK: one legal effect, durable remaining obligation, no false applied status |
| Ballot/close boundary | Verify receipt authenticity, accepted-ballot retention, pre-cutoff restore, post-cutoff restore, pending close with intake sealed, exact version/watermark evidence |
| Restricted history/rollback | No same-identity resurrection, no generic clear-felony/restore, no mutation of accepted evidence; deliberate recovery preserves history |
| Compatibility | Existing nine semantic tests retained, canonical serialization/replay fixtures stable, full project checks pass at exact candidate SHA |

Test adapters establish contract/unit behavior only. Clearing the full FAIL additionally requires actual bound authority/registry and JON-80/81 integration evidence, not merely a new store and green mocks.

Candidate validation commands after future authorization: node --test test/eligibility.test.js test/eligibility-boundary.test.js test/eligibility-restart.test.js test/eligibility-ordering.test.js; npm run check; npm test. These commands are proposed, not run; new test files do not yet exist. Record exact Node version, command outputs, candidate SHA and changed files, then obtain non-authoring PASS/REJECT against every FAIL finding.

## 9. Rollback and migration limits

Do not destroy/replace the recovered PR or histories. Existing in-memory process history may be unavailable: do not invent or silently import it as authenticated. Any import requires an attributable source, explicit trust assessment, replay validation and retained originals. A deployed durable store cannot be downgraded to a blank in-memory writer as rollback. On incompatible schema or failed recovery, stop affected writes and preserve evidence; choose a verified compatible binary/store recovery under the integration authority. No system files are removed.
