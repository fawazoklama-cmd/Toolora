import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = React.useMemo(() => {
    const raw = text.trim();
    // Words: split by whitespace
    const words = raw ? raw.split(/\s+/).filter(Boolean).length : 0;
    // Characters with spaces
    const charsWithSpaces = text.length;
    // Characters without spaces
    const charsNoSpaces = text.replace(/\s/g, '').length;
    // Sentences: split by . ! ?
    const sentences = raw ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (raw ? 1 : 0) : 0;
    // Paragraphs: split by double newlines
    const paragraphs = raw ? text.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
    // Reading time: average 200 words per minute
    const readingTimeMinutes = Math.ceil(words / 200);
    // Speaking time: average 130 words per minute
    const speakingTimeMinutes = Math.ceil(words / 130);

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
    };
  }, [text]);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard label="Total Kata" value={formatNumber(stats.words)} highlight />
        <MetricCard label="Karakter (Dg Spasi)" value={formatNumber(stats.charsWithSpaces)} />
        <MetricCard label="Karakter (Tanpa Spasi)" value={formatNumber(stats.charsNoSpaces)} />
        <MetricCard label="Kalimat" value={formatNumber(stats.sentences)} />
        <MetricCard label="Paragraf" value={formatNumber(stats.paragraphs)} />
        <MetricCard label="Waktu Baca" value={`~${stats.readingTimeMinutes} mnt`} />
      </div>

      {/* Editor Textarea */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Ketik atau Tempel Teks Anda di Bawah
          </label>
          <div className="flex items-center gap-2">
            <CopyButton text={text} label="Salin Teks" variant="subtle" />
            <button
              onClick={() => setText('')}
              disabled={!text}
              className="text-xs text-slate-400 hover:text-red-500 disabled:opacity-40 transition-colors cursor-pointer"
            >
              Hapus
            </button>
          </div>
        </div>

        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Mulai mengetik atau tempelkan tulisan artikel, tugas, skripsi, atau konten Anda di sini..."
          className="w-full p-4 text-sm sm:text-base leading-relaxed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Estimasi waktu berbicara: ~{stats.speakingTimeMinutes} menit</span>
          <span className="font-mono">{stats.charsWithSpaces} karakter</span>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string; highlight?: boolean }> = ({
  label,
  value,
  highlight,
}) => (
  <div
    className={`p-3.5 rounded-xl border text-center transition-colors ${
      highlight
        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100'
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
    }`}
  >
    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">{label}</div>
    <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums mt-1">{value}</div>
  </div>
);
