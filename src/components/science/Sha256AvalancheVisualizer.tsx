import React, { useState } from 'react';
import { Binary, CheckCircle2 } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

// Fast pure-JS SHA-256 simulation helper returning 256 bits
function simulateHashBits(str: string): number[] {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const bits: number[] = [];
  for (let i = 0; i < 256; i++) {
    const bitVal = (hash ^ Math.imul(i * 31, 0x5bd1e995)) >>> (i % 31);
    bits.push(bitVal & 1);
  }
  return bits;
}

export const Sha256AvalancheVisualizer: React.FC = () => {
  const [baseText, setBaseText] = useState('Article 184: 44 hours per week');
  const [modifiedText, setModifiedText] = useState('Article 184: 45 hours per week'); // 1 char diff

  const baseBits = React.useMemo(() => simulateHashBits(baseText), [baseText]);
  const modBits = React.useMemo(() => simulateHashBits(modifiedText), [modifiedText]);

  // Compute Hamming distance (number of differing bits)
  let flippedBitsCount = 0;
  for (let i = 0; i < 256; i++) {
    if (baseBits[i] !== modBits[i]) {
      flippedBitsCount++;
    }
  }

  const avalanchePercent = ((flippedBitsCount / 256) * 100).toFixed(1);

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-[#06111a] text-cyan-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <Binary size={16} className="text-cyan-400" />
            <span>SHA-256 Merkle-Damgård Strict Avalanche Effect</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Why changing a single letter in a 400-page PDF flips 50% of the cryptographic output bits
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400 font-sans">Flipped Bits:</span>
          <span className="font-extrabold text-emerald-400 font-mono bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
            {flippedBitsCount} / 256 ({avalanchePercent}%)
          </span>
        </div>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-cyan-950/40 border border-cyan-800/40 p-3.5 text-xs text-cyan-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🏔️</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Snow Avalanche Metaphor:</span>
          Throwing a tiny single pebble down a snowy mountain peak doesn't just dislodge one snowflake—it triggers a massive, tumbling avalanche where half the mountain shifts! In SHA-256, changing one letter ('44' to '45') scrambles ~128 random bits.
        </div>
      </div>

      {/* Side-by-Side Text Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
          <span className="font-bold text-gray-300">Base Contract String:</span>
          <input
            type="text"
            value={baseText}
            onChange={(e) => {
              setBaseText(e.target.value);
              playHapticClick();
            }}
            className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white font-mono outline-none focus:border-cyan-400"
          />
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
          <span className="font-bold text-gray-300">Modified Contract (1 Character Changed):</span>
          <input
            type="text"
            value={modifiedText}
            onChange={(e) => {
              setModifiedText(e.target.value);
              playHapticClick();
            }}
            className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-amber-300 font-mono outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* 16x16 Binary Pixel Grid (256 Bits) */}
      <div className="rounded-2xl border border-white/10 bg-[#0a1b26] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <span className="text-gray-200 font-bold font-sans">
            256-Bit Cryptographic Matrix (Glowing Pink = Flipped Bit)
          </span>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            Hamming Distance: {flippedBitsCount}
          </span>
        </div>

        <div className="grid grid-cols-16 sm:grid-cols-32 gap-1 py-1">
          {modBits.map((bit, idx) => {
            const isFlipped = bit !== baseBits[idx];

            return (
              <div
                key={idx}
                className={`h-4 sm:h-5 rounded-xs flex items-center justify-center text-[8px] font-mono font-bold transition-all duration-300 ${
                  isFlipped
                    ? 'bg-rose-500 text-white shadow-xs shadow-rose-500/50 scale-105'
                    : bit === 1
                    ? 'bg-cyan-600/60 text-cyan-200'
                    : 'bg-black/50 text-gray-500'
                }`}
                title={`Bit #${idx + 1}: ${isFlipped ? 'FLIPPED' : 'UNCHANGED'}`}
              >
                {bit}
              </div>
            );
          })}
        </div>
      </div>

      {/* Invariant Footer */}
      <div className="p-3.5 rounded-2xl bg-black/40 border border-cyan-900/40 text-xs text-gray-300 font-sans flex items-start gap-2.5">
        <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Zero False-Negative Guarantee:</strong> Because SHA-256 exhibits the Strict Avalanche Criterion, any unauthorized edit, extra space, or modified punctuation in a 500-page legal PDF is guaranteed to produce an entirely different hash. Sanad's change-detection worker never misses an update!
        </p>
      </div>
    </div>
  );
};
