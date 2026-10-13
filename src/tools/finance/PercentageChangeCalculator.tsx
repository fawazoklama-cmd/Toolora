import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

export const PercentageChangeCalculator: React.FC = () => {
  const [initialVal, setInitialVal] = useState('150000');
  const [finalVal, setFinalVal] = useState('195000');

  const result = React.useMemo(() => {
    const v1 = parseFloat(initialVal);
    const v2 = parseFloat(finalVal);

    if (isNaN(v1) || isNaN(v2) || v1 === 0) return null;

    const diff = v2 - v1;
    const percentChange = (diff / Math.abs(v1)) * 100;
    const ratio = v2 / v1;

    return {
      diff,
      percentChange,
      isIncrease: diff >= 0,
      ratio,
    };
  }, [initialVal, finalVal]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Nilai Awal (Sebelum)
            </label>
            <input
              type="number"
              value={initialVal}
              onChange={(e) => setInitialVal(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Nilai Akhir (Sesudah)
            </label>
            <input
              type="number"
              value={finalVal}
              onChange={(e) => setFinalVal(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Hasil Persentase Perubahan
          </span>
          <div
            className={`text-3xl sm:text-4xl font-bold font-mono tabular-nums ${
              result.isIncrease ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {result.isIncrease ? '▲ Kenaikan' : '▼ Penurunan'}{' '}
            {Math.abs(result.percentChange).toFixed(2)}%
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <span>Selisih Nominal:</span>
              <div className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-sm mt-0.5">
                {result.isIncrease ? '+' : ''}{formatNumber(result.diff)}
              </div>
            </div>
            <div>
              <span>Kelipatan Rasio:</span>
              <div className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-sm mt-0.5">
                {result.ratio.toFixed(2)} &times; lipat
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <CopyButton
              text={`${result.isIncrease ? '+' : ''}${result.percentChange.toFixed(2)}%`}
              label="Salin Persentase"
              variant="primary"
            />
          </div>
        </div>
      )}
    </div>
  );
};
