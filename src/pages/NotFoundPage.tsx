import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 text-center max-w-md mx-auto space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Maaf, halaman atau alat online yang Anda cari tidak tersedia atau alamat URL telah dipindahkan.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-700 dark:text-slate-300 transition-colors"
        >
          <Search className="w-4 h-4" />
          Cari Semua Alat
        </Link>
      </div>
    </div>
  );
};
