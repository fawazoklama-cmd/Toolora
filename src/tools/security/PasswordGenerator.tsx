import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw, ShieldCheck } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(true); // e.g. 1, l, I, 0, O

  const generatePassword = (): string => {
    let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowercase = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (avoidAmbiguous) {
      uppercase = uppercase.replace(/[IO]/g, '');
      lowercase = lowercase.replace(/[lo]/g, '');
      numbers = numbers.replace(/[01]/g, '');
      symbols = symbols.replace(/[|]/g, '');
    }

    const pools: string[] = [];
    if (includeUpper && uppercase) pools.push(uppercase);
    if (includeLower && lowercase) pools.push(lowercase);
    if (includeNumbers && numbers) pools.push(numbers);
    if (includeSymbols && symbols) pools.push(symbols);

    if (pools.length === 0) return '';

    // Ensure at least one character from each selected pool
    const resultChars: string[] = [];
    const cryptoValues = new Uint32Array(length + pools.length);
    crypto.getRandomValues(cryptoValues);

    let cryptoIdx = 0;
    pools.forEach((pool) => {
      const randChar = pool[cryptoValues[cryptoIdx++] % pool.length];
      resultChars.push(randChar);
    });

    // Fill the rest from combined pool
    const combined = pools.join('');
    while (resultChars.length < length) {
      const randChar = combined[cryptoValues[cryptoIdx++] % combined.length];
      resultChars.push(randChar);
    }

    // Shuffle the resultChars using Fisher-Yates with crypto values
    const shuffleValues = new Uint32Array(resultChars.length);
    crypto.getRandomValues(shuffleValues);
    for (let i = resultChars.length - 1; i > 0; i--) {
      const j = shuffleValues[i] % (i + 1);
      [resultChars[i], resultChars[j]] = [resultChars[j], resultChars[i]];
    }

    return resultChars.join('');
  };

  const [password, setPassword] = useState(() => generatePassword());

  const handleGenerate = () => {
    setPassword(generatePassword());
  };

  return (
    <div className="space-y-6">
      {/* Display box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Kata Sandi Baru yang Dihasilkan
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Web Crypto API (Kriptografis)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-lg font-bold text-slate-900 dark:text-slate-100 tracking-wider break-all">
            {password || '(Pilih minimal satu jenis karakter)'}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleGenerate}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Acak Baru
            </button>
            <CopyButton text={password} label="Salin Sandi" variant="primary" className="py-2.5" />
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Panjang Karakter: <span className="font-mono text-blue-600 font-bold">{length}</span>
            </label>
            <span className="text-xs text-slate-400">Rekomendasi: 16+ karakter</span>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => {
              setLength(parseInt(e.target.value));
              setTimeout(handleGenerate, 50);
            }}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => {
                setIncludeUpper(e.target.checked);
                setTimeout(handleGenerate, 50);
              }}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Huruf Besar (A-Z)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => {
                setIncludeLower(e.target.checked);
                setTimeout(handleGenerate, 50);
              }}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Huruf Kecil (a-z)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => {
                setIncludeNumbers(e.target.checked);
                setTimeout(handleGenerate, 50);
              }}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Angka (0-9)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => {
                setIncludeSymbols(e.target.checked);
                setTimeout(handleGenerate, 50);
              }}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Simbol Karakter (!@#$%)</span>
          </label>

          <label className="sm:col-span-2 flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-1 border-t border-slate-100 dark:border-slate-800">
            <input
              type="checkbox"
              checked={avoidAmbiguous}
              onChange={(e) => {
                setAvoidAmbiguous(e.target.checked);
                setTimeout(handleGenerate, 50);
              }}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Hindari karakter ambigu yang mirip (seperti 1, l, I, 0, O)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
