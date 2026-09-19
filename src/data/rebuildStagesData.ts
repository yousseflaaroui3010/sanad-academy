// Rebuilding Sanad: 16-Stage Masterclass Data (from Request to Cloud Production)
// Adheres strictly to AIslop.md (zero buzzwords, checkable facts) and GUIDE-STYLE.md (Librarian Thread & Plain Language)

export interface FunctionalRequirement {
  id: string; // F-01 to F-16
  name: string;
  category: 'Isolation' | 'Ingestion' | 'Grounding' | 'Conversation' | 'Compliance' | 'Security';
  problemSolved: string;
  invariantRule: string;
  verificationMethod: string;
  status: 'Non-Negotiable';
}

export interface LegalPrecedent {
  caseName: string;
  jurisdiction: string;
  date: string;
  citation: string;
  whatHappened: string;
  sanctionOrOutcome: string;
  engineeringLesson: string;
}

export interface ScrumSprintPlan {
  sprint: string;
  title: string;
  owner: 'YL' | 'MB' | 'YL + MB';
  deliverables: string[];
  gateCriteria: string;
}

export interface RebuildStage {
  stageNumber: number;
  id: string;
  title: string;
  subtitle: string;
  phase: 'Inception' | 'Blueprint' | 'Infrastructure' | 'Code Studio' | 'Review & Decisions' | 'Production';
  librarianAnalogy: {
    story: string;
    mapping: string;
    boundary: string;
  };
  executiveContext: string;
  coreProblem: string;
  solutionArchitecture: string;
  checkableFacts: Array<{ label: string; value: string; proofFileOrSource: string }>;
  interactiveComponentId: 'requirements-matrix' | 'legal-precedents' | 'scrum-cockpit' | 'tech-scout' | 'split-code' | 'generic';
}

export const FUNCTIONAL_REQUIREMENTS: FunctionalRequirement[] = [
  {
    id: 'F-01',
    name: 'Workspace Multi-Tenant Isolation',
    category: 'Isolation',
    problemSolved: 'Tenant A querying labor contracts sees private salary schedules belonging to Tenant B.',
    invariantRule: 'Every SQL query and Qdrant payload filter must explicitly include workspace_id = :current_workspace.',
    verificationMethod: 'tests/unit/test_workspaces.py: test_cross_workspace_isolation_returns_404',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-02',
    name: 'Asynchronous Background Ingestion',
    category: 'Ingestion',
    problemSolved: 'Uploading a 150-page Dahir PDF freezes the web server thread and returns 504 Gateway Timeout.',
    invariantRule: 'File ingestion executes in a detached asyncio task; HTTP upload returns 202 Accepted in under 200ms.',
    verificationMethod: 'tests/unit/test_sync.py: test_background_worker_does_not_block_main_thread',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-03',
    name: 'Real-Time Ingestion Telemetry',
    category: 'Ingestion',
    problemSolved: 'Users stare at a static spinner with no indication if OCR extraction is progressing or stalled.',
    invariantRule: 'Background worker persists progress (pages processed, chunks hashed) to SQLite at each step.',
    verificationMethod: 'ui/documents.py: polling endpoint /api/workspaces/{id}/documents/status',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-04',
    name: 'Clickable Evidence Cards with Exact Citations',
    category: 'Grounding',
    problemSolved: 'LLM generates legal advice without naming the article, leaving counsel unable to verify.',
    invariantRule: 'Every generated claim must link to an Article number, Page number, and Dahir Bulletin Officiel source.',
    verificationMethod: 'tests/integration/test_ask_sourced_answer.py: test_answer_contains_valid_citations',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-05',
    name: 'Deterministic Honest Refusal (HONEST_REFUSAL)',
    category: 'Grounding',
    problemSolved: 'LLM hallucinates fabricated articles when asked about topics not present in the ingested corpus.',
    invariantRule: 'If cosine relevance score is below 0.70 across all retrieved passages, return F-05 refusal immediately.',
    verificationMethod: 'tests/integration/test_evidence_only_mode.py: test_honest_refusal_when_ungrounded',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-06',
    name: 'Sliding Multi-Turn Conversation Memory',
    category: 'Conversation',
    problemSolved: 'Follow-up queries ("And what about his notice period?") fail because the pronoun reference is lost.',
    invariantRule: 'Retain the last 6 messages (3 full turns) in SQLite and feed them to the contextualization query rewriter.',
    verificationMethod: 'tests/unit/test_chat_history.py: test_sliding_window_context_rewrite',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-07',
    name: 'Dynamic Clarification for Ambiguous Queries',
    category: 'Conversation',
    problemSolved: 'Vague queries ("maternity leave") return fragmented results spanning multiple unrelated articles.',
    invariantRule: 'If retrieved passages span conflicting legal sections, query rewriter generates a clarification prompt.',
    verificationMethod: 'agent/nodes.py: rewrite_query_node checks ambiguity flags',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-08',
    name: 'User Citation Feedback & Hallucination Flagging',
    category: 'Grounding',
    problemSolved: 'Flawed or misattributed answers pass unnoticed without user reporting telemetry.',
    invariantRule: 'Allow users to submit thumbs up/down and text feedback stored in audit_log per answer.',
    verificationMethod: 'ui/feedback.py: endpoint /api/feedback records user assessment',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-09',
    name: 'Exportable Legal Consultation Audit Reports',
    category: 'Compliance',
    problemSolved: 'Legal counsel cannot present chat screenshots to a labor tribunal as proof of due diligence.',
    invariantRule: 'Generate printable, formatted HTML/PDF reports compiling the query, answer, and exact cited extracts.',
    verificationMethod: 'ui/reports_screen.py: renders court-ready audit transcripts',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-10',
    name: 'Trilingual Language Support (French, Arabic RTL, English)',
    category: 'Compliance',
    problemSolved: 'Official Moroccan legal texts are published in Arabic (original) and French; English is needed for international audits.',
    invariantRule: 'Dynamic dir="rtl" and font Amiri for Arabic; multilingual-e5-base handles cross-lingual queries.',
    verificationMethod: 'tests/unit/test_ui_rtl.py: test_arabic_rtl_layout_rendering',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-11',
    name: 'Multi-Format Conversion Ladder (PDF, Scanned OCR, DOCX)',
    category: 'Ingestion',
    problemSolved: 'Historical Dahir scans from 1960 contain no text layer, resulting in silent empty extraction.',
    invariantRule: 'Text density check: if text < 50 chars/page, trigger Tesseract OCR with image deskewing.',
    verificationMethod: 'tests/unit/test_conversion.py: test_fallback_to_ocr_on_scanned_pdf',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-12',
    name: 'Dual-View Navigation (Library Workspace vs Chat Screen)',
    category: 'Isolation',
    problemSolved: 'Users get lost between uploading files and exploring questions.',
    invariantRule: 'Desktop-first two-column layout: document inventory on the left, interactive chat on the right.',
    verificationMethod: 'ui/screen.py: layout separation between library and conversation',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-13',
    name: 'SHA-256 4-State Differential Synchronization',
    category: 'Ingestion',
    problemSolved: 'Re-uploading a folder of 1,000 files re-embeds unchanged documents, wasting hours of compute.',
    invariantRule: 'Compare binary SHA-256 hashes against SQLite. State machine: NEW, UNCHANGED, MODIFIED, ORPHAN.',
    verificationMethod: 'tests/unit/test_change_detection.py: test_sha256_avoids_re_embedding',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-14',
    name: 'Zero-Trust RBAC & Silent 404 BOLA Defense',
    category: 'Security',
    problemSolved: 'Attacker probes document IDs via API and gets 403 Forbidden, confirming the existence of competitor files.',
    invariantRule: 'Unauthorized document access returns HTTP 404 Not Found with constant timing, leaking zero existence metadata.',
    verificationMethod: 'tests/integration/test_s6_auth.py: test_bola_unauthorized_returns_404',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-15',
    name: 'Moroccan Law 09-08 PII Anonymization',
    category: 'Compliance',
    problemSolved: 'Uploading payroll records exposes employee national identity cards (CIN), salaries, and phone numbers.',
    invariantRule: 'Regex and NER scrub Moroccan CINs (e.g. AB123456), phone numbers, and IBANs before embedding.',
    verificationMethod: 'tests/unit/test_chunking.py: test_pii_redaction_moroccan_cin',
    status: 'Non-Negotiable',
  },
  {
    id: 'F-16',
    name: 'Local-First Sovereign Execution',
    category: 'Isolation',
    problemSolved: 'Enterprises handling state-regulated legal archives cannot transmit documents to overseas servers.',
    invariantRule: 'System must run fully self-contained using local SQLite, local Qdrant, and local quantized LLMs.',
    verificationMethod: 'tests/unit/test_startup.py: test_offline_local_boot_without_internet',
    status: 'Non-Negotiable',
  },
];

export const LEGAL_PRECEDENTS: LegalPrecedent[] = [
  {
    caseName: 'Mata v. Avianca, Inc.',
    jurisdiction: 'U.S. District Court, S.D. New York (Case 1:22-cv-01461)',
    date: 'June 22, 2023',
    citation: 'Judge P. Kevin Castel, 2023 WL 4114965',
    whatHappened: 'Attorneys submitted a legal brief generated by ChatGPT citing six non-existent judicial decisions (e.g. Varghese v. China Southern Airlines, Martinez v. Delta Air Lines). The cases carried fictitious quotes, citations, and docket numbers fabricated by the language model.',
    sanctionOrOutcome: 'Court imposed a $5,000 penalty on the attorneys, mandatory notification of the judges falsely cited, and held that technological incompetence combined with bad faith harms the legal system.',
    engineeringLesson: 'Never trust an LLM to cite legal authority from its internal parameters. Citations must be extracted verbatim from an immutable physical index.',
  },
  {
    caseName: 'Moffatt v. Air Canada',
    jurisdiction: 'Civil Resolution Tribunal of British Columbia (2024 BCCRT 149)',
    date: 'February 14, 2024',
    citation: 'Tribunal Member Christopher C. Rivers',
    whatHappened: 'A passenger asking about bereavement airfare was told by Air Canada\'s interactive chatbot that he could book full fare and apply for retroactive discounts within 90 days. In reality, airline policy forbade retroactive claims.',
    sanctionOrOutcome: 'The tribunal rejected Air Canada\'s defense that the chatbot was a "separate legal entity" responsible for its own actions. Air Canada was ordered to pay CA$812 in damages and fees.',
    engineeringLesson: 'An enterprise is 100% legally liable for false statements made by its automated assistants. Answers must be deterministically grounded in verified source documents.',
  },
  {
    caseName: 'Stanford RegLab Legal Hallucination Study',
    jurisdiction: 'Stanford University & Human-Centered AI Institute',
    date: 'May 2024 (Dahl, Magesh, Mirchandani et al.)',
    citation: 'Large Legal Fictions: Profiling Legal Hallucinations in LLMs (arXiv:2405.20362)',
    whatHappened: 'Systematic empirical benchmark of commercial legal AI assistants (Lexis+ AI, Westlaw AI-Assisted Research, GPT-4). Tested thousands of queries on precedent, jurisdiction, and legal facts.',
    sanctionOrOutcome: 'Found that commercial legal assistants hallucinate on 17% to 34% of queries, frequently citing reversed precedents or mischaracterizing judicial holdings when unconstrained.',
    engineeringLesson: 'Commercial fine-tuning does not solve legal hallucinations. A strict, quantitative evaluation gate (RAGAS triad >= 0.90) must block release if ground truth is violated.',
  },
];

export const SCRUM_SPRINT_PLANS: ScrumSprintPlan[] = [
  {
    sprint: 'Sprint 0 & 1',
    title: 'Foundations, SQLite WAL & Qdrant Vector Indexing',
    owner: 'YL',
    deliverables: [
      'SQLite 3NF schema (documents, chunks, chat_threads) with WAL mode enabled',
      'Qdrant vector collection setup with 1024 dimensions (multilingual-e5-base)',
      'SHA-256 4-state change detection engine (NEW, UNCHANGED, MODIFIED, ORPHAN)',
      'Async background sync driver with single-flight mutex protection',
    ],
    gateCriteria: '100% test pass on tests/unit/test_db_repo.py and tests/unit/test_vector_store.py.',
  },
  {
    sprint: 'Sprint 2 & 3',
    title: '9-Node Cyclic LangGraph Agent & RAGAS Benchmark Gates',
    owner: 'MB',
    deliverables: [
      'LangGraph cyclic state machine (router, retrieve, grade, rewrite, generate, hallu_check)',
      'Reciprocal Rank Fusion (RRF k=60) combining Qdrant dense vectors and BM25',
      '60-question frozen golden benchmark representing Moroccan Labor Code queries',
      'Automated RAGAS triad calculation (Faithfulness >= 0.90, Answer Relevance >= 0.85)',
    ],
    gateCriteria: 'Golden benchmark run produces zero fabricated articles and faithfulness >= 0.90.',
  },
  {
    sprint: 'Sprint 4',
    title: 'Zero-Trust Security, RBAC & Moroccan Law 09-08 Compliance',
    owner: 'YL',
    deliverables: [
      'Keycloak OIDC integration with AES-GCM 256-bit encrypted HTTP-only session cookies',
      '4-tier RBAC matrix with self-signup quarantine mode',
      'Silent HTTP 404 BOLA defense on cross-tenant document queries',
      'Moroccan Law 09-08 PII regex sanitizer stripping CINs and payroll identifiers',
    ],
    gateCriteria: 'Security test suite passes: zero leaks on tests/integration/test_s6_auth.py.',
  },
  {
    sprint: 'Sprint 5',
    title: 'Astral uv Packaging, Multi-Stage Docker & Railway Cloud Deploy',
    owner: 'YL + MB',
    deliverables: [
      'Astral uv dependency resolution pinning CPU-only PyTorch (image reduced from 6GB to 450MB)',
      'Multi-stage Dockerfile running under unprivileged appuser (UID 10001)',
      'Railway cloud configuration mounting /app/data persistent storage volume',
      'Sub-50ms /healthz readiness and liveness probe endpoint',
    ],
    gateCriteria: 'Automated deployment to Railway production passes health probe with 200 OK.',
  },
  {
    sprint: 'Sprint 6',
    title: 'Academic Defense Rehearsal, Verification Gates & Release v3.1.0',
    owner: 'YL + MB',
    deliverables: [
      'Release Gate Bouncer executing tests/release_gate.py across all 4 tiers',
      'Academic thesis report chapters 1-6 synchronized with code invariants',
      'Jury defense interactive slides and live demonstration drill runner',
      'Final signed release tag v3.1.0 promoted to production',
    ],
    gateCriteria: 'Exit code 0 on python -m tests.release_gate with 1,377 passing tests.',
  },
];

export const REBUILD_STAGES: RebuildStage[] = [
  // STAGE 1: The Client Request
  {
    stageNumber: 1,
    id: 'stage-1',
    title: 'The Client Request & Enterprise Legal Scope',
    subtitle: 'Translating Moroccan Labor Law into 16 Non-Negotiable Engineering Requirements',
    phase: 'Inception',
    librarianAnalogy: {
      story: 'A director walks into the central archive of the Kingdom. They have 10,000 employees and a 600-page book of royal decrees. They cannot afford an assistant who guesses what a page says, nor one who leaves confidential personnel files on the front counter for visitors to read.',
      mapping: 'The archive is the enterprise workspace. The royal decrees are the Moroccan Labor Code (Dahir 1-03-194). The visitor separation is workspace multi-tenancy (F-01).',
      boundary: 'A human archivist might get tired or forget an amendment; our software must check the hash of every document on every sync and never guess.',
    },
    executiveContext: 'An enterprise human resources directorate and legal counsel in Morocco oversee thousands of employment contracts governed by the Code du Travail (Dahir n° 1-03-194, Bulletin Officiel n° 5210). Every dispute—from probation extensions to severance calculations—carries severe financial and statutory liabilities. They need an automated assistant that provides instant, indisputable legal citations without human guesswork or data leakage.',
    coreProblem: 'Standard search engines return hundreds of unranked text matches that require hours of human reading. Meanwhile, public LLMs fabricate fictitious legal articles (such as hallucinating "Article 78 bis"), miscalculate statutory notice tiers under Article 53, and transmit private corporate payroll records to overseas API endpoints.',
    solutionArchitecture: 'We formalize the client demand into 16 non-negotiable functional requirements (F-01 to F-16). Each requirement is backed by an automated unit or integration test in the codebase, enforcing absolute multi-tenant workspace isolation, deterministic honest refusal, and clickable evidence cards citing official Dahir sources.',
    checkableFacts: [
      { label: 'Corpus Size', value: '589 Articles across 7 Books', proofFileOrSource: 'Code du Travail marocain (BO n° 5210)' },
      { label: 'Functional Requirements', value: '16 Non-Negotiable Gates (F-01 to F-16)', proofFileOrSource: 'Specification 4 & 5' },
      { label: 'Severance Calculation Invariant', value: 'Tiers: 96h (yr 1-5), 144h (yr 6-10), 192h (yr 11-15), 240h (>15)', proofFileOrSource: 'Article 53, Dahir n° 1-03-194' },
      { label: 'Refusal Protocol Code', value: 'HONEST_REFUSAL (F-05)', proofFileOrSource: 'tests/integration/test_evidence_only_mode.py' },
    ],
    interactiveComponentId: 'requirements-matrix',
  },

  // STAGE 2: Research Foundation
  {
    stageNumber: 2,
    id: 'stage-2',
    title: 'Research Foundation: Why Raw LLMs Fail & Why RAG is Mandatory',
    subtitle: 'Empirical Evidence from Avianca, Air Canada & Stanford RegLab: Fine-Tuning vs Open-Book Retrieval',
    phase: 'Inception',
    librarianAnalogy: {
      story: 'Consider two students taking a bar exam. Student A memorized thousands of cases last year by heart, but cannot open any book. Student B is allowed an open book on the desk, must highlight the exact sentence, and must write the page number beside every answer.',
      mapping: 'Student A is a fine-tuned LLM (fuzzy weights, probabilistic recall). Student B is Sanad with RAG (exact text index, verified line citations).',
      boundary: 'If a law changes overnight, Student A must be re-educated from scratch. Student B simply receives the revised page in their binder.',
    },
    executiveContext: 'Before writing a single line of code, we reviewed published judicial cases and academic benchmarks evaluating LLMs in legal contexts. The findings are unanimous: generative models operating from internal parameter weights cannot guarantee factual accuracy, regardless of parameter size or supervised fine-tuning.',
    coreProblem: 'Neural network weights theta store probabilistic token relationships, not verifiable text files. When queried on specialized statutory provisions, ungrounded models generate plausible-sounding falsehoods (confabulation). In law, a single incorrect article number or severance factor invalidates legal advice and exposes the client to civil damages (Mata v. Avianca, Moffatt v. Air Canada).',
    solutionArchitecture: 'We adopt Retrieval-Augmented Generation (RAG) governed by the ISO 24495-1:2023 Plain Language standard. The LLM is stripped of creative license: it operates strictly as a synthesis clerk constrained by retrieved passages. If retrieved documents lack sufficient grounding, the system executes deterministic honest refusal rather than speculating.',
    checkableFacts: [
      { label: 'Avianca Judicial Penalty', value: '$5,000 fine for 6 fabricated ChatGPT cases', proofFileOrSource: 'Mata v. Avianca, 2023 WL 4114965' },
      { label: 'Air Canada Legal Liability', value: 'Tribunal forced airline to pay damages for chatbot lie', proofFileOrSource: 'Moffatt v. Air Canada, 2024 BCCRT 149' },
      { label: 'Commercial Legal AI Error Rate', value: '17% to 34% hallucination rate on standard benchmarks', proofFileOrSource: 'Stanford RegLab Study (Dahl et al., 2024)' },
      { label: 'Writing Standard', value: 'ISO 24495-1:2023 (Plain Language & Active Voice)', proofFileOrSource: 'GUIDE-STYLE.md' },
    ],
    interactiveComponentId: 'legal-precedents',
  },

  // STAGE 3: Planning & Scrum Governance
  {
    stageNumber: 3,
    id: 'stage-3',
    title: 'Project Planning & Agile Scrum Governance',
    subtitle: 'The 2-Person Architecture Split, Rule 5 Review Law & The 6-Sprint Production Cadence',
    phase: 'Inception',
    librarianAnalogy: {
      story: 'A twin-seat supersonic reconnaissance plane: Pilot 1 sits in front, managing the jet engines, fuel pumps, and flight trajectory. Pilot 2 sits behind, scanning radar frequencies, validating flight corridors, and ensuring mission directives are followed. Neither pilot can fire without both keys turned simultaneously.',
      mapping: 'Pilot 1 is YL (Systems Architect: SQLite, Docker, Qdrant, Railway). Pilot 2 is MB (Quality Guardian: Dahir truth, RAGAS benchmark, thesis rigor). Both keys turned is Rule 5.',
      boundary: 'In software, the dual keylock is an automated GitHub Actions check (tests/review_rules.py) that blocks git merge if either domain approval is missing.',
    },
    executiveContext: 'Building an enterprise legal RAG platform within a fixed academic calendar requires industrial engineering discipline. We organized development under an Agile Scrum framework adapted for a two-engineer research team, pairing strict role boundaries with automated quality gates.',
    coreProblem: 'Without formal review boundaries, developers fall into the "cowboy trap": one engineer pushes hurried prompt changes or modifies database schemas late at night, silently breaking retrieval metrics and causing unexpected errors during client demonstrations.',
    solutionArchitecture: 'We instituted the Rule 5 Two-Person Review Law enforced cryptographically in CI/CD. Work was scheduled across 6 distinct two-week sprints (Sprints 0 to 6), bounded by a 3-rollback circuit breaker: if any experimental feature fails three automated regression runs, it is discarded immediately to safeguard the release date.',
    checkableFacts: [
      { label: 'Architectural Separation', value: 'YL (Systems & Cloud) vs MB (Quality & Ground Truth)', proofFileOrSource: 'Specification 1 & 2' },
      { label: 'Review Gate Enforcer', value: 'Rule 5 cryptographic sign-off script', proofFileOrSource: 'tests/review_rules.py' },
      { label: 'Sprint Schedule', value: '6 Sprints from Inception to Production Defense', proofFileOrSource: 'COURSE_TRACKS Track 1' },
      { label: 'Circuit Breaker Invariant', value: 'Maximum 3 rollbacks before mandatory feature descope', proofFileOrSource: 'Specification 3 (Checkpoints C1-C3)' },
    ],
    interactiveComponentId: 'scrum-cockpit',
  },
];
