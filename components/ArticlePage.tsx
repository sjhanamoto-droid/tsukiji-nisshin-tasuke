import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ARTICLES } from '../articles';
import { LoadingSpinner } from './LoadingSpinner';
import { isMicroCMSConfigured, getColumnDetail } from '../lib/microcms';
import { useFetch } from '../lib/useMicroCMS';
import { toArticle } from '../lib/transforms';
import type { ArticleWithHtml, ArticleSectionWithHtml } from '../lib/transforms';

interface ArticlePageProps {
  articleId: string;
  onBack: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ articleId, onBack }) => {
  const { data: cmsData, loading, error } = useFetch(
    () => (isMicroCMSConfigured ? getColumnDetail(articleId) : Promise.reject('not configured')),
    [articleId],
  );

  const article: ArticleWithHtml | null = cmsData
    ? toArticle(cmsData)
    : (!loading || error ? (ARTICLES[articleId] ?? null) : null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

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
                コラム一覧に戻る
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
          <p className="text-brand-gray mb-4">記事が見つかりません</p>
          <button onClick={onBack} className="text-brand-gold hover:underline">トップに戻る</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header bar */}
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
              コラム一覧に戻る
            </span>
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-transparent to-black/30" />
      </div>

      {/* Article content */}
      <motion.article
        className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 -mt-16 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-[12px]"
            style={{ color: '#475569', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
          >
            {article.date}
          </span>
          <span
            className="text-[11px] px-2 py-0.5 tracking-wide"
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
          className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug mb-10"
          style={{ color: '#0f0f0f', fontWeight: 700 }}
        >
          {article.title}
        </h1>

        {/* Body sections */}
        <div className="space-y-12">
          {article.sections.map((section: ArticleSectionWithHtml, idx: number) => (
            <section key={idx}>
              {section.heading && (
                <h2
                  className="font-serif text-xl md:text-2xl mb-5 pb-3"
                  style={{
                    color: '#0f0f0f',
                    fontWeight: 600,
                    borderBottom: '1px solid rgba(180,83,9,0.15)',
                  }}
                >
                  {section.heading}
                </h2>
              )}

              {/* Body: HTML from CMS or plain paragraphs */}
              {section.htmlBody ? (
                <div
                  className="cms-content mb-4"
                  style={{
                    color: '#475569',
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 300,
                    fontSize: '15px',
                    lineHeight: '1.9',
                  }}
                  dangerouslySetInnerHTML={{ __html: section.htmlBody }}
                />
              ) : (
                section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[15px] leading-[1.9] mb-4"
                    style={{
                      color: '#475569',
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    {p}
                  </p>
                ))
              )}

              {section.quote && (
                <blockquote
                  className="my-6 pl-5 py-3"
                  style={{ borderLeft: '3px solid #B45309' }}
                >
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{
                      color: '#0f0f0f',
                      fontFamily: '"Noto Serif JP", serif',
                      fontWeight: 400,
                    }}
                  >
                    {section.quote}
                  </p>
                </blockquote>
              )}

              {/* List: HTML from CMS or plain list items */}
              {section.htmlList ? (
                <div
                  className="cms-list my-5"
                  style={{
                    color: '#475569',
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 300,
                    fontSize: '14px',
                    lineHeight: '1.7',
                  }}
                  dangerouslySetInnerHTML={{ __html: section.htmlList }}
                />
              ) : (
                section.list && section.list.length > 0 && (
                  <ul className="my-5 space-y-2">
                    {section.list.map((item, lIdx) => (
                      <li
                        key={lIdx}
                        className="flex items-start gap-3 text-[14px] leading-relaxed"
                        style={{
                          color: '#475569',
                          fontFamily: '"Noto Sans JP", sans-serif',
                          fontWeight: 300,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              )}

              {section.image && (
                <div className="my-8 overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.heading || ''}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              )}
            </section>
          ))}
        </div>

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
              コラム一覧に戻る
            </span>
          </button>
        </div>
      </motion.article>
    </div>
  );
};
