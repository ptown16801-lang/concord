# Local Concord command setup

Use Node >=22.5 and the committed npm lockfile. Commands are visible through the
native Codex terminal/tool output; poll long-running commands. The old external
`watch_all.py` is absent and is not required. Do not install a replacement daemon.

If the shell already exposes Node/npm, ordinary npm commands work. Otherwise:

```sh
bash scripts/with-node.sh npm run check
bash scripts/with-node.sh npm run decisions:check
bash scripts/with-node.sh npm test
python3 -B test/claude-usage.test.py
```

The launcher prefers a supported Node on PATH, then the newest compatible installed
NVM runtime. It exports that binary directory only for the requested child command.
It never sources shell profiles, downloads packages or alters global settings.
To choose an exact installed binary:

```sh
CONCORD_NODE=/home/cornholio/.nvm/versions/node/v22.23.2/bin/node bash scripts/with-node.sh npm test
```

An explicit invalid/old CONCORD_NODE fails rather than silently choosing another.
When no supported runtime exists the command stops with an actionable message.
On this audited host Node 22.23.2 and 24.21.0 exist; this observation is not an install
requirement or a guarantee for another host.

HTTP tests bind temporary loopback ports and clean up their fixtures. A sandbox
`listen EPERM` is not an application assertion failure: request the normal per-command
permission for local tests and retain both results. Never relax global isolation.
The full application server is not needed for these checks.

Concord policy is in this checkout's AGENTS.md and referenced records. The missing
global ~/.codex/AGENTS.md is not silently reconstructed from older unrelated prompts.
Project instructions must remain project-local. Fresh-session discovery and
cross-provider authentication remain separately verifiable facts.
