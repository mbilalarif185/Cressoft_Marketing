import { SignJWT, jwtVerify } from "jose";

/**
 * Blog-admin session helpers.
 *
 * NOTE (Pages Router port): the original App-Router guide used `next/headers`
 * `cookies()` to read/write the cookie. In the Pages Router there is no
 * `cookies()` — cookies travel on the `req`/`res` objects — so this module is
 * transport-agnostic: it signs/verifies the JWT and builds the `Set-Cookie`
 * string, and the API handlers attach it to the response. Reading the cookie is
 * done from `req.cookies` (API routes / getServerSideProps) or the raw header
 * in `middleware.ts`.
 */

const COOKIE_NAME = "quantel_admin_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 12; // 12 hours

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 16 characters).");
  }
  return new TextEncoder().encode(secret);
}

/** Mint a signed 12-hour admin JWT. */
export async function createAdminToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(getSecret());
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

/** Serialize the Set-Cookie header value that stores the session token. */
export function buildSessionCookie(token: string): string {
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_MAX_AGE_SEC}`,
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

/** Serialize the Set-Cookie header value that clears the session. */
export function buildClearedSessionCookie(): string {
  const parts = [
    `${COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}