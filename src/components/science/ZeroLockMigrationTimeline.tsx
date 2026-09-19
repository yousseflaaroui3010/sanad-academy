import React, { useState } from 'react';
import { Database, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

export const ZeroLockMigrationTimeline: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      id: 'expand',
      phase: 'Phase 1: Expand',
      tag: 'Zero Lock Addition',
      sql: 'ALTER TABLE documents ADD COLUMN doc_version INTEGER DEFAULT 1;',
      desc: 'Add the new column as nullable or with a default value. In SQLite, this is an instant metadata operation that acquires zero exclusive table locks on running queries.',
      rule: 'Never drop or rename existing columns in Phase 1.'
    },
    {
      id: 'transition',
      phase: 'Phase 2: Transition (Dual Write)',
      tag: 'Rolling Deploy Safe',
      sql: 'db.execute("UPDATE documents SET doc_version = 1, legacy_version = 1;");',
      desc: 'Deploy code that writes to BOTH old and new columns. If you need to roll back the release, older servers continue reading legacy_version with zero crashes.',
      rule: 'Guarantees 100% backward-compatibility during zero-downtime rolling deploys.'
    },
    {
      id: 'contract',
      phase: 'Phase 3: Contract',
      tag: 'Safe Deprecation',
      sql: 'ALTER TABLE documents DROP COLUMN legacy_version;',
      desc: 'Once all production workers and users are on the new version, safely remove the legacy column. The database evolution completed with zero downtime.',
      rule: 'Safe schema evolution complete.'
    }
  ];

  return (
    <div className="rounded-3xl border border-blue-500/30 bg-[#090e1a] text-blue-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Database size={16} className="text-blue-400" />
            <span>Zero-Lock Database Migration Science (Expand-Contract Pattern)</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            How to modify SQLite table schemas under live production traffic without acquiring exclusive locks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
              playSlideSwoosh();
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition"
          >
            <span>{currentStep === steps.length - 1 ? 'Start Over' : 'Next Phase'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-blue-950/40 border border-blue-800/40 p-3.5 text-xs text-blue-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🌉</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Bridge Construction Metaphor:</span>
          If you want to replace an old suspension bridge, you don't blow up the old bridge first and stop all traffic for two years! You build a second bridge right alongside it (Expand), route cars onto both bridges (Transition), and then safely dismantle the old bridge (Contract). Zero traffic jams!
        </div>
      </div>

      {/* 3-Step Visual Timeline Progression */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map((s, idx) => {
          const isCurrent = idx === currentStep;
          const isPast = idx < currentStep;

          return (
            <div
              key={s.id}
              onClick={() => {
                setCurrentStep(idx);
                playHapticClick();
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition space-y-2 ${
                isCurrent
                  ? 'bg-blue-900/40 border-blue-500 shadow-md ring-2 ring-blue-400/20'
                  : isPast
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-black/30 border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">{s.phase}</span>
                {isPast && <CheckCircle2 size={13} className="text-emerald-400" />}
              </div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 block">{s.tag}</span>
              <p className="text-[11px] text-gray-300 font-sans leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* SQL Execution Panel */}
      <div className="rounded-2xl bg-black/50 border border-white/10 p-4 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-white/5 pb-2">
          <span>Executed DDL Query in {steps[currentStep].phase}:</span>
          <span className="text-emerald-400 font-bold">Lock Time: 0.0ms</span>
        </div>
        <pre className="text-emerald-300 overflow-x-auto">
          <code>{steps[currentStep].sql}</code>
        </pre>
        <div className="text-[10px] text-gray-400 font-sans pt-1">
          Rule: {steps[currentStep].rule}
        </div>
      </div>
    </div>
  );
};
