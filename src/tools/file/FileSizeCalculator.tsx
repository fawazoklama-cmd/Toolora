import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatNumber } from '../../lib/formatters';

type StorageUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

export const FileSizeCalculator: React.FC = () => {
  const [val, setVal] = useState('500');
  const [unit, setUnit] = useState<StorageUnit>('GB');

  const conversions = React.useMemo(() => {
    const n = parseFloat(val);
    if (isNaN(n) || n < 0) return null;

    // Convert to bytes under SI (decimal 1000)
    const factorSI: Record<StorageUnit, number> = {
      B: 1,
      KB: 1e3,
      MB: 1e6,
      GB: 1e9,
      TB: 1e12,
    };

    // Convert to bytes under Binary (IEC 1024)
    const factorIEC: Record<StorageUnit, number> = {
      B: 1,
      KB: 1024,
      MB: 1024 ** 2,
      GB: 1024 ** 3,
      TB: 1024 ** 4,
    };

    const bytesFromSI = n * factorSI[unit];
    const bytesFromIEC = n * factorIEC[unit];

    return {
      bytesSI: bytesFromSI,
      kbSI: bytesFromSI / 1e3,
      mbSI: bytesFromSI / 1e6,
      gbSI: bytesFromSI / 1e9,
      tbSI: bytesFromSI / 1e12,

      bytesIEC: bytesFromIEC,
      kibIEC: bytesFromIEC / 1024,
      mibIEC: bytesFromIEC / 1024 ** 2,
      gibIEC: bytesFromIEC / 1024 ** 3,
      tibIEC: bytesFromIEC / 1024 ** 4,
    };
  }, [val, unit]);

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Nilai Ukuran
            </label>
            <input
              type="number"
              min="0"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full px-3.5 py-2 font-mono text-base rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Satuan Awal
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as StorageUnit)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="B">Byte (B)</option>
              <option value="KB">Kilobyte (KB)</option>
              <option value="MB">Megabyte (MB)</option>
              <option value="GB">Gigabyte (GB)</option>
              <option value="TB">Terabyte (TB)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Tables */}
      {conversions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Decimal SI */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Standar Desimal SI (Kelipatan 1.000)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Biasa digunakan oleh produsen hard drive, SSD, & flashdisk.
              </p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <Row label="Byte" value={`${formatNumber(conversions.bytesSI)} B`} />
              <Row label="Kilobyte" value={`${formatNumber(conversions.kbSI, 3)} KB`} />
              <Row label="Megabyte" value={`${formatNumber(conversions.mbSI, 3)} MB`} />
              <Row label="Gigabyte" value={`${formatNumber(conversions.gbSI, 3)} GB`} />
              <Row label="Terabyte" value={`${formatNumber(conversions.tbSI, 4)} TB`} />
            </div>
          </div>

          {/* Binary IEC */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Standar Biner IEC (Kelipatan 1.024)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Digunakan sistem operasi Windows, RAM, & kapasitas nyata file.
              </p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <Row label="Byte" value={`${formatNumber(conversions.bytesIEC)} B`} />
              <Row label="Kibibyte" value={`${formatNumber(conversions.kibIEC, 3)} KiB`} />
              <Row label="Mebibyte" value={`${formatNumber(conversions.mibIEC, 3)} MiB`} />
              <Row label="Gibibyte" value={`${formatNumber(conversions.gibIEC, 3)} GiB`} />
              <Row label="Tebibyte" value={`${formatNumber(conversions.tibIEC, 4)} TiB`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="py-2.5 flex items-center justify-between">
    <span className="text-slate-500">{label}:</span>
    <div className="flex items-center gap-2">
      <span className="font-mono font-medium text-slate-900 dark:text-slate-100">{value}</span>
      <CopyButton text={value} variant="subtle" />
    </div>
  </div>
);
