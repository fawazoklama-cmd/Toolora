import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

type ShapeType = 'square' | 'rectangle' | 'circle' | 'triangle' | 'trapezoid';

export const AreaPerimeterCalculator: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>('rectangle');

  // Parameters
  const [dim1, setDim1] = useState('10'); // length or radius or base or side
  const [dim2, setDim2] = useState('6');  // width or height
  const [dim3, setDim3] = useState('8');  // side b or c for triangle/trapezoid

  const result = React.useMemo(() => {
    const a = parseFloat(dim1) || 0;
    const b = parseFloat(dim2) || 0;
    const c = parseFloat(dim3) || 0;

    let area = 0;
    let perimeter = 0;
    let formula = '';

    switch (shape) {
      case 'square':
        area = a * a;
        perimeter = 4 * a;
        formula = `Luas = s × s = ${a} × ${a}; Keliling = 4 × s`;
        break;
      case 'rectangle':
        area = a * b;
        perimeter = 2 * (a + b);
        formula = `Luas = p × l = ${a} × ${b}; Keliling = 2 × (p + l)`;
        break;
      case 'circle':
        area = Math.PI * a * a;
        perimeter = 2 * Math.PI * a;
        formula = `Luas = π × r²; Keliling = 2 × π × r (r = ${a})`;
        break;
      case 'triangle':
        // a: alas, b: tinggi
        area = 0.5 * a * b;
        perimeter = a + b + c; // approx if sides given
        formula = `Luas = ½ × alas × tinggi = 0.5 × ${a} × ${b}`;
        break;
      case 'trapezoid':
        // a: sisi atas, b: sisi bawah, c: tinggi
        area = 0.5 * (a + b) * c;
        perimeter = a + b + 2 * Math.sqrt(Math.pow((b - a) / 2, 2) + c * c);
        formula = `Luas = ½ × (a + b) × t = 0.5 × (${a} + ${b}) × ${c}`;
        break;
    }

    return { area, perimeter, formula };
  }, [shape, dim1, dim2, dim3]);

  return (
    <div className="space-y-6">
      {/* Shape Selector */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Pilih Bangun Datar
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { id: 'square', label: 'Persegi' },
            { id: 'rectangle', label: 'Persegi Panjang' },
            { id: 'circle', label: 'Lingkaran' },
            { id: 'triangle', label: 'Segitiga' },
            { id: 'trapezoid', label: 'Trapesium' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setShape(s.id as ShapeType)}
              className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer text-center ${
                shape === s.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Dimensi Ukuran
          </h4>

          {shape === 'square' && (
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                Panjang Sisi (s)
              </label>
              <input
                type="number"
                min="0"
                value={dim1}
                onChange={(e) => setDim1(e.target.value)}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          )}

          {shape === 'rectangle' && (
            <>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Panjang (p)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dim1}
                  onChange={(e) => setDim1(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Lebar (l)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dim2}
                  onChange={(e) => setDim2(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </>
          )}

          {shape === 'circle' && (
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                Jari-jari (r)
              </label>
              <input
                type="number"
                min="0"
                value={dim1}
                onChange={(e) => setDim1(e.target.value)}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          )}

          {shape === 'triangle' && (
            <>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Alas (a)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dim1}
                  onChange={(e) => setDim1(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Tinggi (t)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dim2}
                  onChange={(e) => setDim2(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Sisi Miring / Sisi C (untuk keliling)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dim3}
                  onChange={(e) => setDim3(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </>
          )}

          {shape === 'trapezoid' && (
            <>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Sisi Sejajar Atas (a)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dim1}
                  onChange={(e) => setDim1(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Sisi Sejajar Bawah (b)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dim2}
                  onChange={(e) => setDim2(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Tinggi (t)
                </label>
                <input
                  type="number"
                  min="0"
                  value={dim3}
                  onChange={(e) => setDim3(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </>
          )}
        </div>

        {/* Output Results */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Luas Bangun Datar
              </span>
              <div className="mt-1 text-3xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums flex items-center justify-between">
                <span>{formatNumber(result.area, 3)} unit²</span>
                <CopyButton text={String(formatNumber(result.area, 3))} variant="subtle" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Keliling Bangun Datar
              </span>
              <div className="mt-1 text-2xl font-bold font-mono text-slate-800 dark:text-slate-200 tabular-nums flex items-center justify-between">
                <span>{formatNumber(result.perimeter, 3)} unit</span>
                <CopyButton text={String(formatNumber(result.perimeter, 3))} variant="subtle" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-mono bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg">
              {result.formula}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
