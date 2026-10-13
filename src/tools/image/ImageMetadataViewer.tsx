import React, { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';
import { formatFileSize } from '../../lib/formatters';

export const ImageMetadataViewer: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<{
    name: string;
    type: string;
    size: number;
    width: number;
    height: number;
    aspectRatio: string;
    megapixels: string;
    lastModified: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);

        // Aspect ratio simplification
        const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
        const divisor = gcd(img.width, img.height);
        const aspect = `${img.width / divisor}:${img.height / divisor}`;
        const mp = ((img.width * img.height) / 1000000).toFixed(2);

        setMetadata({
          name: file.name,
          type: file.type || 'image/unknown',
          size: file.size,
          width: img.width,
          height: img.height,
          aspectRatio: aspect,
          megapixels: `${mp} MP`,
          lastModified: new Date(file.lastModified).toLocaleString('id-ID'),
        });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 text-center flex flex-col items-center justify-center space-y-4 hover:border-blue-500 transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Pilih Gambar untuk Diinspeksi
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Periksa resolusi dimensi, aspek rasio, ukuran file, dan tipe MIME secara lokal.
            </p>
          </div>
          <label className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors shadow-xs">
            Buka Gambar
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Metadata table */}
          {metadata && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Detail Teknis Gambar
                </h4>
                <label className="text-xs text-blue-600 hover:underline cursor-pointer">
                  Pilih Lain
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                <MetaRow label="Nama File" value={metadata.name} />
                <MetaRow label="Format / MIME" value={metadata.type} />
                <MetaRow label="Ukuran File" value={formatFileSize(metadata.size)} />
                <MetaRow label="Resolusi Lebar" value={`${metadata.width} piksel`} />
                <MetaRow label="Resolusi Tinggi" value={`${metadata.height} piksel`} />
                <MetaRow label="Aspect Ratio" value={metadata.aspectRatio} />
                <MetaRow label="Megapixel" value={metadata.megapixels} />
                <MetaRow label="Tanggal Berkas" value={metadata.lastModified} />
              </div>
            </div>
          )}

          {/* Image Preview */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 self-start">
              Pratinjau
            </span>
            <img
              src={imageSrc}
              alt="Pratinjau File"
              className="max-h-80 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 object-contain shadow-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const MetaRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="py-2.5 flex items-center justify-between">
    <span className="text-slate-500">{label}:</span>
    <div className="flex items-center gap-2">
      <span className="font-mono font-medium text-slate-900 dark:text-slate-100">{value}</span>
      <CopyButton text={value} variant="subtle" />
    </div>
  </div>
);
