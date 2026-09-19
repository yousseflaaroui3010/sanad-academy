import React, { useState } from 'react';
import { ADR_RECORDS_DATA } from '../../data/rebuildStagesData';
import type { AdrRecord } from '../../data/rebuildStagesData';
import { Search, CheckCircle2, XCircle, User } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const AdrDecisionBrowserInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdr, setSelectedAdr] = useState<AdrRecord>(ADR_RECORDS_DATA[0]);

  const categories = ['All', 'Storage', 'Agent', 'Security', 'UI', 'Data'];

  const filteredAdrs = ADR_RECORDS_DATA.filter((adr) => {
    const matchesCat = selectedCategory === 'All' || adr.category === selectedCategory;
    const matchesSearch =
      adr.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adr.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adr.decision.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full space-y-4 text-left">
      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            placeholder="Search ADR-001 to ADR-020..."
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

      {/* Main Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: ADR Records List */}
        <div className="lg:col-span-5 space-y-2 max-h-[440px] overflow-y-auto pr-1">
          {filteredAdrs.map((adr) => {
            const isSelected = selectedAdr.id === adr.id;
            return (
              <div
                key={adr.id}
                onClick={() => {
                  setSelectedAdr(adr);
                  playHapticClick();
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-500/40 shadow-sm ring-1 ring-blue-500/20'
                    : 'liquid-glass border-black/5 hover:border-black/15'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60">
                    {adr.id}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase font-bold text-[#86868b] bg-black/5 px-2 py-0.5 rounded">
                      {adr.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                      {adr.owner}
                    </span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#1d1d1f] truncate">
                  {adr.title}
                </h4>
                <p className="text-[11px] text-[#6e6e73] line-clamp-1 pt-0.5">
                  {adr.decision}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full ADR Structured Record */}
        <div className="lg:col-span-7">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-blue-500/30 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="border-b border-black/5 pb-3 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-600 block mb-0.5">
                    {selectedAdr.id} • {selectedAdr.category}
                  </span>
                  <h3 className="text-base font-extrabold text-[#1d1d1f]">
                    {selectedAdr.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-purple-700 bg-purple-50 border border-purple-200/60 px-2.5 py-1 rounded-xl">
                  <User size={12} />
                  <span>Owner: {selectedAdr.owner}</span>
                </div>
              </div>

              {/* Context & Problem */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                  Context & Problem Statement
                </span>
                <p className="text-xs text-[#424245] leading-relaxed">
                  {selectedAdr.context}
                </p>
              </div>

              {/* Options Considered */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                  Alternatives Considered
                </span>
                <div className="space-y-1">
                  {selectedAdr.optionsConsidered.map((opt, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-black/5 text-xs text-[#424245] flex items-center gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                  The Decision
                </span>
                <p className="text-xs text-blue-950 font-semibold leading-relaxed">
                  {selectedAdr.decision}
                </p>
              </div>
            </div>

            {/* Consequences: Positive vs Trade-off */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-black/5 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-950 space-y-0.5">
                <div className="flex items-center gap-1 text-emerald-700 font-bold text-[10px] uppercase">
                  <CheckCircle2 size={11} />
                  <span>Positive Gain</span>
                </div>
                <p className="text-[11px] leading-relaxed">{selectedAdr.consequences.positive}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-950 space-y-0.5">
                <div className="flex items-center gap-1 text-amber-700 font-bold text-[10px] uppercase">
                  <XCircle size={11} />
                  <span>Accepted Trade-Off</span>
                </div>
                <p className="text-[11px] leading-relaxed">{selectedAdr.consequences.negative}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
