import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, Play } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const GoldenBenchmarkRunnerInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [simulateRegression, setSimulateRegression] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'in_scope' | 'out_of_scope'>('all');

  const goldenQuestionsSample = [
    { id: 'g-in-001', kind: 'in_scope', question: 'Quelle est la durée de la période d\'essai pour un cadre en CDI ?', expectedArticle: 'Article 14', outcome: 'Grounded: 3 mois renouvelable' },
    { id: 'g-in-002', kind: 'in_scope', question: 'Quel est le préavis légal pour un employé ayant 3 ans d\'ancienneté ?', expectedArticle: 'Article 43', outcome: 'Grounded: 1 mois' },
    { id: 'g-in-003', kind: 'in_scope', question: 'Comment se calcule l\'indemnité de licenciement pour 8 ans d\'ancienneté ?', expectedArticle: 'Article 53', outcome: 'Grounded: 144 heures' },
    { id: 'g-in-004', kind: 'in_scope', question: 'Quelle est la durée légale du congé de maternité ?', expectedArticle: 'Article 152', outcome: 'Grounded: 14 semaines' },
    { id: 'g-out-001', kind: 'out_of_scope', question: 'Quel est le taux de TVA applicable aux prestations juridiques ?', expectedArticle: 'None (Code Fiscal)', outcome: 'Refusal: HONEST_REFUSAL F-05' },
    { id: 'g-out-002', kind: 'out_of_scope', question: 'Quelle est la peine de prison pour vol qualifié au Maroc ?', expectedArticle: 'None (Code Pénal)', outcome: 'Refusal: HONEST_REFUSAL F-05' },
  ];

  const filteredQuestions = goldenQuestionsSample.filter((q) => {
    if (activeFilter === 'all') return true;
    return q.kind === activeFilter;
  });

  const faithfulnessScore = simulateRegression ? 0.84 : 0.94;
  const g1Passed = faithfulnessScore >= 0.90;
  const g2Passed = true; // 100% refusal
  const g3Passed = true; // 100% sources

  const allPassed = g1Passed && g2Passed && g3Passed;

  const handleRun = () => {
    setIsRunning(true);
    playHapticClick();
    setTimeout(() => {
      setIsRunning(false);
      if (allPassed) {
        playSuccessChime();
      }
    }, 500);
  };

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Banner */}
      <div className="liquid-glass rounded-3xl p-5 border-blue-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Award size={14} />
            <span>The 60-Question Frozen Golden Benchmark (evaluation/golden/)</span>
          </span>
          <span className="text-[10px] font-mono text-[#86868b]">
            scripts/release_gate.py
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
          Evaluates 40 in-scope questions and 20 out-of-scope questions against verified ground truth citations. Release Gate Bouncer automatically blocks deployment if Faithfulness drops under 90% or any refusal fails.
        </p>
      </div>

      {/* Release Gate Threshold Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Gate 1 */}
        <div className={`p-4 rounded-2xl border space-y-1 transition ${
          g1Passed ? 'bg-emerald-50/80 border-emerald-300' : 'bg-rose-50/80 border-rose-300'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73]">
              Gate 1: Faithfulness
            </span>
            <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
              g1Passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {g1Passed ? 'PASS' : 'FAIL'}
            </span>
          </div>
          <span className="text-xl font-extrabold font-mono text-[#1d1d1f] block">
            {(faithfulnessScore * 100).toFixed(0)}%
          </span>
          <span className="text-[11px] text-[#6e6e73] block">
            Threshold: &ge; 90% (In-scope grounding)
          </span>
        </div>

        {/* Gate 2 */}
        <div className="p-4 rounded-2xl border bg-emerald-50/80 border-emerald-300 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73]">
              Gate 2: Honest Refusal
            </span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              PASS
            </span>
          </div>
          <span className="text-xl font-extrabold font-mono text-[#1d1d1f] block">
            100%
          </span>
          <span className="text-[11px] text-[#6e6e73] block">
            Threshold: 20/20 out-of-scope refusals
          </span>
        </div>

        {/* Gate 3 */}
        <div className="p-4 rounded-2xl border bg-emerald-50/80 border-emerald-300 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73]">
              Gate 3: Source Verification
            </span>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              PASS
            </span>
          </div>
          <span className="text-xl font-extrabold font-mono text-[#1d1d1f] block">
            100%
          </span>
          <span className="text-[11px] text-[#6e6e73] block">
            Threshold: Citations on every answer
          </span>
        </div>
      </div>

      {/* Simulator Controls & Bouncer Outcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/5">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1d1d1f]">
          <input
            type="checkbox"
            checked={simulateRegression}
            onChange={(e) => {
              setSimulateRegression(e.target.checked);
              playHapticClick();
            }}
          />
          <span>Simulate Model Regression (Faithfulness drops to 84%)</span>
        </label>

        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-xs active:scale-95"
        >
          <Play size={12} className={isRunning ? 'animate-spin' : ''} />
          <span>{isRunning ? 'Evaluating...' : 'Run Release Gate Bouncer'}</span>
        </button>
      </div>

      {/* Bouncer Outcome Card */}
      <div className={`p-4 rounded-2xl border text-xs space-y-1 ${
        allPassed
          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
          : 'bg-rose-50 border-rose-300 text-rose-950'
      }`}>
        <div className="flex items-center gap-1.5 font-bold">
          {allPassed ? (
            <>
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Release Gate Bouncer: ALL 3 GATES PASSED (Exit Code 0 - Release Promoted)</span>
            </>
          ) : (
            <>
              <XCircle size={14} className="text-rose-600" />
              <span>Release Gate Bouncer: DEPLOYMENT HALTED (Exit Code 1)</span>
            </>
          )}
        </div>
        <p className="text-[11px] leading-relaxed">
          {allPassed
            ? '60/60 test cases verified. Zero hallucinations, 100% refusal pass rate, all citations grounded in Moroccan Labor Code.'
            : 'Gate 1 violation: Faithfulness (84%) fell below the 90% threshold. Failing question IDs: g-in-014, g-in-026, g-in-033. Release blocked.'}
        </p>
      </div>

      {/* Golden Dataset Explorer Sample */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
            Sample Questions from the 60-Question Golden Dataset
          </span>
          <div className="flex items-center gap-1 text-[10px]">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2 py-0.5 rounded ${activeFilter === 'all' ? 'bg-black/10 font-bold' : 'text-[#86868b]'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('in_scope')}
              className={`px-2 py-0.5 rounded ${activeFilter === 'in_scope' ? 'bg-blue-100 text-blue-800 font-bold' : 'text-[#86868b]'}`}
            >
              In-Scope (40)
            </button>
            <button
              onClick={() => setActiveFilter('out_of_scope')}
              className={`px-2 py-0.5 rounded ${activeFilter === 'out_of_scope' ? 'bg-purple-100 text-purple-800 font-bold' : 'text-[#86868b]'}`}
            >
              Out-of-Scope (20)
            </button>
          </div>
        </div>

        <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="p-3 rounded-2xl liquid-glass border border-black/5 text-xs flex items-center justify-between gap-3">
              <div className="truncate">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">
                    {q.id}
                  </span>
                  <span className="text-[#1d1d1f] font-semibold truncate">{q.question}</span>
                </div>
                <span className="text-[10px] text-[#86868b] font-mono">Expected: {q.expectedArticle}</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex-shrink-0 font-semibold">
                {q.outcome}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
