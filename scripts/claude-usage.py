#!/usr/bin/env python3
"""Import usage metadata only; never invoke Claude or read credential files."""
import argparse
import json
import pathlib
import sqlite3

FIELDS = ('input_tokens', 'cache_creation_input_tokens', 'cache_read_input_tokens', 'output_tokens')

def collect(projects, ledger):
    projects = pathlib.Path(projects)
    if not projects.is_dir():
        raise ValueError("Source directory unavailable; usage is UNKNOWN")
    ledger = pathlib.Path(ledger)
    ledger.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(ledger) as db:
        db.execute('CREATE TABLE IF NOT EXISTS usage (session TEXT, request TEXT, model TEXT, project TEXT, timestamp TEXT, input_tokens INTEGER, cache_creation_input_tokens INTEGER, cache_read_input_tokens INTEGER, output_tokens INTEGER, PRIMARY KEY(session,request))')
        malformed = 0
        for path in pathlib.Path(projects).glob('*/*.jsonl'):
            # Claude encodes absolute cwd in the parent directory name.
            if 'concord' not in path.parent.name.lower():
                continue
            with path.open() as source:
                for line in source:
                    try:
                        row = json.loads(line)
                    except json.JSONDecodeError:
                        malformed += 1
                        continue
                    msg = row.get('message') or {}
                    if not isinstance(msg, dict) or not isinstance(msg.get('usage'), dict):
                        continue
                    request = msg.get('id')
                    if not request:
                        continue
                    usage = msg['usage']
                    values = [usage.get(k) for k in FIELDS]
                    if any(v is not None and (not isinstance(v, int) or isinstance(v, bool) or v < 0) for v in values):
                        raise ValueError('Invalid usage counters; retained ledger unchanged for this import')
                    db.execute('INSERT INTO usage VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(session,request) DO UPDATE SET input_tokens=nullif(max(coalesce(input_tokens,-1),coalesce(excluded.input_tokens,-1)),-1), cache_creation_input_tokens=nullif(max(coalesce(cache_creation_input_tokens,-1),coalesce(excluded.cache_creation_input_tokens,-1)),-1), cache_read_input_tokens=nullif(max(coalesce(cache_read_input_tokens,-1),coalesce(excluded.cache_read_input_tokens,-1)),-1), output_tokens=nullif(max(coalesce(output_tokens,-1),coalesce(excluded.output_tokens,-1)),-1)',
                               (path.stem, request, msg.get('model', 'UNKNOWN'), path.parent.name, row.get('timestamp'), *values))
        totals = db.execute('SELECT count(DISTINCT session), count(*), '+','.join('CASE WHEN count(*)=0 OR count('+k+')<count(*) THEN NULL ELSE sum('+k+') END' for k in FIELDS)+' FROM usage').fetchone()
        by_session = [dict(zip(('session','model','requests',*FIELDS), r)) for r in db.execute('SELECT session,model,count(*),'+','.join('CASE WHEN count('+k+')<count(*) THEN NULL ELSE sum('+k+') END' for k in FIELDS)+' FROM usage GROUP BY session,model')]
    return dict(scope='Concord-named local Claude project logs only; not account totals', sessions=totals[0], requests=totals[1], totals=dict(zip(FIELDS,totals[2:])), by_session=by_session, malformed_lines=malformed, allowance_effect='Observations only; does not reserve, settle or reset the shared allowance', coverage='PARTIAL: top-level Concord-named projects only; nested agent logs excluded; manual objective attribution required; never sufficient for allowance admission', unknown='Missing counters are null, not zero. Legacy rows cannot prove whether old zeros were observed; reconcile original logs before settlement. Other devices, deleted/unavailable logs, Codex/research/review usage, subscription percentage and task attribution not supplied by logs')

if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--projects', default=str(pathlib.Path.home()/'.claude/projects'))
    p.add_argument('--ledger', required=True, help='Use the same durable ledger for every worktree and retry')
    a = p.parse_args()
    print(json.dumps(collect(a.projects, a.ledger), indent=2))
