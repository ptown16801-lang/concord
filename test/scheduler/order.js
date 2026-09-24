// Opaque identifiers are ordered by UTF-16 code units, independent of host locale.
// Canonically equivalent Unicode strings remain distinct IDs with a total order.
export const compareIds = (left, right) => left < right ? -1 : left > right ? 1 : 0;
export const byId = values => [...values].sort((left, right) => compareIds(left.id, right.id));
