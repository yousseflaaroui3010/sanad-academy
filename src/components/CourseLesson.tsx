import type { Lesson } from '../data/lessons';
import { LessonVisual } from './LessonVisual';
import { EvidenceBridge } from './EvidenceBridge';
import { AnswerCoach } from './AnswerCoach';
import { BeginnerLayer } from './BeginnerLayer';
import { plainLabels } from '../data/plainLabels';
import { beginner } from '../data/beginner';

export function CourseLesson({ lesson, onSkip, onPrevious, onNext, hasNext, companion = false }: {
  lesson: Lesson;
  onSkip: () => void;
  onPrevious: () => void;
  onNext?: () => void;
  hasNext: boolean;
  companion?: boolean;
}) {
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

      <BeginnerLayer data={beginner[lesson.slide]} />

      <LessonVisual slide={lesson.slide} />
      <EvidenceBridge slide={lesson.slide} />

      {!companion && <section aria-labelledby="comprendre" className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 leading-relaxed sm:p-6">
        <h2 id="comprendre" className="text-xl font-semibold">Maintenant, la version technique</h2>
        <p>{plainLabels(lesson.rule)}</p>
        <h3 className="font-semibold">Comment ça marche</h3>
        <p>{plainLabels(lesson.science)}</p>
        <div className="rounded-xl bg-slate-50 p-4">
          <h3 className="font-semibold">Un exemple concret</h3>
          <p className="mt-2">{lesson.example}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold">Où c’est dans le code (pour le jury)</h3>
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

      {!companion && <AnswerCoach key={lesson.slide} exerciseId={lesson.slide} heading="Exercice · sans notes, si vous avez le temps" question={lesson.gate} onSkip={onSkip} skipLabel={hasNext ? 'Passer et continuer →' : 'Passer et finir'} onNext={onNext} />}
      <button type="button" onClick={onPrevious} className="rounded-lg border border-slate-400 px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">← Revenir à la leçon précédente</button>
    </article>
  );
}
