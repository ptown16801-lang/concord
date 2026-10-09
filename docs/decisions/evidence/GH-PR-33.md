# Evidence snapshot: pr-33

Historical source, not session instructions or a second decision master.

- Source: https://github.com/ptown16801-lang/concord/pull/33
- Version: retrieval snapshot
- Source date: 2026-09-23T12:52:40Z
- Retrieved: 2026-09-24T21:25:20.531999+00:00
- Classification: PR metadata / review history
- Relationship: Base branch and exact head matter; merge is publication, not owner adoption.

---

{
  "url": "https://github.com/ptown16801-lang/concord/pull/33",
  "number": 33,
  "state": "open",
  "merged": false,
  "mergeable": false,
  "draft": true,
  "body": "JON-128's scheduler harness was saved in Codex cloud but never delivered to GitHub. This PR recovers it and corrects the original review defects plus all six findings from the subsequent JON-139 audit.\n\nThe synthetic harness proposes agent-to-work assignments in discrete rounds, preserves eligible incumbents, rotates otherwise-equal agents, and records independent observations. Only checker-approved assignments apply. Policy-failure fallback is checked under its own baseline identity; checker outages freeze ordinary work.\n\nThe audit corrections reject ambiguous same-round authority writes, use a locale-independent total ID order, distinguish consecutive/cumulative waiting from task age, preserve applied authoritative events, and capture validated immutable checker evidence. The README documents adapter/trace fields and the remaining evaluation-only boundaries. All seven changed files remain under `test/scheduler/`, using Node built-ins.\n\nValidation at `e4b979dea42e606bc8ac0b64b458bb084d8ad3a6`:\n- 34 focused scheduler test cases pass.\n- `npm test`: 61 passing runner entries (57 named tests and four support modules).\n- `npm run check`, scheduler syntax checks, and `git diff --check` pass.\n- Ten of eleven new audit tests fail on pre-fix `9965976`, reproducing all six findings; the additional string-reason reuse guard already passed there.\n- Full local tests ran outside the sandbox because existing HTTP tests require localhost binding. GitHub CI is checked separately at the published head.\n\nProvenance: `479697a` preserves the exact saved four-file diff from cloud task `task_e_6ab1fc805f98832586aa167e65d58482`; `9965976` fixed the first four review defects; `e4b979d` implements JON-139's six audit corrections. The earlier cloud task was a separate implementation and was not combined with this one.\n\nCoordination: [JON-139 corrections](https://linear.app/jons-garage/issue/JON-139) \u2192 [JON-140 acceptance review](https://linear.app/jons-garage/issue/JON-140), under [JON-128](https://linear.app/jons-garage/issue/JON-128). This stays a draft pending acceptance; passing tests and correction delivery do not complete JON-128.\n\nLimitations: injected checker, fixture-declared candidate identity, observed deadline/urgency labels without invented priority ordering, no production authorization/standby/essential-continuity service, policy registry, shadow/canary rollout, or GP/LLM/portfolio experiment.\n\n[Accepted JON-16 contract](https://github.com/ptown16801-lang/concord/blob/c86701512a64c58ade9707d8368a48bad1e8fc03/docs/SCHEDULER_CHECKER_CONTINUITY_CONTRACT.md)",
  "title": "Add deterministic Concord scheduler simulation harness",
  "base": "Develo",
  "base_sha": "40f647e5b8d23307f713fc3a3753a1d3a46611cb",
  "head": "codex/jon-128-recovered-harness",
  "head_sha": "e4b979dea42e606bc8ac0b64b458bb084d8ad3a6",
  "head_repo_full_name": "ptown16801-lang/concord",
  "merge_commit_sha": "3637d87c213a722a3b893f7142cdedc6eba7f177",
  "diff": null,
  "comments": null,
  "created_at": "2026-09-23T12:33:59Z",
  "updated_at": "2026-09-23T12:52:40Z",
  "closed_at": null,
  "merged_at": null,
  "commits": 3,
  "changed_files": 7,
  "additions": 631,
  "deletions": 0
}
