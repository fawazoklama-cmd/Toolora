import React, { useState } from 'react';
import { Users, Shuffle } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';

export const TeamGenerator: React.FC = () => {
  const [membersText, setMembersText] = useState(
    'Andi\nBudi\nCitra\nDewi\nEko\nFajar\nGilang\nHana\nIndra\nJoko'
  );
  const [numTeams, setNumTeams] = useState(2);
  const [teams, setTeams] = useState<{ id: number; members: string[] }[]>([]);

  const handleGenerate = () => {
    const list = membersText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (list.length === 0) return;

    // Shuffle list using Fisher-Yates
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Split into N teams
    const count = Math.min(shuffled.length, Math.max(2, numTeams));
    const resultTeams: { id: number; members: string[] }[] = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      members: [],
    }));

    shuffled.forEach((person, index) => {
      const teamIndex = index % count;
      resultTeams[teamIndex].members.push(person);
    });

    setTeams(resultTeams);
  };

  const getExportText = () => {
    return teams
      .map((t) => `=== Tim ${t.id} ===\n${t.members.map((m) => `• ${m}`).join('\n')}`)
      .join('\n\n');
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Daftar Nama Anggota (Satu Nama Per Baris)
            </label>
            <textarea
              rows={6}
              value={membersText}
              onChange={(e) => setMembersText(e.target.value)}
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Bagi Menjadi Berapa Tim?
              </label>
              <input
                type="number"
                min="2"
                max="20"
                value={numTeams}
                onChange={(e) => setNumTeams(parseInt(e.target.value) || 2)}
                className="w-full px-3 py-2 font-mono text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs"
            >
              <Shuffle className="w-3.5 h-3.5" />
              Bagi Tim Sekarang
            </button>
          </div>
        </div>
      </div>

      {/* Generated Teams */}
      {teams.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Hasil Pembagian {teams.length} Tim
            </span>
            <CopyButton text={getExportText()} label="Salin Semua Tim" variant="primary" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                    Tim {t.id}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {t.members.length} anggota
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {t.members.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
