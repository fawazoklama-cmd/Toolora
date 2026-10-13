import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { formatFileSize } from '../../lib/formatters';

type TargetFormat = 'image/png' | 'image/jpeg' | 'image/webp';

export const ImageFormatConverter: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState('image');
  const [originalFormat, setOriginalFormat] = useState('');
  const [targetFormat, setTargetFormat] = useState<TargetFormat>('image/webp');
  const [convertedDataUrl, setConvertedDataUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const { showToast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Pilih file gambar valid.', 'error');
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    setOriginalFormat(file.type);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        imgRef.current = img;
        convert(img, targetFormat);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const convert = (img: HTMLImageElement, fmt: TargetFormat) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (fmt === 'image/jpeg') {
      // JPEG doesn't support transparency, fill with clean white
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL(fmt, 0.92);
    setConvertedDataUrl(dataUrl);

    const head = `data:${fmt};base64,`;
    const bytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
    setConvertedSize(bytes);
  };

  const handleFormatChange = (fmt: TargetFormat) => {
    setTargetFormat(fmt);
    if (imgRef.current) {
      convert(imgRef.current, fmt);
    }
  };

  const getExtension = (fmt: TargetFormat) => {
    switch (fmt) {
      case 'image/png':
        return 'png';
      case 'image/jpeg':
        return 'jpg';
      case 'image/webp':
        return 'webp';
    }
  };

  const handleDownload = () => {
    if (!convertedDataUrl) return;
    const ext = getExtension(targetFormat);
    const a = document.createElement('a');
    a.href = convertedDataUrl;
    a.download = `${fileName}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Gambar berhasil diunduh sebagai .${ext}!`, 'success');
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
              Pilih Gambar yang Ingin Diubah Formatnya
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Ubah antara PNG, JPEG, dan WebP secara instan di browser.
            </p>
          </div>
          <label className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors shadow-xs">
            Buka File
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
                Pilih Format Tujuan
              </h4>
              <label className="text-xs text-blue-600 hover:underline cursor-pointer">
                Ganti File
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'image/webp', label: 'WebP (Modern)', desc: 'Ukuran paling hemat' },
                { id: 'image/png', label: 'PNG', desc: 'Mendukung transparansi' },
                { id: 'image/jpeg', label: 'JPEG / JPG', desc: 'Kompatibilitas luas' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleFormatChange(item.id as TargetFormat)}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    targetFormat === item.id
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-500 text-blue-900 dark:text-blue-100 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>Format Asal:</span>
                <span className="font-mono">{originalFormat}</span>
              </div>
              <div className="flex justify-between">
                <span>Ukuran Hasil Baru:</span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {formatFileSize(convertedSize)}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                Unduh Gambar (.{getExtension(targetFormat)})
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center min-h-[300px]">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 self-start">
              Pratinjau Hasil Konversi
            </span>
            {convertedDataUrl ? (
              <img
                src={convertedDataUrl}
                alt="Pratinjau Hasil Format"
                className="max-h-80 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 object-contain shadow-xs"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400 text-xs">
                <ImageIcon className="w-8 h-8 mb-2" />
                <span>Memproses format...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
