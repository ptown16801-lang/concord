# Direct local Mathematica adapter — safety remediation

This trusted-local-code adapter reuses installed Mathematica 15 and AgentTools
2.2.0. It starts no MCP server, downloads no packages and invokes no provider.
The configured installed loader path is host-specific; no Wolfram binaries,
licenses, private notebooks or saved sessions are included here.

This branch carries the direct adapter because its earlier integration was not
on Develo. Unrelated System Modeler and project-governance work is excluded.

## First remediation batch: JON-238 / JON-239

ReadNotebook returns static UTF-8 source and its SHA-256 without starting a kernel
or evaluating expressions. It does not render or validate notebook structure.
The driver refuses direct notebook reads and does not import generated notebook
expressions for post-write validation.

Each kernel invocation creates separate retained session storage. The driver
redirects AgentTools state and disables automatic age/count/size pruning. No
shared session continuation is supported. State is retained without deletion;
monitor disk use and obtain explicit authorization before cleanup.

Producer and fresh non-authoring reviewer each passed all 15 safety checks.
Notebook writing/static readback and overwrite refusal also passed independent
checks. Installed user-local copies were backed up and matched reviewed source;
installed-path inspection and exact calculation checks passed. The technical
review does not establish final qualifying acceptance under CON-070.

Run from any directory with existing host prerequisites:

```sh
python3 /absolute/checkout/tools/mathematica/test-safety.py
python3 /absolute/checkout/tools/mathematica/test-safety.py --live
```

Fixtures use fresh owned temporary directories and are retained as evidence.
Live checks preserve Bubblewrap network isolation and require normal host
permission to create namespaces. Do not retry without isolation.

JON-240 (timeout cleanup), JON-241 (request consistency), and JON-242 (older test
entry points) remain pending in this first batch. Broader-use clearance is not
claimed. No merge or deployment is requested.

Decision impact: No decision change
