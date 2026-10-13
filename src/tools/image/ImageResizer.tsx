import React, { useState, useRef } from 'react';
import { Upload, Download, Lock, Unlock, Image as ImageIcon } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { formatFileSize } from '../../lib/formatters';

export const ImageResizer: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image');
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<number>(0);

  const [newWidth, setNewWidth] = useState<number>(0);
  const [newHeight, setNewHeight] = useState<number>(0);
  const [lockRatio, setLockRatio] = useState<boolean>(true);

  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);
  const [resizedSize, setResizedSize] = useState<number>(0);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const { showToast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Harap pilih file gambar (JPG, PNG, WebP).', 'error');
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
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setNewWidth(img.width);
        setNewHeight(img.height);
        imgRef.current = img;
        processResize(img, img.width, img.height);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const processResize = (img: HTMLImageElement, w: number, h: number) => {
    if (w <= 0 || h <= 0) return;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, w, h);
    const dataUrl = canvas.toDataURL('image/png');
    setResizedDataUrl(dataUrl);

    // Approximate byte length from base64
    const head = 'data:image/png;base64,';
    const bytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
    setResizedSize(bytes);
  };

  const handleWidthChange = (val: number) => {
    setNewWidth(val);
    if (lockRatio && originalWidth > 0 && imgRef.current) {
      const calculatedHeight = Math.round((val / originalWidth) * originalHeight);
      setNewHeight(calculatedHeight);
      processResize(imgRef.current, val, calculatedHeight);
    } else if (imgRef.current) {
      processResize(imgRef.current, val, newHeight);
    }
  };

  const handleHeightChange = (val: number) => {
    setNewHeight(val);
    if (lockRatio && originalHeight > 0 && imgRef.current) {
      const calculatedWidth = Math.round((val / originalHeight) * originalWidth);
      setNewWidth(calculatedWidth);
      processResize(imgRef.current, calculatedWidth, val);
    } else if (imgRef.current) {
      processResize(imgRef.current, newWidth, val);
    }
  };

  const handleDownload = () => {
    if (!resizedDataUrl) return;
    const a = document.createElement('a');
    a.href = resizedDataUrl;
    a.download = `${fileName}_resized_${newWidth}x${newHeight}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Gambar berhasil diunduh!', 'success');
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
              Pilih Foto atau Gambar dari Perangkat
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Mendukung PNG, JPEG, WebP. Diproses 100% lokal di browser Anda.
            </p>
          </div>
          <label className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-colors shadow-xs">
            Buka File Gambar
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
                Pengaturan Dimensi Baru
              </h4>
              <label className="text-xs text-blue-600 hover:underline cursor-pointer">
                Ganti Gambar
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-500 flex justify-between">
              <span>Resolusi Asli:</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                {originalWidth} &times; {originalHeight} px ({formatFileSize(originalSize)})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Lebar Baru (Width px)
                </label>
                <input
                  type="number"
                  min="10"
                  value={newWidth}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <button
                type="button"
                onClick={() => setLockRatio(!lockRatio)}
                className={`mt-5 p-2 rounded-lg border transition-colors cursor-pointer ${
                  lockRatio
                    ? 'bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-700 text-blue-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-400'
                }`}
                title={lockRatio ? 'Rasio Terkunci' : 'Rasio Bebas'}
              >
                {lockRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>

              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Tinggi Baru (Height px)
                </label>
                <input
                  type="number"
                  min="10"
                  value={newHeight}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>

            {/* Quick scaling buttons */}
            <div className="flex gap-2 pt-1">
              {[0.25, 0.5, 0.75, 1.5, 2].map((scale) => (
                <button
                  key={scale}
                  onClick={() => {
                    const w = Math.round(originalWidth * scale);
                    const h = Math.round(originalHeight * scale);
                    setNewWidth(w);
                    setNewHeight(h);
                    if (imgRef.current) processResize(imgRef.current, w, h);
                  }}
                  className="px-2.5 py-1 text-xs rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  {scale * 100}%
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">
                Estimasi ukuran: {formatFileSize(resizedSize)}
              </span>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                Unduh Gambar (.png)
              </button>
            </div>
          </div>

          {/* Preview Canvas Display */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center min-h-[300px]">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 self-start">
              Pratinjau Hasil ({newWidth} &times; {newHeight} px)
            </span>
            {resizedDataUrl ? (
              <img
                src={resizedDataUrl}
                alt="Pratinjau Hasil Resize"
                className="max-h-80 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 object-contain shadow-xs"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400 text-xs">
                <ImageIcon className="w-8 h-8 mb-2" />
                <span>Memproses gambar...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
