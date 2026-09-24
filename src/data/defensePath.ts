// The Defense Path: SANAD taught from the general to the specific, in the order a
// beginner needs it, mapped to the defense slides. Every fact here was checked
// against the RAG_project_ENSA code (file names cited), the thesis report
// (printed page numbers, "p.") and the release files in docs/evals/.
// Gates carry a hidden model answer that the Answer Coach grades against.
import type { CoachExercise } from '../services/coachService';

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
  gates: CoachExercise[];
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

const kp = (point: string, ...keywords: string[]) => ({ point, keywords });

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
      {
        id: 'g01-1',
        prompt:
          'A colleague says: "Just paste the Code du travail PDF into ChatGPT, it will answer HR questions fine." Using what you know about how an LLM produces text, explain the precise risk, and name the two behaviours SANAD adds to remove it.',
        modelAnswer:
          'The risk: an LLM writes the most plausible continuation of the text; it does not verify facts. So it can produce a confident, fluent answer that no passage supports, for example a wrong trial-period length or an invented article, and the reader has no way to check it (the New York lawyers with six invented rulings, Air Canada forced to honour an invented refund rule). SANAD adds two behaviours: (1) every answer shows its sources (file and section, opening the exact passage), and the code cannot build an answer without sources; (2) when the documents do not contain the answer, it refuses honestly ("not in the documents") instead of guessing. Both are measured before each release (G3 and G2).',
        keyPoints: [
          kp('LLM predicts plausible text, does not verify', 'plausib', 'predict', 'prédit', 'vérifi', 'verify', 'invent', 'guess', 'devine'),
          kp('Shows the source for every answer', 'source', 'cite', 'citation', 'passage'),
          kp('Refuses when the answer is not in the documents', 'refus', 'refuse', 'not in the doc', 'pas dans', "don't know", 'ne sait pas'),
        ],
        hints: [
          'When ChatGPT writes an answer, where does each word come from: from a lookup in your PDF, or from something else?',
          'Invariant: plausible ≠ verified. A product that makes answers trustworthy must (a) let the reader check every claim and (b) have a safe behaviour when there is nothing to check against.',
          'Similar case: a student who has not revised writes a confident essay. The teacher can only trust it if every claim has a page reference, and the student is allowed to write "not in the course" instead of inventing. Map these two rules onto SANAD.',
        ],
        misconceptions: [
          'Thinking the risk is only "the PDF is too long for the model" (context size), rather than the model inventing.',
          'Naming "local" or "privacy" as the fix for hallucination: those protect data, not truth.',
        ],
        source: 'Slides 1 and 3; report p.16 and p.30–31; prompts/answer-writer/PROMPT.md',
        juryVersionFr:
          'Un modèle de langage prédit un texte plausible, il ne vérifie rien. Il peut donc inventer une durée ou un article avec assurance, et le lecteur ne peut pas contrôler. Sanad ajoute deux comportements : chaque réponse montre sa source, et quand la réponse n’est pas dans les documents, il refuse au lieu de deviner.',
      },
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
      {
        id: 'g02-1',
        prompt:
          'Sort these six steps into "done once per document" or "done at every question", and say in one line why the split matters for speed:\n(a) convert the PDF to text (b) compute passage vectors (c) compute the question vector (d) store vectors in Qdrant (e) ask the LLM whether passages answer the question (f) write the answer.',
        modelAnswer:
          'Once per document (indexing, during Sync): (a) convert to text, (b) passage vectors, (d) store in Qdrant. At every question: (c) question vector, (e) grading by the LLM, (f) writing the answer. Why it matters: the expensive work on documents (conversion, embedding every chunk, about 0.29 s per chunk on a laptop CPU) is paid once at Sync, so a question only needs one small embedding, a search and a few LLM calls (median 8.3 s). And a second Sync of unchanged files is skipped (0.09 s).',
        keyPoints: [
          kp('a, b, d are once per document', 'once', 'une fois', 'sync', 'index'),
          kp('c, e, f are per question', 'every question', 'chaque question', 'per question', 'à chaque'),
          kp('Heavy document work is paid once, so questions are fast', 'fast', 'rapide', 'cost', 'coût', 'once', 'speed', 'vitesse', 'expensive', 'cher'),
        ],
        hints: [
          'Which of these steps needs the question to exist before it can run?',
          'Rule: anything that depends only on the documents can be computed in advance and stored; anything that depends on the question must wait for it.',
          'Similar case: a library catalogues each new book once (title card, shelf number). When a reader arrives, the librarian only looks up the reader’s request. Which of your six steps are "cataloguing"?',
        ],
        misconceptions: ['Putting "compute the question vector" in the indexing phase: the question does not exist yet.'],
        source: 'Slides 5 and 9; report p.32 and Table 6.4',
      },
      {
        id: 'g02-2',
        prompt:
          'A jury member says: "NotebookLM and AnythingLLM already do this. What exactly is your contribution?" Answer in 4–5 sentences, and include one thing the competitors do better.',
        modelAnswer:
          'Honestly, running locally is not unique: AnythingLLM and PrivateGPT also run on your machine, and NotebookLM reads illustrated documents better and accepts more sources. Our contribution is the combination: SANAD can run entirely locally (Ollama) so documents need not leave the organisation, its refusal is measured and published (20 out-of-corpus questions refused 20/20 at every version), and a release gate blocks any version whose scores fall below fixed thresholds. It also offers French and Arabic (right-to-left) interfaces, and a figure description is never used as evidence. The 20/20 is on our own frozen question set, so it is evidence about SANAD, not a head-to-head comparison.',
        keyPoints: [
          kp('Admits local is not unique / competitor strength', 'not unique', 'pas unique', 'notebooklm', 'better', 'mieux', 'anythingllm', 'privategpt'),
          kp('Measured and published refusal (20/20)', '20/20', '20 sur 20', 'refus', 'refusal'),
          kp('Release gate per version', 'gate', 'porte', 'release', 'version', 'seuil', 'threshold'),
          kp('Can run fully locally', 'local', 'ollama'),
        ],
        hints: [
          'If the jury opened AnythingLLM tomorrow, what could it NOT show them that you can show on slide 15?',
          'Invariant for a contribution claim: it must be something you can prove with a kept number, and you must not claim what others also do.',
          'Similar case: a new car brand can’t claim "has four wheels" as its contribution. It claims "crash-tested and published every year". What is SANAD’s published test?',
        ],
        misconceptions: ['Claiming "only SANAD runs locally" — the report’s own Table 2.1 says AnythingLLM and PrivateGPT do.'],
        source: 'Slide 5; report Table 2.1 and p.37',
        juryVersionFr:
          'Être local n’est pas propre à Sanad, et NotebookLM lit mieux les documents illustrés. Notre apport, c’est la combinaison : un mode entièrement local, un refus mesuré et publié à chaque version, et une porte qui bloque une version sous le seuil. Le 20 sur 20 porte sur notre propre jeu de questions : c’est une preuve sur Sanad, pas un match contre les autres.',
      },
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
      {
        id: 'g03-1',
        prompt:
          'Two candidate versions:\n• Version A: 35/40 grounded, 20/20 refused, 35/35 sourced, median 7 s.\n• Version B: 39/40 grounded, 19/20 refused, 39/39 sourced, median 25 s.\nDoes each one ship? Show the rule you apply to each number.',
        modelAnswer:
          'Neither ships. A: G1 needs at least 90% of 40, that is 36; 35/40 = 87.5% is below, so the gate blocks it even though G2, G3 and speed are fine. B: G2 requires all 20 out-of-corpus questions refused; 19/20 means one answer was given where the documents have nothing, so it is blocked. B’s 25 s median misses G4 (20 s), but G4 is non-blocking; it would be reported, not blocking. G3 is fine for both.',
        keyPoints: [
          kp('A fails G1 (35 < 36 / below 90%)', '36', '90', '87'),
          kp('B fails G2 (needs 20/20)', '19', '20/20', '20 sur 20', 'all 20', 'tous'),
          kp('Speed does not block', 'not block', 'ne bloque', 'non-blocking', 'non bloquant', 'g4'),
        ],
        hints: [
          'For version A, what is 90% of 40? For version B, how many refusals does G2 allow you to miss?',
          'Invariant: a release ships only if G1 ≥ 90% of 40 AND G2 = 20/20 AND G3 = 100%. Speed (G4/G5) is reported but never blocks.',
          'Similar case: a driving test fails you for one dangerous mistake no matter how well you parked. Which of SANAD’s goals behaves like "one dangerous mistake"?',
        ],
        misconceptions: ['Thinking B ships because 39/40 is a great G1 score.', 'Thinking the 25 s median blocks B.'],
        source: 'Slide 4; report Table 1.3 p.21; evaluation/gate.py',
      },
      {
        id: 'g03-2',
        prompt:
          'A jury member: "G3 at 100% is trivial, your code forces it. Why measure it at all?" Answer in 3–4 sentences.',
        modelAnswer:
          'Yes, G3 is guaranteed by construction: the Answer class raises an error if an answer has no sources, and the sources are built by code from the retrieved passages, not from the model’s text. We still measure it because a guarantee in code can be broken by a later change; measuring it at every release turns it into a regression check that the gate enforces. That is the lesson from the report: put the guarantee in the structure of the code, then prove it with a number. G3 says nothing about whether the answer is correct; that is G1.',
        keyPoints: [
          kp('Guaranteed by construction (Answer raises without sources)', 'construction', 'raise', 'exception', 'erreur', 'cannot be built', 'impossible'),
          kp('Measured as a regression check', 'regression', 'régression', 'future change', 'changement', 'break', 'casse'),
          kp('G3 is not correctness; G1 is', 'g1', 'grounded', 'fondé', 'correct'),
        ],
        hints: [
          'What could happen to that guarantee six months from now, when someone edits agent/state.py?',
          'Invariant: a guarantee you never test is a guarantee you only believe in. Tests and gates exist to catch the day it breaks.',
          'Similar case: a car’s seatbelt warning is built in, yet every crash test still checks it works. Why?',
        ],
        source: 'agent/state.py (Answer.__post_init__); report Table 4.4 p.56 and p.81',
      },
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
      {
        id: 'g04-1',
        prompt:
          'In CLOUD mode, a user asks one question. List exactly what leaves the machine, and name three things that never leave. Then say what changes in LOCAL mode.',
        modelAnswer:
          'Cloud mode, during a question: the question (and the conversation summary used to understand it) and the retrieved passages/sections are sent to Gemini, because the LLM summarises, plans the searches, grades the passages, possibly rewords, and writes the answer. Never leaves: the document files themselves, the vectors/index (E5 and BM25 run on the local CPU and Qdrant is embedded), the SQLite database (accounts, history, evaluations), and the stored parent sections as a whole. During Sync, figure images can be sent to the model if figure descriptions are enabled. Local mode (Ollama): the LLM runs on the machine, so nothing leaves at all.',
        keyPoints: [
          kp('Question goes to the LLM', 'question'),
          kp('Retrieved passages go to the LLM', 'passage', 'section', 'extrait'),
          kp('Files / index / vectors / database stay local', 'file', 'fichier', 'index', 'vector', 'vecteur', 'sqlite', 'database', 'base'),
          kp('Local mode: nothing leaves', 'nothing', 'rien', 'ollama'),
        ],
        hints: [
          'Which component in the diagram is the only one drawn outside the machine, and what does it need to receive to write an answer?',
          'Invariant: embeddings are computed locally; only LLM calls leave, and they carry whatever text the LLM must read.',
          'Similar case: you ask an outside translator to translate one paragraph of a contract. What do they see, and what stays in your filing cabinet?',
        ],
        misconceptions: ['Saying the vectors or embeddings are computed by Gemini: E5 and BM25 run locally.', 'Saying "nothing leaves" without distinguishing the two modes.'],
        source: 'Slide 8; report Table 3.7 p.43 and Table 4.7 p.60; config.py',
      },
      {
        id: 'g04-2',
        prompt:
          'Why embedded Qdrant + SQLite instead of a Qdrant server + PostgreSQL? Give two benefits and the cost you accepted, as you would to the jury.',
        modelAnswer:
          'Benefits: nothing extra to install or administer, since Qdrant runs as a library inside the Python process and SQLite is a file, so one person can start SANAD with one command and all data stays in one local folder; and one collection per workspace gives structural isolation between workspaces. For a two-person team on a short timeline, zero administration mattered most. Accepted cost: only one process can open the embedded index at a time and SQLite does not handle concurrent writes well, so it does not scale to many simultaneous users. To scale, we would move to a Qdrant server and PostgreSQL.',
        keyPoints: [
          kp('No server to install / one command / zero admin', 'server', 'serveur', 'install', 'one command', 'une commande', 'admin', 'simple'),
          kp('Isolation: one collection per workspace, or data local', 'collection', 'isolation', 'local', 'workspace', 'espace'),
          kp('Cost: one process / no concurrent writes / scaling', 'one process', 'un seul processus', 'concurr', 'scale', 'charge', 'multi'),
        ],
        hints: [
          'What would a new user have to install and run before using SANAD if the index were a separate server?',
          'Rule of thumb: an embedded database trades scalability for simplicity. Name the simplicity, then the scalability you lose.',
          'Similar case: a notebook in your bag vs. a shared online spreadsheet. The notebook needs no setup, but what can’t two people do with it at once?',
        ],
        source: 'Slide 8; report Table 4.9 p.61',
      },
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
      {
        id: 'g05-1',
        prompt:
          'Yesterday you synced a folder. Today: A.pdf is untouched, B.docx was edited, C.pdf is new, and D.txt was deleted from the folder. Say what Sync does with each file, and explain why B’s old data must be deleted BEFORE B is re-indexed.',
        modelAnswer:
          'A.pdf: same SHA-256 fingerprint → unchanged → skipped (report row "unchanged"). B.docx: different fingerprint → changed → delete its old data (vectors first, then parent sections), then convert, chunk, write parents, write vectors (row "changed"). C.pdf: no previous fingerprint → new → convert, chunk, write parents then vectors (row "added"). D.txt: known before but missing now → removed → its vectors and parents are deleted (row "removed"). B must be cleaned first because otherwise passages from the old version could stay in the index and be retrieved and cited as if they were current: stale text served as a source.',
        keyPoints: [
          kp('Unchanged skipped via fingerprint/hash', 'skip', 'ignor', 'unchanged', 'inchang', 'hash', 'sha', 'empreinte'),
          kp('Changed: delete old then re-index', 'delete', 'supprim', 'changed', 'modifi'),
          kp('New indexed, removed deleted', 'new', 'nouveau', 'added', 'ajout', 'removed', 'retir', 'supprim'),
          kp('Reason: stale/old text would be cited', 'stale', 'old', 'ancien', 'périmé', 'perime', 'obsolete', 'outdated'),
        ],
        hints: [
          'How does Sync know A.pdf didn’t change without reading its text again? And what would the index contain for B if you only ADDED the new version?',
          'Invariant: the index must never contain text that is no longer in the documents, because anything in the index can be cited.',
          'Similar case: you update a price list in a shop. If you put the new labels up without removing the old ones, what can a customer end up reading?',
        ],
        misconceptions: ['Thinking Sync compares modification dates or file names.', 'Thinking the new version simply overwrites the old passages automatically.'],
        source: 'change_detection.py (ChangeStatus); sync.py docstring rules 1–3; report p.51–52',
      },
      {
        id: 'g05-2',
        prompt:
          'The server loses power in the middle of indexing a document. Explain why writing parent sections FIRST and vectors LAST means a user can never receive a citation that points to nothing. What does the worst case look like instead?',
        modelAnswer:
          'Search only finds things through vectors, and each vector points to a parent section. If parents are written first and the crash happens before the vectors, the parents exist but no vector points to them: they are orphan files, invisible to search, and overwritten by the next Sync. Harmless. If the order were reversed (vectors first), a crash could leave vectors pointing to parent sections that were never written; a question could then retrieve them and cite a section that does not exist. Deletion uses the mirror order (vectors first, then parents) for the same reason. And as a last floor, if a retrieved passage’s section cannot be read at answer time, the graph refuses with a "run a Sync" message instead of answering.',
        keyPoints: [
          kp('Search goes through vectors, vectors point to parents', 'vector', 'vecteur', 'point', 'pointe'),
          kp('Crash before vectors leaves orphan parents invisible to search', 'orphan', 'orphelin', 'invisible', 'nothing points', 'rien ne pointe'),
          kp('Reverse order would create broken/dangling citations', 'broken', 'dangling', 'cass', 'vide', 'does not exist', "n'existe pas", 'missing'),
        ],
        hints: [
          'At question time, which store does SANAD search first: the vectors or the parent files? What does a vector carry that leads to a parent?',
          'Invariant: a user can only be shown what search can reach, and search reaches parents only through vectors.',
          'Similar case: a library adds a book to its shelves before adding the catalogue card. If the power cuts in between, what is the worst a reader experiences? And in the other order?',
        ],
        source: 'sync.py module docstring ("PARENTS FIRST, THEN VECTORS"); agent/nodes.py REFUSAL_TEXT_UNREADABLE; report p.57–58',
      },
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
      {
        id: 'g06-1',
        prompt:
          'Two alternative designs are proposed: (1) embed and search whole 3,000-character sections directly; (2) search 500-character children and give the writer ONLY those children. Explain what goes wrong with each, and why SANAD’s design avoids both problems.',
        modelAnswer:
          'Design 1: one vector per 3,000-character section averages several ideas into one blurry point, so a precise question matches less well and the right section can be missed; retrieval precision drops. Design 2: search is precise, but a 500-character child can be cut mid-sentence or stop before the decisive detail (exactly what happens to the grader in question 33), and it lacks the context to cite the article correctly, so the writer answers badly or refuses. SANAD does both: it searches the 500-character children (sharp vectors), then loads the whole parent section of each hit, once per parent, and the writer answers from those full sections. Search small, read big.',
        keyPoints: [
          kp('Big chunks: diluted/blurry vector, worse retrieval', 'dilut', 'blur', 'flou', 'average', 'moyenne', 'several ideas', 'plusieurs idées', 'precision', 'précision'),
          kp('Small chunks alone: cut context, missing detail', 'cut', 'coup', 'context', 'contexte', 'missing', 'manque', 'incomplete'),
          kp('SANAD: search children, read full parent section', 'parent', 'section', 'search small', 'chercher petit', 'read big', 'lire grand'),
        ],
        hints: [
          'A vector is ONE point representing a whole text. What happens to that point when the text talks about five different things?',
          'Invariant: search wants one idea per unit; answering wants the full context. One size cannot satisfy both.',
          'Similar case: to find a recipe you scan the index of a cookbook (short entries), but to cook you read the whole page. What would go wrong if the index entries were whole pages, or if you cooked from the index entry alone?',
        ],
        misconceptions: ['Saying Qdrant cannot store long texts: storage size is not the reason, meaning dilution is.'],
        source: 'Slide 9; chunking.py; config.py; report p.52',
      },
      {
        id: 'g06-2',
        prompt:
          'What is the 100-character overlap between children for? Invent a concrete example of what could break if the overlap were 0.',
        modelAnswer:
          'Consecutive children share 100 characters so that a sentence falling on a boundary appears whole in at least one child. Example with overlap 0: the text "La période d’essai des cadres est de trois mois, | renouvelable une seule fois" is cut at "|". Child 1 ends with "est de trois mois," and child 2 starts with "renouvelable une seule fois". A question about renewal could match child 2, which no longer says what is being renewed, and neither child holds the full rule, so matching gets weaker. With overlap, the boundary sentence is kept whole in one child. (The writer still reads the whole parent, so overlap mainly protects search and grading.)',
        keyPoints: [
          kp('Overlap keeps boundary sentences whole', 'boundary', 'frontière', 'limite', 'whole', 'entier', 'complète', 'cut', 'coup'),
          kp('Concrete example of a sentence split across two children', 'sentence', 'phrase', 'example', 'exemple'),
        ],
        hints: [
          'Imagine cutting a text every 500 characters with scissors, blind. Where can the scissors land?',
          'Invariant: a passage can only match a question if the idea it needs is written inside that passage.',
          'Similar case: photographing a long wall in several shots, you let the photos overlap so no window is cut in two in every photo. Apply that to sentences.',
        ],
        source: 'config.py chunk_child_overlap_chars = 100; chunking.py',
      },
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
      {
        id: 'g07-1',
        prompt:
          'Two users: one asks "Que dit l’article 14 ?", the other "Mon patron peut-il me renvoyer sans motif ?" (the Code uses "licenciement", never "renvoyer"). Which half of the hybrid search rescues each question, and why does SANAD fuse the two lists by rank rather than by adding their scores?',
        modelAnswer:
          '"Article 14" is an exact identifier: BM25 keyword search finds passages containing "Article 14", while a meaning vector could return other articles about similar topics. "Renvoyer sans motif" shares no words with "licenciement", so keyword search misses it; the E5 dense vectors place both near each other by meaning, so dense search rescues it. The scores can’t be added because they are on different scales (a cosine similarity versus an unbounded BM25 score), so a sum would be dominated by whichever scale is larger. RRF uses only each passage’s rank position in each list (a sum of 1/(k + rank)), so both lists count fairly and a passage ranked well by both rises to the top.',
        keyPoints: [
          kp('Article 14 → keyword/BM25', 'bm25', 'keyword', 'mot', 'exact', 'lexical', 'sparse'),
          kp('Renvoyer vs licenciement → dense/meaning/E5', 'dense', 'meaning', 'sens', 'e5', 'vector', 'vecteur', 'sémantique', 'semantic'),
          kp('Scores on different scales, RRF uses ranks', 'scale', 'échelle', 'echelle', 'rank', 'rang'),
        ],
        hints: [
          'Does the second question share any word with the article that answers it? What kind of search can match without shared words?',
          'Invariant: you can only add two numbers meaningfully if they are on the same scale. What does RRF keep from each list instead of the score?',
          'Similar case: merging two school rankings where one grades out of 20 and the other out of 100. Adding raw marks is unfair; comparing positions (1st, 2nd…) is not. Apply that here.',
        ],
        misconceptions: ['Saying E5 finds "article 14" better because it is "smarter".', 'Saying RRF averages the similarity scores.'],
        source: 'Slide 9; embeddings.py; vector_store.py search_with_vectors; report p.33, p.56',
      },
      {
        id: 'g07-2',
        prompt:
          'A new team member "cleans up" the code and removes the "query: " prefix before embedding questions. All the tests that check for crashes still pass. What actually happens, and how does SANAD catch it?',
        modelAnswer:
          'Nothing crashes: E5 still returns 768 numbers. But E5 was trained with the prefixes ("query: " for questions, "passage: " for documents), so a question without its prefix lands in a slightly wrong region of the vector space. Dense retrieval silently gets worse: the right passages rank lower and more questions end in refusals or weaker answers. A silent quality drop is the most dangerous kind of bug, so SANAD has a test that fails if any text is embedded without its prefix. The evaluation’s G1 score would also drop at the next release gate.',
        keyPoints: [
          kp('No crash, silent quality drop', 'silent', 'silenc', 'no crash', 'pas de crash', 'no error', "pas d'erreur", 'worse', 'pire', 'dégrad', 'degrad'),
          kp('E5 was trained with query/passage prefixes', 'trained', 'entraîn', 'entrain', 'prefix', 'préfixe'),
          kp('A test enforces the prefix (or the gate catches it)', 'test', 'gate', 'porte'),
        ],
        hints: [
          'Would Python raise an error? What does the model still return, and is that output still "right"?',
          'Invariant: E5 compares "query: …" vectors against "passage: …" vectors because that is how it was trained. Break the pairing and the geometry is off.',
          'Similar case: a translator trained to always receive "FR→EN:" before the text. Remove the tag and they still produce something, just less reliably. How would you detect that automatically?',
        ],
        source: 'config.py embedding_query_prefix / embedding_passage_prefix; embeddings.py; docs/defense/jury-questions.md Q9',
      },
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
      {
        id: 'g08-1',
        prompt:
          'A technician asks for the voltage of a component that appears ONLY in a wiring diagram, not in the text. SANAD shows the diagram but refuses to state the voltage. A jury member calls this a bug. Defend it as a design decision, including the cost you accepted.',
        modelAnswer:
          'It is deliberate. The figure’s description is written by a model that interprets the image; it can misread a plan. If that description were used as evidence, SANAD could state a wrong voltage with a source attached, which is indistinguishable from a correct sourced answer and exactly the failure the product exists to prevent. So the description only helps search find and display the figure; the grader and writer read document text only. The accepted cost: a detail that exists only in an image gets a refusal. The figure is still displayed with its caption and page, so the technician can read the value themselves. Figure answers are also not yet measured (no frozen figure set), another reason not to let them carry claims.',
        keyPoints: [
          kp('Description is a model interpretation that can be wrong', 'misread', 'mal lu', 'interpret', 'wrong', 'faux', 'erreur', 'error'),
          kp('Never used as evidence / only text is evidence', 'evidence', 'preuve', 'never', 'jamais', 'text only', 'texte'),
          kp('Cost: image-only details are refused, figure still shown', 'refus', 'cost', 'coût', 'shown', 'montr', 'affich', 'displayed'),
        ],
        hints: [
          'Who produced the text that says what the diagram contains? Could that text be wrong, and would the user be able to tell?',
          'Invariant: a claim may only rest on the document’s own text, the same text the judge checks.',
          'Similar case: a witness describes a photo to a court. The court shows the photo itself as the exhibit, and the description is not treated as evidence. Why?',
        ],
        source: 'Slide 11; report Table 4.4 p.56, Table 4.9 p.61; figures.py',
      },
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
    explain: `SANAD's agent is not a chatbot that "decides" freely. It is a fixed graph of nine nodes (agent/graph.py). Each node reads a shared state (the question, the queries, the passages…), does one job, and adds a step to the trace.

1. summarize: compress the earlier conversation into a short summary (max 2,000 characters), so a follow-up like "et pour un ouvrier ?" is understood.
2. rewrite (the planner): either decide the question is too vague, or turn it into 1–5 standalone search queries.
3. clarify: if vague, ask the user ONE clarifying question and stop. A clarification can only happen once per question (clarification_used).
4. retrieve: hybrid search for each query, one trace step per query.
5. grade: an LLM decides whether the passages actually address the question: RELEVANT or OFF_TOPIC. No passages at all counts as off-topic without calling the model.
6. reword: if off-topic, reformulate the queries and go back to retrieve. At most 2 rewords (retry_ceiling = 2, read from config at every decision).
7. fetch_parents: load the full sections of the relevant passages.
8. answer: the writer answers from those sections, with sources.
9. refuse: the honest refusal. It lists the searches that were tried.

Three endings are possible: an answer, a clarifying question, or a refusal. ask() in graph.py is the only place an Answer object is built, and the trace is always attached.

Why LangGraph and not a hand-written loop (ADR-03)? The flow has a loop (reword → retrieve → grade) and branches (clarify or search; answer, reword or refuse). A graph makes the retry ceiling and the refusal path explicit and testable, and it gives a trace of every step for free. The cost is one more framework to learn.`,
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
      {
        id: 'g09-1',
        prompt:
          'List the nodes visited, in order, for each case:\n(a) a clear question whose passages are relevant at the first search;\n(b) a vague first question ("et pour les congés ?" with no context);\n(c) a question on a topic absent from the documents, where every search comes back off-topic (default settings).',
        modelAnswer:
          '(a) summarize → rewrite → retrieve → grade (relevant) → fetch_parents → answer → END (kind: answer). (b) summarize → rewrite (judged ambiguous) → clarify → END (kind: clarification, one question asked; it cannot happen twice for the same question). (c) summarize → rewrite → retrieve → grade (off-topic) → reword → retrieve → grade (off-topic) → reword → retrieve → grade (off-topic, ceiling of 2 rewords reached) → refuse → END (kind: refusal, listing the searches tried).',
        keyPoints: [
          kp('(a) ends with fetch_parents → answer', 'fetch_parents', 'fetch', 'parents', 'answer'),
          kp('(b) goes to clarify and stops', 'clarif'),
          kp('(c) two rewords then refuse', 'reword', 'reformul', 'refus', 'two', 'deux', '2'),
        ],
        hints: [
          'Start every path at summarize. Which node decides between clarify and retrieve, and which node decides between answering, rewording and refusing?',
          'Invariant: route_after_grade sends RELEVANT → fetch_parents; OFF_TOPIC with rewords < 2 → reword; otherwise → refuse. route_after_rewrite sends vague → clarify.',
          'Similar case: a help-desk script says "If unclear, ask one question. Otherwise look it up; if the files don’t match, rephrase at most twice; then either answer from the file or say we don’t have it." Write the steps for a caller whose topic isn’t in the files.',
        ],
        misconceptions: ['Putting "answer" before "fetch_parents".', 'Letting case (c) loop more than twice, or refusing after the first miss.'],
        source: 'agent/graph.py build_graph; agent/nodes.py route_after_* ; slide 10',
      },
      {
        id: 'g09-2',
        prompt: 'A jury member: "Why use LangGraph? A while-loop in Python would do the same." Give the reason and the cost.',
        modelAnswer:
          'A while-loop could do it, but our flow has a loop (reword then search again) and several branches (clarify or search; answer, reword or refuse). LangGraph makes each step a named node and each branch an explicit edge, so the retry ceiling and the refusal path are visible and testable one by one, and every step lands in the trace the user can inspect. That was the decision recorded as ADR-03. The cost is one more framework to learn and pin, and some ceremony. We checked its recursion limit on the pinned version so a higher retry ceiling can’t crash it.',
        keyPoints: [
          kp('Loop and branches made explicit', 'loop', 'boucle', 'branch', 'branche', 'explicit', 'explicite', 'visible'),
          kp('Testable / retry ceiling / trace', 'test', 'trace', 'ceiling', 'plafond', 'limite'),
          kp('Cost: extra framework/dependency', 'framework', 'dependency', 'dépendance', 'cost', 'coût', 'learn', 'apprendre'),
        ],
        hints: [
          'In a plain loop, where would a reader find the rule "at most two rewords"? In the graph, where is it?',
          'Invariant: design choices are defended by what they make checkable. What can you test node by node that is buried in a loop?',
          'Similar case: a recipe written as one long paragraph vs. numbered steps with "if the dough is sticky, go back to step 3 (max twice)". Which is easier to audit?',
        ],
        source: 'agent/graph.py docstring (ADR-03); report Table 4.9 p.61',
      },
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
    explain: `This is the heart of the project: SANAD is allowed to say no.

The grader (prompts/relevance-grader) receives the question and the retrieved passages and must reply with ONE word: RELEVANT if at least one passage helps answer, even partially, or OFF_TOPIC. Its prompt insists: "A passage that merely mentions the same subject is not enough." It is told that a false RELEVANT, which leads to a confident wrong answer, is worse than saying nothing was found.

The loop (route_after_grade):
• RELEVANT → fetch the parent sections and answer.
• OFF_TOPIC and fewer than 2 rewords so far → reword the queries and search again.
• OFF_TOPIC and the ceiling is reached → refuse.

The refuse node calls no model. The refusal is what the graph does when the grader has said no as many times as allowed, and it lists the searches tried (slide 12 shows seven: up to 5 planned queries plus rewords).

There are three roads to a refusal:
1. The grader says OFF_TOPIC three times (initial search + 2 rewords), or nothing was found.
2. The passages were relevant, but their sections could not be read. This gives a different message: "run a Sync".
3. The writer reads the sections and replies NOT_COVERED, because they don't actually answer. This is still an honest refusal, never an answer whose text says "I don't know".

Question 33 (g-in-033) is the one remaining failure. The answer (a one-month delay) is in Article 66, and the search even found it at rank 1. But the grader reads the 500-character child passages, and the relevant child stops just before the delay. So the grader says OFF_TOPIC three times, and the rewording drifted to French-France terms like "CSE". SANAD refuses: a cautious refusal, not an invention. The planned fix is to let the grader read the whole section, like the writer does, then re-check that 20/20 still holds.`,
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
      {
        id: 'g10-1',
        prompt:
          'With the default configuration, a question is off-topic every time. (1) How many search rounds, grading decisions and rewords happen before the refusal? (2) An operator sets RETRY_CEILING=3. What changes, and why can it take effect without restarting the graph code?',
        modelAnswer:
          '(1) Default retry_ceiling = 2: 3 search rounds (the first plus 2 rewords), 3 grading decisions, 2 rewords, then refuse. (2) With 3: 4 search rounds, 4 grades, 3 rewords, then refuse. It takes effect because route_after_grade reads get_settings().retry_ceiling at every decision and compares it with the number of rewords counted in the trace; nothing is hard-coded or captured when the graph is built. (Each round may run up to 5 queries, so the number of individual searches can be higher.)',
        keyPoints: [
          kp('Default: 3 rounds / 3 grades / 2 rewords', '3', 'three', 'trois'),
          kp('Ceiling 3: 4 rounds / 3 rewords', '4', 'four', 'quatre'),
          kp('Ceiling read from config at each decision', 'config', 'settings', 'each decision', 'chaque décision', 'runtime', 'not hard', 'pas en dur'),
        ],
        hints: [
          'Is the first search a "reword"? Count the first round separately from the retries.',
          'Invariant: route_after_grade sends to reword while rewords < retry_ceiling; each reword is followed by one more retrieve and one more grade.',
          'Similar case: "you may retake the exam at most 2 times". How many times can a student sit the exam in total? And with 3 retakes?',
        ],
        misconceptions: ['Counting only 2 search rounds (forgetting the first).', 'Thinking the ceiling is fixed in graph.py.'],
        source: 'agent/nodes.py route_after_grade; config.py retry_ceiling = 2',
      },
      {
        id: 'g10-2',
        prompt:
          'Explain question 33 to the jury in under a minute: what the answer is and where it lives, exactly which step fails and why, why it is a "safe" failure, what the fix is, and why you did not ship the fix before the defense.',
        modelAnswer:
          'Question 33 (g-in-033) asks about a delay whose answer, one month, is in Article 66, and the search actually finds Article 66 at rank 1. The failure is in the grading step. The grader reads the 500-character child passages, and the relevant passage stops just before the one-month delay, so the grader judges it off-topic. It says so in all three rounds (rewording even drifted to French-France vocabulary), and SANAD refuses. It is a safe failure: SANAD declined, it did not invent. The fix is to let the grader read the whole parent section, as the writer already does. We did not ship it before the defense because it changes grading for every question and could break the 20/20 refusals; it must be re-evaluated through the gate first. It is planned at one month, with success defined as 40/40 while keeping 20/20.',
        keyPoints: [
          kp('Answer is in Article 66 (one month)', '66', 'un mois', 'one month'),
          kp('Grader reads 500-char child that stops before the answer', 'grader', 'vérif', 'verif', '500', 'child', 'extrait', 'passage'),
          kp('Safe: refusal, not invention', 'safe', 'prudent', 'not invent', "n'invente", 'refus'),
          kp('Fix: grader reads full section; risk to 20/20 so re-evaluate first', 'full section', 'section entière', 'section complète', 'whole', '20/20', '20 sur 20'),
        ],
        hints: [
          'Did the search find the right article? If yes, which later step in the graph could still reject it, and what text does that step read?',
          'Invariant: the grader and the writer do not read the same amount of text. The writer reads full sections, and the grader reads the retrieved 500-character passages.',
          'Similar case: a receptionist glances at the first line of a letter and decides it is not for the manager, although the key sentence is on line six. What would you change, and what new risk does it create?',
        ],
        misconceptions: ['Saying the search failed to find Article 66.', 'Calling it a hallucination: it is a refusal.'],
        source: 'Slides 17 and 21; docs/evals/v1.0.1-g1-triage.md; report p.77 and Table C.1 p.81',
        juryVersionFr:
          'La réponse est un délai d’un mois, à l’article 66, et la recherche le trouve en premier. Mais l’étape qui vérifie lit un extrait de 500 caractères qui s’arrête juste avant ce délai : elle le juge hors sujet trois fois, et Sanad refuse. C’est un refus prudent, pas une invention. Le remède est de faire lire la section entière au vérificateur, puis de vérifier que les 20 refus sur 20 tiennent toujours.',
      },
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
    explain: `The writer (prompts/answer-writer) receives the question and the full sections, and nothing else. Its rules:
• Answer only from the sections, in the question's language.
• Copy numbers, durations and article numbers EXACTLY.
• Name the article in the sentence ("Article 13 fixe…"), but NEVER write bracketed references like [1], because a number it makes up points at nothing.
• If the sections don't answer, reply exactly NOT_COVERED. The graph turns that into a refusal.

The sources are not written by the model. In make_answer, one tuple, cited, holds the passages whose sections were actually loaded. It is BOTH what the writer is shown AND what the source cards are built from. So a source card can only point to a section the writer really read. An earlier version cited all 5 passages even when only 4 sections loaded; that bug is why one tuple now does both jobs.

The last lock: Answer.__post_init__ raises an error if an answer of kind "answer" has no sources, and the classes are frozen (immutable) after construction.

In the interface, each numbered source opens the exact passage, highlighted in the document. A source link only opens from the conversation that received it.

Memory: the summarize node keeps a rolling summary (max 2,000 characters) plus recent turns, so follow-up questions work. History is private per person and kept 30 days.

Streaming: the answer appears progressively. But the writer might output NOT_COVERED, so the first 40 characters are held back (STREAM_HOLD_CHARS = 40). This way the user never sees "NOT_COV…" start as if it were an answer before it turns into a refusal.

Legal workspaces add a disclaimer (F-09): SANAD is not legal advice.`,
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
      {
        id: 'g11-1',
        prompt:
          'The model misbehaves and writes: "Selon l’article 99 [3], la période d’essai est de six mois", although Article 99 was never retrieved. Can "Article 99" appear in the SOURCE LIST shown to the user? Walk through why. And what, if anything, would catch the wrong sentence itself?',
        modelAnswer:
          'No. The source list is not parsed from the model’s text. make_answer builds the sources with _sources_for(cited), where cited is the set of retrieved passages whose parent sections were actually loaded, the same set the writer was shown. Article 99 was never retrieved, so it cannot become a source card, and the "[3]" points to nothing (the prompt forbids such references). The sentence itself, though, is still in the answer text. What catches it is the evaluation: the judge checks every claim of the answer against the cited sections, so an unsupported "six mois / Article 99" makes that answer fail G1, and the release gate blocks the version if too many answers fail. In live use, the user can open each source and see the claim isn’t there.',
        keyPoints: [
          kp('Sources built by code from retrieved/cited passages', 'code', 'cited', 'retrieved', 'récupér', 'retrouv', 'built', 'construit'),
          kp('Not parsed from the model text', 'not from', 'pas du', 'not parsed', 'model text', 'texte du modèle'),
          kp('The wrong sentence is caught by the judge / G1 / gate', 'judge', 'juge', 'g1', 'gate', 'porte', 'groundedness', 'évaluation'),
        ],
        hints: [
          'Look at make_answer: what variable are the source cards built from, and does it ever look at the text the model returned?',
          'Invariant: sources come from retrieved and loaded passages, never from model output. A different mechanism checks whether the prose is faithful.',
          'Similar case: a student’s bibliography is generated automatically from the library books they actually checked out. Can a fake book appear in it? Can the student still misquote a real book, and who catches that?',
        ],
        misconceptions: ['Saying the sentence cannot appear at all: the prose can still be wrong; the SOURCE LIST cannot.'],
        source: 'agent/nodes.py make_answer; prompts/answer-writer/PROMPT.md; evaluation/scoring.py',
      },
      {
        id: 'g11-2',
        prompt: 'Why does SANAD hold back the first 40 characters when it streams an answer? Describe what the user would see without it.',
        modelAnswer:
          'The writer is allowed to reply exactly "NOT_COVERED" when the sections don’t answer, and that must become a refusal. If tokens were streamed immediately, the user would first see "NOT_COV…" appear as if an answer were starting, and then it would turn into a refusal: confusing, and it looks like a broken answer. Holding back the first 40 characters (STREAM_HOLD_CHARS) gives the app enough text to know whether this is NOT_COVERED before showing anything; once it clearly isn’t, the rest streams normally.',
        keyPoints: [
          kp('Writer may reply NOT_COVERED', 'not_covered', 'not covered'),
          kp('Otherwise the user would see the start of a fake answer', 'see', 'voir', 'fake', 'start', 'début', 'confus', 'flash'),
          kp('Hold back until it is clear, then stream', 'hold', 'retien', 'wait', 'attend', '40'),
        ],
        hints: [
          'What special reply can the writer produce instead of an answer? What does it look like as it arrives letter by letter?',
          'Invariant: the user must never see answer text for something that ends as a refusal.',
          'Similar case: a TV live broadcast with a few seconds of delay so the producer can cut a problem before it airs. What is the "problem" here?',
        ],
        source: 'agent/answering.py STREAM_HOLD_CHARS; report p.66',
      },
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
    explain: `A chosen demo proves nothing: you can always pick questions that work. So SANAD is measured like an exam.

The question set (evaluation/golden/batch1–3.jsonl): 60 questions in French about the HR corpus, about 200 pages. The corpus is the Code du travail, the dahir 1-72-184 (social security) and a CNSS/CLEISS guide.
• 40 in-scope questions: the answer IS in the documents (e.g. the trial period of a manager).
• 20 out-of-scope questions: the answer is NOT there. They are neighbouring topics, not silly ones: income tax, remote work (absent from the Code), "rupture conventionnelle", and a trap mixing up article 33 of two different texts.
They were written by Meriem and frozen before any tuning, so the system could not be tuned to the test. Two questions were corrected after the freeze (one "out-of-scope" question actually had its answer in article 156 and was reclassified; one about article 240 was replaced). The corrections were versioned and documented (issue #88). The system was right; the dataset was wrong.

The judge: RAGAS was planned, but it would not install with the pinned LangChain versions (checked by running it). A written change request replaced it with an in-house LLM judge (prompt eval-judge, evaluation/scoring.py). For each answer, it receives the question, the answer and exactly the sections the writer saw, and gives a groundedness score from 0 to 1. G1 counts an answer only if it scores a full 1.00.

G2 does not depend on the judge. A refusal is read mechanically from answer_kind = refusal. G3 is structural.

The gate: evaluation/gate.py re-derives G1–G3 from the report, and scripts/release_gate.py exits with an error if a threshold is missed. The evaluation runs as a manual GitHub workflow, because it spends API credits.

Weak points to own: the judge is the same Gemini model that wrote the answers (self-preference risk). It does not see the reference answers. All 39 answered questions scored exactly 1.00, so it shows little discrimination. There are no retrieval metrics (recall@k), and only one run per version.`,
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
      {
        id: 'g12-1',
        prompt: 'Jury: "Your judge is Gemini grading Gemini. Why should we believe 39/40?" Give an honest answer that admits the weakness, then gives what limits it and the planned fix.',
        modelAnswer:
          'The bias is real: a judge from the same model family can favour that family’s answers, and our judge even gave every answered question exactly 1.00. We declare it as a limit. Four things limit it. First, the judge sees exactly the sections the writer saw and must find every claim in them, and G1 counts only a perfect 1.00. Second, we read the low-scoring and failed answers by hand, question by question (the triage documents). Third, G2, the 20/20 refusals, does not depend on the judge at all: it is read from the answer type. Fourth, G3 is structural. The planned fix, at six months, is a second judge from another model family plus 20 answers graded by hand to measure agreement.',
        keyPoints: [
          kp('Admits same-family / self-preference bias', 'bias', 'biais', 'same family', 'même famille', 'self', 'auto'),
          kp('Mitigation: sees exactly the cited sections / full 1.0 / manual triage', 'section', '1.0', '1,0', 'hand', 'main', 'triage', 'manual'),
          kp('G2 does not depend on the judge', 'g2', 'refus', 'answer_kind', 'mechan', 'mécan'),
          kp('Plan: second judge from another family + human grading', 'second judge', 'second juge', 'another family', 'autre famille', 'human', 'humain'),
        ],
        hints: [
          'Which of your three promises actually needs the judge, and which ones don’t?',
          'Rule for defending a weak point: (1) admit it plainly, (2) show what limits its damage, (3) give the fix and how you would measure it.',
          'Similar case: a teacher grades their own students’ exams. What would you ask for to trust the grades: a second marker? A sample regraded by someone else? Map that onto SANAD.',
        ],
        misconceptions: ['Denying the bias.', 'Claiming the judge also decides the refusals.'],
        source: 'Slide 17; report p.36, p.74, Table 6.7, Table C.1; evaluation/scoring.py',
        juryVersionFr:
          'Le biais existe : le juge vient de la même famille que le modèle noté, et nous le déclarons comme limite. Il est encadré : le juge voit exactement les sections que le rédacteur a vues, il faut une note parfaite de 1,0, et nous relisons les échecs à la main. Surtout, les 20 refus ne dépendent pas du juge : ils sont lus dans le type de réponse. La suite prévoit un second juge d’une autre famille et vingt réponses notées à la main.',
      },
      {
        id: 'g12-2',
        prompt: 'Why write and freeze the 60 questions BEFORE tuning anything? And how do you answer a jury member who found that two questions were changed after the freeze?',
        modelAnswer:
          'If you tune while looking at the test questions, you can make the system pass those exact questions (tweak a prompt for question 12, a threshold for question 30) without it getting better in general. That is overfitting the test, and the score stops meaning anything. Freezing first makes the score an honest estimate on unseen questions. On the two changes: they are real and documented. One "out-of-scope" question actually had its answer in article 156 and was reclassified; another, about article 240, was replaced. Each was versioned with its history (issue #88) and the earlier version was re-measured on the new set. In both cases the dataset was wrong and SANAD was right: we corrected the exam, not the system.',
        keyPoints: [
          kp('Tuning on the test inflates the score (overfitting)', 'overfit', 'sur-apprentissage', 'surapprentissage', 'tune', 'réglage', 'inflat', 'gonfl', 'teach to the test'),
          kp('Two corrections: art. 156 reclassified, art. 240 replaced', '156', '240', 'two', 'deux'),
          kp('Versioned and documented; dataset wrong, not system', 'version', 'document', '#88', 'dataset', 'jeu', 'not the system', 'pas le système'),
        ],
        hints: [
          'If you could see question 12 while editing the prompt, what would stop you from editing it just for question 12?',
          'Invariant: a test measures generalisation only if it is fixed independently of the tuning.',
          'Similar case: a teacher gives the exact exam questions to study the night before. The class average goes up. Did learning improve?',
        ],
        source: 'Slide 14; report p.73; evaluation/golden/README.md',
      },
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
    explain: `The five releases (docs/evals/release-*.json, report Table 6.2):
| Version | Date | G1 grounded | G2 refused | G3 sourced | Failing in-scope ids |
| 1.0.0 | 12 Sep | 36/40 | 20/20 | 36/36 | 014, 026, 033, 040 |
| 1.0.1 | 12 Sep | 37/40 | 20/20 | 37/37 | 014, 026, 033 |
| 2.0.0 | 13 Sep | 38/40 | 20/20 | 38/38 | 026, 033 |
| 3.0.0 | 14 Sep | 38/40 | 20/20 | 38/38 | 014, 033 |
| 3.1.0 | 19 Sep | 39/40 | 20/20 | 39/39 | 033 |

Read them carefully:
• "100/100 refusals" means the same 20 questions × 5 versions, not 100 different questions.
• Every G1 failure was a REFUSAL of an answerable question, never a wrong answer.
• G3's denominator is the answers given (refusals are not answers), and it is 100% by construction.
• With 40 questions, one answer is worth 2.5 points. The rise from 36 to 39 is a trend, not a proof. There is one run per version, and g-in-014 alternates (it failed in 3.0.0 after passing in 2.0.0), which is normal run-to-run model variation. There is no ablation (no measured "with vs without hybrid search").

Speed (report Tables 6.3–6.4):
• Answer time: median 8.3 s over 20 timed questions, slowest 18.1 s (target: median ≤ 20 s). The first question after a start takes 23.2 s while models load. These were measured on v1 (11 Sep), not re-timed on v3. Note that 8.3 s is a MEDIAN: the slide-16 speaker note says "en moyenne", so say "médiane".
• Sync of 200 pages (target ≤ 600 s): 449.4 s and 375.3 s on a quiet laptop (met), and 731.6 s while the machine was busy (missed). Most of the time is the embedding model (about 0.29 s per chunk) and PDF reading. They show the failure rather than hide it.
• Re-sync of an unchanged folder: 0.09 s.`,
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
      {
        id: 'g13-1',
        prompt: 'Jury: "You went from 36 to 39 out of 40. So your changes improved quality by 7.5 points?" Answer precisely, and mention one fact from the per-version failures that supports your caution.',
        modelAnswer:
          'Carefully: it is three questions out of 40, and each question is worth 2.5 points, so the percentages exaggerate the precision. We ran each version once, and the model varies from run to run (temperature is not fixed). For example, g-in-014 passed in 2.0.0 and failed again in 3.0.0 with no related code change, so a one-question move can happen by chance. We did not run ablations, so we cannot attribute the gain to a specific change. The honest reading: a trend in the right direction, every failure was a refusal (never an invented answer), and the one persistent failure, g-in-033, has a known cause.',
        keyPoints: [
          kp('3 questions / 2.5 points each', '2.5', '2,5', 'three questions', 'trois questions', '3 questions'),
          kp('Run-to-run variation / one run per version', 'variation', 'variance', 'one run', 'une exécution', 'une seule', 'chance', 'hasard'),
          kp('Concrete support: g-in-014 alternates, or no ablation', '014', 'ablation'),
        ],
        hints: [
          'How many questions is 7.5 points? And how many times did you run each version?',
          'Rule of thumb: with n = 40, a difference of one or two questions is within normal noise unless you repeat runs.',
          'Similar case: a basketball player scores 36/40 free throws on Monday and 39/40 on Friday. Did Friday’s new shoes cause it? What would you need to know?',
        ],
        source: 'Slide 15; report Table 6.2 and Table 6.6, p.77; docs/evals/release-*.json',
      },
      {
        id: 'g13-2',
        prompt: 'Correct and complete this sentence for the jury: "Sanad répond en 8 secondes en moyenne, et synchronise 200 pages en moins de 10 minutes."',
        modelAnswer:
          'Corrected: "The MEDIAN answer time is 8.3 s over 20 timed questions (the slowest took 18.1 s; the target is a median of 20 s or less). It was measured on version 1; the first question after a start takes about 23 s while models load. For 200 pages, the 10-minute target was met on a quiet laptop (449 s and 375 s) and missed under load (732 s), mostly because computing embeddings uses the whole CPU. A re-sync of an unchanged folder takes 0.09 s." The two fixes: "moyenne" → "médiane", and "always under 10 minutes" → "under 10 minutes when the machine is not busy, missed once under load".',
        keyPoints: [
          kp('Median, not mean', 'median', 'médiane', 'mediane'),
          kp('8.3 s median, 18.1 s slowest', '18', '8.3', '8,3'),
          kp('200 pages: met when idle, missed under load (731.6 s)', 'load', 'charge', '731', '732', 'missed', 'manqué', 'dépass'),
        ],
        hints: [
          'Is 8.3 s the average of the 20 times, or the middle value? And did all three 200-page runs finish in under 600 s?',
          'Invariant: say exactly the statistic you measured (median ≠ mean), and report the failed run too.',
          'Similar case: a delivery firm says "we deliver in 2 days on average". Three runs: 1 day, 1.5 days, 4 days (during a strike). How would you state it honestly?',
        ],
        source: 'Slide 16; report Tables 6.3–6.4 p.75–76; docs/defense/jury-questions.md Q19–20',
      },
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
    explain: `Slide 17 lists what the work does NOT prove, and slide 18 pairs each limit with a fix and a success measure (report Table 6.7 and Table C.1).

1. 60 questions is small: one answer moves the score by 2.5 points.
2. French questions only: the interface has Arabic (right-to-left), but Arabic answers are not scored. Next, at 3 months: 30 Arabic questions.
3. Local mode not measured: every number comes from cloud mode (Gemini). Nobody knows what SANAD scores without internet. Next, at 1 month: run the 60 questions in local mode.
4. The judge is from the same model family. Next, at 6 months: a second judge from another family plus 20 hand-graded answers.
5. No user interviews: the needs come from the team's work experience. Next, at 6 months: 3 interviews with HR officers and a usability test with 5 users.
6. One remaining failure, question 33: the grader reads a 500-character extract. Next, at 1 month: the grader reads the whole section; success = 40/40 while keeping 20/20.

Also at 3 months: a frozen 20-question set for figures, and a manager for each shared workspace. Workspaces created before v3 have no owner, so everyone can read them and nobody can edit them from the interface.

Other honest gaps the report records: times were measured on v1; G5 was missed under load; there is no screen-reader test (dropped by a written decision); photo-only details get refused; G6 (9/10 clean rehearsals) has no reported result.

Why volunteer all this? A jury that finds a weakness you hid doubts everything else. A jury that hears you name it, with its fix and metric, sees engineering judgment.`,
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
      {
        id: 'g14-1',
        prompt: 'Choose the THREE limits you think a jury is most likely to attack first. For each: state the limit in one sentence, the planned fix, and the exact measure that will prove the fix worked.',
        modelAnswer:
          'Any three of these, each with its fix and metric. (1) Local mode not measured, although the title says "RAG local": run the 60 frozen questions with MODEL_MODE=local (Ollama) at 1 month; success is the same gates (≥36/40, 20/20, 100%). (2) Same-family judge: add a second judge from another model family and hand-grade 20 answers at 6 months; success is measured agreement between judges and humans. (3) Question 33, where the grader reads a 500-character extract: let the grader read the whole section at 1 month; success is 40/40 while keeping 20/20. (4) Only 60 French questions: 30 Arabic questions (3 months), 20 figure questions (3 months). (5) No user interviews: 3 HR interviews plus a 5-user test at 6 months. A good answer picks local mode or the judge first, because they touch the title claim and the main number.',
        keyPoints: [
          kp('Three limits named', 'local', 'judge', 'juge', '33', 'interview', 'entretien', 'arab', '60'),
          kp('Each has a concrete fix', 'fix', 'plan', 'remède', 'next', 'suite', 'mois', 'month'),
          kp('Each has a measurable success criterion', '40/40', '20/20', '36', 'measure', 'mesure', 'agreement', 'accord', 'metric', 'critère'),
        ],
        hints: [
          'Which of your limits contradicts a word in your TITLE? Which one touches your headline 39/40?',
          'Rule of thumb: limit → fix → number. A fix without a number to prove it is a wish.',
          'Similar case: a car review says "the brakes were only tested on dry roads". Good manufacturer answer: "wet-road tests next month, target stopping distance under X m". Do the same for three SANAD limits.',
        ],
        source: 'Slides 17–18; report Table 6.7 p.77–78 and Table C.1 p.81',
      },
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
    explain: `Slide 20 (annex A) has seven risks, each with its protection.

1. Access without an account. With AUTH_MODE=keycloak, you sign in through Keycloak (OpenID Connect). Without a valid session you are sent to the login page. SANAD then keeps its own session cookie, HttpOnly and SameSite=Lax, stored server-side only as a SHA-256 hash, valid 12 hours.
2. Reading someone else's workspace. The owner is checked at every access. An unknown workspace and a forbidden one get the SAME answer, so an attacker cannot even learn that a workspace exists.
3. Opening someone else's source. A source link only opens from the conversation that received it.
4. A trapped file path. Identifiers must match letters, digits, dash and underscore only (^[A-Za-z0-9_-]+$), so "../../etc/passwd" is rejected (no path traversal).
5. Abuse. Rate limits apply per person (e.g. 20 questions per 10 minutes, 20 syncs per hour) in keycloak mode.
6. Content injected into an answer. The model's text is rendered with HTML, links and images disabled, so a document containing <script> or a phishing link cannot become clickable in an answer.
7. Leaks through logs. No keys, passwords or request bodies are logged (secrets are redacted).

Also: uploads are capped at 50 MB, and security headers are sent (X-Frame-Options DENY, nosniff…).

Other modes: by default (AUTH_MODE=none) the server listens only on 127.0.0.1, meaning the same machine. ACCESS_PASSWORD adds a simple password gate (HTTP Basic). The Docker entrypoint only WARNS if the app is exposed publicly without a password.

Know the honest gaps (docs/known-issues.md): roles were removed in v3.1 (everyone signed in is equal, workspaces are owned or shared); the OIDC nonce isn't checked; there's no CSP header or CSRF token (SameSite=Lax is the CSRF defence); a user deleted in Keycloak stays signed in until their 12 h session ends. Personal data under Moroccan law 09-08 would need a review before cloud use. The demo corpus is public on purpose.`,
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
      {
        id: 'g15-1',
        prompt: 'A signed-in user changes the workspace id in the URL to a colleague’s private workspace. What does SANAD return, and why is it important that the response is the SAME as for a workspace that doesn’t exist?',
        modelAnswer:
          'The owner check runs on every access, server-side. The user is not the owner and the workspace is not shared, so access is denied, with exactly the same response as for an id that doesn’t exist. That matters because a different "forbidden" answer would confirm the workspace exists: an attacker could probe ids and map who has which workspaces (enumeration), a leak by itself. Identical responses reveal nothing. (Isolation also holds at the data level: each workspace has its own Qdrant collection, so a search can’t cross into another workspace.)',
        keyPoints: [
          kp('Owner checked on every access server-side', 'owner', 'propriétaire', 'every access', 'chaque accès', 'server', 'serveur'),
          kp('Same response for unknown and forbidden', 'same', 'même', 'identical', 'identique', '404', 'not found'),
          kp('Prevents learning existence / enumeration', 'exist', 'enumer', 'énumér', 'probe', 'learn', 'apprend', 'reveal', 'révèl'),
        ],
        hints: [
          'If SANAD answered "forbidden" for xyz but "not found" for zzz, what would the attacker have learned?',
          'Rule of thumb: an error message is information. Give an unauthorised user no more information than a non-existent resource would.',
          'Similar case: a hotel receptionist asked "is Mr X staying here?" answers the same way whether he is or not. Why?',
        ],
        source: 'Slide 20; report Table 4.6; app.py may_see/may_manage',
      },
      {
        id: 'g15-2',
        prompt: 'A PDF in a workspace contains the text: <a href="http://phishing.example">Cliquez ici pour votre indemnité</a>. The model copies it into its answer. What does the user see, and which protection is responsible?',
        modelAnswer:
          'The user sees plain text, not a clickable link. Model output is treated as untrusted and rendered with HTML, links and images disabled (ui/answer_format.py), so the anchor cannot become a working link, and a <script> or an image cannot run or load either. That is the "contenu injecté dans une réponse" protection on slide 20. The underlying rule: anything a document or a model produces is data, never markup or instructions.',
        keyPoints: [
          kp('Rendered as plain text / not clickable', 'plain', 'texte', 'not clickable', 'pas cliquable', 'inactive', 'désactiv', 'disabled'),
          kp('HTML, links and images disabled in model output', 'html', 'link', 'lien', 'image'),
          kp('Model/document output is untrusted', 'untrusted', 'non fiable', 'data', 'donnée', 'injection'),
        ],
        hints: [
          'Where does the answer text come from, and should an application trust it more than a random web page?',
          'Invariant: model output is untrusted input to the interface.',
          'Similar case: a forum lets users post messages. Why do forums escape HTML before displaying posts?',
        ],
        source: 'Slide 20; ui/answer_format.py; report p.60',
      },
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
    explain: `The method: Scrum adapted to two people, chosen over waterfall because of the short deadline and high uncertainty (report p.23).

Rhythm and rules (slide 6):
1. Every Saturday, a meeting: what is done, what is blocked, what's next.
2. Every task on its own branch (e.g. feat/S1-ST-17-sync-engine), announced on GitHub, so two people never edit the same file at the same time.
3. Every change runs automatic tests (pytest, the ruff linter, a secret scan in CI), then is reviewed by the other person. The main branch is protected: 1 approving review, the required check green, no force-push.

Numbers: 8 sprints (S0–S7) from 20 July to 19 September. Their lengths were very uneven: S1, ingestion, took about a month; S4, S5 and S7 lasted a day each. 146 merged pull requests, 1,409 automated tests according to the report (the v3.1.0 release notes record 1,372 passing plus 2 skipped and 1 expected failure), and 5 releases between 12 and 19 September. User stories ST-01 to ST-55. Decisions were logged ADR-style in docs/journal/DECISIONS.md.

The Definition of Done had 4 criteria: acceptance criteria met, tests green locally and in CI, the peer's approval, and the owner can explain the change aloud in one minute.

Who did what (report Table 1.6). The roles were planned as build lead (Youssef) and research & quality lead (Meriem) and mixed in practice.
• Meriem: stores and safe write order, SQLite schema, workspaces, API/OpenAPI, change detection, converters, chunking, the Sync engine, memory, the corpus, the 60 questions, the evaluation engine, judge and gate, the full UI rewrite, right-to-left, first hosting.
• Youssef: the agent graph, the LLM modes, structure/config/Docker, embeddings, figure extraction, hybrid search, the grader, answer/refusal, clarification, translations, dashboard, login, rate limits, final hosting.

A likely question: "How did you use AI tools?" Answer truthfully and consistently with each other. Say what you used, for what, and how you verified it: the tests, the review and the evaluation gate. The report's lesson "a test that never failed proves nothing" (they broke code on purpose to check tests catch it) is your strongest evidence that you controlled the output.`,
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
      {
        id: 'g16-1',
        prompt: 'Jury: "Who did what?" Give the answer for BOTH of you in 4–5 sentences, organised by following the path of a document then of a question, and end with how you checked each other’s work.',
        modelAnswer:
          'Following a document: Meriem built the ingestion side, meaning change detection, the converters, chunking, the Sync engine, the stores with their safe write order, the SQLite schema and workspaces, and the API contract. Youssef built the embeddings and the figure extraction. Following a question: Youssef built the agent graph, hybrid search, the grader, the answer and refusal paths, clarification and the LLM modes. Meriem built conversation memory, wrote the 60 questions, and built the evaluation engine, judge and release gate. On the product: Meriem rewrote the UI (including right-to-left), Youssef did login, rate limits, Docker and the final hosting. We checked each other through one branch per task, CI tests on every pull request, and a mandatory review by the other before any merge into protected main.',
        keyPoints: [
          kp('Meriem: ingestion / sync / chunking / stores', 'meriem', 'ingestion', 'sync', 'chunk', 'conversion', 'schema'),
          kp('Meriem: evaluation / 60 questions / gate / UI', 'evaluation', 'évaluation', 'questions', 'gate', 'porte', 'ui', 'interface'),
          kp('Youssef: agent graph / search / grader / figures / Docker / login', 'youssef', 'agent', 'graph', 'graphe', 'grader', 'figure', 'docker', 'login', 'keycloak'),
          kp('Cross-check: branches, CI, mandatory review', 'review', 'relecture', 'relu', 'ci', 'branch', 'branche'),
        ],
        hints: [
          'Draw the path of a document (folder → index) and of a question (question → answer). Put a name on each box.',
          'Invariant: your two answers must match each other and Table 1.6 of the report. The jury may ask you separately.',
          'Similar case: two cooks describe a restaurant kitchen: "I handle everything from delivery to the fridge, she handles everything from order to plate, and nothing leaves without the other tasting it."',
        ],
        source: 'Slide 6; report Table 1.6 and p.23–27',
      },
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
    explain: `Locally: install with uv (a fast Python package manager with a frozen lockfile, uv.lock) and run the app. It listens on 127.0.0.1:8000 by default. MODEL_MODE=cloud needs CLOUD_API_KEY (Gemini). MODEL_MODE=local uses Ollama at localhost:11434.

The Docker image is built in two stages.
• Builder: python:3.12 slim plus uv 0.8.7. It installs the exact locked dependencies but swaps in the CPU-only build of PyTorch. The GPU/CUDA packages weigh gigabytes and there is no GPU, so the build even fails on purpose if that filter matches nothing. It also downloads the E5 and BM25 model weights INTO the image, so the container doesn't download them at boot.
• Runtime: a slim image that runs as a non-root user (sanad, uid 10001), with a health check on /api/v1/health.

The entrypoint script maps Railway's PORT variable to SERVER_PORT and listens on 0.0.0.0. It warns loudly if the app is public without ACCESS_PASSWORD, drops root privileges, and on the first boot copies the demo corpus into the data volume.

Railway, based on the repo's journal:
• The web service sanad-web deploys from GitHub main (BUILD-STATE.md: "from GitHub main, volume on /app/data"). So a merge to main triggers a rebuild of the Dockerfile. railway.json in the repo sets the Dockerfile builder, the health check (/api/v1/health, 300 s timeout) and restart-on-failure up to 10 times, but known-issues.md notes Railway uses the service's own dashboard settings for sanad-web.
• The keycloak service is NOT linked to GitHub: it was uploaded by hand with "railway up" from deploy/keycloak/ and backed by a Railway Postgres. That is probably the "deployed as code, not from GitHub" you remember.
• The volume on /app/data is what keeps SQLite, Qdrant, parents, figures and reports when the container restarts. A container's own disk is thrown away on every redeploy.

Honesty point: Railway is a cloud host. The online demo is for convenience on a public corpus. For real documents, the plan is to install on the organisation's machine and use local mode.`,
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
      {
        id: 'g17-1',
        prompt: 'Railway redeploys the app after a merge. Why are the workspaces, index and chat history still there afterwards, and what would happen without the volume? Also: why doesn’t the new container need to download the E5 model at boot?',
        modelAnswer:
          'All state lives under /app/data (SQLite sanad.db, the Qdrant folder, parent JSON, figures, reports), and on Railway that path is a persistent volume mounted into each new container. The redeploy replaces the container, but the volume survives, so everything is still there. Without the volume, the container’s own filesystem would be thrown away on every redeploy or restart: all workspaces, the index and the history would vanish and every document would need a new Sync. The E5 and BM25 weights were downloaded at image build time (in the Dockerfile’s builder stage) and baked into the image, so boot doesn’t depend on a download (the image even runs with the Hugging Face hub in offline mode).',
        keyPoints: [
          kp('State under /app/data on a persistent volume', 'volume', '/app/data', 'persist'),
          kp('Container disk is ephemeral: without volume everything lost, resync needed', 'ephemeral', 'éphémère', 'lost', 'perdu', 'vanish', 'dispar', 'resync', 'resynchron'),
          kp('Model weights baked into the image at build', 'baked', 'image', 'build', 'intégr', 'download', 'télécharg'),
        ],
        hints: [
          'Where on disk does SANAD keep its database and index? Is that place part of the container, or attached to it?',
          'Invariant: a container is disposable. Only what is on a mounted volume survives a redeploy.',
          'Similar case: a rental car is swapped for a new one every week. What must you keep in your own bag instead of the glovebox?',
        ],
        source: 'railway.json; Dockerfile; docs/journal/BUILD-STATE.md (sanad-web from GitHub main, volume on /app/data)',
      },
      {
        id: 'g17-2',
        prompt: 'Why does the Dockerfile deliberately install the CPU-only version of PyTorch, and why does the build fail on purpose if its GPU filter drops nothing?',
        modelAnswer:
          'PyTorch is needed by the E5 embedding model (sentence-transformers). The default Linux install pulls CUDA/GPU packages (nvidia-*, triton) that weigh several gigabytes, but neither the laptop nor Railway has a GPU, so they would be dead weight: slower builds, a bigger image and more memory. The Dockerfile removes those rows from the locked requirements and installs the CPU wheel pinned to the same version as uv.lock. If the filter dropped nothing, the lockfile format or platform changed and the GPU packages would silently come back, so the build stops with a clear error instead of producing a bloated image. It’s the same philosophy as the rest of the project: fail loudly rather than degrade silently.',
        keyPoints: [
          kp('No GPU available; CUDA packages are huge', 'gpu', 'cuda', 'nvidia', 'size', 'taille', 'gb', 'go', 'heavy', 'lourd'),
          kp('CPU wheel pinned to uv.lock version', 'pin', 'uv.lock', 'version', 'lock'),
          kp('Fail loudly instead of silently bloating', 'fail', 'échou', 'silent', 'silenc', 'loud', 'error', 'erreur'),
        ],
        hints: [
          'What hardware does Railway give this app? What do the nvidia-* packages need to be useful?',
          'Invariant: the image should contain what the app can actually use, pinned to the tested versions.',
          'Similar case: shipping a laptop with a 4 kg power supply for a desk that has no socket for it. And if the packing script accidentally stopped removing it, would you rather it warn or silently ship it?',
        ],
        source: 'Dockerfile builder stage; report p.64 and p.70',
      },
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
    explain: `The layout is flat: the ingestion modules sit at the top level, and the question pipeline is in agent/.

Journey 1 (a document): change_detection.py (SHA-256, statuses) → conversion.py (text) → chunking.py (parents/children) → embeddings.py (E5 + BM25) → vector_store.py (Qdrant, one collection per workspace, named ws_<id>_children) and parent_store.py (parent JSON) → sync.py orchestrates it all, with recovery.py and watcher.py around it. figures.py handles the images.

Journey 2 (a question): agent/graph.py (build_graph, ask) → agent/nodes.py (the nine nodes and routers). The real work sits behind ports: agent/querying.py (planner), retrieval.py, grading.py (grader, reword), answering.py (writer, streaming), summarizing.py, stores.py (parent texts), chat.py (build the Gemini/Ollama model), prompts.py (loads prompts/<id>/PROMPT.md, versioned).

The ports (agent/ports.py): AgentPorts bundles 8 required functions (summarize, clarify, rewrite, retrieve, grade, reword, fetch_parents, write_answer) with NO defaults. build_graph(ports) receives them. In production, ui/ports.py (the single "composition root") plugs in the real Gemini/Qdrant versions. In tests, fakes are plugged in (tests/fake_chat.py ScriptedChat, fake encoders), so about 1,400 tests run without any API key. There is deliberately no default: "a stub that answers plausibly is the most dangerous object in this project".

The host: app.py (about 2,900 lines) is the FastAPI app: pages, /chat/ask, auth routes, model warm-up. api/routes.py holds the /api/v1 JSON API (12 operations, signed OpenAPI contract, drift tests). ui/ holds screens, i18n (fr/ar/en), auth, rate limits.

Data (annex D, db/schema.sql): workspace (with owner_user_id, where NULL means shared) → document (content_hash, status) → sync_run → sync_item (one row per file). Also eval_run → eval_result, answer_feedback, app_user, user_session (hashed token), and conversation (JSON payload per user and workspace).

Classes (annex E): ChunkedDocument, Parent, Child, SearchHit, and Answer (kind, text, sources, trace, disclaimer), which is frozen and raises without sources, plus the Sync report rows.`,
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
      {
        id: 'g18-1',
        prompt: 'A jury member opens agent/ports.py: "Why are these eight functions passed in, with no default implementation? Isn’t that over-engineering?"',
        modelAnswer:
          'The graph never creates its own model or database client. It receives the eight functions (summarize, clarify, rewrite, retrieve, grade, reword, fetch_parents, write_answer) through AgentPorts: that is dependency injection. It lets us plug in the real Gemini/Ollama and Qdrant versions in production (one composition root, ui/ports.py) and scripted fakes in tests, so about 1,400 tests run fast, deterministically and without an API key, while still exercising the real routing logic. And there is no default on purpose: a default stub that "answers plausibly" could silently ship to production and produce fluent, unsourced answers, the exact failure SANAD exists to prevent. Forcing every caller to pass real ports makes that impossible to forget.',
        keyPoints: [
          kp('Dependency injection: real in prod, fakes in tests', 'inject', 'fake', 'faux', 'test', 'mock'),
          kp('Tests run without API key / deterministic', 'api key', "clé d'api", 'cle', 'without', 'sans', 'determin', 'fast', 'rapide'),
          kp('No default because a plausible stub is dangerous', 'default', 'défaut', 'stub', 'dangerous', 'dangereu', 'plausib', 'silent'),
        ],
        hints: [
          'How do 1,400 tests exercise the agent without ever calling Gemini?',
          'Invariant: code that depends on an interface, not a concrete service, can be tested with a stand-in, and the stand-in must never be picked up by accident in production.',
          'Similar case: a flight simulator swaps the real engines for simulated ones, but a real plane must never take off with "simulator mode" as the default. Why?',
        ],
        source: 'agent/ports.py; agent/graph.py build_graph docstring; ui/ports.py; tests/fake_chat.py',
      },
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
    explain: `This node has no new idea. It mixes questions from every stage, the way a jury does.

How to answer any jury question in about 45 seconds:
1. Answer the question directly in the first sentence.
2. Give ONE concrete fact: a number, a file, an example.
3. If there is a weakness, name it yourself and give the planned fix.
4. Stop. Don't open a new topic the jury didn't ask about.

The traps to watch:
• "Local": all measurements are in cloud mode, and the online demo runs on Railway.
• "Median" vs "moyenne" (8.3 s).
• "100/100" = 20 questions × 5 versions.
• "Article entier": it is the whole SECTION, 2,000–4,000 characters.
• RAGAS: it was replaced by an in-house judge.
• 589 vs 588 articles: the report has both. Say "environ 589 articles, 7 livres".
• AI tools: answer truthfully, and the same way as your partner.`,
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
      {
        id: 'g19-1',
        prompt: 'Jury: "Your title says RAG LOCAL, but your results were obtained with Gemini and your demo runs on Railway. Isn’t the title misleading?"',
        modelAnswer:
          'SANAD has two modes. In local mode, with Ollama, nothing leaves the machine; in cloud mode, the question and the retrieved passages go to Gemini. The documents, the index and the database always stay local, and the embeddings are always computed locally. It is true that all our measurements were made in cloud mode and that local mode has not been measured. That is our declared limit and our first action at one month: run the same 60 frozen questions in local mode against the same gates. The Railway deployment is for the demo, on a public corpus chosen for that reason. For real documents the plan is an install on the organisation’s machine in local mode, after a data-protection review under law 09-08. So "local" describes the architecture and the option, not the mode we measured, and we say so on slide 17.',
        keyPoints: [
          kp('Two modes: local (Ollama) nothing leaves; cloud sends question + passages', 'ollama', 'two modes', 'deux modes', 'cloud'),
          kp('Admits results measured in cloud mode, local not measured', 'not measured', 'pas mesuré', 'non mesuré', 'cloud mode'),
          kp('Plan: evaluate local mode on the 60 questions', '60', 'measure', 'mesurer', 'month', 'mois'),
          kp('Railway = demo on public corpus', 'railway', 'demo', 'démo', 'public'),
        ],
        hints: [
          'What exactly leaves the machine in each of your two modes? And in which mode were your numbers produced?',
          'Rule: admit the fact, say what "local" does guarantee, and give the dated plan that closes the gap.',
          'Similar case: a car advertised as "electric-capable" (a plug-in hybrid) whose fuel figures were all measured in petrol mode. How would an honest engineer phrase it?',
        ],
        source: 'Slides 1, 8, 17, 18; report p.60, p.70, p.77, Table C.1',
        juryVersionFr:
          'Sanad a deux modes. En mode local, avec Ollama, rien ne sort de la machine ; en mode cloud, la question et les passages retenus partent vers Gemini. Les documents, l’index et la base restent toujours locaux. C’est vrai : toutes nos mesures sont en mode cloud et le mode local n’est pas encore mesuré. C’est notre première action à un mois, avec les mêmes 60 questions et les mêmes seuils. Railway sert à la démonstration, sur un corpus public.',
      },
      {
        id: 'g19-2',
        prompt: 'Jury: "Why don’t you just set a similarity threshold (say 0.7) and refuse below it, instead of asking an LLM grader?"',
        modelAnswer:
          'Because our retrieval scores cannot measure relevance. The final ranking comes from RRF, which scores rank positions: the best hit of a search with nothing relevant still gets the top RRF score. A raw cosine threshold on the dense side isn’t reliable either. A passage can be close in meaning ("same subject") without containing the answer, and the right cut-off differs from one question and corpus to another. The grader answers the actual question, "could someone write part of an answer from these passages?", and its prompt says the same subject is not enough. The cost is one LLM call per round, and grader errors (question 33 is one). Those are measured by the 60-question evaluation. SANAD uses a dense top-1 similarity only for suggesting which workspace to ask when none is selected, not for refusing.',
        keyPoints: [
          kp('RRF score is rank-based, not relevance', 'rank', 'rang', 'rrf'),
          kp('Similar ≠ answers the question; threshold not reliable', 'same subject', 'même sujet', 'similar', 'similaire', 'threshold', 'seuil', 'unreliable', 'fiable'),
          kp('Grader judges whether passages answer, at a cost / measured', 'grader', 'vérificateur', 'llm', 'cost', 'coût', 'measured', 'mesur', '33'),
        ],
        hints: [
          'What does an RRF score actually encode? Would the top hit of a completely irrelevant search get a low score?',
          'Invariant: "close in meaning" and "contains the answer" are different properties; only the second justifies answering.',
          'Similar case: a library search always returns a "best match", even for a book it doesn’t own. Would you trust "best match score > 0.7" to mean "we have your book"?',
        ],
        source: 'vector_store.py (Fusion.RRF, dense_top1_similarity docstring); prompts/relevance-grader/PROMPT.md',
      },
      {
        id: 'g19-3',
        prompt: 'Jury: "How did you use AI tools, like code assistants, in this project? How do we know you understand the code?" Give a truthful structure for your answer. What must it contain, and what must you avoid?',
        modelAnswer:
          'Structure: (1) State plainly and truthfully which AI tools you used and for what (e.g. code generation and drafting), consistently with your partner. The jury may ask you separately, and the repository history can show it. (2) Explain how you kept control: every change went through a branch, CI tests and the other person’s review; you broke code on purpose to prove tests can fail; the evaluation gate measured behaviour independently of who wrote the code; and the Definition of Done required the owner to explain each change aloud in one minute. (3) Prove understanding on the spot: offer to walk through one path, e.g. a question through the nine nodes, or why the write order prevents broken citations. Avoid: denying or minimising use that happened, giving different stories, and claiming you "wrote every line by hand" if you didn’t.',
        keyPoints: [
          kp('Truthful and consistent between partners', 'truth', 'honnête', 'honest', 'vrai', 'consistent', 'cohérent', 'same', 'même'),
          kp('Control: tests, review, gate, break-on-purpose', 'test', 'review', 'relecture', 'gate', 'porte', 'break', 'casser'),
          kp('Demonstrate understanding (walk through a path)', 'explain', 'expliqu', 'walk', 'démontr', 'demonstr', 'show', 'montrer'),
        ],
        hints: [
          'What happens to your credibility if the jury checks the repository history after you answer?',
          'Invariant: in a defense, understanding is shown, not claimed. Pair honesty about the tools with evidence of control and a live explanation.',
          'Similar case: a surgeon who used a robot is asked "did the robot do it?". The good answer says what the robot did, what the surgeon controlled, and how the outcome was verified.',
        ],
        source: 'docs/defense/jury-questions.md Q30; report p.24 (Definition of Done), p.70 ("casser pour vérifier")',
      },
    ],
  },
];