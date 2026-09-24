# Concord

Concord is an implementation and UI surface inside the wider Vote project. This repository currently contains the deployable **Finger** beta: a browser interaction collector, a non-blocking ingestion service, dedicated historical persistence, and replay/heat-map processing utilities.

Finger is deliberately separated from Concord's main application data. The browser collector records only while its overlay is active. The server assigns the authoritative capture identity, stores the raw capture and queryable event history, and returns a reference without making login, admission, or navigation depend on backend success.

## Current Finger flow

1. The browser opens the Finger overlay with `ConcordFinger.open(...)`.
2. The prompt reads **“Place your finger on the scanner.”** Pointer, touch, mouse, stylus, wheel, scroll, DOM, and timing data are recorded during the capture window.
3. A contact ends after at most ten seconds. Closing the overlay is itself recorded; capture continues for three seconds and then a centered **Continue** control appears.
4. Continue closes the UI. There is no accepted/checkmark/success state shown to the person using Concord.
5. The collector submits one best-effort payload to `POST /api/finger/sessions`. Network, parsing, storage, or processing failure does not block the user flow.
6. The server uses a signed HttpOnly cookie for stable anonymous association. Authenticated Concord identity may be supplied only through a server-trusted integration callback/header mode; raw client identity fields are not authoritative.
7. SQLite holds queryable historical metadata/events and a content-addressed object store holds immutable raw artifacts. Concord should keep only the Finger reference and any approved summary/link in its primary application data.

## Run locally

Finger requires Node.js 22.5 or newer and an identity-signing secret.

```sh
FINGER_IDENTITY_SECRET='replace-with-a-random-secret' npm start
```

The demo is served at `http://localhost:3000/` by default. Use `npm test` for the test suite and `npm run check` for syntax checks.

### Environment

| Variable | Default | Purpose |
| --- | --- | --- |
| `FINGER_IDENTITY_SECRET` | none | **Required.** HMAC secret for the signed anonymous identity cookie. |
| `FINGER_ENABLED` | `true` | Set to `false` to disable storage while keeping the caller's flow non-blocking. |
| `PORT` | `3000` | HTTP listen port. |
| `FINGER_DATA_DIR` | `var/finger` | Base runtime-data directory. |
| `FINGER_DATABASE` | `<data-dir>/finger.sqlite` | SQLite database path. Relative paths are resolved before use. |
| `FINGER_OBJECT_DIR` | `<data-dir>/objects` | Content-addressed object-store directory. Relative paths are resolved before use. |
| `FINGER_MAX_BODY_BYTES` | `10485760` | Maximum request body, bounded to 1 KiB–100 MiB. |
| `FINGER_POST_CONTINUE_MS` | `0` | Optional extra capture delay after Continue, bounded to 60 seconds. |
| `FINGER_TRUST_CONCORD_USER_HEADER` | `false` | Opt-in trust for `x-concord-user` from a protected upstream integration. Never expose this trust boundary directly to untrusted clients. |
| `FINGER_VERSION` | `1` | Server-owned Finger version stamp. |
| `CONCORD_VERSION` | `0.1.0` | Concord release version stamp. |
| `CONCORD_BUILD` | Concord version | More specific Concord build stamp when supplied. |
| `NODE_ENV` | unset | In `production`, the signed identity cookie is also marked `Secure`. |

## HTTP surface

The deployed beta intentionally keeps the public HTTP surface small:

| Method and path | Purpose |
| --- | --- |
| `GET /health` | Basic process/Finger enabled status. |
| `GET /api/finger/config` | Browser-safe capture timing and server-owned version/config values. |
| `POST /api/finger/sessions` | Submit a complete or partial raw capture. The endpoint returns `202` even when ingestion fails so admission/navigation is not coupled to collection. |
| `GET /` | Standalone Finger beta/demo page. |

Administrative history, artifact reads, comparison, purge, and Concord-summary linkage are internal library/storage operations in this repository; they are **not** exposed as unauthenticated public HTTP routes.

## Persistence model

The canonical storage path is the already-established persistence stack:

- `FingerSqliteRepository` stores sessions, indexed event/time-series rows, raw JSON event payloads, permanent artifact metadata, append-only analysis-generation metadata, and reverse links to Concord summaries.
- `FileObjectStore` stores content-addressed immutable bytes under SHA-256-derived keys and rejects invalid/path-escaping keys.
- `FingerPersistence` coordinates the relational store and object store, stamps Finger/Concord versions, preserves analysis manifests, links approved Concord summaries, and performs audited purge operations.
- `PersistentFingerStore` adapts browser ingestion into that storage model. Collector-relative event timing is preserved before storage.

Raw events, artifacts, and analysis generations are protected against ordinary update/delete operations by the SQLite schema. A session purge must first record who requested it, why, and which object keys are affected; shared content-addressed objects are retained when another live session still references them.

A simpler `FileFingerStore` remains available for development/testing. Its on-disk directory key is derived from `SHA-256(session.id)` rather than the caller-controlled ID, so a session identifier cannot become a filesystem traversal path.

## Replay and heat-map processing

`./src/finger/processing/` is the reconciled derived-analysis library. It can:

- reconstruct an ordered replay while preserving raw events and DOM mutation frames;
- generate touch, mouse, stylus, and combined position/dwell/path views;
- normalize coordinates using capture or per-event viewport data;
- preserve source provenance with a deterministic SHA-256 digest;
- aggregate compatible analyses while retaining source-session identity; and
- save multiple immutable in-memory analysis generations for testing or adapter development.

The processing library is exported from `./finger/processing`. Raw capture persistence remains authoritative; derived analysis must not overwrite raw history.

## Privacy and security boundary

Finger captures high-resolution behavioral data and can capture rendered or user-entered DOM content. Treat the data as sensitive operational data: restrict collection to the disclosed capture window, use transport encryption, authorize access server-side, exclude or redact secrets and sensitive fields where possible, and define retention/export/deletion behavior for the environment in which Concord is deployed.

Do not trust browser-supplied names, email addresses, user IDs, access tokens, or association IDs as authenticated identity. If `FINGER_TRUST_CONCORD_USER_HEADER=true` is used, the header must be injected by a trusted upstream component after authentication and stripped from direct client traffic.

## Project records

- `CHANGELOG.md` is the consolidated implementation change log.
- `PROJECT_RECORD.md` explains source precedence, historical decision-file reconciliation, and project/subsystem boundaries.
- `docs/AUDIT_2026-09-16.md` records the repository/document consistency audit, fixes made, and remaining verified gaps.
- `docs/ECONOMY_MARKETPLACE_CONTRACT.md` defines the design-only Concord marketplace, labor/barter commitment, matching, settlement, and anti-double-commit contract.

Historical decision snapshots and prior Workbench artifacts are provenance. They should not be silently rewritten or deleted merely because a newer canonical record exists.

## Governance integration sandbox

A synthetic Microsoft Agent Governance Toolkit workflow is available with
`npm run governance:demo`. It demonstrates durable approval, audit-outage
pause/resume and replay-safe local writes without changing the Finger server.
See [the sandbox runbook](docs/GOVERNANCE_SANDBOX.md) for tests, Linux isolation
verification, owner rules and the limits of this local milestone.
