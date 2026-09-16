import path from 'node:path';

function integer(value, name, { minimum, maximum }) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new RangeError(`${name} must be an integer from ${minimum} to ${maximum}`);
  }
  return parsed;
}

export function loadConfig(env = process.env) {
  return {
    enabled: env.FINGER_ENABLED !== 'false',
    port: integer(env.PORT ?? '3000', 'PORT', { minimum: 1, maximum: 65535 }),
    dataDir: path.resolve(env.FINGER_DATA_DIR ?? '.finger-data'),
    concordVersion: env.CONCORD_VERSION ?? env.GIT_SHA ?? 'development',
    fingerVersion: '0.1.0',
    maxBodyBytes: integer(env.FINGER_MAX_BODY_BYTES ?? '10485760', 'FINGER_MAX_BODY_BYTES', {
      minimum: 1024,
      maximum: 104857600,
    }),
    trustConcordUserHeader: env.FINGER_TRUST_CONCORD_USER_HEADER === 'true',
  };
}
