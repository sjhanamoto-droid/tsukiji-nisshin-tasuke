// ルートごとの SEO メタ情報（title / description / OGP / JSON-LD 構造化データ）を生成する。
// このモジュールはブラウザと Node（ビルド時プリレンダ）の両方から読み込まれるため、
// DOM API には一切触れない。DOM への反映は App.tsx、静的HTML化は scripts/prerender.ts が行う。
import type { PageView } from './router';
import { SHOPS, NEWS, COLUMNS } from '../constants';
import { SHOP_DETAILS } from '../shopData';
import type { NewsItem, ColumnItem } from '../types';

const ORIGIN = 'https://tsukijiunagisyokudo.jp';
const BRAND = '築地にっしん太助';
const SUFFIX = ' | ' + BRAND;
const DEFAULT_OG_IMAGE = ORIGIN + '/og-image.jpg';

// お知らせ一覧の1ページあたり件数。NewsListPage の表示と
// プリレンダが生成する /news/page/N の数をこの値で揃える。
export const NEWS_PER_PAGE = 20;

const DEFAULT_DESC =
  '築地場外市場に店を構える「築地にっしん太助」。うなぎ食堂・金のうなぎなど3店舗を展開。職人が一枚一枚丁寧に焼き上げる本格うなぎ料理をお手頃価格でお届けします。特許取得のJetChef加熱容器による宅配にも対応。';

// お知らせ・コラムは CMS から増えるため、参照先を差し替えられるようにしておく。
// 既定値は constants.tsx のフォールバックデータ。プリレンダ時は API から取得した実データを渡す。
export interface SeoData {
  news: NewsItem[];
  columns: ColumnItem[];
}

const DEFAULT_DATA: SeoData = { news: NEWS, columns: COLUMNS };

// 相対パスを絶対URLへ
function abs(pathOrUrl: string): string {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return ORIGIN + (pathOrUrl.startsWith('/') ? pathOrUrl : '/' + pathOrUrl);
}

// PageView から実URLのパスを復元する（canonical / OGP / パンくず用）
export function pathFor(page: PageView): string {
  switch (page.type) {
    case 'company': return '/company';
    case 'consumer': return '/consumer';
    case 'corporate': return '/corporate';
    case 'yochan': return '/yochan';
    case 'privacy': return '/privacy-policy';
    case 'newslist': return page.page > 1 ? `/news/page/${page.page}` : '/news';
    case 'news': return '/news/' + page.id;
    case 'article': return '/column/' + page.id;
    case 'shop': return '/shop/' + page.id;
    default: return '/';
  }
}

export function canonicalFor(page: PageView): string {
  return ORIGIN + pathFor(page);
}

// ──────────────── タイトル ────────────────
export function titleFor(page: PageView, data: SeoData = DEFAULT_DATA): string {
  switch (page.type) {
    case 'company': return '会社案内' + SUFFIX;
    case 'consumer': return '個人のお客様へ' + SUFFIX;
    case 'corporate': return '法人のお客様へ' + SUFFIX;
    case 'yochan': return 'ようちゃん（陽ちゃん）とは' + SUFFIX;
    case 'privacy': return '個人情報保護方針' + SUFFIX;
    case 'newslist':
      return (page.page > 1 ? `お知らせ一覧（${page.page}ページ目）` : 'お知らせ一覧') + SUFFIX;
    case 'news': {
      const n = data.news.find(x => x.id === page.id);
      return (n ? n.title : 'お知らせ') + SUFFIX;
    }
    case 'article': {
      const c = data.columns.find(x => x.id === page.id);
      return (c ? c.title : 'コラム') + SUFFIX;
    }
    case 'shop': {
      const s = SHOPS.find(x => x.id === page.id);
      return s ? `${s.name}｜${s.address}｜うなぎ専門店${SUFFIX}` : '店舗案内' + SUFFIX;
    }
    default: return '築地うなぎ食堂｜築地にっしん太助｜築地場外市場のうなぎ専門店';
  }
}

// ──────────────── ディスクリプション ────────────────
export function descriptionFor(page: PageView, data: SeoData = DEFAULT_DATA): string {
  switch (page.type) {
    case 'company':
      return '築地にっしん太助を運営する会社案内。築地場外市場発祥のうなぎ専門店として、職人の技と「本物の味をお手頃に」という私たちの想いをご紹介します。';
    case 'consumer':
      return '個人のお客様へ。築地うなぎ食堂・金のうなぎ各店でのお食事、テイクアウト、デリバリー、全国発送のお取り寄せ・ギフトまで、うなぎの愉しみ方をご案内します。';
    case 'corporate':
      return '法人のお客様へ。会議・イベント・接待に、特許取得のJetChef加熱容器で電子レンジ不要のあたたかいうなぎ弁当をお届け。ケータリング・大口注文に対応します。';
    case 'yochan':
      return '「ようちゃん（陽ちゃん）」とは — 築地にっしん太助のうなぎに込めた想いと物語。看板キャラクター「築地の陽ちゃん」と看板商品 YO CHAN BENTO の由来をご紹介します。';
    case 'privacy':
      return '築地にっしん太助（有限会社築地にっしん太助）の個人情報保護方針。お客さまの個人情報の管理・利用目的・第三者提供・安全対策・開示請求についてご案内します。';
    case 'newslist':
      return '築地にっしん太助からのお知らせ・最新情報の一覧。営業時間、イベント、特許・商標などの最新ニュースをご覧いただけます。';
    case 'news': {
      const n = data.news.find(x => x.id === page.id);
      return n
        ? `${n.title}（${n.date}）｜築地場外市場のうなぎ専門店「築地にっしん太助」からのお知らせです。`
        : '築地にっしん太助からのお知らせです。';
    }
    case 'article': {
      const c = data.columns.find(x => x.id === page.id);
      return c
        ? `${c.title}｜築地にっしん太助のコラム。うなぎとJetChefにまつわる読み物をお届けします。`
        : '築地にっしん太助のコラムです。';
    }
    case 'shop': {
      const d = SHOP_DETAILS[page.id];
      if (d) {
        const access = d.access[0] ? `${d.access[0]}。` : '';
        return `${d.name}（${d.address}）。${access}営業時間 ${d.hours}／TEL ${d.tel}。${d.subtitle}として、職人が焼き上げる本格うなぎをお手頃価格でご提供します。`;
      }
      const s = SHOPS.find(x => x.id === page.id);
      return s ? `${s.name}（${s.address}）。${s.description}` : DEFAULT_DESC;
    }
    default: return DEFAULT_DESC;
  }
}

/**
 * そのルートがインデックス対象かどうか。
 * 店舗は静的に確定しているため、未知のIDはここで弾ける。
 * お知らせ・コラムは CMS 次第なので判定できず、取得後に各ページが noindex を立てる。
 */
export function isIndexable(page: PageView): boolean {
  if (page.type === 'shop') return Boolean(SHOP_DETAILS[page.id]);
  return true;
}

// ──────────────── OGP 画像 ────────────────
export function ogImageFor(page: PageView): string {
  if (page.type === 'shop') {
    const d = SHOP_DETAILS[page.id];
    if (d?.heroImage) return abs(d.heroImage);
  }
  return DEFAULT_OG_IMAGE;
}

// ──────────────── キーワード（meta keywords） ────────────────
// Google のランキング要素ではないが、指定検索語での想起補助として各ページに付与する。
const BASE_KW =
  '築地うなぎ食堂,築地にっしん太助,有限会社築地にっしん太助,築地 うなぎ,築地うなぎ,うなぎ,金のうなぎ,築地場外市場,うな重,鰻,蒲焼き,JetChef,ジェットシェフ,陽ちゃん,ようちゃん,東京';

export function keywordsFor(page: PageView): string {
  switch (page.type) {
    case 'company':
      return '会社案内,会社概要,有限会社築地にっしん太助,' + BASE_KW;
    case 'yochan':
      return '陽ちゃん,築地の陽ちゃん,ようちゃん,YO-chan,YO CHAN BENTO,うなぎ弁当,' + BASE_KW;
    case 'corporate':
      return '法人のお客様,ケータリング,うなぎ弁当,JetChef,ジェットシェフ,会議,接待,イベント,' + BASE_KW;
    case 'consumer':
      return 'テイクアウト,デリバリー,お取り寄せ,ギフト,全国発送,' + BASE_KW;
    case 'shop': {
      const s = SHOPS.find(x => x.id === page.id);
      const d = SHOP_DETAILS[page.id];
      const station = d?.access[0]?.match(/「(.+?)」/)?.[1] ?? '';
      return (s ? s.name + ',' + s.address + ',' : '') + (station ? station + ',' : '') + BASE_KW;
    }
    default:
      return BASE_KW;
  }
}

// ──────────────── パンくずリスト（BreadcrumbList） ────────────────
function breadcrumbLd(page: PageView, data: SeoData): object | null {
  const items: { name: string; url: string }[] = [{ name: 'ホーム', url: ORIGIN + '/' }];
  const push = (name: string, path: string) => items.push({ name, url: ORIGIN + path });
  switch (page.type) {
    case 'company': push('会社案内', '/company'); break;
    case 'consumer': push('個人のお客様へ', '/consumer'); break;
    case 'corporate': push('法人のお客様へ', '/corporate'); break;
    case 'yochan': push('ようちゃんとは', '/yochan'); break;
    case 'privacy': push('個人情報保護方針', '/privacy-policy'); break;
    case 'newslist': push('お知らせ', '/news'); break;
    case 'news': {
      push('お知らせ', '/news');
      const n = data.news.find(x => x.id === page.id);
      if (n) push(n.title, '/news/' + n.id);
      break;
    }
    case 'article': {
      const c = data.columns.find(x => x.id === page.id);
      if (c) push(c.title, '/column/' + c.id);
      break;
    }
    case 'shop': {
      const s = SHOPS.find(x => x.id === page.id);
      if (s) push(s.name, '/shop/' + s.id);
      break;
    }
    default: return null; // ホームはパンくず不要
  }
  if (items.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

// ──────────────── JSON-LD 構造化データ ────────────────
// 住所文字列を PostalAddress へ分解（例: 〒104-0045 東京都中央区築地4-13-18）
function parseAddress(addr: string): Record<string, string> {
  const base: Record<string, string> = { '@type': 'PostalAddress', addressCountry: 'JP' };
  const zip = addr.match(/〒?(\d{3}-\d{4})/);
  const rest = addr.replace(/〒?\d{3}-\d{4}\s*/, '').trim();
  if (zip) base.postalCode = zip[1];
  const m = rest.match(/^(.+?[都道府県])(.+?[市区町村])(.+)$/);
  if (m) return { ...base, addressRegion: m[1], addressLocality: m[2], streetAddress: m[3] };
  return { ...base, streetAddress: rest };
}

// 店舗の Google マップ埋め込みURLから緯度経度を取り出す（!2d=経度 / !3d=緯度）。
// 座標を新たに推測はせず、既存データに含まれる値のみを使う。
function parseGeo(mapsUrl: string): { lat: number; lng: number } | null {
  const lng = mapsUrl.match(/!2d(-?\d+\.\d+)/);
  const lat = mapsUrl.match(/!3d(-?\d+\.\d+)/);
  if (!lng || !lat) return null;
  return { lat: parseFloat(lat[1]), lng: parseFloat(lng[1]) };
}

// 営業時間の構造化（constants の hours 文字列と整合させて手動定義）
const OPENING_HOURS: Record<string, object[]> = {
  tsukiji: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '10:00', closes: '20:00' },
  ],
  kaminoge: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '15:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '17:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '11:00', closes: '20:00' },
  ],
  nakamurabashi: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '11:00', closes: '15:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '17:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '11:00', closes: '20:00' },
  ],
};

// 店舗のおすすめメニューを Menu 構造化データへ。
// 価格が未設定のメニューには offers を付けない（存在しない価格を作らない）。
function menuLd(shopId: string): object | null {
  const d = SHOP_DETAILS[shopId];
  if (!d || !d.menuHighlights.length) return null;
  return {
    '@type': 'Menu',
    name: `${d.name} おすすめメニュー`,
    hasMenuSection: [{
      '@type': 'MenuSection',
      name: 'おすすめ',
      hasMenuItem: d.menuHighlights.map(m => {
        const item: Record<string, unknown> = {
          '@type': 'MenuItem',
          name: m.name,
          description: m.description,
        };
        if (m.image) item.image = abs(m.image);
        const yen = m.price?.match(/[\d,]+/)?.[0]?.replace(/,/g, '');
        if (yen) {
          item.offers = { '@type': 'Offer', price: yen, priceCurrency: 'JPY' };
        }
        return item;
      }),
    }],
  };
}

function restaurantLd(shop: typeof SHOPS[number]): object {
  const d = SHOP_DETAILS[shop.id];
  const ld: Record<string, unknown> = {
    '@type': 'Restaurant',
    '@id': `${ORIGIN}/shop/${shop.id}#restaurant`,
    name: shop.name,
    url: `${ORIGIN}/shop/${shop.id}`,
    image: d?.gallery?.length ? d.gallery.map(abs) : abs(shop.image),
    description: d?.description?.[0] ?? shop.description,
    servesCuisine: ['うなぎ', '和食'],
    priceRange: '¥¥',
    currenciesAccepted: 'JPY',
    telephone: shop.tel,
    address: parseAddress(d?.address ?? shop.address),
    acceptsReservations: true,
    parentOrganization: { '@type': 'Organization', name: BRAND, url: ORIGIN + '/' },
  };
  const geo = d ? parseGeo(d.googleMapsUrl) : null;
  if (geo) {
    ld.geo = { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng };
    ld.hasMap = `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`;
  }
  const menu = menuLd(shop.id);
  if (menu) ld.hasMenu = menu;
  if (OPENING_HOURS[shop.id]) ld.openingHoursSpecification = OPENING_HOURS[shop.id];
  return ld;
}

// ルートに応じた JSON-LD（@graph）。WebSite / Organization は index.html に静的掲載済みのため、
// ここでは Restaurant（店舗）・記事・パンくずのみを動的に付与する。
export function jsonLdFor(page: PageView, data: SeoData = DEFAULT_DATA): { '@context': string; '@graph': object[] } {
  const graph: object[] = [];
  if (page.type === 'home') {
    SHOPS.forEach(s => graph.push(restaurantLd(s)));
  } else if (page.type === 'shop') {
    const s = SHOPS.find(x => x.id === page.id);
    if (s) graph.push(restaurantLd(s));
  } else if (page.type === 'news' || page.type === 'article') {
    const item = page.type === 'news'
      ? data.news.find(x => x.id === page.id)
      : data.columns.find(x => x.id === page.id);
    if (item) {
      // 日付は "2025.08.16" 形式。ISO 8601 へ変換できたときだけ付与する。
      const iso = item.date.match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})$/);
      const article: Record<string, unknown> = {
        '@type': page.type === 'news' ? 'NewsArticle' : 'Article',
        '@id': ORIGIN + pathFor(page) + '#article',
        headline: item.title,
        url: ORIGIN + pathFor(page),
        inLanguage: 'ja',
        author: { '@type': 'Organization', name: BRAND, url: ORIGIN + '/' },
        publisher: { '@id': `${ORIGIN}/#organization` },
        mainEntityOfPage: ORIGIN + pathFor(page),
      };
      if (iso) {
        article.datePublished = `${iso[1]}-${iso[2].padStart(2, '0')}-${iso[3].padStart(2, '0')}`;
      }
      const img = (item as ColumnItem).image;
      if (img) article.image = abs(img);
      graph.push(article);
    }
  }
  const bc = breadcrumbLd(page, data);
  if (bc) graph.push(bc);
  return { '@context': 'https://schema.org', '@graph': graph };
}
