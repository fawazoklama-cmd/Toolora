import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

export const LineCounter: React.FC = () => {
  const [text, setText] = useState('Line 1: Toolora utilities\n\nLine 3: Fast and browser based\nLine 4: Privacy first\n\nLine 6: Finish');

  const stats = React.useMemo(() => {
    const rawLines = text.split('\n');
    const totalLines = text.length === 0 ? 0 : rawLines.length;
    const nonEmptyLines = rawLines.filter((l) => l.trim().length > 0).length;
    const emptyLines = totalLines - nonEmptyLines;

    let maxLineLength = 0;
    let totalChars = 0;
    rawLines.forEach((l) => {
      if (l.length > maxLineLength) maxLineLength = l.length;
      totalChars += l.length;
    });

    const avgLineLength = totalLines > 0 ? (totalChars / totalLines).toFixed(1) : '0';

    return {
      totalLines,
      nonEmptyLines,
      emptyLines,
      maxLineLength,
      avgLineLength,
    };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl border bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-center">
          <div className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">Total Baris</div>
          <div className="text-2xl font-bold font-mono text-blue-900 dark:text-blue-100 mt-1">
            {formatNumber(stats.totalLines)}
          </div>
        </div>
        <div className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] text-slate-500 font-medium">Baris Berisi</div>
          <div className="text-2xl font-bold font-mono mt-1">{formatNumber(stats.nonEmptyLines)}</div>
        </div>
        <div className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] text-slate-500 font-medium">Baris Kosong</div>
          <div className="text-2xl font-bold font-mono mt-1">{formatNumber(stats.emptyLines)}</div>
        </div>
        <div className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] text-slate-500 font-medium">Baris Terpanjang</div>
          <div className="text-2xl font-bold font-mono mt-1">{stats.maxLineLength} chr</div>
        </div>
        <div className="p-3.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center">
          <div className="text-[11px] text-slate-500 font-medium">Rata-rata Baris</div>
          <div className="text-2xl font-bold font-mono mt-1">{stats.avgLineLength} chr</div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Editor Dokumen
          </label>
          <div className="flex items-center gap-2">
            <CopyButton text={text} label="Salin Teks" variant="subtle" />
            <button onClick={() => setText('')} className="text-xs text-slate-400 hover:text-red-500">
              Kosongkan
            </button>
          </div>
        </div>
        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 font-mono text-xs leading-relaxed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          placeholder="Tempel teks atau baris kode..."
        />
      </div>
    </div>
  );
};
