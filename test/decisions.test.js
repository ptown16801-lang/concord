import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, mkdirSync, copyFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { validate, generateSummary, digest, validateDisposition, preflight } from '../scripts/decisions.mjs';
const source = { S: {location:'owner message',version:'1',date:'Unavailable: archival date',classification:'owner acceptance',scope:'test',relationship:'original',snapshot:'source.md',sha256:digest('evidence')} };
function entry(id='CON-001',status='Accepted',supersedes='None') {return `<a id="${id}"></a>\n### ${id} — Example\n\n- Status: ${status}\n- Scope: Test\n- Acceptance: Owner message\n- Acceptance date: Unavailable: original timestamp missing\n- Sources: [S](source.md)\n- Supersedes: ${supersedes}\n- Implementation: Not implemented\n- Verification: Evidence only\n- Rationale: Example\n\nOperative wording.\n`;}
test('allows explicit unavailable historical date without inventing one',()=>assert.deepEqual(validate(entry(),source),[]));
test('rejects duplicate/malformed IDs and malformed heading',()=>{
 assert.match(validate(entry()+entry(),source).join(),/Duplicate ID/);
 assert.match(validate(entry('CON-1'),source).join(),/Malformed ID/);
 assert.match(validate(entry().replace(' — ',' - '),source).join(),/Malformed decision heading/);
});
test('rejects status, missing source/acceptance fields and unsupported acceptance',()=>{
 for (const [text,reason] of [[entry('CON-001','Done'),'invalid status'],[entry().replace('- Sources: [S](source.md)',''),'missing Sources'],[entry().replace('- Acceptance: Owner message','- Acceptance: Unavailable: no approval'),'without acceptance'],[entry().replace('[S](source.md)','[MISSING](source.md)'),'unknown source']]) assert.ok(validate(text,source).some(e=>e.includes(reason)));
});
test('rejects dangling supersession, live target and cycles',()=>{
 assert.match(validate(entry('CON-001','Accepted','CON-999'),source).join(),/unknown supersession/);
 assert.match(validate(entry('CON-001','Accepted','CON-002')+entry('CON-002'),source).join(),/non-Superseded/);
 assert.match(validate(entry('CON-001','Superseded','CON-002')+entry('CON-002','Superseded','CON-001'),source).join(),/cycle/);
});
test('checks local links, snapshot digests and stable anchors',()=>{
 const root=mkdtempSync(join(tmpdir(),'decisions-links-'));
 try {writeFileSync(join(root,'source.md'),'evidence');assert.deepEqual(validate(entry(),source,root),[]);
 assert.match(validate(entry()+'[bad](missing.md)',source,root).join(),/Broken local link/);
 assert.match(validate(entry()+'[bad](#CON-999)',source,root).join(),/Broken decision reference/);
 assert.match(validate(entry()+'[bad](DECISIONS.md#CON-999)',source,root).join(),/Broken decision reference/);
 assert.deepEqual(validate(entry()+'[summary](CURRENT_DECISIONS.md)',source,root,{allowMissingSummary:true}),[]);
 assert.match(validate(entry()+'[summary](CURRENT_DECISIONS.md)',source,root).join(),/Broken local link/);
 writeFileSync(join(root,'source.md'),'altered');assert.match(validate(entry(),source,root).join(),/digest mismatch/);
 assert.match(validate(entry().replace('<a id="CON-001"></a>',''),source).join(),/missing stable anchor/);
 } finally {rmSync(root,{recursive:true,force:true});}
});
test('summary is deterministic and changes even for body-only edits',()=>{
 assert.equal(generateSummary(entry()),generateSummary(entry()));
 assert.notEqual(generateSummary(entry()),generateSummary(entry().replace('Operative wording.','Changed rule.')));
 assert.ok(generateSummary(entry()).includes(digest(entry())));
});
test('PR disposition requires exactly one explicit choice and valid IDs',()=>{
 const ids=new Set(['CON-001']);
 assert.deepEqual(validateDisposition('Decision impact: No decision change',ids),[]);
 assert.deepEqual(validateDisposition('Decision impact: Updated CON-001',ids),[]);
 for(const body of ['', 'Decision impact: Updated CON-999','Decision impact: Updated CON-001, CON-001','Decision impact: <choose>', 'Decision impact: No decision change\nDecision impact: Updated CON-001']) assert.ok(validateDisposition(body,ids).length);
});
test('preserves recovered workflow IDs across master, summary and PR disposition',()=>{
 const id='CONCORD-WF-002';
 assert.deepEqual(validate(entry(id),source),[]);
 assert.ok(generateSummary(entry(id)).includes(`DECISIONS.md#${id}`));
 assert.deepEqual(validateDisposition(`Decision impact: Updated CON-001, ${id}`,new Set(['CON-001',id])),[]);
 for(const bad of ['CONCORD-WF-2','OTHER-WF-002',`${id},CON-001`,`${id}, ${id}`]) {
  assert.ok(validateDisposition(`Decision impact: Updated ${bad}`,new Set([id,'CON-001',bad])).length);
 }
 assert.match(validate(entry('CONCORD-WF-2'),source).join(),/Malformed ID/);
});
test('preflight rejects moved HEAD and moved canonical reference; offline is explicit',()=>{
 const root=mkdtempSync(join(tmpdir(),'decisions-git-'));
 const git=(...a)=>execFileSync('git',a,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 try {git('init','-b','test');git('config','user.name','Decision Test');git('config','user.email','test@example.invalid');writeFileSync(join(root,'a'),'a');git('add','a');git('commit','-m','one');const first=git('rev-parse','HEAD');git('update-ref','refs/remotes/origin/Develo',first);
 assert.match(preflight(root,first,first,true),/OFFLINE/);
 assert.throws(()=>preflight(root,'0'.repeat(40),first,true),/HEAD moved/);
 assert.throws(()=>preflight(root,first,'0'.repeat(40),true),/Canonical tracking revision moved/);
 assert.throws(()=>preflight(root,'short',first,true),/full/);
 } finally {rmSync(root,{recursive:true,force:true});}
});

test('CLI regenerates a missing summary and rejects body drift and missing PR disposition',()=>{
 const root=mkdtempSync(join(tmpdir(),'decisions-cli-'));
 const run=(...args)=>execFileSync(process.execPath,[join(root,'scripts/decisions.mjs'),...args],{stdio:['ignore','pipe','pipe'],encoding:'utf8'});
 try {
  mkdirSync(join(root,'scripts'));mkdirSync(join(root,'docs/decisions'),{recursive:true});
  copyFileSync(new URL('../scripts/decisions.mjs',import.meta.url),join(root,'scripts/decisions.mjs'));
  writeFileSync(join(root,'DECISIONS.md'),entry()+'[summary](CURRENT_DECISIONS.md)');
  writeFileSync(join(root,'source.md'),'evidence');
  writeFileSync(join(root,'docs/decisions/sources.json'),JSON.stringify(source));
  run('generate');run('check');const initial=readFileSync(join(root,'CURRENT_DECISIONS.md'),'utf8');
  run('generate');assert.equal(readFileSync(join(root,'CURRENT_DECISIONS.md'),'utf8'),initial);
  writeFileSync(join(root,'DECISIONS.md'),entry().replace('Operative wording.','Changed rule.')+'[summary](CURRENT_DECISIONS.md)');
  assert.throws(()=>run('check'),e=>e.status===1);
  run('generate');run('check');
  writeFileSync(join(root,'event.json'),JSON.stringify({pull_request:{body:'No disposition'}}));
  assert.throws(()=>run('disposition',join(root,'event.json')),e=>e.status===1);
 } finally {rmSync(root,{recursive:true,force:true});}
});
