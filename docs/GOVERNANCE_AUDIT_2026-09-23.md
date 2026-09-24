# Governance sandbox audit — September 23, 2026

Status: fixes and focused regression coverage have been implemented for all four
findings; independent acceptance remains pending under JON-135. This is the
implementer's audit of Concord's synthetic integration, not independent
acceptance or an audit of Microsoft's SDK internals. The preceding baseline
suite passed 59 tests; those tests did not cover the cases below.

Findings and reproduction steps were sent to @linear for advisory review on
[JON-138](https://linear.app/jons-garage/issue/JON-138#comment-921c8ce9-b6a5-48b4-8cee-7c547e9e858b).
The findings below preserve the original observations. Remediation adds explicit
replacement guards, idempotent reconciliation of retained collector history,
immutable complete policy bundles with an offline provenance verifier, and
sanitized denial evidence. `test/agt-audit-regressions.test.js` covers these
cases. The implementation-stage full suite passes 65 tests; independent review
must use a fixed candidate and report its own evidence. Local-only durability
and trusted-database-access qualifications still apply.

## 1. Replacement bypasses database immutability guards

In `src/governance/sandbox/runtime.js`, the database connection does not enable
recursive triggers. After admitting an operation, INSERT OR REPLACE with the
existing audit sequence/id replaces its payload. Replacement of the existing
operation row can set its status to `canceled`. The implicit deletion does not
invoke the DELETE guards in this configuration, and UPDATE guards do not apply.

Observed: `recursive_triggers=0`, audit payload `{"type":"forged"}`, operation
status `canceled`. This requires trusted-side SQL write access; no untrusted-agent
route to that access was demonstrated. Database guard coverage must include
replacement attempts, with unchanged approval, reservation and audit evidence.

## 2. Collector recovery can omit approval evidence

Admit an operation and flush its audit. Replace the collector with a fresh
`LocalAuditCollector` database to simulate recovery after collector data loss,
then resume the pending operation. Domain delivery markers prevent replay of
the previously acknowledged approval record.

Observed: operation committed at version 1; collector contained execution-intent
and committed receipts but no approved receipt. This concerns collector history
loss, not ordinary temporary unavailability. Recovery needs history reconciliation
or an explicit pause until evidence is restored, preserving the approved action.

## 3. Policy upgrades discard historical signed bundles

Admit under policy generation 1, then install generation 2. Approval evidence
retains generation 1's manifest but not the issuer signature or policy YAML.
The single persisted current-policy entry now holds generation 2.

Historical evidence therefore cannot independently verify the original policy
signature or replay its rules. Preserve full signed bundles immutably by digest
and test historical verification after upgrade and restart. Earlier references
to a stored signed manifest meant a manifest from a verified bundle; the bundle's
signature was not retained with that approval.

## 4. Denied-attempt evidence lacks correlation and time

Prepare two distinct signed requests, revoke their actor, then submit both.
Each audit payload is only `{"code":"IDENTITY_DENIED","type":"denied"}`.
Random row IDs distinguish entries but do not retain request correlation,
timestamp, failure stage or actor verification state.

Add sanitized attempt correlation and timestamps, while distinguishing asserted
identity from cryptographically verified identity. Never retain credentials or
label an unverified actor as authenticated.
# Follow-up correction: rejection evidence, result integrity and CI

The subsequent independent audit found that null evaluator rejection could bypass
denial logging, and trusted SQL could rewrite a committed operation's returned
result. Admission now handles arbitrary rejection values without inspecting them
unsafely; a stable denial receipt is retained before rethrowing the original value.
New triggers allow a result only during pending-to-committed transition and reject
all later result updates, including after reopening an existing database.

Two focused regressions reproduced both defects before correction. All 67 tests
pass after correction on Node 24.21.0. CI now installs the pinned dependencies
with `npm ci --ignore-scripts` before checks and tests. This correction is delivered
for independent review; local SQL invariants do not claim protection against an
administrator replacing databases or removing their schema.

Follow-up integration retained that runtime correction and added explicit checks
for no reservation after denial and rejection of completion without a result.
Both CI matrix jobs now run to completion independently. A fresh
`npm ci --ignore-scripts` reported zero vulnerabilities; syntax checks and all 67
tests passed on Node 22.23.2 and Node 24.21.0. Actual Linux isolation and the
confined-agent workflow also passed. These are producer verification results;
JON-135 must independently review the final published commit.
