import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
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

  if (page.type === 'article') {
    return (
      <ArticlePage
        articleId={page.id}
        onBack={() => {
          window.location.hash = '#column';
          setPage({ type: 'home' });
        }}
      />
    );
  }

  if (page.type === 'consumer') {
    return (
      <ConsumerPage
        onBack={() => {
          window.location.hash = '#foryou';
          setPage({ type: 'home' });
        }}
      />
    );
  }

  if (page.type === 'corporate') {
    return (
      <CorporatePage
        onBack={() => {
          window.location.hash = '#foryou';
          setPage({ type: 'home' });
        }}
      />
    );
  }

  if (page.type === 'company') {
    return (
      <CompanyPage
        onBack={() => {
          window.location.hash = '#about';
          setPage({ type: 'home' });
        }}
      />
    );
  }

  if (page.type === 'newslist') {
    return (
      <NewsListPage
        page={page.page}
        onBack={() => {
          window.location.hash = '#news';
          setPage({ type: 'home' });
        }}
      />
    );
  }

  if (page.type === 'news') {
    return (
      <NewsPage
        newsId={page.id}
        onBack={() => {
          window.location.hash = '#newslist';
          setPage({ type: 'newslist', page: 1 });
        }}
      />
    );
  }

  if (page.type === 'shop') {
    return (
      <ShopPage
        shopId={page.id}
        onBack={() => {
          window.location.hash = '#locations';
          setPage({ type: 'home' });
        }}
      />
    );
  }

  if (page.type === 'yochan') {
    return (
      <YochanPage
        onBack={() => {
          window.location.hash = '#story';
          setPage({ type: 'home' });
        }}
      />
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <ForYou />
        <GivingBack />
        <Story />
        <JetChef />
        <Locations />
        <Column />
        <News />
      </main>
      <Footer />
    </div>
  );
}

export default App;
