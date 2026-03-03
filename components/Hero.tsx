import React from 'react';
import { ArrowDown, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

export const Hero: React.FC = () => {
  return (
    <>
      {/* ──── Main Hero ──── */}
      <div id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-brand-dark">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={assetUrl('/images/backgrounds/bg.jpg')}
            alt="Traditional Japanese Dining"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-brand-dark/90"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src={assetUrl('/images/logo/logo-wh.png')}
              alt="築地にっしん太助 ロゴ"
              className="mx-auto w-28 md:w-36 lg:w-44 h-auto mb-6"
              loading="eager"
              decoding="async"
            />
            <h1 className="text-xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-8">
              誰でも、いつでも、どこでも。<br />
              温かい"食のよろこび"を届ける。
            </h1>
            <h2 className="text-white text-base md:text-2xl font-serif tracking-widest mt-2">
              築地にっしん太助
            </h2>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce text-white/50">
          <ArrowDown size={32} />
        </div>
      </div>

      {/* ──── Shop Video Section ──── */}
      <div className="relative bg-brand-dark overflow-hidden py-16 md:py-24">
        {/* Gradient connecting to hero above */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-brand-dark to-transparent z-10" />

        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #B45309 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Video — phone-style frame */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="relative w-56 md:w-64 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              >
                {/* Notch decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-20" />
                <video
                  className="w-full h-auto block"
                  src={assetUrl('/mov/unagi-short-compressed.mp4')}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ aspectRatio: '9/16' }}
                />
              </div>
              <a
                href="https://www.instagram.com/tsukijiunagi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-4 py-2.5 w-full rounded-lg text-[13px] tracking-wide transition-all duration-300 no-underline"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontWeight: 400,
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Instagram size={15} strokeWidth={1.5} />
                <span>@tsukijiunagi</span>
              </a>
            </motion.div>

            {/* Text content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span
                className="inline-block text-[11px] tracking-[0.3em] uppercase mb-4"
                style={{ color: 'rgba(180,83,9,0.7)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
              >
                Tsukiji Unagi Shokudo
              </span>
              <h3
                className="font-serif text-2xl md:text-3xl text-white leading-snug mb-6"
                style={{ fontWeight: 600 }}
              >
                築地場外市場から届ける、
                <br />
                <span style={{ color: '#d4a574' }}>本物の鰻の味。</span>
              </h3>
              <p
                className="text-[15px] leading-relaxed mb-8"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
              >
                熟練の職人が一枚一枚丁寧に焼き上げる鰻。
                香ばしい香りとふっくらとした食感、秘伝のタレが絡む艶やかな照り。
                築地うなぎ食堂の味を、ぜひ一度ご堪能ください。
              </p>
              <a
                href="#locations"
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] tracking-wider transition-all duration-300"
                style={{
                  border: '1px solid rgba(180,83,9,0.5)',
                  color: '#d4a574',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontWeight: 400,
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = '#B45309';
                  e.currentTarget.style.background = 'rgba(180,83,9,0.12)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.currentTarget.style.borderColor = 'rgba(180,83,9,0.5)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                店舗案内を見る
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
