import React, { useEffect } from 'react';
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
import { useRoute, navigate, scrollToTarget } from './lib/router';
import { titleFor, descriptionFor, jsonLdFor } from './lib/seo';

// <meta name="..."> を無ければ作成し、あれば更新する
function upsertMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// ルート別の JSON-LD を <script id="route-jsonld"> に反映（空なら削除）
function setRouteJsonLd(data: { '@graph': object[] }) {
  const existing = document.getElementById('route-jsonld');
  if (!data['@graph'].length) {
    if (existing) existing.remove();
    return;
  }
  const el = existing || document.createElement('script');
  if (!existing) {
    el.setAttribute('type', 'application/ld+json');
    el.id = 'route-jsonld';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function App() {
  const page = useRoute();

  // 内部リンク（/... で始まる <a>）をクライアントサイド遷移に変換する。
  // これにより各コンポーネントの <a href="/company"> 等をそのまま SPA 遷移にできる。
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      const target = a.getAttribute('target');
      if (!href || !href.startsWith('/') || target === '_blank' || a.hasAttribute('download')) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // 初回ロード時、URL にフラグメントがあればその位置へスクロール
  useEffect(() => {
    if (window.location.hash) scrollToTarget(window.location.hash);
  }, []);

  // ルートが変わるたびに <title> / description / canonical / JSON-LD を更新（SEO）
  useEffect(() => {
    document.title = titleFor(page);
    upsertMetaByName('description', descriptionFor(page));
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + window.location.pathname);
    }
    setRouteJsonLd(jsonLdFor(page));
  }, [page]);

  // 各ビューの本文。共通ヘッダー/フッターは下の Chrome で常に描画する。
  const renderContent = () => {
    switch (page.type) {
      case 'article':
        return (
          <ArticlePage
            articleId={page.id}
            onBack={() => navigate('/#column')}
          />
        );
      case 'consumer':
        return (
          <ConsumerPage
            onBack={() => navigate('/#foryou')}
          />
        );
      case 'corporate':
        return (
          <CorporatePage
            onBack={() => navigate('/#foryou')}
          />
        );
      case 'company':
        return (
          <CompanyPage
            onBack={() => navigate('/#about')}
          />
        );
      case 'newslist':
        return (
          <NewsListPage
            page={page.page}
            onBack={() => navigate('/#news')}
          />
        );
      case 'news':
        return (
          <NewsPage
            newsId={page.id}
            onBack={() => navigate('/news')}
          />
        );
      case 'shop':
        return (
          <ShopPage
            shopId={page.id}
            onBack={() => navigate('/#locations')}
          />
        );
      case 'yochan':
        return (
          <YochanPage
            onBack={() => navigate('/#story')}
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
