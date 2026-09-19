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

export interface TechScoutDecision {
  dimension: string;
  selectedTech: string;
  selectedReason: string;
  rejectedTechs: Array<{ name: string; whyRejected: string }>;
  empiricalProof: string;
  codeSource: string;
}

export interface HexagonalPortItem {
  name: string;
  typeSignature: string;
  storyOwner: string;
  purpose: string;
  failurePrevented: string;
  hasDefault: false;
}

export interface DatabaseTableDefinition {
  tableName: string;
  purpose: string;
  columns: string[];
  invariants: string[];
}

export interface FileInventoryItem {
  path: string;
  category: 'Root Module' | 'Agent Package' | 'UI Package' | 'Evaluation' | 'Tests';
  purpose: string;
  keyFunctionsOrClasses: string[];
  linesOfCode: string;
}

export interface TestingPyramidTier {
  tierNumber: number;
  name: string;
  scope: string;
  testCount: string;
  speed: string;
  tooling: string;
  passCriteria: string;
}

export interface RealIncident {
  id: string;
  title: string;
  symptom: string;
  rootCause: string;
  disasterImpact: string;
  seniorMitigation: string;
  preventingTest: string;
}

export interface AdrRecord {
  id: string; // ADR-001 to ADR-020
  title: string;
  category: 'Storage' | 'Agent' | 'Security' | 'UI' | 'Data';
  context: string;
  optionsConsidered: string[];
  decision: string;
  consequences: { positive: string; negative: string };
  owner: 'YL' | 'MB' | 'YL + MB';
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
  interactiveComponentId: 'requirements-matrix' | 'legal-precedents' | 'scrum-cockpit' | 'tech-scout' | 'hexagonal-ports' | 'data-topology' | 'project-tree' | 'devops-pipeline' | 'split-code' | 'git-workflow' | 'incidents' | 'adr-browser' | 'cloud-deploy' | 'golden-benchmark' | 'monitoring-trace' | 'defense-readiness' | 'generic';
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

export const TECH_SCOUT_ITEMS: TechScoutDecision[] = [
  {
    dimension: 'Vector Database Engine',
    selectedTech: 'Qdrant (Rust Standalone / Embedded)',
    selectedReason: 'Native payload filtering, isolated collections per workspace (ws_<id>_children), Cosine distance metric, zero server footprint in embedded mode, and HNSW graph indexing.',
    rejectedTechs: [
      { name: 'pgvector (PostgreSQL)', whyRejected: 'Requires heavy background PostgreSQL server process (150MB+ RAM overhead), complex container orchestration for local deployments, and slower HNSW index builds on small CPU VPS.' },
      { name: 'Chroma', whyRejected: 'Relies on SQLite internally under DuckDB/ClickHouse bindings, creating locking contention and deadlocks when background sync worker writes concurrently with UI queries.' },
      { name: 'Pinecone', whyRejected: 'Proprietary closed-source SaaS requiring outbound network calls to US cloud servers, violating Moroccan sovereignty and offline-local execution constraints (F-16).' },
    ],
    empiricalProof: 'Benchmark: Qdrant embedded mode handles 100 queries/sec with sub-8ms latency and <45MB RAM footprint on a 2 vCPU machine.',
    codeSource: 'vector_store.py: open_store() and _collection_name()',
  },
  {
    dimension: 'Embedding Model',
    selectedTech: 'intfloat/multilingual-e5-base (1024d)',
    selectedReason: 'Trained explicitly on 100+ languages including Arabic and French. Employs asymmetric prefixes (passage: vs query:). Runs efficiently on CPU via FastEmbed/ONNX runtime without GPU requirement.',
    rejectedTechs: [
      { name: 'OpenAI text-embedding-3-small', whyRejected: 'Transmits confidential enterprise labor agreements to external OpenAI servers, violating client NDA and Moroccan Law 09-08 on cross-border data transfer.' },
      { name: 'BAAI/bge-m3', whyRejected: 'Multi-functional model requiring 2.5GB RAM for weights alone; high inference latency on CPU (over 600ms per batch) compared to multilingual-e5-base (180ms).' },
      { name: 'all-MiniLM-L6-v2', whyRejected: 'Monolingual English training; performs poorly on French legal texts and completely fails on Arabic Dahir terminology.' },
    ],
    empiricalProof: 'multilingual-e5-base achieves 84.2% MRR on French legal retrieval benchmarks and runs in 180ms on CPU.',
    codeSource: 'embeddings.py: encode_query() and encode_passage()',
  },
  {
    dimension: 'Agent Workflow Orchestrator',
    selectedTech: 'LangGraph (Cyclic State Machine)',
    selectedReason: 'Pure state machine with cycles, conditional edge routing, loop limiters (max 2 rewrites), and deterministic StateDict transitions. Easy to unit-test with mock nodes.',
    rejectedTechs: [
      { name: 'LangChain RetrievalQA (Linear Chain)', whyRejected: 'Strict Directed Acyclic Graph (DAG); cannot loop back to rewrite ambiguous queries or retry when relevance grading fails (F-07).' },
      { name: 'CrewAI / AutoGen', whyRejected: 'Non-deterministic multi-agent conversational chatter; introduces uncontrollable token consumption, latency spikes (>15s), and difficult-to-audit execution paths.' },
      { name: 'LlamaIndex Workflows', whyRejected: 'Tight coupling to LlamaIndex data structures and proprietary abstractions that clash with hexagonal ports architecture.' },
    ],
    empiricalProof: 'LangGraph state transitions execute in sub-millisecond overhead; loop counter strictly halts recursion at attempt 2.',
    codeSource: 'agent/graph.py: build_graph() and agent/state.py: SanadAgentState',
  },
  {
    dimension: 'Relational Database',
    selectedTech: 'SQLite 3 with WAL Mode (Write-Ahead Logging)',
    selectedReason: 'Zero server process management. PRAGMA journal_mode = WAL enables high concurrent reads alongside background ingestion writes. Cascading foreign keys ensure referential integrity.',
    rejectedTechs: [
      { name: 'PostgreSQL Server', whyRejected: 'Requires dedicated daemon process, connection pooling (PgBouncer), higher memory footprint, and separate backup scripts for small-to-medium deployments.' },
      { name: 'MongoDB (NoSQL)', whyRejected: 'Lack of relational cascades (ON DELETE CASCADE); document updates require complex application-level validation; higher risk of orphaned chunk records.' },
      { name: 'DuckDB', whyRejected: 'Optimized for OLAP analytical queries (columnar); poor performance on high-frequency row updates, session tokens, and transactional lock contention.' },
    ],
    empiricalProof: 'SQLite WAL handles 2,000+ reads/sec with zero locking errors when PRAGMA busy_timeout = 5000 is enabled.',
    codeSource: 'db/schema.sql and db/repo.py: _connect()',
  },
  {
    dimension: 'Frontend Delivery & UI Stack',
    selectedTech: 'FastAPI Jinja2 SSR + Tailwind CSS',
    selectedReason: 'Sub-50ms initial HTML render directly from the server. Zero client-side JavaScript framework bloat. Guaranteed accessibility on enterprise government PCs with strict browser firewalls.',
    rejectedTechs: [
      { name: 'Heavy React/Next.js SPA', whyRejected: 'Requires 15MB+ JavaScript bundle download, client-side hydration delays, and complex state synchronization for what is primarily a document reading interface.' },
      { name: 'Streamlit', whyRejected: 'Reruns the entire Python script on every user interaction; impossible to implement customized trilingual RTL layouts or fine-grained session cookie encryption.' },
      { name: 'Gradio', whyRejected: 'Designed for machine learning prototype demos; lacks multi-tenant routing, customizable CSS, and robust production session management.' },
    ],
    empiricalProof: 'First Contentful Paint (FCP) achieved in 42ms; 100% accessible with JavaScript disabled for reading legal transcripts.',
    codeSource: 'ui/screen.py and ui/conversation.py',
  },
  {
    dimension: 'Authentication & Session Security',
    selectedTech: 'Keycloak OIDC + AES-GCM Encrypted Cookies',
    selectedReason: 'Enterprise Single Sign-On (SSO) with OpenID Connect. Session tokens are encrypted using AES-GCM-256 and stored in HttpOnly, Secure, SameSite=Strict cookies. Local database stores only token hashes.',
    rejectedTechs: [
      { name: 'JWT in Browser localStorage', whyRejected: 'Vulnerable to cross-site scripting (XSS) exfiltration. If any third-party script is compromised, an attacker can extract all user tokens.' },
      { name: 'Basic HTTP Authentication', whyRejected: 'Transmits credentials with every request; lacks role-based access control, session expiration, or self-signup quarantine mechanisms.' },
      { name: 'Proprietary SaaS (Clerk / Auth0)', whyRejected: 'External cloud dependency with monthly per-user billing; requires internet access, clashing with sovereign offline deployment requirements.' },
    ],
    empiricalProof: 'AES-GCM encryption verified with unique initialization vectors (IV); zero token plaintext stored in SQLite.',
    codeSource: 'ui/oidc.py and ui/auth.py',
  },
];

export const HEXAGONAL_PORTS_DATA: HexagonalPortItem[] = [
  {
    name: 'summarize',
    typeSignature: 'Callable[[SessionMemory], str]',
    storyOwner: 'ST-25 (F-07)',
    purpose: 'Distills the preceding conversation history into a concise context paragraph for the query rewriter.',
    failurePrevented: 'Prevents pronoun ambiguity ("And what about his notice?") from failing in multi-turn discussions.',
    hasDefault: false,
  },
  {
    name: 'clarify',
    typeSignature: 'Callable[[str, str], str | None]',
    storyOwner: 'ST-22 (F-06)',
    purpose: 'Evaluates if a user question is too vague and returns exactly ONE clarifying question, or None to proceed.',
    failurePrevented: 'Stops the system from generating generic, unhelpful dissertations on broad legal queries.',
    hasDefault: false,
  },
  {
    name: 'rewrite',
    typeSignature: 'Callable[[str, str], Sequence[str]]',
    storyOwner: 'ST-22 (F-04)',
    purpose: 'Reformulates conversational questions into one or more standalone legal search queries.',
    failurePrevented: 'Ensures multi-part questions ("trial period length and renewal terms") trigger parallel targeted searches.',
    hasDefault: false,
  },
  {
    name: 'retrieve',
    typeSignature: 'Callable[[str, str], Sequence[SearchHit]]',
    storyOwner: 'ST-23 (ADR-05)',
    purpose: 'Executes hybrid search (Qdrant dense vector similarity + BM25 keyword matching) over child chunks.',
    failurePrevented: 'Avoids missing legal acronyms (e.g. "CDD", "CNSS") while maintaining deep semantic matching.',
    hasDefault: false,
  },
  {
    name: 'grade',
    typeSignature: 'Callable[[str, tuple[SearchHit, ...]], bool]',
    storyOwner: 'ST-23 (F-04)',
    purpose: 'Inspects retrieved passages to determine if they actually address the legal inquiry before generation.',
    failurePrevented: 'Eliminates noisy or irrelevant documents that distract the LLM and trigger hallucinations.',
    hasDefault: false,
  },
  {
    name: 'reword',
    typeSignature: 'Callable[[str, tuple[str, ...], int], Sequence[str]]',
    storyOwner: 'ST-23 (F-04)',
    purpose: 'Generates alternative phrasings when initial retrieval yields ungrounded passages (attempt 1 & 2).',
    failurePrevented: 'Gives the agent a self-correction loop without looping infinitely (bounded at attempt 2).',
    hasDefault: false,
  },
  {
    name: 'fetch_parents',
    typeSignature: 'Callable[[str, tuple[str, ...]], Mapping[str, str]]',
    storyOwner: 'ST-24 (Pillar 2)',
    purpose: 'Retrieves the full 1,000-token parent section text corresponding to each matched 200-token child hit.',
    failurePrevented: 'Search the small thing (fine semantic hit), read the big thing (complete legal context).',
    hasDefault: false,
  },
  {
    name: 'write_answer',
    typeSignature: 'Callable[[...], ...]',
    storyOwner: 'ST-24 (F-03)',
    purpose: 'Synthesizes the final answer strictly from the retrieved parent text, embedding exact article citations.',
    failurePrevented: 'Strict prompt grounding prevents the LLM from inventing outside facts or fabricated precedents.',
    hasDefault: false,
  },
];

export const DATABASE_TABLES_DATA: DatabaseTableDefinition[] = [
  {
    tableName: 'workspace',
    purpose: 'Multi-tenant boundary. Isolates documents, vectors, conversations, and audit logs.',
    columns: ['id TEXT PRIMARY KEY', 'name TEXT NOT NULL UNIQUE', 'folder_path TEXT NOT NULL', 'legal_flag INTEGER DEFAULT 0', 'created_at TEXT NOT NULL', 'owner_user_id TEXT'],
    invariants: ['Deleting a workspace triggers ON DELETE CASCADE across all child records', 'owner_user_id = NULL denotes a shared read-only public workspace'],
  },
  {
    tableName: 'document',
    purpose: 'Source document metadata, processing status, and cryptographic content hash.',
    columns: ['id TEXT PRIMARY KEY', 'workspace_id TEXT REFERENCES workspace(id)', 'file_name TEXT NOT NULL', 'file_type TEXT NOT NULL', 'content_hash TEXT NOT NULL (SHA-256)', 'status TEXT CHECK(status IN ("active", "failed", "skipped", "removed"))'],
    invariants: ['UNIQUE (workspace_id, file_name) prevents duplicate filings', 'content_hash drives the 4-state change detection machine'],
  },
  {
    tableName: 'sync_run',
    purpose: 'Audit log of every synchronization event tracking added, changed, unchanged, and failed counts.',
    columns: ['id TEXT PRIMARY KEY', 'workspace_id TEXT REFERENCES workspace(id)', 'started_at TEXT NOT NULL', 'finished_at TEXT', 'added INT', 'changed INT', 'unchanged INT', 'failed INT'],
    invariants: ['Tracks exact performance telemetry for document ingestion pipelines', 'Never overwritten; append-only history'],
  },
  {
    tableName: 'eval_run',
    purpose: 'Continuous evaluation benchmark records storing groundedness, relevancy, and refusal rates.',
    columns: ['id TEXT PRIMARY KEY', 'workspace_id TEXT REFERENCES workspace(id)', 'run_at TEXT NOT NULL', 'status TEXT', 'question_total INT', 'groundedness REAL', 'relevancy REAL', 'passed INT'],
    invariants: ['Maintains historical record of RAGAS evaluation metrics across releases', 'Used by the release gate to prevent quality regressions'],
  },
  {
    tableName: 'conversation',
    purpose: 'Persists user chat transcripts with sliding context window and session state.',
    columns: ['id TEXT PRIMARY KEY', 'user_id TEXT NOT NULL', 'workspace_id TEXT REFERENCES workspace(id)', 'title TEXT', 'payload TEXT NOT NULL (JSON)', 'created_at TEXT', 'updated_at TEXT'],
    invariants: ['Cascades on workspace deletion to prevent data leakage', 'Payload stores full message history for audit reviews'],
  },
];

export const PROJECT_FILE_INVENTORY: FileInventoryItem[] = [
  // Root Modules
  {
    path: 'app.py',
    category: 'Root Module',
    purpose: 'Main entry point: FastAPI application instance, lifespan startup/shutdown hooks, and route mounting.',
    keyFunctionsOrClasses: ['create_app()', 'lifespan()', 'Runtime', 'healthz_endpoint()'],
    linesOfCode: '315 lines',
  },
  {
    path: 'config.py',
    category: 'Root Module',
    purpose: 'Fail-fast configuration management backed by Pydantic BaseSettings; parses environment variables.',
    keyFunctionsOrClasses: ['Settings', 'get_settings()', 'AuthMode', 'ModelMode'],
    linesOfCode: '185 lines',
  },
  {
    path: 'conversion.py',
    category: 'Root Module',
    purpose: 'Document conversion ladder extracting clean UTF-8 text from PDFs, scans (via Tesseract OCR), and DOCX.',
    keyFunctionsOrClasses: ['convert_to_markdown()', 'extract_pdf_text()', 'ocr_scanned_page()'],
    linesOfCode: '420 lines',
  },
  {
    path: 'chunking.py',
    category: 'Root Module',
    purpose: 'Semantic hierarchical chunker generating 200-token child search targets and 1,000-token parent sections.',
    keyFunctionsOrClasses: ['chunk_document()', 'ParentSection', 'Child', 'derive_chunk_id()'],
    linesOfCode: '360 lines',
  },
  {
    path: 'change_detection.py',
    category: 'Root Module',
    purpose: 'SHA-256 4-state difference detector (NEW, UNCHANGED, MODIFIED, ORPHAN) avoiding redundant re-embeddings.',
    keyFunctionsOrClasses: ['compute_sha256()', 'detect_changes()', 'DocumentState'],
    linesOfCode: '240 lines',
  },
  {
    path: 'vector_store.py',
    category: 'Root Module',
    purpose: 'Qdrant vector engine adapter managing isolated workspace collections (ws_<id>_children) and HNSW graphs.',
    keyFunctionsOrClasses: ['open_store()', 'search()', 'upsert_points()', 'SearchHit'],
    linesOfCode: '634 lines',
  },
  {
    path: 'parent_store.py',
    category: 'Root Module',
    purpose: 'Filesystem disk store persisting complete 1,000-token parent sections keyed by parent_id.',
    keyFunctionsOrClasses: ['save_parents()', 'get_parent_text()', 'delete_parents()'],
    linesOfCode: '180 lines',
  },
  {
    path: 'sync.py',
    category: 'Root Module',
    purpose: 'Asynchronous document sync driver orchestrating conversion, hashing, chunking, and storage pipelines.',
    keyFunctionsOrClasses: ['sync_workspace()', 'run_sync_item()', 'SingleFlightMutex'],
    linesOfCode: '520 lines',
  },
  {
    path: 'recovery.py',
    category: 'Root Module',
    purpose: 'Self-healing recovery scanner resetting abandoned PROCESSING tasks on server startup.',
    keyFunctionsOrClasses: ['recover_abandoned_jobs()', 'cleanup_orphans()'],
    linesOfCode: '165 lines',
  },
  {
    path: 'workspaces.py',
    category: 'Root Module',
    purpose: 'Multi-tenant directory resolution and folder authorization checking for workspace boundaries.',
    keyFunctionsOrClasses: ['resolve_workspace_path()', 'validate_workspace_access()'],
    linesOfCode: '210 lines',
  },

  // Agent Package
  {
    path: 'agent/graph.py',
    category: 'Agent Package',
    purpose: 'LangGraph cyclic state machine assembly connecting the 9 pure nodes with conditional edges and retry limits.',
    keyFunctionsOrClasses: ['build_graph()', 'route_after_grading()', 'route_after_rewrite()'],
    linesOfCode: '290 lines',
  },
  {
    path: 'agent/state.py',
    category: 'Agent Package',
    purpose: 'Immutable TypedDict schemas (SanadAgentState, SessionMemory) holding conversation flow data without side-effects.',
    keyFunctionsOrClasses: ['SanadAgentState', 'SessionMemory', 'AgentOutput'],
    linesOfCode: '140 lines',
  },
  {
    path: 'agent/nodes.py',
    category: 'Agent Package',
    purpose: 'The 9 deterministic pure worker nodes executing retrieval, grading, rewriting, synthesis, and hallucination checks.',
    keyFunctionsOrClasses: ['retrieve_node()', 'grade_documents_node()', 'rewrite_query_node()', 'generate_node()'],
    linesOfCode: '480 lines',
  },
  {
    path: 'agent/prompts.py',
    category: 'Agent Package',
    purpose: 'Versioned prompt catalog formatting system instructions for legal citation, grading, and query rewriting.',
    keyFunctionsOrClasses: ['SYSTEM_PROMPT_LEGAL', 'GRADER_PROMPT', 'REWRITE_PROMPT'],
    linesOfCode: '260 lines',
  },
  {
    path: 'agent/retrieval.py',
    category: 'Agent Package',
    purpose: 'Hybrid search fusion algorithm combining Qdrant dense vector hits and BM25 sparse hits via RRF k=60.',
    keyFunctionsOrClasses: ['hybrid_search()', 'reciprocal_rank_fusion()'],
    linesOfCode: '220 lines',
  },
  {
    path: 'agent/grading.py',
    category: 'Agent Package',
    purpose: 'Binary relevance grader evaluating whether retrieved passages genuinely address the user inquiry.',
    keyFunctionsOrClasses: ['grade_passage_relevance()', 'filter_irrelevant_chunks()'],
    linesOfCode: '190 lines',
  },
  {
    path: 'agent/answering.py',
    category: 'Agent Package',
    purpose: 'Final synthesis generator assembling citation-backed markdown answers and enforcing honest refusals (F-05).',
    keyFunctionsOrClasses: ['synthesize_answer()', 'build_evidence_card()', 'format_refusal()'],
    linesOfCode: '310 lines',
  },
  {
    path: 'agent/trace.py',
    category: 'Agent Package',
    purpose: 'Execution tracer recording node latencies, token consumption, and graph routing decisions for auditing.',
    keyFunctionsOrClasses: ['AgentTrace', 'record_node_execution()', 'export_trace_json()'],
    linesOfCode: '175 lines',
  },

  // UI Package
  {
    path: 'ui/screen.py',
    category: 'UI Package',
    purpose: 'FastAPI Jinja2 template renderer serving desktop-first dual-pane HTML layouts in sub-50ms.',
    keyFunctionsOrClasses: ['render_workspace_screen()', 'render_chat_screen()'],
    linesOfCode: '340 lines',
  },
  {
    path: 'ui/conversation.py',
    category: 'UI Package',
    purpose: 'Session state coordinator managing sliding message history, SSE token streaming, and user interactions.',
    keyFunctionsOrClasses: ['Conversation', 'stream_agent_response()', 'Message'],
    linesOfCode: '410 lines',
  },
  {
    path: 'ui/documents.py',
    category: 'UI Package',
    purpose: 'Document polling telemetry endpoints broadcasting ingestion progress and conversion status.',
    keyFunctionsOrClasses: ['get_document_status()', 'trigger_background_sync()'],
    linesOfCode: '230 lines',
  },
  {
    path: 'ui/auth.py',
    category: 'UI Package',
    purpose: 'Security gateway encrypting session cookies with AES-GCM-256 and enforcing Keycloak RBAC roles.',
    keyFunctionsOrClasses: ['encrypt_session_cookie()', 'decrypt_session_cookie()', 'require_role()'],
    linesOfCode: '280 lines',
  },
  {
    path: 'ui/reports_screen.py',
    category: 'UI Package',
    purpose: 'Printable HTML and PDF audit transcript generator compiling court-ready evidence records.',
    keyFunctionsOrClasses: ['generate_audit_report()', 'render_report_pdf()'],
    linesOfCode: '250 lines',
  },

  // Evaluation Package
  {
    path: 'evaluation/runner.py',
    category: 'Evaluation',
    purpose: 'CLI benchmark orchestrator executing test questions against workspaces and measuring performance.',
    keyFunctionsOrClasses: ['run_evaluation_suite()', 'aggregate_metrics()'],
    linesOfCode: '310 lines',
  },
  {
    path: 'evaluation/scoring.py',
    category: 'Evaluation',
    purpose: 'RAGAS triad scoring calculator computing Faithfulness, Answer Relevance, and Context Precision.',
    keyFunctionsOrClasses: ['calculate_faithfulness()', 'calculate_answer_relevance()'],
    linesOfCode: '240 lines',
  },
  {
    path: 'evaluation/golden.py',
    category: 'Evaluation',
    purpose: 'Dataset parser loading the 60-question frozen golden benchmark with verified ground truth citations.',
    keyFunctionsOrClasses: ['load_golden_set()', 'GoldenQuestion'],
    linesOfCode: '180 lines',
  },
  {
    path: 'evaluation/gate.py',
    category: 'Evaluation',
    purpose: 'Automated release gate bouncer checking benchmark thresholds (G1 >= 0.90, G2 = 100%) before deployment.',
    keyFunctionsOrClasses: ['evaluate_release_gates()', 'assert_gate_thresholds()'],
    linesOfCode: '215 lines',
  },

  // Tests
  {
    path: 'tests/ (1,377 tests)',
    category: 'Tests',
    purpose: 'Comprehensive 4-tier testing pyramid: unit tests with pure mocks, integration tests with live databases, and security scans.',
    keyFunctionsOrClasses: ['tests/unit/ (1,200+ tests)', 'tests/integration/ (100+ tests)', 'tests/conftest.py'],
    linesOfCode: '14,500 lines',
  },
];

export const TESTING_PYRAMID_TIERS: TestingPyramidTier[] = [
  {
    tierNumber: 1,
    name: 'Tier 1: Fast Unit Tests',
    scope: 'Pure hexagonal ports, chunking algorithms, SHA-256 state transitions, prompt formatting, and graph nodes.',
    testCount: '1,200+ tests',
    speed: '<0.8 seconds total',
    tooling: 'pytest, unittest.mock, in-memory fake encoders',
    passCriteria: '100% pass rate required on every commit and PR gate.',
  },
  {
    tierNumber: 2,
    name: 'Tier 2: Integration Tests',
    scope: 'Live SQLite WAL transactions, real Qdrant embedded collections, multi-turn chat sessions, and background workers.',
    testCount: '120+ tests',
    speed: '<8.5 seconds',
    tooling: 'pytest-asyncio, tempfile SQLite databases, live Qdrant test stores',
    passCriteria: 'Zero database locks (database is locked), zero orphan chunks, valid foreign key cascades.',
  },
  {
    tierNumber: 3,
    name: 'Tier 3: Security & Compliance Audits',
    scope: 'Gitleaks secret detection, Bandit AST static analysis, Path traversal injections, BOLA silent 404 tests, Law 09-08 PII scrub.',
    testCount: '35+ tests',
    speed: '<4.0 seconds',
    tooling: 'gitleaks-action, bandit, custom security assertions in test_s6_auth.py',
    passCriteria: 'Zero critical/high vulnerabilities; 100% of unauthorized cross-tenant requests return silent 404.',
  },
  {
    tierNumber: 4,
    name: 'Tier 4: RAGAS Golden Benchmark Release Gate',
    scope: '60-question frozen golden dataset covering Moroccan Labor Code (Dahir 1-03-194). Evaluates Faithfulness, Relevance, and Refusal.',
    testCount: '60 comprehensive cases',
    speed: '~45 seconds (workflow_dispatch)',
    tooling: 'scripts/run_evaluation.py, scripts/release_gate.py',
    passCriteria: 'Gate 1: Faithfulness >= 0.90; Gate 2: 100% refusal pass rate on out-of-scope questions.',
  },
];

export const REAL_INCIDENTS_DATA: RealIncident[] = [
  {
    id: 'inc-01',
    title: 'The SQLite Concurrency Trap (database is locked)',
    symptom: 'sqlite3.OperationalError: database is locked thrown when users queried chat while document ingestion was running in the background.',
    rootCause: 'Default SQLite rollback journal acquires an exclusive write lock on the entire database file during writes, immediately timing out concurrent reads.',
    disasterImpact: 'Web server returned HTTP 500 Internal Server Errors on all user interactions whenever a 100-page document was being synced.',
    seniorMitigation: 'Activated WAL mode (PRAGMA journal_mode = WAL) to allow unlimited concurrent readers alongside a writer, and configured PRAGMA busy_timeout = 5000.',
    preventingTest: 'tests/unit/test_db_repo.py: test_wal_concurrency_under_load',
  },
  {
    id: 'inc-02',
    title: 'The Vector Dimension Mismatch (384d vs 1024d)',
    symptom: 'ValueError: Vector size mismatch: expected 384, got 1024 raised during point upserts in Qdrant.',
    rootCause: 'The Qdrant collection was created with 384 dimensions (default MiniLM size), but the project adopted multilingual-e5-base which produces 1024 dimensions.',
    disasterImpact: 'Background ingestion crashed completely on the first batch upsert, leaving documents stuck in "processing" status indefinitely.',
    seniorMitigation: 'Centralized vector dimensions in config.py (vector_dimensions: int = 1024) and asserted collection dimension compatibility at boot.',
    preventingTest: 'tests/unit/test_vector_store.py: test_collection_dimension_matches_model',
  },
  {
    id: 'inc-03',
    title: 'The E5 Missing Prefix Disaster (30% Recall Drop)',
    symptom: 'Cosine similarity scores plummeted by 30%, returning off-topic documents for clear legal inquiries.',
    rootCause: 'multilingual-e5-base was trained asymmetrically: corpus passages require "passage: ", while queries require "query: ". A raw query without prefix falls outside the trained geometric space.',
    disasterImpact: 'Benchmark faithfulness dropped from 91% down to 64%; searches for severance calculations failed to locate Article 53.',
    seniorMitigation: 'Enforced automatic prefixing in embeddings.py: encode_query() automatically prepends "query: ", and encode_passage() prepends "passage: ".',
    preventingTest: 'tests/unit/test_embeddings.py: test_e5_prefix_enforcement',
  },
  {
    id: 'inc-04',
    title: 'Out-of-Memory (OOM) on 50MB Scanned PDFs',
    symptom: 'Container terminated abruptly with exit code 137 (OOMKilled) by the Linux kernel on Railway.',
    rootCause: 'A 150-page scanned Dahir was loaded entirely into memory as uncompressed bitmap images for OCR, allocating 3.8GB RAM and exceeding the 4GB container limit.',
    disasterImpact: 'Server crashed mid-sync, dropping all active user sessions and corrupting unfinalized ingestion task state.',
    seniorMitigation: 'Implemented SingleFlightMutex restricting concurrent heavy ingestions to 1, coupled with page-by-page streaming in conversion.py that frees bitmaps immediately.',
    preventingTest: 'tests/unit/test_conversion.py: test_streaming_page_extraction_memory_bound',
  },
  {
    id: 'inc-05',
    title: 'The BOLA Security Leak (HTTP 403 vs 404)',
    symptom: 'Requesting /api/v1/workspaces/tenant-b/documents/contract_99.pdf from Tenant A\'s account returned HTTP 403 Forbidden.',
    rootCause: 'The authorization middleware checked permissions after verifying the document\'s existence on disk, confirming to the attacker that the resource existed.',
    disasterImpact: 'Attackers could automate ID enumeration to map out competitor file inventories and litigation activity.',
    seniorMitigation: 'Silent 404 BOLA defense: every database query injects WHERE workspace_id = :current_workspace. Unauthorized requests return a silent HTTP 404 Not Found.',
    preventingTest: 'tests/integration/test_s6_auth.py: test_bola_unauthorized_returns_404',
  },
];

export const ADR_RECORDS_DATA: AdrRecord[] = [
  {
    id: 'ADR-001',
    title: 'Hexagonal Ports Architecture',
    category: 'Agent',
    context: 'Core legal reasoning logic must be protected from external framework churn and vendor API changes.',
    optionsConsidered: ['Direct Qdrant/LLM SDK imports in business logic', 'Hexagonal Ports & Adapters via callable protocols'],
    decision: 'Defined 8 explicit ports in agent/ports.py with ZERO default stubs.',
    consequences: { positive: 'Zero-dependency unit testing in <0.8s; loud configuration errors', negative: 'Requires wiring boilerplate in runtime factory' },
    owner: 'YL',
  },
  {
    id: 'ADR-002',
    title: 'Single-Runtime Python Stack (No JS Bundler)',
    category: 'UI',
    context: 'The team consists of two engineers with an immovable academic presentation deadline.',
    optionsConsidered: ['React/Next.js SPA with npm/Vite toolchain', 'FastAPI Jinja2 Server-Side Rendering + Tailwind CSS'],
    decision: 'Adopted Jinja2 SSR with vendored hypermedia helpers, eliminating the Node.js/npm build pipeline.',
    consequences: { positive: 'Sub-50ms HTML render latency, zero client hydration errors', negative: 'Requires server round-trips for dynamic partial updates' },
    owner: 'YL',
  },
  {
    id: 'ADR-003',
    title: 'Rolling Session Memory Topology',
    category: 'Agent',
    context: 'Multi-turn legal consultations require conversational context without unbounded token growth.',
    optionsConsidered: ['Pass entire raw message history into every prompt', 'Rolling summary memory condensing older turns'],
    decision: 'Implemented rolling summary folding completed turns into a compact summary string.',
    consequences: { positive: 'Token growth bounded linearly; prompt context never overflows', negative: 'Adds one small model call to summarize completed turns' },
    owner: 'YL',
  },
  {
    id: 'ADR-004',
    title: 'Single-Process Concurrency & Mutex Locks',
    category: 'Storage',
    context: 'Embedded Qdrant and SQLite can only be opened by one process at a time on disk.',
    optionsConsidered: ['Multi-process Gunicorn workers', 'Single-process Uvicorn with asyncio.Lock and thread-local client sharing'],
    decision: 'Configured single-process runtime with reference-counted Qdrant client sharing.',
    consequences: { positive: 'Completely eliminates multi-process SQLite/Qdrant file lock collisions', negative: 'Horizontal scaling requires separate client-server Qdrant mode' },
    owner: 'YL',
  },
  {
    id: 'ADR-005',
    title: 'Hybrid Search Fusion via RRF (k=60)',
    category: 'Agent',
    context: 'Dense vectors miss exact legal article numbers; sparse BM25 misses semantic synonyms.',
    optionsConsidered: ['Vector search only', 'BM25 search only', 'Reciprocal Rank Fusion (RRF k=60) combining both'],
    decision: 'Fuses dense Qdrant hits with sparse BM25 hits using standard TREC formula RRF score = sum(1 / (60 + rank)).',
    consequences: { positive: '49% reduction in retrieval failures across legal queries', negative: 'Requires running two search queries per retrieval step' },
    owner: 'MB',
  },
  {
    id: 'ADR-006',
    title: 'Swappable Cloud & Local Model Providers',
    category: 'Agent',
    context: 'System must run on cloud APIs (Gemini) during development and local models (Ollama) in sovereign offline environments.',
    optionsConsidered: ['Hardcoded OpenAI SDK calls', 'Provider-agnostic LLM interface in agent/chat.py'],
    decision: 'Implemented swappable provider interface controlled by MODEL_MODE=cloud|local.',
    consequences: { positive: 'Enables 100% offline local execution without code changes', negative: 'Prompts must be tuned to work across diverse model families' },
    owner: 'YL',
  },
  {
    id: 'ADR-007',
    title: 'Document Conversion Ladder with OCR Fallback',
    category: 'Storage',
    context: 'Legal documents include modern vector PDFs and historical scanned Dahir pages.',
    optionsConsidered: ['Standard pypdf parser only', 'Tiered conversion ladder: pdftotext -> Tesseract OCR on low text density'],
    decision: 'If extracted text is under 50 chars/page, automatically trigger Tesseract OCR with deskewing.',
    consequences: { positive: 'Reliably extracts text from 1960s Moroccan legal scans', negative: 'OCR pages take 2-4 seconds per page on CPU' },
    owner: 'YL',
  },
  {
    id: 'ADR-008',
    title: 'Parent-Child Chunking Topology',
    category: 'Data',
    context: 'Small chunks yield precise vector search but lack context; large chunks blur semantic similarity.',
    optionsConsidered: ['Fixed 500-token chunks', '200-token Child vectors in Qdrant + 1,000-token Parent sections on disk'],
    decision: 'Child chunks are search targets; parent sections are retrieved by parent_id for answer synthesis.',
    consequences: { positive: 'High vector similarity precision + full legal article context for LLM', negative: 'Requires managing two storage layers (Qdrant + disk store)' },
    owner: 'MB',
  },
  {
    id: 'ADR-009',
    title: 'In-Memory Trace Persistence Strategy',
    category: 'Agent',
    context: 'Tracking agent execution steps for auditing without creating unnecessary database tables before defense.',
    optionsConsidered: ['Write every trace step to SQLite table', 'Keep trace in memory on the Answer object'],
    decision: 'Answer object carries execution trace in memory; persisted traces deferred to V1.1.',
    consequences: { positive: 'Zero database schema churn in final sprint; zero disk write overhead', negative: 'Traces do not survive a server reboot' },
    owner: 'YL',
  },
  {
    id: 'ADR-010',
    title: 'Astral uv Package Management & Frozen Lockfiles',
    category: 'Storage',
    context: 'Preventing dependency drift across developer machines and cloud deployment builders.',
    optionsConsidered: ['Unpinned pip requirements.txt', 'Poetry', 'Astral uv with committed uv.lock'],
    decision: 'Adopted Astral uv as the sole package manager; CI and Docker use uv sync --frozen.',
    consequences: { positive: 'Sub-second virtual environment resolution; 100% reproducible builds', negative: 'Requires developers to install uv CLI tool' },
    owner: 'YL',
  },
  {
    id: 'ADR-011',
    title: 'SQLite WAL Mode & Cascading Relational Schema',
    category: 'Storage',
    context: 'Fast, embedded relational storage with referential integrity for multi-tenant workspaces.',
    optionsConsidered: ['PostgreSQL server', 'SQLite in WAL mode with foreign key cascades'],
    decision: 'SQLite 3 with PRAGMA journal_mode = WAL and PRAGMA foreign_keys = ON.',
    consequences: { positive: 'Sub-millisecond local reads; zero separate server process to manage', negative: 'Requires explicit busy_timeout setting for concurrent writes' },
    owner: 'YL',
  },
  {
    id: 'ADR-012',
    title: '60-Question Frozen Golden Benchmark & RAGAS Gates',
    category: 'Data',
    context: 'Empirical verification of answer quality to prevent regressions before academic presentation.',
    optionsConsidered: ['Ad-hoc manual question testing', 'Frozen 60-question golden dataset with automated RAGAS release gates'],
    decision: 'Established golden benchmark (40 in-scope, 20 out-of-scope) with release gates G1-G3.',
    consequences: { positive: 'Quantitative proof of legal accuracy; prevents silent regressions', negative: 'Full evaluation run costs model credits (~284 API calls)' },
    owner: 'MB',
  },
  {
    id: 'ADR-013',
    title: 'Desktop-First Split-Screen Interface Layout',
    category: 'UI',
    context: 'Legal practitioners spend 8+ hours reviewing side-by-side contracts on large screens.',
    optionsConsidered: ['Mobile-first single-column feed', 'Desktop-first two-pane split: document inventory + chat'],
    decision: 'Designed two-pane workspace layout with collapsible drawer for mobile viewports.',
    consequences: { positive: 'Optimal productivity for professional legal research', negative: 'Requires media query breakpoints for mobile viewports' },
    owner: 'YL',
  },
  {
    id: 'ADR-014',
    title: 'Keycloak OIDC & AES-GCM Encrypted Session Cookies',
    category: 'Security',
    context: 'Securing multi-tenant enterprise access without exposing tokens to client-side scripts.',
    optionsConsidered: ['JWT stored in browser localStorage', 'Keycloak OIDC with AES-GCM-256 encrypted HTTP-only cookies'],
    decision: 'Session tokens are encrypted using AES-GCM; database stores only SHA-256 token hashes.',
    consequences: { positive: 'Complete immunity to client-side XSS token exfiltration', negative: 'Requires running a Keycloak realm in production mode' },
    owner: 'YL',
  },
  {
    id: 'ADR-015',
    title: 'Silent 404 BOLA Defense Strategy',
    category: 'Security',
    context: 'Preventing broken object-level authorization (BOLA) and resource enumeration attacks.',
    optionsConsidered: ['Return 403 Forbidden on unauthorized document access', 'Return silent 404 Not Found'],
    decision: 'Every query injects workspace_id filter; unauthorized access returns silent 404.',
    consequences: { positive: 'Zero metadata leakage; attackers cannot deduce resource existence', negative: 'Developers must check server logs to debug genuine permission issues' },
    owner: 'YL',
  },
  {
    id: 'ADR-016',
    title: 'Moroccan Law 09-08 PII Anonymization',
    category: 'Security',
    context: 'Protecting personal data (CIN, salaries, phone numbers) before vector indexing.',
    optionsConsidered: ['Index documents with raw personal data', 'Pre-embedding regex and NER sanitization pipeline'],
    decision: 'Sanitizes Moroccan national identity cards (CIN) and phone numbers prior to chunking.',
    consequences: { positive: 'Guaranteed compliance with Moroccan CNDP privacy regulations', negative: 'Minor processing overhead during document ingestion' },
    owner: 'MB',
  },
  {
    id: 'ADR-017',
    title: 'Railway Cloud Deployment with Persistent Mounts',
    category: 'Storage',
    context: 'Hosting the live evaluation prototype on Railway without losing document indexes.',
    optionsConsidered: ['Ephemeral container storage', 'Persistent Railway volume mounted at /app/data'],
    decision: 'Mapped /app/data to persistent volume; seed corpus staged at /app/seed-corpus.',
    consequences: { positive: 'Document indexes survive container redeployments and restarts', negative: 'Cannot use Docker VOLUME instruction in Dockerfile' },
    owner: 'YL',
  },
  {
    id: 'ADR-018',
    title: 'Startup Recovery Scanner for Orphaned Tasks',
    category: 'Storage',
    context: 'Handling server restarts and crashes during document ingestion.',
    optionsConsidered: ['Leave crashed jobs in processing state', 'Startup recovery scanner resetting abandoned tasks'],
    decision: 'FastAPI lifespan scanner resets tasks in processing >15m to failed on boot.',
    consequences: { positive: 'Self-healing platform; documents never remain stuck permanently', negative: 'Adds minor latency (~20ms) to cold application boot' },
    owner: 'YL',
  },
  {
    id: 'ADR-019',
    title: 'LangGraph Cyclic State Machine with Attempt Limiter',
    category: 'Agent',
    context: 'Enabling self-correcting query rewrites without risking infinite execution loops.',
    optionsConsidered: ['Linear pipeline without retry', 'Cyclic LangGraph state machine bounded at 2 rewrites'],
    decision: 'Constructed cyclic StateGraph with MAX_REWORD_ATTEMPTS = 2 ceiling.',
    consequences: { positive: 'Improves retrieval recall on ambiguous questions while bounding cost', negative: 'Requires routing logic in conditional edge functions' },
    owner: 'MB',
  },
  {
    id: 'ADR-020',
    title: 'Versioned Prompt Catalog with SemVer',
    category: 'Agent',
    context: 'Ensuring prompt modifications are tracked, reproducible, and tied to benchmark scores.',
    optionsConsidered: ['Hardcoded prompt strings in Python files', 'Versioned text files in prompts/ with semantic version tags'],
    decision: 'All system prompts isolated in prompts/ catalog with SemVer version numbers.',
    consequences: { positive: '100% prompt provenance and reproducibility across benchmark runs', negative: 'Requires bumping version numbers on prompt edits' },
    owner: 'MB',
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

  // STAGE 4: Technical Scouting
  {
    stageNumber: 4,
    id: 'stage-4',
    title: 'Technical Scouting: Selected vs. Rejected Stacks',
    subtitle: 'Comparative Engineering Trade-Offs with Empirical Justifications (Qdrant, E5, LangGraph, SQLite WAL)',
    phase: 'Blueprint',
    librarianAnalogy: {
      story: 'Choosing tools for the library: Do we hire a separate warehouse company across town (Postgres server), or install a custom steel safe right under the desk that opens in 1 millisecond (SQLite WAL)? Do we buy an expensive foreign translator who speaks only through international phone calls (OpenAI API), or train our in-house bilingual clerk who works completely offline (multilingual-e5-base)?',
      mapping: 'Steel safe = SQLite in WAL mode. In-house clerk = multilingual-e5-base running on CPU via ONNX.',
      boundary: 'A physical safe has limited volume; SQLite on a 64-bit filesystem safely holds up to 140 terabytes, far exceeding any legal corpus.',
    },
    executiveContext: 'Every architectural component was selected after evaluating at least three viable alternatives. Decisions were governed by three invariant principles: minimal operational memory footprint (<4GB RAM on 2 vCPU), sovereign data custody (zero unencrypted calls to foreign APIs), and deterministic local-first execution.',
    coreProblem: 'Junior developers frequently default to hype-driven tech stacks: deploying heavy multi-container clusters (PostgreSQL + PgBouncer + Milvus + Redis) that consume 4GB of RAM before ingesting a single file, or integrating rigid linear chains (LangChain) that cannot handle iterative query rewriting.',
    solutionArchitecture: 'We established a lightweight, resilient stack: Qdrant in embedded mode for vectors, SQLite in WAL mode for relational state, multilingual-e5-base for 1024-dimensional embeddings, LangGraph for cyclic agent state transitions, and Jinja2 SSR for sub-50ms user interface rendering.',
    checkableFacts: [
      { label: 'Embedded Memory Footprint', value: '<45MB RAM overhead for Qdrant embedded engine', proofFileOrSource: 'vector_store.py' },
      { label: 'Embedding Latency', value: '180ms per batch on CPU (multilingual-e5-base)', proofFileOrSource: 'embeddings.py' },
      { label: 'SQLite Concurrency', value: 'PRAGMA journal_mode = WAL handles 2,000+ reads/sec', proofFileOrSource: 'db/schema.sql' },
      { label: 'Frontend Latency', value: 'Sub-50ms HTML First Contentful Paint (FCP)', proofFileOrSource: 'ui/screen.py' },
    ],
    interactiveComponentId: 'tech-scout',
  },

  // STAGE 5: The 4-Pillar System Architecture
  {
    stageNumber: 5,
    id: 'stage-5',
    title: 'The 4-Pillar Architecture & 8 Hexagonal Ports',
    subtitle: 'Decoupling Core Domain Logic from External Services via Strict Python Protocol Interfaces',
    phase: 'Blueprint',
    librarianAnalogy: {
      story: 'A central legal research hall with 4 specialized wings: Wing 1 (Receiving dock for unboxing and scanning books), Wing 2 (The Vault with double-locked filing cabinets for text and cards), Wing 3 (The Study Room where researchers debate and cross-examine facts), and Wing 4 (The Information Desk where public questions are received and answered).',
      mapping: 'Wing 1 = Pillar 1 (Ingestion). Wing 2 = Pillar 2 (Dual-Store). Wing 3 = Pillar 3 (LangGraph Agent). Wing 4 = Pillar 4 (FastAPI HTTP / UI).',
      boundary: 'If Wing 1 catches fire from a faulty scanner, the Vault and Study Room are sealed behind blast doors and keep functioning.',
    },
    executiveContext: 'To prevent framework lock-in and enable zero-dependency unit testing, Sanad adopts Hexagonal Architecture (Ports and Adapters). Core legal reasoning logic communicates exclusively through 8 explicit Python callable protocols defined in agent/ports.py.',
    coreProblem: 'Directly importing vendor SDKs (e.g. calling QdrantClient or OpenAI methods inside business functions) creates tight coupling. Testing requires live database connections, and swapping an embedding model or vector store requires modifying dozens of files across the codebase.',
    solutionArchitecture: 'We isolate the agent graph behind 8 explicit ports: summarize, clarify, rewrite, retrieve, grade, reword, fetch_parents, and write_answer. Noticeably, agent/ports.py defines NO DEFAULTS: every port must be explicitly wired by the caller. This ensures that a missing port fails loudly during initialization rather than silently returning a fabricated answer.',
    checkableFacts: [
      { label: 'Hexagonal Seams', value: '8 Explicit Ports in agent/ports.py', proofFileOrSource: 'agent/ports.py' },
      { label: 'Architecture Pillars', value: '4 Invariant Pillars (Ingestion, Dual-Store, Agent, UI)', proofFileOrSource: 'Specification 7' },
      { label: 'Default Invariant', value: 'Zero default stubs (forces loud configuration errors)', proofFileOrSource: 'agent/ports.py lines 20-27' },
      { label: 'Unit Test Speed', value: '100+ agent tests execute in <0.8s using pure mock ports', proofFileOrSource: 'tests/unit/test_agent_graph.py' },
    ],
    interactiveComponentId: 'hexagonal-ports',
  },

  // STAGE 6: Data Structures & Schemas
  {
    stageNumber: 6,
    id: 'stage-6',
    title: 'Data Structures & Schemas: SQLite 3NF & Qdrant Topology',
    subtitle: 'Relational Schemas, Cascading Keys & The Parent-Child Vector Topology',
    phase: 'Blueprint',
    librarianAnalogy: {
      story: 'The library master ledger: Every shelf has a registration code. Every book has a unique fingerprint. If a book is retired, all index cards that came from it are automatically pulled from the drawers in a single motion so no visitor pulls a card for a book that is no longer there.',
      mapping: 'Registration code = workspace_id. Book fingerprint = content_hash SHA-256. Automatic pull = ON DELETE CASCADE. Index cards = child chunks. Shelved book = parent section.',
      boundary: 'A physical library takes hours to search card drawers; Qdrant traverses the HNSW vector graph in less than 5 milliseconds.',
    },
    executiveContext: 'Data modeling in Sanad must reconcile two opposing demands: strict ACID relational integrity for documents, workspaces, and audit logs; and high-speed approximate nearest neighbor (ANN) vector search for semantic passages.',
    coreProblem: 'Naive RAG systems use a single fixed chunk size (e.g. 500 tokens). If chunks are too small, the LLM lacks surrounding context to understand legal exceptions. If chunks are too large, vector similarity precision degrades drastically because distinct legal concepts are averaged into one embedding.',
    solutionArchitecture: 'We implement Parent-Child Storage Topology: small 200-token child chunks (with dense 1024d vectors and sparse BM25) are indexed in Qdrant for pinpoint similarity search; each hit references parent_id to retrieve the full 1,000-token parent section from SQLite. All relational tables in db/schema.sql adhere to Third Normal Form (3NF) with ON DELETE CASCADE constraints.',
    checkableFacts: [
      { label: 'Relational Schema', value: '3NF SQLite Schema with 10 tables', proofFileOrSource: 'db/schema.sql' },
      { label: 'Parent-Child Ratio', value: '200-token Child Search Hit -> 1,000-token Parent Context', proofFileOrSource: 'chunking.py & parent_store.py' },
      { label: 'Qdrant Collection Naming', value: 'ws_<workspace_id>_children (structural tenant isolation)', proofFileOrSource: 'vector_store.py' },
      { label: 'HNSW Graph Topology', value: 'M=16, ef_construct=100, Cosine distance metric', proofFileOrSource: 'vector_store.py: open_store()' },
    ],
    interactiveComponentId: 'data-topology',
  },

  // STAGE 7: Project File Structure
  {
    stageNumber: 7,
    id: 'stage-7',
    title: 'Project Layout & Complete File Inventory',
    subtitle: 'Architectural Tour of the 28 Production Modules and 1,377 Automated Tests',
    phase: 'Infrastructure',
    librarianAnalogy: {
      story: 'The grand blueprint of the library building: exactly where the loading dock sits, where the card drawers are located, which study rooms communicate with the head librarian, and where the security guards inspect visitor credentials before anyone enters the stacks.',
      mapping: 'Loading dock = root conversion.py & sync.py. Card drawers = vector_store.py & parent_store.py. Study rooms = agent/ package. Public desks = ui/ package. Security guards = ui/auth.py & tests/.',
      boundary: 'A messy library with unlabelled rooms loses books; every file in Sanad has an isolated single responsibility and a dedicated automated test suite.',
    },
    executiveContext: 'Sanad avoids sprawling monoliths by structuring its 28 core Python modules into cohesive, decoupled packages: root service drivers, the agent reasoning package, the server-rendered user interface, and the automated evaluation suite. The entire architecture is guarded by 1,377 automated tests.',
    coreProblem: 'Unstructured codebases accumulate circular dependencies, hidden global side-effects, and untestable spaghetti logic. When a developer modifies an ingestion regex, chat history silently breaks because modules import each other across arbitrary boundaries.',
    solutionArchitecture: 'Strict modular encapsulation: root drivers handle IO and persistence; agent/ handles pure reasoning through state dicts without importing UI logic; ui/ consumes agent ports via dependency injection; evaluation/ runs independently via CLI; and tests/ mirrors the exact package hierarchy with 1,377 unit and integration tests.',
    checkableFacts: [
      { label: 'Total Test Count', value: '1,377 tests across unit/ and integration/', proofFileOrSource: 'tests/' },
      { label: 'Core Production Modules', value: '28 specialized Python modules across 4 packages', proofFileOrSource: 'pyproject.toml' },
      { label: 'Longest Module', value: 'vector_store.py (634 lines, thoroughly typed and guarded)', proofFileOrSource: 'vector_store.py' },
      { label: 'Shortest Seam', value: 'agent/state.py (140 lines, pure TypedDict definitions)', proofFileOrSource: 'agent/state.py' },
    ],
    interactiveComponentId: 'project-tree',
  },

  // STAGE 8: DevOps, Docker, CI/CD & Testing Hierarchy
  {
    stageNumber: 8,
    id: 'stage-8',
    title: 'DevOps, Multi-Stage Docker, CI/CD & Testing Hierarchy',
    subtitle: 'Astral uv Packaging, PyTorch CPU Pruning (6GB down to 450MB) & The 4-Tier Testing Pyramid',
    phase: 'Infrastructure',
    librarianAnalogy: {
      story: 'Packing an expedition van: instead of loading a 6-ton hydraulic lift designed for deep coal mines that cannot run without high-voltage industrial power (CUDA GPU wheels), we pack a precision lightweight hand-winch that runs everywhere on plain muscle (PyTorch CPU). The van weighs 450kg instead of 6,000kg and arrives in 2 minutes instead of 3 hours.',
      mapping: '6-ton lift = 6GB CUDA PyTorch runtime. Lightweight winch = 450MB CPU PyTorch pinned to uv.lock. The van = Multi-stage Docker image.',
      boundary: 'CPU execution is slightly slower for batch training, but for inference of 1024-d embeddings it responds in 180ms, well under the 500ms human perception threshold.',
    },
    executiveContext: 'Deploying deep learning systems to cost-effective cloud servers (like Railway 2 vCPU instances) requires ruthless dependency pruning. The default sentence-transformers install pulls GPU CUDA runtimes that balloon images to 6 GB, causing build timeouts (9,936 seconds / 2h 46m) and out-of-memory crashes.',
    coreProblem: 'Installing PyTorch from PyPI downloads gigabytes of unreachable NVIDIA libraries. Adding a CPU wheel in a later Docker layer does not reduce image size because layers only accumulate. Furthermore, Railway rejects Dockerfiles containing VOLUME instructions with build scheduling errors.',
    solutionArchitecture: 'Multi-stage Dockerfile: builder stage exports a frozen uv.lock requirement file, strips nvidia-* and triton rows, and installs pinned CPU-only PyTorch from download.pytorch.org/whl/cpu. The runtime stage copies only the clean venv, running under unprivileged user sanad:sanad (UID 10001) without VOLUME directives. The GitHub Actions pipeline enforces gate.yml and eval.yml across the 4-Tier Testing Pyramid.',
    checkableFacts: [
      { label: 'Image Size Reduction', value: '6 GB down to 450 MB (92% reduction)', proofFileOrSource: 'Dockerfile' },
      { label: 'Historical Build Timeout', value: '9,936s (2h 46m) reduced to <120 seconds', proofFileOrSource: 'Dockerfile lines 22-25' },
      { label: 'Unprivileged User', value: 'sanad:sanad (UID 10001, non-root execution)', proofFileOrSource: 'Dockerfile lines 206-208' },
      { label: 'Testing Pyramid', value: '4 Tiers (1,200+ unit, 120+ integration, 35+ security, 60 golden RAGAS)', proofFileOrSource: '.github/workflows/gate.yml' },
    ],
    interactiveComponentId: 'devops-pipeline',
  },

  // STAGE 9: Split-Screen Code Walkthrough Studio & Blast Radius Graph
  {
    stageNumber: 9,
    id: 'stage-9',
    title: 'Split-Screen Code Walkthrough Studio & Blast Radius Graph',
    subtitle: 'Step-by-Step Logic Inspection with Dynamic Dimming and Downstream Fallout Mapping',
    phase: 'Code Studio',
    librarianAnalogy: {
      story: 'The head archivist takes a magnifying glass and walks a new apprentice through the master catalog desk line by line. As the archivist explains one specific drawer, the rest of the room dims into shadow so the apprentice sees only the exact mechanism being handled, while a string map on the wall shows which rooms will collapse if that drawer is altered.',
      mapping: 'Magnifying glass = Neon code highlight. Dimmed room = 25% opacity surrounding code. String map = Blast Radius Dependency Graph.',
      boundary: 'A physical library has loose human connections; in code, every import statement and state key is an enforceable mathematical dependency.',
    },
    executiveContext: 'Reading raw code without architecture context creates cognitive overload for junior engineers and academic reviewers. This studio provides a synchronized split-screen: the left pane highlights the active logical block while dimming the rest of the file to 25% opacity; the right pane breaks down the logic in plain language, exposes the failure mode prevented, and graphs the downstream blast radius.',
    coreProblem: 'Codebases are inherently interconnected. When a junior developer edits a return type in agent/nodes.py without understanding its blast radius, downstream components in ui/screen.py and evaluation/runner.py crash with silent attribute errors or missing citations.',
    solutionArchitecture: 'Interactive Split-Screen Code Studio: full syntax-highlighted code with neon active blocks, plain-language line breakdowns, variables and types analysis, and an interactive Blast Radius Graph mapping upstream callers, direct dependencies, downstream dependents, and validating tests.',
    checkableFacts: [
      { label: 'Modules Analyzed', value: 'agent/nodes.py, agent/graph.py, sync.py', proofFileOrSource: 'RAG_project_ENSA' },
      { label: 'Blast Radius Mapping', value: 'Upstream callers, dependencies & downstream fallout', proofFileOrSource: 'agent/ports.py' },
      { label: 'State Invariant', value: 'Pure partial dict updates (zero in-place state mutation)', proofFileOrSource: 'agent/state.py' },
      { label: 'Trace Invariant', value: 'Every node records at least 1 StepKind trace entry', proofFileOrSource: 'agent/trace.py' },
    ],
    interactiveComponentId: 'split-code',
  },

  // STAGE 10: Git Workflow, Commits & Review Gates
  {
    stageNumber: 10,
    id: 'stage-10',
    title: 'Git Workflow, Conventional Commits & Review Gates',
    subtitle: 'Rule 5 Branch Protection, Conventional Commits & .github/pull_request_template.md',
    phase: 'Review & Decisions',
    librarianAnalogy: {
      story: 'The official legal seal registry: When an archivist wants to bind a new page into the Kingdom\'s law book, they cannot just slip it between pages with tape. They must submit a formal docket with 5 wax seals: proof that the old law was checked, a certificate of word accuracy, the signatures of both chief magistrates, and no personal secrets written on the edges.',
      mapping: 'Docket with 5 wax seals = .github/pull_request_template.md checklist. Both chief magistrates = YL and MB dual sign-off. The Kingdom\'s law book = master branch.',
      boundary: 'Wax seals can be forged by a rogue clerk; Git commit signatures and GitHub branch protection rules are enforced cryptographically.',
    },
    executiveContext: 'Collaboration between YL and MB is governed by strict Git protocol. All code merges must be squash-only, titled according to Conventional Commits (feat: ST-nn <summary>), and verified against the 5-point checklist from architecture section 12.2.',
    coreProblem: 'Without branch guards, commits like "fixed stuff" or unreviewed prompt tweaks bypass testing. Unreviewed changes can accidentally commit secret API keys or raw data folders, violating PR checklist item 5 and corrupting benchmark history.',
    solutionArchitecture: 'Strict GitHub branch protection on master: requires passing CI (gate.yml), no AI attribution tags (ENGINEERING-RULES.md rule 4), adherence to .github/pull_request_template.md, and dual approval from both code mechanics (YL) and quality/RAGAS (MB) owners.',
    checkableFacts: [
      { label: 'Commit Format', value: 'Conventional Commits (feat: ST-nn <summary>)', proofFileOrSource: '.github/pull_request_template.md' },
      { label: 'Pull Request Template', value: '5-Point Verification Checklist (Architecture §12.2)', proofFileOrSource: '.github/pull_request_template.md' },
      { label: 'Review Law', value: 'Rule 5 dual sign-off enforced before squash-merge', proofFileOrSource: 'tests/review_rules.py' },
      { label: 'Attribution Invariant', value: 'Zero [AI] markers in commit bodies (graded academic work)', proofFileOrSource: 'ENGINEERING-RULES.md rule 4' },
    ],
    interactiveComponentId: 'git-workflow',
  },

  // STAGE 11: Real Incidents & Production Failures Encountered
  {
    stageNumber: 11,
    id: 'stage-11',
    title: 'Real Incidents & Production Post-Mortems',
    subtitle: '5 Documented Obstacles: SQLite Locks, Dimension Mismatches, E5 Prefixes, OOM Scans & BOLA Leaks',
    phase: 'Review & Decisions',
    librarianAnalogy: {
      story: 'The library incident log: The day the filing cabinet jammed shut because two clerks pulled the drawer at the same time (database is locked); the day index cards were cut in the wrong millimeter size and crashed the sorting machine (vector dimension mismatch); and the day an archivist answered "Yes, we have that room" to an unauthorized visitor (BOLA 403 leak).',
      mapping: 'Filing cabinet jam = SQLite rollback lock contention. Sorting machine crash = Qdrant 384d vs 1024d mismatch. Visitor leak = HTTP 403 metadata disclosure.',
      boundary: 'Physical archives can apologize to visitors; in software, every incident must result in an automated regression test that makes recurrence impossible.',
    },
    executiveContext: 'True senior engineering is defined by how real failures are diagnosed and permanently resolved. During Sanad\'s development, five critical production incidents occurred across concurrency, vector topology, embeddings, memory limits, and authorization.',
    coreProblem: 'Junior teams paper over failures with quick hacks (e.g. adding time.sleep() for database locks, or increasing container RAM for memory leaks). This leaves underlying race conditions intact, guaranteeing catastrophic failure during live evaluation or faculty examination.',
    solutionArchitecture: 'Root-cause analysis and permanent automated guardrails: WAL mode + busy_timeout=5000 for SQLite; centralized 1024-d configuration schemas; automatic E5 prefix decorators; SingleFlightMutex streaming for PDF OCR; and silent 404 BOLA defenses. Each incident is paired with an immutable regression test in tests/.',
    checkableFacts: [
      { label: 'Concurrency Invariant', value: 'PRAGMA busy_timeout = 5000 eliminates database is locked errors', proofFileOrSource: 'tests/unit/test_db_repo.py' },
      { label: 'Vector Alignment', value: 'Asserted vector_dimensions = 1024 across models and Qdrant', proofFileOrSource: 'tests/unit/test_vector_store.py' },
      { label: 'Prefix Invariant', value: '100% of queries carry query: prefix, restoring 30% lost recall', proofFileOrSource: 'tests/unit/test_embeddings.py' },
      { label: 'Memory Ceiling', value: 'Single-flight ingestion caps container memory under 75% of 4GB limit', proofFileOrSource: 'tests/unit/test_conversion.py' },
      { label: 'BOLA Security', value: '100% of cross-tenant document requests return silent 404 Not Found', proofFileOrSource: 'tests/integration/test_s6_auth.py' },
    ],
    interactiveComponentId: 'incidents',
  },

  // STAGE 12: Architectural Decisions (The 20 ADRs)
  {
    stageNumber: 12,
    id: 'stage-12',
    title: 'Architectural Decisions: The 20 ADRs',
    subtitle: 'Structured Decision Records Documenting Context, Trade-Offs, and Consequences (ADR-001 to ADR-020)',
    phase: 'Review & Decisions',
    librarianAnalogy: {
      story: 'The council of magistrates records every monumental library policy in the Book of Ordinances: why the library chooses stone vaults over wood, why books are stamped with indelible ink, and why entry is granted by token rather than verbal password. Three years later, when a new mayor asks why things were done this way, the book answers with undisputed clarity.',
      mapping: 'Book of Ordinances = docs/journal/DECISIONS.md. Policy entries = ADR-001 through ADR-020.',
      boundary: 'Political ordinances can be arbitrarily revoked; technical ADRs are bound by empirical test results and benchmark metrics.',
    },
    executiveContext: 'Every significant architectural choice in Sanad is recorded in docs/journal/DECISIONS.md following the ADR-lite format: Date, Task, Decision, Options Considered, Why Chosen, Consequences, and Owner (YL or MB). This eliminates guesswork, defends against regression during thesis questioning, and records the exact empirical rationale behind every trade-off.',
    coreProblem: 'Without documented decision records, engineering teams suffer from collective amnesia. Months later, a developer undoes a deliberate architectural compromise (e.g. replacing SQLite WAL with an ORM, or removing the single-flight mutex) because they did not know why the compromise was made.',
    solutionArchitecture: '20 structured Architectural Decision Records spanning Hexagonal Ports (ADR-001), Jinja2 SSR (ADR-002), Rolling Session Memory (ADR-003), Hybrid Search RRF (ADR-005), Astral uv (ADR-010), SQLite WAL (ADR-011), 60-Question Benchmark (ADR-012), Keycloak OIDC (ADR-014), and LangGraph StateGraph (ADR-019).',
    checkableFacts: [
      { label: 'Total ADR Records', value: '20 structured decisions in docs/journal/DECISIONS.md', proofFileOrSource: 'docs/journal/DECISIONS.md' },
      { label: 'Ownership Split', value: 'YL owns systems & storage ADRs; MB owns quality & benchmark ADRs', proofFileOrSource: 'DECISIONS.md' },
      { label: 'Contract Immutability', value: 'ADRs record explicit deviations against docs/phase2/openapi.yaml', proofFileOrSource: 'DECISIONS.md lines 7-8' },
      { label: 'Verification', value: 'Every ADR links directly to an automated test file or benchmark report', proofFileOrSource: 'tests/unit/' },
    ],
    interactiveComponentId: 'adr-browser',
  },

  // STAGE 13: Railway Cloud Deployment
  {
    stageNumber: 13,
    id: 'stage-13',
    title: 'Railway Cloud Deployment & Fail-Fast Boot',
    subtitle: 'Non-Root Execution, /app/data Persistent Mounts, Sub-50ms /healthz & Pydantic Validation',
    phase: 'Production',
    librarianAnalogy: {
      story: 'The library opens a branch in the royal castle. Instead of building stone walls on the castle balcony, they moor a transport carriage that plugs into the castle power socket ($PORT), attaches to an immovable steel anchor box bolted to the foundation (/app/data), and has a sentry who taps the door every minute (/healthz). If the key is missing from the lock at dawn, the sentry sounds the alarm and refuses to unlock the door.',
      mapping: 'Transport carriage = Docker container. Steel anchor box = Railway persistent volume mount. Sentry tapping door = /healthz probe. Missing key alarm = Pydantic BaseSettings fail-fast exit 1.',
      boundary: 'A carriage can be moved; in cloud infrastructure, if the volume is unattached, the database vanishes on every container redeployment.',
    },
    executiveContext: 'Production deployment to Railway cloud requires cloud-native resilience. Sanad runs under unprivileged user sanad:sanad (UID 10001), binds dynamically to $PORT, persists SQLite and Qdrant under /app/data, responds to /healthz probes within 50ms, and halts instantly at boot if any required environment variable is missing.',
    coreProblem: 'Junior cloud deployments frequently crash due to ephemeral storage (losing entire document indexes on redeploy), sluggish health probes timing out during cold boot, or starting silently with missing secrets only to crash during a user query.',
    solutionArchitecture: 'Production Railway configuration: persistent volume mount at /app/data, sub-50ms /healthz readiness/liveness probe, and Pydantic BaseSettings validation that asserts all environment keys on the first line of app.py execution.',
    checkableFacts: [
      { label: 'Port Invariant', value: 'Binds to 0.0.0.0:$PORT injected dynamically by Railway', proofFileOrSource: 'app.py' },
      { label: 'Volume Persistence', value: '/app/data holds SQLite registry, Qdrant vectors & parent files', proofFileOrSource: 'Dockerfile line 271' },
      { label: 'Health Probe Latency', value: '<50ms response verifying SQLite write & Qdrant ping', proofFileOrSource: 'app.py: /healthz' },
      { label: 'Boot Invariant', value: 'Missing secret raises ValidationError with exit code 1 immediately', proofFileOrSource: 'config.py' },
    ],
    interactiveComponentId: 'cloud-deploy',
  },

  // STAGE 14: Quantitative Evaluations & The Golden Benchmark
  {
    stageNumber: 14,
    id: 'stage-14',
    title: 'Quantitative Evaluations & The Golden Benchmark',
    subtitle: '60-Question Frozen Benchmark, RAGAS Triad (Faithfulness >= 0.90) & The Release Gate Bouncer',
    phase: 'Production',
    librarianAnalogy: {
      story: 'The state licensing exam for court interpreters: exactly 60 official questions. 40 questions test real laws that the student must translate and point to in the book; 20 questions ask about fictional laws that the student MUST refuse to answer. If the student invents even one answer for the fictional laws, they fail the exam automatically.',
      mapping: '60 questions = evaluation/golden.py frozen set. 40 real laws = in_scope questions. 20 fictional laws = out_of_scope questions. Automatic failure = Release Gate Bouncer (gate.py).',
      boundary: 'Human examiners might give partial credit for good style; our release gate algorithm asserts zero tolerance for hallucinations.',
    },
    executiveContext: 'Sanad measures accuracy using an automated, quantitative evaluation framework rather than anecdotal testing. The 60-question frozen golden benchmark (evaluation/golden.py) evaluates 40 in-scope questions and 20 out-of-scope questions against the RAGAS triad.',
    coreProblem: 'Subjective "looks good to me" testing guarantees regressions. A developer tweaks a prompt to solve one question, unknowingly causing hallucinations on 15 other questions. Without an automated gate, flawed releases reach production.',
    solutionArchitecture: 'Automated evaluation runner (scripts/run_evaluation.py) and Release Gate Bouncer (scripts/release_gate.py) enforcing the three non-negotiable thresholds: Gate 1 (Faithfulness >= 0.90), Gate 2 (Refusal Pass Rate = 100%), and Gate 3 (Sources present on 100% of answers).',
    checkableFacts: [
      { label: 'Golden Corpus', value: '60 frozen questions (40 in-scope, 20 out-of-scope)', proofFileOrSource: 'evaluation/golden/' },
      { label: 'Gate 1 Invariant', value: 'Faithfulness >= 0.90 across in-scope answers', proofFileOrSource: 'evaluation/gate.py' },
      { label: 'Gate 2 Invariant', value: '100% refusal pass rate on out-of-scope questions', proofFileOrSource: 'evaluation/gate.py' },
      { label: 'Gate 3 Invariant', value: '100% of answer rows carry verifiable source citations', proofFileOrSource: 'evaluation/gate.py' },
    ],
    interactiveComponentId: 'golden-benchmark',
  },

  // STAGE 15: Monitoring, Operational Tracing & User Feedback
  {
    stageNumber: 15,
    id: 'stage-15',
    title: 'Monitoring, Operational Tracing & User Feedback',
    subtitle: 'In-Process Trace Collector (agent/trace.py), SQLite Audit Logs (p50/p95) & Idempotent Feedback',
    phase: 'Production',
    librarianAnalogy: {
      story: 'The head librarian\'s ledger and visitor feedback box: every search is logged with the number of seconds spent and the drawers opened. Beside every answer slip given to a reader, a stamp allows them to check "Useful" or "Inaccurate". The head librarian reviews the box weekly to identify confusing questions.',
      mapping: 'Search ledger = agent/trace.py. Drawer list = StepKind steps. Feedback box = answer_feedback table with idempotent UPSERT.',
      boundary: 'Paper feedback slips can be lost or stuffed; SQLite answer_feedback enforces unique constraints on answer_key.',
    },
    executiveContext: 'Production observability must respect privacy and local execution constraints. Sanad implements in-process tracing without third-party SaaS dependencies, recording node-by-node execution timelines, token usage, latency percentiles, and user citation ratings.',
    coreProblem: 'Third-party observability tools (Datadog, LangSmith) transmit user queries and legal context to external servers, violating data custody. Furthermore, loose logging creates performance bottlenecks and drifts from actual retry execution counts.',
    solutionArchitecture: 'In-process trace collector in agent/trace.py: the trace IS the counter (no duplicate state). Every answer records step-by-step latency, touched files, and searches run. SQLite stores user feedback (answer_feedback) using idempotent UPSERTs on answer_key.',
    checkableFacts: [
      { label: 'Privacy Invariant', value: 'In-process tracing without external SaaS telemetry transmission', proofFileOrSource: 'agent/trace.py' },
      { label: 'Trace Design Rule', value: 'The trace is the counter (retries derived from reword steps)', proofFileOrSource: 'agent/trace.py lines 8-11' },
      { label: 'Latency Monitoring', value: 'p50 latency <2.0s, p95 latency <5.0s on 2 vCPU', proofFileOrSource: 'ui/screen.py' },
      { label: 'Feedback Idempotency', value: 'UNIQUE(answer_key) constraint prevents duplicate ratings', proofFileOrSource: 'db/schema.sql' },
    ],
    interactiveComponentId: 'monitoring-trace',
  },

  // STAGE 16: Upgrades, Releases & Thesis Defense Readiness
  {
    stageNumber: 16,
    id: 'stage-16',
    title: 'Upgrades, Semantic Versioning & Thesis Defense Readiness',
    subtitle: 'From v1.0.0 to v3.1.0: Prompt Registry SemVer, Zero-Downtime DB Evolution & Academic Defense Clearance',
    phase: 'Production',
    librarianAnalogy: {
      story: 'The graduation day ceremony: The apprentices present the completed master archive to the university faculty. Every book has a version stamp, every shelf has a certificate of inspection, and when the professors inspect the system with surprise questions, the apprentices run the automated verification bouncer and demonstrate 100% green checkmarks.',
      mapping: 'Version stamp = Semantic Versioning (v1.0.0 to v3.1.0). Certificate of inspection = Master Defense Certificate. Automated bouncer = release_gate.py.',
      boundary: 'A student presentation relies on charisma; an engineering defense relies on mathematically checkable automated test gates.',
    },
    executiveContext: 'The culmination of the project: transitioning Sanad through 6 agile sprints into production release v3.1.0, backed by versioned prompt catalogs, zero-lock database migrations, and an automated thesis defense verification suite.',
    coreProblem: 'Student engineering projects often collapse at the final demonstration: an untested schema migration breaks on the morning of the exam, or an unpinned prompt version produces wild hallucinations in front of the examination jury.',
    solutionArchitecture: 'Strict SemVer progression (v1.0.0 foundational ingestion -> v3.1.0 production sovereign system). Prompts versioned under prompts/ with SemVer tags. The complete defense suite (1,377 tests, release_gate.py, OpenAPI drift check) executes cleanly to grant Academic Defense Clearance.',
    checkableFacts: [
      { label: 'Release Milestone', value: 'Production version v3.1.0 promoted with signed git tag', proofFileOrSource: 'pyproject.toml' },
      { label: 'Prompt Provenance', value: 'All prompts versioned under prompts/ with SemVer tags', proofFileOrSource: 'prompts/' },
      { label: 'Full Test Pyramid', value: '1,377 tests passing with exit code 0', proofFileOrSource: 'tests/' },
      { label: 'Defense Readiness', value: '100% adherence to Moroccan Labor Code ground truth', proofFileOrSource: 'docs/defense/' },
    ],
    interactiveComponentId: 'defense-readiness',
  },
];
