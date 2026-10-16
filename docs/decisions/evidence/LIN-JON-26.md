# Evidence snapshot: Research Library — Google Drive scientific archive and context graph

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-26/research-library-google-drive-scientific-archive-and-context-graph
- Version: 2026-09-18T05:26:43.718Z
- Source date: 2026-09-18T05:26:43.718Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Structural correction — 2026-09-16 Eastern

**Canonical project: Concord. Subsystem: Research Library.** Vote is only a folder; the former Library project record is retired, not a separate active project. This same issue ID and its existing child issues remain the sole Research Library work tree. **The existing lowest-priority hold survives this move: do not execute, delegate, schedule, or promote this work without specific owner authorization.** Preserve Done children <issue id="a30c2164-616b-4900-8d29-fd2c6292eb63" href="https://linear.app/jons-garage/issue/JON-49/research-library-static-artifact-schema-and-publish-validator">JON-49</issue>/50/51 and all prior artifacts. No quiz work. Read older references to a separate Vote/Library project as superseded organization, not altered GOV/PDF/storage boundaries.

---

## Current audit checkpoint — 2026-09-16

Research Library remains a held, lowest-priority Concord workstream and this issue remains Backlog / Do Not Execute. Current authorization covers record repairs, not promotion of implementation. Its original issue tree now belongs to Concord; the former Library project (`6917f917-d299-4681-b26f-388ab91e7917`) is a retired historical reference.

Before future implementation, resolve the exact authorized repository/subdirectory or editable artifact target, accepted base/hash, project-specific runtime/environment, source access, dependencies and acceptance contract. The recorded merged artifact `Concord_Workbench-3-Research-Library.html` has SHA-256 `580d95545b68316a492651cf5df422ae94f6eb2c9bca84fde34984411e880b6f` and reported size 8,009,292 bytes, but the audited issue records do not supply a fetchable attachment or repository commit for it. Recover and verify the existing artifact before editing; do not assume it exists in the current Concord repository or recreate completed <issue id="a30c2164-616b-4900-8d29-fd2c6292eb63" href="https://linear.app/jons-garage/issue/JON-49/research-library-static-artifact-schema-and-publish-validator">JON-49</issue>/50/51 work.

September 15 model/API/browser/upload limitations are historical observations. Recheck only the capabilities required by a later authorized assignment; do not describe them as proven current global failures. Google Drive remains the canonical PDF store, with per-attachment verification/quarantine rather than a blanket requirement to verify all PDFs before using a trusted subset.

## ADOPTED EXECUTION ARCHITECTURE — September 16, 2026

Use **Linear as the control plane** for Research Library issues, priorities, dependencies, decisions, acceptance criteria, and evidence checkpoints. Keep **Google Drive as the canonical PDF store**; do not duplicate the corpus into Linear merely to make it executable.

When work requires reading PDFs, repository execution, browser interaction, or multi-step file processing, route execution to **ChatGPT Work or Codex with the necessary authorized access**. Results must flow back into Linear with reproducible evidence, exact identifiers/hashes where available, failures, repository/artifact links, and updated acceptance state.

Linear's inability to directly read the PDF binaries is therefore an execution-routing constraint, not by itself a project-health blocker.

## Entity boundary — Concord implementation parent

**The Research Library is a distinct Concord subsystem. Its boundary record is** `Concord subsystem — Research Library` **in Concord; this original issue remains the sole coordinating parent for the subsystem. Vote is only the folder name.** Within Concord, the Research Library must exist as its own distinct page/entity and must not be conflated with Global Search, the Institutional Learning Library, the Concord Artifact Archive, the Archivist/public-ledger subsystem, or the Data Atlas. Those systems may index, link to, visualize, or consume Research Library data, but they do not own its canonical GOV records or replace its page.

Required page identity: `Research Library`

Concord subsystem boundary: `Concord subsystem — Research Library`, document `7e18abc7-564e-4d0e-b52b-0c8f663050c1`, in **Concord**.

Concord implementation owner: <issue id="3f634998-36ca-4a68-a9c9-e3a802d9e808" href="https://linear.app/jons-garage/issue/JON-26/research-library-google-drive-scientific-archive-and-context-graph">JON-26</issue> and its child implementation/research issues.

Required navigation behavior: a first-class Concord navigation destination with its own route/page state, not merely a floating result panel or subsection of another module.

Build the Concord scientific-PDF library around files hosted in Google Drive and a lightweight web interface, minimizing secondary-server requirements.

## Scope

* Hundreds of closely related scientific PDFs.
* Searchable metadata/indexing and stable links.
* Separate historical research archive and modern-comparisons archive, shown side by side with cross-links.
* Preserve provenance for recommendations derived from papers.
* Support deep comparison of archived work with modern implementations and Concord’s architecture.
* Keep the research interface integrated into the Workbench explorer/search system.

Research candidates have included repository/library systems and paper-management approaches, but the final design should prioritize ease of adaptation to Google Drive, lightweight hosting, searchable organization and long-term preservation of the research trail.

## Current implementation state — 15 Sep 2026

The library architecture has advanced beyond simple folder/index management into an identity-safe research graph.

### Canonical identity rule

* **GOV ID is the canonical bibliographic identity.**
* Google Drive file ID is the physical attachment identity.
* PDF filename is never accepted as proof of paper identity.
* PDFs that fail identity verification are quarantined from full-text, citation, and math enrichment rather than allowed to contaminate the canonical graph.

### Current corpus and graph

* 324 canonical bibliography records across A–W concept families.
* 105 manifest records currently marked downloaded.
* Current attachment audit state: 11 PASS_CONFIRMED, 84 PASS_SNIPPET_MATCH, 10 MISMATCH_CONFIRMED, 0 UNCERTAIN.
* 324 canonical graph nodes and 9,596 validated relationship edges across semantic similarity, direct citation, cited-by, bibliographic coupling, co-citation, taxonomy, and shared authorship.
* TF-IDF project-context control benchmark: \~64.5% same-family #1 neighbor and \~85.8% at least one same-family result in top 5.
* A 100-pair human-review benchmark exists, including same-family, cross-family and negative-control pairs.

### Scientific similarity implementation

Hugging Face integration is now available. Selected non-LLM scientific models:

* `allenai/specter2_base` + `allenai/specter2` proximity adapter — Apache-2.0.
* `malteos/scincl` — MIT, safetensors, citation-neighborhood scientific representation.

The benchmark harness already has common evaluation metrics and an ensemble path. Actual 324-paper SPECTER2/SciNCL inference remains blocked by external model/runtime network access and must not be represented as completed.

### Citation layer

A verified-PDF citation pilot has run successfully using only PASS_CONFIRMED attachments:

* 24 internal-library direct citation edges recovered from verified reference sections.
* 24 cited-by inverse edges, 112 co-citation edges, and 2 directed bibliographic-coupling edges are currently represented in the validated graph.
* GOV-263 directly cites GOV-260 even though the TF-IDF semantic control did not rank GOV-260 in GOV-263's top 10. This establishes citation evidence as an independent graph signal.

### Math layer

Ordinary PDF text extraction is acceptable for prose search but is non-authoritative for equations and formal symbols. Math-heavy pages must be routed through a specialized equation-extraction path before formula similarity is computed.

### Graph design rule

Do not collapse semantic similarity, direct citations, shared references, authorship, taxonomy and mathematical similarity into one opaque score yet. Preserve them as independently inspectable signals until review data justifies a weighting/reranking model.

### Hosting constraint retained

Google Drive remains the canonical PDF store. Heavy indexing/model work is batch/offline. The small Concord web server should consume generated indexes and graphs without requiring a permanent secondary model server or vector-database daemon.
