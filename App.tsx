import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { InstagramSection } from './components/InstagramSection';
import { About } from './components/About';
import { ForYou } from './components/ForYou';
import { GivingBack } from './components/GivingBack';
import { Story } from './components/Story';
import { JetChef } from './components/JetChef';
import { Locations } from './components/Locations';
import { Column } from './components/Column';
import { News } from './components/News';
import { Footer } from './components/Footer';
import { ArticlePage } from './components/ArticlePage';
import { ConsumerPage } from './components/ConsumerPage';
import { CorporatePage } from './components/CorporatePage';
import { CompanyPage } from './components/CompanyPage';
import { YochanPage } from './components/YochanPage';
import { NewsPage } from './components/NewsPage';
import { NewsListPage } from './components/NewsListPage';
import { ShopPage } from './components/ShopPage';

type PageView =
  | { type: 'home' }
  | { type: 'article'; id: string }
  | { type: 'news'; id: string }
  | { type: 'newslist'; page: number }
  | { type: 'shop'; id: string }
  | { type: 'consumer' }
  | { type: 'corporate' }
  | { type: 'company' }
  | { type: 'yochan' };

function App() {
  const [page, setPage] = useState<PageView>({ type: 'home' });

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;

      const articleMatch = hash.match(/^#article\/(.+)$/);
      if (articleMatch) {
        setPage({ type: 'article', id: articleMatch[1] });
        return;
      }

      const newsMatch = hash.match(/^#news\/(.+)$/);
      if (newsMatch) {
        setPage({ type: 'news', id: newsMatch[1] });
        return;
      }

      const newslistPageMatch = hash.match(/^#newslist\/(\d+)$/);
      if (newslistPageMatch) {
        setPage({ type: 'newslist', page: parseInt(newslistPageMatch[1], 10) });
        return;
      }

      if (hash === '#newslist') {
        setPage({ type: 'newslist', page: 1 });
        return;
      }

      const shopMatch = hash.match(/^#shop\/(.+)$/);
      if (shopMatch) {
        setPage({ type: 'shop', id: shopMatch[1] });
        return;
      }

      if (hash === '#consumer') {
        setPage({ type: 'consumer' });
        return;
      }

      if (hash === '#corporate') {
        setPage({ type: 'corporate' });
        return;
      }

      if (hash === '#company') {
        setPage({ type: 'company' });
        return;
      }

      if (hash === '#yochan') {
        setPage({ type: 'yochan' });
        return;
      }

      setPage({ type: 'home' });
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // 各ビューの本文。共通ヘッダー/フッターは下の Chrome で常に描画する。
  const renderContent = () => {
    switch (page.type) {
      case 'article':
        return (
          <ArticlePage
            articleId={page.id}
            onBack={() => { window.location.hash = '#column'; }}
          />
        );
      case 'consumer':
        return (
          <ConsumerPage
            onBack={() => { window.location.hash = '#foryou'; }}
          />
        );
      case 'corporate':
        return (
          <CorporatePage
            onBack={() => { window.location.hash = '#foryou'; }}
          />
        );
      case 'company':
        return (
          <CompanyPage
            onBack={() => { window.location.hash = '#about'; }}
          />
        );
      case 'newslist':
        return (
          <NewsListPage
            page={page.page}
            onBack={() => { window.location.hash = '#news'; }}
          />
        );
      case 'news':
        return (
          <NewsPage
            newsId={page.id}
            onBack={() => { window.location.hash = '#newslist'; }}
          />
        );
      case 'shop':
        return (
          <ShopPage
            shopId={page.id}
            onBack={() => { window.location.hash = '#locations'; }}
          />
        );
      case 'yochan':
        return (
          <YochanPage
            onBack={() => { window.location.hash = '#story'; }}
          />
        );
      case 'home':
      default:
        return (
          <>
            <Hero />
            <About />
            <ForYou />
            <GivingBack />
            <Story />
            <JetChef />
            <InstagramSection />
            <Locations />
            <Column />
            <News />
          </>
        );
    }
  };

  const isHome = page.type === 'home';

  return (
    <div className="w-full overflow-hidden">
      {/* サイト共通ヘッダー。サブページでは常時ソリッド背景で表示 */}
      <Navigation solid={!isHome} />
      <main>{renderContent()}</main>
      {/* サイト共通フッター */}
      <Footer />
    </div>
  );
}

export default App;
