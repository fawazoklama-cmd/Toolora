import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const UrlEncoderTool: React.FC = () => {
  const [plainUrl, setPlainUrl] = useState('https://toolora.app/search?query=kalkulator online&category=math');
  const [encodedUrl, setEncodedUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    try {
      setEncodedUrl(encodeURIComponent(plainUrl));
      setError(null);
    } catch {
      // ignore
    }
  }, [plainUrl]);

  const handleEncodedChange = (val: string) => {
    setEncodedUrl(val);
    try {
      setPlainUrl(decodeURIComponent(val));
      setError(null);
    } catch {
      setError('Format URL encoded tidak valid.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              URL / Teks Asli (Decoded)
            </span>
            <CopyButton text={plainUrl} label="Salin Asli" variant="subtle" />
          </div>
          <textarea
            rows={8}
            value={plainUrl}
            onChange={(e) => setPlainUrl(e.target.value)}
            className="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="Ketik teks URL..."
          />
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              URL Encoded (%XX)
            </span>
            <CopyButton text={encodedUrl} label="Salin Encoded" variant="primary" />
          </div>
          <textarea
            rows={8}
            value={encodedUrl}
            onChange={(e) => handleEncodedChange(e.target.value)}
            className={`w-full p-3.5 font-mono text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 ${
              error ? 'border-red-400' : 'border-slate-200 dark:border-slate-700'
            }`}
            placeholder="Ketik teks URL Encoded..."
          />
          {error && <p className="text-xs text-red-500 font-mono">{error}</p>}
        </div>
      </div>
    </div>
  );
};
