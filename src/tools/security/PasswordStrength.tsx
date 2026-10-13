import React, { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const PasswordStrength: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const evaluation = React.useMemo(() => {
    if (!password) {
      return {
        score: 0,
        entropy: 0,
        label: 'Kosong',
        color: 'slate',
        crackTime: '0 detik',
        checks: {
          length: false,
          upper: false,
          lower: false,
          number: false,
          symbol: false,
        },
      };
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 12;

    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSymbol) poolSize += 33;
    if (poolSize === 0) poolSize = 1;

    // Shannon entropy estimate: E = L * log2(R)
    const entropy = Math.round(password.length * Math.log2(poolSize));

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (hasUpper && hasLower) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    let label = 'Sangat Lemah';
    let color = 'red';
    let crackTime = 'Beberapa detik';

    if (entropy < 28) {
      label = 'Sangat Lemah';
      color = 'red';
      crackTime = '< 1 detik';
    } else if (entropy < 45) {
      label = 'Lemah';
      color = 'amber';
      crackTime = 'Beberapa menit';
    } else if (entropy < 60) {
      label = 'Cukup';
      color = 'yellow';
      crackTime = 'Beberapa bulan';
    } else if (entropy < 80) {
      label = 'Kuat';
      color = 'emerald';
      crackTime = 'Ribuan tahun';
    } else {
      label = 'Sangat Kuat';
      color = 'blue';
      crackTime = 'Miliaran tahun';
    }

    return {
      score,
      entropy,
      label,
      color,
      crackTime,
      checks: {
        length: isLongEnough,
        upper: hasUpper,
        lower: hasLower,
        number: hasNumber,
        symbol: hasSymbol,
      },
    };
  }, [password]);

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong>Informasi Privasi:</strong> Kata sandi Anda hanya dianalisis di memori lokal peramban ini dan <em>tidak pernah disimpan ke LocalStorage atau dikirimkan ke server manapun</em>. Nilai kekuatan dan waktu retas di bawah adalah perkiraan matematis (estimasi).
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Masukkan Kata Sandi untuk Diuji
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ketik kata sandi..."
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress Bar & Status */}
        {password && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Tingkat Kekuatan: <span className="font-bold">{evaluation.label}</span>
              </span>
              <span className="font-mono text-slate-500">{evaluation.entropy} bits entropi</span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  evaluation.entropy < 30
                    ? 'w-1/5 bg-red-500'
                    : evaluation.entropy < 50
                    ? 'w-2/5 bg-amber-500'
                    : evaluation.entropy < 70
                    ? 'w-3/5 bg-yellow-500'
                    : evaluation.entropy < 90
                    ? 'w-4/5 bg-emerald-500'
                    : 'w-full bg-blue-600'
                }`}
              />
            </div>
            <div className="text-[11px] text-slate-500">
              Estimasi waktu retas brute-force komputer biasa: <strong>{evaluation.crackTime}</strong>
            </div>
          </div>
        )}

        {/* Criteria Checklist */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-2">
            Parameter Kunci:
          </span>
          <CheckItem pass={evaluation.checks.length} label="Panjang minimal 12 karakter" />
          <CheckItem pass={evaluation.checks.upper} label="Mengandung huruf besar (A-Z)" />
          <CheckItem pass={evaluation.checks.lower} label="Mengandung huruf kecil (a-z)" />
          <CheckItem pass={evaluation.checks.number} label="Mengandung angka (0-9)" />
          <CheckItem pass={evaluation.checks.symbol} label="Mengandung karakter simbol (!@#$%)" />
        </div>
      </div>
    </div>
  );
};

const CheckItem: React.FC<{ pass: boolean; label: string }> = ({ pass, label }) => (
  <div className="flex items-center gap-2">
    <CheckCircle2
      className={`w-3.5 h-3.5 shrink-0 ${pass ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}
    />
    <span className={pass ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}>{label}</span>
  </div>
);
