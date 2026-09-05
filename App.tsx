import React, { useEffect, lazy, Suspense } from 'react';
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
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { useRoute, navigate, scrollToTarget } from './lib/router';
import { titleFor, descriptionFor, keywordsFor, jsonLdFor, canonicalFor, ogImageFor, isIndexable } from './lib/seo';
import {
  upsertMetaByName, upsertMetaByProperty, setCanonical, setRobots, setRouteJsonLd,
} from './lib/pageMeta';

// 管理画面（/admin）は遅延読み込み（公開バンドルには含めない）
const AdminApp = lazy(() => import('./components/admin/AdminApp'));

function App() {
  const page = useRoute();
  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

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

  // ルートが変わるたびに <title> / description / canonical / OGP / JSON-LD を更新（SEO）。
  // 初期表示分は scripts/prerender.ts が静的HTMLへ埋め込み済みで、ここは SPA 遷移用。
  // canonical は window.location ではなくルート定義から組み立てる（クエリ文字列を含めないため）。
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return; // 管理画面は対象外
    const title = titleFor(page);
    const description = descriptionFor(page);
    const url = canonicalFor(page);
    const image = ogImageFor(page);

    document.title = title;
    upsertMetaByName('description', description);
    upsertMetaByName('keywords', keywordsFor(page));
    setCanonical(url);
    // 未知の店舗IDなどはここで noindex。お知らせ・コラムは CMS 取得後に各ページが判定する。
    setRobots(isIndexable(page));

    upsertMetaByProperty('og:url', url);
    upsertMetaByProperty('og:type', page.type === 'news' || page.type === 'article' ? 'article' : 'website');
    upsertMetaByProperty('og:title', title);
    upsertMetaByProperty('og:description', description);
    upsertMetaByProperty('og:image', image);
    upsertMetaByName('twitter:title', title);
    upsertMetaByName('twitter:description', description);
    upsertMetaByName('twitter:image', image);

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
      case 'privacy':
        return (
          <PrivacyPolicyPage
            onBack={() => navigate('/')}
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

  // 管理画面（/admin）は公開サイトの枠を使わず、専用アプリを表示
  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
        <AdminApp />
      </Suspense>
    );
  }

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
