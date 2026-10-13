import React, { useState, useEffect } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const HashGenerator: React.FC = () => {
  const [text, setText] = useState('Toolora secure hash');
  const [hashes, setHashes] = useState<{ sha256: string; sha384: string; sha512: string }>({
    sha256: '',
    sha384: '',
    sha512: '',
  });

  const computeHash = async (algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512', data: string): Promise<string> => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest(algorithm, dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    let isCancelled = false;

    const generateAll = async () => {
      try {
        const [h256, h384, h512] = await Promise.all([
          computeHash('SHA-256', text),
          computeHash('SHA-384', text),
          computeHash('SHA-512', text),
        ]);

        if (!isCancelled) {
          setHashes({ sha256: h256, sha384: h384, sha512: h512 });
        }
      } catch {
        // ignore
      }
    };

    generateAll();
    return () => {
      isCancelled = true;
    };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Teks Input
        </label>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          placeholder="Ketik teks yang ingin di-hash..."
        />
      </div>

      <div className="space-y-4">
        {/* SHA-256 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              SHA-256 (256-bit / 64 Hex)
            </span>
            <CopyButton text={hashes.sha256} label="Salin SHA-256" variant="primary" />
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs break-all text-slate-800 dark:text-slate-200">
            {hashes.sha256}
          </div>
        </div>

        {/* SHA-384 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              SHA-384 (384-bit / 96 Hex)
            </span>
            <CopyButton text={hashes.sha384} label="Salin SHA-384" variant="subtle" />
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs break-all text-slate-800 dark:text-slate-200">
            {hashes.sha384}
          </div>
        </div>

        {/* SHA-512 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              SHA-512 (512-bit / 128 Hex)
            </span>
            <CopyButton text={hashes.sha512} label="Salin SHA-512" variant="subtle" />
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs break-all text-slate-800 dark:text-slate-200">
            {hashes.sha512}
          </div>
        </div>
      </div>
    </div>
  );
};
