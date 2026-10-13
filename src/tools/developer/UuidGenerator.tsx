import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw } from 'lucide-react';

export const UuidGenerator: React.FC = () => {
  const [count, setCount] = useState('5');
  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);

  const generateUuids = (): string[] => {
    const n = Math.min(50, Math.max(1, parseInt(count) || 1));
    const list: string[] = [];
    for (let i = 0; i < n; i++) {
      let id: string = crypto.randomUUID();
      if (uppercase) id = id.toUpperCase();
      if (removeHyphens) id = id.replace(/-/g, '');
      list.push(id);
    }
    return list;
  };

  const [uuids, setUuids] = useState<string[]>(() => generateUuids());

  const handleRegenerate = () => {
    setUuids(generateUuids());
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jumlah UUID:
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-20 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Huruf Kapital (Uppercase)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={removeHyphens}
              onChange={(e) => setRemoveHyphens(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Hapus Tanda Strip (-)</span>
          </label>

          <button
            onClick={handleRegenerate}
            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Hasilkan Ulang
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Daftar UUID v4 (Standar RFC 4122)
          </span>
          <CopyButton text={uuids.join('\n')} label="Salin Semua UUID" variant="primary" />
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200">
          {uuids.map((id, index) => (
            <div key={index} className="py-2.5 flex items-center justify-between group">
              <span className="truncate">{id}</span>
              <CopyButton text={id} label="Salin" variant="subtle" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
