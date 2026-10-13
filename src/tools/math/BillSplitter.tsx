import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatRupiah } from '../../lib/formatters';

export const BillSplitter: React.FC = () => {
  const [billAmount, setBillAmount] = useState('450000');
  const [peopleCount, setPeopleCount] = useState('4');
  const [tipPercent, setTipPercent] = useState('10');
  const [taxPercent, setTaxPercent] = useState('11'); // standard 11% PPN

  const result = React.useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const people = Math.max(1, parseInt(peopleCount) || 1);
    const tipPct = parseFloat(tipPercent) || 0;
    const taxPct = parseFloat(taxPercent) || 0;

    const taxAmount = bill * (taxPct / 100);
    const tipAmount = bill * (tipPct / 100);
    const grandTotal = bill + taxAmount + tipAmount;
    const perPersonTotal = grandTotal / people;
    const perPersonTip = tipAmount / people;

    return {
      bill,
      people,
      taxAmount,
      tipAmount,
      grandTotal,
      perPersonTotal,
      perPersonTip,
    };
  }, [billAmount, peopleCount, tipPercent, taxPercent]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Input panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Total Tagihan (Rp)
          </label>
          <input
            type="number"
            min="0"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            className="w-full px-3.5 py-2.5 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 tabular-nums"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Jumlah Orang (Patungan)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={peopleCount}
              onChange={(e) => setPeopleCount(e.target.value)}
              className="w-28 px-3.5 py-2.5 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 tabular-nums"
            />
            <div className="flex items-center gap-1.5">
              {[2, 3, 4, 5, 8].map((n) => (
                <button
                  key={n}
                  onClick={() => setPeopleCount(String(n))}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors cursor-pointer ${
                    peopleCount === String(n)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tip Pelayan (%)
            </label>
            <input
              type="number"
              min="0"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              className="w-full px-3.5 py-2 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Pajak / PB1 (%)
            </label>
            <input
              type="number"
              min="0"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
              className="w-full px-3.5 py-2 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Bayar Per Orang
          </span>
          <div className="mt-2 text-3xl sm:text-4xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
            {formatRupiah(result.perPersonTotal)}
          </div>

          <div className="mt-6 space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm">
            <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
              <span>Total Keseluruhan:</span>
              <span className="font-semibold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                {formatRupiah(result.grandTotal)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Pajak Restoran ({taxPercent}%):</span>
              <span className="font-mono tabular-nums">+{formatRupiah(result.taxAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Total Tip ({tipPercent}%):</span>
              <span className="font-mono tabular-nums">+{formatRupiah(result.tipAmount)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <CopyButton
            text={formatRupiah(result.perPersonTotal)}
            label="Salin Nominal Per Orang"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};
