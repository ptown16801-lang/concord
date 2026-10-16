import { parentPort, workerData } from 'node:worker_threads';
import { createRequire } from 'node:module';
import { PolicyEngine, ConflictResolutionStrategy } from '@microsoft/agent-governance-sdk';
import { requireThat, shape, names } from '../../contracts/admission.js';

const sdkRequire = createRequire(import.meta.resolve('@microsoft/agent-governance-sdk'));
const yaml = sdkRequire('js-yaml');

try {
  const raw = yaml.load(workerData.yaml, { schema: yaml.JSON_SCHEMA });
  shape(raw, 'apiVersion name default_action rules');
  requireThat(raw.apiVersion === 'governance.toolkit/v1' && raw.default_action === 'deny');
  names(raw.name);
  requireThat(Array.isArray(raw.rules) && raw.rules.length > 0 && raw.rules.length <= 100);
  const ruleNames = new Set();
  for (const rule of raw.rules) {
    shape(rule, 'name condition effect');
    names(rule.name);
    requireThat(!ruleNames.has(rule.name));
    ruleNames.add(rule.name);
    requireThat(['allow', 'deny'].includes(rule.effect));
    shape(rule.condition, 'action resource purpose');
    for (const value of Object.values(rule.condition)) names(value);
  }
  const engine = new PolicyEngine(undefined, ConflictResolutionStrategy.DenyOverrides);
  engine.loadYaml(workerData.yaml);
  if (!workerData.request) parentPort.postMessage({ valid: true });
  else {
    const { action, resource, purpose } = workerData.request;
    const result = engine.evaluatePolicy(workerData.actorId, { action, resource, purpose });
    parentPort.postMessage({ allowed: result.allowed === true && result.action === 'allow' && typeof result.matchedRule === 'string' });
  }
} catch {
  parentPort.postMessage({ error: 'POLICY_ERROR' });
}
