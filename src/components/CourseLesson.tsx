import { useState } from 'react';
import type { Lesson } from '../data/lessons';
import { LessonVisual } from './LessonVisual';
import { EvidenceBridge } from './EvidenceBridge';

export function CourseLesson({ lesson, onSkip, onPrevious, hasNext, companion = false }: {
  lesson: Lesson;
  onSkip: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  companion?: boolean;
}) {
  const [confidence, setConfidence] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <article className="mx-auto max-w-3xl space-y-6 pb-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-blue-700">Jour {lesson.day} · Diapositive {lesson.slide}</p>
        <h1 id="lesson-title" tabIndex={-1} className="text-3xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-blue-700 sm:text-4xl">{lesson.title}</h1>
        <p className="text-base leading-relaxed text-slate-700">{lesson.idea}</p>
        <button type="button" onClick={onSkip} className="rounded-lg border border-blue-700 bg-white px-4 py-2 font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Je connais déjà · {hasNext ? 'passer →' : 'finir'}</button>
      </header>

      {lesson.caution && (
        <aside aria-label="Précision importante" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          <strong>À dire avec précision :</strong> {lesson.caution}
        </aside>
      )}

      <LessonVisual slide={lesson.slide} />
      <EvidenceBridge slide={lesson.slide} />

      {!companion && <section aria-labelledby="comprendre" className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 leading-relaxed sm:p-6">
        <h2 id="comprendre" className="text-xl font-semibold">Comprendre sans réciter</h2>
        <p>{lesson.rule}</p>
        <h3 className="font-semibold">La science ou la technique derrière</h3>
        <p>{lesson.science}</p>
        <div className="rounded-xl bg-slate-50 p-4">
          <h3 className="font-semibold">Un exemple concret</h3>
          <p className="mt-2">{lesson.example}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold">Où regarder dans le vrai projet</h3>
          <p className="mt-2 text-sm">{lesson.code}</p>
        </div>
      </section>}

      {!companion && <section aria-labelledby="pieges" className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 id="pieges" className="text-xl font-semibold">Le piège à éviter</h2>
        <p>{lesson.myth}</p>
        <h3 className="font-semibold">Deux détails pour plus tard</h3>
        <ul className="list-disc space-y-1 ps-5 text-slate-700">
          {lesson.iceberg.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>}

      {!companion && <section aria-labelledby="exercice" className="space-y-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
        <h2 id="exercice" className="text-xl font-semibold">Exercice · sans notes, si vous avez le temps</h2>
        <p>{lesson.gate}</p>
        <label htmlFor="confiance" className="block font-medium">Avant de répondre : confiance de 1 à 5</label>
        <select id="confiance" value={confidence} onChange={(event) => { setConfidence(event.target.value); setSubmitted(false); }} className="block rounded-lg border border-slate-500 bg-white p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
          <option value="">Choisir</option>
          {[1, 2, 3, 4, 5].map((note) => <option key={note} value={note}>{note}</option>)}
        </select>
        <label htmlFor="reponse" className="block font-medium">Votre raisonnement</label>
        <textarea id="reponse" value={answer} onChange={(event) => { setAnswer(event.target.value); setSubmitted(false); }} rows={4} className="w-full rounded-lg border border-slate-500 bg-white p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
        <div className="flex flex-wrap gap-3">
          <button type="button" disabled={!confidence || !answer.trim()} onClick={() => setSubmitted(true)} className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Garder ma tentative</button>
          <button type="button" onClick={onSkip} className="rounded-lg border border-blue-700 bg-white px-4 py-2 font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{hasNext ? 'Passer et continuer →' : 'Passer et finir'}</button>
        </div>
        <p className="text-sm text-slate-700">Vous pouvez avancer directement. « Passé » ne veut pas dire « maîtrisé ».</p>
        {submitted && <p role="status" className="font-medium">Tentative gardée sur cette page. Pour une note honnête, copiez réponse et confiance dans la conversation ; le site n’attribue pas de réussite automatique.</p>}
      </section>}
      <button type="button" onClick={onPrevious} className="rounded-lg border border-slate-400 px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">← Revenir à la leçon précédente</button>
    </article>
  );
}
