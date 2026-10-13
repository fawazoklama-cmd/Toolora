import React, { useRef } from 'react';
import { Download, Upload, Trash2, RotateCcw, Monitor, Sun, Moon, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';
import { useToolHistory } from '../context/HistoryContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { exportUserData, importUserData, safeLocalStorage } from '../lib/storage';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { clearHistory } = useToolHistory();
  const { favorites } = useFavorites();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      const dataStr = exportUserData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `toolora_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Cadangan data berhasil diunduh!', 'success');
    } catch {
      showToast('Gagal mengekspor data cadangan.', 'error');
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importUserData(content);
      if (res.success) {
        showToast(res.message, 'success');
        // reload to apply changes everywhere
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast(res.message, 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetAll = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang semua data preferensi, favorit, dan riwayat?')) {
      safeLocalStorage.remove('toolora_favorites');
      safeLocalStorage.remove('toolora_history');
      safeLocalStorage.remove('toolora_theme');
      showToast('Seluruh preferensi berhasil direset ke setelan awal.', 'info');
      setTimeout(() => window.location.reload(), 800);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Breadcrumbs items={[{ label: 'Pengaturan' }]} />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Pengaturan & Manajemen Data
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Atur tampilan dan kelola data penyimpanan lokal peramban Anda.
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme Settings */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Tema Tampilan Antarmuka
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih mode terang, gelap, atau ikuti preferensi sistem operasi Anda.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'light', label: 'Terang', icon: Sun },
              { id: 'dark', label: 'Gelap', icon: Moon },
              { id: 'system', label: 'Sistem', icon: Monitor },
            ].map((t) => {
              const IconComp = t.icon;
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id as 'light' | 'dark' | 'system')}
                  className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-semibold shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span className="text-xs">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Backup and Restore */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Cadangkan & Pulihkan Data (Backup & Restore)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simpan daftar favorit dan preferensi Anda ke dalam file JSON, atau pulihkan dari file cadangan sebelumnya.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Ekspor Cadangan (.json)
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300 shadow-2xs cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Impor Cadangan File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleImportFile}
              className="hidden"
            />
          </div>
        </div>

        {/* Clear Data & Reset */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Pembersihan & Reset Penyimpanan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hapus jejak riwayat atau kembalikan aplikasi ke pengaturan awal pabrik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                clearHistory();
                showToast('Seluruh riwayat alat berhasil dibersihkan!', 'success');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Bersihkan Riwayat Penggunaan
            </button>

            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-red-600 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 border border-red-200 dark:border-red-900 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Semua Preferensi
            </button>
          </div>
        </div>

        {/* App Version Info */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Versi Toolora: <strong>v1.0.0 (Release)</strong></span>
          </div>
          <span>Penyimpanan: LocalStorage (Browser Native)</span>
        </div>
      </div>
    </div>
  );
};
