import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AnswerCoach } from './AnswerCoach';
import { HALLUCINATION_COACH } from '../data/legacyCoach';
import {
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Trophy,
  ArrowRight,
  FileText
} from 'lucide-react';

interface Scenario {
  id: number;
  statuteTitle: string;
  sourceText: string;
  question: string;
  answers: {
    id: 'a' | 'b' | 'c';
    text: string;
    isHallucination: boolean;
    reason: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    statuteTitle: 'Article 184 — Moroccan Labor Code',
    sourceText:
      'Dans les activités non agricoles, la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine. La durée quotidienne de travail ne peut excéder 10 heures.',
    question: 'What is the standard legal work week and daily limit in non-agricultural companies?',
    answers: [
      {
        id: 'a',
        text: 'The standard work week is 44 hours (or 2,288 hours per year), with a maximum daily limit of 10 hours (Article 184).',
        isHallucination: false,
        reason: '100% faithful to Article 184: exact hours and daily limits match verified text.'
      },
      {
        id: 'b',
        text: 'The standard work week in Morocco is 40 hours per week, with a daily maximum of 8 hours according to Article 184.',
        isHallucination: true,
        reason: 'Hallucination! Article 184 explicitly mandates 44 hours/week and 10 hours/day in Morocco, not 40 hours.'
      },
      {
        id: 'c',
        text: 'The legal work week is 44 hours per week, and employees are entitled to 30 days of annual paid leave.',
        isHallucination: true,
        reason: 'Extrapolation Hallucination! Article 184 says nothing about 30 days of paid leave; this claim is unverified in context.'
      }
    ]
  },
  {
    id: 2,
    statuteTitle: 'Article 14 — Moroccan Labor Code (Probation Period)',
    sourceText:
      'La période d\'essai pour les cadres et assimilés est fixée à trois mois renouvelable une fois. Pour les employés, elle est d\'un mois et demi renouvelable une fois.',
    question: 'How long is the maximum total probation period for managerial staff (cadres)?',
    answers: [
      {
        id: 'a',
        text: 'For managerial staff (cadres), the probation period is 3 months renewable once, totaling a maximum of 6 months (Article 14).',
        isHallucination: false,
        reason: '100% accurate: 3 months renewable once equals 6 months max.'
      },
      {
        id: 'b',
        text: 'Under Article 14, managerial staff have a probation period of 6 months renewable twice up to 18 months.',
        isHallucination: true,
        reason: 'Fabricated numbers! Article 14 limits it to 3 months renewable once.'
      },
      {
        id: 'c',
        text: 'The probation period for managers is 3 months, and during this time employers cannot terminate contracts without 1 month severance pay.',
        isHallucination: true,
        reason: 'Fabricated legal clause! Article 14 contains zero text regarding mandatory severance pay during probation.'
      }
    ]
  }
];

export const HallucinationMinigame: React.FC = () => {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<'a' | 'b' | 'c' | null>(null);
  const [score, setScore] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const scenario = SCENARIOS[currentScenarioIdx];

  const handleSelect = (answerId: 'a' | 'b' | 'c') => {
    if (hasSubmitted) return;
    setSelectedAnswerId(answerId);
    setHasSubmitted(true);

    const chosen = scenario.answers.find((a) => a.id === answerId);
    if (chosen && chosen.isHallucination) {
      setScore((prev) => prev + 100);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.75 }
      });
    }
  };

  const handleNext = () => {
    setSelectedAnswerId(null);
    setHasSubmitted(false);
    setCurrentScenarioIdx((prev) => (prev + 1) % SCENARIOS.length);
  };

  const selectedAnswer = scenario.answers.find((a) => a.id === selectedAnswerId);

  return (
    <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Minigame Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight">
              Minigame: Spot the Hallucination!
            </h3>
            <p className="text-xs text-[#86868b]">
              Act as Quality Guardian MB: click the AI answer that invents fake facts or violates Gate 1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/60 px-3 py-1 text-xs font-bold text-amber-700">
            <Trophy size={13} />
            <span>Score: {score} XP</span>
          </div>
          <span className="text-xs text-[#86868b] font-medium tabular-nums">
            Round {currentScenarioIdx + 1} of {SCENARIOS.length}
          </span>
        </div>
      </div>

      {/* Source Statute Card */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-50/30 p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-blue-900 flex items-center gap-1.5">
            <FileText size={14} className="text-blue-600" />
            Verified Source Ground Truth ({scenario.statuteTitle})
          </span>
          <span className="text-[10px] text-blue-700 font-semibold bg-blue-100/60 px-2 py-0.5 rounded-full">
            Disk Verified
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#424245] leading-relaxed italic bg-white/80 p-3 rounded-xl border border-black/5">
          "{scenario.sourceText}"
        </p>
      </div>

      {/* Challenge Prompt */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle size={15} className="text-blue-600" />
          <h4 className="text-sm font-semibold text-[#1d1d1f]">
            Question: {scenario.question}
          </h4>
        </div>

        <p className="text-xs text-[#86868b]">
          Select the answer that contains an AI hallucination:
        </p>

        {/* 3 Candidate AI Responses */}
        <div className="space-y-2.5">
          {scenario.answers.map((ans) => {
            const isSelected = selectedAnswerId === ans.id;

            let cardStyle = 'bg-white/60 border-black/5 hover:bg-white text-[#1d1d1f]';

            if (hasSubmitted) {
              if (ans.isHallucination) {
                cardStyle = isSelected
                  ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/30 text-rose-900 shadow-sm'
                  : 'bg-rose-50/50 border-rose-200 text-rose-900';
              } else {
                cardStyle = isSelected
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'opacity-50 bg-white/40 border-black/5 text-[#86868b]';
              }
            }

            return (
              <button
                key={ans.id}
                onClick={() => handleSelect(ans.id)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition flex items-start justify-between gap-3 ${cardStyle}`}
              >
                <div>
                  <span className="font-bold uppercase text-[10px] text-[#86868b] mr-2">
                    Option {ans.id.toUpperCase()}
                  </span>
                  <p className="mt-1 leading-relaxed">{ans.text}</p>
                </div>

                {hasSubmitted && ans.isHallucination && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full flex-shrink-0">
                    <ShieldAlert size={12} />
                    Hallucination Spotted!
                  </span>
                )}
                {hasSubmitted && !ans.isHallucination && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex-shrink-0">
                    <CheckCircle2 size={12} />
                    Faithful Fact
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Round Explanation Feedback */}
      {hasSubmitted && selectedAnswer && (
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
          selectedAnswer.isHallucination
            ? 'bg-emerald-50 border-emerald-200/70 text-emerald-900'
            : 'bg-rose-50 border-rose-200/70 text-rose-900'
        }`}>
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Sparkles size={14} className={selectedAnswer.isHallucination ? 'text-emerald-600' : 'text-rose-600'} />
            <span>
              {selectedAnswer.isHallucination
                ? 'Correct! You caught the hallucination (+100 XP)'
                : 'That was actually faithful! You selected the proven answer.'}
            </span>
          </div>
          <p>{selectedAnswer.reason}</p>
        </div>
      )}

      {/* Go deeper: explain it the way SANAD's evaluation judge would */}
      {hasSubmitted && HALLUCINATION_COACH[scenario.id] && (
        <AnswerCoach
          key={scenario.id}
          exercise={HALLUCINATION_COACH[scenario.id]}
          label="Now think like the evaluation judge (cold)"
          compact
        />
      )}

      {/* Bottom Controls */}
      {hasSubmitted && (
        <div className="flex items-center justify-end pt-2">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 text-xs font-semibold shadow-sm transition"
          >
            <span>Next Challenge</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
