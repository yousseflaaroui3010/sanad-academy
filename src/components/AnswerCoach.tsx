import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Eye,
  GraduationCap,
  Lightbulb,
  Loader2,
  MessageSquareWarning,
  RotateCcw,
  Scale,
  Sparkles,
} from 'lucide-react';
import { gradeAnswer } from '../services/coachService';
import type { CoachExercise, CoachVerdict, FreshGate } from '../services/coachService';
import { getRecord, recordAttempt } from '../services/progressLedger';

interface AnswerCoachProps {
  exercise: CoachExercise;
  lang?: 'en' | 'fr';
  label?: string;
  compact?: boolean;
  onPassed?: (id: string) => void;
  onGraded?: (verdict: CoachVerdict) => void;
}

const RUNG_LABEL = {
  en: ['Hint 1 · a question', 'Hint 2 · the rule', 'Hint 3 · a similar example'],
  fr: ['Indice 1 · une question', 'Indice 2 · la règle', 'Indice 3 · un exemple voisin'],
};

// Callers give each instance key={exercise.id} so state resets when the exercise changes.
export const AnswerCoach: React.FC<AnswerCoachProps> = ({ exercise, lang = 'en', label, compact, onPassed, onGraded }) => {
  const fr = lang === 'fr';
  const [answer, setAnswer] = useState('');
  const [confidence, setConfidence] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [verdict, setVerdict] = useState<CoachVerdict | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeGate, setActiveGate] = useState<FreshGate | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [pushback, setPushback] = useState('');
  const [showPushback, setShowPushback] = useState(false);
  const [lastConfidence, setLastConfidence] = useState(3);
  const previous = getRecord(exercise.id);

  const attemptNumber = attempts.length + 1;
  const passed = verdict?.verdict === 'pass';
  const canReveal = passed || attempts.length >= 4 || revealed;

  const submit = async () => {
    if (!answer.trim() || confidence === null || loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await gradeAnswer({
        exercise,
        activeGate,
        answer: answer.trim(),
        confidence,
        attempt: attemptNumber,
        previousAttempts: attempts,
        lang,
      });
      setVerdict(result);
      onGraded?.(result);
      setAttempts((a) => [...a, answer.trim()]);
      setLastConfidence(confidence);
      if (result.verdict !== 'unsure') {
        recordAttempt(activeGate ? `${exercise.id}#fresh` : exercise.id, {
          passed: result.verdict === 'pass',
          attemptNumber,
          confidence,
          helped: attemptNumber > 1 || revealed || !!activeGate,
        });
        if (result.verdict === 'pass') onPassed?.(exercise.id);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const sendPushback = async () => {
    if (!verdict || !pushback.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await gradeAnswer({
        exercise,
        activeGate,
        answer: attempts[attempts.length - 1] ?? '',
        confidence: lastConfidence,
        attempt: attempts.length,
        previousAttempts: attempts.slice(0, -1),
        pushback: { previousVerdict: verdict, argument: pushback.trim() },
        lang,
      });
      setVerdict(result);
      setShowPushback(false);
      setPushback('');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    setAnswer('');
    setConfidence(null);
    setVerdict(passed ? null : verdict);
  };

  const startFreshGate = (gate: FreshGate) => {
    setActiveGate(gate);
    setAttempts([]);
    setVerdict(null);
    setAnswer('');
    setConfidence(null);
    setRevealed(false);
  };

  const rungIdx = Math.min(attempts.length, 3) - 1;

  return (
    <div className={`liquid-glass rounded-3xl ${compact ? 'p-4' : 'p-5 sm:p-6'} shadow-sm space-y-4`}>
      <div className="flex items-start justify-between gap-3 border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0">
            <GraduationCap size={15} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
              {label ?? (fr ? 'Porte · réponds à froid' : 'Gate · answer cold')}
            </h3>
            <p className="text-[11px] text-[#86868b]">
              {fr
                ? 'Sans notes. Écris avec tes mots, en français ou en anglais.'
                : 'No notes. Your own words, French or English.'}
            </p>
          </div>
        </div>
        {previous && (
          <span
            className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${
              previous.passedCold
                ? 'bg-emerald-100 text-emerald-800'
                : previous.lastPassed
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
            }`}
          >
            {previous.passedCold
              ? fr ? 'Réussi à froid' : 'Passed cold'
              : previous.lastPassed
                ? fr ? 'Réussi avec aide' : 'Passed with help'
                : fr ? 'Pas encore' : 'Not yet'}
          </span>
        )}
      </div>

      {activeGate && (
        <p className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 rounded-xl px-3 py-2">
          {fr
            ? 'Nouvelle porte : même idée, autres détails. Elle seule valide ce nœud.'
            : 'Fresh gate: same idea, new details. Only this one counts for the node.'}
        </p>
      )}

      <p className="text-sm font-medium text-[#1d1d1f] whitespace-pre-line">
        {activeGate ? activeGate.prompt : exercise.prompt}
      </p>

      {!passed && (
        <div className="space-y-3">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={compact ? 3 : 5}
            placeholder={fr ? 'Ta réponse…' : 'Your answer…'}
            className="w-full rounded-2xl border border-black/10 bg-white/80 p-3 text-sm text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#6e6e73]">
              {fr ? 'Confiance avant de valider :' : 'Confidence before you submit:'}
            </span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setConfidence(n)}
                className={`h-7 w-7 rounded-full text-xs font-bold border transition ${
                  confidence === n
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white/70 text-[#424245] border-black/10 hover:bg-white'
                }`}
                aria-pressed={confidence === n}
              >
                {n}
              </button>
            ))}
            <button
              onClick={submit}
              disabled={!answer.trim() || confidence === null || loading}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[#1d1d1f] px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
            >
              {loading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
              {fr ? `Corriger (essai ${attemptNumber})` : `Grade it (attempt ${attemptNumber})`}
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-700 bg-rose-50 rounded-xl px-3 py-2">
          {fr ? 'Le correcteur a échoué : ' : 'The grader failed: '}
          {error}
        </p>
      )}

      {verdict && (
        <div className="space-y-3 rounded-2xl bg-white/70 border border-black/5 p-4">
          <div className="flex items-center gap-2">
            {verdict.verdict === 'pass' ? (
              <CheckCircle2 size={18} className="text-emerald-600" />
            ) : verdict.verdict === 'unsure' ? (
              <CircleDashed size={18} className="text-slate-500" />
            ) : (
              <AlertTriangle size={18} className="text-amber-600" />
            )}
            <span className="text-sm font-bold text-[#1d1d1f]">
              {verdict.verdict === 'pass'
                ? 'Pass'
                : verdict.verdict === 'unsure'
                  ? fr ? 'Je ne peux pas trancher' : 'I can’t grade this reliably'
                  : fr ? 'Pas encore' : 'Not yet'}
            </span>
            {verdict.mode === 'offline' && (
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 rounded-full px-2 py-0.5">
                {fr ? 'Vérification hors ligne par mots-clés' : 'Offline keyword check'}
              </span>
            )}
          </div>

          {verdict.notice && <p className="text-[11px] text-amber-800">{verdict.notice}</p>}
          {verdict.mode === 'offline' && (
            <p className="text-[11px] text-slate-600">
              {fr
                ? 'Aucun modèle n’est configuré : je vérifie seulement la présence des points clés, pas ton raisonnement. Ajoute une clé Gemini pour la vraie correction.'
                : 'No AI model is configured, so this only checks that the key points appear, not your reasoning. Add a Gemini key for real grading.'}
            </p>
          )}

          {verdict.fluencyWarning && (
            <p className="text-xs font-semibold text-rose-800 bg-rose-50 rounded-xl px-3 py-2">
              {fr
                ? `Illusion de maîtrise : confiance ${lastConfidence}/5 sur une réponse fausse. Ce point va sur ta liste de surveillance.`
                : `Fluency-illusion warning: confidence ${lastConfidence}/5 on a wrong answer. This goes on your watch list.`}
            </p>
          )}

          {verdict.whatYouGotRight && (
            <Row title={fr ? 'Ce qui est juste' : 'What you got right'} text={verdict.whatYouGotRight} tone="emerald" />
          )}
          {verdict.brokenStep && (
            <Row title={fr ? 'Où ça casse' : 'Where it broke'} text={verdict.brokenStep} tone="amber" />
          )}
          {verdict.misconception && (
            <Row title={fr ? 'Idée fausse derrière' : 'Misconception behind it'} text={verdict.misconception} tone="amber" />
          )}
          {verdict.hint && rungIdx >= 0 && (
            <div className="rounded-xl bg-indigo-50 px-3 py-2">
              <p className="text-[11px] font-bold text-indigo-800 flex items-center gap-1">
                <Lightbulb size={12} /> {RUNG_LABEL[lang][rungIdx]}
              </p>
              <p className="text-xs text-indigo-950 mt-1 whitespace-pre-line">{verdict.hint}</p>
            </div>
          )}
          {verdict.walkthrough && (
            <Row
              title={passed ? (fr ? 'Version prête pour le jury' : 'Jury-ready version') : fr ? 'Pas à pas' : 'Walkthrough'}
              text={verdict.walkthrough}
              tone="slate"
            />
          )}
          {verdict.probeQuestion && (
            <Row title={fr ? 'Question pour creuser' : 'Probe question'} text={verdict.probeQuestion} tone="slate" />
          )}
          {verdict.juryFollowUp && (
            <Row title={fr ? 'Relance probable du jury' : 'Likely jury follow-up'} text={verdict.juryFollowUp} tone="slate" />
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {!passed && !verdict.freshGate && (
              <button onClick={retry} className="inline-flex items-center gap-1 rounded-full bg-[#1d1d1f] px-3 py-1.5 text-[11px] font-semibold text-white">
                <RotateCcw size={12} /> {fr ? 'Réessayer' : 'Try again'}
              </button>
            )}
            {verdict.freshGate && (
              <button
                onClick={() => startFreshGate(verdict.freshGate!)}
                className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1.5 text-[11px] font-semibold text-white"
              >
                <Sparkles size={12} /> {fr ? 'Passer la nouvelle porte' : 'Take the fresh gate'}
              </button>
            )}
            {verdict.mode === 'llm' && (
              <button
                onClick={() => setShowPushback((s) => !s)}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#424245] border border-black/10"
              >
                <Scale size={12} /> {fr ? 'Je conteste la note' : 'I disagree with the grade'}
              </button>
            )}
            {canReveal && !revealed && (
              <button
                onClick={() => setRevealed(true)}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#424245] border border-black/10"
              >
                <Eye size={12} /> {fr ? 'Voir la réponse modèle' : 'Show model answer'}
              </button>
            )}
          </div>

          {showPushback && (
            <div className="space-y-2">
              <textarea
                value={pushback}
                onChange={(e) => setPushback(e.target.value)}
                rows={3}
                placeholder={fr ? 'Pourquoi la note est fausse, preuve à l’appui…' : 'Why the grade is wrong, with evidence…'}
                className="w-full rounded-2xl border border-black/10 bg-white p-3 text-xs"
              />
              <button
                onClick={sendPushback}
                disabled={!pushback.trim() || loading}
                className="inline-flex items-center gap-1 rounded-full bg-[#1d1d1f] px-3 py-1.5 text-[11px] font-semibold text-white disabled:opacity-40"
              >
                <MessageSquareWarning size={12} /> {fr ? 'Demander une re-vérification' : 'Ask for a recheck'}
              </button>
            </div>
          )}
        </div>
      )}

      {!canReveal && attempts.length > 0 && !passed && (
        <p className="text-[11px] text-[#86868b]">
          {fr
            ? `La réponse modèle reste cachée jusqu’à la réussite ou au 4e essai (${attempts.length}/4).`
            : `The model answer stays hidden until you pass or reach attempt 4 (${attempts.length}/4).`}
        </p>
      )}

      {revealed && (
        <div className="space-y-2 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 p-4">
          <p className="text-[11px] font-bold text-emerald-900">{fr ? 'Réponse modèle' : 'Model answer'}</p>
          <p className="text-xs text-emerald-950 whitespace-pre-line">
            {activeGate ? activeGate.modelAnswer : exercise.modelAnswer}
          </p>
          {!activeGate && exercise.juryVersionFr && (
            <>
              <p className="text-[11px] font-bold text-emerald-900 pt-1">À dire au jury</p>
              <p className="text-xs text-emerald-950 italic whitespace-pre-line">{exercise.juryVersionFr}</p>
            </>
          )}
          {!activeGate && exercise.source && (
            <p className="text-[10px] text-emerald-800 font-mono">{fr ? 'Source : ' : 'Source: '}{exercise.source}</p>
          )}
          {!passed && (
            <p className="text-[11px] text-emerald-900">
              {fr
                ? 'Tu as vu la réponse : ce nœud ne compte qu’après une nouvelle porte réussie. Reviens-y plus tard, à froid.'
                : 'You have seen the answer, so this node only counts after you pass a fresh gate. Come back to it later, cold.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const TONES = {
  emerald: 'text-emerald-900',
  amber: 'text-amber-900',
  slate: 'text-[#1d1d1f]',
};

const Row: React.FC<{ title: string; text: string; tone: keyof typeof TONES }> = ({ title, text, tone }) => (
  <div>
    <p className={`text-[11px] font-bold ${TONES[tone]}`}>{title}</p>
    <p className="text-xs text-[#424245] mt-0.5 whitespace-pre-line">{text}</p>
  </div>
);
