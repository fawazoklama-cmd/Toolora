import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const ColorCodeConverter: React.FC = () => {
  const [hex, setHex] = useState('#2563EB');

  // Convert HEX to RGB
  const hexToRgb = (hexStr: string) => {
    let clean = hexStr.replace('#', '').trim();
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    if (clean.length !== 6) return null;
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Color preview box */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center space-y-4">
          <div
            className="w-32 h-32 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 transition-colors"
            style={{ backgroundColor: hex }}
          />
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={hex.startsWith('#') && hex.length === 7 ? hex : '#2563EB'}
              onChange={(e) => setHex(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
            />
            <span className="text-xs text-slate-500">Klik untuk memilih warna</span>
          </div>
        </div>

        {/* Formats display */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              HEX Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
              <CopyButton text={hex} variant="subtle" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              RGB Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'Format tidak valid'}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              />
              {rgb && <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} variant="subtle" />}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              HSL Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : 'Format tidak valid'}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              />
              {hsl && <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} variant="subtle" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
