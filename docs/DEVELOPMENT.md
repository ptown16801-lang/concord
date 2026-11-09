# Development

Start with [development status](PROJECT_STATUS.md) to choose the code you want to inspect. The default branch contains design and research documentation and decision tooling, and no runnable application; other implementations are identified by exact public revisions. A feature in a pull request may not exist in your checkout.

## Requirements and checks

Use Node.js 22.5 or newer on Linux. The repository uses JavaScript ES modules and Node's built-in test runner. The committed lockfile currently declares no external runtime dependencies.

From the repository root:

```sh
npm ci
npm run check
npm test
```

`npm ci` uses the committed lockfile. `npm run check` checks syntax for the decision-tooling script; it does not check every file in every branch. `npm test` runs the checked-out Node tests. CI runs Node 22 and 24 and also checks the decision-documentation format. Do not substitute a historical test count for a result on your revision.

## Repository layout

- `src/` currently holds only a README; runtime candidates are on separate branches.
- `test/` contains Node tests and fixtures for the checked-out code.
- `scripts/` contains repository checks and automation helpers.
- `docs/architecture/` explains subsystem boundaries and points to maintained contracts.
- `docs/` contains setup, status, specifications, research, and technical references.
- `docs/decisions/` contains decision provenance and historical evidence. Its dated records are not a description of today's deployment.

Generated runtime data belongs in the ignored `var/` directory. Keep local secrets, databases, dependencies, backups, and private review records out of commits.

## Choosing checks for a change

Run `npm run check` and relevant Node tests for runtime changes; use `npm test` for changes spanning components. Documentation changes need link, source-version, and diff checks. Changes to decision tooling also require `npm run decisions:generate`, `npm run decisions:check`, and `npm run decisions:test`. The generated summary must agree with its source; do not edit it by hand.

See [Contributing](../CONTRIBUTING.md) for review and the distinctions between tested, accepted, merged, and deployed work.
