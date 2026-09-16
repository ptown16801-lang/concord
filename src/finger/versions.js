const DEFAULT_FINGER_VERSION = "1";
const DEFAULT_CONCORD_VERSION = "0.1.0";

export function resolveVersions(environment = process.env) {
  return Object.freeze({
    finger: clean(environment.FINGER_VERSION) ?? DEFAULT_FINGER_VERSION,
    concord:
      clean(environment.CONCORD_BUILD) ??
      clean(environment.CONCORD_VERSION) ??
      DEFAULT_CONCORD_VERSION,
  });
}

function clean(value) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
