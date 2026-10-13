import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';

export const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - time;
      const tick = () => {
        setTime(Date.now() - startTimeRef.current);
        requestRef.current = requestAnimationFrame(tick);
      };
      requestRef.current = requestAnimationFrame(tick);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (time > 0) {
      setLaps((prev) => [time, ...prev]);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col items-center justify-center space-y-6">
        <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
          {formatTime(time)}
        </div>

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
              Mulai
            </button>
          )}

          <button
            onClick={handleLap}
            disabled={!isRunning}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
          >
            <Flag className="w-4 h-4" />
            Catat Lap
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Laps Table */}
      {laps.length > 0 && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Catatan Putaran (Laps)
            </h4>
            <CopyButton
              text={laps.map((l, i) => `Lap ${laps.length - i}: ${formatTime(l)}`).join('\n')}
              label="Salin Laps"
              variant="subtle"
            />
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-mono max-h-60 overflow-y-auto">
            {laps.map((lapMs, idx) => (
              <div key={idx} className="py-2.5 flex justify-between items-center">
                <span className="text-slate-500 font-semibold">Lap {laps.length - idx}</span>
                <span className="font-bold tabular-nums text-slate-900 dark:text-slate-100">
                  {formatTime(lapMs)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
