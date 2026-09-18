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
