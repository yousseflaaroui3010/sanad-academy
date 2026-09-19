import React, { useState } from 'react';
import { Network, Play } from 'lucide-react';
import { playHapticClick, playSlideSwoosh, playSuccessChime } from '../../utils/soundEffects';

export const HnswGraphVisualizer: React.FC = () => {
  const [efSearch, setEfSearch] = useState(64); // Beam search width (8 - 128)
  const [activeLayer, setActiveLayer] = useState<2 | 1 | 0>(2);
  const [isTraversing, setIsTraversing] = useState(false);

  // Compute simulated metrics based on efSearch
  const recallPercent = (96.5 + (efSearch / 128) * 3.3).toFixed(1);
  const latencyMs = (0.6 + (efSearch / 128) * 1.8).toFixed(1);
  const distCalculations = Math.round(18 + (efSearch / 128) * 82);
  const bruteForceCalcs = 10000; // 10,000 vectors

  const runTraversal = () => {
    setIsTraversing(true);
    setActiveLayer(2);
    playSlideSwoosh();

    setTimeout(() => {
      setActiveLayer(1);
      playHapticClick();
    }, 600);

    setTimeout(() => {
      setActiveLayer(0);
      playSuccessChime();
      setIsTraversing(false);
    }, 1200);
  };

  return (
    <div className="rounded-3xl border border-purple-500/30 bg-[#0a0d18] text-purple-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400">
            <Network size={16} className="text-purple-400" />
            <span>HNSW Skip-Graph Theory • Vector Indexing Science</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            How Qdrant finds the nearest 768-D vectors in 1.2ms without checking all 10,000 files
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runTraversal}
            disabled={isTraversing}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition disabled:opacity-50"
          >
            <Play size={12} className={isTraversing ? 'animate-spin' : ''} />
            <span>{isTraversing ? 'Searching...' : 'Animate Beam Search'}</span>
          </button>
        </div>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-purple-950/40 border border-purple-800/40 p-3.5 text-xs text-purple-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🚄</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Express Train Metaphor:</span>
          Imagine traveling from Tangier to Marrakech. You don't walk down every tiny residential dirt road. You take the high-speed Al Boraq bullet train between major hubs (Layer 2), switch to a city tram (Layer 1), and then take a 2-minute walk to the exact house (Layer 0). That is HNSW!
        </div>
      </div>

      {/* SVG Canvas: 3-Layer Graph Visualizer */}
      <div className="relative rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#0f1426] via-[#0c0f1e] to-[#070912] p-4 sm:p-6 overflow-hidden">
        <svg viewBox="0 0 600 240" className="w-full h-auto">
          {/* Layer 2: Express Highway (Top layer - sparse long-range links) */}
          <g opacity={activeLayer === 2 ? "1" : "0.35"} className="transition-opacity duration-500">
            <text x="40" y="35" fill="#c084fc" fontSize="10" fontWeight="bold">Layer 2: Express Highway (Few nodes, long jumps)</text>
            <line x1="80" y1="50" x2="300" y2="50" stroke="#c084fc" strokeWidth="3" strokeDasharray="4 4" />
            <line x1="300" y1="50" x2="520" y2="50" stroke="#c084fc" strokeWidth="3" strokeDasharray="4 4" />
            <circle cx="80" cy="50" r="10" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
            <circle cx="300" cy="50" r="14" fill="#a855f7" stroke="#ffffff" strokeWidth="3" />
            <circle cx="520" cy="50" r="10" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
            {activeLayer === 2 && (
              <circle cx="300" cy="50" r="22" fill="none" stroke="#38bdf8" strokeWidth="2" className="animate-ping" />
            )}
          </g>

          {/* Vertical Drop Wires */}
          <line x1="300" y1="50" x2="300" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" opacity="0.6" />
          <line x1="300" y1="120" x2="360" y2="190" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" opacity="0.6" />

          {/* Layer 1: Arterial Transit (Middle layer - medium density) */}
          <g opacity={activeLayer === 1 ? "1" : "0.35"} className="transition-opacity duration-500">
            <text x="40" y="105" fill="#38bdf8" fontSize="10" fontWeight="bold">Layer 1: City Tram (Medium density, regional clusters)</text>
            <line x1="80" y1="120" x2="190" y2="120" stroke="#38bdf8" strokeWidth="2" />
            <line x1="190" y1="120" x2="300" y2="120" stroke="#38bdf8" strokeWidth="2" />
            <line x1="300" y1="120" x2="410" y2="120" stroke="#38bdf8" strokeWidth="2" />
            <line x1="410" y1="120" x2="520" y2="120" stroke="#38bdf8" strokeWidth="2" />
            {[80, 190, 300, 410, 520].map((cx) => (
              <circle key={cx} cx={cx} cy="120" r="8" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            ))}
            {activeLayer === 1 && (
              <circle cx="300" cy="120" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" className="animate-ping" />
            )}
          </g>

          {/* Layer 0: Ground Street Mesh (Bottom layer - all 10,000 vectors) */}
          <g opacity={activeLayer === 0 ? "1" : "0.35"} className="transition-opacity duration-500">
            <text x="40" y="175" fill="#34d399" fontSize="10" fontWeight="bold">Layer 0: Neighborhood Street Mesh (Target: Article 184 Vector)</text>
            <path d="M 60 190 L 120 190 L 180 190 L 240 190 L 300 190 L 360 190 L 420 190 L 480 190 L 540 190" fill="none" stroke="#059669" strokeWidth="1.5" />
            {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((cx) => (
              <circle
                key={cx}
                cx={cx}
                cy="190"
                r={cx === 360 ? "10" : "6"}
                fill={cx === 360 ? "#10b981" : "#0f766e"}
                stroke="#ffffff"
                strokeWidth={cx === 360 ? "2.5" : "1"}
              />
            ))}
            {activeLayer === 0 && (
              <g>
                <circle cx="360" cy="190" r="18" fill="none" stroke="#10b981" strokeWidth="2" className="animate-ping" />
                <text x="360" y="215" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                  ✓ Target Found: Article 184
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Beam Width ef_search Slider & Live Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Slider Controls */}
        <div className="p-4 rounded-2xl bg-black/40 border border-purple-900/40 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-200">Beam Search Width (ef_search)</span>
            <span className="text-purple-400 font-mono">{efSearch}</span>
          </div>
          <input
            type="range"
            min={8}
            max={128}
            step={8}
            value={efSearch}
            onChange={(e) => {
              setEfSearch(Number(e.target.value));
              playHapticClick();
            }}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>8 (Fastest, 0.6ms)</span>
            <span>64 (Default)</span>
            <span>128 (Max Recall 99.8%)</span>
          </div>
        </div>

        {/* Live Mathematical Telemetry */}
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Latency</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">{latencyMs} ms</span>
            <span className="text-[10px] text-gray-400 block font-sans">O(log N) skip-graph</span>
          </div>

          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Recall Accuracy</span>
            <span className="text-base font-extrabold text-purple-300 font-mono">{recallPercent}%</span>
            <span className="text-[10px] text-gray-400 block font-sans">vs Exact Search</span>
          </div>

          <div className="col-span-2 pt-2 border-t border-purple-900/40 flex justify-between text-[11px] font-mono">
            <span className="text-gray-400">Vector Distance Checks:</span>
            <span className="text-emerald-400 font-bold">
              {distCalculations} checks <span className="text-gray-500 font-normal">(vs {bruteForceCalcs} brute-force)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
