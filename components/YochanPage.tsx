import React, { useEffect } from 'react';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

interface YochanPageProps {
  onBack: () => void;
}

const PROFILE = [
  { label: '誕生日', value: '5月21日' },
  { label: '身長', value: '105.9cm' },
  { label: '体重', value: '22.4kg' },
  { label: '性格', value: 'ちょっとシャイで優しくて真面目な男の子' },
  { label: '兄弟構成', value: '三人兄弟の末っ子' },
  { label: '得意の形', value: '龍拳' },
  { label: '将来の夢', value: 'かっこいいひとになること' },
  { label: '得意なもの', value: 'おかたづけ' },
  { label: '好きな遊び', value: 'ぶらんこ' },
  { label: '好きな食べ物', value: '鰻、いちごケーキ' },
];

const GALLERY_IMAGES = [
  { src: assetUrl('/images/character/yochan02.png'), alt: 'YO-chan ポーズ2' },
  { src: assetUrl('/images/character/yochan03.png'), alt: 'YO-chan ポーズ3' },
  { src: assetUrl('/images/character/yochan04.png'), alt: 'YO-chan ポーズ4' },
  { src: assetUrl('/images/character/yochan05.png'), alt: 'YO-chan ポーズ5' },
];

export const YochanPage: React.FC<YochanPageProps> = ({ onBack }) => {
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
            src={assetUrl('/images/logo/logo-wh.png')}
            alt="築地にっしん太助"
            className="h-8 opacity-60"
          />
        </div>
      </div>

      {/* ── Hero: Character Introduction ── */}
      <div className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Warm radial glow behind character */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(180,83,9,0.12) 0%, rgba(180,83,9,0.04) 40%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-5">
          <div className="flex flex-col items-center text-center">
            {/* Main character illustration */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="relative">
                <img
                  src={assetUrl('/images/character/yochan01.png')}
                  alt="YO-chan"
                  className="w-48 md:w-64 lg:w-72 h-auto mx-auto"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(180,83,9,0.15))',
                  }}
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span
                className="inline-block text-[11px] tracking-[0.3em] uppercase mb-3"
                style={{
                  color: 'rgba(180,83,9,0.7)',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontWeight: 400,
                }}
              >
                Official Character
              </span>
              <h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-3"
                style={{ fontWeight: 600 }}
              >
                YO-chan
              </h1>
              <p
                className="text-[14px] md:text-[15px] tracking-wider"
                style={{
                  color: '#d4a574',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontWeight: 400,
                }}
              >
                三歳で空手を始めて五歳で黒帯取得の天才空手BOY
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Section 1: Our Story ── */}
      <div className="px-5 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <div
            className="mb-16 md:mb-20"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <span
              className="text-[11px] tracking-[0.3em] uppercase"
              style={{
                color: 'rgba(180,83,9,0.6)',
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 400,
              }}
            >
              Our Origin Story
            </span>
            <h2
              className="font-serif text-2xl md:text-3xl text-white mt-2"
              style={{ fontWeight: 600 }}
            >
              YO-chanの物語
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Story text */}
            <div className="flex-1 order-2 lg:order-1">
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Gold accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{
                    background:
                      'linear-gradient(to bottom, #B45309 0%, rgba(180,83,9,0.08) 100%)',
                  }}
                />
                <div className="pl-8 md:pl-10 space-y-7">
                  <p
                    className="text-[15px] md:text-[16px] leading-[2]"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    一人の少年「YO-chan」の闘病と介護の経験から、「食」が持つ、人を励まし、生きる力を与える可能性を学びました。
                  </p>
                  <p
                    className="text-[15px] md:text-[16px] leading-[2]"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    5歳で突然の大病を患い、20年以上の介護生活を送った息子、YO-chan。彼との日々が、私たちに「食」の本当の意味を教えてくれました。
                  </p>
                  <p
                    className="text-[15px] md:text-[16px] leading-[2]"
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    病院の冷たい食事ではなく、家族と囲む温かい食卓。湯気の向こうにある笑顔。それがどれほど、人の心を支える体験であるか。
                  </p>
                </div>
              </motion.div>

              {/* Pull-quote */}
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <blockquote
                  className="relative py-8 px-8 md:px-10"
                  style={{
                    background: 'rgba(180,83,9,0.04)',
                    borderLeft: '3px solid rgba(180,83,9,0.4)',
                  }}
                >
                  <p
                    className="font-serif text-lg md:text-xl lg:text-2xl leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}
                  >
                    どんな状況でも、
                    <br />
                    <span style={{ color: '#d4a574' }}>温かくて美味しいものを食べてほしい。</span>
                  </p>
                  <p
                    className="mt-5 text-[13px] leading-relaxed"
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    その切実な願いが、技術革新を生み出し、今の築地にっしん太助の全てに繋がっています。
                  </p>
                </blockquote>
              </motion.div>
            </div>

            {/* Character illustration */}
            <motion.div
              className="flex-shrink-0 order-1 lg:order-2 mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                {/* Warm glow */}
                <div
                  className="absolute inset-0 -m-8 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(180,83,9,0.08) 0%, transparent 70%)',
                  }}
                />
                <img
                  src={assetUrl('/images/character/yochan06.png')}
                  alt="YO-chan — 鰻丼を届ける"
                  className="w-44 md:w-56 lg:w-64 h-auto relative z-10"
                  style={{
                    filter: 'drop-shadow(0 16px 32px rgba(180,83,9,0.12))',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Profile ── */}
      <div className="px-5 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <div
            className="mb-16 md:mb-20"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span
              className="text-[11px] tracking-[0.3em] uppercase"
              style={{
                color: 'rgba(180,83,9,0.6)',
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 400,
              }}
            >
              Profile
            </span>
            <h2
              className="font-serif text-2xl md:text-3xl text-white mt-2"
              style={{ fontWeight: 600 }}
            >
              プロフィール
            </h2>
          </motion.div>

          {/* Profile table */}
          <div className="mb-16">
            {PROFILE.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col md:flex-row"
                style={{
                  borderTop:
                    idx === 0
                      ? '1px solid rgba(180,83,9,0.3)'
                      : '1px solid rgba(255,255,255,0.06)',
                  borderBottom:
                    idx === PROFILE.length - 1
                      ? '1px solid rgba(180,83,9,0.3)'
                      : undefined,
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
              >
                <div
                  className="md:w-44 lg:w-52 shrink-0 py-4 md:py-5"
                  style={{
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 400,
                    fontSize: '13px',
                    color: 'rgba(180,83,9,0.8)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.label}
                </div>
                <div
                  className="pb-4 md:py-5"
                  style={{
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.8,
                  }}
                >
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Illustration gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3
              className="font-serif text-lg text-white mb-8"
              style={{ fontWeight: 500 }}
            >
              ギャラリー
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                className="relative flex items-center justify-center py-8"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {/* Subtle warm glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(180,83,9,0.06) 0%, transparent 70%)',
                  }}
                />
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-28 md:w-32 lg:w-36 h-auto relative z-10 transition-transform duration-500 hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: LINE Stamps ── */}
      <div className="px-5 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <div
            className="mb-16 md:mb-20"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          />

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center justify-center w-14 h-14 mb-6"
              style={{
                border: '1px solid rgba(180,83,9,0.3)',
                background: 'rgba(180,83,9,0.06)',
                borderRadius: '14px',
              }}
            >
              <MessageCircle size={22} strokeWidth={1.5} style={{ color: '#d4a574' }} />
            </div>
            <h3
              className="font-serif text-xl md:text-2xl text-white mb-3"
              style={{ fontWeight: 500 }}
            >
              LINEスタンプ
            </h3>
            <p
              className="text-[13px] mb-2"
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 300,
              }}
            >
              YO-chanのLINEスタンプを準備中です。
            </p>
            <span
              className="inline-block text-[11px] tracking-[0.2em] uppercase mt-2"
              style={{
                color: 'rgba(180,83,9,0.5)',
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 400,
              }}
            >
              Coming Soon
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom: Social contribution link ── */}
      <div className="px-5 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Message */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-4">
                <Heart size={14} strokeWidth={1.5} style={{ color: 'rgba(180,83,9,0.5)' }} />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{
                    color: 'rgba(180,83,9,0.5)',
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 400,
                  }}
                >
                  From YO-chan
                </span>
              </div>
              <p
                className="font-serif text-[15px] md:text-[16px] leading-relaxed max-w-lg mx-auto"
                style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}
              >
                YO-chanの経験から生まれた想いは、社会貢献活動として今も受け継がれています。
              </p>
            </div>

            {/* Back button */}
            <div className="text-center">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] tracking-wider transition-all duration-300"
                style={{
                  border: '1px solid rgba(180,83,9,0.4)',
                  color: '#d4a574',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontWeight: 400,
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.borderColor = '#B45309';
                  e.currentTarget.style.background = 'rgba(180,83,9,0.12)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.borderColor = 'rgba(180,83,9,0.4)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <ArrowLeft size={15} strokeWidth={1.5} />
                トップページに戻る
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
