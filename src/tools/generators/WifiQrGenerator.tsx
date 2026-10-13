import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Wifi } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';
import { useToast } from '../../context/ToastContext';

export const WifiQrGenerator: React.FC = () => {
  const [ssid, setSsid] = useState('Kedai Kopi Santai');
  const [password, setPassword] = useState('kopienak2026');
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [hidden, setHidden] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const { showToast } = useToast();

  const wifiPayload = `WIFI:S:${ssid};T:${encryption};P:${encryption === 'nopass' ? '' : password};H:${hidden ? 'true' : 'false'};;`;

  useEffect(() => {
    let isCancelled = false;
    const generate = async () => {
      if (!ssid.trim()) {
        setQrDataUrl('');
        return;
      }
      try {
        const url = await QRCode.toDataURL(wifiPayload, {
          width: 320,
          margin: 2,
        });
        if (!isCancelled) setQrDataUrl(url);
      } catch {
        // error
      }
    };
    generate();
    return () => {
      isCancelled = true;
    };
  }, [wifiPayload, ssid]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `wifi_qr_${ssid.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('QR Code Wi-Fi berhasil diunduh!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Nama Jaringan Wi-Fi (SSID)
            </label>
            <input
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="Nama Wi-Fi..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Kata Sandi (Password Wi-Fi)
            </label>
            <input
              type="text"
              disabled={encryption === 'nopass'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 font-mono text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 disabled:opacity-50"
              placeholder="Kata sandi..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Jenis Keamanan
            </label>
            <select
              value={encryption}
              onChange={(e) => setEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="WPA">WPA / WPA2 / WPA3 (Standar Kebanyakan Router)</option>
              <option value="WEP">WEP (Router Lama)</option>
              <option value="nopass">Tanpa Sandi (Jaringan Terbuka / Open)</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Jaringan Wi-Fi Tersembunyi (Hidden SSID)</span>
          </label>
        </div>

        {/* QR Display */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center space-y-6 min-h-[360px]">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 self-start">
            Pratinjau QR Code Wi-Fi
          </span>

          {qrDataUrl ? (
            <div className="p-4 rounded-2xl bg-white shadow-md border border-slate-200 flex flex-col items-center">
              <img src={qrDataUrl} alt="Wi-Fi QR Code" className="w-56 h-56 object-contain" />
              <div className="text-center mt-2">
                <span className="text-xs font-bold text-slate-900 block">{ssid}</span>
                <span className="text-[11px] text-slate-500 font-mono">Scan untuk langsung konek</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 text-xs">
              <Wifi className="w-12 h-12 mb-2" />
              <span>Ketik nama Wi-Fi untuk menampilkan QR</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Unduh QR Gambar (PNG)
            </button>
            <CopyButton text={wifiPayload} label="Salin Kode" variant="secondary" />
          </div>
        </div>
      </div>
    </div>
  );
};
