import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface JuryQuestion {
  id: number;
  professor: string;
  department: string;
  question: string;
  options: {
    text: string;
    isOptimal: boolean;
    feedback: string;
    approvalDelta: number;
  }[];
}

const JURY_QUESTIONS: JuryQuestion[] = [
  {
    id: 1,
    professor: 'Prof. Alami',
    department: 'Chief Systems Architect & Department Chair',
    question: 'Why didn\'t you just wrap an external cloud assistant API instead of engineering a local dual-store pipeline?',
    options: [
      {
        text: 'Because cloud models violate Moroccan Law 09-08 and send confidential corporate contracts to third-party servers. Our local dual-store keeps all data inside the private perimeter.',
        isOptimal: true,
        feedback: 'Excellent defense! You highlighted regulatory privacy, data sovereignty, and zero cloud leakage.',
        approvalDelta: 25
      },
      {
        text: 'Because we wanted to write more Python code to make the master\'s thesis look longer and more complex.',
        isOptimal: false,
        feedback: 'The jury is unimpressed. Architecture choices must serve security and business needs, not vanity.',
        approvalDelta: -15
      },
      {
        text: 'Because OpenAI APIs were temporarily down on the day we started our project.',
        isOptimal: false,
        feedback: 'Weak justification. Downtime is a transient issue; data privacy and local-first sovereignty are architectural imperatives.',
        approvalDelta: -10
      }
    ]
  },
  {
    id: 2,
    professor: 'Dr. Bennani',
    department: 'Privacy Law & Regulatory Compliance',
    question: 'How does Sanad technically guarantee the Right to Be Forgotten under Moroccan Law 09-08 when a workspace is deleted?',
    options: [
      {
        text: 'We mark the user account as inactive in SQLite and hide their files in the frontend UI.',
        isOptimal: false,
        feedback: 'Regulatory violation! Soft deletes leave personal data stored on disk, violating Law 09-08.',
        approvalDelta: -20
      },
      {
        text: 'We enforce ON DELETE CASCADE in SQLite, atomically wipe the parent text directory on disk, and execute an isolated tenant payload purge in Qdrant.',
        isOptimal: true,
        feedback: 'Outstanding technical precision. Cascades, disk wiping, and vector payload purging provide true atomic erasure.',
        approvalDelta: 25
      },
      {
        text: 'We instruct users to email our administrator to manually run database queries.',
        isOptimal: false,
        feedback: 'Manual procedures are error-prone and fail enterprise automated compliance audits.',
        approvalDelta: -10
      }
    ]
  },
  {
    id: 3,
    professor: 'Prof. Cherkaoui',
    department: 'AI Evaluation Science & Statistical Rigor',
    question: 'Why separate 500-character child chunks from 4,000-character parent articles instead of single uniform chunks?',
    options: [
      {
        text: 'Because 500 characters optimize semantic vector precision without diluting coordinates, while 4,000-character parents provide the full legal article context to prevent hallucination.',
        isOptimal: true,
        feedback: 'Flawless answer. You solved the central tension of RAG: retrieval precision vs synthesis comprehension.',
        approvalDelta: 25
      },
      {
        text: 'Because our vector database cannot store chunks larger than 500 letters.',
        isOptimal: false,
        feedback: 'Incorrect. Vector databases can store any text length; the limitation is semantic dilution in cosine space.',
        approvalDelta: -15
      },
      {
        text: 'To artificially multiply the number of rows in our database by eight times.',
        isOptimal: false,
        feedback: 'Unacceptable engineering reasoning. Multiplying rows wastes index RAM unless backed by a structural purpose.',
        approvalDelta: -20
      }
    ]
  },
  {
    id: 4,
    professor: 'Prof. Alami',
    department: 'Chief Systems Architect & Department Chair',
    question: 'What stops the AI from hallucinating a legal article number during a live customer inquiry?',
    options: [
      {
        text: 'We tell the AI in the prompt to be very careful and promise not to hallucinate.',
        isOptimal: false,
        feedback: 'Naive assumption. LLMs routinely ignore verbal prompt promises under complex reasoning loads.',
        approvalDelta: -20
      },
      {
        text: 'Citations are code-enforced: Python runtime constructs the source cards directly from disk blocks, and Gate 2 triggers deterministic honest refusal (NOT_COVERED) if retrieval falls below 0.70.',
        isOptimal: true,
        feedback: 'Masterful defense. Code-enforced citations and deterministic honest refusal eliminate hallucination risks.',
        approvalDelta: 25
      },
      {
        text: 'We only allow users to ask questions that we have previously memorized in our test suite.',
        isOptimal: false,
        feedback: 'That defeats the entire purpose of a dynamic enterprise document retrieval assistant.',
        approvalDelta: -15
      }
    ]
  }
];

interface DefenseDrillSimulatorProps {
  onUnlockCertificate?: () => void;
}

export const DefenseDrillSimulator: React.FC<DefenseDrillSimulatorProps> = ({
  onUnlockCertificate
}) => {
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [approvalScore, setApprovalScore] = useState(50);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const q = JURY_QUESTIONS[currentQIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(idx);
    setHasAnswered(true);

    const option = q.options[idx];
    const newApproval = Math.min(100, Math.max(0, approvalScore + option.approvalDelta));
    setApprovalScore(newApproval);

    if (option.isOptimal && currentQIdx === JURY_QUESTIONS.length - 1 && newApproval >= 80) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      if (onUnlockCertificate) onUnlockCertificate();
    }
  };

  const handleNext = () => {
    if (currentQIdx < JURY_QUESTIONS.length - 1) {
      setCurrentQIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQIdx(0);
    setApprovalScore(50);
    setSelectedOptionIdx(null);
    setHasAnswered(false);
    setIsFinished(false);
  };

  return (
    <div className="liquid-glass rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header with Approval Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <GraduationCap size={22} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight">
              The Academic Jury Defense Simulator
            </h3>
            <p className="text-xs text-[#86868b]">
              Defend your system design before the academic examination board
            </p>
          </div>
        </div>

        {/* Live Jury Approval Gauge */}
        <div className="flex items-center gap-3 bg-white/70 px-4 py-2 rounded-2xl border border-black/5 shadow-xs">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-[#86868b]">Jury Approval</span>
            <span className={`text-sm font-extrabold tabular-nums ${
              approvalScore >= 80
                ? 'text-emerald-600'
                : approvalScore >= 50
                ? 'text-blue-600'
                : 'text-rose-600'
            }`}>
              {approvalScore}%
            </span>
          </div>
          <div className="h-2 w-20 rounded-full bg-black/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                approvalScore >= 80 ? 'bg-emerald-600' : approvalScore >= 50 ? 'bg-blue-600' : 'bg-rose-600'
              }`}
              style={{ width: `${approvalScore}%` }}
            />
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-4">
          {/* Question & Professor Card */}
          <div className="rounded-2xl bg-white/80 p-4 border border-black/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#86868b]">
              <span className="font-semibold text-blue-600 flex items-center gap-1">
                <UserCheck size={13} />
                {q.professor} — {q.department}
              </span>
              <span className="font-mono">Question {currentQIdx + 1}/{JURY_QUESTIONS.length}</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#1d1d1f] leading-snug">
              "{q.question}"
            </p>
          </div>

          {/* Defense Response Choices */}
          <div className="space-y-2.5">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;

              let style = 'bg-white/60 border-black/5 hover:bg-white text-[#1d1d1f]';
              if (hasAnswered) {
                if (opt.isOptimal) {
                  style = 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 text-emerald-900 font-semibold';
                } else if (isSelected) {
                  style = 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20 text-rose-900';
                } else {
                  style = 'opacity-40 bg-white/30 border-black/5 text-[#86868b]';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm leading-relaxed transition flex items-start justify-between gap-3 ${style}`}
                >
                  <div>
                    <span className="font-bold text-[10px] uppercase text-[#86868b] mr-2">
                      Response #{idx + 1}
                    </span>
                    <p className="mt-1">{opt.text}</p>
                  </div>
                  {hasAnswered && opt.isOptimal && (
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-1" />
                  )}
                  {hasAnswered && isSelected && !opt.isOptimal && (
                    <AlertCircle size={16} className="text-rose-600 flex-shrink-0 mt-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {hasAnswered && selectedOptionIdx !== null && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed flex items-start justify-between gap-3 ${
              q.options[selectedOptionIdx].isOptimal
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/70 border-rose-200 text-rose-900'
            }`}>
              <div>
                <span className="font-bold block mb-1">
                  {q.options[selectedOptionIdx].isOptimal
                    ? '✓ Jury Sign-Off (Approval +' + q.options[selectedOptionIdx].approvalDelta + '%)'
                    : '⚠ Jury Objection (' + q.options[selectedOptionIdx].approvalDelta + '%)'}
                </span>
                <p>{q.options[selectedOptionIdx].feedback}</p>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 rounded-full bg-blue-600 text-white px-4 py-2 text-xs font-semibold shadow-sm hover:bg-blue-500 flex-shrink-0 self-end transition"
              >
                <span>{currentQIdx === JURY_QUESTIONS.length - 1 ? 'View Final Verdict' : 'Next Question'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Verdict Screen */
        <div className="text-center py-6 space-y-4 max-w-md mx-auto">
          <div className="h-16 w-16 mx-auto rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Award size={32} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Defense Deliberation Complete
            </span>
            <h4 className="text-2xl font-black text-[#1d1d1f] mt-1">
              {approvalScore >= 80 ? 'Mastery With Honors! 🎓' : 'Defense Incomplete'}
            </h4>
            <p className="text-xs sm:text-sm text-[#424245] leading-relaxed mt-2">
              {approvalScore >= 80
                ? 'The examination board has unanimously accepted your thesis on local-first document retrieval architecture and RAG verification science!'
                : 'The jury requests revisions on your security isolation and citation verification arguments. Review the specs and try again!'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 rounded-full bg-black/5 hover:bg-black/10 px-4 py-2 text-xs font-semibold text-[#1d1d1f] transition"
            >
              <RotateCcw size={13} />
              <span>Retry Drill</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
