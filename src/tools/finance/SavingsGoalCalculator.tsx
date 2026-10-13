import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatRupiah } from '../../lib/formatters';

export const SavingsGoalCalculator: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState('20000000'); // 20 juta
  const [currentSavings, setCurrentSavings] = useState('5000000'); // 5 juta
  const [targetMonths, setTargetMonths] = useState('12'); // 12 bulan

  const calc = React.useMemo(() => {
    const target = parseFloat(targetAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const months = Math.max(1, parseInt(targetMonths) || 1);

    const remaining = Math.max(0, target - current);
    const perMonth = remaining / months;
    const perWeek = remaining / (months * 4.33);
    const perDay = remaining / (months * 30.4);
    const progressPercent = target > 0 ? Math.min(100, (current / target) * 100) : 0;

    return {
      remaining,
      perMonth,
      perWeek,
      perDay,
      progressPercent,
    };
  }, [targetAmount, currentSavings, targetMonths]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Target Tabungan Impian (Rp)
            </label>
            <input
              type="number"
              min="0"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tabungan Saat Ini (Modal Awal Rp)
            </label>
            <input
              type="number"
              min="0"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Target Jangka Waktu (Bulan)
            </label>
            <input
              type="number"
              min="1"
              value={targetMonths}
              onChange={(e) => setTargetMonths(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Yang Perlu Ditabung Per Bulan
              </span>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
                {formatRupiah(calc.perMonth)}
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Progress Tabungan Saat Ini</span>
                <span className="font-mono">{calc.progressPercent.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${calc.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Sisa Dana yang Kurang:</span>
                <span className="font-mono font-semibold">{formatRupiah(calc.remaining)}</span>
              </div>
              <div className="flex justify-between">
                <span>Atau per Minggu:</span>
                <span className="font-mono font-semibold">{formatRupiah(calc.perWeek)}</span>
              </div>
              <div className="flex justify-between">
                <span>Atau per Hari:</span>
                <span className="font-mono font-semibold">{formatRupiah(calc.perDay)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <CopyButton
              text={`Target Tabungan: ${formatRupiah(calc.perMonth)} per bulan untuk ${targetMonths} bulan.`}
              label="Salin Rencana"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
