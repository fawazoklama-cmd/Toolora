import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { ToolItem } from '../../types';
import { DynamicIcon } from './DynamicIcon';
import { useFavorites } from '../../context/FavoritesContext';
import { CATEGORIES } from '../../data/categories';

interface ToolCardProps {
  tool: ToolItem;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(tool.id);

  const primaryCategory = CATEGORIES.find((c) => c.id === tool.categories[0]);

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-blue-500/60 shadow-2xs hover:shadow-md transition-all duration-200">
      <div>
        {/* Top bar of card: Icon & Favorite Toggle */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <DynamicIcon name={tool.icon} className="w-5 h-5" />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(tool.id);
            }}
            aria-label={favorite ? `Hapus ${tool.name} dari favorit` : `Tambahkan ${tool.name} ke favorit`}
            className="p-1.5 rounded-md text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <Star
              className={`w-4 h-4 ${
                favorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400 hover:text-amber-400'
              }`}
            />
          </button>
        </div>

        {/* Unboxed category metadata (Zero-Pill discipline) */}
        {primaryCategory && (
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <span>{primaryCategory.name}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link to={`/tools/${tool.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {tool.name}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium inline-flex items-center gap-1 transition-colors">
          Buka Alat &rarr;
        </span>
      </div>
    </div>
  );
};
