// 認証ユーティリティ：パスワードハッシュ（scrypt）、JWT（jose）、セッションcookie。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7日

function secretKey(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error('AUTH_SECRET is not set');
  return new TextEncoder().encode(s);
}

// ── パスワード（scrypt, 追加依存なし）──
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString('hex')}:${hash.toString('hex')}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = (stored || '').split(':');
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

// ── JWT ──
export interface SessionPayload { sub: string; email: string }

export async function createToken(admin: { id: number | string; email: string }): Promise<string> {
  return new SignJWT({ email: admin.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(admin.id))
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { sub: String(payload.sub), email: String(payload.email) };
  } catch {
    return null;
  }
}

// ── cookie ──
export function parseCookies(req: VercelRequest): Record<string, string> {
  const header = req.headers.cookie || '';
  const out: Record<string, string> = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) out[k] = decodeURIComponent(v);
  }
  return out;
}

export function setSessionCookie(res: VercelResponse, token: string): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=${MAX_AGE}`,
  );
}

export function clearSessionCookie(res: VercelResponse): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Secure; Max-Age=0`,
  );
}

// ── 認証ガード ──
export async function getSession(req: VercelRequest): Promise<SessionPayload | null> {
  const token = parseCookies(req)[COOKIE_NAME];
  if (!token) return null;
  return verifyToken(token);
}

// 認証必須のエンドポイント冒頭で使う。未認証なら 401 を返して null。
export async function requireAuth(req: VercelRequest, res: VercelResponse): Promise<SessionPayload | null> {
  const session = await getSession(req);
  if (!session) {
    res.status(401).json({ error: 'unauthorized' });
    return null;
  }
  return session;
}
