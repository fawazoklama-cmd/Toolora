import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw } from 'lucide-react';

export const TokenGenerator: React.FC = () => {
  const [length, setLength] = useState(32);
  const [format, setFormat] = useState<'hex' | 'alphanumeric' | 'base64url'>('hex');

  const generateToken = (): string => {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);

    if (format === 'hex') {
      return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').slice(0, length);
    } else if (format === 'alphanumeric') {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return Array.from(bytes, (b) => chars[b % chars.length]).join('').slice(0, length);
    } else {
      // base64 url safe
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      return btoa(binString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '').slice(0, length);
    }
  };

  const [token, setToken] = useState(() => generateToken());

  const handleGenerate = () => {
    setToken(generateToken());
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Token Kriptografis
          </span>
          <div className="mt-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm break-all font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between gap-3">
            <span>{token}</span>
            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={handleGenerate}
                className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-200 cursor-pointer"
                title="Acak baru"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <CopyButton text={token} label="Salin Token" variant="primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Format Karakter
            </label>
            <div className="flex gap-2">
              {(['hex', 'alphanumeric', 'base64url'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFormat(f);
                    setTimeout(handleGenerate, 50);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-pointer ${
                    format === f
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {f === 'hex' ? 'Hexadecimal' : f === 'alphanumeric' ? 'Alfanumerik' : 'Base64URL'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <span>Panjang Token:</span>
              <span className="font-mono text-blue-600">{length} karakter</span>
            </div>
            <input
              type="range"
              min="16"
              max="128"
              value={length}
              onChange={(e) => {
                setLength(parseInt(e.target.value));
                setTimeout(handleGenerate, 50);
              }}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
