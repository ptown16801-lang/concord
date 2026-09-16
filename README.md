# Concord

Concord's Finger ingestion endpoint accepts browser capture payloads without
making admission depend on backend success. It persists raw payloads and a
queryable session index, assigns a stable signed identity to anonymous users,
and exposes an association hook for the main Concord user store.

## Run

```sh
FINGER_IDENTITY_SECRET='replace-me' npm start
```

The server listens on `PORT` (default `3000`) and accepts `POST` requests at
`/api/finger/sessions`. Queryable history is written to
`FINGER_DATABASE` (default `./var/finger/finger.sqlite`) and immutable objects
to `FINGER_OBJECT_DIR` (default `./var/finger/objects`). `FINGER_VERSION` and
`CONCORD_VERSION`/`CONCORD_BUILD` control the server-owned version stamps.

The response is always `202 Accepted`. A successfully persisted payload
includes its session reference; malformed or unpersistable transmissions are
acknowledged without exposing backend state to the interacting user.

## Finger persistence

The Finger storage package separates queryable history from large immutable
artifacts:

- `FingerSqliteRepository` stores sessions, indexed event/time-series rows,
  raw JSON event payloads, permanent artifact metadata, append-only analysis
  generations, and reverse links to Concord summaries.
- `FileObjectStore` stores content-addressed raw streams, DOM snapshots,
  replays, heat maps, and analysis manifests outside the relational database.
- `FingerPersistence` coordinates both stores and requires the Finger version,
  Concord version, and Concord build on every session.

Raw events and analysis generations are protected from updates. Session data
and artifacts cannot be deleted unless `purgeSession` first records the actor,
reason, affected object keys, and timestamps in the durable purge audit. The
calling service is responsible for enforcing Concord's administrator policy.
Content-addressed objects shared by another retained session are not removed.

```js
import {
  FileObjectStore,
  FingerPersistence,
  FingerSqliteRepository,
} from "./src/finger/index.js";

const finger = new FingerPersistence({
  repository: new FingerSqliteRepository("/var/lib/concord/finger.sqlite"),
  objectStore: new FileObjectStore("/var/lib/concord/finger-objects"),
});
```

The object-store boundary is deliberately small (`put`, `get`, `delete`) so a
cloud object-store implementation can replace the filesystem adapter without
changing ingestion or analysis code.
