# Evidence snapshot: Concord Linear-native operating workflow

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/document/concord-linear-native-operating-workflow-8fe803878f5e
- Version: 2026-09-21T02:41:22.217Z
- Source date: 2026-09-21T02:41:22.217Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

This is the current project-management workflow for Concord. The **Mandatory Project Execution Safety Rule** is the controlling source of truth; follow it whenever this workflow or any historical document could be interpreted differently.

## Roles

* **Owner / human assignee:** retains responsibility for each issue.
* **Linear:** issue tracking, project state, dependencies, review evidence, comments, documents, and coordination.
* **Codex or another explicitly approved coding tool:** implementation when coding is authorized.
* **Linear Agent:** not an implementation executor for Concord while the Linear Coding Sessions prohibition is in force.

## Normal flow

 1. Capture one real deliverable in one canonical issue.
 2. Before starting work, verify current state: completed artifacts, PRs, branches, dependencies, holds, and latest owner decisions.
 3. If already complete, do not restart it.
 4. Keep the issue description focused on the **current desired outcome, scope, constraints, and acceptance criteria**. Historical detail belongs in comments or linked documents.
 5. Keep one human assignee responsible for the issue.
 6. Use ordinary Linear relations for blockers/dependencies rather than custom READY/WAIT dispatch machinery.
 7. When coding is authorized, open/hand the issue to **Codex or another explicitly approved external coding tool**. Do not delegate the issue to Linear Agent for coding.
 8. Coding returns a branch/PR, exact SHA, tests, limitations, and evidence to the same canonical issue.
 9. Review happens on that issue/PR. Create a separate review issue only when independent review is itself a substantial deliverable.
10. Move through the normal workflow: Backlog → Todo → In Progress → In Review → Done, using Canceled for genuinely retired work.

## What not to build by default

Do not create custom dispatchers, supervisors, coordinators, worker queues, restart machinery, special status semantics, or Loops merely because they might someday be useful.

Use a Loop only after a specific repetitive workflow has demonstrably benefited from automation and ordinary Linear behavior is insufficient.

## Execution safety

The project document **Mandatory Project Execution Safety Rule** is controlling:

* current state must be reconciled before dispatch,
* latest explicit owner decision wins,
* completed work stays completed,
* duplicate work is prohibited,
* assumptions must be stated before acting,
* Linear Coding Sessions remain prohibited until the owner explicitly lifts that prohibition.

## Finger

Finger's deployable beta is complete and not pending. Only a verified residual defect or explicitly requested new feature can create new Finger implementation work.
