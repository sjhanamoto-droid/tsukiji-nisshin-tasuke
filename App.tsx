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
import { useRoute, navigate, scrollToTarget, PageView } from './lib/router';
import { SHOPS, NEWS, COLUMNS } from './constants';

const SITE_SUFFIX = ' | 築地にっしん太助';
const BASE_TITLE = '築地にっしん太助 | 築地場外市場のうなぎ専門店';

// 各ルートの <title>（SEO：ページごとに一意なタイトルを付ける）
function titleFor(page: PageView): string {
  switch (page.type) {
    case 'company': return '会社案内' + SITE_SUFFIX;
    case 'consumer': return '個人のお客様へ' + SITE_SUFFIX;
    case 'corporate': return '法人のお客様へ' + SITE_SUFFIX;
    case 'yochan': return 'ようちゃんとは' + SITE_SUFFIX;
    case 'newslist': return 'お知らせ一覧' + SITE_SUFFIX;
    case 'news': {
      const n = NEWS.find(x => x.id === page.id);
      return (n ? n.title : 'お知らせ') + SITE_SUFFIX;
    }
    case 'article': {
      const c = COLUMNS.find(x => x.id === page.id);
      return (c ? c.title : 'コラム') + SITE_SUFFIX;
    }
    case 'shop': {
      const s = SHOPS.find(x => x.id === page.id);
      return (s ? s.name : '店舗案内') + SITE_SUFFIX;
    }
    default: return BASE_TITLE;
  }
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

  // ルートが変わるたびに <title> と canonical を更新（SEO）
  useEffect(() => {
    document.title = titleFor(page);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.origin + window.location.pathname);
    }
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
