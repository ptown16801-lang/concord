# Evidence snapshot: Validate processing grid dimensions

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `3f5dc84bd5b1ad0a922f9c72621749bc3e3edaba`; original SHA-256: `621a53c42009ff00c7f6197b8c66f00a4df1232dcb4c0afdfb5e845fcc82ff26`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-23T14:34:01.000Z
- Source date: 2026-09-23T14:34:01.000Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Canonical recovered candidate — September 23, 2026

ptown16801-lang/concord#38 (private source reference withheld) at `b81cca12f6d5cde714f30031a8a78dab95d97daf` is the single JON-129 (private source reference withheld) candidate. Accountable human: J. Execution/recovery owner: local Codex coordination session `[private session identifier withheld]`.

The cloud inventory found twelve ready attempts changing the same two files. Compared existing results and recovered `[private recovery task identifier withheld]`, which has the same production fix as the latest attempt and broader tests. Both resulting file blobs exactly match that exported patch:

* `src/finger/processing/processor.js`: `59af301b7a3991f2f994e41707a7ae543a8dbdab`
* `test/finger-processing.test.js`: `37c99e4c5cbe45bb026b7870fb2e8bfc8740ca66`

Export SHA-256: `6d368c5846401b5282463406e016e540453b223def4b1082090cd7a79c2db4d2`. Base: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`. Local isolated checkout: `/tmp/concord-jon129-recovery`.

Validation: all 25 tests pass independently on Node 22.23.2 and 24.21.0; syntax and whitespace checks pass. Rejects fractional, zero, negative, string, null, NaN and infinite dimensions; valid integer grids are retained. All four GitHub Node 22/24 CI jobs pass on published head b81cca12f6d5cde714f30031a8a78dab95d97daf: [PR CI](<https://github.com/ptown16801-lang/concord/actions/runs/35868518179>), [push CI](<https://github.com/ptown16801-lang/concord/actions/runs/35868480592>). In Review indicates delivery, not owner acceptance.

Retain older cloud attempts as historical evidence; do not restart or apply them alongside this patch. Codex delegation is cleared while local recovery owns the handoff. JON-141 (private source reference withheld) alone owns combined integration/shared wiring; it has been notified of this two-file delivery. Finger's deployable beta remains complete.

## Original scope

Investigate whether fractional positive `columns` or `rows` values can produce invalid processing grids in `src/finger/processing/processor.js`. Require valid positive integer dimensions if current behavior can produce zero-sized or otherwise invalid grids. Add focused tests in `test/finger-processing.test.js`. Keep the change limited to processing-option validation and tests.
