# Admission kernel v1

This is the first JON-130 milestone only: a synthetic, local default-deny
decision boundary. `allow / ELIGIBLE` means eligible for a future durable
admission transaction. It is **not lawful admission**, a capability, a commit,
or permission to call a protected handler. There is no handler registration,
execution, writer, audit collector, network service or protected-store access.
Repeated evaluation is side-effect free with respect to domain data; it does
not provide durable one-use or replay protection.

## Sources and precedence

Retrieved September 23, 2026 through Linear MCP:

- [JON-130](https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter).
- [Proposal and owner decisions](https://linear.app/jons-garage/document/proposal-for-review-concord-agt-integration-and-bounded-delegation-50c0e9dbe914).
- JON-137 review's “single default-deny admission kernel” milestone; the
  owner's current local-only instruction selects that milestone.

Reused local Git artifacts, without copying or reopening their designs:

- `49c19837191b83e93844653f7bf6259ee838d3ef:docs/SECURITY_DOMAIN_CONTRACT.md`
  (JON-17), particularly sections 1–7: domain-local authority, exact signed
  compatibility tuples, service separation, bounded capabilities and versions.
- `1e86688cc2ed45b174d675d353c47b96c8d5bbec:docs/IDENTITY_PERSISTENCE_CONTRACT.md`
  (JON-15): registry identity persists independently of credentials, sessions,
  checkpoints and successors. Finger cookies are not governance credentials.

The proposal's later owner decisions supersede older cancellation/deadline
language in the contracts and review: a lawfully admitted action cannot be
canceled and must complete; later revocation or permission expiry affects new
admission only. Original scope, expected versions and domain invariants remain
binding. Collector outage requires durable preservation and pausing until the
collector returns, then resumption without duplicate execution. Local audit
storage alone never permits execution. No cancellation handle or completion
expiry is introduced here. Re-evaluating an already admitted operation with
this new-admission API would violate that lifecycle boundary.

## API and executable schemas

Import `createAdmissionKernel` from `src/governance/agt-adapter.js` locally.
`contracts/admission.js` defines the executable closed schemas; unknown fields
are rejected. `contracts/fixtures/admission.js` provides shared synthetic
request/context/participant fixtures for downstream conformance testing.

Construction supplies trusted domain, audience, action allowlist, Ed25519
public trust roots, a context resolver, timeout and clock. None may be derived
from a request. Keep the kernel and its configuration inside the trusted
authorization service. This module is not a sandbox against code in that process.

`evaluate(request)` accepts only schema/canonical versions, operation ID,
domain/audience, action/resource/purpose, arguments and their digest, and
nonempty expected versions. Identity, roles, trust scores, policy selection and
authority are forbidden caller fields. Requests and provider responses are
copied before asynchronous work, so later caller mutation cannot change them.

`concord.json/v1` canonicalization sorts object keys by JavaScript string order,
uses JSON string escaping, retains array order, and permits null, booleans,
strings and safe integers. It rejects fractional/nonfinite numbers, negative
zero, accessors, sparse arrays, undefined, nonplain objects, dangerous prototype
keys and nesting beyond 32. It is not RFC 8785. SHA-256 hashes the UTF-8 canonical
text; policy digests instead hash the exact UTF-8 YAML bytes. The API accepts
objects, not raw JSON text; transport parsing must reject duplicate JSON keys.

## Authenticated-context trust boundary

`resolveContext(request, { signal })` is a trusted, read-only, domain-local
provider, not a caller-supplied object or a boolean authentication flag. Its
future implementation must authenticate the actor and calling mediator, verify
credentials against configured issuers/keys and current registry state, verify
proof of possession and channel binding, and verify every participating
service's fresh compatibility attestation. Failure must reject or return no
context. This milestone does not implement those credentials or registry reads.

Its closed context schema carries the stable actor ID separately from service,
credential and channel IDs; request digest; domain/audience; authenticated and
expiry timestamps; gateway/mediator/authorization tuples; and a domain-local
authority snapshot. The kernel requires exact binding of actor, target,
action/resource/purpose, argument digest and expected versions, and explicit
`permitted: true`. Context and authority must be current at both evaluation
checks; time uses integer Unix milliseconds with zero implicit skew and
rollback rejection. Policy alone cannot grant institutional authority.

The provider must honor cancellation, use bounded I/O, avoid synchronous
blocking and cause no effects. Its timeout discards late results; JavaScript
cannot terminate arbitrary synchronous code in the trusted parent process.
The fixture provider does none of the real authentication above and must never
be used as a deployed verifier.

## Signed policy and compatibility

`installPolicy({ manifest, signature, yaml })` verifies an Ed25519 signature
over the canonical manifest with a configured `(issuer, keyId)` public key.
The signature binds domain/audience, generation, compatibility ID, validity
window, policy digest and exact gateway/mediator/authorization tuples. Each
tuple names service ID, AGT 5.0.0, admission schema and the same generation.
Only this single-generation profile is implemented; mixed-generation rolling
upgrades require a later contract. Missing participants or mismatched tuples
deny. The authenticated provider is responsible for attestation authenticity;
the signed manifest defines which verified tuples are acceptable.

YAML is capped at 64 KiB and restricted to named rules with exact
action/resource/purpose conditions and allow/deny effects, plus mandatory
`default_action: deny`. AGT parses and evaluates the actual YAML using
deny-overrides. Only an explicit matched allow is accepted. Advisory effects,
approval effects, malformed conditions and permissive defaults are rejected.
Parsing/evaluation workers are terminated on deadline or completion.

Installation seals new decisions immediately, builds and validates privately,
then publishes the complete bundle atomically. Invalid updates leave admission
sealed. No older policy fallback occurs. Only the latest concurrent install
can publish; in-flight evaluations of replaced policy deny. Successful
generations increase monotonically even across failed updates in this kernel
instance. Restart begins sealed: a future trusted durable loader must preserve
generation high-water state and current trust roots. Persistent anti-rollback,
key rotation, policy retention for admitted work and emergency migration are
outside this milestone.

## Results and downstream boundary

Results always carry `schema`, `decision` and a stable `code`. Allow adds
request digest, actor ID, authority snapshot ID, generation, policy digest and
compatibility ID. Denial codes are `INVALID_REQUEST`, `WRONG_TARGET`,
`UNKNOWN_ACTION`, `POLICY_UNAVAILABLE`, `CONTEXT_DENIED`, `POLICY_DENIED`,
`POLICY_ERROR`, `POLICY_CHANGED`, `CLOCK_ERROR` and `TIMEOUT`. Install success
returns `decision: installed` plus generation; failed install uses
`POLICY_INVALID`, `POLICY_CHANGED`, `CLOCK_ERROR` or `TIMEOUT`. Denials contain
no credential details, policy internals, argument payload or exception text.

Future B/C work must turn eligibility into durable admission with authenticated,
one-use capability binding, durable uniqueness, expected-version transactions,
protected audit evidence and collector availability coordination. It must keep
admitted work pending during collector outage and implement idempotent recovery.
This kernel cannot satisfy those obligations and offers no execution escape
hatch. Security audit, Finger behavior/storage and Archivist-only public
publication remain separate. Linux isolation remains the JON-17 profile; no
protected-domain readiness is claimed until real host bypass tests pass.

## Local verification

Run `node --test test/agt-admission.test.js`, `npm test`, and `npm run check`.
The scoped tests use ephemeral Ed25519 keys, the installed SDK and synthetic
fixtures. They cover allow/deny/default denial, malformed requests, authority
binding, signature/digest/compatibility failures, parse errors, timeouts,
atomic updates, stale generations, clock rollback and zero dispatch on denial.
They establish neither real authentication nor durable admission or isolation.
The existing manifest/lockfile and scoped js-yaml override are preserved.
