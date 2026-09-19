import React, { useState, useEffect } from 'react';
import { GitBranch, Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../../utils/soundEffects';

export const GitRebaseLoop: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 1
  const [isVoiceoverActive, setIsVoiceoverActive] = useState(false);

  // 6-second loop duration
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
    if (!isVoiceoverActive) {
      playSuccessChime();
    } else {
      playHapticClick();
    }
  };

  return (
    <div className="rounded-3xl border border-blue-500/30 bg-[#080d18] text-blue-300 p-5 sm:p-7 shadow-2xl overflow-hidden font-mono space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <GitBranch size={15} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#f5f5f7]">
              Git Rebase & Linear Merge • 6s HyperFrames Micro-Loop
            </h4>
            <p className="text-[11px] text-[#86868b] font-sans">
              Watch feature commits detach and replay seamlessly onto main with zero merge commit noise
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoiceover}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition border ${
              isVoiceoverActive
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            <Volume2 size={12} />
            <span>Voiceover: {isVoiceoverActive ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={togglePlay}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-xs"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      </div>

      {/* Voiceover Speech Box */}
      {isVoiceoverActive && (
        <div className="rounded-2xl bg-blue-950/40 border border-blue-800/40 p-3 text-xs text-blue-200 leading-relaxed font-sans flex items-start gap-2">
          <Sparkles size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <span>
            "Look at the blue branch: instead of a messy zigzag merge commit, Git rebase unplugs your two commits, replays them smoothly on the tip of main, and fast-forwards the pointer in a clean straight line!"
          </span>
        </div>
      )}

      {/* 6-Second Animated SVG Canvas */}
      <div className="relative rounded-2xl border border-blue-500/20 bg-gradient-to-b from-[#0c1324] via-[#090e1c] to-[#050810] p-6 overflow-hidden">
        <svg viewBox="0 0 540 160" className="w-full h-auto">
          {/* Main Branch Base Track (White) */}
          <line x1="40" y1="100" x2="500" y2="100" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <text x="40" y="85" fill="#94a3b8" fontSize="10" fontWeight="bold">main branch</text>

          {/* Commits on Main */}
          <circle cx="80" cy="100" r="10" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
          <text x="80" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">m1</text>

          <circle cx="180" cy="100" r="10" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
          <text x="180" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">m2</text>

          <circle cx="280" cy="100" r="10" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
          <text x="280" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">m3</text>

          {/* Feature Branch Arc */}
          {(() => {
            // Phase 1 (0-2s): Commit is on feature branch
            // Phase 2 (2-4s): Commits lift off and slide
            // Phase 3 (4-6s): Replayed on top of m3 at x=380 and x=460!
            let c1x = 180;
            let c1y = 40;
            let c2x = 260;
            let c2y = 40;

            if (progress < 0.33) {
              // Static on feature branch
              c1x = 180;
              c1y = 40;
              c2x = 260;
              c2y = 40;
            } else if (progress < 0.66) {
              // Animating transition
              const p = (progress - 0.33) / 0.33;
              c1x = 180 + p * (380 - 180);
              c1y = 40 + p * (100 - 40);
              c2x = 260 + p * (460 - 260);
              c2y = 40 + p * (100 - 40);
            } else {
              // Settled on main
              c1x = 380;
              c1y = 100;
              c2x = 460;
              c2y = 100;
            }

            return (
              <g>
                {/* Feature line before rebase */}
                {progress < 0.5 && (
                  <path d="M 80 100 Q 130 40 180 40 L 260 40" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
                )}

                {/* Commit c1 */}
                <circle cx={c1x} cy={c1y} r="11" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2.5" />
                <text x={c1x} y={c1y + 4} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">c1</text>

                {/* Commit c2 */}
                <circle cx={c2x} cy={c2y} r="11" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2.5" />
                <text x={c2x} y={c2y + 4} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">c2</text>

                {/* Linear Rebase Confirmation Pulse */}
                {progress >= 0.75 && (
                  <g>
                    <circle cx="460" cy="100" r="18" fill="none" stroke="#10b981" strokeWidth="2" className="animate-ping" />
                    <text x="460" y="130" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                      ✓ Fast-Forward Linear History
                    </text>
                  </g>
                )}
              </g>
            );
          })()}
        </svg>

        {/* Progress Bar under loop */}
        <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-blue-500 transition-all duration-75" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
};
