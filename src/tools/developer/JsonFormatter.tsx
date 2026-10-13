import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('{"name":"Toolora","version":1,"features":["privacy","fast","offline"],"active":true}');
  const [indent, setIndent] = useState<number>(2);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, indent));
      setErrorMsg(null);
      setIsValid(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON';
      setErrorMsg(msg);
      setIsValid(false);
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setErrorMsg(null);
      setIsValid(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON';
      setErrorMsg(msg);
      setIsValid(false);
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setErrorMsg(null);
      setIsValid(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON';
      setErrorMsg(msg);
      setIsValid(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={formatJson}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
          >
            Format & Rapikan (Pretty)
          </button>
          <button
            onClick={minifyJson}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Minifikasi (Minify)
          </button>
          <button
            onClick={validateJson}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Validasi JSON
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500">Indentasi:</span>
          <button
            onClick={() => setIndent(2)}
            className={`px-2.5 py-1 rounded-md border ${
              indent === 2 ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 border-blue-300 dark:border-blue-700' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            2 Spasi
          </button>
          <button
            onClick={() => setIndent(4)}
            className={`px-2.5 py-1 rounded-md border ${
              indent === 4 ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 border-blue-300 dark:border-blue-700' : 'border-slate-200 dark:border-slate-700'
            }`}
          >
            4 Spasi
          </button>
        </div>
      </div>

      {/* Editor Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Dokumen JSON
            </span>
            {errorMsg ? (
              <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Format Tidak Valid
              </span>
            ) : isValid ? (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Sintaks Valid
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <CopyButton text={input} label="Salin JSON" variant="primary" />
            <button
              onClick={() => {
                setInput('');
                setErrorMsg(null);
              }}
              className="text-xs text-slate-400 hover:text-red-500 cursor-pointer"
            >
              Kosongkan
            </button>
          </div>
        </div>

        <textarea
          rows={14}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setErrorMsg(null);
          }}
          className={`w-full p-4 font-mono text-xs leading-relaxed rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none ${
            errorMsg
              ? 'border-red-400 focus:ring-2 focus:ring-red-400'
              : 'border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500'
          }`}
          placeholder="Tempel atau ketik string JSON di sini..."
        />

        {errorMsg && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-300 font-mono">
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
};
