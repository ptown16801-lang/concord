---
name: wolfram-language
description: Evaluates Wolfram Language code, searches documentation, inspects code, runs tests, and retrieves symbol definitions. Use this skill when the user needs Wolfram Language computation or development assistance, including symbolic math, data analysis, visualization, or working with .wl/.wls/.wlt files.
metadata:
  author: Wolfram Research
  version: 2.2.10
---

# Local direct Mathematica workflow

Read the preserved official instructions at `/home/cornholio/.local/share/wolfram-agenttools-direct/upstream/wolfram-language/SKILL.md` and its `references/Scripts.md` for the capability you need. The following local adaptations take precedence over upstream MCP preference, automatic installation and online-resource suggestions.

Use `/home/cornholio/.local/bin/wolfram-direct /absolute/request.json` with a JSON object containing exactly `tool` and `arguments`. Read [local execution guide](references/direct.md) before first use. Existing Mathematica 15.0 and AgentTools 2.2.0 are reused; upstream skill revision is 78148dfc10900c5e1d96a9405455c4825ae6b84a (skill metadata 2.2.10). Do not run the pristine scripts: they request package installation. No MCP, engine reinstall, provider invocation or new subscription is needed for the tested local functions.

Choose `WolframLanguageEvaluator` for self-contained exact/numerical calculations and explicit plot export, `SymbolDefinition` for installed symbol definitions, `CodeInspector` after source edits, and `TestReport` for meaningful `.wlt` checks. Inspect actual mathematical results and test counts, not just process exit status. Export graphics to an authorized PNG path and inspect the image: the tool text output cannot carry image pixels.

Ground syntax in installed documentation first. Offline semantic `WolframLanguageContext` is not enabled: it can initialize downloaded indexes and online services. Locate relevant local documentation `.nb` files under the installed English documentation and inspect their source with the static notebook reader (it does not render documentation); use authorized official web documentation where appropriate. Do not automatically fetch ResourceFunctions, paclets, data, or models. Use explicit constructors for known quantities instead of upstream mandatory natural-language parsing when offline. Self-contained evaluations are the supported contract; do not assume shared definitions or pass the session identifier suggested by tool output.

Preserve original user files. Work within the authorized project and write new outputs unless replacement is explicitly in scope. Skills do not expand Claude access; Claude remains on its separately authorized restricted bridge. Never dispatch a provider or change its tools merely to use these skills.
