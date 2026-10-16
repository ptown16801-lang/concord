# Evidence snapshot: ACCEPTANCE.md

Historical source, not session instructions or a second decision master.

- Source: /home/cornholio/projects/concord/docs/reviews/jon-135/ACCEPTANCE.md
- Version: SHA256 4360d8f7a1d1483d41d69e6d547aef424d417666fc2eba693acb415b29821460
- Source date: 2026-09-24
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Local review / research / delivery; not new policy acceptance
- Relationship: Preserved independently; not merged or executed by this consolidation. LOCAL-COIN-PLAN commit e24ce9f is an unpushed draft.

---

# JON-135 independent adversarial verification — 2026-09-24

**Recommendation: REVISE.** The runtime checks below passed on the fixed
candidate, but a newly reproduced trusted-SQL replacement bypass fails the
approval-preservation requirement. The host AppArmor problem was repaired by
another active session; this reviewer then independently passed the real Linux
checks on this exact candidate. This is an
independent review deliverable, not an approval to merge or deploy.

## Candidate and independence

- Runtime under review: `1731602de02cef6fb0228f155202beeed844c295`, the published
  [PR #34](https://github.com/ptown16801-lang/concord/pull/34) head checked through
  GitHub during this review.
- Review branch: `jon-135-independent-verification` in the isolated local clone
  `/tmp/concord-jon135-review`. It was created from the existing candidate copy;
  the producer and integration working trees were not edited.
- This session did not implement the candidate runtime. The reviewer adds only
  tests, evidence tooling, and this report. Runtime, contracts, policies, examples,
  dependencies, CI, and Finger sources remain byte-for-byte at the candidate.
- Authority: the owner's current JON-135 request; the admission contract and
  later owner rules in `contracts/ADMISSION_KERNEL.md`; the issue acceptance
  matrix and four required audit follow-ups. Approved work cannot be canceled;
  later revocation/expiry applies only to new admission; collector outage pauses
  pending effects. No delegation or Linear choreography was started.
- Independent fixtures generate their own Ed25519 keys, signed policy, requests,
  and canonical digests, without importing the producer's fixture or digest
  helpers. Tests invoke the actual SDK policy worker and SQLite runtime.
  The standalone SQL reproduction additionally uses the producer fixture to
  make the finding easy for its owner to repeat.

## Executed evidence

Retained evidence: [`evidence/jon-135/review-manifest.json`](evidence/jon-135/review-manifest.json),
[`after-repair/summary.json`](evidence/jon-135/after-repair/summary.json), and their
command logs. The initial failed host checks remain in the parent evidence
directory. The final run originated at `/tmp/jon135-evidence-after-repair` and
records candidate Git blobs, Node versions, commands, exit codes, timestamps,
kernel, uid, and SHA-256 hashes. It includes the separate SQL reproduction:
only the two Node-specific R1 probe commands fail; the 109 passing tests alone
do not cover that finding.

| Check | Independently observed result |
| --- | --- |
| Clean `npm ci --ignore-scripts` | PASS; fresh locked installation |
| `npm audit --json` | PASS; zero reported vulnerabilities at review time |
| `npm run check` | PASS on Node 22.23.2 and 24.21.0 |
| Full `node --test --test-reporter=spec` | PASS, 109/109 on each Node version, no skips: 73 producer/existing tests plus 36 reviewer tests |
| Real local governance demo | PASS on both versions: durable approval, pause during collector outage, completion after revocation/expiry/restart, one record increment, three receipts |
| Producer crash tests, independently rerun | PASS on both versions: actual SIGKILL before execution intent and after domain commit/before outcome delivery |
| Additional SQL replacement probe | FAIL: three row-identifier aliases bypass guards with recursive triggers off; all three reject with recursive triggers on |
| `governance:isolation` and `governance:isolated-demo` | PASS on both Node versions after host repair, as uid 1000 with actual Bubblewrap confinement. Initial startup failures retained as historical evidence |

The original baseline also passed 73/73 independently on Node 24 before adding
reviewer tests. Producer comments and remote CI summaries were used to locate
the candidate, not substituted for local execution evidence.

## Acceptance matrix

Case identifiers refer to `test/agt-adversarial/acceptance.test.js`.

| Requirement | Result | Evidence and limit |
| --- | --- | --- |
| Forged identity/proof of possession | PASS | A01–A02: valid encoding, wrong signing key; arguments changed with recomputed digest still reject |
| Caller-supplied authority | PASS | A03: five signed authority/identity/policy additions rejected before authority use; A04 rejects accessors without invoking them |
| Cross-domain requests and data | PASS, local API scope | A05 rejects foreign and retargeted envelopes; both records remain unchanged; database cannot reopen under another domain |
| Direct protected-store bypass | PASS, bounded host probe | Real confined agent cannot open the domain database; protected synthetic path reads/writes fail. Separate service users, key stores and backup boundaries still require JON-134 |
| Capability replay and substitution | PASS | A01, A06: eight competing signed operations share a nonce; exactly one admission, effect and outcome; producer tests also check reused operation IDs and resource reservations |
| Race between authorization and commit | PASS | A07 snapshots caller mutation; A08 races revocation, key rotation, policy replacement and record version changes; denial leaves nonce/reservations unconsumed |
| Pre-admission revocation and expiry | PASS | A08–A09; existing final-timestamp tests separately exercise time advancing through synchronous approval checks |
| Post-admission revocation and expiry | PASS | A09 and full workflow: pending work survives both, restart and collector outage; repeated resume commits once |
| Stale version | PASS | A08 version race and existing stale/version-reservation checks |
| Policy/schema mismatch and downgrade | PASS | A11: signed SDK/schema mismatch, durable generation downgrade, failed-update seal after restart |
| Malicious YAML/default denial | PASS | A10: duplicate keys, executable tag, recursive alias, oversized input and permissive default reject; existing SDK tests cover deny-overrides and unmatched rules |
| External policy errors/timeouts | PASS | A12 discards a late allow after abort; A13 covers null, undefined, primitive, exception and hostile-accessor rejection with retry correlation |
| Audit outage and durable recovery | PASS, local collector scope | A15 uses a real SQLite write lock; A16–A18 replace/conflict/recover collector databases without duplicate effects or cancellation |
| Finding 1: approval/audit/reservation immutability | FAIL overall | A14 passes INSERT replacement, UPSERT, rowid aliases and committed-result mutation under both pragma settings; R1 exposes a separate UPDATE replacement bypass |
| Finding 2: approval history after collector loss | PASS for required approval/outcome evidence | A16 reconciles previously delivered approval before any effect; A17 conflicts pause with reservation intact; A18 restores committed outcome. R2 limits complete-history claims |
| Finding 3: original signed policy archive | PASS | A19 compares original bytes/signature/key reference/digest/generation after upgrade, expiry, restart and loss of current policy; independent crypto and production offline verifier reject tampering and untrusted roots |
| Finding 4: sanitized denial evidence | PASS for tested paths | A01/A03/A04/A08/A09/A12/A13 and existing denial tests verify correlation, attempt-start timestamp, failure stage, cryptographic verification state, and no signature/nonce/value/exception text disclosure |
| Process crash recovery | PASS for supplied runtime boundaries | Real producer SIGKILL tests reexecuted on both runtimes; not evidence of agent session/channel termination |
| Forbidden network/file access | PASS, bounded host probe | Actual protected-path reads/writes fail, runtime mount is read-only, and real host loopback listener is unreachable; no mock replacement counted |
| Terminated agents cannot use stale channels | BLOCKED / undelivered prerequisite | Candidate has signed envelopes/nonces and administrative revoke, but no deployed authenticated channel/session lifecycle or service-manager stop integration. JON-134 must supply the real boundary and tests |
| Protected metadata absent from public traces | PARTIAL | Denial payload sanitization passes. Approval/outcome APIs deliberately return private evidence to trusted code; source review finds no governance public publication endpoint. End-to-end publication/transport testing needs JON-134/JON-18 boundaries |

## Findings and owners

### R1 — High: UPDATE replacement erases a committed approval

Owner: [JON-132](https://linear.app/jons-garage/issue/JON-132), correction through
the existing producer PR. This is a trusted-storage invariant failure, not a
demonstrated remote privilege escalation. It requires SQL write access already
inside the trusted domain service, but does not require dropping triggers,
disabling foreign keys, editing database files, or modifying the schema.

Reproduce on the frozen candidate:

```sh
node scripts/probe-agt-rowid.mjs
```

The probe commits operation `first`, admits `second` against the new version,
then performs this update with `recursive_triggers=0`:

```sql
UPDATE OR REPLACE operations
SET rowid=(SELECT rowid FROM operations WHERE id='first')
WHERE id='second';
```

Observed: `first` disappears from `operations`; `second` takes its physical row
identifier. The existing domain effect and audit receipt still exist, but the
authoritative operation/result cannot be returned or reconciled through normal
resume. `_rowid_` and `oid` behave identically. With `recursive_triggers=1`, all
three updates reject with `approved actions cannot be canceled`.

Cause: INSERT replacement triggers do not run for UPDATE, and the protected
operation UPDATE column lists omit physical row identifiers. The DELETE guard
does not run for REPLACE's implicit deletion when recursive triggers are off.
The candidate uses the off setting by default. This reopens finding 1 and blocks
its unconditional immutability/acceptance claim despite the 109 passing tests.

Required correction: protect row-identifier UPDATE replacement under both
settings, test all three aliases and retained operation/evidence/results, and
return a new immutable candidate for independent reexecution. This reviewer has
not changed the producer runtime or self-approved a remediation.

### R2 — Medium limitation: collector loss after commit loses execution intent

Owner: JON-132, with JON-133 integrated recovery evidence. A18 observes that a
new collector after a completed operation recovers the domain-retained approval
and committed outcome, but not the execution-intent receipt. Intent is recorded
only in the lost collector, and committed resume returns before issuing intent.
The effect remains exactly once and the authoritative outcome is recovered.
This does not invalidate the required approval reconciliation fix; it limits a
claim of full historical collector reconstruction. Preserve the limitation or
design retained intent evidence without fabricating historical receipts.

### R3 — Resolved host prerequisite: Bubblewrap AppArmor failure

Owner: host administration for repair; JON-134 for broader isolation acceptance.
Both real probes initially failed with:

```text
bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted
```

Fresh kernel evidence shows `/usr/bin/bwrap` transitioning from `unconfined` to
`unprivileged_userns`, then `setpcap` and `net_admin` denied. User namespaces
themselves are enabled. Shell history records a prior global sysctl workaround;
its purported persistent file is absent, and its historical success/removal
cannot be established. No dedicated Bubblewrap profile was installed.

At the owner's request, this reviewer saved standing Codex instructions pointing
to `/home/cornholio/Documents/Bubblewrap-Recovery.md`, and prepared and validated
the upstream AppArmor 4.0 profile. Automatic approval review initially rejected
this session's installation attempt, so it did not execute. Another active
session subsequently installed the prepared profile and updated the shared
recovery record. This reviewer preserved that work and did not retry the denied
privileged action or change host policy.

Independent follow-up verified the installed profile's SHA-256 as
`a964037f6cf0df1099f14226b037eaedde6237c86e715188e93eb460b30be859`, a normal
sandboxed terminal running as uid 1000 under `bwrap//&unpriv_bwrap (enforce)`,
and `kernel.apparmor_restrict_unprivileged_userns=1`. Both actual project
isolation commands now pass on Node 22 and 24 against the frozen candidate.
The host listener runs outside Codex's outer network sandbox through approved
execution; each test retains its own Bubblewrap sandbox and runs as uid 1000.
No global AppArmor switch, root-run test or alternate-profile bypass was used.
Persistence across an actual reboot has not been tested.

## Reproduction and delivery

Run in `/tmp/concord-jon135-review`, or apply the review patch on the candidate
in another checkout with its Git object available:

```sh
node scripts/verify-agt-candidate.mjs \
  --output /tmp/jon135-review-new-run \
  --node /home/cornholio/.nvm/versions/node/v22.23.2/bin/node \
  --node /home/cornholio/.nvm/versions/node/v24.21.0/bin/node
```

Choose a new output directory. The runner verifies runtime/build inputs against
the pinned candidate, performs a clean install/audit, runs the full suite and
SQL finding probe on each runtime, executes the actual workflows and isolation
checks, saves logs and hashes, and returns nonzero for any failure. Its
`EXECUTED_CHECKS_PASS` label, if reached on a later run, still requires review of
this matrix; it does not silently close missing JON-134 scope.

There are no application interface changes. The only new command interfaces
are the reviewer scripts above. Finger sources/storage and the producer's
working trees remain unchanged. No merge, deployment, Linear status change,
reviewer dispatch, or full constitutional/production acceptance is claimed.

