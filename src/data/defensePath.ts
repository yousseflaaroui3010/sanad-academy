// The Defense Path: SANAD taught from the general to the specific, in the order a
// beginner needs it, mapped to the defense slides. Every fact here was checked
// against the RAG_project_ENSA code (file names cited), the thesis report
// (printed page numbers, "p.") and the release files in docs/evals/.
// Gates hold only the question shown on the page. Their hidden model answers live on the
// server (coach/pathExercises.js) and are graded through POST /api/coach/grade.

export interface PathGate {
  id: string;
  prompt: string;
  source?: string;
}

export type ClaimLabel = 'Invariant' | 'Rule of thumb' | 'Convention';

export interface PathNode {
  id: string;
  number: number;
  stage: number;
  title: string;
  titleFr: string;
  slides: number[];
  oneLiner: string;
  needs: string;
  explain: string;
  diagram?: string;
  diagramTitle?: string;
  diagramType?: 'sequence' | 'mindmap' | 'flowchart' | 'class' | 'er' | 'state' | 'architecture';
  example: { title: string; steps: string[] };
  claims: { label: ClaimLabel; text: string }[];
  myth: { myth: string; truth: string };
  iceberg: [string, string];
  code: { file: string; what: string }[];
  sayItFr: string;
  gates: PathGate[];
  // Beginner layer: every technical word explained before it is used.
  glossary?: { term: string; plain: string; example: string }[];
  story?: string;
}

export interface PathStage {
  id: number;
  title: string;
  titleFr: string;
  needs: string;
  invariant: string;
  canDo: string;
}

export const PATH_STAGES: PathStage[] = [
  {
    id: 1,
    title: 'Stage 1 · The big picture',
    titleFr: 'Étape 1 · La vue d’ensemble',
    needs: 'Nothing. Start here.',
    invariant: 'A language model writes plausible text; it does not look facts up. Anything it says must be tied to a document you can open.',
    canDo: 'Explain in two minutes what SANAD is, why it exists, what it promised in numbers, and draw its architecture from memory.',
  },
  {
    id: 2,
    title: 'Stage 2 · Journey 1: from a document to the index',
    titleFr: 'Étape 2 · Trajet 1 : du document à l’index',
    needs: 'Stage 1 (what RAG is, the four stores).',
    invariant: 'Search small, read big: search in 500-character passages, answer from the whole section they came from.',
    canDo: 'Follow one PDF from the folder to the search index, and explain every choice on the way (fingerprint, conversion, chunks, vectors, keywords, figures).',
  },
  {
    id: 3,
    title: 'Stage 3 · Journey 2: from a question to an answer or a refusal',
    titleFr: 'Étape 3 · Trajet 2 : de la question à la réponse ou au refus',
    needs: 'Stage 2 (what is in the index and how search works).',
    invariant: 'No source, no answer: the code cannot build an answer without sources, and the refusal is decided by the graph, not negotiated by a model.',
    canDo: 'Walk any question through the nine nodes of the agent graph and predict whether it ends in an answer, a clarifying question or a refusal.',
  },
  {
    id: 4,
    title: 'Stage 4 · The proof: evaluation, results, limits',
    titleFr: 'Étape 4 · La preuve : évaluation, résultats, limites',
    needs: 'Stages 1–3 (the promises and the two journeys).',
    invariant: 'A number counts only if it comes from a kept file and the questions were frozen before tuning.',
    canDo: 'Present every number on slides 14–18 precisely, say what each one does NOT prove, and defend question 33.',
  },
  {
    id: 5,
    title: 'Stage 5 · Around the core: security, teamwork, deployment, code',
    titleFr: 'Étape 5 · Autour du cœur : sécurité, équipe, déploiement, code',
    needs: 'Stages 1–4.',
    invariant: 'Every guarantee lives in code or configuration that a test or a measurement checks.',
    canDo: 'Answer annex questions (security, sprints, Railway, files and classes) and survive a mixed mock jury.',
  },
];

export const TERRITORY_MINDMAP = `mindmap
  root((SANAD))
    Why
      LLMs invent
      NY 2023 six fake rulings
      Air Canada 2024
      Answer is in team documents
    Promise
      G1 36 of 40 grounded
      G2 20 of 20 refused
      G3 every answer sourced
      Gate blocks a release
    Journey 1 document to index
      SHA-256 fingerprint
      Convert to text
      Parents 2000 to 4000 chars
      Children 500 chars
      E5 vectors plus BM25
      Figures
    Journey 2 question to answer
      Summarize and plan
      Hybrid search RRF top 5
      Grade then reword max 2
      Load full sections
      Answer with sources
      Or refuse
    Proof
      60 frozen questions
      LLM judge
      36 to 39 of 40
      100 of 100 refusals
      Limits and question 33
    Around
      Keycloak and owner checks
      8 sprints 146 PRs
      Docker and Railway
      Code map`;


export const DEFENSE_PATH: PathNode[] = [
  // ───────────────────────────── STAGE 1 ─────────────────────────────
  {
    id: 'n01',
    number: 1,
    stage: 1,
    title: 'The problem: fluent is not true',
    titleFr: 'Le problème : fluide n’est pas vrai',
    slides: [1, 3],
    oneLiner: 'Why a chat assistant that answers without a source is dangerous, and where the real answer lives.',
    needs: 'Nothing.',
    glossary: [
      { term: "AI model / LLM (Large Language Model)", plain: "A computer program that has read a huge amount of text and learned to write like a human. ChatGPT and Gemini are LLMs. \"Large\" = it learned from billions of sentences.", example: "You type \"Le congé de maternité dure…\" and it continues \"…14 semaines\" because it has seen that pattern many times." },
      { term: "Predict / prediction", plain: "Guessing what comes next. An LLM writes one word at a time by guessing the most likely next word.", example: "Your phone keyboard suggests \"demain\" after you type \"à\". An LLM does the same, but much better and for whole paragraphs." },
      { term: "Plausible", plain: "Sounds right. It does NOT mean it is right.", example: "\"The trial period for a manager is 6 months\" sounds plausible. In Morocco it is 3 months (renewable once)." },
      { term: "Hallucination", plain: "When an AI says something false but in a confident, convincing way. It is not lying on purpose; it is guessing and the guess is wrong.", example: "ChatGPT invented 6 court decisions with names and dates. None existed." },
      { term: "Source / citation", plain: "The exact place where a fact comes from: which document, which article, which page. It lets you check.", example: "\"Article 14 of the Code du travail, page 12\" is a source. \"I read it somewhere\" is not." },
      { term: "Corpus / documents", plain: "The collection of documents the assistant is allowed to use. For SANAD's demo: the Moroccan Code du travail and a few HR texts.", example: "Think of it as the shelf of books you're allowed to open during an exam." },
    ],
    story: "Imagine you hire a very smooth talker as your assistant. He has read thousands of books, but he never opens a book when you ask him something. He answers from memory, always confidently, even when his memory is wrong. Most of the time he is right. Sometimes he invents, and you can't tell the difference because he sounds just as sure.\n\nThat is ChatGPT without sources.\n\nNow imagine a second assistant. Before answering, she goes to YOUR bookshelf, opens the right book, reads the right page, and answers while pointing at the line: \"It's here, Article 14.\" If the answer isn't on your shelf, she says: \"I didn't find it in your documents.\" She never guesses.\n\nThat second assistant is SANAD.",
    explain: `An AI like ChatGPT or Gemini is called an LLM (Large Language Model). It learned by reading billions of sentences. When you ask it something, it doesn't search anything. It writes the answer word by word, each time choosing the word that "usually comes next". That's all it does: predict the next word.

Most of the time, the most likely words are also true. But not always. When the model doesn't really know, it still writes something that sounds right. This is called a hallucination: a confident answer that is false.

Three real examples (slide 3):
• New York, 2023: lawyers used ChatGPT to prepare a court file. It invented 6 court decisions. The lawyers gave them to the judge, the decisions didn't exist, and the lawyers were punished.
• Air Canada, 2024: the airline's website chatbot invented a refund rule. A customer believed it. A tribunal said "your chatbot said it, so you must pay".
• Stanford, 2024: researchers tested paid legal AI tools. About 1 answer in 6 was wrong or pointed to the wrong source.

The problem for a company: the right answer already exists in its own documents. For example, the Moroccan Code du travail has 589 articles in 7 books. An HR employee who wants to know "how long is the trial period for a manager?" may spend an hour searching.

SANAD's idea in one sentence (slide 1): an assistant that answers ONLY from your documents, shows WHERE it found the answer, and says "I don't know" when the answer isn't there.`,
    example: {
      title: 'Why the trial-period question is risky with a plain chatbot',
      steps: [
        'An HR officer asks a general chatbot: "Quelle est la durée de la période d’essai d’un cadre ?"',
        'The model has seen many labour laws (French, Moroccan, Belgian…). It writes the most plausible number it has seen.',
        'The answer sounds precise but names no article. The officer cannot tell if it is the Moroccan rule, the French one, or invented.',
        'With SANAD, the same question returns the answer plus a numbered source that opens the exact passage in the Code du travail PDF, or an honest "not in the documents".',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'An LLM generates the most plausible text; plausibility is not verification.' },
      { label: 'Invariant', text: 'An answer the reader cannot check against a source is only as trustworthy as the model’s guess.' },
      { label: 'Convention', text: 'The word "hallucination" is the field’s name for a fluent, unsupported answer. It is a metaphor, not a technical mechanism.' },
    ],
    myth: {
      myth: 'Hallucinations happen because the model is badly trained; a better model will stop them.',
      truth: 'Better models hallucinate less, but the mechanism (predicting plausible text) stays the same. Stanford measured errors even in paid tools that already use retrieval. That is why SANAD checks and cites in code instead of trusting the model.',
    },
    iceberg: [
      'Hallucination rates depend on the task and how you measure them; there is no single "rate" for a model.',
      'Retrieval reduces hallucination but a model can still misread or over-generalise a correct passage (that is what the evaluation judge checks).',
    ],
    code: [
      { file: 'prompts/answer-writer/PROMPT.md', what: 'the writer is told: answer ONLY from the sections, or reply NOT_COVERED' },
      { file: 'agent/state.py', what: 'Answer.__post_init__ raises if an answer has no sources' },
    ],
    sayItFr:
      'Les assistants comme ChatGPT écrivent bien, mais rien ne garantit que c’est vrai : ils prédisent un texte plausible, ils ne vérifient pas. Trois cas réels le montrent : New York en 2023, Air Canada en 2024, et Stanford qui mesure une réponse sur six fausse ou mal sourcée. Or la réponse existe déjà dans les documents de l’équipe. Sanad répond à partir de ces documents, montre la source, et refuse quand il ne sait pas.',
    gates: [
      { id: "g01-1", prompt: "A colleague says: \"Just paste the Code du travail PDF into ChatGPT, it will answer HR questions fine.\" Using what you know about how an LLM produces text, explain the precise risk, and name the two behaviours SANAD adds to remove it.", source: "Slides 1 and 3; report p.16 and p.30–31; prompts/answer-writer/PROMPT.md" },
    ],
  },
  {
    id: 'n02',
    number: 2,
    stage: 1,
    title: 'What RAG is, and where SANAD stands',
    titleFr: 'Ce qu’est le RAG, et où se place Sanad',
    slides: [5],
    oneLiner: 'Retrieval-Augmented Generation: search the documents first, then let the model write only from what was found.',
    needs: 'Node 1 (LLMs predict plausible text).',
    glossary: [
      { term: "RAG (Retrieval-Augmented Generation)", plain: "A method in 2 steps. Retrieval = search the documents first. Generation = then let the AI write the answer using what was found. \"Augmented\" = the AI gets extra help (the pages).", example: "An open-book exam: first you find the right page in the book, then you write your answer from that page." },
      { term: "Retrieval / search", plain: "Finding the pieces of text that are most related to the question.", example: "Question: \"congé de maternité\" → the search brings back the 5 paragraphs of the Code that talk about maternity leave." },
      { term: "Index", plain: "A ready-made list that makes searching fast, prepared in advance. Like the index at the end of a book.", example: "Instead of reading 200 pages for every question, SANAD looks in its index and finds the right paragraphs in a fraction of a second." },
      { term: "Passage / chunk", plain: "A small piece of a document (in SANAD: 500 characters, about 5–8 lines).", example: "One paragraph of Article 14 is one passage." },
      { term: "Vector", plain: "A list of numbers that represents the MEANING of a text. Texts with similar meaning get similar numbers. SANAD uses 768 numbers per passage.", example: "\"licenciement\" and \"renvoyer un salarié\" get very close vectors because they mean almost the same thing." },
      { term: "Local vs cloud", plain: "Local = runs on your own computer, nothing is sent outside. Cloud = uses a company's servers on the internet (e.g. Google's Gemini).", example: "Local: a calculator on your desk. Cloud: calling a friend and asking them to do the calculation." },
      { term: "NotebookLM / AnythingLLM / PrivateGPT", plain: "Other existing tools that also answer from your documents. NotebookLM is Google's (cloud). AnythingLLM and PrivateGPT can run on your computer.", example: "These are SANAD's \"competitors\" on slide 5." },
    ],
    story: "Think of a very good student taking an open-book exam.\n\nBefore the exam (only once): the librarian prepares the book. She cuts it into small labeled cards, one idea per card, and files them in a box so she can find any card instantly. That filing box is the INDEX.\n\nDuring the exam (for every question): the student asks the librarian \"which cards talk about maternity leave?\". The librarian brings back the 5 best cards (that's RETRIEVAL). The student writes the answer using only those cards (that's GENERATION).\n\nIf the librarian brings the wrong cards, the student writes a bad answer. That's why SANAD adds a checker who looks at the cards before the student writes (you'll see it in node 10).",
    explain: `RAG = Retrieval-Augmented Generation. In simple words: SEARCH first, then WRITE.

It happens in two moments:

1. ONCE, when you add a document (this is called "indexing"):
• SANAD turns the PDF into plain text.
• It cuts the text into small pieces called passages (500 characters each).
• For each passage it computes a "vector": a list of 768 numbers that represents what the passage MEANS. It also records the exact WORDS in the passage.
• It stores all of this in an index, a filing box ready for fast searching.

2. EVERY TIME someone asks a question:
• SANAD searches the index for the 5 passages closest to the question.
• It gives those passages to the AI with a strict rule: "answer only from these".
• The AI writes the answer, and SANAD attaches the sources.

Why it helps: the AI now has the right text in front of it instead of guessing from memory.
Why it's not perfect: if the search brings the wrong passages, or the AI misreads them, the answer can still be wrong. That's why SANAD adds a checker, a refusal, and an exam with 60 questions (later nodes).

Where SANAD stands vs other tools (slide 5):
• Running on your own computer is NOT unique. AnythingLLM and PrivateGPT also do it.
• NotebookLM (Google) is better at reading pictures and accepts more documents.
• What is special about SANAD is the COMBINATION: it can run 100% locally, it measures and publishes how often it correctly refuses (20 out of 20 at every version), and it has a "gate" that blocks any new version whose scores drop. Plus French and Arabic screens.
• Be honest in the defense: "20 out of 20" is on OUR own 60 questions. It is not a race against the other tools.`,
    diagram: `flowchart LR
  subgraph ONCE["Once per document"]
    D["Document"] --> C["Convert to text"] --> P["Cut into passages"] --> I[("Index: vectors + keywords")]
  end
  subgraph EVERY["At every question"]
    Q["Question"] --> S["Search the index"] --> R["Relevant passages"] --> W["LLM writes from passages only"] --> A["Answer + sources"]
  end
  I -.-> S`,
    diagramTitle: 'The two phases of RAG',
    diagramType: 'flowchart',
    example: {
      title: 'One question through plain RAG',
      steps: [
        'Question: "Combien de jours de congé de maternité ?"',
        'The search engine returns the 5 passages closest to the question.',
        'The prompt given to the LLM contains the question plus those 5 passages, and the rule "answer only from these".',
        'The model writes "14 semaines…" and names the article; the application attaches the sources it retrieved.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'In RAG the model can only be as right as the passages it receives: bad retrieval means a bad or refused answer.' },
      { label: 'Rule of thumb', text: 'RAG reduces hallucinations a lot but never to zero; you still have to measure.' },
      { label: 'Convention', text: 'The name "RAG" comes from Lewis et al. (2020). "Naive / advanced / modular RAG" is a classification by Gao et al., not a standard.' },
    ],
    myth: {
      myth: 'If a system uses RAG, its answers are correct.',
      truth: 'Stanford measured paid legal RAG tools still wrong or mis-sourced about 1 time in 6. RAG gives the model the right material; it does not force it to use it correctly. SANAD adds grading, refusal and a judge.',
    },
    iceberg: [
      'Agentic RAG (SANAD’s kind) lets the system decide to search again or to stop; papers like Self-RAG and CRAG explore this.',
      'Multimodal RAG (images, tables) is harder: text search cannot "see" pictures. SANAD’s figure work touches this.',
    ],
    code: [
      { file: 'sync.py', what: 'phase 1: runs the indexing of a workspace folder' },
      { file: 'agent/graph.py', what: 'phase 2: the question-answering graph' },
    ],
    sayItFr:
      'Le RAG, c’est un examen à livre ouvert : on cherche d’abord les passages utiles dans les documents, puis le modèle rédige seulement à partir de ces passages. Tourner en local n’est pas propre à Sanad. Ce qui le distingue, c’est la combinaison : un mode entièrement local possible, un refus mesuré et publié, et une porte qui bloque toute version sous le seuil.',
    gates: [
      { id: "g02-1", prompt: "Sort these six steps into \"done once per document\" or \"done at every question\", and say in one line why the split matters for speed:\n(a) convert the PDF to text (b) compute passage vectors (c) compute the question vector (d) store vectors in Qdrant (e) ask the LLM whether passages answer the question (f) write the answer.", source: "Slides 5 and 9; report p.32 and Table 6.4" },
      { id: "g02-2", prompt: "A jury member says: \"NotebookLM and AnythingLLM already do this. What exactly is your contribution?\" Answer in 4–5 sentences, and include one thing the competitors do better.", source: "Slide 5; report Table 2.1 and p.37" },
    ],
  },
  {
    id: 'n03',
    number: 3,
    stage: 1,
    title: 'The three promises and the release gate',
    titleFr: 'Les trois promesses et la porte de publication',
    slides: [4, 19],
    oneLiner: 'G1, G2, G3: three numbered promises fixed before coding, and a script that blocks a release that misses them.',
    needs: 'Nodes 1–2.',
    glossary: [
      { term: "Goal / promise (G1, G2, G3)", plain: "A target written as a number, fixed BEFORE writing code. G = Goal.", example: "\"At least 36 correct answers out of 40\" is a measurable goal. \"Be a good assistant\" is not." },
      { term: "Grounded answer", plain: "An answer where every sentence is supported by the passages it cites. Nothing added from outside.", example: "Source says \"3 months renewable once\". Answer \"3 months, renewable once\" = grounded. Answer \"3 months, and you get 30 days of leave\" = NOT grounded (leave is not in the source)." },
      { term: "In-scope / out-of-scope question", plain: "In-scope = the answer IS in the documents. Out-of-scope = the answer is NOT in the documents (SANAD must refuse).", example: "\"Durée de la période d'essai ?\" is in-scope. \"Règles du télétravail ?\" is out-of-scope (the Code de 2004 doesn't talk about remote work)." },
      { term: "Release / version", plain: "A finished copy of the software given to users, with a number: 1.0.0, 2.0.0, 3.1.0…", example: "Like a phone app update: version 3.1.0 replaced 3.0.0." },
      { term: "Release gate", plain: "An automatic check that runs before each version. If one number is below its target, the version is blocked.", example: "Like a factory quality control: if the product fails the test, it doesn't leave the factory." },
      { term: "Threshold", plain: "The minimum number you must reach.", example: "G1 threshold = 90% of 40 = 36 answers." },
      { term: "Blocking vs non-blocking", plain: "Blocking = failing it stops the release. Non-blocking = we measure and report it, but the release can still go out.", example: "Refusals (G2) are blocking. Speed (G4) is non-blocking." },
      { term: "Median", plain: "The middle value when you sort the numbers. Half the answers are faster, half are slower.", example: "Times 5 s, 7 s, 8 s, 9 s, 30 s → median = 8 s (the average would be 11.8 s because of the slow 30 s)." },
    ],
    story: "Imagine a driving school that promises before the first lesson: \"Our students will pass 36 out of 40 road questions, will stop at ALL 20 red lights, and will always use their mirrors.\"\n\nBefore a student gets the license, an examiner checks the three promises. Miss one red light out of 20? No license, even if everything else was perfect. That is SANAD's release gate.\n\nThe school also measures how fast students park, but a slow parking doesn't cancel the license. That's the non-blocking speed goal.",
    explain: `SANAD's team didn't promise "a good assistant" (you can't measure that). Before coding, they wrote three promises with numbers:

• G1: answers based on the documents. Out of 40 questions whose answer IS in the documents, at least 36 (90%) must be "grounded": every sentence supported by the cited passages.
• G2: honest refusal. Out of 20 questions whose answer is NOT in the documents, SANAD must refuse ALL 20. Not 19. All 20.
• G3: always show the source. 100% of answers must display the file and the section they come from.

These three are BLOCKING. Before each new version, a script checks them automatically (files evaluation/gate.py and scripts/release_gate.py). If one number is below target, the version doesn't go out. Slide 4: "Si un seuil n'est pas atteint, la version ne sort pas."

Two speed goals are measured but NOT blocking:
• G4: a typical answer in 20 seconds or less (median).
• G5: 200 pages ready to search in 10 minutes or less after adding them.

A trap question about G3: it's almost automatically 100%. The code physically refuses to create an answer without sources (it raises an error). So why measure it? Because code can be changed by mistake later. Measuring it at every version catches that day. And careful: G3 only checks that a source is ATTACHED. Whether the answer really matches the source is G1's job.`,
    diagram: `flowchart TD
  E["Run the 60 frozen questions"] --> R["Evaluation report"]
  R --> G1{"G1: grounded >= 36 of 40?"}
  G1 -- no --> X["Release blocked"]
  G1 -- yes --> G2{"G2: 20 of 20 refused?"}
  G2 -- no --> X
  G2 -- yes --> G3{"G3: every answer has sources?"}
  G3 -- no --> X
  G3 -- yes --> OK["Version can ship"]`,
    diagramTitle: 'The release gate',
    diagramType: 'flowchart',
    example: {
      title: 'Grading a hypothetical version',
      steps: [
        'Report: 37 of 40 grounded, 20 of 20 refused, 37 of 37 answers with sources, median 11 s.',
        'G1: 37/40 = 92.5% ≥ 90% → pass.',
        'G2: 20/20 → pass. G3: 37/37 → pass.',
        'Speed is not checked by the gate (G4 is non-blocking) → the version ships.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'G1–G3 block a release; G4–G5 are reported but do not block.' },
      { label: 'Convention', text: 'The thresholds (90%, 20/20, 100%) are the team’s choices, written before coding; they are not a standard.' },
      { label: 'Rule of thumb', text: 'Fix the target before you measure, or you will be tempted to move it.' },
    ],
    myth: {
      myth: 'G3 at 100% proves SANAD never cites wrongly.',
      truth: 'G3 only checks that a source is attached. Whether the answer is actually supported by that source is G1’s job (the judge).',
    },
    iceberg: [
      'A 90% threshold on 40 questions means one question is worth 2.5 points; small samples make thresholds coarse.',
      'Over-refusal (refusing answerable questions) is not a separate metric; it only shows up as a G1 miss.',
    ],
    code: [
      { file: 'evaluation/gate.py', what: 'applies G1 (threshold from config), G2 (all refusals), G3 (sources)' },
      { file: 'scripts/release_gate.py', what: 'the script that fails a release' },
      { file: 'config.py', what: 'eval_groundedness_threshold = 0.90' },
    ],
    sayItFr:
      'Nous n’avons pas promis « un bon assistant ». Nous avons écrit trois promesses chiffrées avant de coder : au moins 36 réponses fondées sur 40, 20 refus sur 20 questions hors documents, et 100 % des réponses avec leur source. Un script applique ces seuils avant chaque version : si un seuil n’est pas atteint, la version ne sort pas. La vitesse est mesurée, mais elle ne bloque pas.',
    gates: [
      { id: "g03-1", prompt: "Two candidate versions:\n• Version A: 35/40 grounded, 20/20 refused, 35/35 sourced, median 7 s.\n• Version B: 39/40 grounded, 19/20 refused, 39/39 sourced, median 25 s.\nDoes each one ship? Show the rule you apply to each number.", source: "Slide 4; report Table 1.3 p.21; evaluation/gate.py" },
      { id: "g03-2", prompt: "A jury member: \"G3 at 100% is trivial, your code forces it. Why measure it at all?\" Answer in 3–4 sentences.", source: "agent/state.py (Answer.__post_init__); report Table 4.4 p.56 and p.81" },
    ],
  },
  {
    id: 'n04',
    number: 4,
    stage: 1,
    title: 'The whole system in one picture',
    titleFr: 'Tout le système sur une image',
    slides: [8],
    oneLiner: 'One Python application, local storage, and a single outbound call: the language model.',
    needs: 'Nodes 1–3.',
    glossary: [
      { term: "Application / program", plain: "The software itself. SANAD is ONE program written in the Python language.", example: "Like one restaurant building that has the kitchen, the dining room and the cashier inside." },
      { term: "Server / web page", plain: "SANAD runs as a small website on the computer. You open it in your browser (Chrome) at an address like 127.0.0.1:8000. 127.0.0.1 means \"this same computer\".", example: "Like a restaurant that only serves people already inside the building." },
      { term: "FastAPI / Jinja", plain: "FastAPI = the Python tool that receives requests from the browser and answers them. Jinja = the tool that builds the HTML pages (the screens) with the data inside.", example: "FastAPI is the waiter taking orders; Jinja is the person plating the dish before it goes to the table." },
      { term: "Database / SQLite", plain: "A database stores organised information in tables (like Excel sheets that are linked). SQLite is a small database that lives in ONE file (data/sanad.db). No installation needed.", example: "The table \"workspace\" lists the workspaces; the table \"document\" lists the files in each workspace." },
      { term: "Qdrant (vector index)", plain: "A special database made to search by meaning, using vectors. SANAD uses it \"embedded\": it runs inside the same program, no separate server.", example: "Like a library catalogue that finds \"books about firing employees\" even if the title says \"licenciement\"." },
      { term: "Workspace (espace)", plain: "A folder of documents that belongs to one team, with its own separate index.", example: "\"RH\" workspace with the Code du travail; \"Manuels\" workspace with technical manuals. A question in RH never searches the manuals." },
      { term: "Gemini / Ollama / Mistral", plain: "Gemini = Google's AI, used over the internet (cloud mode). Ollama = a free tool that runs an AI on your own computer; Mistral = one AI model you can run with Ollama (local mode).", example: "Cloud mode: you phone an expert abroad. Local mode: the expert lives in your office." },
      { term: "Embedding model (E5, BM25)", plain: "The small models that turn text into vectors (E5) and into word lists (BM25). They ALWAYS run on your computer, in both modes.", example: "Even in cloud mode, the filing of your documents is done at home." },
    ],
    story: "Picture SANAD as a small office building with one outside phone line.\n\nInside the building (your computer): the reception desk (the screens), the archive room (the database SQLite), the smart catalogue (Qdrant), the shelves with full chapters (the parent sections), and the photo cabinet (the figures). Everything about your documents stays inside.\n\nThe only thing that ever goes out is a phone call to the expert who writes the answers: Gemini, far away on the internet (cloud mode). OR, in local mode, you don't phone anyone: the expert Mistral sits in an office inside the building, and nothing leaves at all.\n\nHonest detail: all the measurements in the thesis were done with the phone call to Gemini.",
    explain: `Slide 8 in simple words.

1. ONE program. SANAD is a single Python program. Inside it: the screens you see in the browser, the "Sync" engine that reads your documents, the "agent" that answers questions, and the evaluation (the exam). You start it with one command.

2. Everything is stored on the computer, in a folder called data/:
• data/sanad.db: the SQLite database. It remembers the workspaces, the documents, each Sync, the exam results, the users and the conversation history.
• data/qdrant/: the search index (Qdrant). It holds the small passages and their vectors. There is ONE separate index per workspace.
• data/parents/: the full sections of text (the "parents"), saved as files.
• data/figures/: the pictures taken out of the PDFs.
(The slide says "4 stockages". Learn the list, not the number: the report text says 3 and one table lists 5.)

3. ONE thing can leave the computer: the call to the AI that writes the answer.
• Cloud mode: the AI is Gemini (Google). The question and the passages found are sent to Google.
• Local mode: the AI is Mistral running with Ollama on the same computer. Nothing leaves.
The tools that turn text into vectors (E5, BM25) always run on the computer.

The key choice: Qdrant runs INSIDE the program ("embedded"), not as a separate server you would need to install. That's why one person can start SANAD with one command. The price: only one program at a time can open the index, and SQLite doesn't like many people writing at the same time. So SANAD suits one small team, not a company of thousands.

Honesty point: every number in the thesis was measured in cloud mode (with Gemini). Local mode was never measured. Say it before the jury does.`,
    diagram: `flowchart TB
  U["Browser"] --> APP
  subgraph APP["One Python program"]
    UI["Screens FastAPI + Jinja"]
    SY["Sync engine"]
    AG["Agent LangGraph"]
    EV["Evaluation"]
    EMB["E5 + BM25 embeddings, local"]
  end
  subgraph DATA["data/ folder, local"]
    DB[("SQLite sanad.db")]
    QD[("Qdrant embedded, 1 collection per workspace")]
    PA[("Parent sections JSON")]
    FI[("Figures PNG + JSON")]
  end
  APP --> DATA
  AG -- "only outbound call" --> LLM{"LLM: Gemini cloud OR Ollama local"}`,
    diagramTitle: 'Slide 8 as a diagram',
    diagramType: 'flowchart',
    example: {
      title: 'Where each piece of one question goes',
      steps: [
        'You type a question in the browser; the FastAPI app receives it.',
        'E5 turns it into a vector on the local CPU; Qdrant (inside the same process) searches this workspace’s collection.',
        'The matching parent sections are read from data/parents/.',
        'Question + passages are sent to the LLM (Gemini in cloud mode). This is the only thing that leaves.',
        'The answer and its trace are saved to SQLite (conversation history, kept 30 days).',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Embeddings are computed locally; only LLM calls may leave the machine, and in local mode none do.' },
      { label: 'Invariant', text: 'One Qdrant collection per workspace: a search in one workspace cannot return another workspace’s passages.' },
      { label: 'Rule of thumb', text: 'Embedded databases (SQLite, embedded Qdrant) are ideal for one small team; switch to servers (PostgreSQL, Qdrant server) to scale.' },
    ],
    myth: {
      myth: '"RAG local" means nothing ever leaves the machine, including in the demo.',
      truth: 'Only in local mode (Ollama). The demo and all measurements use cloud mode: the question and the retrieved passages go to Gemini, and the online deployment runs on Railway. Say it before the jury does.',
    },
    iceberg: [
      'Qdrant embedded mode locks its storage folder to one process; that is why SANAD serialises access to it.',
      'Personal data under Moroccan law 09-08 would need a data-protection review before using cloud mode on non-public documents (report p.43).',
    ],
    code: [
      { file: 'app.py', what: 'the FastAPI application: screens, API, startup' },
      { file: 'config.py', what: 'model_mode "cloud"/"local", chat_model_cloud "gemini-3.6-flash", chat_model_local "mistral", all data paths' },
      { file: 'vector_store.py', what: 'open_store(): embedded Qdrant, collection_name(workspace_id)' },
      { file: 'db/schema.sql', what: 'the SQLite tables' },
    ],
    sayItFr:
      'Sanad est une seule application Python, avec des stockages locaux : la base SQLite, l’index Qdrant intégré avec une collection par espace, les sections et les images. Le seul appel qui peut sortir, c’est le modèle de langage : Gemini en mode cloud, ou Ollama en local, et là rien ne sort. Nos mesures ont été faites en mode cloud ; le mode local n’a pas encore été mesuré.',
    gates: [
      { id: "g04-1", prompt: "In CLOUD mode, a user asks one question. List exactly what leaves the machine, and name three things that never leave. Then say what changes in LOCAL mode.", source: "Slide 8; report Table 3.7 p.43 and Table 4.7 p.60; config.py" },
      { id: "g04-2", prompt: "Why embedded Qdrant + SQLite instead of a Qdrant server + PostgreSQL? Give two benefits and the cost you accepted, as you would to the jury.", source: "Slide 8; report Table 4.9 p.61" },
    ],
  },

  // ───────────────────────────── STAGE 2 ─────────────────────────────
  {
    id: 'n05',
    number: 5,
    stage: 2,
    title: 'Sync: fingerprints, conversion, and safe writes',
    titleFr: 'La synchronisation : empreintes, conversion, écritures sûres',
    slides: [9],
    oneLiner: 'How SANAD decides what to (re)read, turns files into text, and stores them so a crash can never create a broken citation.',
    needs: 'Node 4 (the local stores).',
    glossary: [
      { term: "Sync (synchronisation)", plain: "The button that tells SANAD: \"look at the folder again and update the index\". It reads new files, updates changed ones, removes deleted ones.", example: "You add a new PDF to the RH folder, click Sync, and now questions can find it." },
      { term: "Hash / fingerprint (SHA-256)", plain: "A short code (64 characters) calculated from the exact content of a file. Same file = same code. Change one letter = completely different code. SHA-256 is the name of the calculation method.", example: "Like a fingerprint for a file: if the fingerprint didn't change, the file didn't change, so no need to read it again." },
      { term: "Conversion", plain: "Turning a PDF, Word or PowerPoint file into plain text the computer can cut and search.", example: "A PDF page with a title and paragraphs becomes text with \"# Title\" and the paragraphs below." },
      { term: "OCR (Optical Character Recognition)", plain: "Reading text from an IMAGE of text, like a scanned page. Tesseract is the free OCR tool SANAD can use (optional).", example: "A photocopy of a contract scanned as a picture: OCR turns the picture back into letters." },
      { term: "Report row (sync report)", plain: "After each Sync, one line per file saying what happened: added, changed, unchanged, removed, failed, skipped.", example: "code-travail.pdf: unchanged · reglement.docx: changed · photo.jpg: skipped." },
      { term: "Crash", plain: "When the program stops suddenly (power cut, error).", example: "The laptop battery dies in the middle of a Sync." },
      { term: "Orphan file", plain: "A file that exists but that nothing points to. Harmless: nobody can reach it by searching.", example: "A book on the shelf with no card in the catalogue: nobody will ever be sent to it." },
      { term: "Dangling / broken citation", plain: "A source that points to something that doesn't exist.", example: "A catalogue card says \"shelf 12\" but shelf 12 is empty. The worst failure for SANAD." },
    ],
    story: "Think of a librarian who updates her library every morning.\n\nShe has a list with the fingerprint of every book from yesterday. For each book on the shelf today, she takes its fingerprint again:\n• Same fingerprint → the book didn't change → she skips it (that's why an unchanged folder takes 0.09 s).\n• Different fingerprint → the book was edited → she FIRST throws away the old catalogue cards of that book, THEN makes new ones. Otherwise a reader could be sent to a sentence that no longer exists.\n• New book → she makes cards for it.\n• Book gone → she removes its cards.\n\nHer safety rule: she always puts the book on the shelf BEFORE she adds its card to the catalogue. If she's interrupted in between, the worst case is a book with no card (harmless). Never a card pointing to an empty shelf.",
    explain: `A workspace is a folder of documents for a team. The manager puts files in it and clicks Sync. Here's what SANAD does, step by step.

Step 1: fingerprints. For each file, SANAD calculates a SHA-256 fingerprint, a 64-character code that depends on every byte of the file. It compares it with the fingerprint saved last time. Each file gets a status: new, changed, unchanged, or removed. Unchanged files are skipped completely. That's why a second Sync of the same folder takes only 0.09 seconds.

Step 2: clean before re-reading. If a file changed, SANAD first DELETES everything it had stored for the old version, and only then reads the new version. Otherwise an old sentence could stay in the index and be shown as a source after the document was corrected.

Step 3: convert to text. The computer can only cut and search plain text:
• PDF → text with its titles kept (tool: pymupdf4llm).
• Scanned PDF (a picture of text) → OCR with Tesseract, if turned on.
• Word or PowerPoint → text (tool: markitdown), one section per slide.
• .txt and .md files are already text.

Step 4: write in a safe order. SANAD writes the full sections FIRST and the search index LAST. When deleting, it does the opposite: index first, sections after. So if the computer crashes in the middle, the worst case is a section file that nothing points to (harmless, cleaned at the next Sync). A search result pointing to nothing, a broken citation, can never happen.

Step 5: one line per file in the report. If one file fails (for example a damaged PDF), only that file fails. The others continue. If SANAD crashes during a Sync, the next start closes the unfinished Sync properly (file recovery.py).`,
    diagram: `flowchart TD
  F["File in workspace folder"] --> H["SHA-256 fingerprint"]
  H --> S{"Compare with last Sync"}
  S -- unchanged --> SK["Skip: 0.09 s for a whole folder"]
  S -- removed --> DEL1["Delete vectors, then parents"]
  S -- changed --> DEL2["Delete old data first"] --> CV
  S -- new --> CV["Convert to text"]
  CV --> CH["Parents and children"]
  CH --> WP["Write parents and figures FIRST"]
  WP --> WV["Write vectors LAST"]
  WV --> RP["One report row per file"]`,
    diagramTitle: 'What Sync does to each file',
    diagramType: 'flowchart',
    example: {
      title: 'Re-syncing after one edit',
      steps: [
        'The HR folder holds code-travail.pdf and reglement.docx. Both were synced yesterday.',
        'This morning the manager fixes a typo in reglement.docx and clicks Sync.',
        'code-travail.pdf: same SHA-256 → unchanged → skipped (no conversion, no embedding).',
        'reglement.docx: different SHA-256 → changed → its old vectors, then old parents are deleted; the new text is converted, chunked, parents written, vectors written.',
        'The report shows one row per file: "unchanged" and "changed".',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'A changed file’s old data is deleted before the new version is indexed: stale text is never cited.' },
      { label: 'Invariant', text: 'Write parents before vectors, delete vectors before parents: an interrupted write can leave an orphan file, never a dangling citation.' },
      { label: 'Rule of thumb', text: 'Use a content hash, not the file’s modification date, to detect change: copying a file changes its date but not its content.' },
    ],
    myth: {
      myth: 'Sync re-reads the whole folder every time.',
      truth: 'Only new or changed files (different SHA-256) are processed. An unchanged folder re-syncs in 0.09 s.',
    },
    iceberg: [
      'OCR on scanned pages is slow and approximate; it is optional and capped (ocr_max_pages 200).',
      'Folder watching (watcher.py, off by default) can trigger Sync automatically when files change.',
    ],
    code: [
      { file: 'change_detection.py', what: 'SHA-256 and the four statuses: new / changed / unchanged / removed' },
      { file: 'sync.py', what: 'the Sync engine: one report row per file, delete before re-index, parents-then-vectors order' },
      { file: 'conversion.py', what: 'the converters (pymupdf4llm, markitdown, OCR)' },
      { file: 'recovery.py', what: 'closes a Sync abandoned by a crash, at the next start' },
    ],
    sayItFr:
      'Quand on synchronise, Sanad calcule une empreinte SHA-256 de chaque fichier. Si elle n’a pas changé, il ne refait rien : 0,09 seconde pour un dossier inchangé. Un fichier modifié voit d’abord ses anciennes données supprimées, pour ne jamais citer un texte périmé. Et l’ordre d’écriture est pensé pour les pannes : les sections d’abord, les vecteurs ensuite. Une panne laisse au pire un fichier orphelin, jamais une citation vers le vide.',
    gates: [
      { id: "g05-1", prompt: "Yesterday you synced a folder. Today: A.pdf is untouched, B.docx was edited, C.pdf is new, and D.txt was deleted from the folder. Say what Sync does with each file, and explain why B’s old data must be deleted BEFORE B is re-indexed.", source: "change_detection.py (ChangeStatus); sync.py docstring rules 1–3; report p.51–52" },
      { id: "g05-2", prompt: "The server loses power in the middle of indexing a document. Explain why writing parent sections FIRST and vectors LAST means a user can never receive a citation that points to nothing. What does the worst case look like instead?", source: "sync.py module docstring (\"PARENTS FIRST, THEN VECTORS\"); agent/nodes.py REFUSAL_TEXT_UNREADABLE; report p.57–58" },
    ],
  },
  {
    id: 'n06',
    number: 6,
    stage: 2,
    title: 'Search small, read big: parents and children',
    titleFr: 'Chercher petit, lire grand : parents et enfants',
    slides: [9],
    oneLiner: 'Two sizes of text: small children for precise search, whole sections (parents) for the model to read.',
    needs: 'Node 5 (conversion gives text with headings).',
    glossary: [
      { term: "Chunk / chunking", plain: "Chunking = cutting a long text into smaller pieces. Each piece is a chunk.", example: "Cutting a 200-page PDF into thousands of small paragraphs." },
      { term: "Parent (section)", plain: "A big piece: one section of the document, between 2,000 and 4,000 characters (about half a page to a page). This is what the AI READS to write the answer.", example: "The whole section containing Article 14 on the trial period." },
      { term: "Child (passage)", plain: "A small piece of 500 characters (5–8 lines) cut from a parent. This is what SANAD SEARCHES. Each child remembers which parent it came from.", example: "The 6 lines of Article 14 that talk about managers (cadres)." },
      { term: "Character", plain: "One letter, digit, space or punctuation mark. 500 characters ≈ 80–90 words.", example: "\"Article 14\" = 10 characters." },
      { term: "Overlap", plain: "The part two neighbouring children share, so a sentence cut at the border still appears whole in one of them. SANAD: 100 characters.", example: "Child 1 = characters 0–500, child 2 = characters 400–900. The 100 characters 400–500 are in both." },
      { term: "Heading (H1, H2, H3)", plain: "Titles in a document. H1 = big title, H2 = sub-title, H3 = sub-sub-title. SANAD cuts parents at these titles.", example: "\"Livre I\" (H1) → \"Titre II\" (H2) → \"Chapitre 1\" (H3)." },
      { term: "Merge / split", plain: "Merge = glue a too-small section to its neighbour (below 2,000 characters). Split = cut a too-big one (above 4,000).", example: "A 600-character section is glued to the next one; a 9,000-character one is cut in 3." },
    ],
    story: "You are looking for a recipe in a thick cookbook.\n\nTo FIND it, you use the small index cards at the back: each card has just a few words (\"chicken tagine, p.45\"). Small cards = quick and precise matching. That's the 500-character CHILD.\n\nTo COOK, you don't cook from the index card. You open page 45 and read the whole recipe. That's the PARENT section.\n\nIf the index cards were whole pages, finding would be slow and fuzzy. If you cooked from the index card alone, you'd miss ingredients. So SANAD does both: search small, read big.",
    explain: `After conversion, SANAD cuts the text twice.

1. Big pieces, the PARENTS (sections). The text is cut at its titles (H1, H2, H3). Then the sizes are adjusted: a section under 2,000 characters is glued to its neighbour, and one over 4,000 characters is cut. Each parent gets a label such as "Article 14". The Code du travail has only about 22 titles for 589 articles, so titles alone would make gigantic sections. Parents are saved as files in data/parents/.

2. Small pieces, the CHILDREN (passages). Each parent is cut into pieces of 500 characters. Two neighbouring pieces share 100 characters (the overlap). Each child remembers the id of its parent. Only children go into the search index (Qdrant).

Why two sizes?
• To SEARCH, small is better. SANAD turns each passage into a vector, one point that represents its meaning. A small passage talks about one idea, so its point is sharp and a question about that idea lands right next to it. A big section talks about 5 ideas, so its point is a blurry average and matches worse.
• To ANSWER, big is better. A 500-character piece can stop in the middle of a sentence, just before the important number. So after the search, SANAD loads the whole parent section of each piece found, only once per parent, and the AI answers from those full sections.

Why the overlap? If a sentence sits right on the cut between two children, the 100 shared characters make sure it appears whole in at least one of them.

Honest note: 500/100 was not tuned by experiment. Question 33 (lesson 10) shows the limit: the CHECKER reads only the small 500-character pieces.`,
    diagram: `flowchart LR
  T["Converted text"] --> P1["Parent: Article 13 section, 2000 to 4000 chars"]
  T --> P2["Parent: Article 14 section"]
  P1 --> C1["Child 1: 500 chars"]
  P1 --> C2["Child 2: 500 chars, 100 overlap"]
  P1 --> C3["Child 3"]
  C1 & C2 & C3 --> Q[("Qdrant: child vectors")]
  P1 & P2 --> J[("data/parents: JSON")]`,
    diagramTitle: 'Parents on disk, children in the index',
    diagramType: 'flowchart',
    example: {
      title: 'A question hits two children of the same article',
      steps: [
        'Question: "Période d’essai d’un cadre ?"',
        'Search returns child 1 and child 2, both from the parent "Article 14" (and three other children).',
        'fetch_parents asks the store for each distinct parent ONCE: Article 14 is loaded one time.',
        'The writer reads the full Article 14 section, so it sees the whole rule including the renewal clause, not two cut fragments.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Only children are embedded and searched; only parents are given to the writer.' },
      { label: 'Rule of thumb', text: 'Small chunks retrieve precisely, big chunks answer completely. Most RAG systems trade one for the other; parent-child keeps both.' },
      { label: 'Convention', text: 'The numbers 500 / 100 / 2,000 / 4,000 are SANAD’s configuration choices (config.py), not universal values.' },
    ],
    myth: {
      myth: 'Parent = one legal article exactly.',
      truth: 'A parent is a heading section merged or split to stay between 2,000 and 4,000 characters, so it can hold several short articles or part of a long one. Slide 9 says "l’article entier": say "la section entière qui contient le passage".',
    },
    iceberg: [
      'Chunk size could be tuned with retrieval metrics (recall@k); SANAD did not run such a study.',
      'Some systems add a short summary of the document to each chunk before embedding ("contextual retrieval"); the report cites Anthropic’s results but SANAD does not do it.',
    ],
    code: [
      { file: 'chunking.py', what: 'heading split, merge < 2,000, split > 4,000, children of 500 with 100 overlap' },
      { file: 'config.py', what: 'chunk_child_size_chars 500, chunk_child_overlap_chars 100, parent_merge_below_chars 2000, parent_split_above_chars 4000' },
      { file: 'parent_store.py', what: 'saves and reads the parent sections (JSON per workspace)' },
      { file: 'agent/nodes.py', what: 'make_fetch_parents: loads each distinct parent once, "loaded 4 of 5" in the trace' },
    ],
    sayItFr:
      'Nous cherchons dans de petits passages de 500 caractères, parce qu’un petit passage porte une seule idée et se compare bien à la question. Mais le modèle lit ensuite la section complète d’où vient le passage, entre 2 000 et 4 000 caractères, pour ne jamais répondre sur une phrase coupée. Chercher petit, lire grand.',
    gates: [
      { id: "g06-1", prompt: "Two alternative designs are proposed: (1) embed and search whole 3,000-character sections directly; (2) search 500-character children and give the writer ONLY those children. Explain what goes wrong with each, and why SANAD’s design avoids both problems.", source: "Slide 9; chunking.py; config.py; report p.52" },
      { id: "g06-2", prompt: "What is the 100-character overlap between children for? Invent a concrete example of what could break if the overlap were 0.", source: "config.py chunk_child_overlap_chars = 100; chunking.py" },
    ],
  },
  {
    id: 'n07',
    number: 7,
    stage: 2,
    title: 'Meaning and exact words: hybrid search',
    titleFr: 'Le sens et les mots exacts : la recherche hybride',
    slides: [9],
    oneLiner: 'E5 vectors find "licenciement" when you type "renvoi"; BM25 finds "article 14"; RRF merges both rankings.',
    needs: 'Node 6 (children are what gets searched).',
    glossary: [
      { term: "Embedding / vector", plain: "Turning a text into a list of numbers that captures its meaning. SANAD uses 768 numbers per text. Close meanings → close numbers.", example: "\"renvoyer un salarié\" and \"licenciement\" end up as two points very close to each other." },
      { term: "Dense search (meaning search)", plain: "Search using vectors: finds texts with the same MEANING even with different words. SANAD's model: multilingual-e5-base (E5).", example: "You type \"virer\" and it still finds \"licenciement\"." },
      { term: "Sparse / keyword search (BM25)", plain: "Search using the exact WORDS. BM25 is a classic formula that gives points to passages that contain the question's words.", example: "You type \"article 14\" and it finds the passage that literally says \"Article 14\"." },
      { term: "Hybrid search", plain: "Doing both searches (meaning + exact words) and combining the results.", example: "Like asking two librarians, one who understands topics and one who checks exact titles, then merging their lists." },
      { term: "Prefix (query: / passage:)", plain: "A small tag E5 needs in front of every text: \"passage: \" for document pieces, \"query: \" for questions. E5 was trained that way.", example: "\"query: durée période d'essai\". Without the tag, results get worse silently." },
      { term: "Ranking / rank", plain: "The position in a results list: 1st, 2nd, 3rd…", example: "In the meaning list, Article 14 is 1st; in the words list, it is 3rd." },
      { term: "RRF (Reciprocal Rank Fusion)", plain: "A way to merge two ranked lists using only POSITIONS, not scores. Each passage gets 1 divided by (position + a constant) from each list, then the two are added.", example: "1st in both lists beats 1st in only one list." },
      { term: "Top 5 (top-k)", plain: "Keep only the best 5 results after merging. k is the number kept.", example: "Out of hundreds of passages, only 5 go to the next step." },
    ],
    story: "You ask two librarians for help.\n\nLibrarian A understands MEANING. You say \"can my boss fire me?\" and she brings pages about \"licenciement\", even though you never said that word.\n\nLibrarian B checks EXACT WORDS. You say \"article 14\" and he brings exactly the pages with \"Article 14\" printed on them.\n\nEach gives you a ranked list. You can't compare their \"scores\": A grades from 0 to 1, B grades with points that can go to 20. So you look only at POSITIONS: a page that is near the top of BOTH lists is surely good. You keep the best 5. That's hybrid search with RRF.",
    explain: `Each small passage is stored in two ways, so it can be found in two ways.

1. By MEANING (dense vectors). The model multilingual-e5-base (called E5) turns a text into 768 numbers. Texts that mean the same thing get nearby numbers, even with different words: "renvoyer un salarié" lands near "licenciement". It works in French and Arabic, runs on a normal computer without a graphics card, and is free.
Important detail: E5 was trained with small tags, "passage: " in front of document pieces and "query: " in front of questions. Forget the tag and nothing crashes, but results get worse without anyone noticing. So SANAD has an automatic test that fails if a tag is missing.

2. By EXACT WORDS (BM25). A classic formula that gives points to passages sharing the question's words. It finds "Article 14", "CNSS" or an exact amount, things a meaning search can blur.

Combining the two (RRF). Qdrant runs both searches and merges the two ranked lists. It can't just add the scores, because they are on different scales (meaning scores go from about 0 to 1, word scores have no upper limit). So RRF uses only POSITIONS. Each passage gets 1/(k + position − 1) from each list, and the two are added. In SANAD's embedded Qdrant, k = 2, so this is simply 1/(position + 1): 1st place gives 1/2, 2nd gives 1/3, and so on (the textbook value of k is 60, but that's not what SANAD uses). A passage well placed in BOTH lists wins. SANAD keeps the top 5.

Planning first. Before searching, SANAD can split one question into 1 to 5 separate searches, for example "trial period length" and "renewal rules". Each runs on its own, then the results are merged.`,
    diagram: `flowchart LR
  Q["query: question"] --> D["E5 dense search"]
  Q --> B["BM25 keyword search"]
  D --> R1["Ranked list 1"]
  B --> R2["Ranked list 2"]
  R1 --> F{"RRF: combine ranks"}
  R2 --> F
  F --> T["Top 5 children"]`,
    diagramTitle: 'Hybrid search inside one workspace collection',
    diagramType: 'flowchart',
    example: {
      title: 'RRF with two lists, as SANAD’s embedded Qdrant computes it (score = 1/(rank + 1))',
      steps: [
        'Dense list: A is 1st, B is 2nd. BM25 list: B is 1st, C is 2nd, and A does not appear.',
        'A: 1/2 = 0.50. B: 1/3 + 1/2 ≈ 0.83. C: 1/3 ≈ 0.33.',
        'Final order: B, A, C. B wins because both searches liked it, even though only one list had it first.',
        'Qdrant does this computation (models.Fusion.RRF); k = 2 is qdrant-client’s local-mode default (DEFAULT_RANKING_CONSTANT_K), not a SANAD setting.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'E5 needs "query: " on questions and "passage: " on documents; a test enforces it.' },
      { label: 'Invariant', text: 'RRF combines rank positions, not scores, so lists with incomparable score scales can be merged.' },
      { label: 'Rule of thumb', text: 'Meaning search catches paraphrases; keyword search catches identifiers and numbers. Legal text needs both.' },
    ],
    myth: {
      myth: 'The RRF score tells you how relevant a passage is.',
      truth: 'It only reflects rank positions: the top hit of an irrelevant search still gets a high RRF score. That is why SANAD asks an LLM grader whether the passages actually answer, instead of using a score threshold.',
    },
    iceberg: [
      'There is no reranker (a model that re-reads the question with each passage). The LLM grader plays a yes/no version of that role; a real reranker would cost CPU time.',
      'The "BM25" side is weaker than its name: the Qdrant sparse index is created without the IDF modifier that fastembed’s BM25 expects, and it uses the default English stemmer and stopwords on French text. So it behaves mostly as term-frequency matching. Know it in case a jury member reads the code.',
    ],
    code: [
      { file: 'embeddings.py', what: 'E5 dense (with prefixes) and BM25 sparse encoders' },
      { file: 'vector_store.py', what: 'search_with_vectors(): two Prefetch + FusionQuery(Fusion.RRF), limit = retrieval_depth_k' },
      { file: 'config.py', what: 'embedding_model, embedding_dense_dim 768, embedding_sparse_model "Qdrant/bm25", retrieval_depth_k 5, max_sub_queries 5' },
    ],
    sayItFr:
      'Chaque passage est rangé deux fois : par le sens, avec les vecteurs E5, et par les mots exacts, avec BM25. Le sens retrouve « licenciement » quand on écrit « renvoi » ; les mots exacts retrouvent « article 14 ». Les deux listes sont fusionnées par rang, avec la méthode RRF, parce que leurs scores ne sont pas sur la même échelle. On garde les cinq meilleurs passages.',
    gates: [
      { id: "g07-1", prompt: "Two users: one asks \"Que dit l’article 14 ?\", the other \"Mon patron peut-il me renvoyer sans motif ?\" (the Code uses \"licenciement\", never \"renvoyer\"). Which half of the hybrid search rescues each question, and why does SANAD fuse the two lists by rank rather than by adding their scores?", source: "Slide 9; embeddings.py; vector_store.py search_with_vectors; report p.33, p.56" },
      { id: "g07-2", prompt: "A new team member \"cleans up\" the code and removes the \"query: \" prefix before embedding questions. All the tests that check for crashes still pass. What actually happens, and how does SANAD catch it?", source: "config.py embedding_query_prefix / embedding_passage_prefix; embeddings.py; docs/defense/jury-questions.md Q9" },
    ],
  },
  {
    id: 'n08',
    number: 8,
    stage: 2,
    title: 'Figures: shown with the answer, never used as proof',
    titleFr: 'Les figures : montrées, jamais utilisées comme preuve',
    slides: [11],
    oneLiner: 'Diagrams and photos are found and displayed, but their AI description only helps find them.',
    needs: 'Nodes 5–7.',
    glossary: [
      { term: "Figure", plain: "Any picture inside a document: a diagram, a schema, a photo.", example: "The drawing of a pump in a technical manual." },
      { term: "Layout model (Docling)", plain: "An AI tool that looks at a PDF page and finds WHERE things are: titles, text, tables, figures. It draws a box around each figure.", example: "It sees \"there's a diagram in the top half of page 7\"." },
      { term: "Crop", plain: "Cutting out just one part of an image.", example: "Cutting the pump diagram out of the full page." },
      { term: "Noise", plain: "Pictures that are not real content: logos, watermarks, decorative headers, full scanned pages.", example: "The company logo that appears at the top of all 40 pages." },
      { term: "Caption / context", plain: "Caption = the text under a figure (\"Figure 3: pump impeller\"). Context = the section title, the nearby text and the page number.", example: "\"Figure 3 – Roue de la pompe, page 12\"." },
      { term: "Description (AI-written)", plain: "2 to 4 sentences an AI writes about the picture, only to help the search find it.", example: "\"A cross-section of a centrifugal pump showing the impeller and the shaft.\"" },
      { term: "Evidence", plain: "What an answer is allowed to rely on. For SANAD: only the document's TEXT.", example: "The description of a figure is NOT evidence." },
    ],
    story: "A museum guide can point at a painting and say \"look, it's here\", but she only states facts that are written on the museum's official label.\n\nIf a visitor asks \"what colour is the horse's saddle?\" and the label doesn't say, she answers \"I can't confirm that from the label, but here is the painting, look for yourself.\"\n\nSANAD treats pictures the same way: it finds them and shows them with their caption and page, but it only states facts that are written in the document's text.",
    explain: `Inside a PDF, a picture has no words, so text search can't see it. SANAD adds a figure step (file figures.py) that works in three moves.

1. Find the whole figure.
• Diagrams: a layout model called Docling looks at the page and draws a box around each figure, then the tool PyMuPDF cuts out that box in high quality.
• Photos: they are cut out directly from the PDF.
Docling alone was too slow (about 25 seconds per page) and saw a grid of 9 photos as one picture. With the direct method, SANAD extracts 259 photos from a 32-page report in 21 seconds, instead of about 13 minutes.

2. Throw away the noise.
• A picture that appears on 3 or more pages is a logo or a watermark.
• A picture that covers most of a page (about 70%) is a scanned page, not a figure.
• Tiny images are dropped.

3. Keep the context: the caption, the section title, the text around the figure (about 600 characters) and the page number.

Then an AI writes a short description (2 to 4 sentences). It helps the SEARCH find the figure. At most 4 figures are shown per question.

The key rule: the description is NEVER given to the checker or to the writer of the answer. An AI can misread a diagram, and a wrong fact with a source attached looks exactly like a right one. So facts come only from the document's TEXT. The price: if a detail exists only inside a picture, SANAD refuses to state it, but it still shows the picture with its caption and page so you can read it yourself.

Honest note: figures came in the last, unnumbered version. There is no exam for figures yet (a 20-question figure exam is planned).`,
    example: {
      title: 'A question about a pump manual',
      steps: [
        'The Manuals workspace contains a centrifugal-pump PDF with 8 figures.',
        'Question: "Comment est montée la roue de la pompe ?"',
        'Search matches a text passage about the impeller AND a figure card whose description mentions the impeller.',
        'The answer is written from the text section only; the figure is displayed under the answer with its caption and page.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'A figure description is never evidence: the grader and the writer read only document text.' },
      { label: 'Rule of thumb', text: 'An image repeated on many pages is decoration (logo, watermark), not content.' },
      { label: 'Convention', text: 'The thresholds (3 pages, ~70% coverage, 4 figures per query) are tuning choices in config.py.' },
    ],
    myth: {
      myth: 'SANAD "understands" images and answers from them.',
      truth: 'It finds and shows them. It never answers a fact that exists only in an image; it refuses instead.',
    },
    iceberg: [
      'Vision-language retrieval (e.g. ColPali) searches page images directly; the report cites it as future territory.',
      'Linking a photo to the part name in a nearby table is planned at 3 months.',
    ],
    code: [
      { file: 'figures.py', what: 'extraction, noise filters, context capture' },
      { file: 'agent/vision.py', what: 'the figure description call' },
      { file: 'config.py', what: 'figures_enabled, figure_repeat_limit 3, figure_context_chars 600, figure_hits_max_per_query 4, figures_max_per_document 300' },
    ],
    sayItFr:
      'Dans un PDF, une image n’a pas de mots : la recherche ne la voit pas. Nous extrayons donc la figure entière, nous écartons les logos et les pages scannées, et nous gardons sa légende et sa page. Le modèle en écrit une description qui aide à la retrouver, mais cette description n’est jamais donnée au rédacteur : une affirmation ne s’appuie que sur le texte du document.',
    gates: [
      { id: "g08-1", prompt: "A technician asks for the voltage of a component that appears ONLY in a wiring diagram, not in the text. SANAD shows the diagram but refuses to state the voltage. A jury member calls this a bug. Defend it as a design decision, including the cost you accepted.", source: "Slide 11; report Table 4.4 p.56, Table 4.9 p.61; figures.py" },
    ],
  },

  // ───────────────────────────── STAGE 3 ─────────────────────────────
  {
    id: 'n09',
    number: 9,
    stage: 3,
    title: 'The agent graph: nine steps, three endings',
    titleFr: 'Le graphe de l’agent : neuf étapes, trois fins',
    slides: [10, 22],
    oneLiner: 'The answering flow is a LangGraph state machine: every step, loop and branch is explicit and traced.',
    needs: 'Stage 2 (what search returns).',
    glossary: [
      { term: "Agent", plain: "In SANAD, the part of the program that handles one question from start to end, step by step. It is NOT a free-thinking robot: its steps are fixed in the code.", example: "Like a call-centre script: step 1 greet, step 2 look up the file, step 3 answer or escalate." },
      { term: "Graph / node / edge", plain: "A graph is a drawing of boxes linked by arrows. Each box is a node (one step). Each arrow is an edge (what comes next).", example: "Box \"search\" → arrow → box \"check\"." },
      { term: "LangGraph", plain: "A Python library for building such step-by-step flows with loops and branches. SANAD's 9 steps are written with it (file agent/graph.py).", example: "It's like a flowchart that the computer actually runs." },
      { term: "State", plain: "The shared notebook every step reads and writes: the question, the searches done, the passages found, the answer so far.", example: "Step \"search\" writes the passages in the notebook; step \"check\" reads them." },
      { term: "Branch / conditional edge", plain: "A place where the flow can go one way OR another, depending on a condition.", example: "If the passages answer the question → go to \"answer\"; if not → go to \"reword\"." },
      { term: "Loop", plain: "Going back to an earlier step to try again.", example: "reword → search again → check again." },
      { term: "Trace", plain: "The list of all steps done for one answer, shown under the answer so you can see what happened.", example: "\"summary · 1 search · passages relevant · loaded 2 sections · answered from 2 sources\"." },
      { term: "Clarification", plain: "When the question is too vague, SANAD asks ONE question back instead of guessing.", example: "You ask \"et pour les congés ?\" with no context → SANAD asks \"Which leave do you mean: annual, maternity or sick leave?\"" },
    ],
    story: "Think of a careful pharmacist following a fixed procedure for every customer:\n\n1. Remember what the customer said before (summarize).\n2. Understand the request: if it's unclear, ask ONE question and stop (plan / clarify).\n3. Look in the drawers (search).\n4. Check: is this really the right medicine for this request? (grade)\n5. If not, look again with other words, at most twice (reword).\n6. If yes, take out the full leaflet (load the full sections).\n7. Give the medicine with its leaflet (answer + sources).\n8. If after two extra tries nothing fits: \"we don't have it\", and say where you looked (refuse).\n\nThe pharmacist never improvises the procedure. That's why the jury can trust it: every step is visible and tested.",
    explain: `SANAD's "agent" is not a chatbot that decides freely. It is a fixed flowchart of 9 steps (file agent/graph.py). Each step does one small job, writes its result in a shared notebook called the "state", and adds a line to the trace you see under the answer.

The 9 steps:
1. summarize: shortens the earlier conversation (max 2,000 characters), so a follow-up like "et pour un ouvrier ?" makes sense.
2. rewrite (the planner): either decides the question is too vague, or turns it into 1 to 5 clear searches.
3. clarify: if vague, asks you ONE question and stops. It can only do this once per question.
4. retrieve: runs the searches (meaning + exact words, lesson 7).
5. grade: an AI checks whether the passages found really answer the question. It replies RELEVANT or OFF_TOPIC.
6. reword: if off-topic, tries other search words and goes back to step 4. At most 2 times.
7. fetch_parents: loads the full sections of the good passages.
8. answer: the AI writes the answer from those sections, and the code attaches the sources.
9. refuse: the honest "I didn't find it in your documents", with the list of searches tried.

So every question ends in exactly one of 3 ways: an answer, a clarifying question, or a refusal.

Why LangGraph rather than a simple loop in Python? The flow has a loop (reword → search → check) and branches (clarify or search; answer, reword or refuse). With a graph, each step and each arrow has a name. So the limit of "2 rewords" and the refusal path are visible, testable one by one, and written in the trace. The cost: one more library to learn.

Important for the jury: the AI never chooses which step comes next. Small Python functions (route_after_grade, etc.) decide. The AI only answers small, narrow questions inside the steps.`,
    diagram: `flowchart TD
  START(["question"]) --> SU["summarize"]
  SU --> RW["rewrite: plan 1-5 searches"]
  RW -- "too vague" --> CL["clarify: one question"] --> E1(["END: clarification"])
  RW -- clear --> RE["retrieve: hybrid search"]
  RE --> GR{"grade: RELEVANT?"}
  GR -- yes --> FP["fetch_parents"]
  GR -- "no, rewords < 2" --> RWD["reword"] --> RE
  GR -- "no, ceiling reached" --> RF["refuse"] --> E3(["END: refusal"])
  FP -- "no section readable" --> RF
  FP --> AN["answer: writer + sources"]
  AN -- "writer says NOT_COVERED" --> RF
  AN --> E2(["END: answer"])`,
    diagramTitle: 'agent/graph.py as a flowchart',
    diagramType: 'flowchart',
    example: {
      title: 'A clear in-scope question found at the first try',
      steps: [
        'summarize: "no earlier turns in this session".',
        'rewrite: "durée période d’essai cadre" (one query).',
        'retrieve: 5 children, mostly from Article 14.',
        'grade: RELEVANT → fetch_parents: "loaded 2 of 2 section(s)".',
        'answer: "answered from 2 source(s)". The trace shows all six steps under the answer.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Every question ends in exactly one of three kinds: answer, clarification or refusal.' },
      { label: 'Invariant', text: 'The retry ceiling is read from config at each decision; the loop cannot run more than ceiling + 1 search rounds.' },
      { label: 'Convention', text: 'Using LangGraph is a design choice (ADR-03); the same logic could be written as plain Python, just less visibly.' },
    ],
    myth: {
      myth: 'The agent is an autonomous AI that decides what to do next.',
      truth: 'The edges are fixed in code. The LLM only answers narrow questions inside nodes (is this relevant? reword this, write from these sections). Which node runs next is decided by Python routing functions.',
    },
    iceberg: [
      'LangGraph has its own recursion limit (10,007 on the pinned version); a test checks that a high retry ceiling still runs to completion.',
      'The graph is compiled per question (a few ms), which keeps ask() stateless.',
    ],
    code: [
      { file: 'agent/graph.py', what: 'build_graph(): the nine nodes and edges; ask(): the only place an Answer is built' },
      { file: 'agent/nodes.py', what: 'each node (make_summarize … make_refuse) and the routing functions route_after_rewrite / route_after_grade / route_after_parents' },
      { file: 'agent/state.py', what: 'AgentState (the shared state), Answer, Source, Turn' },
      { file: 'agent/trace.py', what: 'TraceStep: what the user sees under each answer' },
    ],
    sayItFr:
      'L’agent n’est pas un chatbot libre : c’est un graphe fixe de neuf étapes. Il résume la conversation, planifie une à cinq recherches ou pose une seule question de clarification, cherche, puis fait vérifier les passages. S’ils ne répondent pas, il reformule, deux fois au plus. Sinon il charge les sections complètes et rédige en citant, ou il refuse. Trois fins possibles : une réponse, une clarification, ou un refus.',
    gates: [
      { id: "g09-1", prompt: "List the nodes visited, in order, for each case:\n(a) a clear question whose passages are relevant at the first search;\n(b) a vague first question (\"et pour les congés ?\" with no context);\n(c) a question on a topic absent from the documents, where every search comes back off-topic (default settings).", source: "agent/graph.py build_graph; agent/nodes.py route_after_* ; slide 10" },
      { id: "g09-2", prompt: "A jury member: \"Why use LangGraph? A while-loop in Python would do the same.\" Give the reason and the cost.", source: "agent/graph.py docstring (ADR-03); report Table 4.9 p.61" },
    ],
  },
  {
    id: 'n10',
    number: 10,
    stage: 3,
    title: 'Grade, reword, refuse: the right to say no',
    titleFr: 'Vérifier, reformuler, refuser : le droit de dire non',
    slides: [10, 12, 21],
    oneLiner: 'An LLM grader checks the passages; after two failed rewords the graph refuses, and no model can talk it out of that.',
    needs: 'Node 9.',
    glossary: [
      { term: "Grader (vérificateur)", plain: "The step where an AI reads the question and the passages found and answers with ONE word: RELEVANT (they help answer) or OFF_TOPIC (they don't).", example: "Question about the trial period; passages about maternity leave → OFF_TOPIC." },
      { term: "RELEVANT / OFF_TOPIC", plain: "The only two words the grader may answer. \"Same subject\" is not enough to say RELEVANT: the passage must help WRITE the answer.", example: "A passage that just says \"the trial period is regulated\" without giving a duration → OFF_TOPIC for \"how long?\"." },
      { term: "Reword (reformulate)", plain: "Try the search again with different words.", example: "\"période d'essai cadre\" → \"durée essai cadres et assimilés\"." },
      { term: "Retry ceiling", plain: "The maximum number of rewords allowed: 2 (setting retry_ceiling in config.py).", example: "First search + 2 rewords = 3 tries maximum." },
      { term: "Refusal", plain: "SANAD's honest answer: \"I could not answer this from the documents in this workspace, and I will not guess\", plus the list of searches it tried.", example: "Question about remote work → refusal after 3 tries." },
      { term: "NOT_COVERED", plain: "The exact word the writer AI must reply when the sections don't contain the answer. SANAD turns it into a refusal.", example: "The sections talk about notice periods but not about the one asked → NOT_COVERED." },
      { term: "Threshold / score (and why SANAD doesn't use one)", plain: "Some systems refuse when a similarity score is below e.g. 0.70. SANAD does NOT: an AI grader decides, because search scores don't measure \"does this answer the question\".", example: "A passage can be 90% similar in topic and still not contain the answer." },
    ],
    story: "A careful secretary gets a request: \"find me the rule about the delay for X\".\n\nShe pulls 5 files and reads them quickly. \"Do these actually answer the question?\" If yes → she prepares the answer. If no → she searches again with other words. She allows herself only 2 extra searches. After that she says honestly: \"I didn't find it, here's where I looked. Maybe rephrase, add the document, or check another folder.\"\n\nQuestion 33 is her one mistake: the right file was the first one she pulled, but she only read the first few lines of the page, and the key sentence was just below. So she said \"not relevant\" three times and gave up. A cautious mistake: she didn't invent anything.",
    explain: `This is the heart of the project: SANAD is allowed to say NO.

The grader. After the search, an AI (the "relevance grader") gets the question and the passages and must answer with one word: RELEVANT if at least one passage helps write the answer, even partly, or OFF_TOPIC. Its instructions say "a passage that merely mentions the same subject is not enough", and that a false RELEVANT, which leads to a confident wrong answer, is worse than saying nothing was found.

The loop (the function route_after_grade):
• RELEVANT → load the full sections and write the answer.
• OFF_TOPIC, and fewer than 2 rewords so far → reword the search and try again.
• OFF_TOPIC, and already 2 rewords → refuse.
So at most 3 search rounds per question.

The refusal is decided by the code, not by an AI. The "refuse" step calls no AI at all. It shows the searches that were tried (slide 12 shows seven: up to 5 planned searches plus rewords).

3 roads lead to a refusal:
1. The grader says OFF_TOPIC 3 times (or nothing was found at all).
2. The passages were good, but their full sections couldn't be read from disk. Then the message is different: "run a Sync".
3. The writer reads the full sections and replies NOT_COVERED, because they don't really answer. This becomes a refusal, never an "answer" that says "I don't know".

Question 33 (g-in-033), the only remaining failure. The answer (a delay of one month) is in Article 66, and the search even found Article 66 in 1st position. But the grader only reads the small 500-character passages, and that passage stops just before the words "un mois". So the grader says OFF_TOPIC three times and SANAD refuses. It's a cautious refusal, not an invention. The fix: let the grader read the whole section, like the writer does, then check again that the 20/20 refusals still hold. It wasn't done before the defense because it changes the grading of every question.`,
    example: {
      title: 'Counting calls in the worst case',
      steps: [
        'Round 1: retrieve (queries from the planner) → grade: OFF_TOPIC (rewords so far: 0 < 2).',
        'reword #1 → round 2: retrieve → grade: OFF_TOPIC (1 < 2).',
        'reword #2 → round 3: retrieve → grade: OFF_TOPIC (2 is not < 2).',
        'refuse → "I could not answer this from the documents… The searches I ran are listed". Total: 3 search rounds, 3 grades, 2 rewords.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Refusing is decided by the graph, not by a model: the refuse node takes no model port.' },
      { label: 'Invariant', text: 'With retry_ceiling = 2 there are at most 3 search rounds per question.' },
      { label: 'Rule of thumb', text: 'For a sourced-answer product, a false refusal is a safer failure than a false answer.' },
    ],
    myth: {
      myth: 'SANAD refuses when the similarity score is below a threshold (e.g. 0.70).',
      truth: 'There is no score threshold. An LLM grader judges relevance, and the routing function counts rewords. RRF scores are rank-based and cannot measure relevance.',
    },
    iceberg: [
      'Over-refusal is only visible as a G1 miss; a dedicated metric would be needed to track it.',
      'Letting the grader read full sections costs more tokens per question and may change the 20/20. That is why it must go through the gate again.',
    ],
    code: [
      { file: 'prompts/relevance-grader/PROMPT.md', what: 'one word: RELEVANT or OFF_TOPIC; "same subject is not enough"' },
      { file: 'agent/nodes.py', what: 'make_grade (empty → off-topic without a model), route_after_grade (the ceiling), make_refuse (no port), REFUSAL_TEXT and REFUSAL_TEXT_UNREADABLE' },
      { file: 'config.py', what: 'retry_ceiling = 2' },
      { file: 'docs/evals/v1.0.1-g1-triage.md', what: 'g-in-033: Article 66 found at rank 1, grader rejected all three rounds' },
    ],
    sayItFr:
      'L’agent a le droit de dire non. Un vérificateur juge si les passages trouvés répondent vraiment : un passage qui parle du même sujet ne suffit pas. Sinon Sanad reformule, deux fois au plus, puis refuse, et il affiche les recherches faites. Ce refus n’est pas négocié par un modèle : c’est le graphe qui le décide.',
    gates: [
      { id: "g10-1", prompt: "With the default configuration, a question is off-topic every time. (1) How many search rounds, grading decisions and rewords happen before the refusal? (2) An operator sets RETRY_CEILING=3. What changes, and why can it take effect without restarting the graph code?", source: "agent/nodes.py route_after_grade; config.py retry_ceiling = 2" },
      { id: "g10-2", prompt: "Explain question 33 to the jury in under a minute: what the answer is and where it lives, exactly which step fails and why, why it is a \"safe\" failure, what the fix is, and why you did not ship the fix before the defense.", source: "Slides 17 and 21; docs/evals/v1.0.1-g1-triage.md; report p.77 and Table C.1 p.81" },
    ],
  },
  {
    id: 'n11',
    number: 11,
    stage: 3,
    title: 'The answer: sources built by code, memory, streaming',
    titleFr: 'La réponse : sources construites par le code, mémoire, flux',
    slides: [10, 12],
    oneLiner: 'The writer answers only from the sections; the source list is built by Python from what was retrieved, never from the model’s text.',
    needs: 'Nodes 9–10.',
    glossary: [
      { term: "Writer (answer-writer)", plain: "The AI step that writes the final answer. It only receives the question and the full sections found. Its instructions: use only these sections, copy numbers exactly, or reply NOT_COVERED.", example: "Sections contain Article 14 → writer: \"Article 14 fixe la période d'essai des cadres à trois mois, renouvelable une fois.\"" },
      { term: "Source card", plain: "The numbered box under an answer showing the file and section. Click it and the document opens on the exact passage, highlighted.", example: "[1] code-travail.pdf — Article 14." },
      { term: "Prompt", plain: "The written instructions given to an AI. SANAD keeps them as versioned files in prompts/.", example: "prompts/answer-writer/PROMPT.md is the writer's instruction sheet." },
      { term: "Raise an error / exception", plain: "When the code detects something forbidden, it stops and complains instead of continuing.", example: "If someone tries to create an answer with zero sources, the code stops with an error: \"an answer with no sources cannot be final\"." },
      { term: "Memory / summary", plain: "SANAD keeps a short summary of the conversation so follow-up questions make sense. History is private per person, kept 30 days.", example: "Q1: \"période d'essai d'un cadre ?\" Q2: \"et pour un ouvrier ?\" The summary tells SANAD Q2 is also about the trial period." },
      { term: "Streaming", plain: "Showing the answer bit by bit while it's being written, instead of waiting for the end.", example: "Like watching someone type in a chat." },
      { term: "Hold-back (40 characters)", plain: "SANAD waits for the first 40 characters before showing anything, to be sure the writer isn't replying NOT_COVERED.", example: "Otherwise you might see \"NOT_COV…\" appear and then turn into a refusal." },
      { term: "Disclaimer", plain: "A warning line. For legal documents: SANAD's answer is not legal advice.", example: "\"Ceci n'est pas un conseil juridique.\"" },
    ],
    story: "Imagine a student who writes an essay and a teacher who builds the bibliography.\n\nThe student (the writer AI) may only use the photocopies the librarian gave her. She must copy numbers exactly, and she is forbidden to write [1] or [2] herself.\n\nThe bibliography under the essay is NOT written by the student. The teacher (the code) builds it automatically from the photocopies that were actually handed over. So a book the student \"remembers\" can never appear in the bibliography.\n\nAnd the school rule: an essay with an empty bibliography cannot even be submitted; the system refuses it.",
    explain: `How the final answer is built.

1. The writer (an AI) receives only the question and the full sections loaded in the step before. Its rules (file prompts/answer-writer/PROMPT.md):
• Answer only from the sections, in the language of the question.
• Copy numbers, durations and article numbers EXACTLY.
• Name the article in the sentence ("Article 13 fixe…"), but NEVER write [1], [2]… because a number it invents would point to nothing.
• If the sections don't answer, reply exactly NOT_COVERED, which becomes a refusal.

2. The sources are built by the code, never by the AI. The code keeps a list of the passages whose full section was really loaded. That same list is (a) what the writer is shown AND (b) what the source cards are made from. So every source card points to a section the writer really read.
Real bug that shaped this: an older version showed 5 source cards when only 4 sections could be loaded, so one card pointed to a text nobody read. Now one list does both jobs.

3. The last lock: in the code, an answer with no sources cannot exist. The code raises an error (in agent/state.py).

4. In the screen: each source card opens the document on the exact passage, highlighted. A source link only works from the conversation that received it.

5. Memory: a short summary (max 2,000 characters) plus recent messages, so follow-ups work. Private per person, deleted after 30 days.

6. Streaming: the answer appears bit by bit. But SANAD first holds back 40 characters to be sure the writer didn't reply NOT_COVERED. So you never see a fake start of an answer.

7. For legal workspaces, a warning says it's not legal advice.`,
    diagram: `sequenceDiagram
  participant G as graph
  participant P as parent store
  participant W as writer LLM
  G->>P: fetch parents of graded passages
  P-->>G: sections that exist
  Note over G: cited = passages whose section loaded
  G->>W: question + those sections only
  W-->>G: text, or NOT_COVERED
  alt NOT_COVERED
    G->>G: refusal
  else text
    G->>G: sources = built from cited, not from text
    G->>G: Answer(kind=answer, sources non-empty) or raise
  end`,
    diagramTitle: 'How an answer and its sources are assembled',
    diagramType: 'sequence',
    example: {
      title: '"Loaded 4 of 5"',
      steps: [
        'grade said RELEVANT for 5 passages from 5 different sections.',
        'fetch_parents could only read 4 sections (one file is out of step with the index).',
        'cited = the 4 passages whose sections loaded. The writer sees 4 sections; the answer shows 4 source cards.',
        'If 0 of 5 had loaded, the graph would refuse with "run a Sync" instead of answering with empty context.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Sources come from the retrieved passages whose sections were read, never from the model’s output.' },
      { label: 'Invariant', text: 'An Answer of kind "answer" cannot exist without sources: the constructor raises.' },
      { label: 'Rule of thumb', text: 'Guarantees belong in code structure, not in prompt wording (the report’s first lesson, p.81).' },
    ],
    myth: {
      myth: 'The model chooses which documents to cite.',
      truth: 'The application attaches the sources from what it retrieved and loaded. The prompt even forbids bracketed reference numbers.',
    },
    iceberg: [
      'The writer can still paraphrase a section wrongly; that is exactly what the evaluation judge (G1) measures.',
      'Indirect prompt injection (a document containing instructions to the model) is not specifically defended beyond output sanitising.',
    ],
    code: [
      { file: 'prompts/answer-writer/PROMPT.md', what: 'only the sections; exact numbers; no [1]; NOT_COVERED' },
      { file: 'agent/nodes.py', what: 'make_answer: cited used both for the writer and for _sources_for(cited)' },
      { file: 'agent/state.py', what: 'Answer.__post_init__: no text → error; answer without sources → error' },
      { file: 'agent/answering.py', what: 'STREAM_HOLD_CHARS = 40' },
      { file: 'chat_history.py', what: 'private history, chat_history_retention_days = 30' },
    ],
    sayItFr:
      'Le rédacteur ne reçoit que les sections complètes, et il a une consigne stricte : répondre seulement à partir d’elles, ou écrire NOT_COVERED. La liste des sources n’est pas écrite par le modèle : c’est le code qui la construit à partir des passages réellement lus. Et l’objet réponse ne peut pas être créé sans source : le code lève une erreur. Une réponse sans source ne peut donc pas arriver à l’écran.',
    gates: [
      { id: "g11-1", prompt: "The model misbehaves and writes: \"Selon l’article 99 [3], la période d’essai est de six mois\", although Article 99 was never retrieved. Can \"Article 99\" appear in the SOURCE LIST shown to the user? Walk through why. And what, if anything, would catch the wrong sentence itself?", source: "agent/nodes.py make_answer; prompts/answer-writer/PROMPT.md; evaluation/scoring.py" },
      { id: "g11-2", prompt: "Why does SANAD hold back the first 40 characters when it streams an answer? Describe what the user would see without it.", source: "agent/answering.py STREAM_HOLD_CHARS; report p.66" },
    ],
  },

  // ───────────────────────────── STAGE 4 ─────────────────────────────
  {
    id: 'n12',
    number: 12,
    stage: 4,
    title: 'The evaluation protocol: an exam, not a demo',
    titleFr: 'Le protocole d’évaluation : un examen, pas une démonstration',
    slides: [14],
    oneLiner: '60 French questions written and frozen before tuning, an automatic judge, and a gate before each release.',
    needs: 'Node 3 (G1–G3) and Stage 3 (answer vs refusal).',
    glossary: [
      { term: "Evaluation / benchmark", plain: "A fixed exam that the system takes to measure its quality with numbers.", example: "SANAD's exam: 60 questions about the HR documents." },
      { term: "Golden set", plain: "The official list of exam questions with the expected behaviour for each (answer or refuse).", example: "evaluation/golden/batch1–3.jsonl contains SANAD's 60 questions." },
      { term: "Frozen", plain: "Written once and not changed afterwards, so nobody can adjust the exam to get a better score.", example: "The 60 questions were frozen before any tuning." },
      { term: "Tuning", plain: "Adjusting the system (prompts, settings) to make it work better.", example: "Changing the grader's instructions to reduce false refusals." },
      { term: "Overfitting (teaching to the test)", plain: "When you adjust a system for the exact exam questions, so the score goes up without the system really getting better.", example: "Knowing the exam questions in advance and memorising only those answers." },
      { term: "Judge (LLM-as-judge)", plain: "An AI used to GRADE answers. SANAD's judge reads the question, the answer and the cited sections, and gives a score from 0 to 1 for \"is every claim supported?\".", example: "Answer fully supported → 1.00. One invented detail → below 1.00 → it doesn't count for G1." },
      { term: "RAGAS", plain: "A popular ready-made tool to grade RAG systems. SANAD planned to use it, but it wouldn't install with the library versions they use, so they wrote their own judge.", example: "Planned tool → replaced by a change request." },
      { term: "Self-preference bias", plain: "An AI judge tends to like answers written by its own family of models.", example: "Gemini grading Gemini might be too kind." },
    ],
    story: "A school wants to prove its students really learned.\n\nA demo where the teacher chooses easy questions proves nothing. So the school writes 60 exam questions BEFORE the course starts and locks them in a safe: 40 questions whose answers are in the textbook, and 20 tricky ones whose answers are NOT in the textbook (the student must say \"that's not in the book\").\n\nAn examiner grades each answer: is every sentence supported by the textbook? For the 20 trick questions, grading is simple: did the student say \"not in the book\", yes or no?\n\nBefore each school year the exam is taken again. Below the passing mark, the class doesn't graduate.",
    explain: `A chosen demo proves nothing, because you can always pick questions that work. So SANAD is measured like an exam.

The questions: 60 questions in French about the HR documents (about 200 pages: the Code du travail, a social-security dahir, and a CNSS/CLEISS guide).
• 40 "in-scope" questions: the answer IS in the documents, e.g. "trial period of a manager?".
• 20 "out-of-scope" questions: the answer is NOT there. They are close topics on purpose, not silly ones: income tax, remote work (absent from the Code), "rupture conventionnelle", and a trap mixing up article 33 of two different texts.

Written and frozen first. Meriem wrote them BEFORE any tuning, so the team couldn't adjust SANAD to those exact questions. Two questions were corrected afterwards: one "out-of-scope" question actually had its answer in article 156 (moved to in-scope), and one about article 240 was replaced. Both changes were written down and versioned. In both cases SANAD was right and the exam was wrong.

The judge. RAGAS was planned but wouldn't install with SANAD's library versions. So a home-made AI judge replaced it (file evaluation/scoring.py). For each answer, it sees the question, the answer and exactly the sections the writer saw, and gives a score from 0 to 1. G1 counts an answer only if it gets a perfect 1.00.

The refusals (G2) don't use the judge: the code simply checks whether the answer type is "refusal". G3 is checked by the code too.

The gate. A script re-calculates G1, G2 and G3 from the results and fails if a target is missed. The exam runs as a manual GitHub job, because each run costs API credits.

Weak points to admit: the judge is the same Gemini family as the writer (it may be too kind). It gave all 39 answers exactly 1.00. It doesn't see the "expected" answers. There is no measure of search quality alone, and only one exam run per version.`,
    diagram: `flowchart LR
  G["60 frozen FR questions: 40 in, 20 out"] --> RUN["Run SANAD on each"]
  RUN --> IN{"in-scope?"}
  IN -- yes --> J["LLM judge: groundedness 0 to 1 vs cited sections"] --> G1["G1: count answers scoring 1.00"]
  IN -- no --> K["answer_kind == refusal?"] --> G2["G2: count refusals"]
  RUN --> G3["G3: answers with sources"]
  G1 & G2 & G3 --> GATE{"release_gate.py"}`,
    diagramTitle: 'From questions to a release decision',
    diagramType: 'flowchart',
    example: {
      title: 'Scoring one in-scope and one out-of-scope question',
      steps: [
        'In-scope: "Durée de la période d’essai d’un cadre ?" SANAD answers with Article 14 as source.',
        'The judge sees the question, the answer and the cited sections, and checks that every claim is in those sections → 1.00 → counts for G1.',
        'Out-of-scope: "Quelles règles pour le télétravail ?" SANAD refuses → answer_kind = refusal → counts for G2. No judge needed.',
        'If SANAD had answered the télétravail question, G2 would be 19/20 and the version would be blocked.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Freeze the questions before tuning; changes need a new, documented version.' },
      { label: 'Invariant', text: 'G2 is measured mechanically (answer kind), not by the judge.' },
      { label: 'Rule of thumb', text: 'LLM judges agree with humans often (over 80% in the literature the report cites) but prefer their own family’s outputs; a second judge or human grading checks this.' },
    ],
    myth: {
      myth: 'SANAD was evaluated with RAGAS.',
      truth: 'RAGAS was planned but did not install with the pinned libraries; an in-house LLM judge replaced it through a change request. Several older documents (and parts of the academy) still say RAGAS.',
    },
    iceberg: [
      'A retrieval metric (did the right article appear in the top 5?) would separate search errors from grading/writing errors.',
      'With temperature not set and one run per version, run-to-run variation can move G1 by one question.',
    ],
    code: [
      { file: 'evaluation/golden/', what: 'batch1–3.jsonl: the 60 frozen questions' },
      { file: 'evaluation/scoring.py', what: 'LLMJudgeScorer: groundedness and relevancy 0–1' },
      { file: 'evaluation/runner.py', what: 'runs the questions, aggregates G1–G3' },
      { file: 'evaluation/gate.py', what: 'evaluate_report: re-derives G1–G3 independently' },
      { file: 'scripts/release_gate.py', what: 'fails the release on a miss' },
    ],
    sayItFr:
      'Une démonstration choisie ne prouve rien. Nous avons donc écrit 60 questions en français sur le Code du travail, et nous les avons gelées avant tout réglage : 40 dont la réponse est dans les documents, 20 dont elle n’y est pas, sur des sujets voisins comme le télétravail. Un juge automatique vérifie que chaque affirmation est appuyée par une section citée. Les refus, eux, sont comptés mécaniquement. Et avant chaque version, un script applique les seuils.',
    gates: [
      { id: "g12-1", prompt: "Jury: \"Your judge is Gemini grading Gemini. Why should we believe 39/40?\" Give an honest answer that admits the weakness, then gives what limits it and the planned fix.", source: "Slide 17; report p.36, p.74, Table 6.7, Table C.1; evaluation/scoring.py" },
      { id: "g12-2", prompt: "Why write and freeze the 60 questions BEFORE tuning anything? And how do you answer a jury member who found that two questions were changed after the freeze?", source: "Slide 14; report p.73; evaluation/golden/README.md" },
    ],
  },
  {
    id: 'n13',
    number: 13,
    stage: 4,
    title: 'Results and performance: what the numbers mean',
    titleFr: 'Résultats et performances : ce que disent les chiffres',
    slides: [15, 16, 19],
    oneLiner: '36 → 39 of 40 grounded, 100/100 refusals, 0 unsourced answers, 8.3 s median. And how not to over-read them.',
    needs: 'Node 12.',
    glossary: [
      { term: "Grounded (G1) / refused (G2) / sourced (G3)", plain: "The three scores: answers fully supported, trick questions refused, answers with a source.", example: "Version 3.1: 39/40 grounded, 20/20 refused, 39/39 sourced." },
      { term: "Percentage point", plain: "The difference between two percentages. With 40 questions, 1 question = 2.5 points.", example: "36/40 = 90%, 37/40 = 92.5%: one more question = +2.5 points." },
      { term: "Run-to-run variation", plain: "The same AI can answer slightly differently each time, even with the same question. So scores can move a bit by chance.", example: "Question g-in-014 passed in version 2.0.0 and failed in 3.0.0 with no related code change." },
      { term: "Ablation", plain: "An experiment where you remove one part to see how much it helped. SANAD didn't do this.", example: "Run the exam without keyword search to see if hybrid search really helps." },
      { term: "Median vs mean (moyenne)", plain: "Median = the middle value. Mean (moyenne) = sum divided by count. They are different!", example: "8.3 s is SANAD's MEDIAN answer time. Say \"médiane\", not \"moyenne\"." },
      { term: "Under load", plain: "When the computer is busy doing other things at the same time.", example: "Syncing 200 pages took 732 s while the laptop was busy, instead of about 375–450 s when idle." },
    ],
    story: "A basketball player's free throws over five weeks: 36, 37, 38, 38, 39 out of 40.\n\nIs she improving? Probably, but carefully: each shot is worth 2.5%, she only shot once a week, and some days are just luckier. You wouldn't say \"the new shoes gave +7.5%\". You'd say \"a steady trend, and she never missed an easy shot by throwing the ball at the wrong basket.\"\n\nFor SANAD, \"never threw at the wrong basket\" = every failure was a refusal, never an invented answer.",
    explain: `The 5 versions (from the result files in docs/evals/):
| Version | Date | Grounded (G1) | Refused (G2) | Sourced (G3) |
| 1.0.0 | 12 Sep | 36/40 | 20/20 | 36/36 |
| 1.0.1 | 12 Sep | 37/40 | 20/20 | 37/37 |
| 2.0.0 | 13 Sep | 38/40 | 20/20 | 38/38 |
| 3.0.0 | 14 Sep | 38/40 | 20/20 | 38/38 |
| 3.1.0 | 19 Sep | 39/40 | 20/20 | 39/39 |

How to read these numbers without falling into traps:
• "100/100 refusals" = the SAME 20 questions × 5 versions. Not 100 different questions.
• Every G1 failure was a REFUSAL of a question that had an answer. Never a wrong or invented answer.
• G3 counts only the answers given (refusals aren't answers), and it's 100% by construction.
• 1 question = 2.5 points. Going from 36 to 39 is +3 questions. It's a trend, not a proof. There was only one run per version, and the AI varies from run to run (question g-in-014 passed in 2.0.0 and failed in 3.0.0). No ablation was done, so you can't say which change caused the gain.

Speed:
• Answers: the MEDIAN time is 8.3 s over 20 timed questions (target: 20 s or less). The slowest took 18.1 s. The first question after starting takes about 23 s, because the models load. Measured on version 1.
Warning: the note under slide 16 says "huit secondes en moyenne". Say "médiane".
• Adding 200 pages (target: 10 minutes = 600 s): 449 s and 375 s on a quiet laptop (success), 732 s while the laptop was busy (failure). Most of the time goes to computing the vectors (about 0.29 s per passage) and reading the PDF. They show the failure instead of hiding it.
• Re-syncing an unchanged folder: 0.09 s.`,
    example: {
      title: 'Why 36 → 39 is only "+3 questions"',
      steps: [
        '36/40 = 90.0%, 39/40 = 97.5%: a difference of 7.5 points, which sounds large.',
        'But it is 3 questions. One question = 2.5 points.',
        'g-in-014 passed in 2.0.0 and failed in 3.0.0 without a related code change, so one question can move by chance alone.',
        'Honest wording: "a trend in the right direction, and the only persistent failure is a cautious refusal".',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Every number comes from a kept file (release JSON, timing logs); none is estimated (report p.73).' },
      { label: 'Rule of thumb', text: 'With small samples, report counts ("39 of 40"), not impressive-looking percentages, and don’t over-interpret differences of one or two.' },
      { label: 'Convention', text: 'Median is used for response time because a few slow questions would distort the mean.' },
    ],
    myth: {
      myth: '100/100 refusals means SANAD refuses correctly 100% of the time.',
      truth: 'It is 20 questions × 5 versions, on SANAD’s own set. It shows consistency on those 20, not a universal rate.',
    },
    iceberg: [
      'A confidence interval would show how wide the uncertainty is with n = 40 (not computed in the report).',
      'Times were measured on v1; later versions added streaming and figures, so a re-timing is due.',
    ],
    code: [
      { file: 'docs/evals/release-v1.0.0 … v3.1.0 *.json', what: 'grounded_pass, refusal_pass, sources_pass for each release' },
      { file: 'docs/evals/v1.0.1-g1-triage.md, ST-36-triage.md', what: 'question-by-question analysis of failures' },
      { file: 'scripts/spike_st18.py', what: 'the G4/G5 timing measurements' },
    ],
    sayItFr:
      'Cinq versions, cinq portes passées. Les réponses fondées sont passées de 36 à 39 sur 40. Les 20 questions hors documents ont été refusées à chaque version, soit cent refus sur cent essais. Et aucune réponse n’est sortie sans source. Une précision : avec 40 questions, une réponse vaut 2,5 points, donc nous restons prudents sur les petits écarts. Côté vitesse, le temps médian est de 8,3 secondes, et 18,1 pour la question la plus lente.',
    gates: [
      { id: "g13-1", prompt: "Jury: \"You went from 36 to 39 out of 40. So your changes improved quality by 7.5 points?\" Answer precisely, and mention one fact from the per-version failures that supports your caution.", source: "Slide 15; report Table 6.2 and Table 6.6, p.77; docs/evals/release-*.json" },
      { id: "g13-2", prompt: "Correct and complete this sentence for the jury: \"Sanad répond en 8 secondes en moyenne, et synchronise 200 pages en moins de 10 minutes.\"", source: "Slide 16; report Tables 6.3–6.4 p.75–76; docs/defense/jury-questions.md Q19–20" },
    ],
  },
  {
    id: 'n14',
    number: 14,
    stage: 4,
    title: 'Limits and next steps: say it before they do',
    titleFr: 'Limites et suite : le dire avant le jury',
    slides: [17, 18, 21],
    oneLiner: 'Six declared limits, each paired with a planned fix and the number that will prove it worked.',
    needs: 'Nodes 10, 12, 13.',
    glossary: [
      { term: "Limit (limite)", plain: "Something your work does NOT prove, or does not do yet.", example: "\"The local mode was not measured.\"" },
      { term: "Perspective / future work", plain: "What you plan to do next to fix a limit.", example: "\"Measure the local mode on the 60 questions within one month.\"" },
      { term: "Success criterion / metric", plain: "The number that will tell you the fix worked.", example: "\"40/40 while keeping 20/20.\"" },
      { term: "Local mode measurement", plain: "Running the same exam with the AI running on the computer (Ollama/Mistral) instead of Gemini.", example: "MODEL_MODE=local, then the same 60 questions and the same thresholds." },
      { term: "User interview", plain: "Talking with real future users to learn their needs. SANAD's needs come from the team's own work experience, not interviews.", example: "Interviewing 3 HR officers about how they search the Code today." },
      { term: "Screen reader", plain: "Software that reads the screen aloud for blind users. SANAD's accessibility was never tested with one.", example: "NVDA or VoiceOver reading the answer and the source cards." },
    ],
    story: "A car maker presents a new car and says, before anyone asks: \"Brakes tested on dry roads only; wet-road test next month, target: stopping in under 40 metres. Fuel use measured in petrol mode only; electric mode test planned.\"\n\nThe audience trusts the car MORE, because the maker knows exactly what was tested and what wasn't, and has a plan with a number for each gap.\n\nThat is what slides 17 and 18 do for SANAD.",
    explain: `Slide 17 lists what the work does NOT prove. Slide 18 gives, for each limit, a fix and the number that will prove the fix worked.

1. 60 questions is small: one answer moves the score by 2.5 points.
2. French questions only: the screens exist in Arabic, but Arabic answers were never graded. Plan (3 months): 30 Arabic questions.
3. Local mode not measured: every number comes from cloud mode (Gemini). Nobody knows how SANAD scores without internet. Plan (1 month): run the 60 questions in local mode, with the same thresholds.
4. The judge is from the same family as the writer (it might be too kind). Plan (6 months): a second judge from another AI family, plus 20 answers graded by hand.
5. No user interviews: the needs come from the team's experience. Plan (6 months): 3 interviews with HR officers and a test with 5 users.
6. One remaining failure, question 33: the grader reads only a 500-character piece. Plan (1 month): let the grader read the whole section; success = 40/40 while keeping 20/20.

Also planned at 3 months: a 20-question exam for figures, and an owner for each shared workspace. Today, workspaces created before version 3 have no owner, so everyone can read them and nobody can edit them from the screen.

Other honest gaps: speeds were measured on version 1; the 200-page target was missed once under load; no screen-reader test; details that exist only in a picture get refused; the rehearsal goal (9 clean demos out of 10) has no reported result.

Why say all this yourself? If the jury finds a weakness you hid, they doubt everything else. If you name it first, with its fix and its number, it shows you understand your own work.`,
    example: {
      title: 'Turning a limit into a defended plan',
      steps: [
        'Limit: "Local mode is not measured."',
        'Why it matters: the title says "RAG local", and every score is from Gemini.',
        'Fix: run the same 60 frozen questions with MODEL_MODE=local (Ollama, e.g. Mistral).',
        'Success measure: the same three gates (≥ 36/40, 20/20, 100%). If they fail, local mode is documented as "private but weaker".',
      ],
    },
    claims: [
      { label: 'Rule of thumb', text: 'Every limit you state should come with a planned action and the metric that will say it worked.' },
      { label: 'Invariant', text: 'A claim is only as strong as the measurement behind it: unmeasured modes (local, Arabic, figures) must be described as unmeasured.' },
      { label: 'Convention', text: 'The 1/3/6-month horizons are the team’s planning choice.' },
    ],
    myth: {
      myth: 'Listing limits makes the project look weak.',
      truth: 'Juries probe for them anyway. Naming them first, with a fix and a metric, shows you understand your own evidence.',
    },
    iceberg: [
      'Fixing q33 by giving the grader full sections changes every question’s grading and could weaken refusals. That is why it must pass the gate again.',
      'Measuring local mode may need a bigger local model (7B+) and more RAM than the demo laptop.',
    ],
    code: [
      { file: 'docs/known-issues.md', what: 'the maintained list of known issues (q33, auth, traces, …)' },
      { file: 'config.py', what: 'MODEL_MODE=local switches to Ollama; nothing else changes' },
    ],
    sayItFr:
      'Voici ce que notre travail ne prouve pas. Soixante questions, c’est peu. Les questions sont en français seulement. Le mode local n’a pas été mesuré. Le juge vient de la même famille que le modèle noté. Nos besoins viennent de notre expérience, pas d’entretiens. Et il reste un échec, la question 33 : un refus prudent, pas une invention. Pour chaque limite, nous avons une action datée et la mesure qui dira si c’est réussi.',
    gates: [
      { id: "g14-1", prompt: "Choose the THREE limits you think a jury is most likely to attack first. For each: state the limit in one sentence, the planned fix, and the exact measure that will prove the fix worked.", source: "Slides 17–18; report Table 6.7 p.77–78 and Table C.1 p.81" },
    ],
  },

  // ───────────────────────────── STAGE 5 ─────────────────────────────
  {
    id: 'n15',
    number: 15,
    stage: 5,
    title: 'Security: seven risks, seven protections',
    titleFr: 'Sécurité : sept risques, sept protections',
    slides: [20],
    oneLiner: 'Who can see what, and how a hostile user or a hostile document is contained.',
    needs: 'Node 4 (workspaces, one collection each).',
    glossary: [
      { term: "Authentication (login)", plain: "Proving WHO you are.", example: "Typing your username and password." },
      { term: "Authorisation", plain: "Checking what you are ALLOWED to do once logged in.", example: "You are logged in, but you may not open a colleague's private workspace." },
      { term: "Keycloak / OIDC", plain: "Keycloak is a separate login service. OIDC (OpenID Connect) is the standard way apps say \"please log this person in\" to such a service.", example: "Like \"Sign in with Google\", but with the company's own login server." },
      { term: "Session / cookie", plain: "After login, the browser keeps a small ticket (cookie) so you don't log in on every page. SANAD stores only a scrambled (hashed) copy of the ticket, valid 12 hours.", example: "A wristband at a festival: you show it instead of your ticket each time." },
      { term: "Path traversal", plain: "A trick where an attacker types a file name like ../../secret to escape the allowed folder.", example: "SANAD only accepts names made of letters, digits, - and _, so ../ is rejected." },
      { term: "Rate limit", plain: "A maximum number of actions per person per time period, to stop abuse.", example: "20 questions per 10 minutes per person." },
      { term: "Injection (HTML / link)", plain: "Hiding code or a link inside text so it becomes clickable or runs in the page.", example: "A PDF contains a phishing link; the AI copies it. SANAD shows it as plain text, not a link." },
      { term: "Enumeration", plain: "Guessing names or IDs one by one to discover what exists.", example: "Trying workspace 1, 2, 3… to see which ones exist." },
    ],
    story: "Think of a hotel.\n\n• You get a room key only after showing ID at reception (Keycloak login).\n• Your key opens only your room; the door checks it every single time (owner check at each access).\n• If you ask reception \"is Mr X in room 12?\", they give the same answer whether he is or not (same reply for \"doesn't exist\" and \"forbidden\").\n• Room numbers follow a strict format; you can't write \"basement/../safe\" on a form (ID check against path traversal).\n• You can't order 500 room-service meals in a minute (rate limits).\n• A note slipped under your door is read, never executed (AI text shown without links or HTML).\n• Staff never write guests' passwords in the logbook (no secrets in logs).",
    explain: `Slide 20 (annex A) lists 7 risks and 7 protections. In plain words:

1. Using SANAD without an account → Login through Keycloak. With no valid session you're sent to the login page. Then SANAD gives your browser its own session ticket (cookie), stores only a scrambled copy of it, and it expires after 12 hours.
2. Reading someone else's workspace → The owner is checked at EVERY access, on the server. A workspace that doesn't exist and one you're not allowed to see get the SAME answer, so an attacker can't even learn that it exists.
3. Opening someone else's source → A source link only opens from the conversation that received it.
4. A trick file path (like ../../etc/passwd) → IDs may only contain letters, digits, dash and underscore.
5. Abuse → Limits per person, e.g. 20 questions per 10 minutes, 20 Syncs per hour.
6. Dangerous content in an answer → The AI's text is shown with HTML, links and images turned off. A malicious link inside a document can't become clickable.
7. Leaks through logs → No keys, passwords or request contents are written in the logs.

Also: uploads are limited to 50 MB, and security headers stop the site being embedded in another site.

Other modes: by default (no accounts), SANAD only accepts connections from the same computer (127.0.0.1). An optional simple password (ACCESS_PASSWORD) can protect it. The Docker start script only WARNS if the app is exposed without a password.

Honest gaps to know: roles (admin, reader…) were removed in v3.1, so everyone logged in is equal and workspaces are either owned or shared. A few login checks are missing (the "nonce" check, a CSP header). A user deleted in Keycloak stays logged in until their 12 hours end. For real personal data under Moroccan law 09-08, a legal review would be needed first. The demo uses only public texts on purpose.`,
    example: {
      title: 'An attacker edits a URL',
      steps: [
        'Salma is signed in and opens her workspace /workspaces/abc.',
        'She edits the URL to /workspaces/xyz, a colleague’s private workspace.',
        'The owner check fails. SANAD answers exactly as it would for a workspace that does not exist.',
        'Salma learns nothing: neither the content nor even that "xyz" exists.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Authorisation is checked on every access, server-side; hiding a button is not security.' },
      { label: 'Invariant', text: 'Model output is untrusted: it is rendered without HTML, links or images.' },
      { label: 'Rule of thumb', text: 'Return the same response for "not found" and "forbidden" so attackers cannot enumerate resources.' },
    ],
    myth: {
      myth: 'SANAD anonymises personal data to comply with law 09-08.',
      truth: 'There is no anonymisation feature. The team chose a public corpus for the demo and states that real personal data would need a data-protection review first (report p.43).',
    },
    iceberg: [
      'Indirect prompt injection (a document that tells the model to ignore its rules) is only partly addressed by treating inserted text as data.',
      'Rate limits and sessions live in memory, fine for one process, wrong for several replicas.',
    ],
    code: [
      { file: 'ui/auth_gate.py, ui/oidc.py, ui/auth.py', what: 'Keycloak sign-in, sessions, may_see / may_manage' },
      { file: 'ui/access_gate.py', what: 'ACCESS_PASSWORD basic-auth gate' },
      { file: 'ui/rate_limit.py', what: 'per-person sliding-window limits' },
      { file: 'ui/answer_format.py', what: 'renders model markdown with HTML, links and images disabled' },
      { file: 'ui/security_headers.py', what: 'X-Frame-Options, nosniff, Referrer-Policy' },
    ],
    sayItFr:
      'Sept risques, sept protections : la connexion par Keycloak, le propriétaire vérifié à chaque accès avec la même réponse pour un espace inconnu ou interdit, les liens de sources qui ne s’ouvrent que depuis leur conversation, les identifiants filtrés contre les chemins piégés, des limites de débit par personne, le texte du modèle privé de HTML et de liens, et aucun secret dans les journaux.',
    gates: [
      { id: "g15-1", prompt: "A signed-in user changes the workspace id in the URL to a colleague’s private workspace. What does SANAD return, and why is it important that the response is the SAME as for a workspace that doesn’t exist?", source: "Slide 20; report Table 4.6; app.py may_see/may_manage" },
      { id: "g15-2", prompt: "A PDF in a workspace contains the text: <a href=\"http://phishing.example\">Cliquez ici pour votre indemnité</a>. The model copies it into its answer. What does the user see, and which protection is responsible?", source: "Slide 20; ui/answer_format.py; report p.60" },
    ],
  },
  {
    id: 'n16',
    number: 16,
    stage: 5,
    title: 'How two people built it: Scrum for two',
    titleFr: 'Comment deux personnes l’ont construit : Scrum à deux',
    slides: [6],
    oneLiner: 'Eight sprints, one branch per task, nothing merged without green tests and the other’s review.',
    needs: 'Nothing technical; knowing the product (Stage 1) helps.',
    glossary: [
      { term: "Scrum", plain: "A way of organising teamwork in short cycles, with regular check-ins and a list of tasks. SANAD used it adapted for 2 people.", example: "Every Saturday: what's done, what's blocked, what's next." },
      { term: "Sprint", plain: "One short work cycle with a clear goal.", example: "Sprint S1 (28 Jul–29 Aug): the ingestion part." },
      { term: "User story (ST-xx)", plain: "One task described from the user's point of view, with conditions to call it done. SANAD had ST-01 to ST-55.", example: "ST-17: the Sync engine." },
      { term: "Git / branch", plain: "Git records every version of the code. A branch is a separate copy where you work on one task without disturbing the main version.", example: "Branch feat/S1-ST-17-sync-engine for the Sync engine." },
      { term: "Pull request (PR) / merge", plain: "A request to add a branch's changes into the main version. Merge = accept and add them.", example: "146 pull requests were merged." },
      { term: "CI (Continuous Integration)", plain: "Automatic checks that run on every pull request: tests, style checks, a secret scan.", example: "If a test fails, GitHub blocks the merge." },
      { term: "Code review", plain: "The other person reads and tests your change before it's accepted.", example: "Youssef reviews Meriem's Sync engine; Meriem reviews Youssef's agent." },
      { term: "Automated test", plain: "A small program that checks another part of the program works. SANAD: about 1,400 of them.", example: "A test that fails if a passage is embedded without its \"passage: \" tag." },
    ],
    story: "Two cooks run a restaurant kitchen.\n\nEvery Saturday they meet 10 minutes: what's done, what's stuck, what's next. Each dish is prepared on its own station so they don't bump into each other (one branch per task). No plate leaves the kitchen until the automatic thermometer says OK (CI tests) AND the other cook has tasted it (review).\n\nMeriem mostly handles everything from the delivery door to the fridge (documents in, index, exam). Youssef mostly handles everything from the order to the plate (question → answer, figures, login, hosting).",
    explain: `Method: Scrum adapted to 2 people. They chose it over "waterfall" (plan everything, then build everything) because the deadline was short and a lot was uncertain.

Three work rules (slide 6):
1. Every Saturday, a meeting: what's finished, what's blocked, what's next.
2. Every task on its own git branch, announced on GitHub, so the two never edit the same file at the same time.
3. Every change goes through automatic checks (CI: tests, style check, secret scan), then the other person reviews and tests it. The main branch is locked: it needs 1 approval and green checks, and nobody can rewrite its history.

In numbers: 8 sprints (S0 to S7) from 20 July to 19 September. The sprints had very different lengths: S1 took about a month, S4, S5 and S7 took one day each. 146 merged pull requests. About 1,400 automated tests (the report says 1,409). 5 published versions. Tasks ST-01 to ST-55. Decisions were written down in docs/journal/DECISIONS.md.

"Done" meant 4 things: the conditions are met, tests are green on the laptop and in CI, the other person approved, and the owner can explain the change out loud in one minute.

Who did what (report Table 1.6). Planned: Youssef = build lead, Meriem = research & quality lead. In practice it mixed:
• Meriem: storage and safe write order, database design, workspaces, the API, change detection, conversion, chunking, the Sync engine, memory, the 60 exam questions, the judge and the gate, the full screen redesign including Arabic right-to-left, first hosting.
• Youssef: the 9-step agent, cloud/local AI modes, project structure and Docker, the vector models, figures, hybrid search, the grader, answer and refusal, clarification, translations, the dashboard, login, rate limits, final hosting.

Likely jury question: "How did you use AI tools?" Answer truthfully, and the same way as each other. Say what you used, for what, and how you checked it: tests, review, the exam gate, and breaking the code on purpose to prove the tests can catch problems.`,
    example: {
      title: 'The life of one story',
      steps: [
        'Saturday: ST-17 "sync engine" is picked, owner Meriem, with acceptance criteria.',
        'Branch feat/S1-ST-17-sync-engine is created and announced.',
        'Code + tests; CI runs pytest, ruff and the secret scan on the pull request.',
        'Youssef reviews, runs it, approves; main accepts the merge only with the green check and 1 approval.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Nothing reaches main without green CI and the other person’s approval (branch protection in ruleset.json).' },
      { label: 'Convention', text: 'Scrum ceremonies (sprints, weekly meeting, stories) are a convention adapted to two people, not a law.' },
      { label: 'Rule of thumb', text: 'Break the code on purpose to prove a test can fail. A test that never failed proves nothing.' },
    ],
    myth: {
      myth: 'Two people don’t need process.',
      truth: 'Two people editing the same files on a tight deadline collide constantly. Branch-per-task and mandatory review prevented that and caught 8 defects before the figures merge (report p.70–71).',
    },
    iceberg: [
      'Sprint lengths were uneven, so velocity comparisons across sprints aren’t meaningful.',
      'CI does not build the Docker image although one ADR says it should; the Docker build is checked at deploy time.',
    ],
    code: [
      { file: 'ruleset.json', what: 'main branch protection: 1 review, required check, no force-push' },
      { file: '.github/workflows (gate.yml, eval.yml)', what: 'CI on every PR; manual evaluation workflow' },
      { file: 'docs/journal/DECISIONS.md, BUILD-STATE.md', what: 'decision log and build state' },
    ],
    sayItFr:
      'Nous avons travaillé en Scrum à deux : huit sprints du 20 juillet au 19 septembre, une réunion chaque samedi, une branche par tâche, et aucune modification acceptée sans tests verts puis relecture par l’autre. En chiffres : 146 modifications fusionnées, plus de 1 400 tests, 5 versions publiées.',
    gates: [
      { id: "g16-1", prompt: "Jury: \"Who did what?\" Give the answer for BOTH of you in 4–5 sentences, organised by following the path of a document then of a question, and end with how you checked each other’s work.", source: "Slide 6; report Table 1.6 and p.23–27" },
    ],
  },
  {
    id: 'n17',
    number: 17,
    stage: 5,
    title: 'Running it: local, Docker, Railway',
    titleFr: 'Le faire tourner : en local, Docker, Railway',
    slides: [8, 13],
    oneLiner: 'One command locally; a two-stage Docker image; Railway rebuilding from GitHub main with a persistent volume.',
    needs: 'Node 4.',
    glossary: [
      { term: "Deploy / hosting", plain: "Putting the app on a server on the internet so others can use it.", example: "The online demo of SANAD runs on Railway." },
      { term: "Railway", plain: "A cloud service that runs your app for you. You give it your code (from GitHub or uploaded), it builds and runs it.", example: "Like renting a furnished apartment for your app." },
      { term: "Docker / image / container", plain: "Docker packs the app with everything it needs into an \"image\" (a sealed box). A \"container\" is a running copy of that box.", example: "Image = a frozen meal; container = the meal heated and served." },
      { term: "Dockerfile (two stages)", plain: "The recipe that builds the image. Stage 1 prepares everything (heavy tools); stage 2 keeps only what's needed to run, so the final box is smaller.", example: "Cook in a big kitchen, then pack only the finished dish." },
      { term: "uv / lockfile", plain: "uv installs Python libraries. The lockfile (uv.lock) lists the exact versions, so every computer installs the same thing.", example: "A recipe with exact brands and grams instead of \"some flour\"." },
      { term: "CPU vs GPU / PyTorch", plain: "CPU = the normal processor. GPU = a graphics card, great for AI but not available here. PyTorch is the library E5 needs; SANAD installs the small CPU-only version.", example: "Why pack a 4 kg charger for a laptop that has no socket for it?" },
      { term: "Volume", plain: "A disk attached to the container that is KEPT when the container is replaced. SANAD's data/ folder lives there.", example: "The container is a hotel room you change every week; the volume is your locked suitcase that follows you." },
      { term: "Health check", plain: "A small address Railway calls to check the app is alive: /api/v1/health.", example: "A nurse checking your pulse every few minutes." },
      { term: "Environment variable", plain: "A setting given to the app from outside the code, like a key or a mode.", example: "MODEL_MODE=local, CLOUD_API_KEY=…" },
    ],
    story: "Think of a food truck.\n\nThe recipe book (Dockerfile) says exactly how to prepare the truck: which ingredients and which exact brands (uv lockfile), and no heavy equipment you'll never use (no GPU parts). The cooking is done at the central kitchen, and only the ready dishes go in the truck (two-stage build).\n\nEvery morning a new truck may replace yesterday's (redeploy). Anything left inside the old truck is gone. So the important things, the stock and the customer notebook, live in a locked box that is moved from truck to truck (the volume /app/data).\n\nAn inspector knocks on the window every few minutes: \"still open?\" (health check).",
    explain: `Three ways to run SANAD.

1. On a laptop. Install with uv (it installs the exact versions listed in uv.lock) and start the app. It answers at 127.0.0.1:8000. Cloud mode needs a Gemini key (CLOUD_API_KEY). Local mode needs Ollama running on the laptop.

2. With Docker. The Dockerfile builds a box ("image") in 2 stages:
• Stage 1 (builder): installs the exact locked libraries, but swaps PyTorch for its CPU-only version, because the GPU version weighs several gigabytes and there's no graphics card. The build even stops on purpose if that swap didn't happen. It also downloads the E5 and BM25 models INTO the image, so the app never downloads them when it starts.
• Stage 2 (runtime): a smaller box that runs as a normal user (not administrator), with a health check.
The start script adapts the port to Railway, warns loudly if the app is public without a password, and on the very first start copies the demo documents into the data folder.

3. On Railway (the online demo). According to the project's own notes:
• The web service ("sanad-web") is rebuilt from GitHub's main branch, and has a volume mounted on /app/data.
• The login service (Keycloak) was uploaded by hand with "railway up" and uses a Railway database.
• The volume is what keeps the database, the index, the sections and the figures when the app restarts. Without it, every update would erase everything and all documents would need a new Sync.

Honesty point: Railway is the cloud. The online demo exists for convenience, with public documents only. For real company documents, the plan is to install SANAD on the company's own machine and use local mode.`,
    diagram: `flowchart LR
  GH["GitHub main"] -- "push / merge" --> RB["Railway: build Dockerfile"]
  RB --> C["Container sanad-web, non-root"]
  C --- V[("Volume /app/data: SQLite, Qdrant, parents, figures")]
  C -- "OIDC" --> KC["Keycloak service: uploaded with railway up"] --- PG[("Railway Postgres")]
  C -- "cloud mode" --> GM["Gemini API"]`,
    diagramTitle: 'The online deployment',
    diagramType: 'flowchart',
    example: {
      title: 'What happens on a redeploy',
      steps: [
        'A pull request is merged into main.',
        'Railway rebuilds the Docker image (CPU torch, model weights baked in) and starts a new container.',
        'The new container mounts the same /app/data volume: workspaces, index and history are still there.',
        'The health check on /api/v1/health passes; traffic switches to the new container.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'Anything not on the volume is lost on redeploy; all state lives under /app/data.' },
      { label: 'Rule of thumb', text: 'Bake model weights into the image and pin versions, so a boot never depends on a download.' },
      { label: 'Convention', text: 'Running as a non-root user is a standard container hardening practice.' },
    ],
    myth: {
      myth: 'Railway runs SANAD from the code on your laptop.',
      truth: 'The web service is built from GitHub main. Only the Keycloak service was uploaded by hand with railway up.',
    },
    iceberg: [
      'Docling’s layout weights are not baked into the offline image, so diagram extraction on Railway may fall back to photos only.',
      'A second replica would break: embedded Qdrant, rate limits and sessions assume one process.',
    ],
    code: [
      { file: 'Dockerfile', what: 'two stages, uv, CPU-only torch, weights baked in, non-root runtime' },
      { file: 'docker-entrypoint.sh', what: 'PORT mapping, public-without-password warning, drop root, seed corpus' },
      { file: 'railway.json', what: 'DOCKERFILE builder, health check /api/v1/health, restart ON_FAILURE ×10' },
      { file: 'deploy/keycloak/', what: 'the separate Keycloak service (Dockerfile, start.sh, railway.json)' },
      { file: 'compose.yaml, compose.keycloak.yaml', what: 'run the same thing locally with Docker Compose' },
    ],
    sayItFr:
      'En local, une commande suffit. L’image Docker est construite en deux étapes : PyTorch en version CPU seulement, et les modèles d’embedding intégrés à l’image. Sur Railway, le service web est reconstruit à partir de la branche main de GitHub, et un volume persistant garde la base, l’index et les sections. Keycloak tourne comme un service séparé.',
    gates: [
      { id: "g17-1", prompt: "Railway redeploys the app after a merge. Why are the workspaces, index and chat history still there afterwards, and what would happen without the volume? Also: why doesn’t the new container need to download the E5 model at boot?", source: "railway.json; Dockerfile; docs/journal/BUILD-STATE.md (sanad-web from GitHub main, volume on /app/data)" },
      { id: "g17-2", prompt: "Why does the Dockerfile deliberately install the CPU-only version of PyTorch, and why does the build fail on purpose if its GPU filter drops nothing?", source: "Dockerfile builder stage; report p.64 and p.70" },
    ],
  },
  {
    id: 'n18',
    number: 18,
    stage: 5,
    title: 'The code map: which file does what',
    titleFr: 'La carte du code : quel fichier fait quoi',
    slides: [22, 23, 24],
    oneLiner: 'The flat layout, the data model, the classes, and the "ports" that let tests run without a real LLM.',
    needs: 'Stages 2 and 3.',
    glossary: [
      { term: "Module / file", plain: "One Python file that does one job.", example: "chunking.py cuts text into parents and children." },
      { term: "Function / class", plain: "A function is a named action in the code; a class is a template for objects (like \"Answer\").", example: "The function ask() runs one question; the class Answer holds text + sources + trace." },
      { term: "Port (in agent/ports.py)", plain: "A \"socket\" where the agent plugs in a tool (the AI, the search…). The agent uses the socket, without knowing which exact tool is plugged in.", example: "In production: plug in Gemini. In tests: plug in a fake AI that gives scripted answers." },
      { term: "Dependency injection", plain: "Giving a part of the program the tools it needs from the outside, instead of letting it create them itself. Ports make this possible.", example: "build_graph(ports): the graph receives its 8 tools as a package." },
      { term: "Fake / test double", plain: "A pretend version of a tool used in tests. SANAD's ScriptedChat pretends to be the AI.", example: "It always answers RELEVANT for test 12, so the test checks the routing, not Gemini's mood." },
      { term: "API / OpenAPI", plain: "API = a way for other programs to use SANAD without the screens (under /api/v1). OpenAPI = a written contract describing it; tests fail if the code drifts from it.", example: "Another app could send a question to /api/v1/workspaces/{id}/ask and get JSON back." },
      { term: "Table / foreign key / cascade", plain: "Tables are like linked Excel sheets. A foreign key links a row to another table. Cascade = deleting a workspace automatically deletes its linked rows.", example: "Delete workspace RH → its documents, syncs, exams and conversations rows disappear too." },
    ],
    story: "Picture a kitchen appliance with standard sockets.\n\nThe appliance (the agent) doesn't care which blender brand is plugged in, as long as it fits the socket (the port). In the real kitchen you plug in the expensive blender (Gemini, Qdrant). In the training kitchen you plug in a toy blender that always does the same thing (the fake AI). So apprentices can test the appliance 1,400 times a day without paying for blenders.\n\nThe rule: there is NO default blender inside the appliance. If there were a toy one built in, someone might ship the appliance to a customer with the toy still inside, making nice noises but blending nothing. That's the danger: a fake AI that answers plausibly in production.",
    explain: `The code follows the two journeys you already know.

Journey 1, a document (files at the top level):
change_detection.py (fingerprints) → conversion.py (to text) → chunking.py (parents and children) → embeddings.py (E5 + BM25) → vector_store.py (Qdrant, one collection per workspace) and parent_store.py (section files). sync.py runs this whole chain. recovery.py repairs an unfinished Sync at startup, watcher.py can watch folders, and figures.py handles pictures.

Journey 2, a question (folder agent/):
graph.py (the 9-step flowchart, and ask() = the only place an answer is created) → nodes.py (each step and the arrows between them). The real work sits behind "ports": querying.py (planner), retrieval.py (search), grading.py (grader, reword), answering.py (writer, streaming), summarizing.py (memory), chat.py (connects to Gemini or Ollama), prompts.py (loads the instruction files in prompts/).

The ports (agent/ports.py): 8 tools the agent needs (summarize, clarify, rewrite, retrieve, grade, reword, fetch_parents, write_answer), with NO default. In production, ui/ports.py plugs in the real ones. In tests, fakes are plugged in, so about 1,400 tests run fast, the same way every time, and without any API key. No default on purpose: a built-in fake that answers plausibly could slip into production.

The host: app.py (about 2,900 lines) is the web app with the pages, the login routes and the question route. api/routes.py is the /api/v1 API (12 operations, with a written contract checked by tests). ui/ holds the screens, the translations (fr/ar/en), login and rate limits.

Data (annex D, db/schema.sql): workspace → document → sync_run → sync_item (one row per file). Also eval_run → eval_result, answer_feedback, app_user, user_session, and conversation.

Classes (annex E): ChunkedDocument, Parent, Child, SearchHit, and Answer. Answer holds the kind, text, sources, trace and disclaimer; it can't be changed after creation and can't exist without sources.`,
    diagram: `erDiagram
  WORKSPACE ||--o{ DOCUMENT : contains
  WORKSPACE ||--o{ SYNC_RUN : has
  SYNC_RUN ||--o{ SYNC_ITEM : "one row per file"
  WORKSPACE ||--o{ EVAL_RUN : evaluated_by
  EVAL_RUN ||--o{ EVAL_RESULT : "one per question"
  APP_USER ||--o{ USER_SESSION : signs_in
  APP_USER ||--o{ CONVERSATION : owns
  WORKSPACE ||--o{ CONVERSATION : about`,
    diagramTitle: 'Annex D: the SQLite model (simplified)',
    diagramType: 'er',
    example: {
      title: 'Tracing a bug report to files',
      steps: [
        'Report: "a source card shows a file that was deleted yesterday".',
        'Suspect 1: the deletion did not reach the index → vector_store.delete_document and sync.py (removed branch).',
        'Suspect 2: the file was deleted but no Sync ran since → the Sync report (sync_run / sync_item rows).',
        'Check: the source card is built from retrieved hits (agent/nodes.py _sources_for), so the stale vector must still be in Qdrant. Confirm with the vector store tests.',
      ],
    },
    claims: [
      { label: 'Invariant', text: 'The agent never imports a concrete model: it only calls ports, so tests can inject fakes.' },
      { label: 'Rule of thumb', text: 'One composition root (ui/ports.py) wires real implementations; everything else receives them.' },
      { label: 'Convention', text: 'Prompts live as versioned files (prompts/<id>/PROMPT.md with a changelog), not inline strings.' },
    ],
    myth: {
      myth: 'The tests call Gemini, so they cost money and are flaky.',
      truth: 'Tests use a scripted fake chat model and fake encoders through the ports; real Gemini, Ollama and Keycloak were only checked by hand and by the evaluation.',
    },
    iceberg: [
      'Traces are not persisted (known issue #51): the trace under an answer exists for the session only.',
      'Some older docs (README, ADR-02, jury-questions.md) no longer match the code: trust the code.',
    ],
    code: [
      { file: 'agent/ports.py', what: 'AgentPorts: 8 required callables, no defaults' },
      { file: 'ui/ports.py', what: 'build_ports: the single composition root' },
      { file: 'tests/fake_chat.py, tests/fake_encoders.py', what: 'the test doubles' },
      { file: 'db/schema.sql', what: 'the tables of annex D' },
    ],
    sayItFr:
      'Le code suit les deux trajets. Pour un document : détection des changements, conversion, découpage, embeddings, puis Qdrant et les sections, orchestrés par sync.py. Pour une question : le graphe dans agent/graph.py, et chaque appel au modèle passe par un « port ». En production on branche Gemini ou Ollama ; en test, un faux modèle scénarisé. C’est ce qui permet plus de 1 400 tests sans clé d’API.',
    gates: [
      { id: "g18-1", prompt: "A jury member opens agent/ports.py: \"Why are these eight functions passed in, with no default implementation? Isn’t that over-engineering?\"", source: "agent/ports.py; agent/graph.py build_graph docstring; ui/ports.py; tests/fake_chat.py" },
    ],
  },
  {
    id: 'n19',
    number: 19,
    stage: 5,
    title: 'Mock jury: mixed questions, cold',
    titleFr: 'Jury blanc : questions mélangées, à froid',
    slides: [],
    oneLiner: 'The questions most likely to hurt, from every part of the project. Answer each cold, then compare.',
    needs: 'All previous nodes.',
    glossary: [
      { term: "Mock jury (jury blanc)", plain: "A practice defense with questions like the real jury's, answered without notes.", example: "One of you asks, the other answers in 45 seconds, then you swap." },
      { term: "Answer first", plain: "Put the direct answer in your first sentence, then explain.", example: "\"No, we don't have a reranker. Here's why…\"" },
      { term: "Reranker", plain: "An extra AI step that re-reads the question with each passage found and re-orders them. SANAD doesn't have one; the grader plays a yes/no version of that role.", example: "A second librarian who re-sorts the 5 books before you read them." },
      { term: "Consistency", plain: "Both of you giving the same facts. The jury may ask you separately.", example: "Both say \"8.3 seconds median\", not one \"8 s\" and the other \"10 s average\"." },
    ],
    story: "In a defense, the jury is not trying to trap you. They are checking that you understand what you built and what you measured.\n\nThink of each question as a short delivery: hand over the answer first, show one proof (a number, a file, an example), mention the weak spot yourself with its fix, then stop talking. The last sentence you say is often the next question they ask, so end on something you can defend.",
    explain: `This lesson has no new idea. It mixes questions from every lesson, the way a real jury does.

How to answer any jury question in about 45 seconds:
1. Answer directly in the first sentence.
2. Give ONE concrete fact: a number, a file, an example.
3. If there's a weakness, name it yourself and give the planned fix.
4. Stop. Don't open a new topic nobody asked about.

Traps to watch for:
• "Local": all measurements were done in cloud mode (Gemini), and the online demo runs on Railway.
• 8.3 s is a MEDIAN, not "en moyenne".
• "100/100" = 20 questions × 5 versions.
• "L'article entier": it's the whole SECTION (2,000–4,000 characters).
• RAGAS: replaced by a home-made judge.
• 589 vs 588 articles: the report contains both. Say "environ 589 articles, 7 livres".
• AI tools: answer truthfully, and the same way as each other.`,
    example: {
      title: 'The 4-step answer on "Why not a reranker?"',
      steps: [
        'Direct: "We don’t have one."',
        'Fact: "Our LLM grader plays a yes/no version of that role on the top 5 passages."',
        'Weakness + fix: "A reranker could improve the order of passages, at a CPU latency cost. It would be measured with the same 60 questions."',
        'Stop.',
      ],
    },
    claims: [
      { label: 'Rule of thumb', text: 'Answer first, one fact, weakness + fix, stop.' },
      { label: 'Invariant', text: 'Both of you must give the same facts; contradictions between partners cost more than a gap.' },
      { label: 'Convention', text: 'In French academic juries, answering "nous ne l’avons pas mesuré" is acceptable if followed by how you would measure it.' },
    ],
    myth: {
      myth: 'Saying "we didn’t do that" loses points.',
      truth: 'Bluffing loses more. A precise "not measured, here is how we would" shows command of the method.',
    },
    iceberg: [
      'Jurors often chain questions: your answer’s last sentence becomes their next question. Don’t end on a claim you can’t back.',
      'If a juror states something wrong about your project, correct it politely with the file or number.',
    ],
    code: [{ file: 'docs/defense/jury-questions.md', what: 'the team’s own drill (some answers are outdated: "no accounts", "no OCR", "810 tests")' }],
    sayItFr:
      'Méthode pour chaque question : répondre d’abord, donner un fait précis, nommer soi-même la limite et sa correction prévue, puis s’arrêter.',
    gates: [
      { id: "g19-1", prompt: "Jury: \"Your title says RAG LOCAL, but your results were obtained with Gemini and your demo runs on Railway. Isn’t the title misleading?\"", source: "Slides 1, 8, 17, 18; report p.60, p.70, p.77, Table C.1" },
      { id: "g19-2", prompt: "Jury: \"Why don’t you just set a similarity threshold (say 0.7) and refuse below it, instead of asking an LLM grader?\"", source: "vector_store.py (Fusion.RRF, dense_top1_similarity docstring); prompts/relevance-grader/PROMPT.md" },
      { id: "g19-3", prompt: "Jury: \"How did you use AI tools, like code assistants, in this project? How do we know you understand the code?\" Give a truthful structure for your answer. What must it contain, and what must you avoid?", source: "docs/defense/jury-questions.md Q30; report p.24 (Definition of Done), p.70 (\"casser pour vérifier\")" },
    ],
  },
];