// コラム：一覧取得（公開）／新規作成（要認証）。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql, genId } from '../_lib/db.js';
import { requireAuth } from '../_lib/auth.js';
import { cleanText, cleanHtml, cleanUrl } from '../_lib/sanitize.js';

function rowToColumn(r: any) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    date: r.date,
    coverImageUrl: r.cover_image_url,
    contentHtml: r.content_html,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function today(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM columns ORDER BY date DESC, created_at DESC`;
    return res.status(200).json({ items: rows.map(rowToColumn) });
  }

  if (req.method === 'POST') {
    if (!(await requireAuth(req, res))) return;
    const b = (req.body ?? {}) as Record<string, unknown>;
    const title = cleanText(b.title);
    if (!title) return res.status(400).json({ error: 'missing_title' });
    const category = cleanText(b.category);
    const date = cleanText(b.date) || today();
    const coverImageUrl = cleanUrl(b.coverImageUrl);
    const contentHtml = cleanHtml(typeof b.contentHtml === 'string' ? b.contentHtml : '');
    const id = genId();

    const rows = await sql`
      INSERT INTO columns (id, title, category, date, cover_image_url, content_html)
      VALUES (${id}, ${title}, ${category}, ${date}, ${coverImageUrl}, ${contentHtml})
      RETURNING *`;
    return res.status(201).json({ item: rowToColumn(rows[0]) });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
