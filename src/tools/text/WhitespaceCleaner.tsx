import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const WhitespaceCleaner: React.FC = () => {
  const [text, setText] = useState(
    '  Contoh   paragraf   dengan   spasi   berantakan.\n\n\n\nDan    banyak    baris kosong   berulang.  '
  );

  const cleanExtraSpaces = () => {
    // Replace multiple spaces with a single space
    const cleaned = text
      .split('\n')
      .map((line) => line.replace(/[^\S\r\n]+/g, ' ').trim())
      .join('\n');
    setText(cleaned);
  };

  const removeEmptyLines = () => {
    // Filter out empty or whitespace-only lines
    const cleaned = text
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .join('\n');
    setText(cleaned);
  };

  const trimAllLines = () => {
    const cleaned = text
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
    setText(cleaned);
  };

  const oneLineOnly = () => {
    const cleaned = text.replace(/\s+/g, ' ').trim();
    setText(cleaned);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Editor Teks
          </label>
          <div className="flex items-center gap-2">
            <CopyButton text={text} label="Salin Teks Bersih" variant="primary" />
            <button
              onClick={() => setText('')}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Hapus
            </button>
          </div>
        </div>

        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tempel teks dengan spasi berlebih atau baris kosong di sini..."
        />

        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            onClick={cleanExtraSpaces}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
          >
            Hapus Spasi Ganda
          </button>
          <button
            onClick={removeEmptyLines}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
          >
            Hapus Semua Baris Kosong
          </button>
          <button
            onClick={trimAllLines}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Trim Spasi Awal & Akhir Baris
          </button>
          <button
            onClick={oneLineOnly}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Jadikan Satu Baris Tunggal
          </button>
        </div>
      </div>
    </div>
  );
};
