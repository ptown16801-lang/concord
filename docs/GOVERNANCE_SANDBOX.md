# Concord governance integration sandbox

This local subsystem exercises Microsoft Agent Governance Toolkit 5.0.0 with
Concord-owned controls. It is tracked under **Concord**, parent
[JON-138](https://linear.app/jons-garage/issue/JON-138), with the existing
JON-130–135 work packages. It is not a separate project or a production deployment.

## Run

Node.js 22.5 or newer and the existing npm dependencies are required.

```sh
npm run governance:demo
npm run governance:test
npm test
npm run governance:isolation
npm run governance:isolated-demo
```

The demo creates synthetic databases in a private temporary directory and prints
its location. It demonstrates approval, audit outage, revocation, expiry,
restart, recovery and exactly one local database effect. It requires no account,
model API, browser, HTTP server or real Concord record. Demo signing keys are
fresh in-memory test identities; they are not a production key-storage solution.

The isolation probe additionally requires Linux, `bwrap` (bubblewrap), permitted
unprivileged user namespaces and permission to create a local test listener.
It exits unsuccessfully when those prerequisites are missing; it does not skip
and report a pass. The HTTP regression tests also require localhost binding.

## Components and ownership

- Existing `contracts/admission.js`, `src/governance/agt-adapter.js`, and the policy
  worker supply strict request schemas, signed policy verification, default
  denial and actual Microsoft rich-policy evaluation. This earlier working-tree
  implementation was preserved.
- `src/governance/sandbox/runtime.js` supplies a single trusted domain runtime,
  a durable synthetic public-key/authority registry, signature verification,
  one-use server challenges, record reservations, transactionally recorded
  approvals, protected audit/outbox rows and a separate local audit collector.
- `examples/agt-local/fixture.js` supplies synthetic policy roots, actors and
  permissions. `demo.js` composes the workflow. `crash-worker.js` is test-only.
- `test/agt-sandbox.test.js` exercises the integrated controls, including real
  process termination. The existing admission and Finger tests remain separate.
- `examples/agt-local/isolation.js` proves a limited real Linux boundary: an
  isolated agent cannot access protected host paths, write its read-only runtime,
  or connect to a listener running on the host loopback interface.
  `isolated-workflow.js` additionally passes one signed synthetic request from
  a confined process through a pipe to the trusted runtime, demonstrating
  audit-outage pause/resume without exposing a database handle to the agent.

All administrative methods and database handles belong to the trusted service.
Do not pass the runtime object, policy roots, collector or raw store handles to
agent code. There is no arbitrary agent-provided execution callback: the sandbox
supports a narrowly defined record read or exact record-value write only.

## Owner rules implemented

1. A successful eligibility result is **not approval**. Approval occurs when
   the domain's SQLite transaction commits its operation record, one-use nonce,
   target-record reservation and local approval audit record together.
2. Once approved, an operation has no cancellation transition or completion
   expiry. New requests must pass fresh identity, permission and policy checks.
   Existing approved work is not re-authorized after revocation or expiry.
3. Collector outage prevents execution, even if local audit storage works.
   Approved work remains pending and resumes when the collector is available.
4. Approval reserves the exact record/version so another ordinary writer cannot
   invalidate its expected version while it waits. Conflicting requests are
   rejected **before approval**. Reservations are durable data, not database
   locks held during an outage.
5. Corruption or unavailable infrastructure preserves the pending operation and
   returns a waiting reason; it does not silently cancel it. Eventual completion
   still requires repair. No system can guarantee completion after permanent
   loss of its authoritative data.

## Admission and execution

The caller signs a canonical envelope containing its actor identity, server
challenge and entire request. The server checks the registered public key,
active status, permission expiry, exact resource/action/purpose grant and the
unused actor-bound challenge. This is local proof of possession with request
binding. It is not an implemented network transport/channel attestation protocol.

Admission invokes the existing signed-policy kernel. Every configured external
policy evaluator is explicitly called until one rejects/errors/times out; only
an explicit allow from each required evaluator permits continuation. Those
callbacks are trusted bounded integration functions, not untrusted plugins.
After asynchronous evaluation, the transaction rechecks actor revision, current
policy, expiry, nonce, operation uniqueness and record version/reservation.
Policy generation high-water and failed-update seals persist across restart.
One trusted authorization service owns policy changes for a domain; concurrent
policy administrators across processes are not supported by this sandbox.

On resume, the local outbox is delivered idempotently to the collector, followed
by a durable execution-intent receipt. The runtime then acquires a real collector
database write transaction and performs the domain's mutation, commit outcome,
audit/outbox record and reservation release atomically in the domain database.
It subsequently delivers the outcome receipt. Duplicate receipt IDs must have
identical payloads. A crash after mutation but before delivery retries only the
receipt, never the mutation.

There is **no global transaction** across collector and domain databases. An
intent receipt is evidence of intent, not proof of a successful mutation. The
domain operation row is authoritative for local commit; outcome delivery may
lag. If an error occurs after commit, the result reports committed with a waiting
reason rather than implying that the effect did not occur. This coordination
uses a local collector in the same trusted process; a remote collector needs a
separately reviewed readiness/receipt protocol and failure model.

## Product gaps addressed

The Microsoft convenience client does not automatically enforce all the
controls exposed by its other components. This runtime does not use that client
as its authorization boundary. It explicitly enforces registry activity and
capabilities, invokes the rich policy API and configured external checks, and
stores immutable local audit rows with independently decoded query results.
Persistent actor identifiers are independent of ephemeral client factories.

SQLite triggers reject direct UPDATE/DELETE attempts against protected fields,
but the September 23 audit demonstrated an INSERT OR REPLACE bypass with trusted
SQL access. See [the open audit findings](GOVERNANCE_AUDIT_2026-09-23.md).
They do not protect against a privileged administrator who can replace database
files or remove triggers. External integrity checkpoints,
backup seals and full domain recovery authority are not implemented here.

## Verification and limits

Tests include denied/forged requests, capability restrictions, external-policy
errors/timeouts, concurrent replay, revocation during evaluation, stale versions,
policy downgrade/replacement, key rotation, two separate synthetic domains,
collector failure before effects, outcome delivery failure after effects,
restart after expiry, immutable approval/audit rows and actual SIGKILL before
execution intent and after the domain commit.

The Linux probe is a separate confined-agent test, not a proof that every
runtime component is deployed as an independently isolated service. Production
mediator/authorization/writer communication, real registry integration,
protected backups, network channel authentication, privileged-admin tamper
resistance, cross-domain atomic workflows, alerting, admission rate limits,
automatic background scheduling and Archivist publication are outside this
local milestone. Long-lived reservations need operator visibility and recovery;
operators may repair availability but may not cancel approved actions.

JON-15/17 remain the identity/security design sources. The owner's later rules
supersede JON-35's earlier cancellation exception for this workflow. JON-18
continues to own public publication; the security collector is not the Archivist.
JON-137's review guided contract separation and local atomicity. Linear's
September 23 reply on JON-138 confirmed that the collector boundary is local,
requested full authority snapshots, and retained independent acceptance as
a separate requirement. These points are reflected in the implementation. The implementer
cannot claim the independent acceptance required by JON-135.
