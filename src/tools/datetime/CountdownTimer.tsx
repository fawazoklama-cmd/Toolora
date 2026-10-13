import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CountdownTimer: React.FC = () => {
  const [initialMinutes, setInitialMinutes] = useState(5);
  const [initialSeconds, setInitialSeconds] = useState(0);

  const [timeLeft, setTimeLeft] = useState(300); // 5 mins in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const { showToast } = useToast();

  const totalTime = initialMinutes * 60 + initialSeconds;

  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // 880Hz A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // audio error
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playBeep();
            showToast('Waktu habis! Timer selesai.', 'info');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(totalTime);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center space-y-6">
        {/* Timer display */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-blue-600 transition-all duration-300"
              strokeWidth="6"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="font-mono text-5xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs text-slate-400 mt-1">
              {isRunning ? 'Berjalan...' : timeLeft === 0 ? 'Selesai!' : 'Siap'}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {isRunning ? (
            <button
              onClick={handlePause}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold rounded-xl bg-amber-500 hover:bg-amber-600 text-white cursor-pointer shadow-xs"
            >
              <Pause className="w-4 h-4" />
              Jeda
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-xs"
            >
              <Play className="w-4 h-4" />
              {timeLeft === 0 ? 'Mulai Ulang' : 'Mulai'}
            </button>
          )}

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        {/* Preset quick times */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 5, 10, 15, 25].map((mins) => (
            <button
              key={mins}
              onClick={() => {
                setInitialMinutes(mins);
                setInitialSeconds(0);
                setIsRunning(false);
                setTimeLeft(mins * 60);
              }}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              {mins} Menit
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
