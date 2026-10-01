#!/usr/bin/env python3
"""Fresh synthetic fixtures for A01/A02 only. No personal session inspection."""
import hashlib, json, os, pathlib, runpy, subprocess, sys, tempfile, time
from unittest.mock import patch

ROOT=pathlib.Path(__file__).resolve().parent
FIX=pathlib.Path(tempfile.mkdtemp(prefix='mathematica-safety-'))
results=[]
def check(name, condition):
    if not condition: raise AssertionError(name)
    results.append(name)
def request(tool,arguments):
    p=FIX/('request-'+str(len(list(FIX.glob('request-*'))))+'.json')
    p.write_text(json.dumps({'tool':tool,'arguments':arguments}))
    return p

def static_tests():
    dispatcher=runpy.run_path(str(ROOT/'wolfram-direct'))
    marker=FIX/'never-created.txt'; notebook=FIX/'untrusted.nb'
    source='Put["unexpected", '+json.dumps(str(marker))+']; Notebook[{Cell["Hello", "Text"]}]\n'
    notebook.write_text(source); before=hashlib.sha256(notebook.read_bytes()).hexdigest()
    req=request('ReadNotebook',{'notebook':str(notebook)})
    from io import StringIO
    output=StringIO()
    with patch.object(sys,'argv',['wolfram-direct',str(req)]), patch('subprocess.Popen',side_effect=AssertionError('kernel must not launch')), patch('sys.stdout',output):
        check('static read returned success without subprocess',dispatcher['main']()==0)
    response=json.loads(output.getvalue())
    check('source exact, explicitly not evaluated or validated',response['source']==source and response['evaluated'] is False and response['structureValidated'] is False)
    check('source hash unchanged and no side effect',response['sha256']==before==hashlib.sha256(notebook.read_bytes()).hexdigest() and not marker.exists())
    for data, expected in [(b'Not a notebook expression',True),(b'\xff',False)]:
        notebook.write_bytes(data); req=request('ReadNotebook',{'notebook':str(notebook)})
        r=subprocess.run([sys.executable,str(ROOT/'wolfram-direct'),str(req)],capture_output=True,text=True)
        check('static malformed text inspected / invalid UTF8 rejected '+str(expected),(r.returncode==0)==expected)
    fifo=FIX/'pipe.nb'; os.mkfifo(fifo)
    req=request('ReadNotebook',{'notebook':str(fifo)})
    r=subprocess.run([sys.executable,str(ROOT/'wolfram-direct'),str(req)],capture_output=True,text=True,timeout=3)
    check('nonregular file rejected without blocking',r.returncode==2)
    driver=(ROOT/'run.wls').read_text()
    check('driver has no NB import path','"NB"' not in driver and 'static-source reader' in driver)

def live_tests():
    state=FIX/'owned-runs'; env=os.environ.copy()
    env.update(WOLFRAM_DIRECT_ROOT=str(ROOT),WOLFRAM_DIRECT_STATE_ROOT=str(state))
    req=request('WolframLanguageEvaluator',{'code':'{2+2, Integrate[x^2,{x,0,1}]}','timeConstraint':10})
    for i in range(2):
        r=subprocess.run([sys.executable,str(ROOT/'wolfram-direct'),str(req)],capture_output=True,text=True,env=env,timeout=135)
        (FIX/f'evaluation-{i}.stdout').write_text(r.stdout); (FIX/f'evaluation-{i}.stderr').write_text(r.stderr)
        check('trusted calculation '+str(i),r.returncode==0 and '4' in r.stdout and '1/3' in r.stdout)
    roots=list(state.glob('run-*'))
    check('separate retained invocation roots',len(roots)==2 and all(list(p.rglob('*.mx')) for p in roots))
    # Seed a new guarded root, never the shared upstream session directory.
    owned=pathlib.Path(tempfile.mkdtemp(prefix='run-',dir=FIX)); sessions=owned/'Sessions'; sessions.mkdir()
    sentinels=[]
    for i in range(102):
        p=sessions/f'old-{i}.mx'; p.write_bytes(b'synthetic sentinel'); os.utime(p,(946684800,946684800)); sentinels.append(p)
    sparse=sessions/'large.mx'
    with sparse.open('wb') as f: f.truncate(1073741825)
    os.utime(sparse,(946684800,946684800)); sentinels.append(sparse)
    before={str(p):(p.stat().st_size,p.stat().st_mtime_ns) for p in sentinels}
    env.update(WOLFRAM_DIRECT_INVOCATION_ROOT=str(owned),LLMKIT_ENABLED='false')
    command=['bwrap','--unshare-net','--die-with-parent','--dev-bind','/','/','/usr/bin/wolframscript','-file',str(ROOT/'run.wls'),str(req)]
    r=subprocess.run(command,capture_output=True,text=True,env=env,timeout=135)
    (FIX/'retention.stdout').write_text(r.stdout); (FIX/'retention.stderr').write_text(r.stderr)
    check('guarded retention evaluation succeeds',r.returncode==0 and '1/3' in r.stdout)
    check('age count and size sentinels preserved',all(p.exists() and (p.stat().st_size,p.stat().st_mtime_ns)==before[str(p)] for p in sentinels))
    check('new session saved in guarded root',len(list(sessions.glob('*.mx')))>len(sentinels))
    # Direct driver use cannot bypass the non-evaluating dispatcher route.
    notebook=FIX/'driver-read.nb'; marker=FIX/'driver-marker'; notebook.write_text('Put[1,'+json.dumps(str(marker))+'];Notebook[{}]')
    read=request('ReadNotebook',{'notebook':str(notebook)})
    r=subprocess.run(command[:-1]+[str(read)],capture_output=True,text=True,env=env,timeout=135)
    check('direct driver notebook read rejected without side effect',r.returncode==2 and not marker.exists())
    env.pop('WOLFRAM_DIRECT_INVOCATION_ROOT')
    r=subprocess.run(command,capture_output=True,text=True,env=env,timeout=135)
    check('missing state root fails closed',r.returncode==2)

try:
    static_tests()
    if '--live' in sys.argv: live_tests()
    report={'passed':len(results),'checks':results,'fixture':str(FIX),'live':'--live' in sys.argv}
    (FIX/'receipt.json').write_text(json.dumps(report,indent=2)); print(json.dumps(report,indent=2))
except Exception:
    print('Failure evidence retained at '+str(FIX),file=sys.stderr)
    raise
