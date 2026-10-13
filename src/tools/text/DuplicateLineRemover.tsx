import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const DuplicateLineRemover: React.FC = () => {
  const [text, setText] = useState('apel\njeruk\nmangga\napel\npisang\njeruk\nmangga');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);

  const stats = React.useMemo(() => {
    const rawLines = text.split('\n');
    const seen = new Set<string>();
    const uniqueLines: string[] = [];
    let duplicatesCount = 0;

    rawLines.forEach((line) => {
      let key = trimLines ? line.trim() : line;
      if (!caseSensitive) key = key.toLowerCase();

      if (key === '') {
        uniqueLines.push(line);
      } else if (seen.has(key)) {
        duplicatesCount++;
      } else {
        seen.add(key);
        uniqueLines.push(trimLines ? line.trim() : line);
      }
    });

    return {
      originalCount: rawLines.length,
      resultCount: uniqueLines.length,
      duplicatesCount,
      cleanedText: uniqueLines.join('\n'),
    };
  }, [text, caseSensitive, trimLines]);

  return (
    <div className="space-y-6">
      {/* Options */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-700 dark:text-slate-300">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Sensitif Huruf Besar/Kecil (Case-Sensitive)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Abaikan spasi di awal & akhir baris</span>
        </label>
        <div className="ml-auto text-slate-500 font-mono">
          {stats.duplicatesCount} baris duplikat dihapus
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Input Teks ({stats.originalCount} baris)</span>
            <button onClick={() => setText('')} className="hover:text-red-500">
              Kosongkan
            </button>
          </div>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="Daftar teks per baris..."
          />
        </div>

        {/* Output */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Hasil Bersih ({stats.resultCount} baris unik)</span>
            <CopyButton text={stats.cleanedText} label="Salin Hasil" variant="primary" />
          </div>
          <textarea
            rows={10}
            readOnly
            value={stats.cleanedText}
            className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>
    </div>
  );
};
