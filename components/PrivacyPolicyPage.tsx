import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { assetUrl } from '../lib/assets';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

// 個人情報保護方針（旧サイト https://nisshintasuke.co.jp/privacy-policy/ の内容を踏襲）
const INTRO =
  '有限会社築地にっしん太助（以下「当社」）は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進致します。';

const SECTIONS: { heading: string; body?: string; list?: string[] }[] = [
  {
    heading: '個人情報の管理',
    body:
      '当社は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備・社員教育の徹底等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行ないます。',
  },
  {
    heading: '個人情報の利用目的',
    body:
      'お客さまからお預かりした個人情報は、当社からのご連絡や業務のご案内やご質問に対する回答として、電子メールや資料のご送付に利用いたします。',
  },
  {
    heading: '個人情報の第三者への開示・提供の禁止',
    body:
      '当社は、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。',
    list: [
      'お客さまの同意がある場合',
      'お客さまが希望されるサービスを行なうために当社が業務を委託する業者に対して開示する場合',
      '法令に基づき開示することが必要である場合',
    ],
  },
  {
    heading: '個人情報の安全対策',
    body: '当社は、個人情報の正確性及び安全性確保のために、セキュリティに万全の対策を講じています。',
  },
  {
    heading: 'ご本人の照会',
    body:
      'お客さまがご本人の個人情報の照会・修正・削除などをご希望される場合には、ご本人であることを確認の上、対応させていただきます。',
  },
  {
    heading: '法令、規範の遵守と見直し',
    body:
      '当社は、保有する個人情報に関して適用される日本の法令、その他規範を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。',
  },
  {
    heading: 'お問い合せ',
    body: '当社の個人情報の取扱に関するお問い合せは下記までご連絡ください。',
  },
];

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ヘッダーはサイト共通の <Navigation />（App.tsx）を使用 */}

      {/* Hero */}
      <div className="relative h-[42vh] min-h-[300px] max-h-[460px] overflow-hidden flex items-end">
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
                'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.95) 85%, #0a0a0a 100%)',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto px-5 pb-10 md:pb-14">
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
              Privacy Policy
            </span>
            <h1
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-snug"
              style={{ fontWeight: 600 }}
            >
              個人情報保護方針
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-14 md:pt-20 pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto">
          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
            style={{
              fontFamily: '"Noto Sans JP", sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 2,
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            {INTRO}
          </motion.p>

          {/* Sections */}
          <div className="space-y-12">
            {SECTIONS.map((sec, idx) => (
              <motion.section
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <h2
                  className="font-serif text-lg md:text-xl text-white mb-4 pl-4"
                  style={{
                    fontWeight: 600,
                    borderLeft: '3px solid #B45309',
                  }}
                >
                  {sec.heading}
                </h2>
                {sec.body && (
                  <p
                    style={{
                      fontFamily: '"Noto Sans JP", sans-serif',
                      fontWeight: 300,
                      fontSize: '15px',
                      lineHeight: 2,
                      color: 'rgba(255,255,255,0.65)',
                    }}
                  >
                    {sec.body}
                  </p>
                )}
                {sec.list && (
                  <ul className="mt-4 space-y-3">
                    {sec.list.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3"
                        style={{
                          fontFamily: '"Noto Sans JP", sans-serif',
                          fontWeight: 300,
                          fontSize: '15px',
                          lineHeight: 1.9,
                          color: 'rgba(255,255,255,0.65)',
                        }}
                      >
                        <span style={{ color: '#B45309' }} className="shrink-0">・</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}
          </div>

          {/* Contact block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 p-6 md:p-8"
            style={{
              border: '1px solid rgba(180,83,9,0.25)',
              background: 'rgba(180,83,9,0.05)',
            }}
          >
            <div
              style={{
                fontFamily: '"Noto Sans JP", sans-serif',
                fontWeight: 300,
                fontSize: '15px',
                lineHeight: 2,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              有限会社築地にっしん太助<br />
              〒104-0045　東京都中央区築地4-13-18<br />
              Mail : <a href="mailto:info@nisshintasuke.co.jp" className="underline hover:text-brand-gold transition-colors">info@nisshintasuke.co.jp</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom back link */}
      <div className="px-5 pb-16">
        <div className="max-w-3xl mx-auto">
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
