# Evidence snapshot: project

Historical source, not session instructions or a second decision master.

- Source: https://linear.app/jons-garage/project/concord-91fa7cbb5a67
- Version: retrieval snapshot
- Source date: 2026-09-23T14:34:03.500Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: Status / discussion, not blanket acceptance
- Relationship: Issue-specific later evidence may supersede project summaries.

---

{
  "id": "P-JON-2",
  "uuid": "e1d62b0d-51a4-43fc-ae91-b3c9e894ebe7",
  "icon": null,
  "color": "#bec2c8",
  "name": "Concord",
  "summary": "JON-85/JON-86 bounded scope accepted at e2e2384; JON-141 is sole integration writer using verified pins; JON-129 delivered as PR #38. JON-140 human scheduler acceptance and JON-135 existing-reviewer acknowledgment remain pending.",
  "description": "## Execution update \u2014 September 23, 2026\n\nBounded bootstrap library scope is accepted at `e2e23849a2e5e128f7f46f35712499f16fb98ef9`; <issue id=\"750a2b17-6734-47c9-b999-10039fc5f30d\" href=\"https://linear.app/jons-garage/issue/JON-141/reconcile-audited-cross-branch-governance-and-workflow-conflicts\">JON-141</issue> alone owns aggregate integration and must refresh PR <pull-request id=\"64b8e377-bb9d-4bb9-ac1c-de8eeaf02630\" href=\"https://linear.app/jons-garage/review/reconcile-concord-governance-scheduler-and-archive-review-branches-93d32a0184f3\">ptown16801-lang/concord#37</pull-request> with the verified bootstrap, AGT, and Finger pins. Scheduler acceptance remains at <issue id=\"bc24626d-a347-4bb8-9b0c-3f2f1e4e1a64\" href=\"https://linear.app/jons-garage/issue/JON-140/review-corrected-scheduler-harness-for-jon-128-acceptance\">JON-140</issue> before <issue id=\"a37bce59-5662-4821-a42b-1092b7523792\" href=\"https://linear.app/jons-garage/issue/JON-127/validate-concord-scheduler-implementation-approaches\">JON-127</issue> comparative execution. <issue id=\"89712dda-5b58-4c0e-b2db-e33795c4c3fe\" href=\"https://linear.app/jons-garage/issue/JON-135/agt-f-independent-adversarial-verification-and-acceptance-report\">JON-135</issue> remains with its existing reviewer; no duplicate review is being started.\n\n# Current coordination \u2014 September 23, 2026\n\nThe owner's latest instruction is to choreograph current Concord work without overlap, start urgent prerequisites, and add complementary work. Follow the [current ownership and dependency map](<https://linear.app/jons-garage/document/concord-current-work-ownership-and-dependencies-2026-09-23-95963ba59a4b>) for exclusive session ownership, exact artifacts, and pending handoffs. <issue id=\"750a2b17-6734-47c9-b999-10039fc5f30d\" href=\"https://linear.app/jons-garage/issue/JON-141/reconcile-audited-cross-branch-governance-and-workflow-conflicts\">JON-141</issue> owns shared integration and further PR <pull-request id=\"4cc2c125-740c-4ab6-a99e-c0f944440961\" href=\"https://linear.app/jons-garage/review/add-concord-governance-sandbox-and-audit-remediation-4889b1a6c5c1\">Add Concord governance sandbox and audit remediation</pull-request> writes; the overlapping producer has acknowledged yielding. <issue id=\"2f07cdad-35d9-4aa3-a2d7-94164f116692\" href=\"https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff\">JON-85</issue> retains implementation ownership of PR <pull-request id=\"4c6c0e58-58e9-4eaf-878b-9df4c95b135f\" href=\"https://linear.app/jons-garage/review/jon-85-recover-and-correct-frozen-bootstrap-impeachment-implementation-7857010e5e77\">JON-85: recover and correct frozen bootstrap impeachment implementation</pull-request>; <issue id=\"dd50f3cd-53a0-4dc7-8b4b-3851cd6c0602\" href=\"https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification\">JON-86</issue> has delivered a bounded independent PASS at corrected revision e2e23849a2e5e128f7f46f35712499f16fb98ef9. Its mandatory-review bypass finding is independently verified closed; human acceptance of that bounded library scope is recorded on <issue id=\"2f07cdad-35d9-4aa3-a2d7-94164f116692\" href=\"https://linear.app/jons-garage/issue/JON-85/implement-frozen-bootstrap-impeachment-specification-codex-handoff\">JON-85</issue>/<issue id=\"dd50f3cd-53a0-4dc7-8b4b-3851cd6c0602\" href=\"https://linear.app/jons-garage/issue/JON-86/verify-bootstrap-impeachment-pr-against-the-frozen-specification\">JON-86</issue>. Real external authority and production integration remain outstanding. <issue id=\"9cb7b58e-2244-4799-a544-82b397d6a382\" href=\"https://linear.app/jons-garage/issue/JON-129/validate-processing-grid-dimensions\">JON-129</issue>'s existing cloud work is recovered as one canonical PR <pull-request id=\"a252b39a-e2af-4391-ab5d-cfdbe489150e\" href=\"https://linear.app/jons-garage/review/jon-129-recover-positive-integer-processing-grid-validation-d10c15023fe2\">JON-129: recover positive integer processing-grid validation</pull-request>. <issue id=\"bc24626d-a347-4bb8-9b0c-3f2f1e4e1a64\" href=\"https://linear.app/jons-garage/issue/JON-140/review-corrected-scheduler-harness-for-jon-128-acceptance\">JON-140</issue> review gates <issue id=\"a37bce59-5662-4821-a42b-1092b7523792\" href=\"https://linear.app/jons-garage/issue/JON-127/validate-concord-scheduler-implementation-approaches\">JON-127</issue> comparative execution.\n\nThese instructions coordinate currently authorized work. Older blanket stop-work wording below does not undo later issue-specific authorizations. <issue id=\"c1c5b95f-9202-4e06-9030-6f8c59734a8f\" href=\"https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture\">JON-25</issue> remains Done for its owner-accepted design; unresolved coin semantics and actual integration dependencies are preserved. Review delivery and producer tests do not imply acceptance, merge, deployment, or production readiness.\n\n# Scoped Goodwill/economy resumption \u2014 September 23, 2026\n\nThe owner's current Codex instruction to begin Goodwill/economy work supersedes the older coin/economy stop-work text below for this bounded research/design task. Preflight reused existing artifacts and checked live heads rather than restarting historical workloads. <issue id=\"c1c5b95f-9202-4e06-9030-6f8c59734a8f\" href=\"https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture\">JON-25</issue>'s existing PR <pull-request id=\"791a84a7-25a6-4367-8703-654e989732b5\" href=\"https://linear.app/jons-garage/review/define-concord-marketplace-and-deal-making-architecture-a15b0a2056f1\">Define Concord marketplace and deal-making architecture</pull-request> has been amended at `a42baeadc0e69b08571acc779e5b8268385be49e` with the September 21 Goodwill reconciliation and current protected-operation admission boundary. <issue id=\"c1c5b95f-9202-4e06-9030-6f8c59734a8f\" href=\"https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture\">JON-25</issue> is Done for its design-only deliverable following the owner's \u201cI agree\u201d and \u201cPass\u201d acceptance of revision `a42baeadc0e69b08571acc779e5b8268385be49e` after Linear's advisory PASS. This is owner design acceptance, not scientific validation or runtime/production acceptance.\n\nThis task authorizes no new coin mechanics, experiment run, product implementation, merge, deployment, automatic dispatch or Linear Coding Session. <issue id=\"102d289a-aa72-49e9-b8e5-916cebcdd1e8\" href=\"https://linear.app/jons-garage/issue/JON-97/coin-model-a-formal-specification-and-interview-audit\">JON-97</issue> refusal semantics remain unresolved; <issue id=\"cdc37030-0e94-48f8-9c96-f8fea0105eb7\" href=\"https://linear.app/jons-garage/issue/JON-102/coin-model-f-concord-integration-plan\">JON-102</issue> integration remains dependency-gated. Completed work and unrelated scopes are preserved. Historical project summaries below are not an exhaustive statement of later separately authorized work; September 23 governance work is recorded under <issue id=\"9e6621ef-e8ea-4c18-9f97-5440c5d22343\" href=\"https://linear.app/jons-garage/issue/JON-138/concord-subsystem-microsoft-agent-governance-integration-sandbox\">JON-138</issue> and its current artifacts.\n\n# Active scope \u2014 owner instruction, September 21, 2026\n\nConcord is resumed for planning under <issue id=\"a37bce59-5662-4821-a42b-1092b7523792\" href=\"https://linear.app/jons-garage/issue/JON-127/validate-concord-scheduler-implementation-approaches\">JON-127</issue> and bounded test-harness implementation under <issue id=\"96a38d49-72d1-4b2c-bc5e-0b5f84ae6d34\" href=\"https://linear.app/jons-garage/issue/JON-128/build-concord-scheduler-simulation-and-test-harness\">JON-128</issue>. Codex may edit, test, commit, push, and open a draft pull request only for <issue id=\"96a38d49-72d1-4b2c-bc5e-0b5f84ae6d34\" href=\"https://linear.app/jons-garage/issue/JON-128/build-concord-scheduler-simulation-and-test-harness\">JON-128</issue>'s isolated synthetic scheduler harness. No merge, deployment, Loop execution, production scheduler work, or work outside <issue id=\"96a38d49-72d1-4b2c-bc5e-0b5f84ae6d34\" href=\"https://linear.app/jons-garage/issue/JON-128/build-concord-scheduler-simulation-and-test-harness\">JON-128</issue> is authorized.\n\nAll coin/economy work remains on hold, including <issue id=\"c1c5b95f-9202-4e06-9030-6f8c59734a8f\" href=\"https://linear.app/jons-garage/issue/JON-25/agent-economy-barter-and-deal-making-architecture\">JON-25</issue>, <issue id=\"99afb901-e059-4e4a-8c25-0fb01042e673\" href=\"https://linear.app/jons-garage/issue/JON-96/emergent-issuer-specific-coin-instrument-research-model\">JON-96</issue> through <issue id=\"1e1d4d62-b365-4e39-9383-fb51bbe3d760\" href=\"https://linear.app/jons-garage/issue/JON-106/coin-model-j-prior-art-replication-and-source-verification\">JON-106</issue>, and related pull requests. Preserve their current records; do not resume research, review, correction, or implementation.\n\nLinear Coding Sessions remain prohibited. Use Codex only when a later owner instruction explicitly authorizes an external coding task.\n\n---\n\n# Goal\n\nDevelop and study the Concord multi-agent governance system.\n\n## Scope\n\nThe project is active; each issue's approved scope, design-only limits, genuine dependencies and holds still determine what may proceed. Existing architecture, decisions, research, implementation, testing and independent-verification obligations remain in their canonical issues and source documents. Completing design alone does not complete a mixed-stage parent.\n\nConcord's institutional scheduler, legality checker, Archivist and hidden research layer are product requirements, not project-management machinery. Useful external research and repository connectors remain available within task-specific permissions.\n\n## Workflow\n\nArea labels classify topics. A/B/C/D milestones group deliverables but do not create serial permission gates. Legacy milestone percentages reflect remaining membership, not product readiness; add no new work to legacy buckets. Historical supervisor/dispatcher/review-coordinator records do not govern current work. Their retirement is not proof that runtime settings or saved Loops have been disabled.\n\nVote is folder metadata only; Concord and The Form remain separate. The resource labeled \u201cVote \u2014 umbrella project\u201d points to a retired container and conveys no work ownership.\n\n## Current review handoff\n\n<issue id=\"1e1d4d62-b365-4e39-9383-fb51bbe3d760\" href=\"https://linear.app/jons-garage/issue/JON-106/coin-model-j-prior-art-replication-and-source-verification\">JON-106</issue>'s source-verification table now exists on <issue id=\"f8243443-181b-4173-a43a-a4d8d453e671\" href=\"https://linear.app/jons-garage/issue/JON-98/coin-model-b-exact-model-prior-art-audit\">JON-98</issue> and in concord PR <pull-request id=\"1ea0114d-31bc-476c-a5f2-3a55fe980f31\" href=\"https://linear.app/jons-garage/review/verify-coin-model-sources-and-qualify-prior-art-claims-beae5b53c261\">ptown16801-lang/concord#29</pull-request>. Reuse that delivery. Review the existing correction against the original criteria and its relationship to PR <pull-request id=\"bac7be93-2264-4a7d-968a-a84cad025c26\" href=\"https://linear.app/jons-garage/review/audit-exact-coin-model-prior-art-f88a616bf2ab\">ptown16801-lang/concord#25</pull-request>; do not rerun research simply because <issue id=\"1e1d4d62-b365-4e39-9383-fb51bbe3d760\" href=\"https://linear.app/jons-garage/issue/JON-106/coin-model-j-prior-art-replication-and-source-verification\">JON-106</issue> previously showed Todo. Delivery is not acceptance.\n\n## Mandatory execution safety rule\n\nBefore any execution, delegation, reopening, or workload creation, follow the project document **Mandatory Project Execution Safety Rule**. In particular, verify current completion state before dispatch, do not treat open issues as proof of unfinished work, and do not use Linear for coding unless the owner explicitly authorizes it. Finger's deployable beta is complete and is not pending work.\n\n## Linear-native operating model\n\nUse the project document **Concord Linear-native operating workflow**. Ordinary Linear issues, human ownership, dependencies, review, and evidence are the default. Do not create custom supervisors/dispatchers/coordinators by default. Linear Coding Sessions remain prohibited until explicitly re-enabled by the owner; authorized coding is handed to Codex or another explicitly approved external coding tool.\n\n## Workspace operating policy\n\nFollow the team document **Workspace Linear operating policy \u2014 native workflow**. Human issue ownership is primary; agents are bounded delegates only. Linear Coding Sessions are prohibited until explicitly re-enabled by the owner. Use native issue states, blockers, reviews, and external Codex/approved coding-tool handoffs instead of custom supervisor/dispatcher machinery.",
  "url": "https://linear.app/jons-garage/project/concord-91fa7cbb5a67",
  "resourceCount": 17,
  "createdAt": "2026-09-15T18:48:17.804Z",
  "updatedAt": "2026-09-23T14:34:03.500Z",
  "startedAt": "2026-09-15T23:08:45.452Z",
  "completedAt": null,
  "canceledAt": null,
  "startDate": "2026-09-15",
  "startDateResolution": null,
  "targetDate": null,
  "targetDateResolution": null,
  "priority": {
    "value": 2,
    "name": "High"
  },
  "labels": [
    "Folder: Vote"
  ],
  "initiatives": [],
  "lead": {
    "id": "8c87a622-9ae7-4392-b795-30ac8c26fa8a",
    "name": "J"
  },
  "leadTeam": {
    "id": "836e3d20-d2cb-40ce-8069-4780848b4c2e",
    "name": "Jon's garage",
    "key": "JON"
  },
  "status": {
    "id": "c17603d4-6a82-4d55-800c-bc7844ae0f09",
    "name": "In Progress",
    "type": "started"
  },
  "teams": [
    {
      "id": "836e3d20-d2cb-40ce-8069-4780848b4c2e",
      "name": "Jon's garage",
      "key": "JON"
    }
  ],
  "resources": [
    {
      "type": "document",
      "id": "5874b540-c88c-46cf-b5e0-1e35af8eca9b",
      "title": "Concord AI Role & Independence Specification v1 \u2014 Draft for review",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/concord-ai-role-and-independence-specification-v1-draft-for-review-59d78e8cb098",
      "createdAt": "2026-09-24T07:27:24.687Z",
      "updatedAt": "2026-09-24T10:21:48.028Z"
    },
    {
      "type": "document",
      "id": "89073092-2693-4fb0-9967-0db82b06ff2c",
      "title": "Concord current work \u2014 ownership and dependencies (2026-09-23)",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/concord-current-work-ownership-and-dependencies-2026-09-23-95963ba59a4b",
      "createdAt": "2026-09-23T13:41:15.677Z",
      "updatedAt": "2026-09-23T14:36:20.440Z"
    },
    {
      "type": "document",
      "id": "135c4a33-7338-4ce2-aae5-e7cf8d5f5ac4",
      "title": "Concord governance recovery \u2014 research brief (2026-09-23)",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/concord-governance-recovery-research-brief-2026-09-23-e7b642f42db1",
      "createdAt": "2026-09-23T13:15:42.458Z",
      "updatedAt": "2026-09-23T13:15:44.590Z"
    },
    {
      "type": "document",
      "id": "4d222787-0b94-432a-9ba0-9fbb82766b9e",
      "title": "Proposal for review \u2014 Concord AGT integration and bounded delegation",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/proposal-for-review-concord-agt-integration-and-bounded-delegation-50c0e9dbe914",
      "createdAt": "2026-09-23T10:15:54.561Z",
      "updatedAt": "2026-09-23T14:33:04.644Z"
    },
    {
      "type": "document",
      "id": "2310f3cb-b66a-4c1d-a79a-219f8a727537",
      "title": "Concord Linear-native operating workflow",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/concord-linear-native-operating-workflow-8fe803878f5e",
      "createdAt": "2026-09-19T04:06:49.878Z",
      "updatedAt": "2026-09-21T02:41:22.217Z"
    },
    {
      "type": "document",
      "id": "9a08a9cf-6bf5-4705-b3c5-9bb2621e1a00",
      "title": "Mandatory Project Execution Safety Rule",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/mandatory-project-execution-safety-rule-af44c319d2b8",
      "createdAt": "2026-09-19T03:57:04.027Z",
      "updatedAt": "2026-09-21T02:39:41.434Z"
    },
    {
      "type": "document",
      "id": "4dbb55fb-3fdb-4a9e-b6d7-c9afe128a4e1",
      "title": "HISTORICAL \u2014 Concord Linear-native migration audit and verification",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/historical-concord-linear-native-migration-audit-and-verification-c616873bc30b",
      "createdAt": "2026-09-18T21:37:01.276Z",
      "updatedAt": "2026-09-21T02:41:23.763Z"
    },
    {
      "type": "document",
      "id": "ca1e8ef3-fc5d-439d-b57e-f73282560d53",
      "title": "RETIRED \u2014 Concord Supervisor partitioned runtime v4.0",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/retired-concord-supervisor-partitioned-runtime-v40-8cdb8f7cc4ef",
      "createdAt": "2026-09-17T01:12:28.645Z",
      "updatedAt": "2026-09-19T03:09:18.063Z"
    },
    {
      "type": "document",
      "id": "9528097f-3ade-4ea2-93af-24fe8695a6a8",
      "title": "Homepage artwork \u2014 approved source and editing workflow v1.0.0",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/homepage-artwork-approved-source-and-editing-workflow-v100-b695d75df212",
      "createdAt": "2026-09-15T23:01:07.648Z",
      "updatedAt": "2026-09-15T23:01:10.168Z"
    },
    {
      "type": "document",
      "id": "dbee809d-2aa6-49e5-93d7-589ad499fd2e",
      "title": "Concord operational ownership index v5.0",
      "icon": null,
      "color": null,
      "url": "https://linear.app/jons-garage/document/concord-operational-ownership-index-v50-b5122377d07a",
      "createdAt": "2026-09-15T19:17:08.065Z",
      "updatedAt": "2026-09-19T03:09:23.086Z"
    },
    {
      "type": "link",
      "id": "bcebcacf-c2ad-49b3-853b-49ec211dbe92",
      "label": "Authoritative project map \u2014 Concord and The Form; Vote is a folder only",
      "url": "https://linear.app/jons-garage/document/authoritative-project-map-concord-and-the-form-vote-folder-only-1d086fda24b6",
      "createdAt": "2026-09-17T01:37:02.886Z"
    },
    {
      "type": "link",
      "id": "06a6365a-d6e7-4732-a62e-ae4942ac5ed7",
      "label": "The Form \u2014 separate peer project in the Vote folder",
      "url": "https://linear.app/jons-garage/project/the-form-b6895497c351",
      "createdAt": "2026-09-17T01:24:01.402Z"
    },
    {
      "type": "link",
      "id": "e12af43b-7ac0-4227-892c-e07f40b3097d",
      "label": "Vote \u2014 umbrella project",
      "url": "https://linear.app/jons-garage/project/vote-3ac6d4440a50",
      "createdAt": "2026-09-15T23:31:25.314Z"
    },
    {
      "type": "link",
      "id": "c88ad3d5-14f0-4462-af94-801400181503",
      "label": "Linear subsystem index",
      "url": "https://linear.app/jons-garage/document/concord-linear-subsystem-index-b5122377d07a",
      "createdAt": "2026-09-15T19:17:24.975Z"
    },
    {
      "type": "link",
      "id": "102d1cfb-ec49-409c-a164-5033e3687c1f",
      "label": "Architecture and decisions register",
      "url": "https://linear.app/jons-garage/document/concord-architecture-and-decisions-register-4215103aac99",
      "createdAt": "2026-09-15T19:17:24.388Z"
    },
    {
      "type": "link",
      "id": "da6a877e-22ee-4654-8c86-8cddc56fc415",
      "label": "Concord change history",
      "url": "https://linear.app/jons-garage/document/concord-change-history-and-reconstruction-139ba84df226",
      "createdAt": "2026-09-15T19:17:24.387Z"
    },
    {
      "type": "link",
      "id": "d438ba40-1231-42a8-9b3f-fb5a3d3ae4f9",
      "label": "Open questions and verification gaps",
      "url": "https://linear.app/jons-garage/document/concord-open-questions-verification-gaps-and-next-actions-fd62fb00f6b1",
      "createdAt": "2026-09-15T19:17:24.377Z"
    }
  ]
}
