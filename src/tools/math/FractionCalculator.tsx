import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const FractionCalculator: React.FC = () => {
  const [num1, setNum1] = useState('3');
  const [den1, setDen1] = useState('4');
  const [num2, setNum2] = useState('2');
  const [den2, setDen2] = useState('5');
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');

  const gcd = (x: number, y: number): number => {
    let a = Math.abs(x);
    let b = Math.abs(y);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  const result = React.useMemo(() => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      return null;
    }

    let resNum = 0;
    let resDen = 1;

    switch (op) {
      case '+':
        resNum = n1 * d2 + n2 * d1;
        resDen = d1 * d2;
        break;
      case '-':
        resNum = n1 * d2 - n2 * d1;
        resDen = d1 * d2;
        break;
      case '*':
        resNum = n1 * n2;
        resDen = d1 * d2;
        break;
      case '/':
        if (n2 === 0) return null;
        resNum = n1 * d2;
        resDen = d1 * n2;
        break;
    }

    if (resDen < 0) {
      resNum = -resNum;
      resDen = -resDen;
    }

    const divisor = gcd(resNum, resDen);
    const simpNum = resNum / divisor;
    const simpDen = resDen / divisor;

    // Mixed fraction
    const whole = Math.floor(Math.abs(simpNum) / simpDen);
    const remainder = Math.abs(simpNum) % simpDen;
    const isNegative = simpNum < 0;

    let mixed = '';
    if (whole > 0 && remainder > 0) {
      mixed = `${isNegative ? '-' : ''}${whole} ${remainder}/${simpDen}`;
    }

    const decimal = simpDen !== 0 ? (simpNum / simpDen).toFixed(4) : '0';

    return {
      raw: `${simpNum}/${simpDen}`,
      mixed,
      decimal,
    };
  }, [num1, den1, num2, den2, op]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-6">
          Kalkulator Pecahan Biasa
        </h3>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          {/* Fraction 1 */}
          <div className="flex flex-col items-center gap-1 w-20">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="w-full text-center py-1.5 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="3"
            />
            <div className="w-full h-0.5 bg-slate-300 dark:bg-slate-600" />
            <input
              type="number"
              value={den1}
              onChange={(e) => setDen1(e.target.value)}
              className="w-full text-center py-1.5 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="4"
            />
          </div>

          {/* Operation Selector */}
          <div className="flex items-center gap-1">
            {(['+', '-', '*', '/'] as const).map((o) => (
              <button
                key={o}
                onClick={() => setOp(o)}
                className={`w-9 h-9 rounded-lg font-bold transition-colors cursor-pointer ${
                  op === o
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {o === '*' ? '×' : o === '/' ? '÷' : o}
              </button>
            ))}
          </div>

          {/* Fraction 2 */}
          <div className="flex flex-col items-center gap-1 w-20">
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              className="w-full text-center py-1.5 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="2"
            />
            <div className="w-full h-0.5 bg-slate-300 dark:bg-slate-600" />
            <input
              type="number"
              value={den2}
              onChange={(e) => setDen2(e.target.value)}
              className="w-full text-center py-1.5 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="5"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      {result ? (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              Pecahan Sederhana
            </span>
            <div className="text-2xl font-bold font-mono text-blue-900 dark:text-blue-100 mt-1 flex items-center justify-between">
              <span>{result.raw}</span>
              <CopyButton text={result.raw} variant="subtle" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Pecahan Campuran
            </span>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 flex items-center justify-between">
              <span>{result.mixed || '-'}</span>
              {result.mixed && <CopyButton text={result.mixed} variant="subtle" />}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Bentuk Desimal
            </span>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 flex items-center justify-between">
              <span>{result.decimal}</span>
              <CopyButton text={result.decimal} variant="subtle" />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 text-xs">
          Penyebut pecahan tidak boleh bernilai 0.
        </div>
      )}
    </div>
  );
};
