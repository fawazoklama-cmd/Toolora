import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Zap, Laptop, Clock, Star, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { ToolCard } from '../components/common/ToolCard';
import { CategoryCard } from '../components/common/CategoryCard';
import { useFavorites } from '../context/FavoritesContext';
import { useToolHistory } from '../context/HistoryContext';

export const HomePage: React.FC = () => {
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { history } = useToolHistory();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/tools?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/tools');
    }
  };

  const popularTools = TOOLS.filter((t) => t.featured).slice(0, 8);
  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section */}
      <section className="text-center pt-8 sm:pt-14 pb-8 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
          Semua Alat yang Kamu Butuhkan.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Kumpulan utilitas online praktis untuk kebutuhan sehari-hari, pelajar, kreator konten, dan developer. Selesaikan pekerjaanmu dalam satu tempat tanpa instalasi.
        </p>

        {/* Hero Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative pt-2">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Cari kalkulator, converter, json, password..."
              className="w-full pl-11 pr-28 py-3.5 text-sm sm:text-base rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 dark:text-slate-100"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
            >
              Cari Alat
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            100% Proses Lokal di Browser
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Tanpa Akun & Tanpa Login
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Laptop className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            Ringan di Semua Perangkat
          </span>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Alat Populer
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Alat yang paling sering digunakan untuk produktivitas harian
            </p>
          </div>
          <Link
            to="/tools"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            Semua Alat &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Kategori Alat
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Temukan alat berdasarkan bidang pekerjaan Anda
            </p>
          </div>
          <Link
            to="/categories"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            Lihat Kategori &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Baru Digunakan (Recent History) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Baru Digunakan
            </h2>
          </div>
          {history.length > 0 && (
            <Link to="/history" className="text-xs text-blue-600 hover:underline">
              Buka Riwayat &rarr;
            </Link>
          )}
        </div>

        {history.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
            Belum ada alat yang baru saja digunakan. Mulai jelajahi katalog alat di atas!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {history.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                to={`/tools/${item.slug}`}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-colors flex flex-col justify-between"
              >
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-2">Buka &rarr;</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Favorit */}
      {favoriteTools.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Alat Favorit Anda
              </h2>
            </div>
            <Link to="/favorites" className="text-xs text-blue-600 hover:underline">
              Kelola Favorit &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoriteTools.slice(0, 4).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
