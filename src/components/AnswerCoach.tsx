import { useEffect, useState } from 'react';

// The model answers live on the server (coach/exercises.js). This component sends only the
// exercise number and the learner's text, then shows the coach's feedback.

interface CoachResult {
  verdict: 'pass' | 'not_yet' | 'unsure';
  whatYouGotRight: string;
  brokenStep: string;
  misconception: string;
  fluencyWarning: boolean;
  hint: string;
  probeQuestion: string;
  walkthrough: string;
  remember: string;
  freshGate: { prompt: string; token: string } | null;
  juryFollowUp: string;
  // Lets the learner answer probeQuestion on the page (POST /api/coach/check).
  probeToken?: string | null;
}

interface ProbeResult {
  verdict: 'understood' | 'not_yet';
  feedback: string;
  hint: string;
  explanation: string;
}

interface CoachState {
  attempts: string[];
  result: CoachResult | null;
  gate: { prompt: string; token: string } | null;
  probe?: { attempts: string[]; result: ProbeResult | null };
}

const EMPTY: CoachState = { attempts: [], result: null, gate: null };
const NO_PROBE = { attempts: [], result: null };
const storageKey = (id: number | string) => `sanad_coach_v1_${id}`;

function loadState(id: number | string): CoachState {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(id)) || 'null');
    return saved && Array.isArray(saved.attempts) ? { ...EMPTY, ...saved } : EMPTY;
  } catch {
    return EMPTY;
  }
}

const ERRORS: Record<string, string> = {
  coach_not_configured: 'Le correcteur n’est pas encore configuré sur le serveur (clé Gemini absente). Votre réponse est gardée ici.',
  rate_limited: 'Trop de corrections en peu de temps. Attendez quelques minutes, puis réessayez : votre réponse est gardée.',
  upstream_failed: 'Le modèle Gemini n’a pas répondu. Ce n’est pas une note : réessayez dans un instant.',
  bad_model_reply: 'Le modèle a renvoyé une correction illisible. Ce n’est pas une note : réessayez.',
  invalid_gate: 'Le nouvel exercice a expiré (le serveur a changé de clé). Recommencez l’exercice.',
  invalid_probe: 'Cette question a expiré (le serveur a changé de clé). Refaites corriger votre réponse pour en recevoir une nouvelle.',
};

const VERDICTS = {
  pass: { label: 'Réussi', tone: 'border-green-700 bg-green-50 text-green-950' },
  not_yet: { label: 'Pas encore', tone: 'border-amber-600 bg-amber-50 text-amber-950' },
  unsure: { label: 'Correction incertaine', tone: 'border-slate-500 bg-slate-50 text-slate-900' },
};

export function AnswerCoach({ exerciseId, heading, question, onSkip, skipLabel, onNext, nextLabel = 'Leçon suivante →', feedbackLang, onGraded }: {
  exerciseId: number | string;
  heading: string;
  question: string;
  onSkip: () => void;
  skipLabel: string;
  // Shown once the final question is understood; without it the learner uses the lesson navigation.
  onNext?: () => void;
  nextLabel?: string;
  // 'en' asks the server for feedback in plain English (the Defense Path is written in English).
  feedbackLang?: 'fr' | 'en';
  onGraded?: (graded: { verdict: CoachResult['verdict']; attempt: number; confidence: number; freshGate: boolean }) => void;
}) {
  const [state, setState] = useState<CoachState>(() => loadState(exerciseId));
  const [confidence, setConfidence] = useState('');
  const [answer, setAnswer] = useState('');
  const [pushback, setPushback] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(exerciseId), JSON.stringify(state));
    } catch {
      // Without storage the attempt history simply lasts until the page is left.
    }
  }, [exerciseId, state]);

  const { attempts, result, gate } = state;
  const probe = state.probe ?? NO_PROBE;
  const [probeAnswer, setProbeAnswer] = useState('');
  const passed = result?.verdict === 'pass';

  const send = async <T,>(body: Record<string, unknown>, endpoint = '/api/coach/grade') => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseId, gateToken: gate?.token, feedbackLang, ...body }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data) {
        const code = data?.error || `HTTP ${response.status}`;
        setError(ERRORS[code] || `Le correcteur a échoué (${code}). Votre réponse est gardée : réessayez.`);
        return null;
      }
      return data as T;
    } catch {
      setError('Impossible de joindre le serveur (réseau coupé ?). Votre réponse est gardée : réessayez.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const text = answer.trim();
    const graded = await send<CoachResult>({ answer: text, confidence: Number(confidence), attempt: attempts.length + 1, previousAttempts: attempts });
    if (!graded) return;
    onGraded?.({ verdict: graded.verdict, attempt: attempts.length + 1, confidence: Number(confidence), freshGate: Boolean(gate) });
    setConfidence('');
    setPushback('');
    setProbeAnswer('');
    if (graded.freshGate) {
      // A new exercise of the same kind: its attempts start again from 1.
      setState({ attempts: [], result: graded, gate: graded.freshGate, probe: NO_PROBE });
      setAnswer('');
    } else {
      setState({ attempts: [...attempts, text], result: graded, gate, probe: NO_PROBE });
    }
  };

  const checkProbe = async () => {
    if (!result?.probeToken) return;
    const text = probeAnswer.trim();
    const checked = await send<ProbeResult>({ probeToken: result.probeToken, answer: text, attempt: probe.attempts.length + 1 }, '/api/coach/check');
    if (!checked) return;
    setState({ ...state, probe: { attempts: [...probe.attempts, text], result: checked } });
    if (checked.verdict === 'understood') setProbeAnswer('');
  };

  const contest = async () => {
    if (!result || !attempts.length) return;
    const graded = await send<CoachResult>({
      answer: attempts[attempts.length - 1],
      confidence: 3,
      attempt: attempts.length,
      previousAttempts: attempts.slice(0, -1),
      pushback: { previousVerdict: result.verdict, argument: pushback.trim() },
    });
    if (!graded) return;
    setPushback('');
    setState({ ...state, result: { ...graded, freshGate: null }, probe: NO_PROBE });
  };

  const restart = () => {
    setState(EMPTY);
    setAnswer('');
    setConfidence('');
    setProbeAnswer('');
    setError('');
  };

  const shownQuestion = gate ? gate.prompt : question;
  const verdict = result ? VERDICTS[result.verdict] : null;
  const fieldId = `coach-${exerciseId}`;

  return (
    <section aria-labelledby={`${fieldId}-titre`} className="space-y-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
      <h2 id={`${fieldId}-titre`} className="text-xl font-semibold">{heading}</h2>
      {gate && <p className="text-sm font-semibold text-blue-800">Nouvel exercice du même type : réussissez-le pour valider la notion.</p>}
      <p>{shownQuestion}</p>

      {!passed && <>
        <label htmlFor={`${fieldId}-confiance`} className="block font-medium">Avant de répondre : confiance de 1 à 5</label>
        <select id={`${fieldId}-confiance`} value={confidence} onChange={(event) => setConfidence(event.target.value)} className="block rounded-lg border border-slate-500 bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
          <option value="">Choisir</option>
          {[1, 2, 3, 4, 5].map((note) => <option key={note} value={note}>{note}</option>)}
        </select>
        <label htmlFor={`${fieldId}-reponse`} className="block font-medium">
          Votre raisonnement{attempts.length ? ` · tentative ${attempts.length + 1}` : ''}
        </label>
        <textarea id={`${fieldId}-reponse`} value={answer} onChange={(event) => setAnswer(event.target.value)} rows={5} maxLength={4000} className="w-full rounded-lg border border-slate-500 bg-white p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
      </>}

      <div className="flex flex-wrap gap-3">
        {!passed && <button type="button" disabled={!confidence || !answer.trim() || loading} onClick={submit} aria-busy={loading} className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? 'Correction en cours…' : 'Faire corriger ma réponse'}
        </button>}
        {(attempts.length > 0 || gate || passed) && <button type="button" onClick={restart} disabled={loading} className="rounded-lg border border-slate-500 bg-white px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:opacity-50">Recommencer l’exercice</button>}
        <button type="button" onClick={onSkip} className="rounded-lg border border-blue-700 bg-white px-4 py-2 font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{skipLabel}</button>
      </div>
      {!confidence && !passed && answer.trim() && <p className="text-sm text-slate-700">Choisissez votre confiance pour activer la correction : comparer confiance et résultat montre ce qui est vraiment su.</p>}
      <p className="text-sm text-slate-700">Pas de piège : la réponse complète reste cachée pour vous laisser chercher. Vous recevez d’abord des indices, puis la correction à la 4ᵉ tentative.</p>

      {error && <p role="alert" className="rounded-lg border border-red-700 bg-red-50 p-3 font-medium text-red-900">{error}</p>}

      <div role="status" aria-live="polite">
        {result && verdict && !loading && (
          <div className={`space-y-3 rounded-xl border-2 p-4 leading-relaxed ${verdict.tone}`}>
            <p className="text-lg font-bold">{verdict.label}{result.freshGate ? ' · correction pas à pas, puis un nouvel exercice' : ''}</p>
            {result.fluencyWarning && <p>Vous vous sentiez sûr·e, et ce n’est pas encore tout à fait ça. C’est normal, et c’est justement le point le plus utile à revoir.</p>}
            {result.whatYouGotRight && <Block title="Ce qui est déjà juste">{result.whatYouGotRight}</Block>}
            {result.brokenStep && <Block title="Là où ça coince">{result.brokenStep}</Block>}
            {result.misconception && <Block title="Le petit malentendu">{result.misconception}</Block>}
            {result.hint && <Block title="Un indice">{result.hint}</Block>}
            {result.walkthrough && <Block title={passed ? 'Votre réponse, version jury' : 'La correction, pas à pas'}>{result.walkthrough}</Block>}
            {result.remember && <Block title="À retenir">{result.remember}</Block>}
            {result.juryFollowUp && <Block title="Ce que le jury pourrait demander ensuite">{result.juryFollowUp}</Block>}
          </div>
        )}
      </div>

      {result?.probeQuestion && !loading && (
        <div className="space-y-3 rounded-xl border-2 border-blue-700 bg-white p-4">
          <h3 className="font-semibold text-blue-900">Vérifiez que c’est compris avant de continuer</h3>
          <p className="font-medium">{result.probeQuestion}</p>
          {probe.result?.verdict === 'understood' ? (
            <div role="status" className="space-y-2 rounded-lg border border-green-700 bg-green-50 p-3 text-green-950">
              <p className="font-bold">Compris ✓</p>
              {probe.result.feedback && <p>{probe.result.feedback}</p>}
              {onNext && <button type="button" onClick={onNext} className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{nextLabel}</button>}
            </div>
          ) : result.probeToken ? (
            <>
              <label htmlFor={`${fieldId}-verif`} className="block text-sm">Répondez en une ou deux phrases, avec vos mots.{probe.attempts.length ? ` Essai ${probe.attempts.length + 1}.` : ''}</label>
              <textarea id={`${fieldId}-verif`} value={probeAnswer} onChange={(event) => setProbeAnswer(event.target.value)} rows={3} maxLength={2000} className="w-full rounded-lg border border-slate-500 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
              <button type="button" disabled={!probeAnswer.trim()} onClick={checkProbe} className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Vérifier ma réponse</button>
              {probe.result && (
                <div role="status" className="space-y-2 rounded-lg border border-amber-600 bg-amber-50 p-3 text-amber-950">
                  <p className="font-bold">Presque</p>
                  {probe.result.feedback && <p>{probe.result.feedback}</p>}
                  {probe.result.hint && <p><strong>Un indice :</strong> {probe.result.hint}</p>}
                  {probe.result.explanation && <p><strong>L’explication :</strong> {probe.result.explanation}</p>}
                  {probe.result.explanation && <p className="text-sm">Relisez-la, puis répondez avec vos propres mots pour la fixer.</p>}
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-700">Refaites corriger votre réponse pour pouvoir répondre à cette question ici.</p>
          )}
        </div>
      )}

      {result && attempts.length > 0 && !loading && (
        <details className="rounded-xl border border-slate-300 bg-white p-4">
          <summary className="cursor-pointer font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Je pense que cette correction est fausse</summary>
          <label htmlFor={`${fieldId}-contestation`} className="mt-3 block text-sm">Expliquez pourquoi. Le correcteur revérifie et change la note seulement si votre argument tient.</label>
          <textarea id={`${fieldId}-contestation`} value={pushback} onChange={(event) => setPushback(event.target.value)} rows={3} maxLength={1500} className="mt-2 w-full rounded-lg border border-slate-500 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
          <button type="button" disabled={!pushback.trim()} onClick={contest} className="mt-2 rounded-lg border border-blue-700 px-4 py-2 font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Demander une nouvelle vérification</button>
        </details>
      )}
    </section>
  );
}

function Block({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="whitespace-pre-line">{children}</p>
    </div>
  );
}
