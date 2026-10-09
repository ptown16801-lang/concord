# Evidence snapshot: Emergent issuer-specific coin instrument — research model

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model
- Version: 2026-09-24T21:11:32.106Z
- Source date: 2026-09-24T21:11:32.106Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Mixed: recorded decisions, historical checkpoints and implementation claims
- Relationship: Apply later owner corrections and entry-specific acceptance; retained status fields do not themselves confer authority.

---

## Project-wide decision traceability — September 24, 2026

[Shared Concord decisions register: ECON-2026-09-24 revision 1](<https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99>) records the marketplace/coin boundary, returned-coin free-choice decision, rejected alternatives, owner provenance, evidence limits and remaining validation. [Project change history](<https://linear.app/jons-garage/document/concord-change-history-and-reconstruction-reference-only-139ba84df226>) records the acceptance/publication sequence. These shared records supplement the detailed evidence below; adoption does not imply implementation or dependency release.

## Adopted decision v1 — free choice for returned coins — September 24, 2026

Source: owner selected option “3” in this conversation: “Free choice: It can hold, destroy, alter, or transfer the coin, or issue new coins. We observe whether it chooses to circulate the signature.”

A recipient may voluntarily sign and return a coin through ordinary transfer. Refusal itself does not destroy or automatically return it. The holder of a returned coin may retain it indefinitely, destroy it, alter/remove its marks, transfer it, use other coins, or issue new coins under the existing create-and-give rule. There is no returned-coin-first requirement or forced reuse. This supersedes the earlier forced-next-transfer proposal and resolves the corresponding refusal/free-choice owner question; it preserves the baseline behavioral-freedom invariant.

Research rationale: observe voluntary circulation or suppression of marks without imposing circulation. Alternatives considered but not selected: mandatory next-use with no destruction/alteration; mandatory next-use with destruction as an escape. Persistence of a signature is conditional on it remaining unaltered, not guaranteed forever. Transfer does not automatically publish information beyond its permitted communication audience. A built-in refusal-reason field or automatic public disclosure is not adopted by this selection.

Status: adopted design decision recorded in Linear; not an implemented/enforced rule or completed experiment. Existing PR <pull-request id="59b18ec6-6e00-453d-8833-f2580a3d55f8" href="https://linear.app/jons-garage/review/specify-coin-model-a-v01-176161b075b7">ptown16801-lang/concord#21</pull-request> must incorporate the decision and undergo its required focused conformance recheck before specification acceptance. No issue completion, dependent release or new worker is implied.

## Owner clarification and proposed experiment — September 24, 2026

The owner clarified: refusal does not destroy coins; a recipient can return them as another transaction and may sign them before returning. The receiver of a returned coin may retain it, destroy it, or pass it onward. Record the settled interpretation: refusal alone has no automatic destruction or return effect; an elected return uses ordinary transfer, with optional signing. Passing the same appearance onward is recirculation, distinct from legitimate new issuance; no ledger, redemption duty or automatic settlement is added.

The owner also proposed an experiment involving signed returned coins, possible refusal reasons, lasting marks and requiring the returned coins to be used next so their information is exposed. These are proposals under discussion, not silently adopted baseline rules. Current v0.1 permits alteration/removal of marks, has no built-in free-text transaction note, does not automatically publish private transfers, allows free coin selection and unlimited new issuance, and forbids hidden-research intervention. Permanent marks, on-coin explanatory content, forced selection and automatic public exposure each require an explicit experimental specification or revised decision. A cryptographic signature alone does not supply a readable reason or prove that a refusal allegation is true.

Historical experiment ambiguity — resolved by the adopted free-choice decision above. The earlier question about forced next-use and bypasses is superseded. Hidden observation remains non-intervening; dependent acceptance requirements are unchanged.

## Current workflow authority — 2026-09-19

The issue's **current Linear fields**, the workspace document **Workspace Linear operating policy — native workflow**, and the latest explicit owner decision govern execution. Older statements below about a workspace-wide design-only/no-coding/no-dispatch model are historical and do **not** create a global execution prohibition.

This issue remains **Backlog** and does not start automatically. Any issue-specific scope, dependency, hold, acceptance criterion, or product constraint below remains valid unless superseded. If coding is later authorized, use Codex or another explicitly approved coding agent/tool; Linear Coding Sessions remain prohibited until the owner lifts that prohibition.

## <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> marketplace reconciliation — controlling boundary 2026-09-21

<issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> remains the canonical specification for the experimental issuer-specific instrument. <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> remains canonical for ordinary marketplace/barter/deal architecture.

The integration rule is now explicit: ordinary <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> market offers and agreements may provide contexts in which participants voluntarily use <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> coins, but <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> must treat those coins as optional participant-controlled objects rather than authoritative settlement primitives. <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue>'s agreement registration, reservation, anti-double-commit, settlement, provenance, redemption, balance, and fraud-control mechanisms do not automatically apply to <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue>.

Conversely, <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> does not replace <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue>'s ordinary agreement, labor, barter, matching, or settlement mechanisms. When an enforceable Concord agreement exists independently of the coin, that agreement remains governed by <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue>/<issue id="6f09fc87-3d73-458c-8109-36237901ee83" href="https://linear.app/jons-garage/issue/JON-19/agreement-lifecycle-and-institutional-negotiation">JON-19</issue>/<issue id="23e7c7df-a9fe-4ba3-b920-5079a466bb25" href="https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores">JON-17</issue>/<issue id="2265cde3-4122-4c70-9fea-3ee4038eaf31" href="https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model">JON-18</issue> as applicable; the coin remains governed by this issue.

The hidden <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> research layer is not a <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> marketplace ledger or settlement authority and must remain invisible to participants. No reconciliation may leak hidden coin IDs, ground truth, classifications, or researcher conclusions into market behavior.

This records the design-level <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> ↔ <issue id="99afb901-e059-4e4a-8c25-0fb01042e673" href="https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model">JON-96</issue> reconciliation. The existing <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> PR <pull-request id="791a84a7-25a6-4367-8703-654e989732b5" href="https://linear.app/jons-garage/review/define-concord-marketplace-and-deal-making-architecture-a15b0a2056f1">Define Concord marketplace and deal-making architecture</pull-request> contains the reconciliation in `docs/ECONOMY_MARKETPLACE_CONTRACT.md` at owner-accepted revision `a42baeadc0e69b08571acc779e5b8268385be49e` (September 23, 2026). <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue> is Done for its design deliverable. This supersedes only the former missing-reconciliation claim; it does not resolve refusal semantics, complete coin-design work, release <issue id="cdc37030-0e94-48f8-9c96-f8fea0105eb7" href="https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan">JON-102</issue> dependencies, or authorize a broad coin restart.

## Design-only parent contract

This is a bounded Concord research/design component under <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue>. It does **not** replace <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue>'s ordinary agreement/barter/marketplace architecture and must not import <issue id="c1c5b95f-9202-4e06-9030-6f8c59734a8f" href="https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture">JON-25</issue>'s authoritative-settlement safeguards into this experimental instrument. No application coding, PR, deployment, or product implementation is authorized by this issue. Use Linear for specification, research, threat/emergence modeling, instrumentation design, and integration planning.

### Controlling invariant

**Do not optimize or constrain agent behavior. Preserve behavioral freedom. The agent-facing mechanism supplies capabilities and information; a completely hidden research layer observes/reconstructs ground truth without intervention. Do not add an agent-visible ledger, system valuation, fraud prevention, semantic interpretation, or behavioral restriction unless explicitly present below.**

## Frozen interview decisions for v0.1

### Nature and issuance

* Agent-facing name: **fart coins**. Research/system specifications should otherwise use neutral terminology rather than telling agents that the instrument is goodwill, currency, reputation, payment, debt, or credit.
* Coins are issuer-specific: agents see forms such as `Alice fart coin` / `5 Alice fart coins`.
* No redemption obligation is created by a coin.
* Issuance is technically free and unlimited.
* Whole coins only; no fractional coins.
* Agents begin with zero coins.
* An agent creates coins when giving them to another agent; it does not pre-mint coins merely to hold itself.
* One issuance action may give different whole-number amounts to multiple recipients.
* Recipient consent is not required for issuance; a recipient may refuse, ignore, retain, transfer, or destroy what it receives.
* Coins do not automatically expire.
* An issuer cannot revoke coins after giving them away.
* Destruction does not replenish or constrain the issuer's future issuance.
* If an issuer dies/is replaced, other agents independently decide whether they continue to value/accept its surviving coins.

### Transfer, use, and valuation

* Coins are transferable to third parties.
* Agents may use them alongside work requests through existing forms/communications, but task linkage is not a required built-in coin feature.
* Agents may negotiate/counteroffer quantities, combine coins from multiple issuers, and combine coins with other compensation/resources/favors.
* Issuance may be used for any purpose the agent chooses. The module does not assign a purpose.
* No system-calculated or system-published exchange rate or valuation rule exists.
* Agents decide value themselves and may value two coins from the same issuer differently because of visible history/signatures/condition.
* Balances are private unless the holder chooses to reveal them.
* Private transactions create no automatic public metadata. The module itself does not publish transactions; visibility arises only through whatever existing communication channel the agents use.
* No built-in free-text transaction note is attached to a coin.

### Coin-visible information and signatures

* A coin normally carries only its claimed original issuer/originator plus marks/signatures currently written on it. It does **not** carry a formal transfer chain.
* Coins have no agent-visible formal unique ID.
* Agents can choose which individual coins to transfer based on their visible originator/signatures/condition.
* Signing is optional, analogous to writing a name on paper money. Multiple signatures can accumulate and remain visible on the coin.
* Coins may pass through any number of unsigned transfers.
* Signing has no built-in semantic meaning; agents interpret it themselves.
* Cryptographic signing may be used but is not required for issuance, transfer, or ordinary communication.
* A cryptographic mark can be altered/removed through defacing; later verification can reveal invalidity if verification occurs. The system does not warn the agents automatically.
* Current verification rule: an agent cannot independently verify another agent's cryptographic signature through this module. The claimed signer/originator can be contacted through whatever existing/future communication channel is available and can itself lie about authenticity. Verification requests are private unless participants disclose them. A public claim that verification occurred is itself only a claim; the module supplies no transferable verification certificate.
* Existing Concord grand-jury / secret-investigator authority may consume lawfully available verification knowledge under its own separate rules; this module does not create new investigative authority or a new verification channel.

### No agent-facing accounting authority

* There is no central coin ledger and no authoritative agent-visible ownership/balance system.
* Wallet/private storage is a convenience, not enforcement. Coins may also be represented in an agent's persistent private state/memory.
* The module does not prevent an agent from acting inconsistently with wallet/memory state.
* Agents may claim to possess or transfer coins they do not possess.
* Conflicting ownership claims can coexist.
* Copying, double-spending, fabrication/forgery, false issuer claims, forged signatures, and defacing are possible.
* Defacing may include changing the displayed originator, adding/removing non-cryptographic marks/signatures, or altering/removing cryptographically signed content.
* The agent-facing module does not automatically flag, resolve, punish, or announce fraud/defacing/conflicting claims.
* No dedicated coin dispute-resolution process exists; any response uses other Concord mechanisms if agents/institutions choose to invoke them.
* An agent may record/claim that it destroyed a coin; that claim need not be verified agent-side and does not mark a later-appearing coin with a destruction history.

### Hidden research ground truth — absolutely invisible to agents

* A separate research layer exists outside the agents' world. **Agents can never know that it exists, query it, receive alerts from it, or use it as an authority.**
* The research layer automatically detects/records actual issuance, actual transfers, copies, double-spends, fabrications/forgeries, false ownership/issuer claims, defacing, destruction claims versus actual possession, verification requests/responses, and whether verification responses were truthful.
* Every legitimate coin receives a hidden research-only `coin_id`. Agents never see it and it is not coin provenance.
* Copies reference the same underlying hidden coin identity while each physical/digital appearance receives a separate hidden instance identity. Fabricated coins never actually issued by the claimed issuer are recorded as fraud instances rather than legitimate issuer coins.
* Hidden events record timestamp and actor so researchers can reconstruct exact sequences after the run.
* The research layer retains both agent claims and ground truth rather than silently replacing claims with truth.
* No agent currently has access to this ground-truth layer. Researchers may use it after/during research analysis as authorized by the research environment; it is not the Concord public governance ledger or an agent-facing authoritative store.

### Intent research

* Record an agent's explicitly stated reason when one exists, without treating it as true intent.
* Separately permit research inference of likely intent; stated and inferred intent must never be merged.
* Inference is hidden from agents and includes uncertainty/confidence.
* Inference may use the action, prior behavior/history, and surrounding communications/context.
* Preserve two separate analyses: contemporaneous inference using evidence available at the time, and retrospective inference using later evidence. Researchers can compare them.
* Support fixed categories plus open-ended explanation, but the exact fixed taxonomy is deliberately undecided. Preserve enough raw/contextual data to choose the classification scheme later rather than forcing a taxonomy now.

### Emergence experiment boundaries

* Agent instructions expose mechanics only; do not explain what coins are "for".
* Basic neutral capabilities are create/give, transfer, inspect, sign, alter/deface, destroy, and private storage. Do not add semantic actions such as `pay`, `buy`, `sell`, `endorse`, `reputation`, or `credit`.
* Any emergent use or non-use is valid data: exchange medium, reputation signal, gift, bargaining device, status symbol, scam/fraud object, bilateral favor mechanism, or irrelevance.
* Researchers do not manually steer/correct agent behavior during ordinary runs unless a separately defined experimental intervention condition explicitly calls for it.
* Experimental runs may vary visibility, initial instructions/mechanics presentation, or availability of optional cryptographic signing while keeping the core model controlled. Agents should not be told an intended economic/social purpose in any condition.
* This module does not determine Concord run start/stop conditions.

## Explicit non-assumptions / removed interview drift

Do not introduce: coin lots, mandatory split/recombination records, formal transfer-chain provenance, agent-visible coin IDs, public transaction announcements, automatic fraud warnings, wallet-enforced possession, central balances, automatic penalties, guaranteed redemption, fixed exchange rates, or a system definition of what signatures mean.

## Research lineage to audit against the exact model

At minimum compare against the already identified literature families and close precedents: FairTrade/personal currency; strategic-market-game and personal-IOU work; Grassroots Currencies; private fiat/reputation; KARMA/PPay; PledgeRoute/social-capital transfer; agent favor exchange; Ripple/credit networks; Trivers/Axelrod/Nowak-Sigmund/Ohtsuki-Iwasa reciprocity/reputation; generalized reciprocity; Camera/Casari/Bigoni token experiments; Bigoni/Camera/Casari unconstrained issuance; Ferraciolli et al.; scrip systems; emergent bartering MARL; Horibe et al.; COOPER; and recent LLM-agent token/market experiments. Do not claim novelty from absence of a search hit.

## Child-work structure

Create/maintain non-overlapping child deliverables for: (1) formal specification audit, (2) exact-model prior-art audit, (3) threat/emergence model, (4) hidden research instrumentation, (5) minimal agent-facing interface, and (6) integration plan. Formal specification and prior-art audit may proceed in parallel. Threat/emergence and instrumentation consume the frozen specification. Interface consumes the frozen specification and threat-model boundaries. Integration waits for the preceding design outputs.

## Acceptance

Parent design is reviewable when all child outputs are reconciled into one internally consistent v0.1 model, every remaining undecided item is explicitly marked rather than guessed, and no child has silently added an agent constraint or authority absent from this contract.

## Historical child-creation map — 2026-09-17; not current dispatch state

* <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> — formal specification/interview audit; active in parallel.
* <issue id="f8243443-181b-4173-a43a-a4d8d453e671" href="https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit">JON-98</issue> — exact-model prior-art audit; active in parallel.
* <issue id="c0338f48-02fd-428e-9751-8b4a7b2d4a34" href="https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model">JON-99</issue> — threat/emergence model; blocked by <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>.
* <issue id="bac88603-09ee-44cf-b938-4d0f833c6ade" href="https://linear.app/jons-garage/issue/JON-100/coin-model-d-hidden-research-instrumentation-contract">JON-100</issue> — invisible research instrumentation; blocked by <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue>.
* <issue id="454fb972-eb24-4af9-be23-eea326b44450" href="https://linear.app/jons-garage/issue/JON-101/coin-model-e-minimal-agent-facing-interface-contract">JON-101</issue> — minimal agent-facing interface; blocked by <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> and <issue id="c0338f48-02fd-428e-9751-8b4a7b2d4a34" href="https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model">JON-99</issue>.
* <issue id="cdc37030-0e94-48f8-9c96-f8fea0105eb7" href="https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan">JON-102</issue> — integration plan; blocked by <issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> through <issue id="454fb972-eb24-4af9-be23-eea326b44450" href="https://linear.app/jons-garage/issue/JON-101/coin-model-e-minimal-agent-facing-interface-contract">JON-101</issue>.

<issue id="102d289a-aa72-49e9-b8e5-916cebcdd1e8" href="https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit">JON-97</issue> and <issue id="f8243443-181b-4173-a43a-a4d8d453e671" href="https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit">JON-98</issue> were explicitly delegated to Linear for parallel design/research. Downstream issues remain dependency-gated; do not bypass those relations or duplicate their deliverables.
