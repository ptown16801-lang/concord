# Candidate s26-local adapter contract

Issue: JON-231

Status: **contract/scaffolding only**. No executable production adapter is authorized before task-specific qualification and owner disposition under JON-230.

## Capability registration

Candidate capability ID:
`s26-local`

The adapter must expose only explicitly qualified task types. There is no generic "send work to S26" operation.

## Request envelope

Minimum fields:
- request_id
- task_type
- qualified_model_id
- qualified_model_revision
- input_schema_version
- input_hash
- bounded_payload
- deadline_ms

The phone receives no repository credentials, Linear credentials, GitHub credentials, merge/deploy authority, or state mutation authority.

## Response envelope

Minimum fields:
- request_id
- task_type
- model_id
- model_revision
- runtime_revision
- backend_observed
- output_schema_version
- output
- output_hash
- latency_ms
- device_status
- validator_compatible

## Host validation

Before consuming a result, Ubuntu must verify:
- request/response identity match;
- task type is allowlisted;
- model/runtime revision is exactly qualified;
- schema is valid;
- output satisfies task-specific deterministic validation;
- timeout/deadline has not invalidated the result;
- provenance receipt is retained.

## Availability and fallback

The adapter must:
- expose health/capability discovery;
- time out cleanly;
- tolerate phone disconnect;
- never block Concord because the S26 is absent;
- return control to a deterministic host/cloud fallback path.

## Security

- localhost/USB transport only for initial implementation;
- no public listener required;
- no secrets stored on the phone for Concord;
- PII/security specialist output is supplemental evidence and cannot replace deterministic safeguards.

## Invocation receipt

Record at minimum:
- request ID;
- task type;
- model/revision;
- runtime/backend;
- input hash;
- output hash;
- timing;
- validation result;
- failure/fallback reason if any.

## Gate

Executable adapter implementation remains blocked until:
1. relevant JON-228/JON-229 benchmark evidence exists;
2. JON-230 returns an eligible task-specific qualification;
3. owner adopts the allowed-use boundary.

Decision impact: No decision change.
