# Evidence snapshot: Interactive data atlas and graph standard

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-22/interactive-data-atlas-and-graph-standard
- Version: 2026-09-19T04:16:46.442Z
- Source date: 2026-09-19T04:16:46.442Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design contract — full design audit, 2026-09-16

**Deliverable:** Data Atlas, checkpoint projection and graph presentation contract. Current state remains Backlog with no delegate. Linear is being used for design, specification, dependencies and acceptance planning. No application coding, rebuild, PR, test run, source-recovery run, deployment or child-worker launch is authorized by this issue. Older implementation scopes/checkpoints below are reference history, not dispatch instructions.

**Exclusive ownership:** Own the checkpoint/typed-relationship presentation and permission-safe neighborhood projection contract, chart choice and graph-specific interaction requirements. Consume source event/record identities from their canonical owners; <issue id="2265cde3-4122-4c70-9fea-3ee4038eaf31" href="https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model">JON-18</issue> owns publication records and <issue id="23e7c7df-a9fe-4ba3-b920-5079a466bb25" href="https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores">JON-17</issue> owns authorization controls. <issue id="b9661f0b-dc93-485a-840e-49b9c7903ec3" href="https://linear.app/jons-garage/issue/JON-21/relational-and-temporal-observatory">JON-21</issue> owns relational metrics; <issue id="4ff79420-33e1-4ae3-9dba-ab264dd6101c" href="https://linear.app/jons-garage/issue/JON-24/decision-propagation-catalog-and-replay-engine">JON-24</issue> owns propagation transitions; <issue id="444552bc-0804-4de8-862d-7952762ab334" href="https://linear.app/jons-garage/issue/JON-27/touch-gesture-midi-and-mobile-interaction-layer">JON-27</issue> owns shared gestures. Research Library projections remain optional held interfaces under <issue id="ceb61410-e21f-4a02-b629-7c62fc18943e" href="https://linear.app/jons-garage/issue/JON-52/research-library-deep-link-and-module-integration-contract">JON-52</issue>; do not recreate its graph or make its parked work block non-Library design.

**Completion evidence for design:** one source-linked specification or gap/decision record, explicit inputs/outputs, named canonical dependency owners, and reviewable acceptance criteria. Reuse accepted decisions and existing artifacts; an already completed deliverable is referenced, not reassigned. Source/runtime gaps block only affected future execution, not independent design work.

---

## Workbench handoff reconciliation — 2026-09-16

The issue's current Backlog/held scope governs execution; historical descriptions of 'In Progress' or prior implementation snapshots do not establish a currently running worker. Preserve completed components and assess only the documented residual scope.

Before any later project-specific implementation, resolve the exact editable Workbench artifact or repository directory, verify its recorded hash/version and accepted destination/base, and attach current source and acceptance references to the assignment. Concord repository identity alone does not prove the older full Workbench HTML is present: PROJECT_RECORD.md at `40f647e5b8d23307f713fc3a3753a1d3a46611cb` explicitly bounds the available source and records the historical Workbench hash as index evidence. Do not recreate missing historical work or treat old static checks as fresh browser/integration acceptance. Missing source identification blocks only the affected implementation assignment; planning and unrelated work can continue.

Rework Concord's homepage and subpage visualizations so every graph carries meaningful project data, uses an appropriate visual form, fills its available space, and remains interactive on a phone-sized screen.

## Required interaction

* No repeated visualization method on the homepage.
* Individually tune scaling/sensitivity to the data run and available viewport.
* Line-style plots provide movable horizontal/vertical trace axes, value calculations at the intersection, pinch zoom and horizontal/vertical panning where applicable.
* Rotating objects support free three-axis rotation, pinch zoom and twist/roll.
* Geometry size follows mean data while deviations stretch/compress shape.
* Upward tilt can alter intensity/sensitivity; horizontal movement can alter time/phase or another meaningful paired control.
* Empty/static regions should be replaced with information-bearing motion, denser encodings or more suitable representations.
* Add subtle data-reactive grid/fabric/background behavior.

Research the most representative governance/network/temporal metrics before finalizing homepage assignments. Each graph needs a creative title rather than generic demonstration labels.

## Recorded implementation evidence — historical

The current Concord Workbench already contains a substantial interactive visualization/atlas framework: the `homeCharts` multi-tile dashboard, chart-window expansion, canvas-based interactive plots, shared timeline/transport state, rotating/zoomable data objects, responsive/mobile chart layouts, and chart-specific help/readout surfaces. This historical evidence does not imply a current worker; the current design record remains Backlog.

Still incomplete / requiring validation:

* research-backed selection of representative governance/network/temporal metrics for each final chart;
* chart-by-chart verification of scaling, sensitivity, density, and meaningful use of available space;
* complete crosshair/value-readout/pan/zoom coverage where applicable;
* physical phone/device interaction and accessibility regression;
* proof that Data Atlas projections of Research Library relationships consume canonical GOV IDs without forking graph state, coordinated with <issue id="ceb61410-e21f-4a02-b629-7c62fc18943e" href="https://linear.app/jons-garage/issue/JON-52/research-library-deep-link-and-module-integration-contract">JON-52</issue>;
* replacement of any remaining illustrative/filler visualization with domain-appropriate data encodings.

Current status is Backlog for visualization design and acceptance planning; historical framework evidence does not establish those criteria.

## Adopted foundation — checkpoint neighborhoods

Concord's redesigned visual system will treat **checkpoint + typed relationships + permission-safe neighborhood projection** as its first concrete data/interaction foundation.

### Checkpoint

A checkpoint is a durable semantic anchor for a meaningful event or retrospectively identified interaction point. It can connect history, decision rationale, evidence, participants, rules/authority, outputs, consequences, provenance, available next states, and planning scenarios. Checkpoints may originate from formal/system events, user designation, or emergent agent nomination/voting. Emergent checkpoint support must not require a predefined category, so unforeseen patterns can later be elevated without rewriting history.

### Typed relationships

Checkpoint context is represented through explicit relationship objects rather than ambiguous visual adjacency. Initial v0.1 relation vocabulary: `PRECEDED_BY`, `PRODUCED`, `USED_EVIDENCE`, `INVOLVED`, `AUTHORIZED_BY`, and `ENABLES`. The model must remain extensible for future relationship types and emergent-analysis work.

### Permission-safe neighborhood projection

A checkpoint neighborhood is dynamically derived rather than permanently stored. v0.1 exposes only immediate predecessors, immediate outputs, evidence references, participants/institutions, and available next states, with any visible object usable as the new neighborhood center.

Controlling security invariant: checkpoint creation, nomination, voting, aggregation, analysis, search, rendering, neighborhood expansion, and export may operate only on records visible within the caller's authorized information domain. Checkpoint metadata and graph projections must not reveal the existence, number, location, timing, identity, topology, or activity of inaccessible records. Cross-domain exposure requires an independently authorized disclosure derivative and is never produced implicitly by the checkpoint system. Authorization filtering occurs before neighborhood query, counts, layout, search, rendering, caching, and export; no hidden-node placeholders or geometry gaps may expose protected topology.

### v0.1 scope

Keep the initial neighborhood implementation intentionally narrow while preserving schema extensibility. First implementation should support:

* checkpoint schema;
* typed relationship schema;
* permission-safe neighborhood query contract;
* immediate predecessor/output/evidence/participant/next-state projection;
* click/tap-to-recenter exploration with breadcrumb/back navigation;
* compact → expanded → investigate checkpoint presentation;
* one hypothetical planning branch originating from a checkpoint without mutating authoritative state.

Later expansion is explicitly allowed and should not require redesign of the core model: temporal windows, comparative neighborhoods, structural-change metrics, clustering, emergent-pattern analysis, scenario overlays, richer planning, retrospective annotations, and future 3D representations may all consume the same checkpoint/relationship model.

The visual form remains deliberately replaceable; the checkpoint and relationship model is the durable layer.
