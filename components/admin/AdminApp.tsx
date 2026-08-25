import React, { useEffect, useState } from 'react';
import { authApi, type AdminUser } from './adminApi';
import { LoginPage } from './LoginPage';
import { SetupPage } from './SetupPage';
import { Dashboard } from './Dashboard';

// 管理画面のルート。認証状態で 読込中 / 初期設定 / ログイン / ダッシュボード を切替える。
export default function AdminApp() {
  const [state, setState] = useState<'loading' | 'authed' | 'login' | 'setup'>('loading');
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  const check = async () => {
    setState('loading');
    try {
      const { admin } = await authApi.me();
      setAdmin(admin);
      setState('authed');
      return;
    } catch {
      // 未認証 → セットアップ要否
    }
    try {
      const { setupNeeded } = await authApi.setupStatus();
      setState(setupNeeded ? 'setup' : 'login');
    } catch {
      setState('login');
    }
  };

  useEffect(() => { check(); }, []);

  if (state === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-400">読み込み中…</div>;
  }
  if (state === 'authed' && admin) return <Dashboard admin={admin} onLogout={check} />;
  if (state === 'setup') return <SetupPage onDone={check} />;
  return <LoginPage onSuccess={check} />;
}
