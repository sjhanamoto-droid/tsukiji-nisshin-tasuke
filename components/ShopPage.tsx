import React, { useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Clock, UtensilsCrossed, Navigation2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';
import { SHOP_DETAILS } from '../shopData';

interface ShopPageProps {
  shopId: string;
  onBack: () => void;
}

const INFO_ITEMS = (shop: typeof SHOP_DETAILS[string]) => [
  { icon: MapPin, label: '所在地', value: shop.address },
  { icon: Phone, label: '電話番号', value: shop.tel, href: `tel:${shop.tel.replace(/-/g, '')}` },
  { icon: Clock, label: '営業時間', value: shop.hours },
];

export const ShopPage: React.FC<ShopPageProps> = ({ shopId, onBack }) => {
  const shop = SHOP_DETAILS[shopId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [shopId]);

  if (!shop) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: 'rgba(255,255,255,0.5)' }} className="mb-4">店舗が見つかりません</p>
          <button onClick={onBack} className="text-amber-600 hover:underline">店舗一覧に戻る</button>
        </div>
      </div>
    );
  }

  const infoItems = INFO_ITEMS(shop);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ── Fixed Header ── */}
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
              店舗一覧に戻る
            </span>
          </button>
          <img
            src={assetUrl('/images/logo/logo-wh.png')}
            alt="築地にっしん太助"
            className="h-8 opacity-60"
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="relative h-[55vh] min-h-[380px] max-h-[560px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src={shop.heroImage}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.92) 80%, #0a0a0a 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span
              className="inline-block text-[11px] tracking-[0.3em] uppercase mb-4"
              style={{
                color: 'rgba(180,83,9,0.7)',
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 400,
              }}
            >
              Shop Detail
            </span>
            <h1
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-snug"
              style={{ fontWeight: 600 }}
            >
              {shop.name}
            </h1>
            <p
              className="mt-3 text-[15px]"
              style={{
                color: '#d4a574',
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 300,
              }}
            >
              {shop.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Section 1: Basic Info ── */}
      <div className="px-5 pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto">
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
              Information
            </span>
            <h2
              className="font-serif text-2xl md:text-3xl text-white mt-2"
              style={{ fontWeight: 600 }}
            >
              店舗情報
            </h2>
          </motion.div>

          <div>
            {infoItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col md:flex-row"
                style={{
                  borderTop:
                    idx === 0
                      ? '1px solid rgba(180,83,9,0.3)'
                      : '1px solid rgba(255,255,255,0.06)',
                  borderBottom:
                    idx === infoItems.length - 1
                      ? '1px solid rgba(180,83,9,0.3)'
                      : undefined,
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div
                  className="md:w-44 lg:w-52 shrink-0 py-5 md:py-6 flex items-center gap-3"
                >
                  <item.icon
                    size={15}
                    strokeWidth={1.5}
                    style={{ color: 'rgba(180,83,9,0.6)' }}
                    className="shrink-0"
                  />
                  <span
                    style={{
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 400,
                      fontSize: '13px',
                      color: 'rgba(180,83,9,0.8)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <div
                  className="pb-5 md:py-6"
                  style={{
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.8,
                  }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="no-underline hover:underline"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section Image ── */}
      <motion.div
        className="px-5 pb-16 md:pb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <img
              src={shop.heroImage}
              alt={shop.name}
              className="w-full h-[280px] md:h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Section 2: Description ── */}
      <div className="px-5 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">

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
              About
            </span>
            <h2
              className="font-serif text-2xl md:text-3xl text-white mt-2"
              style={{ fontWeight: 600 }}
            >
              店舗について
            </h2>
          </motion.div>

          <div className="max-w-3xl">
            {shop.description.map((text, idx) => (
              <motion.p
                key={idx}
                className="mb-5 text-[15px] leading-[1.95]"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontWeight: 300,
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: Menu Highlights ── */}
      {shop.menuHighlights.length > 0 && (
        <div className="px-5 pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto">
            <div
              className="mb-16 md:mb-24"
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
                Menu
              </span>
              <h2
                className="font-serif text-2xl md:text-3xl text-white mt-2"
                style={{ fontWeight: 600 }}
              >
                おすすめメニュー
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {shop.menuHighlights.map((menu, idx) => (
                <motion.div
                  key={idx}
                  className="relative overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(180,83,9,0.15)',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  {menu.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <UtensilsCrossed
                          size={14}
                          strokeWidth={1.5}
                          style={{ color: 'rgba(180,83,9,0.5)' }}
                          className="shrink-0 mt-0.5"
                        />
                        <h3
                          className="font-serif text-[17px]"
                          style={{ color: '#d4a574', fontWeight: 500 }}
                        >
                          {menu.name}
                        </h3>
                      </div>
                      {menu.price && (
                        <span
                          className="text-[14px] shrink-0"
                          style={{
                            color: 'rgba(255,255,255,0.5)',
                            fontFamily: '"Noto Sans JP", sans-serif',
                            fontWeight: 400,
                          }}
                        >
                          {menu.price}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[13px] leading-relaxed pl-[26px]"
                      style={{
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: '"Noto Sans JP", sans-serif',
                        fontWeight: 300,
                      }}
                    >
                      {menu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Section 4: Gallery ── */}
      {shop.gallery.length > 1 && (
        <div className="px-5 pb-20 md:pb-28">
          <div className="max-w-5xl mx-auto">
            <div
              className="mb-16 md:mb-24"
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
                Gallery
              </span>
              <h2
                className="font-serif text-2xl md:text-3xl text-white mt-2"
                style={{ fontWeight: 600 }}
              >
                ギャラリー
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {shop.gallery.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="aspect-[4/3] overflow-hidden group"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                >
                  <img
                    src={img}
                    alt={`${shop.name} - ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Section 5: Access ── */}
      <div className="px-5 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <div
            className="mb-16 md:mb-24"
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
              Access
            </span>
            <h2
              className="font-serif text-2xl md:text-3xl text-white mt-2"
              style={{ fontWeight: 600 }}
            >
              アクセス
            </h2>
          </motion.div>

          {/* Access info */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-3">
              {shop.access.map((line, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Navigation2
                    size={14}
                    strokeWidth={1.5}
                    style={{ color: 'rgba(180,83,9,0.5)' }}
                    className="shrink-0 mt-1"
                  />
                  <p
                    className="text-[14px] leading-relaxed"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 300,
                    }}
                  >
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            className="relative w-full overflow-hidden"
            style={{
              paddingBottom: '56.25%',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={shop.googleMapsUrl}
              title={`${shop.name} - Google Maps`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: 'invert(0.9) hue-rotate(180deg) brightness(1.1) contrast(0.9)' }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom Back Button ── */}
      <div className="px-5 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="pt-8 text-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
              店舗一覧に戻る
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
