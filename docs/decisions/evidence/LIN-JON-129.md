# Evidence snapshot: Validate processing grid dimensions

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-129/validate-processing-grid-dimensions
- Version: 2026-09-23T14:34:01.000Z
- Source date: 2026-09-23T14:34:01.000Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Canonical recovered candidate — September 23, 2026

<pull-request id="a252b39a-e2af-4391-ab5d-cfdbe489150e" href="https://linear.app/jons-garage/review/jon-129-recover-positive-integer-processing-grid-validation-d10c15023fe2">ptown16801-lang/concord#38</pull-request> at `b81cca12f6d5cde714f30031a8a78dab95d97daf` is the single <issue id="9cb7b58e-2244-4799-a544-82b397d6a382" href="https://linear.app/jons-garage/issue/JON-129/validate-processing-grid-dimensions">JON-129</issue> candidate. Accountable human: J. Execution/recovery owner: local Codex coordination session `01a0ce71-5711-7d91-88f2-cd9175165ccc`.

The cloud inventory found twelve ready attempts changing the same two files. Compared existing results and recovered `task_e_6ab33062461c83258f424a64e7b46bf8`, which has the same production fix as the latest attempt and broader tests. Both resulting file blobs exactly match that exported patch:

* `src/finger/processing/processor.js`: `59af301b7a3991f2f994e41707a7ae543a8dbdab`
* `test/finger-processing.test.js`: `37c99e4c5cbe45bb026b7870fb2e8bfc8740ca66`

Export SHA-256: `6d368c5846401b5282463406e016e540453b223def4b1082090cd7a79c2db4d2`. Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`. Local isolated checkout: `/tmp/concord-jon129-recovery`.

Validation: all 25 tests pass independently on Node 22.23.2 and 24.21.0; syntax and whitespace checks pass. Rejects fractional, zero, negative, string, null, NaN and infinite dimensions; valid integer grids are retained. All four GitHub Node 22/24 CI jobs pass on published head b81cca12f6d5cde714f30031a8a78dab95d97daf: [PR CI](<https://github.com/ptown16801-lang/concord/actions/runs/35868518179>), [push CI](<https://github.com/ptown16801-lang/concord/actions/runs/35868480592>). In Review indicates delivery, not owner acceptance.

Retain older cloud attempts as historical evidence; do not restart or apply them alongside this patch. Codex delegation is cleared while local recovery owns the handoff. <issue id="750a2b17-6734-47c9-b999-10039fc5f30d" href="https://linear.app/jons-garage/issue/JON-141/reconcile-audited-cross-branch-governance-and-workflow-conflicts">JON-141</issue> alone owns combined integration/shared wiring; it has been notified of this two-file delivery. Finger's deployable beta remains complete.

## Original scope

Investigate whether fractional positive `columns` or `rows` values can produce invalid processing grids in `src/finger/processing/processor.js`. Require valid positive integer dimensions if current behavior can produce zero-sized or otherwise invalid grids. Add focused tests in `test/finger-processing.test.js`. Keep the change limited to processing-option validation and tests.
