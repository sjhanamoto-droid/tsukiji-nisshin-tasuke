// ニュース：個別取得（公開）／更新（要認証）／削除（要認証）。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_lib/db.js';
import { requireAuth } from '../_lib/auth.js';
import { cleanText, cleanHtml, cleanUrl } from '../_lib/sanitize.js';

function rowToNews(r: any) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    date: r.date,
    coverImageUrl: r.cover_image_url,
    contentHtml: r.content_html,
    images: r.images ?? [],
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = String(req.query.id || '');

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM news WHERE id = ${id} LIMIT 1`;
    if (rows.length === 0) return res.status(404).json({ error: 'not_found' });
    return res.status(200).json({ item: rowToNews(rows[0]) });
  }

  if (req.method === 'PUT') {
    if (!(await requireAuth(req, res))) return;
    const b = (req.body ?? {}) as Record<string, unknown>;
    const title = cleanText(b.title);
    if (!title) return res.status(400).json({ error: 'missing_title' });
    const category = cleanText(b.category);
    const date = cleanText(b.date);
    const coverImageUrl = cleanUrl(b.coverImageUrl);
    const contentHtml = cleanHtml(typeof b.contentHtml === 'string' ? b.contentHtml : '');
    const images = Array.isArray(b.images)
      ? b.images.map(cleanUrl).filter((u): u is string => !!u)
      : [];

    const rows = await sql`
      UPDATE news SET
        title = ${title}, category = ${category}, date = ${date},
        cover_image_url = ${coverImageUrl}, content_html = ${contentHtml},
        images = ${JSON.stringify(images)}::jsonb, updated_at = now()
      WHERE id = ${id}
      RETURNING *`;
    if (rows.length === 0) return res.status(404).json({ error: 'not_found' });
    return res.status(200).json({ item: rowToNews(rows[0]) });
  }

  if (req.method === 'DELETE') {
    if (!(await requireAuth(req, res))) return;
    const rows = await sql`DELETE FROM news WHERE id = ${id} RETURNING id`;
    if (rows.length === 0) return res.status(404).json({ error: 'not_found' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
