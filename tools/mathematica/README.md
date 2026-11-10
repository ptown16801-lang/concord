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

## Remaining remediation batch: JON-240–242

Timeout cleanup uses an owned process group and PID namespace, including detached
children that ignore TERM. Request execution uses the exact validated byte buffer,
a sealed memory-backed mount and a driver digest/argument check.

`test-safety.py` is the canonical regression entry point for all five repairs.
It creates its own notebook, request, test and retained-session fixtures. Historical
`test-local.py` and `test-boundaries.py` in the original integration evidence are
superseded audit evidence, not current regression entry points. No existing sample
notebook or fixed temporary directory is required. Explicit checks also run under
Python optimization. Live checks include inspection, symbol definitions, test
reports, notebook write/static readback, overwrite refusal, timeout descendants,
request replacement and session retention.

Final producer suite: 41/41 passed twice from outside the checkout, including
`PYTHONOPTIMIZE=1`. Fresh non-authoring review: technical PASS with 22 focused
checks and no blocking findings. Exact source hashes, checks and review limits
are retained in [the verification receipt](verification-20261001.json).

Broader-use clearance is not claimed. No merge or deployment is requested.

Decision impact: No decision change
