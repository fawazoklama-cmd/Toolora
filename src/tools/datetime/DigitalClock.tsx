import React, { useState, useEffect } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Indonesian date
  const dateFormatted = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  let displayHour = hours;
  let ampm = '';
  if (!is24Hour) {
    ampm = hours >= 12 ? ' PM' : ' AM';
    displayHour = hours % 12 || 12;
  }
  const hourStr = String(displayHour).padStart(2, '0');

  // Timezone calculations (WIB = UTC+7, WITA = UTC+8, WIT = UTC+9, UTC = 0)
  const utcHours = time.getUTCHours();
  const wibHours = (utcHours + 7) % 24;
  const witaHours = (utcHours + 8) % 24;
  const witHours = (utcHours + 9) % 24;

  const fmtTz = (h: number) => `${String(h).padStart(2, '0')}:${minutes}:${seconds}`;

  return (
    <div className="space-y-6">
      {/* Clock display */}
      <div className="p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs text-center space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span className="font-medium">{dateFormatted}</span>
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium"
          >
            Format: {is24Hour ? '24 Jam' : '12 Jam'}
          </button>
        </div>

        <div className="font-mono text-6xl sm:text-7xl font-bold tracking-tight text-blue-600 dark:text-blue-400 tabular-nums">
          {hourStr}:{minutes}:{seconds}
          {!is24Hour && <span className="text-2xl ml-2 font-normal text-slate-400">{ampm}</span>}
        </div>

        <div className="pt-2 flex justify-center">
          <CopyButton
            text={`${dateFormatted} - ${hourStr}:${minutes}:${seconds}${ampm}`}
            label="Salin Waktu Saat Ini"
            variant="subtle"
          />
        </div>
      </div>

      {/* Indonesia Timezones Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">WIB (UTC+7)</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
            {fmtTz(wibHours)}
          </div>
          <span className="text-[10px] text-slate-400">Jawa, Sumatra, Kalbar</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">WITA (UTC+8)</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
            {fmtTz(witaHours)}
          </div>
          <span className="text-[10px] text-slate-400">Bali, NTB, NTT, Sulsel</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">WIT (UTC+9)</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
            {fmtTz(witHours)}
          </div>
          <span className="text-[10px] text-slate-400">Maluku, Papua</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">UTC / GMT</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
            {fmtTz(utcHours)}
          </div>
          <span className="text-[10px] text-slate-400">Waktu Internasional</span>
        </div>
      </div>
    </div>
  );
};
