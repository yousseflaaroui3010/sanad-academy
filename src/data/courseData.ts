export interface MiniQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TradeOffDilemma {
  title: string;
  metricA: string;
  metricB: string;
  description: string;
  insight: string;
}

export interface SubLesson {
  id: string;
  title: string;
  duration: string;
  metaphor: {
    title: string;
    description: string;
    emoji: string;
  };
  situation: {
    context: string;
    pressure: string;
  };
  solution: {
    title: string;
    explanation: string;
    keyPoints: string[];
  };
  alternative: {
    title: string;
    explanation: string;
    downside: string;
  };
  interactiveType: 'diagram' | 'slider' | 'quiz' | 'flowchart';
  audioNarration: {
    speaker: 'YL (Systems Architect)' | 'MB (Quality Guardian)';
    script: string;
  };
  keyTakeaway: string;
  miniQuiz?: MiniQuiz;
  tradeOff?: TradeOffDilemma;
}

export interface Lesson {
  id: string;
  specNumber: number;
  title: string;
  shortDescription: string;
  icon: string;
  subLessons: SubLesson[];
}

export interface Track {
  id: string;
  title: string;
  shortName: string;
  color: string;
  lessons: Lesson[];
}

export const COURSE_TRACKS: Track[] = [

  {
    id: 'track-1',
    title: "Track 1: Foundations & Agile Cadence",
    shortName: "Governance & Scrum",
    color: '#3b82f6',
    lessons: [
      {
        id: 'lesson-1',
        specNumber: 1,
        title: "Project Management & SCRUM Framework",
        shortDescription: "The YL & MB partnership, two-person code reviews, and the 10,000-foot system architecture.",
        icon: 'ShieldCheck',
        subLessons: [
          {
            id: '1-1',
            title: "1.1 The Two Architects & Two-Person Review Law",
            duration: '2 min',
            metaphor: {
              emoji: '✈️',
              title: "Co-Pilots in a Fighter Jet",
              description: "One pilot flies the plane and watches the instruments (YL: Architecture & Code); the other scans the radar, plots coordinates, and verifies mission rules (MB: Quality, Legal Corpus & Defense). Neither can pull the trigger without the other confirming target lock."
            },
            situation: {
              context: "A 2-person engineering unit tackling an enterprise-grade document AI system under tight delivery windows for master's thesis defense.",
              pressure: "If one person makes cowboy changes without verification, the system will hallucinate in front of the academic jury or crash under real corporate loads."
            },
            solution: {
              title: "Rule 5: The Immutable Two-Person Review Protocol",
              explanation: "No code branch is merged into master without explicit cryptographic or PR sign-off by both teammates. Responsibilities are split by strict domains (Architecture vs. Verification).",
              keyPoints: [
                "YL owns SQLite repositories, LangGraph state machines, and Docker runtime.",
                "MB owns RAGAS evaluation science, Moroccan legal corpus collection, and thesis chapters.",
                "Mandatory peer review on all architectural changes; zero cowboy coding.",
              ]
            },
            alternative: {
              title: "The Solo Cowboy or Vague Team Model",
              explanation: "A single developer writes everything with no peer oversight, or both teammates touch everything without domain boundaries.",
              downside: "High collision of merge conflicts, undiscovered regressions, and fatal hallucinations during live demos."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Welcome to Sanad Academy. When MB and I set out to build this platform, our first rule wasn't about Python or AI models. It was about trust and friction. We instituted Rule 5: no commit hits production unless both pilots sign off. I build the engine, MB grades the output."
            },
            keyTakeaway: "Great AI engineering starts with governance: clear domain ownership and mandatory verification prevent fatal production drift.",
            miniQuiz: {
              question: "Under Rule 5, when can a pull request be merged into master?",
              options: [
                "Whenever the architect finishes the code",
                "Only when both YL (Architecture) and MB (Verification) review and approve",
                "When unit test coverage reaches 50%",
              ],
              correctIndex: 1,
              explanation: "Rule 5 (The Two-Person Review Protocol) requires mutual sign-off between the build lead and research guardian on all architectural shifts."
            },
            tradeOff: {
              title: "Engineering Velocity vs Verification Friction",
              metricA: "Raw Speed",
              metricB: "Safety Rigor",
              description: "Skipping peer review lets solo developers ship fast early on, but introduces compounding silent regressions that sink production releases.",
              insight: "A 15-minute review gate prevents days of emergency debugging before live academic and customer demos."
            }
          },
          {
            id: '1-2',
            title: "1.2 The 10,000-Foot System Blueprint",
            duration: '3 min',
            metaphor: {
              emoji: '🏭',
              title: "The High-Security Factory Assembly Line",
              description: "Documents enter through the loading dock (Conversion Ladder), get chopped into manageable crates (Parent-Child Chunking), stored in high-density vaults (SQLite & Qdrant), and inspected by a 9-station quality control line before any answer leaves the building."
            },
            situation: {
              context: "Enterprise clients want to ask questions about heavy 400-page PDF legal codes without sending private data to public cloud chatbots.",
              pressure: "Naive chatbots feed full documents into LLMs, blowing past context limits, leaking data, and hallucinating answers."
            },
            solution: {
              title: "Local-First Dual-Store Architecture",
              explanation: "Sanad unifies four decoupled pillars: a FastAPI server, a SQLite relational store for audit trails, a Qdrant embedded vector database for semantic recall, and a LangGraph cyclic agent for strict evidence synthesis.",
              keyPoints: [
                "Local-first privacy: All document indexing and vector queries happen inside the user's local network.",
                "Dual-storage: SQLite preserves relational structure and sync status; Qdrant handles 768-dim semantic search.",
                "Strict decoupling: Agent reasoning is isolated behind 8 explicit hexagonal ports.",
              ]
            },
            alternative: {
              title: "Monolithic Cloud RAG Wrapper",
              explanation: "Sending raw user PDFs to a third-party hosted RAG API.",
              downside: "Violates Moroccan Law 09-08 privacy, leaks enterprise data, and locks the company into recurring API billing."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "Look at the four pillars on your screen. Notice how the agent brain never touches raw files directly. Every piece of evidence is indexed locally into SQLite and Qdrant first. Privacy is not a marketing checkbox; it is built into the blueprint."
            },
            keyTakeaway: "Decoupling storage, ingestion, and agent reasoning ensures privacy, testability, and resilience.",
            miniQuiz: {
              question: "Why does Sanad use both SQLite and Qdrant instead of just one database?",
              options: [
                "Because Qdrant cannot store files on disk",
                "SQLite handles ACID relational state and audits; Qdrant optimizes high-dimensional vector search",
                "To duplicate data in case one crashes",
              ],
              correctIndex: 1,
              explanation: "Each database specializes in its strength: SQLite excels at relational metadata, transactional foreign keys, and audit logs; Qdrant delivers sub-millisecond 768-dim vector search."
            },
          },
          {
            id: '1-3',
            title: "1.3 The RAG Golden Rule: Never Guess. Always Prove.",
            duration: '2 min',
            metaphor: {
              emoji: '⚖️',
              title: "The Open-Book Legal Exam",
              description: "Imagine taking the bar exam. If you write an answer from fuzzy memory, you fail instantly. You are only allowed to write what you can cite with exact article and page numbers right in front of you. If it is not in the book, you must write 'NOT COVERED'."
            },
            situation: {
              context: "Corporate HR and legal advisors using Sanad to calculate employee severance pay or notice periods.",
              pressure: "If the AI guesses a severance period incorrectly, the company risks costly labor lawsuits."
            },
            solution: {
              title: "Code-Enforced Citation Provenance",
              explanation: "The AI is mechanically blocked from returning an answer unless backed by exact parent passage citations. Python code constructs the citation metadata directly from retrieved disk blocks—the LLM cannot fabricate citations.",
              keyPoints: [
                "Answers must cite file, page, article number, and text snippet.",
                "If retrieval relevance score < 0.70 after 3 reword loops, the system must trigger an honest refusal (NOT_COVERED).",
                "Zero tolerance for unverified generative text.",
              ]
            },
            alternative: {
              title: "Generative Guessing (Standard Chatbot)",
              explanation: "Letting the LLM synthesize answers freely and generate citations from its own output text.",
              downside: "The LLM fabricates convincing-looking citations ('Article 999') that do not exist in real legal codes."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "This is the golden invariant of Sanad: Never Guess, Always Prove. If the evidence isn't in the document, Sanad refuses to answer. In enterprise software, an honest 'I don't know' is infinitely more valuable than a confident hallucination."
            },
            keyTakeaway: "True enterprise AI prioritizes honest refusal and code-enforced citations over creative conversational generation.",
            miniQuiz: {
              question: "Who writes the source citation card in Sanad?",
              options: [
                "The generative AI model",
                "The end user via manual selection",
                "Python runtime code verified from disk blocks",
              ],
              correctIndex: 2,
              explanation: "In Sanad, citations are code-enforced. Python code builds citation cards from the actual parent blocks retrieved from disk. The LLM is forbidden from authoring citations."
            },
            tradeOff: {
              title: "Helpfulness vs Factual Truth",
              metricA: "Chatty & Helpful",
              metricB: "Strictly Verified",
              description: "Standard chatbots try to answer every question to seem helpful. Sanad chooses honest refusal (NOT_COVERED) whenever proof is missing.",
              insight: "In regulated legal software, a single fabricated paragraph destroys user trust forever."
            }
          },
        ]
      },
      {
        id: 'lesson-2',
        specNumber: 2,
        title: "Agile Sprint Cadence (Sprints 0 through 6)",
        shortDescription: "From ground-zero tech scouting to Qdrant embeddings, LangGraph workflows, and Railway production release.",
        icon: 'Milestone',
        subLessons: [
          {
            id: '2-1',
            title: "2.1 Sprint 0 & 1: Ingestion, Storage & Embeddings",
            duration: '3 min',
            metaphor: {
              emoji: '🏗️',
              title: "Laying the Concrete Foundation",
              description: "You cannot build skyscraper penthouses (AI agents) until the steel rebar and concrete foundation (clean text extraction and vector storage) are rock solid."
            },
            situation: {
              context: "Sprint 0 & 1 kickoff: establishing the repository, package manager, and storage baseline.",
              pressure: "Slow Python dependency resolution with standard pip and memory bloat on document parsing."
            },
            solution: {
              title: "Modern Python Stack: uv + SQLite + multilingual-e5-base",
              explanation: "Adopted Astral uv for sub-second installs, established SQLite for tracking file status, and embedded Qdrant with intfloat/multilingual-e5-base for dense vector search.",
              keyPoints: [
                "uv package manager for deterministic lightning-fast builds.",
                "SHA-256 change detection to avoid redundant parsing of unchanged files.",
                "Parent-child chunking: 500-char children for search, 4000-char parents for context.",
              ]
            },
            alternative: {
              title: "Legacy pip + In-Memory Vector Lists",
              explanation: "Using standard pip with unpinned dependencies and raw Python array searches.",
              downside: "5-minute Docker builds, out-of-memory crashes on 100+ documents, and lack of persistence."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Sprint 1 was all about discipline. We didn't touch LLM generation. Instead, we spent two weeks perfecting the ingestion pipeline: SHA-256 hashing, multi-format text extractors, and parent-child storage."
            },
            keyTakeaway: "80% of RAG accuracy is determined by the quality of the ingestion and chunking pipeline before the LLM is ever called.",
            miniQuiz: {
              question: "What tool replaced standard pip to achieve sub-second builds in Sanad?",
              options: [
                "Conda",
                "Astral uv",
                "Poetry",
              ],
              correctIndex: 1,
              explanation: "Astral uv is written in Rust and provides 10-100x faster package resolution than standard pip, slashing Docker build times."
            },
          },
          {
            id: '2-2',
            title: "2.2 Sprints 2 & 3: LangGraph Agent & Evaluation Gates",
            duration: '3 min',
            metaphor: {
              emoji: '🏎️',
              title: "The High-Speed Crash Barrier Test",
              description: "Engineers don't test race cars on public roads; they drive them repeatedly on test tracks with precision sensors and high-speed telemetry."
            },
            situation: {
              context: "Sprint 2 & 3: Moving from raw vector search to agentic reasoning and automated evaluation.",
              pressure: "Generative answers drift over time as prompts change, requiring an automated objective referee."
            },
            solution: {
              title: "LangGraph Engine + RAGAS Golden Evaluation Runner",
              explanation: "Constructed the 9-node LangGraph cyclic workflow and implemented scripts/run_evaluation.py with RAGAS metrics gating release v1.0.0.",
              keyPoints: [
                "LangGraph cyclic state graph handles ambiguity and rewords failing queries.",
                "RAGAS evaluation runner benchmarks answer faithfulness and citation accuracy.",
                "Release Gate 1 (Faithfulness >=90%) and Gate 2 (Honest Refusal =100%) enforced.",
              ]
            },
            alternative: {
              title: "Subjective Manual Testing",
              explanation: "Asking the chatbot 5 sample questions manually before each sprint demo.",
              downside: "Undetected regressions and broken edge cases that surface during client presentations."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "In Sprints 2 and 3, we stopped guessing if our AI was smart. We created a 60-question frozen benchmark and built scripts/release_gate.py. If our code didn't hit 90% faithfulness, the build halted."
            },
            keyTakeaway: "Automated evaluation science turns AI engineering from black magic into predictable, testable software.",
          },
          {
            id: '2-3',
            title: "2.3 Sprints 4, 5 & 6: Defense Rehearsal & Cloud Production",
            duration: '2 min',
            metaphor: {
              emoji: '🥋',
              title: "The Black Belt Defense Board",
              description: "A martial artist rehearses every block and counter-strike 100 times before walking into the master jury grading exam."
            },
            situation: {
              context: "Preparing the academic jury defense (Sprint 4) while hardening the system for Railway cloud hosting with Keycloak OIDC (Sprints 5 & 6).",
              pressure: "Live demo network hiccups or tough jury questions about model hallucinations could derail graduation."
            },
            solution: {
              title: "Rehearsal Protocol & Enterprise Zero-Trust Deployment",
              explanation: "Built demo-script.md with 10 rehearsed demo runs, compiled a 30-question jury drill bank, and deployed to Railway with Keycloak authentication.",
              keyPoints: [
                "10 rehearsed live demo scripts with offline video fallbacks.",
                "Keycloak OIDC authentication managing enterprise RBAC roles.",
                "Railway cloud deployment with persistent storage mounts.",
              ]
            },
            alternative: {
              title: "Ad-Hoc Live Demo with No Backup",
              explanation: "Connecting live to external APIs with zero cached queries or rehearsed drill bank.",
              downside: "API rate-limits or WiFi outages during the jury presentation cause catastrophic failures."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "By Sprint 6, Sanad had evolved into an enterprise system: Keycloak identity management, Arabic RTL screen mirroring, and Railway cloud hosting with persistent volumes."
            },
            keyTakeaway: "Professional delivery requires both hardened cloud architecture and bulletproof presentation rehearsal.",
          },
        ]
      },
      {
        id: 'lesson-3',
        specNumber: 3,
        title: "Governance, Gates & Risk Management",
        shortDescription: "The Signed Spec Pack, Kill Checkpoints (C1-C3), the Descope Ladder, and Living Work Journals.",
        icon: 'ShieldAlert',
        subLessons: [
          {
            id: '3-1',
            title: "3.1 The Living Work Journals: Flight Recorders of Truth",
            duration: '2 min',
            metaphor: {
              emoji: '🛰️',
              title: "The Black Box Flight Recorder",
              description: "When an airplane encounters turbulence or reroutes, every altitude and rudder adjustment is recorded in the flight recorder. You never guess what happened after the flight—the data is right there."
            },
            situation: {
              context: "Google suddenly retired gemini-2.0-flash mid-project on August 27, 2026.",
              pressure: "Changing AI model providers mid-build can trigger silent failures, altered prompt behaviors, and broken evaluation scores."
            },
            solution: {
              title: "Three Living Work Journals: BUILD-STATE, BUILD-PLAN, and DECISIONS",
              explanation: "The team logged the exact migration to gemini-3.6-flash in DECISIONS.md, documenting reasons, files touched, and verification benchmarks before committing.",
              keyPoints: [
                "BUILD-STATE.md: The live status of current features, passing tests, and open blockers.",
                "BUILD-PLAN.md: The sprint roadmap and non-negotiable exit criteria.",
                "DECISIONS.md: Immutable log of trade-offs, approved deviations, and architectural decisions.",
              ]
            },
            alternative: {
              title: "Undocumented Slack Decisions",
              explanation: "Agreeing to change models or configs casually in chat without central documentation.",
              downside: "Team members forget why parameters were chosen, and regression bugs become untraceable."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "When Google retired Gemini 2.0 Flash in late August, we didn't panic. We held an escalation checkpoint, logged the trade-offs into DECISIONS.md, and validated Gemini 3.6 against our golden benchmark before shipping."
            },
            keyTakeaway: "Living journals transform messy real-world changes into an immutable, defensible audit trail.",
          },
          {
            id: '3-2',
            title: "3.2 The Signed Spec Pack & Spec-Lock Rule",
            duration: '2 min',
            metaphor: {
              emoji: '📜',
              title: "The Architect's Blueprints in Concrete",
              description: "Once the client and structural engineer sign the blueprints, the bricklayer cannot decide to add a balcony on a whim. Any change requires a formal change order."
            },
            situation: {
              context: "Beginning development on Phase 3 after signing off the Phase 2 specification pack.",
              pressure: "Feature creep can delay graduation deadlines and invalidate already-completed architecture designs."
            },
            solution: {
              title: "The Spec-Lock Law & Change Management",
              explanation: "Phase 2 specifications are write-locked. No teammate can alter a requirement without a formal escalation meeting and an immutable entry in DECISIONS.md.",
              keyPoints: [
                "Signed spec pack serves as the absolute source of truth.",
                "Informal scope additions are strictly prohibited.",
                "Deviations require an architectural trade-off analysis.",
              ]
            },
            alternative: {
              title: "Loose Informal Scope",
              explanation: "Continuously adding features as cool ideas appear during late-night coding sessions.",
              downside: "Never shipping version 1.0.0 due to perpetual unfinished work."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Locking the spec pack was our best decision. It gave us the freedom to build with clarity, knowing our target was frozen and agreed upon."
            },
            keyTakeaway: "Lock your specifications before coding: a moving target is impossible to hit on schedule.",
          },
          {
            id: '3-3',
            title: "3.3 Checkpoints C1-C3 & The Descope Ladder",
            duration: '2 min',
            metaphor: {
              emoji: '🎈',
              title: "The Hot Air Balloon Sandbags",
              description: "If a hot air balloon starts losing altitude, the pilot doesn't cut the fuel tank or the burner; they toss pre-planned sandbags overboard to stay aloft."
            },
            situation: {
              context: "Tight timeline with academic defense date fixed in stone.",
              pressure: "If unexpected technical bugs arise in Sprint 3, the entire release date could be missed."
            },
            solution: {
              title: "The Pre-Agreed Descope Ladder & Sacred Spine",
              explanation: "A pre-agreed shedding order: drop stretch features first (live folder sync, reasoning trace viewer), but NEVER cut the Sacred Spine (parent-child chunking, citation provenance, honest refusal).",
              keyPoints: [
                "Checkpoints C1, C2, C3 define pre-agreed kill and pivot dates.",
                "The Descope Ladder lists exact features to shed in priority order.",
                "The Sacred Spine is invariant: accuracy and citations can never be cut.",
              ]
            },
            alternative: {
              title: "Panic Scrapping Under Deadline",
              explanation: "Cutting core testing or verification steps at the last minute to make the demo work.",
              downside: "Shipping a broken system that hallucinates during the live presentation."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "We pre-agreed on what we would drop if we ran behind. We were willing to drop live folder sync, but we swore never to cut the 3 release gates. That was our Sacred Spine."
            },
            keyTakeaway: "Pre-plan your descope ladder so that if deadlines press, you shed luxury features while safeguarding core quality.",
          },
        ]
      },
    ]
  },
  {
    id: 'track-2',
    title: "Track 2: Product Vision & UX Accessibility",
    shortName: "Product & UX",
    color: '#06d6a0',
    lessons: [
      {
        id: 'lesson-4',
        specNumber: 4,
        title: "Product Purpose & Non-Negotiable Rules",
        shortDescription: "Answers strictly backed by proven sources, honest refusals, and legal disclaimers for regulated corpora.",
        icon: 'BookOpen',
        subLessons: [
          {
            id: '4-1',
            title: "4.1 Clickable Evidence Cards & Legal Disclaimers",
            duration: '2 min',
            metaphor: {
              emoji: '🧾',
              title: "The Itemized Grocery Receipt",
              description: "You don't just trust the cashier's verbal total; you check the printed receipt line by line. Every price matches a barcoded item."
            },
            situation: {
              context: "Presenting legal answers derived from the Moroccan Labor Code to enterprise HR executives.",
              pressure: "Executives cannot act on AI recommendations without legal verification and direct document access."
            },
            solution: {
              title: "Interactive Source Cards & Statutory Disclaimers",
              explanation: "Every answer block renders alongside verified source cards displaying file name, exact page number, and highlighted excerpt, with an unambiguous statutory disclaimer.",
              keyPoints: [
                "Direct links open the original document page with highlights.",
                "Mandatory statutory disclaimer: Sanad is a decision-support aid, not a certified attorney.",
                "Source cards built by Python runtime, impossible for AI to fabricate.",
              ]
            },
            alternative: {
              title: "Uncited AI Chat",
              explanation: "Standard conversational output with zero citations or generic footnotes.",
              downside: "Zero trust from compliance teams and total corporate liability."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "In legal tech, confidence without verification is toxic. Every answer generated by Sanad comes with clickable source cards and a mandatory disclaimer: Sanad is your assistant, not your legal counsel."
            },
            keyTakeaway: "Provide verification receipts on every statement to build unshakeable user trust.",
          },
          {
            id: '4-2',
            title: "4.2 Deterministic Honest Refusal (F-05)",
            duration: '2 min',
            metaphor: {
              emoji: '🩺',
              title: "The Responsible Doctor",
              description: "If you ask a cardiologist about a rare neurological condition, a good doctor says 'That is outside my specialty; let me refer you to a neurologist' rather than pretending to know."
            },
            situation: {
              context: "Users asking questions outside the uploaded workspace documents or queries where corpus evidence is ambiguous.",
              pressure: "Standard LLMs have a desperate urge to be helpful, hallucinating plausible answers when they don't know."
            },
            solution: {
              title: "F-05: Honest Refusal Over Guesswork",
              explanation: "If retrieved passage scores are below 0.70 after 3 reword attempts, the agent emits a standardized NOT_COVERED code and displays the exact terms searched.",
              keyPoints: [
                "Standardized NOT_COVERED status code.",
                "Displays transparent search history so user knows the system tried.",
                "Gate 2 enforces 100% refusal accuracy on out-of-scope benchmarks.",
              ]
            },
            alternative: {
              title: "Generative Evasion",
              explanation: "Letting the AI generate flowery apologies or guesses when missing evidence.",
              downside: "Wastes user time and risks deceptive answers."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Honest refusal is an engineering feature, not a failure. When Sanad says NOT_COVERED, you know it searched your documents thoroughly and refused to guess."
            },
            keyTakeaway: "An honest refusal builds far more user credibility than a fabricated answer.",
          },
        ]
      },
      {
        id: 'lesson-5',
        specNumber: 5,
        title: "Features Inventory (F-01 to F-16)",
        shortDescription: "Multi-tenant workspace isolation, live directory sync, dynamic clarification, and auto-routing.",
        icon: 'Sliders',
        subLessons: [
          {
            id: '5-1',
            title: "5.1 Workspace Isolation & Live Sync (F-01, F-02, F-13)",
            duration: '3 min',
            metaphor: {
              emoji: '🏦',
              title: "Safe Deposit Boxes in a Bank Vault",
              description: "Each client gets their own steel deposit box with a unique key. Opening Box A never gives you access or visibility into Box B."
            },
            situation: {
              context: "Multiple corporate departments (HR, Finance, Legal) using the same Sanad deployment.",
              pressure: "Accidental cross-tenant leakage between HR payroll files and general employee questions violates privacy laws."
            },
            solution: {
              title: "F-01 Workspace Isolation with BOLA Defense",
              explanation: "Each workspace is a logically isolated silo. Relational queries and Qdrant vector searches are hard-scoped to the user's workspace token.",
              keyPoints: [
                "Strict query filtering: `WHERE workspace_id = ?` on every read and write.",
                "F-13 Live Folder Sync: Watchdog automatically syncs local folders on file updates.",
                "Cascade deletion: Purging a workspace purges all documents, chunks, and vector payloads atomically.",
              ]
            },
            alternative: {
              title: "Shared Global Vector Collection",
              explanation: "Throwing all company files into one single vector database without tenant filters.",
              downside: "Cross-tenant data leaks and broken authorization (OWASP BOLA)."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Features F-01 and F-13 give users isolated safety deposit boxes. Whether you upload 10 documents or watch a live directory, every vector and chunk is cryptographically tied to that single workspace."
            },
            keyTakeaway: "Multi-tenant isolation must be enforced at the query and vector payload level, not just in UI menus.",
          },
          {
            id: '5-2',
            title: "5.2 Multi-Format Reading & Scanned OCR (F-11, F-16)",
            duration: '2 min',
            metaphor: {
              emoji: '🗂️',
              title: "The Polyglot File Reader",
              description: "A universal office clerk who can read handwritten faxes, modern Word documents, PDFs, and PowerPoint slide decks with equal ease."
            },
            situation: {
              context: "Enterprise files arrive in mixed formats: modern DOCX files alongside 20-year-old scanned PDFs.",
              pressure: "Image-only scanned PDFs return empty text strings under naive PDF extractors."
            },
            solution: {
              title: "F-11 & F-16 Multi-Format Ladder with OCR Fallback",
              explanation: "PyMuPDF for fast digital PDFs, python-docx for Word, python-pptx for slides, and Tesseract OCR as an automatic fallback when extracted text length is near zero.",
              keyPoints: [
                "Extracts structured text across PDF, DOCX, PPTX, TXT, and MD.",
                "Automatic OCR detection runs on scanned image pages.",
                "Preserves page numbers and slide indices for accurate citations.",
              ]
            },
            alternative: {
              title: "Plain Text Only Ingestion",
              explanation: "Demanding that users manually copy-paste text into .txt files.",
              downside: "Destroys user adoption and misses complex scanned documents."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "Features F-11 and F-16 ensure no file is left behind. When the Moroccan Labor Code arrived as a scanned 2004 PDF, our OCR ladder automatically extracted the legal articles cleanly."
            },
            keyTakeaway: "Support real-world document formats natively, with automated OCR fallbacks for historical scans.",
          },
          {
            id: '5-3',
            title: "5.3 Conversational Memory & Dynamic Clarification (F-06, F-07)",
            duration: '2 min',
            metaphor: {
              emoji: '💬',
              title: "The Attentive Legal Clerk",
              description: "If you say 'What about managers?', the clerk knows you are still talking about probation periods from your previous question, but asks for clarification if the question is ambiguous."
            },
            situation: {
              context: "Users asking follow-up questions with pronouns ('how long is it for them?').",
              pressure: "Stateless RAG engines evaluate each query in vacuum, failing on natural multi-turn conversations."
            },
            solution: {
              title: "F-06 & F-07 Sliding Memory & Clarification Nodes",
              explanation: "Maintains a sliding 5-turn conversational history window in SQLite and uses a dedicated clarification node in LangGraph to resolve missing parameters before search.",
              keyPoints: [
                "F-06: Sliding conversation memory window balances context and token budgets.",
                "F-07: Dynamic ambiguity clarification node prompts user before wasting vector searches.",
                "Chat history purges comply with Moroccan Law 09-08.",
              ]
            },
            alternative: {
              title: "Unbounded Conversation Accumulation",
              explanation: "Appending full chat transcripts indefinitely into the LLM context.",
              downside: "Exceeds model context limits, spikes latency, and dilutes retrieval relevance."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Conversational memory in F-06 allows natural dialogue, but we keep it bounded. Sliding windows preserve context without blowing past token limits or compromising privacy."
            },
            keyTakeaway: "Bound conversational memory to preserve context while protecting token budgets and user privacy.",
          },
        ]
      },
      {
        id: 'lesson-6',
        specNumber: 6,
        title: "UI & Accessibility Strategy (No-JS & Arabic RTL)",
        shortDescription: "Desktop-first strategy, progressive enhancement with HTMX, WCAG 2.1 AA, and full Arabic RTL layout mirroring.",
        icon: 'Layout',
        subLessons: [
          {
            id: '6-1',
            title: "6.1 Desktop-First Screen Strategy & Mobile Constraints",
            duration: '2 min',
            metaphor: {
              emoji: '🖥️',
              title: "The Lawyer's Dual-Monitor Desk",
              description: "Lawyers and compliance officers review documents side-by-side on wide desktop displays, needing the answer on the left and original document pages on the right."
            },
            situation: {
              context: "Sanad users are enterprise legal and HR specialists reviewing complex 50-page contracts.",
              pressure: "Mobile-only or cramped single-column UIs make side-by-side document comparison impossible."
            },
            solution: {
              title: "Desktop-First Screen Strategy with Split Drawers",
              explanation: "Primary layout optimizes for wide screens with dual split-screen document drawers, while gracefully stacking on tablet and mobile viewports.",
              keyPoints: [
                "Split-pane layout: Chat conversation on left, interactive document viewer on right.",
                "Responsive collapse: Drawers tuck into overlay sheets on smaller viewports.",
                "Keyboard shortcut bindings for fast document inspection.",
              ]
            },
            alternative: {
              title: "Mobile-Only Single Column",
              explanation: "Forcing desktop users into a narrow phone-style vertical column.",
              downside: "Wasted screen space and clumsy tab switching between answers and documents."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 6.1 prioritizes the desktop experience. Legal researchers need room to breathe, compare citations, and read source pages side-by-side."
            },
            keyTakeaway: "Design for your primary user's real physical workspace: desktop-first enables deep, multi-pane analysis.",
          },
          {
            id: '6-2',
            title: "6.2 The No-JS Philosophy & Trilingual Arabic RTL",
            duration: '2 min',
            metaphor: {
              emoji: '🪜',
              title: "The Staircase with an Escalator",
              description: "A solid concrete staircase works under any conditions (No-JS HTML). When electricity is available, an escalator runs on top (HTMX dynamic updates). If the power goes out, the stairs still get you to the top floor."
            },
            situation: {
              context: "Deploying to enterprise legal departments with locked-down corporate browser policies and Arabic-first legal teams.",
              pressure: "Heavy client-side React SPAs fail on restricted browser environments and break when flipping to right-to-left Arabic scripts."
            },
            solution: {
              title: "Server-Rendered HTML5 + HTMX + CSS RTL Mirroring",
              explanation: "Every form works via pure server-rendered HTML POST. HTMX progressively enhances interactions without full reloads. A dedicated RTL layout mirrors the sidebar, drawers, and chat bubbles seamlessly.",
              keyPoints: [
                "Pure HTML/CSS baseline: Functions 100% with JavaScript disabled.",
                "Progressive HTMX enhancement: Fast partial DOM swaps for smooth chat.",
                "Full RTL Arabic support: Mirrors screen landmarks according to native Arabic reading patterns.",
              ]
            },
            alternative: {
              title: "Heavy Client-Side SPA",
              explanation: "Building a 5MB JavaScript bundle that renders an empty white screen if JS fails to execute.",
              downside: "Inaccessible to screen readers, fails corporate proxy policies, and provides clunky RTL transitions."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "We chose a No-JS baseline because legal software must never fail. If a client's corporate proxy blocks scripts, Sanad still delivers answers via rock-solid server-rendered HTML."
            },
            keyTakeaway: "Progressive enhancement guarantees universal accessibility, speed, and resilience.",
          },
          {
            id: '6-3',
            title: "6.3 Screen-Reader Accessibility & WCAG 2.1 AA",
            duration: '2 min',
            metaphor: {
              emoji: '♿',
              title: "The Tactile Paving on Subway Platforms",
              description: "Tactile warning pavers allow visually impaired travelers to navigate subway platforms safely without sight. Good software provides the exact same navigational landmarks for screen readers."
            },
            situation: {
              context: "Ensuring corporate accessibility compliance for government and enterprise clients.",
              pressure: "AI chatbots with streaming text often overwhelm screen readers with rapid unannounced DOM changes."
            },
            solution: {
              title: "WCAG 2.1 AA Compliance with ARIA Live Regions",
              explanation: "Implements semantic HTML5 landmarks (<main>, <aside>, <nav>), high contrast ratios (>= 4.5:1), and ARIA live regions with assertive status for streaming AI answers.",
              keyPoints: [
                "aria-live='polite' regions announce streaming answers cleanly without stuttering.",
                "Full keyboard navigation: entire system navigable without mouse clicks.",
                "Strict color contrast standards verified by automated accessibility audits.",
              ]
            },
            alternative: {
              title: "Div Soup with Zero Accessibility",
              explanation: "Building interfaces entirely out of unlabelled <div> and <span> elements.",
              downside: "Inaccessible to blind professionals, violating enterprise accessibility requirements."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "Accessibility in Sanad is not an afterthought. ARIA live regions, semantic landmarks, and keyboard navigation ensure that visually impaired analysts can examine legal files with complete independence."
            },
            keyTakeaway: "Build accessibility into your HTML foundation: semantic landmarks and ARIA live regions make software usable by everyone.",
          },
        ]
      },
    ]
  },
  {
    id: 'track-3',
    title: "Track 3: System Architecture & Data Foundations",
    shortName: "Architecture & DB",
    color: '#f59e0b',
    lessons: [
      {
        id: 'lesson-7',
        specNumber: 7,
        title: "System Architecture & Software Engineering",
        shortDescription: "High-level UML component models, sequence flows, and Hexagonal Ports-and-Adapters pattern.",
        icon: 'Cpu',
        subLessons: [
          {
            id: '7-1',
            title: "7.1 UML Component Architecture & The 4 Pillars",
            duration: '2 min',
            metaphor: {
              emoji: '🏛️',
              title: "The Four Pillars of the Parthenon",
              description: "Remove any single pillar and the roof collapses. Sanad balances on 4 distinct structural columns: Client Layer, Core App Engine, Persistent Storage, and the Identity Provider."
            },
            situation: {
              context: "Designing a reliable architecture that runs locally on private hardware while maintaining enterprise boundaries.",
              pressure: "Blending database queries, LLM calls, and UI logic in an ad-hoc monolith leads to untestable systems that crash easily."
            },
            solution: {
              title: "Decoupled 4-Pillar Component Architecture",
              explanation: "Separates Client (server-rendered templates), Application Core (FastAPI & background workers), Storage (SQLite + Qdrant), and Identity (Keycloak).",
              keyPoints: [
                "Clear security borders and process lifecycles.",
                "Unidirectional data flow prevents circular dependencies.",
                "Enables independent horizontal scaling and containerization.",
              ]
            },
            alternative: {
              title: "Tightly Coupled Monolith",
              explanation: "Embedding raw SQL and vector store connections directly inside UI route handlers.",
              downside: "A failure in the vector store crashes the entire web server and locks the database."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 7.1 establishes the 4 pillars. Notice how the boundaries are enforced: each pillar has a defined lifecycle, communication protocol, and trust boundary."
            },
            keyTakeaway: "Clean architectural pillars establish predictable trust boundaries and process lifecycles.",
          },
          {
            id: '7-2',
            title: "7.2 Hexagonal Architecture & The 8 Explicit Ports",
            duration: '3 min',
            metaphor: {
              emoji: '🔌',
              title: "The Universal Travel Adapter",
              description: "Your laptop charger doesn't care whether you plug it into a European 2-pin socket, a UK 3-pin socket, or an airplane outlet. As long as the adapter delivers the right voltage, the laptop runs smoothly."
            },
            situation: {
              context: "Building an agent reasoning workflow that needs to switch between LLM providers and vector stores without rewriting business logic.",
              pressure: "Tightly coupling agent code to specific vendor SDKs makes unit testing slow, expensive, and fragile."
            },
            solution: {
              title: "8 Explicit Agent Ports",
              explanation: "All external dependencies (LLMs, embeddings, Qdrant, SQLite, parent store) are accessed strictly through abstract Python Protocol interfaces.",
              keyPoints: [
                "Agent reasoning core has zero imports from Qdrant, PyTorch, or OpenAI.",
                "Enables sub-millisecond unit testing with fake in-memory adapters.",
                "Swapping vector stores or LLMs requires writing a new adapter without touching agent graph logic.",
              ]
            },
            alternative: {
              title: "Hardcoded Direct SDK Calls",
              explanation: "Calling `openai.chat.completions.create()` directly inside reasoning functions.",
              downside: "Impossible to test without paying API bills; breaking vendor changes break the entire codebase."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 3.1.3, we defined 8 explicit ports. This hexagonal design means our LangGraph engine doesn't know or care whether Qdrant or an in-memory mock is answering. Testing becomes instantaneous."
            },
            keyTakeaway: "Isolate business and reasoning logic behind ports to make your AI system vendor-agnostic and instantly testable.",
          },
        ]
      },
      {
        id: 'lesson-8',
        specNumber: 8,
        title: "Data Persistence, Schemas & API Contracts",
        shortDescription: "SQLite relational schema, parent-child storage, zero-lock migrations, and frozen OpenAPI 3.1 contract.",
        icon: 'Database',
        subLessons: [
          {
            id: '8-1',
            title: "8.1 SQLite Relational Schema, Cascades & WAL Mode",
            duration: '2 min',
            metaphor: {
              emoji: '🗄️',
              title: "The Bank Vault Ledger",
              description: "Every transaction is written to an append-only ledger before hitting the vault. Other bank clerks can read balances simultaneously without freezing the cashier's pen."
            },
            situation: {
              context: "Managing multi-tenant workspaces, file upload metadata, and audit logs with concurrent read and write operations.",
              pressure: "Standard SQLite deployments run into 'database is locked' errors under concurrent multi-user load."
            },
            solution: {
              title: "ACID Persistence with WAL & Cascading Deletes",
              explanation: "PRAGMA journal_mode = WAL enables concurrent readers. Foreign key cascades guarantee that deleting a workspace purges all documents, chunks, and sessions atomically.",
              keyPoints: [
                "Write-Ahead Logging (WAL) enables non-blocking concurrent reads.",
                "PRAGMA foreign_keys = ON strictly enforced on every connection.",
                "Expand-contract zero-lock migrations prevent schema upgrade lockouts.",
              ]
            },
            alternative: {
              title: "Default Rollback Journal Mode",
              explanation: "Running SQLite in standard DELETE journal mode.",
              downside: "Any active write operation blocks all incoming read queries, triggering HTTP 500 crashes."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 8.1 details our relational schema. WAL mode and foreign key cascades mean our data is always consistent, and deleting a workspace never leaves orphan chunks behind."
            },
            keyTakeaway: "Enable WAL mode and foreign key cascades to ensure high concurrency and atomic integrity in SQLite.",
          },
          {
            id: '8-2',
            title: "8.2 Qdrant Topology & Parent-Child Storage Engine",
            duration: '3 min',
            metaphor: {
              emoji: '📇',
              title: "Library Index Cards vs Full Books",
              description: "The library catalog card contains 2 lines of summary and a shelf location number (~500 chars). You search the card catalog in seconds, walk to the shelf, and pull down the complete 500-page book (~4,000 chars)."
            },
            situation: {
              context: "Extracting legal provisions where individual sentences lack the context of the overarching article or chapter.",
              pressure: "Searching small chunks loses context; searching huge chunks dilutes semantic vector similarity."
            },
            solution: {
              title: "Parent-Child Text Storage Engine",
              explanation: "Store tiny 500-character child chunks in Qdrant with dense vectors for fast matching. When a child chunk matches, fetch its corresponding 4,000-character parent article from disk for LLM synthesis.",
              keyPoints: [
                "Child chunks: 500 chars, 50-char overlap, high vector precision.",
                "Parent chunks: 4,000 chars, complete legal articles with full context.",
                "Payload mapping connects vector search to disk parent blocks seamlessly.",
              ]
            },
            alternative: {
              title: "Single-Tier Uniform Chunking",
              explanation: "Splitting documents into uniform 1,000-char blocks and passing only those blocks to the AI.",
              downside: "The AI misses preceding definitions and subsequent exceptions, leading to inaccurate answers."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "This is our parent-child secret: Search the small thing, read the big thing. Qdrant matches the 500-character snippet in milliseconds, but our LLM gets the entire 4,000-character parent article to understand the complete legal context."
            },
            keyTakeaway: "Separating retrieval granularity from comprehension granularity resolves the core trade-off of RAG.",
          },
          {
            id: '8-3',
            title: "8.3 OpenAPI 3.1 Frozen Contract & Drift Verification",
            duration: '2 min',
            metaphor: {
              emoji: '🤝',
              title: "The Signed International Treaty",
              description: "Two countries agree on an exact trade treaty. If one side changes a tariff rate unilaterally, the border patrol immediately flags the violation."
            },
            situation: {
              context: "Maintaining stable interfaces across the FastAPI server, frontend HTMX views, and CI/CD automated runners.",
              pressure: "Developers modifying route responses can accidentally break third-party client integrations and evaluation scripts."
            },
            solution: {
              title: "OpenAPI 3.1 Frozen Contract & CI Drift Tests",
              explanation: "Frozen openapi.json specification. CI pipeline runs automated schema drift verification to fail builds if API endpoints deviate from the contract.",
              keyPoints: [
                "Strict JSON schema validation for all endpoints.",
                "Automated CI drift detection halts unauthorized schema changes.",
                "Clear API contracts simplify client integration.",
              ]
            },
            alternative: {
              title: "Unversioned Ad-Hoc APIs",
              explanation: "Changing JSON response formats casually without schema versioning.",
              downside: "Silent breakages across client dashboards and automated evaluation suites."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 8.3 explains contract drift verification. If a developer alters an endpoint shape without updating the spec, CI fails immediately, protecting our clients from unexpected regressions."
            },
            keyTakeaway: "Freeze your API contract and test for drift to protect external integrations from breaking changes.",
          },
        ]
      },
      {
        id: 'lesson-9',
        specNumber: 9,
        title: "Error Handling, Resilience & Failure Planning",
        shortDescription: "Startup job recovery worker, single-flight model loading, evidence-only mode, and exponential backoff.",
        icon: 'LifeBuoy',
        subLessons: [
          {
            id: '9-1',
            title: "9.1 Recovery of Abandoned Ingestion Jobs",
            duration: '2 min',
            metaphor: {
              emoji: '🛠️',
              title: "The Runway Inspection Crew",
              description: "Before opening the runway for morning flights, maintenance crews inspect the tarmac to clear any debris left behind from stormy night landings."
            },
            situation: {
              context: "Power cuts, server crashes, or container restarts occurring in the middle of a 100-page document ingestion job.",
              pressure: "Documents remain permanently stuck in PROCESSING state, showing users infinite loading spinners."
            },
            solution: {
              title: "Startup Recovery Worker (recovery.py)",
              explanation: "On application boot, recovery.py queries SQLite for any jobs left in PROCESSING, clears half-written chunk files, and transitions status to FAILED with a crash log.",
              keyPoints: [
                "Reconciles orphaned ingestion jobs before accepting traffic.",
                "Prunes orphaned temporary chunk files from disk.",
                "Eliminates infinite loading indicators for users.",
              ]
            },
            alternative: {
              title: "Ignoring Indeterminate State",
              explanation: "Letting stuck database records linger forever without automated cleanup.",
              downside: "Workspaces become permanently locked, requiring manual database surgery by an administrator."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 9.1, recovery.py runs on every startup. If a container crashes midway through indexing, it cleans up partial files and marks the job as recoverable."
            },
            keyTakeaway: "Automate startup reconciliation so crashes don't leave permanent state debris in your databases.",
          },
          {
            id: '9-2',
            title: "9.2 Single-Flight Loading & RAM Protection",
            duration: '2 min',
            metaphor: {
              emoji: '🚦',
              title: "The Single-Lane Mountain Tunnel",
              description: "When heavy trucks (PyTorch model weights) need to cross, the traffic light lets one truck through at a time. Other cars wait patiently instead of causing a multi-vehicle pileup."
            },
            situation: {
              context: "Deploying Sanad on 4GB RAM cloud containers or local edge servers during sudden traffic spikes.",
              pressure: "Multiple simultaneous user requests loading PyTorch embedding models will spike RAM and trigger Linux OOM Killer crashes."
            },
            solution: {
              title: "Single-Flight Mutex & Model Caching",
              explanation: "A concurrency mutex ensures embedding weights load exactly once while queued requests await the warmed instance. Pre-warms models in the background during boot.",
              keyPoints: [
                "Single-Flight lock prevents concurrent weight loading and RAM overflow.",
                "Background warming initializes model during FastAPI startup lifespan.",
                "Evidence-Only Mode: Fallback to returning raw passages if external LLMs fail.",
              ]
            },
            alternative: {
              title: "Unrestricted Concurrent Ingestion",
              explanation: "Allowing every incoming HTTP request to spawn its own PyTorch model instance.",
              downside: "Immediate server crash and database corruption."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Building software that works when things go well is easy. Section 3.4 is our airplane safety manual: single-flight locks to protect RAM, and startup workers to clean up crashed ingestion jobs automatically."
            },
            keyTakeaway: "Design for failure from day one: prevent resource contention with locks and implement automated state reconciliation.",
          },
        ]
      },
    ]
  },
  {
    id: 'track-4',
    title: "Track 4: AI Engine, LangGraph & Retrieval Science",
    shortName: "AI & LangGraph",
    color: '#ec4899',
    lessons: [
      {
        id: 'lesson-10',
        specNumber: 10,
        title: "AI Engineering, Retrieval Pipeline & Evaluation Science",
        shortDescription: "Content hashing, conversion ladders, parent-child chunking, and dense vector embeddings with mandatory prefixes.",
        icon: 'Sparkles',
        subLessons: [
          {
            id: '10-1',
            title: "10.1 Content Hashing & 4-State Difference Detection",
            duration: '2 min',
            metaphor: {
              emoji: '🔍',
              title: "The Passport Border Barcode",
              description: "The customs scanner reads your biometric passport barcode in 1 second. If your entry visa is valid and unchanged, you walk right through without a full luggage search."
            },
            situation: {
              context: "Ingesting hundreds of company documents where only 1 or 2 files change per week.",
              pressure: "Re-parsing and re-embedding every unchanged document burns GPU compute and takes hours."
            },
            solution: {
              title: "SHA-256 Difference Detection State Machine",
              explanation: "Calculates SHA-256 hashes of all files. Implements a 4-state transition machine: NEW (parse), MODIFIED (update), UNCHANGED (instant 1ms skip), and DELETED (purge chunks).",
              keyPoints: [
                "SHA-256 digital fingerprint calculated before parsing.",
                "UNCHANGED files bypass conversion and embedding entirely.",
                "Prunes deleted files and their vector payloads from Qdrant.",
              ]
            },
            alternative: {
              title: "Blind Re-Indexing",
              explanation: "Re-reading and re-embedding the entire folder on every sync trigger.",
              downside: "High latency, bloated cloud API bills, and wasted CPU cycles."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 10.1 introduces our digital fingerprinting. With SHA-256 difference detection, syncing a workspace with 500 documents takes under one second if no files were altered."
            },
            keyTakeaway: "Use content hashing to skip processing unchanged data: the fastest code is the code you don't run.",
          },
          {
            id: '10-2',
            title: "10.2 The Conversion Ladder & Text Extraction",
            duration: '2 min',
            metaphor: {
              emoji: '🪜',
              title: "The Format Translator Ladder",
              description: "A multilingual diplomat who greets each guest in their native language: speaking French to the PDF ambassador, English to the DOCX diplomat, and using a magnifying glass on ancient parchment."
            },
            situation: {
              context: "Corporate documents arrive in diverse office formats, including PDFs with embedded fonts and scanned images.",
              pressure: "Broken text extractors garble Arabic text or omit table columns, corrupting downstream search."
            },
            solution: {
              title: "4-Rung Extraction Ladder with Tesseract OCR",
              explanation: "PyMuPDF for modern PDFs, python-docx for Word, python-pptx for slides, and Tesseract OCR as a fallback on scanned image pages.",
              keyPoints: [
                "Dedicated parsers per file format with graceful error boundaries.",
                "Fallback to Tesseract OCR when extracted text density is near zero.",
                "Preserves section headers, page numbers, and slide titles.",
              ]
            },
            alternative: {
              title: "Generic Unstructured Text Dumps",
              explanation: "Using primitive string scrapers that strip page numbers and table structure.",
              downside: "Loss of citation provenance: the AI cannot tell which page an excerpt came from."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "In Section 10.2, our conversion ladder handles the messy reality of office files. It extracts text while preserving the critical metadata: page numbers, article tags, and document titles."
            },
            keyTakeaway: "Preserve structural metadata during extraction: page numbers and section headers are vital for citation provenance.",
          },
          {
            id: '10-3',
            title: "10.3 Dense Vectors & Mandatory E5 Prefixes",
            duration: '2 min',
            metaphor: {
              emoji: '🧭',
              title: "GPS Coordinates with Hemispheres",
              description: "A GPS coordinate without 'North' or 'South' is ambiguous. E5 embeddings require an asymmetric prefix to tell the model whether it is encoding a search query or a factual passage."
            },
            situation: {
              context: "Indexing Arabic and French legal texts with multilingual embedding models.",
              pressure: "Failing to provide exact model-specific prefixes causes a 15-20% drop in retrieval accuracy."
            },
            solution: {
              title: "Mandatory Prefixes: passage: and query:",
              explanation: "The embedding wrapper automatically validates and prepends the required prefix to documents during ingestion and queries during search.",
              keyPoints: [
                "Document chunk: passage: Article 184...",
                "Search query: query: What is the legal work week?",
                "Generates 768-dimensional normalized vectors optimized for Cosine similarity.",
              ]
            },
            alternative: {
              title: "Bare Text Embeddings",
              explanation: "Passing raw strings directly to asymmetric embedding models without prefixes.",
              downside: "Severe degradation in semantic retrieval rankings."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "In Section 4.1.4, we highlight the asymmetric prefix law. The multilingual-e5-base model was trained with distinct query and passage tokens. Omitting them ruins semantic proximity."
            },
            keyTakeaway: "Always respect embedding model training conventions: asymmetric prefixes are non-negotiable for high-precision retrieval.",
          },
        ]
      },
      {
        id: 'lesson-11',
        specNumber: 11,
        title: "The LangGraph Retrieval & Reasoning Workflow",
        shortDescription: "9-node cyclic state graph, hybrid vector+BM25 search, relevance grading, and reword-retry loops.",
        icon: 'GitFork',
        subLessons: [
          {
            id: '11-1',
            title: "11.1 The 9-Node Cyclic State Machine",
            duration: '3 min',
            metaphor: {
              emoji: '🤖',
              title: "The 9-Station Automotive Inspection Line",
              description: "At station 1, the car body is shaped (split query); at station 3, parts are assembled (hybrid search); at station 4, inspectors check every bolt (relevance grading). If a defect is found, it circles back for retooling (reword query). If flawless, it passes final certification."
            },
            situation: {
              context: "Users asking multi-part questions or vague search terms that fail on single-shot RAG retrieval.",
              pressure: "Single-shot RAG either answers poorly or hallucinates when the initial retrieval search misses."
            },
            solution: {
              title: "LangGraph Cyclic Reasoning Graph",
              explanation: "A deterministic 9-node state machine that dynamically checks ambiguity, performs hybrid RRF retrieval, grades passages, and loops up to 3 times to reformulate queries.",
              keyPoints: [
                "Nodes: split, clarify, retrieve, grade, reword, synthesize, format, verify, refuse.",
                "Reciprocal Rank Fusion (RRF) combines Qdrant vector search and BM25 keywords.",
                "Bounded cycle: Automatically caps reword loops at 3 to guarantee fast execution.",
              ]
            },
            alternative: {
              title: "Linear Prompt Chain (Single-Shot RAG)",
              explanation: "Query ➡️ Vector Search ➡️ LLM Answer in one shot.",
              downside: "High failure rate on vague queries and inability to ask clarifying questions."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "This is the beating heart of Sanad. Notice the loop between relevance grading and query rewording. If the first search misses the mark, the agent reformulates its search terms automatically, just like a human researcher."
            },
            keyTakeaway: "Cyclic state machines transform fragile one-shot prompt chains into resilient, self-correcting reasoning agents.",
          },
          {
            id: '11-2',
            title: "11.2 Hybrid Search & Reciprocal Rank Fusion (RRF)",
            duration: '2 min',
            metaphor: {
              emoji: '🔀',
              title: "The Detective and The Librarian Working Together",
              description: "The detective understands the conceptual motive of the crime (Dense Semantic Vector Search). The librarian knows the exact alphanumeric filing index of the book (BM25 Keyword Search). Combining their findings catches everything."
            },
            situation: {
              context: "Legal queries containing specific statute numbers ('Article 184') alongside broad conceptual questions ('rules on working hours').",
              pressure: "Pure vector search often misses exact article numbers, while pure keyword search misses semantic synonyms."
            },
            solution: {
              title: "Hybrid Search Merged via RRF Formula",
              explanation: "Executes dense Qdrant vector search and sparse BM25 lexical search in parallel, fusing ranked lists with the Reciprocal Rank Fusion formula: Score = Sum(1 / (60 + rank)).",
              keyPoints: [
                "Combines semantic understanding with exact alphanumeric precision.",
                "RRF formula merges disparate score distributions without manual tuning.",
                "Consistently outperforms single-retriever setups by 15-30% in recall.",
              ]
            },
            alternative: {
              title: "Pure Semantic Vector Search",
              explanation: "Relying 100% on vector embeddings for all search queries.",
              downside: "Frequently fails on exact statute numbers, acronyms, and alphanumeric contract codes."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "In Section 11.2, hybrid search solves the legal search dilemma. Dense vectors catch synonyms; BM25 catches exact article numbers. RRF merges them into a unified list."
            },
            keyTakeaway: "Fuse dense semantic search with sparse lexical search to conquer both concepts and exact alphanumeric codes.",
          },
          {
            id: '11-3',
            title: "11.3 Relevance Grading & Reword-Retry Loops",
            duration: '2 min',
            metaphor: {
              emoji: '🔄',
              title: "The Persistent Researcher",
              description: "If you look up 'job termination' in an index and find nothing, you don't give up; you look up 'dismissal' or 'severance' before returning empty-handed."
            },
            situation: {
              context: "Initial search terms failing to retrieve passages that pass the 0.70 relevance threshold.",
              pressure: "Feeding irrelevant passages to the answer writer leads to confusing or hallucinated responses."
            },
            solution: {
              title: "Machine Relevance Grading + Bounded Reword Loop",
              explanation: "A specialized grader node evaluates retrieved chunks. If 0 chunks qualify, a reword node reformulates the query and retries the search, bounded to 3 iterations.",
              keyPoints: [
                "Grader discards noise passages before answer synthesis.",
                "Reword node expands vocabulary and generates alternative search phrasing.",
                "Bounded loops guarantee the system never hangs in an infinite loop.",
              ]
            },
            alternative: {
              title: "Unfiltered Garbage In, Garbage Out",
              explanation: "Feeding whatever raw passages vector search returned directly to the LLM.",
              downside: "The LLM struggles with irrelevant context, producing low-quality answers."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 11.3 introduces our self-correcting loop. If the first search misses, the reword node reformulates the question up to three times before triggering an honest refusal."
            },
            keyTakeaway: "Grade retrieved evidence before synthesis and use bounded retry loops to recover from initial search misses.",
          },
        ]
      },
      {
        id: 'lesson-12',
        specNumber: 12,
        title: "Evaluation Science, Release Gates & Quality Metrics",
        shortDescription: "The 60-question frozen golden dataset, Gate 1 (Faithfulness), Gate 2 (Honest Refusals), and Gate 3 (Citations).",
        icon: 'Award',
        subLessons: [
          {
            id: '12-1',
            title: "12.1 The 60-Question Frozen Golden Benchmark",
            duration: '2 min',
            metaphor: {
              emoji: '🧊',
              title: "The Sealed Bar Exam Envelope",
              description: "The standardized test questions are locked in a tamper-evident safe until exam day. Nobody gets to change the questions to make their favorite candidate look good."
            },
            situation: {
              context: "Validating AI performance across model updates, prompt revisions, and code refactors.",
              pressure: "Changing evaluation questions between runs creates moving goalposts and invalidates benchmark progress."
            },
            solution: {
              title: "Frozen Golden Evaluation Dataset (40 In-Scope, 20 Out-of-Scope)",
              explanation: "Curated benchmark of 60 certified questions covering the Moroccan Labor Code. 40 in-scope questions test deep legal comprehension; 20 out-of-scope questions test refusal discipline.",
              keyPoints: [
                "Write-locked benchmark with verified ground truth answers.",
                "20 adversarial out-of-scope queries test hallucination resistance.",
                "Modifications require formal sign-off in DECISIONS.md.",
              ]
            },
            alternative: {
              title: "Informal Ad-Hoc Testing",
              explanation: "Typing random questions into the chat box to test the AI.",
              downside: "Subjective, non-repeatable, and blinds the team to subtle regression bugs."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "In Section 12.1, we created our 60-question benchmark. It is frozen in stone. 40 questions test knowledge; 20 test honest refusals. It gives us an objective mathematical score on every commit."
            },
            keyTakeaway: "Freeze your evaluation benchmark to ensure objective, repeatable quality measurement.",
          },
          {
            id: '12-2',
            title: "12.2 The 3 Non-Negotiable Release Gates",
            duration: '2 min',
            metaphor: {
              emoji: '🚪',
              title: "The Triple-Lock Vault Door",
              description: "Opening the bank vault requires turning three distinct keys simultaneously: Key 1 for truth, Key 2 for honesty, and Key 3 for proof receipts."
            },
            situation: {
              context: "Deciding whether a candidate build is safe to deploy to corporate clients or present to the thesis defense jury.",
              pressure: "Shipping an AI build that hallucinates on 5% of queries destroys professional trust and violates contracts."
            },
            solution: {
              title: "G1 (Faithfulness >=90%), G2 (Refusals =100%), G3 (Citations =100%)",
              explanation: "Automated release gate script computes RAGAS metrics and asserts mathematical thresholds. A single failure halts deployment.",
              keyPoints: [
                "Gate 1: >=90% Answer Faithfulness (no hallucinated claims).",
                "Gate 2: =100% Honest Refusal Accuracy (zero guessing on out-of-scope).",
                "Gate 3: =100% Citation Integrity (all claims cite valid parent pages).",
              ]
            },
            alternative: {
              title: "Vibe-Based Sign-Off",
              explanation: "Declaring a build ready because the developers think it feels good.",
              downside: "Disastrous failures in front of customers or academic defense juries."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "Section 12.2 codifies our three gates: G1, G2, G3. If a build scores 99% on honest refusals, it fails. We demand 100% honesty on out-of-scope queries."
            },
            keyTakeaway: "Enforce strict mathematical release gates to guarantee zero-hallucination standards in production.",
          },
          {
            id: '12-3',
            title: "12.3 The Locked Prompt Registry & Semantic Versioning",
            duration: '2 min',
            metaphor: {
              emoji: '📖',
              title: "The Chef's Locked Recipe Book",
              description: "A Michelin-star restaurant does not let line cooks alter sauce recipes on a whim. Every recipe is recorded in a master handbook with exact gram weights and revision dates."
            },
            situation: {
              context: "Managing multiple AI prompts across answering, query rewording, and relevance grading as the system evolves.",
              pressure: "Tinkering with prompt strings directly inside Python code causes untracked behavior shifts and regression bugs."
            },
            solution: {
              title: "Prompts Registry with SemVer (MAJOR.MINOR.PATCH)",
              explanation: "All prompts reside in prompts/<role>/PROMPT.md files with metadata frontmatter. agent/prompts.py loads and validates templates at application boot.",
              keyPoints: [
                "Prompts isolated from Python code into Markdown files.",
                "Semantic versioning (0.1.0, 0.2.0) tracks prompt evolution.",
                "Prompt changes require a paired evaluation benchmark run.",
              ]
            },
            alternative: {
              title: "Hardcoded String Literals in Code",
              explanation: "Scattering triple-quoted strings inside Python functions.",
              downside: "Untracked prompt changes and impossible regression debugging."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 12.3, our prompt registry enforces clean version control. Prompts live in Markdown files, versioned with SemVer, and loaded into memory at startup."
            },
            keyTakeaway: "Isolate prompts in versioned registry files to prevent accidental behavioral drift.",
          },
        ]
      },
    ]
  },
  {
    id: 'track-5',
    title: "Track 5: Zero-Trust Security & Cloud Deployment",
    shortName: "Security & Cloud",
    color: '#ef4444',
    lessons: [
      {
        id: 'lesson-13',
        specNumber: 13,
        title: "Security, Access Control & Deployment Engineering",
        shortDescription: "Keycloak OIDC integration, session encryption, RBAC permissions matrix, and self-signup quarantine.",
        icon: 'Key',
        subLessons: [
          {
            id: '13-1',
            title: "13.1 Keycloak OIDC & Encrypted Session Cookies",
            duration: '2 min',
            metaphor: {
              emoji: '🛂',
              title: "The Independent Embassy Passport Control",
              description: "The hotel receptionist doesn't print passports. You bring an official biometric passport stamped by the national embassy, and the receptionist verifies its holographic seal."
            },
            situation: {
              context: "Corporate enterprises requiring single sign-on (SSO) and centralized identity lifecycle management.",
              pressure: "Custom homegrown user and password tables in SQLite fail enterprise audits and lack multi-factor authentication (MFA)."
            },
            solution: {
              title: "Federated Identity via Keycloak OpenID Connect",
              explanation: "Delegates user authentication to an independent Keycloak server. Issues encrypted, HTTP-only session cookies with automatic token renewal and single logout.",
              keyPoints: [
                "Standardized OpenID Connect Authorization Code flow.",
                "Encrypted HTTP-only cookies protect JWT tokens from XSS theft.",
                "Automatic background token rotation preserves active user sessions.",
              ]
            },
            alternative: {
              title: "Local Password Hashes in Application DB",
              explanation: "Storing bcrypt password hashes in SQLite alongside document records.",
              downside: "High security liability, zero MFA capability, and violation of enterprise SSO mandates."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 13.1, our identity architecture delegates authentication to Keycloak over OpenID Connect. User passwords never touch our application server."
            },
            keyTakeaway: "Delegate authentication to proven OpenID Connect providers to achieve enterprise-grade SSO and zero-trust security.",
          },
          {
            id: '13-2',
            title: "13.2 The 4-Tier RBAC Matrix & Self Sign-Up Quarantine",
            duration: '2 min',
            metaphor: {
              emoji: '🪪',
              title: "Keycard Access Levels in Corporate HQ",
              description: "An intern keycard opens the front lobby and cafeteria. A manager keycard opens department offices. An executive keycard opens the boardroom and executive vaults."
            },
            situation: {
              context: "Managing different user privileges across corporate workspaces with self-registration enabled.",
              pressure: "New users signing up might gain immediate access to confidential corporate financial workspaces."
            },
            solution: {
              title: "4-Tier RBAC + Automatic Quarantine Default",
              explanation: "Defines Admin, Auditor, Member, and Viewer roles. Newly self-registered accounts are automatically assigned an unprivileged quarantine role with zero workspace grants until manually approved.",
              keyPoints: [
                "4 roles: Admin (full), Auditor (logs/evals), Member (sync/chat), Viewer (read-only query).",
                "Self sign-up quarantine prevents unauthorized data exposure.",
                "Explicit workspace grants mapped at the database level.",
              ]
            },
            alternative: {
              title: "Default Open Permissions",
              explanation: "Granting new registered users immediate access to all existing workspaces.",
              downside: "Immediate corporate data leakage and catastrophic breach of tenant isolation."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 13.2 enforces our 4-tier role hierarchy. Notice our quarantine rule: anyone can create an account, but you cannot view a single document until an administrator explicitly grants you access."
            },
            keyTakeaway: "Default to zero trust: quarantine newly registered accounts until an administrator grants explicit workspace access.",
          },
        ]
      },
      {
        id: 'lesson-14',
        specNumber: 14,
        title: "OWASP Web Security & Privacy Compliance",
        shortDescription: "BOLA multi-tenant query isolation, path traversal defense, parameterized SQL, and Moroccan Law 09-08 compliance.",
        icon: 'Lock',
        subLessons: [
          {
            id: '14-1',
            title: "14.1 Workspace Isolation & BOLA Defense with Silent 404s",
            duration: '2 min',
            metaphor: {
              emoji: '🕵️',
              title: "The Bouncer Who Says 'Never Heard of It'",
              description: "If someone asks for a private VIP room they aren't invited to, the bouncer doesn't say 'You are not allowed in' (403 Forbidden). The bouncer says 'There is no such room here' (404 Not Found)."
            },
            situation: {
              context: "Preventing malicious users from guessing workspace IDs or accessing confidential company files.",
              pressure: "OWASP Broken Object-Level Authorization (BOLA) is the #1 enterprise API vulnerability."
            },
            solution: {
              title: "Silent 404s on Unauthorized Tenant Requests",
              explanation: "If a user attempts to access an ungranted workspace ID, the server responds with HTTP 404 (Not Found) rather than 403 (Forbidden), eliminating ID enumeration vectors.",
              keyPoints: [
                "Silent 404 responses eliminate tenant discovery attacks.",
                "Every SQL query enforces WHERE workspace_id = ?.",
                "Every Qdrant search applies a workspace_id metadata filter.",
              ]
            },
            alternative: {
              title: "Standard 403 Forbidden Responses",
              explanation: "Returning HTTP 403 when a user requests an unauthorized workspace ID.",
              downside: "Confirms to attackers that the workspace exists, enabling targeted brute-force attacks."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "In Section 14.1, BOLA defense is paramount. Returning a silent 404 ensures attackers never know whether an ID exists, completely shutting down enumeration attempts."
            },
            keyTakeaway: "Defend against BOLA with tenant-scoped queries and return silent 404s to eliminate resource enumeration.",
          },
          {
            id: '14-2',
            title: "14.2 Path Traversal, SQL Injection & Secret Hygiene",
            duration: '2 min',
            metaphor: {
              emoji: '🛡️',
              title: "The Sanitizing Air Shower",
              description: "Before entering a sterile microprocessor cleanroom, technicians walk through an air shower that blows away all external dust and contaminants."
            },
            situation: {
              context: "Accepting user file uploads and processing arbitrary legal search queries.",
              pressure: "Attackers upload malicious filenames like '../../etc/passwd' or craft SQL injection payloads in chat messages."
            },
            solution: {
              title: "Upload Sanitization, Parameterized SQL & Gitleaks",
              explanation: "Upload filenames pass through strict regex sanitization with an extension allowlist. All relational database queries use 100% parameterized statements, and CI runs automated Gitleaks secret scans.",
              keyPoints: [
                "File extension allowlist (.pdf, .docx, .pptx, .txt, .md).",
                "100% parameterized SQL queries eliminate injection completely.",
                "Automated Gitleaks scanner prevents accidental credential commits.",
              ]
            },
            alternative: {
              title: "Raw String Concatenation",
              explanation: "Building SQL queries with f-strings: f'SELECT * FROM docs WHERE name = {name}'.",
              downside: "Catastrophic SQL injection vulnerabilities allowing complete database theft."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 14.2 enforces basic hygiene: parameterized queries, strict filename sanitization, and automated secret scanning with Gitleaks on every commit."
            },
            keyTakeaway: "Never trust external input: sanitize upload paths and enforce parameterized queries across 100% of your codebase.",
          },
          {
            id: '14-3',
            title: "14.3 Moroccan Law 09-08 Personal Data Protection",
            duration: '2 min',
            metaphor: {
              emoji: '🇲🇦',
              title: "The Right to Be Forgotten Incinerator",
              description: "When a client closes their account, every document, filing card, and index notebook is placed in the industrial incinerator and burned to ash. No duplicate copies remain in secret drawers."
            },
            situation: {
              context: "Deploying Sanad within Moroccan jurisdiction, processing corporate documents containing employee names and salaries.",
              pressure: "Moroccan Law 09-08 mandates strict data controller accountability, data minimization, and verified data purge rights."
            },
            solution: {
              title: "Law 09-08 Compliance Framework & Atomic Purge",
              explanation: "Names YL as designated data controller, enforces data minimization by avoiding third-party telemetry, and provides atomic workspace purges that delete relational rows, parent disk text, and vector points simultaneously.",
              keyPoints: [
                "Designated data controller accountability under Moroccan law.",
                "Zero external telemetry logging of user document contents.",
                "Atomic purge deletes SQLite records, disk files, and Qdrant points.",
              ]
            },
            alternative: {
              title: "Soft Deletes with Lingering Data",
              explanation: "Marking deleted = true in SQLite while leaving document text on disk.",
              downside: "Violates regulatory data protection laws and exposes historical client data in backups."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "Section 14.3 ensures full compliance with Moroccan Law 09-08. When a user requests deletion, our cascade purge wipes SQLite records, disk files, and Qdrant vectors completely."
            },
            keyTakeaway: "Implement verifiable data minimization and atomic deletion to satisfy legal data protection mandates.",
          },
        ]
      },
      {
        id: 'lesson-15',
        specNumber: 15,
        title: "Technology Stack & Production Deployment",
        shortDescription: "Python 3.12, uv, multi-stage CPU PyTorch Docker container, and Railway cloud deployment with persistent volumes.",
        icon: 'Cloud',
        subLessons: [
          {
            id: '15-1',
            title: "15.1 Python 3.12, Astral uv & CPU PyTorch",
            duration: '2 min',
            metaphor: {
              emoji: '⚡',
              title: "The Formula 1 Pit Stop",
              description: "Standard pit crews take 30 seconds to change four tires. A Formula 1 crew does it in 1.8 seconds flat. Astral uv is the Formula 1 pit crew of the Python ecosystem."
            },
            situation: {
              context: "Building and maintaining a modern Python 3.12 project with heavy machine learning dependencies.",
              pressure: "Traditional pip installs and resolving torch dependencies can take 10+ minutes during CI/CD builds."
            },
            solution: {
              title: "uv Package Manager + CPU PyTorch Wheels",
              explanation: "Adopts Astral uv for sub-second dependency locking and installs CPU-only PyTorch wheels (--index-url https://download.pytorch.org/whl/cpu), reducing image size from 4GB+ to under 1GB.",
              keyPoints: [
                "Python 3.12 runtime with modern typing and speed enhancements.",
                "Astral uv resolves and installs dependencies 10-100x faster than pip.",
                "CPU-optimized PyTorch slashes Docker image size by 75%.",
              ]
            },
            alternative: {
              title: "Default CUDA PyTorch Installs",
              explanation: "Installing standard PyTorch with full Nvidia CUDA drivers on a CPU-only server.",
              downside: "3GB of useless GPU driver bloat and slow deployment cycles."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 15.1, we trimmed our build footprint. Using Astral uv and CPU PyTorch wheels cut our deployment times from ten minutes down to thirty seconds."
            },
            keyTakeaway: "Optimize dependencies for your target execution environment to drastically shrink container sizes.",
          },
          {
            id: '15-2',
            title: "15.2 Multi-Stage Docker Builds & Unprivileged User",
            duration: '2 min',
            metaphor: {
              emoji: '🏗️',
              title: "The Scaffolding vs The Finished Skyscraper",
              description: "When construction is done, you dismantle the steel scaffolding, crane tracks, and cement mixers. You don't leave the heavy construction tools in the hotel lobby."
            },
            situation: {
              context: "Packaging the FastAPI application for production cloud deployment.",
              pressure: "Running containers as root user or leaving C++ compilers in the final image introduces severe container breakout security risks."
            },
            solution: {
              title: "Multi-Stage Dockerfile + Dedicated sanad:sanad User",
              explanation: "Stage 1 compiles dependencies and wheels; Stage 2 copies only pre-built wheels into a minimal python:3.12-slim base. Creates and executes under dedicated unprivileged user 'sanad'.",
              keyPoints: [
                "Multi-stage build excludes compilers, headers, and build caches.",
                "Runs as unprivileged UID/GID 10001 (sanad:sanad).",
                "Dramatically reduces container attack surface.",
              ]
            },
            alternative: {
              title: "Single-Stage Root Container",
              explanation: "Running a single Docker stage as root containing gcc, curl, and development tools.",
              downside: "High vulnerability profile: any remote code execution exploit grants instant root control."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 15.2 details our Dockerfile. Multi-stage builds leave the build tools behind, and running as non-root ensures container security in shared cloud environments."
            },
            keyTakeaway: "Use multi-stage builds and run as an unprivileged user to minimize your production attack surface.",
          },
          {
            id: '15-3',
            title: "15.3 Railway Cloud Hosting, Persistent Mounts & Health Probes",
            duration: '2 min',
            metaphor: {
              emoji: '🛰️',
              title: "The Orbital Station with Safe Cargo Docks",
              description: "Space capsules can dock, undock, or be swapped out completely, but the cargo container bolted to the space station stays secure in orbit."
            },
            situation: {
              context: "Deploying containerized Sanad to Railway cloud platform with SQLite and parent text files.",
              pressure: "Ephemeral cloud containers wipe their local filesystem on every restart or deploy, deleting user documents."
            },
            solution: {
              title: "Railway Persistent Volume Mounts & /api/v1/health Probe",
              explanation: "Mounts a persistent Railway volume at /app/data to preserve the SQLite database and parent chunk files across restarts. Configures automated health probes on /api/v1/health.",
              keyPoints: [
                "Persistent volume mount (/app/data) protects databases from container redeploys.",
                "GET /api/v1/health probe checks database and vector store liveness.",
                "Automated restart policies recover from temporary hosting glitches.",
              ]
            },
            alternative: {
              title: "Ephemeral Container Storage",
              explanation: "Storing SQLite databases inside the default container root filesystem.",
              downside: "Every code deploy or container restart deletes all uploaded documents and user accounts."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 15.3 covers production hosting on Railway. Mounting /app/data to persistent cloud volumes ensures our local SQLite and Qdrant databases survive deployments seamlessly."
            },
            keyTakeaway: "Always mount persistent volumes for local databases and configure automated health check probes in cloud deployments.",
          },
        ]
      },
    ]
  },
  {
    id: 'track-6',
    title: "Track 6: Codebase Tour & Implementation Packages",
    shortName: "Codebase Catalog",
    color: '#8b5cf6',
    lessons: [
      {
        id: 'lesson-16',
        specNumber: 16,
        title: "Root Application & Entrypoint Modules",
        shortDescription: "File-by-file inspection of app.py, config.py, sync.py, recovery.py, and parent_store.py.",
        icon: 'FolderTree',
        subLessons: [
          {
            id: '16-1',
            title: "16.1 FastAPI Lifespan & Config Validation (app.py & config.py)",
            duration: '2 min',
            metaphor: {
              emoji: '🏨',
              title: "The Grand Hotel Reception & Concierge",
              description: "app.py is the hotel front entrance welcoming guests; config.py is the hotel rulebook verified before opening the doors; lifespan is the manager ensuring the lights and stoves are lit before the first guest arrives."
            },
            situation: {
              context: "Bootstrapping a multi-tenant FastAPI service coordinating background workers, database pools, and route handlers.",
              pressure: "Missing environment variables or uninitialized database connections cause runtime crashes on the first user request."
            },
            solution: {
              title: "FastAPI Lifespan Context Manager + Pydantic Settings",
              explanation: "app.py defines a lifespan async context manager that verifies database connections, triggers recovery.py, and warms PyTorch models before serving requests. config.py validates all environment settings at boot.",
              keyPoints: [
                "Pydantic-settings validates environment variables at boot.",
                "Lifespan context manager initializes resources cleanly.",
                "_static_url() fingerprinter eliminates ghost stylesheet bugs.",
              ]
            },
            alternative: {
              title: "Ad-Hoc Global Initialization",
              explanation: "Initializing databases and models at import time in random files.",
              downside: "Causes circular imports, unhandled connection crashes, and makes unit testing impossible."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 16.1 introduces app.py and config.py. Our lifespan manager guarantees that the system is fully warmed and healthy before accepting a single HTTP connection."
            },
            keyTakeaway: "Use explicit lifespan context managers to coordinate startup recovery and background warming.",
          },
          {
            id: '16-2',
            title: "16.2 Ingestion Sync Drivers & Recovery (sync.py & recovery.py)",
            duration: '2 min',
            metaphor: {
              emoji: '🔄',
              title: "The Automated Luggage Carousel",
              description: "New luggage dropping onto the carousel is immediately sorted into storage crates. Any dropped luggage from an interrupted flight is tagged and cleaned up."
            },
            situation: {
              context: "Managing batch document ingestion, live folder watching, and crash recovery across workspaces.",
              pressure: "Concurrent file drops or container restarts can leave orphaned records and corrupt index state."
            },
            solution: {
              title: "Batch Sync Driver + Watchdog + Recovery Reconciliation",
              explanation: "sync.py coordinates parsing, chunking, and embedding. watcher.py triggers background syncs on file changes. recovery.py clears abandoned jobs on startup.",
              keyPoints: [
                "sync.py coordinates the conversion and embedding pipeline.",
                "watcher.py provides automated filesystem change detection.",
                "recovery.py transitions stuck PROCESSING jobs to FAILED.",
              ]
            },
            alternative: {
              title: "Manual CLI-Only Re-indexing",
              explanation: "Requiring an administrator to SSH in and run command-line scripts to ingest files.",
              downside: "Fails enterprise usability requirements and blocks non-technical corporate users."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 16.2, sync.py and watcher.py automate document lifecycle management. Files dropped into a workspace folder are indexed automatically in the background."
            },
            keyTakeaway: "Pair automated file watchers with startup recovery workers to build resilient, self-healing ingestion engines.",
          },
        ]
      },
      {
        id: 'lesson-17',
        specNumber: 17,
        title: "Deep Dive: The Agent Package (agent/)",
        shortDescription: "The 4 core files: graph.py (train tracks), state.py (clipboard), nodes.py (workers), and prompts.py (recipe book).",
        icon: 'Bot',
        subLessons: [
          {
            id: '17-1',
            title: "17.1 The Train Tracks & The Clipboard (graph.py & state.py)",
            duration: '2 min',
            metaphor: {
              emoji: '🚂',
              title: "The Railroad System and Cargo Manifest",
              description: "graph.py is the steel train tracks and directional switch signals. state.py is the cargo clipboard recording every box loaded at each station along the route."
            },
            situation: {
              context: "Constructing an agentic workflow that passes queries, search results, relevance scores, and citations across 9 distinct steps.",
              pressure: "Untyped dictionaries or mutable global variables lead to race conditions and debugging nightmares."
            },
            solution: {
              title: "StateGraph Assembly + Typed EvidenceCertificate",
              explanation: "graph.py compiles the LangGraph StateGraph with conditional edges and loop bounds. state.py defines typed AgentState for transient reasoning and EvidenceCertificate for immutable output.",
              keyPoints: [
                "graph.py defines the compile-time routing topology.",
                "state.py uses Python typing and Pydantic for rigid validation.",
                "EvidenceCertificate provides an immutable deliverable with citations.",
              ]
            },
            alternative: {
              title: "Untyped Global State Dicts",
              explanation: "Passing arbitrary dictionaries between functions without schema validation.",
              downside: "KeyErrors at runtime and impossible refactoring."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 17.1 tours graph.py and state.py. Notice how state.py cleanly separates the scratchpad used during reasoning from the immutable EvidenceCertificate returned to the user."
            },
            keyTakeaway: "Separate transient agent scratchpads from immutable final certificates to guarantee clean data contracts.",
          },
          {
            id: '17-2',
            title: "17.2 The 9 Assembly Workers & Prompt Book (nodes.py & prompts.py)",
            duration: '2 min',
            metaphor: {
              emoji: '👷',
              title: "The Assembly Specialists and The Master Handbook",
              description: "Nine certified technicians on the assembly line, each doing one job with mastery. None of them improvises; they follow the laminated handbook clipped above their workstation."
            },
            situation: {
              context: "Executing discrete reasoning tasks: query decomposition, ambiguity checks, relevance grading, and citation construction.",
              pressure: "Monolithic prompt chains asking an AI to 'do everything in one prompt' fail on complex multi-step instructions."
            },
            solution: {
              title: "Single-Responsibility Nodes + Locked Prompt Registry",
              explanation: "nodes.py provides 9 isolated functions receiving AgentState and returning targeted state updates. prompts.py loads write-locked Markdown prompt templates with checksums.",
              keyPoints: [
                "Each node worker has a single, testable responsibility.",
                "prompts.py eliminates inline prompt strings in Python code.",
                "Enables mocking individual node workers during automated unit testing.",
              ]
            },
            alternative: {
              title: "One Mega-Prompt to Rule Them All",
              explanation: "Asking a single prompt to check ambiguity, search documents, grade facts, and write answers.",
              downside: "High hallucination rate, unpredictable outputs, and zero observability into where reasoning failed."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 17.2, nodes.py and prompts.py show the power of specialization. Breaking complex reasoning into 9 focused workers makes each step testable, debuggable, and reliable."
            },
            keyTakeaway: "Decompose complex agent reasoning into single-responsibility worker nodes backed by an immutable prompt registry.",
          },
        ]
      },
      {
        id: 'lesson-18',
        specNumber: 18,
        title: "The Database Librarian (db/repo.py)",
        shortDescription: "The 5 golden safety guards, thread-safe WAL connections, and atomic transaction sessions.",
        icon: 'HardDrive',
        subLessons: [
          {
            id: '18-1',
            title: "18.1 Relational Blueprint & Cascading Tables (db/schema.sql)",
            duration: '2 min',
            metaphor: {
              emoji: '📐',
              title: "The Architect's Steel Framework",
              description: "The relational schema is the rigid steel framework inside the skyscraper walls. It defines exactly where pipes and wires can run, preventing structural collapse."
            },
            situation: {
              context: "Storing workspaces, documents, sync jobs, chunks, conversations, and evaluation runs in SQLite.",
              pressure: "Orphaned records accumulating when documents or workspaces are deleted without relational cascades."
            },
            solution: {
              title: "Rigid DDL Schema with Foreign Key Cascades",
              explanation: "db/schema.sql defines five core relational domains with ON DELETE CASCADE constraints, index optimizations, and status enums.",
              keyPoints: [
                "5 functional domains: Workspaces, Sync, Conversations, Evaluation, RBAC.",
                "ON DELETE CASCADE ensures complete cleanup on workspace deletion.",
                "B-tree indices on workspace_id and document_id optimize query speeds.",
              ]
            },
            alternative: {
              title: "Unconstrained Document Tables",
              explanation: "Creating tables without foreign keys or indexing.",
              downside: "Slow table scans and database pollution with orphaned records."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 18.1 breaks down db/schema.sql. Notice our cascading foreign keys: deleting a workspace purges all documents, sync jobs, and chunk metadata atomically."
            },
            keyTakeaway: "Enforce foreign key cascades at the schema level to guarantee relational integrity.",
          },
          {
            id: '18-2',
            title: "18.2 The 5 Golden Safety Guards (db/repo.py)",
            duration: '2 min',
            metaphor: {
              emoji: '🏛️',
              title: "The Strict Head Librarian",
              description: "Nobody is allowed into the restricted rare manuscripts room. You must ask the head librarian at the counter, who verifies your ID, retrieves the exact file, and logs your checkout."
            },
            situation: {
              context: "Executing multiple concurrent read queries and write sync jobs on a single SQLite file.",
              pressure: "Uncontrolled database writes trigger 'database is locked' errors and race conditions."
            },
            solution: {
              title: "The Strict Librarian Pattern",
              explanation: "All database access is funneled through db/repo.py, which manages read/write path separation and busy timeouts.",
              keyPoints: [
                "Single Gateway: _connect_raw sets foreign keys and WAL mode.",
                "Atomic transactions via session() context manager.",
                "Configured 10-second busy timeout eliminates database lock crashes.",
              ]
            },
            alternative: {
              title: "Scattered Raw sqlite3.connect() Calls",
              explanation: "Opening independent database connections wherever a query is needed.",
              downside: "Database locks, uncommitted transactions, and connection leaks."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 6.3, we enforce the strict librarian rule. No file in Sanad executes raw SQL except db/repo.py. It guards our database against lockouts and guarantees atomic writes."
            },
            keyTakeaway: "Enforce a single data access gateway to guarantee transaction safety and concurrency resilience.",
          },
        ]
      },
      {
        id: 'lesson-19',
        specNumber: 19,
        title: "Web Interface & Security (ui & deploy)",
        shortDescription: "Jinja2 templates, asset fingerprinting, staging access gate, conversation memory, and Keycloak deploy.",
        icon: 'LayoutTemplate',
        subLessons: [
          {
            id: '19-1',
            title: "19.1 Server-Rendered Jinja2 Templates & Asset Fingerprinting",
            duration: '2 min',
            metaphor: {
              emoji: '📄',
              title: "The Daily Newspaper Printing Press",
              description: "The press stamps today's edition with the exact date and edition hash. Readers never receive yesterday's news by mistake."
            },
            situation: {
              context: "Serving fast, accessible web views with stylesheets and micro-interactions.",
              pressure: "Browser caching often holds onto outdated CSS/JS files after a deploy, causing visual glitches (the ghost stylesheet bug)."
            },
            solution: {
              title: "Jinja2 Templates + _static_url() Fingerprinting",
              explanation: "ui/templates/ provides accessible HTML5 templates. app.py injects content hashes into static asset URLs (e.g. style.css?v=a3f8), busting browser caches instantly on redeploy.",
              keyPoints: [
                "Server-rendered HTML5 ensures instant first-paint times.",
                "Content fingerprinting prevents stale browser asset caching.",
                "Clean component partials (source_card.html, chat_message.html).",
              ]
            },
            alternative: {
              title: "Static Unversioned Asset URLs",
              explanation: "Linking to static CSS with href='/static/css/style.css'.",
              downside: "Users see broken layouts for days after deployments until they perform hard browser refreshes."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "Section 19.1 covers our UI templates and asset fingerprinting. Injected content hashes guarantee that users always run the latest stylesheet after every deployment."
            },
            keyTakeaway: "Fingerprint static asset URLs to eliminate stale browser caching bugs after deployments.",
          },
          {
            id: '19-2',
            title: "19.2 Staging Gatekeeper & Session Memory (access_gate.py & conversation.py)",
            duration: '2 min',
            metaphor: {
              emoji: '🚪',
              title: "The Bouncer with a Precision Stopwatch",
              description: "When checking passwords, amateur bouncers say 'No' immediately if the first letter is wrong, revealing clues to timing eavesdroppers. The precision bouncer always takes exactly 1.000 seconds to respond, whether you missed the first letter or the whole sentence."
            },
            situation: {
              context: "Protecting staging deployment environments from timing analysis attacks and browser caching bugs.",
              pressure: "Timing attacks reveal staging passwords through microsecond discrepancies, and browser caching causes users to run outdated CSS/JS assets."
            },
            solution: {
              title: "Constant-Time Authentication & Chat Session Management",
              explanation: "Uses secrets.compare_digest() in ui/access_gate.py for constant-time comparison, and conversation.py manages sliding chat session memory windows.",
              keyPoints: [
                "Constant-time string comparison defeats side-channel timing analysis.",
                "Secure session cookies issued with SameSite and HttpOnly flags.",
                "Sliding conversation memory prevents token budget overruns.",
              ]
            },
            alternative: {
              title: "Standard String Equality (if input == password)",
              explanation: "Checking strings using the standard == operator.",
              downside: "Returns faster on early character mismatches, leaking the password length and prefix to attackers."
            },
            interactiveType: 'flowchart',
            audioNarration: {
              speaker: 'YL (Systems Architect)',
              script: "In Section 19.2, ui/access_gate.py enforces constant-time password verification using secrets.compare_digest, defeating side-channel timing analysis attacks."
            },
            keyTakeaway: "Always use constant-time comparison for authentication tokens and bound conversational memory.",
          },
        ]
      },
      {
        id: 'lesson-20',
        specNumber: 20,
        title: "Evaluation & Verification Suites (evaluation, scripts, tests)",
        shortDescription: "The Exam Proctor (run_evaluation.py), Release Gate Bouncer (release_gate.py), and Frozen Golden Datasets.",
        icon: 'CheckSquare',
        subLessons: [
          {
            id: '20-1',
            title: "20.1 The Automated Exam Proctor (run_evaluation.py)",
            duration: '2 min',
            metaphor: {
              emoji: '📝',
              title: "The Standardized Exam Proctor",
              description: "The proctor distributes identical exam booklets to all candidates, times the test with a stopwatch, and grades each booklet with an objective answer key."
            },
            situation: {
              context: "Benchmarking retrieval accuracy across candidate model versions and prompt modifications.",
              pressure: "Subjective human evaluation is too slow and biased to run on every commit or pull request."
            },
            solution: {
              title: "Automated Benchmark Proctoring (scripts/run_evaluation.py)",
              explanation: "Iterates over the 60-question frozen golden dataset, queries the agent pipeline, collects outputs, computes RAGAS metrics, and persists evaluation runs in SQLite.",
              keyPoints: [
                "Automated batch execution across 60 certified legal queries.",
                "Computes RAGAS faithfulness, answer relevance, and citation recall.",
                "Logs every run in SQLite evaluation_runs table for trend tracking.",
              ]
            },
            alternative: {
              title: "Occasional Manual Spot-Checking",
              explanation: "Asking the chatbot 2 or 3 questions manually before deployment.",
              downside: "Subtle regressions slip into production, degrading accuracy from 92% to 75% unnoticed."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "Section 20.1 details our automated proctor. It grades 60 complex legal questions with mathematical precision, recording historical quality trends in our database."
            },
            keyTakeaway: "Automate evaluation runs to turn subjective AI impressions into objective mathematical benchmarks.",
          },
          {
            id: '20-2',
            title: "20.2 The Release Gate Bouncer & Testing Pyramid (release_gate.py)",
            duration: '2 min',
            metaphor: {
              emoji: '👮',
              title: "The Airport Security Metal Detector",
              description: "Nobody boards the plane without passing through the metal detector. It doesn't matter if you are the captain or a first-class passenger—if the alarm beeps, you step aside."
            },
            situation: {
              context: "Before merging PRs or tagging production releases, proving that changes did not degrade retrieval accuracy.",
              pressure: "Subjective spot checks miss subtle retrieval regressions across complex legal edge cases."
            },
            solution: {
              title: "CI/CD Release Gate Bouncer & Testing Pyramid",
              explanation: "scripts/release_gate.py asserts G1 (>=90%), G2 (=100%), and G3 (=100%) thresholds. Supported by a testing pyramid: fast unit tests on isolated ports and end-to-end integration tests.",
              keyPoints: [
                "release_gate.py asserts non-negotiable release thresholds.",
                "Unit tests verify hexagonal port adapters with in-memory mocks in <1 second.",
                "Strict exit codes (0 = proceed, 1 = halt) integrated into GitHub Actions CI.",
              ]
            },
            alternative: {
              title: "Trusting Passing Unit Tests Alone",
              explanation: "Assuming that if Python code compiles and unit tests pass, the AI model produces accurate answers.",
              downside: "Unit tests only test software mechanics; only evaluation gates test generative truth."
            },
            interactiveType: 'diagram',
            audioNarration: {
              speaker: 'MB (Quality Guardian)',
              script: "Section 20.2 concludes our tour. Our release gate script stops broken builds in CI. Unit tests prove the software works; release gates prove the AI tells the truth."
            },
            keyTakeaway: "Combine unit tests for software mechanics with evaluation release gates for generative truth.",
          },
        ]
      },
    ]
  },

];
