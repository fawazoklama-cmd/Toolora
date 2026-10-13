import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

export const AverageCalculator: React.FC = () => {
  const [input, setInput] = useState('75, 80, 85, 90, 85, 95, 70, 88');

  const stats = React.useMemo(() => {
    // parse numbers separated by commas, spaces, or newlines
    const rawTokens = input.split(/[\s,;\n]+/);
    const nums = rawTokens
      .map((t) => parseFloat(t.trim()))
      .filter((n) => !isNaN(n) && isFinite(n));

    if (nums.length === 0) return null;

    const count = nums.length;
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;

    // Sort for median and min/max
    const sorted = [...nums].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const range = max - min;

    // Median
    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Mode (Modus)
    const freqMap: Record<number, number> = {};
    let maxFreq = 0;
    nums.forEach((n) => {
      freqMap[n] = (freqMap[n] || 0) + 1;
      if (freqMap[n] > maxFreq) maxFreq = freqMap[n];
    });

    const modes = Object.keys(freqMap)
      .map(Number)
      .filter((n) => freqMap[n] === maxFreq && maxFreq > 1);

    // Standard deviation
    const variance = nums.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    return {
      count,
      sum,
      mean,
      median,
      modes,
      min,
      max,
      range,
      stdDev,
    };
  }, [input]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          Masukkan Daftar Angka (Pisahkan dengan koma, spasi, atau baris baru)
        </label>
        <textarea
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Contoh: 10, 20, 30, 40, 50"
          className="w-full p-3 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-2 flex justify-between items-center text-xs text-slate-500">
          <span>{stats ? `${stats.count} angka terdeteksi` : '0 angka'}</span>
          <button
            onClick={() => setInput('')}
            className="hover:text-red-500 transition-colors cursor-pointer"
          >
            Kosongkan
          </button>
        </div>
      </div>

      {stats ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatBox label="Rata-rata (Mean)" value={formatNumber(stats.mean, 3)} highlight />
          <StatBox label="Nilai Tengah (Median)" value={formatNumber(stats.median, 2)} />
          <StatBox
            label="Modus (Nilai Terbanyak)"
            value={stats.modes.length > 0 ? stats.modes.join(', ') : 'Tidak ada'}
          />
          <StatBox label="Jumlah Total (&Sigma;)" value={formatNumber(stats.sum)} />
          <StatBox label="Jumlah Data (N)" value={String(stats.count)} />
          <StatBox label="Nilai Terkecil (Min)" value={formatNumber(stats.min)} />
          <StatBox label="Nilai Terbesar (Max)" value={formatNumber(stats.max)} />
          <StatBox label="Rentang (Range)" value={formatNumber(stats.range)} />
          <StatBox label="Standar Deviasi (&sigma;)" value={formatNumber(stats.stdDev, 3)} />
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 text-sm">
          Ketik sekumpulan angka di atas untuk melihat ringkasan statistik.
        </div>
      )}
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: string; highlight?: boolean }> = ({
  label,
  value,
  highlight,
}) => (
  <div
    className={`p-4 rounded-xl border ${
      highlight
        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/80 text-blue-900 dark:text-blue-100'
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
    }`}
  >
    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</div>
    <div className="text-xl font-bold font-mono tabular-nums truncate flex items-center justify-between">
      <span>{value}</span>
      <CopyButton text={value} variant="subtle" />
    </div>
  </div>
);
