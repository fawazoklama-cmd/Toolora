import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Pipette } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ColorPickerTool: React.FC = () => {
  const [color, setColor] = useState('#2563EB');
  const { showToast } = useToast();

  const handleEyedropper = async () => {
    // Check EyeDropper API support
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ('EyeDropper' in window) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          setColor(result.sRGBHex);
          showToast(`Warna terpilih: ${result.sRGBHex}`, 'success');
        }
      } catch {
        // user cancelled
      }
    } else {
      showToast('Browser Anda belum mendukung fitur Eyedropper API.', 'info');
    }
  };

  // Preset palettes
  const presets = [
    '#2563EB', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#0F172A', '#64748B', '#F8FAFC', '#14B8A6'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center space-y-4">
          <div
            className="w-36 h-36 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700 transition-colors"
            style={{ backgroundColor: color }}
          />

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
            />
            {/* EyeDropper button */}
            {'EyeDropper' in window && (
              <button
                type="button"
                onClick={handleEyedropper}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                <Pipette className="w-3.5 h-3.5" />
                Pick Screen
              </button>
            )}
          </div>
        </div>

        <div className="md:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Nilai HEX
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 uppercase"
              />
              <CopyButton text={color} variant="primary" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Palet Populer
            </label>
            <div className="flex flex-wrap gap-2.5">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setColor(p)}
                  className="w-8 h-8 rounded-lg border border-black/10 dark:border-white/10 shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: p }}
                  title={p}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
