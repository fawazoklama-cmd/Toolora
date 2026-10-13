import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useFavorites } from '../context/FavoritesContext';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Favorit' }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Alat Favorit Tersimpan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Daftar utilitas yang Anda tandai dengan ikon bintang untuk akses instan.
          </p>
        </div>

        <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {favoriteTools.length} alat favorit
        </span>
      </div>

      {favoriteTools.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Belum Ada Alat Favorit
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Klik ikon bintang pada kartu alat atau di dalam halaman alat mana saja untuk menyimpannya di sini.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Jelajahi Semua Alat <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};
