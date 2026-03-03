import React from 'react';
import { Section } from './Section';
import { motion } from 'framer-motion';
import { Gift, Briefcase } from 'lucide-react';

export const ForYou: React.FC = () => {
  return (
    <Section id="foryou" className="bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            ご利用シーン
          </h2>
          <p className="text-brand-gray font-serif">大切な方へ、最高の一食を。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Individual */}
          <motion.div 
            className="group relative overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/30 transition-colors z-10"></div>
            <img 
              src="/images/image14.jpg" 
              alt="Family Dining" 
              className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 text-center">
              <Gift size={48} className="mb-4 text-brand-gold" />
              <h3 className="text-2xl font-serif font-bold mb-4">個人のお客様</h3>
              <p className="mb-6 font-sans text-sm md:text-base leading-relaxed opacity-90">
                ご家族の団欒、記念日のお祝い、<br/>
                遠く離れたご両親への贈り物に。<br/>
                自宅にいながらレストランの味を。
              </p>
              <ul className="text-left text-sm space-y-2 mb-8 border-l-2 border-brand-gold pl-4 hidden md:block">
                <li>・高級冷凍弁当のギフト</li>
                <li>・ハレの日の食卓に</li>
                <li>・介護食としても好評</li>
              </ul>
              <a
                href="#consumer"
                className="bg-white text-brand-dark px-8 py-3 rounded-full hover:bg-brand-gold hover:text-white transition-all font-serif text-sm inline-block"
              >
                個人向け商品を見る
              </a>
            </div>
          </motion.div>

          {/* Corporate */}
          <motion.div 
            className="group relative overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/30 transition-colors z-10"></div>
            <img 
              src="/images/image16.jpg" 
              alt="Corporate Event" 
              className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 text-center">
              <Briefcase size={48} className="mb-4 text-brand-gold" />
              <h3 className="text-2xl font-serif font-bold mb-4">法人のお客様</h3>
              <p className="mb-6 font-sans text-sm md:text-base leading-relaxed opacity-90">
                大切なお客様への接待手土産、<br/>
                社内イベントや会議弁当、<br/>
                従業員の福利厚生に。
              </p>
              <ul className="text-left text-sm space-y-2 mb-8 border-l-2 border-brand-gold pl-4 hidden md:block">
                <li>・役員会議、接待のお弁当</li>
                <li>・大口注文のご相談</li>
                <li>・福利厚生プラン</li>
              </ul>
              <a
                href="#corporate"
                className="bg-white text-brand-dark px-8 py-3 rounded-full hover:bg-brand-gold hover:text-white transition-all font-serif text-sm inline-block"
              >
                法人向けサービスを見る
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};