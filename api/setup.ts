// 初回セットアップ：管理者が0人のときのみ、SETUP_TOKEN 認証で最初の管理者を作成する。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ensureSchema, adminCount, sql } from './_lib/db.js';
import { hashPassword } from './_lib/auth.js';
import { cleanText } from './_lib/sanitize.js';
import { seedIfEmpty } from './_lib/seed.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureSchema();

  // GET: フロントがセットアップ要否を判定するために使用
  if (req.method === 'GET') {
    const n = await adminCount();
    return res.status(200).json({ setupNeeded: n === 0 });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const { token, email, password } = (req.body ?? {}) as Record<string, unknown>;

  if (!process.env.SETUP_TOKEN || token !== process.env.SETUP_TOKEN) {
    return res.status(403).json({ error: 'invalid_setup_token' });
  }
  if ((await adminCount()) > 0) {
    return res.status(403).json({ error: 'already_setup' });
  }

  const cleanEmail = cleanText(email).toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) {
    return res.status(400).json({ error: 'invalid_email' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'weak_password' });
  }

  const rows = await sql`
    INSERT INTO admins (email, password_hash)
    VALUES (${cleanEmail}, ${hashPassword(password)})
    RETURNING id, email`;

  // 既存のニュース/コラムをDBへ移行（空のときのみ）
  await seedIfEmpty();

  return res.status(201).json({ admin: rows[0] });
}
