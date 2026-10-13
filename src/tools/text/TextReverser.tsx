import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const TextReverser: React.FC = () => {
  const [text, setText] = useState('Kasur ini rusak');

  const reverseCharacters = () => {
    setText(text.split('').reverse().join(''));
  };

  const reverseWords = () => {
    const lines = text.split('\n').map((line) => line.split(' ').reverse().join(' '));
    setText(lines.join('\n'));
  };

  const reverseLines = () => {
    setText(text.split('\n').reverse().join('\n'));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Teks yang Akan Dibalik
          </label>
          <div className="flex items-center gap-2">
            <CopyButton text={text} label="Salin Hasil" variant="primary" />
            <button onClick={() => setText('')} className="text-xs text-slate-400 hover:text-red-500">
              Hapus
            </button>
          </div>
        </div>

        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          placeholder="Ketik teks di sini..."
        />

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={reverseCharacters}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800"
          >
            Balik Per Karakter (Mirror)
          </button>
          <button
            onClick={reverseWords}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Balik Urutan Kata
          </button>
          <button
            onClick={reverseLines}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Balik Urutan Baris
          </button>
        </div>
      </div>
    </div>
  );
};
