import { LessonVisual } from './LessonVisual';
import { EvidenceBridge } from './EvidenceBridge';
import { AnswerCoach } from './AnswerCoach';

const parcours = [
  { temps: 'Jour 1', slides: '1 à 5', sujet: 'Le problème, nos trois promesses, puis le principe du RAG.' },
  { temps: 'Jour 1', slides: '6 à 7', sujet: 'Le travail de YL et MB, puis les besoins des utilisateurs.' },
  { temps: 'Jour 2', slides: '8 à 9', sujet: 'L’architecture, les stockages, la synchronisation et la recherche.' },
  { temps: 'Jour 2', slides: '10 à 13', sujet: 'L’agent, les figures, les écrans et la démonstration.' },
  { temps: 'Jour 3', slides: '14 à 16', sujet: 'Les questions gelées, les seuils et les résultats mesurés.' },
  { temps: 'Jour 3', slides: '17 à 19 + annexes', sujet: 'Les limites, la suite et les questions du jury.' },
];

export function FirstLesson({ onSkip, companion = false }: { onSkip: () => void; companion?: boolean }) {
  return (
    <article className="mx-auto max-w-3xl space-y-6 pb-12">
      <header className="space-y-3">
        <p className="text-sm font-semibold text-blue-700">Leçon 1 · Diapositives 1 et 2 · aperçu technique</p>
        <h1 id="lesson-title" tabIndex={-1} className="text-3xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-blue-700 sm:text-4xl">Pourquoi Sanad existe ?</h1>
        <p className="text-base leading-relaxed text-slate-700">Nous suivons la présentation réelle, puis le rapport. Pour chaque idée, le code tranche ce qui fonctionne vraiment.</p>
        <button type="button" onClick={onSkip} className="rounded-lg border border-blue-700 bg-white px-4 py-2 font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Je connais déjà · passer →</button>
      </header>

      {!companion && <section aria-labelledby="parcours" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 id="parcours" className="text-xl font-semibold">Le parcours · 3 heures par jour au maximum</h2>
        <ol className="mt-4 space-y-3">
          {parcours.map(({ temps, slides, sujet }, i) => (
            <li key={slides} className="grid gap-1 border-b border-slate-100 pb-3 last:border-0 last:pb-0 sm:grid-cols-[8rem_7rem_1fr]">
              <strong className="text-blue-700">{temps}{i === 0 ? ' · en cours' : ''}</strong>
              <span className="font-medium">Slides {slides}</span>
              <span className="text-slate-700">{sujet}</span>
            </li>
          ))}
        </ol>
      </section>}

      {!companion && <section aria-labelledby="idee" className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 leading-relaxed sm:p-6">
        <h2 id="idee" className="text-xl font-semibold">L’idée, avec la technique derrière</h2>
        <p><strong>[Invariant]</strong> Un modèle de langage sait produire une phrase plausible ; cela ne prouve pas qu’elle est juste. Sanad commence donc par chercher dans les documents de <em>l’espace actif</em> : un espace est un groupe de fichiers gardé à part des autres.</p>
        <p><strong>[Convention]</strong> On appelle cela <strong>RAG</strong>, pour « génération augmentée par recherche ». En clair : retrouver les passages utiles <em>avant</em> de rédiger. Ce n’est pas réentraîner le modèle sur vos fichiers.</p>
        <div className="rounded-xl bg-slate-50 p-4">
          <h3 className="font-semibold">Exemple, pas à pas</h3>
          <ol className="mt-2 list-decimal space-y-2 ps-5">
            <li>Vous placez le Code du travail dans un espace RH et lancez <strong>Synchroniser</strong>. Sanad extrait le texte, le découpe et prépare un index : une sorte de catalogue pour retrouver les passages.</li>
            <li>Vous demandez ce que dit ce code sur la durée hebdomadaire. L’application cherche de courts extraits dans l’index, puis lit les sections complètes dont ils viennent.</li>
            <li>Si ces sections permettent une réponse, le modèle rédige à partir d’elles et Sanad affiche les sources. Sinon, il peut chercher autrement, puis refuser.</li>
          </ol>
        </div>
        <p><strong>[Invariant du code]</strong> L’objet « réponse finale » exige au moins une source. <strong>[Règle de prudence]</strong> Une carte source indique où vérifier ; elle ne prouve pas à elle seule que chaque phrase est fidèle au document.</p>
        <p className="text-sm text-slate-600">À retrouver dans le projet : <code>sync.py</code> prépare les fichiers ; <code>agent/graph.py</code> trace les étapes de la question ; <code>agent/state.py</code> impose la source. Le rapport détaille la science au chapitre 2.</p>
      </section>}

      <LessonVisual slide={1} />
      <EvidenceBridge slide={1} />

      {!companion && <section aria-labelledby="mythe" className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 id="mythe" className="text-xl font-semibold">Idée fausse à éviter</h2>
        <p>« RAG signifie que le modèle ne peut plus se tromper. » Non : la recherche peut rater un bon passage, ou le modèle peut mal lire celui qu’il trouve.</p>
        <h3 className="font-semibold">Deux difficultés pour plus tard</h3>
        <ul className="list-disc space-y-1 ps-5 text-slate-700">
          <li>Comment retrouver un texte qui exprime la même idée avec d’autres mots ?</li>
          <li>Comment vérifier qu’une phrase de réponse est vraiment appuyée par la source ?</li>
        </ul>
      </section>}

      {!companion && <AnswerCoach exerciseId={1} heading="Exercice 1 · Sans notes" question="Votre espace ne contient qu’un manuel du personnel. Vous demandez le prix du train demain. Que doit faire Sanad, et pourquoi ? Qu’est-ce qu’une carte source prouverait, et qu’est-ce qu’elle ne prouverait pas ?" onSkip={onSkip} skipLabel="Passer cette leçon →" />}
    </article>
  );
}
