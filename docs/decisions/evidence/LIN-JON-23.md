# Evidence snapshot: Global search, autocomplete, and indexed library

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-23/global-search-autocomplete-and-indexed-library
- Version: 2026-09-19T04:16:35.648Z
- Source date: 2026-09-19T04:16:35.648Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design contract — full design audit, 2026-09-16

**Deliverable:** Global search, indexing and contextual-help contract. Current state remains Backlog with no delegate. Linear is being used for design, specification, dependencies and acceptance planning. No application coding, rebuild, PR, test run, source-recovery run, deployment or child-worker launch is authorized by this issue. Older implementation scopes/checkpoints below are reference history, not dispatch instructions.

**Exclusive ownership:** Own global index inputs, result/ranking/routing behavior and contextual-help query contract. <issue id="01ec4151-6043-4196-af21-78c6eaf3f8e1" href="https://linear.app/jons-garage/issue/JON-14/workbench-shell-and-navigation">JON-14</issue> owns shell placement/window hosting; <issue id="88373de2-d0e1-4cbf-8021-525be96c5a50" href="https://linear.app/jons-garage/issue/JON-29/institutional-learning-library-and-interactive-guides">JON-29</issue> owns guide text and stable topic/page IDs; <issue id="2265cde3-4122-4c70-9fea-3ee4038eaf31" href="https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model">JON-18</issue>/<issue id="c430260a-9423-4dd8-92de-091f3541137d" href="https://linear.app/jons-garage/issue/JON-28/concord-artifact-archive">JON-28</issue> retain record/artifact ownership. <issue id="3f634998-36ca-4a68-a9c9-e3a802d9e808" href="https://linear.app/jons-garage/issue/JON-26/research-library-google-drive-scientific-archive-and-context-graph">JON-26</issue>/<issue id="ceb61410-e21f-4a02-b629-7c62fc18943e" href="https://linear.app/jons-garage/issue/JON-52/research-library-deep-link-and-module-integration-contract">JON-52</issue> remain canonical owners for parked Research Library identities and deep links. Specify safe unavailable-module behavior so Library work does not block the rest. Exclude quiz text, answers, scores and quiz routes from current indexing/acceptance.

**Completion evidence for design:** one source-linked specification or gap/decision record, explicit inputs/outputs, named canonical dependency owners, and reviewable acceptance criteria. Reuse accepted decisions and existing artifacts; an already completed deliverable is referenced, not reassigned. Source/runtime gaps block only affected future execution, not independent design work.

---

## Workbench handoff reconciliation — 2026-09-16

The issue's current Backlog/held scope governs execution; historical descriptions of 'In Progress' or prior implementation snapshots do not establish a currently running worker. Preserve completed components and assess only the documented residual scope.

Before any later project-specific implementation, resolve the exact editable Workbench artifact or repository directory, verify its recorded hash/version and accepted destination/base, and attach current source and acceptance references to the assignment. Concord repository identity alone does not prove the older full Workbench HTML is present: PROJECT_RECORD.md at `40f647e5b8d23307f713fc3a3753a1d3a46611cb` explicitly bounds the available source and records the historical Workbench hash as index evidence. Do not recreate missing historical work or treat old static checks as fresh browser/integration acceptance. Missing source identification blocks only the affected implementation assignment; planning and unrelated work can continue.

## Boundary with Research Library

This issue owns **global search/indexing only**. It is not the Research Library entity. The canonical Research Library is <issue id="3f634998-36ca-4a68-a9c9-e3a802d9e808" href="https://linear.app/jons-garage/issue/JON-26/research-library-google-drive-scientific-archive-and-context-graph">JON-26</issue> and must retain its own page, route, identity rules, graph, and attachment-verification state. Global Search may index and deep-link into the Research Library but must not merge the Research Library into a generic search results surface.

Build a single Concord search/index layer over the generated institutional library, archive material, Workbench help text, research summaries and major-government-function guides.

## Requirements

* Search bar at the top of the Workbench.
* Live autocomplete while typing.
* Index all generated text and preserve source/page/topic anchors.
* Unique strong match can deep-link directly.
* Terms with multiple occurrences open a normal ranked results view before navigation.
* Clicking a result opens the relevant article/passage in a floating library window.
* Search results should expose enough surrounding text to disambiguate matches.
* Question-mark contextual-help affordances on graphs/assets reuse the same index to show exact, near and related passages.
* Left-side nested explorer exposes the hashing guide, archive guide, major government-function guides and other Concord branches.

Generated institutional material should be proofread/reconciled so navigation does not surface statements claiming that planned content is missing or unimplemented when the corresponding material has already been generated.

## Recorded implementation evidence — historical

The current Workbench already provides the global search input, suggestion/results UI surfaces, contextual-help search surface, and exact `GOV-###` routing into the Research Library. The current design record remains Backlog; historical search UI evidence does not establish full acceptance.

Still incomplete / not yet proven:

* complete indexing coverage across all generated institutional text and Research Library metadata;
* arbitrary scientific-paper result routing beyond exact GOV-ID entry;
* regression of multiple-match chooser behavior across the full corpus;
* end-to-end contextual-help coverage for every interactive asset;
* cross-module integration tests with partially unavailable Research Library graph layers.

These remaining Research Library-specific cross-module requirements are coordinated with <issue id="ceb61410-e21f-4a02-b629-7c62fc18943e" href="https://linear.app/jons-garage/issue/JON-52/research-library-deep-link-and-module-integration-contract">JON-52</issue>.
