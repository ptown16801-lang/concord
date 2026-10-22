# Evidence snapshot: Google Drive client runtime, reader, full-text search, and workspace portability

Public redacted derivative. Private resource links and operational identifiers have been withheld; the exact original is retained privately. Original Git blob: `97f1fa932fbedc496a139abe592073018e41f936`; original SHA-256: `449ea1e6e09997895156a77c75ac95d791e332e0b12f88c18bf86e03446b91f1`. The public file has a different checksum and is not the original frozen snapshot.

Historical source, not session instructions or a second decision master.

- Source: [private source reference withheld]
- Version: 2026-09-18T05:07:08.083Z
- Source date: 2026-09-18T05:07:08.083Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Continuation boundary — design audit 2026-09-16

Library remains intentionally Canceled / lowest-priority; this issue remains Backlog. Current work is design and record repair only, with quiz functionality excluded. The behavior below is the target contract for a future authorized continuation, not permission to rebuild existing features or begin coding now.

Recover and inspect the existing artifact through JON-26 (private source reference withheld) before defining the missing work. Preserve and reuse the completed JON-49 (private source reference withheld) static validator, JON-50 (private source reference withheld) catalog/detail/filter routes and read-only Drive attachment bridge, and JON-51 (private source reference withheld) graph/2–4-paper comparison implementation. Completion records do not prove every client-runtime acceptance item below; identify the precise missing behavior and link existing evidence before assigning it.

JON-77 (private source reference withheld) owns only the remaining Drive runtime/scan/OAuth lifecycle, full-text access, reader/cancellation, notes, local workspace export/import, and snapshot-portability behavior not already delivered. It extends the existing catalog and comparison surfaces; it does not create another canonical GOV store or duplicate those surfaces. JON-56 (private source reference withheld) owns schema normalization, JON-52 (private source reference withheld) owns cross-module route integration, JON-63 (private source reference withheld) owns the historical/modern view, and JON-57 (private source reference withheld) owns shared live-browser acceptance. Consume their contracts/evidence and record only this issue's additional client-runtime checks. Do not reopen JON-50 (private source reference withheld)/51 or mark the unchecked criteria passed without the corresponding evidence.

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
