import React, { useState } from 'react';
import { Sliders, Database, FileText, TrendingUp, RotateCcw } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface DocumentRankItem {
  id: string;
  title: string;
  denseRank: number; // 1-based rank
  bm25Rank: number;  // 1-based rank
  denseSnippet: string;
}

const SAMPLE_DOCS: DocumentRankItem[] = [
  {
    id: 'doc_184',
    title: 'Article 184: 44 Hours Work Week',
    denseRank: 2,
    bm25Rank: 1, // Exact match for "184"
    denseSnippet: 'Dans les activités non agricoles, durée normale fixée à 44h/semaine.'
  },
  {
    id: 'doc_185',
    title: 'Article 185: Work Reduction in Crises',
    denseRank: 1, // High semantic match for "cutting hours"
    bm25Rank: 4,
    denseSnippet: 'Réduction de la durée normale de travail en cas de crise économique.'
  },
  {
    id: 'doc_14',
    title: 'Article 14: Manager Probation Period',
    denseRank: 3,
    bm25Rank: 3,
    denseSnippet: 'La période d\'essai pour les cadres est de 3 mois renouvelable une fois.'
  },
  {
    id: 'doc_dahir',
    title: 'Dahir n° 1-03-194: Promulgation',
    denseRank: 5,
    bm25Rank: 2, // High match for exact legal code keyword
    denseSnippet: 'Promulgation de la loi n° 65-99 relative au Code du travail.'
  },
  {
    id: 'doc_general',
    title: 'General Employee Definitions',
    denseRank: 4,
    bm25Rank: 5,
    denseSnippet: 'Dispositions générales et définitions des catégories professionnelles.'
  }
];

export const RrfToy: React.FC = () => {
  const [denseWeight, setDenseWeight] = useState(1.0);
  const [bm25Weight, setBm25Weight] = useState(1.0);
  const [kConstant, setKConstant] = useState(60);

  // Compute live RRF score for each doc and sort descending
  const rankedDocs = React.useMemo(() => {
    return SAMPLE_DOCS.map((doc) => {
      const denseContribution = denseWeight * (1 / (kConstant + doc.denseRank));
      const bm25Contribution = bm25Weight * (1 / (kConstant + doc.bm25Rank));
      const totalScore = denseContribution + bm25Contribution;

      return {
        ...doc,
        denseContribution,
        bm25Contribution,
        totalScore,
      };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }, [denseWeight, bm25Weight, kConstant]);

  return (
    <div className="space-y-6">
      {/* Header & Controls Bar */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <Sliders size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight">
                Hybrid Reciprocal Rank Fusion (RRF) Toy
              </h3>
              <p className="text-xs text-[#86868b]">
                Adjust Dense Semantic vs. Lexical BM25 weights and observe document rankings update live
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setDenseWeight(1.0);
              setBm25Weight(1.0);
              setKConstant(60);
              playHapticClick();
            }}
            className="flex items-center gap-1.5 rounded-full bg-black/5 hover:bg-black/10 px-3 py-1.5 text-xs font-semibold text-[#424245] transition self-start sm:self-auto"
          >
            <RotateCcw size={12} />
            <span>Default (k=60)</span>
          </button>
        </div>

        {/* Live Interactive Weight Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Dense Weight */}
          <div className="rounded-2xl bg-black/5 p-3.5 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1d1d1f] flex items-center gap-1.5">
                <Database size={13} className="text-purple-600" />
                Dense Vector Weight
              </span>
              <span className="text-purple-600 font-mono">{denseWeight.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0}
              max={3.0}
              step={0.1}
              value={denseWeight}
              onChange={(e) => {
                setDenseWeight(Number(e.target.value));
                playHapticClick();
              }}
              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <span className="text-[10px] text-[#86868b] block">Semantic synonyms & conceptual intent</span>
          </div>

          {/* BM25 Weight */}
          <div className="rounded-2xl bg-black/5 p-3.5 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1d1d1f] flex items-center gap-1.5">
                <FileText size={13} className="text-cyan-600" />
                Lexical BM25 Weight
              </span>
              <span className="text-cyan-600 font-mono">{bm25Weight.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0}
              max={3.0}
              step={0.1}
              value={bm25Weight}
              onChange={(e) => {
                setBm25Weight(Number(e.target.value));
                playHapticClick();
              }}
              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-cyan-600"
            />
            <span className="text-[10px] text-[#86868b] block">Exact statute numbers & legal acronyms</span>
          </div>

          {/* Smoothing Constant k */}
          <div className="rounded-2xl bg-black/5 p-3.5 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#1d1d1f]">Smoothing Constant (k)</span>
              <span className="text-indigo-600 font-mono">{kConstant}</span>
            </div>
            <input
              type="range"
              min={1}
              max={100}
              step={1}
              value={kConstant}
              onChange={(e) => {
                setKConstant(Number(e.target.value));
                playHapticClick();
              }}
              className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-[10px] text-[#86868b] block">Standard: 60 (prevents rank 1 domination)</span>
          </div>
        </div>
      </div>

      {/* Real-Time Ranked Results List */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-600" />
            <h4 className="text-sm font-bold text-[#1d1d1f]">
              Unified RRF Ranking Output (Top-K)
            </h4>
          </div>
          <span className="text-xs text-[#86868b] font-mono">
            RRF Score = w_dense/(k + r_dense) + w_bm25/(k + r_bm25)
          </span>
        </div>

        <div className="space-y-2.5">
          {rankedDocs.map((doc, rankIdx) => {
            const isWinner = rankIdx === 0;

            return (
              <div
                key={doc.id}
                className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isWinner
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-sm ring-2 ring-emerald-400/20'
                    : 'bg-white/70 border-black/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-xl font-bold text-xs flex-shrink-0 mt-0.5 ${
                      isWinner
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-black/5 text-[#424245]'
                    }`}
                  >
                    #{rankIdx + 1}
                  </span>

                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#1d1d1f]">
                      {doc.title}
                    </h5>
                    <p className="text-xs text-[#6e6e73] font-medium mt-0.5 italic">
                      "{doc.denseSnippet}"
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-[#86868b] mt-1.5 font-mono">
                      <span>Dense Rank: #{doc.denseRank}</span>
                      <span>•</span>
                      <span>BM25 Rank: #{doc.bm25Rank}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end sm:items-end flex-col sm:text-right flex-shrink-0">
                  <span className="text-[10px] uppercase font-bold text-[#86868b]">
                    Combined RRF
                  </span>
                  <span className="text-sm font-extrabold text-blue-700 font-mono tabular-nums">
                    {doc.totalScore.toFixed(5)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
