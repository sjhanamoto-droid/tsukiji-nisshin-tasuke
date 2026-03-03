import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { NEWS_ARTICLES } from '../newsData';
import { LoadingSpinner } from './LoadingSpinner';
import { isMicroCMSConfigured, getNewsDetail } from '../lib/microcms';
import { useFetch } from '../lib/useMicroCMS';
import { toNewsArticle } from '../lib/transforms';
import type { NewsArticleWithHtml } from '../lib/transforms';

interface NewsPageProps {
  newsId: string;
  onBack: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ newsId, onBack }) => {
  const { data: cmsData, loading, error } = useFetch(
    () => (isMicroCMSConfigured ? getNewsDetail(newsId) : Promise.reject('not configured')),
    [newsId],
  );

  // CMS data or fallback to hardcoded
  const article: NewsArticleWithHtml | null = cmsData
    ? toNewsArticle(cmsData)
    : (!loading || error ? (NEWS_ARTICLES[newsId] ?? null) : null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [newsId]);

  if (loading && isMicroCMSConfigured) {
    return (
      <div className="min-h-screen bg-brand-cream">
        <div
          className="fixed top-0 left-0 w-full z-50 py-3"
          style={{ background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        >
          <div className="max-w-4xl mx-auto px-5 flex items-center">
            <button onClick={onBack} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={18} strokeWidth={1.5} />
              <span className="text-[13px] tracking-wide" style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}>
                お知らせ一覧に戻る
              </span>
            </button>
          </div>
        </div>
        <div className="pt-24"><LoadingSpinner /></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-gray mb-4">お知らせが見つかりません</p>
          <button onClick={onBack} className="text-brand-gold hover:underline">
            トップに戻る
          </button>
        </div>
      </div>
    );
  }

  const hasImages = article.images && article.images.length > 0;

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
              お知らせ一覧に戻る
            </span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <motion.article
        className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 pt-24 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-[13px]"
            style={{ color: '#475569', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
          >
            {article.date}
          </span>
          <span
            className="text-[11px] px-2.5 py-0.5 tracking-wide"
            style={{
              color: '#B45309',
              background: 'rgba(180,83,9,0.08)',
              fontFamily: '"Noto Sans JP", sans-serif',
              fontWeight: 500,
            }}
          >
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-serif text-2xl md:text-3xl leading-snug mb-10"
          style={{ color: '#0f0f0f', fontWeight: 700 }}
        >
          {article.title}
        </h1>

        {/* Divider */}
        <div
          className="w-12 h-[2px] mb-10"
          style={{ background: 'rgba(180,83,9,0.4)' }}
        />

        {/* Body content */}
        {article.htmlContent ? (
          <div
            className="cms-content space-y-5"
            style={{ color: '#475569', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300, fontSize: '15px', lineHeight: '1.95' }}
            dangerouslySetInnerHTML={{ __html: article.htmlContent }}
          />
        ) : (
          <div className="space-y-5">
            {article.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-[15px] leading-[1.95]"
                style={{
                  color: '#475569',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontWeight: 300,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {/* Images */}
        {hasImages && (
          <div className="mt-12 space-y-6">
            {article.images!.map((img, idx) => (
              <motion.div
                key={idx}
                className="overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <img
                  src={img}
                  alt={`${article.title} - ${idx + 1}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Back button */}
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
              お知らせ一覧に戻る
            </span>
          </button>
        </div>
      </motion.article>
    </div>
  );
};
