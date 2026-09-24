import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

export const POPULATION_CEILING = 300;
export const CREATION_ROUTES = Object.freeze([
  "founding",
  "executive_authorization",
  "agent_petition",
]);

const migration = readFileSync(
  fileURLToPath(new URL("./migrations/001_population.sql", import.meta.url)),
  "utf8",
);

function requiredString(value, name) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new TypeError(`${name} must be a non-empty string`);
  }
  return value;
}

function timestamp(value, name) {
  requiredString(value, name);
  if (Number.isNaN(Date.parse(value))) throw new TypeError(`${name} must be an ISO timestamp`);
  return value;
}

function details(value) {
  if (value == null) return "{}";
  if (typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError("details must be an object");
  }
  return JSON.stringify(value);
}

function mapIdentity(row) {
  if (!row) return null;
  return {
    id: row.id,
    division: row.division,
    identityClass: row.identityClass,
    creationRoute: row.creationRoute,
    createdBy: row.createdBy,
    authorityReference: row.authorityReference,
    createdAt: row.createdAt,
    terminalAt: row.terminalAt,
    terminalReason: row.terminalReason,
    terminalBy: row.terminalBy,
    terminalReference: row.terminalReference,
    living: row.terminalAt == null,
  };
}

export class PopulationRegistry {
  constructor(filename = ":memory:") {
    this.database = new DatabaseSync(filename);
    this.database.exec("PRAGMA busy_timeout = 5000");
    this.database.exec(migration);
  }

  close() {
    this.database.close();
  }

  getPopulation() {
    const living = this.database
      .prepare("SELECT COUNT(*) AS count FROM population_identities WHERE terminal_at IS NULL")
      .get().count;
    return { living, ceiling: POPULATION_CEILING, available: POPULATION_CEILING - living };
  }

  hasCapacity(amount = 1) {
    if (!Number.isSafeInteger(amount) || amount < 0) {
      throw new RangeError("amount must be a non-negative safe integer");
    }
    return this.getPopulation().available >= amount;
  }

  createIdentity(input) {
    const identity = {
      id: requiredString(input?.id, "id"),
      division: requiredString(input?.division, "division"),
      identityClass: requiredString(input?.identityClass, "identityClass"),
      creationRoute: requiredString(input?.creationRoute, "creationRoute"),
      createdBy: requiredString(input?.createdBy, "createdBy"),
      authorityReference: requiredString(input?.authorityReference, "authorityReference"),
      createdAt: timestamp(input?.createdAt, "createdAt"),
      details: details(input?.details),
    };
    if (!CREATION_ROUTES.includes(identity.creationRoute)) {
      throw new RangeError(`creationRoute must be one of: ${CREATION_ROUTES.join(", ")}`);
    }

    this.database.exec("BEGIN IMMEDIATE");
    try {
      // The transaction makes this preflight useful to callers without relying
      // on it for safety; the schema trigger independently enforces the cap.
      if (!this.hasCapacity()) throw new RangeError("population ceiling of 300 reached");
      this.database.prepare(`
        INSERT INTO population_identities (
          id, division, identity_class, creation_route, created_by,
          authority_reference, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        identity.id,
        identity.division,
        identity.identityClass,
        identity.creationRoute,
        identity.createdBy,
        identity.authorityReference,
        identity.createdAt,
      );
      this.database.prepare(`
        INSERT INTO population_events (
          identity_id, event_type, actor_id, authority_reference, occurred_at, details
        ) VALUES (?, 'created', ?, ?, ?, ?)
      `).run(
        identity.id,
        identity.createdBy,
        identity.authorityReference,
        identity.createdAt,
        identity.details,
      );
      this.database.exec("COMMIT");
      return this.getIdentity(identity.id);
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }

  markTerminal(input) {
    const transition = {
      id: requiredString(input?.id, "id"),
      reason: requiredString(input?.reason, "reason"),
      actorId: requiredString(input?.actorId, "actorId"),
      authorityReference: requiredString(input?.authorityReference, "authorityReference"),
      occurredAt: timestamp(input?.occurredAt, "occurredAt"),
      details: details(input?.details),
    };
    this.database.exec("BEGIN IMMEDIATE");
    try {
      const result = this.database.prepare(`
        UPDATE population_identities
        SET terminal_at = ?, terminal_reason = ?, terminal_by = ?, terminal_reference = ?
        WHERE id = ? AND terminal_at IS NULL
      `).run(
        transition.occurredAt,
        transition.reason,
        transition.actorId,
        transition.authorityReference,
        transition.id,
      );
      if (result.changes !== 1) throw new Error(`Living identity not found: ${transition.id}`);
      this.database.prepare(`
        INSERT INTO population_events (
          identity_id, event_type, actor_id, authority_reference, occurred_at, details
        ) VALUES (?, 'terminal', ?, ?, ?, ?)
      `).run(
        transition.id,
        transition.actorId,
        transition.authorityReference,
        transition.occurredAt,
        transition.details,
      );
      this.database.exec("COMMIT");
      return this.getIdentity(transition.id);
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }

  getIdentity(id) {
    return mapIdentity(this.database.prepare(`
      SELECT id, division, identity_class AS identityClass,
        creation_route AS creationRoute, created_by AS createdBy,
        authority_reference AS authorityReference, created_at AS createdAt,
        terminal_at AS terminalAt, terminal_reason AS terminalReason,
        terminal_by AS terminalBy, terminal_reference AS terminalReference
      FROM population_identities WHERE id = ?
    `).get(id));
  }

  getEvents(id) {
    return this.database.prepare(`
      SELECT sequence, identity_id AS identityId, event_type AS eventType,
        actor_id AS actorId, authority_reference AS authorityReference,
        occurred_at AS occurredAt, details
      FROM population_events WHERE identity_id = ? ORDER BY sequence
    `).all(id).map((event) => ({ ...event, details: JSON.parse(event.details) }));
  }
}
