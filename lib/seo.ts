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
    case 'yochan': return 'ようちゃんとは' + SUFFIX;
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
    default: return BRAND + ' | 築地場外市場のうなぎ専門店';
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
      return '「ようちゃん」とは — 築地にっしん太助のうなぎに込めた想いと物語。看板商品 YO CHAN BENTO の由来をご紹介します。';
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
  return { '@context': 'https://schema.org', '@graph': graph };
}
