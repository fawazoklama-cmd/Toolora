import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatRupiah } from '../../lib/formatters';

export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('250000');
  const [primaryDiscount, setPrimaryDiscount] = useState('30');
  const [secondaryDiscount, setSecondaryDiscount] = useState('10');
  const [taxPercent, setTaxPercent] = useState('0');

  const calc = React.useMemo(() => {
    const price = parseFloat(originalPrice) || 0;
    const d1 = parseFloat(primaryDiscount) || 0;
    const d2 = parseFloat(secondaryDiscount) || 0;
    const tax = parseFloat(taxPercent) || 0;

    const afterD1 = price * (1 - d1 / 100);
    const afterD2 = afterD1 * (1 - d2 / 100);
    const taxAmount = afterD2 * (tax / 100);
    const finalPrice = Math.max(0, afterD2 + taxAmount);
    const totalSaved = Math.max(0, price - afterD2);
    const effectiveDiscount = price > 0 ? (totalSaved / price) * 100 : 0;

    return {
      price,
      afterD1,
      afterD2,
      taxAmount,
      finalPrice,
      totalSaved,
      effectiveDiscount,
    };
  }, [originalPrice, primaryDiscount, secondaryDiscount, taxPercent]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Harga Asli Barang (Rp)
          </label>
          <input
            type="number"
            min="0"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 text-base font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums"
            placeholder="250000"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Diskon Utama (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={primaryDiscount}
                onChange={(e) => setPrimaryDiscount(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-8 text-base font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums"
                placeholder="30"
              />
              <span className="absolute right-3 top-3 text-sm text-slate-400 font-mono">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Diskon Ekstra (+%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={secondaryDiscount}
                onChange={(e) => setSecondaryDiscount(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-8 text-base font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums"
                placeholder="10"
              />
              <span className="absolute right-3 top-3 text-sm text-slate-400 font-mono">%</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Pajak / PPN (Opsional %)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="50"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              className="w-full px-3.5 py-2.5 pr-8 text-base font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums"
              placeholder="0"
            />
            <span className="absolute right-3 top-3 text-sm text-slate-400 font-mono">%</span>
          </div>
        </div>

        <button
          onClick={() => {
            setOriginalPrice('0');
            setPrimaryDiscount('0');
            setSecondaryDiscount('0');
            setTaxPercent('0');
          }}
          className="text-xs text-slate-500 hover:text-red-500 transition-colors pt-2 cursor-pointer"
        >
          Reset Perhitungan
        </button>
      </div>

      {/* Result Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Hasil Akhir yang Harus Dibayar
          </span>
          <div className="mt-2 text-3xl sm:text-4xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
            {formatRupiah(calc.finalPrice)}
          </div>

          <div className="mt-6 space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Total Uang yang Dihemat:</span>
              <span className="font-semibold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
                {formatRupiah(calc.totalSaved)} ({calc.effectiveDiscount.toFixed(1)}%)
              </span>
            </div>

            {parseFloat(secondaryDiscount) > 0 && (
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Setelah Diskon 1 ({primaryDiscount}%):</span>
                <span className="font-mono tabular-nums">{formatRupiah(calc.afterD1)}</span>
              </div>
            )}

            {parseFloat(taxPercent) > 0 && (
              <div className="flex justify-between items-center text-xs text-slate-500">
                <span>Pajak ({taxPercent}%):</span>
                <span className="font-mono tabular-nums">+{formatRupiah(calc.taxAmount)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <CopyButton text={formatRupiah(calc.finalPrice)} label="Salin Harga Akhir" variant="primary" />
        </div>
      </div>
    </div>
  );
};
