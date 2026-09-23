# Changelog

This file consolidates the implementation history that was previously split across divergent Finger branches and pull-request descriptions. Historical branches/commits remain available as provenance; this log records the reconciled state rather than rewriting those histories.


## Unreleased — workflow-artifact correction, 2026-09-19

- Generalized PR #5's proposed preflight as `qa/workflow/runtime-preflight.mjs`, retaining Node >=22.5 (including Node 24), in-memory SQLite verification, JSON output, and local checkout/HEAD reporting without exposing secrets or remote URLs.
- Retired saved-default/native-delivery/JON-90 approval requirements and PR #11's shared dispatch-policy artifacts. Neither draft was on the default branch; this correction selectively carries forward runtime checks and documents the dispatch retirement without importing its validator, profiles, templates, or policy tests. PR #5 and PR #11 remain unchanged.
- Added runtime compatibility, checkout, failure-output, and secret-safety regression tests. Existing product security controls and Node 22/24 CI remain intact; no held product implementation is resumed.

## Unreleased — reconciliation audit, 2026-09-16
