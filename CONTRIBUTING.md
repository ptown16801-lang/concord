# Contributing

Concord contains implemented components, accepted designs, and experimental work at different stages. Read the [project overview](docs/OVERVIEW.md), [development status](docs/PROJECT_STATUS.md), and relevant specification before changing behavior. Identify the branch or commit you are using.

## Set up and check a change

Use Node.js 22.5 or newer on Linux and the committed npm lockfile:

```sh
npm ci
npm run check
npm test
```

The [development guide](docs/DEVELOPMENT.md) explains local startup and the repository layout. Preserve existing edits and make a focused branch from the intended base. Avoid unrelated formatting, generated data, private records, and credentials.

Choose checks appropriate to the change. Runtime changes need syntax checks and relevant tests; changes spanning components need the full suite. Documentation changes need source and link checks. Decision tooling additionally uses `npm run decisions:generate`, `npm run decisions:check`, and `npm run decisions:test`. Do not edit `CURRENT_DECISIONS.md` by hand.

## Describe a pull request

Explain the concrete problem, resulting behavior, scope, checks actually run, and remaining limitations. Link to repository documentation, exact public code, or public technical references so a reviewer can understand the change without a private account. Keep internal task records and account-specific setup out of public descriptions.

Each PR must contain exactly one decision-impact line:

- `Decision impact: No decision change`
- `Decision impact: Updated CON-001, ECON-02` (use the actual affected IDs only for an authorized decision change)

Read [project instructions](AGENTS.md), the relevant [decisions](DECISIONS.md), and the [decision maintenance workflow](docs/decisions/WORKFLOW.md). Governing instructions and accepted decisions remain owner-controlled. A documentation correction must not silently adopt a proposal or reopen held work.

Before committing, inspect local edits and compare the expected base and current default revision. Review overlapping meaning as well as textual conflicts. Keep commits small enough to explain and review, with messages describing the particular change.

## Report the result accurately

State separately what is saved locally, tested, committed, pushed, independently reviewed, accepted, merged into the default branch, and deployed. Passing tests and a merge into an intermediate branch do not establish full-system acceptance or default-branch publication. Retain exact version and review scope when incorporating earlier work.
