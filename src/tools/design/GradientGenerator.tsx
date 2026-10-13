import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const GradientGenerator: React.FC = () => {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState('#2563EB');
  const [color2, setColor2] = useState('#06B6D4');

  const cssValue = React.useMemo(() => {
    if (type === 'linear') {
      return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    }
    return `radial-gradient(circle, ${color1}, ${color2})`;
  }, [type, angle, color1, color2]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preview box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div
            className="w-full h-56 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-all"
            style={{ background: cssValue }}
          />
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="font-mono text-xs text-slate-500 truncate mr-2">background: {cssValue};</span>
            <CopyButton text={`background: ${cssValue};`} label="Salin CSS" variant="primary" />
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Tipe Gradien
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setType('linear')}
                className={`px-4 py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                  type === 'linear'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Linear Gradient
              </button>
              <button
                onClick={() => setType('radial')}
                className={`px-4 py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                  type === 'radial'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Radial Gradient
              </button>
            </div>
          </div>

          {type === 'linear' && (
            <div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Sudut Derajat:</span>
                <span className="font-mono text-blue-600">{angle}&deg;</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Warna Awal
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-full px-2 py-1 font-mono text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Warna Akhir
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-full px-2 py-1 font-mono text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
