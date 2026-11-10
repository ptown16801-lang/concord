import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import assert from 'node:assert/strict';
const root=mkdtempSync(join(tmpdir(),'concord-agent-isolation-'));
const secret=join(root,'domain-secret');
writeFileSync(secret,'synthetic protected data',{mode:0o600});
const probe=join(root,'probe.cjs');
writeFileSync(probe,`
const fs=require('node:fs'),net=require('node:net'),assert=require('node:assert/strict');
for(const file of [${JSON.stringify(secret)},'/home/cornholio/projects/concord/package.json']) {
 assert.throws(()=>fs.readFileSync(file),e=>e.code==='ENOENT'||e.code==='EACCES');
 assert.throws(()=>fs.writeFileSync(file,'bypass'),e=>['ENOENT','EACCES','EROFS'].includes(e.code));
}
assert.throws(()=>fs.writeFileSync('/usr/concord-probe','x'),e=>['EROFS','EACCES'].includes(e.code));
const socket=net.connect({host:'127.0.0.1',port:process.env.PROBE_PORT});
socket.on('connect',()=>{console.error('HOST NETWORK BYPASS');process.exit(1);});
socket.on('error',()=>{console.log('PASS: protected paths absent, read-only runtime, host listener unreachable');});
socket.setTimeout(2000,()=>{console.error('Network probe timed out');process.exit(1);});
`);
// Establish a real host listener so refusal inside the namespace proves separation.
const net=await import('node:net');
const server=net.createServer(socket=>socket.end());
await new Promise((resolve,reject)=>{server.on('error',reject);server.listen(0,'127.0.0.1',resolve);});
try {
 const args=['--unshare-all','--die-with-parent','--new-session','--cap-drop','ALL','--ro-bind','/usr','/usr',
 '--symlink','usr/bin','/bin','--symlink','usr/lib','/lib','--symlink','usr/lib64','/lib64','--proc','/proc','--dev','/dev',
 '--tmpfs','/tmp','--ro-bind',process.execPath,'/node','--ro-bind',probe,'/probe.cjs','--clearenv','--setenv','PROBE_PORT',String(server.address().port),'/node','/probe.cjs'];
 const { spawn }=await import('node:child_process');
 const child=spawn('/usr/bin/bwrap',args,{stdio:'inherit'});
 const status=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('exit',(code,signal)=>resolve({code,signal}));});
 assert.equal(status.code,0,'Linux confinement probe failed or host prerequisites unavailable');
 console.log('Scope: one isolated synthetic agent process; no production service IPC, key management or backup policy certified.');
} finally { server.close();rmSync(root,{recursive:true,force:true}); }
