import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const Base64Tool: React.FC = () => {
  const [plainText, setPlainText] = useState('Halo dunia! Toolora mendukung UTF-8 Unicode 🚀');
  const [base64Text, setBase64Text] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Unicode-safe Base64 encode
  const encodeBase64 = (str: string): string => {
    try {
      const bytes = new TextEncoder().encode(str);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      return btoa(binString);
    } catch {
      return '';
    }
  };

  // Unicode-safe Base64 decode
  const decodeBase64 = (b64: string): string => {
    try {
      const binString = atob(b64.trim());
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch {
      throw new Error('String Base64 tidak valid atau korup.');
    }
  };

  // Auto encode when plain text changes
  React.useEffect(() => {
    try {
      setBase64Text(encodeBase64(plainText));
      setError(null);
    } catch {
      // ignore
    }
  }, [plainText]);

  const handleBase64Change = (val: string) => {
    setBase64Text(val);
    if (!val.trim()) {
      setPlainText('');
      setError(null);
      return;
    }
    try {
      const decoded = decodeBase64(val);
      setPlainText(decoded);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Base64 tidak valid');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plain Text Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Teks Asli (UTF-8)
            </span>
            <CopyButton text={plainText} label="Salin Teks" variant="subtle" />
          </div>
          <textarea
            rows={10}
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            className="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            placeholder="Ketik teks yang ingin di-encode..."
          />
        </div>

        {/* Base64 Panel */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Base64 String
            </span>
            <CopyButton text={base64Text} label="Salin Base64" variant="primary" />
          </div>
          <textarea
            rows={10}
            value={base64Text}
            onChange={(e) => handleBase64Change(e.target.value)}
            className={`w-full p-3.5 font-mono text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
              error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 dark:border-slate-700'
            }`}
            placeholder="Ketik atau tempel string Base64 untuk di-decode..."
          />
          {error && <p className="text-xs text-red-500 font-mono">{error}</p>}
        </div>
      </div>
    </div>
  );
};
