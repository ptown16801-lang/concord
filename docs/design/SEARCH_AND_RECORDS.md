# Search, records and guides

Status: design requirements with historical UI evidence and incomplete implementation verification. Global search is a derived index, not a canonical records store. Existing library or search UI claims do not establish complete public corpus coverage or a working production integration.

## Search behavior

The design specifies a top-level search input with live autocomplete. A unique strong match may navigate directly to its source; multiple matches open a ranked results view first. Results include enough surrounding text to distinguish passages and preserve stable source, page and topic anchors. Selecting a result opens the relevant passage in the reader.

Contextual-help controls reuse the same index for exact, near and related passages. The nested explorer exposes the guide corpus and other project branches. Indexing must respect source authorization before snippets, counts, suggestions or results are exposed; an index does not grant access to a protected source.

## Separate sources and responsibilities

| Surface | Owns | Search may do |
| --- | --- | --- |
| Shell/navigation | Search placement, windows and navigation hosting | Request routing and open a reader; not redefine source identity |
| Institutional guides | Guide text, stable topic/page identifiers and fictional examples | Index, deep-link and supply contextual help |
| Archivist/public records | Authenticated publication and append-only record history | Index authorized projections and preserve source/version links |
| Artifact archive | Reference artifact identity and provenance | Link to the artifact's authoritative location |
| Research Library | Canonical GOV identities, attachments, graph and verification state | Index permitted metadata and deep-link to its distinct page |

The [Research Library](../research/RESEARCH_LIBRARY.md) retains its own route and page state. It is not a generic search-results subsection. If a Library layer is unavailable, search must represent that state without blocking unrelated modules or fabricating results. Quiz content, answers, scores and routes are excluded.

## Institutional guides

The institutional corpus is a separate content system from scientific bibliography records. Its intended work includes proofreading against accepted decisions, stable identifiers, complete index coverage, deep links, contextual-help coverage and reader navigation. Fictional learning scenarios must remain distinct from authoritative institutional records.

Historical records describe a large generated corpus and embedded reader. The original corpus bytes are not established as shipped by this documentation; a reported page count is not evidence of an inspectable current corpus. Preserve useful generated content if recovered and verify its version rather than recreating it from a count.

## Remaining verification

Current source records identify incomplete proof of full indexing, arbitrary scientific-paper routing beyond exact GOV-ID lookup, multi-match selection across the corpus, contextual help for all interactive assets, and behavior when Research Library layers are partially unavailable. Reader/mobile regression and cross-module deep links also need actual evidence at the chosen implementation revision. See [project status](../PROJECT_STATUS.md).
