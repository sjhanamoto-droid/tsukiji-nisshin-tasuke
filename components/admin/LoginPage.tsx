import React, { useState } from 'react';
import { authApi } from './adminApi';

export const LoginPage: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authApi.login(email, password);
      onSuccess();
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg === 'invalid_credentials' ? 'メールアドレスまたはパスワードが違います' : 'ログインに失敗しました');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-xl font-bold text-center mb-1">築地にっしん太助</h1>
        <p className="text-center text-sm text-gray-500 mb-6">管理画面ログイン</p>

        {error && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}

        <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-md bg-brand-dark text-white font-medium hover:bg-black disabled:opacity-50"
        >
          {loading ? 'ログイン中…' : 'ログイン'}
        </button>
      </form>
    </div>
  );
};
