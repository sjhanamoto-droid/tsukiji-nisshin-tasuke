import React, { useEffect } from 'react';
import { ArrowLeft, Stethoscope, Users, Presentation, Crown, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface CorporatePageProps {
  onBack: () => void;
}

const SERVICES = [
  {
    num: '01',
    title: 'MR様向け',
    subtitle: 'For Medical Representatives',
    desc: '医師・医療従事者への説明会やランチョンセミナーに最適。JetChefの加熱容器で、電子レンジ不要の温かいお弁当をお届けします。',
    detail: '紐を引くだけで温かいお食事を。医療現場の制約に配慮した設計です。',
    icon: Stethoscope,
    image: '/images/kinunagi/unagi-king.jpg',
  },
  {
    num: '02',
    title: '大量注文',
    subtitle: 'Bulk Orders',
    desc: '社内イベント、周年行事、式典、懇親会など、大人数のお食事に対応。ご予算・人数に合わせたプランをご提案します。',
    detail: '50食から500食以上まで、柔軟に対応いたします。',
    icon: Users,
    image: '/images/kinunagi/hitumabusi.jpg',
  },
  {
    num: '03',
    title: '会議・研修向け弁当',
    subtitle: 'Meeting & Training',
    desc: '役員会議、取締役会、社内研修のランチに。JetChef容器で紐を引くだけ、配膳の手間なく温かいお食事を提供できます。',
    detail: '電源不要・静音。会議の進行を妨げません。',
    icon: Presentation,
    image: '/images/blog/delivery-unagi.jpg',
  },
  {
    num: '04',
    title: '接待・催事向け弁当',
    subtitle: 'Hospitality & Events',
    desc: 'VIPのお客様への接待、催事・展示会でのお弁当に。築地の名店の味で、特別なシーンを演出します。',
    detail: '高級感のある見た目とクオリティでお客様に喜ばれます。',
    icon: Crown,
    image: '/images/kinunagi/shirokabayaki.jpg',
  },
];

export const CorporatePage: React.FC<CorporatePageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Fixed header */}
      <div
        className="fixed top-0 left-0 w-full z-50 py-3"
        style={{
          background: 'rgba(10,10,10,0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span
              className="text-[13px] tracking-wide"
              style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            >
              トップページに戻る
            </span>
          </button>
          <img
            src="/images/logo/logo-wh.png"
            alt="築地にっしん太助"
            className="h-8 opacity-60"
          />
        </div>
      </div>

      {/* Hero header */}
      <div className="pt-24 pb-12 md:pt-28 md:pb-16 px-5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{ color: 'rgba(180,83,9,0.7)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
            >
              For Corporate Customers
            </span>
            <h1
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-snug mb-4"
              style={{ fontWeight: 600 }}
            >
              法人のお客様へ
            </h1>
            <p
              className="text-[15px] max-w-xl leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.45)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            >
              ビジネスシーンに合わせた4つのプランで、築地の味をお届けします。
            </p>
          </motion.div>
        </div>
      </div>

      {/* Four service cards — 2x2 grid */}
      <div className="px-5 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              className="group relative overflow-hidden"
              style={{
                minHeight: '480px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + idx * 0.1 }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.92) 70%, rgba(10,10,10,0.97) 100%)',
                  }}
                />
              </div>

              {/* Gold top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(90deg, #B45309, rgba(180,83,9,0.1))',
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-7 lg:p-8">
                {/* Number */}
                <div className="mb-auto pt-2">
                  <span
                    className="text-[40px] leading-none transition-colors duration-300 group-hover:text-brand-gold"
                    style={{
                      color: 'rgba(255,255,255,0.08)',
                      fontFamily: '"Noto Serif JP", serif',
                      fontWeight: 700,
                    }}
                  >
                    {service.num}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center mb-5"
                  style={{
                    border: '1px solid rgba(180,83,9,0.35)',
                    background: 'rgba(180,83,9,0.08)',
                  }}
                >
                  <service.icon size={20} strokeWidth={1.5} style={{ color: '#d4a574' }} />
                </div>

                {/* Title */}
                <h2
                  className="font-serif text-2xl md:text-3xl text-white mb-1"
                  style={{ fontWeight: 600 }}
                >
                  {service.title}
                </h2>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase mb-5"
                  style={{ color: 'rgba(180,83,9,0.6)', fontWeight: 400 }}
                >
                  {service.subtitle}
                </span>

                {/* Description */}
                <p
                  className="text-[14px] leading-relaxed mb-2"
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
                >
                  {service.desc}
                </p>
                <p
                  className="text-[13px] mb-7"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
                >
                  {service.detail}
                </p>

                {/* CTA — coming soon */}
                <div
                  className="flex items-center justify-between py-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span
                    className="text-[13px] tracking-wide"
                    style={{ color: 'rgba(255,255,255,0.35)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
                  >
                    詳細準備中
                  </span>
                  <span
                    className="text-[11px] tracking-wide"
                    style={{ color: 'rgba(180,83,9,0.5)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
                  >
                    Coming Soon
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact section */}
      <div className="px-5 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center mb-8">
              <p
                className="text-[13px] mb-2"
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
              >
                法人のお客様のご相談・お見積りは、お気軽にお電話ください。
              </p>
              <a
                href="tel:0800-800-3734"
                className="inline-flex items-center gap-3 mt-4 px-8 py-4 transition-all duration-300"
                style={{
                  border: '1px solid rgba(180,83,9,0.4)',
                  background: 'rgba(180,83,9,0.06)',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = '#B45309';
                  e.currentTarget.style.background = 'rgba(180,83,9,0.15)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = 'rgba(180,83,9,0.4)';
                  e.currentTarget.style.background = 'rgba(180,83,9,0.06)';
                }}
              >
                <Phone size={18} strokeWidth={1.5} style={{ color: '#d4a574' }} />
                <span
                  className="text-lg tracking-wider"
                  style={{ color: '#d4a574', fontFamily: '"Noto Serif JP", serif', fontWeight: 500 }}
                >
                  0800-800-3734
                </span>
              </a>
              <p
                className="text-[11px] mt-3"
                style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
              >
                受付時間: 平日 9:00〜18:00（通話料無料）
              </p>
            </div>

            <p
              className="text-[12px] text-center"
              style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            >
              個人のお客様は
              <button
                onClick={onBack}
                className="underline underline-offset-2 hover:text-white/50 transition-colors mx-1"
              >
                トップページ
              </button>
              の「個人のお客様」セクションをご覧ください。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
