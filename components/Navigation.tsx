import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Track active section
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Filter nav items for desktop — skip "TOP"
  const desktopNavItems = NAV_ITEMS.filter(item => item.label !== 'TOP');

  return (
    <>
      {/* ──────── Main Navigation Bar ──────── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'py-2'
            : 'py-4 lg:py-5'
        }`}
        style={{
          background: scrolled
            ? 'rgba(15, 15, 15, 0.92)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(1.4)' : 'none',
        }}
      >
        {/* Gold accent line at very top */}
        <div
          className="absolute top-0 left-0 w-full transition-opacity duration-500"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 5%, #B45309 30%, #d4a574 50%, #B45309 70%, transparent 95%)',
            opacity: scrolled ? 1 : 0,
          }}
        />

        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between">

          {/* ──── Logo ──── */}
          <a
            href="#hero"
            className="relative z-50 flex items-center gap-3 group"
            aria-label="トップページへ"
          >
            <motion.img
              src="/images/logo/logo-wh.png"
              alt="築地にっしん太助"
              className={`transition-all duration-500 ${
                scrolled ? 'h-10 lg:h-11' : 'h-12 lg:h-14'
              }`}
              style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))' }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <div className="hidden sm:flex flex-col">
              <span
                className={`font-serif font-semibold text-white leading-none tracking-wider transition-all duration-500 ${
                  scrolled ? 'text-sm' : 'text-base lg:text-lg'
                }`}
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
              >
                にっしん太助
              </span>
              <span
                className={`text-white/50 tracking-[0.25em] uppercase transition-all duration-500 ${
                  scrolled ? 'text-[9px]' : 'text-[10px]'
                }`}
                style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 300 }}
              >
                Nisshin Tasuke
              </span>
            </div>
          </a>

          {/* ──── Desktop Navigation ──── */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1">
              {desktopNavItems.map((item, idx) => {
                const isActive = activeSection === item.href;
                return (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="relative px-4 py-2 text-[13px] tracking-wide transition-colors duration-300 group"
                      style={{
                        fontFamily: '"Noto Sans JP", sans-serif',
                        fontWeight: isActive ? 500 : 300,
                        color: isActive ? '#d4a574' : 'rgba(255,255,255,0.75)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.currentTarget.style.color = 'rgba(255,255,255,1)');
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.currentTarget.style.color = 'rgba(255,255,255,0.75)');
                      }}
                    >
                      {item.label}
                      {/* Active / hover underline */}
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-300"
                        style={{
                          width: isActive ? '60%' : '0%',
                          background: '#B45309',
                        }}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <div className="w-px h-5 bg-white/15 mx-4" />

            {/* CTA */}
            <a
              href="#locations"
              className="flex items-center gap-2 px-5 py-2 border transition-all duration-300 group"
              style={{
                borderColor: 'rgba(180, 83, 9, 0.5)',
                background: 'rgba(180, 83, 9, 0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B45309';
                e.currentTarget.style.background = 'rgba(180, 83, 9, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(180, 83, 9, 0.5)';
                e.currentTarget.style.background = 'rgba(180, 83, 9, 0.08)';
              }}
            >
              <Phone size={13} className="text-brand-gold" strokeWidth={1.5} />
              <span
                className="text-[12px] tracking-wider text-white/90"
                style={{ fontFamily: '"Noto Sans JP", sans-serif', fontWeight: 400 }}
              >
                ご予約・お問合せ
              </span>
            </a>
          </div>

          {/* ──── Mobile Hamburger ──── */}
          <button
            className="lg:hidden relative z-50 w-11 h-11 flex flex-col items-center justify-center gap-[5px] group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isOpen}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-white origin-center"
              animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-white"
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-white origin-center"
              animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>

        {/* Bottom border for scrolled state */}
        <div
          className="absolute bottom-0 left-0 w-full transition-opacity duration-500"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.06) 50%, transparent 90%)',
            opacity: scrolled ? 1 : 0,
          }}
        />
      </nav>

      {/* ──────── Mobile Menu Full-Screen Overlay ──────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Background layers */}
            <div className="absolute inset-0 bg-brand-dark" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23B45309' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full pt-24 pb-10 px-8">

              {/* Logo area */}
              <motion.div
                className="mb-12 flex items-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <img
                  src="/images/logo/logo-wh.png"
                  alt="築地にっしん太助"
                  className="h-14"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}
                />
                <div className="flex flex-col">
                  <span className="font-serif text-lg text-white tracking-wider">にっしん太助</span>
                  <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase" style={{ fontWeight: 300 }}>
                    Nisshin Tasuke
                  </span>
                </div>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex-1">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05, duration: 0.35, ease: 'easeOut' }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center py-3 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span
                          className="w-6 h-[1px] mr-4 transition-all duration-300 group-hover:w-10 group-hover:bg-brand-gold"
                          style={{ background: activeSection === item.href ? '#B45309' : 'rgba(255,255,255,0.2)' }}
                        />
                        <span
                          className="text-xl tracking-wide transition-colors duration-300 group-hover:text-brand-gold"
                          style={{
                            fontFamily: '"Noto Serif JP", serif',
                            fontWeight: activeSection === item.href ? 600 : 300,
                            color: activeSection === item.href ? '#d4a574' : 'rgba(255,255,255,0.8)',
                          }}
                        >
                          {item.label}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="pt-6"
                style={{ borderTop: '1px solid rgba(180, 83, 9, 0.2)' }}
              >
                <a
                  href="#locations"
                  className="flex items-center gap-3 mb-5 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center border border-brand-gold/40 group-hover:border-brand-gold transition-colors"
                  >
                    <Phone size={16} className="text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/90 text-sm tracking-wider" style={{ fontWeight: 400 }}>
                      ご予約・お問合せ
                    </span>
                  </div>
                </a>
                <p className="text-[10px] text-white/25 tracking-wider" style={{ fontWeight: 300 }}>
                  &copy; {new Date().getFullYear()} Tsukiji Nisshin Tasuke
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
