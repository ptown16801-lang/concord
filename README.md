# Concord

Concord is the workbench and research environment for the Multi-Agent Governance Model. **Concord and The Form are separate peer projects; Vote is their folder name, not a parent project or an authority.** This repository does not by itself represent every project artifact.

The repository at this baseline contains the existing deployable **Finger beta**: browser capture, ingestion, historical persistence and replay/heat-map processing. That completed artifact is preserved, not a task to recreate. Separating its old planning records from the operational queue does not remove or change the running code.

## Existing beta quick start

The recorded runtime requires Node.js 22.5 or newer. Set a fresh identity-signing secret through the environment, then run `npm start`. The demo defaults to `http://localhost:3000/`. Existing checks are `npm test` and `npm run check`.

The full technical reference, including capture behavior, environment variables, HTTP surface, persistence, replay and privacy requirements, is preserved unchanged in [the Finger beta reference snapshot](docs/reference/FINGER_BETA_2026-09-16.md). Its old project-identity sentence is historical; current project routing is defined above and in [PROJECT_RECORD.md](PROJECT_RECORD.md).

## Read only the sources needed for the task

Current task scope, authorization, holds and acceptance come from the current project-management record, not a dated repository snapshot or a general instruction to continue. Work defaults to PM/design-research; code changes need their own authorized task and prerequisites. This documentation change authorizes no run, merge, deployment or scope reopening.

Operational instructions belong in the current task and current workflow source, once. Historical audits, deferred task trees and reference snapshots are loaded only when a specific artifact or decision is needed; they are not mandatory context for every agent cycle. Quiz work is not an operational deliverable.

`CHANGELOG.md` retains implementation history. [PROJECT_RECORD.md](PROJECT_RECORD.md) defines source precedence and points to preserved historical records. Runtime source, tests, package configuration and CI are unchanged by this documentation partition.

## Current review candidate libraries

This integration candidate combines existing producer branches for review under
JON-141. It does not establish production authority, independent acceptance, or
deployment readiness. See [integration provenance and boundaries](docs/INTEGRATION_RECONCILIATION.md).

- Finger retains its HTTP and storage behavior documented in the reference above.
- `concord/population` exports the SQLite registry and global capacity constraint.
- `concord/governance` exports eligibility, bootstrap impeachment and ballot intake.
  The pinned eligibility class is a reducer; authoritative eligibility for the
  bootstrap slice is the authenticated `DurableEligibility` journal wrapper.
  See [bootstrap adapters](docs/specs/bootstrap-impeachment.md).
- `concord/governance/electorate` exposes exact electorate accounting; ballot and
  close authority still require the documented trusted adapters.
- `npm run governance:demo` exercises the isolated synthetic AGT sandbox. See the
  [runbook](docs/GOVERNANCE_SANDBOX.md) and [audit](docs/GOVERNANCE_AUDIT_2026-09-23.md).
- The [scheduler harness](test/scheduler/README.md) is synthetic evaluation only.
- The [archive verifier](docs/ARTIFACT_MANIFEST.md) checks local bytes, not delivery.
- The [recovery research](docs/GOVERNANCE_RECOVERY_RESEARCH_2026-09-23.md) records
  proposed experiments, not an implemented remote collector guarantee.

Run `npm ci --ignore-scripts`, `npm run check`, and `npm test`. Node 22.5+ is
required; CI covers Node 22 and 24. The optional runtime compatibility report is
`node qa/workflow/runtime-preflight.mjs`. Retired native-delivery and dispatch
policy gates are not part of this candidate.
