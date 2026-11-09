import { createHash } from 'node:crypto';
import { types } from 'node:util';

export const LIMITS = Object.freeze({ bytes: 1048576, depth: 32, values: 50000, events: 1000, chainEvents: 4000, parents: 8 });
export const SCHEMA = 'concord-propagation-recreated-events/0.1';
export const ENGINE = 'threshold-pilot/0.1';
export const DEFINITION = Object.freeze({ id: 'threshold-demo', version: '0.1', source: 'CON-011', label: 'synthetic arithmetic demonstration' });
export function requireThat(condition, message) { if (!condition) throw new TypeError(message); }

// Inspect descriptors, never invoke caller getters or Proxy traps.
export function canonicalize(input) {
  let bytes = 0, values = 0;
  const active = new Set();
  const emit = (text) => { bytes += Buffer.byteLength(text); requireThat(bytes <= LIMITS.bytes, 'byte limit'); return text; };
  const visit = (v, depth) => {
    requireThat(++values <= LIMITS.values && depth <= LIMITS.depth, 'structural limit');
    if (v === null) return emit('null');
    if (typeof v === 'boolean') return emit(String(v));
    if (typeof v === 'number') {
      requireThat(Number.isSafeInteger(v) && !Object.is(v, -0), 'unsafe number');
      return emit(String(v));
    }
    if (typeof v === 'string') {
      requireThat(v.length <= LIMITS.bytes && v.isWellFormed(), 'invalid string');
      requireThat(Buffer.byteLength(v) <= LIMITS.bytes - bytes, 'byte limit');
      return emit(JSON.stringify(v));
    }
    requireThat(typeof v === 'object' && !types.isProxy(v), 'plain data required');
    requireThat(!active.has(v), 'cycle');
    const array = Array.isArray(v);
    requireThat(Object.getPrototypeOf(v) === (array ? Array.prototype : Object.prototype) || (!array && Object.getPrototypeOf(v) === null), 'custom prototype');
    const keys = Reflect.ownKeys(v);
    requireThat(keys.length <= LIMITS.values - values + (array ? 1 : 0), 'collection limit');
    requireThat(keys.every(k => typeof k === 'string'), 'symbol key');
    const descriptors = Object.getOwnPropertyDescriptors(v);
    for (const k of keys) requireThat('value' in descriptors[k], 'accessor');
    active.add(v);
    let out;
    if (array) {
      requireThat(v.length <= LIMITS.values && keys.length === v.length + 1, 'sparse or extended array');
      const parts = [emit('[')];
      for (let i = 0; i < v.length; i++) {
        requireThat(Object.hasOwn(descriptors, String(i)), 'sparse array');
        if (i) parts.push(emit(','));
        parts.push(visit(descriptors[i].value, depth + 1));
      }
      parts.push(emit(']')); out = parts.join('');
    } else {
      keys.sort(); const parts = [emit('{')];
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        requireThat(descriptors[k].enumerable && k.isWellFormed() && k.length <= LIMITS.bytes, 'invalid property');
        if (i) parts.push(emit(','));
        requireThat(Buffer.byteLength(k) <= LIMITS.bytes - bytes, 'byte limit');
        parts.push(emit(JSON.stringify(k)), emit(':'), visit(descriptors[k].value, depth + 1));
      }
      parts.push(emit('}')); out = parts.join('');
    }
    active.delete(v); return out;
  };
  return visit(input, 0);
}
export const digest = value => createHash('sha256').update(canonicalize(value), 'utf8').digest('hex');
export const copy = value => JSON.parse(canonicalize(value));
export const DEFINITION_DIGEST = digest(DEFINITION);
export function keys(value, expected) {
  requireThat(value !== null && typeof value === 'object' && !Array.isArray(value), 'object required');
  const actual = Object.keys(value).sort(), wanted = [...expected].sort();
  requireThat(actual.length === wanted.length && actual.every((key, i) => key === wanted[i]), 'unexpected fields');
}
export function id(value) { requireThat(typeof value === 'string' && /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(value), 'invalid ID'); }
export function text(value) { requireThat(typeof value === 'string' && value.length > 0 && value.isWellFormed() && Buffer.byteLength(value) <= 2048, 'invalid text'); }
export function hash(value) { requireThat(typeof value === 'string' && /^[a-f0-9]{64}$/.test(value), 'invalid digest'); }
export function count(value) { requireThat(typeof value === 'string' && /^(0|[1-9][0-9]{0,127})$/.test(value), 'invalid count'); return BigInt(value); }
