import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Scale } from 'lucide-react';
import { playHapticClick, playSlideSwoosh, playSuccessChime } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

interface WorkedStep {
  stepNumber: number;
  title: string;
  stageName: string;
  librarianStory: string;
  softwareAction: string;
  codeFile: string;
  dataSnapshot: {
    input: string;
    output: string;
    latencyOrMetric: string;
  };
}

export const WorkedExampleFlowInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const steps: WorkedStep[] = [
    {
      stepNumber: 1,
      title: 'Dahir Document Upload & Content Hashing',
      stageName: 'Stage 1 & 10: Ingestion & SHA-256',
      librarianStory: 'A new book of decrees arrives at the archive loading dock. The clerk stamps an indelible fingerprint on the cover before opening a single page.',
      softwareAction: 'change_detection.py reads Bulletin Officiel n° 5210 in 64KB blocks and produces fingerprint sha256:d8a4...:1482928. Identifies file as DocumentState.NEW.',
      codeFile: 'change_detection.py: compute_sha256()',
      dataSnapshot: {
        input: 'data/corpus/bulletin_officiel_5210.pdf (1.48 MB)',
        output: 'sha256:d8a4f91b7c2...:1482928 (Status: NEW)',
        latencyOrMetric: '18ms (Disk IO + SHA-256)',
      },
    },
    {
      stepNumber: 2,
      title: 'Conversion Ladder & Heading Preservation',
      stageName: 'Stage 4 & 7: conversion.py',
      librarianStory: 'The archivist translates the bound volume into clean text sheets, carefully preserving the big bold titles of Book 1, Chapter 3, and Article 43.',
      softwareAction: 'conversion.py validates PDF text density (>50 chars/page) and runs pymupdf4llm to produce clean Markdown with intact ## and ### heading hierarchies.',
      codeFile: 'conversion.py: convert_to_markdown()',
      dataSnapshot: {
        input: 'bulletin_officiel_5210.pdf (binary pages)',
        output: '589 Articles parsed into clean Markdown headings',
        latencyOrMetric: '240ms (120 pages processed)',
      },
    },
    {
      stepNumber: 3,
      title: 'Parent-Child Chunking (Article 43)',
      stageName: 'Stage 6: chunking.py',
      librarianStory: 'The clerk derives small 2-paragraph index cards for the card catalog drawer, while shelving the full 5-page article in the vault behind a registration code.',
      softwareAction: 'chunking.py derives parent section par_dahir_art43 (~850 tokens) and child chunk ch_dahir_art43_01 (200 tokens / 500 characters) with deterministic UUIDv5.',
      codeFile: 'chunking.py: chunk_document()',
      dataSnapshot: {
        input: 'Markdown text under "Article 43 - Délai de préavis"',
        output: 'Parent: par_dahir_art43 (850t) | Child: ch_dahir_art43_01 (200t)',
        latencyOrMetric: '8ms in-memory split',
      },
    },
    {
      stepNumber: 4,
      title: 'Asymmetric Vector Indexing in Qdrant',
      stageName: 'Stage 4 & 6: vector_store.py',
      librarianStory: 'The clerk files the index card onto a giant 3D map of meanings, writing "passage: " in blue ink so it sits next to other labor terms.',
      softwareAction: 'embeddings.py prepends "passage: " and encodes 1024-d dense vector. vector_store.py upserts point to collection ws_hr_children with parent_id in payload.',
      codeFile: 'vector_store.py: upsert_children()',
      dataSnapshot: {
        input: 'passage: Article 43: Pour les cadres et assimilés...',
        output: 'PointStruct(id=uuid5(...), vector=[1024 floats], payload={parent_id: "par_dahir_art43"})',
        latencyOrMetric: '180ms CPU ONNX batch embedding',
      },
    },
    {
      stepNumber: 5,
      title: 'User Query & Query Rewriting',
      stageName: 'Stage 5 & 9: agent/nodes.py',
      librarianStory: 'A company HR manager asks: "Combien de préavis pour un cadre avec 3 ans d\'ancienneté ?". The assistant rephrases it into an exact legal search.',
      softwareAction: 'make_rewrite() checks ambiguity (None), prepends "query: ", and produces standalone search: "délai de préavis cadre ancienneté 3 ans Article 43".',
      codeFile: 'agent/nodes.py: make_rewrite()',
      dataSnapshot: {
        input: '"Combien de préavis pour un cadre avec 3 ans d\'ancienneté ?"',
        output: 'queries: ["délai de préavis cadre ancienneté 3 ans Article 43"]',
        latencyOrMetric: '180ms LLM query rewriter',
      },
    },
    {
      stepNumber: 6,
      title: 'Hybrid Search & Reciprocal Rank Fusion (RRF)',
      stageName: 'Stage 4 & 5: agent/retrieval.py',
      librarianStory: 'Two archivists run to the shelves: one checks meaning on the 3D map; the other checks the alphabetical word index. They merge their lists using formula 1/(60 + rank).',
      softwareAction: 'Qdrant dense cosine search returns ch_dahir_art43_01 at rank 1. BM25 keyword index returns it at rank 1. RRF formula assigns maximum score 0.0328.',
      codeFile: 'agent/retrieval.py: reciprocal_rank_fusion()',
      dataSnapshot: {
        input: 'Dense hits (8) + Sparse BM25 hits (8)',
        output: 'Top hit: ch_dahir_art43_01 (RRF score: 0.0328)',
        latencyOrMetric: '34ms hybrid execution',
      },
    },
    {
      stepNumber: 7,
      title: 'Relevance Grading & Parent Fetch',
      stageName: 'Stage 5 & 9: agent/nodes.py',
      librarianStory: 'The chief inspector verifies: "Does this card truly discuss notice periods for executives?". Verdict: YES. The assistant pulls the full parent binder from the vault.',
      softwareAction: 'make_grade() returns is_relevant = True. make_fetch_parents() reads par_dahir_art43 from disk by parent_id, providing complete statutory context.',
      codeFile: 'agent/nodes.py: make_grade() & make_fetch_parents()',
      dataSnapshot: {
        input: 'ch_dahir_art43_01 hit against user query',
        output: 'Full Parent Section loaded: Article 43 schedule (1 à 5 ans = 1 mois)',
        latencyOrMetric: '110ms model grade + 18ms disk read',
      },
    },
    {
      stepNumber: 8,
      title: 'Citation Synthesis & Court-Ready Evidence',
      stageName: 'Stage 1, 9 & 15: Answering & Evidence Card',
      librarianStory: 'The assistant hands the HR director a formal report with the exact sentence highlighted in yellow: "Article 43: 1 month notice for 1 to 5 years of service".',
      softwareAction: 'make_answer() synthesizes grounded response with clickable evidence card linking to Article 43, Bulletin Officiel n° 5210, Page 12. Logs trace step.',
      codeFile: 'agent/answering.py: synthesize_answer()',
      dataSnapshot: {
        input: 'Parent section par_dahir_art43 text',
        output: 'Answer: "Le préavis légal est de 1 mois..." [Source: Art. 43, BO n° 5210]',
        latencyOrMetric: '1,240ms LLM synthesis (Total: 1,870ms)',
      },
    },
  ];

  const current = steps[activeStepIdx] || steps[0];

  return (
    <div className="w-full space-y-4 text-left">
      {/* Worked Example Header */}
      <div className="liquid-glass rounded-3xl p-5 border-blue-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Scale size={14} />
            <span>Rule R-09 Worked Example (GUIDE-STYLE.md)</span>
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/60">
            Real Inquiry: Article 43 Notice Period
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
          Following ONE real legal inquiry from raw PDF upload to verified citation card: <strong>« Quelle est la durée du préavis pour un cadre en CDI avec 3 ans d'ancienneté ? »</strong>
        </p>
      </div>

      {/* Progress Stepper Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {steps.map((s, idx) => (
          <button
            key={s.stepNumber}
            onClick={() => {
              setActiveStepIdx(idx);
              playHapticClick();
            }}
            className={`flex-shrink-0 text-xs font-mono font-bold px-3 py-1.5 rounded-xl transition ${
              activeStepIdx === idx
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            Step {s.stepNumber}
          </button>
        ))}
      </div>

      {/* Main Step Detail Card */}
      <div className="liquid-glass rounded-3xl p-5 sm:p-7 border-blue-500/30 space-y-4">
        <div className="border-b border-black/5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 block mb-1">
              {current.stageName}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-[#1d1d1f]">
              Step {current.stepNumber}: {current.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl self-start sm:self-auto font-bold">
            {current.dataSnapshot.latencyOrMetric}
          </span>
        </div>

        {/* Librarian Analogy */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
            The Librarian Thread (ISO 24495-1 Plain Language)
          </span>
          <p className="text-xs text-[#424245] leading-relaxed">
            "{current.librarianStory}"
          </p>
        </div>

        {/* Software Action */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] block">
            Exact Software Implementation Action
          </span>
          <p className="text-xs sm:text-sm text-[#1d1d1f] leading-relaxed font-medium">
            {current.softwareAction}
          </p>
          <div className="p-2 rounded-xl bg-black/5 text-[#424245] font-mono text-[11px] truncate">
            Source: <strong>{current.codeFile}</strong>
          </div>
        </div>

        {/* Data Snapshot In/Out */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-2xl bg-[#14110f] text-[#f2ede6] font-mono text-xs space-y-1">
            <span className="text-[10px] text-[#a69c90] block">Input Data</span>
            <p className="text-blue-300 text-[11px] truncate">{current.dataSnapshot.input}</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#14110f] text-[#f2ede6] font-mono text-xs space-y-1">
            <span className="text-[10px] text-[#a69c90] block">Output Transformation</span>
            <p className="text-emerald-300 text-[11px] truncate">{current.dataSnapshot.output}</p>
          </div>
        </div>

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-black/5">
          <button
            onClick={() => {
              if (activeStepIdx > 0) {
                setActiveStepIdx((prev) => prev - 1);
                playSlideSwoosh();
              }
            }}
            disabled={activeStepIdx === 0}
            className={`p-2 rounded-xl border transition ${
              activeStepIdx > 0 ? 'bg-white text-[#1d1d1f] hover:bg-black/5' : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ArrowLeft size={14} />
          </button>

          <span className="text-xs font-mono font-bold text-[#86868b]">
            Step {activeStepIdx + 1} of {steps.length}
          </span>

          <button
            onClick={() => {
              if (activeStepIdx < steps.length - 1) {
                setActiveStepIdx((prev) => prev + 1);
                playSlideSwoosh();
              } else {
                playSuccessChime();
              }
            }}
            disabled={activeStepIdx === steps.length - 1}
            className={`p-2 rounded-xl border transition ${
              activeStepIdx < steps.length - 1 ? 'bg-blue-600 text-white hover:bg-blue-500' : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
