import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw } from 'lucide-react';

export const CaptionGenerator: React.FC = () => {
  const [topic, setTopic] = useState('Produk Baru');
  const [tone, setTone] = useState<'promo' | 'inspirational' | 'casual' | 'weekend'>('promo');

  const captionTemplates: Record<string, { text: string; tags: string }[]> = {
    promo: [
      {
        text: `Kabar gembira buat kalian! 🔥 Kini hadir yang ditunggu-tunggu: ${topic}.\nDapatkan penawaran spesial terbatas hanya hari ini. Jangan sampai kehabisan ya!`,
        tags: '#DiskonSpesial #PromoHariIni #BelanjaHemat #ProdukBaru #LimitedOffer',
      },
      {
        text: `Upgrade hari-harimu dengan ${topic} terbaik! ✨\nKualitas nomor satu dengan harga yang ramah di kantong. Klik tautan di bio untuk checkout sekarang juga!`,
        tags: '#RekomendasiProduk #MustHave #OnlineShopID #PromoSpesial',
      },
    ],
    inspirational: [
      {
        text: `Langkah kecil hari ini adalah awal dari pencapaian besar di masa depan. Tetap konsisten dan percaya pada prosesmu. Jangan pernah menyerah! ✨💪`,
        tags: '#MotivasiHarian #InspirasiHidup #SemangatPagi #SelfGrowth #FokusTujuan',
      },
      {
        text: `Kesuksesan bukan tentang seberapa cepat kamu sampai, tetapi tentang seberapa kuat kamu bertahan saat menghadapi tantangan. 🌟`,
        tags: '#KutipanBijak #MindsetPositif #BelajarBertumbuh #SuksesMuda',
      },
    ],
    casual: [
      {
        text: `Ngopi dulu biar pikiran tetap adem. Ada yang samaan suka ngopi sambil santai sore kayak gini? ☕✨ Drop emoji favorit kalian di bawah ya!`,
        tags: '#NgopiSantai #VibesSore #MoodHarian #CeritaHariIni #DailyLife',
      },
      {
        text: `Kadang hal paling sederhana adalah hal yang paling bikin bahagia. Jangan lupa bersyukur untuk hari ini ya teman-teman! 🌿`,
        tags: '#Bersyukur #Keseharian #FotoHariIni #SantaiSejenak',
      },
    ],
    weekend: [
      {
        text: `Akhir pekan telah tiba! Waktunya istirahat sejenak dari rutinitas dan recharge energimu bareng orang-orang tersayang. Happy weekend semuanya! 🎉🌴`,
        tags: '#HappyWeekend #LiburanAkhirPekan #RechargeEnergy #HealingTime',
      },
      {
        text: `Rencana weekend kalian ngapain aja nih? Rebahan di rumah atau jalan-jalan santai? Cerita di kolom komentar dong! 👇✨`,
        tags: '#WeekendVibes #SantaiDiRumah #ExploreAkhirPekan #FamilyTime',
      },
    ],
  };

  const currentList = captionTemplates[tone] || captionTemplates.promo;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Tema / Suasana Konten
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'promo', label: 'Promosi / Jualan' },
                { id: 'inspirational', label: 'Inspirasi / Motivasi' },
                { id: 'casual', label: 'Santai / Keseharian' },
                { id: 'weekend', label: 'Akhir Pekan (Weekend)' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id as 'promo' | 'inspirational' | 'casual' | 'weekend')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    tone === t.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Topik Pembahasan
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="Contoh: Sepatu Olahraga, Kafe Baru, Skincare"
            />
          </div>
        </div>
      </div>

      {/* Captions list */}
      <div className="space-y-4">
        {currentList.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3"
          >
            <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
              {item.text}
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                {item.tags}
              </span>
              <CopyButton
                text={`${item.text}\n\n${item.tags}`}
                label="Salin Teks & Hashtag"
                variant="primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
