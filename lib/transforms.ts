import type { NewsItem, ColumnItem } from '../types';
import type { NewsArticle } from '../newsData';
import type { Article, ArticleSection } from '../articles';
import type {
  MicroCMSNewsItem,
  MicroCMSColumn,
  MicroCMSArticleSection,
} from './microcms';

// ── Extended types with HTML content ──

export interface NewsArticleWithHtml extends NewsArticle {
  htmlContent?: string;
}

export interface ArticleSectionWithHtml extends ArticleSection {
  htmlBody?: string;
  htmlList?: string;
}

export interface ArticleWithHtml extends Omit<Article, 'sections'> {
  sections: ArticleSectionWithHtml[];
}

// ── Image helpers ──

export function optimizeImageUrl(url: string, width?: number): string {
  if (!url) return '';
  return width ? `${url}?w=${width}` : url;
}

// ── News transforms ──

export function toNewsItem(item: MicroCMSNewsItem): NewsItem {
  return {
    id: item.id,
    date: item.date,
    category: Array.isArray(item.category) ? item.category[0] ?? '' : item.category,
    title: item.title,
  };
}

export function toNewsArticle(item: MicroCMSNewsItem): NewsArticleWithHtml {
  return {
    id: item.id,
    date: item.date,
    category: Array.isArray(item.category) ? item.category[0] ?? '' : item.category,
    title: item.title,
    paragraphs: [],
    htmlContent: item.paragraphs,
    images: item.images?.map(img => optimizeImageUrl(img.url, 1000)) ?? [],
  };
}

// ── Column/Article transforms ──

export function toColumnItem(item: MicroCMSColumn): ColumnItem {
  return {
    id: item.id,
    date: item.date,
    category: item.category,
    title: item.title,
    image: optimizeImageUrl(item.coverImage.url, 800),
  };
}

export function toArticle(item: MicroCMSColumn): ArticleWithHtml {
  return {
    title: item.title,
    date: item.date,
    category: item.category,
    coverImage: optimizeImageUrl(item.coverImage.url, 1200),
    sections: item.sections.map(toArticleSection),
  };
}

function toArticleSection(s: MicroCMSArticleSection): ArticleSectionWithHtml {
  return {
    heading: s.heading,
    paragraphs: [],
    htmlBody: s.body,
    quote: s.quote,
    list: [],
    htmlList: s.list,
    image: s.image?.url ? optimizeImageUrl(s.image.url, 1000) : undefined,
  };
}
