import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw } from 'lucide-react';

export const PinGenerator: React.FC = () => {
  const [digits, setDigits] = useState(6);
  const [count, setCount] = useState(5);
  const [avoidRepeats, setAvoidRepeats] = useState(true);

  const generatePins = (): string[] => {
    const list: string[] = [];
    const needed = Math.min(20, Math.max(1, count));

    while (list.length < needed) {
      const cryptoVals = new Uint8Array(digits);
      crypto.getRandomValues(cryptoVals);
      const pin = Array.from(cryptoVals, (v) => v % 10).join('');

      // Check if repeating (e.g. 1111) or sequential (e.g. 1234)
      if (avoidRepeats) {
        const isRepeated = /^(\d)\1+$/.test(pin);
        const isSequential = '0123456789012345'.includes(pin) || '9876543210987654'.includes(pin);
        if (isRepeated || isSequential) continue;
      }

      list.push(pin);
    }

    return list;
  };

  const [pins, setPins] = useState<string[]>(() => generatePins());

  const handleRegenerate = () => {
    setPins(generatePins());
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Panjang PIN:
            </span>
            {[4, 6, 8].map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDigits(d);
                  setTimeout(handleRegenerate, 50);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                  digits === d
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {d} Digit
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={avoidRepeats}
              onChange={(e) => {
                setAvoidRepeats(e.target.checked);
                setTimeout(handleRegenerate, 50);
              }}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Hindari angka kembar (1111) & berurutan (1234)</span>
          </label>

          <button
            onClick={handleRegenerate}
            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Acak Baru
          </button>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pins.map((pin, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between"
          >
            <span className="font-mono text-xl font-bold tracking-widest text-slate-900 dark:text-slate-100">
              {pin}
            </span>
            <CopyButton text={pin} label="Salin" variant="subtle" />
          </div>
        ))}
      </div>
    </div>
  );
};
