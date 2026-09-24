# Evidence snapshot: Finger — queued implementation workload

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-69/finger-queued-implementation-workload
- Version: 2026-09-18T05:26:43.821Z
- Source date: 2026-09-18T05:26:43.821Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current design contract — full design audit, 2026-09-16

**Deliverable:** Finger historical execution parent — preserve canceled state. This historical parent remains Canceled. Linear is being used for design, specification, dependencies and acceptance planning. No application coding, rebuild, PR, test run, source-recovery run, deployment or child-worker launch is authorized by this issue. Older implementation scopes/checkpoints below are reference history, not dispatch instructions.

**Exclusive ownership:** Finger's deployable beta is COMPLETE. This canceled issue preserves the approved contract and execution history; it has no current worker and must not be restarted. <issue id="2b2438fa-ad17-4b16-bfc3-b6d4ab0c76b5" href="https://linear.app/jons-garage/issue/JON-70/finger-web-collector-component">JON-70</issue>/71/73/74/75 preserve only explicitly identified residual design gaps. <issue id="086e1001-94e4-495c-8bf3-41d712d80fd0" href="https://linear.app/jons-garage/issue/JON-72/finger-raw-storage-and-historical-retention">JON-72</issue> remains Done. This parent does not create a new beta milestone, authorize child delegation or require reopening for future design acceptance.

**Completion evidence for design:** one source-linked specification or gap/decision record, explicit inputs/outputs, named canonical dependency owners, and reviewable acceptance criteria. Reuse accepted decisions and existing artifacts; an already completed deliverable is referenced, not reassigned. Source/runtime gaps block only affected future execution, not independent design work. No quiz content, data, question banks, scores, routes, fixtures or acceptance requirements are used in current work.

---

## Finger audit reconciliation — 2026-09-16

Finger's deployable-beta milestone is complete. Preserve that completion, the canceled historical <issue id="e86a4f49-b59a-441c-8979-20e1b1c29f58" href="https://linear.app/jons-garage/issue/JON-69/finger-queued-implementation-workload">JON-69</issue> execution parent, the remaining Backlog records, and <issue id="086e1001-94e4-495c-8bf3-41d712d80fd0" href="https://linear.app/jons-garage/issue/JON-72/finger-raw-storage-and-historical-retention">JON-72</issue> Done. Earlier implementation / child-delegation instructions and old `Test` or empty-repository handoffs below are historical; they must not launch duplicate implementation or redefine the repository target.

The verified Concord repository baseline already contains Finger collector, ingestion, persistence and processing work. This does not claim that every broader integration, device-validation or hardening criterion in the old scope is accepted. Any additional assignment must identify a concrete remaining gap, reconcile existing code/results, verify its project profile and exact accepted base, and satisfy current execution authorization. Do not reopen the completed beta or reselect a repository from old session messages.

# Purpose

Preserve the approved Finger contract and completed deployable-beta history as a standalone Concord data-collection subsystem.

## Historical execution disposition

The September 16 execute/resume requests were historical implementation authorization. They are superseded for current work by the owner's design-only direction. The parent remains Canceled; it must not activate children or create engineering assignments. Residual design ownership is recorded in the existing children, and completed beta/storage work is preserved.

## Approved Finger contract

* Finger is a standalone Concord subsystem whose primary role is **data collection**.
* User-facing form is a web-page window/overlay: login overlay and prompted pop-up elsewhere.
* Prompt: **“Place your finger on the scanner.”**
* Browser/client stays thin: collect available interaction/device data and transmit it. Storage, processing, analysis, heat-map/replay generation, comparison, and future interpretation live server-side.
* Finger records all available interaction data while active and saves everything it collects.
* Support touch, multi-touch, mouse, trackpad, stylus, scrolling, movement/path/timing, coordinates, contact properties when available, page/DOM context, and other available web interaction metadata within the capture window.
* Record device/browser-reported touch capacity and observed simultaneous-contact capability.
* Keep raw and normalized coordinates and full raw event streams.
* Save visual replay and internal heat maps (position + dwell + path); separate touch/mouse/stylus plus combined views; per-session heat maps.
* Preserve initial DOM state, mutations during capture, and final DOM state.
* Finger collects until the component disappears. Contact has a 10-second maximum. Pre/post context and post-Continue timeout remain configurable/TBD.
* Close button exists; close interaction is recorded. After Close, keep collecting for 3 seconds before Continue appears.
* Scanner disappears after normal scan completion; only Continue is shown, centered below. No Accepted/checkmark state.
* Backend success/failure never blocks admission and is not shown to the interacting user.
* Finger can run repeatedly in a visit; each run is its own session.
* Maintain some persistent user/session association; exact identifier mechanism is TBD.
* Finger runs at login and can be invoked explicitly elsewhere in Concord.
* Dedicated Finger storage for raw/replay data; Concord main DB stores summaries/references.
* Hybrid storage: queryable event/time-series records plus object storage for large raw/replay artifacts.
* Retain raw source data permanently unless explicitly purged; derived analysis can be recomputed later.
* Preserve every analysis generation rather than overwriting it.
* Every record must include Finger version and Concord version/build.
* Finger data is a permanent part of Concord’s historical record.
* Administrators may compare different users’ Finger histories side-by-side; aggregate-group comparison/export remain TBD.
* Development/testing must have an on/off control.

## Historical delivery standard — preserved evidence only

Completion means Finger actually works inside Concord, server ingestion/storage are functional, replay/heat-map processing works, failure paths do not block user entry, and regression testing passes. This historical delivery text does not reopen the canceled parent or make beta creation pending.
