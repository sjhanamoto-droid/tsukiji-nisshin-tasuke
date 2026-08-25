// 現在のログイン状態を返す（管理画面の認証ガード用）。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSession } from '../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const session = await getSession(req);
  if (!session) return res.status(401).json({ error: 'unauthorized' });
  return res.status(200).json({ admin: { id: session.sub, email: session.email } });
}
