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
`/api/finger/sessions`. Data is written beneath `FINGER_DATA_DIR` (default
`./var/finger`). `FINGER_VERSION` and `CONCORD_VERSION`/`CONCORD_BUILD` control
the server-owned version stamps.

The response is always `202 Accepted`. A successfully persisted payload
includes its session reference; malformed or unpersistable transmissions are
acknowledged without exposing backend state to the interacting user.

## Finger replay and heat-map processing

`src/finger/processing` turns a stored raw Finger session into a deterministic,
JSON-serializable analysis artifact. It preserves the source version metadata
and digest, reconstructs replay frames with DOM mutations, and produces
position, dwell-time, and movement-path layers for touch, mouse, stylus, and a
combined view.

```js
import {
  FingerAnalysisService,
  InMemoryAnalysisGenerationStore,
  aggregateSessionAnalyses,
} from "concord/finger/processing";

const store = new InMemoryAnalysisGenerationStore();
const processing = new FingerAnalysisService(store);
const generation = await processing.process(rawSession);
const aggregate = aggregateSessionAnalyses([generation.artifact, otherArtifact]);
```

The service only requires an append-only `save(generation)` persistence method.
The in-memory implementation is intended for tests and local development;
dedicated Finger storage can implement the same contract without changing the
processor. Each call creates a new generation instead of replacing earlier
analysis.

Raw interaction events may provide `clientX`/`clientY`, `position`, or already
normalized coordinates. Pointer Events (`touch`, `mouse`, and `pen`/`stylus`)
and Touch Events with `changedTouches` are supported. Sessions should also carry
`fingerVersion`, `concordVersion`, viewport information, and initial/final DOM
snapshots when available.
