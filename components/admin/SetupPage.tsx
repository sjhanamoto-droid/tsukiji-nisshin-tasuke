import React, { useState } from 'react';
import { authApi } from './adminApi';

// 初回のみ表示：SETUP_TOKEN と最初の管理者のメール・パスワードを設定する。
export const SetupPage: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('パスワードは8文字以上にしてください'); return; }
    if (password !== confirm) { setError('パスワード（確認）が一致しません'); return; }
    setLoading(true);
    try {
      await authApi.setup(token, email, password);
      setDone(true);
    } catch (err) {
      const msg = (err as Error).message;
      setError(
        msg === 'invalid_setup_token' ? 'セットアップトークンが違います'
        : msg === 'already_setup' ? '既に初期設定は完了しています'
        : 'セットアップに失敗しました: ' + msg,
      );
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h1 className="text-xl font-bold mb-2">初期設定が完了しました</h1>
          <p className="text-sm text-gray-500 mb-6">作成したメールアドレスとパスワードでログインしてください。</p>
          <button onClick={onDone} className="w-full py-2.5 rounded-md bg-brand-dark text-white font-medium hover:bg-black">
            ログイン画面へ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-xl font-bold text-center mb-1">初回セットアップ</h1>
        <p className="text-center text-sm text-gray-500 mb-6">最初の管理者アカウントを作成します</p>

        {error && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}

        <label className="block text-sm font-medium text-gray-700 mb-1">セットアップトークン</label>
        <input value={token} onChange={(e) => setToken(e.target.value)} required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40" />

        <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40" />

        <label className="block text-sm font-medium text-gray-700 mb-1">パスワード（8文字以上）</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40" />

        <label className="block text-sm font-medium text-gray-700 mb-1">パスワード（確認）</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40" />

        <button type="submit" disabled={loading}
          className="w-full py-2.5 rounded-md bg-brand-dark text-white font-medium hover:bg-black disabled:opacity-50">
          {loading ? '作成中…' : '管理者を作成'}
        </button>
      </form>
    </div>
  );
};
