# Contributing

Read [AGENTS.md](AGENTS.md), relevant [decisions](DECISIONS.md), and the
[decision maintenance workflow](docs/decisions/WORKFLOW.md). Use the existing
Node.js tooling; this project's deployment target is Linux.

Every PR must contain exactly one disposition:

- `Decision impact: No decision change`
- `Decision impact: Updated CON-001, ECON-02` (replace with actual IDs)

A policy change needs actual acceptance evidence, an updated master, preserved
supersession, and issue/review links. An implementation conforming to existing policy
normally uses “No decision change.” Acceptance of an artifact, scientific validation,
code integration and production deployment are distinct; report each truthfully.

Before commit, record expected HEAD and expected canonical remote revision; inspect
other local edits and use the preflight described in WORKFLOW.md. Review concurrent
semantic changes even when Git reports a clean merge. Run focused checks appropriate
to changed files. Decision tooling is checked with `npm run decisions:test` and
`npm run decisions:check`; generate its summary with `npm run decisions:generate`.
Never manually edit CURRENT_DECISIONS.md or rewrite archived handoffs to appear fresh.
