import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, Zap } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120] text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Promise */}
          <div className="md:col-span-2 space-y-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <span>Toolora</span>
            </Link>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
              Everything You Need, One Place.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Platform kumpulan utilitas digital praktis yang berjalan 100% di browser Anda.
              Tanpa pendaftaran akun, tanpa database eksternal, cepat, aman, dan menjaga privasi data Anda.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Pemrosesan Lokal di Browser
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Tanpa Login & Bebas Iklan
              </span>
            </div>
          </div>

          {/* Col 2: Kategori Populer */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Kategori Alat
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/categories"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Semua Kategori &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigasi & Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Informasi & Sistem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Tentang Toolora
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pengaturan & Cadangan
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Riwayat Penggunaan
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Alat Favorit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Toolora. Hak cipta dilindungi undang-undang.</p>
          <p>Dibuat untuk produktivitas mandiri pengguna secara cepat dan efisien.</p>
        </div>
      </div>
    </footer>
  );
};
