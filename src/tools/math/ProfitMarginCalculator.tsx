import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatRupiah } from '../../lib/formatters';

export const ProfitMarginCalculator: React.FC = () => {
  const [costPrice, setCostPrice] = useState('75000'); // Biaya Modal / HPP
  const [sellingPrice, setSellingPrice] = useState('120000'); // Harga Jual

  const result = React.useMemo(() => {
    const cost = parseFloat(costPrice) || 0;
    const sell = parseFloat(sellingPrice) || 0;

    const profit = sell - cost;
    const margin = sell > 0 ? (profit / sell) * 100 : 0;
    const markup = cost > 0 ? (profit / cost) * 100 : 0;

    return {
      cost,
      sell,
      profit,
      margin,
      markup,
    };
  }, [costPrice, sellingPrice]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Biaya Modal / HPP (Cost of Goods)
          </label>
          <input
            type="number"
            min="0"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            placeholder="75000"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Harga Jual (Revenue)
          </label>
          <input
            type="number"
            min="0"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            placeholder="120000"
          />
        </div>

        <div className="pt-2 text-xs text-slate-500 leading-relaxed">
          <p>• <strong>Margin:</strong> Persentase keuntungan dari total harga jual.</p>
          <p>• <strong>Markup:</strong> Persentase kenaikan harga di atas modal awal.</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
        <div className="space-y-5">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Laba Bersih Per Produk
            </span>
            <div
              className={`mt-1 text-3xl font-bold font-mono tabular-nums ${
                result.profit >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {formatRupiah(result.profit)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Profit Margin
              </span>
              <div className="mt-1 text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
                {result.margin.toFixed(2)}%
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Markup
              </span>
              <div className="mt-1 text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">
                {result.markup.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <CopyButton
            text={`Laba: ${formatRupiah(result.profit)}, Margin: ${result.margin.toFixed(2)}%, Markup: ${result.markup.toFixed(2)}%`}
            label="Salin Analisis"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};
