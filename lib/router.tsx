// パスベースの軽量クライアントルーター。
// 依存を増やさず History API のみで実装する（ハッシュ #ルーティングからの移行）。
import { useEffect, useState } from 'react';

export type PageView =
  | { type: 'home' }
  | { type: 'article'; id: string }
  | { type: 'news'; id: string }
  | { type: 'newslist'; page: number }
  | { type: 'shop'; id: string }
  | { type: 'consumer' }
  | { type: 'corporate' }
  | { type: 'company' }
  | { type: 'yochan' }
  | { type: 'privacy' };

// pathname を PageView へ変換する（判定順が重要）
export function parseRoute(pathname: string): PageView {
  const article = pathname.match(/^\/column\/(.+)$/);
  if (article) return { type: 'article', id: decodeURIComponent(article[1]) };

  const newsPage = pathname.match(/^\/news\/page\/(\d+)$/);
  if (newsPage) return { type: 'newslist', page: parseInt(newsPage[1], 10) };

  if (pathname === '/news' || pathname === '/news/') return { type: 'newslist', page: 1 };

  const newsDetail = pathname.match(/^\/news\/(.+)$/);
  if (newsDetail) return { type: 'news', id: decodeURIComponent(newsDetail[1]) };

  const shop = pathname.match(/^\/shop\/(.+)$/);
  if (shop) return { type: 'shop', id: decodeURIComponent(shop[1]) };

  if (pathname === '/company') return { type: 'company' };
  if (pathname === '/consumer') return { type: 'consumer' };
  if (pathname === '/corporate') return { type: 'corporate' };
  if (pathname === '/yochan') return { type: 'yochan' };
  if (pathname === '/privacy-policy') return { type: 'privacy' };

  return { type: 'home' };
}

// 現在のルートを購読するフック（popstate に反応）
export function useRoute(): PageView {
  const [route, setRoute] = useState<PageView>(() =>
    parseRoute(typeof window !== 'undefined' ? window.location.pathname : '/')
  );
  useEffect(() => {
    const update = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);
  return route;
}

// クライアントサイド遷移。to は "/company" や "/#locations" 等。
export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  window.history.pushState({}, '', url.pathname + url.search + url.hash);
  // App / Navigation 双方のリスナーへ通知
  window.dispatchEvent(new PopStateEvent('popstate'));
  scrollToTarget(url.hash);
}

// フラグメントがあればその要素へ、無ければ最上部へスクロール。
// SPA では画像・アニメーションでレイアウトが後から伸びるため、
// スクロールせずに対象要素の位置が安定するのを待ち、確定後に一度だけスクロールする。
// 注: このサイトは CSS scroll-behavior:smooth 下で smooth/auto の
//     プログラムスクロールが機能しないため 'instant' を用いる。
const INSTANT = 'instant' as ScrollBehavior;

export function scrollToTarget(hash: string) {
  const id = hash && hash.length > 1 ? hash.slice(1) : '';
  if (!id) {
    window.scrollTo({ top: 0, behavior: INSTANT });
    return;
  }
  let tries = 0;
  let lastTop: number | null = null;
  let stable = 0;
  const step = () => {
    const el = document.getElementById(id);
    if (!el) {
      // まだ描画されていない → 少し待って再試行
      if (tries++ < 25) setTimeout(step, 40);
      return;
    }
    const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
    // 毎回スナップ（instant なので再スクロールしても破綻しない）。
    // 画像・アニメでレイアウトが伸びても位置を追従してピン留めする。
    window.scrollTo({ top: Math.max(0, top), behavior: INSTANT });
    if (lastTop !== null && Math.abs(top - lastTop) < 2) stable++;
    else stable = 0;
    lastTop = top;
    // 位置が3連続で安定したら終了（レイアウト確定）
    if (stable < 3 && tries++ < 40) setTimeout(step, 50);
  };
  step();
}
