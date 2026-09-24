# Evidence snapshot: Decision propagation catalog and replay engine

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-24/decision-propagation-catalog-and-replay-engine
- Version: 2026-09-19T04:16:49.249Z
- Source date: 2026-09-19T04:16:49.249Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design contract — full design audit, 2026-09-16

**Deliverable:** Decision-propagation catalog and replay design. Current state remains Backlog with no delegate. Linear is being used for design, specification, dependencies and acceptance planning. No application coding, rebuild, PR, test run, source-recovery run, deployment or child-worker launch is authorized by this issue. Older implementation scopes/checkpoints below are reference history, not dispatch instructions.

**Exclusive ownership:** Own institutional pathway/state-transition definitions, source-qualified simulations, append-only replay ordering, counterfactual separation and provenance contracts. <issue id="21733ce2-5780-4f9e-8e55-d6a157c2bd50" href="https://linear.app/jons-garage/issue/JON-22/interactive-data-atlas-and-graph-standard">JON-22</issue> supplies graph presentation conventions; <issue id="01ec4151-6043-4196-af21-78c6eaf3f8e1" href="https://linear.app/jons-garage/issue/JON-14/workbench-shell-and-navigation">JON-14</issue> hosts the surface; <issue id="2265cde3-4122-4c70-9fea-3ee4038eaf31" href="https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model">JON-18</issue> owns public record provenance. Finger raw interaction replay belongs to <issue id="6110e028-79c1-470b-88b3-addf5ad0468d" href="https://linear.app/jons-garage/issue/JON-73/finger-replay-and-heat-map-processing">JON-73</issue> and is a separate deliverable. The existing researched handoff is reusable evidence; its coding, extraction, browser-run and release leaves are not dispatched by this design audit.

**Completion evidence for design:** one source-linked specification or gap/decision record, explicit inputs/outputs, named canonical dependency owners, and reviewable acceptance criteria. Reuse accepted decisions and existing artifacts; an already completed deliverable is referenced, not reassigned. Source/runtime gaps block only affected future execution, not independent design work.

---

## Workbench handoff reconciliation — 2026-09-16

The issue's current Backlog/held scope governs execution; historical descriptions of 'In Progress' or prior implementation snapshots do not establish a currently running worker. <issue id="4ff79420-33e1-4ae3-9dba-ab264dd6101c" href="https://linear.app/jons-garage/issue/JON-24/decision-propagation-catalog-and-replay-engine">JON-24</issue> remains planning-only under its researched handoff; no code assignment is authorized here.

Before any later project-specific implementation, resolve the exact editable Workbench artifact or repository directory, verify its recorded hash/version and accepted destination/base, and attach current source and acceptance references to the assignment. Concord repository identity alone does not prove the older full Workbench HTML is present: PROJECT_RECORD.md at `40f647e5b8d23307f713fc3a3753a1d3a46611cb` explicitly bounds the available source and records the historical Workbench hash as index evidence. Do not recreate missing historical work or treat old static checks as fresh browser/integration acceptance. Missing source identification blocks only the affected implementation assignment; planning and unrelated work can continue.

Build the canonical Concord decision-propagation explorer around a catalog of major institutional actions and their downstream effects.

## Scope

* Identify the major decision classes that can propagate through the system.
* Give each class a declarative subgraph/state model with preconditions, guarded transitions, branches, holds/releases, revisions and terminal states.
* Preserve an append-only event history so a run can be replayed from the original sequence rather than redrawn from current state alone.
* Support side-by-side comparisons of runs and counterfactual branches without rewriting the original history.
* Use typed arithmetic and explicit state labels rather than opaque animation-only transitions.
* Integrate the explorer into Workbench floating windows, global search/help and the shared visual language.

The explorer is explanatory/analytical; a visualization does not itself enact a measure, cast a vote, issue an order or create authority.

## Recorded implementation evidence — historical

The current Concord Workbench already contains an embedded Decision Propagation explorer with a `concord-propagation-catalog/v2` catalog and **64 pathways**, plus a dedicated homepage tile/explorer entry and full-window viewer.

Implemented capabilities include:

* declarative pathway nodes/edges and typed guard inputs;
* active/completed/waiting/rejected visual states;
* stage evaluation, pause/hold, release, revision, restart, and example playback;
* append-style simulation event history and replay-position timeline;
* pathway search/catalog navigation;
* related subprocess links with return-state restoration;
* comparison pinning;
* event-history export and JSON import;
* imported histories explicitly labeled unverified;
* source/rule/evidence notes and explicit simulation labeling.

The embedded catalog itself correctly states that mappings are **proposed/source-qualified simulations, not evidence that an institutional rule was enacted or that an attestation is true**.

## Remaining work

* validate each of the 64 pathway mappings against the controlling Vote/Concord decisions and source interview records;
* reconcile any changed/superseded governance rules into versioned pathway definitions;
* prove append-only replay semantics and import/export compatibility with persistent project records rather than only the embedded browser model;
* add regression coverage for all guard/outcome/revision/hold paths;
* integrate authoritative/public event sources only with explicit provenance and without converting simulation inputs into institutional facts;
* live browser/mobile acceptance of the propagation UI.

Current status is Backlog and design-only. Historical engine/UI/catalog claims do not establish source validation or persistent replay acceptance.
