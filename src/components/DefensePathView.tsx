import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  CircleDot,
  FileCode2,
  KeyRound,
  Map as MapIcon,
  Mic,
  Mountain,
  Presentation,
  RotateCcw,
  Target,
} from 'lucide-react';
import { MermaidDiagram } from './MermaidDiagram';
import { AnswerCoach } from './AnswerCoach';
import { GeminiApiKeyModal } from './GeminiApiKeyModal';
import { DEFENSE_PATH, PATH_STAGES, TERRITORY_MINDMAP } from '../data/defensePath';
import type { PathNode } from '../data/defensePath';
import type { CoachExercise } from '../services/coachService';
import {
  getAllRecords,
  pickWarmups,
  resetLedger,
  subscribeLedger,
} from '../services/progressLedger';
import type { ExerciseRecord } from '../services/progressLedger';

interface DefensePathViewProps {
  lang: 'en' | 'fr';
}

const NODE_KEY = 'sanad_path_node';
const DAY = 24 * 60 * 60 * 1000;

type NodeStatus = 'cold' | 'helped' | 'started' | 'new';

function nodeStatus(node: PathNode, records: Record<string, ExerciseRecord>): NodeStatus {
  const recs = node.gates.map((g) => records[g.id] ?? records[`${g.id}#fresh`]).filter(Boolean);
  if (!recs.length) return 'new';
  if (node.gates.every((g) => records[g.id]?.passedCold || records[`${g.id}#fresh`]?.lastPassed)) return 'cold';
  if (node.gates.every((g) => records[g.id]?.lastPassed || records[`${g.id}#fresh`]?.lastPassed)) return 'helped';
  return 'started';
}

const CLAIM_STYLE: Record<string, string> = {
  Invariant: 'bg-blue-100 text-blue-800',
  'Rule of thumb': 'bg-amber-100 text-amber-800',
  Convention: 'bg-slate-200 text-slate-700',
};

export const DefensePathView: React.FC<DefensePathViewProps> = ({ lang }) => {
  const fr = lang === 'fr';
  const [nodeIdx, setNodeIdx] = useState(() => {
    try {
      const saved = Number(localStorage.getItem(NODE_KEY));
      return Number.isInteger(saved) && saved >= 0 && saved < DEFENSE_PATH.length ? saved : 0;
    } catch {
      return 0;
    }
  });
  const [records, setRecords] = useState(getAllRecords);
  const [showMap, setShowMap] = useState(nodeIdx === 0);
  const [showLedger, setShowLedger] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);

  useEffect(() => subscribeLedger(() => setRecords(getAllRecords())), []);
  useEffect(() => {
    try {
      localStorage.setItem(NODE_KEY, String(nodeIdx));
    } catch {
      // Remembering the position is a convenience only.
    }
  }, [nodeIdx]);

  const node = DEFENSE_PATH[nodeIdx];
  const allGates = useMemo(() => {
    const m = new Map<string, { gate: CoachExercise; node: PathNode }>();
    DEFENSE_PATH.forEach((n) => n.gates.forEach((g) => m.set(g.id, { gate: g, node: n })));
    return m;
  }, []);

  // Warm-up recall: earlier gates, older and weaker first; untouched earlier gates fill the gaps.
  const warmups = useMemo(() => {
    if (nodeIdx === 0) return [];
    const earlier = DEFENSE_PATH.slice(0, nodeIdx).flatMap((n) => n.gates.map((g) => g.id));
    const picked = pickWarmups(earlier, 2);
    for (const id of [...earlier].reverse()) {
      if (picked.length >= 2) break;
      if (!picked.includes(id)) picked.push(id);
    }
    return picked.map((id) => allGates.get(id)!).filter(Boolean);
  }, [nodeIdx, allGates]);

  const go = (idx: number) => {
    setNodeIdx(idx);
    setShowMap(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const ledger = useMemo(() => {
    const now = Date.now();
    const cold: string[] = [];
    const notCold: string[] = [];
    const due: string[] = [];
    const watch: string[] = [];
    allGates.forEach(({ gate, node: n }, id) => {
      const r = records[id];
      const label = `${n.number}. ${gate.prompt.slice(0, 70)}${gate.prompt.length > 70 ? '…' : ''}`;
      if (!r) return;
      if (r.passedCold) {
        cold.push(label);
        if (now - r.lastSeen > 1 * DAY) due.push(label);
      } else {
        notCold.push(label);
      }
      if (r.overconfidentMisses > 0) watch.push(`${label} (×${r.overconfidentMisses})`);
    });
    const nextUp = DEFENSE_PATH.filter((n) => nodeStatus(n, records) !== 'cold').slice(0, 2);
    return { cold, notCold, due, watch, nextUp };
  }, [records, allGates]);

  const passedNodes = DEFENSE_PATH.filter((n) => nodeStatus(n, records) === 'cold').length;
  const stage = PATH_STAGES.find((s) => s.id === node.stage)!;

  return (
    <div className="max-w-7xl mx-auto w-full flex gap-6">
      <GeminiApiKeyModal isOpen={showKeyModal} onClose={() => setShowKeyModal(false)} />
      {/* Left rail: the whole path, always visible on desktop */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-20 liquid-glass rounded-3xl p-4 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <button
            onClick={() => setShowMap(true)}
            className="w-full flex items-center gap-2 rounded-2xl bg-[#1d1d1f] text-white px-3 py-2 text-xs font-semibold"
          >
            <MapIcon size={14} /> {fr ? 'Carte du territoire' : 'Territory map'}
          </button>
          {PATH_STAGES.map((s) => (
            <div key={s.id} className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">
                {fr ? s.titleFr : s.title}
              </p>
              {DEFENSE_PATH.filter((n) => n.stage === s.id).map((n) => {
                const idx = DEFENSE_PATH.indexOf(n);
                const st = nodeStatus(n, records);
                return (
                  <button
                    key={n.id}
                    onClick={() => go(idx)}
                    className={`w-full flex items-start gap-2 rounded-xl px-2 py-1.5 text-left text-xs transition ${
                      idx === nodeIdx && !showMap ? 'bg-blue-600 text-white' : 'text-[#424245] hover:bg-black/5'
                    }`}
                  >
                    <StatusIcon status={st} active={idx === nodeIdx && !showMap} />
                    <span>
                      <span className="font-semibold">{n.number}.</span> {fr ? n.titleFr : n.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 min-w-0 space-y-5">
        {/* Header */}
        <div className="liquid-glass rounded-3xl p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                {fr ? 'Parcours de soutenance · du général au précis' : 'Defense path · general to specific'}
              </p>
              <h1 className="text-lg sm:text-xl font-bold text-[#1d1d1f]">
                {fr ? 'Comprendre SANAD en entier avant samedi' : 'Understand all of SANAD before Saturday'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMap(true)}
                className="lg:hidden inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold border border-black/10"
              >
                <MapIcon size={12} /> {fr ? 'Carte' : 'Map'}
              </button>
              <button
                onClick={() => setShowKeyModal(true)}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold border border-black/10"
                title={fr ? 'Clé Gemini pour la correction par IA' : 'Gemini key for AI grading'}
              >
                <KeyRound size={12} /> {fr ? 'Correcteur IA' : 'AI grader'}
              </button>
              <button
                onClick={() => setShowLedger((s) => !s)}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold border border-black/10"
              >
                <BookOpenCheck size={12} /> {fr ? 'Bilan' : 'Status'} · {passedNodes}/{DEFENSE_PATH.length}
              </button>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${(passedNodes / DEFENSE_PATH.length) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-[#6e6e73]">
            {fr
              ? 'Un nœud compte seulement quand toutes ses portes sont réussies à froid (ou une nouvelle porte après aide). Tout ce parcours est vérifié contre le code du dépôt RAG_project_ENSA, le rapport et les diapositives.'
              : 'A node counts only when all its gates pass cold (or a fresh gate after help). Everything on this path was checked against the RAG_project_ENSA code, the report and the slides.'}
          </p>
        </div>

        {showLedger && (
          <div className="liquid-glass rounded-3xl p-5 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#1d1d1f]">{fr ? 'Registre de progression' : 'Progress ledger'}</h2>
              <button
                onClick={() => {
                  if (window.confirm(fr ? 'Effacer tout le registre ?' : 'Erase the whole ledger?')) resetLedger();
                }}
                className="inline-flex items-center gap-1 text-[11px] text-rose-700"
              >
                <RotateCcw size={11} /> {fr ? 'Réinitialiser' : 'Reset'}
              </button>
            </div>
            <LedgerList title={fr ? 'Réussi à froid' : 'Passed cold'} items={ledger.cold} />
            <LedgerList title={fr ? 'Compris, pas encore à froid' : 'Understood, not yet cold'} items={ledger.notCold} />
            <LedgerList title={fr ? 'À revoir (vu il y a plus d’un jour)' : 'Due for review (seen over a day ago)'} items={ledger.due} />
            <LedgerList title={fr ? 'Liste de surveillance (confiance haute + faux)' : 'Watch list (high confidence + wrong)'} items={ledger.watch} tone="rose" />
            <div>
              <p className="font-bold text-[#1d1d1f]">{fr ? 'Ensuite' : 'Next up'}</p>
              <p className="text-[#424245]">
                {ledger.nextUp.map((n) => `${n.number}. ${fr ? n.titleFr : n.title}`).join(' · ') || '—'}
              </p>
            </div>
          </div>
        )}

        {showMap ? (
          <TerritoryMap fr={fr} onOpen={go} records={records} />
        ) : (
          <>
            {/* Node header */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                <span className="rounded-full bg-blue-100 text-blue-800 px-2 py-0.5">
                  {fr ? stage.titleFr : stage.title}
                </span>
                <span className="rounded-full bg-black/5 text-[#424245] px-2 py-0.5">
                  {fr ? 'Nœud' : 'Node'} {node.number}/{DEFENSE_PATH.length}
                </span>
                {node.slides.length > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 text-purple-800 px-2 py-0.5">
                    <Presentation size={11} /> {fr ? 'Diapos' : 'Slides'} {node.slides.join(', ')}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-[#1d1d1f]">{fr ? node.titleFr : node.title}</h2>
              <p className="text-sm text-[#424245]">{node.oneLiner}</p>
              <p className="text-[11px] text-[#86868b]">
                <span className="font-semibold">{fr ? 'Il faut avant : ' : 'Needs first: '}</span>
                {node.needs}
              </p>
            </div>

            {/* 1. Warm-up recall */}
            {warmups.length > 0 && (
              <section className="space-y-3">
                <SectionTitle icon={<RotateCcw size={14} />} text={fr ? '1 · Échauffement : rappel à froid' : '1 · Warm-up recall, cold'} />
                {warmups.map(({ gate, node: from }) => (
                  <AnswerCoach
                    key={`warm-${node.id}-${gate.id}`}
                    exercise={gate}
                    lang={lang}
                    compact
                    label={`${fr ? 'Rappel du nœud' : 'Recall from node'} ${from.number}`}
                  />
                ))}
              </section>
            )}

            {/* 2. Teach */}
            <section className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-4">
              <SectionTitle icon={<Target size={14} />} text={fr ? '2 · L’idée' : '2 · The idea'} />
              <div className="text-sm text-[#1d1d1f] leading-relaxed whitespace-pre-line">{node.explain}</div>

              {node.diagram && (
                <MermaidDiagram chart={node.diagram} title={node.diagramTitle} diagramType={node.diagramType} />
              )}

              <div className="rounded-2xl bg-white/70 border border-black/5 p-4 space-y-2">
                <p className="text-xs font-bold text-[#1d1d1f]">
                  {fr ? 'Exemple déroulé : ' : 'Worked example: '}
                  {node.example.title}
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-xs text-[#424245]">
                  {node.example.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>

              <div className="space-y-1.5">
                {node.claims.map((c, i) => (
                  <p key={i} className="text-xs text-[#424245]">
                    <span className={`mr-2 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${CLAIM_STYLE[c.label]}`}>
                      {c.label}
                    </span>
                    {c.text}
                  </p>
                ))}
              </div>
            </section>

            {/* 3. Myth check + 4. Iceberg */}
            <div className="grid sm:grid-cols-2 gap-4">
              <section className="liquid-glass rounded-3xl p-5 space-y-2">
                <SectionTitle icon={<AlertTriangle size={14} />} text={fr ? '3 · Idée reçue' : '3 · Myth check'} />
                <p className="text-xs font-semibold text-rose-800">« {node.myth.myth} »</p>
                <p className="text-xs text-[#424245]">{node.myth.truth}</p>
              </section>
              <section className="liquid-glass rounded-3xl p-5 space-y-2">
                <SectionTitle icon={<Mountain size={14} />} text={fr ? '4 · Iceberg (plus tard)' : '4 · Iceberg (later)'} />
                <ul className="list-disc pl-5 space-y-1 text-xs text-[#424245]">
                  {node.iceberg.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Code pointers + say it to the jury */}
            <div className="grid sm:grid-cols-2 gap-4">
              <section className="liquid-glass rounded-3xl p-5 space-y-2">
                <SectionTitle icon={<FileCode2 size={14} />} text={fr ? 'Où c’est dans le code' : 'Where it lives in the code'} />
                <ul className="space-y-1.5">
                  {node.code.map((c, i) => (
                    <li key={i} className="text-xs">
                      <code className="text-[11px] font-mono text-blue-700 bg-blue-50 rounded px-1">{c.file}</code>
                      <span className="text-[#424245]"> — {c.what}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="liquid-glass rounded-3xl p-5 space-y-2">
                <SectionTitle icon={<Mic size={14} />} text="À dire au jury (FR)" />
                <p className="text-xs text-[#1d1d1f] italic leading-relaxed">{node.sayItFr}</p>
              </section>
            </div>

            {/* 5. Gates */}
            <section className="space-y-3">
              <SectionTitle icon={<CircleDot size={14} />} text={fr ? '5 · Portes : réponds à froid' : '5 · Gates: answer cold'} />
              {node.gates.map((g, i) => (
                <AnswerCoach
                  key={g.id}
                  exercise={g}
                  lang={lang}
                  label={`${fr ? 'Porte' : 'Gate'} ${node.number}.${i + 1}`}
                />
              ))}
            </section>

            <div className="flex items-center justify-between pb-8">
              <button
                onClick={() => go(nodeIdx - 1)}
                disabled={nodeIdx === 0}
                className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-semibold border border-black/10 disabled:opacity-30"
              >
                <ArrowLeft size={13} /> {fr ? 'Précédent' : 'Previous'}
              </button>
              <button
                onClick={() => go(nodeIdx + 1)}
                disabled={nodeIdx === DEFENSE_PATH.length - 1}
                className="inline-flex items-center gap-1 rounded-full bg-[#1d1d1f] text-white px-4 py-2 text-xs font-semibold disabled:opacity-30"
              >
                {fr ? 'Suivant' : 'Next'} <ArrowRight size={13} />
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const TerritoryMap: React.FC<{
  fr: boolean;
  onOpen: (idx: number) => void;
  records: Record<string, ExerciseRecord>;
}> = ({ fr, onOpen, records }) => (
  <div className="space-y-5">
    <section className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-3">
      <h2 className="text-base font-bold text-[#1d1d1f]">
        {fr ? 'Tout SANAD sur une carte' : 'All of SANAD on one map'}
      </h2>
      <p className="text-xs text-[#424245]">
        {fr
          ? 'Lis la carte du centre vers l’extérieur : le problème, la promesse, puis les deux trajets (document → index, question → réponse ou refus), puis la preuve, puis ce qui entoure le cœur.'
          : 'Read it from the centre outwards: the problem, the promise, then the two journeys (document → index, question → answer or refusal), then the proof, then everything around the core.'}
      </p>
      <MermaidDiagram chart={TERRITORY_MINDMAP} title="SANAD" diagramType="mindmap" />
    </section>
    {PATH_STAGES.map((s) => (
      <section key={s.id} className="liquid-glass rounded-3xl p-5 space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">{fr ? s.titleFr : s.title}</p>
        <p className="text-xs text-[#424245]">
          <span className="font-semibold">{fr ? 'Il faut avant : ' : 'Needs first: '}</span>
          {s.needs}
        </p>
        <p className="text-xs text-[#424245]">
          <span className="font-semibold">{fr ? 'Invariant principal : ' : 'Main invariant: '}</span>
          {s.invariant}
        </p>
        <p className="text-xs text-[#424245]">
          <span className="font-semibold">{fr ? 'À la fin tu sais : ' : 'At the end you can: '}</span>
          {s.canDo}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {DEFENSE_PATH.filter((n) => n.stage === s.id).map((n) => (
            <button
              key={n.id}
              onClick={() => onOpen(DEFENSE_PATH.indexOf(n))}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-semibold border border-black/10 hover:bg-blue-50"
            >
              <StatusIcon status={nodeStatus(n, records)} active={false} />
              {n.number}. {fr ? n.titleFr : n.title}
            </button>
          ))}
        </div>
      </section>
    ))}
  </div>
);

const StatusIcon: React.FC<{ status: NodeStatus; active: boolean }> = ({ status, active }) => {
  const cls = 'shrink-0 mt-0.5';
  if (status === 'cold') return <CheckCircle2 size={13} className={`${cls} ${active ? 'text-white' : 'text-emerald-600'}`} />;
  if (status === 'helped') return <CheckCircle2 size={13} className={`${cls} ${active ? 'text-white' : 'text-amber-500'}`} />;
  if (status === 'started') return <CircleDot size={13} className={`${cls} ${active ? 'text-white' : 'text-amber-500'}`} />;
  return <Circle size={13} className={`${cls} ${active ? 'text-white' : 'text-[#c7c7cc]'}`} />;
};

const SectionTitle: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
    {icon} {text}
  </h3>
);

const LedgerList: React.FC<{ title: string; items: string[]; tone?: 'rose' }> = ({ title, items, tone }) => (
  <div>
    <p className={`font-bold ${tone === 'rose' ? 'text-rose-800' : 'text-[#1d1d1f]'}`}>
      {title} ({items.length})
    </p>
    {items.length ? (
      <ul className="list-disc pl-5 text-[#424245]">
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    ) : (
      <p className="text-[#86868b]">—</p>
    )}
  </div>
);
