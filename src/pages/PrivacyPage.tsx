import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Database, HardDrive, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Breadcrumbs items={[{ label: 'Kebijakan Privasi' }]} />

      <div className="space-y-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Kebijakan Privasi & Penggunaan Data
        </h1>
        <p className="text-xs text-slate-500">
          Terakhir diperbarui: Oktober 2026
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          Privasi Anda adalah prioritas mutlak di Toolora. Kami percaya bahwa utilitas harian seperti kalkulator, format JSON, kompresor gambar, dan generator kata sandi tidak memerlukan pengumpulan data pribadi pengguna.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          1. Data Apa Saja yang Disimpan?
        </h3>
        <p>
          Toolora <strong>hanya menyimpan preferensi non-sensitif</strong> langsung di peramban web Anda menggunakan teknologi <code>LocalStorage</code> browser:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li><strong>Preferensi Tema:</strong> Pilihan mode terang (light), gelap (dark), atau sistem.</li>
          <li><strong>Daftar Favorit:</strong> ID alat yang Anda tandai dengan bintang untuk kemudahan akses.</li>
          <li><strong>Riwayat Kunjungan:</strong> Daftar nama dan ikon alat yang baru saja dibuka (maksimal 50 item).</li>
        </ul>
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300">
          <strong>Yang TIDAK Pernah Kami Simpan:</strong> Kami TIDAK PERNAH menyimpan kata sandi yang dihasilkan, token JWT, kunci API, dokumen teks, hasil kalkulator, atau foto gambar ke dalam LocalStorage maupun server.
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          2. Pemrosesan Data di Sisi Klien (Client-Side)
        </h3>
        <p>
          Seluruh operasi (seperti pemformatan JSON, hashing SHA-256, kompresi gambar Canvas API, encode/decode Base64, dan perhitungan matematika) dijalankan 100% menggunakan mesin JavaScript di peramban lokal perangkat Anda. Berkas gambar dan teks Anda tidak pernah diunggah (upload) ke server eksternal.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          3. Kebutuhan Koneksi Internet
        </h3>
        <p>
          Sebagian besar alat di Toolora dapat terus berjalan tanpa koneksi internet setelah halaman selesai dimuat di peramban Anda. Tidak ada API pihak ketiga berbayar yang dibutuhkan untuk menjalankan fitur-fitur inti.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          4. Cara Menghapus Data Anda
        </h3>
        <p>
          Karena data disimpan di <code>LocalStorage</code> peramban Anda:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>Anda dapat membersihkan riwayat atau mereset preferensi kapan saja melalui halaman <Link to="/settings" className="text-blue-600 underline">Pengaturan</Link>.</li>
          <li>Menghapus riwayat atau data situs web di peramban (Clear Browsing Data) Anda akan secara otomatis menghapus semua preferensi tersimpan.</li>
        </ul>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          5. Batasan Penyimpanan Lokal
        </h3>
        <p>
          Data tersimpan di perangkat lokal tidak disinkronisasikan antarperangkat karena Toolora tidak memiliki akun pengguna atau database terpusat. Jika Anda berganti komputer atau peramban, Anda dapat menggunakan fitur <em>Ekspor Cadangan</em> di halaman Pengaturan untuk memindahkan daftar favorit Anda.
        </p>
      </div>
    </div>
  );
};
