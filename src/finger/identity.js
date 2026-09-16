import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const FINGER_IDENTITY_COOKIE = "concord_finger_identity";

export async function resolveFingerIdentity(request, options) {
  const authenticatedUserId = clean(
    await options.getAuthenticatedUserId?.(request),
  );
  const cookies = parseCookies(request.headers.cookie);
  const existingId = verifyIdentityCookie(
    cookies[FINGER_IDENTITY_COOKIE],
    options.identitySecret,
  );
  const identityId = existingId ?? randomUUID();

  return {
    identityId,
    userId: authenticatedUserId ?? null,
    setCookie: existingId
      ? null
      : serializeIdentityCookie(identityId, options.identitySecret, options.secureCookies),
  };
}

export function serializeIdentityCookie(identityId, secret, secure = true) {
  const value = `${identityId}.${sign(identityId, secret)}`;
  const secureAttribute = secure ? "; Secure" : "";
  return `${FINGER_IDENTITY_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${secureAttribute}`;
}

export function verifyIdentityCookie(value, secret) {
  if (typeof value !== "string") return null;
  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;

  const identityId = value.slice(0, separator);
  const suppliedSignature = value.slice(separator + 1);
  if (!/^[0-9a-f-]{36}$/i.test(identityId)) return null;

  const expected = Buffer.from(sign(identityId, secret));
  const supplied = Buffer.from(suppliedSignature);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    return null;
  }
  return identityId;
}

function sign(value, secret) {
  if (!secret) throw new Error("A Finger identity secret is required");
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim().split(/=(.*)/s))
      .filter(([name, value]) => name && value)
      .map(([name, value]) => [name, decodeURIComponent(value)]),
  );
}

function clean(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
