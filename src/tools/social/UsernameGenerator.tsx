import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw } from 'lucide-react';

export const UsernameGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('fawaz');
  const [category, setCategory] = useState<'all' | 'aesthetic' | 'tech' | 'gamer'>('all');

  const generateUsernames = (): string[] => {
    const raw = keyword.trim().toLowerCase().replace(/[^a-z0-9]/g, '') || 'user';
    const list: string[] = [];

    // General variations
    list.push(`the${raw}`);
    list.push(`real${raw}`);
    list.push(`${raw}official`);
    list.push(`${raw}.daily`);
    list.push(`${raw}_id`);
    list.push(`its.${raw}`);
    list.push(`${raw}hub`);
    list.push(`${raw}craft`);

    // Aesthetic
    list.push(`soft.${raw}`);
    list.push(`dear${raw}`);
    list.push(`${raw}.vibes`);
    list.push(`${raw}clouds`);
    list.push(`lunar.${raw}`);
    list.push(`${raw}.co`);

    // Tech
    list.push(`${raw}dev`);
    list.push(`${raw}.codes`);
    list.push(`${raw}tech`);
    list.push(`${raw}_studio`);
    list.push(`buildwith${raw}`);

    // Gamer
    list.push(`${raw}plays`);
    list.push(`pro_${raw}`);
    list.push(`${raw}_gg`);
    list.push(`${raw}zone`);

    return list;
  };

  const [usernames, setUsernames] = useState<string[]>(() => generateUsernames());

  const handleRegenerate = () => {
    setUsernames(generateUsernames());
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Kata Kunci Nama / Brand
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              placeholder="Contoh: alex, boba, pixel"
            />
          </div>

          <button
            onClick={handleRegenerate}
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Hasilkan Ulang
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {usernames.map((u, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between"
          >
            <span className="font-mono text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
              @{u}
            </span>
            <CopyButton text={`@${u}`} label="Salin" variant="subtle" />
          </div>
        ))}
      </div>
    </div>
  );
};
