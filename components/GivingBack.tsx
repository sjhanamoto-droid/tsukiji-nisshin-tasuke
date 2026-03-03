import React from 'react';
import { Section } from './Section';
import { Heart, Flower2, HandHeart } from 'lucide-react';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

export const GivingBack: React.FC = () => {
  return (
    <Section id="givingback" className="relative overflow-hidden bg-[#0f0f0f]">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm radial glow from center-right where YO-chan sits */}
        <div
          className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #B45309 0%, transparent 70%)',
          }}
        />
        {/* Subtle top-left cool accent for depth */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #d4a574 0%, transparent 70%)',
          }}
        />
        {/* Fine grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 lg:px-8">

        {/* ──── Section Label ──── */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-[11px] tracking-[0.3em] uppercase"
            style={{ color: '#B45309', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
          >
            Social Contribution
          </span>
        </motion.div>

        {/* ──── Main Content: Story + YO-chan ──── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 mb-20">

          {/* Left: Narrative */}
          <div className="flex-1 max-w-xl">
            <motion.h2
              className="font-serif text-3xl md:text-4xl lg:text-[2.7rem] text-white leading-snug mb-8"
              style={{ fontWeight: 600 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              家族の物語から生まれた
              <br />
              <span style={{ color: '#d4a574' }}>社会貢献</span>企業
            </motion.h2>

            {/* Gold accent line */}
            <motion.div
              className="w-16 h-[2px] mb-8"
              style={{ background: 'linear-gradient(90deg, #B45309, transparent)' }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <p
                className="leading-relaxed text-[15px]"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
              >
                私たちは単なる飲食企業ではありません。
              </p>
              <p
                className="leading-relaxed text-[15px]"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
              >
                一人の少年「YO-chan」の闘病と介護の経験から、
                <span className="text-white" style={{ fontWeight: 400 }}>
                  「食」が持つ、人を励まし、生きる力を与える可能性
                </span>
                を学びました。
              </p>
              <p
                className="leading-relaxed text-[15px]"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
              >
                利益の一部は、困難な状況にある子供たちや家族への支援に充てられています。
              </p>
            </motion.div>
          </div>

          {/* Right: YO-chan character */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            {/* Warm glow behind character */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(180,83,9,0.15) 0%, transparent 70%)',
              }}
            />
            <img
              src={assetUrl("/images/character/yochan06.png")}
              alt="YO-chan — 鰻丼を届ける少年"
              className="relative z-10 w-48 md:w-56 lg:w-64 h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* ──── Activity Cards ──── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* Card 1: 白い朝顔プロジェクト */}
          <motion.div
            className="group relative p-8 lg:p-10"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(180,83,9,0.15)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              borderColor: 'rgba(180,83,9,0.4)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, #B45309, rgba(180,83,9,0.1))',
              }}
            />

            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  border: '1px solid rgba(180,83,9,0.3)',
                  background: 'rgba(180,83,9,0.06)',
                }}
              >
                <Flower2 size={18} strokeWidth={1.5} style={{ color: '#d4a574' }} />
              </div>
              <div>
                <h3
                  className="font-serif text-lg text-white mb-1"
                  style={{ fontWeight: 600 }}
                >
                  白い朝顔プロジェクト
                </h3>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(180,83,9,0.7)' }}
                >
                  White Morning Glory Project
                </span>
              </div>
            </div>

            <p
              className="text-[14px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            >
              難病と闘う子供たちとその家族を支援する活動です。温かい食事の提供や、
              寄付活動を通じて、笑顔の輪を広げています。
            </p>
          </motion.div>

          {/* Card 2: がんの子どもを守る会 */}
          <motion.div
            className="group relative p-8 lg:p-10"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(180,83,9,0.15)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            whileHover={{
              borderColor: 'rgba(180,83,9,0.4)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, #B45309, rgba(180,83,9,0.1))',
              }}
            />

            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-11 h-11 flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  border: '1px solid rgba(180,83,9,0.3)',
                  background: 'rgba(180,83,9,0.06)',
                }}
              >
                <HandHeart size={18} strokeWidth={1.5} style={{ color: '#d4a574' }} />
              </div>
              <div>
                <h3
                  className="font-serif text-lg text-white mb-1"
                  style={{ fontWeight: 600 }}
                >
                  公益財団法人 がんの子どもを守る会
                </h3>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(180,83,9,0.7)' }}
                >
                  Children's Cancer Association of Japan
                </span>
              </div>
            </div>

            <p
              className="text-[14px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)', fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
            >
              小児がんと闘う子供たちとご家族への支援活動を行っている団体へ、
              売上の一部を継続的に寄付しています。
            </p>
          </motion.div>
        </div>

        {/* ──── Bottom message ──── */}
        <div className="mt-20 md:mt-28 text-center overflow-hidden">
          {/* Decorative line above */}
          <motion.div
            className="w-12 h-[1px] mx-auto mb-10"
            style={{ background: 'rgba(180,83,9,0.4)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />

          <motion.p
            className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wider"
            style={{ color: '#d4a574', fontWeight: 400 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          >
            温かい食事は、人の心も温める。
          </motion.p>

          <motion.p
            className="font-serif text-lg md:text-xl lg:text-2xl mt-4 tracking-wider"
            style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          >
            それが私たちの信念です。
          </motion.p>

          {/* Decorative line below */}
          <motion.div
            className="w-12 h-[1px] mx-auto mt-10"
            style={{ background: 'rgba(180,83,9,0.4)' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
          />
        </div>

      </div>
    </Section>
  );
};
