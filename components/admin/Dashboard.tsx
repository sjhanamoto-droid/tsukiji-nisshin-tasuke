import React, { useEffect, useState } from 'react';
import { authApi, adminsApi, newsApi, columnsApi, type AdminUser } from './adminApi';
import { EntryEditor } from './EntryEditor';

type Tab = 'news' | 'columns' | 'admins';

// ── コンテンツ一覧（ニュース/コラム共通）──
const ContentList: React.FC<{
  kind: 'news' | 'column';
  onEdit: (id?: string) => void;
}> = ({ kind, onEdit }) => {
  const apiClient = kind === 'news' ? newsApi : columnsApi;
  const label = kind === 'news' ? 'ニュース' : 'コラム';
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    apiClient.list().then(({ items }) => { setItems(items); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(load, [kind]);

  const remove = async (id: string, title: string) => {
    if (!window.confirm(`「${title}」を削除します。よろしいですか？`)) return;
    try { await apiClient.remove(id); load(); } catch (e) { alert('削除に失敗しました: ' + (e as Error).message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{label}一覧</h2>
        <button onClick={() => onEdit(undefined)} className="px-4 py-2 rounded-md bg-brand-dark text-white text-sm font-medium hover:bg-black">
          ＋ 新規追加
        </button>
      </div>
      {loading ? (
        <p className="text-gray-400 py-8 text-center">読み込み中…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-400 py-8 text-center">まだ{label}がありません。「新規追加」から作成してください。</p>
      ) : (
        <div className="divide-y border border-gray-200 rounded-md bg-white">
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-4 px-4 py-3">
              <span className="text-xs text-gray-400 font-mono w-24 shrink-0">{it.date}</span>
              {it.category && <span className="text-[11px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 shrink-0">{it.category}</span>}
              <span className="flex-1 text-sm truncate">{it.title}</span>
              <button onClick={() => onEdit(it.id)} className="text-sm text-blue-600 hover:underline shrink-0">編集</button>
              <button onClick={() => remove(it.id, it.title)} className="text-sm text-red-600 hover:underline shrink-0">削除</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── 管理者管理 ──
const AdminsPanel: React.FC<{ meEmail: string }> = ({ meEmail }) => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => adminsApi.list().then(({ admins }) => setAdmins(admins)).catch(() => {});
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('パスワードは8文字以上にしてください'); return; }
    setBusy(true);
    try {
      await adminsApi.create(email, password);
      setEmail(''); setPassword(''); load();
    } catch (err) {
      const m = (err as Error).message;
      setError(m === 'email_taken' ? 'このメールアドレスは既に登録されています' : m === 'invalid_email' ? 'メールアドレスの形式が正しくありません' : '追加に失敗しました');
    } finally { setBusy(false); }
  };

  const remove = async (id: number, email: string) => {
    if (!window.confirm(`管理者「${email}」を削除します。よろしいですか？`)) return;
    try { await adminsApi.remove(id); load(); } catch (e) {
      const m = (e as Error).message;
      alert(m === 'cannot_delete_last_admin' ? '最後の管理者は削除できません' : '削除に失敗しました');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">管理者一覧</h2>
      <div className="divide-y border border-gray-200 rounded-md bg-white mb-8">
        {admins.map((a) => (
          <div key={a.id} className="flex items-center gap-4 px-4 py-3">
            <span className="flex-1 text-sm">{a.email}{a.email === meEmail && <span className="ml-2 text-xs text-gray-400">（あなた）</span>}</span>
            <button onClick={() => remove(a.id, a.email)} className="text-sm text-red-600 hover:underline">削除</button>
          </div>
        ))}
      </div>

      <h3 className="font-bold mb-3">管理者を追加</h3>
      <p className="text-xs text-gray-500 mb-3">全員が同じ権限を持ちます。追加された人も、さらに別の管理者を追加できます。</p>
      {error && <div className="mb-3 p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}
      <form onSubmit={add} className="flex flex-wrap items-end gap-3 max-w-xl">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40" />
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">パスワード（8文字以上）</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40" />
        </div>
        <button type="submit" disabled={busy} className="px-5 py-2 rounded-md bg-brand-dark text-white text-sm font-medium hover:bg-black disabled:opacity-50">
          追加
        </button>
      </form>
    </div>
  );
};

// ── ダッシュボード本体 ──
export const Dashboard: React.FC<{ admin: AdminUser; onLogout: () => void }> = ({ admin, onLogout }) => {
  const [tab, setTab] = useState<Tab>('news');
  const [editing, setEditing] = useState<{ kind: 'news' | 'column'; id?: string } | null>(null);

  const logout = async () => { try { await authApi.logout(); } finally { onLogout(); } };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'news', label: 'ニュース' },
    { key: 'columns', label: 'コラム' },
    { key: 'admins', label: '管理者' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <span className="font-bold">築地にっしん太助 <span className="text-gray-400 font-normal text-sm">管理画面</span></span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{admin.email}</span>
            <button onClick={logout} className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded px-3 py-1">ログアウト</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8">
        {editing ? (
          <EntryEditor
            kind={editing.kind}
            id={editing.id}
            onDone={() => setEditing(null)}
          />
        ) : (
          <>
            <div className="flex gap-1 mb-6 border-b border-gray-200">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                    tab === t.key ? 'border-brand-dark text-brand-dark' : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === 'news' && <ContentList kind="news" onEdit={(id) => setEditing({ kind: 'news', id })} />}
            {tab === 'columns' && <ContentList kind="column" onEdit={(id) => setEditing({ kind: 'column', id })} />}
            {tab === 'admins' && <AdminsPanel meEmail={admin.email} />}
          </>
        )}
      </main>
    </div>
  );
};
