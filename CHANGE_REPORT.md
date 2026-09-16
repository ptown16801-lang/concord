# Linear dispatch and verification fixes — 2026-09-16

Repository: `ptown16801-lang/concord`.
Starting default branch: `ptown16801/jon-71-finger-server-ingestion-and-session-identity-3d8f`.
Starting commit: `40f647e5b8d23307f713fc3a3753a1d3a46611cb`.
Delivery branch: `fix/linear-dispatch-gate-20260916`.

The owner requested assessment and implementation of Linear fixes with a team.
This change implements the reusable project-identification requirement in a
read-only validator; production governance, Finger, existing recovery branches,
and PR #5's runtime probe remain unchanged.

## Problems addressed

- Runtime-only success did not verify the assignment's actual project, repository,
  directory, base, sources, permissions, dependencies, or active ownership.
- Published recovered artifacts could be mistaken for accepted dependency pins.
- Project-specific configuration could be copied into an unrelated project.
- The standalone JON-88 fixture validator was not invoked by existing CI.

## Changes

- `qa/dispatch/dispatch-gate.mjs`: exact reviewed-evidence checks and machine-readable
  ready/blocked results. Mandatory profile gates/permissions cannot be omitted
  by an assignment. Published/accepted dependencies require evidence references.
- `qa/dispatch/dispatch-gate.test.mjs`: negative gate checks, CLI behavior, and a
  non-Concord Python project prove isolation and bounded blocking.
- `qa/dispatch/templates/`: deliberately incomplete profile/assignment/observation
  templates fail closed until populated from actual records.
- `qa/dispatch/profiles/`: separately scoped Concord native configuration and
  published-but-unaccepted recovery inventory. Unknown saved runtime/environment
  values remain null; JON-90 is mandatory for the native profile.
- `qa/dispatch/README.md`: workflow, source handoff, reuse, trust boundaries, and
  separation of local execution evidence from native environment acceptance.
- `.github/workflows/test.yml`: explicitly runs the standalone fixture validator
  whenever the fixture directory is present; missing validator then fails CI.
- `CHANGELOG.md`: additive implementation record.

## Local verification

Runtime: Node.js `v24.19.0`, Linux.

- Focused dispatch suite: 40 passed, 0 failed.
- Full `npm test`: 63 passed, 0 failed.
- `npm run check`: passed.
- `git diff --check`: passed.
- Actual JON-88 fixture pack at `c27389240d16d81e21f7b92fd25ea5fa5537205d`
  validated in a separate temporary directory: 19 fixtures, 13 exact-threshold
  vectors. This does not establish production integration.
- Independent read-only code review found no remaining delivery-blocking issue
  after the mandatory-profile-gate/permission correction.
- No build/compile step exists in the package; no build was performed.

## Limits and remaining work

This is an explicit coordinator check, not an installed Linear execution hook,
authenticated remote attestation, billing cap, or atomic ownership lock. A runner
must obtain fresh provider evidence, honor the result, reserve execution, and
enforce actual filesystem/permission boundaries. Null Concord environment data
must not be filled from local runtime evidence. JON-90's saved native environment
setting remains unresolved. Recovered governance dependencies still require
review, interface reconciliation, and acceptance before integration or bootstrap
implementation. No automatic retries, native sessions, merge, or deployment were
performed by this change.
