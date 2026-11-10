# JON-132 physical-row-identifier approval repair receipt — 2026-10-14

Decision impact: No decision change

## Session and contribution record

- Accountable human: J.
- Builder session: `01a13917-9fc5-7af1-a368-9d005e4c84f4`.
- Coordinator-selected route: `gpt-daybreak-blue-latest`, high reasoning.
- Contribution: bounded implementation and producer-side verification of the
  trusted-SQL physical-row-identifier approval-preservation repair. This builder
  is not the independent verifier, master integrator, release steward or accepting
  authority.
- Worktree: `/home/cornholio/.codex/worktrees/468d/concord`.
- Branch: `codex/jon132-rowid-approval-repair-20261014`.
- Exact source base: `55c91208a451099609af6b7820a2381c99f6f6dd`.
- Cached `origin/Develo`: `4b6e41fd8d211746a81e870955e34475e66d02a3`.
- Remote synchronization: not performed; no fetch or download was authorized for
  this repair. Remote state therefore remains unverified.

## Authority, evidence and ownership boundary

The owner authorized this isolated proposed repair after the separate JON-135
Daybreak review reproduced approval loss on the exact source base. The finding is
recorded in [JON-135 comment b7159e51](https://linear.app/jons-garage/issue/JON-135#comment-b7159e51-31b3-4579-8885-bb40f3c9f082).

Original retained reviewer evidence was verified before implementation and was not
modified:

- `/tmp/jon135-approval-preservation-20261014-yd7wTB/probe.mjs` — SHA-256
  `6cb27afc699c1e194132aa03687f1078fa0578fb3773e86a20d00d2a38819c09`.
- `/tmp/jon135-approval-preservation-20261014-yd7wTB/report.json` — SHA-256
  `b9638e898a1222d7ded4eb152d98b81128b1f05b53d57f940de8d3f40a431aeb`.

Fresh Linear readback identified JON-132 as **In Review**, assigned to J, with
`55c9120` as the published repair candidate; JON-135 as **In Progress**, assigned
to J, with the October 14 REJECT as its newest comment; and JON-141 as **In Review**,
assigned to J. The historical JON-141 writer session could not be resolved locally,
which is not proof of absence. Current repository rules expressly say historical
writer assignments are not proof of an active writer. No affirmative evidence of a
second active implementation writer was found. This branch is therefore a proposed
JON-132 delta only and does not replace the designated master integrator.

## Intended repair and verification

Planned owned paths:

- `src/governance/sandbox/runtime.js`
- `test/agt-audit-regressions.test.js`
- this technical receipt

The minimum cause fix will reject trusted SQL attempts to update SQLite's physical
row identifier aliases (`rowid`, `_rowid_`, `oid`) on approved operations, independent
of the mutable `recursive_triggers` setting. Focused coverage will exercise all six
alias/pragma attack combinations, two normal lifecycle controls, preservation before
and after reopen, replay idempotency, and the existing collector-conflict behavior.

Planned checks: focused eight-case matrix, the complete audit-regression file,
`npm run governance:test`, `npm run check`, `npm test`, and `git diff --check`, with
applicable suites on the installed Node 22.23.2 and 24.21.0 runtimes. Existing locked
dependencies may be reused locally without install, lockfile change or download.

## Implemented repair

`GovernanceSandbox` now installs `approval_rowid_immutable`, a `BEFORE UPDATE OF`
trigger covering `rowid`, `_rowid_` and `oid` on the `operations` table. It rejects
physical-row-identity mutation before SQLite can apply `UPDATE OR REPLACE` conflict
resolution. The protection does not depend on `PRAGMA recursive_triggers`, and the
normal pending-to-committed update does not name any protected alias.

The focused regression matrix contains six attack cases (three aliases under both
recursive-trigger settings) and two normal lifecycle controls. Each attack case
captures the committed and pending operation rows, evidence, results, reservation,
record, audit rows, delivery markers and collector receipts; verifies exact
preservation after rejection and reopen; replays the first committed operation
without an additional effect; then commits and replays the second operation exactly
once. The controls exercise the same normal lifecycle and replay behavior without
the attack. Existing collector replacement/conflict tests remain unchanged.

No fixture, admission contract, dependency, lockfile, integration pin, schema table,
accepted decision or unrelated behavior was changed.

## Producer verification

All commands passed from this worktree using the exact source base plus the proposed
uncommitted diff:

| Check | Node 22.23.2 / SQLite 3.51.3 | Node 24.21.0 / SQLite 3.53.4 |
| --- | --- | --- |
| Focused six-attack/two-control matrix | 8/8 pass | 8/8 pass |
| `test/agt-audit-regressions.test.js` | 27/27 pass | 27/27 pass |
| `npm run governance:test` | 63/63 pass | Covered by full suite |
| `npm run check` (includes integration check) | pass | pass |
| `npm test` | 219/219 pass | 219/219 pass |

Additional checks: `npm run decisions:check` passed with 65 decisions and 264 source
records valid and no summary drift; `git diff --check` passed. Both runtimes used
`@microsoft/agent-governance-sdk` 5.0.0. Dependencies were reused from the clean
exact-candidate worktree only after confirming identical lockfile bytes; no install,
download, lockfile edit or other-worktree modification occurred.

## Patch manifest and digests

All digests are SHA-256 of the final file bytes unless noted:

| Path | Change | SHA-256 |
| --- | --- | --- |
| `src/governance/sandbox/runtime.js` | one physical-row-alias immutability trigger | `63d9e584cc5a5ffbdfc1d71eac930343da127169556798652011d54cb16ba394` |
| `test/agt-audit-regressions.test.js` | eight focused regressions and local assertions/helpers | `b3286d3c214d43a9953a411d4a79334a40280c1144049a1d4e981181a90727ab` |
| `docs/decisions/JON132_ROWID_REPAIR_20261014.md` | this technical receipt | report final digest separately after the receipt is closed |
| `package-lock.json` | unchanged | `bd8e6b6244cb487479574f9f79439e6fbcab7694d46a52ade13a8c66d831954a` |

The binary-capable Git diff for the two tracked implementation/test files is 89
insertions, zero deletions and has SHA-256
`c4334bed5dc3d3fea367ff1be978e77d9da37afdb978ead478ef534d8bff6fcb`.

## Risks, limits and independent verification handoff

This is defense in depth against direct trusted internal SQL. It is not evidence of
ordinary-agent SQL access, a remote authorization bypass, protection after a
privileged actor removes triggers or replaces database files, production readiness,
or qualifying CON-070 independence. The existing local-sandbox, collector and
production-boundary limitations remain.

Independent verification should bind the exact base and final digests above, inspect
the uncommitted three-file patch, rerun the focused eight-case command on both Node
versions, then run the complete audit/governance checks needed for its own verdict.
The verifier must not repair the candidate or count this producer evidence as its own.

## Delivery state and stopping point

- Local save: complete in this managed worktree.
- Commit: **pending**; no specific commit authorization was provided. The exact next
  action after independent verification is owner/integrator authorization to commit
  this reviewed proposed delta, if desired.
- Push / pull request update: not performed or authorized.
- Independent review / acceptance: pending; this builder does not approve its work.
- Merge / canonical integration / deployment: not performed or authorized.
- Linear: the complete producer handoff was posted to
  [JON-132 comment 4710a815](https://linear.app/jons-garage/issue/JON-132#comment-4710a815-c5be-41b9-b73e-0c45834de26c),
  and a concise verifier pointer was posted to
  [JON-135 comment f5189e05](https://linear.app/jons-garage/issue/JON-135#comment-f5189e05-0b6f-4d7e-b6a2-9f8ae5eba9b5).
  Both were read back with exact bodies and top-level `parentId: null`; no status or
  assignment was changed.

Stop after that bounded evidence delivery. Do not self-accept, commit, push, merge,
deploy, change issue status/assignment, or modify production data or system policy.
