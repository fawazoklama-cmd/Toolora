import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Monitor, Search, Menu, X, Wrench } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { theme, setTheme, isDark } = useTheme();
  const { favorites } = useFavorites();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Semua Alat', path: '/tools' },
    { label: 'Kategori', path: '/categories' },
    {
      label: `Favorit ${favorites.length > 0 ? `(${favorites.length})` : ''}`,
      path: '/favorites',
    },
    { label: 'Riwayat', path: '/history' },
  ];

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="font-bold tracking-tight">Toolora</span>
        </Link>

        {/* Zone 2: Navigation Links (single-line, concise) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Quick Search trigger + Theme toggle + Mobile Menu) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg border border-transparent transition-colors cursor-pointer"
              aria-label="Cari alat"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cari alat...</span>
              <kbd className="hidden sm:inline font-mono text-[10px] bg-white dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                /
              </kbd>
            </button>
          )}

          <button
            type="button"
            onClick={cycleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={`Tema: ${theme} (Klik untuk berganti)`}
            aria-label="Ganti mode tema"
          >
            {theme === 'system' ? (
              <Monitor className="w-4 h-4" />
            ) : isDark ? (
              <Moon className="w-4 h-4 text-blue-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-3 text-xs text-slate-500">
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Pengaturan & Cadangan
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Tentang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
