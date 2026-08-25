// 管理者の一覧取得・新規作成（全員同権限：ログインしていれば誰でも追加できる）。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_lib/db.js';
import { requireAuth, hashPassword } from '../_lib/auth.js';
import { cleanText } from '../_lib/sanitize.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;

  if (req.method === 'GET') {
    const rows = await sql`SELECT id, email, created_at FROM admins ORDER BY created_at ASC`;
    return res.status(200).json({ admins: rows });
  }

  if (req.method === 'POST') {
    const { email, password } = (req.body ?? {}) as Record<string, unknown>;
    const cleanEmail = cleanText(email).toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) {
      return res.status(400).json({ error: 'invalid_email' });
    }
    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: 'weak_password' });
    }
    const exists = await sql`SELECT 1 FROM admins WHERE email = ${cleanEmail} LIMIT 1`;
    if (exists.length > 0) return res.status(409).json({ error: 'email_taken' });

    const rows = await sql`
      INSERT INTO admins (email, password_hash)
      VALUES (${cleanEmail}, ${hashPassword(password)})
      RETURNING id, email, created_at`;
    return res.status(201).json({ admin: rows[0] });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
