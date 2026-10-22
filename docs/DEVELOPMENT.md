# Development

Start with [development status](PROJECT_STATUS.md) to choose the code you want to inspect. The default branch contains a browser interaction component; other implementations are identified by exact public revisions. A feature in a pull request may not exist in your checkout.

## Requirements and checks

Use Node.js 22.5 or newer on Linux. The repository uses JavaScript ES modules, Node's built-in HTTP server and test runner, and `node:sqlite`. Node may print an experimental SQLite warning on supported versions. The committed lockfile currently declares no external runtime dependencies.

From the repository root:

```sh
npm ci
npm run check
npm test
```

`npm ci` uses the committed lockfile. `npm run check` checks syntax for the configured runtime files; it does not check every file in every branch. `npm test` runs the checked-out Node tests. CI runs Node 22 and 24 and also checks the decision-documentation format. Do not substitute a historical test count for a result on your revision.

## Run the current component

`npm start` runs `src/server.js`. It requires a signing secret for anonymous capture association. In a Bash shell, use a fresh development secret and a dedicated data directory:

```sh
export FINGER_IDENTITY_SECRET="$(node --input-type=module -e 'import { randomBytes } from "node:crypto"; process.stdout.write(randomBytes(32).toString("hex"))')"
export FINGER_DATA_DIR="$PWD/var/local-demo"
export PORT=3000
npm start
```

Open `http://localhost:3000/` and stop the server with Ctrl-C. Choose a free port before starting it. Keep the same secret if signed anonymous associations must survive a restart; store a real deployment secret outside Git. This starts the component demonstration, not the complete institutional environment.

The server listens on the configured port without a host restriction. Use a development environment with appropriate network access controls. Capture can include rendered or entered DOM content; use synthetic input when exploring the demonstration. The [component reference](reference/component-runtime.md) describes the capture window, endpoints, persistence, and data-handling requirements.

## Repository layout

- `src/server.js` serves the demonstration and ingestion endpoint.
- `src/finger/` implements capture ingestion, identity association, storage, and processing.
- `public/` contains the browser interface and collector.
- `test/` contains Node tests and fixtures for the checked-out code.
- `scripts/` contains repository checks and automation helpers.
- `docs/architecture/` explains subsystem boundaries and points to maintained contracts.
- `docs/` contains setup, status, specifications, research, and technical references.
- `docs/decisions/` contains decision provenance and historical evidence. Its dated records are not a description of today's deployment.

Generated runtime data belongs in the ignored `var/` directory. Keep local secrets, databases, dependencies, backups, and private review records out of commits.

## Choosing checks for a change

Run `npm run check` and relevant Node tests for runtime changes; use `npm test` for changes spanning components. Documentation changes need link, source-version, and diff checks. Changes to decision tooling also require `npm run decisions:generate`, `npm run decisions:check`, and `npm run decisions:test`. The generated summary must agree with its source; do not edit it by hand.

See [Contributing](../CONTRIBUTING.md) for review and the distinctions between tested, accepted, merged, and deployed work.
