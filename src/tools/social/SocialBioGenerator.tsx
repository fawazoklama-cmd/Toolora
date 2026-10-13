import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw } from 'lucide-react';

export const SocialBioGenerator: React.FC = () => {
  const [role, setRole] = useState('creator');
  const [name, setName] = useState('Alex');
  const [niche, setNiche] = useState('Teknologi & Produktivitas');
  const [cta, setCta] = useState('Cek link di bawah 👇');

  const templates: Record<string, string[]> = {
    creator: [
      `👋 Hai, saya ${name}!\n✨ Berbagi tips seputar ${niche}\n🚀 Membantu kamu berkembang lebih cepat\n🔗 ${cta}`,
      `📍 Berfokus pada ${niche}\n💡 Belajar & bereksplorasi setiap hari\n📩 Kolaborasi via DM\n${cta}`,
      `☕ Pecinta kopi & kreator ${niche}\n🎯 Konten harian untuk inspirasimu\n👇 Jangan lupa klik tautan:\n${cta}`,
    ],
    business: [
      `🛍️ ${name} Official Store\n⭐ Spesialis ${niche} berkualitas tinggi\n📦 Pengiriman ke seluruh Indonesia\n👇 Belanja praktis melalui link:\n${cta}`,
      `✨ Solusi terbaik untuk kebutuhan ${niche}\n💯 100% Terpercaya & Bergaransi\n💬 Tanya admin langsung:\n${cta}`,
    ],
    professional: [
      `💼 ${name} | ${niche} Specialist\n📈 Membantu bisnis bertumbuh secara terukur\n🌐 Portofolio & Jasa konsultasi:\n${cta}`,
      `🎯 Passionate about ${niche}\n🤝 Terbuka untuk diskusi proyek & mentoring\n👇 Kontak saya di sini:\n${cta}`,
    ],
    minimalist: [
      `${name} · ${niche}\nKurasi hal-hal bermanfaat.\n${cta}`,
      `Less is more. ${niche}.\n${cta}`,
    ],
  };

  const getBios = () => templates[role] || templates.creator;
  const [bioList, setBioList] = useState<string[]>(() => getBios());

  const handleRegenerate = () => {
    setBioList(getBios());
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Kategori Profil
            </label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setTimeout(handleRegenerate, 50);
              }}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <option value="creator">Kreator Konten</option>
              <option value="business">Toko Online / Bisnis</option>
              <option value="professional">Profesional / Portofolio</option>
              <option value="minimalist">Minimalis / Estetik</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Nama Anda / Brand
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Bidang / Topik (Niche)
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Call to Action (CTA)
            </label>
            <input
              type="text"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleRegenerate}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Perbarui Template
          </button>
        </div>
      </div>

      {/* Bio Cards list */}
      <div className="space-y-4">
        {bioList.map((bio, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="text-sm font-sans whitespace-pre-line text-slate-800 dark:text-slate-200 leading-relaxed">
              {bio}
            </div>
            <CopyButton text={bio} label="Salin Bio" variant="primary" />
          </div>
        ))}
      </div>
    </div>
  );
};
