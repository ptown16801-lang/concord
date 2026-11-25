# Concord architecture and modeling research recovered from October 16 2026

This historical report preserves an exploratory discussion of Concord's
interconnected institutions, a possible governance engine or kernel, scheduling,
modeling software, and implementation precedents. Its final recommendation was
to reuse existing Concord research and prototypes in a connected institutional
evaluation before selecting a platform or adopting a shared core.

**Status: historical research, not an adopted architecture, implementation plan,
product selection, or current capability assessment.** Publication does not change
Concord's decisions. The present-day decision register and applicable corrections
remain separate from this account of what was investigated then.

| Provenance item | Recovered evidence and limit |
| --- | --- |
| Original research date | **2026-10-16**, verified from the original messages and recorded tool results. The research exchange begins at 08:50 UTC and the final synthesis is timestamped 10:51:40 UTC, both October 16 in America/New_York as well. |
| Requested historical label | The recovery request called these the “October 17 findings.” The original architecture messages establish October 16; later October 17 UTC messages concern a different topic. No separate October 17 architecture investigation was recovered. |
| Recovery and publication date | **2026-11-12, America/New_York**; **2026-11-13 UTC**. These are the recovery/publication dates, not the research date. |
| Historical repository | `https://github.com/ptown16801-lang/concord.git`, confirmed by the original recorded remote listing. |
| Historical checkout branch | `codex/grok-review-packet`, confirmed by original session metadata and the successful 08:51 UTC Git inspection. |
| Historical checkout HEAD | `ed8c060c25c3c4a7eb0630395fc615ee7927c8db`. Original metadata supplies the full SHA; the recorded Git command returned `ed8c060`. The full local Git object was recovered. Its October 1 commit date is not the October 16 research date. |
| Historical working-tree state | Not clean. The recorded status included modified research/entry-point files and untracked research material. The complete historical working-tree snapshot is **unknown**; HEAD alone does not identify all bytes read. |
| Historical live `Develo` revision | **Unknown** for this investigation. Revisions mentioned inside earlier September/October studies describe those studies, not a newly verified October 16 default-branch state. |
| Public availability of historical HEAD | During recovery, GitHub returned “No commit found” for `ed8c060c25c3c4a7eb0630395fc615ee7927c8db`. Its public availability at research time is **unknown**. No old branch or commit was republished to fill this gap. |
| Documentation recovery base | Current `Develo`, verified remotely at `77836f6a5a4313f1bb0a56ba3fa83e2a6a33a1ce`. This is a publication baseline only, not evidence available to the October investigation. |

The original messages, recorded source reads, and Git metadata were inspected
during recovery. This is an edited public derivative, not a verbatim transcript.
Private conversation originals, coordination records, account information,
machine paths, credentials, and session identifiers are excluded. Later November
summaries and product lookups are not used to backfill October findings.

The principal original research outputs were timestamped October 16 at
09:00:36 UTC (modeling tools), 09:07:15 UTC (engine assessment), 09:23:33 UTC
(cross-domain product shortlist), and 10:51:40 UTC (final synthesis). Intermediate
corrections below are preserved because they changed the conclusions.

**Concord as understood in the investigation.** The design described persistent
agent identities, private execution and memory, a constitution and institutions,
limited execution capacity, protected records, and attributable changes. Agents
could hold offices, negotiate agreements, participate in elections, and bring
disputes. The scheduler allocated capacity; institutional authority, objective
legality checks, and domain authorization had separate roles. This was a design
profile, not a claim that the complete environment was operating.

The selected historical requirements are publicly inspectable in
[CON-005, CON-011–013, CON-022, CON-040, CON-045–046, CON-062 and CON-081 at revision 441f135](https://github.com/ptown16801-lang/concord/blob/441f13536f57f7c3c294f0d42c6567ccf8baf7ae/DECISIONS.md).
During recovery, those entries were compared with the local historical HEAD and
found byte-identical. That establishes a public reference for these particular
entries; it does not make the entire older register identical to the research
checkout or establish fresh acceptance of any proposal.

**The central correction was to evaluate institutional dependencies.** The
discussion initially proposed a small constitutional ballot walkthrough. The
owner's October 16 clarification was that almost any candidate could implement
that isolated example: the important question was whether the software could
represent the many interconnected conditions behind it. The final research
therefore proposed a connected history spanning identity, legal status, elections,
scheduling, protected effects, records, and permitted observers.

Each relevant fact needed an authoritative owner, effective time, source, rule
version, and disclosure boundary. A dependency diagram without those semantics
would not establish lawful propagation. A vendor's use of “multidomain” for
simulation did not establish separation of institutional authority or secrets.
The exploration requirements called for permission filtering before queries,
counts, layouts, caches, and display. Hiding names alone would not protect the
existence or structure of secret relationships; cross-domain views needed
separately authorized information under the historical CON-062 requirements.

The ballot correction was explicit: a valid ballot accepted while an identity
was eligible remains counted after later disqualification. Ineligibility before
voting blocks a new ballot. The opening roll, immutable accepted ballots, and
still-eligible nonvoters are distinct state. Eligible nonvoters contribute to the
denominator; abstentions count in the denominator but not as affirmative votes.
The early wording suggesting that later ineligibility erased an accepted ballot
was superseded during the discussion. See the historical
[CON-011 and CON-012 definitions](https://github.com/ptown16801-lang/concord/blob/441f13536f57f7c3c294f0d42c6567ccf8baf7ae/DECISIONS.md#CON-011).
The arithmetic walkthrough was explanatory; it was not a run in Wolfram or a
comparison of software products.

**Governance engine and kernel hypothesis.** The working definition of an engine
was software that accepts an institutional action, checks its governing authority
and procedure, admits a precisely bounded operation, causes its permitted effect
through the proper domain, and retains checkable evidence. Agent discussion or
a policy evaluator's allowance would not by itself establish a governmental act.

The proposed reusable machinery covered action identity, authenticated actor and
authority evidence, rule versions, exact scope, expected record versions,
admission identity, duplicate protection, and effect receipts. Institutions would
retain their substantive rules, interpretation, jurisdictions, and protected
writers. “Kernel” referred to enforced application machinery running on Linux;
the proposal did not require modifying the operating-system kernel. A written
contract alone was not an enforced kernel.

| Arrangement considered | Expected benefit | Concern recorded then |
| --- | --- | --- |
| No common core | Institutions can evolve independently | Repeated identity, admission, receipt, and recovery machinery can drift |
| One service with access to every domain | Centralized inspection and uniform enforcement | Conflicts with the recorded separation of institutional gateways and writers; concentrates secrets and failures |
| Shared core enforced within separate domains | Common guarantees with protected institutional ownership | Shared defects, compatible-version requirements, upgrade coordination, and cross-domain failure protocols |

The third arrangement was the researcher's preferred hypothesis, not an owner
decision. A common core would not automatically solve the dependency network.
Authorized events still needed precise meaning at receiving institutions. The
discussion left open whether Concord should remain specific to its constitution
or eventually become configurable for other communities; it favored establishing
Concord's own behavior before generalizing.

**Scheduler relationship.** The investigation retained the separation between
allocation and authority: capacity answers whether work can be accommodated;
lawful priority is supplied by the appropriate institutions; an independent
checker evaluates objective scheduling constraints; the relevant domain supplies
authorization. The scheduler must not invent urgency, legal importance, guilt,
or constitutional interpretation. Protected domains disclose limited scheduling
envelopes rather than substantive protected records.

A shared decision mechanism could define how actions were admitted and recorded,
while scheduling remained responsible for allocating execution. The discussion
did not settle component packaging or identify a scheduler module to remove.
The historical [scheduler and continuity contract at c867015](https://github.com/ptown16801-lang/concord/blob/c86701512a64c58ade9707d8368a48bad1e8fc03/docs/SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md)
was a design source, not a completed production scheduler.

The investigation also treated later revocation as affecting new admissions,
not canceling an already lawfully admitted operation's immutable scope. An audit
collector outage required pausing protected effects and retaining the admitted
work. Recovery could not expand its scope or duplicate its effect. These were
recorded requirements under [CON-045 and CON-046](https://github.com/ptown16801-lang/concord/blob/441f13536f57f7c3c294f0d42c6567ccf8baf7ae/DECISIONS.md#CON-045),
not guarantees demonstrated by the conversation.

**Modeling tools and languages.** The assessment distinguished describing rules,
checking possible state sequences, simulating behavior, and executing live
institutional actions. The following are the capabilities and candidate roles
reported in October; the linked vendor pages are mutable references, not archived
page snapshots or new capability validation.

| Candidate | October finding and possible Concord use | Limit retained |
| --- | --- | --- |
| [InstAL](https://instsuite.github.io/guide/) | Explicit institutional events, permissions/powers, and cross-generation or cross-consequence rules between institutions; particularly relevant to institutional interdependence | Research modeling precedent; no established Concord-grade private-domain isolation, durable commits, or complete live runtime; parts of the guide were unfinished |
| [Institutional Grammar 2.0 and IG-Parser](https://github.com/chrfrantz/IG-Parser) | Structured representation and parsing of governing statements, including constitutive rules | Helps formalization; does not execute the constitution |
| [Alloy](https://alloytools.org/spec.html) | Relational constraints and counterexamples within chosen bounds | Checks the model under its scope, not a separate implementation |
| [TLA+ with Apalache](https://apalache-mc.org/) and [Quint](https://github.com/quint-co/quint/blob/main/docs/content/docs/what-does-quint-do.mdx) | State-sequence analysis for authority changes, duplicate delivery, crashes, and recovery | A specification result is not runtime certification |
| [Wolfram System Modeler](https://reference.wolfram.com/language/guide/SystemModelingOverview.html) | Connected components, discrete states, numerical dynamics, programmatic experiments, and analysis | Full institutional fit, maintenance benefit, entitlement, and performance had not been established |
| [AnyLogic](https://www.anylogic.com/features/) | Agent-based, discrete-event, and system-dynamics modeling in one environment | Strong comparison candidate after the cross-domain correction; no Concord comparison run established superiority |
| [Mesa](https://mesa.readthedocs.io/stable/) | Customizable Python agent models, visualization, and analysis | Concord would supply its institutional semantics |
| [NetLogo Voting](https://ccl.northwestern.edu/netlogo/models/Voting) | Implemented social simulation of neighboring voting/opinion changes | Not election administration or a constitutional ballot implementation |

The related research on
[institutions governing institutions](https://researchportal.bath.ac.uk/en/publications/a-framework-for-institutions-governing-institutions/)
was identified as a useful precedent for constitutional constraints on subordinate
bodies. Its relevance was an architectural assessment, not an implementation
match established for Concord.

The initial description of System Modeler as mainly a capacity/timing tool was
corrected. It supported a graphical editor, editable
[Modelica text](https://reference.wolfram.com/system-modeler/UserGuide/ModelCenterModelicaTextView.html.en),
[Wolfram Language modeling functions](https://reference.wolfram.com/language/guide/SystemModelingOverview.html),
and [StateGraph](https://reference.wolfram.com/system-modeler/libraries/Modelica/Modelica.StateGraph.html)
hierarchical discrete-event components. It was not strictly visual or restricted
to continuous models. The [Business Simulation library](https://www.wolfram.com/system-modeler/libraries/business-simulation/)
and the originally cited [world-policy example](https://www.wolfram.com/system-modeler/examples/education/social-science/modeling-the-world/index.php.en)
supported examining policy effects. The original world-example URL is retained;
its present reachability is not asserted.

No ready-made package matching Concord's constitutional workflow was verified.
That was a search limit, not proof that no relevant implementation existed.
Representing an institutional transition in a simulation did not establish its
constitutional validity or authorize a protected write.

**Implementation precedents and possible components.** The survey found actual
decision systems as well as general-purpose infrastructure. These were candidates
to study or adapt, not a selected stack.

| Role | References recorded in the investigation | Assessment at the time |
| --- | --- | --- |
| Participatory and voting systems | [Decidim processes](https://docs.decidim.org/en/develop/admin/spaces/processes.html), [LiquidFeedback core](https://liquidfeedback.com/en/open-source.html), [Aragon staged proposals](https://docs.aragon.org/spp/1.x) | Concrete precedents for proposals, delegation, voting, multiple bodies, thresholds, vetoes, and execution. Their semantics required a rule-by-rule comparison with Concord. |
| Agent governance and policy evaluation | [AGT limitations](https://github.com/microsoft/agent-governance-toolkit/blob/main/docs/LIMITATIONS.md), [OPA](https://www.openpolicyagent.org/docs), [Cedar](https://docs.cedarpolicy.com/auth/authorization.html) | AGT's role was already recorded in CON-040. A policy allowance did not confer constitutional authority or prove an institutional outcome. Other evaluators were possible building blocks, not adopted replacements. |
| Explicit state transitions | [XState persistence](https://stately.ai/docs/persistence) | Possible implementation detail for institutional statecharts; snapshots alone did not supply a legal transaction or audit protocol. |
| Long-running coordination | [Temporal workflow execution](https://docs.temporal.io/workflow-execution), [Camunda processes](https://docs.camunda.io/docs/components/concepts/processes/), [Camunda workers](https://docs.camunda.io/docs/8.9/components/best-practices/development/writing-good-workers/) | Waiting, timers, process inspection, and retries could be reused; privacy and duplicate-safe domain effects still needed design. |
| Storage, messaging, and projections | [PostgreSQL transactions](https://www.postgresql.org/docs/current/transaction-iso.html), [recursive queries](https://www.postgresql.org/docs/current/queries-with.html), [NATS JetStream](https://docs.nats.io/concepts/jetstream), [Neo4j access limitations](https://neo4j.com/docs/operations-manual/current/authentication-authorization/limitations/) | Candidate primitives for transactional records, replayable messages, and relationship queries. A universal protected event stream or unrestricted graph was not justified. |
| Adjacent policy and deliberation work | [OpenFisca](https://openfisca.org/en/index.html), [Polis](https://github.com/compdemocracy/polis); Catala was mentioned as a law-to-code lead | Useful patterns for policy computation and opinion analysis; none established a complete Concord runtime. A specific Catala source revision supporting its mention is **unknown**. |

The duplicate-effect concern was that a domain change could commit while its
acknowledgment was lost, prompting a retry. The proposed requirement was stable
operation identity, payload/version binding, an authoritative domain outcome,
and recovery that returns the recorded outcome instead of repeating the effect.
Generic workflow retries alone did not establish that guarantee. The research
did not prove that a workflow engine could never participate in such a protocol.

**Existing work identified for reuse.** These exact historical revisions are
linked to avoid substituting current code for the artifacts discussed then.
Public accessibility was checked during recovery; that is not a new runtime test
or a claim of acceptance on either date.

| Artifact | Revision-pinned evidence | Historical contribution and limit |
| --- | --- | --- |
| Governance sandbox | [Runtime at b332c2309e123bd05099d4f9fcfd3bd202bdb0fa](https://github.com/ptown16801-lang/concord/blob/b332c2309e123bd05099d4f9fcfd3bd202bdb0fa/src/governance/sandbox/runtime.js) | The original conversation inspected this code. It provided one synthetic domain, retained approvals, versioned writes, and a separate local audit collector. It was not a complete multi-domain deployment or remote availability protocol. |
| Scheduler evaluation harness | [Harness at e4b979dea42e606bc8ac0b64b458bb084d8ad3a6](https://github.com/ptown16801-lang/concord/blob/e4b979dea42e606bc8ac0b64b458bb084d8ad3a6/test/scheduler/harness.js), [documented boundaries](https://github.com/ptown16801-lang/concord/blob/e4b979dea42e606bc8ac0b64b458bb084d8ad3a6/test/scheduler/README.md) | Delivered synthetic evaluation infrastructure with a baseline, checker interface, and trace evidence. Owner acceptance, comparative experiments, and production selection remained separate. |
| Propagation pilot | [Replay implementation at d72b8c1db1daa465e3f8e462f504918219be4e1a](https://github.com/ptown16801-lang/concord/blob/d72b8c1db1daa465e3f8e462f504918219be4e1a/src/propagation/replay.js), [pilot description](https://github.com/ptown16801-lang/concord/blob/d72b8c1db1daa465e3f8e462f504918219be4e1a/docs/design/JON-24-LOCAL-PILOT.md) | Bounded synthetic threshold evaluation, ordered replay, holds, annotation corrections, and hypothetical branches. Browser runs were in memory; persistence, complete institutional pathways, protected-data integration, and broader acceptance were not established. |
| Protected-domain design | [Contract at 49c19837191b83e93844653f7bf6259ee838d3ef](https://github.com/ptown16801-lang/concord/blob/49c19837191b83e93844653f7bf6259ee838d3ef/docs/SECURITY_DOMAIN_CONTRACT.md) | Separate gateways, local authority, protected records, and dedicated writers were constraints on the investigation, not new research decisions. |
| Earlier Wolfram studies | September 30 evaluation and October 1 implementation study, recovered in local historical research material | Proposed an optional local laboratory attached to hypothetical checkpoints. The committed research ancestor is `29c2b2bba35213264466eb399e03adbb22d5b7b3`; recorded local edits mean it is not a complete snapshot of the material read on October 16. No complete public snapshot of those read-time bytes was established. |
| Earlier recovery study | September 23 governance-recovery brief, recovered from the original recorded read and local Git history | Supplied a proposed, unexecuted failure matrix and alternatives for the collector/commit boundary. It did not establish a current production defect or a selected recovery protocol. |

The earlier Wolfram proposal used an authorized checkpoint or synthetic fixture,
an explicit scenario mapping, a local simulation, validated derived evidence,
and a permission-filtered comparison. It distinguished exact per-request event
models from aggregate stocks and flows. Aggregate capacity curves could not by
themselves establish individual waiting, eligibility, or procedural fairness.
Standalone exported Linux simulations and FMI co-simulation were later options
to investigate; entitlement, compatibility, integration cost, and useful added
value were unresolved. Existing Python experiments and a model-catalog probe were
separate historical evidence, not a Concord System Modeler experiment run in this
conversation.

The recovery study identified a conceptual timing problem: a remote collector
could acknowledge intent and then become unavailable before the domain mutation.
Historical acknowledgment would not prove continuing availability. Options to
compare included a domain outbox plus receipt, shared atomic storage for a
defined evidence boundary, and distributed commit with durable participant state.
None was selected. Its literature included the
[transactional outbox pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html),
[Gray and Lamport's transaction-commit paper](https://arxiv.org/abs/cs/0408036),
and [etcd guarantees](https://etcd.io/docs/v3.6/learning/api_guarantees/).
The earlier brief consulted the paper's abstract, not the full paper. These were
protocol references, not evidence that their guarantees extended automatically
to Concord's separate stores.
The proposed failure matrix included lost intent replies, failure between receipt
and commit, crashes before and after commit, duplicate or stale workers, mismatched
restored histories, and revocation after admission. Eventual completion depended
on explicit recovery and retained-state assumptions; permanent loss could not be
resolved by asserting that retries would eventually succeed. The matrix remained
unexecuted in this investigation.

**Final proposed evaluation.** The last October synthesis favored one connected
event history with several branches, rather than selecting a platform from an
isolated ballot example. The proposed synthetic scenario joined authoritative
identity and legal-status changes to an open election, preserved earlier valid
ballots, controlled subsequent voting attempts, affected scheduler eligibility
only through its proper inputs, retained evidence, and produced different
permission-appropriate views.

| Question | Proposed investigation |
| --- | --- |
| Institutional meaning | Use InstAL and/or Alloy to examine whether rules across institutions produce the intended consequences. |
| Ordering and recovery | Use the existing recovery matrix and a TLA+ style specification for delayed/reordered messages, retries, crashes, revocation, unavailable domains, and older restored snapshots. Check loss of admission, duplicate effects, and scope expansion. |
| Privacy | Compare permitted views of histories differing in protected events; examine output, counts, graph shape, errors, and timing against the stated disclosure rules. |
| Behavior over time | Reuse the scheduler harness; add System Modeler, AnyLogic, or another agent model where it supplies useful capacity, delay, or behavioral insight. |

The recommended first step was to define shared test questions from existing
rules and artifacts, retain source/version mappings, and reuse the delivered
harnesses. A larger simulator would be evaluated for the questions it answered.
The same research could improve dependency inspection, replay, scenario analysis,
and component reliability without adoption of a governance kernel. No later
ranking of those benefits is attributed to the October conversation.

**Uncertainties and evidence limits at the close of research.** No complete
Concord model, cross-product benchmark, live constitutional workflow, or full
multi-domain integration was run in this investigation. No product was selected
or installed by it. Historical test results belonged to their earlier artifacts;
they were not rerun or independently accepted in the chat. Product licensing,
actual privacy behavior, usability at Concord's scale, performance, operating
cost, and maintenance burden remained unverified.

The shared-core boundary, exact cross-domain transaction/evidence boundary,
recovery authority, and general-purpose versus Concord-specific scope remained
design questions. Formal checks would establish properties of their models;
agreement between simulations would not validate assumptions about agent behavior.
The search did not find a verified off-the-shelf match for the complete protected
constitutional workflow, and did not prove that none existed.

**Recovery verification and publication scope.** Recovery checked original message
timestamps, recorded commands, local Git objects, current applicable instructions,
the live documentation base, the selected historical rule-entry equivalence, and
public availability of the pinned repository artifacts. External product URLs
are preserved as historical citations; their exact October page versions and
complete original retrieved bytes are **unknown**. Current product documentation
and later repository changes do not retroactively validate the findings.

This publication adds this report and its research-index link only. It imports
no old implementation branch, changes no runtime or governing record, and does
not reproduce private source records. The original investigation was read-only;
the present publication is a separately authorized documentation recovery. No
current simulation, benchmark, deployment, or independent architecture acceptance
is claimed.

Decision impact: No decision change
