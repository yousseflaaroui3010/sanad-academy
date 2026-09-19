import React, { useState } from 'react';
import { Layers, Database, FileText, Copy, Check, RotateCcw } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

const SAMPLE_TEXT = `ARTICLE 184 DU CODE DU TRAVAIL MAROCAIN:
Dans les activités non agricoles, la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine. La durée annuelle globale de travail peut être répartie sur l'année selon les besoins de l'entreprise à condition que la durée quotidienne de travail n'excède pas 10 heures, sous réserve des dérogations prévues par les articles 189, 190 et 192. Dans les activités agricoles, la durée normale de travail est fixée à 2496 heures par an. Elle est répartie par périodes selon les nécessités des cultures suivant des modalités fixées par l'autorité gouvernementale compétente après avis des organisations professionnelles des employeurs et des syndicats des salariés les plus représentatifs.

ARTICLE 185:
Lorsque l'entreprise doit faire face à des crises économiques passagères périodiques ou à des circonstances exceptionnelles involontaires, l'employeur peut, après consultation des délégués des salariés et, le cas échéant, des représentants des syndicats au sein de l'entreprise, réduire la durée normale de travail pour une période continue ou discontinue n'excédant pas 60 jours par an. Le salaire est payé pour la durée effective de travail, sans pouvoir être inférieur à 50% du salaire normal.`;

export const IngestionLab: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_TEXT);
  const [childSize, setChildSize] = useState(500);
  const [parentSize, setParentSize] = useState(4000);
  const [overlap, setOverlap] = useState(50);
  const [selectedChildIdx, setSelectedChildIdx] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  // Real-time chunking logic
  const parents = React.useMemo(() => {
    if (!inputText.trim()) return [];
    const res: { id: string; text: string; charCount: number }[] = [];
    let start = 0;
    let pIdx = 1;

    while (start < inputText.length) {
      const chunk = inputText.slice(start, start + parentSize);
      res.push({
        id: `parent_${pIdx}`,
        text: chunk,
        charCount: chunk.length,
      });
      start += parentSize;
      pIdx++;
    }
    return res;
  }, [inputText, parentSize]);

  const children = React.useMemo(() => {
    if (!inputText.trim()) return [];
    const res: {
      id: string;
      parentId: string;
      text: string;
      charCount: number;
      vector: string;
    }[] = [];

    let start = 0;
    let cIdx = 1;
    const step = Math.max(50, childSize - overlap);

    while (start < inputText.length) {
      const chunk = inputText.slice(start, start + childSize);
      // Determine parent ID
      const parentIdx = Math.floor(start / parentSize) + 1;

      // Deterministic mock 768-dim coordinates
      const mockVector = `[${(Math.sin(cIdx) * 0.5).toFixed(4)}, ${(Math.cos(cIdx) * 0.5).toFixed(4)}, ${(Math.sin(cIdx * 2) * 0.3).toFixed(4)} ... (768 dims)]`;

      res.push({
        id: `child_${cIdx}`,
        parentId: `parent_${parentIdx}`,
        text: chunk,
        charCount: chunk.length,
        vector: mockVector,
      });

      start += step;
      cIdx++;
      if (cIdx > 30) break; // Limit to 30 for snappy rendering
    }
    return res;
  }, [inputText, childSize, parentSize, overlap]);

  const handleCopyVector = (vec: string) => {
    navigator.clipboard.writeText(vec);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Bar */}
      <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-3 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Layers size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight">
                Document Ingestion & Chunking Lab
              </h3>
              <p className="text-xs text-[#86868b]">
                Paste arbitrary text to watch the Parent-Child Slicer generate dual-tier storage in real time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setInputText(SAMPLE_TEXT);
                setChildSize(500);
                setParentSize(4000);
                setOverlap(50);
                playHapticClick();
              }}
              className="flex items-center gap-1.5 rounded-full bg-black/5 hover:bg-black/10 px-3 py-1.5 text-xs font-semibold text-[#424245] transition"
            >
              <RotateCcw size={12} />
              <span>Load Sample Code</span>
            </button>
          </div>
        </div>

        {/* Text Input Area */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-[#424245]">
            <span>Raw Input Document Text</span>
            <span className="text-[#86868b] tabular-nums font-mono">{inputText.length} characters</span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="Paste your legal document, policy, or contract text here..."
            className="w-full rounded-2xl border border-black/10 bg-white/80 p-3 text-xs sm:text-sm text-[#1d1d1f] placeholder:text-[#86868b] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition font-sans leading-relaxed"
          />
        </div>

        {/* Live Interactive Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Child Size */}
          <div className="rounded-2xl bg-black/5 p-3 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1d1d1f]">Child Chunk Size</span>
              <span className="text-blue-600 font-mono">{childSize} chars</span>
            </div>
            <input
              type="range"
              min={200}
              max={1000}
              step={50}
              value={childSize}
              onChange={(e) => {
                setChildSize(Number(e.target.value));
                playHapticClick();
              }}
              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-[#86868b] block">Target: 500 chars (high semantic recall)</span>
          </div>

          {/* Parent Size */}
          <div className="rounded-2xl bg-black/5 p-3 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1d1d1f]">Parent Section Size</span>
              <span className="text-purple-600 font-mono">{parentSize} chars</span>
            </div>
            <input
              type="range"
              min={1500}
              max={8000}
              step={500}
              value={parentSize}
              onChange={(e) => {
                setParentSize(Number(e.target.value));
                playHapticClick();
              }}
              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <span className="text-[10px] text-[#86868b] block">Target: 4,000 chars (full article context)</span>
          </div>

          {/* Overlap */}
          <div className="rounded-2xl bg-black/5 p-3 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1d1d1f]">Child Overlap</span>
              <span className="text-emerald-600 font-mono">{overlap} chars</span>
            </div>
            <input
              type="range"
              min={0}
              max={150}
              step={10}
              value={overlap}
              onChange={(e) => {
                setOverlap(Number(e.target.value));
                playHapticClick();
              }}
              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-[10px] text-[#86868b] block">Target: 50 chars (prevents boundary cuts)</span>
          </div>
        </div>
      </div>

      {/* Slicer Output Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Parents (Stored on Disk) */}
        <div className="liquid-glass rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-purple-600" />
              <h4 className="text-sm font-bold text-[#1d1d1f]">
                Generated Parent Blocks ({parents.length})
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/60">
              Filesystem Disk Storage
            </span>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {parents.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-white/80 border border-black/5 space-y-1.5 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-700 font-mono">{p.id}</span>
                  <span className="text-[#86868b] tabular-nums font-mono text-[11px]">
                    {p.charCount} chars
                  </span>
                </div>
                <p className="text-xs text-[#424245] leading-relaxed line-clamp-4 font-serif italic">
                  "{p.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Children (Indexed in Qdrant) */}
        <div className="liquid-glass rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-black/5 pb-3">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-blue-600" />
              <h4 className="text-sm font-bold text-[#1d1d1f]">
                Generated Child Chunks ({children.length})
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
              Qdrant Vector Points
            </span>
          </div>

          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {children.map((c, idx) => {
              const isSelected = selectedChildIdx === idx;

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedChildIdx(idx)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition space-y-1.5 ${
                    isSelected
                      ? 'border-blue-500/50 bg-white shadow-sm ring-2 ring-blue-500/20'
                      : 'border-black/5 bg-white/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-600 font-mono">
                      {c.id} → points to {c.parentId}
                    </span>
                    <span className="text-[#86868b] tabular-nums font-mono text-[10px]">
                      {c.charCount} chars
                    </span>
                  </div>

                  <p className="text-xs text-[#1d1d1f] font-medium leading-relaxed line-clamp-2">
                    "{c.text}"
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-black/5 text-[10px] text-[#86868b]">
                    <span className="font-mono truncate max-w-[200px] text-purple-600">
                      passage: {c.vector}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyVector(c.vector);
                      }}
                      className="text-blue-600 hover:underline flex items-center gap-0.5 font-semibold"
                    >
                      {copied ? <Check size={10} /> : <Copy size={10} />}
                      <span>{copied ? 'Copied' : 'Copy Vector'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
