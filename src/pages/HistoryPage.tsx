import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { useToolHistory } from '../context/HistoryContext';
import { formatRelativeTime } from '../lib/formatters';

export const HistoryPage: React.FC = () => {
  const { history, removeFromHistory, clearHistory } = useToolHistory();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Breadcrumbs items={[{ label: 'Riwayat' }]} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Riwayat Alat yang Pernah Dibuka
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Riwayat tersimpan secara lokal di peramban Anda. Tidak ada data input atau berkas yang disimpan.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Hapus Semua Riwayat
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center mx-auto">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Riwayat Penggunaan Masih Kosong
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Alat yang Anda kunjungi akan secara otomatis dicatat di sini untuk memudahkan navigasi kembali.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Mulai Gunakan Alat <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs divide-y divide-slate-100 dark:divide-slate-800">
          {history.map((item) => (
            <div
              key={item.id}
              className="py-3.5 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <DynamicIcon name={item.icon} className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <Link
                    to={`/tools/${item.slug}`}
                    className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block truncate"
                  >
                    {item.name}
                  </Link>
                  <span className="text-[11px] text-slate-400">
                    {formatRelativeTime(item.timestamp)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/tools/${item.slug}`}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Buka
                </Link>
                <button
                  onClick={() => removeFromHistory(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
                  title="Hapus dari riwayat"
                  aria-label="Hapus dari riwayat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
