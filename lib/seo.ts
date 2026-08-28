// ルートごとの SEO メタ情報（title / description / JSON-LD 構造化データ）を生成する。
// DOM への反映は App.tsx 側で行う（ここは純粋なデータ生成のみ）。
import { PageView } from './router';
import { SHOPS, NEWS, COLUMNS } from '../constants';

const ORIGIN = 'https://tsukijiunagisyokudo.jp';
const BRAND = '築地にっしん太助';
const SUFFIX = ' | ' + BRAND;
const INSTAGRAM = 'https://www.instagram.com/tsukijiunagi/';

const DEFAULT_DESC =
  '築地場外市場に店を構える「築地にっしん太助」。うなぎ食堂・金のうなぎなど3店舗を展開。職人が一枚一枚丁寧に焼き上げる本格うなぎ料理をお手頃価格でお届けします。特許取得のJetChef加熱容器による宅配にも対応。';

// 相対パスを絶対URLへ
function abs(pathOrUrl: string): string {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return ORIGIN + (pathOrUrl.startsWith('/') ? pathOrUrl : '/' + pathOrUrl);
}

// ──────────────── タイトル ────────────────
export function titleFor(page: PageView): string {
  switch (page.type) {
    case 'company': return '会社案内' + SUFFIX;
    case 'consumer': return '個人のお客様へ' + SUFFIX;
    case 'corporate': return '法人のお客様へ' + SUFFIX;
    case 'yochan': return 'ようちゃん（陽ちゃん）とは' + SUFFIX;
    case 'privacy': return '個人情報保護方針' + SUFFIX;
    case 'newslist': return 'お知らせ一覧' + SUFFIX;
    case 'news': {
      const n = NEWS.find(x => x.id === page.id);
      return (n ? n.title : 'お知らせ') + SUFFIX;
    }
    case 'article': {
      const c = COLUMNS.find(x => x.id === page.id);
      return (c ? c.title : 'コラム') + SUFFIX;
    }
    case 'shop': {
      const s = SHOPS.find(x => x.id === page.id);
      return (s ? s.name : '店舗案内') + SUFFIX;
    }
    default: return '築地うなぎ食堂｜築地にっしん太助｜築地場外市場のうなぎ専門店';
  }
}

// ──────────────── ディスクリプション ────────────────
export function descriptionFor(page: PageView): string {
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
      const n = NEWS.find(x => x.id === page.id);
      return n
        ? `${n.title}（${n.date}）｜築地場外市場のうなぎ専門店「築地にっしん太助」からのお知らせです。`
        : '築地にっしん太助からのお知らせです。';
    }
    case 'article': {
      const c = COLUMNS.find(x => x.id === page.id);
      return c
        ? `${c.title}｜築地にっしん太助のコラム。うなぎとJetChefにまつわる読み物をお届けします。`
        : '築地にっしん太助のコラムです。';
    }
    case 'shop': {
      const s = SHOPS.find(x => x.id === page.id);
      return s ? `${s.name}（${s.address}）。${s.description}` : DEFAULT_DESC;
    }
    default: return DEFAULT_DESC;
  }
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
      return (s ? s.name + ',' + s.address + ',' : '') + BASE_KW;
    }
    default:
      return BASE_KW;
  }
}

// ──────────────── パンくずリスト（BreadcrumbList） ────────────────
function breadcrumbLd(page: PageView): object | null {
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
      const n = NEWS.find(x => x.id === page.id);
      if (n) push(n.title, '/news/' + n.id);
      break;
    }
    case 'article': {
      const c = COLUMNS.find(x => x.id === page.id);
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
// 住所文字列を PostalAddress へ分解（例: 東京都中央区築地4-13-18）
function parseAddress(addr: string): Record<string, string> {
  const base: Record<string, string> = { '@type': 'PostalAddress', addressCountry: 'JP' };
  const m = addr.match(/^(.+?[都道府県])(.+?[市区町村])(.+)$/);
  if (m) return { ...base, addressRegion: m[1], addressLocality: m[2], streetAddress: m[3] };
  return { ...base, streetAddress: addr };
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

function restaurantLd(shop: typeof SHOPS[number]): object {
  const ld: Record<string, unknown> = {
    '@type': 'Restaurant',
    '@id': `${ORIGIN}/shop/${shop.id}#restaurant`,
    name: shop.name,
    url: `${ORIGIN}/shop/${shop.id}`,
    image: abs(shop.image),
    description: shop.description,
    servesCuisine: ['うなぎ', '和食'],
    priceRange: '¥¥',
    telephone: shop.tel,
    address: parseAddress(shop.address),
    parentOrganization: { '@type': 'Organization', name: BRAND, url: ORIGIN + '/' },
  };
  if (OPENING_HOURS[shop.id]) ld.openingHoursSpecification = OPENING_HOURS[shop.id];
  return ld;
}

// ルートに応じた JSON-LD（@graph）。WebSite / Organization は index.html に静的掲載済みのため、
// ここでは Restaurant（店舗）のみを動的に付与する。該当なしのページは空配列。
export function jsonLdFor(page: PageView): { '@context': string; '@graph': object[] } {
  const graph: object[] = [];
  if (page.type === 'home') {
    SHOPS.forEach(s => graph.push(restaurantLd(s)));
  } else if (page.type === 'shop') {
    const s = SHOPS.find(x => x.id === page.id);
    if (s) graph.push(restaurantLd(s));
  }
  const bc = breadcrumbLd(page);
  if (bc) graph.push(bc);
  return { '@context': 'https://schema.org', '@graph': graph };
}
