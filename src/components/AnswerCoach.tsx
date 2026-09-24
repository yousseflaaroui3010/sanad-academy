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
}

interface CoachState {
  attempts: string[];
  result: CoachResult | null;
  gate: { prompt: string; token: string } | null;
}

const EMPTY: CoachState = { attempts: [], result: null, gate: null };
const storageKey = (id: number) => `sanad_coach_v1_${id}`;

function loadState(id: number): CoachState {
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
};

const VERDICTS = {
  pass: { label: 'Réussi', tone: 'border-green-700 bg-green-50 text-green-950' },
  not_yet: { label: 'Pas encore', tone: 'border-amber-600 bg-amber-50 text-amber-950' },
  unsure: { label: 'Correction incertaine', tone: 'border-slate-500 bg-slate-50 text-slate-900' },
};

export function AnswerCoach({ exerciseId, heading, question, onSkip, skipLabel }: {
  exerciseId: number;
  heading: string;
  question: string;
  onSkip: () => void;
  skipLabel: string;
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
  const passed = result?.verdict === 'pass';

  const send = async (body: Record<string, unknown>) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/coach/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseId, gateToken: gate?.token, ...body }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data) {
        const code = data?.error || `HTTP ${response.status}`;
        setError(ERRORS[code] || `Le correcteur a échoué (${code}). Votre réponse est gardée : réessayez.`);
        return null;
      }
      return data as CoachResult;
    } catch {
      setError('Impossible de joindre le serveur (réseau coupé ?). Votre réponse est gardée : réessayez.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const text = answer.trim();
    const graded = await send({ answer: text, confidence: Number(confidence), attempt: attempts.length + 1, previousAttempts: attempts });
    if (!graded) return;
    setConfidence('');
    setPushback('');
    if (graded.freshGate) {
      // A new exercise of the same kind: its attempts start again from 1.
      setState({ attempts: [], result: graded, gate: graded.freshGate });
      setAnswer('');
    } else {
      setState({ attempts: [...attempts, text], result: graded, gate });
    }
  };

  const contest = async () => {
    if (!result || !attempts.length) return;
    const graded = await send({
      answer: attempts[attempts.length - 1],
      confidence: 3,
      attempt: attempts.length,
      previousAttempts: attempts.slice(0, -1),
      pushback: { previousVerdict: result.verdict, argument: pushback.trim() },
    });
    if (!graded) return;
    setPushback('');
    setState({ ...state, result: { ...graded, freshGate: null } });
  };

  const restart = () => {
    setState(EMPTY);
    setAnswer('');
    setConfidence('');
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
      <p className="text-sm text-slate-700">La réponse complète reste cachée : vous recevez d’abord des indices, puis la correction à la 4ᵉ tentative. « Passé » ne veut pas dire « maîtrisé ».</p>

      {error && <p role="alert" className="rounded-lg border border-red-700 bg-red-50 p-3 font-medium text-red-900">{error}</p>}

      <div role="status" aria-live="polite">
        {result && verdict && !loading && (
          <div className={`space-y-3 rounded-xl border-2 p-4 leading-relaxed ${verdict.tone}`}>
            <p className="text-lg font-bold">{verdict.label}{result.freshGate ? ' · correction pas à pas, puis un nouvel exercice' : ''}</p>
            {result.fluencyWarning && <p className="font-semibold">Vous étiez sûr·e de vous (4 ou 5 sur 5), mais ce n’est pas encore juste. C’est exactement le point à revoir : le sentiment de savoir n’est pas le savoir.</p>}
            {result.whatYouGotRight && <Block title="Ce qui est juste">{result.whatYouGotRight}</Block>}
            {result.brokenStep && <Block title="Où le raisonnement casse">{result.brokenStep}</Block>}
            {result.misconception && <Block title="L’idée fausse derrière">{result.misconception}</Block>}
            {result.hint && <Block title="Indice">{result.hint}</Block>}
            {result.walkthrough && <Block title={passed ? 'Version prête pour le jury' : 'Correction pas à pas'}>{result.walkthrough}</Block>}
            {result.remember && <Block title="À retenir">{result.remember}</Block>}
            {result.probeQuestion && <Block title="Question pour ancrer l’idée">{result.probeQuestion}</Block>}
            {result.juryFollowUp && <Block title="Ce que le jury pourrait demander ensuite">{result.juryFollowUp}</Block>}
          </div>
        )}
      </div>

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
