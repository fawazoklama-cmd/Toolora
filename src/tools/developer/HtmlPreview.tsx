import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

export const HtmlPreview: React.FC = () => {
  const [html, setHtml] = useState(
    `<style>
  body {
    font-family: system-ui, sans-serif;
    padding: 24px;
    background: #f8fafc;
    color: #0f172a;
  }
  .card {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
    max-width: 400px;
  }
  button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 12px;
  }
</style>
<div class="card">
  <h2>Halo dari Toolora!</h2>
  <p>Ini adalah sandbox pratinjau langsung kode HTML dan CSS aman di browser.</p>
  <button onclick="alert('Halo! Sandbox berfungsi.')">Klik Saya</button>
</div>`
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Editor HTML & CSS
            </span>
            <CopyButton text={html} label="Salin Kode" variant="subtle" />
          </div>
          <textarea
            rows={14}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full p-3.5 font-mono text-xs leading-relaxed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ketik kode HTML & CSS..."
          />
        </div>

        {/* Live Sandbox Preview */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Pratinjau Sandbox Aman
            </span>
            <span className="text-[11px] text-slate-400">sandbox=&quot;allow-scripts&quot;</span>
          </div>

          <div className="flex-1 min-h-[300px] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white">
            <iframe
              title="HTML Sandbox Preview"
              srcDoc={html}
              sandbox="allow-scripts"
              className="w-full h-full min-h-[300px] border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
