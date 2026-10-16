import { ImpeachmentStore } from '../src/governance/impeachment-store.js';
const [filename, commandId] = process.argv.slice(2);
const store = new ImpeachmentStore(filename);
process.send('ready');
process.once('message', () => {
  try {
    store.transact({ stream: 'competing', commandId, expectedVersion: 0 }, { id: 'writer' }, () => [{ type: 'CLAIM' }]);
    process.send('committed');
  } catch (e) { process.send(e.code ?? e.message); }
  finally { store.close(); process.disconnect(); }
});
