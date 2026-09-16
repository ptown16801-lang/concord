import path from 'node:path';

export function loadConfig(env = process.env) {
  return {
    enabled: env.FINGER_ENABLED !== 'false',
    port: Number.parseInt(env.PORT ?? '3000', 10),
    dataDir: path.resolve(env.FINGER_DATA_DIR ?? '.finger-data'),
    concordVersion: env.CONCORD_VERSION ?? env.GIT_SHA ?? 'development',
    fingerVersion: '0.1.0',
    maxBodyBytes: Number.parseInt(env.FINGER_MAX_BODY_BYTES ?? '10485760', 10),
  };
}
