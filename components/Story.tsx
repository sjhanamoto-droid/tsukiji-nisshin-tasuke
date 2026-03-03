import React from 'react';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

export const Story: React.FC = () => {
  return (
    <Section id="story" className="bg-brand-dark text-white relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm relative bg-brand-cream/5 border border-brand-gold/20 flex items-center justify-center">
               <div
                 className="absolute inset-0 pointer-events-none"
                 style={{
                   background: 'radial-gradient(circle at center 60%, rgba(180,83,9,0.1) 0%, transparent 60%)',
                 }}
               />
               <img
                src={assetUrl('/images/character/yochan01.png')}
                alt="YO-chan"
                className="w-3/4 h-auto object-contain relative z-10"
                style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.3))' }}
              />
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 space-y-8">
            <h3 className="text-brand-gold font-serif text-lg tracking-widest">OUR ORIGIN</h3>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              食べることは、<br/>「生きる力」だから。
            </h2>
            <div className="space-y-6 text-gray-300 font-sans leading-loose tracking-wide">
              <p>
                5歳で突然の大病を患い、20年以上の介護生活を送った息子、YO-chan。<br/>
                彼との日々が、私たちに「食」の本当の意味を教えてくれました。
              </p>
              <p>
                病院の冷たい食事ではなく、家族と囲む温かい食卓。<br/>
                湯気の向こうにある笑顔。<br/>
                それがどれほど、人の心を支える体験であるか。
              </p>
              <p>
                「どんな状況でも、温かくて美味しいものを食べてほしい」<br/>
                その切実な願いが、技術革新を生み出し、<br/>
                今の築地にっしん太助の全てに繋がっています。
              </p>
            </div>
            <a
              href="#yochan"
              className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-brand-dark transition-colors duration-300 rounded-sm font-serif mt-4"
            >
              YO-chanについて
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};