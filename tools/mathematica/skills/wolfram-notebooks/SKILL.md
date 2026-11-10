---
name: wolfram-notebooks
description: Reads and writes Wolfram notebook (.nb) files. Use this skill when the user needs to create, read, or convert Wolfram notebooks, including converting between markdown and notebook format.
metadata:
  author: Wolfram Research
  version: 2.2.10
---

# Local direct Mathematica workflow

Read the preserved official instructions at `/home/cornholio/.local/share/wolfram-agenttools-direct/upstream/wolfram-notebooks/SKILL.md` and its `references/Scripts.md` for the capability you need. The following local adaptations take precedence over upstream MCP preference, automatic installation and online-resource suggestions.

Use `/home/cornholio/.local/bin/wolfram-direct /absolute/request.json` with a JSON object containing exactly `tool` and `arguments`. Read [local execution guide](references/direct.md) before first use. Existing Mathematica 15.0 and AgentTools 2.2.0 are reused; upstream skill revision is 78148dfc10900c5e1d96a9405455c4825ae6b84a (skill metadata 2.2.10). Do not run the pristine scripts: they request package installation. No MCP, engine reinstall, provider invocation or new subscription is needed for the tested local functions.

Use `ReadNotebook` for non-evaluating static source inspection before changing a notebook. It returns UTF-8 source and a digest, not rendered Markdown, evaluated cells or a notebook-validity certificate. Use `WriteNotebook` for a new notebook from Markdown, then read it back and compare requested headings, text and code cells. Set `overwrite` to false unless replacement is explicitly authorized. Writing Markdown to a notebook is conversion, not lossless notebook editing: styles, cell metadata, dynamic content and graphics may not round-trip. Preserve the original and edit native structures where fidelity matters. Writing code cells does not execute them. Evaluate selected code separately only when authorized; rendering and interactive front-end behavior require separate verification. This installed route accepts local absolute paths, not notebook URLs.

Preserve original user files. Work within the authorized project and write new outputs unless replacement is explicitly in scope. Skills do not expand Claude access; Claude remains on its separately authorized restricted bridge. Never dispatch a provider or change its tools merely to use these skills.
