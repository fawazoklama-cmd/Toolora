import React from 'react';
import { Link } from 'react-router-dom';
import { CategoryInfo } from '../../types';
import { DynamicIcon } from './DynamicIcon';
import { TOOLS } from '../../data/tools';

interface CategoryCardProps {
  category: CategoryInfo;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Count real tools assigned to this category
  const count = TOOLS.filter((t) => t.categories.includes(category.id)).length;

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/60 shadow-2xs hover:shadow-md transition-all duration-200"
    >
      <div>
        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
          <DynamicIcon name={category.icon} className="w-5 h-5" />
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {category.name}
        </h3>

        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="tabular-nums font-mono text-slate-500 dark:text-slate-400">
          {count} alat
        </span>
        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium transition-colors">
          Lihat &rarr;
        </span>
      </div>
    </Link>
  );
};
