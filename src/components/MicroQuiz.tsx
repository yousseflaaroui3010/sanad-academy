import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, HelpCircle, Sparkles } from 'lucide-react';
import type { MiniQuiz } from '../data/courseData';
import { MINI_QUIZ_COACH } from '../data/legacyCoach';
import { AnswerCoach } from './AnswerCoach';

interface MicroQuizProps {
  quiz: MiniQuiz;
  lang?: 'en' | 'fr';
  subLessonId?: string;
}

export const MicroQuiz: React.FC<MicroQuizProps> = ({ quiz, lang = 'en', subLessonId }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isFr = lang === 'fr';
  const coach = subLessonId ? MINI_QUIZ_COACH[subLessonId] : undefined;
  // Recall before recognition: the multiple-choice check unlocks after one written attempt.
  const [triedCold, setTriedCold] = useState(!coach);

  const handleSelect = (index: number) => {
    if (hasSubmitted) return;
    setSelectedOption(index);
    setHasSubmitted(true);

    if (index === quiz.correctIndex) {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.8 },
      });
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  const isCorrect = selectedOption === quiz.correctIndex;

  return (
    <div className="space-y-4">
      {coach && (
        <AnswerCoach
          key={coach.id}
          exercise={coach}
          lang={lang}
          label={isFr ? 'Explique d’abord avec tes mots (à froid)' : 'Explain it first, in your own words (cold)'}
          onGraded={() => setTriedCold(true)}
        />
      )}
      {!triedCold ? (
        <p className="text-[11px] text-[#86868b] px-2">
          {isFr
            ? 'Le quiz à choix multiple se débloque après une première réponse écrite : se souvenir d’abord, reconnaître ensuite.'
            : 'The multiple-choice check unlocks after one written attempt: recall first, recognition second.'}
        </p>
      ) : (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <HelpCircle size={15} />
          </div>
          <h3 className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
            {isFr ? 'Mini-Quiz de Validation' : '1-Click Knowledge Check'}
          </h3>
        </div>
        {hasSubmitted && (
          <button
            onClick={handleReset}
            className="text-[11px] font-semibold text-blue-600 hover:underline"
          >
            {isFr ? 'Recommencer' : 'Retry'}
          </button>
        )}
      </div>

      <p className="text-xs sm:text-sm font-medium text-[#1d1d1f]">
        {quiz.question}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {quiz.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isRight = idx === quiz.correctIndex;

          let btnStyle = 'border-black/5 bg-white/60 hover:bg-white text-[#424245]';

          if (hasSubmitted) {
            if (isRight) {
              btnStyle = 'border-emerald-500/50 bg-emerald-50 text-emerald-900 font-semibold ring-2 ring-emerald-500/20';
            } else if (isSelected) {
              btnStyle = 'border-rose-500/50 bg-rose-50 text-rose-900 font-semibold ring-2 ring-rose-500/20';
            } else {
              btnStyle = 'opacity-40 border-black/5 bg-white/30 text-[#86868b]';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={hasSubmitted}
              className={`w-full p-3 rounded-2xl border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {hasSubmitted && isRight && (
                <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 ml-2" />
              )}
              {hasSubmitted && isSelected && !isRight && (
                <XCircle size={15} className="text-rose-600 flex-shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
      {hasSubmitted && (
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
          isCorrect
            ? 'bg-emerald-50/70 border-emerald-200/60 text-emerald-900'
            : 'bg-rose-50/70 border-rose-200/60 text-rose-900'
        }`}>
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Sparkles size={12} />
            <span>{isCorrect ? (isFr ? 'Exactement !' : 'Spot On!') : (isFr ? 'Pas tout à fait !' : 'Not Quite!')}</span>
          </div>
          {quiz.explanation}
        </div>
      )}
    </div>
      )}
    </div>
  );
};
