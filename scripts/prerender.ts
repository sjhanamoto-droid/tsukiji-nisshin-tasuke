/**
 * ビルド後プリレンダ。
 *
 * SPA は全URLで同じ index.html を返すため、Google からは全ページが
 * 「タイトルも本文も同じ、canonical はトップを指すページ」に見えてしまう。
 * ここでは vite build が出力した dist/index.html を雛形に、ルートごとに
 * title / description / keywords / canonical / OGP / JSON-LD を差し替えた
 * 静的HTMLを dist/<path>/index.html として書き出す。
 *
 * SPA の挙動は一切変わらない（同じ JS バンドルを読み込む）。変わるのは
 * クローラが最初に受け取る HTML の中身だけ。
 *
 * あわせて sitemap.xml と 404.html も同じデータから生成し、
 * ルート一覧が三箇所でずれないようにする。
 */
import fs from 'node:fs';
import path from 'node:path';
import type { PageView } from '../lib/router';
import {
  titleFor, descriptionFor, keywordsFor, jsonLdFor,
  canonicalFor, ogImageFor, pathFor, NEWS_PER_PAGE,
  type SeoData,
} from '../lib/seo';
import { SHOPS, NEWS, COLUMNS } from '../constants';
import type { NewsItem, ColumnItem } from '../types';

const ORIGIN = 'https://tsukijiunagisyokudo.jp';
const DIST = path.resolve(process.cwd(), 'dist');
const DEFAULT_OG_IMAGE = ORIGIN + '/og-image.jpg';

// ファイル名・URL としてそのまま扱える ID だけを静的化する。
// これ以外（記号や日本語を含む ID）は SPA フォールバックに任せる。
const SAFE_ID = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

// ──────────────── CMS データ取得 ────────────────
// 本番 API から最新のお知らせ・コラムを取得し、失敗したら constants の
// フォールバックを使う。ビルドがネットワークで落ちないよう必ず握りつぶす。
async function loadSeoData(): Promise<{ data: SeoData; source: string }> {
  const base = process.env.PRERENDER_API_ORIGIN || ORIGIN;
  try {
    const get = async <T>(p: string): Promise<T> => {
      const res = await fetch(base + p, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error(`${p} → HTTP ${res.status}`);
      return res.json() as Promise<T>;
    };
    const [newsRes, colRes] = await Promise.all([
      get<{ items: NewsItem[] }>('/api/news'),
      get<{ items: (ColumnItem & { coverImageUrl?: string | null })[] }>('/api/columns'),
    ]);
    const news = newsRes.items ?? [];
    const columns = (colRes.items ?? []).map(c => ({
      id: c.id, date: c.date, category: c.category, title: c.title,
      image: c.image || c.coverImageUrl || '',
    }));
    if (!news.length && !columns.length) throw new Error('API が空を返した');
    return {
      data: { news: news.length ? news : NEWS, columns: columns.length ? columns : COLUMNS },
      source: `API (${base})`,
    };
  } catch (err) {
    console.warn(`  [prerender] CMS API を取得できませんでした → constants を使用: ${(err as Error).message}`);
    return { data: { news: NEWS, columns: COLUMNS }, source: 'constants.tsx フォールバック' };
  }
}

// ──────────────── ルート一覧 ────────────────
function buildRoutes(data: SeoData): PageView[] {
  const routes: PageView[] = [
    { type: 'home' },
    { type: 'company' },
    { type: 'consumer' },
    { type: 'corporate' },
    { type: 'yochan' },
    { type: 'privacy' },
    { type: 'newslist', page: 1 },
  ];
  SHOPS.forEach(s => routes.push({ type: 'shop', id: s.id }));
  data.news.filter(n => SAFE_ID.test(n.id)).forEach(n => routes.push({ type: 'news', id: n.id }));
  data.columns.filter(c => SAFE_ID.test(c.id)).forEach(c => routes.push({ type: 'article', id: c.id }));

  const totalPages = Math.max(1, Math.ceil(data.news.length / NEWS_PER_PAGE));
  for (let p = 2; p <= totalPages; p++) routes.push({ type: 'newslist', page: p });

  return routes;
}

// ──────────────── HTML 差し替え ────────────────
function escapeAttr(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setTitle(html: string, value: string): string {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(value)}</title>`);
}

// name= / property= どちらの meta も、無ければ </head> の直前に追加する
function upsertMeta(html: string, attr: 'name' | 'property', key: string, value: string): string {
  const re = new RegExp(`(<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s+content=")[^"]*(")`);
  if (re.test(html)) return html.replace(re, `$1${escapeAttr(value)}$2`);
  return html.replace('</head>', `    <meta ${attr}="${key}" content="${escapeAttr(value)}" />\n  </head>`);
}

function removeMeta(html: string, attr: 'name' | 'property', key: string): string {
  const re = new RegExp(`\\s*<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'g');
  return html.replace(re, '');
}

function setCanonical(html: string, url: string): string {
  const re = /(<link\s+rel="canonical"\s+href=")[^"]*(")/;
  if (re.test(html)) return html.replace(re, `$1${escapeAttr(url)}$2`);
  return html.replace('</head>', `    <link rel="canonical" href="${escapeAttr(url)}" />\n  </head>`);
}

// JSON-LD は App.tsx が id="route-jsonld" を探して更新するため、同じ id で埋め込む
function setRouteJsonLd(html: string, ld: { '@graph': object[] }): string {
  if (!ld['@graph'].length) return html;
  const json = JSON.stringify(ld).replace(/</g, '\\u003c');
  const tag = `    <script type="application/ld+json" id="route-jsonld">${json}</script>\n  </head>`;
  return html.replace('</head>', tag);
}

function renderRoute(shell: string, page: PageView, data: SeoData): string {
  const title = titleFor(page, data);
  const description = descriptionFor(page, data);
  const canonical = canonicalFor(page);
  const ogImage = ogImageFor(page);

  let html = shell;
  html = setTitle(html, title);
  html = upsertMeta(html, 'name', 'description', description);
  html = upsertMeta(html, 'name', 'keywords', keywordsFor(page));
  html = setCanonical(html, canonical);

  html = upsertMeta(html, 'property', 'og:url', canonical);
  html = upsertMeta(html, 'property', 'og:title', title);
  html = upsertMeta(html, 'property', 'og:description', description);
  html = upsertMeta(html, 'property', 'og:type', page.type === 'news' || page.type === 'article' ? 'article' : 'website');
  html = upsertMeta(html, 'property', 'og:image', ogImage);
  html = upsertMeta(html, 'name', 'twitter:title', title);
  html = upsertMeta(html, 'name', 'twitter:description', description);
  html = upsertMeta(html, 'name', 'twitter:image', ogImage);

  if (ogImage === DEFAULT_OG_IMAGE) {
    html = upsertMeta(html, 'property', 'og:image:secure_url', ogImage);
  } else {
    // 店舗写真は 1200x630 ではないため、既定画像用の寸法メタは外す
    html = removeMeta(html, 'property', 'og:image:secure_url');
    html = removeMeta(html, 'property', 'og:image:width');
    html = removeMeta(html, 'property', 'og:image:height');
    html = removeMeta(html, 'property', 'og:image:type');
    html = upsertMeta(html, 'property', 'og:image:alt', title);
    html = upsertMeta(html, 'name', 'twitter:image:alt', title);
  }

  html = setRouteJsonLd(html, jsonLdFor(page, data));
  return html;
}

// ──────────────── sitemap.xml ────────────────
const CHANGEFREQ: Record<PageView['type'], string> = {
  home: 'weekly', newslist: 'weekly', news: 'yearly', article: 'monthly',
  shop: 'monthly', company: 'monthly', consumer: 'monthly', corporate: 'monthly',
  yochan: 'monthly', privacy: 'yearly',
};
const PRIORITY: Record<PageView['type'], string> = {
  home: '1.0', shop: '0.8', company: '0.8', consumer: '0.8', corporate: '0.8',
  yochan: '0.8', newslist: '0.6', article: '0.6', news: '0.5', privacy: '0.3',
};

function renderSitemap(routes: PageView[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes.map(page => [
    '  <url>',
    `    <loc>${ORIGIN}${pathFor(page)}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <changefreq>${CHANGEFREQ[page.type]}</changefreq>`,
    `    <priority>${PRIORITY[page.type]}</priority>`,
    '  </url>',
  ].join('\n')).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!-- scripts/prerender.ts が dist/ の静的ページから自動生成しています。直接編集しないでください。 -->',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

// ──────────────── 404.html ────────────────
// SPA を読み込まない独立ページ。読み込むとトップの内容が
// 404 の URL で描画され、結局ソフト404になってしまうため。
function render404(): string {
  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, follow" />
    <title>ページが見つかりません | 築地にっしん太助</title>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0; min-height: 100vh; background: #0f0f0f; color: #FDFBF7;
        font-family: "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", sans-serif;
        display: flex; align-items: center; justify-content: center; padding: 32px; line-height: 1.9;
      }
      main { max-width: 560px; text-align: center; }
      img { width: 96px; height: auto; margin-bottom: 28px; }
      .code { font-family: ui-monospace, "SFMono-Regular", Menlo, monospace; font-size: 13px; letter-spacing: .2em; color: #B45309; margin: 0 0 12px; }
      h1 { font-family: "Noto Serif JP", "Hiragino Mincho ProN", serif; font-size: 24px; font-weight: 700; margin: 0 0 16px; line-height: 1.5; }
      p { color: rgba(253,251,247,.68); font-size: 14.5px; margin: 0 0 28px; }
      nav { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
      a {
        display: inline-block; padding: 11px 20px; font-size: 13.5px; text-decoration: none;
        color: #FDFBF7; border: 1px solid rgba(180,83,9,.5); background: rgba(180,83,9,.1);
        transition: background .2s, border-color .2s;
      }
      a:hover, a:focus-visible { background: rgba(180,83,9,.24); border-color: #B45309; }
      a:focus-visible { outline: 2px solid #B45309; outline-offset: 2px; }
      a.primary { background: #B45309; border-color: #B45309; }
      a.primary:hover, a.primary:focus-visible { background: #94430a; }
    </style>
  </head>
  <body>
    <main>
      <img src="/images/logo/logo-wh.webp" alt="築地にっしん太助" />
      <p class="code">404 NOT FOUND</p>
      <h1>お探しのページは見つかりませんでした</h1>
      <p>URL が変更されたか、削除された可能性があります。<br />下記からお探しください。</p>
      <nav>
        <a class="primary" href="/">トップページ</a>
        <a href="/#locations">店舗案内</a>
        <a href="/news">お知らせ</a>
        <a href="/company">会社案内</a>
      </nav>
    </main>
  </body>
</html>
`;
}

// ──────────────── 実行 ────────────────
async function main() {
  const shellPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(shellPath)) {
    throw new Error(`dist/index.html がありません。先に vite build を実行してください。`);
  }
  const shell = fs.readFileSync(shellPath, 'utf-8');

  const { data, source } = await loadSeoData();
  const routes = buildRoutes(data);
  console.log(`  [prerender] データ元: ${source}（お知らせ ${data.news.length}件 / コラム ${data.columns.length}件）`);

  for (const page of routes) {
    const routePath = pathFor(page);
    const outFile = routePath === '/'
      ? shellPath
      : path.join(DIST, routePath, 'index.html');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, renderRoute(shell, page, data), 'utf-8');
    console.log(`  [prerender] ${routePath.padEnd(34)} → ${path.relative(DIST, outFile)}`);
  }

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), renderSitemap(routes), 'utf-8');
  fs.writeFileSync(path.join(DIST, '404.html'), render404(), 'utf-8');
  console.log(`  [prerender] sitemap.xml（${routes.length}件）と 404.html を生成しました`);
  console.log(`  [prerender] 完了: ${routes.length} ページを静的化`);
}

main().catch(err => {
  console.error('[prerender] 失敗:', err);
  process.exit(1);
});
