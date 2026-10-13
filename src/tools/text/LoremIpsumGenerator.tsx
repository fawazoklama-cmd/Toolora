import React, { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
  'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum'
];

export const LoremIpsumGenerator: React.FC = () => {
  const [count, setCount] = useState('3');
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);

  const generateLorem = (): string => {
    const n = Math.min(100, Math.max(1, parseInt(count) || 1));

    if (type === 'words') {
      const words: string[] = [];
      if (startWithLorem) {
        words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
      }
      while (words.length < n) {
        const rand = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
        words.push(words.length === 0 ? rand.charAt(0).toUpperCase() + rand.slice(1) : rand);
      }
      return words.slice(0, n).join(' ') + '.';
    }

    if (type === 'sentences') {
      const sentences: string[] = [];
      for (let i = 0; i < n; i++) {
        const sLen = Math.floor(Math.random() * 8) + 8;
        const words: string[] = [];
        if (i === 0 && startWithLorem) {
          words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit');
        } else {
          for (let j = 0; j < sLen; j++) {
            words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
          }
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
        sentences.push(words.join(' ') + '.');
      }
      return sentences.join(' ');
    }

    // Paragraphs
    const paras: string[] = [];
    for (let p = 0; p < n; p++) {
      const numSentences = Math.floor(Math.random() * 3) + 4;
      const sents: string[] = [];
      for (let s = 0; s < numSentences; s++) {
        const sLen = Math.floor(Math.random() * 7) + 7;
        const words: string[] = [];
        if (p === 0 && s === 0 && startWithLorem) {
          words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet,', 'consectetur', 'adipiscing', 'elit');
        } else {
          for (let w = 0; w < sLen; w++) {
            words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
          }
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
        sents.push(words.join(' ') + '.');
      }
      paras.push(sents.join(' '));
    }
    return paras.join('\n\n');
  };

  const [generatedText, setGeneratedText] = useState(() => generateLorem());

  const handleGenerate = () => {
    setGeneratedText(generateLorem());
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Jumlah:
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-20 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  type === t
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {t === 'paragraphs' ? 'Paragraf' : t === 'sentences' ? 'Kalimat' : 'Kata'}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer ml-auto">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Mulai dengan &quot;Lorem ipsum&quot;</span>
          </label>

          <button
            onClick={handleGenerate}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          >
            Hasilkan Ulang
          </button>
        </div>

        <div className="pt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-500">Hasil Teks Dummy:</span>
            <CopyButton text={generatedText} label="Salin Lorem Ipsum" variant="primary" />
          </div>
          <textarea
            rows={10}
            readOnly
            value={generatedText}
            className="w-full p-4 font-serif text-sm leading-relaxed rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>
    </div>
  );
};
