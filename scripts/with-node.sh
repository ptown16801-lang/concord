#!/usr/bin/env bash
# Local command launcher: use an existing supported Node; never install or source profiles.
set -euo pipefail
compatible() {
  "$1" -e 'const [major,minor]=process.versions.node.split(".").map(Number); process.exit(major>22 || (major===22 && minor>=5) ? 0 : 1)' >/dev/null 2>&1
}
selected=''
if [[ -n "${CONCORD_NODE:-}" ]]; then
  [[ -x "$CONCORD_NODE" ]] && compatible "$CONCORD_NODE" || { echo 'CONCORD_NODE must name a working Node >=22.5 executable.' >&2; exit 1; }
  selected="$CONCORD_NODE"
elif command -v node >/dev/null 2>&1 && compatible "$(command -v node)"; then
  selected="$(command -v node)"
else
  shopt -s nullglob
  candidates=("${NVM_DIR:-$HOME/.nvm}"/versions/node/v*/bin/node)
  if ((${#candidates[@]})); then
    while IFS= read -r candidate; do
      if compatible "$candidate"; then selected="$candidate"; break; fi
    done < <(printf '%s\n' "${candidates[@]}" | sort -Vr)
  fi
fi
[[ -n "$selected" ]] || { echo 'Node >=22.5 is unavailable. Install through your approved runtime setup; no automatic download attempted.' >&2; exit 1; }
export PATH="$(dirname "$selected"):$PATH"
if (($# == 0)); then set -- node --version; fi
exec "$@"
