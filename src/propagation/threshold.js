import { count, requireThat } from './contracts.js';

export function evaluateThreshold(D, affirmative) {
  const denominator = count(D), yes = count(affirmative);
  requireThat(yes <= denominator, 'affirmative exceeds denominator');
  const threshold = (3n * denominator + 4n) / 5n;
  return { D, affirmative, threshold: String(threshold), outcome: denominator > 0n && yes >= threshold ? 'satisfied' : 'not-satisfied' };
}
