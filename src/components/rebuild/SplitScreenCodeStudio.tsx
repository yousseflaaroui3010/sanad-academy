import React, { useState, useEffect, useRef } from 'react';
import { CODE_WALKTHROUGHS } from '../../data/codeStudioData';
import type { ModuleWalkthrough, CodeSegment, BlastRadiusNode } from '../../data/codeStudioData';
import { ArrowRight, ArrowLeft, Terminal, Network, AlertTriangle } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const SplitScreenCodeStudio: React.FC<Props> = ({ lang = 'en' }) => {
  const [selectedModuleIdx, setSelectedModuleIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedBlastNode, setSelectedBlastNode] = useState<BlastRadiusNode | null>(null);
  const activeCodeRef = useRef<HTMLDivElement | null>(null);

  const activeModule: ModuleWalkthrough = CODE_WALKTHROUGHS[selectedModuleIdx] || CODE_WALKTHROUGHS[0];
  const activeSegment: CodeSegment = activeModule.segments[currentStepIdx] || activeModule.segments[0];

  useEffect(() => {
    setCurrentStepIdx(0);
    setSelectedBlastNode(null);
  }, [selectedModuleIdx]);

  useEffect(() => {
    if (activeCodeRef.current) {
      activeCodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentStepIdx]);

  const lines = activeModule.fullSourceCode.split('\n');

  return (
    <div className="w-full space-y-4 text-left">
      {/* Module Selector Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-black/5 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {CODE_WALKTHROUGHS.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => {
                setSelectedModuleIdx(idx);
                playHapticClick();
              }}
              className={`flex-shrink-0 text-xs font-mono font-bold px-3 py-1.5 rounded-xl transition ${
                selectedModuleIdx === idx
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              {mod.filePath}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#86868b]">
          <span>Step {currentStepIdx + 1} of {activeModule.segments.length}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                if (currentStepIdx > 0) {
                  setCurrentStepIdx((prev) => prev - 1);
                  playSlideSwoosh();
                }
              }}
              disabled={currentStepIdx === 0}
              className={`p-1.5 rounded-lg border transition ${
                currentStepIdx > 0 ? 'bg-white text-[#1d1d1f] hover:bg-black/5' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <ArrowLeft size={12} />
            </button>
            <button
              onClick={() => {
                if (currentStepIdx < activeModule.segments.length - 1) {
                  setCurrentStepIdx((prev) => prev + 1);
                  playSlideSwoosh();
                }
              }}
              disabled={currentStepIdx === activeModule.segments.length - 1}
              className={`p-1.5 rounded-lg border transition ${
                currentStepIdx < activeModule.segments.length - 1 ? 'bg-white text-[#1d1d1f] hover:bg-black/5' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Split Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT PANE: Full Source Code with Dynamic Highlighting and Dimming */}
        <div className="lg:col-span-6 bg-[#0f0d0c] rounded-3xl p-4 border border-[#3b322b] shadow-xl overflow-hidden flex flex-col h-[560px]">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-[#a69c90] font-mono">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-emerald-400" />
              <span className="font-bold text-white">{activeModule.filePath}</span>
            </div>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-emerald-400">
              Lines {activeSegment.startLine}–{activeSegment.endLine} active
            </span>
          </div>

          {/* Code Viewer with Line Numbers and Dimmed Inactive Lines */}
          <div className="flex-1 overflow-y-auto overflow-x-auto py-3 font-mono text-xs leading-relaxed space-y-0.5 select-text">
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = lineNum >= activeSegment.startLine && lineNum <= activeSegment.endLine;

              return (
                <div
                  key={lineNum}
                  ref={lineNum === activeSegment.startLine ? activeCodeRef : null}
                  className={`flex items-start transition-all duration-300 px-2 py-0.5 rounded ${
                    isHighlighted
                      ? 'bg-emerald-500/15 border-l-2 border-emerald-400 text-emerald-200 font-semibold opacity-100 shadow-xs'
                      : 'opacity-25 text-white/50 hover:opacity-50'
                  }`}
                >
                  <span className="w-8 text-right pr-3 text-white/30 text-[10px] select-none flex-shrink-0">
                    {lineNum}
                  </span>
                  <span className="whitespace-pre truncate font-mono">
                    {line || ' '}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANE: Pedagogical Logic Breakdown & Blast Radius Graph */}
        <div className="lg:col-span-6 space-y-3 h-[560px] overflow-y-auto pr-1">
          {/* Active Block Logic Breakdown */}
          <div className="liquid-glass rounded-3xl p-5 border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200/60">
                Step {activeSegment.stepNumber}: {activeSegment.title}
              </span>
              <span className="text-xs font-mono text-[#86868b]">
                Lines {activeSegment.startLine}–{activeSegment.endLine}
              </span>
            </div>

            {/* Plain Language Explanation */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                {lang === 'fr' ? 'Fonctionnement Logique (Langage Clair)' : 'Logic Walkthrough (Plain Language)'}
              </span>
              <p className="text-xs text-[#1d1d1f] leading-relaxed">
                {lang === 'fr' ? activeSegment.plainExplanationFr : activeSegment.plainExplanation}
              </p>
            </div>

            {/* Failure Mode It Prevents */}
            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
                <AlertTriangle size={12} />
                <span>{lang === 'fr' ? 'Le Piège / La Défaillance Évitée' : 'Failure Mode Prevented'}</span>
              </div>
              <p className="text-xs text-rose-950 leading-relaxed font-medium">
                {lang === 'fr' ? activeSegment.failurePreventedFr : activeSegment.failurePrevented}
              </p>
            </div>

            {/* Variables & Types Table */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                Key Variables & Runtime State
              </span>
              <div className="space-y-1 text-xs">
                {activeSegment.variablesAndTypes.map((v) => (
                  <div key={v.name} className="p-2 rounded-xl bg-black/5 flex items-start justify-between gap-2">
                    <div className="truncate">
                      <code className="font-mono text-blue-700 font-bold">{v.name}</code>
                      <span className="text-[10px] text-[#86868b] font-mono block truncate">{v.type}</span>
                    </div>
                    <span className="text-[11px] text-[#424245] text-right">{v.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 💥 BLAST RADIUS INTERACTIVE DEPENDENCY GRAPH */}
          <div className="liquid-glass rounded-3xl p-5 border-black/10 space-y-3">
            <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs uppercase tracking-wider">
                <Network size={14} />
                <span>Blast Radius & Dependency Connections</span>
              </div>
              <span className="text-[10px] text-[#86868b] font-mono">
                Click nodes to inspect fallout
              </span>
            </div>

            <p className="text-xs text-[#424245] leading-relaxed">
              {activeModule.blastRadius.summary}
            </p>

            {/* Interactive Nodes Flow */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {activeModule.blastRadius.nodes.map((node) => {
                const isSelected = selectedBlastNode?.id === node.id;
                const badgeColor =
                  node.type === 'current'
                    ? 'bg-blue-600 text-white'
                    : node.type === 'caller'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : node.type === 'downstream'
                    ? 'bg-rose-100 text-rose-900 border border-rose-300'
                    : node.type === 'test'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-black/5 text-[#1d1d1f] border border-black/5';

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setSelectedBlastNode(node);
                      playHapticClick();
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-mono transition flex items-center gap-1 ${badgeColor} ${
                      isSelected ? 'ring-2 ring-blue-500 shadow-xs' : ''
                    }`}
                  >
                    <span>{node.label}</span>
                    <span className="text-[9px] opacity-70 uppercase">({node.type})</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Blast Radius Detail Card */}
            {selectedBlastNode && (
              <div className="p-3 rounded-2xl bg-black/5 border border-black/5 space-y-1.5 transition-all text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#1d1d1f]">{selectedBlastNode.label}</span>
                  <span className="text-[10px] font-bold uppercase text-blue-600">{selectedBlastNode.type}</span>
                </div>
                <p className="text-[#424245] leading-relaxed text-[11px]">{selectedBlastNode.description}</p>
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 font-medium text-[11px]">
                  <strong>Blast Radius Fallout:</strong> {selectedBlastNode.falloutIfBroken}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
