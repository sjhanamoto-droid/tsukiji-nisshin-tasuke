// 本文HTMLの浄化（保存型XSS対策）。管理者入力でも保存時に必ず通す。
import sanitizeHtml from 'sanitize-html';

export function cleanHtml(dirty: string): string {
  if (!dirty) return '';
  return sanitizeHtml(dirty, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5',
      'p', 'br', 'span',
      'strong', 'b', 'em', 'i', 'u',
      'ul', 'ol', 'li',
      'blockquote',
      'a', 'img',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    // 外部リンクは安全属性を強制付与
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  });
}

// プレーンテキスト用（タイトル・カテゴリ等）。タグを全除去してトリム。
export function cleanText(input: unknown): string {
  if (typeof input !== 'string') return '';
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
}

// 画像URL用。http/https のみ許可、それ以外は null（サニタイズで壊さない）。
export function cleanUrl(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const s = input.trim();
  return /^https?:\/\/[^\s"'<>]+$/.test(s) ? s : null;
}
