# Evidence snapshot: Touch, gesture, MIDI, and mobile interaction layer

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-27/touch-gesture-midi-and-mobile-interaction-layer
- Version: 2026-09-19T04:16:53.905Z
- Source date: 2026-09-19T04:16:53.905Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Current design contract — full design audit, 2026-09-16

**Deliverable:** Shared touch, gesture, audio and mobile interaction contract. Current state remains Backlog with no delegate. Linear is being used for design, specification, dependencies and acceptance planning. No application coding, rebuild, PR, test run, source-recovery run, deployment or child-worker launch is authorized by this issue. Older implementation scopes/checkpoints below are reference history, not dispatch instructions.

**Exclusive ownership:** Own shared pointer/gesture behavior, accessibility, audio behavior and viewport/safe-area design. <issue id="21733ce2-5780-4f9e-8e55-d6a157c2bd50" href="https://linear.app/jons-garage/issue/JON-22/interactive-data-atlas-and-graph-standard">JON-22</issue> supplies graph-specific intent; <issue id="2b2438fa-ad17-4b16-bfc3-b6d4ab0c76b5" href="https://linear.app/jons-garage/issue/JON-70/finger-web-collector-component">JON-70</issue> alone owns Finger capture semantics and raw collector fields. This issue does not create another Finger collector or identity/fingerprint inference pipeline. Device matrices here are future acceptance plans, not instructions to run implementation or device testing.

**Completion evidence for design:** one source-linked specification or gap/decision record, explicit inputs/outputs, named canonical dependency owners, and reviewable acceptance criteria. Reuse accepted decisions and existing artifacts; an already completed deliverable is referenced, not reassigned. Source/runtime gaps block only affected future execution, not independent design work.

---

## Workbench handoff reconciliation — 2026-09-16

The issue's current Backlog/held scope governs execution; historical descriptions of 'In Progress' or prior implementation snapshots do not establish a currently running worker. Preserve completed components and assess only the documented residual scope.

Before any later project-specific implementation, resolve the exact editable Workbench artifact or repository directory, verify its recorded hash/version and accepted destination/base, and attach current source and acceptance references to the assignment. Concord repository identity alone does not prove the older full Workbench HTML is present: PROJECT_RECORD.md at `40f647e5b8d23307f713fc3a3753a1d3a46611cb` explicitly bounds the available source and records the historical Workbench hash as index evidence. Do not recreate missing historical work or treat old static checks as fresh browser/integration acceptance. Missing source identification blocks only the affected implementation assignment; planning and unrelated work can continue.

Track Concord’s human interaction system across touch visualization, gesture handling, MIDI audio and phone-sized layouts.

## Touch / gesture

* Small translucent touch bubbles and heat deposition based on press length.
* Pointer Events / multi-touch tracking.
* Gesture/interaction verification metrics where useful.
* Three-axis object rotation, pinch zoom, twist/roll and tilt-linked controls.
* Graph-specific crosshair, pan and pinch/zoom interaction.

## Audio

* Use the supplied local MIDI archive for page soundtracks.
* Crossfade between tracks when entering different data spaces.
* Randomized short click phrases sampled from the MIDI material; duration varies roughly 0.1–3 seconds.
* Respect browser autoplay limitations and provide a first-interaction fallback.

## Mobile

Primary screens should fit a standard portrait phone without vertical page scrolling when feasible. Test safe-area/nav-bar overlap, touch-target size, short viewports, landscape fallback and reduced-motion/accessibility behavior.

## Recorded implementation evidence — historical

The current Concord Workbench already implements substantial portions of this interaction layer:

* Pointer-event based interaction with multi-pointer tracking, pressure, touch bubbles/heat deposition, hold timing, capture/release behavior, and gesture state;
* canvas/object drag interaction and multi-touch handling;
* responsive phone-sized layouts and mobile-specific CSS breakpoints;
* embedded MIDI soundtrack data, local MIDI parsing/playback logic, soundtrack controls, and sound state in the Workbench dock;
* interactive chart/canvas surfaces designed for touch and zoom/pan-style interaction;
* current Workbench controls expose the shared timeline, playback/speed, audio toggle, and interactive object manipulation.

The current design record remains Backlog; historical interaction work is preserved.

## Remaining work

* physical-device regression across representative Android/iOS screen sizes and browser engines;
* verify all intended pinch/zoom/twist/roll/three-axis gestures consistently across relevant objects and charts;
* benchmark any interaction/fingerprint metrics before using them analytically;
* accessibility review for touch targets, keyboard/focus paths, reduced motion, and contrast;
* audio autoplay/fallback, crossfade, polyphony, and interruption testing;
* confirm that touch/gesture telemetry follows the intended privacy/visibility boundary and is not silently treated as identity proof;
* remove or repair any interaction surfaces that are visually present but not data-sensitive enough.

Current status is Backlog for interaction design and acceptance planning; historical code does not establish physical-device, accessibility or privacy acceptance.
