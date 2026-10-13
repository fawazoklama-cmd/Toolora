import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { formatFileSize } from '../../lib/formatters';

export const ImageCompressor: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState('image');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(75); // 1-100%
  const [compressedDataUrl, setCompressedDataUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const { showToast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Pilih file gambar valid (JPEG, PNG, WebP).', 'error');
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        imgRef.current = img;
        compress(img, quality);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const compress = (img: HTMLImageElement, q: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white background in case of transparent png compressed to jpeg
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', q / 100);
    setCompressedDataUrl(dataUrl);

    const head = 'data:image/jpeg;base64,';
    const bytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
    setCompressedSize(bytes);
  };

  const handleQualityChange = (val: number) => {
    setQuality(val);
    if (imgRef.current) {
      compress(imgRef.current, val);
    }
  };

  const handleDownload = () => {
    if (!compressedDataUrl) return;
    const a = document.createElement('a');
    a.href = compressedDataUrl;
    a.download = `${fileName}_compressed_q${quality}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Foto terkompresi berhasil diunduh!', 'success');
  };

  const savedPercent =
    originalSize > 0 && compressedSize > 0
      ? Math.max(0, ((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div className="p-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 text-center flex flex-col items-center justify-center space-y-4 hover:border-blue-500 transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Pilih Gambar yang Ingin Dikompresi
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Atur tingkat kualitas dan perkecil ukuran file foto langsung di browser Anda.
            </p>
          </div>
          <label className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors shadow-xs">
            Pilih Foto
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Kontrol Kompresi
              </h4>
              <label className="text-xs text-blue-600 hover:underline cursor-pointer">
                Ganti Foto
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Quality Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                <span>Kualitas Kompresi:</span>
                <span className="font-mono text-blue-600 font-bold">{quality}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Size Comparison Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Ukuran Asli:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {formatFileSize(originalSize)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ukuran Setelah Kompres:</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {formatFileSize(compressedSize)}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500">Penghematan Ukuran:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {savedPercent > 0 ? `Hemat ${savedPercent.toFixed(1)}%` : 'Ukuran Sama / Sedikit'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                Unduh Hasil Kompresi (.jpg)
              </button>
            </div>
          </div>

          {/* Preview Image */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center min-h-[300px]">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 self-start">
              Pratinjau Hasil Kompresi
            </span>
            {compressedDataUrl ? (
              <img
                src={compressedDataUrl}
                alt="Pratinjau Foto Terkompresi"
                className="max-h-80 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 object-contain shadow-xs"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400 text-xs">
                <ImageIcon className="w-8 h-8 mb-2" />
                <span>Memproses kompresi...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
