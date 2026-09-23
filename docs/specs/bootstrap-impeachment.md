# Bootstrap impeachment implementation

## Frozen authority and dependency pins

This implementation is bounded to bootstrap impeachment specification **revision
1.0**, Linear document `1db79f6f-a631-43e2-ac85-e8f55561b232`. The owner froze
that revision in JON-83 comment `9679e53a-3fd2-4ca4-963a-4ba2c30e15de` on
2026-09-16. JON-91 accepted these producer artifacts, integrated here in the
required order:

1. JON-78 commit `882dcffb31b520c6f9458984a35745c8b4bfa3b8`, tree
   `67d3849e05f9e0740ec6831163b60084016abd2f`;
2. JON-79 commit `51a102259785a5b53dc6ec4bc4bbca54c4a8fc37`, tree
   `c2f0cb37a3851350164df8dcc523b1b42d18ab94`.

The impeachment service reads population and eligibility only through those
domain interfaces. Because JON-79 is an in-memory domain authority, the service
does not claim that it is restart-durable: construction requires a separately
supplied durable event store and an authenticated/authorized command callback.

## Implemented rules

- Accusation panels contain `clamp(ceil(P / 10), 3, 12)` participants and trial
  panels contain `clamp(ceil(P / 5), 6, 24)`, where `P` is the authoritative
  eligible population.
- Accusation requires unanimity at three seats, two-thirds at four or five, and
  a simple majority above five. Trial requires three-quarters through eight
  seats and two-thirds above eight. Thresholds always round upward except the
  ordinary simple-majority rule (`floor(D / 2) + 1`).
- Selection excludes the accused, ineligible identities, all serving judges,
  and conflicts known at assignment time. Accusation and trial rosters are
  strictly disjoint.
- SHA-256 ranking makes selection reproducible. Round-robin interleaving across
  divisions balances sortition while creating no reserved or mandatory division
  seat.
- Each institution leaves bootstrap independently. A sufficiently staffed House
  supplies the accusation roster and a sufficiently staffed Senate supplies the
  trial roster; one institution's maturity does not force the other's.
- If the independent pool cannot fill both panels, the case enters
  `WAITING_FOR_INDEPENDENT_PARTICIPANTS`. Replacement walks the deterministic
  alternate order and returns to that wait state if no eligible independent
  alternate exists.
- Attributable events replay case opening, replacements, votes, ballot closure,
  acquittal, and conviction. Optimistic expected versions belong to the durable
  store boundary.

## Scope boundary

This module does not implement appeals, temporary restrictions, the general
judiciary, scheduling, economic rules, quizzes, or terminal/capital effects.
Those areas remain owned by their separate contracts.

## Verification map

`test/bootstrap-impeachment.test.js` covers proportional caps and floors, exact
threshold cutovers, insufficient pools, serving-judge and conflict exclusion,
disjoint rosters, division balancing without mandatory seats, independent
institution maturity, authenticated/durable boundaries, replacement, and event
replay.
