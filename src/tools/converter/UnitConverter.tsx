import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { ArrowLeftRight } from 'lucide-react';
import { formatNumber } from '../../lib/formatters';

type CategoryType = 'length' | 'weight' | 'temp' | 'speed' | 'time' | 'storage' | 'area';

interface UnitDef {
  id: string;
  name: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const UNIT_DATA: Record<CategoryType, { title: string; units: UnitDef[] }> = {
  length: {
    title: 'Panjang',
    units: [
      { id: 'm', name: 'Meter (m)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', name: 'Kilometer (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cm', name: 'Centimeter (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: 'mm', name: 'Milimeter (mm)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mi', name: 'Mil (Mile)', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: 'yd', name: 'Yard (yd)', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'ft', name: 'Kaki (Foot)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'in', name: 'Inci (Inch)', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  weight: {
    title: 'Berat & Massa',
    units: [
      { id: 'kg', name: 'Kilogram (kg)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'g', name: 'Gram (g)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mg', name: 'Miligram (mg)', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 'ton', name: 'Ton Metrik', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'lb', name: 'Pound (lbs)', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { id: 'oz', name: 'Ons (Ounce)', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    ],
  },
  temp: {
    title: 'Suhu',
    units: [
      { id: 'c', name: 'Celsius (°C)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'f', name: 'Fahrenheit (°F)', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => (v * 9) / 5 + 32 },
      { id: 'k', name: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
      { id: 'r', name: 'Reamur (°R)', toBase: (v) => v * (5 / 4), fromBase: (v) => v * (4 / 5) },
    ],
  },
  speed: {
    title: 'Kecepatan',
    units: [
      { id: 'kmh', name: 'km/jam (km/h)', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: 'ms', name: 'm/detik (m/s)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'mph', name: 'Mil/jam (mph)', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: 'knot', name: 'Knot (kn)', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
  time: {
    title: 'Waktu',
    units: [
      { id: 's', name: 'Detik (s)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'min', name: 'Menit (min)', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: 'h', name: 'Jam (hour)', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: 'd', name: 'Hari (day)', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: 'wk', name: 'Minggu (week)', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: 'yr', name: 'Tahun (365 hari)', toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
    ],
  },
  storage: {
    title: 'Kapasitas Digital',
    units: [
      { id: 'b', name: 'Byte (B)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'kb', name: 'Kilobyte (KB)', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: 'mb', name: 'Megabyte (MB)', toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / (1024 * 1024) },
      { id: 'gb', name: 'Gigabyte (GB)', toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
      { id: 'tb', name: 'Terabyte (TB)', toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
    ],
  },
  area: {
    title: 'Luas',
    units: [
      { id: 'm2', name: 'Meter Persegi (m²)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km2', name: 'Kilometer Persegi (km²)', toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: 'ha', name: 'Hektare (ha)', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      { id: 'ft2', name: 'Kaki Persegi (sq ft)', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      { id: 'ac', name: 'Acre (ac)', toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    ],
  },
};

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<CategoryType>('length');
  const [value, setValue] = useState('100');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');

  // Change category handler
  const handleCategoryChange = (cat: CategoryType) => {
    setCategory(cat);
    const units = UNIT_DATA[cat].units;
    setFromUnit(units[0].id);
    setToUnit(units[1] ? units[1].id : units[0].id);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const convertedValue = React.useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;

    const units = UNIT_DATA[category].units;
    const uFrom = units.find((u) => u.id === fromUnit);
    const uTo = units.find((u) => u.id === toUnit);

    if (!uFrom || !uTo) return null;

    const baseVal = uFrom.toBase(num);
    const finalVal = uTo.fromBase(baseVal);
    return finalVal;
  }, [category, value, fromUnit, toUnit]);

  const activeCategoryData = UNIT_DATA[category];

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Pilih Kategori Satuan
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {(Object.keys(UNIT_DATA) as CategoryType[]).map((catKey) => (
            <button
              key={catKey}
              onClick={() => handleCategoryChange(catKey)}
              className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer text-center ${
                category === catKey
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {UNIT_DATA[catKey].title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Converter Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* From unit */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Nilai Input
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 font-mono text-xl font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Dari Satuan
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              {activeCategoryData.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* To unit */}
        <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          {/* Swap button */}
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <button
              onClick={handleSwap}
              className="w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
              title="Tukar satuan"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Hasil Konversi
            </label>
            <div className="w-full px-4 py-3 font-mono text-xl font-bold rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 truncate">
              {convertedValue !== null ? formatNumber(convertedValue, 6) : '-'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Ke Satuan
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              {activeCategoryData.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleSwap}
              className="md:hidden inline-flex items-center gap-1 text-xs text-blue-600 font-medium"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" /> Tukar Satuan
            </button>
            <div className="ml-auto">
              {convertedValue !== null && (
                <CopyButton
                  text={String(convertedValue)}
                  label="Salin Hasil"
                  variant="primary"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
