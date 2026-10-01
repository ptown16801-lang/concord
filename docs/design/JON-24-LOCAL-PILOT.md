# JON-24 synthetic propagation pilot

This local-only demonstration adds exact integer threshold evaluation, ordered
prefix replay, explicit evaluation, holds/releases, correction annotations and
hypothetical branches. The current Finger page links to `/propagation.html`.
It does not recover the historical Workbench or implement the full pathway catalog.

The browser keeps runs in memory only; reloading clears them. Correction notes
retain original inputs and results. To change inputs, fork from before the
observation. No action casts a ballot or enacts an institutional decision.

## Local preview

The API is disabled by default. Enable `PROPAGATION_PILOT=true` only with `HOST`
set to `127.0.0.1` or `::1`; startup rejects other hosts. Use a dedicated local
server with Finger collection disabled (`FINGER_ENABLED=false`), temporary data
paths and a fresh ephemeral `FINGER_IDENTITY_SECRET`. Existing Finger startup
configuration requirements remain in effect. Do not expose this preview through
a reverse proxy. Open `/propagation.html` on that server.

The stateless POST `/api/propagation` endpoint accepts create, replay, append and
fork actions. It rejects foreign origins/hosts, non-loopback peers and forwarding
headers. JSON requests are limited to 1 MiB and five seconds. Responses use
`Cache-Control: no-store`. No persistence, credentials, real ballots or protected
records belong in these synthetic inputs.

## Validation and review

The bounded design and implementation received separate non-authoring Codex
reviews. The owner explicitly approved fresh same-provider reviewers for this
synthetic local pilot; shared-provider correlation remains a limitation. Review
PASS is not production acceptance or merge/deployment permission.

An initial key-validation defect (empty property names accepted as an empty
payload) was corrected and independently rechecked. Design review also required
explicit opt-in and actual loopback binding rather than relying solely on request
headers. Both protections are covered by tests.

Before draft publication, the focused engine/HTTP suite passed 25 tests and the
full Node suite passed 58 tests. Syntax and whitespace checks passed. Coverage
includes arithmetic boundaries, correction history, fork isolation, retries,
resource limits and HTTP boundary/default-off behavior. Review independently
reran focused checks and inspected UI state/error handling.

Visual, browser-interaction and accessibility verification remain outstanding.
Browser automation was not performed under the project's execution restrictions.
An initial connection failure requires reload to retry. No institutional catalog,
persistence, protected-data adapters or production integration is claimed.

Decision impact: No decision change
