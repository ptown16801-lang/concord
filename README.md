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
