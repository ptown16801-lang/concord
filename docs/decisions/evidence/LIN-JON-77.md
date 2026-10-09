# Evidence snapshot: Google Drive client runtime, reader, full-text search, and workspace portability

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-77/google-drive-client-runtime-reader-full-text-search-and-workspace
- Version: 2026-09-18T05:07:08.083Z
- Source date: 2026-09-18T05:07:08.083Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Continuation boundary — design audit 2026-09-16

Library remains intentionally Canceled / lowest-priority; this issue remains Backlog. Current work is design and record repair only, with quiz functionality excluded. The behavior below is the target contract for a future authorized continuation, not permission to rebuild existing features or begin coding now.

Recover and inspect the existing artifact through <issue id="3f634998-36ca-4a68-a9c9-e3a802d9e808" href="https://linear.app/jons-garage/issue/JON-26/research-library-google-drive-scientific-archive-and-context-graph">JON-26</issue> before defining the missing work. Preserve and reuse the completed <issue id="a30c2164-616b-4900-8d29-fd2c6292eb63" href="https://linear.app/jons-garage/issue/JON-49/research-library-static-artifact-schema-and-publish-validator">JON-49</issue> static validator, <issue id="4f1bb662-c65c-4b1f-bf61-5b6e003d18b1" href="https://linear.app/jons-garage/issue/JON-50/research-library-catalog-and-canonical-paper-detail-page">JON-50</issue> catalog/detail/filter routes and read-only Drive attachment bridge, and <issue id="2579930b-82a9-4ddc-9784-c83b5f308450" href="https://linear.app/jons-garage/issue/JON-51/research-library-relationship-graph-controls-and-comparison-workspace">JON-51</issue> graph/2–4-paper comparison implementation. Completion records do not prove every client-runtime acceptance item below; identify the precise missing behavior and link existing evidence before assigning it.

<issue id="31bffd2a-4b67-47c6-9a4e-ff7a0bf9a5a4" href="https://linear.app/jons-garage/issue/JON-77/google-drive-client-runtime-reader-full-text-search-and-workspace">JON-77</issue> owns only the remaining Drive runtime/scan/OAuth lifecycle, full-text access, reader/cancellation, notes, local workspace export/import, and snapshot-portability behavior not already delivered. It extends the existing catalog and comparison surfaces; it does not create another canonical GOV store or duplicate those surfaces. <issue id="7c15dbbd-f49a-4d45-99e4-cd4e31ef7f44" href="https://linear.app/jons-garage/issue/JON-56/normalize-research-library-static-artifact-schema-to-logical-data">JON-56</issue> owns schema normalization, <issue id="ceb61410-e21f-4a02-b629-7c62fc18943e" href="https://linear.app/jons-garage/issue/JON-52/research-library-deep-link-and-module-integration-contract">JON-52</issue> owns cross-module route integration, <issue id="ed2b278b-cb29-4c1d-8cbd-ceaa94251699" href="https://linear.app/jons-garage/issue/JON-63/build-historical-research-vs-modern-comparison-research-library-view">JON-63</issue> owns the historical/modern view, and <issue id="2dcf51f4-4682-4809-ad56-4a7ba7ee8288" href="https://linear.app/jons-garage/issue/JON-57/run-live-browser-acceptance-for-merged-research-library-workbench">JON-57</issue> owns shared live-browser acceptance. Consume their contracts/evidence and record only this issue's additional client-runtime checks. Do not reopen <issue id="4f1bb662-c65c-4b1f-bf61-5b6e003d18b1" href="https://linear.app/jons-garage/issue/JON-50/research-library-catalog-and-canonical-paper-detail-page">JON-50</issue>/51 or mark the unchecked criteria passed without the corresponding evidence.

Capture the Library client/runtime work already developed in ChatGPT so it remains separate from the research-graph tasks.

## Runtime constraints

* Keep the Library usable as static HTML/CSS/JavaScript on a small web server.
* PDFs remain hosted in Google Drive.
* Use browser-side Google OAuth/API access for live Drive interaction.
* No permanent database server, application service, search daemon, vector database daemon, dependency install, or build step is required for ordinary browsing.
* Drive access is read-only by default.

## Library client behavior

* Recursive, paginated Drive scans with bounded requests and cancellation/stale-result protection.
* Catalog search by title, author, DOI, topic, taxonomy and verification state.
* Drive-backed PDF full-text search where supported.
* Quick views such as all, unread, reviewed, starred, and in-comparison.
* Native/integrated PDF reader behavior with safe cancellation and no stale-result overwrite.
* Manual 2–4 paper comparison workspace and page notes.
* Reversible metadata/workspace edits.
* Local workspace export and portable snapshots with lineage/version checks.
* Safe catalog import/migration: reject invalid imports before replacement, preserve custom fields and metadata-only records, use stable Drive-ID-first attachment joins, and never merge by filename alone.
* Optional snapshot creation without changing Google Drive's role as canonical PDF storage.

## Acceptance criteria

- [ ] Browser OAuth/Drive connection and disconnect flow is documented and tested.
- [ ] Recursive scans are paginated, bounded, cancellable, and resume safely.
- [ ] Metadata search, Drive full-text search, filters, quick views, and sorting pass browser acceptance.
- [ ] Reader navigation and stale/cancelled request handling are regression-tested.
- [ ] Notes/comparison state survives workspace export/import without mutating canonical GOV identity.
- [ ] Snapshot lineage rejects incompatible or stale replacement rather than silently overwriting.
- [ ] Invalid catalog imports fail before live state is replaced.
- [ ] Filename-only merges are impossible in the attachment join path.
- [ ] Static deployment works without a secondary daemon/service.
