import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const GlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.2);

  const cssRules = `background: rgba(255, 255, 255, ${opacity});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, ${borderOpacity});
border-radius: 16px;`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colorful backdrop preview container */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 overflow-hidden flex items-center justify-center min-h-[300px]">
          {/* Background decorative circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-sm opacity-70 animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-cyan-400 rounded-full mix-blend-multiply filter blur-sm opacity-70" />

          {/* Glass Card */}
          <div
            className="relative z-10 w-64 p-6 rounded-2xl shadow-xl text-white"
            style={{
              background: `rgba(255, 255, 255, ${opacity})`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
            }}
          >
            <h4 className="font-bold text-base mb-1">Glass Card</h4>
            <p className="text-xs text-white/90 leading-relaxed">
              Efek kaca buram (frosted glass) modern menggunakan backdrop-filter.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Backdrop Blur</span>
              <span className="font-mono">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Opasitas Latar (Background Opacity)</span>
              <span className="font-mono">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span>Opasitas Garis Tepi (Border)</span>
              <span className="font-mono">{Math.round(borderOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <pre className="text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">
          {cssRules}
        </pre>
        <CopyButton text={cssRules} label="Salin Kode CSS" variant="primary" />
      </div>
    </div>
  );
};
