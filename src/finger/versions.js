const DEFAULT_FINGER_VERSION = "1";
const DEFAULT_CONCORD_VERSION = "0.1.0";

export function resolveVersions(environment = process.env) {
  const concordVersion =
    clean(environment.CONCORD_VERSION) ?? DEFAULT_CONCORD_VERSION;
  const concordBuild = clean(environment.CONCORD_BUILD) ?? concordVersion;
  return Object.freeze({
    finger: clean(environment.FINGER_VERSION) ?? DEFAULT_FINGER_VERSION,
    concord: concordBuild,
    concordVersion,
    concordBuild,
  });
}

function clean(value) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
