import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('Hubungi kami di info@toolora.app atau support@google.com untuk bantuan teknis.');

  const result = React.useMemo(() => {
    if (!pattern) return { isValid: true, error: null, matches: [] };
    try {
      const regex = new RegExp(pattern, flags);
      const matches: { text: string; index: number }[] = [];

      if (flags.includes('g')) {
        let match;
        // Safety counter to avoid infinite loops with zero-length matches
        let count = 0;
        while ((match = regex.exec(testText)) !== null && count < 500) {
          matches.push({ text: match[0], index: match.index });
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          count++;
        }
      } else {
        const match = regex.exec(testText);
        if (match) {
          matches.push({ text: match[0], index: match.index });
        }
      }

      return { isValid: true, error: null, matches };
    } catch (err: unknown) {
      return {
        isValid: false,
        error: err instanceof Error ? err.message : 'Pola regex tidak valid',
        matches: [],
      };
    }
  }, [pattern, flags, testText]);

  return (
    <div className="space-y-6">
      {/* Pattern Input */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Pola Regular Expression
            </label>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-400">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className={`w-full px-3 py-2 font-mono text-sm rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                  result.isValid
                    ? 'border-slate-200 dark:border-slate-700 focus:ring-blue-500'
                    : 'border-red-400 focus:ring-red-400'
                }`}
                placeholder="masukkan regex pattern..."
              />
              <span className="font-mono text-slate-400">/</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Flags
            </label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="g, i, m"
            />
          </div>
        </div>

        {result.error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{result.error}</span>
          </div>
        )}

        {/* Test String */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Teks Pengujian (Test String)
            </label>
            <span className="text-xs text-slate-500 font-mono">
              {result.matches.length} kecocokan (matches)
            </span>
          </div>
          <textarea
            rows={5}
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>
      </div>

      {/* Matches List */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Hasil Pencocokan
        </h4>

        {result.matches.length === 0 ? (
          <p className="text-xs text-slate-400 italic">
            Tidak ada kecocokan yang ditemukan pada teks pengujian.
          </p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {result.matches.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">
                    #{idx + 1}
                  </span>
                  <span className="text-slate-900 dark:text-slate-100 font-semibold">
                    &quot;{m.text}&quot;
                  </span>
                  <span className="text-slate-400 ml-2">(index: {m.index})</span>
                </div>
                <CopyButton text={m.text} label="Salin" variant="subtle" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
