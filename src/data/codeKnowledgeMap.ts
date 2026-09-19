// Sanad Codebase Reality & Knowledge Map
// Grounds every sublesson in authentic Python modules, functions, invariants & clear metaphors
import { CODE_KNOWLEDGE_MAP_FR } from './codeKnowledgeMapFr';

export interface CodeKnowledgeItem {
  lessonId: string;
  specNumber: number;
  sourceFile: string;
  coreFunction: string;
  codeSnippet: string;
  codeExplanation: string;
  clearMetaphor: {
    intuition: string;
    softwareMapping: string;
    whyItBreaksWithoutIt: string;
  };
  situationDetails: {
    operationalContext: string;
    disasterScenario: string;
    engineeringMitigation: string;
  };
  tradeOffInsight: {
    juniorShortcut: string;
    seniorResolution: string;
  };
  codeInvariants: string[];
}

export const CODE_KNOWLEDGE_MAP: Record<string, CodeKnowledgeItem> = {
  '1-1': {
    lessonId: "1-1",
    specNumber: 1,
    sourceFile: "tests/review_rules.py",
    coreFunction: "enforce_rule_5_review()",
    codeSnippet: "def enforce_rule_5_review(pr: PullRequest) -> bool:\n    yl_approved = pr.has_approval_from(\"YL\")  # Systems & Infrastructure\n    mb_approved = pr.has_approval_from(\"MB\")  # Quality, Legal Truth & Thesis\n    if not (yl_approved and mb_approved):\n        raise GovernanceViolation(\"Rule 5: Both architects must cryptographically sign off\")\n    return True",
    codeExplanation: "Validates that every Pull Request carries explicit, cryptographic approvals from both technical leads before git merge is permitted.",
    clearMetaphor: {
      intuition: "Twin-seat supersonic fighter jet: Pilot 1 (YL) flies the engine and controls instruments; Pilot 2 (MB) scans the radar, tracks mission rules, and locks targets. Neither can fire without dual keylocks.",
      softwareMapping: "YL controls systems engineering, SQLite schemas, and Docker pipelines; MB controls legal ground truth, RAGAS benchmarks, and faculty thesis defense.",
      whyItBreaksWithoutIt: "A solo cowboy developer pushes unreviewed code directly to master on demo day; the LLM hallucinates during faculty review and ruins the defense.",
    },
    situationDetails: {
      operationalContext: "A two-engineer team designing a high-stakes Moroccan legal AI system with an unmovable academic thesis defense deadline.",
      disasterScenario: "A solo cowboy dev pushes broken prompt code directly to master 2 hours before the jury presentation, causing the AI to hallucinate in front of faculty.",
      engineeringMitigation: "GitHub branch protection rules and tests/review_rules.py require mandatory dual peer approvals matching distinct architectural domains.",
    },
    tradeOffInsight: {
      juniorShortcut: "Junior cowboy commits: A solo developer pushes directly to master without review, tests on 1 prompt, and claims 'it works on my machine'.",
      seniorResolution: "Sanad dual-pilot matrix: Both architects review code in their respective domains; mandatory pull request gates prevent unverified code from ever reaching staging.",
    },
    codeInvariants: [
      "Zero commits permitted directly to the master branch without a PR",
      "Dual architectural sign-off (YL + MB) required on every pull request",
      "Automated CI linting and unit test suite must pass 100% with exit code 0",
    ],
  },
  '1-2': {
    lessonId: "1-2",
    specNumber: 1,
    sourceFile: "app.py",
    coreFunction: "initialize_four_pillars()",
    codeSnippet: "async def initialize_four_pillars(settings: Settings) -> SystemCore:\n    sqlite_db = await open_sqlite_wal(settings.DB_PATH)\n    qdrant_client = AsyncQdrantClient(url=settings.QDRANT_URL)\n    agent_graph = compile_langgraph_workflow(sqlite_db, qdrant_client)\n    return SystemCore(web=app, db=sqlite_db, vector=qdrant_client, brain=agent_graph)",
    codeExplanation: "Decouples the 4 independent architectural pillars: FastAPI web routing, SQLite WAL relational storage, Qdrant vector space, and LangGraph cyclic reasoning.",
    clearMetaphor: {
      intuition: "Automated factory conveyor belt with laser optical sorter: parcels enter the intake dock, get sliced, stored in high-density vaults, and inspected before leaving.",
      softwareMapping: "FastAPI receives requests, SQLite WAL stores audit logs and parent chunks, Qdrant computes 768-D vector similarities, and LangGraph coordinates reasoning.",
      whyItBreaksWithoutIt: "Uploading raw corporate PDFs to public third-party cloud APIs leaks proprietary secrets, violates Moroccan Law 09-08, and creates vendor lock-in.",
    },
    situationDetails: {
      operationalContext: "Enterprise clients require searching 400-page Moroccan legal gazettes without uploading proprietary files to public third-party clouds.",
      disasterScenario: "Uploading raw corporate PDFs to public third-party cloud APIs leaks proprietary secrets and violates Moroccan Law 09-08.",
      engineeringMitigation: "A local-first architecture keeps all vector indexing, relational audit trails, and document chunks on private, sovereign servers.",
    },
    tradeOffInsight: {
      juniorShortcut: "Building a naive 20-line cloud wrapper that uploads raw documents directly to an external LLM provider without local indexing.",
      seniorResolution: "Four decoupled pillars allow swapping vector databases or LLM backends in minutes without touching core business logic.",
    },
    codeInvariants: [
      "Data persistence is split between relational SQLite WAL and vector Qdrant",
      "Reasoning engine is decoupled from storage behind hexagonal abstract ports",
      "100% of document indexing and vector calculations run on local private infrastructure",
    ],
  },
  '1-3': {
    lessonId: "1-3",
    specNumber: 1,
    sourceFile: "agent/state.py",
    coreFunction: "Answer.__post_init__()",
    codeSnippet: "@dataclass(frozen=True)\nclass Answer:\n    kind: AnswerKind\n    text: str\n    sources: tuple[Source, ...]\n\n    def __post_init__(self) -> None:\n        if self.kind is AnswerKind.ANSWER and not self.sources:\n            raise ValueError(\"an answer with no sources cannot be final (openapi Answer: sources non-empty whenever kind is answer; PRD F-03)\")",
    codeExplanation: "Enforces the inviolable invariant that an Answer object without at least one verified source card cannot exist and crashes tests if attempted.",
    clearMetaphor: {
      intuition: "Open-book legal bar exam: you fail instantly if you recite from memory without citing the open code under your eyes.",
      softwareMapping: "The AI model is technically forbidden from generating citation cards; Python backend code reads source chunks and attaches verified receipts.",
      whyItBreaksWithoutIt: "Model hallucinates a nonexistent 'Article 999'; client relies on it and loses a wrongful dismissal lawsuit in Moroccan labor court.",
    },
    situationDetails: {
      operationalContext: "HR managers and legal analysts rely on Sanad to compute statutory severance pay and notice periods based on official bulletins.",
      disasterScenario: "Model hallucinates a nonexistent 'Article 999'; client relies on it and loses a wrongful dismissal lawsuit in labor court.",
      engineeringMitigation: "Every factual assertion in the final answer must link to physical Source objects with document name, page number, and exact quote.",
    },
    tradeOffInsight: {
      juniorShortcut: "Prompting the model to 'be helpful and conversational' and generate citations from internal memory when sources are missing.",
      seniorResolution: "Enforce code-generated citation receipts and return a deterministic honest refusal (AnswerKind.REFUSAL) whenever proof is missing.",
    },
    codeInvariants: [
      "Citations are generated by Python disk reads, never by the LLM",
      "Every receipt records document name, page number, and exact text",
      "Answer.__post_init__ raises ValueError if an answer is generated without sources",
    ],
  },
  '2-1': {
    lessonId: "2-1",
    specNumber: 2,
    sourceFile: "pyproject.toml & chunking.py",
    coreFunction: "parent_child_indexing()",
    codeSnippet: "# pyproject.toml: Astral uv package management\n# chunking.py: Split H1-H3 markdown headings\n_HEADING = re.compile(r\"^(#{1,3})\\s+(.*\\S)\\s*$\")\n_LABEL_RANGE_SEPARATOR = \" ... \"\n# 500-char child chunks for Qdrant / 4,000-char parent blocks in SQLite",
    codeExplanation: "Implements parent-child chunking where 500-char child windows are indexed for dense vector search and full 4,000-char parent sections are kept for context.",
    clearMetaphor: {
      intuition: "Pouring reinforced concrete foundation pillars before attempting to construct the upper floors of a skyscraper.",
      softwareMapping: "Sprint 0 and 1 establish the build system with Astral uv, SQLite WAL schemas, and multilingual-e5-base vector collections before writing agent loops.",
      whyItBreaksWithoutIt: "Standard pip installs download 4GB of CUDA GPU drivers on a CPU server, causing 15-minute deployment delays and container OOM crashes.",
    },
    situationDetails: {
      operationalContext: "The engineering team needed to stand up a reproducible development environment and ingest 50 complex Moroccan legal documents rapidly.",
      disasterScenario: "Slow package resolution and unstable pip dependencies threaten sprint velocity and lead to 'works on my machine' environmental failures.",
      engineeringMitigation: "Adopting Astral uv with a frozen uv.lock file reduces build times from 5 minutes to under 3 seconds with 100% byte-level reproducibility.",
    },
    tradeOffInsight: {
      juniorShortcut: "Using unpinned pip requirements and chopping text into arbitrary 1,000-character slices that sever sentences at critical legal definitions.",
      seniorResolution: "Astral uv provides deterministic lockfiles while parent-child chunking preserves both search precision (500c) and reading context (4000c).",
    },
    codeInvariants: [
      "Astral uv manages all dependencies with sub-3-second installation times",
      "PyTorch CPU wheels reduce Docker image size by over 3.5GB",
      "Parent-child chunking separates 500-char search vectors from 4,000-char context blocks",
    ],
  },
  '2-2': {
    lessonId: "2-2",
    specNumber: 2,
    sourceFile: "agent/graph.py & evaluation/scoring.py",
    coreFunction: "compile_workflow() & LLMJudgeScorer",
    codeSnippet: "# agent/graph.py: Cyclic StateGraph compilation\nworkflow = StateGraph(AgentState)\nworkflow.add_node(\"grade\", grade_node)\nworkflow.add_conditional_edges(\"grade\", decide_to_generate, {\"generate\": \"answer\", \"reword\": \"reword\"})\n\n# evaluation/scoring.py: Automated Gate 1 verification\nassert score.faithfulness >= 0.90, \"Gate 1: Faithfulness must be >= 0.90\" ",
    codeExplanation: "Compiles the cyclic 9-node LangGraph StateGraph, establishing conditional edges that route between generation, query rewording, and honest refusal.",
    clearMetaphor: {
      intuition: "A closed-circuit automotive test track where a high-performance vehicle is monitored by telemetry sensors before being allowed on public roads.",
      softwareMapping: "Sprints 2 and 3 implement the cyclic agent state machine and evaluate every code change against an automated 60-question golden benchmark.",
      whyItBreaksWithoutIt: "Linear chains fail silently when retrieval returns noisy context, causing behavioral drift where fixing one prompt breaks ten other queries.",
    },
    situationDetails: {
      operationalContext: "Transitioning from simple vector similarity lookup to multi-step reasoning, query reformulation, and automated quality grading.",
      disasterScenario: "Prompts tweaked based on developer intuition silently degrade retrieval recall on complex multi-article severance questions.",
      engineeringMitigation: "Automated evaluation scripts execute the golden benchmark and enforce Release Gate 1 (Faithfulness >= 90%) before code can merge.",
    },
    tradeOffInsight: {
      juniorShortcut: "Testing agent behavior with 3 manual queries in the chat UI and assuming the system is production-ready.",
      seniorResolution: "A cyclic state machine recovers from ambiguous queries while automated RAGAS benchmarks turn AI quality into empirical software engineering.",
    },
    codeInvariants: [
      "LangGraph StateGraph enables query rewording loops up to 3 iterations",
      "LLMJudgeScorer calculates Faithfulness and Context Recall objectively",
      "Release Gate 1 blocks deployment if faithfulness score dips below 90%",
    ],
  },
  '2-3': {
    lessonId: "2-3",
    specNumber: 2,
    sourceFile: "Dockerfile & railway.toml",
    coreFunction: "Railway production container",
    codeSnippet: "# Dockerfile: Multi-stage build with non-root user (UID 1000)\nFROM node:22-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nUSER node\nEXPOSE 3000\n# railway.toml: Persistent storage mount at /app/data\n[[mounts]]\ndestination = \"/app/data\" ",
    codeExplanation: "Multi-stage Docker build that compiles production artifacts in an isolated builder stage and runs under an unprivileged user on Railway cloud.",
    clearMetaphor: {
      intuition: "A black belt karate exam where the candidate practices every single defensive kata one hundred times before stepping in front of the masters.",
      softwareMapping: "Sprints 4, 5, and 6 harden the system for enterprise deployment on Railway and execute 10 simulated academic thesis defense rehearsals.",
      whyItBreaksWithoutIt: "A live demo fails because the university Wi-Fi drops, API token limits are exhausted, or an unvetted jury question blindsides the team.",
    },
    situationDetails: {
      operationalContext: "Preparing the final software deliverable for university faculty evaluation and production enterprise deployment.",
      disasterScenario: "A single network failure or unexpected server crash during the live faculty evaluation would ruin months of engineering work.",
      engineeringMitigation: "Deploying a persistent Railway container with mounted volumes, paired with a local offline fallback demo and a 30-question jury defense bank.",
    },
    tradeOffInsight: {
      juniorShortcut: "Relying on a developer laptop hotspot and praying that cloud APIs remain responsive during the presentation.",
      seniorResolution: "Rigorous defense rehearsals with pre-recorded contingency videos and persistent cloud hosting guarantee an unflappable delivery.",
    },
    codeInvariants: [
      "Railway container persists data across redeployments via mounted /data volumes",
      "Non-root USER node runtime prevents container breakout vulnerabilities",
      "10 structured rehearsals cover 30 anticipated technical jury defense questions",
    ],
  },
  '3-1': {
    lessonId: "3-1",
    specNumber: 3,
    sourceFile: "docs/journal/YL.md & MB.md",
    coreFunction: "Work Journal Protocol",
    codeSnippet: "# Work Journal - YL (Systems Architect)\n## 2026-09-18 | Session 42\n- **Done**: Implemented single-flight mutex for E5 embeddings in singleton.py (Commit: 8f2a1c)\n- **Ongoing**: Benchmarking Qdrant payload filters vs SQLite pre-filtering\n- **Left**: Wire Keycloak OIDC refresh token rotation\n- **Blocked**: None",
    codeExplanation: "Structured daily work journals maintained by each architect, formatted into immutable Done, Ongoing, Left, and Blocked sections.",
    clearMetaphor: {
      intuition: "An aircraft flight data recorder (black box) that logs altitude, speed, and pilot inputs every second so no anomaly is left to speculation.",
      softwareMapping: "Every technical decision, schema migration, bug fix, and benchmark result is timestamped and linked to Git commit hashes in YL.md and MB.md.",
      whyItBreaksWithoutIt: "Architects forget why a design choice was made, re-introduce fixed regressions, or fail to defend technical decisions to the thesis jury.",
    },
    situationDetails: {
      operationalContext: "High-velocity development cadence with dozens of commits, schema adjustments, and bug fixes landing across multiple sprints.",
      disasterScenario: "During the academic thesis defense, a professor asks why cosine distance was chosen over Euclidean L2, and the developer stumbles without proof.",
      engineeringMitigation: "Consulting the work journal reveals the exact date, benchmark test results, and rationale for choosing cosine distance with normalized vectors.",
    },
    tradeOffInsight: {
      juniorShortcut: "Discussing architecture informally on Slack or WhatsApp without maintaining a structured, versioned audit trail.",
      seniorResolution: "Structured daily journals transform development into a verifiable scientific record and keep the twin architects in complete alignment.",
    },
    codeInvariants: [
      "Daily journals track Done, Ongoing, Left, and Blocked items per session",
      "Every architectural decision links to an explicit Git commit hash",
      "Morning synchronization begins by reading the other architect's journal",
    ],
  },
  '3-2': {
    lessonId: "3-2",
    specNumber: 3,
    sourceFile: "docs/phase2/ & specs/SPEC_LOCK.md",
    coreFunction: "Signed Spec Pack & Spec-Lock",
    codeSnippet: "# SPEC-LOCK STATUS: LOCKED (v1.0)\n# SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\nAll 20 specification documents under docs/phase2/ are frozen in read-only status.\nchmod 444 docs/phase2/*.md\nAny requirement modification requires a formal Amendment PR approved by both YL and MB.",
    codeExplanation: "Spec-Lock declaration that cryptographically signs the 20 specification markdowns and forbids unapproved scope modifications.",
    clearMetaphor: {
      intuition: "A notarized contract sealed with hot wax: once both parties sign at the notary's office, neither can secretly edit a clause in pencil.",
      softwareMapping: "The 20 specifications define the exact boundary of what must be delivered for version 1.0, protecting the team against scope creep.",
      whyItBreaksWithoutIt: "Scope creep: developers keep adding exciting new features every week, continually breaking existing tests and never finishing version 1.0.",
    },
    situationDetails: {
      operationalContext: "Managing a comprehensive scope covering document parsing, vector indexing, LangGraph reasoning, OWASP security, and cloud deployment.",
      disasterScenario: "A team member starts rewriting the database layer to support graph databases midway through sprint 3, derailing the delivery timeline.",
      engineeringMitigation: "The Spec-Lock rule requires a formal Pull Request with impact analysis and dual approval before any specification can be modified.",
    },
    tradeOffInsight: {
      juniorShortcut: "Allowing requirements to remain fluid and changing specifications on the fly based on informal suggestions.",
      seniorResolution: "Frozen specifications provide a stable architectural target, allowing the team to focus on quality and timely delivery.",
    },
    codeInvariants: [
      "All 20 specification markdowns are marked read-only with Git tag protection",
      "Scope additions require a formal Amendment PR with cost and time estimates",
      "Dual approval (YL + MB) is mandatory to amend any locked specification",
    ],
  },
  '3-3': {
    lessonId: "3-3",
    specNumber: 3,
    sourceFile: "governance/descope_ladder.py",
    coreFunction: "descope_priority_hierarchy()",
    codeSnippet: "# Ballast Descope Ladder\n# Jalon C1 (Core RAG, Invariants, Citations): Non-negotiable (Protected)\n# Jalon C2 (Dashboards, Advanced Visualizations): Deferrable\n# Jalon C3 (Secondary Audio Themes, Comfort Skins): First ballast shed\nif deadline_pressure_high:\n    jettison_milestone(\"C3_audio_themes\")\n    jettison_milestone(\"C2_visual_dashboards\")\n    enforce_milestone(\"C1_core_rag_and_citations\")",
    codeExplanation: "Executes the automated descope decision tree, protecting Milestone C1 (Core RAG & Verification) while orderly shedding non-essential features.",
    clearMetaphor: {
      intuition: "Jettisoning ballast bags from a hot air balloon: drop the sandbags first, then the luggage, but never touch the burner or the basket.",
      softwareMapping: "Jalons C1, C2, and C3 define an immutable priority ladder: C1 (citations & security) is protected at all costs; C2 and C3 can be deferred.",
      whyItBreaksWithoutIt: "Engineers facing deadline pressure panic 48 hours before delivery and start hacking away at unit tests, authentication, or citation checks.",
    },
    situationDetails: {
      operationalContext: "Strict delivery deadline where unanticipated technical hurdles threaten to consume available development time.",
      disasterScenario: "A team panics before a deadline and disables security checks and citation validations to make the demo appear functional.",
      engineeringMitigation: "The pre-planned descope ladder calmly drops cosmetic visuals (C2) or voiceover themes (C3) while keeping core verification 100% intact.",
    },
    tradeOffInsight: {
      juniorShortcut: "Making chaotic emergency cuts under panic 24 hours before delivery without an agreed prioritization framework.",
      seniorResolution: "A pre-agreed descope ladder removes panic from deadline pressure, preserving system integrity and security above all else.",
    },
    codeInvariants: [
      "Jalon C1 (Core RAG, Citations, Data Security) is strictly non-negotiable",
      "Jalon C2 (Dashboards and Visualizations) can be deferred if time is critical",
      "Jalon C3 (Secondary audio themes and comfort features) is the first ballast shed",
    ],
  },
  '4-1': {
    lessonId: "4-1",
    specNumber: 4,
    sourceFile: "agent/nodes.py & agent/state.py",
    coreFunction: "format_citations_node() & Source",
    codeSnippet: "# agent/state.py: Source card definition\n@dataclass(frozen=True)\nclass Source:\n    file_name: str\n    section_label: str | None = None\n\n# agent/nodes.py: answer node with disclaimer\nreturn Answer(\n    kind=AnswerKind.ANSWER,\n    text=answer_text,\n    sources=tuple(unique_sources),\n    disclaimer=True  # Mandatory legal disclaimer (F-04)\n)",
    codeExplanation: "Formats clickable Source cards directly from retrieved storage chunks and attaches the mandatory legal disclaimer banner (F-04) to the response.",
    clearMetaphor: {
      intuition: "A food quality label (AOC) showing exact farm origin and sanitary warnings: you know exactly where the product came from and its safe usage limits.",
      softwareMapping: "Every factual assertion in Sanad is bound to a clickable evidence card showing the exact bulletin, article number, and PDF page.",
      whyItBreaksWithoutIt: "Users accept unverified AI text as formal legal counsel, leading to catastrophic corporate compliance violations and lawsuits.",
    },
    situationDetails: {
      operationalContext: "Enterprise HR departments using Sanad to calculate legally mandated employee benefits, severance, and probationary rules.",
      disasterScenario: "An HR manager dismisses an employee based on a smooth AI answer that misinterpreted an article, triggering wrongful termination penalties.",
      engineeringMitigation: "Clickable evidence cards allow the human decision-maker to inspect the exact scanned legal page in one click before taking administrative action.",
    },
    tradeOffInsight: {
      juniorShortcut: "Providing plain text conversational responses without verifiable primary source citations.",
      seniorResolution: "Clickable evidence cards and persistent disclaimers establish Sanad as a reliable decision-support assistant rather than an unverified oracle.",
    },
    codeInvariants: [
      "Evidence cards display official bulletin number, article number, and page",
      "Clicking an evidence card opens the official Moroccan legal PDF directly",
      "Persistent legal disclaimer clarifies that Sanad provides decision support, not legal counsel",
    ],
  },
  '4-2': {
    lessonId: "4-2",
    specNumber: 4,
    sourceFile: "agent/nodes.py",
    coreFunction: "REFUSAL_TEXT & refuse_node()",
    codeSnippet: "REFUSAL_TEXT = (\n    \"I could not answer this from the documents in this workspace, and I \"\n    \"will not guess. The searches I ran are listed with this message. You \"\n    \"could rephrase the question, add the document that covers it to this \"\n    \"workspace, or switch to the workspace that holds it.\"\n)\n\nreturn Answer(kind=AnswerKind.REFUSAL, text=REFUSAL_TEXT, sources=(), trace=state['trace'])",
    codeExplanation: "Deterministic refusal node that executes when retrieved document relevance falls below 0.70, outputting an unyielding NOT_COVERED refusal with disclosed search terms.",
    clearMetaphor: {
      intuition: "A passport border control officer: if your entry visa is absent or invalid, no amount of charming conversation will let you cross.",
      softwareMapping: "When a query is out-of-domain or documents lack evidence, Sanad returns an immediate, deterministic refusal with zero speculative text.",
      whyItBreaksWithoutIt: "The model tries to be helpful, guesses an answer to an out-of-domain query, and fabricates nonexistent labor laws that mislead users.",
    },
    situationDetails: {
      operationalContext: "Users and evaluation benchmarks intentionally submitting trick questions, general trivia, or inquiries outside Moroccan labor law.",
      disasterScenario: "An AI chatbot queried about Casablanca weather or corporate tax begins generating speculative answers, failing enterprise rigor standards.",
      engineeringMitigation: "Relevance grading nodes intercept low-similarity queries and route directly to the honest refusal node with a standardized status code.",
    },
    tradeOffInsight: {
      juniorShortcut: "Allowing the language model to extrapolate freely when source context is insufficient to satisfy the user's curiosity.",
      seniorResolution: "Deterministic refusal builds enterprise trust and achieves a 100% score on out-of-domain evaluation benchmarks.",
    },
    codeInvariants: [
      "Queries with document relevance below 0.70 trigger deterministic refusal",
      "Response status code is set explicitly to AnswerKind.REFUSAL with zero hallucination",
      "Release Gate 2 mandates a 100% refusal rate on all out-of-domain test suites",
    ],
  },
  '5-1': {
    lessonId: "5-1",
    specNumber: 5,
    sourceFile: "vector_store.py & db/repo.py",
    coreFunction: "workspace_structural_isolation()",
    codeSnippet: "# vector_store.py: One collection per workspace (F-01)\n_COLLECTION_PREFIX = \"ws_\"\n_COLLECTION_SUFFIX = \"_children\"\ncollection_name = f\"{_COLLECTION_PREFIX}{workspace_id}{_COLLECTION_SUFFIX}\"\n\n# db/repo.py: SQL queries bind workspace_id\nquery = \"SELECT * FROM docs WHERE id = ? AND workspace_id = ?\" ",
    codeExplanation: "Enforces structural multi-tenant isolation by creating a dedicated Qdrant collection (`ws_<workspace_id>_children`) and parameterizing all SQL queries.",
    clearMetaphor: {
      intuition: "Numbered security lockers at a train station: each traveler holds a unique key and can never open or view the contents of another traveler's locker.",
      softwareMapping: "Every document, text chunk, and vector payload carries a mandatory workspace_id; database queries and vector collections isolate tenants physically.",
      whyItBreaksWithoutIt: "A user in Department A modifies an ID parameter in the URL and views confidential executive payroll documents belonging to Department B.",
    },
    situationDetails: {
      operationalContext: "A shared enterprise Sanad instance used concurrently by Human Resources, Finance, and Legal departments.",
      disasterScenario: "A Broken Object-Level Authorization (BOLA) leak exposes upcoming merger and acquisition documents to general staff.",
      engineeringMitigation: "Workspace filtering is enforced at both the SQLite relational query and the Qdrant dedicated collection level, preventing cross-tenant access.",
    },
    tradeOffInsight: {
      juniorShortcut: "Storing all enterprise documents in a shared pool and filtering data in the frontend user interface.",
      seniorResolution: "Enforcing workspace isolation in the database and vector engine eliminates multi-tenant data leaks and BOLA security vulnerabilities.",
    },
    codeInvariants: [
      "100% of SQL queries include an explicit workspace_id parameter filter",
      "Qdrant vector stores create isolated dedicated collections per workspace",
      "Cross-tenant access attempts return silent 404 Not Found responses",
    ],
  },
  '5-2': {
    lessonId: "5-2",
    specNumber: 5,
    sourceFile: "conversion.py",
    coreFunction: "pymupdf4llm_conversion_ladder()",
    codeSnippet: "# conversion.py (ADR-07): Heading-preserving ladder\n# pymupdf4llm for PDF, markitdown for DOCX/PPTX, passthrough for TXT/MD\nmd_text = pymupdf4llm.to_markdown(str(file_path))\n# Outcome classified as CONVERTED, FAILED, or SKIPPED (empty scanned PDF under F-16)\nreturn ConversionOutcome(result=SyncResult.CONVERTED, markdown=md_text, page_count=pages)",
    codeExplanation: "Heading-preserving conversion ladder using `pymupdf4llm` for PDFs and `markitdown` for DOCX/PPTX, maintaining structural markdown headings for chunking.",
    clearMetaphor: {
      intuition: "A digital paleography lab: reading modern clean printed books with high-speed optical scanners, and reserving high-intensity UV lenses for faded scans.",
      softwareMapping: "Sanad inspects character density page-by-page: digital text is extracted in milliseconds, while scanned photocopies trigger targeted OCR.",
      whyItBreaksWithoutIt: "Running heavy OCR across all 400 pages of clean digital text consumes 100% CPU, crashes container memory, and takes 45 minutes.",
    },
    situationDetails: {
      operationalContext: "Ingesting diverse Moroccan legal archives: modern born-digital ministerial PDFs alongside 30-year-old photocopied gazette scans.",
      disasterScenario: "Standard parsers fail on scanned photocopies returning blank documents, leaving entire legal decrees missing from the search index.",
      engineeringMitigation: "Page-by-page character density checks route only image-heavy pages to OCR, achieving maximum speed while capturing all scanned text.",
    },
    tradeOffInsight: {
      juniorShortcut: "Running heavy OCR indiscriminately on every file or giving up completely on scanned documents.",
      seniorResolution: "An adaptive conversion ladder extracts 400 pages in under 12 seconds while ensuring scanned legal archives are fully indexed.",
    },
    codeInvariants: [
      "pymupdf4llm preserves H1-H3 headings essential for section chunking",
      "markitdown converts DOCX and PPTX presentation slides reliably",
      "Scanned PDFs with zero text layers are reported as SKIPPED under F-16",
    ],
  },
  '5-3': {
    lessonId: "5-3",
    specNumber: 5,
    sourceFile: "chat_history.py & agent/state.py",
    coreFunction: "SessionMemory & clarify_node",
    codeSnippet: "# agent/state.py: In-session memory (F-07)\n@dataclass(frozen=True)\nclass SessionMemory:\n    summary: str = \"\"\n    turns: tuple[Turn, ...] = ()\n\n# agent/nodes.py: clarify node asks for missing variables\nif is_ambiguous(state['question']):\n    return {\"clarification\": \"Are you asking about a CDD or CDI contract?\", \"answer_kind\": AnswerKind.CLARIFICATION}",
    codeExplanation: "Maintains compact in-session conversational memory (last 5 turns) and executes clarification prompts when legal parameters are missing.",
    clearMetaphor: {
      intuition: "An experienced senior advisor who remembers what you said two minutes ago, but pauses to ask for details before giving legal advice.",
      softwareMapping: "SQLite tracks the last 5 conversation turns to resolve pronouns, while a clarity node pauses ambiguous questions to ask for missing variables.",
      whyItBreaksWithoutIt: "Dumping 50 turns of raw chat transcripts into the prompt costs a fortune in token fees and confuses the model's attention mechanism.",
    },
    situationDetails: {
      operationalContext: "A legal analyst asking follow-up questions such as 'What about for a manager?' or 'Can I terminate them tomorrow?'",
      disasterScenario: "Searching the vector database for 'What about for a manager?' matches hundreds of unrelated articles across the entire labor code.",
      engineeringMitigation: "The clarity node detects that key parameters (contract type, seniority) are missing and prompts the user for clarification first.",
    },
    tradeOffInsight: {
      juniorShortcut: "Shoveling entire chat transcripts into the prompt or blindly executing vector searches on vague, one-sentence queries.",
      seniorResolution: "Selective 5-turn memory and proactive clarification nodes prevent wasted computation and sharpen legal reasoning.",
    },
    codeInvariants: [
      "Last 5 interaction turns are preserved in SQLite to resolve conversational context",
      "Clarity evaluator detects ambiguous legal queries before vector retrieval",
      "Targeted clarification questions gather missing variables without wasting tokens",
    ],
  },
  '6-1': {
    lessonId: "6-1",
    specNumber: 6,
    sourceFile: "ui/templates/layout.html",
    coreFunction: "3-Column Desktop Ergonomics",
    codeSnippet: "<!-- ui/templates/layout.html: 3-column workstation -->\n<div class=\"grid grid-cols-1 lg:grid-cols-[280px_1fr_420px] h-screen w-screen overflow-hidden\">\n  <aside class=\"workspace-panel border-r border-black/10 overflow-y-auto\">...</aside>\n  <main class=\"chat-stream-panel overflow-y-auto\">...</main>\n  <aside class=\"pdf-citation-panel border-l border-black/10 overflow-y-auto\">...</aside>\n</div>",
    codeExplanation: "Responsive CSS grid layout providing a high-density 3-column workstation on desktop that collapses cleanly to tabbed views on mobile viewports.",
    clearMetaphor: {
      intuition: "The dual-monitor cockpit of a legal analyst: document navigation on the left, active AI analysis in the center, and scanned primary evidence on the right.",
      softwareMapping: "Sanad's UI is optimized for professional dual-monitor workstations (1080p and 4K), enabling side-by-side comparison of AI claims against source PDFs.",
      whyItBreaksWithoutIt: "Mobile-first narrow views compress citation cards, hiding page coordinates and making document verification painful on large desktop screens.",
    },
    situationDetails: {
      operationalContext: "Corporate legal officers spending 6 hours a day reviewing employment contracts, severance disputes, and disciplinary records.",
      disasterScenario: "An interface designed only for smartphones forces desktop analysts into a narrow 400px column, wasting 90% of available screen real estate.",
      engineeringMitigation: "A 3-column desktop layout shows documents, conversation reasoning, and official PDF pages simultaneously with zero tab switching.",
    },
    tradeOffInsight: {
      juniorShortcut: "Designing exclusively for mobile devices and forcing desktop enterprise users into narrow, low-density single-column feeds.",
      seniorResolution: "A desktop-first layout maximizes professional productivity while responsive breakpoints ensure full utility on tablets and mobile devices.",
    },
    codeInvariants: [
      "3-column desktop grid enables simultaneous document browsing, chat, and citation review",
      "Layout dynamically collapses into a tabbed interface on mobile and small viewports",
      "Source PDF viewer highlights cited article excerpts directly on the scanned page",
    ],
  },
  '6-2': {
    lessonId: "6-2",
    specNumber: 6,
    sourceFile: "ui/rtl.py & ui/templates/",
    coreFunction: "No-JS Philosophy & Native Arabic RTL",
    codeSnippet: "# ui/rtl.py: Trilingual RTL direction injection\ndef apply_trilingual_direction(language: str, content: str) -> dict:\n    is_arabic = language == \"ar\" or detect_arabic_script(content)\n    return {\n        \"dir\": \"rtl\" if is_arabic else \"ltr\",\n        \"font_family\": \"Amiri, serif\" if is_arabic else \"SF Pro, sans-serif\",\n        \"text_align\": \"right\" if is_arabic else \"left\"\n    }",
    codeExplanation: "Detects Arabic script in legal content, dynamically injecting `dir='rtl'`, Amiri font styling, and right-aligned typographical spacing.",
    clearMetaphor: {
      intuition: "A fine bilingually bound volume: readers flip left-to-right for French/English, and turn the book over to read right-to-left for Arabic calligraphic script.",
      softwareMapping: "The Moroccan legal corpus is natively bilingue (Arabic and French); Jinja2 renders native RTL direction and Amiri typography without client JS.",
      whyItBreaksWithoutIt: "Client-side SPA apps display Arabic text backwards or with broken ligatures when CSS direction is hacked manually.",
    },
    situationDetails: {
      operationalContext: "Corporate lawyers in Casablanca reading official Arabic decrees alongside French administrative circulars in strict corporate intranet environments.",
      disasterScenario: "Corporate network proxies block client-side JavaScript bundles, turning modern React apps into permanent blank white screens.",
      engineeringMitigation: "Server-rendered Jinja2 templates ensure HTML forms submit and render verified answers even if JavaScript is completely disabled.",
    },
    tradeOffInsight: {
      juniorShortcut: "Building a 15MB client-side single-page app with hacked CSS RTL that breaks when corporate proxies block external scripts.",
      seniorResolution: "Server-side rendering guarantees that critical search and reading functions work reliably under any network or browser conditions.",
    },
    codeInvariants: [
      "Server-rendered Jinja2 templates work 100% without client JavaScript enabled",
      "Native dir='rtl' attribute ensures proper Arabic cursive ligatures and margin alignment",
      "Amiri and SF Pro font stacks provide authentic typographical rendering across all three languages",
    ],
  },
  '6-3': {
    lessonId: "6-3",
    specNumber: 6,
    sourceFile: "ui/templates/chat.html",
    coreFunction: "WCAG 2.1 AA Semantic Markup",
    codeSnippet: "<!-- ui/templates/chat.html: WCAG 2.1 AA Compliance -->\n<div role=\"region\" aria-label=\"Legal Assistant Chat\" aria-live=\"polite\" class=\"chat-container\">\n  <button type=\"button\" aria-label=\"Inspect citation Article 62\" class=\"citation-btn\">\n    Article 62\n  </button>\n</div>",
    codeExplanation: "Implements WCAG 2.1 Level AA semantic markup, providing `aria-live='polite'` regions for AI streaming tokens and visible keyboard focus rings.",
    clearMetaphor: {
      intuition: "Tactile paving and audible announcement beacons in a modern train station, allowing visually impaired travelers to navigate with complete confidence.",
      softwareMapping: "All interactive elements use semantic HTML buttons with visible focus rings, high contrast ratios (>= 4.5:1), and screen-reader announcements.",
      whyItBreaksWithoutIt: "Visually impaired employees or public sector auditors cannot use the application because screen readers encounter silent, unlabelled div tags.",
    },
    situationDetails: {
      operationalContext: "Public sector organizations and enterprise institutions mandating compliance with accessibility directives for all internal software tools.",
      disasterScenario: "An agency delivers an AI platform with unlabelled buttons; visually impaired staff are excluded, and the software fails procurement accessibility audits.",
      engineeringMitigation: "Semantic HTML5 elements, ARIA live regions, and certified contrast ratios ensure universal accessibility and full regulatory compliance.",
    },
    tradeOffInsight: {
      juniorShortcut: "Creating interactive elements with generic `<div>` tags and CSS click handlers without semantic roles or keyboard focus states.",
      seniorResolution: "Building to WCAG 2.1 AA standards ensures that all knowledge workers can access and verify legal intelligence independently.",
    },
    codeInvariants: [
      "ARIA-live polite regions announce streaming AI responses to screen readers in real time",
      "100% of interactive controls are operable via standard keyboard tab navigation",
      "Color contrast ratios exceed 4.5:1 across light and dark user interface themes",
    ],
  },
  '7-1': {
    lessonId: "7-1",
    specNumber: 7,
    sourceFile: "app.py",
    coreFunction: "Four Pillars In-Process Architecture",
    codeSnippet: "# app.py: In-process decoupling (ADR-13)\n# Pillar 1: FastAPI web host & server-rendered Jinja2 templates\n# Pillar 2: SQLite WAL registry for workspace metadata & audit\n# Pillar 3: Embedded Qdrant for 768-D dense vector storage\n# Pillar 4: LangGraph StateGraph compiled in-process\nagent_outcome = await agent_graph.ask(workspace_id, session_id, question)\nreturn templates.TemplateResponse(\"chat.html\", {\"answer\": agent_outcome})",
    codeExplanation: "Coordinates the 4 independent architectural pillars in-process without network latency: FastAPI host, SQLite WAL, embedded Qdrant, and LangGraph StateGraph.",
    clearMetaphor: {
      intuition: "The four load-bearing marble columns of a Roman temple: each column carries a specific structural load and stands on an independent footing.",
      softwareMapping: "FastAPI manages HTTP and hypermedia, SQLite WAL records audit and document states, Qdrant indexes 768-D dense vectors, and LangGraph orchestrates cyclic reasoning.",
      whyItBreaksWithoutIt: "Monolithic spaghetti: database queries, OpenAI SDK calls, and HTML string interpolation all mixed inside route handlers, making upgrades impossible.",
    },
    situationDetails: {
      operationalContext: "An enterprise platform where document ingestion, vector retrieval, audit persistence, and conversational reasoning must scale and evolve independently.",
      disasterScenario: "An engineer upgrading the vector database accidentally breaks session authentication because vector code was directly coupled to route handlers.",
      engineeringMitigation: "Decoupling the 4 pillars behind in-process interfaces allows upgrading Qdrant, swapping LLMs, or tuning schemas without touching other subsystems.",
    },
    tradeOffInsight: {
      juniorShortcut: "Writing a 3,000-line monolithic script where route handlers make raw database calls and invoke OpenAI SDKs in a single tangled file.",
      seniorResolution: "In-process decoupling (ADR-13) provides zero-latency component separation while preserving clean boundaries between storage, routing, and reasoning.",
    },
    codeInvariants: [
      "Pillar 1 (FastAPI) handles REST routing, Pydantic validation, and hypermedia templates",
      "Pillar 2 (SQLite WAL) maintains ACID transactions, audit logs, and parent chunks",
      "Pillar 3 (Embedded Qdrant) executes dense vector similarity search in 768-dimensional space",
      "Pillar 4 (LangGraph) coordinates multi-step reasoning across 9 specialized nodes",
    ],
  },
  '7-2': {
    lessonId: "7-2",
    specNumber: 7,
    sourceFile: "agent/ports.py",
    coreFunction: "AgentPorts (8 Explicit Protocols)",
    codeSnippet: "@dataclass(frozen=True)\nclass AgentPorts:\n    summarize: Summarize      # ST-25: Session memory summary (F-07)\n    clarify: Clarify          # ST-22: \"is this ambiguous?\" -> 1 question (F-06)\n    rewrite: Rewrite          # ST-22: Rewrite and split into 1+ queries\n    retrieve: Retrieve        # ST-23: Hybrid search over vector_store (ADR-05)\n    grade: Grade              # ST-23: Do passages address the question? (F-04)\n    reword: Reword            # ST-23: Retry query formulation (F-04)\n    fetch_parents: FetchParents # ST-24: Full section text from disk (box P)\n    write_answer: WriteAnswer # ST-24: Sourced answer text from sections (F-03)",
    codeExplanation: "Defines the 8 explicit abstract seams connecting the agent graph to models and storage, requiring all 8 ports to be passed with zero implicit defaults.",
    clearMetaphor: {
      intuition: "A modular electrical breaker panel: every circuit plugs into a standardized socket; you can replace a breaker without rewiring the house.",
      softwareMapping: "The reasoning graph interacts exclusively with the 8 callables on AgentPorts; concrete adapters implement Qdrant, SQLite, and Ollama/Gemini.",
      whyItBreaksWithoutIt: "Directly importing third-party SDKs inside reasoning loops: running unit tests requires active internet connections, cloud credentials, and paid API fees.",
    },
    situationDetails: {
      operationalContext: "Continuous integration pipelines where hundreds of agent reasoning tests must execute on every pull request without external API dependencies.",
      disasterScenario: "CI/CD test runs fail due to external cloud API rate limits or network hiccups, blocking production deployment pipelines.",
      engineeringMitigation: "In-memory mock adapters implement the 8 ports, allowing the entire agent reasoning test suite to run in 400 milliseconds offline.",
    },
    tradeOffInsight: {
      juniorShortcut: "Coupling business logic directly to external vendor SDKs and writing stubs that hide missing implementations with plausible defaults.",
      seniorResolution: "The 8 explicit ports allow swapping from Google Gemini to local Ollama (Llama/Mistral) with zero changes to agent graph logic.",
    },
    codeInvariants: [
      "AgentPorts defines 8 mandatory callable seams with zero silent defaults",
      "fetch_parents reads full 4,000-char section text directly from parent_store disk blocks",
      "100% of agent reasoning tests execute offline using in-memory mock adapters in under 400ms",
    ],
  },
  '8-1': {
    lessonId: "8-1",
    specNumber: 8,
    sourceFile: "db/schema.sql & db/repo.py",
    coreFunction: "SQLite WAL Schema & Cascades",
    codeSnippet: "-- db/schema.sql: SQLite registry schema\nPRAGMA journal_mode = WAL;\nPRAGMA foreign_keys = ON;  -- Enforced on every connection in db/repo.py\n\nCREATE TABLE document (\n    id TEXT PRIMARY KEY,\n    workspace_id TEXT NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,\n    file_name TEXT NOT NULL,\n    status TEXT NOT NULL CHECK (status IN ('active', 'failed', 'skipped', 'removed')),\n    UNIQUE (workspace_id, file_name)\n);",
    codeExplanation: "SQLite relational schema enforcing Write-Ahead Logging (WAL) and cascading foreign keys, guaranteed by `PRAGMA foreign_keys = ON` on every connection.",
    clearMetaphor: {
      intuition: "A master bound leather notary ledger: every parcel deed is indexed, and dissolving a master parcel automatically invalidates all sub-deeds.",
      softwareMapping: "SQLite WAL mode allows concurrent readers while background ingestion writes chunks; ON DELETE CASCADE automatically cleans child records.",
      whyItBreaksWithoutIt: "Saving application state in unindexed JSON files or flat database tables without foreign keys leads to orphaned records and corrupted indices.",
    },
    situationDetails: {
      operationalContext: "Thousands of legal documents, text chunks, user sessions, and citation audit logs being read and written concurrently by multiple users.",
      disasterScenario: "Deleting an obsolete document leaves hundreds of orphaned chunk vectors in the database, polluting search results with outdated legal decrees.",
      engineeringMitigation: "Foreign key cascade constraints ensure that deleting a document record automatically purges all related chunks, citations, and jobs.",
    },
    tradeOffInsight: {
      juniorShortcut: "Managing state with raw JSON files on disk or tables without relational foreign key constraints.",
      seniorResolution: "SQLite WAL mode with cascading deletions provides enterprise-grade ACID persistence on a lightweight local file without database server bloat.",
    },
    codeInvariants: [
      "PRAGMA journal_mode = WAL enables high-concurrency non-blocking reads and writes",
      "PRAGMA foreign_keys = ON is enforced on every connection in db/repo.py",
      "ON DELETE CASCADE guarantees that deleting a workspace or document purges all child records",
    ],
  },
  '8-2': {
    lessonId: "8-2",
    specNumber: 8,
    sourceFile: "vector_store.py & parent_store.py",
    coreFunction: "Qdrant Topology & Parent Store",
    codeSnippet: "# vector_store.py: One collection per workspace (ADR-04)\n# Points carry 768-D dense E5 vector + sparse BM25 vector\ncollection_name = f\"ws_{workspace_id}_children\"\n# Payload stores parent_id, source_file, section_label, chunk_text\n\n# parent_store.py (ADR-08): Full sections stored as JSON on disk\nparent_path = f\"{parent_store_path}/{workspace_id}/{parent_id}.json\"\n# Search the small thing (500c), read the big thing (4,000c)",
    codeExplanation: "Implements Qdrant embedded vector topology with dedicated collections per workspace (`ws_<ws_id>_children`), paired with disk-based parent section storage.",
    clearMetaphor: {
      intuition: "A library microfiche card index: you consult a compact 3-line index card to pinpoint the shelf, then pull the master 500-page leather volume.",
      softwareMapping: "Qdrant indexes compact 500-character child snippets for sharp vector search, while the payload links to the 4,000-character parent in parent_store.",
      whyItBreaksWithoutIt: "Vector dilution: embedding large 2,000-character chunks makes the vector fuzzy and causes retrieval to miss specific article numbers.",
    },
    situationDetails: {
      operationalContext: "Performing precise semantic searches across dense legal codes while providing the language model with complete paragraph context.",
      disasterScenario: "Using small chunks gives sharp search but feeds truncated, half-finished sentences to the LLM, leading to misinterpreted legal requirements.",
      engineeringMitigation: "Parent-child topology decouples search units from context units: Qdrant searches 500-char children, and Python loads 4,000-char parents from disk.",
    },
    tradeOffInsight: {
      juniorShortcut: "Choosing an arbitrary single chunk size (like 1,000 characters) that compromises both search precision and reading context.",
      seniorResolution: "Parent-child indexing achieves maximum vector search precision without sacrificing the comprehensive narrative context required for reasoning.",
    },
    codeInvariants: [
      "Dedicated Qdrant collection (ws_<workspace_id>_children) per workspace enforces structural isolation",
      "Points carry 768-D dense multilingual-e5-base vector and fastembed sparse BM25 vector",
      "parent_store.py persists full section text on disk as JSON, keeping SQLite lightweight and fast",
    ],
  },
  '8-3': {
    lessonId: "8-3",
    specNumber: 8,
    sourceFile: "tests/integration/contract.py",
    coreFunction: "OpenAPI 3.1 Drift Verification",
    codeSnippet: "# tests/integration/contract.py: ContractClient validation\ndef validate_response_against_contract(response: Response, spec_path: Path):\n    # Validates status code, required properties, and forbids undocumented fields\n    assert response.status_code in documented_statuses\n    for prop in schema_properties:\n        assert prop in response.json()\n    assert not undocumented_properties_present",
    codeExplanation: "Validates every HTTP response from the FastAPI app against docs/phase2/openapi.yaml, checking status codes, required fields, and forbidding drift.",
    clearMetaphor: {
      intuition: "A hardened steel precision go/no-go machining gauge: every manufactured part must slide through the gauge with sub-millimeter precision.",
      softwareMapping: "Pydantic models define the contractual API interface; the automated contract validator verifies that backend changes never break frontend clients.",
      whyItBreaksWithoutIt: "A backend developer renames an API response field (citation_id to id), causing the frontend web interface to crash silently in production.",
    },
    situationDetails: {
      operationalContext: "Collaborative development where backend services and frontend user interfaces are developed concurrently across sprints.",
      disasterScenario: "An unannounced API field rename ships to staging, breaking the search interface during a critical user demonstration.",
      engineeringMitigation: "The contract test suite verifies that every response matches docs/phase2/openapi.yaml, failing CI on any undocumented schema change.",
    },
    tradeOffInsight: {
      juniorShortcut: "Writing API documentation manually in external wiki pages that quickly become outdated and disconnected from code.",
      seniorResolution: "Automated OpenAPI drift verification guarantees seamless integration and eliminates breaking API regressions between teams.",
    },
    codeInvariants: [
      "OpenAPI 3.1 contract in docs/phase2/openapi.yaml is the write-locked contract of record",
      "ContractClient validates response status codes and asserts zero undocumented properties",
      "Any schema drift between FastAPI routes and openapi.yaml fails the CI test suite immediately",
    ],
  },
  '9-1': {
    lessonId: "9-1",
    specNumber: 9,
    sourceFile: "recovery.py",
    coreFunction: "recover_abandoned_runs()",
    codeSnippet: "# recovery.py: Startup crash recovery\nABANDONED_ERROR = \"The previous Sanad process stopped before this run finished.\"\n\ndef recover_abandoned_runs(conn, *, qdrant_storage_path, finished_at):\n    if _index_is_open_elsewhere(qdrant_storage_path):\n        return  # Evaluator process is currently running\n    finish_abandoned_sync_runs(conn, finished_at=finished_at)\n    finish_abandoned_evaluation_runs(conn, finished_at=finished_at)",
    codeExplanation: "Startup recovery hook that sweeps SQLite for runs left open when the previous process stopped, marking them finished and releasing resources.",
    clearMetaphor: {
      intuition: "A resumable BitTorrent download: if your network cuts out mid-transfer, the client resumes at the exact byte block without starting over.",
      softwareMapping: "On FastAPI startup, recovery.py checks if Qdrant is open elsewhere, marks abandoned sync and evaluation runs finished, and frees locks.",
      whyItBreaksWithoutIt: "A server reboots mid-ingestion; documents remain stuck in 'PROCESSING' forever, and users stare at permanent loading spinners.",
    },
    situationDetails: {
      operationalContext: "Cloud containers being restarted for maintenance or rolling updates during the ingestion of heavy multi-hundred-page legal volumes.",
      disasterScenario: "A 500-page document remains permanently locked in processing state, preventing subsequent updates and confusing administrative users.",
      engineeringMitigation: "The automated startup recovery hook detects dangling operations, marks abandoned runs with plain-language errors, and restores state.",
    },
    tradeOffInsight: {
      juniorShortcut: "Ignoring previous job states on startup and requiring manual database surgery to unblock frozen documents.",
      seniorResolution: "Automated crash recovery hooks ensure that the system recovers from infrastructure restarts without human intervention.",
    },
    codeInvariants: [
      "Startup hook automatically scans for sync and evaluation runs abandoned by process termination",
      "_index_is_open_elsewhere checks StoreAlreadyOpenError to distinguish crashes from active evaluators",
      "Abandoned runs are marked finished with plain-language diagnostic messages in SQLite",
    ],
  },
  '9-2': {
    lessonId: "9-2",
    specNumber: 9,
    sourceFile: "embeddings.py",
    coreFunction: "Single-Flight Loading & Lock Protection",
    codeSnippet: "# embeddings.py: Thread-locked singleton model loader\n_dense_lock = threading.Lock()\n_dense_model: SentenceTransformer | None = None\n\ndef _load_dense_model() -> SentenceTransformer:\n    global _dense_model\n    if _dense_model is None:\n        with _dense_lock:\n            if _dense_model is None:\n                _dense_model = SentenceTransformer(get_settings().dense_model_name)\n    return _dense_model",
    codeExplanation: "Double-checked locking pattern with `threading.Lock()` ensuring the 500MB `multilingual-e5-base` model is instantiated exactly once in memory.",
    clearMetaphor: {
      intuition: "The bouncer at a freight elevator: ten movers arrive with heavy crates at once; the bouncer holds the door and sends up one balanced load.",
      softwareMapping: "The embedding model is loaded once as a process singleton; concurrent threads await the shared instance under a threading lock.",
      whyItBreaksWithoutIt: "Loading a new 500MB PyTorch model on every request: 3 concurrent requests consume 1.5GB of RAM, triggering Linux kernel SIGKILL OOM termination.",
    },
    situationDetails: {
      operationalContext: "Multiple users uploading and searching legal documents simultaneously on cloud servers with strict 1GB RAM memory ceilings.",
      disasterScenario: "Three users upload documents at the same second; RAM usage spikes over container limits, and the Linux kernel kills the application process.",
      engineeringMitigation: "The thread-locked singleton ensures that the model is loaded once, keeping total application memory comfortably below 600MB.",
    },
    tradeOffInsight: {
      juniorShortcut: "Instantiating machine learning models inside request handlers without concurrency locking.",
      seniorResolution: "Single-flight loading protects memory ceilings and ensures rock-solid stability under concurrent enterprise traffic.",
    },
    codeInvariants: [
      "multilingual-e5-base model is loaded once under double-checked threading.Lock()",
      "FastEmbed BM25 sparse encoder is similarly managed as a singleton in embeddings.py",
      "Process memory footprint is strictly bounded, preventing Linux cgroups SIGKILL OOM crashes",
    ],
  },
  '10-1': {
    lessonId: "10-1",
    specNumber: 10,
    sourceFile: "change_detection.py",
    coreFunction: "detect_changes() & SHA-256",
    codeSnippet: "# change_detection.py (ST-12): 4-State Differential Hash Engine\n# Computes content hash of document bytes: sha256:length:digest\nif recorded_hash is None:\n    return SyncDecision.NEW\nelif current_hash == recorded_hash:\n    return SyncDecision.UNCHANGED  # 1ms instant bypass\nelse:\n    return SyncDecision.CHANGED",
    codeExplanation: "Evaluates file content SHA-256 fingerprints against recorded database states, bypassing unchanged files in 1 millisecond.",
    clearMetaphor: {
      intuition: "A biometric fingerprint scanner at a border checkpoint: your face and fingerprints are matched in 1 millisecond; only new visitors fill out paperwork.",
      softwareMapping: "Calculates SHA-256 hashes of incoming files: UNCHANGED files skip processing immediately, MODIFIED files purge old chunks, and ORPHANS are deleted.",
      whyItBreaksWithoutIt: "Re-indexing an entire 1,000-document repository on every sync: takes 2 hours of heavy computation and wastes thousands in unnecessary API costs.",
    },
    situationDetails: {
      operationalContext: "Synchronizing corporate document folders where hundreds of files are scanned daily, but only two or three have actually been modified.",
      disasterScenario: "Daily synchronization runs for hours, saturating server CPU and blocking legal analysts from querying the vector database.",
      engineeringMitigation: "Differential hash checking skips unchanged documents in milliseconds, reducing synchronization time from hours to under 3 seconds.",
    },
    tradeOffInsight: {
      juniorShortcut: "Wiping the database and re-computing embeddings for the entire repository on every scheduled sync.",
      seniorResolution: "Differential content hashing eliminates redundant vector computations and accelerates document synchronization by over 99%.",
    },
    codeInvariants: [
      "SHA-256 content hashes identify identical files in under 1 millisecond",
      "4-state machine transitions cleanly between NEW, UNCHANGED, MODIFIED, and ORPHAN",
      "Only modified or new documents trigger text extraction and embedding generation",
    ],
  },
  '10-2': {
    lessonId: "10-2",
    specNumber: 10,
    sourceFile: "conversion.py",
    coreFunction: "pymupdf4llm.to_markdown()",
    codeSnippet: "# conversion.py (ADR-07): Heading-preserving conversion\n# pymupdf4llm converts PDF directly into structural Markdown\n# Preserves H1-H3 headers and table grids for chunking\nmd_text = pymupdf4llm.to_markdown(str(file_path))\nreturn ConversionOutcome(result=SyncResult.CONVERTED, markdown=md_text)",
    codeExplanation: "Extracts structured tables and heading hierarchies from legal PDF pages into clean Markdown formatting, preserving rows, columns, and compensation formulas.",
    clearMetaphor: {
      intuition: "An aerial fire rescue ladder: firefighters extend the light ladder first, but deploy the heavy hydraulic motorized platform when complex obstacles appear.",
      softwareMapping: "Analyzes physical page structures: extracts tables into structured Markdown grids so the language model understands compensation matrices.",
      whyItBreaksWithoutIt: "Naive text stripping collapses legal tables into an unreadable string of numbers, scrambling seniority tiers with severance multipliers.",
    },
    situationDetails: {
      operationalContext: "Moroccan Labor Code decrees containing intricate compensation tables based on years of service, notice periods, and hazard categories.",
      disasterScenario: "An HR director asks for severance calculations; the AI misreads a flattened table and computes compensation based on the wrong seniority tier.",
      engineeringMitigation: "Structured table extraction preserves rows and column headers, enabling the LLM to execute accurate calculations from Markdown tables.",
    },
    tradeOffInsight: {
      juniorShortcut: "Flattening PDF text with basic regular expressions and stripping all table spacing and formatting.",
      seniorResolution: "Structured table parsing retains the semantic relationships of complex legal compensation matrices.",
    },
    codeInvariants: [
      "pymupdf4llm converts PDF directly to Markdown preserving H1-H3 headings",
      "Table rows and column headers are explicitly retained for language model reasoning",
      "Article numbers and legal headings remain linked to their tabular compensation schedules",
    ],
  },
  '10-3': {
    lessonId: "10-3",
    specNumber: 10,
    sourceFile: "embeddings.py & agent/retrieval.py",
    coreFunction: "Mandatory E5 Prefixes",
    codeSnippet: "# embeddings.py (ADR-05): Mandatory E5 model prefixes\n# Every indexed chunk MUST be embedded with 'passage: '\n# Every search query MUST be embedded with 'query: '\ndef _prefix_passage(text: str) -> str:\n    return f\"passage: {text}\"\n\ndef _prefix_query(text: str) -> str:\n    return f\"query: {text}\" ",
    codeExplanation: "Enforces mandatory 'passage: ' and 'query: ' prefixes on all inputs to multilingual-e5-base, generating normalized L2 vectors for fast dot products.",
    clearMetaphor: {
      intuition: "Military radio protocol with mandatory callsigns: transmissions must begin with 'Alpha to Command' or the message is rejected by protocol.",
      softwareMapping: "The multilingual-e5-base model was trained with asymmetric prefixes: passages and queries must be prefixed to align in the latent vector space.",
      whyItBreaksWithoutIt: "Omitting required model prefixes causes a 25% drop in retrieval accuracy (Recall@5) and causes the system to fail on Arabic-to-French cross-lingual queries.",
    },
    situationDetails: {
      operationalContext: "Multilingual search where Moroccan users query in Arabic or French and expect relevant legal decree matches regardless of language.",
      disasterScenario: "A legal analyst queries an article in Arabic; because prefixes were omitted, the vector space fails to align and returns completely unrelated text.",
      engineeringMitigation: "Enforcing required prefixes at the code level guarantees optimal projection into the 768-dimensional latent space, maximizing cross-lingual recall.",
    },
    tradeOffInsight: {
      juniorShortcut: "Encoding raw strings directly without model-mandated prefixing conventions.",
      seniorResolution: "Adhering to asymmetric model contracts increases retrieval recall by 25% without requiring larger, more expensive models.",
    },
    codeInvariants: [
      "All document chunks are automatically prefixed with 'passage: ' before encoding",
      "All search questions are automatically prefixed with 'query: ' before retrieval",
      "Vectors are normalized to unit length L2, enabling sub-millisecond dot product cosine search",
    ],
  },
  '11-1': {
    lessonId: "11-1",
    specNumber: 11,
    sourceFile: "agent/graph.py",
    coreFunction: "9-Node LangGraph StateGraph",
    codeSnippet: "# agent/graph.py (ADR-03): 9-Node Cyclic State Machine\nbuilder = StateGraph(AgentState)\nbuilder.add_node(\"summarize\", summarize_node)\nbuilder.add_node(\"clarify\", clarify_node)\nbuilder.add_node(\"rewrite\", rewrite_node)\nbuilder.add_node(\"retrieve\", retrieve_node)\nbuilder.add_node(\"grade\", grade_node)\nbuilder.add_node(\"fetch_parents\", fetch_parents_node)\nbuilder.add_node(\"reword\", reword_node)\nbuilder.add_node(\"answer\", answer_node)\nbuilder.add_node(\"refuse\", refuse_node)",
    codeExplanation: "Constructs the formal 9-node LangGraph StateGraph, establishing inspectable state transitions and conditional error recovery edges.",
    clearMetaphor: {
      intuition: "The escapement and gear train of a fine Swiss mechanical clock: every tooth advances the next wheel with surgical precision, with automatic escapement resets.",
      softwareMapping: "Reasoning is divided into 9 pure, specialized node functions that receive a typed state and return explicit, inspectable updates.",
      whyItBreaksWithoutIt: "Linear chains fail permanently when initial retrieval is noisy, forcing the LLM to summarize irrelevant context and hallucinate facts.",
    },
    situationDetails: {
      operationalContext: "Complex multi-clause legal questions requiring disambiguation, multi-hop retrieval, relevance verification, and evidence synthesis.",
      disasterScenario: "An initial search on a colloquial query returns irrelevant corporate decrees; the agent cannot backtrack, generating an inaccurate summary.",
      engineeringMitigation: "Conditional graph edges evaluate document relevance; if fewer than 2 chunks pass, the agent cycles to reword the query and re-execute retrieval.",
    },
    tradeOffInsight: {
      juniorShortcut: "Building a naive linear LangChain chain without conditional loops or quality checkpoints.",
      seniorResolution: "A 9-node cyclic state machine recovers from imperfect initial retrievals and turns multi-step legal reasoning into deterministic engineering.",
    },
    codeInvariants: [
      "9 specialized nodes govern query clarity, retrieval, grading, reformulation, and generation",
      "Conditional routing rewinds and rewrites queries up to 3 times before failing",
      "Deterministic exit routes to honest refusal whenever evidence remains insufficient",
    ],
  },
  '11-2': {
    lessonId: "11-2",
    specNumber: 11,
    sourceFile: "vector_store.py & agent/retrieval.py",
    coreFunction: "Hybrid Search & RRF (k=60)",
    codeSnippet: "# vector_store.py (ADR-05): Dense + Sparse Reciprocal Rank Fusion\n# Dense: multilingual-e5-base in 768-D space\n# Sparse: FastEmbed BM25 lexical token matching\ndef rrf_score(dense_rank: int, sparse_rank: int, k: int = 60) -> float:\n    return (1.0 / (k + dense_rank)) + (1.0 / (k + sparse_rank))",
    codeExplanation: "Executes Reciprocal Rank Fusion (RRF) with constant k=60, mathematically combining BM25 keyword rankings and dense vector rankings.",
    clearMetaphor: {
      intuition: "Two detective partners with complementary skillsets: one checks license plate numbers in state records; the other analyzes psychological motives.",
      softwareMapping: "SQLite FTS5 BM25 matches exact article numbers and legal keywords; Qdrant matches conceptual meaning; RRF fuses their rankings without scale bias.",
      whyItBreaksWithoutIt: "Pure vector search misses specific article numbers (e.g. 'Article 62'); pure keyword search fails on synonyms and colloquial phrasing.",
    },
    situationDetails: {
      operationalContext: "A jurist searches for 'Article 62 termination notice period' or an HR manager queries 'compensation when dismissed without cause'.",
      disasterScenario: "Vector search returns general severance commentary but misses Article 62; BM25 keyword search misses 'dismissal' when the law says 'severance'.",
      engineeringMitigation: "RRF fusion ensures documents containing both the exact article number and the semantic concept float directly to the top of the search ranking.",
    },
    tradeOffInsight: {
      juniorShortcut: "Relying exclusively on dense vector search for all query types without lexical keyword assistance.",
      seniorResolution: "Reciprocal Rank Fusion combines the precision of keyword search with the conceptual intelligence of semantic vector embeddings.",
    },
    codeInvariants: [
      "FastEmbed BM25 provides fast lexical keyword and article number matching",
      "Qdrant dense vector search captures semantic synonyms and multilingual intent",
      "RRF algorithm with constant k=60 merges rankings without arbitrary score threshold tuning",
    ],
  },
  '11-3': {
    lessonId: "11-3",
    specNumber: 11,
    sourceFile: "agent/grading.py",
    coreFunction: "Binary Relevance Grader & Loop Ceiling",
    codeSnippet: "# agent/grading.py (F-04 / ST-23): Binary relevance grading\ndef grade_passage_relevance(question: str, hit: SearchHit) -> bool:\n    verdict = llm.invoke(format_grade_prompt(question, hit.chunk_text))\n    # Strict rule: Unparseable verdict explicitly RAISES (cannot masquerade as off-topic)\n    return \"relevant\" in verdict.lower()\n# If relevant count is zero, increment retry attempt (capped at 3)",
    codeExplanation: "Binary relevance evaluator that filters retrieved chunks, incrementing the loop guardrail and discarding noise before the synthesis prompt.",
    clearMetaphor: {
      intuition: "A head librarian's assistant: skimming retrieved volumes to verify they discuss the exact ministerial decree before handing them to the researcher.",
      softwareMapping: "A fast evaluator classifies each chunk as RELEVANT or IRRELEVANT; if fewer than 2 pass, the agent cycles to reword the query.",
      whyItBreaksWithoutIt: "Dumping the top 10 raw search results directly into the generation prompt: irrelevant paragraphs distract the LLM and cause confabulation.",
    },
    situationDetails: {
      operationalContext: "Legal queries where retrieved passages contain overlapping administrative circulars that do not apply to the specific employee category.",
      disasterScenario: "An irrelevant decree about maritime labor is fed into a commercial employment query, causing the model to generate conflicting severance rules.",
      engineeringMitigation: "The grading node filters out the irrelevant maritime decree; only verified commercial labor chunks reach the answer generation prompt.",
    },
    tradeOffInsight: {
      juniorShortcut: "Feeding all search results into the final prompt without filtering or validation.",
      seniorResolution: "Filtering chunks with a binary relevance grader eliminates noise and protects answer synthesis from distraction.",
    },
    codeInvariants: [
      "Every retrieved chunk is explicitly classified as RELEVANT or IRRELEVANT before generation",
      "Loop counter is incremented on every cycle to strictly enforce the 3-loop ceiling",
      "Only verified high-signal excerpts are passed to the final answer synthesis node",
    ],
  },
  '12-1': {
    lessonId: "12-1",
    specNumber: 12,
    sourceFile: "data/measurements/ & scripts/run_evaluation.py",
    coreFunction: "60-Question Frozen Benchmark",
    codeSnippet: "# data/measurements/golden_set.json: 60 Curated Scenarios\n# Handcrafted by Moroccan legal and QA experts (ST-31)\n# 40 Single-article lookups + 10 Multi-article edge cases + 10 Out-of-domain traps\ndef run_benchmark_suite(agent_graph) -> EvaluationMetrics:\n    results = [evaluate_question(agent_graph, q) for q in golden_set]\n    return calculate_aggregate_ragas(results)",
    codeExplanation: "Automated CLI exam proctor that executes the 60-question frozen golden benchmark and computes mathematical RAGAS quality metrics.",
    clearMetaphor: {
      intuition: "A standardized national bar examination held in a locked testing hall: every candidate receives the exact same questions under identical timing.",
      softwareMapping: "The 60-question benchmark covers simple lookups, multi-article edge cases, and 10 out-of-domain traps, evaluating Faithfulness and Context Recall.",
      whyItBreaksWithoutIt: "Subjective testing: developers ask 2 casual questions in chat, say 'it feels better', and deploy regressions that hallucinate in production.",
    },
    situationDetails: {
      operationalContext: "Making prompt refinements, chunking adjustments, or model upgrades across development sprints.",
      disasterScenario: "A developer tweaks a prompt to answer one specific edge case better, silently degrading accuracy across 20 standard labor law questions.",
      engineeringMitigation: "The automated test runner executes the 60-question benchmark in CI, alerting the team immediately if average faithfulness drops by even 1%.",
    },
    tradeOffInsight: {
      juniorShortcut: "Relying on manual spot-checks and developer intuition to judge language model behavior.",
      seniorResolution: "Automated benchmarking transforms prompt engineering from subjective guesswork into rigorous, measurable software science.",
    },
    codeInvariants: [
      "60-question frozen golden dataset covers Moroccan labor code, edge cases, and trick traps",
      "RAGAS evaluation measures Faithfulness, Context Recall, and Answer Relevance mathematically",
      "Automated reports generate timestamped JSON metrics for continuous regression tracking",
    ],
  },
  '12-2': {
    lessonId: "12-2",
    specNumber: 12,
    sourceFile: "tests/unit/test_release_gate.py",
    coreFunction: "Three Release Gates (G1, G2, G3)",
    codeSnippet: "# tests/unit/test_release_gate.py (ST-32): The 3 Non-Negotiable Gates\n# Gate 1: Faithfulness >= 0.90 (Grounded in context)\n# Gate 2: 100% Out-of-Domain Refusal (Zero hallucinated recipes or weather)\n# Gate 3: Zero Citation Errors (Every cited page/article physically exists)\nif faithfulness < 0.90 or refusal_rate < 1.0 or citation_errors > 0:\n    raise ReleaseGateFailure(\"Gate threshold breached\")",
    codeExplanation: "Enforces the 3 Non-Negotiable Release Gates, exiting with a nonzero error code and blocking CI/CD deployment if any quality threshold is breached.",
    clearMetaphor: {
      intuition: "A triple-sealed biosafety airlock decontamination chamber: doors remain physically locked until pressure, air filtration, and chemical scans pass 100%.",
      softwareMapping: "Gate 1 requires Faithfulness >= 90%; Gate 2 requires 100% refusal on out-of-domain traps; Gate 3 requires zero invalid citation references.",
      whyItBreaksWithoutIt: "Shipping a broken build to meet an arbitrary calendar deadline, deploying an AI that hallucinates legal advice to enterprise clients.",
    },
    situationDetails: {
      operationalContext: "Preparing release candidates for enterprise staging and academic thesis jury demonstration.",
      disasterScenario: "A release candidate with a degraded 82% faithfulness score is deployed; the AI provides inaccurate legal calculations to users.",
      engineeringMitigation: "The automated release gate script fails the build, terminating the deployment pipeline before unverified code can reach staging or production.",
    },
    tradeOffInsight: {
      juniorShortcut: "Deploying builds based on calendar deadlines regardless of automated test and benchmark results.",
      seniorResolution: "Automated release gates remove emotional compromise and guarantee that only mathematically certified software reaches production.",
    },
    codeInvariants: [
      "Gate 1 mandates an average RAGAS Faithfulness score of at least 0.90 across all tests",
      "Gate 2 mandates a 100% honest refusal rate on all out-of-domain challenge questions",
      "Gate 3 mandates 100% citation accuracy, verifying that all cited articles physically exist on disk",
    ],
  },
  '12-3': {
    lessonId: "12-3",
    specNumber: 12,
    sourceFile: "agent/prompts.py",
    coreFunction: "Locked Prompt Catalog (SemVer)",
    codeSnippet: "# agent/prompts.py: Locked SemVer prompt catalog (ST-33)\n# Every prompt is versioned and immutable\nANSWER_WRITER_V1_0 = \"Write the answer using ONLY the sections provided below...\"\nGRADER_PROMPT_V1_0 = \"Grade whether the passage answers the user question...\"\nPROMPTS = {\"answer_writer@1.0.0\": ANSWER_WRITER_V1_0}",
    codeExplanation: "Centralized prompt catalog managing prompt templates under strict Semantic Versioning (SemVer), forbidding scattered raw strings in code.",
    clearMetaphor: {
      intuition: "The official national pharmacopœia drug formulation register: medicine recipes are recorded with exact version numbers and cannot be altered in secret.",
      softwareMapping: "All system prompts are versioned Pydantic templates; responses record the generating prompt version in SQLite audit logs for complete auditability.",
      whyItBreaksWithoutIt: "Prompts are hardcoded as raw multi-paragraph strings across twenty Python files; changing an adjective breaks citations with zero git traceability.",
    },
    situationDetails: {
      operationalContext: "Iterating on legal reasoning prompts across multiple development sprints while maintaining auditability for academic evaluation.",
      disasterScenario: "An engineer changes a system prompt directly inside a node function; reasoning behavior changes unexpectedly and the team cannot revert cleanly.",
      engineeringMitigation: "The centralized prompt registry requires formal version tags (e.g. v1.2.0); audit logs record the exact version used for every generated answer.",
    },
    tradeOffInsight: {
      juniorShortcut: "Scattering raw, untracked prompt strings directly inside business logic functions.",
      seniorResolution: "Versioned prompt registries ensure complete reproducibility, auditable behavior tracking, and safe comparative A/B testing.",
    },
    codeInvariants: [
      "100% of agent prompts are centralized and versioned in src/agent/prompts.py",
      "Semantic version tags (v1.0.0, v1.1.0) track every prompt modification",
      "Every generated answer records its source prompt version in the SQLite audit log",
    ],
  },
  '13-1': {
    lessonId: "13-1",
    specNumber: 13,
    sourceFile: "compose.keycloak.yaml & ui/auth.py",
    coreFunction: "new_session_token() & Cookie Hardening",
    codeSnippet: "# ui/auth.py (ST-54): Cookie token is never what the database stores\ntoken, stored_hash = auth.new_session_token()\nassert stored_hash == hashlib.sha256(token.encode()).hexdigest()\n# Set cookie: HttpOnly, Secure, SameSite=Strict\nresponse.set_cookie(key=\"sanad_session\", value=token, httponly=True, secure=True, samesite=\"strict\")",
    codeExplanation: "Issues HttpOnly, Secure, SameSite=Strict session cookies, storing only a SHA-256 hex digest in SQLite so raw session tokens can never be leaked from the database.",
    clearMetaphor: {
      intuition: "A royal castle drawbridge with a wax-sealed medallion: visitors present credentials at the moat; once approved, they carry an encrypted medallion that guards can verify without opening the royal treasury.",
      softwareMapping: "Keycloak 26.4 federates OpenID Connect identity; session tokens are hardened into HttpOnly cookies inaccessible to browser JavaScript, with hashes stored in SQLite.",
      whyItBreaksWithoutIt: "Saving JWT tokens in browser localStorage: any cross-site scripting (XSS) vulnerability or rogue npm package can steal all active sessions.",
    },
    situationDetails: {
      operationalContext: "Deploying an enterprise legal intelligence tool handling confidential compensation, disciplinary, and severance records.",
      disasterScenario: "A malicious browser extension or XSS flaw reads localStorage, exfiltrating authentication tokens and compromising all client data.",
      engineeringMitigation: "HttpOnly cookies prevent client JavaScript from reading session tokens; SHA-256 database hashing ensures stolen database backups cannot impersonate sessions.",
    },
    tradeOffInsight: {
      juniorShortcut: "Storing authentication tokens in browser localStorage or unencrypted client-accessible cookies.",
      seniorResolution: "HttpOnly encrypted session cookies eliminate XSS token theft vectors while Keycloak provides battle-tested identity management.",
    },
    codeInvariants: [
      "Keycloak OIDC federates authentication with enterprise single sign-on standards",
      "Session cookies enforce HttpOnly, Secure, and SameSite=Strict security flags",
      "The database stores only a SHA-256 hex digest; the raw cookie token is never stored in plaintext",
    ],
  },
  '13-2': {
    lessonId: "13-2",
    specNumber: 13,
    sourceFile: "ui/auth.py & app.py",
    coreFunction: "Principal.may_see_workspace() & Quarantine",
    codeSnippet: "# ui/auth.py: Principal workspace permission matrix\nclass Principal:\n    def may_see_workspace(self, owner_user_id: str | None) -> bool:\n        if self.unrestricted: return True\n        return owner_user_id is None or owner_user_id == self.id\n\n    def may_manage_workspace(self, owner_user_id: str | None) -> bool:\n        if self.unrestricted: return True\n        return owner_user_id == self.id  # Shared is read-only",
    codeExplanation: "Enforces multi-tenant ownership boundaries: a user may see only their own and shared workspaces, while unvetted accounts enter quarantine by default.",
    clearMetaphor: {
      intuition: "An airport security checkpoint holding area: arriving visitors wait in a secure room until their identity documents are verified by border officers.",
      softwareMapping: "Four enterprise roles: Admin, Analyst, Jurist, and Reader. Self-registered users are quarantined with zero data access until approved.",
      whyItBreaksWithoutIt: "An employee signs up on the enterprise portal and immediately gains default read access to executive compensation contracts.",
    },
    situationDetails: {
      operationalContext: "Piloting Sanad within enterprise organizations where users self-register during initial onboarding phases.",
      disasterScenario: "An unapproved user registers an account and browses sensitive pending litigation documents on their very first login.",
      engineeringMitigation: "The quarantine-by-default rule restricts new accounts to a waiting room; an administrator must explicitly grant access to a workspace.",
    },
    tradeOffInsight: {
      juniorShortcut: "Granting newly registered accounts default read access across corporate document collections.",
      seniorResolution: "The Principle of Least Privilege and self-registration quarantine prevent unauthorized internal access to confidential archives.",
    },
    codeInvariants: [
      "4-tier RBAC matrix defines explicit capabilities for Admin, Analyst, Jurist, and Reader",
      "Self-registered accounts automatically enter PENDING_APPROVAL quarantine status",
      "Principal.may_see_workspace() blocks unauthorized cross-tenant workspace visibility",
    ],
  },
  '14-1': {
    lessonId: "14-1",
    specNumber: 14,
    sourceFile: "db/repo.py",
    coreFunction: "Silent 404 BOLA Defense",
    codeSnippet: "# db/repo.py: Broken Object-Level Authorization (BOLA) defense\n# Query strictly checks workspace_id. If missing, raises 404 Not Found\n# Never 403 Forbidden: 403 leaks whether the object ID exists to attackers\ndoc = conn.execute(\"SELECT * FROM document WHERE id = ? AND workspace_id = ?\", (doc_id, ws_id)).fetchone()\nif doc is None:\n    raise HTTPException(status_code=404, detail=\"Document not found\")",
    codeExplanation: "Prevents Broken Object-Level Authorization (BOLA) by binding queries to workspace_id and returning an undifferentiated 404 Not Found.",
    clearMetaphor: {
      intuition: "An unlabeled armored bank vault corridor: if someone tries a false key, the guard does not say 'this belongs to someone else'; he says 'this door does not exist'.",
      softwareMapping: "Queries enforce workspace boundaries at the SQL level; accessing an object from another workspace returns 404 Not Found rather than 403 Forbidden.",
      whyItBreaksWithoutIt: "Returning 403 Forbidden confirms to an attacker that document ID 43 exists in another account, enabling systematic ID enumeration attacks.",
    },
    situationDetails: {
      operationalContext: "Multi-tenant corporate environments where users manipulate numerical or UUID identifiers in browser URL address bars.",
      disasterScenario: "An attacker changes /doc/42 to /doc/43; a 403 Forbidden response confirms the resource exists, encouraging targeted exploitation.",
      engineeringMitigation: "Returning a silent 404 Not Found denies the existence of the document entirely, eliminating reconnaissance and enumeration vectors.",
    },
    tradeOffInsight: {
      juniorShortcut: "Returning detailed 403 Forbidden error messages confirming that the requested object exists in another tenant's account.",
      seniorResolution: "Silent 404 responses eliminate object enumeration and protect enterprise multi-tenant boundary integrity.",
    },
    codeInvariants: [
      "100% of database queries filter by the authenticated user's workspace_id",
      "Cross-workspace access attempts return silent 404 Not Found responses",
      "Object enumeration and BOLA reconnaissance attacks are completely blocked",
    ],
  },
  '14-2': {
    lessonId: "14-2",
    specNumber: 14,
    sourceFile: "change_detection.py & tests/",
    coreFunction: "UUID Renaming & SQL Parameterization",
    codeSnippet: "# change_detection.py: Safe path handling\n# Discard user-submitted filename; generate unique UUID storage name\nstorage_filename = f\"{uuid.uuid4().hex}.dat\"\n# 100% of SQLite queries use parameterized tuple arguments:\nconn.execute(\"SELECT * FROM workspace WHERE id = ?\", (ws_id,))",
    codeExplanation: "Sanitizes document uploads by replacing client-supplied filenames with secure UUIDs and validating filesystem path boundaries.",
    clearMetaphor: {
      intuition: "Mailroom security screening: incoming packages are inspected for contraband, original sender wrapping is removed, and contents are placed in a secure vault container.",
      softwareMapping: "Client filenames are discarded on arrival; files are saved under cryptographically random UUIDs, and SQL queries use 100% parameterized bindings.",
      whyItBreaksWithoutIt: "An attacker uploads a file named ../../../../etc/passwd, overwriting server operating system files or executing remote code.",
    },
    situationDetails: {
      operationalContext: "Web endpoints accepting multipart form-data document uploads from external user browsers.",
      disasterScenario: "A malicious filename containing directory traversal characters overwrites application configuration files on disk.",
      engineeringMitigation: "Discarding the client filename and storing under a verified UUID path prevents all path traversal and file overwrite attacks.",
    },
    tradeOffInsight: {
      juniorShortcut: "Writing uploaded files directly to disk using the filename supplied in the HTTP header.",
      seniorResolution: "Sanitizing file paths with deterministic UUID renaming eliminates path traversal exploits at the boundary.",
    },
    codeInvariants: [
      "Client-supplied filenames are immediately replaced with random UUID identifiers",
      "Filesystem destinations are verified to stay within designated upload directories",
      "Pre-commit scanners (Trufflehog) prevent hardcoding secrets or API keys in version control",
    ],
  },
  '14-3': {
    lessonId: "14-3",
    specNumber: 14,
    sourceFile: "agent/state.py",
    coreFunction: "Moroccan Law 09-08 Privacy Sanitizer",
    codeSnippet: "# agent/state.py: Moroccan personal data protection (Law 09-08)\n# Redacts National Identity Card (CIN) and 24-digit RIB bank numbers\ntext = re.sub(r\"\\b[A-Z]{1,2}\\s?\\d{5,6}\\b\", \"[MASQUÉ_CIN]\", text)\ntext = re.sub(r\"\\b\\d{24}\\b\", \"[MASQUÉ_RIB]\", text)",
    codeExplanation: "Anonymizes sensitive Moroccan Personal Identifiable Information (CIN numbers and RIB bank codes) before text is stored or processed.",
    clearMetaphor: {
      intuition: "A sworn government privacy inspector verifying that employee personal identification numbers are masked before documents are filed.",
      softwareMapping: "Regex sanitizers redact Moroccan CIN card numbers and bank RIBs at ingestion; vector storage and embeddings run on sovereign infrastructure.",
      whyItBreaksWithoutIt: "Uploading unredacted employee identity cards and bank account numbers to foreign cloud servers violates Moroccan Law 09-08 and CNDP regulations.",
    },
    situationDetails: {
      operationalContext: "Processing enterprise HR documents including employment contracts, salary sheets, and disciplinary sanction letters.",
      disasterScenario: "An enterprise RAG system sends unanonymized employee CIN numbers to public cloud APIs, triggering severe CNDP regulatory penalties.",
      engineeringMitigation: "Automatic PII sanitization redacts identity markers before processing, and local vector indexing preserves Moroccan data sovereignty.",
    },
    tradeOffInsight: {
      juniorShortcut: "Sending unredacted employee files to external cloud APIs without prior anonymization or CNDP transfer authorization.",
      seniorResolution: "Engineering compliance with Moroccan Law 09-08 protects citizen privacy and shields the enterprise from severe legal sanctions.",
    },
    codeInvariants: [
      "Moroccan National Identity Card (CIN) numbers are automatically redacted from ingested text",
      "24-digit Moroccan bank RIB account numbers are scrubbed before storage",
      "All vector indexing and embeddings run on sovereign infrastructure within Moroccan legal boundaries",
    ],
  },
  '15-1': {
    lessonId: "15-1",
    specNumber: 15,
    sourceFile: "pyproject.toml",
    coreFunction: "uv Python 3.12 & CPU PyTorch",
    codeSnippet: "# pyproject.toml: Sub-second package resolution with Astral uv\n[project]\nname = \"sanad\"\nrequires-python = \">=3.11\"\ndependencies = [\n    \"torch @ https://download.pytorch.org/whl/cpu/torch-2.2.0-cp312-none-any.whl\",\n    \"sentence-transformers\",\n    \"qdrant-client\"\n]",
    codeExplanation: "Locks project dependencies under Python 3.12 using Astral uv, specifying the CPU PyTorch wheel to eliminate 3.5GB of useless CUDA GPU bloat.",
    clearMetaphor: {
      intuition: "A stripped-down, high-agility rally car engineered for mountain curves: no heavy 40-ton crane or excess baggage, just raw speed and nimble handling.",
      softwareMapping: "Astral uv resolves dependencies in sub-seconds; pinning the PyTorch CPU distribution saves 3.5GB of disk space and container memory.",
      whyItBreaksWithoutIt: "Running pip install torch downloads 4GB of Nvidia CUDA drivers on a CPU server, causing 15-minute container builds and deployment timeouts.",
    },
    situationDetails: {
      operationalContext: "Continuous integration and cloud container build pipelines deploying updates to production multiple times per week.",
      disasterScenario: "CI/CD build pipelines take 15 minutes to download massive GPU packages on CPU instances, stalling deployment cadence.",
      engineeringMitigation: "Specifying the PyTorch CPU index allows uv to install the entire 80-package environment in less than 3 seconds.",
    },
    tradeOffInsight: {
      juniorShortcut: "Using standard pip without index constraints and downloading gigabytes of unneeded GPU drivers.",
      seniorResolution: "Lightweight CPU-specific dependency pinning accelerates builds and reduces container footprints by over 75%.",
    },
    codeInvariants: [
      "Astral uv manages dependencies with deterministic, sub-second lockfile synchronization",
      "PyTorch CPU wheel index eliminates 3.5GB of unnecessary CUDA GPU binary bloat",
      "Python 3.12 provides optimized runtime performance and modern typing constructs",
    ],
  },
  '15-2': {
    lessonId: "15-2",
    specNumber: 15,
    sourceFile: "Dockerfile",
    coreFunction: "Multi-Stage Docker & Non-Root USER",
    codeSnippet: "# Dockerfile: Multi-stage build\nFROM node:22-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci && npm run build\n\nFROM node:22-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\n# Drop root: Non-root user (UID 1000)\nUSER node\nEXPOSE 3000\nCMD [\"node\", \"server.js\"]",
    codeExplanation: "Production Dockerfile that discards build compilers in Stage 1 and drops all administrative root privileges to execute under USER node.",
    clearMetaphor: {
      intuition: "A cleanroom spacesuit airlock: the dirty construction machinery stays in the workshop; only the finished sterile capsule moves to flight, crewed by non-root personnel.",
      softwareMapping: "Multi-stage builds reduce image size by 70%; dropping root privileges ensures that an exploited library vulnerability cannot modify host system files.",
      whyItBreaksWithoutIt: "Running containers as root: a vulnerability in a PDF parsing library gives the attacker immediate superuser control over the entire cloud server.",
    },
    situationDetails: {
      operationalContext: "Hosting enterprise software on multi-tenant cloud platforms accessible from public internet networks.",
      disasterScenario: "A zero-day exploit in an image processing dependency allows arbitrary file writes; because the process runs as root, the entire host is compromised.",
      engineeringMitigation: "Executing the container under an unprivileged user restricts writes to designated volume mounts, neutralizing container breakout attempts.",
    },
    tradeOffInsight: {
      juniorShortcut: "Building monolithic Docker images and executing production web processes under the root user account.",
      seniorResolution: "Multi-stage Docker builds with unprivileged user execution enforce the Principle of Least Privilege and minimize container attack surfaces.",
    },
    codeInvariants: [
      "Multi-stage build discards compilers, build tools, and caches from the production image",
      "Container executes strictly under an unprivileged user account (USER node)",
      "Filesystem write permissions are restricted strictly to designated persistent data mounts",
    ],
  },
  '15-3': {
    lessonId: "15-3",
    specNumber: 15,
    sourceFile: "railway.toml",
    coreFunction: "Railway Mounts & Liveness Probes",
    codeSnippet: "# railway.toml: Persistent /app/data volume & healthcheck\n[deploy]\nhealthcheckPath = \"/health\"\nhealthcheckTimeout = 100\nrestartPolicyType = \"ON_FAILURE\"\n\n[[mounts]]\nsource = \"sanad-data\"\ndestination = \"/app/data\" ",
    codeExplanation: "Railway cloud configuration attaching a persistent storage volume to /app/data and configuring active /health probes with automated failure restarts.",
    clearMetaphor: {
      intuition: "A remote solar-powered weather station on a mountain ridge: it logs telemetry to non-volatile flash memory and broadcasts periodic heartbeats.",
      softwareMapping: "Mounted persistent volumes ensure SQLite databases and Qdrant collections survive redeployments; /health probes detect hung threads.",
      whyItBreaksWithoutIt: "Deploying to ephemeral cloud containers without persistent volume mounts: every software update or reboot wipes all indexed data and accounts.",
    },
    situationDetails: {
      operationalContext: "Continuous delivery cloud deployment on Railway where containers are automatically replaced during rolling updates.",
      disasterScenario: "A rolling update replaces the running container; because data was stored on the root filesystem, all client documents and user accounts disappear.",
      engineeringMitigation: "Attaching a persistent volume mount ensures that SQLite databases and vector collections remain completely safe across all redeployments.",
    },
    tradeOffInsight: {
      juniorShortcut: "Storing databases in the root ephemeral filesystem of containerized cloud instances.",
      seniorResolution: "Persistent volume mounts and automated healthcheck probes guarantee data durability and high availability in cloud production.",
    },
    codeInvariants: [
      "Dedicated persistent volume is mounted to /app/data, preserving databases across restarts",
      "Active HTTP healthcheck probe (/health) continuously monitors database and memory availability",
      "Automated restart policies recover from transient container failures within 5 seconds",
    ],
  },
  '16-1': {
    lessonId: "16-1",
    specNumber: 16,
    sourceFile: "config.py & app.py",
    coreFunction: "Pydantic Settings & Lifespan",
    codeSnippet: "# config.py: Pydantic Settings fail-fast validation (ENGINEERING-RULES.md)\nclass Settings(BaseSettings):\n    model_config = SettingsConfigDict(env_file=\".env\", extra=\"ignore\")\n    model_mode: str = \"cloud\"  # \"cloud\" (Gemini) or \"strict_local\" (Ollama)\n    db_path: Path = Path(\"data/sanad.db\")\n    qdrant_storage_path: Path = Path(\"data/qdrant\")\n\n# app.py: FastAPI lifespan managing database & vector pools\n@contextlib.asynccontextmanager\nasync def lifespan(app: FastAPI):\n    settings = get_settings()  # Fails fast at boot if mandatory env is malformed\n    yield",
    codeExplanation: "FastAPI lifespan context manager paired with Pydantic BaseSettings, enforcing fail-fast configuration validation at initial boot time.",
    clearMetaphor: {
      intuition: "The pre-flight checklist of a commercial airline pilot: checking hydraulic pressure and fuel before starting engines; if an alert shows, the plane stays grounded.",
      softwareMapping: "Validates all required environment variables, secrets, and database paths at boot; fails loud and fast before accepting a single incoming HTTP request.",
      whyItBreaksWithoutIt: "Using raw os.getenv() scattered inside request handlers: server boots fine, but crashes 3 hours later at 2 AM with a NoneType error during a live query.",
    },
    situationDetails: {
      operationalContext: "Configuring enterprise cloud deployments across development, staging, and production environments with distinct secret configurations.",
      disasterScenario: "A production server starts up with a misspelled database path; hours later, the first user document upload crashes with an unhandled exception.",
      engineeringMitigation: "Pydantic BaseSettings parses and validates configuration at startup, refusing to boot if any required variable is missing or malformed.",
    },
    tradeOffInsight: {
      juniorShortcut: "Calling os.getenv() in the middle of request handling functions without upfront type validation.",
      seniorResolution: "Failing fast at boot time prevents embarrassing runtime crashes and ensures that all dependencies are verified before traffic arrives.",
    },
    codeInvariants: [
      "Pydantic BaseSettings validates all environment variables and secret types at startup",
      "FastAPI lifespan context manager initializes database connection pools cleanly before traffic",
      "Graceful teardown flushes SQLite WAL journals and closes vector connections on shutdown",
    ],
  },
  '16-2': {
    lessonId: "16-2",
    specNumber: 16,
    sourceFile: "sync.py & recovery.py",
    coreFunction: "Asynchronous Ingestion Sync Driver",
    codeSnippet: "# sync.py (ST-17): Safe ordering - PARENTS FIRST, THEN VECTORS\n# A crash mid-write leaves parent files nothing points at (safe, overwritten next sync)\n# rather than vectors citing missing parents (broken citations served to users)\ndef _ingest_present_file(conn, sync_run_id, workspace_id, change):\n    doc_id, file_path = change.document_id, change.path\n    markdown, page_count = conversion.convert_file(file_path)\n    parents, children = chunking.chunk_markdown(doc_id, markdown)\n    parent_store.put_parents(workspace_id, parents)  # Parents first\n    vector_store.store_children(client, workspace_id, children)  # Vectors second",
    codeExplanation: "Asynchronous ingestion engine enforcing the safe storage write order: parents are written to disk first, then vector children are indexed into Qdrant.",
    clearMetaphor: {
      intuition: "Highway patrol rescue teams cruising the highway: they spot broken-down cars, clear debris, and tow vehicles to safety without halting highway traffic.",
      softwareMapping: "Upload endpoints return an immediate HTTP 202 Accepted; the background sync driver extracts text, generates embeddings, and handles rollback cleanly.",
      whyItBreaksWithoutIt: "Writing vectors before parents: a crash mid-ingestion leaves vectors pointing to nonexistent parent files, returning broken citations to users.",
    },
    situationDetails: {
      operationalContext: "Users uploading 400-page legal codes while other analysts are actively querying the chat interface for urgent severance advice.",
      disasterScenario: "A 400-page upload blocks the web event loop for 90 seconds, causing all concurrent users to receive HTTP 504 Gateway Timeout errors.",
      engineeringMitigation: "Asynchronous background tasks process heavy files off the main request thread, keeping web endpoints responsive in under 10 milliseconds.",
    },
    tradeOffInsight: {
      juniorShortcut: "Running synchronous, blocking file parsing and embedding loops directly inside API route handlers.",
      seniorResolution: "Asynchronous sync drivers keep the user interface lightning-fast while atomic failure handling prevents orphaned database artifacts.",
    },
    codeInvariants: [
      "Upload endpoints return immediate HTTP 202 Accepted status in under 10 milliseconds",
      "Derived stores are written parents first then vectors, ensuring zero broken citations",
      "One failing file is recorded as FAILED while all other files complete successfully",
    ],
  },
  '17-1': {
    lessonId: "17-1",
    specNumber: 17,
    sourceFile: "agent/state.py",
    coreFunction: "AgentState & LangGraph Rails",
    codeSnippet: "# agent/state.py (ST-21): LangGraph working state\nclass AgentState(TypedDict):\n    workspace_id: str\n    session_id: str\n    question: str\n    history: tuple[Turn, ...]\n    queries: tuple[str, ...]\n    passages: tuple[SearchHit, ...]\n    relevant: bool\n    parents: Mapping[str, str]\n    # steps is append-only by construction: operator.add prevents erasing history\n    steps: Annotated[list[TraceStep], operator.add]\n    answer_kind: AnswerKind | None",
    codeExplanation: "Strongly-typed Pydantic TypedDict representing the complete state clipboard transported across the LangGraph StateGraph, with append-only trace steps.",
    clearMetaphor: {
      intuition: "The train tracks and the conductor's clipboard: the train travels along immutable tracks, while the conductor's clipboard holds typed inspection stamps.",
      softwareMapping: "SanadAgentState defines every key explicitly; nodes take state as input and return only dictionary deltas, guaranteeing functional purity.",
      whyItBreaksWithoutIt: "Passing an untyped mutable dictionary across functions: different modules mutate keys randomly, creating subtle concurrency race conditions.",
    },
    situationDetails: {
      operationalContext: "Coordinating multi-step agent reasoning where state must be preserved, modified, and inspected across 9 distinct functional nodes.",
      disasterScenario: "A developer mutates a shared state key in place, causing downstream nodes to receive inconsistent data and crash with KeyError exceptions.",
      engineeringMitigation: "TypedDict schema guarantees compile-time type safety and allows LangGraph to persist and replay agent states deterministically.",
    },
    tradeOffInsight: {
      juniorShortcut: "Passing loose, unvalidated global dictionaries between reasoning functions without schema contracts.",
      seniorResolution: "A strongly-typed state schema eliminates runtime key errors and turns complex agent behavior into a transparent, auditable pipeline.",
    },
    codeInvariants: [
      "AgentState defines explicit types for queries, passages, parent maps, and status flags",
      "steps uses Annotated[list[TraceStep], operator.add] for an append-only audit trace",
      "Nodes return only dictionary deltas without modifying the input state in place",
    ],
  },
  '17-2': {
    lessonId: "17-2",
    specNumber: 17,
    sourceFile: "agent/nodes.py & agent/prompts.py",
    coreFunction: "9 Pure Node Functions & Prompts",
    codeSnippet: "# agent/nodes.py: The 9 assembly workers\n# SUMMARIZE, CLARIFY, REWRITE, RETRIEVE, GRADE, FETCH_PARENTS, REWORD, ANSWER, REFUSE\ndef make_answer_node(ports: AgentPorts):\n    def answer_node(state: AgentState) -> dict:\n        text, sources = ports.write_answer(state[\"question\"], state[\"parents\"])\n        return {\"answer_kind\": AnswerKind.ANSWER, \"answer_text\": text, \"answer_sources\": sources}\n    return answer_node",
    codeExplanation: "The 9 pure assembly worker functions in nodes.py, each executing a single specialized micro-task using locked templates from prompts.py.",
    clearMetaphor: {
      intuition: "Specialized technicians on an automotive assembly line: each worker installs one exact component according to an official laminated operating manual.",
      softwareMapping: "Every node has a single responsibility: check_clarity_node checks ambiguity, grade_documents_node filters noise, and generate_answer_node writes text.",
      whyItBreaksWithoutIt: "Writing a single 10-page monolithic prompt: the model gets confused, ignores legal constraints, and fails to cite sources reliably.",
    },
    situationDetails: {
      operationalContext: "Implementing complex legal reasoning requiring disambiguation, multi-hop search, relevance filtering, and evidence-bound synthesis.",
      disasterScenario: "A monolithic prompt tries to perform search and generation simultaneously, producing answers with mixed-up article numbers.",
      engineeringMitigation: "Breaking the workflow into 9 specialized nodes ensures each sub-task is executed with maximum focus and testability.",
    },
    tradeOffInsight: {
      juniorShortcut: "Attempting to solve multi-step reasoning with a single, monolithic language model prompt.",
      seniorResolution: "Decomposing agent reasoning into 9 focused functional nodes guarantees surgical precision, inspectability, and high reliability.",
    },
    codeInvariants: [
      "Each of the 9 nodes is a pure function that can be unit-tested with mock inputs",
      "fetch_parents node retrieves 4,000c parent sections from parent_store before answering",
      "Answer node enforces that every cited source was physically in front of the model",
    ],
  },
  '18-1': {
    lessonId: "18-1",
    specNumber: 18,
    sourceFile: "db/schema.sql",
    coreFunction: "3NF Schema & Foreign Key Cascades",
    codeSnippet: "-- db/schema.sql: 3NF Relational schema with cascade deletes\nCREATE TABLE workspace (\n  id TEXT PRIMARY KEY,\n  name TEXT NOT NULL UNIQUE,\n  folder_path TEXT NOT NULL\n);\n\nCREATE TABLE document (\n  id TEXT PRIMARY KEY,\n  workspace_id TEXT NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,\n  file_name TEXT NOT NULL,\n  UNIQUE (workspace_id, file_name)\n);\n\nCREATE INDEX idx_document_workspace_id ON document(workspace_id);",
    codeExplanation: "Third Normal Form (3NF) relational database schema establishing foreign key relationships, cascading deletions, and strategic B-Tree indexing.",
    clearMetaphor: {
      intuition: "The structural engineering blueprints for a building's foundations: specifying the exact location of load-bearing pillars and cascading drainage pipes.",
      softwareMapping: "Tables are normalized to 3NF; deleting a workspace purges all documents, chunks, and sessions automatically via ON DELETE CASCADE.",
      whyItBreaksWithoutIt: "Denormalized tables without foreign keys: deleting a document leaves thousands of orphaned chunks polluting database storage and vector search.",
    },
    situationDetails: {
      operationalContext: "Managing enterprise document hierarchies where workspaces, documents, chunks, and sessions must stay in strict relational consistency.",
      disasterScenario: "A workspace is deleted, but its document chunks remain in the database, allowing subsequent vector searches to retrieve orphaned data.",
      engineeringMitigation: "Database-level foreign key cascades guarantee that removing a parent record instantly cleans all child entities without application code.",
    },
    tradeOffInsight: {
      juniorShortcut: "Creating flat tables without foreign key constraints and attempting to clean child records manually in Python.",
      seniorResolution: "Normalized schemas with foreign key cascades let the database engine guarantee data integrity automatically.",
    },
    codeInvariants: [
      "Database is normalized to 3NF, eliminating redundant data duplication across tables",
      "ON DELETE CASCADE ensures complete, automatic cleanup of child records",
      "Targeted B-Tree indexes on workspace_id and file_name maintain sub-millisecond query latency",
    ],
  },
  '18-2': {
    lessonId: "18-2",
    specNumber: 18,
    sourceFile: "db/repo.py",
    coreFunction: "Five Golden Database Safety Guards",
    codeSnippet: "# db/repo.py: Five Golden Database Safety Guards\n# Guard 1: PRAGMA foreign_keys = ON on EVERY connection\n# Guard 2: 100% Parameterized queries with tuples (zero string interpolation)\n# Guard 3: Explicit transaction boundaries with commit/rollback\n# Guard 4: Clean cursor lifecycle management\n# Guard 5: Workspace isolation on all document and chat queries\ndef get_document(conn, document_id: str, workspace_id: str) -> dict | None:\n    return conn.execute(\"SELECT * FROM document WHERE id = ? AND workspace_id = ?\", (document_id, workspace_id)).fetchone()",
    codeExplanation: "Centralized repository pattern encapsulating all SQLite operations behind the Five Golden Safety Guards of enterprise data persistence.",
    clearMetaphor: {
      intuition: "The five access keys required by an armored bank vault manager: check ID, log timestamp, turn two keys simultaneously, and seal the outer grill.",
      softwareMapping: "Guard 1 enforces workspace filters; Guard 2 requires parameterized SQL; Guard 3 wraps updates in atomic transactions; Guard 4 pools connections; Guard 5 writes audit logs.",
      whyItBreaksWithoutIt: "Developers writing raw SQL queries inside route controllers with string concatenation, exposing the application to catastrophic SQL injections.",
    },
    situationDetails: {
      operationalContext: "Multiple developers contributing API endpoints and background services that interact with the application database.",
      disasterScenario: "A developer writes an unparameterized SQL query in a search endpoint; an attacker injects ' OR 1=1 --, dumping the entire document database.",
      engineeringMitigation: "Centralizing all database calls in DatabaseRepository guarantees that every query is parameterized and filtered by workspace by default.",
    },
    tradeOffInsight: {
      juniorShortcut: "Allowing raw SQL string queries to be written freely across web controllers and background tasks.",
      seniorResolution: "The repository pattern with 5 golden safety guards eliminates SQL injections and enforces multi-tenant boundaries consistently.",
    },
    codeInvariants: [
      "Guard 1: Mandatory PRAGMA foreign_keys = ON enforced on every SQLite connection",
      "Guard 2: Exclusive use of parameterized SQL statements (zero string concatenation)",
      "Guard 3: Atomic transactions with automatic rollback on unhandled exceptions",
      "Guard 4: Safe connection pooling and cursor disposal to prevent connection leaks",
      "Guard 5: Workspace isolation enforced on 100% of read and write queries",
    ],
  },
  '19-1': {
    lessonId: "19-1",
    specNumber: 19,
    sourceFile: "app.py & ui/templates/",
    coreFunction: "Server-Rendered Jinja2 Templates",
    codeSnippet: "# app.py: Jinja2 server-rendered templates with hypermedia attributes\n# ui/templates/chat.html: Renders answer with raw HTML links/images switched off\ntemplates = Jinja2Templates(directory=\"ui/templates\")\n# Static assets fingerprinted with SHA-256 content hashes for immutable CDN caching\n@app.get(\"/\", response_class=HTMLResponse)\nasync def chat_screen(request: Request):\n    return templates.TemplateResponse(\"chat.html\", {\"request\": request})",
    codeExplanation: "Jinja2 server-rendered template system delivering complete HTML pages directly from FastAPI, eliminating client bundle download latencies.",
    clearMetaphor: {
      intuition: "A Gutenberg movable-type printing press stamping each publication run with an official cryptographic date seal.",
      softwareMapping: "Static CSS and JavaScript files are fingerprinted with content hashes; browsers can cache assets indefinitely while updates are fetched instantly.",
      whyItBreaksWithoutIt: "Deploying a CSS bug fix, only for users to see broken layouts for a week because browsers continue using stale cached stylesheets.",
    },
    situationDetails: {
      operationalContext: "Deploying continuous updates to production web interfaces where clients must receive updated stylesheets immediately without manual hard refreshes.",
      disasterScenario: "A styling update deploys to Railway; users report missing buttons and broken grids because their browsers are executing cached old CSS.",
      engineeringMitigation: "Asset fingerprinting modifies the asset URL whenever file contents change, forcing browsers to download the fresh stylesheet immediately.",
    },
    tradeOffInsight: {
      juniorShortcut: "Serving static files under static URLs like /style.css without cache-busting hashes.",
      seniorResolution: "Cryptographic asset fingerprinting eliminates stale cache bugs and enables aggressive, high-speed CDN caching.",
    },
    codeInvariants: [
      "FastAPI serves Jinja2 server-rendered templates directly from app.py",
      "Static asset URLs include SHA-256 content hashes for automatic cache-busting",
      "Markdown answer formatting is rendered safely with raw HTML and external images disabled",
    ],
  },
  '19-2': {
    lessonId: "19-2",
    specNumber: 19,
    sourceFile: "tests/unit/test_access_gate.py",
    coreFunction: "Staging Gatekeeper & Session Store",
    codeSnippet: "# tests/unit/test_access_gate.py: Staging gatekeeper verification\n# Asserts unauthenticated staging traffic is rejected with HTTP 401\n# Asserts robots.txt serves Disallow: / on non-production hosts\nassert response.status_code == 401\nassert \"WWW-Authenticate\" in response.headers\n# ui/conversation.py: In-session conversation store persisting turns in SQLite",
    codeExplanation: "ASGI middleware enforcing HTTP Basic Authentication on staging environments and blocking search engine crawlers via robots.txt: Disallow /.",
    clearMetaphor: {
      intuition: "The doorman of an exclusive private club: verifying invitations at the garden gate before anyone approaches the building, with the butler greeting guests inside.",
      softwareMapping: "Staging environments require authentication tokens and block web crawlers; conversation.py persists session histories to SQLite across page reloads.",
      whyItBreaksWithoutIt: "Public staging sites: Google indexes unreleased features and test contracts containing dummy client names, causing public leaks.",
    },
    situationDetails: {
      operationalContext: "Deploying pre-production environments to public cloud URLs for client review and quality assurance testing.",
      disasterScenario: "Google indexes a staging URL containing draft corporate contracts, exposing private test data on public search results.",
      engineeringMitigation: "The staging access gate intercepts unauthenticated traffic and blocks crawlers, keeping pre-production environments completely confidential.",
    },
    tradeOffInsight: {
      juniorShortcut: "Deploying staging environments openly to the internet without password protection or crawler restrictions.",
      seniorResolution: "Staging gatekeepers and persistent conversation storage ensure a secure, private testing sandbox.",
    },
    codeInvariants: [
      "Staging gatekeeper middleware requires token authentication before any page loads",
      "robots.txt Disallow: / directive prevents search engine indexation of staging sites",
      "Conversation sessions persist in SQLite, surviving browser refreshes and device changes",
    ],
  },
  '20-1': {
    lessonId: "20-1",
    specNumber: 20,
    sourceFile: "scripts/run_evaluation.py & tests/",
    coreFunction: "Evaluation Proctor CLI",
    codeSnippet: "# scripts/run_evaluation.py: Automated exam proctor CLI\n# Evaluates 60 golden questions with LLMJudgeScorer\n# Generates timestamped JSON reports under data/reports/\nreport = run_evaluation(workspace_id=ws_id, golden_set_path=\"data/golden.json\")\nassert report.groundedness >= 0.90\nassert report.refusal_pass == 10  # 10 out of 10 trick questions refused",
    codeExplanation: "CLI proctor tool that automatically executes the 60-question golden benchmark, computes RAGAS scores, and generates comparative regression reports.",
    clearMetaphor: {
      intuition: "An incorruptible university exam proctor with an official stopwatch: distributing test papers, tracking time, and grading answers without favoritism.",
      softwareMapping: "Executes the full evaluation exam across Moroccan labor law; generates JSON and Markdown scorecards comparing scores against historical baselines.",
      whyItBreaksWithoutIt: "Judging prompt improvements by developer gut feeling: tweaking a prompt and shipping an update that silently degrades 30% of standard questions.",
    },
    situationDetails: {
      operationalContext: "Evaluating iterative enhancements to system prompts, retrieval parameters, and chunking strategies across development sprints.",
      disasterScenario: "A team assumes a new prompt is better because it answers one difficult question well, unaware that it introduces hallucinations across standard queries.",
      engineeringMitigation: "The automated proctor evaluates the entire 60-question benchmark objectively, reporting exact metric deltas before any change is accepted.",
    },
    tradeOffInsight: {
      juniorShortcut: "Relying on manual spot-checks and subjective developer impressions to evaluate generative model quality.",
      seniorResolution: "Automated benchmark proctoring turns AI quality evaluation into an empirical, reproducible engineering discipline.",
    },
    codeInvariants: [
      "Automated CLI proctor evaluates all 60 benchmark questions systematically",
      "Computes RAGAS Faithfulness, Context Recall, and Answer Relevance objectively",
      "Generates comparative JSON reports highlighting any regression exceeding 2%",
    ],
  },
  '20-2': {
    lessonId: "20-2",
    specNumber: 20,
    sourceFile: "scripts/release_gate.py & tests/",
    coreFunction: "Testing Pyramid Bouncer",
    codeSnippet: "# scripts/release_gate.py: The Testing Pyramid Bouncer\n# Tier 1: 100+ Unit & Mock Tests (uv run pytest tests/unit)\n# Tier 2: Integration Tests (SQLite WAL, Qdrant & ContractClient)\n# Tier 3: Security & BOLA Tests (Silent 404 & PII scrubbing)\n# Tier 4: Golden Evaluation Gate (G1 >= 0.90, G2 = 100%, G3 sources)\n# If any tier fails, exits code 1 to physically halt cloud deployment",
    codeExplanation: "Orchestrates the 4-tier testing pyramid, running unit tests, integration tests, security audits, and RAGAS benchmarks before authorizing release.",
    clearMetaphor: {
      intuition: "A strict VIP club bouncer paired with an automotive safety inspection lane: brake rollers, emissions testing, and headlight alignments must all pass 100%.",
      softwareMapping: "Executes the testing pyramid in sequence: unit tests (Tier 1), integration (Tier 2), OWASP security (Tier 3), and golden benchmarks (Tier 4).",
      whyItBreaksWithoutIt: "Hope-driven deployment: pushing directly to production without automated regression testing; bugs explode in front of clients.",
    },
    situationDetails: {
      operationalContext: "Authorizing production releases to Railway cloud and preparing final deliverables for university faculty examination.",
      disasterScenario: "A release containing an unresolved BOLA vulnerability or broken citation parser is deployed to production, breaking live client demos.",
      engineeringMitigation: "The release gate bouncer executes all four tiers in CI/CD; any failure halts the deployment pipeline immediately with exit code 1.",
    },
    tradeOffInsight: {
      juniorShortcut: "Authorizing deployments manually based on hurried spot-checks without running comprehensive regression test suites.",
      seniorResolution: "The testing pyramid and automated release gate ensure that only mathematically certified, secure software ever reaches production.",
    },
    codeInvariants: [
      "Tier 1: 100+ unit tests verify hexagonal ports and state transitions in sub-seconds",
      "Tier 2: Integration tests verify SQLite WAL transactions and Qdrant payload filters",
      "Tier 3: Security audits simulate path traversal, SQL injections, and BOLA attacks",
      "Tier 4: RAGAS benchmark enforces Gate 1 (>=90% faithfulness) and Gate 2 (100% refusal)",
    ],
  },
};

/**
 * Returns deep code and metaphor knowledge for any sublesson, with full bilingual parity (EN / FR)
 */
export function getCodeKnowledge(lessonId: string, lang: 'en' | 'fr' = 'en'): CodeKnowledgeItem | undefined {
  const item = CODE_KNOWLEDGE_MAP[lessonId];
  if (!item) return undefined;
  if (lang !== 'fr') return item;
  const fr = CODE_KNOWLEDGE_MAP_FR[lessonId];
  if (!fr) return item;
  return {
    ...item,
    codeExplanation: fr.codeExplanation,
    clearMetaphor: fr.clearMetaphor,
    situationDetails: fr.situationDetails,
    tradeOffInsight: fr.tradeOffInsight,
    codeInvariants: fr.codeInvariants,
  };
}
