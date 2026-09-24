import type { ReactNode } from 'react';
import { CodeDiagram } from './CodeDiagram';

type Tone = 'blue' | 'green' | 'amber' | 'slate';
const tones: Record<Tone, string> = {
  blue: 'border-blue-300 bg-blue-50 text-blue-950',
  green: 'border-emerald-300 bg-emerald-50 text-emerald-950',
  amber: 'border-amber-300 bg-amber-50 text-amber-950',
  slate: 'border-slate-300 bg-slate-50 text-slate-900',
};

function Frame({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <figcaption className="text-lg font-bold">{title}</figcaption>
      <div className="mt-5">{children}</div>
      <p className="mt-5 border-t border-slate-200 pt-3 text-sm leading-relaxed text-slate-700">{note}</p>
    </figure>
  );
}

function Box({ title, detail, tone = 'blue' }: { title: string; detail?: string; tone?: Tone }) {
  return (
    <div className={`min-w-0 rounded-xl border p-3 sm:p-4 ${tones[tone]}`}>
      <strong className="block text-sm leading-snug">{title}</strong>
      {detail && <span className="mt-1 block text-xs leading-relaxed">{detail}</span>}
    </div>
  );
}

function Chain({ items }: { items: { title: string; detail?: string; tone?: Tone }[] }) {
  return <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{items.map((item, index) => (
    <li key={item.title} className="flex min-w-0 items-stretch gap-2">
      <div className="flex-1"><Box {...item} /></div>
      {index < items.length - 1 && <span aria-hidden="true" className="hidden self-center font-bold text-blue-800 lg:block">→</span>}
    </li>
  ))}</ol>;
}

function Bars({ rows, max, target, unit }: { rows: [string, number, Tone][]; max: number; target: number; unit: string }) {
  const barColors: Record<Tone, string> = {
    blue: 'bg-blue-700 text-white', green: 'bg-emerald-700 text-white',
    amber: 'bg-amber-700 text-white', slate: 'bg-slate-700 text-white',
  };
  return <div className="space-y-4">
    <div className="relative ms-[38%] h-5 text-xs text-slate-700">
      <span className="absolute -translate-x-1/2" style={{ left: `${target / max * 100}%` }}>Seuil {target}{unit}</span>
    </div>
    {rows.map(([label, value, tone]) => <div key={label} className="grid grid-cols-[36%_1fr] items-center gap-3 text-sm">
      <span className="font-medium">{label}</span>
      <div className="relative h-9 rounded-md bg-slate-100">
        <div className="absolute inset-y-0 border-l-2 border-dashed border-slate-600" style={{ left: `${target / max * 100}%` }} />
        <div className={`flex h-full items-center rounded-md px-2 font-bold ${barColors[tone]}`} style={{ width: `${value / max * 100}%` }}>{value.toLocaleString('fr-FR')}{unit}</div>
      </div>
    </div>)}
  </div>;
}

function Cutoff() {
  return <Frame title="Question 33 : le passage s’arrête trop tôt" note="Le graphe vérifie l’enfant avant de lire le parent. Modifier cet ordre pourrait améliorer ce cas, mais exige de refaire les 60 questions, surtout les 20 refus.">
    <div className="grid gap-3 sm:grid-cols-2">
      <Box title="Extrait vu par le vérificateur · 500 caractères" detail="Article 66 : début de la procédure… [fin de l’extrait]" tone="amber" />
      <Box title="Section complète · non encore lue" detail="… délai d’un mois. La réponse est ici, juste après la coupure." tone="green" />
    </div>
    <div className="mt-3 rounded-lg bg-amber-50 p-3 text-center text-sm font-semibold text-amber-950">Grade = non → branche refus → le rédacteur ne voit jamais la section complète.</div>
  </Frame>;
}

function LimitsMindmap() {
  const limits = [
    ['Taille', '60 questions seulement'],
    ['Langue', 'Questions françaises'],
    ['Juge', 'Même famille que le rédacteur'],
    ['Déploiement', 'Mode local non mesuré'],
    ['Recherche', 'Question 33 refusée à tort'],
  ];
  return <Frame title="Carte mentale : autour du 39/40" note="Chaque branche dit ce que le chiffre ne mesure pas. Le cas 33 est un refus prudent, pas une invention.">
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="sm:col-span-2 sm:mx-auto sm:w-2/3"><Box title="39/40 sur le jeu français de v3.1" detail="Mesure utile, mais limitée à ce corpus et à ce juge" tone="blue" /></div>
      {limits.map(([title, detail]) => <div key={title} className="border-s-2 border-blue-300 ps-3"><Box title={title} detail={detail} tone={title === 'Recherche' ? 'amber' : 'slate'} /></div>)}
    </div>
  </Frame>;
}

function Roadmap() {
  return <Frame title="Une suite n’est crédible qu’avec sa mesure" note="Avant de modifier le vérificateur, noter le résultat actuel ; après le changement, refaire G1 et G2 sur le jeu gelé.">
    <ol className="space-y-3 border-s-2 border-blue-400 ps-5">
      <li className="relative"><span aria-hidden="true" className="absolute -start-[1.65rem] top-3 h-3 w-3 rounded-full bg-blue-700" /><Box title="Dans un mois · question 33" detail="Lire plus de contexte → g-in-033 fondée, G2 toujours 20/20" /></li>
      <li className="relative"><span aria-hidden="true" className="absolute -start-[1.65rem] top-3 h-3 w-3 rounded-full bg-emerald-700" /><Box title="Dans trois mois · arabe et figures" detail="Écrire et figer des questions pour mesurer ces parcours" tone="green" /></li>
      <li className="relative"><span aria-hidden="true" className="absolute -start-[1.65rem] top-3 h-3 w-3 rounded-full bg-slate-700" /><Box title="Dans six mois · utilisateurs et juge" detail="Entretiens réels et deuxième juge d’une autre famille" tone="slate" /></li>
    </ol>
  </Frame>;
}

const cards: Record<number, { title: string; note: string; items: { title: string; detail?: string; tone?: Tone }[] }> = {
  3: { title: 'Deux façons de répondre à une question RH', note: 'La source est une piste vérifiable, pas un certificat de vérité.', items: [
    { title: 'Réponse plausible sans source', detail: 'Rapide, mais impossible à contrôler', tone: 'amber' },
    { title: 'Sanad : chercher le passage', detail: 'Ouvrir l’article, répondre ou refuser', tone: 'green' }] },
  4: { title: 'Trois portes : toutes doivent passer', note: 'G3 contrôle la présence d’une source. G1 vérifie si les phrases sont réellement fondées.', items: [
    { title: 'G1 · ≥ 36/40', detail: 'Réponses entièrement fondées' }, { title: 'G2 · 20/20', detail: 'Refus hors documents', tone: 'amber' }, { title: 'G3 · 100 %', detail: 'Sources affichées', tone: 'green' }] },
  6: { title: 'Propriétaire prévu ≠ auteur réel', note: 'ST-28, ST-32 et ST-33 sont attribués à YL dans BUILD-PLAN, mais les entrées BUILD-STATE 2026-09-05 disent qu’ils ont été construits sur la copie de MB. Ne récitez pas le plan comme une liste d’auteurs.', items: [
    { title: 'Plan · YL', detail: 'Moteur, écrans et scripts d’évaluation prévus pour lui' }, { title: 'Plan · MB', detail: 'Corpus, questions gelées, QA et mémoire', tone: 'green' }, { title: 'Réalisé · MB aussi', detail: 'ST-28, ST-32, ST-33 ; choix des pages serveur au lieu de Gradio', tone: 'amber' }] },
  12: { title: 'Trois écrans, trois décisions', note: 'Une erreur réseau n’est pas un refus documentaire. Answer.kind sépare réponse, refus et clarification.', items: [
    { title: 'Espaces', detail: 'Fichiers, Sync, bilan' }, { title: 'Assistant', detail: 'Question, source ou refus', tone: 'green' }, { title: 'Rapports', detail: 'Mesures et échecs conservés', tone: 'slate' }] },
  13: { title: 'La démo : six gestes vérifiables', note: 'Les figures sont dans origin/main depuis #157. Leur présence sur le site de démonstration et dans son corpus reste à vérifier séparément.', items: [
    { title: '1–2 · Sync et question', detail: 'Une réponse dans le Code' }, { title: '3–4 · Source et refus', detail: 'Ouvrir la preuve, puis demander hors corpus', tone: 'green' }, { title: '5–6 · Figure et arabe', detail: 'Ouvrir une figure synchronisée, puis changer de langue', tone: 'amber' }] },
  17: { title: 'Carte des limites : ce que 39/40 ne démontre pas', note: 'Au centre : une mesure du corpus français, pas une garantie de toute réponse future.', items: [
    { title: '60 questions', detail: 'Une question couverte = 2,5 points' }, { title: 'Français seulement', detail: 'Arabe non noté', tone: 'slate' }, { title: 'Même famille de juge', detail: 'Biais possible', tone: 'amber' }, { title: 'Mode local non mesuré', detail: 'Qualité Ollama inconnue', tone: 'slate' }, { title: 'Question 33', detail: 'Refus trop prudent', tone: 'amber' }] },
  18: { title: 'Feuille de route : une limite → un test', note: 'Chaque idée doit avoir un critère de réussite avant d’être annoncée comme solution.', items: [
    { title: 'Court terme', detail: 'Parent au vérificateur → refaire G1 et G2' }, { title: 'Ensuite', detail: 'Jeux gelés sur arabe et figures', tone: 'green' }, { title: 'Plus tard', detail: 'Entretiens et second juge indépendant', tone: 'slate' }] },
  19: { title: 'Le projet en une phrase complète', note: 'Dites aussi une limite : la question 33 reste un refus en trop, et le mode local n’a pas passé ce même examen.', items: [
    { title: 'Besoin', detail: 'Trouver une règle dans ses documents' }, { title: 'Méthode', detail: 'Chercher → vérifier → répondre ou refuser', tone: 'blue' }, { title: 'Mesure v3.1', detail: '39/40 fondées ; 20/20 refus ; sources 39/39', tone: 'green' }] },
};

export function LessonVisual({ slide }: { slide: number }) {
  if ([5, 7, 8, 9, 10, 11, 14, 20, 22, 23, 24].includes(slide)) return <CodeDiagram slide={slide} />;
  if (slide === 1) return <Frame title="La bibliothécaire, pas une boule de cristal" note="Le modèle rédige après la recherche. Les cartes sources permettent de contrôler, mais ne garantissent pas la justesse de chaque phrase."><Chain items={[{ title: 'Recevoir le livre', detail: 'Documents du bon espace' }, { title: 'Chercher la page', detail: 'Passages indexés' }, { title: 'Vérifier le passage', detail: 'Assez pour répondre ?' }, { title: 'Montrer ou refuser', detail: 'Source obligatoire', tone: 'green' }]} /></Frame>;
  if (slide === 15) return <Frame title="Réponses entièrement fondées · cinq versions" note="Même jeu français rejoué ; 39/40 en v3.1, 20/20 refus, 39/39 sources. Un écart d’une question représente 2,5 points."><Bars rows={[["v1.0", 36, 'blue'], ["v1.0.1", 37, 'blue'], ["v2.0", 38, 'blue'], ["v3.0", 38, 'blue'], ["v3.1", 39, 'green']]} max={40} target={36} unit="/40" /></Frame>;
  if (slide === 16) return <Frame title="200 pages : la charge change le résultat" note="Les temps sont ramenés à 200 pages sur la machine mesurée. 731,6 s dépasse la cible de 600 s ; ne cachez pas cet essai."><Bars rows={[["Repos · essai 1", 449.4, 'blue'], ["Repos · essai 2", 375.3, 'blue'], ["Machine chargée", 731.6, 'amber']]} max={800} target={600} unit=" s" /></Frame>;
  if (slide === 17) return <LimitsMindmap />;
  if (slide === 18) return <Roadmap />;
  if (slide === 21) return <Cutoff />;
  const data = cards[slide];
  if (!data) return null;
  return <Frame title={data.title} note={data.note}><div className={`grid gap-3 ${data.items.length >= 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>{data.items.map((item) => <Box key={item.title} {...item} />)}</div></Frame>;
}
