import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const AlphabeticalSorter: React.FC = () => {
  const [text, setText] = useState('Jeruk\nApel\nMangga\nDurian\nAnggur\nSemangka');

  const sortLines = (type: 'az' | 'za' | 'lenAsc' | 'lenDesc' | 'shuffle') => {
    const lines = text.split('\n');

    switch (type) {
      case 'az':
        lines.sort((a, b) => a.localeCompare(b, 'id', { sensitivity: 'base' }));
        break;
      case 'za':
        lines.sort((a, b) => b.localeCompare(a, 'id', { sensitivity: 'base' }));
        break;
      case 'lenAsc':
        lines.sort((a, b) => a.length - b.length);
        break;
      case 'lenDesc':
        lines.sort((a, b) => b.length - a.length);
        break;
      case 'shuffle':
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        break;
    }

    setText(lines.join('\n'));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Daftar Teks (Satu Item Per Baris)
          </label>
          <div className="flex items-center gap-2">
            <CopyButton text={text} label="Salin Hasil" variant="primary" />
            <button
              onClick={() => setText('')}
              className="text-xs text-slate-400 hover:text-red-500 cursor-pointer"
            >
              Hapus
            </button>
          </div>
        </div>

        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik daftar baris yang ingin diurutkan..."
          className="w-full p-4 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        />

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => sortLines('az')}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 cursor-pointer"
          >
            Urutkan A &rarr; Z
          </button>
          <button
            onClick={() => sortLines('za')}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 cursor-pointer"
          >
            Urutkan Z &rarr; A
          </button>
          <button
            onClick={() => sortLines('lenAsc')}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            Terpendek &rarr; Terpanjang
          </button>
          <button
            onClick={() => sortLines('lenDesc')}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            Terpanjang &rarr; Terpendek
          </button>
          <button
            onClick={() => sortLines('shuffle')}
            className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            Acak Baris (Shuffle)
          </button>
        </div>
      </div>
    </div>
  );
};
