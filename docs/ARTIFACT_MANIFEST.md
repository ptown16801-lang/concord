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

## Reproducible synthetic review fixture

The following example exercises all four outcomes. It contains synthetic bytes
and placeholder canonical locations; no remote archive or delivery is involved.
From the repository root, prepare a fresh temporary directory:

```sh
artifact_demo_dir="$(mktemp -d)"
printf 'Concord reference artifact\n' > "$artifact_demo_dir/report.txt"
mkdir "$artifact_demo_dir/folder"
cat > "$artifact_demo_dir/manifest.json" <<'JSON'
{
  "schemaVersion": 1,
  "artifacts": [
    {
      "filename": "report.txt",
      "canonicalLocation": "https://example.invalid/archive/report",
      "provenance": "Synthetic JON-28 review fixture; not an uploaded artifact",
      "sha256": "4f0a420cce08c4b92e69501aba4f9284e8133530b0d09bae29e57816e7bd1d93",
      "delivery": {
        "status": "prepared"
      },
      "id": "verified",
      "localPath": "report.txt"
    },
    {
      "filename": "report.txt",
      "canonicalLocation": "https://example.invalid/archive/report",
      "provenance": "Synthetic JON-28 review fixture; not an uploaded artifact",
      "sha256": "0000000000000000000000000000000000000000000000000000000000000000",
      "delivery": {
        "status": "prepared"
      },
      "id": "mismatch",
      "localPath": "report.txt"
    },
    {
      "filename": "report.txt",
      "canonicalLocation": "https://example.invalid/archive/report",
      "provenance": "Synthetic JON-28 review fixture; not an uploaded artifact",
      "sha256": "4f0a420cce08c4b92e69501aba4f9284e8133530b0d09bae29e57816e7bd1d93",
      "delivery": {
        "status": "prepared"
      },
      "id": "unavailable",
      "localPath": "missing.txt"
    },
    {
      "filename": "report.txt",
      "canonicalLocation": "https://example.invalid/archive/report",
      "provenance": "Synthetic JON-28 review fixture; not an uploaded artifact",
      "sha256": "4f0a420cce08c4b92e69501aba4f9284e8133530b0d09bae29e57816e7bd1d93",
      "delivery": {
        "status": "prepared"
      },
      "id": "error",
      "localPath": "folder"
    }
  ]
}
JSON
node scripts/verify-artifact-manifest.js "$artifact_demo_dir/manifest.json" "$artifact_demo_dir"
```

Expected exit code: **1**, because only one artifact verifies. Every entry retains
`recordedDelivery.status: prepared`. The generated report is:

```json
{
  "schemaVersion": 1,
  "ok": false,
  "artifacts": [
    {
      "id": "verified",
      "expectedSha256": "4f0a420cce08c4b92e69501aba4f9284e8133530b0d09bae29e57816e7bd1d93",
      "recordedDelivery": {
        "status": "prepared"
      },
      "status": "verified",
      "actualSha256": "4f0a420cce08c4b92e69501aba4f9284e8133530b0d09bae29e57816e7bd1d93",
      "byteLength": 27
    },
    {
      "id": "mismatch",
      "expectedSha256": "0000000000000000000000000000000000000000000000000000000000000000",
      "recordedDelivery": {
        "status": "prepared"
      },
      "status": "mismatch",
      "actualSha256": "4f0a420cce08c4b92e69501aba4f9284e8133530b0d09bae29e57816e7bd1d93",
      "byteLength": 27
    },
    {
      "id": "unavailable",
      "expectedSha256": "4f0a420cce08c4b92e69501aba4f9284e8133530b0d09bae29e57816e7bd1d93",
      "recordedDelivery": {
        "status": "prepared"
      },
      "status": "unavailable",
      "reason": "missing-file"
    },
    {
      "id": "error",
      "expectedSha256": "4f0a420cce08c4b92e69501aba4f9284e8133530b0d09bae29e57816e7bd1d93",
      "recordedDelivery": {
        "status": "prepared"
      },
      "status": "error",
      "reason": "not-regular-file"
    }
  ]
}
```
