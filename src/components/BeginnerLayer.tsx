import type { Beginner } from '../data/beginner';

// Shown before any technical part of a lesson: the idea in everyday words, then every
// technical word with a plain meaning and an example, then the whole story step by step.
export function BeginnerLayer({ data }: { data?: Beginner }) {
  if (!data) return null;
  return (
    <section aria-labelledby="en-clair" className="space-y-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5 leading-relaxed sm:p-6">
      <div>
        <h2 id="en-clair" className="text-xl font-semibold text-emerald-950">D’abord, en clair</h2>
        <p className="mt-2 text-lg">{data.plain}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-emerald-950">Les mots techniques de cette leçon</h3>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          {data.words.map(({ term, meaning, example }) => (
            <div key={term} className="rounded-xl border border-emerald-200 bg-white p-4">
              <dt className="font-bold">{term}</dt>
              <dd className="mt-1">{meaning}</dd>
              <dd className="mt-2 text-sm text-slate-700"><strong>Exemple :</strong> {example}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-emerald-950">L’image complète, pas à pas</h3>
        <ol className="mt-3 list-decimal space-y-2 ps-5">
          {data.story.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </div>
    </section>
  );
}
