import React, { useEffect } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NEWS_ARTICLES } from '../newsData';
import { LoadingSpinner } from './LoadingSpinner';
import { isMicroCMSConfigured, getNewsList } from '../lib/microcms';
import { useFetch } from '../lib/useMicroCMS';
import { toNewsItem } from '../lib/transforms';
import type { NewsItem } from '../types';

interface NewsListPageProps {
  page: number;
  onBack: () => void;
}

const PER_PAGE = 20;

// Fallback: hardcoded data sorted by date descending
const fallbackNews: NewsItem[] = Object.values(NEWS_ARTICLES)
  .sort((a, b) => b.date.replace(/\./g, '').localeCompare(a.date.replace(/\./g, '')))
  .map(n => ({ id: n.id, date: n.date, category: n.category, title: n.title }));

export const NewsListPage: React.FC<NewsListPageProps> = ({ page, onBack }) => {
  const offset = (Math.max(1, page) - 1) * PER_PAGE;

  const { data, loading, error } = useFetch(
    () => (isMicroCMSConfigured ? getNewsList(PER_PAGE, offset) : Promise.reject('not configured')),
    [page],
  );

  // Derive items and pagination from CMS or fallback
  let pageItems: NewsItem[];
  let totalPages: number;
  let currentPage: number;

  if (data) {
    pageItems = data.contents.map(toNewsItem);
    totalPages = Math.ceil(data.totalCount / PER_PAGE);
    currentPage = Math.max(1, Math.min(page, totalPages));
  } else {
    totalPages = Math.ceil(fallbackNews.length / PER_PAGE);
    currentPage = Math.max(1, Math.min(page, totalPages));
    const start = (currentPage - 1) * PER_PAGE;
    pageItems = fallbackNews.slice(start, start + PER_PAGE);
  }

  const showSpinner = loading && isMicroCMSConfigured;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Fixed header */}
      <div
        className="fixed top-0 left-0 w-full z-50 py-3"
        style={{
          background: 'rgba(15,15,15,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-4xl mx-auto px-5 flex items-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span
              className="text-[13px] tracking-wide"
              style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            >
              トップページに戻る
            </span>
          </button>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-4xl mx-auto px-5 lg:px-8 pt-24 pb-20">
        {/* Title */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="font-serif text-3xl md:text-4xl mb-3"
            style={{ color: '#0f0f0f', fontWeight: 700 }}
          >
            NEWS
          </h1>
          <p
            className="text-[13px] tracking-wide"
            style={{ color: '#475569', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
          >
            お知らせ一覧
          </p>
        </motion.div>

        {showSpinner ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* News list */}
            <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              {pageItems.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#news/${item.id}`}
                  className="block py-6 flex flex-col md:flex-row md:items-center group no-underline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                >
                  <div className="flex items-center mb-2 md:mb-0 md:w-52 shrink-0">
                    <span
                      className="text-[13px]"
                      style={{ color: '#94a3b8', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
                    >
                      {item.date}
                    </span>
                    <span
                      className="ml-4 text-[11px] px-2.5 py-0.5 tracking-wide"
                      style={{
                        color: '#B45309',
                        background: 'rgba(180,83,9,0.08)',
                        fontFamily: '"Noto Sans JP", sans-serif',
                        fontWeight: 500,
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="flex-grow flex items-center justify-between gap-4">
                    <h3
                      className="text-[15px] md:text-base leading-relaxed group-hover:text-amber-700 transition-colors"
                      style={{
                        color: '#0f0f0f',
                        fontFamily: '"Noto Sans JP", sans-serif',
                        fontWeight: 400,
                      }}
                    >
                      {item.title}
                    </h3>
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-gray-300 group-hover:text-amber-700 transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-14 flex justify-center">
                {currentPage < totalPages && (
                  <a
                    href={`#newslist/${currentPage + 1}`}
                    className="inline-flex items-center gap-2 px-8 py-3 text-[13px] tracking-wide no-underline transition-colors"
                    style={{
                      color: '#B45309',
                      border: '1px solid rgba(180,83,9,0.3)',
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(180,83,9,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(180,83,9,0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(180,83,9,0.3)';
                    }}
                  >
                    次のページへ
                    <ChevronRight size={14} strokeWidth={1.5} />
                  </a>
                )}
              </div>
            )}

            {/* Page indicator */}
            {totalPages > 1 && (
              <div className="mt-6 text-center">
                <span
                  className="text-[12px]"
                  style={{ color: '#94a3b8', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
                >
                  {currentPage} / {totalPages}
                </span>
              </div>
            )}
          </>
        )}

        {/* Back to top */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-brand-gray hover:text-brand-gold transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            <span
              className="text-[13px] tracking-wide"
              style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
            >
              トップページに戻る
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
