import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';

export const JsonViewer: React.FC = () => {
  const [jsonText, setJsonText] = useState(
    JSON.stringify(
      {
        appName: 'Toolora',
        version: '1.0.0',
        author: {
          name: 'Developer',
          website: 'https://toolora.app',
        },
        toolsCount: 65,
        features: ['100% Client-side', 'No Database', 'Zero Tracking'],
      },
      null,
      2
    )
  );

  const [parsed, setParsed] = useState<unknown>(() => {
    try {
      return JSON.parse(jsonText);
    } catch {
      return null;
    }
  });

  const handleTextChange = (val: string) => {
    setJsonText(val);
    try {
      setParsed(JSON.parse(val));
    } catch {
      setParsed(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleTextChange(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs">
          <Upload className="w-3.5 h-3.5" />
          Buka File JSON
          <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
        </label>
        <CopyButton text={jsonText} label="Salin JSON" variant="subtle" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Raw Text */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Editor Teks JSON
          </span>
          <textarea
            rows={14}
            value={jsonText}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Tree inspector */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Hierarki Objek
          </span>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[300px] overflow-auto font-mono text-xs text-slate-800 dark:text-slate-200">
            {parsed !== null ? (
              <pre className="whitespace-pre-wrap">{JSON.stringify(parsed, null, 2)}</pre>
            ) : (
              <span className="text-red-500">JSON tidak valid. Periksa sintaks penulisan.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
