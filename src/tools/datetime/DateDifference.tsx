import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

export const DateDifference: React.FC = () => {
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 45);
    return d.toISOString().slice(0, 10);
  });

  const diff = React.useMemo(() => {
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    const months = (totalDays / 30.44).toFixed(1);

    return {
      totalDays,
      weeks,
      remDays,
      months,
      isReversed: d1 > d2,
    };
  }, [startDate, endDate]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tanggal Akhir
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </div>
      </div>

      {diff && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Selisih Durasi
          </span>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
            {formatNumber(diff.totalDays)} Hari
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <span>Format Minggu & Hari:</span>
              <div className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-sm mt-0.5">
                {diff.weeks} Minggu {diff.remDays > 0 ? `+ ${diff.remDays} Hari` : ''}
              </div>
            </div>
            <div>
              <span>Estimasi Bulan:</span>
              <div className="font-semibold text-slate-900 dark:text-slate-100 font-mono text-sm mt-0.5">
                &plusmn; {diff.months} Bulan
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <CopyButton text={`${diff.totalDays} hari`} label="Salin Jumlah Hari" variant="primary" />
          </div>
        </div>
      )}
    </div>
  );
};
