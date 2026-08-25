// 管理者の削除。最後の1人は削除不可（ロックアウト防止）。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql, adminCount } from '../_lib/db.js';
import { requireAuth } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!(await requireAuth(req, res))) return;
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'method_not_allowed' });

  const id = Number(req.query.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid_id' });

  if ((await adminCount()) <= 1) {
    return res.status(400).json({ error: 'cannot_delete_last_admin' });
  }

  const rows = await sql`DELETE FROM admins WHERE id = ${id} RETURNING id`;
  if (rows.length === 0) return res.status(404).json({ error: 'not_found' });
  return res.status(200).json({ ok: true });
}
