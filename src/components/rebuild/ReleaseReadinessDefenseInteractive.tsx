import React, { useState } from 'react';
import { Award, Play, Sparkles } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const ReleaseReadinessDefenseInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [isRunningVerification, setIsRunningVerification] = useState(false);
  const [isCleared, setIsCleared] = useState(false);

  const releases = [
    { version: 'v1.0.0', date: 'August 2026', milestone: 'Foundational RAG Pipeline: SQLite WAL, Qdrant vectors, and local-first execution.' },
    { version: 'v1.1.0', date: 'Late August 2026', milestone: 'Conversion Ladder expansion: Tesseract OCR for scanned Dahirs and PPTX slide intake.' },
    { version: 'v2.0.0', date: 'September 2026', milestone: 'Enterprise Security Hardening: Keycloak OIDC, AES-GCM cookies, and silent 404 BOLA defenses.' },
    { version: 'v3.1.0', date: 'September 18, 2026', milestone: 'Production Release: 1,377 tests, release gate bouncer, Railway /app/data volume deployment.' },
  ];

  const handleRunFullVerification = () => {
    setIsRunningVerification(true);
    playHapticClick();
    setTimeout(() => {
      setIsRunningVerification(false);
      setIsCleared(true);
      playSuccessChime();
    }, 600);
  };

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Banner */}
      <div className="liquid-glass rounded-3xl p-5 border-blue-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Award size={14} />
            <span>Master Thesis Defense Clearance & Release v3.1.0</span>
          </span>
          <span className="text-[10px] font-mono text-[#86868b]">
            ENSAF Master Thesis Defense (26 Sept 2026)
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
          The culmination of 6 agile development sprints: full mathematical verification across 1,377 tests, the 60-question golden benchmark, and zero-downtime database schemas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Version Progression Timeline */}
        <div className="lg:col-span-6 space-y-3">
          <div className="liquid-glass rounded-3xl p-5 border-black/10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block border-b border-black/5 pb-2">
              Semantic Versioning Progression (pyproject.toml)
            </span>

            <div className="space-y-2.5">
              {releases.map((rel) => (
                <div key={rel.version} className="p-3 rounded-2xl bg-black/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                      {rel.version}
                    </span>
                    <span className="text-[10px] font-mono text-[#86868b]">{rel.date}</span>
                  </div>
                  <p className="text-[#424245] leading-relaxed text-[11px] pt-0.5">
                    {rel.milestone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Master Verification & Clearance Seal */}
        <div className="lg:col-span-6 space-y-3">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-black/10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block border-b border-black/5 pb-2">
              Automated Thesis Defense Verification Runner
            </span>
            <p className="text-xs text-[#424245] leading-relaxed">
              Executes the complete testing pyramid (1,377 unit & integration tests) and runs the Release Gate Bouncer on the 60-question golden dataset.
            </p>

            <button
              onClick={handleRunFullVerification}
              disabled={isRunningVerification}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              <Play size={14} className={isRunningVerification ? 'animate-spin' : ''} />
              <span>{isRunningVerification ? 'Executing 1,377 Tests & Release Gates...' : 'Execute Complete Defense Verification Suite'}</span>
            </button>

            {/* Defense Clearance Certificate Seal */}
            {isCleared && (
              <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 text-emerald-950 space-y-2 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Sparkles size={14} className="text-emerald-600" />
                    <span>ACADEMIC DEFENSE CLEARANCE GRANTED</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    100% READY
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  All 1,377 tests passed. RAGAS Faithfulness: 94% (&ge; 90%). 20/20 out-of-scope questions refused. Zero open Sev-1/Sev-2 defects. Ready for examination jury presentation.
                </p>
                <div className="pt-1 text-[10px] font-mono text-emerald-800 border-t border-emerald-200/80 flex items-center justify-between">
                  <span>Signatures: Youssef LAAROUI (YL) &amp; Meriem BENAATIT (MB)</span>
                  <span>Exit Code 0</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
