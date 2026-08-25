// 画像アップロード：@vercel/blob のクライアント直アップロード用トークンを発行する。
// クライアントは @vercel/blob/client の upload() を使い、認証は onBeforeGenerateToken で確認。
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getSession } from './_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const body = req.body as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        const session = await getSession(req);
        if (!session) throw new Error('unauthorized');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          addRandomSuffix: true,
          maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
        };
      },
      onUploadCompleted: async () => {
        // ローカルでは呼ばれない（公開URLが必要）。URLはクライアントのupload()結果から取得する。
      },
    });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
}
