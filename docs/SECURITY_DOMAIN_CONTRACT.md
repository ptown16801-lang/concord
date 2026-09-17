# Concord protected-domain security contract

**Status:** design contract; no runtime implementation is claimed  
**Owner:** JON-17  
**Contract revision:** 2026-09-17  
**Deployment boundary:** Linux only

This contract defines Concord's security gateways, domain-local authorization,
authoritative readers and writers, capability semantics, transaction ordering,
and controlled recovery. Microsoft Agent Governance Toolkit (AGT) is the primary
governance and security framework. AGT integration is an enforcement substrate,
not permission to weaken the stronger sealed-domain and SAS-style rules below.

JON-15 owns identity history and succession, JON-18 owns publication and records
semantics, and JON-59 owns sealed-census contents and visibility. This contract
defines how those owners reach a protected store; it does not redefine their
authority or copy their protected data into a shared service.

## 1. Non-negotiable invariants

1. Every protected security domain has an independently isolated gateway,
   authorization service, Read Service, Writer Service, authoritative store,
   backup set, keys, service identities, and audit stream. A shared control plane
   may distribute signed policy, but it is never a universal data-plane reader,
   writer, or authorization oracle.
2. House, Senate, and Judiciary investigatory archives are three distinct
   protected domains. They never share a convenience database, encryption root,
   writer identity, backup namespace, search index containing protected payloads,
   or administrator role.
3. An authenticated identity is not authorization. Scheduling, project creation,
   labels, archival presence, or ownership by a privileged actor does not confer
   protected authority. Protected authority requires the express, scoped grant
   defined by JON-38.
4. An agent never reaches authorization, a reader/writer, or a protected store
   directly. Every request enters through the target domain's gateway and an
   authorized mediator or custodian.
5. Only the domain Writer Service identity may mutate that domain's authoritative
   store. The authorization service decides; it does not write. The gateway and
   mediator route; they do not decide or write. The Read Service cannot write.
6. Authoritative state is changed only by an expected-version transactional
   commit. Checkpoints, replicas, caches, indexes, Workbench, backups, and AGT
   state are not alternate authorities.
7. Capabilities are audience-bound, domain-bound, purpose-bound, short-lived,
   non-delegable unless explicitly authorized, and one-use for writes and
   recovery actions. Bearer possession alone is insufficient: the caller must
   also prove the bound workload and service identity.
8. Missing, stale, corrupt, unverifiable, revoked, or incompatible security state
   fails closed. Failure never falls back to another domain, a shared account, an
   older policy generation, a cached allow decision, or direct store access.
9. Backups preserve the live domain's confidentiality and privilege boundary.
   Backup operators cannot use backup access as application read authority.
10. Temporary access expiry prevents future use but never erases attributable
    exposure history. Highest-risk material uses non-retentive or tightly limited
    sessions when feasible.

## 2. Domain registry and isolation boundary

Each domain has an immutable `domain_id` and a signed registry record containing:

- domain class and data classifications;
- gateway, authorization, mediator/custodian, Read Service, Writer Service,
  recovery-controller, audit-sink, and backup service identities;
- live and backup storage roots plus distinct encryption-key references;
- accepted AGT runtime versions, policy generation, schema generation, and
  compatibility-set digest;
- allowed ingress gateway set and cross-domain operation support;
- recovery authority rule and required quorum/roles; and
- registry version, issuer, effective time, supersession link, and signature.

The minimum named domains are:

| Domain | Protected content | Forbidden collapse |
| --- | --- | --- |
| House investigatory archive | House investigation membership, missions, working material, evidence, and authorized records | Senate/Judiciary archive, global search payload index, general legislative store |
| Senate investigatory archive | Senate investigation membership, missions, working material, evidence, and authorized records | House/Judiciary archive, global search payload index, general legislative store |
| Judiciary investigatory archive | Judiciary investigation membership, missions, working material, evidence, and authorized records | House/Senate archive, general court/public-record store |
| Sealed census/capacity | JON-59-owned R/T and protected creation, reservation, reconciliation, and capacity state | Public population view, scheduler queue, investigatory archives |
| Identity-private storage | JON-15-owned autobiographical memory and private workfiles partitioned again by identity | Institutional archive, another identity's namespace, shared agent workspace |
| Protected records/failure/disclosure | JON-18-owned nonpublic records and protected failure/disclosure interfaces | Public governance ledger and investigatory source archives |

Additional protected domains use the same registration and isolation rules. A
domain classification is not itself an authority grant.

### Linux enforcement profile

Production is Linux-only. Every protected service runs under a dedicated,
non-login UID/GID with no supplementary group that crosses domain boundaries.
Domain services use separate mount namespaces, private runtime directories,
read-only root filesystems where feasible, minimal capability bounding sets,
`no_new_privs`, seccomp, mandatory-access-control labels, and network rules that
permit only the declared adjacent service calls. Writer and recovery identities
are never interactive operator identities.

The authoritative store and live keys are mounted only into the domain's reader
or writer as required; the gateway, mediator, Workbench, and shared control plane
receive no store mount. Backup credentials and mounts exist in a separate backup
security context. Process co-location is allowed only when UID, namespace,
mandatory-access-control, key, and network isolation remain independently
enforced. If any required isolation cannot be established, the domain is sealed
and unavailable rather than downgraded.

## 3. Identity and access matrix

| Principal / service | May receive | May not do |
| --- | --- | --- |
| Agent workload | Gateway session and a response filtered for its current authority | Contact internal services/store, mint or delegate capabilities, select a writer, see protected routing metadata |
| Domain Gateway | Authenticate workload and route sealed requests to allowlisted mediators; enforce compatibility and coarse limits | Decide substantive access, inspect unnecessary payload fields, read/write the store |
| Mediator | Validate request shape and purpose, minimize fields, request authorization, invoke the named reader/writer | Broaden scope, reuse a write capability, bypass authorization, write directly |
| Custodian | Perform mediator duties plus explicitly granted custodial review/release steps | Treat custodianship as blanket domain access or cross-domain authority |
| Domain Authorization Service | Evaluate current grants, domain policy, purpose, resource selectors, operation state, and constraints; mint bounded capabilities | Read protected payloads except minimum policy attributes, mutate domain data, authorize another domain |
| Read Service | Redeem a read capability, perform a bounded query at the authorized snapshot/version, filter the result, return through the mediator/gateway | Write, expand selector/fields, expose existence via errors, return unfiltered store responses |
| Writer Service | Redeem a one-use write capability and commit the exact mutation at expected version | Decide policy, accept a changed payload/selector, perform blind overwrite, write another domain |
| Authoritative store | Enforce service identity, transaction, version, integrity, and append rules | Accept agent/gateway/mediator/operator credentials or serve as a cross-domain database |
| Recovery Controller | Coordinate an authorized, witnessed recovery plan and issue one-use recovery steps | Declare data authoritative, silently repair, grant ordinary application access |
| Backup Service | Create/verify domain-separated encrypted backups and execute an authorized restore into quarantine | Read through ordinary application APIs, restore over live state, combine domains |
| Audit Sink | Receive integrity-protected security events and domain-safe projections | Become a payload warehouse or authorization source |
| Workbench | Display authorized, freshness-labelled projections and initiate requests through gateways | Directly query stores, reveal secret membership/mission/queue metadata, mutate authority |
| Human/operator identity | Use a separately authorized administrative or recovery role via the gateway | Assume a service UID, access mounts/keys directly, convert infrastructure access into data authority |

Service identities are hardware- or host-attested workload identities bound to
the executable measurement, Linux UID, domain, role, and deployment. They are
rotated independently. An agent's governance identity, an operator login, an AGT
workload identity, and a service identity remain distinct and are all recorded
when applicable.

## 4. Protected request envelope and path

Every protected request has an immutable `operation_id` and includes:

- target `domain_id`, action, purpose, resource selector, requested fields, and
  response classification/retention class;
- authenticated subject identity, initiating workload identity, mediator or
  custodian identity, and service audiences;
- express authority/grant references with jurisdiction, scope, effective point,
  limits, and current grant version;
- AGT runtime and policy generation, domain registry version, schema generation,
  compatibility-set digest, and gateway-path attestations;
- request creation/expiry, nonce, retry/idempotency key, parent operation when
  applicable, and signature chain; and
- for mutation, exact mutation digest and expected object/aggregate/store
  version; for a snapshot read, the requested or minimum version.

Unknown fields that affect authorization, an unrecognized critical extension,
or a mutable/ambiguous selector causes rejection.

### Read contract

`Agent -> target Gateway -> authorized mediator/custodian -> target Domain
Authorization -> target Read Service -> authoritative store -> filtered return`

Authorization returns either a denial or a read capability for an exact selector,
field set, purpose, audience, snapshot/version constraint, and response handling
class. The Read Service revalidates the capability binding and current policy
generation, reads no broader result, applies mandatory filtering, and sends the
sealed response back along the reverse path. Existence-sensitive denial and
not-found responses are indistinguishable unless policy explicitly permits the
distinction.

### Write contract

`Agent -> target Gateway -> authorized mediator -> target Domain Authorization
-> target Writer Service -> authoritative store`

Authorization binds a one-use capability to the exact mutation digest,
expected version, idempotency key, writer audience, and operation. The Writer
Service rejects any difference, starts a transaction, locks or otherwise guards
the expected version, enforces domain invariants, appends the operation receipt,
and atomically commits the data plus the next version. It returns a signed commit
or abort receipt through the original path. Retrying the same idempotency key
returns the existing outcome; it never applies the mutation twice.

No generic CRUD service or shared writer may be substituted for either contract.

## 5. AGT and policy-generation compatibility

Every hop contributes a signed compatibility statement containing its AGT
runtime version, policy generation, domain registry version, schema generation,
compatibility-set digest, workload measurement, and freshness deadline. The
target domain publishes a signed compatibility manifest that lists exact
accepted tuples and explicitly reviewed rolling-upgrade pairs.

A protected path is compatible only when:

1. every participating gateway and internal service presents a fresh,
   authenticated statement;
2. all tuples belong to one currently accepted compatibility set for the target
   operation and domain;
3. no participant reports a rollback, unknown generation, invalid signature,
   expired manifest, or unapproved mixed-generation path; and
4. authorization and redemption evaluate the same compatibility-set digest.

Numeric generation ordering alone is not compatibility. A newer, older, or
apparently equal generation without the exact signed set fails closed. Gateways
on the same protected path synchronize before accepting traffic. During a
reviewed rolling upgrade, the manifest defines the narrow overlap, direction,
deadline, and allowed operations; writes and recovery default to single-
generation operation unless explicitly proven compatible.

On mismatch, the gateway rejects before protected payload release with a stable,
non-revealing error, appends an attributable protected failure event, invalidates
the incomplete path context, and exposes only domain-safe health to operators.
There is no automatic downgrade, cached-policy fallback, fail-open timeout, or
route through a different gateway.

## 6. SAS-style capability semantics

Concord uses a signed, sealed capability comparable to a tightly scoped SAS token
but stronger than a reusable bearer URL. A capability contains:

- unique `capability_id`, issuer, subject/workload confirmation key, exact
  mediator and reader/writer audiences, target domain, and operation ID;
- allowed action, purpose, immutable resource selector, allowed fields, response
  class, mutation digest when relevant, and maximum result/byte limits;
- express grant references and evaluated grant versions;
- `not_before`, `expires_at`, one-use flag, delegation prohibition or explicit
  delegation chain, and channel/session binding;
- expected/snapshot version, idempotency key, policy/registry/schema generations,
  compatibility digest, and cryptographic nonce; and
- issuer signature and key version.

Capabilities grant no rights beyond their fields and are denied on ambiguity.
They are proof-of-possession tokens: redemption requires the bound identity and
channel, so disclosure alone does not authorize use. They are never placed in a
URL, browser history, ordinary logs, Workbench state, or an error message.

Default maximum lifetimes are five minutes for a bounded read and sixty seconds
for write admission. Write and recovery capabilities are one-use. A read may be
one-use or allow a bounded response stream; it cannot authorize a later new query.
Highest-risk reads default to one use, the minimum practical lifetime, no local
download/cache/clipboard, and a non-retentive isolated session when feasible.
Domain policy may shorten these limits but cannot lengthen them without a signed,
reviewed policy generation naming the affected classification and justification.

Expiry and revocation stop future admission/redemption. Capability consumption
is durably recorded before or atomically with the protected action so a crash
cannot make it reusable. Denials, consumption, expiry, and suspected replay are
attributable without logging the token itself.

## 7. Versions, transactions, and revocation ordering

Each authoritative object or aggregate has a monotonically advancing domain
version. A mutation declares all read-set and write-set expected versions plus
the proposed mutation digest. Missing expected versions are invalid; a mismatch
aborts with no partial write. Commit atomically records old/new versions,
operation and capability IDs, mutation digest, authority snapshot reference,
policy/compatibility generations, writer identity, and commit time.

Cross-domain operations have a coordinator that stores no protected payload and
cannot authorize any participant. Before lawful start, each domain independently
authorizes the exact operation, participants, local scope, expected versions,
deadline, and compensation/abort behavior. The resulting admission record is an
immutable authority snapshot bound to the operation and domain set.

JON-35 controls revocation order:

- revocation before admission or capability redemption prevents the new action;
- after a cross-domain operation has lawfully started, later revocation alone
  does not cancel it or invalidate its admitted authority snapshot;
- lawful start occurs only after every named participant has durably admitted
  the same immutable operation envelope; its operation-scoped capabilities
  remain redeemable until the admitted operation deadline despite later grant
  revocation, but only for that operation;
- the snapshot cannot expand scope, add domains, change payloads, relax expected
  versions, or start a retry as a new operation;
- all other checks still apply, including capability validity at the defined
  redemption point (signature, audience, binding, consumption, and deadline),
  expected versions, domain invariants, compatible policy state, and an explicit
  lawful cancellation mechanism; and
- completion or abort is append-only and attributable in every participant.

The protocol never reports success until every required participant has a
durable outcome under its declared commit protocol. Uncertain outcomes enter a
sealed `in_doubt` state: no blind retry or compensating mutation occurs. Recovery
uses the recorded operation, participant receipts, authority snapshot, and
versions to finish or abort only as the pre-authorized protocol permits.

## 8. Freeze, evidence preservation, and recovery

A domain freezes on integrity-chain failure, unexplained version regression,
store corruption, key/manifest failure, incompatible policy state, conflicting
writer evidence, or authoritative-store unavailability beyond its declared safe
threshold. Freeze is sticky and rejects reads and writes except explicitly
authorized evidence-preservation and recovery operations. It does not redirect
to a replica or backup as a new authority.

Freeze procedure:

1. stop new capability issuance and writer admission; isolate affected services;
2. preserve volatile evidence, logs, storage snapshots, manifests, binaries, and
   attestations using immutable hashes and witnessed timestamps;
3. record last verified version/high-water mark and all uncertain operations;
4. seal live media read-only where feasible and create a domain-local incident
   record without copying protected payloads to a general incident system; and
5. expose only `frozen`, reason class, freshness, and recovery phase to callers
   authorized for that operational metadata.

Recovery requires the domain registry's named authority and quorum, separation
of requester/approver/executor/witness roles, fresh compatible AGT state, a
signed plan naming exact evidence and target versions, and one-use recovery
capabilities. Restore occurs into a quarantined environment with the same domain
and Linux isolation. The recovery team verifies backup provenance, encryption,
integrity chains, schema migrations, authoritative high-water mark, and all
`in_doubt` operations before comparison with frozen live evidence.

Promotion is an expected-version action approved under the recovery plan. It
atomically designates one recovered lineage as current, rotates affected keys
and service credentials, records old/new roots and versions, and leaves frozen
evidence immutable. Conflicts, missing provenance, or an absent quorum keep the
domain frozen. Emergency access is not a bypass; it is a separately defined,
short-lived, one-use recovery policy with the same evidence and audit duties.

## 9. Audit, exposure history, and Workbench

Security events are append-only, integrity-chained, attributable, and timestamped.
At minimum they record request/operation/capability IDs; subject, workload,
mediator, service, and approving identities; target domain and action; grant and
purpose references; selector and payload digests rather than unnecessary
protected values; decision reason code; AGT/policy/registry/schema generations;
expected and resulting versions; capability issue/consume/expiry/replay status;
gateway path; response classification/size; and commit, abort, freeze, recovery,
disclosure, or denial outcome.

Read receipts preserve what classification and selector were exposed, to whom,
under which authority, and when. Later expiry or revocation changes future access
but does not delete that history. Corrections are linked additions. JON-18 owns
publication, protected failure-ledger, and disclosure-ledger semantics; this
contract supplies authenticated security events to those interfaces.

Workbench is a read-only consumer through the same gateway path. Authorized
views may show:

- domain health, freshness, isolation attestation, current compatible generation,
  freeze/recovery phase, and degraded dependencies;
- the viewer's grants, capability requests and outcomes, access expiry, exposure
  receipts, transaction versions, and commit/abort state;
- authorized audit timelines using opaque operation/resource references; and
- recovery approvals and evidence digests to explicitly authorized recovery
  roles.

Public and ordinary operational views must not expose protected queue entries,
membership, mission data, resource existence, covert counts/headroom, selectors,
denial distinctions, archive contents, gateway topology, or capability material.
Global scheduling receives only JON-16-owned opaque capacity/eligibility
envelopes. Search indexes store domain-safe references and require current
domain authorization on dereference; they never become convenience stores.

Stale, unavailable, incompatible, frozen, or unauthorized values display those
states rather than `0`, empty, healthy, or allowed. Workbench offers no direct
store query, policy edit, recovery promotion, or writer shortcut.

## 10. Threat and acceptance scenarios

1. **Direct access:** an agent, operator, gateway, mediator, or authorization
   service presents its own credential to a store. The store rejects it because
   only the domain Read/Writer Service audience and Linux identity are accepted.
2. **Privilege collapse:** a shared service account or database is configured for
   House and Senate archives. Registration/deployment validation fails; neither
   domain becomes available.
3. **Archive separation:** authorization to a House investigation reveals no
   Senate/Judiciary existence, membership, mission, search result, key, backup,
   log payload, or queue detail.
4. **AGT mismatch:** one of two gateways has a newer generation but no signed
   overlap manifest. The request fails before payload release, with a protected
   mismatch event and no downgrade.
5. **Forged/replayed capability:** a stolen write token is used from another
   workload or is redeemed twice. Proof-of-possession or the atomic consumption
   record rejects it; one mutation at most can commit.
6. **Scope substitution:** a mediator changes a selector, response field, purpose,
   payload, expected version, or operation ID after authorization. Audience and
   digest binding causes rejection.
7. **Expired temporary read:** an earlier viewer retries after expiry. No payload
   is returned, while the earlier exposure receipt remains attributable.
8. **Stale write:** authoritative version is newer than the capability's expected
   version. The entire mutation aborts without partial state or auto-merge.
9. **Revocation before start:** authority is revoked before admission. No new
   operation or retry is admitted.
10. **Revocation after lawful start:** the admitted cross-domain operation may
    finish within its immutable snapshot if all other checks pass. Revocation
    cannot be used to widen it, and an applicable lawful cancellation still
    stops it.
11. **Partial cross-domain failure:** a participant outcome is uncertain. The
    operation becomes `in_doubt`; evidence is preserved and controlled recovery
    resolves only the recorded protocol—never a blind duplicate write.
12. **Corrupt live store:** integrity verification freezes the domain before
    repair. Backup bytes are restored to quarantine and cannot silently replace
    live authority.
13. **Compromised backup operator:** backup credentials cannot call application
    reads, decrypt unrelated domains, or promote a restore without recovery
    quorum and one-use capabilities.
14. **Missing Linux isolation:** UID, mount, MAC, key, or network separation is
    absent. The affected domain seals rather than sharing a host namespace.
15. **Public-view probing:** public search, health, scheduler, and Workbench calls
    cannot distinguish whether a secret member, mission, queue item, or resource
    exists.
16. **Universal-authorizer attempt:** CRA, AGT control plane, Archivist,
    scheduler, or a recovery role attempts unrelated domain access. Domain-local
    authorization rejects it absent an express grant evaluated by that domain.
17. **Identity recovery:** a JON-15 reconstruction receives fresh capabilities
    only after current domain authorization; checkpoint possession or old keys
    grant nothing.
18. **Publication boundary:** a protected source record can reach JON-18's
    Archivist only through authorized disclosure/submission. Publication neither
    rewrites the source archive nor gives the Archivist source-domain authority.
19. **Sealed census:** security logs and operational views expose decision and
    integrity status without leaking JON-59-owned raw R/T, covert membership,
    class breakdowns, or true unused headroom.
20. **Recovery disagreement:** provenance or quorum cannot be established. The
    domain remains frozen, evidence remains preserved, and Workbench reports the
    blocked recovery phase without inventing a healthy version.

## 11. Owner interfaces consumed

- **JON-15 — identity:** supplies immutable governance-identity references,
  lifecycle/history boundaries, and recovery requests. JON-17 authorizes storage
  access but does not own identity history or succession.
- **JON-18 — records/publication:** supplies submission, append-only correction,
  publication, protected-failure, and disclosure contracts. Domain authorization
  does not decide what is publishable.
- **JON-59 — sealed census:** supplies domain-owned data and minimum response
  shapes. JON-17 prevents unauthorized disclosure but does not define R/T or
  census authority.
- **JON-16 — scheduler:** consumes only opaque protected capacity/eligibility
  envelopes and does not gain queue or mission access.
- **JON-35 — ordering:** supplies the adopted start-time authority rule for
  admitted cross-domain operations.
- **JON-38 — express authority:** supplies the required grant provenance and the
  rule that technical classification or project status never creates authority.

## Source basis

- [JON-17](https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores), current owner instruction dated 2026-09-16.
- [JON-35](https://linear.app/jons-garage/issue/JON-35/finalize-cross-domain-commit-and-revocation-ordering), adopted start-time authority and revocation decision.
- [JON-38](https://linear.app/jons-garage/issue/JON-38/define-protected-or-authority-bearing-initiative-boundary), adopted express-authorization decision.
- [JON-15](https://linear.app/jons-garage/issue/JON-15/persistent-identity-memory-and-succession-model), identity/history interface owner.
- [JON-18](https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model), records/publication interface owner.
- [JON-59](https://linear.app/jons-garage/issue/JON-59/implement-coaial-coaia-dual-census-and-cra-ceiling-enforcement), sealed-census visibility owner.
- [JON-16](https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control), opaque protected scheduling interface owner.
