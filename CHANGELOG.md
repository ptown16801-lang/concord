# Changelog

This file consolidates the implementation history that was previously split across divergent Finger branches and pull-request descriptions. Historical branches/commits remain available as provenance; this log records the reconciled state rather than rewriting those histories.


## Unreleased — bootstrap impeachment recovery, 2026-09-23

- Recovered the existing JON-85 cloud diff and preserved it in Git history.
- Corrected panel arithmetic and thresholds against frozen revision 1.0; select
  each stage independently with fresh trial inputs and frozen stage records.
- Added proportion-based stratified draws, permanent-member priority, trial-capacity
  reservation, source discrepancies, and audited pre-freeze replacement.
- Added Ed25519 command authentication, SQLite event/command replay and competing-writer
  protection, and a durable wrapper around the unchanged eligibility reducer.
- Added frozen-source export, production adapter boundaries and acceptance-test mapping.
