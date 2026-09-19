import React, { useState } from 'react';
import { SCRUM_SPRINT_PLANS } from '../../data/rebuildStagesData';
import { GitPullRequest, GitMerge, AlertTriangle, CheckCircle2, UserCheck, Clock } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const ScrumCockpitInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [activeSubTab, setActiveSubTab] = useState<'cadence' | 'rule-5'>('rule-5');
  const [ylApproved, setYlApproved] = useState(false);
  const [mbApproved, setMbApproved] = useState(false);
  const [mergeAttempted, setMergeAttempted] = useState(false);
  const [activeSprintIndex, setActiveSprintIndex] = useState(0);

  const canMerge = ylApproved && mbApproved;

  const handleMerge = () => {
    setMergeAttempted(true);
    if (canMerge) {
      playSuccessChime();
    } else {
      playHapticClick();
    }
  };

  return (
    <div className="w-full space-y-4 text-left">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveSubTab('rule-5');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'rule-5'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <GitPullRequest size={13} />
            <span>Rule 5 Two-Person Review Simulator</span>
          </button>
          <button
            onClick={() => {
              setActiveSubTab('cadence');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeSubTab === 'cadence'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Clock size={13} />
            <span>6-Sprint Production Cadence</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#86868b] hidden sm:inline">
          tests/review_rules.py
        </span>
      </div>

      {activeSubTab === 'rule-5' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Role Separation Matrix */}
          <div className="lg:col-span-5 space-y-3">
            <div className="liquid-glass rounded-2xl p-4 space-y-2 border-blue-500/20">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <UserCheck size={14} />
                <span>YL: Systems Architect</span>
              </div>
              <p className="text-xs text-[#424245] leading-relaxed">
                Owns SQLite 3NF schemas, WAL concurrency, Qdrant vectors, uv CPU PyTorch, Docker packaging, and Railway deployment.
              </p>
            </div>

            <div className="liquid-glass rounded-2xl p-4 space-y-2 border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <UserCheck size={14} />
                <span>MB: Quality Guardian</span>
              </div>
              <p className="text-xs text-[#424245] leading-relaxed">
                Owns Moroccan Labor Code ground truth, 60-question golden benchmark, RAGAS metrics computation, and academic thesis defense preparation.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-950 space-y-1">
              <strong>The 3-Rollback Circuit Breaker:</strong> If any feature branch breaks CI or drops the RAGAS score on 3 consecutive builds, it is immediately discarded to safeguard the release deadline.
            </div>
          </div>

          {/* Right: Interactive PR Review Simulator */}
          <div className="lg:col-span-7">
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-black/10 space-y-4">
              <div className="border-b border-black/5 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200/60">
                    PR #142: feat(agent): add RRF k=60 hybrid fusion
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#86868b]">
                    target: master
                  </span>
                </div>
                <p className="text-xs text-[#424245] pt-2">
                  Attempting to merge new hybrid search code into the master branch. Both architectural keys are required.
                </p>
              </div>

              {/* Dual Approval Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3.5 rounded-2xl border flex items-start gap-2.5 cursor-pointer transition ${
                  ylApproved ? 'bg-blue-50/80 border-blue-300 ring-1 ring-blue-400/20' : 'bg-black/5 border-black/5'
                }`}>
                  <input
                    type="checkbox"
                    checked={ylApproved}
                    onChange={(e) => {
                      setYlApproved(e.target.checked);
                      setMergeAttempted(false);
                      playHapticClick();
                    }}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1d1d1f] block">YL Approval</span>
                    <span className="text-[10px] text-[#6e6e73]">Verified systems & memory footprint</span>
                  </div>
                </label>

                <label className={`p-3.5 rounded-2xl border flex items-start gap-2.5 cursor-pointer transition ${
                  mbApproved ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400/20' : 'bg-black/5 border-black/5'
                }`}>
                  <input
                    type="checkbox"
                    checked={mbApproved}
                    onChange={(e) => {
                      setMbApproved(e.target.checked);
                      setMergeAttempted(false);
                      playHapticClick();
                    }}
                    className="mt-0.5"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1d1d1f] block">MB Approval</span>
                    <span className="text-[10px] text-[#6e6e73]">Verified legal ground truth & RAGAS</span>
                  </div>
                </label>
              </div>

              {/* Action Button */}
              <button
                onClick={handleMerge}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition active:scale-95"
              >
                <GitMerge size={14} />
                <span>Execute Rule 5 Enforcement Check</span>
              </button>

              {/* Result Banner */}
              {mergeAttempted && (
                <div className={`p-3.5 rounded-2xl border transition-all text-xs space-y-1 ${
                  canMerge
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex items-center gap-1.5 font-bold">
                    {canMerge ? (
                      <>
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        <span>Rule 5 Verified: Cryptographic Sign-Off Approved!</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={14} className="text-rose-600" />
                        <span>Governance Violation: tests/review_rules.py halted merge (Exit 1)</span>
                      </>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {canMerge
                      ? 'Both architectural signatures verified. Pull request #142 merged to master with zero unreviewed code.'
                      : `Missing signature: ${!ylApproved ? 'YL (Systems)' : ''} ${!ylApproved && !mbApproved ? 'and' : ''} ${!mbApproved ? 'MB (Legal Truth)' : ''}. Branch protection prevents unreviewed code from reaching staging.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* The 6-Sprint Cadence Timeline */
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {SCRUM_SPRINT_PLANS.map((plan, idx) => (
              <button
                key={plan.sprint}
                onClick={() => {
                  setActiveSprintIndex(idx);
                  playHapticClick();
                }}
                className={`p-3 rounded-2xl border text-left transition ${
                  activeSprintIndex === idx
                    ? 'bg-blue-600 text-white shadow-xs border-blue-600'
                    : 'liquid-glass border-black/5 hover:border-black/15 text-[#1d1d1f]'
                }`}
              >
                <span className={`text-[10px] font-bold block uppercase tracking-wider ${
                  activeSprintIndex === idx ? 'text-blue-100' : 'text-[#86868b]'
                }`}>
                  {plan.sprint}
                </span>
                <span className="text-xs font-extrabold truncate block">
                  {plan.owner}
                </span>
              </button>
            ))}
          </div>

          {/* Active Sprint Detail Card */}
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-black/10 space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200/60 mr-2">
                  {SCRUM_SPRINT_PLANS[activeSprintIndex].sprint}
                </span>
                <h3 className="text-base font-extrabold text-[#1d1d1f] inline">
                  {SCRUM_SPRINT_PLANS[activeSprintIndex].title}
                </h3>
              </div>
              <span className="text-xs font-bold text-[#6e6e73]">
                Owner: {SCRUM_SPRINT_PLANS[activeSprintIndex].owner}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                Deliverables & Invariants
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SCRUM_SPRINT_PLANS[activeSprintIndex].deliverables.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-black/5 text-xs text-[#1d1d1f] flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                Release Gate Pass Criterion
              </span>
              <p className="text-xs text-blue-950 font-semibold">
                "{SCRUM_SPRINT_PLANS[activeSprintIndex].gateCriteria}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
