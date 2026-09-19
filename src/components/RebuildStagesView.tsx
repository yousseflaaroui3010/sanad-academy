import React, { useState, useEffect } from 'react';
import { REBUILD_STAGES } from '../data/rebuildStagesData';
import { RequirementsMatrixInteractive } from './rebuild/RequirementsMatrixInteractive';
import { LegalPrecedentsInteractive } from './rebuild/LegalPrecedentsInteractive';
import { ScrumCockpitInteractive } from './rebuild/ScrumCockpitInteractive';
import { ChevronLeft, ChevronRight, Eye, ShieldCheck, Flame, Scale } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const RebuildStagesView: React.FC<Props> = ({ lang = 'en' }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  const stage = REBUILD_STAGES[currentStageIdx] || REBUILD_STAGES[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentStageIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        if (currentStageIdx < REBUILD_STAGES.length - 1) {
          setCurrentStageIdx((prev) => prev + 1);
          playSlideSwoosh();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentStageIdx > 0) {
          setCurrentStageIdx((prev) => prev - 1);
          playSlideSwoosh();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageIdx]);

  const renderInteractiveArtifact = () => {
    switch (stage.interactiveComponentId) {
      case 'requirements-matrix':
        return <RequirementsMatrixInteractive lang={lang} />;
      case 'legal-precedents':
        return <LegalPrecedentsInteractive lang={lang} />;
      case 'scrum-cockpit':
        return <ScrumCockpitInteractive lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-8 text-left">
      {/* Top Breadcrumb & Phase Pill */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#86868b]">
            <span>Rebuilding Sanad</span>
            <span>/</span>
            <span className="text-blue-600 font-bold uppercase tracking-wider">{stage.phase}</span>
            <span>/</span>
            <span>Stage {stage.stageNumber} of 16</span>
          </div>

          {/* Quick Stage Indicator Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {REBUILD_STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStageIdx(idx);
                  playHapticClick();
                }}
                className={`flex-shrink-0 h-7 w-7 rounded-xl text-xs font-bold font-mono transition ${
                  currentStageIdx === idx
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
                title={`Stage ${s.stageNumber}: ${s.title}`}
              >
                {s.stageNumber}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            {stage.title}
          </h1>
          <p className="text-sm sm:text-base text-[#6e6e73] font-medium pt-1">
            {stage.subtitle}
          </p>
        </div>
      </div>

      {/* Checkable Facts Grid (Zero AI Slop Rule: Every claim has numbers, files & citations) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {stage.checkableFacts.map((fact, idx) => (
          <div key={idx} className="liquid-glass rounded-2xl p-3.5 space-y-1 border-black/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
              {fact.label}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[#1d1d1f] block leading-tight">
              {fact.value}
            </span>
            <span className="text-[10px] font-mono text-blue-600 truncate block pt-0.5" title={fact.proofFileOrSource}>
              {fact.proofFileOrSource}
            </span>
          </div>
        ))}
      </div>

      {/* 📚 1. The Librarian Thread Analogy (GUIDE-STYLE.md) */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-4 border-blue-500/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            🏛️
          </div>
          <div className="space-y-1 flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              The Librarian Thread Analogy (ISO 24495-1 Plain Language)
            </span>
            <h2 className="text-base sm:text-xl font-bold text-[#1d1d1f]">
              How to Explain This Stage to a Child or Academic Jury
            </h2>
            <p className="text-sm text-[#424245] leading-relaxed pt-1 font-medium">
              "{stage.librarianAnalogy.story}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-black/5">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Eye size={13} />
              <span>Exact Software Mapping</span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              {stage.librarianAnalogy.mapping}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <Scale size={13} />
              <span>Where the Analogy Stops</span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              {stage.librarianAnalogy.boundary}
            </p>
          </div>
        </div>
      </div>

      {/* 🚨 2. The High-Stakes Pressure & Core Problem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-2 border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-600">
            <Flame size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">The Real Circumstances & Stakes</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
            {stage.executiveContext}
          </p>
        </div>

        <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-2 border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-600">
            <Scale size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">The Failure Mode (What Blows Up)</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
            {stage.coreProblem}
          </p>
        </div>
      </div>

      {/* 🛠️ 3. Specialized Interactive Laboratory Artifact */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73] block">
            Stage {stage.stageNumber} Interactive Inspection Sandbox
          </span>
          <span className="text-[11px] font-mono text-[#86868b]">
            Live RAG_project_ENSA Invariants
          </span>
        </div>
        {renderInteractiveArtifact()}
      </div>

      {/* 📐 4. The Engineering Solution Architecture */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-3 border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck size={16} />
          <span>The Engineering Solution Architecture</span>
        </div>
        <p className="text-sm text-[#424245] leading-relaxed">
          {stage.solutionArchitecture}
        </p>
      </div>

      {/* Bottom Stage Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-black/5">
        <button
          onClick={() => {
            if (currentStageIdx > 0) {
              setCurrentStageIdx((prev) => prev - 1);
              playSlideSwoosh();
            }
          }}
          disabled={currentStageIdx === 0}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
            currentStageIdx > 0
              ? 'text-[#424245] hover:text-[#1d1d1f] hover:bg-black/5'
              : 'opacity-30 cursor-not-allowed text-[#86868b]'
          }`}
        >
          <ChevronLeft size={14} />
          <span>Previous Stage</span>
        </button>

        <span className="text-xs font-bold text-[#86868b]">
          Stage {currentStageIdx + 1} of {REBUILD_STAGES.length}
        </span>

        <button
          onClick={() => {
            if (currentStageIdx < REBUILD_STAGES.length - 1) {
              setCurrentStageIdx((prev) => prev + 1);
              playSlideSwoosh();
            }
          }}
          disabled={currentStageIdx === REBUILD_STAGES.length - 1}
          className={`flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/25 transition active:scale-95 ${
            currentStageIdx === REBUILD_STAGES.length - 1
              ? 'opacity-40 cursor-not-allowed'
              : ''
          }`}
        >
          <span>Next Stage ({currentStageIdx + 2 <= REBUILD_STAGES.length ? `Stage ${currentStageIdx + 2}` : 'Complete'})</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};
