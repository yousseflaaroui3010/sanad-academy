// Hidden model answers for the exercises that already existed in the academy
// (the 4 lesson mini-quizzes, the 4 jury-drill questions and the 2 hallucination
// scenarios). Each is graded by the Answer Coach before the multiple-choice
// version is shown. Where the original option text disagreed with the
// RAG_project_ENSA code, the model answer follows the code and says so.
import type { CoachExercise } from '../services/coachService';

const kp = (point: string, ...keywords: string[]) => ({ point, keywords });

// Keyed by sub-lesson id (courseData.ts).
export const MINI_QUIZ_COACH: Record<string, CoachExercise> = {
  '1-1': {
    id: 'legacy-quiz-1-1',
    prompt:
      'Explain in your own words: under what conditions can a change be merged into main in SANAD’s repository, and why did a two-person team bother with this rule?',
    modelAnswer:
      'main is a protected branch (ruleset.json): a pull request can be merged only when the required CI check is green (pytest, ruff lint, secret scan) AND the other teammate has approved it (1 approving review). Force-pushes and deletion of main are blocked. Each task lives on its own branch. The Definition of Done also asks that the owner can explain the change aloud in one minute. Why: two people working fast on the same code collide and introduce silent regressions; a mandatory green test run plus a second pair of eyes catches them before they reach the product (the review before the figures merge found 8 defects, 2 serious).',
    keyPoints: [
      kp('CI tests must be green', 'test', 'ci', 'green', 'vert', 'pytest'),
      kp('The other person must approve (review)', 'review', 'approv', 'relecture', 'relu', 'other', 'autre'),
      kp('Purpose: catch regressions / collisions before main', 'regression', 'régression', 'bug', 'defect', 'défaut', 'collision', 'conflict', 'conflit'),
    ],
    hints: [
      'Two things must both be true before GitHub lets the merge button work. One is automatic, one is human. What are they?',
      'Invariant: nothing reaches main without a green automated check AND the other person’s approval.',
      'Similar case: a bank transfer above a limit needs the system’s fraud check to pass AND a second employee’s signature. Map both onto a pull request.',
    ],
    source: 'ruleset.json; report p.24–25 and p.70–71; slide 6',
  },
  '1-2': {
    id: 'legacy-quiz-1-2',
    prompt: 'Why does SANAD keep data in SQLite AND in Qdrant (plus JSON files), instead of one database? Say what each one holds.',
    modelAnswer:
      'Each store does a different job. SQLite (data/sanad.db) holds the relational records: workspaces and their owners, documents with their SHA-256 hashes and status, Sync runs with one row per file, evaluation runs and results, users and sessions, conversations and feedback. It gives transactions and ON DELETE CASCADE between tables. Qdrant (embedded, data/qdrant/) holds the searchable child passages, one collection per workspace, each with a 768-dimension E5 vector and a sparse BM25 vector, so it can run the hybrid search. The full parent sections are JSON files in data/parents/, and figures are PNG + JSON in data/figures/. It is specialisation, not duplication: the relational database can’t do vector search well, and the vector index isn’t meant for relational bookkeeping.',
    keyPoints: [
      kp('SQLite: relational records (workspaces, documents, syncs, evaluations, conversations)', 'sqlite', 'relation', 'workspace', 'document', 'sync', 'conversation'),
      kp('Qdrant: vectors / hybrid search on child passages', 'qdrant', 'vector', 'vecteur', 'search', 'recherche'),
      kp('Specialisation, not duplication', 'special', 'spécial', 'different job', 'rôle', 'not duplic', 'pas de doublon', 'each'),
    ],
    hints: [
      'Which question does each store answer: "which documents are in this workspace and when were they synced?" vs "which passages are closest in meaning to this question?"',
      'Rule of thumb: use a relational database for records and relations, and a vector index for similarity search.',
      'Similar case: a library keeps a loans register (who borrowed what, when) and a subject catalogue (find books about X). Would you merge them into one notebook?',
    ],
    misconceptions: ['Saying the two stores duplicate the same data for safety.'],
    source: 'db/schema.sql; vector_store.py; report Table 4.5 p.57',
  },
  '1-3': {
    id: 'legacy-quiz-1-3',
    prompt: 'Who writes the list of sources shown under a SANAD answer, and why does that choice matter?',
    modelAnswer:
      'Python code writes it, not the model. In agent/nodes.py make_answer, the sources are built with _sources_for(cited), where cited is the set of retrieved passages whose parent sections were actually loaded, the same set the writer was shown. The model’s text is never parsed for citations, and the writer prompt forbids bracketed references like [1]. It matters because a citation the model composed could name a document that was never searched or read. Built from retrieval, every source card points to a section that really exists and that the writer really saw. On top of that, Answer.__post_init__ raises an error if an answer has no sources.',
    keyPoints: [
      kp('Code builds sources, not the model', 'code', 'python', 'application', 'not the model', 'pas le modèle'),
      kp('Built from retrieved passages whose sections loaded', 'retriev', 'récupér', 'passage', 'cited', 'loaded', 'chargé'),
      kp('Why: model-made citations could point to unread/nonexistent documents', 'invent', 'fake', 'faux', 'never read', 'jamais lu', 'nonexist', "n'existe"),
    ],
    hints: [
      'In make_answer, which variable are the source cards made from? Does it come from the model’s reply?',
      'Invariant: sources come from retrieval, never from model output.',
      'Similar case: an automatic bibliography built from the books you actually checked out vs one you type from memory. Which can contain a book that doesn’t exist?',
    ],
    source: 'agent/nodes.py make_answer and _sources_for; agent/state.py; prompts/answer-writer/PROMPT.md',
  },
  '2-1': {
    id: 'legacy-quiz-2-1',
    prompt: 'What does uv (Astral) do in SANAD, and what is the real benefit for a jury: speed, or something else?',
    modelAnswer:
      'uv is the Python package and environment manager. It resolves dependencies from pyproject.toml into a lockfile (uv.lock), and installs exactly those versions with "uv sync --frozen" in CI and "uv export --frozen" in the Dockerfile. The benefit to defend is reproducibility: the same pinned versions run on both laptops, in CI and in the Railway image, which matters for a project whose scores must be comparable across releases. uv is also much faster than pip, but "10–100× faster" is the vendor’s own claim, so present speed as a convenience, not as the reason.',
    keyPoints: [
      kp('Package/dependency manager with a lockfile', 'lock', 'uv.lock', 'depend', 'package', 'paquet'),
      kp('Reproducible, same versions everywhere (CI, Docker)', 'reproduc', 'same version', 'mêmes versions', 'frozen', 'docker', 'ci'),
      kp('Speed is a secondary/vendor claim', 'vendor', 'fournisseur', 'secondary', 'secondaire', 'fast', 'rapide', 'bonus'),
    ],
    hints: [
      'What file does uv produce that makes two machines install exactly the same versions?',
      'Rule of thumb: a speed claim from the tool’s own maker is a vendor claim; defend the property you can show (the lockfile).',
      'Similar case: a recipe that says "flour" vs one that says "flour, brand X, type 55, 500 g". Which gives the same cake in two kitchens?',
    ],
    source: 'pyproject.toml; uv.lock; Dockerfile; .github/workflows/gate.yml',
  },
};

// Keyed by the jury-drill question id (DefenseDrillSimulator.tsx).
export const JURY_DRILL_COACH: Record<number, CoachExercise> = {
  1: {
    id: 'legacy-drill-1',
    prompt: 'Jury: "Why didn’t you just wrap an external cloud assistant (ChatGPT, NotebookLM) instead of building your own pipeline?"',
    modelAnswer:
      'Three things a cloud assistant doesn’t give us. (1) Control of where documents live: SANAD keeps the documents, index and database on the organisation’s machine, and in local mode (Ollama) nothing leaves at all. (2) Guarantees built into the code: every answer carries sources built by code, and there is a refusal path the model can’t override. (3) Measurement: the refusal is measured on 20 out-of-corpus questions (20/20 at each version) and a release gate blocks any version under threshold; NotebookLM doesn’t publish a refusal rate. To be honest: our measured results use Gemini in cloud mode, so we don’t claim cloud models are forbidden. We claim the architecture lets an organisation choose local mode, and that mode is still to be measured.',
    keyPoints: [
      kp('Documents/index stay local; local mode possible', 'local', 'ollama', 'machine'),
      kp('Code-enforced sources and refusal', 'source', 'refus', 'code'),
      kp('Measured refusal and release gate', '20/20', 'gate', 'porte', 'measure', 'mesur'),
      kp('Honest: results measured with Gemini (cloud)', 'gemini', 'cloud', 'honest', 'honnête'),
    ],
    hints: [
      'Name what you can SHOW the jury that a wrapped cloud assistant cannot: think of slides 4 and 15.',
      'Invariant: only claim what you measured. Your numbers were produced in cloud mode, so the argument can’t be "cloud is illegal".',
      'Similar case: why build your own quality lab instead of trusting a supplier’s brochure? Because you can test, publish and block. Apply that.',
    ],
    misconceptions: ['Saying cloud models "violate law 09-08": the report doesn’t claim that, and SANAD itself uses Gemini in cloud mode.'],
    source: 'Slides 5 and 8; report p.20–21, Table 3.7, Table 4.7',
  },
  2: {
    id: 'legacy-drill-2',
    prompt: 'Jury: "What exactly happens, technically, when a workspace is deleted? Is anything left behind?"',
    modelAnswer:
      'Deletion goes through app.py delete_workspace_route. It is refused if you are not allowed to manage the workspace, and refused while a Sync of that workspace is running (otherwise the Sync could re-create the collection behind the delete). Then sync.delete_workspace drops the workspace’s Qdrant collection and its parent-sections directory (vector_store.delete_workspace), then deletes the workspace row in SQLite, where ON DELETE CASCADE removes its documents, Sync runs, evaluation runs and conversations. For a workspace whose files were uploaded into a server-managed folder, those files are deleted too; for a workspace pointing at an existing folder, the source files on disk are left untouched. Be careful with legal claims: the report does not claim certified law 09-08 compliance. It says real personal data would need a data-protection review first.',
    keyPoints: [
      kp('Qdrant collection dropped / parents removed', 'collection', 'qdrant', 'parent', 'section'),
      kp('SQLite row deleted with ON DELETE CASCADE', 'cascade', 'sqlite'),
      kp('Refused while a Sync runs (or without manage rights)', 'sync', 'running', 'en cours', 'refus', 'owner', 'propriétaire', 'manage'),
      kp('Source files in an external folder are untouched', 'untouched', 'intact', 'source files', 'fichiers source', 'folder', 'dossier'),
    ],
    hints: [
      'List the stores from slide 8. For each one, what must happen to this workspace’s data?',
      'Invariant: delete everything derived (index, sections, rows) and never leave an index entry whose registry row is gone. That is why a delete is refused during a running Sync.',
      'Similar case: closing a bank account: the cards are cancelled, the statements archive cleared, the ledger rows removed, but the customer’s own house is not touched. Which of SANAD’s items is "the customer’s house"?',
    ],
    misconceptions: ['Claiming SANAD implements the law 09-08 "right to be forgotten" as a certified feature.'],
    source: 'app.py delete_workspace_route; sync.delete_workspace; db/schema.sql ON DELETE CASCADE; workspaces.py docstring',
  },
  3: {
    id: 'legacy-drill-3',
    prompt: 'Jury: "Why separate small child chunks from larger parent sections instead of one uniform chunk size?"',
    modelAnswer:
      'Search small, read big. Children are 500 characters with a 100-character overlap. One idea per passage gives a sharp vector, so a question matches precisely. Parents are whole heading sections, merged below 2,000 characters and split above 4,000, and they give the writer the full context to answer and to cite the article correctly. With only big chunks, each vector averages several ideas and retrieval gets worse. With only small chunks, the text can be cut before the decisive detail, which is exactly what happens to the grader on question 33. SANAD searches the children, then loads each matching parent once and answers from it.',
    keyPoints: [
      kp('Children 500 chars for precise search', '500', 'child', 'enfant', 'precise', 'précis'),
      kp('Parents 2,000–4,000 chars for context', '2000', '2 000', '4000', '4 000', 'parent', 'section', 'context'),
      kp('Trade-off: big dilutes, small cuts context', 'dilut', 'blur', 'flou', 'cut', 'coup', '33'),
    ],
    hints: [
      'What is a vector a summary of, and what happens to that summary when the text is long?',
      'Invariant: search wants one idea per unit, answering wants full context.',
      'Similar case: book index entries (short) vs the pages you read (long).',
    ],
    misconceptions: ['Saying parents are always 4,000 characters, or exactly one article.', 'Saying the vector database cannot store long texts.'],
    source: 'config.py chunk_* and parent_*; chunking.py; slide 9',
  },
  4: {
    id: 'legacy-drill-4',
    prompt: 'Jury: "What stops the model from inventing an article number during a live question?"',
    modelAnswer:
      'Several layers, and none of them is "we asked it nicely". (1) The grader must say RELEVANT before anything is written; after two failed rewords the graph refuses, and the refuse node calls no model. (2) The writer only receives the full retrieved sections and must answer from them or reply NOT_COVERED, which becomes a refusal. (3) The source list is built by code from the retrieved passages, never from the model’s text, and an answer without sources cannot be constructed (Answer.__post_init__ raises). (4) The prose itself can still be wrong, so the release gate measures it: the judge checks every claim of 40 answers against the cited sections, and G1 must stay at 36/40 or more. There is no similarity threshold like 0.70: relevance is judged by the grader.',
    keyPoints: [
      kp('Grader + bounded rewords + refusal decided by the graph', 'grader', 'vérif', 'reword', 'reformul', 'refus'),
      kp('Writer only sees sections, NOT_COVERED', 'not_covered', 'sections', 'only', 'seulement'),
      kp('Sources built by code; Answer cannot exist without sources', 'code', 'source', 'raise', 'construct'),
      kp('Residual risk measured by judge/G1 gate', 'judge', 'juge', 'g1', 'gate', 'porte'),
    ],
    hints: [
      'Walk a question through the graph: at which points can it stop before any text is written, and who builds the source list?',
      'Invariant: guarantees are in code structure (graph routing, Answer constructor), and what code can’t guarantee (faithful prose) is measured.',
      'Similar case: a pharmacy robot only dispenses from the prescribed drawer, the label is printed by the system, and an inspector samples 40 orders before each release. Name SANAD’s drawer, label printer and inspector.',
    ],
    misconceptions: ['Saying refusal triggers when similarity falls below 0.70: there is no such threshold in the code.'],
    source: 'agent/nodes.py; agent/state.py; prompts/relevance-grader and answer-writer; evaluation/gate.py',
  },
};

// Keyed by the hallucination-minigame scenario id (HallucinationMinigame.tsx).
export const HALLUCINATION_COACH: Record<number, CoachExercise> = {
  1: {
    id: 'legacy-hallu-1',
    prompt:
      'Source (Article 184): "…la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine. La durée quotidienne de travail ne peut excéder 10 heures."\nCandidate answer: "The legal work week is 44 hours per week, and employees are entitled to 30 days of annual paid leave."\nWould SANAD’s evaluation judge give this answer a groundedness of 1.00? Explain claim by claim, and say what that means for G1.',
    modelAnswer:
      'No. The judge checks every claim against the cited section. Claim 1, "44 hours per week", is supported by Article 184. Claim 2, "30 days of annual paid leave", appears nowhere in the section: it is an extrapolation from outside knowledge, so the answer is not fully grounded and scores below 1.00. G1 only counts answers scoring exactly 1.00, so this answer would count as a G1 failure, even though its first half is correct. One unsupported claim is enough.',
    keyPoints: [
      kp('44 h supported', '44'),
      kp('30 days leave not in the source (unsupported)', '30', 'not in', 'pas dans', 'unsupported', 'non appuy', 'extrapol'),
      kp('Below 1.00 → fails G1 (one bad claim is enough)', 'g1', '1.00', '1,00', 'fail', 'échec', 'not grounded', 'non fondé'),
    ],
    hints: [
      'Split the answer into separate claims. For each one, can you point to words in the source that say it?',
      'Invariant: groundedness = every claim is supported by the cited sections; G1 counts only a perfect 1.00.',
      'Similar case: a witness says "the car was red and was going 120 km/h", but the camera only shows the colour. Is the whole statement verified?',
    ],
    source: 'evaluation/scoring.py (groundedness); evaluation/gate.py (G1 counts 1.00 only)',
  },
  2: {
    id: 'legacy-hallu-2',
    prompt:
      'Source (Article 14): "La période d’essai pour les cadres et assimilés est fixée à trois mois renouvelable une fois…"\nCandidate: "For cadres, the probation period is 3 months renewable once, so 6 months maximum (Article 14)."\nIs "6 months maximum" a supported claim or an extrapolation? How strict should the judge be, and how does the answer-writer prompt handle this kind of arithmetic?',
    modelAnswer:
      'It is a direct consequence of the text, not an outside fact. "Three months renewable once" means at most 3 + 3 = 6 months, so a careful judge can accept it as supported: the claim follows from the section alone, with no outside knowledge. The line to watch is between inference from the passage (acceptable) and knowledge the passage doesn’t contain (not acceptable, like the "30 days of leave"). The answer-writer prompt tells the model to copy figures, durations and article numbers exactly as the section writes them. So the safest SANAD answer states "trois mois, renouvelable une fois (Article 14)" and, if it adds the total, keeps the section’s own figures visible, so the reader can check the arithmetic.',
    keyPoints: [
      kp('6 months follows from 3 + 3 (inference from the text)', '3 + 3', '3+3', 'follows', 'découle', 'inference', 'déduit', 'consequence'),
      kp('Distinguish inference from outside knowledge', 'outside', 'extérieur', 'extern', 'not in', 'pas dans'),
      kp('Writer prompt: copy figures exactly', 'exact', 'copy', 'copier', 'figures', 'chiffres'),
    ],
    hints: [
      'Can you get "6 months" using ONLY the words in the source, with no other knowledge?',
      'Rule of thumb: a claim that follows from the passage alone is grounded; one that needs outside knowledge is not.',
      'Similar case: a receipt says "2 items at 5 dh". Is "total 10 dh" a new fact or a consequence of the receipt?',
    ],
    source: 'prompts/answer-writer/PROMPT.md ("Copy figures … EXACTLY"); prompts/eval-judge/PROMPT.md',
  },
};
