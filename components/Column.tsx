import React from 'react';
import { Section } from './Section';
import { COLUMNS } from '../constants';
import { LoadingSpinner } from './LoadingSpinner';
import { isMicroCMSConfigured, getColumnsList } from '../lib/microcms';
import { useFetch } from '../lib/useMicroCMS';
import { toColumnItem } from '../lib/transforms';
import { motion } from 'framer-motion';

export const Column: React.FC = () => {
  const { data, loading, error } = useFetch(
    () => (isMicroCMSConfigured ? getColumnsList(10) : Promise.reject('not configured')),
    [],
  );

  const items = data ? data.contents.map(toColumnItem) : (loading && !error ? [] : COLUMNS);
  const showSpinner = loading && isMicroCMSConfigured;

  return (
    <Section id="column" className="bg-brand-cream border-t border-brand-gold/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-serif font-bold text-brand-dark mb-2">COLUMN</h2>
                <p className="text-brand-gray text-sm">食文化、開発秘話、私たちの想い。</p>
            </div>
        </div>

        {showSpinner ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {items.map((column, idx) => (
              <motion.article
                  key={column.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => { window.location.hash = `#article/${column.id}`; }}
              >
                  <div className="aspect-[16/10] overflow-hidden rounded-sm mb-4">
                      <img
                          src={column.image}
                          alt={column.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                  </div>
                  <div className="flex items-center gap-3 mb-2 text-xs">
                      <span className="text-gray-500 font-mono">{column.date}</span>
                      <span className="bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full font-medium">
                          {column.category}
                      </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-brand-dark leading-snug group-hover:text-brand-gold transition-colors">
                      {column.title}
                  </h3>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};
