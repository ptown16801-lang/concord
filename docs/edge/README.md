# Concord S26 edge-specialist workstream

Status: candidate preparation under JON-219 / JON-226–JON-231.

This directory contains **non-production preparation artifacts** for the optional Samsung Galaxy S26 edge-specialist worker.

The S26 is not a general Concord reasoning authority. It receives bounded specialist tasks and returns structured advisory results. Ubuntu/Concord retains credentials, repository access, policy, acceptance, state mutation, validation, and fallback behavior.

## Issue map

- JON-226 — device/USB/ONNX/QNN feasibility.
- JON-227 — benchmark packet, metrics and admission thresholds.
- JON-228 — retrieval/embedding/reranking benchmark.
- JON-229 — NLI/PII/extraction/code-search benchmark.
- JON-230 — independent task-specific qualification.
- JON-231 — optional adapter after qualification.

## Resource rule

All issues may be In Progress, but only one heavy Ubuntu workload may execute at a time. Preparation, documentation, hashing and review-template work may proceed concurrently with one S26 inference job.

No model, task, backend or device capability is qualified by the presence of these files.

Decision impact: No decision change.
