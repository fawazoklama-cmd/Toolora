import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const RatioCalculator: React.FC = () => {
  // Simplify mode
  const [valA, setValA] = useState('1920');
  const [valB, setValB] = useState('1080');

  // Proportion mode A : B = C : D
  const [propA, setPropA] = useState('16');
  const [propB, setPropB] = useState('9');
  const [propC, setPropC] = useState('1280');

  // GCD Helper
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

  const simplified = React.useMemo(() => {
    const a = parseFloat(valA);
    const b = parseFloat(valB);
    if (!a || !b || isNaN(a) || isNaN(b)) return null;

    // integer conversion
    const factor = Math.pow(10, Math.max((valA.split('.')[1] || '').length, (valB.split('.')[1] || '').length));
    const intA = Math.round(a * factor);
    const intB = Math.round(b * factor);
    const divisor = gcd(intA, intB);

    const resA = intA / divisor;
    const resB = intB / divisor;
    return `${resA} : ${resB}`;
  }, [valA, valB]);

  const solvedD = React.useMemo(() => {
    const a = parseFloat(propA);
    const b = parseFloat(propB);
    const c = parseFloat(propC);
    if (!a || !b || !c || isNaN(a) || isNaN(b) || isNaN(c)) return null;
    const d = (b * c) / a;
    return parseFloat(d.toFixed(4));
  }, [propA, propB, propC]);

  return (
    <div className="space-y-6">
      {/* Simplify Ratio */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          1. Sederhanakan Rasio (A : B)
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={valA}
            onChange={(e) => setValA(e.target.value)}
            className="w-32 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="1920"
          />
          <span className="text-base font-bold text-slate-400">:</span>
          <input
            type="number"
            value={valB}
            onChange={(e) => setValB(e.target.value)}
            className="w-32 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="1080"
          />
          <span className="text-sm font-semibold text-slate-400">=</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 font-mono font-bold text-blue-700 dark:text-blue-300">
            <span>{simplified || '-'}</span>
            {simplified && <CopyButton text={simplified} variant="subtle" />}
          </div>
        </div>
      </div>

      {/* Solve Proportion */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">
          2. Selesaikan Proporsi (A : B = C : D)
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={propA}
            onChange={(e) => setPropA(e.target.value)}
            className="w-24 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="16"
          />
          <span className="text-base font-bold text-slate-400">:</span>
          <input
            type="number"
            value={propB}
            onChange={(e) => setPropB(e.target.value)}
            className="w-24 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="9"
          />
          <span className="text-sm font-semibold text-slate-400">=</span>
          <input
            type="number"
            value={propC}
            onChange={(e) => setPropC(e.target.value)}
            className="w-28 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="1280"
          />
          <span className="text-base font-bold text-slate-400">:</span>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono font-bold text-emerald-700 dark:text-emerald-300">
            <span>D = {solvedD !== null ? solvedD : '-'}</span>
            {solvedD !== null && <CopyButton text={String(solvedD)} variant="subtle" />}
          </div>
        </div>
      </div>
    </div>
  );
};
