# Concord Finger

Finger is Concord's opt-in interaction data collector. It presents a short browser overlay, records the interaction and page context available while the overlay is active, and sends the raw capture to the server. The server owns durable storage, replay reconstruction, and heat-map generation; the collector does no interpretation.

## Run locally

Finger requires Node.js 24 or newer.

```sh
npm start
```

The service listens on `http://localhost:3000` by default. Run the focused tests with `npm test` and syntax checks with `npm run check`.

Configuration is supplied through environment variables:

| Variable | Default | Purpose |
| --- | --- | --- |
| `FINGER_ENABLED` | `true` | Set to `false` to turn Finger off in development or tests. |
| `PORT` | `3000` | HTTP listen port. |
| `FINGER_DATA_DIR` | `.finger-data` | Dedicated raw-event and generated-artifact storage. |
| `FINGER_MAX_BODY_BYTES` | `10485760` | Maximum accepted request body size. |
| `CONCORD_VERSION` | `GIT_SHA` or `development` | Concord build recorded with every session. |
| `FINGER_ADMIN_TOKEN` | unset | Bearer token required by administrative read routes. |
| `FINGER_POST_CONTINUE_MS` | `0` | Additional collection time after Continue, in milliseconds. |

Captured data under `FINGER_DATA_DIR` is runtime state and must not be committed. Production deployments should place this directory on durable, access-controlled storage and include it in backup and disaster-recovery plans.

## Browser integration

Load `/finger-collector.js` and call `ConcordFinger.open({ invocation: 'login' })` at login or another explicit invocation point. Finger may be invoked repeatedly; every invocation receives a distinct server session while retaining the caller's Concord association. The overlay records pointer, touch, mouse, stylus, wheel and scroll activity, raw and normalized coordinates, contact capability, DOM snapshots and mutations, and capture timing.

The normal prompt is **“Place your finger on the scanner.”** A contact ends after at most ten seconds. Closing is itself captured; collection continues for three seconds before the centered Continue control appears. Completion removes the scanner without an accepted/checkmark state. Upload and processing failures are intentionally silent to the interacting user and must never prevent admission to Concord.

Concord should provide its authenticated, opaque user or visit association when invoking Finger. It should retain only the returned session identifier and summary/reference in its main database. Embedders that construct the server in-process can pass an `onSummary(summary)` callback to `createApp`; callback failures do not affect the user flow. Do not put names, email addresses, access tokens, or other directly identifying values into event metadata.

## HTTP API

All JSON responses use `application/json`. The currently supported integration endpoints are:

| Method and path | Purpose |
| --- | --- |
| `GET /api/finger/config` | Return the enabled flag, client timing, and collector version. |
| `POST /api/finger/sessions` | Create a capture session and return its server identifier. |
| `GET /api/finger/sessions/:id` | Read a session summary and artifact references. |
| `GET /api/finger/sessions/:id/artifacts/:artifactId` | Read a stored replay or heat-map analysis artifact. |
| `GET /api/finger/actors/:actorId/history` | List history for an administrator comparison integration. |
| `POST /api/finger/admin/compare` | Read histories for two or more actors side by side. |

Create a session first, append batches to `POST /api/finger/sessions/:id/events`, then finalize it with `POST /api/finger/sessions/:id/complete`. These calls accept the thin collector payload: association identifiers, client capabilities, viewport/page context, initial and final DOM, DOM mutations, and the full ordered raw event stream. Each stored record is stamped server-side with both Finger and Concord versions. Callers must treat ingestion as best effort and continue their login/navigation flow regardless of timeout, network error, or non-2xx response.

Admin history endpoints are server-side integration hooks, not end-user UI. Deployments must put authentication and authorization in front of them.

## Storage, privacy, and retention

Finger deliberately captures high-resolution behavioral and page data. Restrict collection to the visible capture window, disclose it appropriately, use transport encryption, and limit access to authorized operators. DOM snapshots can contain user-entered or rendered sensitive information; Concord integrations should exclude or redact sensitive fields before invoking the collector where possible.

Raw events and DOM source are the permanent historical source unless an explicit purge is performed. Derived replay and heat-map artifacts are reproducible, and each regeneration is preserved as a new immutable analysis generation rather than overwriting an older result. Session summaries and artifact references belong in Concord's primary database; large raw/replay artifacts and queryable event streams remain in Finger's dedicated storage.

Backing up, exporting, or purging a session must cover both its queryable records and referenced artifacts. Production operators are responsible for applicable consent, access, export, and deletion obligations.
