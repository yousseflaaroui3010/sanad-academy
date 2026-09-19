import React, { useState } from 'react';
import { FUNCTIONAL_REQUIREMENTS } from '../../data/rebuildStagesData';
import type { FunctionalRequirement } from '../../data/rebuildStagesData';
import { ShieldCheck, Search, AlertTriangle, Terminal } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const RequirementsMatrixInteractive: React.FC<Props> = ({ lang = 'en' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReq, setSelectedReq] = useState<FunctionalRequirement>(FUNCTIONAL_REQUIREMENTS[0]);

  const categories = ['All', 'Isolation', 'Ingestion', 'Grounding', 'Conversation', 'Security', 'Compliance'];

  const filteredRequirements = FUNCTIONAL_REQUIREMENTS.filter((req) => {
    const matchesCategory = selectedCategory === 'All' || req.category === selectedCategory;
    const matchesSearch =
      req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.problemSolved.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.invariantRule.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-4 text-left">
      {/* Header bar: Search and Filter Pills */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            placeholder={lang === 'fr' ? "Filtrer les exigences..." : "Search F-01 to F-16..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-black/5 rounded-xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                playHapticClick();
              }}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split View: Left List of 16 Requirements, Right Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: List of Requirements */}
        <div className="lg:col-span-5 space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {filteredRequirements.map((req) => {
            const isSelected = selectedReq.id === req.id;
            return (
              <div
                key={req.id}
                onClick={() => {
                  setSelectedReq(req);
                  playHapticClick();
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-500/40 shadow-sm ring-1 ring-blue-500/20'
                    : 'liquid-glass border-black/5 hover:border-black/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60">
                      {req.id}
                    </span>
                    <span className="text-xs font-bold text-[#1d1d1f] truncate max-w-[160px]">
                      {req.name}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#86868b] bg-black/5 px-2 py-0.5 rounded">
                    {req.category}
                  </span>
                </div>
                <p className="text-[11px] text-[#6e6e73] line-clamp-2 leading-relaxed">
                  {req.problemSolved}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Invariant & Verification Inspection Card */}
        <div className="lg:col-span-7">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-blue-500/20 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200/60">
                    {selectedReq.id}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#1d1d1f]">
                      {selectedReq.name}
                    </h3>
                    <span className="text-[11px] text-[#86868b] font-medium">
                      Category: {selectedReq.category} • Moroccan Labor Code Scope
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  {selectedReq.status}
                </span>
              </div>

              {/* What Blows Up Without It */}
              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle size={13} />
                  <span>The Real Enterprise Failure Mode</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed font-medium">
                  {selectedReq.problemSolved}
                </p>
              </div>

              {/* The Non-Negotiable Invariant Rule */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1">
                <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={13} />
                  <span>The Architectural Invariant Rule</span>
                </div>
                <p className="text-xs text-blue-950 leading-relaxed font-semibold">
                  "{selectedReq.invariantRule}"
                </p>
              </div>
            </div>

            {/* Code Verification Evidence File */}
            <div className="p-3.5 rounded-2xl bg-[#14110f] border border-[#463b32] text-[#f2ede6] font-mono text-xs space-y-1 mt-2">
              <div className="flex items-center justify-between text-[10px] text-[#a69c90] border-b border-white/10 pb-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Terminal size={12} />
                  <span>Automated Verification Gate</span>
                </div>
                <span className="text-white/60">pytest invariant</span>
              </div>
              <p className="text-[11px] text-emerald-300 truncate pt-1">
                {selectedReq.verificationMethod}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
