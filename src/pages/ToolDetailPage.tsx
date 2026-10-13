import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { TOOL_COMPONENTS } from '../tools';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { ToolCard } from '../components/common/ToolCard';
import { useFavorites } from '../context/FavoritesContext';
import { useToolHistory } from '../context/HistoryContext';
import { NotFoundPage } from './NotFoundPage';

export const ToolDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { recordToolVisit } = useToolHistory();

  const tool = TOOLS.find((t) => t.slug === slug);

  useEffect(() => {
    if (tool) {
      recordToolVisit({
        id: tool.id,
        slug: tool.slug,
        name: tool.name,
        icon: tool.icon,
        category: tool.categories[0],
      });
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [tool]);

  if (!tool) {
    return <NotFoundPage />;
  }

  const primaryCategory = CATEGORIES.find((c) => c.id === tool.categories[0]);
  const ToolComponent = TOOL_COMPONENTS[tool.slug];
  const favorite = isFavorite(tool.id);

  // Related tools: same category, excluding current tool
  const relatedTools = TOOLS.filter(
    (t) => t.id !== tool.id && t.categories.some((c) => tool.categories.includes(c))
  ).slice(0, 4);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Breadcrumbs
        items={[
          ...(primaryCategory
            ? [{ label: primaryCategory.name, path: `/categories/${primaryCategory.slug}` }]
            : []),
          { label: tool.name },
        ]}
      />

      {/* Tool Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <DynamicIcon name={tool.icon} className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {tool.name}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(tool.id)}
          aria-label={favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
            favorite
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Star
            className={`w-4 h-4 ${favorite ? 'fill-amber-400 text-amber-500' : 'text-slate-400'}`}
          />
          <span>{favorite ? 'Tersimpan di Favorit' : 'Tambah ke Favorit'}</span>
        </button>
      </div>

      {/* Main Tool Component Body */}
      <section className="space-y-6">
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 text-sm">
            Modul alat sedang dimuat...
          </div>
        )}
      </section>

      {/* Info & Privacy Notice */}
      <div className="p-5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong>Keamanan & Privasi Terjamin:</strong> Seluruh perhitungan, konversi, dan pemrosesan pada alat ini dijalankan secara langsung di peramban (browser) perangkat Anda. Tidak ada data pribadi, gambar, atau isi teks yang diunggah ke server eksternal.
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Alat Terkait yang Mungkin Kamu Butuhkan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((rt) => (
              <ToolCard key={rt.id} tool={rt} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
