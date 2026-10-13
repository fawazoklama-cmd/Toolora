import React, { useState } from 'react';
import { Shuffle, Trophy, RotateCcw } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';

export const RandomPicker: React.FC = () => {
  const [itemsText, setItemsText] = useState('Budi\nSiti\nAndi\nDewi\nRian\nPutri\nFajar\nNabila');
  const [winner, setWinner] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const [removeAfterPick, setRemoveAfterPick] = useState(false);

  const items = itemsText
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const handlePick = () => {
    if (items.length === 0) return;
    setIsPicking(true);
    setWinner(null);

    // Random shuffle animation
    let counter = 0;
    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * items.length);
      setWinner(items[randIdx]);
      counter++;

      if (counter > 15) {
        clearInterval(interval);
        const finalWinner = items[Math.floor(Math.random() * items.length)];
        setWinner(finalWinner);
        setIsPicking(false);

        if (removeAfterPick) {
          const remaining = items.filter((item) => item !== finalWinner);
          setItemsText(remaining.join('\n'));
        }
      }
    }, 80);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input List */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Daftar Nama / Pilihan ({items.length} item)
            </label>
            <button
              onClick={() => setItemsText('')}
              className="text-xs text-slate-400 hover:text-red-500"
            >
              Kosongkan
            </button>
          </div>
          <textarea
            rows={10}
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
            className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="Ketik satu nama per baris..."
          />

          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={removeAfterPick}
              onChange={(e) => setRemoveAfterPick(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            <span>Hapus nama pemenang dari daftar setelah terpilih</span>
          </label>
        </div>

        {/* Result Area */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center space-y-6 min-h-[300px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start">
            Pemenang Undian
          </span>

          <div className="flex flex-col items-center justify-center text-center p-6 w-full">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 min-h-[48px] flex items-center justify-center break-all">
              {isPicking ? (
                <span className="text-blue-600 animate-pulse">{winner || 'Mengundi...'}</span>
              ) : winner ? (
                <span className="text-emerald-600 dark:text-emerald-400">{winner}</span>
              ) : (
                <span className="text-slate-400 text-sm font-normal">
                  Klik tombol di bawah untuk mengundi
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full justify-center">
            <button
              onClick={handlePick}
              disabled={items.length === 0 || isPicking}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              {isPicking ? 'Sedang Mengundi...' : 'Undi Nama Sekarang'}
            </button>

            {winner && !isPicking && (
              <CopyButton text={winner} label="Salin Pemenang" variant="secondary" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
