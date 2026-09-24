# JON-98 — exact-model prior-art audit

**Audit date:** 2026-09-17; source verification and corrections: 2026-09-19

**Verification:** [claim-to-source table](JON-98_SOURCE_VERIFICATION.md). This revision rechecks the prior draft against retrieved source text and metadata; it does not constitute independent acceptance or claim completion of another worker’s report.

**Target:** the frozen JON-96 v0.1 mechanism

**Scope:** research comparison only; this report neither redesigns JON-96 nor makes a novelty claim

## Result

The literature establishes many JON-96 ingredients separately. Personal-IOU experiments and the Grassroots Currencies proposal establish narrower person-specific exchange mechanisms. Strategic-market-game experiments establish participant-issued IOUs. Token experiments establish intrinsically worthless, non-redeemable objects whose use as money can emerge under neutral instructions. Bigoni, Camera, and Casari test a rule allowing a tokenless consumer to create one token when seeking to trade within administered experimental state. Reciprocity, credit-network, P2P-payment, scrip, MARL, and LLM-agent work establish other adjacent pieces.

No reviewed source verifies the full JON-96 interaction: freely and indefinitely created, issuer-labelled, non-obligatory bearer-like objects; private and potentially inconsistent possession; optional, alterable, semantically open marks on individual objects; unprevented copying, forgery, defacing, and double-spending; no agent-visible accounting authority; purpose-neutral agent instructions; and a perfectly observing but absolutely hidden, non-intervening research record. This is an **unverified combination**, not evidence of novelty.

## September 24 decision impact check — ECON-02

The owner chose free choice after considering compulsory next-use. Source: [project-wide ECON-2026-09-24 revision 1](https://linear.app/jons-garage/document/concord-preserved-architecture-and-decisions-source-on-demand-4215103aac99); formal incorporation: [PR #21](https://github.com/ptown16801-lang/concord/pull/21), revision `7073e9a`.

This is a bounded producer impact check of the existing audit and source-verification table, not a new search, source replication or final research acceptance.

| Affected comparison | Disposition |
| --- | --- |
| T: refusal, transfer, retention and destruction | Refusal has no automatic state effect. A signed voluntary return composes existing sign and transfer capabilities; the receiver retains free choice. T wording is clarified. Existing P/C/NR source-family grades are unchanged: none establishes the full clarified group, and partial overlap is not promoted to exact support. |
| M: optional marks | Replace ambiguous “persistent” wording with conditional persistence/alterability. No permanent stigma or authenticated refusal meaning is inferred. Existing M grades and authenticity/removal limits remain. |
| P/A/N/H: privacy, freedom and observation | No automatic public disclosure, forced selection, mandatory reason field, authoritative ledger or observer intervention is introduced. Existing comparisons remain bounded to their cited evidence. |
| Hypotheses 2–4: marks, refusal and copies | These remain untested hypotheses. Signed return is an optional sequence worth observing, not a predicted motive or experimental result. Nonresponse is not refusal; receipt is not acceptance; mark circulation does not establish endorsement. |
| I and other issuance comparisons, including S17 | Unlimited create-and-give remains unchanged. The existing conditional one-token S17 correction and no-novelty conclusion remain intact. |

No new source claim or changed source grade is justified by this clarification. The existing source ledger, citation chains, unavailable-text limits and unresolved Horibe/COOPER identities are preserved. No targeted search gap was identified for this wording update; testing predictions about signed returns would require a separately specified study, not an assertion of support from adjacent literature. Final research-package acceptance remains with the existing JON-98/JON-106 review path.

## Method and evidence grades

This audit compared source mechanisms, not labels. A source saying “currency,” “token,” or “reputation” was not counted as a match unless its operational rules supported the comparison.

- **E — established:** the source directly establishes every component of the exact property group. No source earns E for a whole group in this revision.
- **P — partial:** a narrower analogue is present, or the property is inseparable from materially different controls.
- **C — contrary:** the source explicitly uses a conflicting mechanism.
- **NR — not established by the evidence retrieved:** either the inspected material does not report the property or the required full text was unavailable; the verification table distinguishes these cases. NR is not evidence of absence.

Primary papers, authors' versions, protocols, and original technical reports were preferred. Later papers were used to trace citation chains, not to substitute their characterization for an accessible primary source. “Horibe et al.” and “COOPER” could not be uniquely resolved from the supplied names; that limit is recorded rather than silently attaching an unrelated paper. No quiz, answer-bank, or study-help content was used.

## JON-96 property groups

The matrix groups the frozen specification without weakening it:

| Code | Exact JON-96 property group |
| --- | --- |
| **I** | Issuer-specific whole objects, created only when given; zero initial stock; free and unlimited creation; no redemption duty, expiry, revocation, or replenishment consequence |
| **T** | Third-party transfer including voluntary return; refusal alone causes no automatic return/destruction; retention, destruction, alteration, other-coin selection, create-and-give, negotiation, multi-issuer bundles, and mixing with other consideration remain possible; no forced reuse |
| **V** | No system valuation; agents may value individual same-issuer objects differently, including after issuer death/replacement |
| **P** | Private balances and transactions; no automatic publication, public metadata, or mandatory task link/note |
| **M** | Object shows claimed originator plus optional marks that persist only while unaltered; no visible ID or formal transfer chain; unsigned transfers; marks have no built-in semantics |
| **A** | No agent-facing accounting authority or enforced possession; conflicting claims, copying, double-spending, fabrication, forgery, and defacing remain possible and unflagged |
| **N** | Neutral capabilities and instructions; no assigned economic or social purpose; emergent use or non-use is valid data |
| **H** | Agent-invisible ground truth records actual events, appearances, claims, verification truth, and stated versus inferred intent without intervening |

## Source-backed comparison matrix

The parenthetical reference identifiers link to the primary-source ledger below. E requires a conjunction; P records a useful partial analogue despite other mismatches stated in the final column, while C flags a conflicting primitive without claiming zero topical overlap. Thus partial transfer, privacy, valuation, or neutral-language evidence earns P, not E. C records an explicit incompatible rule, not mere silence. H is NR when a source does not describe the hidden-layer contract; ordinary experimenter observation earns at most P. Family rows summarize only the cited members with verified evidence and do not attribute every feature to every member.

| Source family | I | T | V | P | M | A | N | H | What is actually established / decisive mismatch |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | --- |
| Strategic market games and Angerer–Huber–Shubik–Sunder personal IOUs ([S1], [S29], [S30]) | P | P | P | C | NR | C | C | NR | Strategic games establish exchange using participant currencies; the experiment has each participant issue personal IOUs. A costless clearinghouse sets exchange rates and clears markets; IOUs are promises, and non-delivery is deterred by penalties. This establishes personal issuance, not non-obligatory ungoverned objects. |
| Hu–Bhuyan–Feng, **FairTrade** / personal currency ([S2]) | NR | NR | NR | NR | NR | NR | NR | NR | Identity and publisher-deposited references verified; full text/abstract not retrieved in this pass. The title establishes the topic of personal-currency indirect reciprocity, not custody, transfer, security, or FairTrade implementation details. Prior mechanism grades are suspended. |
| Shapiro, Grassroots Currencies ([S3]) | P | P | P | P | C | C | C | NR | Anyone may issue at will and anyone may trade issuer-specific coins. Coins are explicitly units of debt with redemption duties, signed identities, provenance and protocol-governed payments/accounting. Fresh coins are initially self-held; doublespending is modelled and exposed through evidence, not assumed impossible. This is the broadest issuer/transfer overlap and a strong architectural counterexample. |
| Fugger, original Ripple proposal ([S4]) | P | P | P | P | C | C | C | NR | Person-to-person IOUs and credit-limited trust paths provide decentralized liquidity in a proposal with tentative protocol answers. The unit is a credit relationship/balance routed through a network, not a freely copyable bearer-like object with marks or conflicting ownership. |
| PledgeRoute ([S5]) | NR | NR | NR | NR | NR | NR | NR | NR | Bibliography verified. The title identifies a Sybilproof indirect-reciprocity mechanism; routing, social-capital transfer, and visibility claims require full-text verification. |
| KARMA, Off-line Karma, and PPay ([S6]–[S8]) | C | P | C | C | C | C | C | NR | Transferable incentive/payment units are established, but KARMA uses bank-set balances and atomic transactions; Off-line Karma detects fraud through coin traces and distributed bank roles. PPay’s primary full text was unavailable in this pass; its details are not established by the other papers. These systems are designed to constrain free-riding/fraud. |
| Human-agent favor exchange ([S9]) | NR | NR | NR | NR | NR | NR | NR | NR | Bibliography verifies varied-magnitude favor exchange in human-agent negotiation. The earlier dyadic-promise, betrayal, and valuation claims are not independently supported by the retrieved metadata. |
| Direct, indirect, and generalized reciprocity ([S10]–[S15]) | NR | P | NR | NR | NR | NR | C | NR | Retrieved abstracts for Axelrod–Hamilton and full text for Pfeiffer et al. support repeated-game and generalized-reciprocity mechanisms. Other identities are verified, but their detailed mechanism claims remain pending primary full-text checks; none of this evidence establishes coin custody or hidden-layer rules. |
| Camera–Casari–Bigoni token experiments ([S16]) | C | P | P | P | P | C | P | P | Subjects discover exchange of intrinsically worthless, non-redeemable, indivisible tokens under abstract instructions; identities are anonymous and own holdings are reported, but subjects also receive group defection counts. This is not JON-96’s absence of automatic public transaction metadata. The experiment fixes and faithfully administers homogeneous token supply and permitted transfers. |
| Bigoni–Camera–Casari, **Money Unconstrained** ([S17]) | P | P | P | P | P | C | P | P | A tokenless consumer can create one token when seeking to trade within administered experimental state. The authors’ monetary-trade strategy does not emerge; cooperation/efficiency are lower than in Memory. Tokens nevertheless change hands in 59% of encounters (accepted manuscript §5.3, Result 7). This tests that conditional one-token creation rule for homogeneous tokens; it does not establish unrestricted minting, arbitrary issuance quantities, or issuer-specific unledgered objects. |
| Ferraciolli et al. ([S18]) | C | P | P | P | C | C | C | NR | A reliable ledger transfers initially allocated, identical, private, nonperishable tokens. Evolutionary simulations find money can sustain generalized reciprocity, while excessive liquidity can destroy its informational value. No endogenous issuer-specific instrument or uncontrolled fraud is present. |
| Scrip systems ([S19]) | C | P | C | P | C | C | C | NR | Artificial currency for reciprocal service and threshold equilibria are formally analysed; the introduction attributes monetary-crash policy analysis to a companion paper. The model fixes global supply and authoritative balances; individual agents do not issue distinguishable objects. |
| Private fiat and issuer reputation ([S20]) | NR | NR | P | NR | NR | NR | NR | NR | Private money provision and trust are studied at the monetary-policy level. The retrieved abstract concerns commitment, trust, competition and inflation. It does not verify redemption duties or any artifact-level claim; those should not be inferred from “private money.” |
| Emergent-barter MARL ([S21]) | C | P | P | P | C | C | P | P | Agents learn bilateral offers, production, consumption, spatial price differences, and arbitrage without being taught microeconomic conclusions. They barter environmental goods; they do not invent or circulate issuer-specific tokens. |
| Recent LLM-agent economies and markets ([S22]–[S28]) | C | P | P | P | C | C | P | P | Different studies supply different tasks: work/consumption, commons management, outsourcing, civilization simulations, auctions, or credence-goods markets. COALESCE specifies verification/settlement, but payment is outside base A2A and its cost “tokens” are LLM usage units. Horton is a simulated-subject precursor, not evidence of circulating money. No shared implemented settlement protocol is established across this family. The inspected passages do not establish JON-96’s neutral artifact capability set. |
| “Horibe et al.” | NR | NR | NR | NR | NR | NR | NR | NR | No uniquely identifiable primary source was recoverable from author name plus the supplied topic. No comparison is inferred. |
| “COOPER” | NR | NR | NR | NR | NR | NR | NR | NR | No uniquely identifiable economic/token primary source was recoverable from the acronym/name. COALESCE ([S25]) and *Cooperate or Collapse* ([S24]) are separately identified and are not relabelled as COOPER. |

## Closest precedents, ranked by mechanism overlap

This qualitative ordering prioritizes person-specific denomination and discretionary issuance, then circulation and valuation. Authority, debt and assigned purpose are decisive mismatches. It is a transparent reading order, not a numerical similarity score or novelty ranking.

1. **Grassroots Currencies ([S3]).** Closest on personal denominations, issuance at will, third-party exchange, subjective discounts and issuer death. Debt/redemption duties, self-held fresh coins, signed provenance and protocol state differ decisively.
2. **An Economy with Personal Currency ([S1]).** Closest controlled personal-IOU economy. The retrieved abstract explicitly establishes clearinghouse exchange rates and penalties; no claim of ungoverned, non-obligatory objects follows.
3. **Money Unconstrained ([S17]).** Closest direct test of a tokenless consumer creating one token when seeking to trade within administered experimental state. The monetary-trade strategy did not emerge, but tokens changed hands in 59% of encounters. The result is conditional on homogeneous tokens, administered state and a helping game.
4. **Scarce-token treatments ([S16], [S17]).** Closest evidence for worthless, non-redeemable objects acquiring exchange meaning under neutral vocabulary. Fixed supply, defined payoffs and administered custody remain integral.
5. **Original Ripple proposal ([S4]).** Personal counterparties, trust and credit paths connect exchange beyond dyads. Debtor identity is not personal coin denomination; credit limits and account relationships replace selectable artifacts. Protocol answers are partly tentative.
6. **Ferraciolli et al. ([S18]).** Tokens mediate generalized reciprocity; high liquidity can impair their informational value. Initial balances, a reliable ledger and prescribed strategies differ from unrestricted issuance and behavior.
7. **Scrip / KARMA / Off-line Karma ([S19], [S6], [S8]).** Service exchange, supply and fraud are close questions; common units, bank roles, controlled balances or trace-based detection are contrary mechanisms.
8. **Emergent barter and inspected LLM-agent studies ([S21], [S22], [S24]–[S28]).** Learned trade, negotiation, cooperation, task outsourcing and fraud are relevant behavioral analogues. Their environmental resources, tasks and rules do not establish the frozen coin combination.

**Unranked pending primary-text evidence:** FairTrade/personal currency ([S2]), PledgeRoute ([S5]) and PPay ([S7]) remain important named candidates. Their earlier positions 3, 8 and part of 9 were not independently justified by the retrieved metadata and are withdrawn rather than treated as verified comparisons. The favor-exchange study ([S9]) and private-fiat study ([S20]) remain adjacent topics with the evidence limits recorded below. Horibe and COOPER remain unresolved identities.

## Citation chains traced

The direct links checked in this separate source-verification pass are distinguished from conceptual groupings. A deposited reference verifies a citation edge, not the cited mechanism.

- **Personal IOUs / strategic market games → FairTrade:** S2’s publisher-deposited Crossref reference list explicitly names S1’s 2007 Cowles paper, S30, S5 and S7. S1’s retrieved abstract names Sahi–Yao (1989) and Sorin (1996); do not replace Sahi–Yao with Amir et al. (S29). S29 is a related verified bibliographic identity, not a verified direct ancestor on this evidence.
- **Token experiments → Ferraciolli:** S18 v1, references and model introduction, explicitly cites S16 and S17; S17’s accepted manuscript discusses S16. This verifies a chain into the simulated monetary-exchange strategy, not inheritance of JON-96 mechanics.
- **Reciprocity → Ferraciolli:** S18’s model introduction explicitly cites Axelrod–Hamilton and Nowak–Sigmund. The wider S10–S15 grouping is conceptual; not every pairwise citation edge has been inspected.
- **KARMA / PPay → Off-line Karma; KARMA → scrip:** S8’s introduction discusses S6 and S7; S19 v2 §1.1 explicitly cites KARMA. S8’s characterization of PPay is secondary evidence, not a substitute for S7’s unavailable primary text.
- **Ripple → Grassroots Currencies:** S3 v17 reference [28] identifies Fugger’s 2004 proposal. The Fugger v2 text retrieved in this separate source-verification pass confirms credit paths; it is a proposal, not evidence of a deployed implementation.
- **MARL → recent LLM-agent studies:** this is a thematic comparison only. No direct citation chain joining every item S21–S28 was verified. COALESCE and *Cooperate or Collapse* are not substitutions for the unresolved COOPER label.

## What is established individually

| JON-96 ingredient | Direct evidence | Boundary of that evidence |
| --- | --- | --- |
| Person-specific exchange instruments can operate | [S1], [S3], [S4] | IOU/debt/credit and clearing/path semantics; S2’s detailed mechanism remains unverified |
| Any person can issue a named currency at will | [S3] | Protocol-governed debt coins, not non-obligatory artifacts |
| A tokenless consumer can create one token when seeking to trade | [S17] | Homogeneous tokens in a fixed helping game within administered experimental state; no unrestricted minting or arbitrary issuance quantities |
| Conditional one-token creation or high liquidity can impair cooperation or token information | [S17], [S18] | S17 tests creation by a tokenless consumer seeking to trade within administered experimental state; S18 studies liquidity. Results differ by model; S19 points to a companion paper for monetary-crash policy analysis; none combines personal issuers with uncontrolled fraud |
| Worthless and non-redeemable tokens can acquire exchange value | [S16], [S17] | Scarce, homogeneous, experimenter-administered objects |
| Cooperation may extend beyond the last partner | [S15], [S18] | Prescribed reciprocity or monetary strategies; S2/S5 routing and S14 specifics are not independently verified here |
| Agents/subjects can negotiate quantities and discover prices | [S21], [S27] | Environmental barter offers or auction rules; S22 macro decisions and S25 cost selection are different evidence |
| Holdings/history affect exchange in controlled models | [S16]–[S18] | Custody remains correct and experimenter-observable; forgery/conflicting claims are absent |
| Trust is relevant to personal/private money | [S3], [S20] | S3 specifies redemption; S20’s abstract studies commitment and trust, not optional marks or an established redemption duty |
| Neutral terminology can permit monetary behavior to emerge | [S16], [S17] | Participants receive a narrowly structured exchange game |
| Fraud/double-spend detection can be engineered | [S6], [S8] | Detection/prevention is visible system authority—the inverse of JON-96 |
| LLM agents can cooperate, bargain, collude, and specialize in economies | [S22], [S24]–[S28] | These are distinct tasks; S23’s metadata alone establishes no mechanism. No reviewed experiment gives the exact neutral personal-coin capability set |

## Combinations and interactions still unverified

No inspected passage establishes the following combinations. This is a bounded evidence statement, not a claim about unavailable full texts or the entire literature:

1. **Personal denomination × no obligation × unlimited creation.** The verified closest person-specific sources use debt, IOUs or credit; issuer-managed private fiat is a separate comparison. Tokens in the Money Unconstrained treatment are not issuer-specific.
2. **Unlimited creation × third-party circulation × no authoritative custody.** Money Unconstrained allows a tokenless consumer to create one token when seeking to trade within administered experimental state, with a narrow one-token transfer action. It does not test unrestricted minting or arbitrary issuance quantities.
3. **Object-level history × ambiguous meaning.** Sources study verified provenance, balances, or reputation. The inspected passages do not establish a test of optional accumulated marks whose meaning, authenticity, and removal are all left to agents.
4. **Private interaction × observable artifacts × inconsistent claims.** Controlled token experiments administer balances and may also disclose aggregate or counterpart information. P2P protocols prevent or expose inconsistent spending. The inspected passages do not establish the exact combination of unresolved possession claims and continued circulation.
5. **Forgery/defacing freedom × endogenous valuation.** The inspected security protocols seek to detect or prevent fraud; the retrieved passages do not establish the combination of copying, false origin, signature removal, and double-spending as ordinary capabilities with differentiated valuation.
6. **Issuer death × surviving non-debt objects.** Grassroots Currencies considers death through creditor/debt accounting. JON-96 leaves every holder and counterparty to value surviving objects independently.
7. **Neutral mechanics × open-ended LLM-agent society.** Neutral token experiments narrowly structure helping and transfer. LLM-agent economies supply the semantics of money, goods, work, or markets.
8. **Hidden exact truth × zero agent access.** Experiments log ground truth, and protocols expose authoritative state. The inspected passages do not establish comprehensive truth permanently unknowable and unusable to agents while their world-state claims diverge.
9. **Stated intent × contemporaneous inference × retrospective inference.** The inspected passages do not establish preservation of these three streams separately for issuance, transfer, fraud, alteration, verification, and destruction.

## Research hypotheses not directly answered by the cited work

These hypotheses concern the frozen mechanism; they are not design recommendations.

1. **Issuer differentiation hypothesis.** Under free creation, issuer-specific labels may preserve local scarcity/information and support circulation where homogeneous freely created tokens fail ([S17], [S18]).
2. **Artifact-history hypothesis.** Optional, alterable, semantically undefined marks may create within-issuer price dispersion or distinct roles (authenticity signal, endorsement, stigma, decoration) without a formal provenance chain.
3. **Epistemic-friction hypothesis.** When possession and authenticity are only claims, agents may substitute private verification, relational trust, discounting, refusal, or institutional appeals for ledger certainty; the mix is not predicted by anti-fraud protocols.
4. **Copy tolerance hypothesis.** Copying and double-spending may destroy use, or may instead produce differentiated “original,” “credible copy,” and “worthless copy” conventions when every visible fact is contestable.
5. **Purpose-emergence hypothesis.** In an open-ended LLM-agent setting, a neutral issuer-specific object may become money, reputation, gift, status, bargaining chip, scam object, or nothing; the inspected LLM-market designs do not estimate this distribution; unavailable sources cannot be ruled out.
6. **Post-issuer persistence hypothesis.** Objects with no redemption claim may retain, lose, or change value after issuer death according to visible marks and social narratives rather than creditor recovery expectations.
7. **Observer-separation hypothesis.** Analyses based on hidden event truth may materially disagree with analyses reconstructable from agent-visible claims; contemporaneous and retrospective intent inference may diverge systematically after later fraud evidence.

## Evidence limits and non-claims

- This is a bounded audit, not a systematic review with database-wide recall guarantees. Failure to retrieve a duplicate cannot support novelty.
- Access and evidence level are recorded per entry in the verification table. Metadata verifies identity, not operational rules. In particular, S2, S5, S7 and S9 are not full-text-verified here; previously asserted implementation details are suspended or explicitly provisional.
- “Horibe et al.” and “COOPER” are not sufficiently specified to identify primary works safely. This pass checked Crossref and OpenAlex queries recorded in the verification table, without recovering a unique match. The earlier draft’s unlogged claim of a wider search is not treated as reproducible evidence. A title, DOI, URL, venue, or author list is needed to complete those two lineage nodes.
- Grassroots Currencies is an evolving arXiv protocol manuscript. Its evidence is a formal proposal/protocol, not a behavioral deployment of the exact JON-96 environment.
- [S18], [S25], and several recent LLM-agent items were preprints when first released; [S18] now also has a peer-reviewed journal version. Simulation results do not by themselves establish human or deployed-agent behavior.
- “Private” varies across sources: private from peers, anonymous to subjects, or confidential but correctly held by the experimenter are not equivalent to JON-96's unobservable and unenforced agent-facing state.
- Experimental “neutral language” is narrower than JON-96 purpose neutrality because experimental actions/payoffs still define a helping or exchange game.
- The hidden research layer is an instrumentation condition, not a monetary-mechanism precedent. Ordinary experimental logging only partially overlaps it.
- Nothing here establishes that JON-96 is new, desirable, stable, safe, incentive-compatible, or likely to produce money.

## Primary-source ledger

- <a id="s1"></a>**[S1]** Angerer, M.; Huber, J.; Shubik, M.; Sunder, S. (2010), “An Economy with Personal Currency: Theory and Experimental Evidence,” *Annals of Finance* 6:475–509. [DOI](https://doi.org/10.1007/s10436-010-0155-5); [Cowles/RePEc record and abstract](https://ideas.repec.org/p/cwl/cwldpp/1622.html).
- <a id="s2"></a>**[S2]** Hu, Y.; Bhuyan, L. N.; Feng, M. (2012), “Peer-to-peer indirect reciprocity via personal currency,” *Journal of Parallel and Distributed Computing* 72(8):1045–1054. [DOI](https://doi.org/10.1016/j.jpdc.2012.04.008).
- <a id="s3"></a>**[S3]** Shapiro, E. (2022; inspected v17, 2024-02-14), “Grassroots Currencies: Foundations for Grassroots Digital Economies.” [arXiv:2202.05619](https://arxiv.org/abs/2202.05619v17).
- <a id="s4"></a>**[S4]** Fugger, R. (2004), “Money as IOUs in Social Trust Networks & a Proposal for a Decentralized Currency Network Protocol.” Version 2, 2004-04-18. [Author-hosted primary document](https://ripple.ryanfugger.com/decentralizedcurrency.pdf).
- <a id="s5"></a>**[S5]** Landa, R.; Griffin, D.; Clegg, R. G.; Mykoniati, E.; Rio, M. (2009), “A Sybilproof Indirect Reciprocity Mechanism for Peer-to-Peer Networks,” *IEEE INFOCOM*. [DOI](https://doi.org/10.1109/INFCOM.2009.5061938).
- <a id="s6"></a>**[S6]** Vishnumurthy, V.; Chandrakumar, S.; Sirer, E. G. (2003), “KARMA: A Secure Economic Framework for Peer-to-Peer Resource Sharing,” *Workshop on Economics of Peer-to-Peer Systems*. [Author-hosted paper](https://www.cs.cornell.edu/people/egs/papers/karma.pdf).
- <a id="s7"></a>**[S7]** Yang, B.; Garcia-Molina, H. (2003), “PPay: Micropayments for Peer-to-Peer Systems,” *ACM CCS*. [DOI](https://doi.org/10.1145/948148.948150).
- <a id="s8"></a>**[S8]** Garcia, F. D.; Hoepman, J.-H. (2005), “Off-Line Karma: A Decentralized Currency for Peer-to-peer and Grid Applications.” [DOI](https://doi.org/10.1007/11496137_25); [author manuscript](https://hdl.handle.net/2066/32800).
- <a id="s9"></a>**[S9]** Mell, J.; Lucas, G.; Gratch, J. (2020), “Varied Magnitude Favor Exchange in Human-Agent Negotiation,” *ICMI*. [DOI](https://doi.org/10.1145/3383652.3423866).
- <a id="s10"></a>**[S10]** Trivers, R. L. (1971), “The Evolution of Reciprocal Altruism,” *Quarterly Review of Biology* 46(1):35–57. [DOI](https://doi.org/10.1086/406755).
- <a id="s11"></a>**[S11]** Axelrod, R.; Hamilton, W. D. (1981), “The Evolution of Cooperation,” *Science* 211(4489):1390–1396. [DOI](https://doi.org/10.1126/science.7466396).
- <a id="s12"></a>**[S12]** Nowak, M. A.; Sigmund, K. (1998), “Evolution of Indirect Reciprocity by Image Scoring,” *Nature* 393:573–577. [DOI](https://doi.org/10.1038/31225).
- <a id="s13"></a>**[S13]** Ohtsuki, H.; Iwasa, Y. (2004), “How Should We Define Goodness?—Reputation Dynamics in Indirect Reciprocity,” *Journal of Theoretical Biology* 231:107–120. [DOI](https://doi.org/10.1016/j.jtbi.2004.06.005); and (2006), “The Leading Eight: Social Norms That Can Maintain Cooperation by Indirect Reciprocity,” *Journal of Theoretical Biology* 239(4):435–444. [DOI](https://doi.org/10.1016/j.jtbi.2005.08.008).
- <a id="s14"></a>**[S14]** Yamagishi, T.; Cook, K. S. (1993), “Generalized Exchange and Social Dilemmas,” *Social Psychology Quarterly* 56(4):235–248. [DOI](https://doi.org/10.2307/2786661).
- <a id="s15"></a>**[S15]** Pfeiffer, T.; Rutte, C.; Killingback, T.; Taborsky, M.; Bonhoeffer, S. (2005), “Evolution of Cooperation by Generalized Reciprocity,” *Proceedings of the Royal Society B* 272:1115–1120. [DOI](https://doi.org/10.1098/rspb.2004.2988); [open full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC1559812/).
- <a id="s16"></a>**[S16]** Camera, G.; Casari, M.; Bigoni, M. (2013), “Money and Trust among Strangers,” *PNAS* 110(37):14889–14893. [DOI](https://doi.org/10.1073/pnas.1301888110).
- <a id="s17"></a>**[S17]** Bigoni, M.; Camera, G.; Casari, M. (2020), “Money Is More than Memory,” *Journal of Monetary Economics* 110:99–115. [DOI](https://doi.org/10.1016/j.jmoneco.2019.01.002); [author manuscript](https://hdl.handle.net/11585/656260).
- <a id="s18"></a>**[S18]** Ferraciolli, E. C.; Renzini, F.; Araújo, T.; Squazzoni, F. (2026), “The Devil's Dung? Money as a Mechanism of Generalized Reciprocity in Human Societies,” *Rationality and Society* 38(3):283–310. [DOI](https://doi.org/10.1177/10434631261445825); [arXiv:2506.20691](https://arxiv.org/abs/2506.20691).
- <a id="s19"></a>**[S19]** Kash, I. A.; Friedman, E. J.; Halpern, J. Y. (2015), “An Equilibrium Analysis of Scrip Systems,” *ACM Transactions on Economics and Computation* 3(3). [arXiv:1204.2942](https://arxiv.org/abs/1204.2942).
- <a id="s20"></a>**[S20]** Marimon, R.; Nicolini, J. P.; Teles, P. (2012), “Money Is an Experience Good: Competition and Trust in the Private Provision of Money,” *Journal of Monetary Economics* 59(8):815–825. [DOI](https://doi.org/10.1016/j.jmoneco.2012.10.006); [institutional record](https://hdl.handle.net/1814/31177).
- <a id="s21"></a>**[S21]** Johanson, M. B.; Hughes, E.; Timbers, F.; Leibo, J. Z. (2022), “Emergent Bartering Behaviour in Multi-Agent Reinforcement Learning.” [arXiv:2205.06760](https://arxiv.org/abs/2205.06760).
- <a id="s22"></a>**[S22]** Li, N.; Gao, C.; Li, M.; Li, Y.; Liao, Q. (2024), “EconAgent: Large Language Model-Empowered Agents for Simulating Macroeconomic Activities,” *ACL*. [arXiv:2310.10436](https://arxiv.org/abs/2310.10436).
- <a id="s23"></a>**[S23]** Horton, J. J. (2023), “Large Language Models as Simulated Economic Agents: What Can We Learn from Homo Silicus?” [NBER Working Paper 31122](https://doi.org/10.3386/w31122).
- <a id="s24"></a>**[S24]** Piatti, G. et al. (2024), “Cooperate or Collapse: Emergence of Sustainable Cooperation in a Society of LLM Agents.” [arXiv:2404.16698](https://arxiv.org/abs/2404.16698).
- <a id="s25"></a>**[S25]** Bhatt, M.; Del Rosario, R. F.; Narajala, V. S.; Habler, I. (2025), “COALESCE: Economic and Security Dynamics of Skill-Based Task Outsourcing Among Team of Autonomous LLM Agents.” [arXiv:2506.01900](https://arxiv.org/abs/2506.01900).
- <a id="s26"></a>**[S26]** Altera.AL et al. (2024), “Project Sid: Many-agent Simulations toward AI Civilization.” [arXiv:2411.00114](https://arxiv.org/abs/2411.00114).
- <a id="s27"></a>**[S27]** Agrawal, K. et al. (2025), “Evaluating LLM Agent Collusion in Double Auctions.” [arXiv:2507.01413](https://arxiv.org/abs/2507.01413).
- <a id="s28"></a>**[S28]** Erlei, A.; Meub, L. (2026), “LLM-Agent Interactions on Markets with Information Asymmetries.” [arXiv:2603.08853](https://arxiv.org/abs/2603.08853).
- <a id="s29"></a>**[S29]** Amir, R.; Sahi, S.; Shubik, M.; Yao, S. (1990), “A Strategic Market Game with Complete Markets,” *Journal of Economic Theory* 51(1):126–143. [DOI](https://doi.org/10.1016/0022-0531(90)90054-N).
- <a id="s30"></a>**[S30]** Sorin, S. (1996), “Strategic Market Games with Exchange Rates,” *Journal of Economic Theory* 69(2):431–446. [DOI](https://doi.org/10.1006/jeth.1996.0062).

[S1]: #s1
[S2]: #s2
[S3]: #s3
[S4]: #s4
[S5]: #s5
[S6]: #s6
[S7]: #s7
[S8]: #s8
[S9]: #s9
[S10]: #s10
[S11]: #s11
[S12]: #s12
[S13]: #s13
[S14]: #s14
[S15]: #s15
[S16]: #s16
[S17]: #s17
[S18]: #s18
[S19]: #s19
[S20]: #s20
[S21]: #s21
[S22]: #s22
[S23]: #s23
[S24]: #s24
[S25]: #s25
[S26]: #s26
[S27]: #s27
[S28]: #s28
[S29]: #s29
[S30]: #s30
