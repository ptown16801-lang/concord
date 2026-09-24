# Evidence snapshot: AGT E — Linux process isolation and recovery boundary

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary
- Version: 2026-09-23T14:32:28.151Z
- Source date: 2026-09-23T14:32:28.151Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current published candidate and ownership — September 23, 2026

The current shared sandbox artifact is <pull-request id="4cc2c125-740c-4ab6-a99e-c0f944440961" href="https://linear.app/jons-garage/review/add-concord-governance-sandbox-and-audit-remediation-4889b1a6c5c1">ptown16801-lang/concord#34</pull-request> at `7ba5bc5c5a975d72298540e9aa776504d5b4f263`. It is published, not local-only. J remains accountable. Existing <issue id="750a2b17-6734-47c9-b999-10039fc5f30d" href="https://linear.app/jons-garage/issue/JON-141/reconcile-audited-cross-branch-governance-and-workflow-conflicts">JON-141</issue> session `01a0ce1f-4d47-7a91-b5a6-a28c8fc46d12` is the sole remaining writer for this PR and aggregate integration; route corrections through that existing owner and the relevant <issue id="6005bf0d-9260-4aed-87c8-cd4619497a9c" href="https://linear.app/jons-garage/issue/JON-130/agt-a-reconcile-security-contracts-and-implement-policy-adapter">JON-130</issue>–134 scope, without a second producer.

[Producer handoff](<https://linear.app/jons-garage/issue/JON-141#comment-38621d3c-4515-426c-b298-91177fb6c026>) records 67 tests on Node 22/24 and passing published CI on this revision. These are supplied producer results. Linear's bounded correction PASS on `2d5c55d` does not constitute full independent acceptance of `7ba5bc5`. <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue> retains the existing independent reviewer and formal <issue id="199d1e88-9d51-4774-a169-9c67a3648ebc" href="https://linear.app/jons-garage/issue/JON-133/agt-d-local-governed-agent-end-to-end-harness">JON-133</issue>/<issue id="b4c2a4bd-a9ab-4d1f-84a8-25707d0355cb" href="https://linear.app/jons-garage/issue/JON-134/agt-e-linux-process-isolation-and-recovery-boundary">JON-134</issue> completion dependencies. Broader production boundaries and original acceptance criteria below remain open.

## Historical delivery and audit checkpoints

Older commit IDs, local-only statements, test counts and provisional ownership below describe their recorded snapshots; they are not the current handoff.

## Local sandbox delivery — September 23, 2026

Implemented locally under Concord parent <issue id="9e6621ef-e8ea-4c18-9f97-5440c5d22343" href="https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox">JON-138</issue>; no new project or remote coding worker. Incorporated Linear's advisory reply on <issue id="9e6621ef-e8ea-4c18-9f97-5440c5d22343" href="https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox">JON-138</issue>: immutable full authority/policy snapshot, reservation/version binding, local-only collector availability guarantee, atomic domain outcome/outbox, and idempotent delivery. Nonce consumption belongs to admission; operation status transition and reservation release are the one-use execution marker committed with mutation.

Verification: 59 tests pass (23 existing Finger, 12 admission, 24 sandbox); clean offline npm ci from the lockfile and the same 59 tests pass in a separate candidate directory; current online npm audit reports zero vulnerabilities. Actual SIGKILL recovery tested before mutation and after domain commit/before delivery. Linux bubblewrap probe passed protected-path denial, read-only runtime and host-network denial. Integrated confined-agent demo passed signed request through pipe → trusted runtime → audit outage pause → one commit after recovery.

Files: src/governance/sandbox/runtime.js; examples/agt-local/; test/agt-sandbox.test.js; docs/GOVERNANCE_SANDBOX.md. Existing contracts/admission.js and admission kernel preserved. Run npm run governance:demo, governance:test, governance:isolation, governance:isolated-demo.

Candidate is LOCAL AND UNCOMMITTED above Git HEAD 40f647e5b8d23307f713fc3a3753a1d3a46611cb, not a remote PR. Fixed file manifest: /tmp/concord-governance-candidate-se4jsdkm/CANDIDATE-MANIFEST.json, SHA-256 1911f0e075d907485747dbb5ec4a310856703c28356a68e448fb42a40df78a7d. This is an artifact fingerprint, not a commit SHA. Remote reviewers cannot assume access.

Still open: production gateway/mediator/authorization/writer separation and authenticated network transport; real registry/succession and Archivist integration; remote collector guarantees; backup/tamper recovery; independent acceptance under <issue id="89712dda-5b58-4c0e-b2db-e33795c4c3fe" href="https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report">JON-135</issue>. No production readiness claim. No approved operation cancellation/deadline introduced. Local synthetic milestone delivered for review; broader original issue acceptance is not asserted.

## Current sandbox authorization

Owner now authorizes the present Codex session to implement and test the local synthetic integration sandbox under Concord. This supersedes earlier planning-only wording for this bounded scope. No remote session is dispatched. Approval cannot be canceled; later expiry/revocation affects new admission only; audit collector outage pauses approved work. Independent review and full production readiness must not be claimed by this implementer.

## Deliverable

A reproducible Linux deployment fixture and operational runbook separating agent, institutional gateway/mediator, domain authorization, read service and writer privileges.

## Scope / file ownership

Own deploy/agt-linux/\*, isolation integration tests and recovery runbook. Select concrete Linux service users/permissions or containers, document the choice, and demonstrate multiple isolated test domains. Only the relevant writer receives database write credentials/mounts. Agents cannot open protected data/key paths, bypass gateway sockets or access unrelated domains over the network. Restrict egress and administrative sockets; no host-root or shared all-domain application credential. Protect backups with the same domain boundaries. Service-manager stop hooks enforce termination independently of cooperative SDK callbacks.

## Acceptance

Run as the actual restricted agent UID/container: direct database/key reads and writes, forged IPC, cross-domain calls and network bypass all fail. Authorized read/write still succeeds. Demonstrate process crash, restart, compatible policy rollout, mismatch denial, domain freeze/evidence preservation and authorized recovery. Unaffected domains continue only where dependencies remain trustworthy. Record actual Linux evidence; missing privileges yield a documented blocker, never a claimed pass. Test environment only; production rollout is outside this issue.

## Ownership and execution

Accountable human: J. Proposed executor: Codex, one bounded session for this issue when selected for execution. This is a planning record, not an active delegation or dispatch. The September 23 owner request authorizes this implementation plan; it does not release the wider Concord execution hold or re-enable Concord Linear Coding Sessions. No recursive delegation, duplicate starts, or supervisor issues. Check current owner instructions and existing work before starting.

Use ptown16801-lang/concord. Reuse existing branches/artifacts. Return PR/diff, exact commit SHA, test commands/results, remaining limitations, and interface changes to this issue. Move delivered work to In Review; Done requires review acceptance. Do not claim production enforcement from a mock test. Preserve Finger behavior and storage separation.
