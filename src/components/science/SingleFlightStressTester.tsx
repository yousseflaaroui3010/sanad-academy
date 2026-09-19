import React, { useState } from 'react';
import { Cpu, AlertTriangle, ShieldCheck, Play, RotateCcw } from 'lucide-react';
import { playHapticClick, playSuccessChime, playWarningThud } from '../../utils/soundEffects';

export const SingleFlightStressTester: React.FC = () => {
  const [mode, setMode] = useState<'with-mutex' | 'no-mutex'>('with-mutex');
  const [isRunning, setIsRunning] = useState(false);
  const [ramUsedGb, setRamUsedGb] = useState<number>(1.2);
  const [crashed, setCrashed] = useState(false);
  const [completedRequests, setCompletedRequests] = useState(0);

  const handleFireStressTest = () => {
    setIsRunning(true);
    setCrashed(false);
    setCompletedRequests(0);
    playHapticClick();

    if (mode === 'no-mutex') {
      // RAM spikes exponentially without mutex
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const currentRam = 1.2 + step * 1.8;
        setRamUsedGb(currentRam);
        setCompletedRequests(step * 3);

        if (currentRam >= 8.0) {
          clearInterval(interval);
          setCrashed(true);
          setIsRunning(false);
          playWarningThud();
        }
      }, 300);
    } else {
      // With Single-Flight mutex: RAM stays locked at 1.2GB
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setCompletedRequests(step * 5);
        if (step >= 4) {
          clearInterval(interval);
          setIsRunning(false);
          playSuccessChime();
        }
      }, 300);
    }
  };

  const handleReset = () => {
    setRamUsedGb(1.2);
    setCrashed(false);
    setCompletedRequests(0);
    setIsRunning(false);
    playHapticClick();
  };

  return (
    <div className="rounded-3xl border border-rose-500/30 bg-[#0d0912] text-rose-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400">
            <Cpu size={16} className="text-rose-400" />
            <span>Concurrency Science: Cache Stampede (Thundering Herd)</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            What happens when 20 simultaneous users query an uncached PyTorch embedding model
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              setMode('with-mutex');
              handleReset();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              mode === 'with-mutex'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            With Single-Flight Mutex
          </button>
          <button
            onClick={() => {
              setMode('no-mutex');
              handleReset();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              mode === 'no-mutex'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Naive Concurrent Load
          </button>
        </div>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-rose-950/30 border border-rose-800/40 p-3.5 text-xs text-rose-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🚰</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Single Water Tap Metaphor:</span>
          If 20 thirsty athletes all run to a single water tap at the exact same second, pushing each other violently breaks the pipe (RAM overflow). The Single-Flight pattern acts like an orderly coach: Person 1 fills a huge pitcher of water, and everyone drinks from the same pitcher safely!
        </div>
      </div>

      {/* RAM Meter Gauge */}
      <div className="rounded-2xl border border-white/10 bg-[#160e1c] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-200 flex items-center gap-2 font-mono">
            <span>Container RAM Utilization (Ceiling: 4.0 GB)</span>
          </span>
          <span className={`font-mono font-extrabold text-sm ${
            crashed ? 'text-rose-500 animate-pulse' : 'text-emerald-400'
          }`}>
            {crashed ? 'OOM KILLED (8.4 GB)' : `${ramUsedGb.toFixed(1)} GB / 4.0 GB`}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full rounded-full bg-black/40 overflow-hidden border border-white/10">
          <div
            className={`h-full transition-all duration-300 ${
              crashed
                ? 'bg-rose-600'
                : ramUsedGb > 3.0
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, (ramUsedGb / 4.0) * 100)}%` }}
          />
        </div>

        {/* Status Callout */}
        <div className="flex items-center justify-between text-[11px] font-sans pt-1">
          <div className="flex items-center gap-1.5 text-gray-300">
            {crashed ? (
              <AlertTriangle size={14} className="text-rose-500" />
            ) : (
              <ShieldCheck size={14} className="text-emerald-400" />
            )}
            <span>
              {crashed
                ? 'Linux Kernel sent SIGKILL (Signal 9). Container terminated instantaneously!'
                : mode === 'with-mutex'
                ? 'Single-flight lock acquired by Thread 1. Threads 2-20 queue safely without duplicating weights.'
                : 'Waiting for concurrent test trigger...'}
            </span>
          </div>

          <span className="font-mono text-gray-400">
            Completed: {completedRequests}/20 requests
          </span>
        </div>
      </div>

      {/* Test Controls & Explanatory Output */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white"
        >
          <RotateCcw size={12} />
          <span>Reset Tester</span>
        </button>

        <button
          onClick={handleFireStressTest}
          disabled={isRunning}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition shadow-sm ${
            mode === 'with-mutex'
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-rose-600 hover:bg-rose-500 text-white'
          }`}
        >
          <Play size={13} className={isRunning ? 'animate-spin' : ''} />
          <span>{isRunning ? 'Stressing Server...' : 'Fire 20 Concurrent Queries'}</span>
        </button>
      </div>
    </div>
  );
};
