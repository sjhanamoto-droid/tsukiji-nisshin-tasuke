// 公開サイトのデータソース。自前CMSのAPI（/api/news, /api/columns）から取得し、
// 既存コンポーネントが使う型（NewsItem / ColumnItem / *WithHtml）へ変換する。
import type { NewsItem, ColumnItem } from '../types';
import type { NewsArticleWithHtml, ArticleWithHtml } from './transforms';

interface ApiNews {
  id: string; title: string; category: string; date: string;
  coverImageUrl: string | null; contentHtml: string; images: string[];
}
interface ApiColumn {
  id: string; title: string; category: string; date: string;
  coverImageUrl: string | null; contentHtml: string;
}

async function jget<T>(path: string): Promise<T> {
  const res = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

// ── News ──
export async function fetchNewsList(): Promise<NewsItem[]> {
  const { items } = await jget<{ items: ApiNews[] }>('/api/news');
  return items.map((r) => ({ id: r.id, date: r.date, category: r.category, title: r.title }));
}

export async function fetchNewsDetail(id: string): Promise<NewsArticleWithHtml> {
  const { item } = await jget<{ item: ApiNews }>(`/api/news/${encodeURIComponent(id)}`);
  return {
    id: item.id,
    date: item.date,
    category: item.category,
    title: item.title,
    paragraphs: [],
    htmlContent: item.contentHtml,
    images: item.images ?? [],
  };
}

// ── Columns ──
export async function fetchColumnList(): Promise<ColumnItem[]> {
  const { items } = await jget<{ items: ApiColumn[] }>('/api/columns');
  return items.map((r) => ({
    id: r.id, date: r.date, category: r.category, title: r.title, image: r.coverImageUrl || '',
  }));
}

export async function fetchColumnDetail(id: string): Promise<ArticleWithHtml> {
  const { item } = await jget<{ item: ApiColumn }>(`/api/columns/${encodeURIComponent(id)}`);
  // 本文はエディタ出力の1つのHTMLブロブ。ArticlePageは section[].htmlBody を描画するので、
  // 1セクションとして渡せば既存コンポーネントを無改修で流用できる。
  return {
    title: item.title,
    date: item.date,
    category: item.category,
    coverImage: item.coverImageUrl || '',
    sections: [
      { heading: undefined, paragraphs: [], htmlBody: item.contentHtml, quote: undefined, list: [], htmlList: undefined, image: undefined },
    ],
  };
}
