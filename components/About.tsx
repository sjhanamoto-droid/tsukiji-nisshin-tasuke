import React from 'react';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

export const About: React.FC = () => {
  return (
    <Section id="about" className="bg-brand-cream relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-brand-gold opacity-50"></div>
              <img 
                src={assetUrl('/images/image19.jpg')}
                alt="築地にっしん太助" 
                className="w-full h-auto rounded-sm shadow-xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-brand-gold opacity-50"></div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-brand-gold font-serif text-lg tracking-widest">ABOUT US</h3>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-dark leading-snug">
              私たちの“温かい食”の原点は、<br/>東京・築地にあります。
            </h2>
            <div className="space-y-6 text-brand-gray font-sans leading-relaxed">
              <p>
                「築地うなぎ食堂」。私たちは築地場外市場で、長年にわたり多くの美食家たちに愛される鰻を提供し続けてきました。
              </p>
              <p>
                熟練の職人が捌き、焼き上げる一串には、日本の食文化の粋が込められています。
                しかし、私たちの願いは店舗の中だけにとどまりません。
              </p>
              <p>
                「お店に来られない方にも、出来立ての感動を届けたい」<br/>
                その想いが、私たちの挑戦の原動力です。
              </p>
            </div>
            <a
              href="#company"
              className="inline-block px-8 py-3 border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white transition-colors duration-300 rounded-sm font-serif"
            >
              会社概要を見る
            </a>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};