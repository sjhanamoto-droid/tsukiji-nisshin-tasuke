import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

interface CompanyPageProps {
  onBack: () => void;
}

const COMPANY_INFO = [
  { label: '会社名', value: '有限会社築地にっしん太助' },
  { label: '代表者', value: '谷口 忠' },
  { label: '所在地', value: '〒104-0045\n東京都中央区築地4-13-18（築地場外市場内）' },
  { label: '電話番号', value: '0120-17-0521' },
  { label: '営業時間', value: '10:00〜21:00' },
  { label: '店舗', value: '築地うなぎ食堂（東京都中央区築地4-13-18）\n築地ダイニング 金のうなぎ 上野毛店（東京都世田谷区上野毛1丁目17-6）\n築地ダイニング 金のうなぎ 中村橋店（東京都練馬区中村3丁目13-8）' },
];

const PRINCIPLES = [
  'ビジネスモデルがすべての関係者を幸せにしているか常に問う',
  '「健康の元は食」「笑顔の元は健康」との信念で、その実現に何ができるか徹底的に考える',
  '業界の常識に囚われず本質を追求し、業界トップリーダーを目指す',
  '組織全体の強化と細胞分裂による拡大を目指す',
  '常に業界「ナンバーワン」を目指す',
];

const GUIDELINES = [
  '顧客支持を得て期待を上回るサービス提供',
  '国際的視野で行動',
  '異なる思考と「世界を変える」信念の保持',
  '目先の利益ではなく後世に残る事業に注力',
  '事業活動を通じた自己の魂の研鑽',
  '現状満足せず失敗を恐れないチャレンジ精神',
  '仮説・実行・検証の繰り返しで質とスピードを向上',
  '規律と自律のもとチームで成し遂げる',
];

export const CompanyPage: React.FC<CompanyPageProps> = ({ onBack }) => {
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

      {/* Hero with background image */}
      <div className="relative h-[50vh] min-h-[360px] max-h-[520px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img
            src={assetUrl('/images/backgrounds/bg.jpg')}
            alt="築地にっしん太助"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.95) 85%, #0a0a0a 100%)',
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
              Company Profile
            </span>
            <h1
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-snug"
              style={{ fontWeight: 600 }}
            >
              会社案内
            </h1>
          </motion.div>
        </div>
      </div>

      {/* ── Section 1: Company Overview Table ── */}
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
              Overview
            </span>
            <h2
              className="font-serif text-2xl md:text-3xl text-white mt-2"
              style={{ fontWeight: 600 }}
            >
              会社概要
            </h2>
          </motion.div>

          <div>
            {COMPANY_INFO.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col md:flex-row"
                style={{
                  borderTop:
                    idx === 0
                      ? '1px solid rgba(180,83,9,0.3)'
                      : '1px solid rgba(255,255,255,0.06)',
                  borderBottom:
                    idx === COMPANY_INFO.length - 1
                      ? '1px solid rgba(180,83,9,0.3)'
                      : undefined,
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div
                  className="md:w-44 lg:w-52 shrink-0 py-5 md:py-6"
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
                  className="pb-5 md:py-6"
                  style={{
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 300,
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.8,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 2: Philosophy ── */}
      <div className="px-5 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          {/* Divider */}
          <div
            className="mb-16 md:mb-24"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 md:mb-20"
          >
            <span
              className="text-[11px] tracking-[0.3em] uppercase"
              style={{
                color: 'rgba(180,83,9,0.6)',
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 400,
              }}
            >
              Philosophy
            </span>
            <h2
              className="font-serif text-2xl md:text-3xl text-white mt-2"
              style={{ fontWeight: 600 }}
            >
              経営理念
            </h2>
          </motion.div>

          {/* Pull-quote */}
          <motion.div
            className="relative mb-20 md:mb-28"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Decorative gold line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{
                background:
                  'linear-gradient(to bottom, #B45309 0%, rgba(180,83,9,0.15) 100%)',
              }}
            />
            <blockquote className="pl-8 md:pl-12">
              <p
                className="font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}
              >
                鰻をただつくって売るのではない。
                <br />
                <span style={{ color: '#d4a574' }}>鰻のある生活をつくりたい。</span>
              </p>
              <p
                className="mt-6 text-[14px] leading-relaxed max-w-2xl"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: '"Noto Sans JP", sans-serif',
                  fontWeight: 300,
                }}
              >
                うなぎを夏の土用丑の日だけの高級品にせず、日常生活のあらゆるシーンで
                気軽に取り入れられることを目指しています。
              </p>
            </blockquote>
          </motion.div>

          {/* 5 Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h3
              className="font-serif text-lg md:text-xl text-white mb-10"
              style={{ fontWeight: 500 }}
            >
              基本方針
            </h3>
          </motion.div>

          <div className="space-y-0">
            {PRINCIPLES.map((text, idx) => (
              <motion.div
                key={idx}
                className="flex gap-5 md:gap-8 items-baseline"
                style={{ padding: '20px 0' }}
                initial={{ opacity: 0, x: -12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                whileInView={{ opacity: 1, x: 0, borderBottom: '1px solid rgba(180,83,9,0.35)' }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
              >
                <motion.span
                  className="text-[28px] md:text-[32px] leading-none shrink-0"
                  style={{
                    fontFamily: '"Noto Serif JP", serif',
                    fontWeight: 700,
                    minWidth: '48px',
                    textAlign: 'right',
                  }}
                  initial={{ color: 'rgba(180,83,9,0.2)' }}
                  whileInView={{ color: '#D97706' }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, delay: idx * 0.07 + 0.2 }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </motion.span>
                <p
                  className="text-[15px] md:text-[16px] leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 300,
                  }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: Action Guidelines ── */}
      <div className="px-5 pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto">
          {/* Divider */}
          <div
            className="mb-16 md:mb-24"
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
              Code of Conduct
            </span>
            <h2
              className="font-serif text-2xl md:text-3xl text-white mt-2"
              style={{ fontWeight: 600 }}
            >
              行動指針
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-0">
            {GUIDELINES.map((text, idx) => (
              <motion.div
                key={idx}
                className="flex gap-4 items-start"
                style={{ padding: '18px 0' }}
                initial={{ opacity: 0, y: 14, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                whileInView={{ opacity: 1, y: 0, borderBottom: '1px solid rgba(180,83,9,0.35)' }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <motion.span
                  className="text-[22px] leading-none shrink-0 mt-0.5"
                  style={{
                    fontFamily: '"Noto Serif JP", serif',
                    fontWeight: 700,
                    minWidth: '32px',
                    textAlign: 'right',
                  }}
                  initial={{ color: 'rgba(180,83,9,0.18)' }}
                  whileInView={{ color: '#D97706' }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 + 0.2 }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </motion.span>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: '"Noto Sans JP", sans-serif',
                    fontWeight: 300,
                  }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom back link */}
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
              トップページに戻る
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
