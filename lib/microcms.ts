import { createClient } from 'microcms-js-sdk';

// ── microCMS response types ──

export interface MicroCMSImage {
  url: string;
  height?: number;
  width?: number;
}

export interface MicroCMSNewsItem {
  id: string;
  title: string;
  date: string;
  category: string[];
  paragraphs: string; // Rich editor HTML
  images?: MicroCMSImage[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MicroCMSArticleSection {
  fieldId: string;
  heading?: string;
  body?: string; // Rich editor HTML
  quote?: string;
  list?: string; // Rich editor HTML
  image?: MicroCMSImage;
}

export interface MicroCMSColumn {
  id: string;
  title: string;
  date: string;
  category: string;
  coverImage: MicroCMSImage;
  sections: MicroCMSArticleSection[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// ── Client ──

const serviceDomain = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.VITE_MICROCMS_API_KEY;

const isConfigured = serviceDomain && apiKey &&
  serviceDomain !== 'your-service-domain' &&
  apiKey !== 'your-api-key';

const client = isConfigured
  ? createClient({ serviceDomain, apiKey })
  : null;

// ── sessionStorage cache ──

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCached<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(`microcms:${key}`);
    if (!raw) return null;
    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL) {
      sessionStorage.removeItem(`microcms:${key}`);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(`microcms:${key}`, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch {
    // sessionStorage full or unavailable
  }
}

async function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = getCached<T>(key);
  if (cached) return cached;

  const data = await fetcher();
  setCache(key, data);
  return data;
}

// ── Public API ──

export async function getNewsList(limit = 100, offset = 0): Promise<MicroCMSListResponse<MicroCMSNewsItem>> {
  if (!client) throw new Error('microCMS not configured');
  return cachedFetch(
    `news-list-${limit}-${offset}`,
    () => client.get({ endpoint: 'news', queries: { limit, offset, orders: '-date' } }),
  );
}

export async function getNewsDetail(id: string): Promise<MicroCMSNewsItem> {
  if (!client) throw new Error('microCMS not configured');

  // Try to find in cached list first
  const listCache = getCached<MicroCMSListResponse<MicroCMSNewsItem>>('news-list-100-0');
  if (listCache) {
    const found = listCache.contents.find(item => item.id === id);
    if (found) return found;
  }

  return cachedFetch(
    `news-${id}`,
    () => client.get({ endpoint: 'news', contentId: id }),
  );
}

export async function getColumnsList(limit = 100, offset = 0): Promise<MicroCMSListResponse<MicroCMSColumn>> {
  if (!client) throw new Error('microCMS not configured');
  return cachedFetch(
    `columns-list-${limit}-${offset}`,
    () => client.get({ endpoint: 'columns', queries: { limit, offset, orders: '-date' } }),
  );
}

export async function getColumnDetail(id: string): Promise<MicroCMSColumn> {
  if (!client) throw new Error('microCMS not configured');

  const listCache = getCached<MicroCMSListResponse<MicroCMSColumn>>('columns-list-100-0');
  if (listCache) {
    const found = listCache.contents.find(item => item.id === id);
    if (found) return found;
  }

  return cachedFetch(
    `column-${id}`,
    () => client.get({ endpoint: 'columns', contentId: id }),
  );
}

export { isConfigured as isMicroCMSConfigured };
