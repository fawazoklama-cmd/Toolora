import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('2000-05-15');

  const ageData = React.useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();

    if (isNaN(birth.getTime()) || birth > today) return null;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days lived
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));

    // Next birthday countdown
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > nextBday) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Day of the week born
    const daysName = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bornDayName = daysName[birth.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      daysToNextBday,
      bornDayName,
    };
  }, [birthDate]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Pilih Tanggal Lahir Anda
          </label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full sm:w-64 px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>
      </div>

      {ageData ? (
        <div className="space-y-6">
          {/* Main age display */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Usia Anda Saat Ini
            </span>
            <div className="mt-2 text-3xl sm:text-4xl font-bold font-mono text-blue-600 dark:text-blue-400 tabular-nums">
              {ageData.years} Tahun, {ageData.months} Bulan, {ageData.days} Hari
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
              <span>Lahir pada hari: <strong>{ageData.bornDayName}</strong></span>
              <CopyButton
                text={`${ageData.years} Tahun, ${ageData.months} Bulan, ${ageData.days} Hari`}
                label="Salin Usia"
                variant="subtle"
              />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">Total Hari Telah Dijalani</span>
              <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1 tabular-nums">
                {formatNumber(ageData.totalDays)} hari
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">Total Jam Hidup</span>
              <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-100 mt-1 tabular-nums">
                {formatNumber(ageData.totalHours)} jam
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">Ulang Tahun Berikutnya</span>
              <div className="text-xl font-bold font-mono text-blue-950 dark:text-blue-100 mt-1 tabular-nums">
                {ageData.daysToNextBday} hari lagi
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-xs text-slate-400 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          Pilih tanggal lahir yang valid di masa lampau.
        </div>
      )}
    </div>
  );
};
