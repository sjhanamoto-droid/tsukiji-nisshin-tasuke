import React from 'react';
import { Section } from './Section';
import { NEWS } from '../constants';
import { LoadingSpinner } from './LoadingSpinner';
import { useFetch } from '../lib/useMicroCMS';
import { fetchNewsList } from '../lib/cms';

export const News: React.FC = () => {
  const { data } = useFetch(() => fetchNewsList(), []);

  // CMS(DB)取得を優先。未取得・空・失敗時はハードコード（seed済みと同一）を表示。
  const items = (data && data.length ? data : NEWS).slice(0, 4);
  const showSpinner = false;

  return (
    <Section id="news" className="bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-brand-dark">NEWS</h2>

        {showSpinner ? (
          <LoadingSpinner />
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <a
                key={item.id || index}
                href={`/news/${item.id}`}
                className="block py-6 flex flex-col md:flex-row md:items-center group cursor-pointer no-underline"
              >
                <div className="flex items-center mb-2 md:mb-0 md:w-48 shrink-0">
                  <span className="text-sm text-gray-500 font-mono">{item.date}</span>
                  <span className="ml-4 text-xs bg-brand-dark text-white px-2 py-1 rounded-sm">
                    {item.category}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-base md:text-lg font-medium text-brand-dark group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
           <a href="/news" className="text-sm border-b border-brand-dark pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">お知らせ一覧を見る</a>
        </div>
      </div>
    </Section>
  );
};
