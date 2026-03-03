import React from 'react';
import { Section } from './Section';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    num: '01',
    title: '湯気まで再現',
    desc: '特殊な過熱水蒸気技術により、蓋を開けた瞬間に立ち上る湯気と香りを実現しました。',
  },
  {
    num: '02',
    title: '驚きのスピード',
    desc: '冷凍状態からわずか数分で、芯まで熱々の状態に。お待たせすることなく、極上の食事を。',
  },
  {
    num: '03',
    title: '感情体験テクノロジー',
    desc: 'ただ温めるだけではありません。職人が作った瞬間の「感動」をそのまま食卓へ運びます。',
  },
];

export const JetChef: React.FC = () => {
  return (
    <Section id="jetchef" className="relative overflow-hidden bg-[#0a0a0a]">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.05]"
          style={{
            background: 'radial-gradient(ellipse, #B45309 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #d4a574 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-8">

        {/* ──── Header ──── */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block text-[11px] tracking-[0.3em] uppercase mb-6"
              style={{ color: 'rgba(180,83,9,0.7)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
            >
              Technology
            </span>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <img
              src="/images/character/テキストのみ.png"
              alt="JetChef"
              className="h-8 md:h-10 lg:h-12 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </motion.div>

          <motion.p
            className="font-serif text-xl md:text-2xl tracking-wider mb-6"
            style={{ color: '#d4a574', fontWeight: 400 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            自宅が、一瞬でレストランになる。
          </motion.p>

          <motion.p
            className="max-w-2xl mx-auto text-[15px] leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            外食が難しくなった家族のために開発された、革命的な加熱技術。
            電子レンジとは違う、水分を逃さない特殊な加熱方法で、
            作りたての「香り」「食感」「温度」を再現します。
          </motion.p>
        </div>

        {/* ──── Video Section ──── */}
        <div className="flex flex-col gap-6 mb-20 md:mb-28 max-w-4xl mx-auto">
          {/* WebM Animation — transparent background — top */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <video
                className="w-full h-auto"
                src="/mov/jetchefanimation-transparent.webm"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </motion.div>

          {/* YouTube — main video (16:9) — bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                paddingBottom: '56.25%',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/7fK2NotfTcg?rel=0&modestbranding=1"
                title="JetChef 使用方法"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        {/* ──── Features — editorial numbered cards ──── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                borderTop: '2px solid rgba(180,83,9,0.5)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
            >
              {/* Large background number */}
              <span
                className="absolute -right-3 -top-6 text-[120px] md:text-[110px] lg:text-[130px] leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-amber-800/[0.07]"
                style={{
                  color: 'rgba(180,83,9,0.04)',
                  fontFamily: '"Noto Serif JP", serif',
                  fontWeight: 700,
                }}
              >
                {feature.num}
              </span>

              {/* Content */}
              <div className="relative z-10 p-7 md:p-8 lg:p-9">
                <span
                  className="inline-block text-[11px] tracking-[0.2em] mb-5"
                  style={{
                    color: 'rgba(180,83,9,0.7)',
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 500,
                  }}
                >
                  FEATURE {feature.num}
                </span>

                <h3
                  className="font-serif text-xl md:text-lg lg:text-xl mb-4"
                  style={{ color: '#d4a574', fontWeight: 600 }}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-[14px] leading-[1.9]"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 300,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </Section>
  );
};
