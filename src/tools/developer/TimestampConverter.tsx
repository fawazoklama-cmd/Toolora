import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Clock } from 'lucide-react';

export const TimestampConverter: React.FC = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(() => Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState(() => String(Math.floor(Date.now() / 1000)));

  // Date to Timestamp picker
  const [dateInput, setDateInput] = useState(() => new Date().toISOString().slice(0, 16));

  // Current epoch ticker
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const convertedDate = React.useMemo(() => {
    const raw = parseFloat(timestampInput);
    if (isNaN(raw)) return null;
    // Check if seconds or milliseconds
    const ms = raw > 1e11 ? raw : raw * 1000;
    const date = new Date(ms);
    if (isNaN(date.getTime())) return null;

    return {
      iso: date.toISOString(),
      local: date.toLocaleString('id-ID', {
        dateStyle: 'full',
        timeStyle: 'long',
      }),
      utc: date.toUTCString(),
      relative: date.toLocaleString(),
    };
  }, [timestampInput]);

  const convertedTimestamp = React.useMemo(() => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return null;
    return {
      seconds: Math.floor(date.getTime() / 1000),
      milliseconds: date.getTime(),
    };
  }, [dateInput]);

  return (
    <div className="space-y-6">
      {/* Current Real-time Epoch */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
          <Clock className="w-4 h-4" />
          <span>Unix Timestamp Sekarang:</span>
          <span className="font-mono font-bold text-sm text-blue-950 dark:text-blue-100 tabular-nums">
            {currentTimestamp}
          </span>
        </div>
        <button
          onClick={() => setTimestampInput(String(currentTimestamp))}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          Gunakan Waktu Sekarang
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timestamp to Date */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            1. Unix Timestamp &rarr; Tanggal Manusia
          </h4>

          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Masukkan Timestamp (Detik atau Milidetik)
            </label>
            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="1710000000"
            />
          </div>

          {convertedDate && (
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">Waktu Lokal (Indonesia):</span>
                <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5 flex justify-between">
                  <span>{convertedDate.local}</span>
                  <CopyButton text={convertedDate.local} variant="subtle" />
                </div>
              </div>

              <div>
                <span className="text-slate-500 block">Format UTC / GMT:</span>
                <div className="font-mono text-slate-800 dark:text-slate-200 mt-0.5 flex justify-between">
                  <span>{convertedDate.utc}</span>
                  <CopyButton text={convertedDate.utc} variant="subtle" />
                </div>
              </div>

              <div>
                <span className="text-slate-500 block">Format ISO 8601:</span>
                <div className="font-mono text-slate-800 dark:text-slate-200 mt-0.5 flex justify-between">
                  <span>{convertedDate.iso}</span>
                  <CopyButton text={convertedDate.iso} variant="subtle" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Date to Timestamp */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            2. Tanggal & Jam &rarr; Unix Timestamp
          </h4>

          <div>
            <label className="block text-xs text-slate-500 mb-1">Pilih Tanggal & Waktu Lokal</label>
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          {convertedTimestamp && (
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block">Timestamp Detik (Seconds):</span>
                <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5 flex justify-between">
                  <span>{convertedTimestamp.seconds}</span>
                  <CopyButton text={String(convertedTimestamp.seconds)} variant="subtle" />
                </div>
              </div>

              <div>
                <span className="text-slate-500 block">Timestamp Milidetik (Milliseconds):</span>
                <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex justify-between">
                  <span>{convertedTimestamp.milliseconds}</span>
                  <CopyButton text={String(convertedTimestamp.milliseconds)} variant="subtle" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
