import React, { useState, useEffect } from 'react';
import { Radar, Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

export const VectorRadarLoop: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [angleDeg, setAngleDeg] = useState(0); // 0 to 360 degrees
  const [isVoiceoverActive, setIsVoiceoverActive] = useState(false);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // 360 degrees in 6 seconds = 60 deg/sec
      setAngleDeg((prev) => (prev + delta * 60) % 360);

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

  // Vectors located at specific angles
  const targets = [
    { name: 'Article 184 (44h)', angle: 45, sim: '0.94' },
    { name: 'Article 14 (Cadres)', angle: 135, sim: '0.89' },
    { name: 'Article 185 (Crisis)', angle: 220, sim: '0.87' },
    { name: 'Dahir n° 1-03-194', angle: 315, sim: '0.92' },
  ];

  return (
    <div className="rounded-3xl border border-purple-500/30 bg-[#0c0817] text-purple-300 p-5 sm:p-7 shadow-2xl overflow-hidden font-mono space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/50 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Radar size={15} className="animate-spin text-purple-400" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#f5f5f7]">
              3D Vector Similarity Radar • 6s HyperFrames Micro-Loop
            </h4>
            <p className="text-[11px] text-[#86868b] font-sans">
              Cosine similarity beam sweep across 768-dimensional embedding coordinates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleVoiceover}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition border ${
              isVoiceoverActive
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            <Volume2 size={12} />
            <span>Voiceover: {isVoiceoverActive ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={togglePlay}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-xs"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>
      </div>

      {/* Voiceover Speech Box */}
      {isVoiceoverActive && (
        <div className="rounded-2xl bg-purple-950/40 border border-purple-800/40 p-3 text-xs text-purple-200 leading-relaxed font-sans flex items-start gap-2">
          <Sparkles size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
          <span>
            "Look at the radar sweep in 768-dimensional space! As the query beam passes close vectors, semantic resonance pings with high cosine similarity above 0.85!"
          </span>
        </div>
      )}

      {/* 6-Second Animated Radar SVG */}
      <div className="relative rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#120a24] via-[#0e071c] to-[#07030e] p-6 overflow-hidden flex justify-center">
        <svg viewBox="0 0 320 240" className="w-full max-w-sm h-auto">
          {/* Concentric Distance Rings */}
          <circle cx="160" cy="120" r="100" fill="none" stroke="#6b21a8" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="160" cy="120" r="75" fill="none" stroke="#7e22ce" strokeWidth="1" />
          <circle cx="160" cy="120" r="50" fill="none" stroke="#9333ea" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="160" cy="120" r="25" fill="none" stroke="#a855f7" strokeWidth="1" />

          {/* Azimuth crosshairs */}
          <line x1="160" y1="15" x2="160" y2="225" stroke="#581c87" strokeWidth="1" />
          <line x1="55" y1="120" x2="265" y2="120" stroke="#581c87" strokeWidth="1" />

          {/* Rotating Radar Sweep Line */}
          {(() => {
            const rad = (angleDeg * Math.PI) / 180;
            const rx = 160 + 105 * Math.cos(rad);
            const ry = 120 + 105 * Math.sin(rad);

            return (
              <g>
                <line x1="160" y1="120" x2={rx} y2={ry} stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx={rx} cy={ry} r="3" fill="#ffffff" />
              </g>
            );
          })()}

          {/* Target Vector Nodes */}
          {targets.map((t) => {
            const trad = (t.angle * Math.PI) / 180;
            const tx = 160 + 75 * Math.cos(trad);
            const ty = 120 + 75 * Math.sin(trad);

            // Check if sweep beam is near target (within 25 degrees)
            const diff = Math.abs(angleDeg - t.angle);
            const isPinged = diff < 25 || diff > 335;

            return (
              <g key={t.name}>
                <circle
                  cx={tx}
                  cy={ty}
                  r={isPinged ? "8" : "4"}
                  fill={isPinged ? "#34d399" : "#a855f7"}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-200"
                />
                {isPinged && (
                  <g>
                    <circle cx={tx} cy={ty} r="14" fill="none" stroke="#34d399" strokeWidth="2" className="animate-ping" />
                    <text x={tx} y={ty - 12} textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                      {t.name} (Sim: {t.sim})
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          <circle cx="160" cy="120" r="5" fill="#38bdf8" />
          <text x="160" y="112" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">Query</text>
        </svg>
      </div>
    </div>
  );
};
