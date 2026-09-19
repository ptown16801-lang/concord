# Coding-session runtime preflight

Run the dependency-free local compatibility check from a Git checkout:

```sh
node qa/workflow/runtime-preflight.mjs
```

It requires Node.js >=22.5, opens an in-memory `node:sqlite` database, verifies a query, and reports the selected Node version, executable path, local Git branch, and HEAD as JSON. A detached HEAD is supported and reports an empty branch. Success is written to stdout; failures produce a JSON error on stderr and exit with status 1. Node may also emit its SQLite experimental warning on stderr.

The check uses no saved environment, profile, approval packet, native-delivery proof, or issue status. Node 24 is supported; no particular compatible major version must be saved as the default. The command does not inspect credentials, environment variables, or remote URLs, contact a service, or write a database to disk.

```sh
node --test qa/workflow/runtime-preflight.test.mjs
npm test
npm run check
git diff --check
```

The existing CI matrix runs the full suite on Node 22 and 24, including these tests. A successful report describes local compatibility and checkout state only; it does not authorize product work or attest a delivery provider.

This generalizes the runtime-only portion of PR #5 (`87c484861cbbf4bd7b994e40db3071e0e9823c19`). Its `jon90-preflight` name, saved Node 22 default requirement, and separate native-delivery approval wording are superseded here. JON-90, saved environments, and native delivery are not mandatory gates for normal Linear work. The [retired dispatch policy](../dispatch/README.md) from PR #11 is not required either. Those draft PRs remain historical proposals and are not modified or merged by this correction.

Existing product security controls remain in force: trusted identity boundaries, filesystem containment and permissions, DOM redaction, immutable artifacts, and audited purge. This workflow correction does not resume held product implementation or change permissions, billing, or models.
