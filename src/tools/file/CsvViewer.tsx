import React, { useState } from 'react';
import { Upload, Download, Search, Table as TableIcon } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CsvViewer: React.FC = () => {
  const [csvText, setCsvText] = useState(
    'Nama,Kategori,Harga,Stok\nLaptop Gaming,Elektronik,15000000,5\nMouse Wireless,Aksesoris,250000,24\nKeyboard Mekanikal,Aksesoris,650000,12\nMonitor 27 Inch,Elektronik,3200000,8\nHeadset Studio,Audio,850000,15'
  );
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  // Robust CSV parser supporting commas within double quotes
  const parseCsv = (text: string) => {
    const lines = text.trim().split(/\r\n|\n/);
    if (lines.length === 0 || !text.trim()) return { headers: [], rows: [] };

    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseLine(lines[0]);
    const rows = lines.slice(1).map(parseLine).filter((r) => r.some((c) => c.length > 0));

    return { headers, rows };
  };

  const { headers, rows } = React.useMemo(() => parseCsv(csvText), [csvText]);

  const filteredRows = React.useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((row) => row.some((cell) => cell.toLowerCase().includes(q)));
  }, [rows, search]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvText(content);
      showToast(`File ${file.name} berhasil dimuat!`, 'success');
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data_export_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('File CSV berhasil diunduh!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs transition-colors">
            <Upload className="w-3.5 h-3.5" />
            Buka File CSV
            <input type="file" accept=".csv,text/csv" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={handleDownload}
            disabled={!csvText.trim()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Unduh CSV
          </button>
        </div>

        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari dalam tabel..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          />
        </div>
      </div>

      {/* Table view */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span className="font-medium">
            Menampilkan {filteredRows.length} dari {rows.length} baris data
          </span>
        </div>

        {headers.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            <TableIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            File CSV kosong atau belum dimuat.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 text-slate-400 w-12 text-center">#</th>
                  {headers.map((h, i) => (
                    <th key={i} className="px-4 py-3 truncate max-w-[200px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-sans">
                {filteredRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-4 py-2.5 text-center text-slate-400 font-mono text-[11px]">
                      {rIdx + 1}
                    </td>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5 truncate max-w-[250px]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
