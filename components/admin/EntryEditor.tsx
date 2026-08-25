import React, { useEffect, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { RichTextEditor } from './RichTextEditor';
import { newsApi, columnsApi, type ContentInput } from './adminApi';

interface EntryEditorProps {
  kind: 'news' | 'column';
  id?: string; // 指定時は編集
  onDone: (changed: boolean) => void;
}

function today(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

const NEWS_CATEGORIES = ['お知らせ', 'イベント', '特許', '商標'];

export const EntryEditor: React.FC<EntryEditorProps> = ({ kind, id, onDone }) => {
  const apiClient = kind === 'news' ? newsApi : columnsApi;
  const isColumn = kind === 'column';
  const label = kind === 'news' ? 'ニュース' : 'コラム';

  const [loaded, setLoaded] = useState(!id);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(kind === 'news' ? 'お知らせ' : 'コラム');
  const [date, setDate] = useState(today());
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [contentHtml, setContentHtml] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [coverUploading, setCoverUploading] = useState(false);
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    apiClient.get(id)
      .then(({ item }) => {
        setTitle(item.title || '');
        setCategory(item.category || '');
        setDate(item.date || today());
        setCoverImageUrl(item.coverImageUrl || '');
        setContentHtml(item.contentHtml || '');
        setLoaded(true);
      })
      .catch((e) => { setError('読み込みに失敗しました: ' + e.message); setLoaded(true); });
  }, [id]);

  const onCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setCoverUploading(true);
    try {
      const { url } = await upload(file.name, file, { access: 'public', handleUploadUrl: '/api/upload' });
      setCoverImageUrl(url);
    } catch (err) {
      alert('画像アップロードに失敗しました: ' + (err as Error).message);
    } finally {
      setCoverUploading(false);
    }
  };

  const save = async () => {
    if (!title.trim()) { setError('タイトルを入力してください'); return; }
    setSaving(true);
    setError('');
    const data: ContentInput = {
      title: title.trim(),
      category: category.trim(),
      date: date.trim() || today(),
      contentHtml,
      ...(isColumn ? { coverImageUrl: coverImageUrl || null } : { images: [] }),
    };
    try {
      if (id) await apiClient.update(id, data);
      else await apiClient.create(data);
      onDone(true);
    } catch (e) {
      setError('保存に失敗しました: ' + (e as Error).message);
      setSaving(false);
    }
  };

  if (!loaded) return <div className="p-8 text-gray-400">読み込み中…</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{id ? `${label}を編集` : `${label}を新規作成`}</h2>
        <button onClick={() => onDone(false)} className="text-sm text-gray-500 hover:text-gray-800">← 一覧に戻る</button>
      </div>

      {error && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm border border-red-200">{error}</div>}

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
            placeholder="タイトルを入力"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
            {kind === 'news' ? (
              <input
                list="news-categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              />
            ) : (
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              />
            )}
            <datalist id="news-categories">
              {NEWS_CATEGORIES.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">日付（YYYY.MM.DD）</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              placeholder="2026.01.01"
            />
          </div>
        </div>

        {isColumn && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">カバー画像</label>
            <div className="flex items-center gap-4">
              {coverImageUrl ? (
                <img src={coverImageUrl} alt="cover" className="h-20 w-32 object-cover rounded border border-gray-200" />
              ) : (
                <div className="h-20 w-32 rounded border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">未設定</div>
              )}
              <button onClick={() => coverRef.current?.click()} className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
                {coverUploading ? 'アップロード中…' : '画像を選択'}
              </button>
              {coverImageUrl && (
                <button onClick={() => setCoverImageUrl('')} className="text-sm text-gray-500 hover:text-red-600">削除</button>
              )}
              <input ref={coverRef} type="file" accept="image/*" hidden onChange={onCoverFile} />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">本文</label>
          <RichTextEditor value={contentHtml} onChange={setContentHtml} />
          <p className="mt-1 text-xs text-gray-400">見出し（H1〜H5）・太字・行内太字・箇条書き・画像が使えます。</p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={save}
            disabled={saving}
            className="px-6 py-2.5 rounded-md bg-brand-dark text-white font-medium hover:bg-black disabled:opacity-50"
          >
            {saving ? '保存中…' : '保存する'}
          </button>
          <button onClick={() => onDone(false)} className="px-4 py-2.5 text-gray-600 hover:text-gray-900">キャンセル</button>
        </div>
      </div>
    </div>
  );
};
