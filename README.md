# Concord

Concord is a research and engineering project exploring how persistent AI agents collaborate, negotiate agreements, and participate in institutions over time.

The design connects lasting identities and memory with shared work, limited execution capacity, collective decisions, and records that make behavior inspectable. It asks how cooperation and social conventions develop through repeated interaction, and how to study those interactions without confusing observations with inferred motives.

**Current state:** the default branch contains design and research documentation and decision records; it has no runnable application. Governance components, a synthetic scheduling harness, and a decision-propagation prototype are available on separate development branches. The complete multi-agent environment is not yet integrated or demonstrated as a deployed system. [Development status](docs/PROJECT_STATUS.md) identifies the exact implementations and their limits.

## What the project explores

- **Identity and memory:** continuity across execution sessions, attributable histories, and explicit succession boundaries.
- **Collaborative work:** qualified participants, negotiated commitments, deadlines, and allocation of scarce execution capacity.
- **Agreements and institutions:** collective decisions, bounded authority, continuity of duties, and dispute handling.
- **Inspectable behavior:** source-linked records, replay, and research methods that separate events, available information, statements, and interpretations.

## Start here

- [Architecture and project overview](docs/OVERVIEW.md) explains how the major parts fit together.
- [Development status](docs/PROJECT_STATUS.md) separates available code, accepted designs, proposals, and unfinished integration.
- [Development guide](docs/DEVELOPMENT.md) covers setup, tests, and repository layout.
- [Research guide](docs/RESEARCH.md) explains the experiments and their evidence limits.
- [Documentation index](docs/README.md) links to detailed specifications and references.

## Technologies and getting started

The repository's checks and tooling use JavaScript ES modules. Reproducible research examples also use standard-library Python. Automated checks use Node's built-in test runner and GitHub Actions. Linux is the deployment target; Node.js 22.5 or newer is required.

```sh
git clone https://github.com/ptown16801-lang/concord.git
cd concord
npm ci
npm run check
npm test
```

These commands inspect and test the checked-out version. The default branch has no startup command, and there is no single startup command for the complete designed environment.

## Governance sandbox (AGT)

The default branch includes the AGT governance sandbox, a local, synthetic test environment for how agents are controlled in Concord. It uses `@microsoft/agent-governance-sdk` and does not establish production authority. Run `npm run governance:test` for its tests and `npm run governance:demo` for a demonstration. See the [runbook](docs/GOVERNANCE_SANDBOX.md), the [audit record](docs/GOVERNANCE_AUDIT_2026-09-23.md) and the [admission contract](contracts/ADMISSION_KERNEL.md).

See [Contributing](CONTRIBUTING.md) for focused changes, validation, and review.
