# Validation record — 2026-09-24

These are author checks of the decision consolidation/tooling, not qualifying
independent acceptance or product-runtime verification. The candidate base is
`29ca0b44cf8d911df6978e84c7a91e7777afd304`; the resulting commit is given in the final
receipt and resolvable from the dedicated branch. No remote CI was run by this task.

## Executed focused checks

| Command / check | Observed result |
| --- | --- |
| `npm run decisions:generate` | PASS; deterministic CURRENT_DECISIONS.md generated from exact master bytes. |
| `npm run decisions:check` | PASS; 64 entries, 254 registered frozen sources; source digests and local master links pass; summary matches. |
| `node test/decisions.test.js` on Node 24.21.0 | PASS; 9 tests, 0 failures/skips. |
| `node --test --test-reporter=spec test/decisions.test.js` on Node 22.23.2 | PASS; test-file runner completed. Same nine test cases. |
| `npm run decisions:test` on Node 24.21.0 | PASS; focused test-file runner completed. |
| Master/source validation on Node 22.23.2 and 24.21.0 | PASS on both runtimes. |
| `node --check scripts/decisions.mjs` and `node --check test/decisions.test.js` | PASS. |
| Decision-impact parsing of prepared PR body | PASS; prepared PR body accepted by CLI; missing-disposition defect is rejected in tests. |
| Expected HEAD/canonical preflight | PASS; live Develo equals 29ca0b44cf8d911df6978e84c7a91e7777afd304; other local changes/worktrees displayed and reviewed. |
| `git diff --check` | PASS for scoped working changes; staged diff checked before commit. |
| Historical PROJECT_RECORD preservation | PASS; byte-for-byte match to base Git blob. |
| Pre-existing dirty-file digests | PASS; no changes in inventoried user untracked research/review evidence. |
| Targeted accidental-secret scan | No GitHub token, bearer credential, API-key-pattern or private-key-block matches in retained evidence. Pattern scan is not a security certification. |

## Defects the tests must detect

Duplicate/malformed IDs; malformed headings; unsupported statuses; absent acceptance
or sources; unknown source IDs; missing source snapshots/digest changes; broken local
links/decision anchors; missing stable anchors; invalid supersession targets and cycles;
summary drift even after an operative-body-only change; absent/ambiguous/unknown-ID PR
disposition; moved HEAD or canonical tracking ref; and invalid expected revision format.
The CLI test generates an initially absent summary, proves a deterministic second run,
changes only operative text, observes failure, regenerates and observes recovery. It
also observes failure for a PR event without a disposition. Explicit unavailable
historical dates are permitted rather than fabricated.

## Failed evidence and correction history

- Initial generation failed because the master linked to its not-yet-generated summary.
  Fixed generation to allow only that known output to be initially absent; ordinary
  validation still rejects missing summary/local links. Added the bootstrap regression.
- Initial preflight test hit `spawnSync git EPERM` with default stdin piping in this
  sandbox. Explicit ignored stdin and bounded output pipes resolved it; subsequent
  actual Git-fixture checks pass. This was not a Bubblewrap startup or product failure.
- Initial CLI regression expected captured child stderr, which this test environment
  did not expose despite status 1. The test now checks the failure exit and controlled
  regenerate/recheck recovery; pure-validator tests separately assert error categories.
- First live preflight failed sandbox DNS (`Could not resolve host: github.com`).
  The authorized read-only preflight then ran through normal approved escalation,
  verified the actual remote SHA, and passed. This was not hidden by calling cached
  refs a live check. No settings or remote writes occurred.
- Initial staged whitespace check found existing Markdown hard breaks and final blank
  lines inside imported evidence/history. Their bytes were preserved; a narrowly
  scoped .gitattributes rule exempts only those whitespace forms for frozen snapshots.
  Live authored documents/tooling retain normal whitespace checks.

## Scope and limits

Existing CI was amended to run the decision check and PR-body disposition check;
existing `npm test` discovery includes the focused tests. No dependencies were added,
so the lockfile did not change. Product tests were not broadened or rerun. No recurring
automation/hook/service was activated, repository setting changed, or independent
reviewer launched. Remote branch protection, future adherence and ongoing enforcement
remain unverified. Automated validation cannot determine owner acceptance, semantic
completeness, factual correctness, independent lineage or undiscovered later decisions.
