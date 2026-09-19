import React, { useState } from 'react';
import { Activity, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const MonitoringTracingInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<'up' | 'down' | null>(null);

  const traceSteps = [
    { step: 'summary', latencyMs: 14, detail: 'Loaded previous 2 turns; context condensed' },
    { step: 'rewrite', latencyMs: 180, detail: 'Query split into 2 searches: Article 53 calculation | severance tiers' },
    { step: 'search', latencyMs: 34, detail: 'Ran hybrid search on ws_hr_children; returned 8 chunks' },
    { step: 'grade', latencyMs: 110, detail: '8/8 chunks verified relevant to Moroccan Labor Code' },
    { step: 'parents', latencyMs: 18, detail: 'Retrieved 2 parent sections (par_dahir_art53) from disk' },
    { step: 'answer', latencyMs: 1240, detail: 'Grounded synthesis completed; 2 citations formatted' },
  ];

  const totalLatency = traceSteps.reduce((acc, curr) => acc + curr.latencyMs, 0);

  const handleFeedback = (verdict: 'up' | 'down') => {
    setFeedbackSubmitted(verdict);
    playHapticClick();
    playSuccessChime();
  };

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Banner */}
      <div className="liquid-glass rounded-3xl p-5 border-blue-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Activity size={14} />
            <span>In-Process Observability & Step Tracing (agent/trace.py)</span>
          </span>
          <span className="text-[10px] font-mono text-[#86868b]">
            ADR-09 & db/schema.sql
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
          Sanad records execution telemetry in-process without transmitting legal queries to foreign monitoring clouds. The trace <strong>is</strong> the counter: retry counts and search counts are derived directly from recorded steps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Execution Trace Timeline */}
        <div className="lg:col-span-7 space-y-3">
          <div className="liquid-glass rounded-3xl p-5 border-black/10 space-y-3">
            <div className="flex items-center justify-between border-b border-black/5 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                Node-by-Node Execution Trace
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600">
                Total: {totalLatency}ms
              </span>
            </div>

            <div className="space-y-2">
              {traceSteps.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-black/5 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase">
                      {step.step}
                    </span>
                    <span className="text-[#1d1d1f] font-medium truncate">{step.detail}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#86868b] flex-shrink-0">
                    {step.latencyMs}ms
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-[11px] text-blue-950">
              <strong>The Counter Invariant (trace.py line 8):</strong> Retries and searches are calculated from actual recorded trace steps, never by incrementing a separate loose integer that could drift.
            </div>
          </div>
        </div>

        {/* Right: Latency Percentiles & Feedback Logger */}
        <div className="lg:col-span-5 space-y-3">
          {/* Latency Percentiles Card */}
          <div className="liquid-glass rounded-2xl p-4 border-black/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block">
              Production Latency Percentiles (2 vCPU)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-black/5 space-y-0.5">
                <span className="text-[10px] text-[#86868b] uppercase font-bold">p50 Latency</span>
                <span className="text-base font-extrabold font-mono text-[#1d1d1f] block">1.8s</span>
                <span className="text-[10px] text-emerald-600">Within UX target</span>
              </div>
              <div className="p-3 rounded-xl bg-black/5 space-y-0.5">
                <span className="text-[10px] text-[#86868b] uppercase font-bold">p95 Latency</span>
                <span className="text-base font-extrabold font-mono text-[#1d1d1f] block">4.2s</span>
                <span className="text-[10px] text-blue-600">Heavy OCR / compound queries</span>
              </div>
            </div>
          </div>

          {/* User Feedback Logger */}
          <div className="liquid-glass rounded-2xl p-4 border-black/10 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block">
              Citation Feedback (answer_feedback)
            </span>
            <p className="text-xs text-[#424245]">
              Rate citation accuracy for Answer #uuid-4182 (Article 53 severance schedule):
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleFeedback('up')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition border ${
                  feedbackSubmitted === 'up'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-black/5 text-[#1d1d1f] hover:bg-black/10 border-black/5'
                }`}
              >
                <ThumbsUp size={13} />
                <span>Accurate Citation</span>
              </button>

              <button
                onClick={() => handleFeedback('down')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition border ${
                  feedbackSubmitted === 'down'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-black/5 text-[#1d1d1f] hover:bg-black/10 border-black/5'
                }`}
              >
                <ThumbsDown size={13} />
                <span>Inaccurate Article</span>
              </button>
            </div>

            {feedbackSubmitted && (
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-950 text-[11px] font-medium flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0" />
                <span>Recorded in SQLite via idempotent UPSERT (ON CONFLICT DO UPDATE).</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
