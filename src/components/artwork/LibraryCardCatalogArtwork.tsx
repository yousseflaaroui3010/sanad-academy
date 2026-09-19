import React, { useState } from 'react';
import { BookOpen, Sparkles, Database, FileText, ArrowRight } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

export const LibraryCardCatalogArtwork: React.FC = () => {
  const [isPulled, setIsPulled] = useState(true);

  const togglePull = () => {
    setIsPulled(!isPulled);
    if (!isPulled) playSlideSwoosh();
    else playHapticClick();
  };

  return (
    <div className="rounded-3xl border border-blue-500/30 bg-[#0e111a] text-blue-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6 relative">
      {/* Library Vault Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <BookOpen size={16} className="text-blue-400" />
            <span>The Library Metaphor • Parent-Child Chunking Engine</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Search the tiny index card (500 chars in Qdrant) ➔ Walk to the shelf and read the entire book (4,000 chars on disk)
          </p>
        </div>

        <button
          onClick={togglePull}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition"
        >
          <span>{isPulled ? 'Collapse Index Card' : 'Pull Index Card'}</span>
          <ArrowRight size={13} className={isPulled ? 'rotate-90 sm:rotate-0' : ''} />
        </button>
      </div>

      {/* Visual Canvas: Card Catalog Drawer (Left) & Grand Shelf (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: The Index Card Drawer (Qdrant Child) */}
        <div className={`p-6 rounded-2xl border transition-all duration-300 space-y-3 ${
          isPulled
            ? 'bg-[#151c2e] border-blue-500/60 shadow-lg shadow-blue-500/10 ring-2 ring-blue-400/20'
            : 'bg-[#101422] border-white/10 opacity-70'
        }`}>
          <div className="flex items-center justify-between border-b border-blue-900/40 pb-2">
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <Database size={13} />
              Oak Filing Drawer: Child Chunk in Qdrant
            </span>
            <span className="text-[10px] font-mono text-gray-400">Card #184-A</span>
          </div>

          <div className="rounded-xl bg-white p-4 text-[#1d1d1f] font-sans text-xs space-y-2 shadow-inner border border-amber-200">
            <div className="flex justify-between text-[10px] font-mono text-[#86868b] border-b pb-1">
              <span>CATALOG REF: ART_184_P28</span>
              <span className="text-blue-600 font-bold">500 CHARACTERS</span>
            </div>
            <p className="font-serif italic text-xs leading-relaxed text-[#2b2b2b]">
              "...dans les activités non agricoles, la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine."
            </p>
            <div className="text-[9px] font-mono text-purple-700 bg-purple-50 p-1 rounded">
              passage: [0.0124, -0.0451, 0.0892 ... (768-dim E5 vector)]
            </div>
          </div>

          <p className="text-[11px] text-gray-400 font-sans">
            Fast semantic vector search scans millions of these index cards in under 2 milliseconds.
          </p>
        </div>

        {/* Right: The Master Leatherbound Book (Disk Parent) */}
        <div className="p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#1c140c] via-[#161009] to-[#0f0b06] space-y-3 shadow-lg">
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <FileText size={13} />
              Master Bookshelf: Parent Article on Disk
            </span>
            <span className="text-[10px] font-mono text-amber-300/70">~4,000 Chars</span>
          </div>

          <div className="rounded-xl bg-[#2a1e12] p-4 text-amber-100 font-serif text-xs leading-relaxed space-y-2 border border-amber-800/40 shadow-inner">
            <span className="font-sans font-bold text-[10px] text-amber-400 uppercase tracking-widest block">
              Article 184 (Complete Legal Context)
            </span>
            <p className="text-[11px] leading-relaxed text-amber-200/90">
              Dans les activités non agricoles, la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine. La durée annuelle globale de travail peut être répartie sur l'année selon les besoins de l'entreprise à condition que la durée quotidienne de travail n'excède pas 10 heures, sous réserve des dérogations prévues par les articles 189, 190 et 192...
            </p>
            <div className="text-[10px] text-amber-400 font-sans border-t border-amber-900/50 pt-1">
              ✓ Contains 10h daily ceiling and Articles 189/190 exceptions
            </div>
          </div>

          <p className="text-[11px] text-gray-400 font-sans">
            The LLM writer is handed this full chapter to synthesize truthful, contextual answers.
          </p>
        </div>
      </div>

      {/* Invariant Footer */}
      <div className="rounded-2xl p-3.5 bg-blue-950/30 border border-blue-500/30 text-xs font-sans text-blue-200 flex items-center gap-2">
        <Sparkles size={14} className="text-blue-400 flex-shrink-0" />
        <span>
          "Search the small thing, read the big thing. Separating search granularity from comprehension granularity completely eliminates context truncation."
        </span>
      </div>
    </div>
  );
};
