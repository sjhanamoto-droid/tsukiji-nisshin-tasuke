import React from 'react';
import { Section } from './Section';
import { SHOPS } from '../constants';
import { MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const Locations: React.FC = () => {
  return (
    <Section id="locations" className="bg-brand-dark text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">店舗案内</h2>
            <p className="text-gray-400 font-serif">職人の技と心意気に触れる場所。</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SHOPS.map((shop, idx) => (
            <motion.div 
              key={idx}
              className="bg-white text-brand-dark rounded-sm overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="h-48 overflow-hidden relative group">
                <img 
                  src={shop.image} 
                  alt={shop.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <div className="p-8">
                <h3 className="font-bold font-serif mb-4 border-b border-brand-gold/30 pb-2">
                    {shop.name.includes('築地ダイニング') ? (
                      <>
                        <span className="block text-xs text-brand-gray font-medium mb-1">築地ダイニング</span>
                        <span className="text-xl">{shop.name.replace('築地ダイニング ', '')}</span>
                      </>
                    ) : (
                      <span className="text-xl">{shop.name}</span>
                    )}
                </h3>
                <p className="text-sm text-brand-gray mb-6 leading-relaxed">
                    {shop.description}
                </p>
                
                <div className="space-y-3 text-sm font-sans mb-8">
                    <div className="flex items-start gap-3">
                        <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                        <span>{shop.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={16} className="text-brand-gold shrink-0" />
                        <span>{shop.tel}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock size={16} className="text-brand-gold shrink-0" />
                        <span>{shop.hours}</span>
                    </div>
                </div>

                <a
                    href={`#shop/${shop.id}`}
                    className="block w-full border border-brand-dark text-brand-dark py-3 rounded-sm hover:bg-brand-dark hover:text-white transition-colors text-sm font-medium text-center no-underline"
                >
                    詳細へ
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};