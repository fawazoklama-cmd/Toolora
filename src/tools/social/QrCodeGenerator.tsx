import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode as QrIcon } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

type QrType = 'url' | 'text' | 'whatsapp' | 'wifi';

export const QrCodeGenerator: React.FC = () => {
  const [type, setType] = useState<QrType>('url');
  const [qrValue, setQrValue] = useState('https://toolora.app');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#FFFFFF');
  const [size, setSize] = useState(300);

  // WhatsApp specific states
  const [waNumber, setWaNumber] = useState('6281234567890');
  const [waMessage, setWaMessage] = useState('Halo! Saya tertarik dengan penawaran Anda.');

  // Wi-Fi specific states
  const [wifiSsid, setWifiSsid] = useState('MyHomeWiFi');
  const [wifiPassword, setWifiPassword] = useState('rahasia123');
  const [wifiType, setWifiType] = useState('WPA');

  const { showToast } = useToast();

  // Compute payload based on active type
  const payload = React.useMemo(() => {
    switch (type) {
      case 'url':
      case 'text':
        return qrValue;
      case 'whatsapp': {
        const cleanNum = waNumber.replace(/[^0-9]/g, '');
        return `https://wa.me/${cleanNum}?text=${encodeURIComponent(waMessage)}`;
      }
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiType};P:${wifiPassword};;`;
      default:
        return qrValue;
    }
  }, [type, qrValue, waNumber, waMessage, wifiSsid, wifiPassword, wifiType]);

  useEffect(() => {
    let isCancelled = false;
    const generate = async () => {
      if (!payload.trim()) {
        setQrDataUrl('');
        return;
      }
      try {
        const url = await QRCode.toDataURL(payload, {
          width: size,
          margin: 2,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        });
        if (!isCancelled) {
          setQrDataUrl(url);
        }
      } catch {
        // error
      }
    };
    generate();
    return () => {
      isCancelled = true;
    };
  }, [payload, darkColor, lightColor, size]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `toolora_qrcode_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('QR Code berhasil diunduh sebagai gambar PNG!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Configuration */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
          {/* Tabs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Jenis Konten QR Code
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'url', label: 'Tautan URL' },
                { id: 'text', label: 'Teks Biasa' },
                { id: 'whatsapp', label: 'WhatsApp' },
                { id: 'wifi', label: 'Wi-Fi' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setType(t.id as QrType)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border text-center transition-colors cursor-pointer ${
                    type === t.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Input forms */}
          {type === 'url' && (
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                Alamat Web URL (https://...)
              </label>
              <input
                type="url"
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                className="w-full px-3.5 py-2.5 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                placeholder="https://example.com"
              />
            </div>
          )}

          {type === 'text' && (
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                Teks Informasi Bebas
              </label>
              <textarea
                rows={3}
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                className="w-full p-3 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                placeholder="Tulis pesan atau teks apa saja..."
              />
            </div>
          )}

          {type === 'whatsapp' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Nomor WhatsApp (dengan kode negara, contoh 62812...)
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full px-3.5 py-2 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  placeholder="6281234567890"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Pesan Teks Otomatis
                </label>
                <textarea
                  rows={2}
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
          )}

          {type === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Nama Jaringan (SSID Wi-Fi)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Kata Sandi (Password Wi-Fi)
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  className="w-full px-3 py-2 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
          )}

          {/* Color & Size customization */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Warna Titik QR</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="w-full px-2 py-1 font-mono text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 uppercase"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Warna Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="w-full px-2 py-1 font-mono text-xs rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 uppercase"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output & Preview */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center space-y-6 min-h-[360px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start">
            Pratinjau QR Code Siap Pindai
          </span>

          {qrDataUrl ? (
            <div className="p-4 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center">
              <img src={qrDataUrl} alt="QR Code Hasil" className="w-56 h-56 object-contain" />
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 text-xs">
              <QrIcon className="w-12 h-12 mb-2" />
              <span>Masukkan data untuk membuat QR Code</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Unduh QR Code (PNG)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
