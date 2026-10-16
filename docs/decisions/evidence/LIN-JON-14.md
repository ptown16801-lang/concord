# Evidence snapshot: Workbench shell and navigation

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-14/workbench-shell-and-navigation
- Version: 2026-09-19T04:16:31.273Z
- Source date: 2026-09-19T04:16:31.273Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design contract — full design audit, 2026-09-16

**Deliverable:** Workbench shell, navigation, floating-window and module-mounting design. Current state remains Backlog with no delegate. Linear is being used for design, specification, dependencies and acceptance planning. No application coding, rebuild, PR, test run, source-recovery run, deployment or child-worker launch is authorized by this issue. Older implementation scopes/checkpoints below are reference history, not dispatch instructions.

**Exclusive ownership:** Own the shell/navigation/window contract and integration slots. <issue id="fa39a3bb-8e99-433f-9aa2-00c1fab50ba4" href="https://linear.app/jons-garage/issue/JON-23/global-search-autocomplete-and-indexed-library">JON-23</issue> alone owns search/index behavior; <issue id="88373de2-d0e1-4cbf-8021-525be96c5a50" href="https://linear.app/jons-garage/issue/JON-29/institutional-learning-library-and-interactive-guides">JON-29</issue> owns guide content; <issue id="444552bc-0804-4de8-862d-7952762ab334" href="https://linear.app/jons-garage/issue/JON-27/touch-gesture-midi-and-mobile-interaction-layer">JON-27</issue> owns shared input/audio behavior; <issue id="21733ce2-5780-4f9e-8e55-d6a157c2bd50" href="https://linear.app/jons-garage/issue/JON-22/interactive-data-atlas-and-graph-standard">JON-22</issue> owns graph presentation. Consume their interfaces without rewriting their specifications. Preserve <issue id="ba724b93-fe3c-42ed-8921-b13dde7fe2f0" href="https://linear.app/jons-garage/issue/JON-55/homepage-artwork-approved-master-and-reusable-editing-workflow">JON-55</issue>'s completed artwork archive.

**Completion evidence for design:** one source-linked specification or gap/decision record, explicit inputs/outputs, named canonical dependency owners, and reviewable acceptance criteria. Reuse accepted decisions and existing artifacts; an already completed deliverable is referenced, not reassigned. Source/runtime gaps block only affected future execution, not independent design work.

---

## Workbench handoff reconciliation — 2026-09-16

The issue's current Backlog/held scope governs execution; historical descriptions of 'In Progress' or prior implementation snapshots do not establish a currently running worker. Preserve completed components and assess only the documented residual scope.

Before any later project-specific implementation, resolve the exact editable Workbench artifact or repository directory, verify its recorded hash/version and accepted destination/base, and attach current source and acceptance references to the assignment. Concord repository identity alone does not prove the older full Workbench HTML is present: PROJECT_RECORD.md at `40f647e5b8d23307f713fc3a3753a1d3a46611cb` explicitly bounds the available source and records the historical Workbench hash as index evidence. Do not recreate missing historical work or treat old static checks as fresh browser/integration acceptance. Missing source identification blocks only the affected implementation assignment; planning and unrelated work can continue.

Track the integrated Concord workbench shell: explorer navigation, searchable library, floating-window workspace, responsive mobile layout, global controls, and persistent in-session navigation state.

## Canonical scope after migration

The Workbench is the unified Concord shell. It should contain a nested left-side explorer, global indexed search/autocomplete across institutional text, resizable/stackable/snap-capable floating windows, archive/library readers, forum/discussion surfaces, data atlas, decision-propagation views, research tools and contextual help.

Primary phone views should avoid vertical page scrolling when feasible. Explorer titles should fit by width or expose the full name through hover/tap. Search should autocomplete live; a unique result can deep-link directly, while repeated terms open a result chooser in a floating library window.

Every moving/interactive asset should expose contextual help through a small question-mark affordance that searches the indexed Concord corpus for exact/near/related passages and can open the governing topic in a new library window.

See project documents: **Concord · Change history and reconstruction**, **Concord · Architecture and decisions register**, and **Concord · Open questions, verification gaps, and next actions**.

## Recorded implementation evidence — historical

The current `Concord_Workbench-3.html` already contains substantial Workbench-shell implementation: left explorer/tree, global search input and suggestion surface, floating-window layer with move/resize/snap controls, task strip, archive/library reader UI, contextual help bubble, responsive/mobile layout rules, global timeline/transport controls, and interactive chart/canvas surfaces. The Research Library has also been merged into this shell as a first-class page state.

The recorded shell evidence does not establish acceptance of the remaining cross-module and device criteria. Current status is Backlog for design; no running worker is implied.
