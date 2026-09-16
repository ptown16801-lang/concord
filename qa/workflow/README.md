# Coding-session runtime preflight

Run the dependency-free preflight from the repository root:

```sh
node qa/workflow/jon90-preflight.mjs
```

The command requires Node.js 22.5 or newer. Concord coding-session environments should select Node 22 by default; an ad hoc invocation with Node 22 does not demonstrate that the environment default is configured correctly. The repository's existing verification policy also tests Node 24, so changes to this preflight should be checked with both supported runtime lines.

The preflight opens only an in-memory `node:sqlite` database, verifies a simple query, and prints JSON containing the selected Node version and executable path plus the local Git branch and HEAD. It does not inspect or print credentials, environment variables, or remote URLs.

Run its focused tests with:

```sh
node --test qa/workflow/jon90-preflight.test.mjs
```

A successful report proves that the local runtime, SQLite API, and checkout meet the preflight requirements. It does not prove that the coding session can deliver a native reviewable diff or pull request; confirm that separately through the coding-session handoff.
