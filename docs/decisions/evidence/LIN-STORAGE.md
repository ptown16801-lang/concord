# Evidence snapshot: Research Data Storage & Context Policy

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/document/research-data-storage-and-context-policy-48eb47b813ec
- Version: 2026-09-18T06:01:54.390Z
- Source date: 2026-09-18T06:01:54.390Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Goal

Store enough evidence to make the case study auditable and reusable without forcing every agent to load the entire project or creating unnecessary storage bureaucracy.

This policy is intentionally adaptive. It defines minimum provenance and context rules, not rigid file counts, document sizes, schemas, or mandatory storage technology.

## Core rule: write once, reference thereafter

Do not duplicate the protocol, source summaries, experiment evidence, or prior conclusions across issues and documents.

Issues contain the bounded assignment, required inputs, output location, acceptance criteria, and blockers. Research content belongs in the relevant research artifact.

Load only the context required for the current task.

## Storage layers

### 1. Research Protocol

The existing **Research Execution Protocol — Experiment-First Case Study** is the authoritative shared methodology.

Keep it compact. Downstream tasks reference it rather than copying it.

### 2. Source Index

Maintain one compact source index for the case study.

For each useful source record only what is needed for reliable reuse, such as:

* stable short source ID;
* citation/title;
* canonical URL/DOI/repository;
* source type;
* relevance;
* verification/read status;
* important edition/version/date distinctions;
* major coverage gap if any.

Do not paste full papers or long source summaries into the index.

A source discovered through multiple services remains one source when it is the same underlying work.

### 3. Experiment Records

Use one focused research record per materially distinct experiment or experimental setting in the focal source **when separation improves context efficiency or scientific clarity**.

Do not mechanically create a document for trivial subsections. Closely related experiments may share a record when that is more efficient and does not mix their evidence.

Each record should preserve enough information to reconstruct the analysis:

* experiment identity/scope;
* architecture/conditions relevant to the question;
* observed behavior/results;
* material claims with source locators;
* qualifications/confounders;
* origin and evidence-strength classifications where relevant;
* failures/negative results;
* unresolved questions;
* review disposition.

Do not require a separate database row or artifact for every sentence or minor observation.

### 4. Cross-Experiment Synthesis

Create after the relevant experiment records are sufficiently stable.

Reference experiment records rather than copying all underlying evidence. Pull forward only the evidence needed to support the synthesis.

### 5. Concord Comparison

Keep separate and unopened to external-case researchers until the protocol permits M5.

Reference the frozen case-study outputs and the versioned read-only Concord material. Do not duplicate Concord's source documents into this project.

### 6. Final Case Study

Assemble from accepted artifacts near the end. It is a readable report, not the primary evidence store.

## Adaptive granularity

Storage granularity follows the work.

Split an artifact when:

* unrelated agents would otherwise repeatedly load irrelevant context;
* independent review requires a clean boundary;
* the artifact becomes difficult to navigate;
* different parts have different acceptance states;
* or provenance becomes ambiguous.

Merge or keep material together when splitting would add handoff overhead without reducing context or improving review.

There is no fixed required number of documents, experiment records, claims, or source entries.

## Token/context efficiency

* Prefer references/links over repeated text.
* Do not recursively load parent issues or unrelated artifacts.
* An agent receives the protocol plus only the source/experiment/synthesis records necessary for its bounded task.
* Summaries may be used for navigation, but important conclusions must remain traceable to primary evidence.
* Do not repeatedly regenerate summaries that already exist and remain valid.
* Do not copy the entire bibliography into each research task.
* Do not load Concord materials before M5 except the minimal information required to enforce the isolation boundary.
* When a source or artifact is large, retrieve only the relevant section when the tooling supports it.

## Provenance minimum

Every material research conclusion must remain traceable to:

1. the underlying source;
2. the relevant experiment/setting when applicable;
3. the evidence location or sufficiently precise locator when available;
4. whether it is reported evidence, case-study inference, hypothesis, or new proposal;
5. review status or unresolved disagreement when material.

Use the lightest representation that preserves these facts.

## Tool neutrality

Do not require GitHub, JSONL, a database, or any particular external storage technology merely for organizational neatness.

Use Linear documents for normal research artifacts unless another medium materially improves the research (for example, large structured data, executable analysis, or implementation artifacts). If another medium becomes useful, link it from Linear and preserve provenance.

Do not create a new repository solely to satisfy this policy.

## Research flexibility

The storage system must not prevent researchers from:

* following an unexpected source;
* recording an unanticipated behavior;
* adding a new experimental category;
* preserving contradictory evidence;
* proposing a new experiment;
* or changing the granularity of records when the evidence demands it.

Methodological changes still follow the protocol's review/freeze rules; ordinary evidence organization does not require human approval.

## Anti-bloat rule

Do not create an issue, document, child agent, summary, ledger entry, or schema field unless it serves at least one of:

* evidence preservation;
* provenance;
* independent review;
* context reduction;
* coordination/acceptance;
* or final reporting.

If it serves none of these, omit it.

## Stage behavior

M0 may adjust this policy if the pilot demonstrates a concrete storage/context failure.

Once Research Protocol v1 is frozen, routine storage adaptations that preserve provenance and isolation are allowed without reopening the protocol. A storage change becomes a protocol change only if it alters scientific methodology, evidence standards, reviewer independence, or stage gates.

## Isolation

All case-study artifacts stay inside this project or in explicitly linked research storage.

Do not write research artifacts into Concord or Jefferson.

The final contamination audit includes storage destinations and links as well as Linear issue/project changes.
