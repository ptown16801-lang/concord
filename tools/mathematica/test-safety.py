#!/usr/bin/env python3
"""Fresh synthetic fixtures for all five safety remediations. No personal session inspection."""
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
    env.update(WOLFRAM_DIRECT_INVOCATION_ROOT=str(owned),LLMKIT_ENABLED='false',WOLFRAM_DIRECT_REQUEST_SHA256=hashlib.sha256(req.read_bytes()).hexdigest())
    command=['bwrap','--unshare-net','--unshare-pid','--die-with-parent','--dev-bind','/','/','/usr/bin/wolframscript','-file',str(ROOT/'run.wls'),str(req)]
    r=subprocess.run(command,capture_output=True,text=True,env=env,timeout=135)
    (FIX/'retention.stdout').write_text(r.stdout); (FIX/'retention.stderr').write_text(r.stderr)
    check('guarded retention evaluation succeeds',r.returncode==0 and '1/3' in r.stdout)
    check('age count and size sentinels preserved',all(p.exists() and (p.stat().st_size,p.stat().st_mtime_ns)==before[str(p)] for p in sentinels))
    check('new session saved in guarded root',len(list(sessions.glob('*.mx')))>len(sentinels))
    # Direct driver use cannot bypass the non-evaluating dispatcher route.
    notebook=FIX/'driver-read.nb'; marker=FIX/'driver-marker'; notebook.write_text('Put[1,'+json.dumps(str(marker))+'];Notebook[{}]')
    read=request('ReadNotebook',{'notebook':str(notebook)})
    env['WOLFRAM_DIRECT_REQUEST_SHA256']=hashlib.sha256(read.read_bytes()).hexdigest()
    r=subprocess.run(command[:-1]+[str(read)],capture_output=True,text=True,env=env,timeout=135)
    check('direct driver notebook read rejected without side effect',r.returncode==2 and not marker.exists())
    env['WOLFRAM_DIRECT_REQUEST_SHA256']=hashlib.sha256(req.read_bytes()).hexdigest()
    env.pop('WOLFRAM_DIRECT_INVOCATION_ROOT')
    r=subprocess.run(command,capture_output=True,text=True,env=env,timeout=135)
    check('missing state root fails closed',r.returncode==2)

def lifecycle_and_snapshot_tests():
    dispatcher=runpy.run_path(str(ROOT/'wolfram-direct'))
    for detached in [False,True]:
        marker=FIX/('child-'+str(detached)+'.pid')
        child=FIX/('child-'+str(detached)+'.py')
        child.write_text("import os,signal,time,pathlib\n"+("os.setsid()\n" if detached else "")+"signal.signal(signal.SIGTERM,signal.SIG_IGN)\npathlib.Path("+repr(str(marker))+").write_text(os.readlink('/proc/self'))\nwhile True:time.sleep(1)\n")
        leader=FIX/('leader-'+str(detached)+'.py')
        leader.write_text("import subprocess,sys,time\nsubprocess.Popen([sys.executable,"+repr(str(child))+"])\nwhile True:time.sleep(1)\n")
        command=dispatcher['sandbox_command']([sys.executable,str(leader)])
        code=dispatcher['run_job'](command,os.environ.copy(),timeout=0.7,grace=0.4)
        check('timeout returns verified 124 '+str(detached),code==124)
        check('child actually started '+str(detached),marker.exists())
        pid=int(marker.read_text())
        deadline=time.monotonic()+3
        while pathlib.Path('/proc',str(pid)).exists() and time.monotonic()<deadline:time.sleep(.02)
        check('TERM-ignoring child gone, detached='+str(detached),not pathlib.Path('/proc',str(pid)).exists())
    req=request('WolframLanguageEvaluator',{'code':'314159','timeConstraint':10})
    original=req.read_bytes(); owned=FIX/'snapshot-state'
    real=dispatcher['main'].__globals__['run_job']
    def change_source(command,env,pass_fds=(),**kwargs):
        req.write_text(json.dumps({'tool':'WolframLanguageEvaluator','arguments':{'code':'999999','session':'forbidden'}}))
        # Even replacing the retained pathname cannot change the sealed mount.
        snap=pathlib.Path(command[-1]);snap.chmod(0o600);snap.write_text('{}')
        output=FIX/'snapshot.stdout'
        saved=os.dup(1)
        try:
            with output.open('w') as stream:
                os.dup2(stream.fileno(),1)
                result=real(command,env,pass_fds=pass_fds,**kwargs)
        finally: os.dup2(saved,1);os.close(saved)
        check('executed original validated code', '314159' in output.read_text() and '999999' not in output.read_text())
        return result
    with patch.dict(os.environ,{'WOLFRAM_DIRECT_ROOT':str(ROOT),'WOLFRAM_DIRECT_STATE_ROOT':str(owned)}),patch.object(sys,'argv',['wolfram-direct',str(req)]),patch.dict(dispatcher['main'].__globals__,{'run_job':change_source}):
        check('source replacement cannot alter executed request',dispatcher['main']()==0)
    receipt=json.loads(next(owned.glob('run-*/request-receipt.json')).read_text())
    check('validated byte digest retained',receipt['sha256']==hashlib.sha256(original).hexdigest())
    # Driver revalidates arguments even when a caller supplies a matching digest.
    root=pathlib.Path(tempfile.mkdtemp(prefix='run-',dir=FIX));bad=request('WolframLanguageEvaluator',{'code':'1','session':'forbidden'})
    env=os.environ.copy();env.update(LLMKIT_ENABLED='false',WOLFRAM_DIRECT_INVOCATION_ROOT=str(root),WOLFRAM_DIRECT_REQUEST_SHA256=hashlib.sha256(bad.read_bytes()).hexdigest())
    cmd=dispatcher['sandbox_command'](['/usr/bin/wolframscript','-file',str(ROOT/'run.wls'),str(bad)])
    r=subprocess.run(cmd,env=env,capture_output=True,text=True,timeout=135)
    check('driver rejects forbidden keys',r.returncode==2)
    env['WOLFRAM_DIRECT_REQUEST_SHA256']='0'*64
    r=subprocess.run(cmd,env=env,capture_output=True,text=True,timeout=135)
    check('driver rejects mismatched digest',r.returncode==2)

def compatibility_tests():
    env=os.environ.copy();env.update(WOLFRAM_DIRECT_ROOT=str(ROOT),WOLFRAM_DIRECT_STATE_ROOT=str(FIX/'compat-state'))
    def call(name,tool,args,expected=0):
        p=request(tool,args)
        r=subprocess.run([sys.executable,str(ROOT/'wolfram-direct'),str(p)],env=env,capture_output=True,text=True,timeout=135)
        (FIX/(name+'.stdout')).write_text(r.stdout);(FIX/(name+'.stderr')).write_text(r.stderr)
        check(name+' exit',r.returncode==expected)
        return r.stdout
    code=call('inspector','CodeInspector',{'code':'f[x_] := x^2'})
    check('inspector returned actual report',bool(code.strip()))
    symbols=call('symbols','SymbolDefinition',{'symbols':'Sin','maxLength':1000})
    check('symbol definition is present','Sin' in symbols)
    wlt=FIX/'sample.wlt';wlt.write_text('VerificationTest[1+1,2,TestID->"arithmetic"]\n')
    report=call('tests','TestReport',{'paths':str(wlt),'newKernel':False})
    check('test report contains success','Success' in report or 'Succeeded' in report or 'success' in report)
    nb=FIX/'sample-written.nb'
    call('write','WriteNotebook',{'file':str(nb),'markdown':'# Fresh fixture\n\n```wolfram\n2+2\n```','overwrite':False})
    before=hashlib.sha256(nb.read_bytes()).hexdigest()
    data=json.loads(call('read','ReadNotebook',{'notebook':str(nb)}))
    check('static write/read source preserved',data['sha256']==before and 'Fresh fixture' in data['source'] and 'RowBox' in data['source'])
    call('overwrite','WriteNotebook',{'file':str(nb),'markdown':'replace'},2)
    check('overwrite refusal preserves bytes',hashlib.sha256(nb.read_bytes()).hexdigest()==before)
    call('session-key','WolframLanguageEvaluator',{'code':'1','session':'x'},2)
    call('overwrite-type','WriteNotebook',{'file':str(FIX/'new.nb'),'markdown':'x','overwrite':1},2)
    # The original stale test expected malformed notebook text to fail; static inspection intentionally accepts it.
    invalid=FIX/'text-only.nb';invalid.write_text('not a notebook')
    data=json.loads(call('text-only','ReadNotebook',{'notebook':str(invalid)}))
    check('malformed notebook remains unevaluated source',data['source']=='not a notebook' and data['evaluated'] is False)

try:
    static_tests()
    if '--live' in sys.argv:
        live_tests()
        lifecycle_and_snapshot_tests()
        compatibility_tests()
    report={'passed':len(results),'checks':results,'fixture':str(FIX),'live':'--live' in sys.argv,'sources':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in [ROOT/'wolfram-direct',ROOT/'run.wls',pathlib.Path(__file__)]}}
    (FIX/'receipt.json').write_text(json.dumps(report,indent=2)); print(json.dumps(report,indent=2))
except Exception:
    print('Failure evidence retained at '+str(FIX),file=sys.stderr)
    raise
