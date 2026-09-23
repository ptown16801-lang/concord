# Changelog

This file consolidates the implementation history that was previously split across divergent Finger branches and pull-request descriptions. Historical branches/commits remain available as provenance; this log records the reconciled state rather than rewriting those histories.



### JON-80 follow-up — ballot audit integrity

- Corrected the recovered ballot intake's append-only claim: attempt rows previously allowed direct updates and deletion. Added durable update/delete guards and insert-collision guards that also reject SQLite replacement writes without depending on connection-specific recursive-trigger settings.
- Protected accepted receipts against replacement through each existing unique key and explicit rowid. The recovered artifact remains preserved on its original delivery branch.
- Replaced the Promise-based concurrency check with independent child processes sharing a file-backed database, and verified additive protection of historical records after an upgrade and reopen.
- This follow-up does not establish authoritative eligibility/authentication integration, election-close semantics, cross-track acceptance, or resistance to a process that can modify the schema/database file. See `docs/ballot-audit-integrity.md`.

### Added


- Added authoritative exact electorate accounting for disjoint accepted-ballot
  and eligible-nonvoter sets, including integer-only threshold decisions.
