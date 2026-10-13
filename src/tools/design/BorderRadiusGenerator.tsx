import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const BorderRadiusGenerator: React.FC = () => {
  const [topLeft, setTopLeft] = useState(24);
  const [topRight, setTopRight] = useState(24);
  const [bottomRight, setBottomRight] = useState(24);
  const [bottomLeft, setBottomLeft] = useState(24);
  const [unit, setUnit] = useState<'px' | '%'>('px');

  const cssValue = `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;

  const setAll = (val: number) => {
    setTopLeft(val);
    setTopRight(val);
    setBottomRight(val);
    setBottomLeft(val);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preview element */}
        <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[300px]">
          <div
            className="w-48 h-48 bg-blue-600 dark:bg-blue-500 shadow-md transition-all flex items-center justify-center text-xs font-semibold text-white"
            style={{ borderRadius: cssValue }}
          >
            Pratinjau Sudut
          </div>
        </div>

        {/* Sliders for 4 corners */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Lengkungan Sudut
            </span>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => setUnit('px')}
                className={`px-2 py-1 rounded ${unit === 'px' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                Pixel (px)
              </button>
              <button
                onClick={() => setUnit('%')}
                className={`px-2 py-1 rounded ${unit === '%' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}
              >
                Persen (%)
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Kiri Atas (Top Left)</span>
              <span className="font-mono">{topLeft}{unit}</span>
            </div>
            <input
              type="range"
              min="0"
              max={unit === 'px' ? 100 : 50}
              value={topLeft}
              onChange={(e) => setTopLeft(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Kanan Atas (Top Right)</span>
              <span className="font-mono">{topRight}{unit}</span>
            </div>
            <input
              type="range"
              min="0"
              max={unit === 'px' ? 100 : 50}
              value={topRight}
              onChange={(e) => setTopRight(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Kanan Bawah (Bottom Right)</span>
              <span className="font-mono">{bottomRight}{unit}</span>
            </div>
            <input
              type="range"
              min="0"
              max={unit === 'px' ? 100 : 50}
              value={bottomRight}
              onChange={(e) => setBottomRight(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Kiri Bawah (Bottom Left)</span>
              <span className="font-mono">{bottomLeft}{unit}</span>
            </div>
            <input
              type="range"
              min="0"
              max={unit === 'px' ? 100 : 50}
              value={bottomLeft}
              onChange={(e) => setBottomLeft(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex gap-2 pt-2">
            {[0, 8, 16, 24, 32].map((n) => (
              <button
                key={n}
                onClick={() => setAll(n)}
                className="px-2.5 py-1 text-xs rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Semua {n}{unit}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <code className="text-xs font-mono text-slate-800 dark:text-slate-200 truncate">
          border-radius: {cssValue};
        </code>
        <CopyButton text={`border-radius: ${cssValue};`} label="Salin CSS" variant="primary" />
      </div>
    </div>
  );
};
