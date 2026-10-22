# Research Library

Status: held subsystem with recorded completed static-artifact, page and graph slices. Continuation and integration remain held. The reported historical Workbench artifact is not recovered as inspectable bytes in this audit; its filename/hash and earlier static checks do not establish a currently usable public interface.

The Research Library has its own page, route, canonical bibliography and attachment-verification state. Search, institutional guides, the artifact archive, public-record publication and the graph presentation layer may link to or consume it; none replaces its identity or owns its records.

## Identity and evidence

A **GOV ID** identifies a bibliographic record. A Drive file ID identifies one physical attachment. A filename is neither paper identity nor proof that the attachment matches its record. Failed identity matches are quarantined from full-text, citation and mathematical enrichment while the canonical metadata record can remain usable.

PDF-derived citation evidence requires a `PASS_CONFIRMED` attachment. Snippet matches and reported downloads are different evidence states. Ordinary text extraction supports prose search but is not authoritative for equations or formal symbols; mathematical similarity needs a verified specialized extraction path.

## Static artifact contract

The deployment profile consists of schema-versioned static data consumed by a lightweight client:

- `research-papers.json`
- `research-edges.json`
- `research-neighbors.json`
- `research-citation-graph.json`
- `research-attachment-audit.json`
- `research-math-graph.json`, when verified data exists

The v1 validator requires unique GOV IDs, resolvable edge endpoints, the confirmed-attachment gate for PDF-derived edges and explicit schema versions. Unknown edge types fail unless introduced through versioning. A partial or invalid build cannot replace the last valid artifact set. These are recorded completed v1 capabilities; current deployment and the original merged UI bytes are separately unverified.

## Page, graph and comparisons

The logical routes are `/research-library` and `/research-library/:govId`; the historical single-file deployment used corresponding hash routes. A page remains addressable when its PDF is missing. Catalog controls cover family, verification state, author, year and journal. Paper detail combines canonical metadata, relevance/taxonomy, attachment state and evidence-backed relationships.

Keep semantic similarity, direct citation, cited-by, shared references/bibliographic coupling, taxonomy, shared authorship, analyst-reviewed relations and mathematical similarity independently inspectable. Available layers toggle separately; unavailable reviewed/math layers remain explicitly unavailable. Do not collapse all signals into one unexplained score. Every edge retains provenance, cross-family links remain distinguishable, and graph identity remains GOV ID.

The comparison design covers two to four canonical records, their metadata, relevance and distinct relationship layers without duplicating PDFs. Missing or quarantined attachments cannot silently produce full-text-derived relations.

## Schema evolution

The compact v1 representation is not an identity failure. Its display-text authors, flattened attachment fields and compact edge keys differ from the normalized logical paper/attachment/edge model. Any migration requires an explicit next version, deterministic conversion or a compatibility reader, preservation of GOV identities and attachment/edge provenance, and regression checks for equivalent logical content. The completed v1 validator must not be weakened or discarded merely because normalization remains unfinished.

## Historical evidence and limits

The retained record reports 324 bibliography records and 9,596 graph edges, dated September 15, 2026. These are historical producer figures, not a newly verified live corpus. It also reports a verified-attachment citation pilot; large-scale scientific embedding inference and mathematical/reviewed graph layers were not established as completed. Historical access/network failures are not asserted as current global failures.

The architecture keeps PDFs in their canonical Drive store, performs heavy indexing/model work in batches, and serves generated static artifacts without requiring a permanent model or vector-database server. This public guide contains no private Drive destination or corpus access link. See [project status](../PROJECT_STATUS.md) for the repair's actual published state.
