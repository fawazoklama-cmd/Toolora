import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { useToast } from '../../context/ToastContext';

export const FindAndReplace: React.FC = () => {
  const [text, setText] = useState(
    'Toolora adalah platform utilitas online. Toolora memudahkan berbagai pekerjaan sehari-hari.'
  );
  const [findWord, setFindWord] = useState('Toolora');
  const [replaceWord, setReplaceWord] = useState('Toolora App');
  const [matchCase, setMatchCase] = useState(false);
  const { showToast } = useToast();

  const handleReplaceAll = () => {
    if (!findWord) return;
    try {
      const flags = matchCase ? 'g' : 'gi';
      // Escape regex special chars in findWord
      const escaped = findWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, flags);
      const matches = text.match(regex);
      const count = matches ? matches.length : 0;
      const updated = text.replace(regex, replaceWord);
      setText(updated);
      showToast(`${count} kata berhasil diganti!`, 'success');
    } catch {
      showToast('Gagal memproses penggantian kata.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Editor Teks
          </label>
          <div className="flex items-center gap-2">
            <CopyButton text={text} label="Salin Teks" variant="primary" />
            <button onClick={() => setText('')} className="text-xs text-slate-400 hover:text-red-500">
              Kosongkan
            </button>
          </div>
        </div>

        <textarea
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          placeholder="Ketik atau tempel teks dokumen di sini..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Kata yang Dicari
            </label>
            <input
              type="text"
              value={findWord}
              onChange={(e) => setFindWord(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              placeholder="Cari..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Ganti Dengan
            </label>
            <input
              type="text"
              value={replaceWord}
              onChange={(e) => setReplaceWord(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
              placeholder="Ganti menjadi..."
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={matchCase}
              onChange={(e) => setMatchCase(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Cocokkan Huruf Besar/Kecil (Match Case)</span>
          </label>

          <button
            onClick={handleReplaceAll}
            disabled={!findWord}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors cursor-pointer"
          >
            Ganti Semua (Replace All)
          </button>
        </div>
      </div>
    </div>
  );
};
