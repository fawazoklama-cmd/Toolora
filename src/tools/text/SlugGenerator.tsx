import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const SlugGenerator: React.FC = () => {
  const [title, setTitle] = useState('10 Tips & Trik Mengoptimalkan Website Tahun 2026!');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);

  const slug = React.useMemo(() => {
    let s = title.trim();
    if (lowercase) s = s.toLowerCase();

    // Replace accented characters
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace non-alphanumeric with separator
    s = s.replace(/[^a-zA-Z0-9]+/g, separator);

    // Remove leading and trailing separators
    const regex = new RegExp(`^\\${separator}+|\\${separator}+$`, 'g');
    s = s.replace(regex, '');

    return s;
  }, [title, separator, lowercase]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Judul Artikel atau Teks Sumber
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            placeholder="Masukkan judul artikel..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-700 dark:text-slate-300 pt-1">
          <div className="flex items-center gap-2">
            <span>Pemisah:</span>
            <button
              onClick={() => setSeparator('-')}
              className={`px-2.5 py-1 rounded-md border font-mono ${
                separator === '-' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Strip (-)
            </button>
            <button
              onClick={() => setSeparator('_')}
              className={`px-2.5 py-1 rounded-md border font-mono ${
                separator === '_' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Underscore (_)
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Huruf Kecil Semua (Lowercase)</span>
          </label>
        </div>

        {/* Output */}
        <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Hasil Slug URL
            </span>
            <div className="font-mono text-sm font-bold text-blue-950 dark:text-blue-100 truncate mt-0.5">
              {slug || '(Ketik judul untuk melihat slug)'}
            </div>
          </div>
          <CopyButton text={slug} label="Salin Slug" variant="primary" />
        </div>
      </div>
    </div>
  );
};
