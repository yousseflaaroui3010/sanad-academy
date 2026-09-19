import React, { useState } from 'react';
import { Server, AlertTriangle, ShieldCheck, Play, RotateCcw } from 'lucide-react';
import { playHapticClick, playSuccessChime, playWarningThud } from '../../utils/soundEffects';

export const CgroupsOomSimulator: React.FC = () => {
  const [ramMb, setRamMb] = useState<number>(400); // Start at 400MB
  const [cgroupsCeilingMb] = useState<number>(1024); // 1GB Railway container limit
  const [state, setState] = useState<'normal' | 'sigkill' | 'recovered'>('normal');

  const handleSpikeRam = () => {
    setState('normal');
    playHapticClick();

    // RAM climbs to 1200MB, breaching the 1024MB cgroups ceiling
    setRamMb(1250);
    setTimeout(() => {
      setState('sigkill');
      playWarningThud();
    }, 500);
  };

  const handleRunRecovery = () => {
    setRamMb(420);
    setState('recovered');
    playSuccessChime();
  };

  const handleReset = () => {
    setRamMb(400);
    setState('normal');
    playHapticClick();
  };

  return (
    <div className="rounded-3xl border border-red-500/30 bg-[#12080a] text-red-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400">
            <Server size={16} className="text-red-400" />
            <span>Linux cgroups v2 & SIGKILL (Signal 9) OOM Semantics</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Why Python try...except blocks are mathematically powerless against the Linux kernel OOM Killer
          </p>
        </div>

        <div className="flex items-center gap-2">
          {state === 'sigkill' ? (
            <button
              onClick={handleRunRecovery}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition"
            >
              <ShieldCheck size={13} />
              <span>Boot & Run recovery.py</span>
            </button>
          ) : (
            <button
              onClick={handleSpikeRam}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-xs transition"
            >
              <Play size={12} />
              <span>Spike RAM to 1.2 GB</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
            title="Reset Simulator"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-red-950/30 border border-red-800/40 p-3.5 text-xs text-red-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🪓</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Guillotine Metaphor (SIGKILL):</span>
          When your program hits a normal bug, Python raises an Exception (<code className="font-mono text-amber-300">try...except</code>). But when container RAM exceeds the cgroups ceiling, the Linux kernel drops a guillotine! <code className="font-mono text-red-400">SIGKILL (Signal 9)</code> kills the process instantly. Python never gets a chance to clean up—which is why <code className="font-mono text-emerald-300">recovery.py</code> must clean up the mess on next boot!
        </div>
      </div>

      {/* RAM Gauge Bar */}
      <div className="rounded-2xl border border-white/10 bg-[#1c0d11] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-200 font-mono">
            Railway Container Memory Limit (cgroups v2: memory.max = 1024MB)
          </span>
          <span className={`font-mono font-bold ${
            state === 'sigkill' ? 'text-red-500 animate-pulse' : 'text-emerald-400'
          }`}>
            {ramMb} MB / {cgroupsCeilingMb} MB
          </span>
        </div>

        <div className="h-3 w-full rounded-full bg-black/40 overflow-hidden border border-white/10 relative">
          <div
            className={`h-full transition-all duration-300 ${
              state === 'sigkill' ? 'bg-red-600' : ramMb > 800 ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, (ramMb / cgroupsCeilingMb) * 100)}%` }}
          />
          {/* Ceiling line indicator */}
          <div className="absolute top-0 bottom-0 right-0 w-0.5 bg-red-500" />
        </div>

        {/* Status Callout */}
        <div className="flex items-center justify-between text-[11px] font-sans pt-1">
          <div className="flex items-center gap-1.5 text-gray-300">
            {state === 'sigkill' ? (
              <AlertTriangle size={15} className="text-red-400" />
            ) : (
              <ShieldCheck size={15} className="text-emerald-400" />
            )}
            <span>
              {state === 'sigkill'
                ? 'Kernel invoked oom-killer: SIGKILL (Signal 9) dispatched to PID 1. State left in PROCESSING!'
                : state === 'recovered'
                ? 'Application restarted cleanly: recovery.py scanned SQLite, purged temporary chunk files, and marked job FAILED.'
                : 'Container running normally within 1024MB ceiling.'}
            </span>
          </div>
        </div>
      </div>

      {/* The Technical Explanation Box */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-sans text-gray-300 leading-relaxed space-y-2">
        <div className="font-bold text-white font-mono text-[11px] flex items-center gap-1.5">
          <span>Why recovery.py is an Absolute Invariant in Sanad:</span>
        </div>
        <p>
          Because SIGKILL cannot be intercepted by Python signal handlers (<code className="font-mono text-red-300">signal.SIGKILL</code> has no handler in user-space), any in-flight document synchronization job will be permanently frozen with status <code className="font-mono text-amber-300">PROCESSING</code>. On reboot, Sanad's startup lifespan executes <code className="font-mono text-emerald-300">recovery.recover_abandoned_runs()</code> to heal the database before serving user queries.
        </p>
      </div>
    </div>
  );
};
