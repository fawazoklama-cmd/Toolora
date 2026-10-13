import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const DateAddSubtract: React.FC = () => {
  const [baseDate, setBaseDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [action, setAction] = useState<'add' | 'subtract'>('add');
  const [amount, setAmount] = useState('30');
  const [unit, setUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');

  const resultDate = React.useMemo(() => {
    const d = new Date(baseDate);
    const n = parseInt(amount);
    if (isNaN(d.getTime()) || isNaN(n)) return null;

    const multiplier = action === 'add' ? 1 : -1;

    switch (unit) {
      case 'days':
        d.setDate(d.getDate() + n * multiplier);
        break;
      case 'weeks':
        d.setDate(d.getDate() + n * 7 * multiplier);
        break;
      case 'months':
        d.setMonth(d.getMonth() + n * multiplier);
        break;
      case 'years':
        d.setFullYear(d.getFullYear() + n * multiplier);
        break;
    }

    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const formatted = d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return {
      dateString: d.toISOString().slice(0, 10),
      dayName: dayNames[d.getDay()],
      fullText: `${dayNames[d.getDay()]}, ${formatted}`,
    };
  }, [baseDate, action, amount, unit]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tanggal Dasar
            </label>
            <input
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Operasi
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value as 'add' | 'subtract')}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="add">Tambah (+)</option>
              <option value="subtract">Kurang (-)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Jumlah
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Satuan Waktu
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'days' | 'weeks' | 'months' | 'years')}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="days">Hari</option>
              <option value="weeks">Minggu</option>
              <option value="months">Bulan</option>
              <option value="years">Tahun</option>
            </select>
          </div>
        </div>
      </div>

      {resultDate && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tanggal Hasil
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between">
            <span>{resultDate.fullText}</span>
            <CopyButton text={resultDate.fullText} label="Salin Tanggal" variant="primary" />
          </div>
        </div>
      )}
    </div>
  );
};
