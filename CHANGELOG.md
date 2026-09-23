# Changelog

## Unreleased — artifact verification, 2026-09-23

- Added JON-28's standalone local artifact-manifest verifier and JSON CLI: validate
  reference metadata, stream SHA-256 checks, and report missing/mismatched files
  separately from recorded upload status. Includes containment checks and tests.
- See `docs/ARTIFACT_MANIFEST.md`; this slice does not implement archive uploads
  or modify the concurrent scheduler, governance sandbox, or Finger work.

This file consolidates the implementation history that was previously split across divergent Finger branches and pull-request descriptions. Historical branches/commits remain available as provenance; this log records the reconciled state rather than rewriting those histories.


## Unreleased — governance recovery research, 2026-09-23

- Added [the governance recovery research brief](docs/GOVERNANCE_RECOVERY_RESEARCH_2026-09-23.md): fixed candidate provenance, remote collector readiness limits, protocol options, and a proposed failure/acceptance matrix. Research only; no runtime change or independent acceptance claim.
