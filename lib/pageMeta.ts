// <head> のメタ情報をクライアント側で書き換えるユーティリティ。
// 初期HTML は scripts/prerender.ts が静的に埋め込んでいるので、ここでの更新は
// (1) SPA 遷移したとき (2) CMS から取得した記事がプリレンダ時に存在しなかったとき
// の2ケースを埋めるためのもの。
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX = 'noindex, follow';

export function upsertMetaByName(name: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function upsertMetaByProperty(property: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function setCanonical(url: string): void {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

/**
 * 存在しない記事URLが 200 のまま残ると「ソフト404」として扱われるため、
 * 記事が見つからなかったページには noindex を立てる。
 * ルート切り替えのたびに App.tsx が既定値へ戻す。
 */
export function setRobots(indexable: boolean): void {
  upsertMetaByName('robots', indexable ? DEFAULT_ROBOTS : NOINDEX);
}

// ルート別 JSON-LD を <script id="route-jsonld"> に反映（空なら削除）
export function setRouteJsonLd(data: { '@graph': object[] }): void {
  const existing = document.getElementById('route-jsonld');
  if (!data['@graph'].length) {
    if (existing) existing.remove();
    return;
  }
  const el = existing || document.createElement('script');
  if (!existing) {
    el.setAttribute('type', 'application/ld+json');
    el.id = 'route-jsonld';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/** HTML本文から description 用の抜粋を作る（タグと余分な空白を除去） */
export function excerptFromHtml(html: string, max = 110): string {
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? text.slice(0, max) + '…' : text;
}

/** 相対パスを現在のオリジン基準の絶対URLへ（OGP画像は絶対URL必須） */
export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return window.location.origin + (pathOrUrl.startsWith('/') ? pathOrUrl : '/' + pathOrUrl);
}

export interface DetailMeta {
  title: string;
  description: string;
  image?: string;
}

/**
 * CMS から取得した記事の内容でタイトル・説明文を上書きする。
 * プリレンダ後に追加された記事でも、レンダリング後には正しいメタが入る。
 */
export function applyDetailMeta(meta: DetailMeta): void {
  document.title = meta.title;
  upsertMetaByName('description', meta.description);
  upsertMetaByProperty('og:title', meta.title);
  upsertMetaByProperty('og:description', meta.description);
  upsertMetaByName('twitter:title', meta.title);
  upsertMetaByName('twitter:description', meta.description);
  if (meta.image) {
    upsertMetaByProperty('og:image', meta.image);
    upsertMetaByName('twitter:image', meta.image);
  }
}
