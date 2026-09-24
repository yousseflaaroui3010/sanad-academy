import React, { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

// Claims in the older Curriculum / Rebuild / Sandbox content that do not match
// the RAG_project_ENSA code or the thesis report. The Defense Path is the
// checked source of truth; this banner keeps learners from memorising the rest.
const CORRECTIONS: { wrong: string; right: string; where: string }[] = [
  {
    wrong: 'Refusal triggers when similarity/cosine is below 0.70.',
    right: 'There is no score threshold. An LLM grader says RELEVANT or OFF_TOPIC; after 2 rewords the graph refuses.',
    where: 'agent/nodes.py route_after_grade; config.py retry_ceiling = 2',
  },
  {
    wrong: 'The benchmark is scored with RAGAS.',
    right: 'RAGAS would not install with the pinned libraries; an in-house LLM judge (same Gemini family) replaced it.',
    where: 'evaluation/scoring.py; report p.61 and p.74',
  },
  {
    wrong: 'RRF uses k = 60.',
    right: 'SANAD’s embedded Qdrant (qdrant-client local mode) uses k = 2, i.e. 1/(rank + 1). It is not a SANAD setting.',
    where: 'qdrant_client/hybrid/fusion.py DEFAULT_RANKING_CONSTANT_K = 2',
  },
  {
    wrong: 'Parents are 4,000-character legal articles.',
    right: 'Parents are heading sections merged below 2,000 and split above 4,000 characters, labelled "Article N".',
    where: 'config.py parent_merge_below_chars / parent_split_above_chars',
  },
  {
    wrong: 'Sessions use AES-GCM encrypted cookies; a 4-tier RBAC matrix.',
    right: 'Keycloak OIDC sign-in, then an opaque session token stored only as a SHA-256 hash. Roles were removed in v3.1: workspaces are owned or shared.',
    where: 'ui/auth_gate.py, ui/oidc.py; DECISIONS 2026-09-18 (ST-54)',
  },
  {
    wrong: 'The UI is HTMX / "no-JS".',
    right: 'FastAPI + Jinja server-rendered pages plus one small JavaScript file; the page polls for the answer.',
    where: 'app.py; ui/; report p.59',
  },
  {
    wrong: 'PII anonymisation for Moroccan law 09-08.',
    right: 'No anonymisation feature. The demo corpus is public on purpose; real personal data would need a data-protection review first.',
    where: 'report Table 3.7 p.43; docs/defense/jury-questions.md Q5',
  },
  {
    wrong: '"Rule 5" two-person law; Sprints 0–6; WCAG 2.1.',
    right: 'main is protected (1 approval + green CI). 8 sprints S0–S7 (20 Jul–19 Sep). The accessibility target is WCAG 2.2 AA, with no screen-reader test done.',
    where: 'ruleset.json; report Table 1.5, p.44',
  },
];

export const VerificationBanner: React.FC<{ lang: 'en' | 'fr'; onOpenPath: () => void }> = ({ lang, onOpenPath }) => {
  const fr = lang === 'fr';
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-5xl mx-auto w-full rounded-2xl border border-amber-300/70 bg-amber-50/90 px-4 py-3 text-xs text-amber-950 space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <AlertTriangle size={14} className="text-amber-600 shrink-0" />
        <span className="font-semibold">
          {fr
            ? 'Contenu non vérifié : certaines affirmations de cet onglet contredisent le code réel.'
            : 'Unverified content: some claims in this tab contradict the real code.'}
        </span>
        <button onClick={onOpenPath} className="underline font-semibold">
          {fr ? 'Réviser avec le Parcours soutenance (vérifié)' : 'Study from the Defense Path (checked)'}
        </button>
        <button onClick={() => setOpen((o) => !o)} className="ml-auto inline-flex items-center gap-1 font-semibold">
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {fr ? 'Corrections connues' : 'Known corrections'} ({CORRECTIONS.length})
        </button>
      </div>
      {open && (
        <ul className="space-y-1.5 pt-1">
          {CORRECTIONS.map((c) => (
            <li key={c.wrong}>
              <span className="line-through text-amber-800">{c.wrong}</span>{' '}
              <span className="font-semibold">→ {c.right}</span>{' '}
              <span className="font-mono text-[10px] text-amber-800">({c.where})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
