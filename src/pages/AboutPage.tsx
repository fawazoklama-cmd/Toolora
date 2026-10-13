import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Wrench, ShieldCheck, Zap, Laptop, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <Breadcrumbs items={[{ label: 'Tentang Toolora' }]} />

      <div className="space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
          <Wrench className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Tentang Toolora
        </h1>
        <p className="text-base text-blue-600 dark:text-blue-400 font-medium">
          &quot;Everything You Need, One Place.&quot;
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>
          <strong>Toolora</strong> adalah platform kumpulan alat dan utilitas online praktis yang dirancang untuk membantu pengguna menyelesaikan berbagai pekerjaan digital sehari-hari secara cepat, sederhana, dan efisien dalam satu tempat tanpa perlu berpindah-pindah banyak situs web.
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 pt-2">
          Mengapa Kami Membangun Toolora?
        </h3>
        <p>
          Seringkali untuk tugas sederhana seperti menghitung persentase diskon, memformat JSON, mengecek kontras warna, atau mengubah ukuran foto, kita harus membuka berbagai situs web terpisah yang dipenuhi iklan mengganggu atau mewajibkan login akun. Toolora hadir menghilangkan kerumitan tersebut.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 not-prose">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">100% Pemrosesan Lokal</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Semua algoritma dijalankan langsung pada peramban web pengguna tanpa upload berkas ke server.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Tanpa Registrasi Akun</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Buka aplikasi langsung gunakan kapan saja secara instan tanpa perlu mendaftar atau mengingat password.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
            <Laptop className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Cepat & Responsif</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Didesain minimalis dan optimal di layar komputer, tablet, maupun ponsel pintar Anda.
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 pt-4">
          Siapa Pengguna Toolora?
        </h3>
        <ul className="list-disc pl-5 space-y-1.5 text-xs">
          <li><strong>Pelajar & Mahasiswa:</strong> Untuk kalkulasi matematika, analisis data, pembuatan referensi, dan tugas harian.</li>
          <li><strong>Developer & Programmer:</strong> Untuk format JSON, decode JWT, generate UUID v4, regex tester, dan konversi encoding.</li>
          <li><strong>Kreator Konten & Pengelola Sosmed:</strong> Untuk ide caption, pembuat bio profil, generator username, dan teks aesthetic.</li>
          <li><strong>Pemilik Bisnis Kecil & Umum:</strong> Untuk kalkulasi diskon belanja, pembagi tagihan (split bill), dan hitung margin keuntungan.</li>
        </ul>

        <div className="pt-6 not-prose flex justify-start">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            Mulai Gunakan Alat Toolora <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
