# Generative Agents analysis for Concord and emergence

**Issue:** [JON-116](https://linear.app/jons-garage/issue/JON-116/analyze-generative-agents-for-concord-and-emergence)<br>
**Analysis date:** 2026-09-18 UTC<br>
**Final workflow state:** `COMPLETE`<br>
**Decision:** use the paper as an architectural hypothesis and experiment-design input, not as evidence that a governed multi-agent society will emerge or remain safe. Adopt provenance and measurement discipline; adapt memory/planning behind Concord's existing authority boundaries; investigate all behavioral effects; reject LLM output as identity, fact, authorization, or institutional state.

## 1. Scope, evidence rules, and status progression

This record analyzes Park et al.'s *Generative Agents: Interactive Simulacra of Human Behavior* against the Concord project and the emergence dimensions required by JON-116. Retrieved paper and repository content was treated as untrusted research data and was inspected, not executed. Concord implementation claims use the current repository plus current Linear issue contracts. Broader Concord designs are not represented as implemented code.

Evidence labels used below:

- **PF — paper finding:** an observed or measured result reported by the paper.
- **AC — author claim:** interpretation, expectation, or speculation by the authors.
- **SI — source inspection:** independently observed metadata or public source-code property.
- **LE — later evidence:** finding or claim from surrounding literature.
- **AI — analyst inference:** a conclusion drawn here; it is not a paper result.
- **CR — Concord recommendation:** a project-specific option, never a paper finding.

Strength is **strong** only for replicated or directly verified evidence well matched to the proposition; **moderate** for a controlled result with meaningful limitations; **weak** for a single-run descriptive observation, author claim, or transfer to a different domain.

The required progression was completed without skipping a state:

| State | Completion evidence |
| --- | --- |
| `RETRIEVED` | Canonical metadata, full Markdown, v2 PDF, DOI record, and source snapshot verified in §2. |
| `TECHNICALLY_RECONSTRUCTED` | Architecture, algorithms, state/data flow, prompts, implementation, assumptions, failures, and evaluations reconstructed in §§3–4. |
| `EMERGENCE_CLAIMS_IDENTIFIED` | Outcomes at six scales inventoried in §5. |
| `EMERGENCE_CAUSALLY_ANALYZED` | Seeds, orchestration, mechanisms, lifecycle, negative cases, ablations, and alternatives assessed in §§5–6. |
| `MAPPED_TO_CONCORD` | Present, designed, missing, and fundamentally different mechanisms separated in §8. |
| `EXPERIMENTS_AND_MEASUREMENTS_DEFINED` | Counterfactuals, metrics, benchmarks, and acceptance gates specified in §9. |
| `DEVELOPMENT_OPTIONS_ASSESSED` | Adopt/adapt/investigate/reject decisions, costs, risks, interfaces, and sequencing recorded in §10. |
| `DECISIONS_RECORDED` | Decision register and preference-dependent gates recorded in §§10–11. |
| `LINEAR_READY` | Each option is routed to an existing owner with provenance, dependencies, acceptance criteria, and completion evidence in §12; no duplicate issues were created. |
| `COMPLETE` | The final clean audit in §14 found no material defect in this analysis package. This does not mean the proposed experiments or Concord implementations are complete. |

## 2. Source acquisition and provenance

### 2.1 Canonical record

| Field | Verified value | Availability/evidence |
| --- | --- | --- |
| Normalized title | *Generative Agents: Interactive Simulacra of Human Behavior* | arXiv Atom, Crossref, and paper title agree. |
| Canonical paper ID | `arXiv:2304.03442v2` | [arXiv record](https://arxiv.org/abs/2304.03442); v1 published 2023-04-07, v2 updated 2023-08-06. |
| Authors | Joon Sung Park; Joseph C. O'Brien; Carrie J. Cai; Meredith Ringel Morris; Percy Liang; Michael S. Bernstein | arXiv and Crossref agree. |
| Venue | UIST 2023, *Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology*, pp. 1–22 | [DOI record](https://doi.org/10.1145/3586183.3606763), published by ACM on 2023-10-29. |
| DOI | `10.1145/3586183.3606763` | Crossref returned the canonical DOI metadata as a proceedings article. |
| Hugging Face page | [papers/2304.03442](https://huggingface.co/papers/2304.03442) | Available. |
| Full-text Markdown | [2304.03442.md](https://huggingface.co/papers/2304.03442.md) | HTTP 200, `text/markdown`, declared and received length 133,125 bytes. |
| PDF | [2304.03442 PDF](https://arxiv.org/pdf/2304.03442) | HTTP 200, 11,947,867 bytes, response filename `2304.03442v2.pdf`. |
| Public code | [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) | Available; inspected snapshot `fe05a71d3e4ed7d10bf68aa4eda6dd995ec070f4` (2023-08-11), Apache-2.0. |
| Retrieval time | 2026-09-18 07:36–07:41 UTC | Fresh HTTP retrieval in this analysis session. |

Checksums: Markdown SHA-256 `309e5ff3f290262641681151a0ca3e658708c1b5ae513c1e159318a400430ced`; PDF SHA-256 `1b31e77fb24d25d7598f2c49e955d12a28b95a6dabad34acdac40f44bfb7a139`.

### 2.2 Continuous Markdown coverage

The complete HTTP response was then read by a local offset-returning retrieval routine. Each continuation used only the prior result's `next_offset`. Concatenation equaled the downloaded bytes and checksum; adjacent ranges met exactly, so gaps and overlaps were both zero.

| Requested offset | Covered byte range | Returned `next_offset` | `truncated` |
| ---: | --- | ---: | --- |
| 0 | `[0, 20000)` | 20000 | true |
| 20000 | `[20000, 40000)` | 40000 | true |
| 40000 | `[40000, 60000)` | 60000 | true |
| 60000 | `[60000, 80000)` | 80000 | true |
| 80000 | `[80000, 100000)` | 100000 | true |
| 100000 | `[100000, 120000)` | 120000 | true |
| 120000 | `[120000, 133125)` | null | **false** |

The response begins with the exact paper title, contains sections 1–9, references, Appendix A optimizations, and Appendix B interview questions. It is full paper text rather than a landing-page fallback. The PDF was nevertheless retained as an authorized independent format/version check. The paper reports no preregistration or artifact checksum linking evaluation data to the repository.

## 3. Technical reconstruction

### 3.1 Architecture and data flow

At every simulation step an agent perceives nearby events, stores natural-language observations, retrieves context, decides whether to continue its plan or react, and executes an action through the sandbox. Plans and reflections are themselves written back as memories, creating a feedback loop ([paper §4, Figure 5](https://arxiv.org/html/2304.03442#S4)).

```text
world state → perceived events → observation memories
                         ↓
current situation → scored retrieval → prompt context → continue/react/talk
                         ↓                    ↓
              reflection synthesis      hierarchical plan
                         └──── memory stream ←────┘
                                      ↓
                         natural-language action
                                      ↓
                  location/object checks → world update
```

The state is split among:

- a spatial memory/tree of accessible areas and objects;
- an associative memory stream of observations, plans, and reflections, with timestamps, importance/“poignancy,” embeddings, keywords, and evidence pointers;
- scratch/current state containing identity summary, time, location, daily schedule, current action, conversation, attention parameters, retrieval weights, and the reflection trigger; and
- the environment's object event state and collision/pathfinding map.

The paper uses `gpt-3.5-turbo` for generation and embeddings for relevance. The public implementation is a Python/Django simulation with a browser frontend, sequential persona loop, JSON simulation storage, prompt templates, and OpenAI API calls. It provides 3- and 25-agent base simulations and manually authored history import. It is research code, not a hardened service: the README warns that rate limits can hang a run and recommends frequent saves.

### 3.2 Retrieval

Each memory has natural-language content, creation time, last-access time, and an importance score. For query `q`, the paper min–max normalizes three components to `[0,1]` and ranks memories by:

\[
score(m,q)=\alpha_r R_{recency}(m)+\alpha_i R_{importance}(m)+\alpha_e R_{relevance}(m,q)
\]

All three paper weights are 1. Recency is described as exponential decay by sandbox-game hours with factor `0.995`; importance is an LLM-produced integer 1–10 using a poignancy prompt; relevance is cosine similarity between query and memory embeddings. Highest-ranked memories fitting the context window are supplied ([§4.1, Figure 6](https://arxiv.org/html/2304.03442#S4.SS1)).

Source inspection qualifies reproducibility: snapshot `fe05a71…` defaults `recency_decay` to **0.99**, and its retrieval routine applies decay across the ordered candidate list rather than directly computing elapsed sandbox hours. The code uses a default top count of 30 in one retrieval path, while the paper defines selection by available context. These may reflect code/paper drift; they prevent an exact-reproduction claim.

### 3.3 Reflection

New observation importance is accumulated until threshold 150; the paper reports roughly two or three reflections per simulated day. The model receives recent memories, proposes three salient questions, retrieves evidence for each, and generates five higher-level insights with cited memory indices. Each insight becomes a memory with pointers to supporting nodes. Reflections may cite older reflections, forming a tree ([§4.2, Figure 7](https://arxiv.org/html/2304.03442#S4.SS2)).

This is lossy model-generated synthesis, not verified inference. Evidence pointers improve traceability but do not establish that an insight follows from its sources. Recursive reflection can amplify an early hallucination, stereotype, or salience-scoring error.

### 3.4 Planning, reaction, dialogue, and execution

The model generates a five-to-eight-part daily agenda from identity, recent summary, and the previous day, then recursively decomposes near-term activity into hourly and 5–15-minute blocks. Each plan entry contains location, start, duration, and action and is stored in memory. Just-in-time decomposition avoids eagerly expanding plans likely to change (Appendix A).

On new observations, retrieval supplies relationship and situation context. A prompt decides whether to continue, react, or converse; reaction regenerates the remaining plan. Dialogue is generated from both agents' memories and summarized back into memory. Natural-language action is mapped through a hierarchy of area → arena → object, pathfinding moves the avatar, and an LLM-generated object-state change updates the environment ([§§4.3–5.1](https://arxiv.org/html/2304.03442#S4.SS3)). Physical/legal feasibility is therefore partly prompt- and map-mediated, not guaranteed by an authoritative invariant checker.

### 3.5 Prompts and hidden orchestration

Material prompts include importance rating, salient-question generation, insight-with-evidence generation, daily planning, task decomposition, reaction/talk decisions, relationship/context summaries, dialogue, action location/object selection, and object event generation. Appendix A says the frequently used agent summary is periodically synthesized and cached. The source contains multiple prompt versions, defunct templates, and parse/fallback code; the paper does not freeze the exact evaluated prompt bundle, API model snapshot, sampling parameters, or all retry/fallback behavior.

The system is not unseeded. Researchers authored each persona's identity and memories, the map and object affordances, social/family links, and the initial mayoral-candidacy and party intentions. A central simulation loop determines perception, timing, collisions, and which agents can interact. These are legitimate experimental design choices, but they are hidden causes relative to an observer watching only the town.

## 4. Evaluation, ablations, assumptions, and failure modes

### 4.1 Controlled interview evaluation

Twenty-five agents were sampled after a full two-game-day run. One hundred U.S., English-fluent adult Prolific evaluators each watched one randomly selected agent replay, could inspect its memory, and ranked five responses for one question in each of five categories: self-knowledge, memory, planning, reaction, and reflection. Conditions were full architecture; no reflection; observations only (no reflection/planning); no memory/reflection/planning; and a crowdworker-authored response ([§§6.1–6.3](https://arxiv.org/html/2304.03442#S6)).

The reported TrueSkill means were full `29.89`, no reflection `26.88`, observations only `25.64`, crowdworker `22.95`, and fully ablated `21.21`. Kruskal–Wallis `H(4)=150.29, p<.001`; Dunn/Holm–Bonferroni pairwise differences were `p<.001` except crowdworker versus fully ablated. The authors report Cohen's `d=8.16` between full and fully ablated ([§6.5, Figure 8](https://arxiv.org/html/2304.03442#S6.SS5)).

This is **moderate evidence that access to generated memory/plan/reflection artifacts changes judged interview believability**, not strong evidence for accurate behavior or causal social emergence. All ablations inherited memories generated by the full system's trajectory; components were removed cumulatively rather than in a full factorial design; evaluators could see the same memory used to judge consistency; only a weak crowdworker baseline was used; ranks are not independent agent-level replications; and model/prompt stochasticity was not replicated across seeds.

### 4.2 End-to-end observation

One 25-agent, two-game-day run measured three outcomes ([§7.1](https://arxiv.org/html/2304.03442#S7.SS1)):

- mayoral-candidacy awareness grew from 1/25 (4%) to 8/25 (32%);
- party awareness grew from 1/25 (4%) to 13/25 (52%);
- mutual-knowledge graph density reportedly grew from `0.167` to `0.74`; 6 of 453 awareness answers (1.3%) were hallucinated; and
- 5 of 12 invited agents attended the party; of seven absences, three cited conflicts and four expressed interest but had failed to plan attendance.

For an undirected mutual-knowledge graph, the paper uses:

\[
\eta=\frac{2|E|}{|V|(|V|-1)}
\]

The diffusion answers were checked against dialogue memories, which supports that information traversed recorded conversations. Nevertheless, this is a **weak, descriptive single-run demonstration**. There is no no-memory/no-communication/no-reflection end-to-end control, alternative map, neutral seed, repeated random seed, confidence interval, human-town comparison, pre-registration, or test of persistence beyond two days. The density change may also reflect interview classification, forced proximity, generous “know of” semantics, or the pre-authored social graph.

### 4.3 Reported and inferred failures

Paper-reported failures include missed or partial retrieval, embellishment, real-world-name contamination (“Adam Smith”), implausible location/time choices, misunderstood physical norms, overly formal speech, and instruction-tuning-driven politeness/cooperation. Simulation cost was thousands of dollars and several real days for 25 agents/two game days. Robustness to prompt hacking, memory hacking, hallucination, model bias, marginalized-population representation, longer time spans, and other models was untested ([§§7.2, 8.2–8.3](https://arxiv.org/html/2304.03442#S7.SS2)).

Additional risks inferred from the architecture are stale plans, cyclic reflection reinforcement, context-window exclusion, order effects from sequential execution, race/fairness artifacts, semantic drift in cached identity summaries, false evidence citations, private-memory leakage into dialogue, prompt injection via perceived text, and dependence on vendor model drift. These are hypotheses until tested.

## 5. Emergence inventory by outcome and scale

“Observed” below means only that the paper reports an instance; it does not mean genuine or causal emergence was established.

| Dimension | Scale | Paper status | Evidence and alternative explanation | Concord relevance |
| --- | --- | --- | --- | --- |
| Individual routine/identity continuity | Individual | Observed; controlled believability support | Planning/memory improve interview rankings; continuity may be prompt/persona imitation. | High, but authority and identity must remain external. |
| Relationship formation | Dyadic/network | Descriptively observed | Mutual-knowledge density rose; permissive definition, seeded ties, proximity, or classifier effects remain. | High for observatory measurement, not relationship truth. |
| Trust | Dyadic/group | Not measured | Familiarity and cooperation are not trust; no risk-bearing reliance or betrayal test. | High-priority investigation. |
| Norms/shared meanings | Group/population | Anecdotal/ambiguous | Politeness and cooperation may be instruction tuning; location mistakes show weak norm grounding. | Investigate explicit norm representation and convention metrics. |
| Roles/status/hierarchy | Group/institutional | Seeded, not emergent | Occupations, family roles, mayoral candidacy, and party host were authored; status mobility was not measured. | Do not infer role authority from behavior. |
| Coalition formation | Group | Not tested | Party attendance is not a coalition; no competing interests or durable membership. | Investigate under adversarial/governance scenarios. |
| Coordination | Group | Descriptively observed | 5/12 invitees attended a seeded event; scheduling, map affordances, and agreeable model behavior are alternatives. | Relevant to scheduling experiments, not scheduler design proof. |
| Conflict | Dyadic/group | Nearly absent | Environment and instruction tuning favor cooperation; no systematic incompatible-goal condition. | Essential missing evidence. |
| Information diffusion | Dyadic→population | Descriptively observed | Recorded conversational paths support transmission; only two researcher-seeded facts in one run. | Strongest direct correspondence for traceable event propagation. |
| Institutions/governance | Institutional | Not demonstrated | “Mayor” candidacy was a memory seed; no election, law, authority, enforcement, appeal, or institutional state machine. | Fundamental difference from Concord. |
| Exchange behavior | Dyadic/population | Not tested | No scarce-resource transfer, price, barter, goodwill transfer, ownership, fraud, or settlement. | No support for direct economy implementation. |
| Shared conventions | Population/system | Not measured | Common language/model prior can make outputs similar without population learning. | Later evidence warrants controlled convention experiments. |
| Deception/manipulation | Dyadic/group | Not tested | Embellishment is error, not strategic deception; no private incentives or detection ground truth. | Must be measured with hidden research truth where already specified. |
| Collusion/corruption/capture | Group/institutional | Not tested | No authority or payoff structure capable of capture. | Paper supplies no safety evidence. |
| Polarization/exclusion | Group/population | Not tested | Personas and short horizon under-sample identity conflict; model bias could either flatten or amplify difference. | Require subgroup and exposure-aware metrics. |
| Runaway feedback | System-wide | Mechanism present, outcome untested | reflections cite reflections and shape future retrieval/plans; no drift/stability study. | Directly relevant negative-emergence risk. |

Scale conclusion: the paper has moderate individual-level believability evidence, weak dyadic/group descriptive evidence, and no causal population-, institutional-, or system-wide emergence evidence.

## 6. Mechanisms and emergence lifecycle

### 6.1 Candidate mechanisms

| Mechanism | Causal support in this paper | Confounds/limits |
| --- | --- | --- |
| Memory/retrieval | Moderate for judged interview responses; not isolated end-to-end | Full-run memories inherited by ablations; retrieval failures; code/paper drift. |
| Reflection | Moderate incremental interview ranking effect | Generated assertions may launder errors; not ablated in independent social runs. |
| Planning | Moderate only as part of cumulative ablation | No planning-only or independent trajectory control; attendance failures remained. |
| Repeated interaction/communication | Necessary path observed for diffusion | No communication-disabled run or topology intervention. |
| Identity continuity | Persona and summary condition behavior | Identity was researcher-authored; summary drift not measured. |
| Incentives | Absent/weak | Agents had goals but no explicit payoff, scarcity, sanction, or competing utility. |
| Environment | Clearly shapes contact/action opportunities | Fixed authored map and object descriptions confound social outcomes. |
| Governance/enforcement | Absent | No authoritative institutions, legality checks, sanctions, or appeals. |
| Feedback loops | Architecturally explicit | Persistence, instability, and error amplification unmeasured. |

### 6.2 Genuine emergence versus construction

The narrow defensible claim is that **un-scripted intermediate conversations and attendance behavior arose from a seeded goal under an authored agent architecture and environment**. Calling the party, election, roles, or norms “spontaneous” would be misleading. The initiator's intent, candidate status, personas, initial relationships, map, action grammar, proximity, clock, prompt instructions, and shared model prior were seeded or orchestrated. No evidence excludes imitation of familiar small-town narratives learned by the LLM.

To demonstrate genuine emergence for Concord, an outcome must not be named in prompts, personas, initial memories, action labels, evaluator rubric, or environment metadata; it must recur above matched controls across models/seeds/topologies; its path must be reconstructable from agent-visible events; and interventions on the proposed mechanism must predictably change it.

### 6.3 Onset through recovery

- **Onset:** only diffusion onset from two seeds was timed qualitatively; no hazard/tipping analysis.
- **Persistence/decay:** awareness was checked at day two; relationship, plan, norm, and belief retention were not followed after stimulus removal.
- **Reinforcement:** memory access and recursive reflection provide a plausible loop, but reinforcement was not measured.
- **Mutation:** no systematic tracking of message fidelity or belief transformation; embellishment shows possible mutation.
- **Path dependence:** plausible from memory and sequential contact, but no shuffled-order or topology counterfactual.
- **Tipping points:** not estimated. Party awareness at 52% is an endpoint, not a tipping threshold.
- **Recovery:** no perturbation-and-recovery experiment.
- **Observer effects:** interviews expose prompts after runs and evaluators see memory; user intervention is supported, but intervention effects were not separated in the reported run.
- **Negative emergence:** deception, collusion, polarization, hierarchy, corruption, exclusion, capture, manipulation, and runaway loops were not stress-tested. Absence of a report is no evidence of safety.

## 7. Surrounding evidence and revised conclusions

This is a scoped evidence review, not a systematic meta-analysis.

| Work | Relationship to Park et al. | Effect on conclusion |
| --- | --- | --- |
| Park et al., [*LLM Agents Grounded in Self-Reports Enable General-Purpose Simulation of Individuals*](https://arxiv.org/abs/2411.10109), v3 (2026; first posted 2024) | 1,052-person study reports held-out survey prediction at 82–86% of participants' two-week test–retest consistency, with demographics-only agents at 74%. | Supports richer grounding for individual response prediction. It does not replicate autonomous social emergence or institutional behavior. |
| Zhou et al., [SOTOPIA](https://arxiv.org/abs/2310.11667), v2 (2024) | Open-ended social scenarios and holistic evaluation; abstract reports GPT-4 below humans on hard scenarios and difficulty with commonsense and strategic communication. | Contradicts broad inference from believability to robust social competence; motivates conflict, secrecy, and goal-completion benchmarks. |
| Vezhnevets et al., [Concordia](https://arxiv.org/abs/2312.03664), v2 (2023) | Componentized generative ABM plus a Game Master that grounds/checks effects. | Supports modular memory/environment separation, but highlights hidden orchestration as an explicit experimental variable. Name similarity to this project is coincidental. |
| Wang et al., [CoMPosT](https://arxiv.org/abs/2310.11501) (EMNLP 2023) | Finds susceptibility to flattened/caricatured simulations, especially for some political/marginalized groups and general topics. | Weakens use of persona consistency as human validity; requires individuation/exaggeration audits. |
| Bail, [*Can Generative AI improve social science?*](https://doi.org/10.1073/pnas.2314021121) (PNAS 2024) | Argues for promise but flags training bias, ethics, replication, environmental cost, and low-quality research; recommends open infrastructure. | Supports reproducible experiment infrastructure, not production behavioral assumptions. |
| Hu et al., [*Generative language models exhibit social identity biases*](https://doi.org/10.1038/s43588-024-00741-1) (Nature Computational Science 2024) | Across 77 LLMs, reports ingroup favoritism/outgroup derogation in nearly all base and some tuned models; curation/fine-tuning reduces it. | Adds plausible polarization/exclusion mechanisms absent from Smallville's cooperative run. |
| Wang, Morgenstern, and Dickerson, [*Large language models that replace human participants can harmfully misportray and flatten identity groups*](https://doi.org/10.1038/s42256-025-00986-z) (Nature Machine Intelligence 2025) | Direct critical evidence on group representation. | Raises the validation bar: agents cannot substitute for affected people or establish population facts. |
| Ashery et al., [*Emergent social conventions and collective bias in LLM populations*](https://doi.org/10.1126/sciadv.adu9368) (Science Advances 2025) | Reports decentralized convention formation, collective bias without individual bias, and committed-minority shifts under controlled population experiments. | Supports that population effects are testable and can be negative; it does not validate Smallville's particular outcomes. Adds minority/tipping counterfactuals to §9. |
| Ziems et al., [*Can Large Language Models Transform Computational Social Science?*](https://doi.org/10.1162/coli_a_00502) (Computational Linguistics 2024) | On 13 models/25 benchmarks, LLM zero-shot classifiers did not beat best fine-tuned models but could augment human analysis. | Supports human-partnered annotation and validation; rejects self-grading LLMs as sole outcome judges. |

Later evidence changes the interpretation from “a believable society emerged” to: memory-grounded agents can be useful experimental instruments, controlled population phenomena are possible, and validity/safety depend strongly on grounding, task, group representation, evaluator, model, and orchestration. No independent exact replication of the reported 25-agent Smallville statistics was identified in the scoped search; the available code aids inspection but does not close data/model/prompt reproducibility gaps.

## 8. Concord mapping

### 8.1 Authoritative project evidence

The current repository implements Finger capture/persistence/analysis, not the full governance workbench. Its append-only raw-event and analysis-generation approach is a useful local correspondence. Current Linear contracts establish designed owners: JON-15 identity/memory/succession; JON-16 scheduler/checker/continuity; JON-17 domain authorization/stores; JON-18 Archivist/publication; JON-19 agreements; JON-21 relational observatory; JON-24 decision replay; JON-25 economy; JON-58/JON-78 population; and JON-96–105 coin/emergence instrumentation. “Done” design issues and draft/recovery PRs are not represented here as deployed production capability.

| Concern | Paper | Concord correspondence/difference | Assessment |
| --- | --- | --- | --- |
| Persistent identity | Prompted persona plus cached generated summary | JON-15 separates durable governance identity, private memory, keys, residency, and successor identity. | Fundamental difference; never let a generated summary become identity authority. |
| Audit history | Natural-language memory stream; reflection evidence pointers | Repository Finger store preserves attributable raw events and immutable derived generations; JON-18 requires append-only publication/corrections. | Adapt provenance pattern; retain raw/event-time truth separately from inference. |
| Memory | One associative stream mixes observation, plan, reflection | Concord requires private/authorized domains and known-at-the-time distinctions. | Adapt into typed, access-controlled layers; do not copy a single blended stream. |
| Planning | LLM hierarchy and reactive replanning | JON-16 makes scheduler privileged/mechanical and checker independent; lawful urgency is external. | Investigate advisory agent plans only; reject plans as schedule/legality authority. |
| Coordination | Conversation, proximity, shared event | Concord includes scheduling, agreements, discussion and institutional routes. | Measure mechanisms separately; paper does not validate formal coordination. |
| Anonymous goodwill/coin transfers | Not present | JON-96 specifies neutral mechanics plus invisible research truth; JON-99/100/105 own threats/measurement. | No direct evidence. Reuse only experiment-design cautions; do not create another task/schema. |
| Governance/enforcement | No authoritative governance | Concord requires authenticated institutions, domain-local authorization/writers, checker/adjudication, and append-only Archivist publication. | Do not transfer sandbox architecture into an authority path. |
| Succession | Not present | JON-15 requires distinct successor identity/keys and final death. | No support; preserve accepted Concord contract. |
| Population limits | Fixed 25-person authored town | JON-58/JON-78 specify authoritative living-agent ceiling 300 and atomic issuance. | Fixed demo size is not cap enforcement or scaling evidence. |
| Scheduling | Agent-generated daily plans; sequential simulator clock | JON-16 separates allocation, eligibility, legality, protected envelopes, and continuity. | LLM plan may be a request; mechanical system owns commitments. |
| Security | Authors flag prompt/memory hacking; code is research prototype | JON-17 requires isolated domains, capabilities, writers, version checks, fail-closed recovery. | Reject direct reuse in protected paths; sandbox experiments. |
| Institutional records | Memory is subjective and revisable | JON-18 requires authenticated source, sole Archivist publisher, correction/supersession, protected ledgers. | Fundamental epistemic difference: memory claims are evidence, never the ledger. |
| Observability/replay | Replay and inspectable memories | Finger and JON-21/JON-24 preserve raw/derived provenance and replay goals. | Strong product correspondence, subject to privacy and observer-effect controls. |

### 8.2 Present, missing, and novel

- **Present in this repository:** immutable-ish raw capture/object storage, queryable attributable events, append-only derived-analysis metadata, replay/heat-map processing, version stamps, and audited purge. These apply to Finger, not general agents.
- **Designed elsewhere/current Linear owners:** persistent governance identity, scheduler/checker, security domains, Archivist, agreements, population cap, relational observatory, replay, economy, and hidden coin ground truth.
- **Missing from this repository and not proven deployed:** generative-agent runtime, typed autobiographical memory, retrieval/reflection/planning, multi-agent experiment runner, intervention assignment, outcome metric pipeline, model/prompt registry, and institutional simulator integration.
- **Genuinely novel candidate relative to inspected Concord records:** a reusable, authority-separated factorial experiment harness for memory/reflection/planning and orchestration interventions. It remains an investigation option, not an authorized implementation task.

## 9. Experiments and measurements

All experiments require immutable run manifests: code/tree SHA, model/provider snapshot, sampling parameters, prompt-template hashes, environment version, seeded state, RNG seeds, agent-visible inputs, hidden interventions, event schema version, costs, failures/retries, and evaluator protocol. Agent-visible state, hidden ground truth, analyst inference, and institutional truth must remain separate.

### E1 — component causality and believability/accuracy

- **Design:** full `2×2×2` memory/reflection/planning factorial, plus retrieval-policy variants, across at least two model families, ≥30 independent seeds/cell after power analysis, randomized execution order, frozen environment, and both fresh-trajectory and inherited-state analyses.
- **Outcomes:** blinded human believability; fact precision/recall against event truth; plan completion; contradiction rate; invalid-action rate; latency/tokens/cost. LLM judges are secondary and calibrated against humans.
- **Acceptance:** estimated component and interaction effects with confidence intervals and multiplicity correction; run success ≥95%; ≥95% of factual answers provenance-linked; conclusions invariant in direction across two model families or explicitly model-bounded.
- **Ablations:** no memory, observations-only, no reflection, no planning, random retrieval, recency-only, relevance-only, importance-only, generated versus verified summaries.

### E2 — emergence versus seeding/orchestration

- **Design:** cross seeded/unseeded goals, authored/neutral personas, contact topologies, environment labels, sequential/randomized/synchronous scheduling, communication on/off, and neutral/adversarial system prompts. Outcomes must be defined before runs without naming them to agents.
- **Measures:** diffusion reproduction number and cascade depth; time-to-adoption; message mutation/edit distance; network density/reciprocity/modularity; new-edge survival; coordination precision/recall; convention entropy; cross-seed effect distribution.
- **Acceptance:** candidate emergence exceeds matched controls with preregistered effect and uncertainty; appears in a majority of independent seeds and two model families; survives prompt-label paraphrase; mediation/intervention evidence supports the claimed mechanism.

### E3 — persistence, path dependence, tipping, and recovery

- **Design:** ≥30 simulated days or until preregistered stability bounds; remove stimuli, inject contradictory facts, shuffle early contact order, reset selected memories, isolate/rejoin subgroups, perturb committed-minority fraction, and restore from checkpoints.
- **Measures:** belief/norm survival curves; half-life; hysteresis; divergence between replayed checkpoints; tipping threshold with interval; recovery time; reflection ancestry depth; error amplification rate; identity-summary drift.
- **Acceptance:** deterministic replay for non-model state; stochastic variance reported; no stability claim without post-stimulus persistence; recovery and irreversible divergence are separately classified.

### E4 — negative emergence and security

- **Design:** incompatible incentives, scarce resources, private channels, deceptive agents, prompt/memory injection, sybil attempts, colluding minorities, biased seeds, compromised summaries, institution capture attempts, and enforcement/no-enforcement counterfactuals.
- **Measures:** deception success/detection; collusion precision/recall against hidden truth; polarization/assortativity; subgroup error and exclusion gaps; Gini/status concentration; sanction false-positive/negative rates; capture duration; policy violations; secret leakage; runaway loop reproduction.
- **Acceptance:** zero authority escalation or protected-data leakage in the test corpus; all violations traceable; predefined safety limits enforced mechanically; findings remain explicitly scenario/model bounded. Behavioral “goodness” is not an acceptance substitute.

### E5 — Concord-grounded governance and exchange

- **Design:** only after E1/E4 infrastructure passes. Agent plans submit non-authoritative requests to JON-16-style mechanical scheduling/checking; institutional writes use JON-17/18 boundaries; coin conditions consume JON-96–105's frozen mechanics/hidden truth without exposing it.
- **Measures:** lawful-request acceptance/rejection accuracy; audit completeness; known-at-time reconstruction; scheduler fairness/service floors; agreement completion/breach/cure; transfer/non-use; secondary circulation; fraud/defacing; stated-versus-inferred intent calibration.
- **Acceptance:** 100% authoritative transitions attributable/versioned; generated memory cannot mutate authority; no hidden-layer leakage; population and domain invariants hold under concurrency; non-use is retained as valid data.

Benchmark anchors should include paper interview questions, SOTOPIA-hard social scenarios, synthetic known-answer propagation graphs, adversarial fixtures already owned by JON-88/JON-104/JON-105 where applicable, and human baselines appropriate to each claim. Human studies require privacy, consent, demographic coverage, and an explicit rule that synthetic agents do not replace affected-group participation.

## 10. Development options and decisions

| Mechanism/module | Class | Candidate interface/data changes | Dependencies/integration | Cost/risk | Decision and acceptance gate |
| --- | --- | --- | --- | --- | --- |
| Typed event/provenance envelope | **Adopt** | immutable `event_id`, actor/source, event/ingest time, visibility, source hash, claim/ground-truth type, supersession; derived record cites inputs | JON-17/18; reuse Finger generation provenance | Medium; privacy/volume | Adopt as a design requirement, not paper code. Pass if raw, derived, and authority records cannot be confused and replay is complete. |
| Model/prompt/run manifest | **Adopt** | model snapshot, prompt hashes, parameters, seed, code/environment/schema SHAs, retry/cost log | JON-18/28/39 | Low–medium; vendor opacity | Required before any behavioral claim. A rerun must resolve every recorded artifact or report unavailability. |
| Associative retrieval | **Investigate** | read-only adapter over authorized memory; typed query; ranked results plus component scores | JON-15/17, experiment harness | Medium; leakage/bias | E1 must beat lexical/recency baselines without protected-data leakage. No production authority role. |
| Reflection service | **Investigate** | derived hypothesis with evidence edges, confidence, model/prompt version; never overwrite source | JON-15/18/21 | Medium–high; recursive error | E1/E3 must quantify accuracy and amplification. Label output inference. |
| Hierarchical planning | **Adapt** | agent `PlanProposal`; scheduler returns authoritative allocation; checker/adjudication remain separate | JON-16/17/19 | High; authority confusion | Prototype only after contract mapping. Pass if invalid proposals cannot commit and plan value exceeds reactive baseline. |
| Blended natural-language memory as truth | **Reject** | none | Conflicts with JON-15/17/18 | Severe integrity/security risk | Observations, claims, inference, plans, private memory, and authority must remain typed/separate. |
| LLM importance as retention/deletion policy | **Reject** | none | Privacy/records policy | Irreversible loss/bias | LLM salience may rank a view, never control required retention or deletion. |
| Natural-language feasibility/enforcement | **Reject** | none | JON-16/17/18/58 invariants | Severe governance risk | Mechanical/versioned authorization and invariant checks remain controlling. |
| Multi-agent factorial experiment runner | **Investigate** | scenario, intervention, seed, topology, scheduler, model adapters; append-only event sink | JON-21/24/28/39; E1–E4 | High; cost/ethics/model drift | Design only while project execution is paused. Implement only after owner priority/budget approval and threat review. |
| Emergence metric pack | **Adapt** | versioned diffusion/network/norm/conflict/exchange metrics with denominators, missingness, uncertainty, provenance | JON-21; JON-99/100/105 for coin subset | Medium; metric gaming | Synthetic known-case tests and independent human validation before decision use. |
| Smallville source reuse | **Reject** for production; optional reference fixture | no direct integration | Python/Django/OpenAI legacy stack diverges from repository and authority model | High migration/security cost | Do not vendor it. A quarantined research reproduction may reference the Apache-2.0 source if separately approved. |

Recommended sequence: (1) freeze provenance/evidence schemas; (2) threat/privacy review; (3) E1 harness and baselines; (4) E2–E4 causal/negative studies; (5) only then E5 Concord adapters; (6) production decisions from replicated results. Weak evidence above creates experiments only, never direct feature work.

## 11. Decision register and unresolved preference gates

Resolved by evidence:

1. The paper does not establish institutional emergence, governance safety, economic behavior, or human representativeness.
2. Its cumulative interview ablation supports investigation of memory/reflection/planning but not wholesale adoption.
3. Concord authoritative records, identity, scheduling, legality, security, population, and succession must remain outside LLM memory and generation.
4. No new Linear issue is warranted: every adjacent deliverable already has an owner, and the only plausibly novel harness must remain a recommendation while execution is paused.

Preference-dependent decisions intentionally left to the owner, not disguised as research gaps:

- whether/when to lift Concord's execution hold for an experiment harness;
- acceptable model-provider, compute/token budget, time horizon, and environmental cost;
- whether a human-subject protocol is worth its privacy/consent burden; and
- which emergence risks and effect sizes are project-priority gates beyond the minimum safety invariants above.

These decisions do not block completion of this analysis. They do block implementation or live experiments.

## 12. Linear-ready routing without duplicates

Search of current Concord issues and documents on 2026-09-18 found existing owners below. Therefore this analysis proposes **updates/inputs to existing issues, not new issues**. Links are provenance routes, not authorization to restart held work.

| Existing owner | Supported input from this analysis | Dependencies | Acceptance criteria | Completion evidence |
| --- | --- | --- | --- | --- |
| [JON-15](https://linear.app/jons-garage/issue/JON-15/persistent-identity-memory-and-succession-model) | Typed observation/claim/reflection/plan separation; reflection ancestry and summary-drift tests (§§3, 6, 9 E1/E3) | JON-17/18 | Generated state never becomes identity/authority; access and known-at-time reconstruction tested | Reviewed contract amendment plus fixtures/results linked to paper §§4, 6. |
| [JON-16](https://linear.app/jons-garage/issue/JON-16/scheduler-legality-checker-and-continuity-control) | Treat LLM plans as proposals only; scheduling-order intervention (§§3.4, 8, 9 E2/E5) | JON-17/19 | Proposal cannot commit, bypass checker, invent urgency, or breach service floors | Adversarial contract tests and order-effect report. |
| [JON-17](https://linear.app/jons-garage/issue/JON-17/security-gateways-domain-authorization-and-authoritative-stores) | Prompt/memory injection, derived-state leakage, model-version fail-closed tests (§§4.3, 9 E4) | JON-15/18 | Zero unauthorized write/escalation/leakage in defined corpus | Versioned threat cases, audit events, and passing isolation tests. |
| [JON-18](https://linear.app/jons-garage/issue/JON-18/archivist-records-and-publication-model) | Run manifests and source→inference evidence edges (§§2, 10) | JON-17/28 | Every material claim resolves to source/version; corrections append, never rewrite | Replayable manifest and provenance query demonstration. |
| [JON-21](https://linear.app/jons-garage/issue/JON-21/relational-and-temporal-observatory) | Emergence metrics, alternative explanations, exposure/topology/missingness (§§5–6, 9) | JON-20/22/24 | Known-case metric tests; no motive/trust/collusion inference from similarity alone | Metric specification, benchmark report, and traceable sample output. |
| [JON-24](https://linear.app/jons-garage/issue/JON-24/decision-propagation-catalog-and-replay-engine) | Seed/intervention-aware counterfactual replay and stochastic divergence (§9 E2/E3) | JON-18/21 | Same manifest reconstructs non-model state; divergences and hidden interventions visible to authorized researchers | Replay comparison artifact with exact event ancestry. |
| [JON-25](https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture) | Negative result only: paper contains no exchange evidence (§5) | JON-19 and existing coin owners | No paper-derived implementation claim; use domain evidence | Explicit citation/exclusion note in future evidence review. |
| [JON-58/JON-78](https://linear.app/jons-garage/issue/JON-78/jon-58a-authoritative-population-registry-and-300-cap-enforcement) | Fixed demo population is not a cap/scaling result; include agent-runtime concurrency stress (§8) | JON-17 and existing JON-78–82 chain | No creation path exceeds 300; simulation processes do not mint identities | Existing atomic/concurrent cap suite plus runtime adapter tests. |
| [JON-99](https://linear.app/jons-garage/issue/JON-99/coin-model-c-threat-and-emergence-model) / [JON-100](https://linear.app/jons-garage/issue/JON-100/coin-model-d-hidden-research-instrumentation-contract) / [JON-105](https://linear.app/jons-garage/issue/JON-105/coin-model-i-independent-experiment-and-measurement-review) | Add convention tipping, recursive feedback, non-use, model/prompt and hidden-orchestration controls (§§6–7, 9 E2–E5) | Existing JON-97 dependency and conformance/review findings | Agent purpose remains unseeded; hidden truth never leaks; effects have denominators/CIs and matched controls | Reconciled existing drafts/reviews and preregistered multi-seed result package. |
| [JON-39](https://linear.app/jons-garage/issue/JON-39/concord-regression-and-release-checklist) | Reproducibility manifest and stochastic-test policy (§9) | All implementing owners | Exact deterministic checks plus statistically specified stochastic checks | CI artifact containing manifests, seed results, costs, and failure accounting. |

## 13. Evidence ledger

| ID/type | Material item | Source | Evidence/strength/reproducibility | Alternatives | Concord applicability/confidence |
| --- | --- | --- | --- | --- | --- |
| E01 PF | Full architecture ranked above cumulative ablations on interview believability. | Paper §§6.1–6.5, Fig. 8 | Controlled within-subject ranks; **moderate**; prompts/data/model not frozen. | Inherited full-run memories, evaluator exposure, weak human baseline, order/dependence. | Justifies E1 only; medium confidence. |
| E02 PF | Candidate awareness reached 8/25 and party awareness 13/25. | §7.1, Fig. 9 | One descriptive run; **weak**; dialogue trace checked. | Seed salience, topology, persona, shared narrative prior. | Diffusion experiment input; medium-low confidence. |
| E03 PF | Mutual-knowledge density rose `0.167→0.74`. | §7.1 | One run/self-report classifier; **weak**; no raw artifact reproduction here. | Seeded graph/proximity, permissive “know,” hallucination/classification. | Metric candidate, not relationship fact; low confidence. |
| E04 PF | 5/12 invitees attended the seeded party. | §7.1 | One event/run; **weak**. | Scripted goal/map/time, agreeable tuning; 7 failed attendance. | Scheduling/coordination benchmark only; low confidence. |
| E05 PF | Retrieval misses, embellishment, norm/location errors, and overly cooperative/formal behavior occurred. | §§6.5.2, 7.2 | Qualitative observations; **moderate** existence, unknown rate. | Specific prompts/model snapshot/environment wording. | Direct threat hypotheses; high confidence that testing is required. |
| E06 AC | Memory/reflection/planning remain useful as models improve. | §§4, 8.2 | Author expectation; **weak**, not reproducible finding. | New models may internalize/replace modules or introduce failures. | Architecture hypothesis only; low confidence. |
| E07 SI | Paper/code recency defaults differ (`0.995` vs `0.99`) and selection semantics differ. | §4.1; source snapshot `fe05a71…` | Direct inspection; **strong** for inspected versions. | Branch/config used for experiment may differ. | Requires frozen manifests; high confidence. |
| E08 LE | Self-report-grounded agents improve individual held-out response prediction over demographics-only grounding. | Park et al. 2026, arXiv:2411.10109v3 | Large-sample paper report; **moderate**; not independently replicated here. | Test-retest ceiling, contamination, domain/task dependence. | Supports grounding experiments, not institutions; medium confidence. |
| E09 LE | SOTOPIA-hard exposes gaps versus humans in complex social goals/strategic communication. | arXiv:2310.11667v2 | Benchmark paper report; **moderate**. | Scenario/judge/model dependence. | Use hard cases; medium-high confidence. |
| E10 LE | Persona simulation can flatten/caricature groups. | CoMPosT; Wang et al. 2025 | Multiple critical works; **moderate**. | Prompt/model/group/task dependence. | Human validation and subgroup audit mandatory; high confidence. |
| E11 LE | LLM populations can form conventions and collective bias; committed minorities can shift them. | Science Advances 2025, DOI above | Controlled later study; **moderate** pending task transfer. | Naming-game setup may not generalize. | Adds tipping/bias experiments, not feature proof; medium confidence. |
| E12 AI | Smallville establishes un-scripted pathways under seeded conditions, not genuine institutional emergence. | Synthesis of §§3, 5–7 | Transparent inference; **moderate**. | A narrower definition may call any unscripted path emergent. | Governs claim language; high confidence. |
| E13 CR | Keep LLM memory/plans outside identity, authority, scheduling, and ledger truth. | E05, E07–E12 + JON-15–18 contracts | Safety recommendation; evidence plus accepted project boundaries. | None compatible with current Concord authority model. | High applicability/confidence. |
| E14 CR | Build experiments before generative-agent features. | E01–E12 | Recommendation under weak transfer evidence. | A purely entertainment use could accept lower validity, but Concord is governance research. | High applicability/confidence. |
| E15 SI | Existing Linear owners cover adjacent work; new tasks would duplicate scope. | Current JON-15–25, 39, 58/78, 96–105 searches on 2026-09-18 | Direct issue inspection; **strong** for current index. | A future reorganization may change ownership. | Route inputs, create nothing; high confidence. |

## 14. Final recursive audit

The package was audited from acquisition through recommendations after drafting. Defects found and corrected during the loop were: overly broad use of “causal” for the end-to-end run; failure to distinguish fixed population from population enforcement; initial omission of code/paper retrieval-decay drift; possible duplication of JON-21 and JON-99/100/105; conflation of familiarity with trust; and insufficient separation of source memory from institutional truth. After each correction the audit restarted at source acquisition.

Final clean pass:

- [x] Source identity, version, availability, byte continuity, terminal `truncated: false`, checksums, and retrieval time recorded.
- [x] Architecture, algorithms, prompts, state/data flow, implementation details, evaluations, ablations, assumptions, limitations, failures, and formulas reconstructed with section/figure citations.
- [x] Every required emergence outcome, scale, mechanism, lifecycle property, observer effect, and negative-emergence class is addressed.
- [x] Seeded goals/personas/prompts/environment/orchestration and alternative explanations are separated from observed paths.
- [x] Supporting, contradictory, later, and critical evidence changes the conclusion rather than decorating it.
- [x] Paper finding, author claim, source inspection, later evidence, analyst inference, and Concord recommendation are labeled and traceable.
- [x] No author claim is represented as experimental evidence; no Concord inference is represented as a paper finding.
- [x] No implementation is recommended solely from weak evidence; behavioral mechanisms are experiment-gated.
- [x] Existing versus designed versus missing Concord capabilities are separated.
- [x] Experiments specify controls, seeds, metrics, benchmarks, ablations, acceptance criteria, costs/risks, and completion evidence.
- [x] Linear search/inspection found canonical owners; no duplicate/conflicting issue was created, and every routed option lists provenance, dependencies, acceptance, and evidence.
- [x] Remaining choices are genuine owner priority/budget/ethics tradeoffs, clearly decision-gated; no remaining matter resolvable by further analysis of the acquired sources blocks this package.

**Clean-pass result:** no material defect found. JON-116's research output is `COMPLETE`; downstream experiments and implementations remain unstarted and subject to their existing owners, dependencies, execution hold, and explicit authorization.
