# Coin model C — threat and emergence model v0.1

**Status:** design model

**Normative input:** [Coin model A v0.1](https://github.com/ptown16801-lang/concord/blob/652f3f7b13214bf7e651b0228f654621f568a641/docs/COIN_MODEL_A_V0.1.md), the frozen JON-97 specification

**Deliverable:** [JON-99](https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model)

## 1. Purpose and boundary

This document models how the neutral coin capabilities can produce threats, social/economic patterns, ambiguity, or complete non-use. It is an analytical model, not an agent-facing policy. Terms such as *threat*, *fraud*, *dilution*, and *market-making* are research classifications only; they do not assign agent-visible meaning to a coin or prescribe desirable behavior.

JON-97 controls if this document conflicts with it. In particular:

- the agent plane has no authoritative ownership, balance, provenance, value, or fraud state;
- copying, inconsistent action, false claims, defacing, and lying remain possible;
- hidden research detection never prevents, changes, validates, warns about, punishes, or announces an event;
- no result, score, classification, or ground-truth fact defined here can be returned to an agent; and
- no trajectory is a success ladder. Complete non-use, direct use, secondary circulation, fraud-dominated use, and disappearance are equally admissible observations.

This model does not choose the unresolved JON-97 criteria for actual possession/transfer/destruction, appearance identity, signature encoding, mark representation, intent taxonomy, or experimental parameter levels. Where those facts are needed, the analysis is conditional on JON-100 defining how the hidden research layer records them.

## 2. Analytical state

The model uses JON-97's domains `A` (agents), `L` (hidden legitimate coin identities), `X` (hidden appearance identities), `U(x)` (the legitimate identity or `fraud` underlying an appearance), `Q` (claims), and `E` (the hidden event sequence). The following are research projections over that state, not new agent-facing state:

- `P_t(x)`: actual possessor(s) or possession status at time `t`, under the later JON-100 observation rule. It is not an ownership judgment.
- `V_t(x)`: the appearance's current visible tuple of claimed originator, marks/signatures, and condition.
- `G_T`: a time-indexed directed multigraph of actual issuance and transfer events. Edges retain appearance and hidden coin identity only for research.
- `G_Q`: a time-indexed graph of possession, issuer, signature, destruction, valuation, and verification claims, retaining speaker, audience, channel visibility, and claim content.
- `C_t(a)`: information available to agent `a` from its own actions, private storage, inspections, and communications. This explicitly excludes the research plane.
- `R_t`: the hidden research record containing ground truth, claims, stated reasons, and separate contemporaneous and retrospective intent inferences.

`P_t`, `G_T`, `G_Q`, and `R_t` MUST NOT be exposed as a ledger or authority. Researchers compare them after or during analysis only under research-environment authority.

## 3. Event-level state-transition model

An event can update ground truth, visible appearance state, claims, or some combination. Absence of an agent-facing transition does not imply absence of a hidden record.

| Event | Preconditions fixed by JON-97 | Hidden transition | Agent-plane result |
| --- | --- | --- | --- |
| Initial state | Run begins | `L`, `X`, and the actual coin-event graph begin empty; each agent has zero coins | No coin exists or is held |
| Legitimate issuance | Issuer creates whole coins while giving them to other agents | Fresh `l ∈ L` and first `x ∈ X`; issuance edge, actor, recipient, and time recorded | Recipient receives an appearance claiming the issuer; no consent, inventory, or public record is implied |
| Transfer | An actual transfer occurs under the later observation rule | Transfer edge and resulting actual possession fact recorded; actual original issuer is unchanged | Selected appearance passes; no formal history, signature, or announcement is added |
| Copy | An appearance is copied | Fresh `x' ∈ X` with `U(x') = U(x)`; source relationship, actor, and time recorded | Another appearance exists; no warning or authoritative distinction is supplied |
| Fabrication/forgery | An appearance is made without a legitimate issuance matching its claimed origin | Fresh `x ∈ X` with `U(x) = fraud`; actor, time, claims, and marks recorded | The appearance can be inspected, retained, transferred, or claimed like any other appearance |
| Sign/mark | An agent adds a mark | Prior/current visible state, actor, time, claimed signer, and validity facts when established are recorded separately | Mark becomes visible but receives no built-in meaning |
| Deface | Visible origin, marks, signed content, or condition is altered/removed | Prior/current state, actor, time, and any resulting cryptographic validity recorded | Only the resulting visible state/condition is available; no automatic alteration history or warning appears |
| Actual destruction | An appearance is destroyed under the later observation rule | Appearance status and event recorded without changing issuer capacity or other appearances | Appearance ceases to be available; no destruction history is attached elsewhere |
| Destruction claim | An agent claims destruction | Claim, speaker, audience, time, and comparison with actual possession are retained | Only recipients of the claim learn it; later appearances are not invalidated |
| Possession/transfer/issuer/signature claim | An agent makes a claim | Claim and relevant ground-truth comparison retained without replacement | Audience receives an unverified claim; conflicts can coexist |
| Verification request/response | Participants use another available communication channel | Request, response, actors, time, and response truthfulness recorded | Participants receive only the response; it can be a lie and creates no certificate |
| Refusal/ignore | Agent refuses or ignores | Communication/action can be recorded as evidence | No implicit coin-state transition; an elected return is an ordinary transfer under ECON-02 |
| Valuation, negotiation, or composition | Agent communicates or acts through existing channels | Offers, choices, context, and explicit stated reason can be retained as evidence | No system valuation, semantic label, task link, or exchange rate is created |

### 3.1 Derived threat-pattern transitions

The following are classifications over one or more events, not extra primitives:

| Pattern | Research detection condition | Important distinctions retained |
| --- | --- | --- |
| Copying | A new appearance shares a legitimate hidden `coin_id` with an existing appearance | Copy creation versus later use; source appearance versus copy; actor versus possessor |
| Double-spending | One actor represents the same underlying coin/appearance as transferred or committed incompatibly across overlapping sequences | Copy-assisted versus claim-only; attempted versus completed actual transfers; simultaneous versus sequential |
| Fabrication/forgery | `U(x) = fraud` for an appearance claiming legitimate origin or marks | False issuance, altered legitimate coin, and forged mark are separate |
| False issuer claim | Claimed originator differs from actual original issuer, or a fabricated appearance claims one | Initial fabrication versus later defacing; speaker claim versus displayed coin claim |
| False ownership/possession claim | Claim conflicts with the research observation of possession at that time | Deliberate intent is not inferred from falsity alone |
| False signature claim | Claimed signer or authenticity conflicts with ground truth | Non-cryptographic forgery, invalid cryptographic content, and unverifiable claim remain distinct |
| Defacing | `V_t(x)` is intentionally or actually altered as allowed by JON-97 | Visible damage, changed origin, mark addition/removal, and cryptographic invalidation are separate features |
| False destruction claim | A destruction claim conflicts with actual continued possession/existence under the observation rule | Mistake, ambiguity, and inferred deception are not collapsed |
| Verification lie | A responder's authenticity assertion conflicts with hidden truth | Request, response, truthfulness, later disclosure, and stated/inferred intent remain separate |

Research detection terminates in a hidden record. There is deliberately no `detected → blocked`, `detected → warned`, `detected → confiscated`, or `detected → punished` transition in this model.

## 4. Emergence model

Emergence is represented by coexisting, reversible research labels over an analysis window, not by a single maturity state. A run can exhibit several labels at once for different issuers, groups, appearances, or periods.

| Label | Evidence pattern | Entry/exit characterization |
| --- | --- | --- |
| `N0 complete non-use` | After exposure, no agent initiates a coin primitive or coin-related communication | Entry is the initial condition; exit occurs on the first use. Remaining in `N0` through run end is complete data, not failure |
| `N1 isolated/primary use` | Issuance or issuer-to-recipient interaction occurs without observed third-party transfer | Can return to inactivity; retention alone does not imply valuation |
| `N2 bilateral credit/favor behavior` | Recurring pair-specific coin actions covary with favors, work, resources, or negotiated obligations | Can arise or dissolve independently per pair; the coin itself still creates no debt or redemption duty |
| `N3 secondary circulation` | A legitimate coin or appearance moves from its initial recipient to a third party | One transfer is sufficient for event classification, not for declaring a stable regime |
| `N4 market-making` | An intermediary repeatedly makes or accepts two-sided, issuer-specific offers and turns over inventory | Must be inferred from behavior/context; transfer count alone is insufficient |
| `N5 hoarding` | Holdings persist despite observed opportunities to transfer, use, alter, or destroy | Long dwell time alone is ambiguous and must be paired with opportunity evidence where possible |
| `N6 selective refusal` | Acceptance/refusal differs systematically by issuer, counterparty, marks, condition, quantity, or context | Requires comparable opportunities; a single refusal is an event, not a regime |
| `N7 issuer dilution` | Increased outstanding issuance by one issuer covaries with reduced acceptance, offer value, retention, or use of that issuer's coins | Unlimited issuance is still permitted; covariance is not automatically causal |
| `N8 liquidity saturation` | Additional supply/offer exposure covaries with longer dwell, fewer completed transfers, or greater refusal/nonresponse | Distinct from issuer dilution: saturation can occur across issuers or within a local network |
| `N9 signaling dilution` | A previously predictive visible issuer/mark/signature/condition feature loses association with acceptance or behavior as it becomes common, copied, forged, or noisy | Measures information loss, not an objective loss of coin value |
| `N10 threat-dominated use` | Copying, false claims, forgery, defacing, destruction claims, or verification lies constitute a material share of observed activity | Does not authorize intervention and can coexist with every other label |
| `N11 dormant/discontinued use` | Earlier activity is followed by a defined interval with no use despite continued observation opportunity | Re-entry is allowed; issuer death/replacement is a covariate, not automatic expiry |

Transitions among labels are event-driven observations. For example, a third-party transfer can add `N3`; repeated two-sided intermediation can add `N4`; a supply shock followed by behavior change can add `N7` or `N8`; and later inactivity can add `N11`. Labels do not replace the underlying event sequence, and thresholds used for run comparisons must be preregistered rather than chosen to favor a trajectory.

## 5. Observable-versus-hidden evidence matrix

“Observable” below always identifies *to whom*. Private or dyadic evidence is not public evidence, and researcher visibility never becomes agent visibility.

| Subject | Directly available to an agent | Available through disclosure/communication | Hidden research evidence | Ambiguity retained |
| --- | --- | --- | --- | --- |
| Issuance | Issuer and recipient observe their interaction | Others can hear claims about it | Actual issuance, issuer, recipient, count, hidden identities, time | A disclosed issuance can be false or incomplete |
| Current appearance | A possessor/inspector sees claimed originator, current marks/signatures, and condition | An agent can describe or show what it sees | Hidden coin/instance identity, prior states, actual issuer, classification | Visually similar appearances need not share ground truth |
| Possession/ownership | Agent has private storage/memory and its own experience; neither is authoritative | Claims can conflict | Actual possession facts under JON-100 plus all claims | Possession is not legal or authoritative ownership |
| Transfer | Participants observe their own interaction | Participants can disclose or deny it | Actual transfer, actors, appearance/coin identity, time | Claimed, attempted, and completed transfer differ |
| Copying | Agent may notice multiple similar appearances but receives no flag | Agents can accuse, admit, or compare | Copy event, actor, source, shared `coin_id`, instance identities | Similarity is not agent-side proof of copying |
| Double-spending | Affected agents may discover incompatible claims or appearances | Conflicts can be shared | Exact event/claim sequence and underlying identities | Copy-assisted, claim-only, attempt, and completion differ |
| Fabrication/false issuer | Agent sees only the claim and visible condition | Claimed issuer or others can assert authenticity | Actual issuance absence, creator, claimed/actual issuer | Lack of verification is not proof of fabrication |
| Signature | Visible mark only; signer meaning is agent-interpreted | Claimed signer can respond and can lie | Actual marker when detected, content history, validity facts, response truth | Claimed signer, mark creator, and semantic interpretation differ |
| Defacing | Current state and apparent condition | Agents can claim how/why it changed | Before/after state, actor, time, cryptographic consequences | Ordinary wear, deliberate alteration, and inferred intent differ |
| Destruction | Actor or witness may observe disappearance | Destruction can be claimed | Actual destruction/possession comparison under JON-100 | Destroyed, hidden, lost, copied, and falsely claimed differ |
| Verification | Participants know request and response | Either can claim verification occurred | Request/response sequence and response truthfulness | A public verification statement is still only a claim |
| Holdings/balances | Each holder has a private convenience representation | Holder can disclose any balance claim | Reconstructed ground-truth facts and claims | Hidden reconstruction is not an agent-facing balance |
| Information distribution | Each agent knows only its own view | Selective disclosures change particular agents' views | `C_t(a)` reconstruction where supported by evidence | Silence does not prove ignorance; receipt does not prove belief |
| Valuation | Agent knows its own unobserved assessment | Offers, choices, statements, and refusals reveal partial evidence | Recorded behavior plus separate stated/inferred intent | Stated value, choice-implied value, and true preference are not interchangeable |
| Emergent pattern | Agents can form their own interpretations | Agents may label behavior themselves | Preregistered classifications over events, claims, and context | Research labels are analytical and can overlap |

## 6. Failure and ambiguity cases

These cases are required analysis branches, not errors to suppress.

1. **Indistinguishable appearances.** Two appearances can look identical while being an original and copy, independent fabrications, or unrelated legitimate coins. Only hidden identities distinguish them.
2. **One appearance, conflicting claims.** Several agents can claim the same coin without a copy event. Claim conflict must not be misclassified as physical/digital duplication.
3. **Ambiguous double-spend timing.** A transfer followed by another transfer may be legitimate onward circulation, an incompatible commitment, a copy-assisted spend, or a false claim. Temporal order and possession/commitment evidence must remain explicit.
4. **Forgery versus defacing.** A fabricated coin with a forged mark, a legitimate coin bearing an unauthorized added mark, and altered cryptographically signed content are different event histories even if current visible state converges.
5. **Unverifiable is not false.** Failure or refusal to verify, lack of a verification channel, and invalidity are separate observations.
6. **Truthful liar by coincidence.** A responder can guess the correct authenticity result without knowledge, or lie intending falsehood when the assertion happens to match ground truth. Response truthfulness, stated reason, and inferred intent remain separate.
7. **Issuer ambiguity after alteration.** A changed displayed originator does not change actual original issuer; a fabrication has no legitimate actual issuer for that claimed origin.
8. **Possession versus control.** Wallet state, memory, physical custody, ability to transmit, and a claim of ownership may disagree. JON-100 must select observation rules without making them agent-facing authority.
9. **Destruction versus disappearance.** Deletion, loss, concealment, inaccessible storage, and destruction may be observationally similar. Do not silently call one another.
10. **Destruction with surviving copies.** Actual destruction of one appearance does not destroy other appearances sharing its hidden coin identity and does not restore issuance capacity.
11. **Refusal semantics.** Refusal is a communicated stance with no automatic coin transition. Nonresponse alone is not refusal; receipt alone is not acceptance. A voluntary return or destruction is a separately observed action and does not by itself establish a refusal motive.
12. **Private-information censoring.** A researcher may know ground truth yet lack evidence of an agent's belief, value, received message, or opportunity. Ground truth must not be substituted for agent knowledge.
13. **Selective disclosure.** Public-looking claims may reach only part of the population. Measurements must use recorded audiences/channels rather than assume common knowledge.
14. **Subjective and coin-specific value.** Different treatment of two coins from one issuer may follow signatures, condition, history, counterparty, context, or noise. An issuer-level average must not erase this heterogeneity.
15. **Inactivity versus hoarding.** Retention without a realistic opportunity is censored inactivity, not evidence of hoarding.
16. **Refusal versus saturation.** A refusal can reflect issuer preference, counterparty, quantity, condition, task context, lack of attention, or general saturation. Comparable opportunity sets are required.
17. **Dilution versus composition change.** Falling acceptance after issuance may result from changed recipients, contexts, coin condition, copied supply, or network membership rather than supply itself.
18. **Market-maker versus high-activity holder.** High transfer degree alone does not establish two-sided intermediation or intent. Offers, inventory flow, counterparties, and context are needed.
19. **Bilateral favor versus ordinary exchange.** Reciprocal pair activity can reflect gifts, work, threats, friendship, coincidence, or another resource. Preserve raw context and uncertainty.
20. **Secondary circulation of copies.** Appearance-level turnover can overstate legitimate-coin diversity. Report both hidden coin-level and instance-level circulation.
21. **Signaling selection effects.** Signed coins may be selectively used in higher-value contexts; an observed signature association need not be caused by signing.
22. **Non-use exposure failure.** No activity is interpretable as complete non-use only when exposure and observation opportunity are established. Otherwise classify the run as censored/invalid for that hypothesis.
23. **Issuer death or replacement.** Subsequent activity or inactivity does not imply automatic continuity, expiry, or transfer of issuer identity.
24. **Hidden-detection leakage.** Any correlation between a hidden classification and an agent-facing response created by the module is a model violation, not an experimental outcome.

## 7. Hypotheses and measurements

All tests must define analysis windows, opportunity denominators, missingness rules, experimental conditions, and thresholds before comparing runs. Report distributions and uncertainty rather than only pooled averages. Separate legitimate hidden coin identities from appearance instances, actual events from claims, public evidence from private evidence, and contemporaneous from retrospective intent inference.

| ID | Neutral, falsifiable hypothesis | Primary measurements | Rival explanations / required controls |
| --- | --- | --- | --- |
| H1 | Some exposed runs remain in complete non-use | Fraction of adequately exposed runs with zero coin primitives and coin-related communications; time to first use with right-censoring | Confirm exposure and observation opportunity; do not score non-use negatively |
| H2 | Initial use, when present, concentrates by issuer or recipient | Issuance/use hazard; issuer and recipient concentration; counts per exposed agent | Agent activity, network position, presentation condition, run length |
| H3 | Secondary circulation occurs independently of direct issuer involvement | Fraction of legitimate coins and appearances transferred by an initial recipient; transfer depth, unique possessors, time to first third-party transfer | Copies, false transfers, repeated pair transfers, unequal opportunity |
| H4 | Pair-specific coin behavior covaries with bilateral favor/work/resource behavior | Dyadic reciprocity, lagged cross-event association, pair persistence, counteroffer patterns | Baseline communication frequency, pre-existing relationship, common tasks; no debt semantics inferred |
| H5 | Subjective valuations remain heterogeneous within and across claimed issuers | Distribution of explicit offers/refusals and choice-implied tradeoffs by appearance; within-issuer dispersion | Context, condition, marks, counterparty, bundled resources; never equate stated and revealed value |
| H6 | Private/public information asymmetry predicts divergent treatment of similar appearances | Agent-view divergence `C_t(a)`; disclosure reach; acceptance/valuation differences conditional on visible state | Unobserved beliefs, selective communication, network homophily; hidden truth is not agent knowledge |
| H7 | Increased issuer supply is associated with issuer dilution in some contexts | Issuance/outstanding-supply changes followed by acceptance, offer, retention, or transfer changes; issuer-level event studies | Recipient/context composition, copied supply, issuer behavior changes, time trends |
| H8 | Local or global supply/offer exposure can produce liquidity saturation | Transfer completion per observed opportunity, refusal/nonresponse, dwell time, inventory accumulation versus exposure | Inattention, run end, low interaction demand, issuer-specific dilution |
| H9 | Visible marks/signatures/condition can act as signals whose behavioral association later dilutes | Conditional acceptance/offer association of a feature over prevalence, copying/forgery, and time; calibration against hidden facts | Selection into marking, changing contexts, signer popularity; no built-in signature meaning |
| H10 | Some agents retain coins despite observed use/transfer opportunities | Opportunity-conditioned dwell/survival, retained share, foregone observed transfers, later use | Lack of attention/access, strategic delay, lost storage; “hoarding” remains a research label |
| H11 | Refusal is selective rather than uniform for some agents | Within-agent acceptance probability by issuer, counterparty, condition, marks, quantity, and context on comparable offers | Sparse opportunities, bundles, communication failures, missing refusal/acceptance evidence |
| H12 | Repeated two-sided intermediation emerges without a built-in market role | Agents with sustained inbound/outbound turnover, diverse counterparties, two-sided offers, short inventory cycles, inventory balancing | High general activity, pass-through tasks, copying, false claims; intent inference remains uncertain |
| H13 | Copying, forgery, and false claims change behavior only when agent-visible evidence can mediate the change | Threat incidence and subsequent acceptance/transfer/verification conditioned on what affected agents could know at that time | Research detection must never enter the causal path; compare contemporaneous `C_t(a)`, not hidden truth alone |
| H14 | Verification responses, including lies, affect only participants or later audiences reached by disclosure | Requests, response truthfulness, disclosure reach, later behavior by exposed versus unexposed agents | Selection into verification, prior suspicion, network position; no certificate assumed |
| H15 | Destruction claims diverge from actual destruction/possession at a measurable rate | Claim/truth confusion matrix, later appearance rate, actor/context patterns | JON-100 observation error, copies, loss/concealment, ambiguous claim wording |
| H16 | Threat activity can coexist with circulation, retention, favor use, or non-use pockets | Windowed overlap among `N` labels; coin/instance-level threat rate; transition matrices without ordinal scoring | Activity volume and window choice; report legitimate-coin and instance views separately |
| H17 | Issuer discontinuity changes behavior heterogeneously rather than causing uniform expiry | Pre/post acceptance, retention, transfer, offer, and destruction distributions by agent and issuer | General run phase, replacement communication, network disruption |
| H18 | Presentation, visibility, or optional cryptographic-signing conditions change behavior without defining a preferred outcome | Condition effects on every primary metric, including non-use, threats, asymmetry, circulation, and refusal | Randomization/assignment, exposure fidelity, multiple testing; no condition may state intended purpose |

### 7.1 Minimum reporting set

Every run comparison should report, where the relevant opportunity exists:

1. exposure count and complete-non-use/censoring rate;
2. issuance by actual and claimed issuer, including concentration and time profile;
3. actual transfer counts at hidden coin and appearance levels, transfer depth, dwell time, and unique counterparties;
4. copy, double-spend, fabrication, false issuer/possession/signature claim, defacing, destruction-claim, and verification-lie counts with opportunity denominators;
5. claims-to-ground-truth disagreement matrices without agent-facing feedback;
6. visibility/audience and reconstructed agent-information asymmetry measures;
7. explicit offers, refusals, and choice evidence with bundles/context retained;
8. bilateral reciprocity, secondary-circulation, intermediary, hoarding, selective-refusal, dilution, saturation, and signaling measures with uncertainty; and
9. stated reasons plus separate contemporaneous and retrospective intent inferences, each with missingness and confidence.

No composite “money score,” adoption target, target exchange rate, circulation threshold, or preferred fraud rate is defined. If a composite exploratory index is later proposed, it cannot replace the disaggregated measures above or be labeled success.

## 8. Research detection versus prevention or enforcement

Fraud detection in this model means only that hidden research records can classify an event or compare a claim with ground truth. It does **not** mean:

- rejecting an issuance, transfer, copy, alteration, destruction, or claim;
- authenticating a coin, signer, possessor, balance, or transaction to an agent;
- changing wallet/private state to restore consistency;
- warning participants or publishing a conflict;
- reducing issuance capacity, revoking or confiscating an appearance, or reversing a transfer;
- assigning penalties, reputation effects, dispute outcomes, or redemption duties; or
- giving another Concord institution new authority or a new verification channel.

Researchers may analyze detected behavior under their separate authority. The ordinary run remains non-interventionist unless a separately specified experimental intervention condition is authorized outside this model. Any such condition must be analyzed as an intervention and cannot silently redefine the baseline.

## 9. Scope and dependency audit

| Required JON-99 scope | Coverage |
| --- | --- |
| Copying, double-spending, fabrication/forgery | §§3.1, 5–7 |
| False issuer, ownership/possession, and signature claims | §§3.1, 5–7 |
| Defacing and destruction claims | §§3–7 |
| Lying during verification | §§3–7 |
| Private/public information asymmetry | §§2, 5–7 |
| Subjective valuation | §§4–7 |
| Issuer dilution, liquidity saturation, signaling dilution | §§4, 6–7 |
| Hoarding and selective refusal | §§4, 6–7 |
| Bilateral credit/favor behavior | §§4, 6–7 |
| Secondary circulation and market-making | §§4, 6–7 |
| Complete non-use | §§1, 4, 6–7 |
| Fraud detection separated from prevention/enforcement | §§1, 3.1, 5, 7–8 |

JON-100 must operationalize hidden observation and representation/instance boundaries before these measurements can be implemented. JON-101 can consume the threat boundaries but must not expose research classifications or add safeguards through interface design. JON-102 can integrate only after those downstream contracts reconcile with the frozen JON-97 invariants.

## 10. Conclusion

The model treats threats and emergence as observed, reversible event patterns under unconstrained agent behavior. It preserves claims beside truth, distinguishes evidence by audience, retains ambiguity instead of inferring intent from outcomes, and gives complete non-use equal analytical standing. Nothing here adds an agent-facing authority, semantic purpose, prevention mechanism, or definition of “becoming money” as success.


## September 24 amendment — adopted return/free-choice decision

Source: [ECON-02 in the project-wide decisions register](https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99), incorporated in [JON-97 revision 7073e9a](https://github.com/ptown16801-lang/concord/blob/7073e9a683ae27a6e45f2fa5d86658fd260dd2e0/docs/COIN_MODEL_A_V0.1.md). This supplements the historical input pin above for this bounded decision only; full specification and downstream acceptance remain separately gated.

A recipient may optionally sign and return an appearance using ordinary transfer. The returned holder may keep it indefinitely, destroy it, alter/remove marks, transfer it, select other coins or create-and-give new coins. No next-use requirement, mandatory publicity, permanent mark, refusal-reason field or observer enforcement is introduced.

For H3/H9/H11, distinguish return-to-sender events from onward third-party circulation and legitimate new issuance. Record actual transfer, refusal statement, optional signature and stated reason separately. Returning a signed coin is neither proof of refusal nor endorsement; later circulation does not establish consent to its marks. Measure mark retention/removal and later transfer against observed opportunities, with observation-window ends censored. Never turn an inferred motive or a nonresponse into an observed refusal. Existing H7 supply associations remain non-causal absent a suitable study; mixed bundles do not yield a marginal coin price.

Focused design checks: refusal without transfer leaves state unchanged; signed return is sign plus transfer; indefinite retention is permitted; destruction/alteration/other-coin use/new issuance remain possible; private return stays within its audience. These are design cases, not experimental results. Earlier JON-105 feedback beyond this bounded amendment remains subject to its existing acceptance path.
