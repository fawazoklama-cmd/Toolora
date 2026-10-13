import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatRupiah } from '../../lib/formatters';

export const BudgetCalculator: React.FC = () => {
  const [income, setIncome] = useState('7500000'); // 7.5 juta gaji

  const budget = React.useMemo(() => {
    const inc = parseFloat(income) || 0;
    const needs = inc * 0.5; // 50%
    const wants = inc * 0.3; // 30%
    const savings = inc * 0.2; // 20%
    return { needs, wants, savings };
  }, [income]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Total Penghasilan / Gaji Bulanan Bersih (Rp)
          </label>
          <input
            type="number"
            min="0"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full sm:w-80 px-3.5 py-2.5 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>
      </div>

      {/* 50/30/20 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Needs 50% */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
              50% KEBUTUHAN POKOK
            </span>
            <span className="text-[11px] text-slate-400">Needs</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {formatRupiah(budget.needs)}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
            Biaya sewa/kost, cicilan, belanja dapur harian, listrik, air, internet, dan transportasi kerja.
          </p>
        </div>

        {/* Wants 30% */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              30% KEINGINAN & HIBURAN
            </span>
            <span className="text-[11px] text-slate-400">Wants</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {formatRupiah(budget.wants)}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
            Nongkrong di kafe, langganan streaming (Netflix/Spotify), belanja hobi, dan liburan akhir pekan.
          </p>
        </div>

        {/* Savings 20% */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              20% TABUNGAN & INVESTASI
            </span>
            <span className="text-[11px] text-slate-400">Savings</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 tabular-nums">
            {formatRupiah(budget.savings)}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
            Dana darurat, tabungan masa depan, reksadana, emas, atau pelunasan hutang ekstra.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
        <span className="text-slate-500">
          Metode 50/30/20 dipopulerkan oleh Senator Elizabeth Warren untuk pengelolaan keuangan seimbang.
        </span>
        <CopyButton
          text={`Alokasi Gaji ${formatRupiah(parseFloat(income) || 0)}:\nKebutuhan (50%): ${formatRupiah(budget.needs)}\nKeinginan (30%): ${formatRupiah(budget.wants)}\nTabungan (20%): ${formatRupiah(budget.savings)}`}
          label="Salin Anggaran"
          variant="primary"
        />
      </div>
    </div>
  );
};
