const $ = id => document.getElementById(id);
const runs = new Map();
let selected, view, busy = false, nextRun = 1;
const labels = { OBSERVE: 'Observation', EVALUATE: 'Evaluation', HOLD: 'Hold', RELEASE: 'Release', NOTE_CORRECTED: 'Correction note' };
function feedback(message, error = false) { $('feedback').textContent = message; $('feedback').classList.toggle('error', error); }
async function request(body) {
  const response = await fetch('/api/propagation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(10000) });
  if (response.status === 404) throw new Error('Open this page in the local propagation preview; the simulation is disabled on this server.');
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? 'The simulation request failed.');
  return result;
}
async function perform(task) {
  if (busy) return;
  busy = true; $('workspace').disabled = true;
  try { await task(); feedback('Simulation updated. Changes are held only in this tab.'); }
  catch (error) { feedback(error.name === 'TimeoutError' ? 'The local preview did not respond. Try again.' : error.message, true); }
  finally { busy = false; $('workspace').disabled = !view; if (view) render(); }
}
function install(result) { view = result; selected = result.run.manifest.runId; runs.set(selected, result.run); }
function limitRuns() { if (runs.size >= 16) throw new Error('This tab has reached 16 runs. Reload to start a fresh session; existing runs will be cleared.'); }
function addText(parent, tag, value) { const node = document.createElement(tag); node.textContent = value; parent.append(node); return node; }
function render() {
  const { run, state, prefix } = view;
  $('run-select').replaceChildren();
  for (const [name, item] of runs) { const o = addText($('run-select'), 'option', `${name} · ${item.manifest.mode}`); o.value = name; }
  $('run-select').value = selected; $('mode').textContent = run.manifest.mode === 'hypothetical' ? 'Hypothetical branch' : 'Synthetic run';
  $('prefix').max = run.events.length; $('prefix').value = prefix; $('position').textContent = `${prefix} / ${run.events.length}`;
  $('history-hint').textContent = prefix === run.events.length ? 'At the latest event.' : 'Viewing history. Return to the latest event to append, or create a branch here.';
  $('stage').textContent = state.stage[0].toUpperCase() + state.stage.slice(1);
  $('observation').textContent = state.observation ? `${state.observation.affirmative} affirmative / ${state.observation.D} denominator${state.observation.corrected ? ' · correction noted' : ''}` : 'Not observed';
  const g = state.guardResult;
  $('guard').textContent = !g ? 'Not evaluated' : g.outcome === 'unresolved' ? 'Unresolved — record an observation' : `${g.outcome === 'satisfied' ? 'Satisfied' : 'Not satisfied'}${g.basis === 'historical-original-inputs' ? ' · historical result using original inputs' : ''}`;
  $('threshold').textContent = g?.threshold ?? '—'; $('hold').textContent = state.holdId ?? 'None';
  $('baseline').textContent = run.manifest.parent ? `Baseline: ${run.manifest.parent.run.manifest.runId}, prefix ${run.manifest.parent.run.events.length}. ${run.manifest.parent.reason}` : 'Original synthetic run; no parent baseline.';
  $('notes').replaceChildren();
  if (!state.corrections.length) addText($('notes'), 'li', 'No correction notes at this position.');
  for (const note of state.corrections) addText($('notes'), 'li', `${note.runId}/${note.targetEventId}: ${note.text} — ${note.reason}`);
  $('timeline').replaceChildren();
  for (let i = 0; i <= run.events.length; i++) {
    const li = addText($('timeline'), 'li', '');
    const button = addText(li, 'button', i ? `${i}. ${labels[run.events[i - 1].kind]} · ${run.events[i - 1].eventId}` : '0. Starting state');
    button.type = 'button'; button.setAttribute('aria-current', String(prefix === i));
    button.addEventListener('click', () => replay(i));
  }
  const previousTarget = $('note-target').value;
  $('note-target').replaceChildren();
  for (const event of run.events.slice(0, prefix).filter(e => e.kind !== 'NOTE_CORRECTED')) {
    const option = addText($('note-target'), 'option', `${event.sequence}. ${labels[event.kind]} · ${event.eventId}`); option.value = event.eventId;
  }
  if ([...$('note-target').options].some(o => o.value === previousTarget)) $('note-target').value = previousTarget;
  const nextObservation = run.events[prefix]?.kind === 'OBSERVE';
  $('change-next').disabled = !nextObservation;
  if (!nextObservation) $('change-next').checked = false;
  $('branch-hint').textContent = nextObservation ? 'The next event is an observation. Select the checkbox to record it as the assumption you are changing.' : 'A branch inherits the selected state. To change counts, select a position before the original observation.';
  updateAction();
}
function updateAction() {
  const kind = $('kind').value;
  $('observation-fields').hidden = kind !== 'OBSERVE'; $('hold-fields').hidden = !['HOLD', 'RELEASE'].includes(kind); $('note-fields').hidden = kind !== 'NOTE_CORRECTED';
  if (!view) return;
  const { state, prefix, run } = view;
  const pending = ['active', 'waiting'].includes(state.stage);
  const allowed = prefix === run.events.length && (kind === 'NOTE_CORRECTED' ? $('note-target').options.length > 0 : kind === 'RELEASE' ? state.stage === 'held' : pending && (kind !== 'OBSERVE' || !state.observation));
  $('append').disabled = !allowed;
  if (kind === 'RELEASE' && state.holdId) $('hold-id').value = state.holdId;
  $('action-hint').textContent = !allowed ? 'This event is unavailable at the selected state or historical position.' : kind === 'EVALUATE' ? 'Evaluation is explicit. Recording an observation or releasing a hold does not evaluate it.' : kind === 'NOTE_CORRECTED' ? 'Only local original events can be annotated. Earlier replay positions retain their original view.' : '';
}
function replay(prefix) { return perform(async () => { install(await request({ action: 'replay', run: runs.get(selected), prefix })); }); }
$('kind').addEventListener('change', updateAction);
$('prefix').addEventListener('change', () => replay(Number($('prefix').value)));
$('run-select').addEventListener('change', () => { const run = runs.get($('run-select').value); perform(async () => install(await request({ action: 'replay', run, prefix: run.events.length }))); });
$('new-run').addEventListener('click', () => perform(async () => { limitRuns(); const runId = `run-${nextRun++}`; install(await request({ action: 'create', options: { runId, propositionRevision: 'demo-1' } })); }));
$('event-form').addEventListener('submit', event => {
  event.preventDefault(); if ($('append').disabled) return;
  perform(async () => {
    const run = view.run, kind = $('kind').value; let payload = {};
    if (kind === 'OBSERVE') payload = { D: $('denominator').value, affirmative: $('affirmative').value };
    if (kind === 'HOLD' || kind === 'RELEASE') payload = { holdId: $('hold-id').value };
    if (kind === 'NOTE_CORRECTED') {
      const target = run.events.find(e => e.eventId === $('note-target').value);
      const head = view.state.corrections.find(n => n.runId === selected && n.targetEventId === target.eventId);
      payload = { targetEventId: target.eventId, targetSequence: target.sequence, targetDigest: view.eventDigests[target.sequence - 1], expectedPreviousCorrectionId: head?.eventId ?? null, reason: $('note-reason').value, text: $('note-text').value };
    }
    const e = { eventId: `e${run.events.length + 1}`, sequence: run.events.length + 1, propositionRevision: run.manifest.propositionRevision, previousEventId: run.events.at(-1)?.eventId ?? null, kind, payload };
    install(await request({ action: 'append', run, event: e }));
  });
});
$('branch-form').addEventListener('submit', event => {
  event.preventDefault(); perform(async () => {
    limitRuns(); const options = { runId: `run-${nextRun++}`, reason: $('branch-reason').value };
    if ($('change-next').checked) options.changeEventId = view.run.events[view.prefix].eventId;
    install(await request({ action: 'fork', run: view.run, prefix: view.prefix, options }));
  });
});
perform(async () => install(await request({ action: 'create', options: { runId: `run-${nextRun++}`, propositionRevision: 'demo-1' } })));
