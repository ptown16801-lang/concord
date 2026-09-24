import { DatabaseSync } from 'node:sqlite';
import { createPublicKey, verify, randomUUID } from 'node:crypto';
import { canonical, digest, requestSchema, shape, names, VERSION } from '../../../contracts/admission.js';
import { createAdmissionKernel } from '../agt-adapter.js';

function demand(ok, code) { if (!ok) throw Object.assign(new Error(code), { code }); }
function copy(value) { return JSON.parse(canonical(value)); }
function transaction(db, fn) {
  db.exec('BEGIN IMMEDIATE');
  try { const value = fn(); db.exec('COMMIT'); return value; }
  catch (error) { db.exec('ROLLBACK'); throw error; }
}
function open(path) {
  const db = new DatabaseSync(path);
  db.exec('PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=1000;');
  return db;
}

/** A separate durable synthetic audit collector. Not a remote availability protocol. */
export class LocalAuditCollector {
  constructor(path) {
    this.db = open(path);
    this.available = true;
    this.db.exec(`CREATE TABLE IF NOT EXISTS receipts (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
      CREATE TRIGGER IF NOT EXISTS receipts_no_replace BEFORE INSERT ON receipts WHEN EXISTS (SELECT 1 FROM receipts WHERE id=NEW.id) BEGIN SELECT RAISE(ABORT,'immutable receipt'); END;
      CREATE TRIGGER IF NOT EXISTS receipts_no_rowid_replace BEFORE INSERT ON receipts WHEN EXISTS (SELECT 1 FROM receipts WHERE rowid=NEW.rowid) BEGIN SELECT RAISE(ABORT,'immutable receipt'); END;
      CREATE TRIGGER IF NOT EXISTS receipts_no_update BEFORE UPDATE ON receipts BEGIN SELECT RAISE(ABORT,'immutable receipt'); END;
      CREATE TRIGGER IF NOT EXISTS receipts_no_delete BEFORE DELETE ON receipts BEGIN SELECT RAISE(ABORT,'immutable receipt'); END;`);
  }
  setAvailable(value) { this.available = Boolean(value); }
  record(id, payload) {
    demand(this.available, 'COLLECTOR_UNAVAILABLE');
    const text = canonical(payload);
    transaction(this.db, () => {
      const existing = this.db.prepare('SELECT payload FROM receipts WHERE id=?').get(id);
      if (existing) demand(existing.payload === text, 'AUDIT_CONFLICT');
      else this.db.prepare('INSERT INTO receipts VALUES (?,?)').run(id, text);
    });
  }
  // Lock/check the real local collector before protected execution. This is not
  // a claim of a distributed transaction between the two databases.
  whileAvailable(fn) {
    demand(this.available, 'COLLECTOR_UNAVAILABLE');
    return transaction(this.db, fn);
  }
  entries() { return this.db.prepare('SELECT id,payload FROM receipts ORDER BY id').all().map(r => ({ id: r.id, payload: JSON.parse(r.payload) })); }
  close() { this.db.close(); }
}

/** Trusted composition boundary for ONE synthetic domain; never hand it to agent code. */
export class GovernanceSandbox {
  constructor({ database, domain, audience, trustRoots, collector, evaluators = [], clock = Date.now }) {
    names(domain); names(audience);
    demand(collector instanceof LocalAuditCollector, 'COLLECTOR_REQUIRED');
    demand(Array.isArray(evaluators) && evaluators.every(e => typeof e === 'function'), 'INVALID_EVALUATOR');
    this.db = open(database); this.domain = domain; this.audience = audience;
    this.clock = clock; this.collector = collector; this.evaluators = [...evaluators];
    this.roots = copy(trustRoots); this.kernel = null; this.bundle = null; this.policyEpoch = 0;
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS actors (id TEXT PRIMARY KEY, public_key TEXT NOT NULL, grants TEXT NOT NULL, expires INTEGER NOT NULL, active INTEGER NOT NULL, revision INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS challenges (id TEXT PRIMARY KEY, actor TEXT NOT NULL, used INTEGER NOT NULL DEFAULT 0);
      CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY, version INTEGER NOT NULL, value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS operations (id TEXT PRIMARY KEY, request TEXT NOT NULL, digest TEXT NOT NULL, actor TEXT NOT NULL, status TEXT NOT NULL, evidence TEXT NOT NULL, result TEXT);
      CREATE TABLE IF NOT EXISTS reservations (resource TEXT PRIMARY KEY, operation TEXT NOT NULL UNIQUE REFERENCES operations(id));
      CREATE TABLE IF NOT EXISTS audit (sequence INTEGER PRIMARY KEY, id TEXT NOT NULL UNIQUE, payload TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS delivered (id TEXT PRIMARY KEY REFERENCES audit(id));
      CREATE TABLE IF NOT EXISTS policy_archive (digest TEXT PRIMARY KEY, bundle TEXT NOT NULL);
      CREATE TRIGGER IF NOT EXISTS approval_no_replace BEFORE INSERT ON operations WHEN EXISTS (SELECT 1 FROM operations WHERE id=NEW.id) BEGIN SELECT RAISE(ABORT,'immutable approval'); END;
      CREATE TRIGGER IF NOT EXISTS approval_no_rowid_replace BEFORE INSERT ON operations WHEN EXISTS (SELECT 1 FROM operations WHERE rowid=NEW.rowid) BEGIN SELECT RAISE(ABORT,'immutable approval'); END;
      CREATE TRIGGER IF NOT EXISTS approval_id_immutable BEFORE UPDATE OF id ON operations BEGIN SELECT RAISE(ABORT,'immutable approval'); END;
      CREATE TRIGGER IF NOT EXISTS audit_no_replace BEFORE INSERT ON audit WHEN EXISTS (SELECT 1 FROM audit WHERE id=NEW.id OR sequence=NEW.sequence) BEGIN SELECT RAISE(ABORT,'immutable audit'); END;
      CREATE TRIGGER IF NOT EXISTS reservation_no_replace BEFORE INSERT ON reservations WHEN EXISTS (SELECT 1 FROM reservations WHERE resource=NEW.resource OR operation=NEW.operation) BEGIN SELECT RAISE(ABORT,'immutable reservation'); END;
      CREATE TRIGGER IF NOT EXISTS reservation_no_rowid_replace BEFORE INSERT ON reservations WHEN EXISTS (SELECT 1 FROM reservations WHERE rowid=NEW.rowid) BEGIN SELECT RAISE(ABORT,'immutable reservation'); END;
      CREATE TRIGGER IF NOT EXISTS policy_archive_no_update BEFORE UPDATE ON policy_archive BEGIN SELECT RAISE(ABORT,'immutable policy'); END;
      CREATE TRIGGER IF NOT EXISTS policy_archive_no_delete BEFORE DELETE ON policy_archive BEGIN SELECT RAISE(ABORT,'immutable policy'); END;
      CREATE TRIGGER IF NOT EXISTS policy_archive_no_replace BEFORE INSERT ON policy_archive WHEN EXISTS (SELECT 1 FROM policy_archive WHERE digest=NEW.digest) BEGIN SELECT RAISE(ABORT,'immutable policy'); END;
      CREATE TRIGGER IF NOT EXISTS policy_archive_no_rowid_replace BEFORE INSERT ON policy_archive WHEN EXISTS (SELECT 1 FROM policy_archive WHERE rowid=NEW.rowid) BEGIN SELECT RAISE(ABORT,'immutable policy'); END;
      CREATE TRIGGER IF NOT EXISTS approval_immutable BEFORE UPDATE OF request,digest,actor,evidence ON operations BEGIN SELECT RAISE(ABORT,'immutable approval'); END;
      CREATE TRIGGER IF NOT EXISTS approval_no_delete BEFORE DELETE ON operations BEGIN SELECT RAISE(ABORT,'approved actions cannot be canceled'); END;
      CREATE TRIGGER IF NOT EXISTS operation_transition BEFORE UPDATE OF status ON operations WHEN OLD.status != 'pending' OR NEW.status != 'committed' BEGIN SELECT RAISE(ABORT,'invalid operation transition'); END;
      CREATE TRIGGER IF NOT EXISTS operation_result_immutable BEFORE UPDATE OF result ON operations WHEN OLD.status != 'pending' OR NEW.status != 'committed' OR NEW.result IS NULL BEGIN SELECT RAISE(ABORT,'immutable result'); END;
      CREATE TRIGGER IF NOT EXISTS operation_result_required BEFORE UPDATE OF status ON operations WHEN NEW.status = 'committed' AND NEW.result IS NULL BEGIN SELECT RAISE(ABORT,'committed result required'); END;
      CREATE TRIGGER IF NOT EXISTS audit_no_update BEFORE UPDATE ON audit BEGIN SELECT RAISE(ABORT,'immutable audit'); END;
      CREATE TRIGGER IF NOT EXISTS audit_no_delete BEFORE DELETE ON audit BEGIN SELECT RAISE(ABORT,'immutable audit'); END;
    `);
    const previous = this.db.prepare("SELECT value FROM meta WHERE key='domain'").get();
    if (previous && previous.value !== canonical({ domain, audience })) { this.db.close(); demand(false, 'DATABASE_DOMAIN_MISMATCH'); }
    this.db.prepare("INSERT OR IGNORE INTO meta VALUES ('domain',?)").run(canonical({ domain, audience }));
  }
  now() {
    const time = this.clock(); demand(Number.isSafeInteger(time), 'INVALID_CLOCK');
    const prior = this.db.prepare("SELECT value FROM meta WHERE key='clock'").get();
    demand(!prior || time >= Number(prior.value), 'CLOCK_ROLLBACK');
    this.db.prepare("INSERT INTO meta VALUES ('clock',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(String(time));
    return time;
  }
  // Administrative methods: only the synthetic bootstrap or trusted operator calls these.
  registerActor({ id, publicKey, grants, expiresAt }) {
    names(id); demand(Number.isSafeInteger(expiresAt), 'INVALID_EXPIRY');
    demand(createPublicKey(publicKey).asymmetricKeyType === 'ed25519', 'INVALID_KEY');
    demand(Array.isArray(grants) && grants.every(g => {
      shape(g, 'action resource purpose'); Object.values(g).forEach(names); return ['sample.read', 'sample.write'].includes(g.action);
    }), 'INVALID_GRANTS');
    this.db.prepare('INSERT INTO actors VALUES (?,?,?,?,1,1)').run(id, publicKey, canonical(grants), expiresAt);
  }
  revoke(id) { this.db.prepare('UPDATE actors SET active=0,revision=revision+1 WHERE id=?').run(id); }
  suspend(id) { this.revoke(id); }
  rotateActorKey(id, publicKey) {
    demand(createPublicKey(publicKey).asymmetricKeyType === 'ed25519', 'INVALID_KEY');
    demand(this.db.prepare('UPDATE actors SET public_key=?,revision=revision+1 WHERE id=?').run(publicKey, id).changes === 1, 'UNKNOWN_ACTOR');
  }
  seed(resource, value) { names(resource); this.db.prepare('INSERT INTO records VALUES (?,0,?)').run(resource, canonical(value)); }
  challenge(actor) {
    const row = this.db.prepare('SELECT * FROM actors WHERE id=?').get(actor);
    demand(row?.active && this.now() < row.expires, 'IDENTITY_DENIED');
    const nonce = randomUUID(); this.db.prepare('INSERT INTO challenges(id,actor) VALUES (?,?)').run(nonce, actor); return nonce;
  }
  async installPolicy(bundle) {
    const epoch = ++this.policyEpoch; this.kernel = null; this.bundle = null;
    this.db.prepare("INSERT INTO meta VALUES ('policySealed','1') ON CONFLICT(key) DO UPDATE SET value='1'").run();
    const candidate = copy(bundle);
    const high = this.db.prepare("SELECT value FROM meta WHERE key='generation'").get();
    if (high && candidate.manifest?.generation <= Number(high.value)) return { decision: 'deny', code: 'POLICY_ROLLBACK' };
    const kernel = this.makeKernel(candidate);
    const installed = await kernel.installPolicy(candidate);
    if (epoch !== this.policyEpoch) return { decision: 'deny', code: 'POLICY_CHANGED' };
    if (installed.decision === 'installed') {
      transaction(this.db, () => {
        this.archivePolicy(candidate);
        this.db.prepare("INSERT INTO meta VALUES ('generation',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(String(candidate.manifest.generation));
        this.db.prepare("INSERT INTO meta VALUES ('policy',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(canonical(candidate));
        this.db.prepare("UPDATE meta SET value='0' WHERE key='policySealed'").run();
      });
      this.kernel = kernel; this.bundle = candidate;
    }
    return installed;
  }
  async restorePolicy() {
    const epoch = ++this.policyEpoch; this.kernel = null; this.bundle = null;
    if (this.db.prepare("SELECT value FROM meta WHERE key='policySealed'").get()?.value === '1') return { decision: 'deny', code: 'POLICY_SEALED' };
    const row = this.db.prepare("SELECT value FROM meta WHERE key='policy'").get();
    if (!row) return { decision: 'deny', code: 'POLICY_UNAVAILABLE' };
    const bundle = JSON.parse(row.value);
    const generation = Number(this.db.prepare("SELECT value FROM meta WHERE key='generation'").get()?.value);
    if (bundle.manifest?.generation !== generation) return { decision: 'deny', code: 'POLICY_ROLLBACK' };
    const kernel = this.makeKernel(bundle);
    const result = await kernel.installPolicy(bundle);
    if (epoch !== this.policyEpoch) return { decision: 'deny', code: 'POLICY_CHANGED' };
    if (result.decision === 'installed') { this.archivePolicy(bundle); this.kernel = kernel; this.bundle = bundle; }
    return result;
  }
  archivePolicy(bundle) {
    const id = digest(bundle), bytes = canonical(bundle);
    const existing = this.db.prepare('SELECT bundle FROM policy_archive WHERE digest=?').get(id);
    if (existing) demand(existing.bundle === bytes, 'POLICY_ARCHIVE_CONFLICT');
    else this.db.prepare('INSERT INTO policy_archive VALUES (?,?)').run(id, bytes);
    return id;
  }
  archivedPolicy(id) {
    const row = this.db.prepare('SELECT bundle FROM policy_archive WHERE digest=?').get(id);
    return row ? JSON.parse(row.bundle) : null;
  }
  makeKernel(bundle) {
    return createAdmissionKernel({ domain: this.domain, audience: this.audience,
      actions: ['sample.read', 'sample.write'], trustRoots: this.roots, clock: () => this.now(),
      // Individual admission calls create their own authenticated-context kernel below.
      resolveContext: () => { throw new Error('CONTEXT_REQUIRED'); }, timeoutMs: 3000 });
  }
  authenticate(envelope, attempt = {}) {
    attempt.stage = 'request';
    shape(envelope, 'actorId nonce request signature'); names(envelope.actorId); names(envelope.nonce);
    requestSchema(envelope.request);
    attempt.requestDigest = digest(envelope.request);
    demand(envelope.request.domain === this.domain && envelope.request.audience === this.audience, 'WRONG_DOMAIN');
    const actor = this.db.prepare('SELECT * FROM actors WHERE id=?').get(envelope.actorId);
    attempt.stage = 'identity';
    demand(actor?.active && this.now() < actor.expires, 'IDENTITY_DENIED');
    const challenge = this.db.prepare('SELECT * FROM challenges WHERE id=?').get(envelope.nonce);
    demand(challenge?.actor === actor.id && !challenge.used, 'REPLAY');
    demand(typeof envelope.signature === 'string' && /^[A-Za-z0-9+/]{86}==$/.test(envelope.signature), 'INVALID_SIGNATURE');
    demand(verify(null, Buffer.from(canonical({ actorId: actor.id, nonce: envelope.nonce, request: envelope.request })), actor.public_key, Buffer.from(envelope.signature, 'base64')), 'INVALID_SIGNATURE');
    attempt.actorVerified = true; attempt.actorId = actor.id;
    attempt.stage = 'capability';
    const r = envelope.request;
    demand(JSON.parse(actor.grants).some(g => g.action === r.action && g.resource === r.resource && g.purpose === r.purpose), 'CAPABILITY_DENIED');
    demand(Object.keys(r.expectedVersions).length === 1 && Object.hasOwn(r.expectedVersions, r.resource), 'INVALID_VERSION_SCOPE');
    if (r.action === 'sample.write') shape(r.arguments, 'value'); else demand(Object.keys(r.arguments).length === 0, 'INVALID_ARGUMENTS');
    return actor;
  }
  context(actor, request, manifest, nonce) {
    const time = this.now();
    return { schema: VERSION, actorId: actor.id, serviceId: manifest.participants.mediator.serviceId,
      credentialId: `key-${actor.revision}`, channelId: nonce, requestDigest: digest(request),
      domain: this.domain, audience: this.audience, authenticatedAt: time, expiresAt: actor.expires,
      participants: manifest.participants,
      authority: { snapshotId: `registry-${actor.id}-${actor.revision}`, actorId: actor.id, domain: this.domain,
        action: request.action, resource: request.resource, purpose: request.purpose, argumentDigest: request.argumentDigest,
        expectedVersions: request.expectedVersions, notBefore: time, expiresAt: actor.expires, permitted: true } };
  }
  async admit(input) {
    const attempt = { correlationId: randomUUID(), timestamp: this.clock(), stage: 'request', actorVerified: false };
    if (!Number.isSafeInteger(attempt.timestamp)) attempt.timestamp = null;
    try { return await this.admitVerified(input, attempt); }
    catch (error) {
      // Record a sanitized failure, never raw caller payloads or credential details.
      let code = 'ADMISSION_DENIED';
      try {
        const candidate = error?.code;
        if (typeof candidate === 'string' && /^[A-Z_]{1,64}$/.test(candidate)) code = candidate;
      } catch { /* A rejected value may even have a throwing property getter. */ }
      this.log(`denied-${attempt.correlationId}`, { type: 'denied', code, ...attempt });
      throw error;
    }
  }
  async admitVerified(input, attempt = {}) {
    const envelope = copy(input), actor = this.authenticate(envelope, attempt), request = envelope.request;
    attempt.stage = 'policy';
    const epoch = this.policyEpoch, bundle = this.bundle;
    demand(this.kernel && bundle, 'POLICY_UNAVAILABLE');
    const kernel = createAdmissionKernel({ domain: this.domain, audience: this.audience,
      actions: ['sample.read', 'sample.write'], trustRoots: this.roots, clock: () => this.now(), timeoutMs: 3000,
      resolveContext: r => this.context(actor, r, bundle.manifest, envelope.nonce) });
    demand((await kernel.installPolicy(bundle)).decision === 'installed', 'POLICY_UNAVAILABLE');
    const decision = await kernel.evaluate(request); demand(decision.decision === 'allow', decision.code);
    for (const evaluator of this.evaluators) {
      attempt.stage = 'external-policy';
      let timer;
      const controller = new AbortController();
      try {
        const result = await Promise.race([Promise.resolve().then(() => evaluator(copy(request), { actorId: actor.id, signal: controller.signal })),
          new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('EVALUATOR_TIMEOUT')), 1000); })]);
        demand(result === 'allow', 'EXTERNAL_POLICY_DENIED');
      } finally { clearTimeout(timer); controller.abort(); }
    }
    return transaction(this.db, () => {
      attempt.stage = 'approval';
      demand(epoch === this.policyEpoch && bundle === this.bundle, 'POLICY_CHANGED');
      const current = this.authenticate(envelope);
      demand(current.revision === actor.revision, 'AUTHORITY_CHANGED');
      demand(this.now() < bundle.manifest.expiresAt, 'POLICY_EXPIRED');
      demand(!this.db.prepare('SELECT 1 FROM operations WHERE id=?').get(request.operationId), 'OPERATION_REPLAY');
      demand(!this.db.prepare('SELECT 1 FROM reservations WHERE resource=?').get(request.resource), 'RESOURCE_RESERVED');
      const record = this.db.prepare('SELECT * FROM records WHERE id=?').get(request.resource);
      demand(record && record.version === request.expectedVersions[request.resource], 'STALE_VERSION');
      // Earlier checks can age while validating. Bind both expiry decisions to
      // the same final timestamp persisted with this transactional approval.
      const approvedAt = this.now();
      demand(approvedAt < current.expires, 'IDENTITY_DENIED');
      demand(approvedAt < bundle.manifest.expiresAt, 'POLICY_EXPIRED');
      this.db.prepare('UPDATE challenges SET used=1 WHERE id=?').run(envelope.nonce);
      const evidence = { actorId: actor.id, nonce: envelope.nonce, signature: envelope.signature, decision, approvedAt,
        authority: { actorId: actor.id, revision: actor.revision, permissionExpiresAt: current.expires,
          publicKey: actor.public_key, action: request.action, resource: request.resource, purpose: request.purpose,
          argumentDigest: request.argumentDigest, expectedVersions: request.expectedVersions },
        policyManifest: bundle.manifest, policyArchiveDigest: this.archivePolicy(bundle) };
      this.db.prepare('INSERT INTO operations VALUES (?,?,?,?,?,?,NULL)').run(request.operationId, canonical(request), digest(request), actor.id, 'pending', canonical(evidence));
      this.db.prepare('INSERT INTO reservations VALUES (?,?)').run(request.resource, request.operationId);
      this.log(`${request.operationId}:approved`, { type: 'approved', requestDigest: digest(request), evidence });
      return { operationId: request.operationId, status: 'pending' };
    });
  }
  log(id, payload) { this.db.prepare('INSERT INTO audit(id,payload) VALUES (?,?)').run(id, canonical(payload)); }
  flushAudit() {
    // A domain delivery marker cannot prove a restored collector still has a
    // receipt. Reconcile all retained evidence idempotently before every resume.
    // Deliberately linear in history for this bounded local sandbox.
    for (const row of this.db.prepare('SELECT id,payload FROM audit ORDER BY sequence').all()) {
      this.collector.record(`${this.domain}:${row.id}`, JSON.parse(row.payload));
      this.db.prepare('INSERT OR IGNORE INTO delivered VALUES (?)').run(row.id);
    }
  }
  resume(operationId) {
    const existing = this.operation(operationId); demand(existing, 'UNKNOWN_OPERATION');
    // Delivery failure after commit must never cause the database mutation to run again.
    try {
      this.flushAudit();
      if (existing.status === 'committed') return existing;
      this.collector.record(`${this.domain}:${operationId}:execution-intent`, { type: 'execution-intent', operationId, requestDigest: existing.digest });
      this.collector.whileAvailable(() => transaction(this.db, () => {
        const op = this.operation(operationId);
        if (op.status === 'committed') return;
        const request = op.request;
        const reservation = this.db.prepare('SELECT operation FROM reservations WHERE resource=?').get(request.resource);
        demand(reservation?.operation === operationId, 'RESERVATION_CORRUPTED');
        const record = this.db.prepare('SELECT * FROM records WHERE id=?').get(request.resource);
        demand(record?.version === request.expectedVersions[request.resource], 'RECORD_CORRUPTED');
        const result = request.action === 'sample.write' ? { value: request.arguments.value, version: record.version + 1 } : { value: JSON.parse(record.value), version: record.version };
        if (request.action === 'sample.write') this.db.prepare('UPDATE records SET value=?,version=? WHERE id=?').run(canonical(result.value), result.version, request.resource);
        this.db.prepare("UPDATE operations SET status='committed',result=? WHERE id=?").run(canonical(result), operationId);
        this.log(`${operationId}:committed`, { type: 'committed', operationId, requestDigest: op.digest, result });
        this.db.prepare('DELETE FROM reservations WHERE resource=?').run(request.resource);
      }));
      this.flushAudit();
      return this.operation(operationId);
    } catch (error) {
      // Corruption or audit failure preserves approval; no cancellation/expiry path.
      return { ...this.operation(operationId), waitingReason: error.code ?? error.message };
    }
  }
  operation(id) {
    const row = this.db.prepare('SELECT * FROM operations WHERE id=?').get(id);
    return row ? { ...row, request: JSON.parse(row.request), evidence: JSON.parse(row.evidence), result: row.result === null ? null : JSON.parse(row.result) } : null;
  }
  record(resource) { const r = this.db.prepare('SELECT * FROM records WHERE id=?').get(resource); return r ? { version: r.version, value: JSON.parse(r.value) } : null; }
  auditEntries() { return this.db.prepare('SELECT payload FROM audit ORDER BY sequence').all().map(r => JSON.parse(r.payload)); }
  close() { this.db.close(); }
}
