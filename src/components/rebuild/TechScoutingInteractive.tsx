import React, { useState } from 'react';
import { TECH_SCOUT_ITEMS } from '../../data/rebuildStagesData';
import type { TechScoutDecision } from '../../data/rebuildStagesData';
import { CheckCircle2, XCircle, Terminal, Zap } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const TechScoutingInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [selectedItem, setSelectedItem] = useState<TechScoutDecision>(TECH_SCOUT_ITEMS[0]);

  return (
    <div className="w-full space-y-4 text-left">
      {/* Dimension Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {TECH_SCOUT_ITEMS.map((item) => (
          <button
            key={item.dimension}
            onClick={() => {
              setSelectedItem(item);
              playHapticClick();
            }}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl transition ${
              selectedItem.dimension === item.dimension
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            {item.dimension}
          </button>
        ))}
      </div>

      {/* Main Comparative Matrix Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Selected Technology Card */}
        <div className="lg:col-span-6 space-y-3">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-emerald-500/30 space-y-3 h-full flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  Selected Stack
                </span>
                <span className="text-xs font-mono text-[#86868b]">{selectedItem.dimension}</span>
              </div>
              <h3 className="text-lg font-extrabold text-[#1d1d1f] flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
                <span>{selectedItem.selectedTech}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                {selectedItem.selectedReason}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-black/5">
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase tracking-wider text-[10px]">
                  <Zap size={12} />
                  <span>Empirical Benchmark Proof</span>
                </div>
                <p className="text-emerald-950 font-medium leading-relaxed text-[11px]">
                  {selectedItem.empiricalProof}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#14110f] text-[#a69c90] font-mono text-[11px] flex items-center gap-2">
                <Terminal size={12} className="text-emerald-400 flex-shrink-0" />
                <span className="truncate text-white/80">{selectedItem.codeSource}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Rejected Alternatives with Concrete Justifications */}
        <div className="lg:col-span-6 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73] block px-1">
            Rejected Alternatives & Failure Modes
          </span>
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {selectedItem.rejectedTechs.map((alt) => (
              <div key={alt.name} className="liquid-glass rounded-2xl p-4 border-rose-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                  <XCircle size={14} className="flex-shrink-0" />
                  <span>{alt.name}</span>
                </div>
                <p className="text-xs text-[#424245] leading-relaxed pl-5">
                  {alt.whyRejected}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
