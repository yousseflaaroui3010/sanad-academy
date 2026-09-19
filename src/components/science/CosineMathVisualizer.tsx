import React, { useState } from 'react';
import { Compass, RotateCcw } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

export const CosineMathVisualizer: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState<number>(15); // Angle between vectors in degrees
  const [vectorBLength, setVectorBLength] = useState<number>(1.8); // Length of long document vector

  // Cosine similarity = cos(theta in radians)
  const rad = (angleDeg * Math.PI) / 180;
  const cosineSim = Math.cos(rad);

  // Euclidean Distance L2 = sqrt(A^2 + B^2 - 2AB*cos(theta))
  const vecALen = 1.0; // Normalized query vector
  const l2Dist = Math.sqrt(
    Math.pow(vecALen, 2) + Math.pow(vectorBLength, 2) - 2 * vecALen * vectorBLength * cosineSim
  );

  return (
    <div className="rounded-3xl border border-indigo-500/30 bg-[#0a0c16] text-indigo-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
            <Compass size={16} className="text-indigo-400" />
            <span>Cosine Similarity vs Euclidean Distance (L2)</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Why high-dimensional AI retrieval measures direction (angle) rather than document length
          </p>
        </div>

        <button
          onClick={() => {
            setAngleDeg(15);
            setVectorBLength(1.8);
            playHapticClick();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/60 hover:bg-indigo-900/60 text-xs font-bold text-indigo-300 border border-indigo-800/40 transition"
        >
          <RotateCcw size={12} />
          <span>Reset Angles</span>
        </button>
      </div>

      {/* Metaphor Banner */}
      <div className="rounded-2xl bg-indigo-950/40 border border-indigo-800/40 p-3.5 text-xs text-indigo-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🧭</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The North Star Compass Metaphor:</span>
          Imagine walking 5 steps North, while someone else runs 500 miles North. You both walked in the exact same direction! Euclidean distance ($L_2$) thinks you are far apart because one person ran further. Cosine similarity looks only at the compass heading (angle $\theta$), recognizing that you are headed to the exact same destination!
        </div>
      </div>

      {/* SVG Canvas: Vector Angle vs Length Visualizer */}
      <div className="relative rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-[#0e1222] via-[#0a0d1a] to-[#060810] p-4 sm:p-6 overflow-hidden">
        <svg viewBox="0 0 500 200" className="w-full h-auto">
          {/* Origin */}
          <circle cx="80" cy="150" r="4" fill="#ffffff" />
          <text x="65" y="165" fill="#64748b" fontSize="10">Origin (0,0)</text>

          {/* X Axis Baseline */}
          <line x1="80" y1="150" x2="440" y2="150" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Vector A: Query Vector (Fixed unit length, Cyan) */}
          {(() => {
            const ax = 80 + 130 * Math.cos(0);
            const ay = 150 - 130 * Math.sin(0);
            return (
              <g>
                <line x1="80" y1="150" x2={ax} y2={ay} stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
                <polygon points={`${ax},${ay-5} ${ax+8},${ay} ${ax},${ay+5}`} fill="#06b6d4" />
                <text x={ax + 12} y={ay + 4} fill="#06b6d4" fontSize="10" fontWeight="bold">
                  Vector A: User Query (Short, 10 words)
                </text>
              </g>
            );
          })()}

          {/* Vector B: Long Document Vector (Variable length and angle, Purple) */}
          {(() => {
            const bx = 80 + (100 * vectorBLength) * Math.cos(rad);
            const by = 150 - (100 * vectorBLength) * Math.sin(rad);

            // Euclidean distance dotted line between tips
            const ax = 80 + 130;
            const ay = 150;

            return (
              <g>
                {/* L2 distance line */}
                <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
                <text x={(ax + bx) / 2 + 10} y={(ay + by) / 2} fill="#f43f5e" fontSize="9" fontWeight="bold">
                  L2 Dist: {l2Dist.toFixed(2)} (Distorted by length!)
                </text>

                {/* Vector B line */}
                <line x1="80" y1="150" x2={bx} y2={by} stroke="#a855f7" strokeWidth="3.5" strokeLinecap="round" />
                <polygon points={`${bx},${by-5} ${bx+8},${by} ${bx},${by+5}`} fill="#a855f7" />
                <text x={bx + 12} y={by - 2} fill="#c084fc" fontSize="10" fontWeight="bold">
                  Vector B: 50-Page Document (Verbose)
                </text>

                {/* Angle Arc */}
                <path
                  d={`M 140 150 A 60 60 0 0 0 ${80 + 60 * Math.cos(rad)} ${150 - 60 * Math.sin(rad)}`}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2"
                />
                <text x="150" y="140" fill="#34d399" fontSize="10" fontWeight="bold">
                  θ = {angleDeg}° (Cos θ = {cosineSim.toFixed(3)})
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Sliders & Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
        {/* Angle Slider */}
        <div className="p-4 rounded-2xl bg-black/40 border border-indigo-900/40 space-y-2">
          <div className="flex justify-between font-semibold font-mono">
            <span className="text-gray-200">Angular Divergence (θ)</span>
            <span className="text-emerald-400">{angleDeg}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={90}
            value={angleDeg}
            onChange={(e) => {
              setAngleDeg(Number(e.target.value));
              playHapticClick();
            }}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <span className="text-[10px] text-gray-400 block font-sans">
            0° = Exact semantic identity (Cos θ = 1.00) • 90° = Totally unrelated (Cos θ = 0.00)
          </span>
        </div>

        {/* Document Length Slider */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2">
          <div className="flex justify-between font-semibold font-mono">
            <span className="text-gray-200">Document Wordiness (Vector Length)</span>
            <span className="text-purple-300">{vectorBLength.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min={0.8}
            max={2.5}
            step={0.1}
            value={vectorBLength}
            onChange={(e) => {
              setVectorBLength(Number(e.target.value));
              playHapticClick();
            }}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
          <span className="text-[10px] text-gray-400 block font-sans">
            Notice: changing length inflates L2 distance, but Cosine similarity stays pure!
          </span>
        </div>
      </div>
    </div>
  );
};
