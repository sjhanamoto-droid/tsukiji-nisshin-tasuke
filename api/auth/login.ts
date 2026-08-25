// ログイン：メール＋パスワードを検証し、セッションcookieを発行する。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_lib/db.js';
import { verifyPassword, createToken, setSessionCookie } from '../_lib/auth.js';
import { cleanText } from '../_lib/sanitize.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const { email, password } = (req.body ?? {}) as Record<string, unknown>;
  const cleanEmail = cleanText(email).toLowerCase();
  if (!cleanEmail || typeof password !== 'string') {
    return res.status(400).json({ error: 'missing_credentials' });
  }

  const rows = await sql`SELECT id, email, password_hash FROM admins WHERE email = ${cleanEmail} LIMIT 1`;
  const admin = rows[0];
  if (!admin || !verifyPassword(password, admin.password_hash)) {
    return res.status(401).json({ error: 'invalid_credentials' });
  }

  const token = await createToken({ id: admin.id, email: admin.email });
  setSessionCookie(res, token);
  return res.status(200).json({ admin: { id: admin.id, email: admin.email } });
}
