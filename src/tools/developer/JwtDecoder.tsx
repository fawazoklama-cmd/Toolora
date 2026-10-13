import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { ShieldAlert, AlertCircle } from 'lucide-react';

export const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkZhd2F6IE9rbGFtYSIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTcxNjIzOTAyMn0.4z2k9h7-example_signature'
  );

  const decoded = React.useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split('.');
    if (parts.length < 2) {
      return { error: 'Token JWT harus memiliki minimal 2 bagian yang dipisahkan titik (.)' };
    }

    try {
      // Base64Url decode
      const decodeB64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        const bin = atob(base64);
        const bytes = Uint8Array.from(bin, (m) => m.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
      };

      const header = decodeB64Url(parts[0]);
      const payload = decodeB64Url(parts[1]);

      let expirationDate: string | null = null;
      let issuedAtDate: string | null = null;
      let isExpired = false;

      if (payload.exp && typeof payload.exp === 'number') {
        const expMs = payload.exp * 1000;
        expirationDate = new Date(expMs).toLocaleString('id-ID');
        isExpired = Date.now() > expMs;
      }

      if (payload.iat && typeof payload.iat === 'number') {
        issuedAtDate = new Date(payload.iat * 1000).toLocaleString('id-ID');
      }

      return {
        header,
        payload,
        signature: parts[2] || '',
        expirationDate,
        issuedAtDate,
        isExpired,
        error: null,
      };
    } catch {
      return { error: 'Gagal mendecode payload atau header JWT. Pastikan format Base64Url valid.' };
    }
  }, [token]);

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <strong>Catatan Keamanan:</strong> Alat ini mendekode header dan payload JWT secara lokal di browser Anda untuk keperluan debugging. Alat ini <em>tidak memverifikasi tanda tangan kriptografi (signature)</em> karena verifikasi memerlukan secret key yang disimpan di server.
        </div>
      </div>

      {/* Input */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            String Token JWT
          </label>
          <button onClick={() => setToken('')} className="text-xs text-slate-400 hover:text-red-500">
            Kosongkan
          </button>
        </div>
        <textarea
          rows={4}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-3.5 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          placeholder="Tempelkan token JWT di sini (header.payload.signature)..."
        />
      </div>

      {/* Output */}
      {decoded && (
        <>
          {decoded.error ? (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{decoded.error}</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Header */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Header (Algorithm & Token Type)
                  </span>
                  <CopyButton
                    text={JSON.stringify(decoded.header, null, 2)}
                    label="Salin Header"
                    variant="subtle"
                  />
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
              </div>

              {/* Payload */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Payload (Claims Data)
                  </span>
                  <CopyButton
                    text={JSON.stringify(decoded.payload, null, 2)}
                    label="Salin Payload"
                    variant="primary"
                  />
                </div>
                <pre className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>

                {decoded.expirationDate && (
                  <div className="pt-2 text-xs flex justify-between items-center">
                    <span className="text-slate-500">Kedaluwarsa (exp):</span>
                    <span
                      className={`font-mono font-medium ${
                        decoded.isExpired ? 'text-red-500' : 'text-emerald-500'
                      }`}
                    >
                      {decoded.expirationDate} ({decoded.isExpired ? 'Kadaluwarsa' : 'Masih Berlaku'})
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
