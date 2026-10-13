import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw } from 'lucide-react';

export const RandomNumberGenerator: React.FC = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('5');
  const [uniqueOnly, setUniqueOnly] = useState(true);
  const [sortAsc, setSortAsc] = useState(false);

  const generateNumbers = (): number[] => {
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 100;
    const n = Math.min(100, Math.max(1, parseInt(count) || 1));

    if (minVal > maxVal) return [];

    const range = maxVal - minVal + 1;
    if (uniqueOnly && n > range) {
      return [];
    }

    const numbers: number[] = [];
    const used = new Set<number>();

    while (numbers.length < n) {
      const cryptoArr = new Uint32Array(1);
      crypto.getRandomValues(cryptoArr);
      const rand = minVal + (cryptoArr[0] % range);

      if (uniqueOnly) {
        if (!used.has(rand)) {
          used.add(rand);
          numbers.push(rand);
        }
      } else {
        numbers.push(rand);
      }
    }

    if (sortAsc) {
      numbers.sort((a, b) => a - b);
    }

    return numbers;
  };

  const [results, setResults] = useState<number[]>(() => generateNumbers());

  const handleGenerate = () => {
    setResults(generateNumbers());
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Nilai Minimum (Min)
            </label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Nilai Maksimum (Max)
            </label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Banyaknya Angka
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-6 text-xs text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uniqueOnly}
                onChange={(e) => setUniqueOnly(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Angka Unik (Tanpa Duplikat)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={sortAsc}
                onChange={(e) => setSortAsc(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Urutkan Terkecil &rarr; Terbesar</span>
            </label>
          </div>

          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Acak Angka Baru
          </button>
        </div>
      </div>

      {/* Results grid */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Hasil Angka Acak
          </span>
          <CopyButton text={results.join(', ')} label="Salin Semua Angka" variant="primary" />
        </div>

        {results.length === 0 ? (
          <p className="text-xs text-red-500">
            Rentang angka tidak valid atau jumlah angka melebihi batas rentang unik.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {results.map((num, i) => (
              <div
                key={i}
                className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-mono text-xl font-bold text-blue-600 dark:text-blue-400 tabular-nums shadow-xs"
              >
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
