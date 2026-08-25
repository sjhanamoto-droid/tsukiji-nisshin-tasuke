// Neon Postgres クライアントとスキーマ初期化（Vercel Functions 用・サーバ専用）。
// api/_lib/ は "_" 始まりのためVercelのルーティング対象外（エンドポイントにならない）。
import { neon } from '@neondatabase/serverless';
import { randomBytes } from 'node:crypto';

if (!process.env.DATABASE_URL) {
  // 実行時に分かりやすく落とす（未設定のままだと不可解なエラーになるため）
  console.warn('[cms] DATABASE_URL is not set');
}

export const sql = neon(process.env.DATABASE_URL || '');

// URL用の短いID（8桁hex）。新規ニュース/コラムのスラッグに使う。
export function genId(): string {
  return randomBytes(4).toString('hex');
}

// スキーマを冪等に作成（初回セットアップ時に呼ぶ）。
export async function ensureSchema(): Promise<void> {
  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id            SERIAL PRIMARY KEY,
      email         TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS news (
      id              TEXT PRIMARY KEY,
      title           TEXT NOT NULL,
      category        TEXT NOT NULL DEFAULT '',
      date            TEXT NOT NULL,
      cover_image_url TEXT,
      content_html    TEXT NOT NULL DEFAULT '',
      images          JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS columns (
      id              TEXT PRIMARY KEY,
      title           TEXT NOT NULL,
      category        TEXT NOT NULL DEFAULT '',
      date            TEXT NOT NULL,
      cover_image_url TEXT,
      content_html    TEXT NOT NULL DEFAULT '',
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
}

export async function adminCount(): Promise<number> {
  const rows = await sql`SELECT COUNT(*)::int AS n FROM admins`;
  return rows[0]?.n ?? 0;
}
