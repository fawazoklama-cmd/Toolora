import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { ToolCard } from '../components/common/ToolCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CategoryId } from '../types';

export const AllToolsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'nameAsc' | 'nameDesc'>('featured');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setQuery(q);
    const cat = searchParams.get('category');
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredTools = React.useMemo(() => {
    let result = [...TOOLS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((t) => t.categories.includes(selectedCategory as CategoryId));
    }

    // Query filter
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter((tool) => {
        const matchName = tool.name.toLowerCase().includes(q);
        const matchDesc = tool.description.toLowerCase().includes(q);
        const matchKeyword = tool.keywords.some((kw) => kw.toLowerCase().includes(q));
        return matchName || matchDesc || matchKeyword;
      });
    }

    // Sort
    if (sortBy === 'nameAsc') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'id'));
    } else if (sortBy === 'nameDesc') {
      result.sort((a, b) => b.name.localeCompare(a.name, 'id'));
    } else {
      // featured first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, query, sortBy]);

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Semua Alat' }]} />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Jelajahi Semua Alat Toolora
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Koleksi lengkap {TOOLS.length} alat online praktis tanpa login dan tanpa unduh aplikasi.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchParams((prev) => {
                  if (e.target.value) prev.set('q', e.target.value);
                  else prev.delete('q');
                  return prev;
                });
              }}
              placeholder="Cari alat berdasarkan nama atau fungsi..."
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setSearchParams((prev) => {
                    prev.delete('q');
                    return prev;
                  });
                }}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'nameAsc' | 'nameDesc')}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="featured">Paling Populer</option>
              <option value="nameAsc">Nama (A &rarr; Z)</option>
              <option value="nameDesc">Nama (Z &rarr; A)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Buttons (Functional Tabs, Clean styling) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchParams((prev) => {
                prev.delete('category');
                return prev;
              });
            }}
            className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Semua ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.categories.includes(cat.id)).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchParams((prev) => {
                    prev.set('category', cat.id);
                    return prev;
                  });
                }}
                className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of tools */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-base font-semibold">Tidak ada alat yang ditemukan</p>
          <p className="text-xs text-slate-400 mt-1">
            Coba ubah kata kunci pencarian atau pilih kategori lain.
          </p>
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('all');
              setSearchParams({});
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};
