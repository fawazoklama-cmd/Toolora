import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { NotFoundPage } from './NotFoundPage';

export const CategoryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    return <NotFoundPage />;
  }

  const categoryTools = TOOLS.filter((t) => t.categories.includes(category.id));

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Kategori', path: '/categories' },
          { label: category.name },
        ]}
      />

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <DynamicIcon name={category.icon} className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {category.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              {category.description}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
          {categoryTools.length} alat tersedia
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};
