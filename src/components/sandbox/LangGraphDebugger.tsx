import React, { useState } from 'react';
import { Terminal, Play, StepForward, RotateCcw, Copy, Check, Cpu } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

interface GraphState {
  query: string;
  split_queries: string[];
  requires_clarification: boolean;
  retrieval_passages: {
    id: string;
    parent_id: string;
    score: number;
    text: string;
  }[];
  relevance_grades: {
    chunk_id: string;
    is_relevant: boolean;
    confidence: number;
  }[];
  loop_count: number;
  draft_answer: string;
  is_refusal: boolean;
  evidence_certificate: {
    answer: string;
    article_citations: string[];
    confidence_score: number;
    verified_faithful: boolean;
    source_documents: string[];
  } | null;
}

const PRESET_QUERIES = [
  {
    label: 'Valid Query',
    q: 'What is the probation period for managerial staff under Article 14 of the Moroccan Labor Code?'
  },
  {
    label: 'Ambiguous Query',
    q: 'How long is the probation period?'
  },
  {
    label: 'Out-of-Scope Query',
    q: 'What is the speed of light in a vacuum?'
  },
  {
    label: 'Complex Legal Statute',
    q: 'Can an employer reduce weekly working hours during economic crises under Article 185?'
  }
];

export const LangGraphDebugger: React.FC = () => {
  const [query, setQuery] = useState(PRESET_QUERIES[0].q);
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const nodeSequence = [
    'split_query',
    'clarify_query',
    'retrieve_docs',
    'grade_relevance',
    'synthesize_answer',
    'format_citations',
    'verify_faithfulness'
  ];

  // Derive simulated state based on query and activeStep
  const isAmbiguous = query.toLowerCase() === 'how long is the probation period?';
  const isOutOfScope = query.toLowerCase().includes('speed of light');

  const graphState: GraphState = React.useMemo(() => {
    const s: GraphState = {
      query,
      split_queries: [query],
      requires_clarification: false,
      retrieval_passages: [],
      relevance_grades: [],
      loop_count: 0,
      draft_answer: '',
      is_refusal: false,
      evidence_certificate: null
    };

    if (activeStep >= 1) {
      // Step 1: split
      s.split_queries = query.includes('and')
        ? query.split('and').map((q) => q.trim())
        : [query];
    }

    if (activeStep >= 2) {
      // Step 2: clarify
      if (isAmbiguous) {
        s.requires_clarification = true;
        s.draft_answer = 'CLARIFICATION_REQUIRED: Please specify employee category (managerial cadre vs worker).';
        return s;
      }
    }

    if (activeStep >= 3) {
      // Step 3: retrieve
      if (isOutOfScope) {
        s.retrieval_passages = [
          { id: 'chunk_891', parent_id: 'doc_labor_p1', score: 0.24, text: 'Dispositions générales du droit du travail...' }
        ];
      } else {
        s.retrieval_passages = [
          { id: 'chunk_104', parent_id: 'art_14_p1', score: 0.94, text: 'La période d\'essai pour les cadres et assimilés est fixée à trois mois renouvelable une fois.' },
          { id: 'chunk_105', parent_id: 'art_14_p2', score: 0.88, text: 'Pour les employés, elle est d\'un mois et demi renouvelable une fois.' }
        ];
      }
    }

    if (activeStep >= 4) {
      // Step 4: grade
      if (isOutOfScope) {
        s.relevance_grades = [{ chunk_id: 'chunk_891', is_relevant: false, confidence: 0.12 }];
        s.loop_count = 3;
        s.is_refusal = true;
        s.draft_answer = 'NOT_COVERED: The requested topic is absent from the provided Moroccan Labor Code workspace.';
      } else {
        s.relevance_grades = [
          { chunk_id: 'chunk_104', is_relevant: true, confidence: 0.96 },
          { chunk_id: 'chunk_105', is_relevant: true, confidence: 0.89 }
        ];
      }
    }

    if (activeStep >= 5) {
      // Step 5: synthesize
      if (!s.is_refusal && !s.requires_clarification) {
        s.draft_answer = 'Under Article 14 of the Moroccan Labor Code, the probation period for managerial staff (cadres et assimilés) is three months, renewable once for an additional three months, totaling a maximum of six months.';
      }
    }

    if (activeStep >= 6) {
      // Step 6: format citations
      if (!s.is_refusal && !s.requires_clarification) {
        s.evidence_certificate = {
          answer: s.draft_answer,
          article_citations: ['Article 14, Page 8, Dahir n° 1-03-194'],
          confidence_score: 0.97,
          verified_faithful: true,
          source_documents: ['code_du_travail_marocain.pdf']
        };
      }
    }

    return s;
  }, [query, activeStep, isAmbiguous, isOutOfScope]);

  const handleStepNext = () => {
    setActiveStep((prev) => Math.min(nodeSequence.length, prev + 1));
    playHapticClick();
  };

  const handleStepPrev = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
    playHapticClick();
  };

  const handleRunAll = () => {
    setActiveStep(nodeSequence.length);
    playSlideSwoosh();
  };

  const handleReset = () => {
    setActiveStep(0);
    playHapticClick();
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(graphState, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Console Header */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight">
                Live LangGraph Debugger Console
              </h3>
              <p className="text-xs text-[#86868b]">
                Step through the compiled cyclic StateGraph and inspect raw JSON state transitions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-2 rounded-full hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition"
              title="Reset State"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={handleStepPrev}
              disabled={activeStep === 0}
              className="px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-xs font-semibold text-[#424245] disabled:opacity-30 transition"
            >
              Step Back
            </button>
            <button
              onClick={handleStepNext}
              disabled={activeStep >= nodeSequence.length}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 shadow-sm transition"
            >
              <StepForward size={13} />
              <span>Step Next Node</span>
            </button>
            <button
              onClick={handleRunAll}
              className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#1d1d1f] text-white text-xs font-semibold hover:bg-black shadow-sm transition"
            >
              <Play size={12} />
              <span>Run All</span>
            </button>
          </div>
        </div>

        {/* Query Input & Presets */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#424245] block">
            Input Question:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveStep(0);
              }}
              className="w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-2.5 text-xs sm:text-sm text-[#1d1d1f] font-medium outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px]">
            <span className="text-[#86868b] font-medium">Presets:</span>
            {PRESET_QUERIES.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setQuery(p.q);
                  setActiveStep(0);
                  playHapticClick();
                }}
                className={`rounded-full px-2.5 py-0.5 border text-xs transition whitespace-nowrap ${
                  query === p.q
                    ? 'bg-purple-50 text-purple-700 border-purple-200 font-bold'
                    : 'bg-white/60 text-[#424245] border-black/5 hover:bg-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Node Pipeline Progression */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] mb-2">
            <span>Execution Progression:</span>
            <span className="text-purple-600 font-mono">
              {activeStep === 0
                ? 'Idle (Awaiting Start)'
                : activeStep >= nodeSequence.length
                ? 'Completed (Output Certificate)'
                : `Station: ${nodeSequence[activeStep - 1]}`}
            </span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {nodeSequence.map((nodeName, idx) => {
              const isPast = idx < activeStep;
              const isCurrent = idx === activeStep - 1;

              return (
                <div
                  key={nodeName}
                  onClick={() => {
                    setActiveStep(idx + 1);
                    playHapticClick();
                  }}
                  className={`flex-1 min-w-[90px] p-2 rounded-xl border text-center cursor-pointer transition text-[10px] font-mono font-bold ${
                    isCurrent
                      ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-500/30'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-black/5 text-[#86868b] border-black/5'
                  }`}
                >
                  <div>{idx + 1}. {nodeName}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-Time JSON State Inspector Window */}
      <div className="rounded-3xl bg-[#1a1b26] text-gray-100 p-6 font-mono shadow-2xl border border-black/20 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-purple-400" />
            <span className="text-xs font-bold text-gray-200">
              AgentState Payload Inspector (TypedDict)
            </span>
          </div>

          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 px-2.5 py-1 text-xs text-gray-300 transition"
            title="Copy JSON State"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>
        </div>

        <pre className="text-xs leading-relaxed overflow-x-auto max-h-96 pr-4 text-emerald-300">
          <code>{JSON.stringify(graphState, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
