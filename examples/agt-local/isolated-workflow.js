import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { createFixture } from './fixture.js';

const directory=mkdtempSync(join(tmpdir(),'concord-isolated-workflow-'));
const fixture=await createFixture(directory);
const envelope=fixture.signed(fixture.request());
const agent=join(directory,'agent.cjs');
writeFileSync(agent,`
const fs=require('node:fs'),assert=require('node:assert/strict');
assert.throws(()=>fs.readFileSync(${JSON.stringify(fixture.options.database)}),e=>['ENOENT','EACCES'].includes(e.code));
let data='';process.stdin.setEncoding('utf8');process.stdin.on('data',c=>{data+=c;});
process.stdin.on('end',()=>{const request=JSON.parse(data);process.stdout.write(JSON.stringify(request));});
`);
try {
  // Agent receives one pre-signed synthetic operation through a pipe. It never
  // receives the runtime, store, policy root or collector object.
  const child=spawn('/usr/bin/bwrap',['--unshare-all','--die-with-parent','--new-session','--cap-drop','ALL',
    '--ro-bind','/usr','/usr','--symlink','usr/bin','/bin','--symlink','usr/lib','/lib','--symlink','usr/lib64','/lib64',
    '--proc','/proc','--dev','/dev','--tmpfs','/tmp','--ro-bind',process.execPath,'/node','--ro-bind',agent,'/agent.cjs','--clearenv','/node','/agent.cjs'],
    {stdio:['pipe','pipe','pipe']});
  let output='', errors='';child.stdout.setEncoding('utf8');child.stderr.setEncoding('utf8');
  child.stdout.on('data',chunk=>{output+=chunk;if(output.length>65536)child.kill('SIGKILL');});
  child.stderr.on('data',chunk=>{errors+=chunk;});
  const completion=new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',code=>resolve(code));});
  child.stdin.end(JSON.stringify(envelope));
  assert.equal(await completion,0,errors);
  await fixture.runtime.admit(JSON.parse(output));
  fixture.collector.setAvailable(false);
  assert.equal(fixture.runtime.resume('operation-1').status,'pending');
  assert.equal(fixture.runtime.record('sample/one').version,0);
  fixture.collector.setAvailable(true);
  assert.equal(fixture.runtime.resume('operation-1').status,'committed');
  assert.equal(fixture.runtime.record('sample/one').version,1);
  console.log('PASS: confined agent could not open database; signed request crossed pipe to trusted runtime; audit outage paused execution; recovery committed once.');
  console.log('Scope: isolated agent + trusted local runtime. Separate mediator/authorization/writer processes and authenticated network transport are not deployed.');
} finally {fixture.close();rmSync(directory,{recursive:true,force:true});}
