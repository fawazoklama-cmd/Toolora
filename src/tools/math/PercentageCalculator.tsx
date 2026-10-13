import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

export const PercentageCalculator: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [val1A, setVal1A] = useState('15');
  const [val1B, setVal1B] = useState('200000');

  // Mode 2: X is what % of Y?
  const [val2A, setVal2A] = useState('50');
  const [val2B, setVal2B] = useState('250');

  // Mode 3: Increase / Decrease from X to Y
  const [val3A, setVal3A] = useState('100000');
  const [val3B, setVal3B] = useState('125000');

  // Calculations
  const res1 = React.useMemo(() => {
    const a = parseFloat(val1A);
    const b = parseFloat(val1B);
    if (isNaN(a) || isNaN(b)) return null;
    return (a / 100) * b;
  }, [val1A, val1B]);

  const res2 = React.useMemo(() => {
    const a = parseFloat(val2A);
    const b = parseFloat(val2B);
    if (isNaN(a) || isNaN(b) || b === 0) return null;
    return (a / b) * 100;
  }, [val2A, val2B]);

  const res3 = React.useMemo(() => {
    const a = parseFloat(val3A);
    const b = parseFloat(val3B);
    if (isNaN(a) || isNaN(b) || a === 0) return null;
    const diff = b - a;
    const pct = (diff / a) * 100;
    return { diff, pct, isIncrease: diff >= 0 };
  }, [val3A, val3B]);

  return (
    <div className="space-y-6">
      {/* Box 1 */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          1. Hitung Nilai Persentase: Berapa <span className="text-blue-600 font-mono">X%</span> dari <span className="text-blue-600 font-mono">Y</span>?
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-slate-600 dark:text-slate-400">Berapa</span>
          <div className="relative w-28">
            <input
              type="number"
              value={val1A}
              onChange={(e) => setVal1A(e.target.value)}
              className="w-full px-3 py-2 pr-7 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="15"
            />
            <span className="absolute right-2.5 top-2 text-sm text-slate-400 font-mono">%</span>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400">dari</span>
          <input
            type="number"
            value={val1B}
            onChange={(e) => setVal1B(e.target.value)}
            className="w-40 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="200000"
          />
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">=</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 font-mono font-bold text-base text-blue-700 dark:text-blue-300 tabular-nums">
            {res1 !== null ? formatNumber(res1) : '-'}
            {res1 !== null && <CopyButton text={String(res1)} variant="subtle" />}
          </div>
        </div>
      </div>

      {/* Box 2 */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          2. Hitung Rasio Persen: Angka <span className="text-blue-600 font-mono">X</span> adalah berapa persen dari <span className="text-blue-600 font-mono">Y</span>?
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={val2A}
            onChange={(e) => setVal2A(e.target.value)}
            className="w-32 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="50"
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">adalah berapa % dari</span>
          <input
            type="number"
            value={val2B}
            onChange={(e) => setVal2B(e.target.value)}
            className="w-32 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="250"
          />
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">=</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 font-mono font-bold text-base text-blue-700 dark:text-blue-300 tabular-nums">
            {res2 !== null ? `${formatNumber(res2, 2)}%` : '-'}
            {res2 !== null && <CopyButton text={`${formatNumber(res2, 2)}%`} variant="subtle" />}
          </div>
        </div>
      </div>

      {/* Box 3 */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          3. Kenaikan / Penurunan Persentase: Dari <span className="text-blue-600 font-mono">Nilai Awal</span> ke <span className="text-blue-600 font-mono">Nilai Akhir</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Nilai Awal
            </label>
            <input
              type="number"
              value={val3A}
              onChange={(e) => setVal3A(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Nilai Akhir
            </label>
            <input
              type="number"
              value={val3B}
              onChange={(e) => setVal3B(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {res3 && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Hasil Perubahan:</span>
              <div className="text-lg font-bold font-mono tabular-nums flex items-center gap-2">
                <span className={res3.isIncrease ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
                  {res3.isIncrease ? '▲ Kenaikan' : '▼ Penurunan'} {Math.abs(res3.pct).toFixed(2)}%
                </span>
                <span className="text-xs text-slate-500 font-normal">
                  ({res3.isIncrease ? '+' : ''}{formatNumber(res3.diff)})
                </span>
              </div>
            </div>
            <CopyButton text={`${res3.isIncrease ? '+' : ''}${res3.pct.toFixed(2)}%`} />
          </div>
        )}
      </div>
    </div>
  );
};
