import React, { useEffect } from 'react';
import { ArrowLeft, Bike, MapPin, Gift, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

interface ConsumerPageProps {
  onBack: () => void;
}

const CHOICES = [
  {
    num: '01',
    title: '今すぐ食べる',
    subtitle: 'Order Delivery',
    desc: '即時配達対応の宅配メニュー。JetChefの特許加熱容器で、ご自宅に届いてから温める出来立ての美味しさ。',
    detail: '築地の職人が焼き上げた鰻を、温かいままご自宅へ。',
    icon: Bike,
    image: assetUrl('/images/kinunagi/unagi-king.jpg'),
    href: 'https://nisshintasuke.take-eats.jp/',
    external: true,
    cta: '宅配メニューを見る',
  },
  {
    num: '02',
    title: 'お店で食べる',
    subtitle: 'Visit Restaurant',
    desc: '築地場外市場の活気を感じながら、焼きたての鰻を。職人の技を目の前で堪能できる、特別な食体験。',
    detail: '築地うなぎ食堂・金のうなぎ各店舗でお待ちしております。',
    icon: MapPin,
    image: assetUrl('/images/kinunagi/main.jpg'),
    href: '#locations',
    external: false,
    cta: '店舗案内を見る',
  },
  {
    num: '03',
    title: '取り寄せる・贈る',
    subtitle: 'Online Shop / Gift',
    desc: '全国どこへでもお届け。大切な方への贈り物や、ご自宅でのお取り寄せに。',
    detail: 'ギフト包装・熨斗対応。特別な日の贈り物にも。',
    icon: Gift,
    image: assetUrl('/images/kinunagi/hitumabusi.jpg'),
    href: 'https://nisshintasuke-tsuhan.take-eats.jp/',
    external: true,
    cta: '通信販売サイトへ',
  },
];

export const ConsumerPage: React.FC<ConsumerPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (choice: typeof CHOICES[0]) => {
    if (choice.external) {
      window.open(choice.href, '_blank', 'noopener,noreferrer');
    } else {
      onBack();
      setTimeout(() => {
        const hash = choice.href;
        window.location.hash = hash;
      }, 100);
    }
  };

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
            src={assetUrl('/images/logo/logo-wh.png')}
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
              For Individual Customers
            </span>
            <h1
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-snug mb-4"
              style={{ fontWeight: 600 }}
            >
              個人のお客様へ
            </h1>
            <p
              className="text-[15px] max-w-xl leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.45)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            >
              お客様のご要望に合わせた3つの方法で、築地の味をお届けします。
            </p>
          </motion.div>
        </div>
      </div>

      {/* Three choices */}
      <div className="px-5 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {CHOICES.map((choice, idx) => (
            <motion.div
              key={idx}
              className="group relative cursor-pointer overflow-hidden"
              style={{
                minHeight: '520px',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + idx * 0.1 }}
              onClick={() => handleClick(choice)}
              whileHover={{
                borderColor: 'rgba(180,83,9,0.3)',
              }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={choice.image}
                  alt={choice.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay — darkens bottom for text readability */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.92) 75%, rgba(10,10,10,0.97) 100%)',
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
                    {choice.num}
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
                  <choice.icon size={20} strokeWidth={1.5} style={{ color: '#d4a574' }} />
                </div>

                {/* Title */}
                <h2
                  className="font-serif text-2xl md:text-3xl text-white mb-1"
                  style={{ fontWeight: 600 }}
                >
                  {choice.title}
                </h2>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase mb-5"
                  style={{ color: 'rgba(180,83,9,0.6)', fontWeight: 400 }}
                >
                  {choice.subtitle}
                </span>

                {/* Description */}
                <p
                  className="text-[14px] leading-relaxed mb-2"
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
                >
                  {choice.desc}
                </p>
                <p
                  className="text-[13px] mb-7"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
                >
                  {choice.detail}
                </p>

                {/* CTA */}
                <div
                  className="flex items-center justify-between py-4 transition-all duration-300 group-hover:border-brand-gold/50"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span
                    className="text-[13px] tracking-wide text-white/80 group-hover:text-white transition-colors"
                    style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
                  >
                    {choice.cta}
                  </span>
                  <div className="flex items-center gap-1.5 text-white/40 group-hover:text-brand-gold transition-colors">
                    {choice.external ? (
                      <ExternalLink size={14} strokeWidth={1.5} />
                    ) : (
                      <ArrowRight size={14} strokeWidth={1.5} />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div className="px-5 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p
              className="text-[12px]"
              style={{ color: 'rgba(255,255,255,0.2)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            >
              法人のお客様は
              <button
                onClick={onBack}
                className="underline underline-offset-2 hover:text-white/50 transition-colors mx-1"
              >
                トップページ
              </button>
              の「法人のお客様」セクションをご覧ください。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
