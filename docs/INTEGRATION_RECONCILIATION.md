# Cross-work integration candidate (JON-141)

This branch composes existing deliveries for review after the owner's September
23 conflict audit and “Begin all” instruction. It preserves producer history and
does not confer acceptance, merge authorization, or production readiness.

## Producer inputs

| Component | Exact input | Resolution |
| --- | --- | --- |
| AGT PR #34 | 7ba5bc5c5a975d72298540e9aa776504d5b4f263 | Null/hostile rejection audit, immutable result, zero-reservation/required-result assertions and independent CI matrix jobs retained; SDK 5.0.0 / scoped js-yaml 5.4.2 retained |
| Bootstrap PR #36 | e2e23849a2e5e128f7f46f35712499f16fb98ef9 | Source-discrepancy resumption gate and final membership/source validation retained; shared governance exports combined |
| Finger PR #38 | b81cca12f6d5cde714f30031a8a78dab95d97daf | Canonical recovered positive-integer grid validation and tests; exact two producer blobs retained, no older cloud attempts replayed |
| Population PR #6 | 882dcffb31b520c6f9458984a35745c8b4bfa3b8 | Already included in #36; source pin retained |
| Eligibility PR #7 | 51a102259785a5b53dc6ec4bc4bbca54c4a8fc37 | Already included in #36; reducer pin retained |
| Ballots PR #8 / correction #12 | 5f5a28d46cfa62d1222e74563b1dc8e281b7c73f | Ballot exports added without replacing impeachment exports |
| Electorate PR #9 | a090a67719681b04683f1f87c35d4080ea0854f5 | Dedicated package subpath retained |
| Workflow retirement PR #30 | cdaee6c142040ff267c4700cdbda706f2dfaad29 | Runtime-only preflight; retired gates excluded |
| Archive PR #32 | e7462d860d5c4a17d7d1f6283bc25f23ebf3716a | Source retained; local byte verification only |
| Scheduler PR #33 | e4b979dea42e606bc8ac0b64b458bb084d8ad3a6 | Source retained; injected checker remains synthetic |
| Recovery research PR #35 | a5a6cdaaaf11cf7d3ad6efb48cce6e0b46688838 | Published provenance correction retained |
| Documentation partition PR #27 | 881ce1ef6ca84aba94f293125f2bd8beb74ffb24 | Current routing and original reference files retained |

The combined package preserves all producer exports and syntax-check targets,
plus the SDK dependency/override and governance demo scripts. CI installs the
lockfile before testing. README and CHANGELOG are consolidated current summaries;
the linked input commits retain the full original records.

## One eligibility history for the bootstrap slice

The accepted JON-85 input is the older eligibility reducer. `DurableEligibility`
is its authenticated journal wrapper; `ImpeachmentStore` owns that slice's single
durable eligibility command stream. Reconstructing an in-memory reducer from
that stream is a projection, not a second authoritative event store.

The alternative branch `codex/eligibility-durable-authority-20260921` at
638ce897d36226cac79f5d2543ecb11f56bf975b is deliberately excluded. It changes the
same public class to require a separate database, authority configuration, signed
grants and explicit expected versions. It cannot be substituted under the wrapper.
This candidate does not run it alongside the bootstrap journal or migrate either
history. A later adoption needs an explicit log owner, transactional handoff,
authorization/version mapping and tested one-time history migration before pins
change. It is not required to review the presently pinned implementation.

`npm run integration:check` verifies exact population/reducer bytes and exercises
the combined package exports and reducer replay interface. A silent dependency
replacement fails this check with an adapter-reconciliation error. These are
source compatibility pins, not restored project-management dispatch gates.

## Policy precedence and boundaries

PRs #11 and #16 contain retired dispatch-policy machinery and are excluded.
The runtime check from #30 remains. A future planner must be ported against this
policy without reintroducing native-delivery, saved-environment or JON-90 gates.
Historical drafts are preserved, not automatically eligible for integration.

Current explicit owner instructions and issue-specific authorizations supersede
stale blanket holds. Completed JON-82/JON-87 reports remain completed. Research
JON-115 stays a separate non-coding workflow without writes to this repository or
Jefferson. Health reconciliation is tracked separately in JON-142.

The modules coexist but are not a production-wide transaction coordinator.
Ballot/close, office/evidence, population lifecycle and real authority adapters
still need their recorded domain acceptance. The AGT sandbox does not silently
authorize constitutional actions, and the scheduler does not use it as a real
checker. Recovery research does not create a remote collector guarantee.

## Validation

The refreshed combined candidate passed all 186 Node test-runner entries on
Node 22.23.2 and 24.21.0: 182 named tests and four scheduler support modules,
with no failures or skips. Clean lockfile installation reported zero
vulnerabilities; combined syntax/API, compatibility and whitespace checks passed.
The refreshed bootstrap source/tests, AGT regression test/CI workflow and both
Finger files match their exact producer blobs. Population and eligibility pins
remain unchanged. Remote CI outcomes are recorded against the published head
on PR #37 and JON-141 separately.

Historical candidate `93eb77bdb1c2e25f1a20be20299b1a95d332f9e8` passed 177 runner
entries and a negative compatibility probe: a changed reducer byte was rejected
and restored. That evidence does not replace verification of the refreshed tree
or independent acceptance of the combined candidate.

Run `npm ci --ignore-scripts`, `npm run check`, `npm run integration:check`, and
`npm test`. Full tests include actual local HTTP, competing writers and process
crashes and may need execution outside a restricted sandbox. Report the tested
head and observed outcomes separately from independent reviews of producer PRs.
