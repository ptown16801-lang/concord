# Local reference artifact verification

This first coding slice of [JON-28](https://linear.app/jons-garage/issue/JON-28/concord-artifact-archive)
checks local reference artifacts against an explicit manifest. It does not upload
files, fetch canonical URLs, verify remote delivery, or publish authoritative records.
The Research Library remains the owner of scientific PDFs and GOV identities.

Run from the repository root with Node 22.5 or newer:

```sh
node scripts/verify-artifact-manifest.js /path/to/manifest.json /path/to/artifacts
```

The manifest is JSON with `schemaVersion: 1` and an `artifacts` array. Each entry
requires a unique nonempty `id`, `filename`, `canonicalLocation`, `provenance`,
64-character hexadecimal `sha256`, and `delivery.status`. Recorded delivery status
is `pending`, `prepared`, or `delivered`; `delivered` also requires a nonempty
`delivery.evidence` reference. These fields are supplied historical metadata,
not facts certified by the verifier. Optional fields are `localPath` (relative to
the explicit artifact root) and `byteLength` (a nonnegative safe integer).

Example entry shape (replace the placeholder digest before use):

```json
{
  "schemaVersion": 1,
  "artifacts": [{
    "id": "build-report-v1",
    "filename": "report.txt",
    "localPath": "reports/report.txt",
    "canonicalLocation": "https://example.invalid/artifacts/report-v1",
    "provenance": "Build report generated from a recorded source commit",
    "sha256": "REPLACE_WITH_64_HEX_CHARACTERS",
    "delivery": { "status": "prepared" }
  }]
}
```

JSON output contains `ok` and a result for each artifact:

- `verified`: the local bytes match the digest and optional size.
- `mismatch`: the digest or size differs.
- `unavailable`: no local path was supplied or the file is missing.
- `error`: the path escapes the root, is not a regular file, cannot be read, or
  the file's size/modification metadata changes while it is read.

`recordedDelivery` is copied separately. Matching local bytes never upgrades a
prepared upload to delivered. The verifier leaves files and metadata unchanged.
Exit codes are 0 for all verified (including an empty inventory), 1 for an
incomplete/mismatched/error report, and 2 for invalid input or invocation.

Use an operator-controlled, stable local directory. Absolute and traversal paths
and resolved symlinks outside the root are rejected. This is not a filesystem
sandbox against concurrent hostile parent-directory replacement, or an atomic
snapshot of the inventory. Hashes establish byte equality, not authenticity of
the manifest or the truth of its provenance/delivery claims. No remote content is
accessed, and an unavailable artifact does not prevent checking other entries.

Focused verification: `node --test test/artifact-manifest.test.js`.
