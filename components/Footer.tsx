import React from 'react';
import { SHOPS, NAV_ITEMS } from '../constants';
import { MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">築地にっしん太助</h2>
            <address className="not-italic text-sm text-gray-400 font-sans leading-relaxed">
              〒104-0045<br/>
              東京都中央区築地4丁目13−18<br/>
              場外市場内
            </address>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-brand-gold">SITEMAP</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              {NAV_ITEMS.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-brand-gold transition-colors">{item.label}</a>
                </li>
              ))}
              <li><a href="#" className="hover:text-brand-gold transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">特定商取引法に基づく表示</a></li>
            </ul>
          </div>

          {/* Shops */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-serif font-bold mb-6 text-brand-gold">SHOPS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SHOPS.map((shop, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-sm border border-white/10">
                  <h4 className="font-bold mb-2">{shop.name}</h4>
                  <div className="flex items-start gap-2 text-xs text-gray-300 mb-2">
                    <MapPin size={14} className="mt-1 shrink-0" />
                    <span>{shop.address}</span>
                  </div>
                   <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Phone size={14} />
                    <span>{shop.tel}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
                <button className="text-sm underline hover:text-brand-gold transition-colors">店舗詳細・アクセスへ</button>
            </div>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-xs text-gray-500 font-sans">
          &copy; {new Date().getFullYear()} Tsukiji Nisshin Tasuke. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};