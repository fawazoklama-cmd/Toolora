import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const HtmlEntityTool: React.FC = () => {
  const [plain, setPlain] = useState('<div class="header">Selamat Datang & "Halo Dunia" \'2026\'</div>');
  const [entities, setEntities] = useState('');

  const escapeHtml = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const unescapeHtml = (str: string): string => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent || '';
  };

  React.useEffect(() => {
    setEntities(escapeHtml(plain));
  }, [plain]);

  const handleEntitiesChange = (val: string) => {
    setEntities(val);
    setPlain(unescapeHtml(val));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Teks HTML Karakter Mentah
            </span>
            <CopyButton text={plain} label="Salin Mentah" variant="subtle" />
          </div>
          <textarea
            rows={8}
            value={plain}
            onChange={(e) => setPlain(e.target.value)}
            className="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Entitas Karakter HTML (Escaped)
            </span>
            <CopyButton text={entities} label="Salin Entitas" variant="primary" />
          </div>
          <textarea
            rows={8}
            value={entities}
            onChange={(e) => handleEntitiesChange(e.target.value)}
            className="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>
      </div>
    </div>
  );
};
