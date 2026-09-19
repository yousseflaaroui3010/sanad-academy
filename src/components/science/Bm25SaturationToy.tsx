import React, { useState } from 'react';
import { TrendingUp, RotateCcw } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

export const Bm25SaturationToy: React.FC = () => {
  const [termFreq, setTermFreq] = useState<number>(5);
  const [k1, setK1] = useState<number>(1.2); // Asymptotic saturation parameter (default 1.2)

  // Compute BM25 saturation vs linear TF
  // Standard BM25 term weight factor: (f * (k1 + 1)) / (f + k1)
  const bm25Score = (termFreq * (k1 + 1)) / (termFreq + k1);

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-[#070e17] text-cyan-400 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <TrendingUp size={16} className="text-cyan-400" />
            <span>Okapi BM25 Term Saturation Science</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Why repeating a keyword 40 times in a contract does not make it 40x more relevant
          </p>
        </div>

        <button
          onClick={() => {
            setTermFreq(5);
            setK1(1.2);
            playHapticClick();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 text-xs font-bold text-cyan-300 border border-cyan-800/40 transition"
        >
          <RotateCcw size={12} />
          <span>Reset Default (k1=1.2)</span>
        </button>
      </div>

      {/* Pizza Metaphor Banner */}
      <div className="rounded-2xl bg-cyan-950/40 border border-cyan-800/40 p-3.5 text-xs text-cyan-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🍕</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Pizza Slice Law (Diminishing Returns):</span>
          When you're starving, the 1st slice of pizza is pure magic! The 2nd slice is great. But the 20th slice? It barely adds any extra happiness and makes you feel sick. BM25 treats words the same way: seeing 'Article 184' once is huge; seeing it 30 times adds diminishing value.
        </div>
      </div>

      {/* Interactive SVG Curve Graph */}
      <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-[#091524] via-[#07101c] to-[#040810] p-4 sm:p-6 overflow-hidden">
        <svg viewBox="0 0 500 180" className="w-full h-auto">
          {/* Grid lines */}
          <line x1="50" y1="20" x2="50" y2="150" stroke="#1e293b" strokeWidth="2" />
          <line x1="50" y1="150" x2="480" y2="150" stroke="#1e293b" strokeWidth="2" />

          {/* Axes labels */}
          <text x="25" y="25" fill="#64748b" fontSize="9">Score</text>
          <text x="440" y="165" fill="#64748b" fontSize="9">Frequency (f)</text>

          {/* Linear TF-IDF naive line (Red dashed line that explodes) */}
          <line x1="50" y1="150" x2="450" y2="25" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
          <text x="360" y="45" fill="#f43f5e" fontSize="9">Naive Linear TF</text>

          {/* BM25 Asymptotic Curve (Cyan solid curved path) */}
          <path
            d="M 50 150 Q 150 70 450 65"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
          />
          <text x="350" y="80" fill="#06b6d4" fontSize="9" fontWeight="bold">BM25 Asymptotic Ceiling</text>

          {/* Active Data Point on BM25 curve */}
          {(() => {
            const plotX = 50 + (termFreq / 40) * 400;
            const plotY = 150 - (bm25Score / 2.2) * 85;

            return (
              <g>
                <circle cx={plotX} cy={plotY} r="7" fill="#00ffff" stroke="#ffffff" strokeWidth="2" />
                <circle cx={plotX} cy={plotY} r="14" fill="none" stroke="#00ffff" strokeWidth="1.5" opacity="0.5" className="animate-ping" />
                <line x1={plotX} y1={plotY} x2={plotX} y2="150" stroke="#00ffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
                <text x={plotX} y={plotY - 12} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  Score: {bm25Score.toFixed(2)}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Sliders & Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Word Frequency Slider */}
        <div className="p-4 rounded-2xl bg-black/40 border border-cyan-900/40 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-200">Word Count in Document (f)</span>
            <span className="text-cyan-300 font-mono font-bold">{termFreq} occurrences</span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            value={termFreq}
            onChange={(e) => {
              setTermFreq(Number(e.target.value));
              playHapticClick();
            }}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-[10px] text-gray-400 block font-sans">
            Slide to see the curve flatten as word frequency increases
          </span>
        </div>

        {/* Saturation Parameter k1 */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-200">Saturation Parameter (k1)</span>
            <span className="text-cyan-300 font-mono font-bold">{k1}</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={2.5}
            step={0.1}
            value={k1}
            onChange={(e) => {
              setK1(Number(e.target.value));
              playHapticClick();
            }}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-[10px] text-gray-400 block font-sans">
            Standard: 1.2 (controls how fast term saturation ceiling is reached)
          </span>
        </div>
      </div>
    </div>
  );
};
