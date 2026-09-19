import React, { useState } from 'react';
import { LEGAL_PRECEDENTS } from '../../data/rebuildStagesData';
import type { LegalPrecedent } from '../../data/rebuildStagesData';
import { Scale, BookOpen, CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const LegalPrecedentsInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [selectedCase, setSelectedCase] = useState<LegalPrecedent>(LEGAL_PRECEDENTS[0]);
  const [activeTab, setActiveTab] = useState<'courtroom' | 'rag-vs-finetune'>('courtroom');
  const [simulatedLawChange, setSimulatedLawChange] = useState(false);

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Tab Bar: Courtroom Precedents vs The Fine-Tuning vs RAG Simulator */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('courtroom');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'courtroom'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Scale size={13} />
            <span>The Courtroom Precedents (Real Penalties)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('rag-vs-finetune');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'rag-vs-finetune'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <BookOpen size={13} />
            <span>Interactive Simulator: Fine-Tuning vs RAG</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#86868b] hidden sm:inline">
          ISO 24495-1:2023 Plain Language
        </span>
      </div>

      {activeTab === 'courtroom' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Case Selector */}
          <div className="lg:col-span-4 space-y-2.5">
            {LEGAL_PRECEDENTS.map((item) => {
              const isSelected = selectedCase.caseName === item.caseName;
              return (
                <div
                  key={item.caseName}
                  onClick={() => {
                    setSelectedCase(item);
                    playHapticClick();
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-amber-500/50 shadow-sm ring-1 ring-amber-500/20'
                      : 'liquid-glass border-black/5 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-extrabold text-[#1d1d1f]">
                      {item.caseName}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] truncate">
                    {item.jurisdiction}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Case Docket File */}
          <div className="lg:col-span-8">
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-amber-500/30 space-y-4">
              <div className="border-b border-black/5 pb-3">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
                  <ShieldAlert size={14} />
                  <span>Verified Legal Record</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#1d1d1f]">
                  {selectedCase.caseName}
                </h3>
                <p className="text-xs font-mono text-[#86868b] pt-0.5">
                  {selectedCase.citation} • {selectedCase.jurisdiction}
                </p>
              </div>

              {/* What Happened */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                  What Happened
                </span>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {selectedCase.whatHappened}
                </p>
              </div>

              {/* Court Sanction & Liability Outcome */}
              <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/80 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">
                  Judicial Sanction & Civil Liability
                </span>
                <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                  {selectedCase.sanctionOrOutcome}
                </p>
              </div>

              {/* Engineering Lesson for Sanad */}
              <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                  Non-Negotiable Architecture Invariant
                </span>
                <p className="text-xs sm:text-sm text-blue-950 font-semibold leading-relaxed">
                  {selectedCase.engineeringLesson}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* The Interactive Simulator: Fine-Tuning vs RAG */
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/5 border border-black/5">
            <span className="text-xs font-semibold text-[#1d1d1f]">
              Simulate Statutory Amendment (e.g. Moroccan Parliament modifies Article 53 severance tiers):
            </span>
            <button
              onClick={() => {
                setSimulatedLawChange(!simulatedLawChange);
                playHapticClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                simulatedLawChange
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-[#1d1d1f] hover:bg-black/5'
              }`}
            >
              {simulatedLawChange ? 'Law Changed: Dahir Revised' : 'Baseline: 2003 Dahir'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Fine-Tuned Model Behavior */}
            <div className="rounded-3xl p-5 bg-rose-50/70 border border-rose-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                  <XCircle size={15} />
                  <span>Fine-Tuned LLM (Weights Only)</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  Probabilistic
                </span>
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                Knowledge is baked into weights &theta;. Fine-tuning shifts token probabilities, but cannot guarantee factual accuracy.
              </p>
              <div className="p-3 rounded-2xl bg-white/80 border border-rose-200 space-y-1.5 text-xs text-[#1d1d1f]">
                <strong>Query:</strong> "How many severance hours for 8 years of service?"
                <div className="pt-1 text-xs">
                  {simulatedLawChange ? (
                    <span className="text-rose-600 font-medium">
                      ⚠️ <strong>Hallucination:</strong> Still answers with 144 hours (old law) or invents a random number. Retraining requires weeks and $10,000+ GPU budget. Zero page citations provided.
                    </span>
                  ) : (
                    <span className="text-amber-800">
                      Answers 144 hours probabilistically, but cannot provide clickable proof to the physical Bulletin Officiel page.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Sanad RAG Constrained Architecture */}
            <div className="rounded-3xl p-5 bg-emerald-50/70 border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 size={15} />
                  <span>Sanad (Constrained Open-Book RAG)</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Deterministic
                </span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Memory is decoupled into SQLite & Qdrant. The LLM acts solely as a synthesis clerk quoting retrieved passages.
              </p>
              <div className="p-3 rounded-2xl bg-white/80 border border-emerald-200 space-y-1.5 text-xs text-[#1d1d1f]">
                <strong>Query:</strong> "How many severance hours for 8 years of service?"
                <div className="pt-1 text-xs">
                  {simulatedLawChange ? (
                    <span className="text-emerald-700 font-semibold">
                      ✓ <strong>Immediate Truth:</strong> New PDF synced in 120ms (SHA-256 update). The LLM cites: "According to amended Article 53 (BO n° 5210, page 14), 8 years entitles the employee to the updated schedule." Clickable evidence card provided.
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-semibold">
                      ✓ Answers 144 hours with exact link: Article 53, Dahir 1-03-194, Tier 2 (6-10 years).
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
