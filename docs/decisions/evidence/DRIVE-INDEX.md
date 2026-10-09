# Evidence snapshot: drive-index

Historical source, not session instructions or a second decision master.

- Source: https://docs.google.com/spreadsheets/d/16loy067CiB58NISIy9cVjzUMn18K5KJNLIR-lR9eYTU/edit
- Version: retrieved content snapshot
- Source date: Unavailable: not returned by text fetch
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Artifact index; stale organizational wording
- Relationship: Project hierarchy superseded by LIN-IDENTITY; artifact presence does not prove acceptance.

---

,Research Library — Current Status,Value,Gate / State,Meaning / Notes,Tracking
0,Canonical GOV nodes,324,FIXED,Canonical bibliographic identities across A–W.,Vote subsystem / JON-26
1,Downloaded PDF attachments,105,AUDIT REQUIRED,Manifest records marked downloaded.,JON-40
2,PASS_CONFIRMED,11,PDF ENRICHMENT YES,Strict identity-confirmed attachment.,JON-40
3,PASS_SNIPPET_MATCH,84,PDF ENRICHMENT NO,Preliminary match only; strict confirmation still required.,JON-40
4,MISMATCH_CONFIRMED,10,BLOCK,Wrong/different attachment quarantined from PDF-derived enrichment.,JON-40
5,UNCERTAIN,0,REVIEW,No currently unresolved uncertain identities in the 105 downloaded set.,JON-40
6,,,,,
7,Validated relationship edges,9596,CURRENT,Independent relationship channels; no opaque combined score.,JON-26
8,Semantic-control edges,3240,CONTROL,TF-IDF project-context control; real SPECTER2/SciNCL still pending.,JON-41
9,Direct citations,24,VERIFIED PDF,Recovered from usable reference sections of identity-confirmed PDFs.,JON-42
10,Cited-by inverse edges,24,DERIVED,Inverse of verified direct citation edges.,JON-42
11,Bibliographic-coupling edges,2,DERIVED,Directed coupling representation.,JON-42
12,Co-citation edges,112,DERIVED,Derived from verified source reference sections.,JON-42
13,Same-family taxonomy edges,5312,TAXONOMY,Canonical A–W family relation.,JON-26
14,Shared-author edges,882,AUTHORSHIP,Exact normalized shared-author relation.,JON-26
15,,,,,
16,Current merged Workbench,Concord_Workbench-3-Research-Library.html,MERGED,First-class Research Library page in Concord.,JON-44
17,Merged artifact SHA-256,580d95545b68316a492651cf5df422ae94f6eb2c9bca84fde34984411e880b6f,VERIFIED,Recorded artifact identity.,JON-39 / JON-44
18,Current route states,#/research-library ; #/research-library/GOV-###,IMPLEMENTED,Static/hash deployment of logical /research-library route contract.,JON-50
19,Cross-module integration,Exact GOV-ID route only,IN PROGRESS,Arbitrary Search / Learning / Data Atlas paths still require acceptance.,JON-52
20,Static-schema normalization,v1 compact → logical contract,TODO,Versioned normalization without identity/provenance loss.,JON-56
21,Live browser acceptance,Not runnable in current restricted runtime,BLOCKED,Requires an environment permitting local/hosted browser navigation.,JON-57
22,,,,,
23,Canonical project,Vote,BOUNDARY OWNER,Voat is a folder name only.,Subsystem — Research Library
24,Concord role,Implementation / UI surface,CONSUMER / SURFACE,"JON-26 is the Concord implementation parent, not the top-level subsystem owner.",JON-26
25,Canonical PDF storage,Google Drive,FIXED,Drive file ID is attachment identity; GOV ID remains bibliographic identity.,Research Library
,drive_file_id,gov_id,title,filename,family_code,concept_family,logical_bucket,archive_action,confidence,notes
0,1ELL0G48kio9hplA6VPjCEFB3YbbzcIWJ,GOV-234,Probabilistic encryption,GOV-234__Probabilistic_encryption.pdf,Q,"Cryptography, proof systems and selective disclosure",Q_Cryptography_Proofs_Disclosure,IDENTITY_REVIEW,FAIL,"PDF content is MQQ-ENC, not Goldwasser-Micali 1984."
1,154diFdEkUyCZmEdZnKxBFwQhL6KPwqpx,GOV-238,Noninteractive Zero-Knowledge,GOV-238__Noninteractive_Zero-Knowledge.pdf,Q,"Cryptography, proof systems and selective disclosure",Q_Cryptography_Proofs_Disclosure,IDENTITY_REVIEW,FAIL,"PDF content is Ring-LWE NIZK paper, not Blum et al. 1991."
2,1pCCZGxqGc55p0VCwKfLgevrRpFdBz2vk,GOV-249,Universally Composable Security,GOV-249__Universally_Composable_Security.pdf,Q,"Cryptography, proof systems and selective disclosure",Q_Cryptography_Proofs_Disclosure,IDENTITY_REVIEW,FAIL,"PDF content is verifiable PIR paper, not Canetti UC paper."
3,1l4v4chnOEoQXAgZGDhGdnJ5IO0FMOaXG,GOV-036,Normative Reputation and the Cost of Compliance,GOV-036__Normative_Reputation_and_the_Cost_of_Compliance.pdf,C,Norm emergence and social enforcement,C_Norm_Emergence_Enforcement,KEEP_IN_PLACE,HIGH,Reputation and compliance
4,13L3uFx1NHGXFvDkfUNV8bdYhbj9RRBZJ,GOV-182,Small Worlds and Cultural Polarization,GOV-182__Small_Worlds_and_Cultural_Polarization.pdf,L,"Relational networks, alignment and longitudinal inference",L_Relational_Networks_Alignment,KEEP_IN_PLACE,HIGH,Network topology and polarization
5,1sQ1U7bILRCxbV6BROAZdyv10G1j1PgtA,GOV-237,The Knowledge Complexity of Interactive Proof Systems,GOV-237__The_Knowledge_Complexity_of_Interactive_Proof_Systems.pdf,Q,"Cryptography, proof systems and selective disclosure",Q_Cryptography_Proofs_Disclosure,KEEP_IN_PLACE,HIGH,Interactive proof systems
6,1nXvxXnewN0h45LN3hWRxsXGW9cSQDRmZ,GOV-279,Real-Time Computing with Lock-Free Shared Objects,GOV-279__Real-Time_Computing_with_Lock-Free_Shared_Objects.pdf,T,"Scheduling, resource allocation and recovery",T_Scheduling_Resources_Recovery,KEEP_IN_PLACE,HIGH,Concurrency and scheduling
7,1IRAdUB4sgdHFa2ZJW5x08Rlxb6bY3Oll,GOV-280,Performing work efficiently in the presence of faults,GOV-280__Performing_work_efficiently_in_the_presence_of_faults.pdf,T,"Scheduling, resource allocation and recovery",T_Scheduling_Resources_Recovery,KEEP_IN_PLACE,HIGH,Fault-tolerant work scheduling
8,1QkQRWPQ4Jb8jH4dIrmnSarbiowPM3U8F,GOV-038,"Simulating Norms, Social Inequality, and Functional Change in Artificial Societies",GOV-038__Simulating_Norms_Social_Inequality_and_Functional_Change_in_Artificial_Societies.pdf,C,Norm emergence and social enforcement,C_Norm_Emergence_Enforcement,KEEP_IN_PLACE,HIGH,Norm simulation
9,1eWcFR2g2Xs302PvysdxcXkzDtRliekVM,GOV-126,Cooperation and Punishment in Public Goods Experiments,GOV-126__Cooperation_and_Punishment_in_Public_Goods_Experiments.pdf,H,"Coalitions, cooperation and collective action",H_Cooperation_Collective_Action,KEEP_IN_PLACE,HIGH,Cooperation and punishment
10,1uYe4e_BYXWyJUE-yNp3_joGKFbddjo_f,GOV-015,On the formal analysis of normative conflicts,GOV-015__On_the_formal_analysis_of_normative_conflicts.pdf,B,"Norms, institutional semantics and normative change",B_Norms_Institutional_Semantics,KEEP_IN_PLACE,HIGH,Normative conflict
11,1VnhWsF2fbYqa6PkCOeEzCa3Hfwq3ADdm,GOV-205,A survey of trust in Internet applications,GOV-205__A_survey_of_trust_in_Internet_applications.pdf,N,"Trust, reputation and digital identity",N_Trust_Reputation_Identity,KEEP_IN_PLACE,HIGH,Trust systems
12,1VNst9MJDO7sBXuzAOeCYe155Q9S_XIOq,GOV-107,Asymmetric Information and Legislative Rules: Some Amendments,GOV-107__Asymmetric_Information_and_Legislative_Rules_Some_Amendments.pdf,F,"Delegation, committees and checks and balances",F_Delegation_Committees_Checks,KEEP_IN_PLACE,HIGH,Legislative rules
13,1W7HQhCVCrrYEhBATkL8kbGWEdqPUmcJR,GOV-071,A Model of Path-Dependence in Decisions over Multiple Propositions,GOV-071__A_Model_of_Path-Dependence_in_Decisions_over_Multiple_Propositions.pdf,E,"Social choice, voting and judgment aggregation",E_Social_Choice_Voting_Judgment,KEEP_IN_PLACE,HIGH,Multi-proposition decision path dependence
14,1PadYarT3ybizjX0UZDnOUWdQd6MVN52U,GOV-252,Privacy as Contextual Integrity,GOV-252__Privacy_as_Contextual_Integrity.pdf,R,"Privacy, secrecy and cumulative leakage",R_Privacy_Secrecy_Leakage,KEEP_IN_PLACE,HIGH,Privacy framework
15,1v7HaHz0mbQdyn3nc-L8XVOGfhfkn7R62,GOV-078,Arrow's theorem in judgment aggregation,GOV-078__Arrows_theorem_in_judgment_aggregation.pdf,E,"Social choice, voting and judgment aggregation",E_Social_Choice_Voting_Judgment,KEEP_IN_PLACE,HIGH,"Identity verified; ordinary text extraction corrupts formal math symbols, so math indexing requires separate parser."
16,1nRPCNSP_lJxGpaeyEXsw2h1xLhX-ZKHs,GOV-048,Homo Socionicus: a Case Study of Simulation Models of Norms,GOV-048__Homo_Socionicus_a_Case_Study_of_Simulation_Models_of_Norms.pdf,C,Norm emergence and social enforcement,C_Norm_Emergence_Enforcement,KEEP_IN_PLACE,HIGH,Norm simulation models
17,1Ld_cJs8DwXMeXQEPgnXfFMChvDIHCTHb,GOV-307,Using the ODD protocol for describing three agent-based social simulation models of land-use change,GOV-307__Using_the_ODD_protocol_for_describing_three_agent-based_social_simulation_models_of_land-use_change.pdf,V,"Research methodology, falsification and reproducibility",V_Methodology_Falsification_Reproducibility,KEEP_IN_PLACE,HIGH,Simulation documentation methodology
18,1PbAjh8SpmSergw5eW9xKTJfEN7iMF5Pt,GOV-086,The premise-based approach to judgment aggregation,GOV-086__The_premise-based_approach_to_judgment_aggregation.pdf,E,"Social choice, voting and judgment aggregation",E_Social_Choice_Voting_Judgment,IDENTITY_REVIEW,FAIL,"PDF content is Philippe Mongin doctrinal-paradox paper, not premise-based approach paper."
19,1ZhvnK-_TAGUIXo7yfwIuiG2Qh4eg8QHs,GOV-021,Open issues for normative multi-agent systems,GOV-021__Open_issues_for_normative_multi-agent_systems.pdf,B,"Norms, institutional semantics and normative change",B_Norms_Institutional_Semantics,KEEP_IN_PLACE,HIGH,Normative architecture issues
20,14CSm216Wr-Rv5Tlufjt5dnTELt2no6ff,GOV-089,Introduction to judgment aggregation,GOV-089__Introduction_to_judgment_aggregation.pdf,E,"Social choice, voting and judgment aggregation",E_Social_Choice_Voting_Judgment,KEEP_IN_PLACE,HIGH,Judgment aggregation orientation
21,1PBfsSey1EEhNIfKfOGrd8VImhu7BJ2lJ,GOV-022,The Current State of Normative Agent-Based Systems,GOV-022__The_Current_State_of_Normative_Agent-Based_Systems.pdf,B,"Norms, institutional semantics and normative change",B_Norms_Institutional_Semantics,KEEP_IN_PLACE,HIGH,Orientation anchor
22,1e3ezjbuyg5EssGmI5tv7KnfwoqR0qVOE,GOV-181,Local Convergence and Global Diversity: From Interpersonal to Social Influence,GOV-181__Local_Convergence_and_Global_Diversity_From_Interpersonal_to_Social_Influence.pdf,L,"Relational networks, alignment and longitudinal inference",L_Relational_Networks_Alignment,KEEP_IN_PLACE,HIGH,Social influence and network structure
23,1EnhVjBbn-zFS1SkDPZOZ_QfwtZ81GKVh,GOV-233,OWL-POLAR: A framework for semantic policy representation and reasoning,GOV-233__OWL-POLAR_A_framework_for_semantic_policy_representation_and_reasoning.pdf,P,"Authorization, capabilities and information-flow security",P_Authorization_Capabilities_InfoFlow,KEEP_IN_PLACE,HIGH,Policy representation and reasoning
24,1nTF1r89E3ykQP5ZmxLiuZ1TKV0AJcMRT,GOV-092,Justified representation in approval-based committee voting,GOV-092__Justified_representation_in_approval-based_committee_voting.pdf,E,"Social choice, voting and judgment aggregation",E_Social_Choice_Voting_Judgment,KEEP_IN_PLACE,HIGH,Approval-based committee voting
,code,concept_family,logical_bucket,purpose
0,A,Agent autonomy and organizations,A_Agent_Autonomy_Organizations,"Agents, roles, teams, organizations"
1,B,"Norms, institutional semantics and normative change",B_Norms_Institutional_Semantics,"Rules, obligations, permissions, normative change"
2,C,Norm emergence and social enforcement,C_Norm_Emergence_Enforcement,"Norm formation, compliance, sanctions"
3,D,"Governance, constitutions and institutional design",D_Governance_Constitutions_Institutions,Institutional architecture and constitutional design
4,E,"Social choice, voting and judgment aggregation",E_Social_Choice_Voting_Judgment,"Voting, aggregation, representation"
5,F,"Delegation, committees and checks and balances",F_Delegation_Committees_Checks,"Delegation, committees, branch constraints"
6,G,"Negotiation, agreements and commitments",G_Negotiation_Agreements_Commitments,Negotiation and commitments
7,H,"Coalitions, cooperation and collective action",H_Cooperation_Collective_Action,"Coalitions, cooperation, public goods"
8,I,"Argumentation, legal reasoning and due process",I_Argumentation_Legal_Due_Process,"Legal reasoning, argumentation, procedure"
9,J,"Knowledge, belief and bounded rationality",J_Knowledge_Belief_Rationality,"Knowledge, belief, rationality constraints"
10,K,"Collective intelligence, dissent and group decisions",K_Collective_Intelligence_Dissent,"Group cognition, dissent, collective decisions"
11,L,"Relational networks, alignment and longitudinal inference",L_Relational_Networks_Alignment,"Networks, relations, temporal inference"
12,M,"LLM societies, agent cognition and evaluation",M_LLM_Societies_Cognition_Evaluation,LLM agents and evaluation
13,N,"Trust, reputation and digital identity",N_Trust_Reputation_Identity,"Trust, reputation, identity"
14,O,"Memory, archives, provenance and succession",O_Memory_Archives_Provenance,"Persistence, provenance, archives, succession"
15,P,"Authorization, capabilities and information-flow security",P_Authorization_Capabilities_InfoFlow,Access control and information flow
16,Q,"Cryptography, proof systems and selective disclosure",Q_Cryptography_Proofs_Disclosure,"Cryptography, zero knowledge, signatures"
17,R,"Privacy, secrecy and cumulative leakage",R_Privacy_Secrecy_Leakage,Privacy and leakage
18,S,"Distributed order, consensus and transactional integrity",S_Consensus_Transactional_Integrity,"Consensus, ordering, transactions"
19,T,"Scheduling, resource allocation and recovery",T_Scheduling_Resources_Recovery,"Scheduling, allocation, recovery"
20,U,"Formal verification, runtime monitoring and assurance",U_Verification_Runtime_Assurance,Formal verification and runtime assurance
21,V,"Research methodology, falsification and reproducibility",V_Methodology_Falsification_Reproducibility,"Methods, falsification, reproducibility"
22,W,Community governance and participation,W_Community_Governance_Participation,Community participation and governance
,gov_id,family,expected_title,observed_pdf_title,identity_status,plain_text_index,math_index,graph_gate,action,notes
0,GOV-234,Q,Probabilistic encryption - Goldwasser & Micali (1984),The Multivariate Probabilistic Encryption Scheme MQQ-ENC,FAIL,BLOCK,BLOCK,BLOCK,IDENTITY_REVIEW,Downloaded PDF does not match expected paper.
1,GOV-238,Q,Noninteractive Zero-Knowledge - Blum et al. (1991),Noninteractive Zero Knowledge Proof System for NP from Ring LWE,FAIL,BLOCK,BLOCK,BLOCK,IDENTITY_REVIEW,Downloaded PDF does not match expected paper.
2,GOV-249,Q,Universally Composable Security - Ran Canetti,Single-Server Verifiable PIR with Updates and Universally Composable Security,FAIL,BLOCK,BLOCK,BLOCK,IDENTITY_REVIEW,Downloaded PDF does not match expected paper.
3,GOV-078,E,Arrow's theorem in judgment aggregation,Arrow's theorem in judgment aggregation - Dietrich & List,PASS,PASS,FAIL_AUTHORITATIVE,PROSE_ONLY,MATH_REVIEW,Plain extraction corrupts formal symbols; rendered PDF is correct.
4,GOV-086,E,The premise-based approach to judgment aggregation,"The Doctrinal Paradox, the Discursive Dilemma, and Logical Aggregation Theory",FAIL,BLOCK,BLOCK,BLOCK,IDENTITY_REVIEW,Filename/record does not match extracted title or author.
5,GOV-092,E,Justified representation in approval-based committee voting,Justified Representation in Approval-Based Committee Voting,PASS,PASS,NOT_YET_AUDITED,ELIGIBLE_PROSE,QUEUE_MATH_AUDIT,Identity matches; math extraction still needs visual comparison.
6,GOV-260,S,The Byzantine Generals Problem,The Byzantine Generals Problem,PASS,PASS,NOT_YET_AUDITED,ELIGIBLE_PROSE,QUEUE_MATH_AUDIT,Identity matches.
7,GOV-263,S,Impossibility of Distributed Consensus with One Faulty Process,Impossibility of Distributed Consensus with One Faulty Process,PASS,PASS,NOT_YET_AUDITED,ELIGIBLE_PROSE,QUEUE_MATH_AUDIT,Identity matches.
8,GOV-268,S,Consensus on Transaction Commit,Consensus on Transaction Commit,PASS,PASS,NOT_YET_AUDITED,ELIGIBLE_PROSE,QUEUE_MATH_AUDIT,Identity matches; extracted abstract is coherent.
,Vote Library Linker — Stage 2,Value,Meaning,Gate
0,Canonical GOV nodes,324,Annotated bibliography records,ELIGIBLE
1,Downloaded PDF attachments,105,Manifest status=downloaded,AUDIT REQUIRED
2,PASS_CONFIRMED,4,Explicit title/author/first-page identity verification,PDF ENRICHMENT YES
3,PASS_SNIPPET_MATCH,85,Drive batch snippet aligns; not strict identity proof,PDF ENRICHMENT NO
4,MISMATCH_CONFIRMED,8,Wrong/different PDF attached to canonical GOV record,BLOCK
5,UNCERTAIN,8,Insufficient extracted evidence,REVIEW
6,,,,
7,TF-IDF control top-1 family precision,0.66358,Control benchmark; family labels excluded from vector text,SPECTER2/SciNCL MUST BEAT
8,TF-IDF top-5 any-family hit,0.87037,At least one same-family paper among top five,CONTROL
9,,,,
10,Identity rule,GOV ID,Canonical bibliographic identity,FIXED
11,Attachment rule,Drive file ID,Physical PDF identity; must pass identity audit,FIXED
12,Math rule,Specialized extraction,Ordinary PDF text is non-authoritative for equations/formal symbols,ROUTE MATH PAGES
,Phase 3 Scientific Linking Benchmark,Status,Implemented / model inference pending,Notes
0,Canonical GOV nodes,324,PASS,GOV ID remains canonical identity; PDF is an attachment.
1,Human review pairs,100,PASS,"30 same-family high, 40 cross-family high, 20 cross-family mid, 10 negative controls."
2,TF-IDF title-only @1 family hit,0.5401234568,CONTROL,Clean weak baseline.
3,TF-IDF title-only @5 family hit,0.75,CONTROL,At least one same-family neighbor in top 5.
4,TF-IDF project-context @1 family hit,0.6450617284,CONTROL,Uses title + analyst relevance/classification/notes; family labels excluded.
5,TF-IDF project-context @5 family hit,0.8580246914,CONTROL,Scientific models should beat or complement this while improving cross-family discovery.
6,Semantic Scholar SPECTER-v2 route,implemented,READY,"Batch client requests abstract, citation metadata and embedding.specter_v2; no persistent model server."
7,Local SPECTER2 runner,implemented,READY,allenai/specter2_base + allenai/specter2 proximity adapter; runtime packages/weights unavailable in current execution image.
8,Local SciNCL runner,implemented,READY,malteos/scincl safetensors preferred; runtime packages/weights unavailable in current execution image.
9,Ensemble builder,implemented,PASS,Reciprocal-rank fusion prevents raw cosine calibration mismatch.
10,PDF enrichment gate,PASS_CONFIRMED only,ENFORCED,"No PDF-derived full text, citations or math from mismatched/uncertain attachments."

