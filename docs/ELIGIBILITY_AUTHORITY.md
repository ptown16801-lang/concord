# Durable eligibility authority

Scope: eligibility authority only. This change descends from the preserved draft
`delivery/jon-79-recovery-20260916` at
`51a102259785a5b53dc6ec4bc4bbca54c4a8fc37`. That branch, its original tests,
and its recovery evidence are unchanged. No population registry, ballot intake,
electorate accounting, UI, transport endpoint, deployment, or other subsystem
is introduced.

## Storage and consistency

`EligibilityRegistry` requires an absolute `filename` for a dedicated SQLite
file. There is no in-memory or implicit filename default. The parent directory
must already exist. Node's built-in SQLite runtime is already used by this
repository; no new dependency is needed.

The store uses WAL and synchronous FULL commits. Each write acquires a SQLite
`BEGIN IMMEDIATE` transaction before checking the current log version. It
reconstructs the current state, validates every command, inserts the signed
request receipt and all events, then commits. Any authorization, version,
transition, or storage failure rolls back the entire transaction. The required
`expectedVersion` is never silently replaced with the current version.

The event log is the sole eligibility authority. No separate mutable eligibility
projection is persisted or cached. Reads use one SQL snapshot, validate its hash
chain and batch completeness, then reconstruct the requested state. A second
reader or writer connection sees newly committed changes without refreshing a
copied eligibility map. Full replay is intentionally simple but is O(total
history) per query/write; production-scale indexing remains future work.

SQL triggers prohibit event/request/metadata update, delete, and replacement,
and enforce sequential event versions. Event hashes bind each row to its
predecessor and signed request receipt. Application callers receive detached
objects. Corrupt history fails closed; there is no silent repair/import path.
These checks are not protection against an administrator who can replace the
entire database and its hashes. External high-water marks, protected backups,
and authorized recovery remain host/security integration responsibilities.

## Enforced write boundary

Trusted bootstrap constructs the writer with:

- `filename` and `authorityId`: a dedicated store and unique writer authority;
- `policyGeneration`: the exact accepted generation, not an ordered fallback;
- `principals`: entries containing `keyId`, `principalId`, Ed25519 `publicKey`,
  and an explicit array of permitted transition types;
- optional `maxLifetimeMs` (default 60 seconds) and a trusted `clock`.

There are no built-in all-powerful principal names or default permissions.
Bootstrap is inside the trusted writer process. Untrusted callers cannot supply
keys, grants, a clock, database filenames, or constructor options. Code with
arbitrary execution inside that process is already inside the trust boundary.

`apply(command, options)` and `applyBatch(commands, options)` require:

```js
{
  expectedVersion: 7,
  authorization: {
    keyId: "configured-service-key",
    requestId: "unique-operation-id",
    issuedAt: "2026-09-21T12:00:00.000Z",
    expiresAt: "2026-09-21T12:00:30.000Z",
    policyGeneration: "configured-generation",
    signature: "base64url-ed25519-signature"
  }
}
```

The external service signs the bytes from:

```js
eligibilitySigningPayload({
  authorityId, policyGeneration, expectedVersion, commands, authorization
})
```

For `apply`, `commands` is `[command]`. The canonical JSON payload binds the
protocol discriminator, authority audience, generation, key, request ID,
lifetime, exact ordered commands, and expected version. Requests must contain
JSON values; send dates as strings. The writer verifies the signature against a
configured public key, derives the principal from that key, checks every
transition grant, validates expiry before and after acquiring the write lock,
and rechecks expiry after transition validation. It never trusts a request's
`principalId`, `authorityId`, or legacy C4 `authentication` claim as proof.
Legacy command `authentication` fields are rejected.

Private service keys stay outside this module. A signature proves possession of
a configured service key; it does not attest Linux UID, gateway traversal, or
current AGT workload state. This is a concrete service-key write boundary, not
a claim that the full JON-17 protected-domain gateway contract is implemented.
Read access must likewise be mediated by the future authorized Read Service.

A request ID is consumed in the same commit as its events. A successful request
cannot execute again, including after restart. Retrying a committed request
returns `REPLAYED_REQUEST` while it is otherwise valid; an expired retry fails
expiry validation. After an uncertain response, use `requestReceipt(requestId)`
to recover the committed signed commands/evidence. A rolled-back request has
no receipt and consumes no request ID. A new attempt after a version conflict
requires a fresh signature over the new expected version; never auto-resign or
silently retry a changed transition on behalf of a caller.

## Read interface and history

`new EligibilityReader({ filename, authorityId, clock })` opens an existing store
with SQLite `readOnly: true`. It cannot create a missing database and exposes no
`apply` or `applyBatch`. It belongs inside the eligibility Read Service, not in
the ballot process with a direct database mount.

| Method | Contract |
| --- | --- |
| `readEligibility(identityId, { minimumVersion })` | Current committed decision using the trusted reader clock. Returns `authorityId`, `identityId`, `version`, `observedAt`, `eligible`, and `reason`. Fails if the store has not reached `minimumVersion`; no caller-supplied old time or copied state controls this decision. |
| `stateAt(identityId, { version, at })` | Historical state limited by both log version and effective time. Unknown identities return `null`; invalid versions fail. |
| `canCastNewBallot(identityId, { at })` | Compatibility/historical query; not a transferable ballot permission. |
| `electionStatus(identityId, { closesAt, acceptedBallotAt, at, version })` | Existing retention/close semantics with optional pinned history version. Does not create or verify ballot receipts. |
| `auditLog({ afterVersion })` | Detached ordered events with committed authorization evidence. |
| `requestReceipt(requestId)` | Detached original signed commands and authorization evidence, or `null` when no such request committed. |

Use both version and effective time to reconstruct what was known at a past
point. Effective time alone uses everything currently recorded, including later
records with that effective time. Future election-close records must preserve
the authoritative close version. The draft's existing exact-close comparison is
preserved: observation strictly after close reports CLOSED. Restoring a
restriction after close does not reopen voting. `acceptedBallotAt` is a trusted
ballot-authority input for retention queries, never a client assertion that
creates an accepted ballot.

## Integration assumptions and blockers

1. **Population registry:** it must supply stable ordinary-identity references
   and establish that an identity is entitled to registration (including any
   citizenship/waiting-period and population-class rules). This authority
   preserves the draft rule that registration starts eligible. It does not
   invent or verify population records. Population/court permissions in the
   tests are synthetic fixtures, not adopted institutional role assignments.
2. **Authorization/AGT:** trusted provisioning must translate approved
   institutional authority into the service-key transition grants. Live AGT
   evaluation, service/workload attestation, gateway-path validation, dynamic
   revocation, and compatible policy-generation rollout are not implemented.
   Configuration is fixed for each writer lifetime: hosts must stop stale
   writers before key/grant/generation changes and recreate them with approved
   configuration. Do not deploy multiple writers with inconsistent policy.
3. **Ballot intake:** depend on the eligibility Read Service's `readEligibility`
   contract; do not seed a ballot-owned eligibility cache. Bind the read's
   authority/version/time to the adopted cross-domain admission/commit ordering
   protocol and revalidate/coordinate as that protocol requires. A read followed
   by an independent ballot commit has a race. A versioned read result is not
   itself a lock, reservation, or one-use voting capability. That cross-domain
   protocol and ballot storage remain unimplemented here.
4. **Linux isolation and recovery:** only the eligibility writer UID/process
   may write the store; the authorized Read Service has read-only access. Other
   systems access those services through the protected path. Parent directory,
   database/WAL/SHM ownership, service-key provisioning, backup/recovery, trusted
   time, revocation, and filesystem durability guarantees are host concerns.
   No deployment setup is added by this change.
5. **Draft evidence:** no legacy in-memory state is silently imported or
   reclassified as authenticated. If prior runtime events exist outside Git,
   preserve their bytes and provenance and design a separately authorized import
   before claiming they are present in this new durable store.

## Verification

The original nine semantic tests were run before editing and retained with
explicit durable fixtures and real test signatures. Added coverage exercises
restart/replay, process death after commit, concurrent writers, signature
substitution, transition grants, expiry, policy mismatch, read freshness,
transaction rollback on storage failure, database append guards, independent
receipt verification, history mutation attempts, and corruption detection.

Run:

```sh
npm run check
node --test test/eligibility.test.js test/eligibility-authority.test.js
npm test
```

Local verification on Node 24.19.0: syntax checks passed, 27 focused eligibility
tests passed, and all 50 repository tests passed. `git diff --check` passed.
Node 22 was not run locally; no CI result is claimed here.
