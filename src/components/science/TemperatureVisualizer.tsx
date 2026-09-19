import React, { useState } from 'react';
import { Thermometer, RotateCcw } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

export const TemperatureVisualizer: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(0.0); // 0.0 to 1.0

  // Candidate next tokens for: "The legal work week in Morocco is..."
  // Softmax logits with temperature scaling: P(w_i) = exp(z_i / T) / sum(exp(z_j / T))
  const logits = [
    { token: '"44"', isGroundTruth: true, rawLogit: 6.0 },
    { token: '"40"', isGroundTruth: false, rawLogit: 3.5 },
    { token: '"48"', isGroundTruth: false, rawLogit: 2.2 },
    { token: '"flexible"', isGroundTruth: false, rawLogit: 1.0 },
  ];

  const probabilities = React.useMemo(() => {
    if (temperature === 0.0) {
      // Deterministic Argmax greedy selection
      return logits.map((l) => ({
        ...l,
        prob: l.isGroundTruth ? 100 : 0
      }));
    }

    const exps = logits.map((l) => Math.exp(l.rawLogit / Math.max(0.1, temperature)));
    const sumExp = exps.reduce((acc, v) => acc + v, 0);

    return logits.map((l, i) => ({
      ...l,
      prob: Math.round((exps[i] / sumExp) * 100)
    }));
  }, [temperature]);

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-[#120e06] text-amber-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Thermometer size={16} className="text-amber-400" />
            <span>Greedy Argmax Decoding (T=0.0) vs Hallucination Risk</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Why enterprise legal AI strictly locks temperature to 0.0 to eliminate generative hallucinations
          </p>
        </div>

        <button
          onClick={() => {
            setTemperature(0.0);
            playHapticClick();
          }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 hover:bg-amber-900/60 text-xs font-bold text-amber-300 border border-amber-800/40 transition"
        >
          <RotateCcw size={12} />
          <span>Lock T=0.0 (Production)</span>
        </button>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-amber-950/40 border border-amber-800/40 p-3.5 text-xs text-amber-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🎯</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Archery Bullseye Metaphor:</span>
          At Temperature 0.0, the robot archer shoots with laser-guided zero wind: it hits the exact factual bullseye 100 times out of 100. When you turn temperature up to 0.7, a gust of random wind blows the arrow off course. Great for writing fairy tales, disastrous for quoting labor law!
        </div>
      </div>

      {/* Temperature Slider */}
      <div className="p-4 rounded-2xl bg-black/50 border border-amber-900/40 space-y-2 font-sans">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-gray-200 font-mono">LLM Temperature (T)</span>
          <span className={`font-mono font-bold ${temperature === 0.0 ? 'text-emerald-400' : 'text-amber-400'}`}>
            T = {temperature.toFixed(1)} {temperature === 0.0 ? '(Deterministic Argmax)' : '(Randomized Top-p Sampling)'}
          </span>
        </div>
        <input
          type="range"
          min={0.0}
          max={1.0}
          step={0.1}
          value={temperature}
          onChange={(e) => {
            setTemperature(Number(e.target.value));
            playHapticClick();
          }}
          className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between text-[10px] text-gray-500 font-mono">
          <span>0.0 (Sanad Production Standard)</span>
          <span>0.7 (Standard Chatbot)</span>
          <span>1.0 (High Hallucination)</span>
        </div>
      </div>

      {/* Live Probability Bar Chart */}
      <div className="rounded-2xl border border-white/10 bg-[#1c1408] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <span className="text-gray-200 font-bold font-sans">
            Next-Token Probability Distribution for: <span className="italic font-serif">"The legal work week in Morocco is..."</span>
          </span>
          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
            temperature === 0.0 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
          }`}>
            {temperature === 0.0 ? 'Zero Hallucination Risk' : 'Hallucination Vulnerability Active'}
          </span>
        </div>

        <div className="space-y-2.5 pt-1">
          {probabilities.map((p) => (
            <div key={p.token} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-mono font-bold flex items-center gap-2">
                  <span className={p.isGroundTruth ? 'text-emerald-400' : 'text-rose-400'}>
                    {p.token}
                  </span>
                  {p.isGroundTruth && (
                    <span className="text-[10px] font-sans font-semibold text-emerald-500 bg-emerald-950/60 px-1.5 py-0.2 rounded">
                      Ground Truth (Article 184)
                    </span>
                  )}
                  {!p.isGroundTruth && p.prob > 0 && (
                    <span className="text-[10px] font-sans font-semibold text-rose-500 bg-rose-950/60 px-1.5 py-0.2 rounded">
                      Hallucinated Fake Fact!
                    </span>
                  )}
                </span>
                <span className="font-mono font-bold tabular-nums text-gray-200">{p.prob}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden border border-white/5">
                <div
                  className={`h-full transition-all duration-300 ${
                    p.isGroundTruth ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${p.prob}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
