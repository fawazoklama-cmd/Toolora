import React, { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';

export const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewInput, setWaitingForNewInput] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleDigit = (digit: string) => {
    if (waitingForNewInput) {
      setDisplay(digit);
      setWaitingForNewInput(false);
    } else {
      if (display === '0' && digit !== '.') {
        setDisplay(digit);
      } else if (digit === '.' && display.includes('.')) {
        return;
      } else {
        setDisplay(display + digit);
      }
    }
  };

  const handleOperator = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation && !waitingForNewInput) {
      const current = prevValue;
      const result = calculate(current, inputValue, operation);
      setDisplay(String(result));
      setPrevValue(result);
      setHistory((prev) => [`${current} ${operation} ${inputValue} = ${result}`, ...prev.slice(0, 9)]);
    }

    setWaitingForNewInput(true);
    setOperation(nextOp);
  };

  const calculate = (a: number, b: number, op: string): number => {
    let res = 0;
    switch (op) {
      case '+':
        res = a + b;
        break;
      case '−':
      case '-':
        res = a - b;
        break;
      case '×':
      case '*':
        res = a * b;
        break;
      case '÷':
      case '/':
        res = b === 0 ? 0 : a / b;
        break;
      default:
        res = b;
    }
    // Round to prevent JS float precision artifacts
    return parseFloat(res.toFixed(10));
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (prevValue !== null && operation) {
      const result = calculate(prevValue, inputValue, operation);
      setHistory((prev) => [`${prevValue} ${operation} ${inputValue} = ${result}`, ...prev.slice(0, 9)]);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setWaitingForNewInput(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewInput(false);
  };

  const handleBackspace = () => {
    if (waitingForNewInput) return;
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    if (val !== 0) {
      setDisplay(String(-val));
    }
  };

  const handlePercent = () => {
    const val = parseFloat(display);
    setDisplay(String(val / 100));
  };

  const handleSquareRoot = () => {
    const val = parseFloat(display);
    if (val >= 0) {
      const result = Math.sqrt(val);
      setDisplay(String(parseFloat(result.toFixed(10))));
      setHistory((prev) => [`√(${val}) = ${result}`, ...prev.slice(0, 9)]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Calculator Body */}
      <div className="lg:col-span-2 max-w-md mx-auto w-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Screen */}
        <div className="mb-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-right">
          <div className="text-xs text-slate-400 font-mono h-5 truncate">
            {prevValue !== null && `${prevValue} ${operation || ''}`}
          </div>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-slate-900 dark:text-slate-100 tracking-tight truncate tabular-nums">
            {display}
          </div>
          <div className="mt-2 flex justify-end">
            <CopyButton text={display} label="Salin Hasil" variant="subtle" />
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          <button
            onClick={handleClear}
            className="py-3 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-colors cursor-pointer"
          >
            AC
          </button>
          <button
            onClick={handleBackspace}
            aria-label="Hapus satu angka"
            className="py-3 flex items-center justify-center text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={handleSquareRoot}
            className="py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            &radic;
          </button>
          <button
            onClick={() => handleOperator('÷')}
            className={`py-3 text-base font-semibold rounded-xl transition-colors cursor-pointer ${
              operation === '÷'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40'
            }`}
          >
            &divide;
          </button>

          {['7', '8', '9'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-3 text-base font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => handleOperator('×')}
            className={`py-3 text-base font-semibold rounded-xl transition-colors cursor-pointer ${
              operation === '×'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40'
            }`}
          >
            &times;
          </button>

          {['4', '5', '6'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-3 text-base font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => handleOperator('−')}
            className={`py-3 text-base font-semibold rounded-xl transition-colors cursor-pointer ${
              operation === '−'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40'
            }`}
          >
            &minus;
          </button>

          {['1', '2', '3'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-3 text-base font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => handleOperator('+')}
            className={`py-3 text-base font-semibold rounded-xl transition-colors cursor-pointer ${
              operation === '+'
                ? 'bg-blue-600 text-white'
                : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40'
            }`}
          >
            +
          </button>

          <button
            onClick={handleToggleSign}
            className="py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            &plusmn;
          </button>
          <button
            onClick={() => handleDigit('0')}
            className="py-3 text-base font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer"
          >
            0
          </button>
          <button
            onClick={() => handleDigit('.')}
            className="py-3 text-base font-semibold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            =
          </button>
        </div>
      </div>

      {/* History Log */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Riwayat Hitung
          </h4>
          {history.length > 0 && (
            <button
              onClick={() => setHistory([])}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Bersihkan
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-6 text-center">
            Belum ada riwayat perhitungan.
          </p>
        ) : (
          <ul className="space-y-2 overflow-y-auto max-h-72 text-xs font-mono text-slate-600 dark:text-slate-400">
            {history.map((item, idx) => (
              <li
                key={idx}
                className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between"
              >
                <span>{item}</span>
                <button
                  onClick={() => {
                    const parts = item.split('=');
                    if (parts[1]) setDisplay(parts[1].trim());
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer ml-2 text-[11px]"
                >
                  Pakai
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
