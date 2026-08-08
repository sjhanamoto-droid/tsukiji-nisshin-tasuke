import React from 'react';
import { Section } from './Section';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

const INSTAGRAM_URL = 'https://www.instagram.com/tsukijiunagi/';

export const InstagramSection: React.FC = () => {
  return (
    <Section id="instagram" className="bg-brand-cream">
      <div className="container mx-auto px-6">

        {/* ── Manga panels ── */}
        <motion.div
          className="max-w-3xl mx-auto grid grid-cols-2 gap-4 md:gap-6 mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={assetUrl('/images/instagram/manga-01.webp')}
            alt="築地の陽ちゃん 漫画（JET CHEFの使い方）"
            className="w-full h-auto rounded-xl shadow-lg"
            loading="lazy"
          />
          <img
            src={assetUrl('/images/instagram/manga-02.webp')}
            alt="築地の陽ちゃん 漫画（築地うなぎ食堂の日常）"
            className="w-full h-auto rounded-xl shadow-lg"
            loading="lazy"
          />
        </motion.div>

        {/* ── Centered content ── */}
        <div className="max-w-2xl mx-auto text-center">

          {/* Label */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="text-[12px] tracking-[0.3em] font-medium"
              style={{ color: '#B45309' }}
            >
              INSTAGRAM
            </span>
            <span style={{ color: 'rgba(180,83,9,0.4)' }}>/</span>
            <span
              className="text-[12px] tracking-[0.15em]"
              style={{ color: '#B45309' }}
            >
              毎日更新中
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-serif text-3xl md:text-5xl text-brand-dark leading-snug mb-8"
            style={{ fontWeight: 600 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            インスタグラムでも、配信中。
          </motion.h2>

          {/* Body */}
          <motion.p
            className="font-serif text-brand-gray leading-loose text-[15px] md:text-base mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            JET CHEFの使い方や築地うなぎ食堂の日常、高齢者施設での使い方を、「築地の陽ちゃん」が漫画で毎日お届けしています。
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 text-[14px] tracking-wider font-serif transition-all duration-300"
              style={{ border: '1px solid rgba(180,83,9,0.4)', color: '#B45309' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = '#B45309';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#B45309';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#B45309';
                e.currentTarget.style.borderColor = 'rgba(180,83,9,0.4)';
              }}
            >
              Instagramで見る（@tsukijiunagi）
              <ArrowRight size={16} strokeWidth={1.5} />
            </a>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
