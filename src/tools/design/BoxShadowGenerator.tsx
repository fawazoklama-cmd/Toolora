import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const BoxShadowGenerator: React.FC = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(10);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(-5);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.15);
  const [inset, setInset] = useState(false);

  // Hex to RGBA
  const hexToRgba = (hex: string, alpha: number) => {
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const shadowCss = React.useMemo(() => {
    const rgba = hexToRgba(color, opacity);
    return `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgba}`;
  }, [offsetX, offsetY, blur, spread, color, opacity, inset]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preview box */}
        <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
          <div
            className="w-48 h-48 rounded-2xl bg-white dark:bg-slate-800 transition-all flex items-center justify-center text-xs font-semibold text-slate-400"
            style={{ boxShadow: shadowCss }}
          >
            Pratinjau Elemen
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Offset Horisontal (X)</span>
              <span className="font-mono">{offsetX}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={offsetX}
              onChange={(e) => setOffsetX(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Offset Vertikal (Y)</span>
              <span className="font-mono">{offsetY}px</span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={offsetY}
              onChange={(e) => setOffsetY(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Blur Radius</span>
              <span className="font-mono">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Spread Radius</span>
              <span className="font-mono">{spread}px</span>
            </div>
            <input
              type="range"
              min="-30"
              max="50"
              value={spread}
              onChange={(e) => setSpread(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Opasitas Bayangan</span>
              <span className="font-mono">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Warna Bayangan:</span>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-7 h-7 rounded border-0 cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={inset}
                onChange={(e) => setInset(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              <span>Bayangan Bagian Dalam (Inset)</span>
            </label>
          </div>
        </div>
      </div>

      {/* CSS Output box */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <code className="text-xs font-mono text-slate-800 dark:text-slate-200 truncate">
          box-shadow: {shadowCss};
        </code>
        <CopyButton text={`box-shadow: ${shadowCss};`} label="Salin CSS" variant="primary" />
      </div>
    </div>
  );
};
