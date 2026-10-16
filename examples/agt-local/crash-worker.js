// Test-only process: terminates at a specified durable boundary.
import { readFileSync } from 'node:fs';
import { GovernanceSandbox, LocalAuditCollector } from '../../src/governance/sandbox/runtime.js';
const config = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const collector = new LocalAuditCollector(config.collector);
const original = collector.record.bind(collector);
collector.record = (id, payload) => {
  if (payload.type === config.crashBeforeType) process.kill(process.pid, 'SIGKILL');
  return original(id, payload);
};
const runtime = new GovernanceSandbox({ ...config.options, collector, clock: () => config.time });
runtime.resume('operation-1');
runtime.close(); collector.close();
