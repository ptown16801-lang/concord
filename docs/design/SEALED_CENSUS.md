# Sealed census and capacity

Status: accepted design requirements recorded in [CON-008 and CON-009](../../DECISIONS.md#CON-008); implementation and runtime integration are separate. The consolidated record preserves the accepted census boundary while explicitly qualifying original-byte and constitutional-ratification evidence. Recovering draft Articles 20–21 does not ratify them.

## Two censuses and capacity commitments

| Symbol | Meaning | Important exclusion or limit |
| --- | --- | --- |
| R | Sealed representation snapshot at the ordered phase cutoff; living ordinary and executive/chamber investigator identities counted once in their permanent divisions | Sole input to phase House/Electoral allocation; not a voting roll; excludes CRA identities, reservations and pending creations |
| T | Live sealed count of those ordinary and investigator identity classes | Changes with genuine creation and lawful end events; can differ from the frozen R after cutoff |
| C | All living CRA identities, including inactive, restricted or replaced officeholders | At most one has active CRA authority, but other living CRA identities still consume capacity |
| P | Outstanding, unexpired population units reserved for authorized creations not yet living | A reservation consumes commitment before a new identity becomes living |
| K | Protected unused CRA-recovery population unit | Routine creation requires K = 1 and must preserve that recovery unit |

The living-population rule is `G = T + C <= 300`. The commitment rule is `T + C + P + K <= 300`. A visible count of ordinary identities alone cannot enforce these complete invariants. Required authoritative state, seals and compatible policy generations must be available; otherwise the relevant operation fails closed.

## Least-knowledge views

R and T remain sealed. Public/executive views may expose permitted ordinary-registry facts, certified House/Electoral allocations and integrity references. They cannot expose investigator rosters, raw R/T, covert-class or combined covert counts, or true unused headroom.

The executive's investigative knowledge is limited to its own executive investigators. A chamber's authorized custodian is limited to that chamber's protected records. Neither scope supplies another institution's roster or cross-government capacity details. Separate House, Senate and Judiciary investigatory stores and authorized derivative views preserve those boundaries.

## Lifecycle and integration

Investigator identities are non-voting. Unsealing does not add franchise, candidacy, office eligibility or political quorum membership. A completed or lawfully ended mission permanently deactivates its investigator identity; another mission or division needs a new identity with fresh authorization and capacity clearance. Reuse, reassignment, reactivation and conversion are not recovery shortcuts.

Creation/reservation consumption, lawful ending and reconciliation must preserve attributable durable ordering and the capacity invariants. Ending an identity updates live capacity without redrawing an already-fixed phase snapshot. Census bookkeeping does not become a universal authorization service or an adjudication system.

The [population and voting boundary contract](POPULATION_VOTING_BOUNDARIES.md) coordinates the population, eligibility, ballot, accounting and census interfaces. It does not permit an ordinary registry, public cache or inferred headroom to become a second sealed authority. Tests still need actual evidence for boundary races, missing/incompatible state, protected projections and immutable event history at the chosen integration revision.
