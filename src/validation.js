// One identifier policy for the population and impeachment/eligibility boundaries.
export const attributable = value => typeof value === 'string' && value.length > 0 && value.length <= 256
  && value === value.trim() && !/[\u0000-\u001f\u007f-\u009f]/.test(value);

export function denseArray(value) {
  if (!Array.isArray(value)) return false;
  for (let i = 0; i < value.length; i++) if (!Object.hasOwn(value, i)) return false;
  return true;
}

// Inspect even unused nested source fields before an adapter can discard them.
export function assertDenseArrays(value, seen = new WeakSet()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value) && !denseArray(value)) {
    const error = new TypeError('Sparse arrays are not source data');
    error.code = 'SPARSE_ARRAY';
    throw error;
  }
  for (const child of Object.values(value)) assertDenseArrays(child, seen);
}
