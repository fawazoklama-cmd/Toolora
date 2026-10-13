import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatRupiah } from '../../lib/formatters';

export const UnitPriceCalculator: React.FC = () => {
  // Product A
  const [nameA, setNameA] = useState('Kemasan Kecil');
  const [priceA, setPriceA] = useState('18000');
  const [sizeA, setSizeA] = useState('250');
  const [unitA, setUnitA] = useState('gram');

  // Product B
  const [nameB, setNameB] = useState('Kemasan Jumbo');
  const [priceB, setPriceB] = useState('45000');
  const [sizeB, setSizeB] = useState('750');

  const comparison = React.useMemo(() => {
    const pA = parseFloat(priceA) || 0;
    const sA = parseFloat(sizeA) || 0;
    const pB = parseFloat(priceB) || 0;
    const sB = parseFloat(sizeB) || 0;

    if (sA <= 0 || sB <= 0 || pA <= 0 || pB <= 0) return null;

    const unitPriceA = pA / sA;
    const unitPriceB = pB / sB;

    let winner = 'equal';
    let savingsPct = 0;

    if (unitPriceA < unitPriceB) {
      winner = 'A';
      savingsPct = ((unitPriceB - unitPriceA) / unitPriceB) * 100;
    } else if (unitPriceB < unitPriceA) {
      winner = 'B';
      savingsPct = ((unitPriceA - unitPriceB) / unitPriceA) * 100;
    }

    return {
      unitPriceA,
      unitPriceB,
      winner,
      savingsPct,
    };
  }, [priceA, sizeA, priceB, sizeB]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product A */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Produk A
            </h4>
            <span className="text-xs text-slate-400 font-mono">Pilihan 1</span>
          </div>

          <input
            type="text"
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="Nama Produk A"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Harga (Rp)</label>
              <input
                type="number"
                min="0"
                value={priceA}
                onChange={(e) => setPriceA(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Ukuran / Isi</label>
              <input
                type="number"
                min="0"
                value={sizeA}
                onChange={(e) => setSizeA(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          {comparison && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs flex justify-between items-center">
              <span>Harga per {unitA}:</span>
              <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                {formatRupiah(comparison.unitPriceA)} / {unitA}
              </span>
            </div>
          )}
        </div>

        {/* Product B */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Produk B
            </h4>
            <span className="text-xs text-slate-400 font-mono">Pilihan 2</span>
          </div>

          <input
            type="text"
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="Nama Produk B"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Harga (Rp)</label>
              <input
                type="number"
                min="0"
                value={priceB}
                onChange={(e) => setPriceB(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Ukuran / Isi</label>
              <input
                type="number"
                min="0"
                value={sizeB}
                onChange={(e) => setSizeB(e.target.value)}
                className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>

          {comparison && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs flex justify-between items-center">
              <span>Harga per {unitA}:</span>
              <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                {formatRupiah(comparison.unitPriceB)} / {unitA}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Verdict */}
      {comparison && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Kesimpulan Perbandingan
              </span>
              <div className="text-xl font-bold mt-1 text-slate-900 dark:text-slate-100">
                {comparison.winner === 'equal' ? (
                  'Kedua produk memiliki harga per unit yang sama persis.'
                ) : (
                  <>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {comparison.winner === 'A' ? nameA || 'Produk A' : nameB || 'Produk B'}
                    </span>{' '}
                    lebih hemat sebesar{' '}
                    <span className="text-emerald-600 font-mono">
                      {comparison.savingsPct.toFixed(1)}%
                    </span>
                  </>
                )}
              </div>
            </div>
            <CopyButton
              text={`${
                comparison.winner === 'A' ? nameA : nameB
              } lebih hemat ${comparison.savingsPct.toFixed(1)}%`}
              label="Salin Kesimpulan"
            />
          </div>
        </div>
      )}
    </div>
  );
};
