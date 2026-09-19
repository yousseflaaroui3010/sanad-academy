import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, FileText } from 'lucide-react';
import { playSuccessChime, playWarningThud } from '../../utils/soundEffects';

interface Claim {
  id: string;
  text: string;
  entailed: boolean; // True if supported by context
  sourceRef: string;
}

export const ClaimDecompositionToy: React.FC = () => {
  const [includeHallucination, setIncludeHallucination] = useState(false);

  const contextText =
    "Article 184: Dans les activités non agricoles, la durée normale de travail est fixée à 2288 heures par an ou 44 heures par semaine. La durée quotidienne ne peut excéder 10 heures.";

  const claims: Claim[] = [
    {
      id: 'c1',
      text: 'The standard work week is 44 hours in non-agricultural companies.',
      entailed: true,
      sourceRef: 'Article 184: "44 heures par semaine"'
    },
    {
      id: 'c2',
      text: 'The annual working hours ceiling is 2,288 hours.',
      entailed: true,
      sourceRef: 'Article 184: "2288 heures par an"'
    },
    {
      id: 'c3',
      text: 'The maximum allowable daily work duration is 10 hours.',
      entailed: true,
      sourceRef: 'Article 184: "ne peut excéder 10 heures"'
    },
  ];

  if (includeHallucination) {
    claims.push({
      id: 'c4_fake',
      text: 'Employees are entitled to 30 days of mandatory annual paid leave.',
      entailed: false,
      sourceRef: 'NOT FOUND in retrieved context (Hallucination!)'
    });
  }

  const supportedCount = claims.filter((c) => c.entailed).length;
  const faithfulnessScore = Math.round((supportedCount / claims.length) * 100);
  const passesGate1 = faithfulnessScore >= 90;

  const toggleHallucination = () => {
    const next = !includeHallucination;
    setIncludeHallucination(next);
    if (!next) playSuccessChime();
    else playWarningThud();
  };

  return (
    <div className="rounded-3xl border border-blue-500/30 bg-[#080d1a] text-blue-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Award size={16} className="text-blue-400" />
            <span>RAGAS Mathematical Claim Decomposition Science</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            How Gate 1 mathematically decomposes generated answers into atomic claims to calculate Faithfulness
          </p>
        </div>

        {/* Toggle Simulated Hallucination */}
        <button
          onClick={toggleHallucination}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-xs ${
            includeHallucination
              ? 'bg-rose-600 text-white'
              : 'bg-emerald-600 text-white'
          }`}
        >
          <span>{includeHallucination ? 'Remove Hallucination' : 'Inject Hallucinated Claim'}</span>
        </button>
      </div>

      {/* RAGAS Formula Banner */}
      <div className="rounded-2xl bg-blue-950/40 border border-blue-800/40 p-3.5 text-xs text-blue-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🧮</span>
        <div>
          <span className="font-bold text-white block mb-0.5 font-mono">
            RAGAS Faithfulness Formula: |Supported Claims| / |Total Claims|
          </span>
          To evaluate an answer objectively without guessing, the LLM-as-a-judge first chops the answer into atomic factual claims. Each claim is checked independently against the context. If all claims have proof, Faithfulness = 100%.
        </div>
      </div>

      {/* Retrieved Context Box */}
      <div className="rounded-2xl border border-white/10 bg-[#10172a] p-4 space-y-1.5 font-sans">
        <span className="text-[10px] font-bold text-gray-400 uppercase font-mono flex items-center gap-1.5">
          <FileText size={12} className="text-blue-400" />
          Retrieved Ground Truth Context:
        </span>
        <p className="text-xs text-gray-300 font-serif italic leading-relaxed">
          "{contextText}"
        </p>
      </div>

      {/* Atomic Claims Decomposition Grid */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-xs font-bold text-gray-300">
          <span>Decomposed Atomic Claims ({claims.length}):</span>
          <span className="text-emerald-400 font-mono">
            {supportedCount} of {claims.length} verified
          </span>
        </div>

        <div className="space-y-2">
          {claims.map((claim, idx) => (
            <div
              key={claim.id}
              className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition ${
                claim.entailed
                  ? 'bg-[#0f1f1d] border-emerald-500/40 text-emerald-200'
                  : 'bg-[#220d15] border-rose-500/50 text-rose-200'
              }`}
            >
              <div className="flex items-start gap-2.5 font-sans">
                {claim.entailed ? (
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-white mr-1.5 font-mono">c{idx + 1}:</span>
                  <span>{claim.text}</span>
                  <div className="text-[10px] font-mono text-gray-400 mt-1">
                    Proof: <span className={claim.entailed ? 'text-emerald-300' : 'text-rose-400 font-bold'}>{claim.sourceRef}</span>
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded flex-shrink-0 self-start sm:self-auto ${
                claim.entailed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}>
                {claim.entailed ? 'Context ⊨ Claim' : 'Entailment Failed'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gate 1 Verdict Card */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between font-sans ${
        passesGate1
          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
          : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
      }`}>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider font-mono block">
            Gate 1 Faithfulness Threshold: ≥ 90%
          </span>
          <span className="text-sm sm:text-base font-bold text-white mt-0.5 block">
            Calculated Faithfulness: <span className="font-mono">{faithfulnessScore}%</span>{' '}
            {passesGate1 ? '(GATE 1 CLEARED ✓)' : '(GATE 1 REJECTED 🛑)'}
          </span>
        </div>

        <div className="text-right text-xs font-mono">
          <span>{supportedCount}/{claims.length} claims</span>
        </div>
      </div>
    </div>
  );
};
