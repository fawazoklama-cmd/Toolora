import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const TextToFile: React.FC = () => {
  const [content, setContent] = useState('Catatan penting Toolora\nDibuat pada tahun 2026.');
  const [fileName, setFileName] = useState('dokumen_catatan');
  const [extension, setExtension] = useState<'.txt' | '.csv' | '.json'>('.txt');
  const { showToast } = useToast();

  const handleDownload = () => {
    if (!content.trim()) return;

    let mimeType = 'text/plain';
    if (extension === '.csv') mimeType = 'text/csv';
    if (extension === '.json') mimeType = 'application/json';

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName || 'dokumen'}${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`File ${fileName}${extension} berhasil diunduh!`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Nama File
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="nama_file"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Format Ekstensi
            </label>
            <select
              value={extension}
              onChange={(e) => setExtension(e.target.value as '.txt' | '.csv' | '.json')}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value=".txt">Teks Biasa (.txt)</option>
              <option value=".csv">Tabel CSV (.csv)</option>
              <option value=".json">Format JSON (.json)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            Isi Konten Dokumen
          </label>
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            placeholder="Ketik teks yang ingin diunduh sebagai file..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleDownload}
            disabled={!content.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Unduh Berkas Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};
