import React, { useState } from 'react';
import { REAL_INCIDENTS_DATA } from '../../data/rebuildStagesData';
import type { RealIncident } from '../../data/rebuildStagesData';
import { ShieldCheck, Bug, CheckCircle2 } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const IncidentPostMortemInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [selectedIncident, setSelectedIncident] = useState<RealIncident>(REAL_INCIDENTS_DATA[0]);

  return (
    <div className="w-full space-y-4 text-left">
      {/* Incident Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {REAL_INCIDENTS_DATA.map((inc) => {
          const isSelected = selectedIncident.id === inc.id;
          return (
            <button
              key={inc.id}
              onClick={() => {
                setSelectedIncident(inc);
                playHapticClick();
              }}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Bug size={13} className={isSelected ? 'text-white' : 'text-rose-500'} />
              <span>{inc.title.split('(')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Main Post-Mortem Incident Docket */}
      <div className="liquid-glass rounded-3xl p-5 sm:p-7 border-rose-500/30 space-y-4">
        {/* Incident Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200/60 block mb-1">
              Production Post-Mortem Incident
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-[#1d1d1f]">
              {selectedIncident.title}
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
            Sev-1 Critical Defect
          </span>
        </div>

        {/* Runtime Symptom & Error Trace */}
        <div className="p-3.5 rounded-2xl bg-[#14110f] border border-[#463b32] text-[#f2ede6] font-mono text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-[#a69c90] border-b border-white/10 pb-1">
            <span className="text-rose-400 font-bold">Runtime Exception Trace</span>
            <span className="text-white/40">production telemetry</span>
          </div>
          <p className="text-rose-300 font-mono text-[11px] leading-relaxed pt-0.5 select-text">
            {selectedIncident.symptom}
          </p>
        </div>

        {/* Root Cause & Real Disaster Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-black/5 space-y-1 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] block">
              Root Cause Analysis
            </span>
            <p className="text-[#424245] leading-relaxed">
              {selectedIncident.rootCause}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
              Real Disaster Impact
            </span>
            <p className="text-rose-950 font-medium leading-relaxed">
              {selectedIncident.disasterImpact}
            </p>
          </div>
        </div>

        {/* The Senior Engineering Mitigation */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-bold uppercase tracking-wider text-[11px]">
            <ShieldCheck size={14} />
            <span>Senior Architectural Mitigation</span>
          </div>
          <p className="text-emerald-950 font-semibold leading-relaxed text-xs sm:text-sm">
            {selectedIncident.seniorMitigation}
          </p>
        </div>

        {/* Automated Preventing Regression Test */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 text-xs font-mono text-[#424245]">
          <div className="flex items-center gap-2 truncate">
            <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
            <span className="truncate">
              <strong>Permanent Regression Gate:</strong> <code className="text-blue-700">{selectedIncident.preventingTest}</code>
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded flex-shrink-0">
            PASS
          </span>
        </div>
      </div>
    </div>
  );
};
