# Evidence snapshot: AGT C — domain writer, transactional capability use and durable audit

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `f6f6fa380752d73f25ebfcbc864051bf92914abe`; original SHA-256: `f80b09bb7be3d44321c18719e64edc6797eaf50b0742a44c7bb4e20f7c789c11`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-24T05:28:23.762Z
- Source date: 2026-09-24T05:28:23.762Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current published candidate and ownership — September 23, 2026

The current shared sandbox artifact is ptown16801-lang/concord#34 (private source reference withheld) at `7ba5bc5c5a975d72298540e9aa776504d5b4f263`. It is published, not local-only. J remains accountable. Existing JON-141 (private source reference withheld) session `[private session identifier withheld]` is the sole remaining writer for this PR and aggregate integration; route corrections through that existing owner and the relevant JON-130 (private source reference withheld)–134 scope, without a second producer.

Producer handoff (private source reference withheld) records 67 tests on Node 22/24 and passing published CI on this revision. These are supplied producer results. Linear's bounded correction PASS on `2d5c55d` does not constitute full independent acceptance of `7ba5bc5`. JON-135 (private source reference withheld) retains the existing independent reviewer and formal JON-133 (private source reference withheld)/JON-134 (private source reference withheld) completion dependencies. Broader production boundaries and original acceptance criteria below remain open.

## Historical delivery and audit checkpoints

Older commit IDs, local-only statements, test counts and provisional ownership below describe their recorded snapshots; they are not the current handoff.

## Uploaded candidate — September 23, 2026

Source and committed audit documentation are now remotely accessible in ptown16801-lang/concord#34 (private source reference withheld), targeting Develo from JON-138 (private source reference withheld)-governance-audit-remediation. Exact candidate: [b332c2309e123bd05099d4f9fcfd3bd202bdb0fa](<https://github.com/ptown16801-lang/concord/commit/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa>).

This supersedes earlier “not pushed”/local-only access notes. GitHub requires a pull request, so the protected Develo branch was not changed. Producer evidence: clean install, 65 tests passing, real Linux isolation and confined workflow checks passing; dependency audit reports zero findings. [Audit record](<https://github.com/ptown16801-lang/concord/blob/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa/docs/GOVERNANCE_AUDIT_2026-09-23.md>) and [runbook](<https://github.com/ptown16801-lang/concord/blob/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa/docs/GOVERNANCE_SANDBOX.md>) are included. Independent acceptance under JON-135 (private source reference withheld) remains pending. No merge or production readiness is claimed.

## Current review candidate — September 23, 2026

`b332c2309e123bd05099d4f9fcfd3bd202bdb0fa` supersedes `76f331e`. Further adversarial inspection identified replacement through SQLite's hidden row identifiers; the producer added explicit guards and regression coverage for rowid, *rowid* and oid under both recursive_triggers settings. The archived candidate is locally accessible at /tmp/concord-audit-candidate-bzy7cv5j (not pushed).

Clean offline npm ci, all 65 regression tests, actual Linux isolation and confined workflow probes passed on this exact candidate. JON-135 (private source reference withheld)'s separate reviewer has been notified to evaluate this revised commit. Independent acceptance remains pending; original observations and earlier candidate records below are historical.

## Audit remediation delivered for review — September 23, 2026

Local fixed candidate: `76f331ee721f832574ddfd6d3dd5439cd5724909` (not pushed). This supersedes the open-finding baseline below for implementation status only; independent acceptance is pending.

JON-130 (private source reference withheld) delivered immutable full signed policy bundles bound by approval digest, offline policy-provenance verification using separately trusted roots, and sanitized denial correlation/time/stage/actor-verification state. JON-132 (private source reference withheld) consumed that evidence contract and added explicit replacement guards plus idempotent reconciliation of all retained local audit records before resume. JON-133 (private source reference withheld) exercised collector replacement/conflict, expiry/revocation/restart, full regressions and real confinement against the committed candidate.

Evidence: clean `git archive` candidate at /tmp/concord-audit-candidate-58hegkv0; `npm ci --offline --ignore-scripts --cache /tmp/concord-npm-cache`; `npm test` 65/65 passing (six new audit regressions); current `npm audit --json` zero vulnerabilities; real `node examples/agt-local/isolation.js` and `node examples/agt-local/isolated-workflow.js` passed on that candidate. Syntax and whitespace checks pass. Scope remains the local sandbox; all-history reconciliation is intentionally linear, and legacy approvals cannot retroactively recover a lost policy signature.

Producer changes are complete for this bounded audit follow-up. JON-135 (private source reference withheld) now has a separate local reviewer with access to the immutable candidate; review does not yet constitute full independent acceptance or broader original issue completion.

## Required audit follow-up — September 23, 2026

These requirements incorporate the owner's instruction and Linear's task-placement guidance (private source reference withheld). See the reproduced findings (private source reference withheld) and severity review (private source reference withheld).

Current baseline is local Git commit `ea3c0486a3440d2547837eaeef1de59d67525620`, including `docs/GOVERNANCE_AUDIT_2026-09-23.md`; it has not been pushed. This supersedes earlier uncommitted-candidate wording below. All four findings remain open. The prior 59 passing tests are regression evidence, not acceptance of these cases. Earlier claims of immutable storage and a full signed-policy snapshot are qualified by findings 1 and 3.

Own findings 1 and 2 within this existing task; both block local sandbox acceptance.

- [ ] Finding 1 — Medium, database invariant gap. Reject INSERT OR REPLACE attempts against protected approval/operation and audit rows under both recursive_triggers settings. Tests must prove approval, reservation, operation status and audit payload remain unchanged. The reproduced bypass requires trusted SQL write access; do not describe it as a demonstrated remote authorization bypass or protection against an administrator replacing files/removing schema.
- [ ] Finding 2 — Medium–High, collector recovery/history consistency. Reproduce approval and successful audit delivery, collector replacement/data loss, then resume. Reconcile/replay required approval evidence or pause safely; never silently commit with missing approval history, cancel the approval, or duplicate effects. Distinguish history loss from ordinary temporary outage.
- [ ] Consume JON-130 (private source reference withheld)'s archived-policy/evidence contract, add focused regressions for these findings, and provide exact fix commit and outcomes to JON-133 (private source reference withheld)/JON-135 (private source reference withheld).

Acceptance sequence is JON-130 (private source reference withheld) → JON-132 (private source reference withheld) → JON-133 (private source reference withheld) → JON-135 (private source reference withheld). This update does not start a worker. Production remote-collector guarantees and privileged tamper recovery remain outside the local claim.

## Local sandbox delivery — September 23, 2026

Implemented locally under Concord parent JON-138 (private source reference withheld); no new project or remote coding worker. Incorporated Linear's advisory reply on JON-138 (private source reference withheld): immutable full authority/policy snapshot, reservation/version binding, local-only collector availability guarantee, atomic domain outcome/outbox, and idempotent delivery. Nonce consumption belongs to admission; operation status transition and reservation release are the one-use execution marker committed with mutation.

Verification: 59 tests pass (23 existing Finger, 12 admission, 24 sandbox); clean offline npm ci from the lockfile and the same 59 tests pass in a separate candidate directory; current online npm audit reports zero vulnerabilities. Actual SIGKILL recovery tested before mutation and after domain commit/before delivery. Linux bubblewrap probe passed protected-path denial, read-only runtime and host-network denial. Integrated confined-agent demo passed signed request through pipe → trusted runtime → audit outage pause → one commit after recovery.

Files: src/governance/sandbox/runtime.js; examples/agt-local/; test/agt-sandbox.test.js; docs/GOVERNANCE_SANDBOX.md. Existing contracts/admission.js and admission kernel preserved. Run npm run governance:demo, governance:test, governance:isolation, governance:isolated-demo.

Candidate is LOCAL AND UNCOMMITTED above Git HEAD 40f647e5b8d23307f713fc3a3753a1d3a46611cb, not a remote PR. Fixed file manifest: /tmp/concord-governance-candidate-se4jsdkm/CANDIDATE-MANIFEST.json, SHA-256 1911f0e075d907485747dbb5ec4a310856703c28356a68e448fb42a40df78a7d. This is an artifact fingerprint, not a commit SHA. Remote reviewers cannot assume access.

Still open: production gateway/mediator/authorization/writer separation and authenticated network transport; real registry/succession and Archivist integration; remote collector guarantees; backup/tamper recovery; independent acceptance under JON-135 (private source reference withheld). No production readiness claim. No approved operation cancellation/deadline introduced. Local synthetic milestone delivered for review; broader original issue acceptance is not asserted.

## Current sandbox authorization

Owner now authorizes the present Codex session to implement and test the local synthetic integration sandbox under Concord. This supersedes earlier planning-only wording for this bounded scope. No remote session is dispatched. Approval cannot be canceled; later expiry/revocation affects new admission only; audit collector outage pauses approved work. Independent review and full production readiness must not be claimed by this implementer.

## Deliverable

Isolated test-domain read/write services with durable operation records and crash-safe audit/outbox persistence.

## Scope / file ownership

Own src/governance/storage/*, audit/*, test-domain migrations and their tests. Use dedicated test-domain SQLite databases and object directories, separate from Finger. Accept the capability-verifier interface from A/B; fixtures may support parallel development, but real verification is mandatory in D. Atomically check expected version, consume the one-use capability, update state and write durable commit/outbox evidence. Define idempotent retries so duplicate delivery cannot duplicate effects. Capture denied attempts separately, and enforce failure behavior if durable admission/audit evidence cannot be established.
Preserve domain-local writer authority and JON-35 (private source reference withheld) admitted-operation semantics. No shared all-domain credentials or public ledger writer. Audit data is protected security evidence, not public publication. Full Archivist envelopes/publication/failure-disclosure ledger semantics remain owned by JON-18 (private source reference withheld); this issue provides the integration boundary only.

## Acceptance

Concurrent replay yields at most one effect; stale versions and wrong-domain requests produce no mutation; crash injection before/after commit leaves recoverable outcome and audit evidence. Restart, audit storage failure, outbox retries and corruption produce explicit safe behavior. Tamper detection uses protected external checkpoints where claimed; a self-contained hash chain is not proof against privileged rewriting. Tests prove no writes to Finger stores.

## Ownership and execution

Accountable human: J. Proposed executor: Codex, one bounded session for this issue when selected for execution. This is a planning record, not an active delegation or dispatch. The September 23 owner request authorizes this implementation plan; it does not release the wider Concord execution hold or re-enable Concord Linear Coding Sessions. No recursive delegation, duplicate starts, or supervisor issues. Check current owner instructions and existing work before starting.

Use ptown16801-lang/concord. Reuse existing branches/artifacts. Return PR/diff, exact commit SHA, test commands/results, remaining limitations, and interface changes to this issue. Move delivered work to In Review; Done requires review acceptance. Do not claim production enforcement from a mock test. Preserve Finger behavior and storage separation.
