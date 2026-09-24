// Model answers for the Defense Path gates (src/data/defensePath.ts). Server-only, like
// exercises.js: never bundled into the page. Keyed by gate id; `prompt` must match the gate
// text shown on the page (checked by scripts/check-coach.mjs). Facts were checked against the
// RAG_project_ENSA code, the thesis report and docs/evals.

export const PATH_EXERCISES = {
  "g01-1": {
    "prompt": "A colleague says: \"Just paste the Code du travail PDF into ChatGPT, it will answer HR questions fine.\" Using what you know about how an LLM produces text, explain the precise risk, and name the two behaviours SANAD adds to remove it.",
    "modelAnswer": "The risk: an LLM writes the most plausible continuation of the text; it does not verify facts. So it can produce a confident, fluent answer that no passage supports, for example a wrong trial-period length or an invented article, and the reader has no way to check it (the New York lawyers with six invented rulings, Air Canada forced to honour an invented refund rule). SANAD adds two behaviours: (1) every answer shows its sources (file and section, opening the exact passage), and the code cannot build an answer without sources; (2) when the documents do not contain the answer, it refuses honestly (\"not in the documents\") instead of guessing. Both are measured before each release (G3 and G2).\n\nÀ dire au jury : Un modèle de langage prédit un texte plausible, il ne vérifie rien. Il peut donc inventer une durée ou un article avec assurance, et le lecteur ne peut pas contrôler. Sanad ajoute deux comportements : chaque réponse montre sa source, et quand la réponse n’est pas dans les documents, il refuse au lieu de deviner.",
    "keyPoints": [
      "LLM predicts plausible text, does not verify",
      "Shows the source for every answer",
      "Refuses when the answer is not in the documents"
    ],
    "hints": [
      "When ChatGPT writes an answer, where does each word come from: from a lookup in your PDF, or from something else?",
      "Invariant: plausible ≠ verified. A product that makes answers trustworthy must (a) let the reader check every claim and (b) have a safe behaviour when there is nothing to check against.",
      "Similar case: a student who has not revised writes a confident essay. The teacher can only trust it if every claim has a page reference, and the student is allowed to write \"not in the course\" instead of inventing. Map these two rules onto SANAD."
    ],
    "misconceptions": [
      "Thinking the risk is only \"the PDF is too long for the model\" (context size), rather than the model inventing.",
      "Naming \"local\" or \"privacy\" as the fix for hallucination: those protect data, not truth."
    ]
  },
  "g02-1": {
    "prompt": "Sort these six steps into \"done once per document\" or \"done at every question\", and say in one line why the split matters for speed:\n(a) convert the PDF to text (b) compute passage vectors (c) compute the question vector (d) store vectors in Qdrant (e) ask the LLM whether passages answer the question (f) write the answer.",
    "modelAnswer": "Once per document (indexing, during Sync): (a) convert to text, (b) passage vectors, (d) store in Qdrant. At every question: (c) question vector, (e) grading by the LLM, (f) writing the answer. Why it matters: the expensive work on documents (conversion, embedding every chunk, about 0.29 s per chunk on a laptop CPU) is paid once at Sync, so a question only needs one small embedding, a search and a few LLM calls (median 8.3 s). And a second Sync of unchanged files is skipped (0.09 s).",
    "keyPoints": [
      "a, b, d are once per document",
      "c, e, f are per question",
      "Heavy document work is paid once, so questions are fast"
    ],
    "hints": [
      "Which of these steps needs the question to exist before it can run?",
      "Rule: anything that depends only on the documents can be computed in advance and stored; anything that depends on the question must wait for it.",
      "Similar case: a library catalogues each new book once (title card, shelf number). When a reader arrives, the librarian only looks up the reader’s request. Which of your six steps are \"cataloguing\"?"
    ],
    "misconceptions": [
      "Putting \"compute the question vector\" in the indexing phase: the question does not exist yet."
    ]
  },
  "g02-2": {
    "prompt": "A jury member says: \"NotebookLM and AnythingLLM already do this. What exactly is your contribution?\" Answer in 4–5 sentences, and include one thing the competitors do better.",
    "modelAnswer": "Honestly, running locally is not unique: AnythingLLM and PrivateGPT also run on your machine, and NotebookLM reads illustrated documents better and accepts more sources. Our contribution is the combination: SANAD can run entirely locally (Ollama) so documents need not leave the organisation, its refusal is measured and published (20 out-of-corpus questions refused 20/20 at every version), and a release gate blocks any version whose scores fall below fixed thresholds. It also offers French and Arabic (right-to-left) interfaces, and a figure description is never used as evidence. The 20/20 is on our own frozen question set, so it is evidence about SANAD, not a head-to-head comparison.\n\nÀ dire au jury : Être local n’est pas propre à Sanad, et NotebookLM lit mieux les documents illustrés. Notre apport, c’est la combinaison : un mode entièrement local, un refus mesuré et publié à chaque version, et une porte qui bloque une version sous le seuil. Le 20 sur 20 porte sur notre propre jeu de questions : c’est une preuve sur Sanad, pas un match contre les autres.",
    "keyPoints": [
      "Admits local is not unique / competitor strength",
      "Measured and published refusal (20/20)",
      "Release gate per version",
      "Can run fully locally"
    ],
    "hints": [
      "If the jury opened AnythingLLM tomorrow, what could it NOT show them that you can show on slide 15?",
      "Invariant for a contribution claim: it must be something you can prove with a kept number, and you must not claim what others also do.",
      "Similar case: a new car brand can’t claim \"has four wheels\" as its contribution. It claims \"crash-tested and published every year\". What is SANAD’s published test?"
    ],
    "misconceptions": [
      "Claiming \"only SANAD runs locally\" — the report’s own Table 2.1 says AnythingLLM and PrivateGPT do."
    ]
  },
  "g03-1": {
    "prompt": "Two candidate versions:\n• Version A: 35/40 grounded, 20/20 refused, 35/35 sourced, median 7 s.\n• Version B: 39/40 grounded, 19/20 refused, 39/39 sourced, median 25 s.\nDoes each one ship? Show the rule you apply to each number.",
    "modelAnswer": "Neither ships. A: G1 needs at least 90% of 40, that is 36; 35/40 = 87.5% is below, so the gate blocks it even though G2, G3 and speed are fine. B: G2 requires all 20 out-of-corpus questions refused; 19/20 means one answer was given where the documents have nothing, so it is blocked. B’s 25 s median misses G4 (20 s), but G4 is non-blocking; it would be reported, not blocking. G3 is fine for both.",
    "keyPoints": [
      "A fails G1 (35 < 36 / below 90%)",
      "B fails G2 (needs 20/20)",
      "Speed does not block"
    ],
    "hints": [
      "For version A, what is 90% of 40? For version B, how many refusals does G2 allow you to miss?",
      "Invariant: a release ships only if G1 ≥ 90% of 40 AND G2 = 20/20 AND G3 = 100%. Speed (G4/G5) is reported but never blocks.",
      "Similar case: a driving test fails you for one dangerous mistake no matter how well you parked. Which of SANAD’s goals behaves like \"one dangerous mistake\"?"
    ],
    "misconceptions": [
      "Thinking B ships because 39/40 is a great G1 score.",
      "Thinking the 25 s median blocks B."
    ]
  },
  "g03-2": {
    "prompt": "A jury member: \"G3 at 100% is trivial, your code forces it. Why measure it at all?\" Answer in 3–4 sentences.",
    "modelAnswer": "Yes, G3 is guaranteed by construction: the Answer class raises an error if an answer has no sources, and the sources are built by code from the retrieved passages, not from the model’s text. We still measure it because a guarantee in code can be broken by a later change; measuring it at every release turns it into a regression check that the gate enforces. That is the lesson from the report: put the guarantee in the structure of the code, then prove it with a number. G3 says nothing about whether the answer is correct; that is G1.",
    "keyPoints": [
      "Guaranteed by construction (Answer raises without sources)",
      "Measured as a regression check",
      "G3 is not correctness; G1 is"
    ],
    "hints": [
      "What could happen to that guarantee six months from now, when someone edits agent/state.py?",
      "Invariant: a guarantee you never test is a guarantee you only believe in. Tests and gates exist to catch the day it breaks.",
      "Similar case: a car’s seatbelt warning is built in, yet every crash test still checks it works. Why?"
    ],
    "misconceptions": []
  },
  "g04-1": {
    "prompt": "In CLOUD mode, a user asks one question. List exactly what leaves the machine, and name three things that never leave. Then say what changes in LOCAL mode.",
    "modelAnswer": "Cloud mode, during a question: the question (and the conversation summary used to understand it) and the retrieved passages/sections are sent to Gemini, because the LLM summarises, plans the searches, grades the passages, possibly rewords, and writes the answer. Never leaves: the document files themselves, the vectors/index (E5 and BM25 run on the local CPU and Qdrant is embedded), the SQLite database (accounts, history, evaluations), and the stored parent sections as a whole. During Sync, figure images can be sent to the model if figure descriptions are enabled. Local mode (Ollama): the LLM runs on the machine, so nothing leaves at all.",
    "keyPoints": [
      "Question goes to the LLM",
      "Retrieved passages go to the LLM",
      "Files / index / vectors / database stay local",
      "Local mode: nothing leaves"
    ],
    "hints": [
      "Which component in the diagram is the only one drawn outside the machine, and what does it need to receive to write an answer?",
      "Invariant: embeddings are computed locally; only LLM calls leave, and they carry whatever text the LLM must read.",
      "Similar case: you ask an outside translator to translate one paragraph of a contract. What do they see, and what stays in your filing cabinet?"
    ],
    "misconceptions": [
      "Saying the vectors or embeddings are computed by Gemini: E5 and BM25 run locally.",
      "Saying \"nothing leaves\" without distinguishing the two modes."
    ]
  },
  "g04-2": {
    "prompt": "Why embedded Qdrant + SQLite instead of a Qdrant server + PostgreSQL? Give two benefits and the cost you accepted, as you would to the jury.",
    "modelAnswer": "Benefits: nothing extra to install or administer, since Qdrant runs as a library inside the Python process and SQLite is a file, so one person can start SANAD with one command and all data stays in one local folder; and one collection per workspace gives structural isolation between workspaces. For a two-person team on a short timeline, zero administration mattered most. Accepted cost: only one process can open the embedded index at a time and SQLite does not handle concurrent writes well, so it does not scale to many simultaneous users. To scale, we would move to a Qdrant server and PostgreSQL.",
    "keyPoints": [
      "No server to install / one command / zero admin",
      "Isolation: one collection per workspace, or data local",
      "Cost: one process / no concurrent writes / scaling"
    ],
    "hints": [
      "What would a new user have to install and run before using SANAD if the index were a separate server?",
      "Rule of thumb: an embedded database trades scalability for simplicity. Name the simplicity, then the scalability you lose.",
      "Similar case: a notebook in your bag vs. a shared online spreadsheet. The notebook needs no setup, but what can’t two people do with it at once?"
    ],
    "misconceptions": []
  },
  "g05-1": {
    "prompt": "Yesterday you synced a folder. Today: A.pdf is untouched, B.docx was edited, C.pdf is new, and D.txt was deleted from the folder. Say what Sync does with each file, and explain why B’s old data must be deleted BEFORE B is re-indexed.",
    "modelAnswer": "A.pdf: same SHA-256 fingerprint → unchanged → skipped (report row \"unchanged\"). B.docx: different fingerprint → changed → delete its old data (vectors first, then parent sections), then convert, chunk, write parents, write vectors (row \"changed\"). C.pdf: no previous fingerprint → new → convert, chunk, write parents then vectors (row \"added\"). D.txt: known before but missing now → removed → its vectors and parents are deleted (row \"removed\"). B must be cleaned first because otherwise passages from the old version could stay in the index and be retrieved and cited as if they were current: stale text served as a source.",
    "keyPoints": [
      "Unchanged skipped via fingerprint/hash",
      "Changed: delete old then re-index",
      "New indexed, removed deleted",
      "Reason: stale/old text would be cited"
    ],
    "hints": [
      "How does Sync know A.pdf didn’t change without reading its text again? And what would the index contain for B if you only ADDED the new version?",
      "Invariant: the index must never contain text that is no longer in the documents, because anything in the index can be cited.",
      "Similar case: you update a price list in a shop. If you put the new labels up without removing the old ones, what can a customer end up reading?"
    ],
    "misconceptions": [
      "Thinking Sync compares modification dates or file names.",
      "Thinking the new version simply overwrites the old passages automatically."
    ]
  },
  "g05-2": {
    "prompt": "The server loses power in the middle of indexing a document. Explain why writing parent sections FIRST and vectors LAST means a user can never receive a citation that points to nothing. What does the worst case look like instead?",
    "modelAnswer": "Search only finds things through vectors, and each vector points to a parent section. If parents are written first and the crash happens before the vectors, the parents exist but no vector points to them: they are orphan files, invisible to search, and overwritten by the next Sync. Harmless. If the order were reversed (vectors first), a crash could leave vectors pointing to parent sections that were never written; a question could then retrieve them and cite a section that does not exist. Deletion uses the mirror order (vectors first, then parents) for the same reason. And as a last floor, if a retrieved passage’s section cannot be read at answer time, the graph refuses with a \"run a Sync\" message instead of answering.",
    "keyPoints": [
      "Search goes through vectors, vectors point to parents",
      "Crash before vectors leaves orphan parents invisible to search",
      "Reverse order would create broken/dangling citations"
    ],
    "hints": [
      "At question time, which store does SANAD search first: the vectors or the parent files? What does a vector carry that leads to a parent?",
      "Invariant: a user can only be shown what search can reach, and search reaches parents only through vectors.",
      "Similar case: a library adds a book to its shelves before adding the catalogue card. If the power cuts in between, what is the worst a reader experiences? And in the other order?"
    ],
    "misconceptions": []
  },
  "g06-1": {
    "prompt": "Two alternative designs are proposed: (1) embed and search whole 3,000-character sections directly; (2) search 500-character children and give the writer ONLY those children. Explain what goes wrong with each, and why SANAD’s design avoids both problems.",
    "modelAnswer": "Design 1: one vector per 3,000-character section averages several ideas into one blurry point, so a precise question matches less well and the right section can be missed; retrieval precision drops. Design 2: search is precise, but a 500-character child can be cut mid-sentence or stop before the decisive detail (exactly what happens to the grader in question 33), and it lacks the context to cite the article correctly, so the writer answers badly or refuses. SANAD does both: it searches the 500-character children (sharp vectors), then loads the whole parent section of each hit, once per parent, and the writer answers from those full sections. Search small, read big.",
    "keyPoints": [
      "Big chunks: diluted/blurry vector, worse retrieval",
      "Small chunks alone: cut context, missing detail",
      "SANAD: search children, read full parent section"
    ],
    "hints": [
      "A vector is ONE point representing a whole text. What happens to that point when the text talks about five different things?",
      "Invariant: search wants one idea per unit; answering wants the full context. One size cannot satisfy both.",
      "Similar case: to find a recipe you scan the index of a cookbook (short entries), but to cook you read the whole page. What would go wrong if the index entries were whole pages, or if you cooked from the index entry alone?"
    ],
    "misconceptions": [
      "Saying Qdrant cannot store long texts: storage size is not the reason, meaning dilution is."
    ]
  },
  "g06-2": {
    "prompt": "What is the 100-character overlap between children for? Invent a concrete example of what could break if the overlap were 0.",
    "modelAnswer": "Consecutive children share 100 characters so that a sentence falling on a boundary appears whole in at least one child. Example with overlap 0: the text \"La période d’essai des cadres est de trois mois, | renouvelable une seule fois\" is cut at \"|\". Child 1 ends with \"est de trois mois,\" and child 2 starts with \"renouvelable une seule fois\". A question about renewal could match child 2, which no longer says what is being renewed, and neither child holds the full rule, so matching gets weaker. With overlap, the boundary sentence is kept whole in one child. (The writer still reads the whole parent, so overlap mainly protects search and grading.)",
    "keyPoints": [
      "Overlap keeps boundary sentences whole",
      "Concrete example of a sentence split across two children"
    ],
    "hints": [
      "Imagine cutting a text every 500 characters with scissors, blind. Where can the scissors land?",
      "Invariant: a passage can only match a question if the idea it needs is written inside that passage.",
      "Similar case: photographing a long wall in several shots, you let the photos overlap so no window is cut in two in every photo. Apply that to sentences."
    ],
    "misconceptions": []
  },
  "g07-1": {
    "prompt": "Two users: one asks \"Que dit l’article 14 ?\", the other \"Mon patron peut-il me renvoyer sans motif ?\" (the Code uses \"licenciement\", never \"renvoyer\"). Which half of the hybrid search rescues each question, and why does SANAD fuse the two lists by rank rather than by adding their scores?",
    "modelAnswer": "\"Article 14\" is an exact identifier: BM25 keyword search finds passages containing \"Article 14\", while a meaning vector could return other articles about similar topics. \"Renvoyer sans motif\" shares no words with \"licenciement\", so keyword search misses it; the E5 dense vectors place both near each other by meaning, so dense search rescues it. The scores can’t be added because they are on different scales (a cosine similarity versus an unbounded BM25 score), so a sum would be dominated by whichever scale is larger. RRF uses only each passage’s rank position in each list (a sum of 1/(k + rank)), so both lists count fairly and a passage ranked well by both rises to the top.",
    "keyPoints": [
      "Article 14 → keyword/BM25",
      "Renvoyer vs licenciement → dense/meaning/E5",
      "Scores on different scales, RRF uses ranks"
    ],
    "hints": [
      "Does the second question share any word with the article that answers it? What kind of search can match without shared words?",
      "Invariant: you can only add two numbers meaningfully if they are on the same scale. What does RRF keep from each list instead of the score?",
      "Similar case: merging two school rankings where one grades out of 20 and the other out of 100. Adding raw marks is unfair; comparing positions (1st, 2nd…) is not. Apply that here."
    ],
    "misconceptions": [
      "Saying E5 finds \"article 14\" better because it is \"smarter\".",
      "Saying RRF averages the similarity scores."
    ]
  },
  "g07-2": {
    "prompt": "A new team member \"cleans up\" the code and removes the \"query: \" prefix before embedding questions. All the tests that check for crashes still pass. What actually happens, and how does SANAD catch it?",
    "modelAnswer": "Nothing crashes: E5 still returns 768 numbers. But E5 was trained with the prefixes (\"query: \" for questions, \"passage: \" for documents), so a question without its prefix lands in a slightly wrong region of the vector space. Dense retrieval silently gets worse: the right passages rank lower and more questions end in refusals or weaker answers. A silent quality drop is the most dangerous kind of bug, so SANAD has a test that fails if any text is embedded without its prefix. The evaluation’s G1 score would also drop at the next release gate.",
    "keyPoints": [
      "No crash, silent quality drop",
      "E5 was trained with query/passage prefixes",
      "A test enforces the prefix (or the gate catches it)"
    ],
    "hints": [
      "Would Python raise an error? What does the model still return, and is that output still \"right\"?",
      "Invariant: E5 compares \"query: …\" vectors against \"passage: …\" vectors because that is how it was trained. Break the pairing and the geometry is off.",
      "Similar case: a translator trained to always receive \"FR→EN:\" before the text. Remove the tag and they still produce something, just less reliably. How would you detect that automatically?"
    ],
    "misconceptions": []
  },
  "g08-1": {
    "prompt": "A technician asks for the voltage of a component that appears ONLY in a wiring diagram, not in the text. SANAD shows the diagram but refuses to state the voltage. A jury member calls this a bug. Defend it as a design decision, including the cost you accepted.",
    "modelAnswer": "It is deliberate. The figure’s description is written by a model that interprets the image; it can misread a plan. If that description were used as evidence, SANAD could state a wrong voltage with a source attached, which is indistinguishable from a correct sourced answer and exactly the failure the product exists to prevent. So the description only helps search find and display the figure; the grader and writer read document text only. The accepted cost: a detail that exists only in an image gets a refusal. The figure is still displayed with its caption and page, so the technician can read the value themselves. Figure answers are also not yet measured (no frozen figure set), another reason not to let them carry claims.",
    "keyPoints": [
      "Description is a model interpretation that can be wrong",
      "Never used as evidence / only text is evidence",
      "Cost: image-only details are refused, figure still shown"
    ],
    "hints": [
      "Who produced the text that says what the diagram contains? Could that text be wrong, and would the user be able to tell?",
      "Invariant: a claim may only rest on the document’s own text, the same text the judge checks.",
      "Similar case: a witness describes a photo to a court. The court shows the photo itself as the exhibit, and the description is not treated as evidence. Why?"
    ],
    "misconceptions": []
  },
  "g09-1": {
    "prompt": "List the nodes visited, in order, for each case:\n(a) a clear question whose passages are relevant at the first search;\n(b) a vague first question (\"et pour les congés ?\" with no context);\n(c) a question on a topic absent from the documents, where every search comes back off-topic (default settings).",
    "modelAnswer": "(a) summarize → rewrite → retrieve → grade (relevant) → fetch_parents → answer → END (kind: answer). (b) summarize → rewrite (judged ambiguous) → clarify → END (kind: clarification, one question asked; it cannot happen twice for the same question). (c) summarize → rewrite → retrieve → grade (off-topic) → reword → retrieve → grade (off-topic) → reword → retrieve → grade (off-topic, ceiling of 2 rewords reached) → refuse → END (kind: refusal, listing the searches tried).",
    "keyPoints": [
      "(a) ends with fetch_parents → answer",
      "(b) goes to clarify and stops",
      "(c) two rewords then refuse"
    ],
    "hints": [
      "Start every path at summarize. Which node decides between clarify and retrieve, and which node decides between answering, rewording and refusing?",
      "Invariant: route_after_grade sends RELEVANT → fetch_parents; OFF_TOPIC with rewords < 2 → reword; otherwise → refuse. route_after_rewrite sends vague → clarify.",
      "Similar case: a help-desk script says \"If unclear, ask one question. Otherwise look it up; if the files don’t match, rephrase at most twice; then either answer from the file or say we don’t have it.\" Write the steps for a caller whose topic isn’t in the files."
    ],
    "misconceptions": [
      "Putting \"answer\" before \"fetch_parents\".",
      "Letting case (c) loop more than twice, or refusing after the first miss."
    ]
  },
  "g09-2": {
    "prompt": "A jury member: \"Why use LangGraph? A while-loop in Python would do the same.\" Give the reason and the cost.",
    "modelAnswer": "A while-loop could do it, but our flow has a loop (reword then search again) and several branches (clarify or search; answer, reword or refuse). LangGraph makes each step a named node and each branch an explicit edge, so the retry ceiling and the refusal path are visible and testable one by one, and every step lands in the trace the user can inspect. That was the decision recorded as ADR-03. The cost is one more framework to learn and pin, and some ceremony. We checked its recursion limit on the pinned version so a higher retry ceiling can’t crash it.",
    "keyPoints": [
      "Loop and branches made explicit",
      "Testable / retry ceiling / trace",
      "Cost: extra framework/dependency"
    ],
    "hints": [
      "In a plain loop, where would a reader find the rule \"at most two rewords\"? In the graph, where is it?",
      "Invariant: design choices are defended by what they make checkable. What can you test node by node that is buried in a loop?",
      "Similar case: a recipe written as one long paragraph vs. numbered steps with \"if the dough is sticky, go back to step 3 (max twice)\". Which is easier to audit?"
    ],
    "misconceptions": []
  },
  "g10-1": {
    "prompt": "With the default configuration, a question is off-topic every time. (1) How many search rounds, grading decisions and rewords happen before the refusal? (2) An operator sets RETRY_CEILING=3. What changes, and why can it take effect without restarting the graph code?",
    "modelAnswer": "(1) Default retry_ceiling = 2: 3 search rounds (the first plus 2 rewords), 3 grading decisions, 2 rewords, then refuse. (2) With 3: 4 search rounds, 4 grades, 3 rewords, then refuse. It takes effect because route_after_grade reads get_settings().retry_ceiling at every decision and compares it with the number of rewords counted in the trace; nothing is hard-coded or captured when the graph is built. (Each round may run up to 5 queries, so the number of individual searches can be higher.)",
    "keyPoints": [
      "Default: 3 rounds / 3 grades / 2 rewords",
      "Ceiling 3: 4 rounds / 3 rewords",
      "Ceiling read from config at each decision"
    ],
    "hints": [
      "Is the first search a \"reword\"? Count the first round separately from the retries.",
      "Invariant: route_after_grade sends to reword while rewords < retry_ceiling; each reword is followed by one more retrieve and one more grade.",
      "Similar case: \"you may retake the exam at most 2 times\". How many times can a student sit the exam in total? And with 3 retakes?"
    ],
    "misconceptions": [
      "Counting only 2 search rounds (forgetting the first).",
      "Thinking the ceiling is fixed in graph.py."
    ]
  },
  "g10-2": {
    "prompt": "Explain question 33 to the jury in under a minute: what the answer is and where it lives, exactly which step fails and why, why it is a \"safe\" failure, what the fix is, and why you did not ship the fix before the defense.",
    "modelAnswer": "Question 33 (g-in-033) asks about a delay whose answer, one month, is in Article 66, and the search actually finds Article 66 at rank 1. The failure is in the grading step. The grader reads the 500-character child passages, and the relevant passage stops just before the one-month delay, so the grader judges it off-topic. It says so in all three rounds (rewording even drifted to French-France vocabulary), and SANAD refuses. It is a safe failure: SANAD declined, it did not invent. The fix is to let the grader read the whole parent section, as the writer already does. We did not ship it before the defense because it changes grading for every question and could break the 20/20 refusals; it must be re-evaluated through the gate first. It is planned at one month, with success defined as 40/40 while keeping 20/20.\n\nÀ dire au jury : La réponse est un délai d’un mois, à l’article 66, et la recherche le trouve en premier. Mais l’étape qui vérifie lit un extrait de 500 caractères qui s’arrête juste avant ce délai : elle le juge hors sujet trois fois, et Sanad refuse. C’est un refus prudent, pas une invention. Le remède est de faire lire la section entière au vérificateur, puis de vérifier que les 20 refus sur 20 tiennent toujours.",
    "keyPoints": [
      "Answer is in Article 66 (one month)",
      "Grader reads 500-char child that stops before the answer",
      "Safe: refusal, not invention",
      "Fix: grader reads full section; risk to 20/20 so re-evaluate first"
    ],
    "hints": [
      "Did the search find the right article? If yes, which later step in the graph could still reject it, and what text does that step read?",
      "Invariant: the grader and the writer do not read the same amount of text. The writer reads full sections, and the grader reads the retrieved 500-character passages.",
      "Similar case: a receptionist glances at the first line of a letter and decides it is not for the manager, although the key sentence is on line six. What would you change, and what new risk does it create?"
    ],
    "misconceptions": [
      "Saying the search failed to find Article 66.",
      "Calling it a hallucination: it is a refusal."
    ]
  },
  "g11-1": {
    "prompt": "The model misbehaves and writes: \"Selon l’article 99 [3], la période d’essai est de six mois\", although Article 99 was never retrieved. Can \"Article 99\" appear in the SOURCE LIST shown to the user? Walk through why. And what, if anything, would catch the wrong sentence itself?",
    "modelAnswer": "No. The source list is not parsed from the model’s text. make_answer builds the sources with _sources_for(cited), where cited is the set of retrieved passages whose parent sections were actually loaded, the same set the writer was shown. Article 99 was never retrieved, so it cannot become a source card, and the \"[3]\" points to nothing (the prompt forbids such references). The sentence itself, though, is still in the answer text. What catches it is the evaluation: the judge checks every claim of the answer against the cited sections, so an unsupported \"six mois / Article 99\" makes that answer fail G1, and the release gate blocks the version if too many answers fail. In live use, the user can open each source and see the claim isn’t there.",
    "keyPoints": [
      "Sources built by code from retrieved/cited passages",
      "Not parsed from the model text",
      "The wrong sentence is caught by the judge / G1 / gate"
    ],
    "hints": [
      "Look at make_answer: what variable are the source cards built from, and does it ever look at the text the model returned?",
      "Invariant: sources come from retrieved and loaded passages, never from model output. A different mechanism checks whether the prose is faithful.",
      "Similar case: a student’s bibliography is generated automatically from the library books they actually checked out. Can a fake book appear in it? Can the student still misquote a real book, and who catches that?"
    ],
    "misconceptions": [
      "Saying the sentence cannot appear at all: the prose can still be wrong; the SOURCE LIST cannot."
    ]
  },
  "g11-2": {
    "prompt": "Why does SANAD hold back the first 40 characters when it streams an answer? Describe what the user would see without it.",
    "modelAnswer": "The writer is allowed to reply exactly \"NOT_COVERED\" when the sections don’t answer, and that must become a refusal. If tokens were streamed immediately, the user would first see \"NOT_COV…\" appear as if an answer were starting, and then it would turn into a refusal: confusing, and it looks like a broken answer. Holding back the first 40 characters (STREAM_HOLD_CHARS) gives the app enough text to know whether this is NOT_COVERED before showing anything; once it clearly isn’t, the rest streams normally.",
    "keyPoints": [
      "Writer may reply NOT_COVERED",
      "Otherwise the user would see the start of a fake answer",
      "Hold back until it is clear, then stream"
    ],
    "hints": [
      "What special reply can the writer produce instead of an answer? What does it look like as it arrives letter by letter?",
      "Invariant: the user must never see answer text for something that ends as a refusal.",
      "Similar case: a TV live broadcast with a few seconds of delay so the producer can cut a problem before it airs. What is the \"problem\" here?"
    ],
    "misconceptions": []
  },
  "g12-1": {
    "prompt": "Jury: \"Your judge is Gemini grading Gemini. Why should we believe 39/40?\" Give an honest answer that admits the weakness, then gives what limits it and the planned fix.",
    "modelAnswer": "The bias is real: a judge from the same model family can favour that family’s answers, and our judge even gave every answered question exactly 1.00. We declare it as a limit. Four things limit it. First, the judge sees exactly the sections the writer saw and must find every claim in them, and G1 counts only a perfect 1.00. Second, we read the low-scoring and failed answers by hand, question by question (the triage documents). Third, G2, the 20/20 refusals, does not depend on the judge at all: it is read from the answer type. Fourth, G3 is structural. The planned fix, at six months, is a second judge from another model family plus 20 answers graded by hand to measure agreement.\n\nÀ dire au jury : Le biais existe : le juge vient de la même famille que le modèle noté, et nous le déclarons comme limite. Il est encadré : le juge voit exactement les sections que le rédacteur a vues, il faut une note parfaite de 1,0, et nous relisons les échecs à la main. Surtout, les 20 refus ne dépendent pas du juge : ils sont lus dans le type de réponse. La suite prévoit un second juge d’une autre famille et vingt réponses notées à la main.",
    "keyPoints": [
      "Admits same-family / self-preference bias",
      "Mitigation: sees exactly the cited sections / full 1.0 / manual triage",
      "G2 does not depend on the judge",
      "Plan: second judge from another family + human grading"
    ],
    "hints": [
      "Which of your three promises actually needs the judge, and which ones don’t?",
      "Rule for defending a weak point: (1) admit it plainly, (2) show what limits its damage, (3) give the fix and how you would measure it.",
      "Similar case: a teacher grades their own students’ exams. What would you ask for to trust the grades: a second marker? A sample regraded by someone else? Map that onto SANAD."
    ],
    "misconceptions": [
      "Denying the bias.",
      "Claiming the judge also decides the refusals."
    ]
  },
  "g12-2": {
    "prompt": "Why write and freeze the 60 questions BEFORE tuning anything? And how do you answer a jury member who found that two questions were changed after the freeze?",
    "modelAnswer": "If you tune while looking at the test questions, you can make the system pass those exact questions (tweak a prompt for question 12, a threshold for question 30) without it getting better in general. That is overfitting the test, and the score stops meaning anything. Freezing first makes the score an honest estimate on unseen questions. On the two changes: they are real and documented. One \"out-of-scope\" question actually had its answer in article 156 and was reclassified; another, about article 240, was replaced. Each was versioned with its history (issue #88) and the earlier version was re-measured on the new set. In both cases the dataset was wrong and SANAD was right: we corrected the exam, not the system.",
    "keyPoints": [
      "Tuning on the test inflates the score (overfitting)",
      "Two corrections: art. 156 reclassified, art. 240 replaced",
      "Versioned and documented; dataset wrong, not system"
    ],
    "hints": [
      "If you could see question 12 while editing the prompt, what would stop you from editing it just for question 12?",
      "Invariant: a test measures generalisation only if it is fixed independently of the tuning.",
      "Similar case: a teacher gives the exact exam questions to study the night before. The class average goes up. Did learning improve?"
    ],
    "misconceptions": []
  },
  "g13-1": {
    "prompt": "Jury: \"You went from 36 to 39 out of 40. So your changes improved quality by 7.5 points?\" Answer precisely, and mention one fact from the per-version failures that supports your caution.",
    "modelAnswer": "Carefully: it is three questions out of 40, and each question is worth 2.5 points, so the percentages exaggerate the precision. We ran each version once, and the model varies from run to run (temperature is not fixed). For example, g-in-014 passed in 2.0.0 and failed again in 3.0.0 with no related code change, so a one-question move can happen by chance. We did not run ablations, so we cannot attribute the gain to a specific change. The honest reading: a trend in the right direction, every failure was a refusal (never an invented answer), and the one persistent failure, g-in-033, has a known cause.",
    "keyPoints": [
      "3 questions / 2.5 points each",
      "Run-to-run variation / one run per version",
      "Concrete support: g-in-014 alternates, or no ablation"
    ],
    "hints": [
      "How many questions is 7.5 points? And how many times did you run each version?",
      "Rule of thumb: with n = 40, a difference of one or two questions is within normal noise unless you repeat runs.",
      "Similar case: a basketball player scores 36/40 free throws on Monday and 39/40 on Friday. Did Friday’s new shoes cause it? What would you need to know?"
    ],
    "misconceptions": []
  },
  "g13-2": {
    "prompt": "Correct and complete this sentence for the jury: \"Sanad répond en 8 secondes en moyenne, et synchronise 200 pages en moins de 10 minutes.\"",
    "modelAnswer": "Corrected: \"The MEDIAN answer time is 8.3 s over 20 timed questions (the slowest took 18.1 s; the target is a median of 20 s or less). It was measured on version 1; the first question after a start takes about 23 s while models load. For 200 pages, the 10-minute target was met on a quiet laptop (449 s and 375 s) and missed under load (732 s), mostly because computing embeddings uses the whole CPU. A re-sync of an unchanged folder takes 0.09 s.\" The two fixes: \"moyenne\" → \"médiane\", and \"always under 10 minutes\" → \"under 10 minutes when the machine is not busy, missed once under load\".",
    "keyPoints": [
      "Median, not mean",
      "8.3 s median, 18.1 s slowest",
      "200 pages: met when idle, missed under load (731.6 s)"
    ],
    "hints": [
      "Is 8.3 s the average of the 20 times, or the middle value? And did all three 200-page runs finish in under 600 s?",
      "Invariant: say exactly the statistic you measured (median ≠ mean), and report the failed run too.",
      "Similar case: a delivery firm says \"we deliver in 2 days on average\". Three runs: 1 day, 1.5 days, 4 days (during a strike). How would you state it honestly?"
    ],
    "misconceptions": []
  },
  "g14-1": {
    "prompt": "Choose the THREE limits you think a jury is most likely to attack first. For each: state the limit in one sentence, the planned fix, and the exact measure that will prove the fix worked.",
    "modelAnswer": "Any three of these, each with its fix and metric. (1) Local mode not measured, although the title says \"RAG local\": run the 60 frozen questions with MODEL_MODE=local (Ollama) at 1 month; success is the same gates (≥36/40, 20/20, 100%). (2) Same-family judge: add a second judge from another model family and hand-grade 20 answers at 6 months; success is measured agreement between judges and humans. (3) Question 33, where the grader reads a 500-character extract: let the grader read the whole section at 1 month; success is 40/40 while keeping 20/20. (4) Only 60 French questions: 30 Arabic questions (3 months), 20 figure questions (3 months). (5) No user interviews: 3 HR interviews plus a 5-user test at 6 months. A good answer picks local mode or the judge first, because they touch the title claim and the main number.",
    "keyPoints": [
      "Three limits named",
      "Each has a concrete fix",
      "Each has a measurable success criterion"
    ],
    "hints": [
      "Which of your limits contradicts a word in your TITLE? Which one touches your headline 39/40?",
      "Rule of thumb: limit → fix → number. A fix without a number to prove it is a wish.",
      "Similar case: a car review says \"the brakes were only tested on dry roads\". Good manufacturer answer: \"wet-road tests next month, target stopping distance under X m\". Do the same for three SANAD limits."
    ],
    "misconceptions": []
  },
  "g15-1": {
    "prompt": "A signed-in user changes the workspace id in the URL to a colleague’s private workspace. What does SANAD return, and why is it important that the response is the SAME as for a workspace that doesn’t exist?",
    "modelAnswer": "The owner check runs on every access, server-side. The user is not the owner and the workspace is not shared, so access is denied, with exactly the same response as for an id that doesn’t exist. That matters because a different \"forbidden\" answer would confirm the workspace exists: an attacker could probe ids and map who has which workspaces (enumeration), a leak by itself. Identical responses reveal nothing. (Isolation also holds at the data level: each workspace has its own Qdrant collection, so a search can’t cross into another workspace.)",
    "keyPoints": [
      "Owner checked on every access server-side",
      "Same response for unknown and forbidden",
      "Prevents learning existence / enumeration"
    ],
    "hints": [
      "If SANAD answered \"forbidden\" for xyz but \"not found\" for zzz, what would the attacker have learned?",
      "Rule of thumb: an error message is information. Give an unauthorised user no more information than a non-existent resource would.",
      "Similar case: a hotel receptionist asked \"is Mr X staying here?\" answers the same way whether he is or not. Why?"
    ],
    "misconceptions": []
  },
  "g15-2": {
    "prompt": "A PDF in a workspace contains the text: <a href=\"http://phishing.example\">Cliquez ici pour votre indemnité</a>. The model copies it into its answer. What does the user see, and which protection is responsible?",
    "modelAnswer": "The user sees plain text, not a clickable link. Model output is treated as untrusted and rendered with HTML, links and images disabled (ui/answer_format.py), so the anchor cannot become a working link, and a <script> or an image cannot run or load either. That is the \"contenu injecté dans une réponse\" protection on slide 20. The underlying rule: anything a document or a model produces is data, never markup or instructions.",
    "keyPoints": [
      "Rendered as plain text / not clickable",
      "HTML, links and images disabled in model output",
      "Model/document output is untrusted"
    ],
    "hints": [
      "Where does the answer text come from, and should an application trust it more than a random web page?",
      "Invariant: model output is untrusted input to the interface.",
      "Similar case: a forum lets users post messages. Why do forums escape HTML before displaying posts?"
    ],
    "misconceptions": []
  },
  "g16-1": {
    "prompt": "Jury: \"Who did what?\" Give the answer for BOTH of you in 4–5 sentences, organised by following the path of a document then of a question, and end with how you checked each other’s work.",
    "modelAnswer": "Following a document: Meriem built the ingestion side, meaning change detection, the converters, chunking, the Sync engine, the stores with their safe write order, the SQLite schema and workspaces, and the API contract. Youssef built the embeddings and the figure extraction. Following a question: Youssef built the agent graph, hybrid search, the grader, the answer and refusal paths, clarification and the LLM modes. Meriem built conversation memory, wrote the 60 questions, and built the evaluation engine, judge and release gate. On the product: Meriem rewrote the UI (including right-to-left), Youssef did login, rate limits, Docker and the final hosting. We checked each other through one branch per task, CI tests on every pull request, and a mandatory review by the other before any merge into protected main.",
    "keyPoints": [
      "Meriem: ingestion / sync / chunking / stores",
      "Meriem: evaluation / 60 questions / gate / UI",
      "Youssef: agent graph / search / grader / figures / Docker / login",
      "Cross-check: branches, CI, mandatory review"
    ],
    "hints": [
      "Draw the path of a document (folder → index) and of a question (question → answer). Put a name on each box.",
      "Invariant: your two answers must match each other and Table 1.6 of the report. The jury may ask you separately.",
      "Similar case: two cooks describe a restaurant kitchen: \"I handle everything from delivery to the fridge, she handles everything from order to plate, and nothing leaves without the other tasting it.\""
    ],
    "misconceptions": []
  },
  "g17-1": {
    "prompt": "Railway redeploys the app after a merge. Why are the workspaces, index and chat history still there afterwards, and what would happen without the volume? Also: why doesn’t the new container need to download the E5 model at boot?",
    "modelAnswer": "All state lives under /app/data (SQLite sanad.db, the Qdrant folder, parent JSON, figures, reports), and on Railway that path is a persistent volume mounted into each new container. The redeploy replaces the container, but the volume survives, so everything is still there. Without the volume, the container’s own filesystem would be thrown away on every redeploy or restart: all workspaces, the index and the history would vanish and every document would need a new Sync. The E5 and BM25 weights were downloaded at image build time (in the Dockerfile’s builder stage) and baked into the image, so boot doesn’t depend on a download (the image even runs with the Hugging Face hub in offline mode).",
    "keyPoints": [
      "State under /app/data on a persistent volume",
      "Container disk is ephemeral: without volume everything lost, resync needed",
      "Model weights baked into the image at build"
    ],
    "hints": [
      "Where on disk does SANAD keep its database and index? Is that place part of the container, or attached to it?",
      "Invariant: a container is disposable. Only what is on a mounted volume survives a redeploy.",
      "Similar case: a rental car is swapped for a new one every week. What must you keep in your own bag instead of the glovebox?"
    ],
    "misconceptions": []
  },
  "g17-2": {
    "prompt": "Why does the Dockerfile deliberately install the CPU-only version of PyTorch, and why does the build fail on purpose if its GPU filter drops nothing?",
    "modelAnswer": "PyTorch is needed by the E5 embedding model (sentence-transformers). The default Linux install pulls CUDA/GPU packages (nvidia-*, triton) that weigh several gigabytes, but neither the laptop nor Railway has a GPU, so they would be dead weight: slower builds, a bigger image and more memory. The Dockerfile removes those rows from the locked requirements and installs the CPU wheel pinned to the same version as uv.lock. If the filter dropped nothing, the lockfile format or platform changed and the GPU packages would silently come back, so the build stops with a clear error instead of producing a bloated image. It’s the same philosophy as the rest of the project: fail loudly rather than degrade silently.",
    "keyPoints": [
      "No GPU available; CUDA packages are huge",
      "CPU wheel pinned to uv.lock version",
      "Fail loudly instead of silently bloating"
    ],
    "hints": [
      "What hardware does Railway give this app? What do the nvidia-* packages need to be useful?",
      "Invariant: the image should contain what the app can actually use, pinned to the tested versions.",
      "Similar case: shipping a laptop with a 4 kg power supply for a desk that has no socket for it. And if the packing script accidentally stopped removing it, would you rather it warn or silently ship it?"
    ],
    "misconceptions": []
  },
  "g18-1": {
    "prompt": "A jury member opens agent/ports.py: \"Why are these eight functions passed in, with no default implementation? Isn’t that over-engineering?\"",
    "modelAnswer": "The graph never creates its own model or database client. It receives the eight functions (summarize, clarify, rewrite, retrieve, grade, reword, fetch_parents, write_answer) through AgentPorts: that is dependency injection. It lets us plug in the real Gemini/Ollama and Qdrant versions in production (one composition root, ui/ports.py) and scripted fakes in tests, so about 1,400 tests run fast, deterministically and without an API key, while still exercising the real routing logic. And there is no default on purpose: a default stub that \"answers plausibly\" could silently ship to production and produce fluent, unsourced answers, the exact failure SANAD exists to prevent. Forcing every caller to pass real ports makes that impossible to forget.",
    "keyPoints": [
      "Dependency injection: real in prod, fakes in tests",
      "Tests run without API key / deterministic",
      "No default because a plausible stub is dangerous"
    ],
    "hints": [
      "How do 1,400 tests exercise the agent without ever calling Gemini?",
      "Invariant: code that depends on an interface, not a concrete service, can be tested with a stand-in, and the stand-in must never be picked up by accident in production.",
      "Similar case: a flight simulator swaps the real engines for simulated ones, but a real plane must never take off with \"simulator mode\" as the default. Why?"
    ],
    "misconceptions": []
  },
  "g19-1": {
    "prompt": "Jury: \"Your title says RAG LOCAL, but your results were obtained with Gemini and your demo runs on Railway. Isn’t the title misleading?\"",
    "modelAnswer": "SANAD has two modes. In local mode, with Ollama, nothing leaves the machine; in cloud mode, the question and the retrieved passages go to Gemini. The documents, the index and the database always stay local, and the embeddings are always computed locally. It is true that all our measurements were made in cloud mode and that local mode has not been measured. That is our declared limit and our first action at one month: run the same 60 frozen questions in local mode against the same gates. The Railway deployment is for the demo, on a public corpus chosen for that reason. For real documents the plan is an install on the organisation’s machine in local mode, after a data-protection review under law 09-08. So \"local\" describes the architecture and the option, not the mode we measured, and we say so on slide 17.\n\nÀ dire au jury : Sanad a deux modes. En mode local, avec Ollama, rien ne sort de la machine ; en mode cloud, la question et les passages retenus partent vers Gemini. Les documents, l’index et la base restent toujours locaux. C’est vrai : toutes nos mesures sont en mode cloud et le mode local n’est pas encore mesuré. C’est notre première action à un mois, avec les mêmes 60 questions et les mêmes seuils. Railway sert à la démonstration, sur un corpus public.",
    "keyPoints": [
      "Two modes: local (Ollama) nothing leaves; cloud sends question + passages",
      "Admits results measured in cloud mode, local not measured",
      "Plan: evaluate local mode on the 60 questions",
      "Railway = demo on public corpus"
    ],
    "hints": [
      "What exactly leaves the machine in each of your two modes? And in which mode were your numbers produced?",
      "Rule: admit the fact, say what \"local\" does guarantee, and give the dated plan that closes the gap.",
      "Similar case: a car advertised as \"electric-capable\" (a plug-in hybrid) whose fuel figures were all measured in petrol mode. How would an honest engineer phrase it?"
    ],
    "misconceptions": []
  },
  "g19-2": {
    "prompt": "Jury: \"Why don’t you just set a similarity threshold (say 0.7) and refuse below it, instead of asking an LLM grader?\"",
    "modelAnswer": "Because our retrieval scores cannot measure relevance. The final ranking comes from RRF, which scores rank positions: the best hit of a search with nothing relevant still gets the top RRF score. A raw cosine threshold on the dense side isn’t reliable either. A passage can be close in meaning (\"same subject\") without containing the answer, and the right cut-off differs from one question and corpus to another. The grader answers the actual question, \"could someone write part of an answer from these passages?\", and its prompt says the same subject is not enough. The cost is one LLM call per round, and grader errors (question 33 is one). Those are measured by the 60-question evaluation. SANAD uses a dense top-1 similarity only for suggesting which workspace to ask when none is selected, not for refusing.",
    "keyPoints": [
      "RRF score is rank-based, not relevance",
      "Similar ≠ answers the question; threshold not reliable",
      "Grader judges whether passages answer, at a cost / measured"
    ],
    "hints": [
      "What does an RRF score actually encode? Would the top hit of a completely irrelevant search get a low score?",
      "Invariant: \"close in meaning\" and \"contains the answer\" are different properties; only the second justifies answering.",
      "Similar case: a library search always returns a \"best match\", even for a book it doesn’t own. Would you trust \"best match score > 0.7\" to mean \"we have your book\"?"
    ],
    "misconceptions": []
  },
  "g19-3": {
    "prompt": "Jury: \"How did you use AI tools, like code assistants, in this project? How do we know you understand the code?\" Give a truthful structure for your answer. What must it contain, and what must you avoid?",
    "modelAnswer": "Structure: (1) State plainly and truthfully which AI tools you used and for what (e.g. code generation and drafting), consistently with your partner. The jury may ask you separately, and the repository history can show it. (2) Explain how you kept control: every change went through a branch, CI tests and the other person’s review; you broke code on purpose to prove tests can fail; the evaluation gate measured behaviour independently of who wrote the code; and the Definition of Done required the owner to explain each change aloud in one minute. (3) Prove understanding on the spot: offer to walk through one path, e.g. a question through the nine nodes, or why the write order prevents broken citations. Avoid: denying or minimising use that happened, giving different stories, and claiming you \"wrote every line by hand\" if you didn’t.",
    "keyPoints": [
      "Truthful and consistent between partners",
      "Control: tests, review, gate, break-on-purpose",
      "Demonstrate understanding (walk through a path)"
    ],
    "hints": [
      "What happens to your credibility if the jury checks the repository history after you answer?",
      "Invariant: in a defense, understanding is shown, not claimed. Pair honesty about the tools with evidence of control and a live explanation.",
      "Similar case: a surgeon who used a robot is asked \"did the robot do it?\". The good answer says what the robot did, what the surgeon controlled, and how the outcome was verified."
    ],
    "misconceptions": []
  }
};
