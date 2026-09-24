# Evidence snapshot: Archivist, records, and publication model

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model
- Version: 2026-09-23T11:31:38.552Z
- Source date: 2026-09-23T11:31:38.552Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## Project ownership correction — 2026-09-16 Eastern

**Concord → Archive & Records subsystem.** Vote is a folder only; Archive & Records is not a separate project. This original issue remains the sole owner of its records/publication deliverable. Its design-only boundary remains unchanged. Historical <issue id="ae3a7c27-f57a-48d5-af80-abc58b3514f7" href="https://linear.app/jons-garage/issue/JON-93/concord-supervisor-loop-project-health-and-safe-auto-repair">JON-93</issue>/<issue id="dc5db832-0a9c-4b4d-a8a2-b4e582a423fe" href="https://linear.app/jons-garage/issue/JON-95/concord-dispatcher-dependency-aware-continuous-work-dispatch">JON-95</issue> orchestration records do not control current execution. This issue is currently Backlog with no delegate; relocation itself did not authorize coding. Existing security, source ownership and Research Library separation remain intact. Older references to a separate Archive project are superseded organizational history.

---

## Current design contract — full design audit, 2026-09-16

**Deliverable:** Archivist and institutional publication contract. Current tracking state is Backlog with no delegate. Native issue status and delegation fields are authoritative; historical <issue id="ae3a7c27-f57a-48d5-af80-abc58b3514f7" href="https://linear.app/jons-garage/issue/JON-93/concord-supervisor-loop-project-health-and-safe-auto-repair">JON-93</issue>/<issue id="dc5db832-0a9c-4b4d-a8a2-b4e582a423fe" href="https://linear.app/jons-garage/issue/JON-95/concord-dispatcher-dependency-aware-continuous-work-dispatch">JON-95</issue> records do not establish an active worker. Linear is being used for design, specification, dependencies and acceptance planning. No application coding, rebuild, PR, test run, source-recovery run, deployment or child-worker launch is authorized by this issue. Older implementation scopes/checkpoints below are reference history, not dispatch instructions.

**Exclusive ownership:** Own submission envelopes, publication classes, append-only correction/supersession, protected failure/disclosure ledger interfaces and Archivist read-only consumer rules. <issue id="23e7c7df-a9fe-4ba3-b920-5079a466bb25" href="https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores">JON-17</issue> owns security/domain authorization and authoritative-store controls; this issue references those controls. <issue id="c430260a-9423-4dd8-92de-091f3541137d" href="https://linear.app/jons-garage/issue/JON-28/concord-artifact-archive">JON-28</issue> owns artifact preservation; neither record system owns Research Library GOV/PDF state. No new repository or coding target is needed to finish the design.

**Completion evidence for design:** one source-linked specification or gap/decision record, explicit inputs/outputs, named canonical dependency owners, and reviewable acceptance criteria. Reuse accepted decisions and existing artifacts; an already completed deliverable is referenced, not reassigned. Source/runtime gaps block only affected future execution, not independent design work.

---

## Historical audit checkpoint — 2026-09-16

Before the later <issue id="ae3a7c27-f57a-48d5-af80-abc58b3514f7" href="https://linear.app/jons-garage/issue/JON-93/concord-supervisor-loop-project-health-and-safe-auto-repair">JON-93</issue>/<issue id="dc5db832-0a9c-4b4d-a8a2-b4e582a423fe" href="https://linear.app/jons-garage/issue/JON-95/concord-dispatcher-dependency-aware-continuous-work-dispatch">JON-95</issue> design dispatch, this issue was Backlog / queued in Concord's Archive & Records subsystem; the former standalone project record remains retired. The prior agent session has an explicit Stopped checkpoint (2026-09-16 09:33:30 UTC); prior handoff text is historical and does not establish an active worker. Before any future implementation assignment, verify this Concord subsystem's exact authorized repository/directory and accepted base from current records. Do not infer a target from the old `Test` repository handoff or automatically copy Concord's runtime/environment. Existing records work is preserved; no new execution is dispatched by this repair.

# Archivist, records, and publication model

Specify the accepted records/publication architecture without giving the Archivist power to decide substantive institutional authority.

## Accepted model

* The public governance ledger is append-only and read-only to consumers. Corrections are new entries; prior entries are not silently rewritten or deleted.
* The **independent Archivist is the sole public-ledger publisher/writer**. Branches, agents, committees, and investigators do not write the public ledger directly.
* Source institutions submit authenticated/signed records; the Archivist verifies that the authenticated institutional identity matches the signed source before publication.
* House, Senate, Executive, and Judiciary use independent institutional credentials under one standardized Microsoft AGT-compatible authentication protocol. Independent credentials are required; physically separate transport channels are not required merely for their own sake.
* Legislative, judicial, and executive decisions that are publishable under the governing rules are published immediately.
* Publishable misconduct suspicions follow the adopted immediate-publication rule when lawfully publishable.
* Other routine records may use scheduled publication.
* Direct secret-investigator suspicions/working material are **not** published merely because they exist; they remain protected unless lawfully disclosed through the authorized process.
* The Archivist routes/publishes records but does not determine whether an act was legally authorized, factually correct, or institutionally valid. Those determinations remain with the proper institutional/legal process.

## Failure / disclosure records

* Maintain a separate append-only **secret failure ledger** for failed publication attempts, authentication failures, security/policy mismatch attempts, and other protected publication-security failures.
* Ordinary public consumers do not receive the secret failure ledger.
* Authorized special investigators and the grand jury may access the failure ledger within their defined authority.
* When the grand jury or another authorized process receives a redacted disclosure package, record that package in a separate append-only **disclosure ledger** so what was disclosed, when, under what authority, and in what redacted form is reconstructable.
* Disclosure does not convert the protected source archive into a public store.

## Record boundaries

Keep distinct:

* public governance ledger;
* branch/source authoritative records;
* House/Senate/Judiciary investigatory archives;
* secret failure ledger;
* grand-jury/disclosure ledger;
* Concord Artifact Archive;
* Concord Research Library.

The Research Library is scientific evidence infrastructure and is never the authoritative governance ledger, frozen evidence store, secret failure ledger, or investigatory archive.

## Integrity / provenance requirements

* Stable record IDs and source IDs.
* Authenticated institutional source plus signature/provenance metadata.
* Append-only correction/supersession links.
* Publication timestamp and publication class (immediate/scheduled/protected/nonpublic).
* Links to controlling decision/order/authority where applicable.
* Recovery/migration provenance sufficient to distinguish recovered bytes from current authority.
* Consumers can trace a published entry back to the authenticated source record without gaining unauthorized access to protected material.

## Work

Define submission envelopes, institutional credentials, Archivist verification, append-only publication APIs, immediate/scheduled queues, correction/supersession behavior, protected failure logging, redacted disclosure packages, search/index views, recovery provenance, and Workbench read-only views. Prove that no ordinary branch/agent path can bypass the Archivist to write the public ledger and that the Archivist cannot manufacture institutional authority merely by publishing a record.
