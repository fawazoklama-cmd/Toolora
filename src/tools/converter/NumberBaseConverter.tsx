import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const NumberBaseConverter: React.FC = () => {
  const [dec, setDec] = useState('255');
  const [bin, setBin] = useState('11111111');
  const [hex, setHex] = useState('FF');
  const [oct, setOct] = useState('377');

  const updateFromDec = (val: string) => {
    setDec(val);
    const n = parseInt(val, 10);
    if (!isNaN(n)) {
      setBin(n.toString(2));
      setHex(n.toString(16).toUpperCase());
      setOct(n.toString(8));
    } else {
      setBin('');
      setHex('');
      setOct('');
    }
  };

  const updateFromBin = (val: string) => {
    setBin(val);
    const n = parseInt(val, 2);
    if (!isNaN(n)) {
      setDec(n.toString(10));
      setHex(n.toString(16).toUpperCase());
      setOct(n.toString(8));
    }
  };

  const updateFromHex = (val: string) => {
    setHex(val);
    const n = parseInt(val, 16);
    if (!isNaN(n)) {
      setDec(n.toString(10));
      setBin(n.toString(2));
      setOct(n.toString(8));
    }
  };

  const updateFromOct = (val: string) => {
    setOct(val);
    const n = parseInt(val, 8);
    if (!isNaN(n)) {
      setDec(n.toString(10));
      setBin(n.toString(2));
      setHex(n.toString(16).toUpperCase());
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        {/* Decimal */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Desimal (Basis 10)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={dec}
              onChange={(e) => updateFromDec(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="255"
            />
            <CopyButton text={dec} variant="subtle" />
          </div>
        </div>

        {/* Binary */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Biner (Basis 2)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={bin}
              onChange={(e) => updateFromBin(e.target.value.replace(/[^01]/g, ''))}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="11111111"
            />
            <CopyButton text={bin} variant="subtle" />
          </div>
        </div>

        {/* Hexadecimal */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Heksadesimal (Basis 16)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value.replace(/[^0-9a-fA-F]/g, ''))}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 uppercase"
              placeholder="FF"
            />
            <CopyButton text={hex} variant="subtle" />
          </div>
        </div>

        {/* Octal */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Oktal (Basis 8)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={oct}
              onChange={(e) => updateFromOct(e.target.value.replace(/[^0-7]/g, ''))}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="377"
            />
            <CopyButton text={oct} variant="subtle" />
          </div>
        </div>
      </div>
    </div>
  );
};
