import { useEffect, useState } from 'react';
import { FirstLesson } from './components/FirstLesson';
import { CourseLesson } from './components/CourseLesson';
import { lessons } from './data/lessons';

const total = lessons.length + 1;

function storedIndex(): number {
  try {
    const saved = Number(localStorage.getItem('sanad_academy_position_v2'));
    return Number.isInteger(saved) && saved >= 0 && saved < total ? saved : 0;
  } catch {
    return 0;
  }
}

export default function App() {
  const [current, setCurrent] = useState(storedIndex);
  const [companion, setCompanion] = useState(false);
  const [skipped, setSkipped] = useState<number[]>(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem('sanad_academy_skipped_v2') || '[]');
      return Array.isArray(saved) ? saved.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < total) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.removeItem('sanad_gemini_api_key');
      localStorage.setItem('sanad_academy_position_v2', String(current));
      localStorage.setItem('sanad_academy_skipped_v2', JSON.stringify(skipped));
    } catch {
      // A private browsing mode without storage still permits learning.
    }
  }, [current, skipped]);

  const navigate = (index: number) => {
    setCurrent(index);
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => document.getElementById('lesson-title')?.focus());
  };

  const skip = () => {
    setSkipped((before) => before.includes(current) ? before : [...before, current]);
    if (current < total - 1) navigate(current + 1);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-white focus:p-3">Aller au contenu</a>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <span className="text-lg font-bold tracking-tight">Sanad <span className="font-normal text-slate-600">Académie</span></span>
          <div className="flex items-center gap-3">
            <button type="button" aria-pressed={companion} onClick={() => setCompanion((value) => !value)} className="rounded-lg border border-blue-700 px-3 py-1.5 text-sm font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{companion ? 'Voir toute la leçon' : 'Mode côte à côte'}</button>
            <span className="text-sm font-medium text-slate-600">{current + 1}/{total}</span>
          </div>
        </div>
      </header>
      <nav aria-label="Leçons de la soutenance" className="mx-auto max-w-5xl px-4 pt-5 sm:px-6">
        <details className="rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Choisir une leçon · les exercices sont facultatifs</summary>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {['1–2 · Sanad et la méthode', ...lessons.map((lesson) => `${lesson.slide} · ${lesson.title}`)].map((label, index) => (
              <li key={label}>
                <button type="button" aria-current={current === index ? 'step' : undefined} onClick={() => navigate(index)} className={`w-full rounded-lg px-3 py-2 text-start text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${current === index ? 'bg-blue-700 font-semibold text-white' : 'bg-slate-50 hover:bg-blue-50'}`}>
                  {label}{skipped.includes(index) ? ' · passé' : ''}
                </button>
              </li>
            ))}
          </ol>
        </details>
      </nav>
      <main id="contenu" className="mx-auto max-w-5xl px-4 py-6 sm:px-6" key={current}>
        {current === 0
          ? <FirstLesson onSkip={skip} companion={companion} />
          : <CourseLesson lesson={lessons[current - 1]} onSkip={skip} onPrevious={() => navigate(current - 1)} hasNext={current < total - 1} companion={companion} />}
      </main>
    </div>
  );
}
