import React, { useRef, useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { upload } from '@vercel/blob/client';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

// ツールバーのボタン
const Btn: React.FC<{ active?: boolean; onClick: () => void; title: string; children: React.ReactNode }> = ({
  active, onClick, title, children,
}) => (
  <button
    type="button"
    title={title}
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    className={`px-2.5 py-1 text-sm rounded border transition-colors ${
      active ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await upload(file.name, file, { access: 'public', handleUploadUrl: '/api/upload' });
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      alert('画像アップロードに失敗しました: ' + (err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-2 border-b border-gray-200 bg-gray-50">
      {([1, 2, 3, 4, 5] as const).map((level) => (
        <Btn
          key={level}
          title={`見出し H${level}`}
          active={editor.isActive('heading', { level })}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
        >
          H{level}
        </Btn>
      ))}
      <Btn title="本文（段落）" active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()}>
        本文
      </Btn>
      <span className="w-px h-5 bg-gray-300 mx-1" />
      <Btn title="太字（行内も可）" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <strong>B</strong>
      </Btn>
      <Btn title="箇条書き" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • 箇条書き
      </Btn>
      <Btn title="引用" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        “ 引用
      </Btn>
      <span className="w-px h-5 bg-gray-300 mx-1" />
      <Btn title="画像を挿入" onClick={() => fileRef.current?.click()}>
        {uploading ? 'アップロード中…' : '🖼 画像'}
      </Btn>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
    </div>
  );
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5] } }),
      Image.configure({ inline: false }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return <div className="p-4 text-gray-400 text-sm">エディタを読み込み中…</div>;

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[280px] focus:outline-none [&_.ProseMirror]:min-h-[260px] [&_.ProseMirror]:outline-none [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_h5]:text-base [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h4]:font-semibold [&_h5]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:text-gray-600 [&_img]:max-w-full [&_p]:my-2 [&_h1]:my-3 [&_h2]:my-3 [&_h3]:my-2"
      />
    </div>
  );
};
