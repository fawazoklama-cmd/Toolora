import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const CaseConverter: React.FC = () => {
  const [text, setText] = useState('halo dunia! selamat datang di TOOLORA web utilities.');

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
  };

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (c) => c.toLowerCase());
  };

  const toPascalCase = (str: string) => {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[a-z]/, (c) => c.toUpperCase());
  };

  const toSnakeCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };

  const toKebabCase = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const toAlternatingCase = (str: string) => {
    return str
      .split('')
      .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join('');
  };

  const cases = [
    { label: 'UPPERCASE', transform: () => setText(text.toUpperCase()) },
    { label: 'lowercase', transform: () => setText(text.toLowerCase()) },
    { label: 'Title Case', transform: () => setText(toTitleCase(text)) },
    { label: 'Sentence case', transform: () => setText(toSentenceCase(text)) },
    { label: 'camelCase', transform: () => setText(toCamelCase(text)) },
    { label: 'PascalCase', transform: () => setText(toPascalCase(text)) },
    { label: 'snake_case', transform: () => setText(toSnakeCase(text)) },
    { label: 'kebab-case', transform: () => setText(toKebabCase(text)) },
    { label: 'aLtErNaTiNg', transform: () => setText(toAlternatingCase(text)) },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Teks Input
          </label>
          <div className="flex items-center gap-2">
            <CopyButton text={text} label="Salin Hasil" variant="primary" />
            <button
              onClick={() => setText('')}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              Hapus
            </button>
          </div>
        </div>

        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik teks yang ingin diubah gaya hurufnya..."
          className="w-full p-4 text-sm font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Buttons for conversion */}
        <div className="pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Pilih Format Konversi
          </label>
          <div className="flex flex-wrap gap-2">
            {cases.map((c) => (
              <button
                key={c.label}
                onClick={c.transform}
                className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
