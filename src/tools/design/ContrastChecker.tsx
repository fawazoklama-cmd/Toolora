import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { CheckCircle2, XCircle } from 'lucide-react';

export const ContrastChecker: React.FC = () => {
  const [textColor, setTextColor] = useState('#0F172A');
  const [bgColor, setBgColor] = useState('#FFFFFF');

  // Relative luminance
  const getLuminance = (hex: string): number => {
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const a = [r, g, b].map((v) => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  };

  const contrastRatio = React.useMemo(() => {
    try {
      const l1 = getLuminance(textColor);
      const l2 = getLuminance(bgColor);
      const brighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (brighter + 0.05) / (darker + 0.05);
    } catch {
      return 1;
    }
  }, [textColor, bgColor]);

  const passes = {
    aaNormal: contrastRatio >= 4.5,
    aaLarge: contrastRatio >= 3.0,
    aaaNormal: contrastRatio >= 7.0,
    aaaLarge: contrastRatio >= 4.5,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color selectors */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Warna Teks (Foreground)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Warna Latar Belakang (Background)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 uppercase"
              />
            </div>
          </div>

          <button
            onClick={() => {
              const temp = textColor;
              setTextColor(bgColor);
              setBgColor(temp);
            }}
            className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
          >
            &uarr;&darr; Tukar Warna Teks & Latar
          </button>
        </div>

        {/* Live Simulation Card */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between" style={{ backgroundColor: bgColor }}>
          <div style={{ color: textColor }}>
            <h3 className="text-xl font-bold mb-2">Pratinjau Judul Besar (Large Text)</h3>
            <p className="text-sm leading-relaxed">
              Ini adalah contoh simulasi keterbacaan teks normal pada warna latar belakang yang Anda pilih. Kepatuhan kontras memastikan kenyamanan seluruh pengguna.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/10 flex justify-between items-center text-xs" style={{ color: textColor }}>
            <span className="font-mono">Rasio: {contrastRatio.toFixed(2)} : 1</span>
            <CopyButton text={`${contrastRatio.toFixed(2)}:1`} label="Salin Rasio" variant="subtle" />
          </div>
        </div>
      </div>

      {/* WCAG Compliance Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4">
          Tingkat Kepatuhan Standar Aksesibilitas WCAG 2.1
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <WcagCard title="WCAG AA Normal" req="≥ 4.5:1" pass={passes.aaNormal} />
          <WcagCard title="WCAG AA Besar / Tebal" req="≥ 3.0:1" pass={passes.aaLarge} />
          <WcagCard title="WCAG AAA Normal" req="≥ 7.0:1" pass={passes.aaaNormal} />
          <WcagCard title="WCAG AAA Besar" req="≥ 4.5:1" pass={passes.aaaLarge} />
        </div>
      </div>
    </div>
  );
};

const WcagCard: React.FC<{ title: string; req: string; pass: boolean }> = ({ title, req, pass }) => (
  <div
    className={`p-4 rounded-xl border flex items-center justify-between ${
      pass
        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-100'
        : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/60 text-red-900 dark:text-red-100'
    }`}
  >
    <div>
      <div className="text-xs font-semibold">{title}</div>
      <div className="text-[11px] opacity-75">Syarat: {req}</div>
    </div>
    {pass ? (
      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
    )}
  </div>
);
