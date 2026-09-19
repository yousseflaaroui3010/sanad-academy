import React, { useState, useEffect } from 'react';
import { Box, Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

export const DockerPackageLoop: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVoiceoverActive, setIsVoiceoverActive] = useState(false);

  const loopDuration = 6.0;

  useEffect(() => {
    let animId: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 1000;
      const p = (elapsed % loopDuration) / loopDuration;
      setProgress(p);

      if (isPlaying) {
        animId = requestAnimationFrame(tick);
      }
    };

    if (isPlaying) {
      animId = requestAnimationFrame(tick);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    playHapticClick();
  };

  const toggleVoiceover = () => {
    setIsVoiceoverActive(!isVoiceoverActive);
    playSlideSwoosh();
  };

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-[#07130f] text-emerald-300 p-5 sm:p-7 shadow-2xl overflow-hidden font-mono space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Box size={15} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#f5f5f7]">
              Docker Multi-Stage Build • 6s HyperFrames Micro-Loop
            </h4>
            <p className="text-[11px] text-[#86868b] font-sans">
              Watch 4GB of heavy compiler bloat drop away, leaving an ultra-lean 380MB CPU container
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoiceover}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition border ${
              isVoiceoverActive
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            <Volume2 size={12} />
            <span>Voiceover: {isVoiceoverActive ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={togglePlay}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      </div>

      {/* Voiceover Speech Box */}
      {isVoiceoverActive && (
        <div className="rounded-2xl bg-emerald-950/40 border border-emerald-800/40 p-3 text-xs text-emerald-200 leading-relaxed font-sans flex items-start gap-2">
          <Sparkles size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            "Look at the multi-stage build: in Stage 1, C++ compilers build the wheels. Then the 3.5GB compiler scaffolding drops away, leaving only a featherlight 380MB container running as non-root on Railway!"
          </span>
        </div>
      )}

      {/* 6-Second Animated SVG Canvas */}
      <div className="relative rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#0a1c15] via-[#07140f] to-[#040a08] p-6 overflow-hidden">
        <svg viewBox="0 0 540 160" className="w-full h-auto">
          {/* Stage 1: Builder Box */}
          <g transform="translate(60, 40)">
            <rect x="0" y="0" width="140" height="90" rx="12" fill="#0f291e" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
            <text x="70" y="24" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Stage 1: Builder</text>
            <text x="70" y="45" textAnchor="middle" fill="#94a3b8" fontSize="9">gcc, pip, headers</text>
            <text x="70" y="65" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">Size: 4.2 GB</text>
          </g>

          {/* Transfer Conveyor Pipe */}
          <line x1="200" y1="85" x2="340" y2="85" stroke="#10b981" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" />

          {/* Animated Wheels Package Sliding Across */}
          {(() => {
            const px = 200 + progress * (340 - 200);
            return (
              <g transform={`translate(${px}, 85)`}>
                <rect x="-24" y="-14" width="48" height="28" rx="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Wheels</text>
              </g>
            );
          })()}

          {/* Discarded Compiler Bloat falling down */}
          {progress > 0.4 && (
            <g transform="translate(240, 130)">
              <text x="0" y="0" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
                ✕ 3.8GB Compilers Discarded
              </text>
            </g>
          )}

          {/* Stage 2: Final Runtime Box */}
          <g transform="translate(340, 40)">
            <rect x="0" y="0" width="140" height="90" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" />
            <text x="70" y="24" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Stage 2: Production</text>
            <text x="70" y="45" textAnchor="middle" fill="#a7f3d0" fontSize="9">python:3.12-slim</text>
            <text x="70" y="65" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Size: 380 MB</text>
            <text x="70" y="80" textAnchor="middle" fill="#6ee7b7" fontSize="8">user: sanad (UID 10001)</text>
          </g>
        </svg>

        {/* Progress Bar under loop */}
        <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-emerald-500 transition-all duration-75" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
};
