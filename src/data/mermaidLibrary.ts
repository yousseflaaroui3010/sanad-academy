// Auto-generated Mermaid Architecture Library directly from Sanad Specifications
export interface DiagramEntry {
  title: string;
  type: "sequence" | "mindmap" | "flowchart" | "class" | "er" | "state" | "architecture";
  chart: string;
}

export const MERMAID_DIAGRAMS: Record<string, DiagramEntry> = {
  '1-1': {
    title: "Two-Person Review Protocol & Team Dynamics",
    type: 'flowchart',
    chart: `graph TD
    classDef person fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef process fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#92400e;
    classDef gate fill:#dcfce7,stroke:#16a34a,stroke-width:2px,color:#15803d;

    YL[👨‍💻 YL: Systems Architect<br/>Engine, Database, Server, Hosting]:::person
    MB[👩‍🔬 MB: Quality Guardian<br/>Golden Dataset, QA, Audits, Thesis]:::person

    Branch[Feature Branch: feat/S*-ST-*]:::process
    Review{Rule 5: Fresh Eyes Review}:::process
    Mutation[Deliberate Mutation Test<br/>Break code to see test fail]:::process
    MergeGate[Clean Merge to Main<br/>Rule 4: Zero AI Attribution]:::gate

    YL -->|Writes Code / Arch| Branch
    MB -->|Writes Specs / Golden Sets| Branch
    Branch --> Review
    Review --> Mutation
    Mutation -->|Passes & Verified| MergeGate`
  },
  '1-2': {
    title: "10,000-Foot System Architecture (4 Pillars)",
    type: 'architecture',
    chart: `graph TB
    subgraph ClientBrowser [🖥️ User Desktop Browser]
        UI[Server-Rendered HTML/CSS<br/>French / Arabic RTL / English]
    end

    subgraph AuthLayer [🔐 Identity & Security]
        KC[Keycloak OIDC Server<br/>Roles: Admin, Curator, Reader]
    end

    subgraph AppServer [⚡ FastAPI Web Application]
        Router[FastAPI Host & API Routes]
        Gate[Access & Security Gates]
        SyncEngine[Sync & Ingestion Engine]
        AgentEngine[LangGraph Answering Brain]
    end

    subgraph StorageEngine [💾 Storage & Indexing]
        SQLite[(SQLite Registry<br/>Workspaces, Docs, Logs)]
        Qdrant[(Embedded Qdrant<br/>Dense + BM25 Vectors)]
        ParentStore[(Parent JSON Store<br/>Full Legal Articles)]
    end

    subgraph ModelLayer [🤖 Language Models]
        E5[intfloat/multilingual-e5-base<br/>Local Vector Embeddings]
        LLM[Google Gemini Cloud or Local Ollama<br/>Reasoning & Answering]
    end

    UI <-->|HTTP / Forms / SSE Streaming| Router
    Router <--> Gate
    Gate <--> KC
    Router --> SyncEngine
    Router --> AgentEngine
    SyncEngine --> SQLite
    SyncEngine --> E5
    SyncEngine --> Qdrant
    SyncEngine --> ParentStore
    AgentEngine --> SQLite
    AgentEngine --> Qdrant
    AgentEngine --> ParentStore
    AgentEngine --> LLM`
  },
  '1-3': {
    title: "Code-Enforced Citation Sequence Flow",
    type: 'sequence',
    chart: `sequenceDiagram
    autonumber
    actor User as 👤 You
    participant App as 🖥️ Sanad App (Python)
    participant DB as 🗄️ Vector Store & Disk
    participant AI as 🤖 AI Writer

    User->>App: "What is the probation period for managers?"
    App->>DB: Search tiny chunks (Child search)
    DB-->>App: Found matching chunk in "Labor Code"
    App->>DB: Grab entire Article 14 (Parent section)
    DB-->>App: Full Article text
    App->>AI: "Answer using ONLY Article 14. If missing, say NOT_COVERED"
    AI-->>App: Draft answer text
    App->>App: Stamp official source card (Article 14, labor_code.pdf)
    App-->>User: Answer + Clickable Source Cards + Download link`
  },
  '2-1': {
    title: "Sprint 0 & 1: Ingestion Engine & SHA-256 Detection",
    type: 'flowchart',
    chart: `flowchart TD
    File[New / Changed File] --> Hash[Change Detection: Size + SHA-256]
    Hash --> Conv[Converter: PDF, DOCX, TXT to Markdown]
    Conv --> Chunk[Parent/Child Chunking]
    Chunk -->|Big 3000-char sections| ParentStore[(Parent Store: JSON on Disk)]
    Chunk -->|Small 500-char snippets| Embed[Embedding: E5 Model with 'passage:' prefix]
    Embed --> Qdrant[(Qdrant Vector DB: Isolated per Workspace)]`
  },
  '2-2': {
    title: "Sprint 2 & 3: Agent Workflow & Evaluation Runner",
    type: 'flowchart',
    chart: `flowchart TD
    UserQ([User Asks Question]) --> Summarize[Summarize Memory]
    Summarize --> Rewrite[Rewrite & Check Clarity]
    Rewrite -->|Vague / Ambiguous| Clarify[Clarification Node: Ask User to Clarify]
    Rewrite -->|Clear Question| Retrieve[Hybrid Retrieval: Dense + BM25 Sparse]
    Retrieve --> Grade{Relevance Grader: Is Document Relevant?}
    Grade -->|Irrelevant & Retries Left| Reword[Reword Query & Retry] --> Retrieve
    Grade -->|Irrelevant & Ceiling Reached| Refuse[Honest Refusal: 'I cannot answer this from your docs']
    Grade -->|Relevant Text Found| Parents[Fetch Parent Sections]
    Parents --> Answer[Answer Synthesis: Strictly Citing Sources]`
  },
  '2-3': {
    title: "Sprint 4, 5, 6: Defense & Enterprise Deployment",
    type: 'flowchart',
    chart: `flowchart TD
    subgraph Enterprise Features
        Watcher[Live Folder Watcher: Auto-detects dropped files]
        OCR[PyMuPDF Tesseract OCR: Reads scanned PDFs]
        RTL[Arabic RTL: Right-to-Left mirrored UI]
    end
    subgraph Security & Cloud
        Keycloak[Keycloak Single Sign-On] --> Roles{RBAC Roles}
        Roles --> Admin[Admin: Full control + Audit Log]
        Roles --> Curator[Curator: Upload & Sync allowed workspaces]
        Roles --> Reader[Reader: Ask questions only]
        Railway[Railway Cloud: Persistent Disk + Healthchecks]
    end`
  },
  '3-1': {
    title: "The 3 Living Work Journals (BUILD-STATE, DECISIONS)",
    type: 'flowchart',
    chart: `graph LR
    subgraph J1[BUILD-PLAN.md]
        direction TB
        P1[The Master Roadmap]
        P2[52 Stories: ST-01 to ST-52]
        P3[Dependencies & Exit Gates]
    end

    subgraph J2[BUILD-STATE.md]
        direction TB
        S1[The Live Flight Recorder]
        S2[Real Commit Hashes]
        S3[Verified Test Pass Counts]
        S4[Active Blockers & Open Risks]
    end

    subgraph J3[DECISIONS.md]
        direction TB
        D1[The Legal Courthouse]
        D2[Permanent Log of Choices]
        D3[Why Option A beat Option B]
        D4[Recorded Spec Deviations]
    end

    J1 -->|What we planned| J2
    J2 -->|Real roadblocks met| J3
    J3 -->|Rules that govern next step| J2`
  },
  '3-2': {
    title: "Signed Spec Pack & Exit Gates Milestone Flow",
    type: 'flowchart',
    chart: `flowchart TD
    Start([🚀 Project Kickoff]) --> S1[Sprint 1: Ingestion & Indexing]
    S1 --> C1{🛑 Checkpoint C1\\nSpeed & Memory OK?}
    C1 -- "✅ Yes (Pass)" --> S2[Sprint 2: Brain & User Screens]
    C1 -- "❌ No (Too slow/broken)" --> P1[Trigger Descope Step 1\\nRe-calibrate points] --> S2

    S2 --> C2{🛑 Checkpoint C2\\nCan it answer a real\\nLabor Law question?}
    C2 -- "✅ Yes (Pass)" --> S3[Sprint 3: Test Gates & Hardening]
    C2 -- "❌ No (Failed skeleton)" --> P2[Drop V1.1 Comfort Stretch\\nAbsorb delay] --> S3

    S3 --> C3{🛑 Checkpoint C3\\nEval Gate Green?\\nG1 >= 90%, G2 20/20, G3 100%}
    C3 -- "✅ Yes (Pass)" --> Tag[🏷️ Tag Release v1.0.0\\nReady for Defense]
    C3 -- "❌ No (Gate Red)" --> P3[Execute Descope Ladder\\nDocument cuts to Jury]`
  },
  '3-3': {
    title: "Descope Ladder & Pre-Agreed Checkpoints",
    type: 'flowchart',
    chart: `flowchart TD
    Start([🚀 Project Kickoff]) --> S1[Sprint 1: Ingestion & Indexing]
    S1 --> C1{🛑 Checkpoint C1\\nSpeed & Memory OK?}
    C1 -- "✅ Yes (Pass)" --> S2[Sprint 2: Brain & User Screens]
    C1 -- "❌ No (Too slow/broken)" --> P1[Trigger Descope Step 1\\nRe-calibrate points] --> S2

    S2 --> C2{🛑 Checkpoint C2\\nCan it answer a real\\nLabor Law question?}
    C2 -- "✅ Yes (Pass)" --> S3[Sprint 3: Test Gates & Hardening]
    C2 -- "❌ No (Failed skeleton)" --> P2[Drop V1.1 Comfort Stretch\\nAbsorb delay] --> S3

    S3 --> C3{🛑 Checkpoint C3\\nEval Gate Green?\\nG1 >= 90%, G2 20/20, G3 100%}
    C3 -- "✅ Yes (Pass)" --> Tag[🏷️ Tag Release v1.0.0\\nReady for Defense]
    C3 -- "❌ No (Gate Red)" --> P3[Execute Descope Ladder\\nDocument cuts to Jury]`
  },
  '4-1': {
    title: "Answers Strictly Backed by Proven Sources (F-03)",
    type: 'sequence',
    chart: `sequenceDiagram
    autonumber
    actor User as 👤 You
    participant App as 🖥️ Sanad App (Python)
    participant DB as 🗄️ Vector Store & Disk
    participant AI as 🤖 AI Writer

    User->>App: "What is the probation period for managers?"
    App->>DB: Search tiny chunks (Child search)
    DB-->>App: Found matching chunk in "Labor Code"
    App->>DB: Grab entire Article 14 (Parent section)
    DB-->>App: Full Article text
    App->>AI: "Answer using ONLY Article 14. If missing, say NOT_COVERED"
    AI-->>App: Draft answer text
    App->>App: Stamp official source card (Article 14, labor_code.pdf)
    App-->>User: Answer + Clickable Source Cards + Download link`
  },
  '4-2': {
    title: "Honest Refusal vs. Guesswork Decision Flow (F-05)",
    type: 'flowchart',
    chart: `flowchart TD
    User([👤 User asks a question]) --> Check[🔍 Sanad looks only in your files]
    Check --> Found{Found exact proof in files?}
    Found -- YES --> Answer[✅ Show answer + clickable source cards]
    Found -- NO --> Refuse[🛑 Honest refusal + show what was searched]`
  },
  '5-1': {
    title: "Multi-Tenant Workspace Isolation (F-01)",
    type: 'architecture',
    chart: `graph TD
    subgraph HR_Workspace ["🔒 Workspace 1: HR Policies"]
        HR_Docs["📄 HR Documents"]
        HR_Vec["🧠 Qdrant Vector Collection: ws_hr_children"]
        HR_Parent["📁 Parent Store: /hr/parents/*.json"]
    end

    subgraph IT_Workspace ["🔒 Workspace 2: IT Manuals"]
        IT_Docs["📄 IT Documents"]
        IT_Vec["🧠 Qdrant Vector Collection: ws_it_children"]
        IT_Parent["📁 Parent Store: /it/parents/*.json"]
    end

    UserQuery["💬 User Query: 'How do I reset my password?' in IT Workspace"]
    UserQuery --> IT_Vec
    IT_Vec --> IT_Parent
    IT_Parent --> Answer["✅ IT Answer (Zero data from HR!)"]

    HR_Vec -.->|⛔ BLOCKED / IMPOSSIBLE| Answer`
  },
  '5-2': {
    title: "Document Ingestion & Status Tracking Flow (F-02)",
    type: 'flowchart',
    chart: `flowchart TD
    Start([Click 'Sync' Button]) --> Scan[Scan Folder Files]
    Scan --> Hash[Calculate SHA-256 Fingerprint]
    Hash --> Compare{Compare with SQLite Registry}
    
    Compare -->|New Fingerprint| Added[✨ Added: Convert & Index]
    Compare -->|Changed Fingerprint| Changed[🔄 Changed: Re-index]
    Compare -->|Same Fingerprint| Unchanged[⏭️ Unchanged: Skip & Save Work]
    Compare -->|File Missing on Disk| Removed[🗑️ Removed: Delete from Index]
    
    Added --> ConvertCheck{Is File Readable?}
    ConvertCheck -->|Yes| Success[Indexed Successfully]
    ConvertCheck -->|Broken / Locked| Failed[❌ Failed: Plain English Error]
    ConvertCheck -->|Image-Only Scan| Skipped[⚠️ Skipped: No Text Layer]
    
    Success --> FinalReport[📊 Transparent Sync Report]
    Failed --> FinalReport
    Skipped --> FinalReport
    Unchanged --> FinalReport
    Removed --> FinalReport`
  },
  '5-3': {
    title: "Conversational Memory & Clarification Flow (F-06, F-07)",
    type: 'flowchart',
    chart: `flowchart TD
    UserQuestion[User Asks Question] --> Summarize[1. Summarize History F-07<br>Combines previous turns so pronouns make sense]
    Summarize --> Rewrite[2. Rewrite & Inspect Query<br>Expands into search queries]
    
    Rewrite --> AmbiguityCheck{Is the question<br>hopelessly vague?}
    
    AmbiguityCheck -->|YES: e.g. 'tell me about that'| ClarifyNode[3. Dynamic Clarification F-06<br>Ask ONE targeted clarifying question]
    ClarifyNode --> StopAndAsk([Wait for User to Reply])
    
    AmbiguityCheck -->|NO: Clear intent| Retrieve[4. Hybrid Retrieval<br>Search dense vectors + keyword text]
    Retrieve --> Grade[5. Grade Relevance F-04<br>Are these passages actually on-topic?]
    
    Grade -->|Passages are Good| Answer[6. Generate Sourced Answer F-03]
    Grade -->|Off-topic & Retries Left| Reword[7. Reword Query & Retry Loop]
    Reword --> Retrieve
    Grade -->|Out of Retries / Not Covered| Refuse[8. Honest Refusal F-05<br>'This is not covered in your documents']`
  },
  '6-1': {
    title: "Desktop-First Screen Strategy & Breakpoints",
    type: 'flowchart',
    chart: `flowchart TD
    A[User Opens Sanad Web App] --> B{What is the Screen Width?}
    
    B -->|Wide Screen: 1024px or wider| C[Full Desktop Layout<br>Side-by-side Answer & Evidence Rail]
    B -->|Medium Screen: 768px to 1023px| D[Stacked Tablet Layout<br>Evidence cards stack under the answer]
    B -->|Phone Screen: Under 768px| E[Polite Notice Displayed<br>'Sanad requires a desktop browser']`
  },
  '6-2': {
    title: "Trilingual Layout Mirroring (Arabic RTL Switcher)",
    type: 'flowchart',
    chart: `flowchart LR
    subgraph English_French_LTR [Left-to-Right: English / French]
        direction LR
        L1[Logo: Sanad] --> L2[Workspaces] --> L3[Reports] --> L4[Admin] --> L5[User Profile]
    end

    subgraph Arabic_RTL [Right-to-Left: Arabic Mirrored]
        direction RL
        R1[Logo: سند] --> R2[مساحات العمل] --> R3[التقارير] --> R4[الإدارة] --> R5[الملف الشخصي]
    end`
  },
  '6-3': {
    title: "No-JS Progressive Enhancement Staircase",
    type: 'flowchart',
    chart: `graph TD
    subgraph Layer2 [Level 2: JavaScript Active - The Electric Upgrade]
        E1[Live streaming answer text]
        E2[Modal slide-out citation drawer]
        E3[One-click dark mode switcher]
        E4[Real-time progress indicators]
    end

    subgraph Layer1 [Level 1: Pure HTML & CSS - The Sturdy Foundation]
        B1[Standard form submission via POST]
        B2[Passage citations open as real webpage links]
        B3[Page refreshes cleanly when answers finish]
        B4[Theme honors your computer's OS Dark Mode]
    end

    Layer1 -->|JavaScript loads smoothly| Layer2`
  },
  '7-1': {
    title: "UML Component Architecture (4 Main Pillars)",
    type: 'architecture',
    chart: `flowchart TB
    subgraph ClientSpace ["💻 User Environment (Your Browser)"]
        Browser["🌐 Web Browser\\n(Clean HTML + CSS, no complex JS)"]
    end

    subgraph SanadProcess ["⚙️ Sanad Application (Single Local Python Process)"]
        FastAPI["🚀 Web Server & API Host\\n(FastAPI / Uvicorn at 127.0.0.1:8000)"]
        
        subgraph WebLayer ["🎨 User Interface & Routes"]
            UIRoutes["📄 Web Pages (Server-Rendered HTML)\\n- Chat Screen\\n- Workspace & Sync Screen\\n- Quality Reports Screen\\n- Admin & Activity Screen"]
            APIRoutes["🔌 REST API Routes (/api/v1)\\n- /workspaces\\n- /sync\\n- /ask\\n- /health"]
        end

        subgraph CoreEngine ["🧠 The Core Engine (Pure Business Logic)"]
            SyncEngine["🔄 Sync Engine (sync.py)\\nScan, Convert, Chunk, Embed"]
            AgentGraph["🤖 LangGraph Agent (agent/graph.py)\\nQuestion Planning, Search, Grade, Answer"]
        end

        subgraph Adapters ["🔌 Adapters & Bridges"]
            DBAdapter["💾 SQLite Repository (db/repo.py)"]
            QdrantAdapter["🔍 Vector Engine Bridge (vector_store.py)"]
            FileAdapter["📁 Parent Store Bridge (parent_store.py)"]
            OIDCAdapter["🔑 Auth Bridge (ui/oidc.py)"]
        end
    end

    subgraph StorageLayer ["🗄️ Local Storage (On Your Hard Drive: data/)"]
        SQLiteDB[("🗃️ SQLite Database\\n(sanad.db)\\nUsers, Workspaces, Sync Logs")]
        ParentDisk[("📂 Parent Text Store\\n(data/parents/)\\nFull Document Sections in JSON")]
        QdrantDB[("📊 Qdrant Embedded\\n(data/qdrant/)\\nMini 500-char Chunk Vectors")]
        UserDocs[("📁 User Workspace Folder\\nOriginal PDFs, Word files")]
    end

    subgraph ExternalWorld ["🌍 External Services (Optional / Swappable)"]
        Keycloak["🛡️ Keycloak Identity Server\\n(Logins, Passwords, Roles)"]
        LLM["🤖 Answering Brain (LLM)\\n(Cloud API or Local Ollama 7B+)"]
    end

    %% Wiring
    Browser <-->|HTTP / HTML / Cookies| FastAPI
    FastAPI --> UIRoutes
    FastAPI --> APIRoutes
    UIRoutes --> CoreEngine
    APIRoutes --> CoreEngine

    SyncEngine --> UserDocs
    SyncEngine --> Adapters
    AgentGraph --> Adapters

    DBAdapter <-->|SQL Queries| SQLiteDB
    FileAdapter <-->|Read / Write JSON| ParentDisk
    QdrantAdapter <-->|Vector Math & BM25| QdrantDB
    OIDCAdapter <-->|Backchannel HTTPS| Keycloak
    AgentGraph <-->|Secure HTTPS Prompts| LLM

    classDef proc fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef store fill:#fff3e0,stroke:#f57c00,stroke-width:2px;
    classDef ext fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    class SanadProcess proc;
    class StorageLayer store;
    class ExternalWorld ext;`
  },
  '7-2': {
    title: "Hexagonal Ports-and-Adapters Architecture",
    type: 'architecture',
    chart: `flowchart TD
    subgraph OutsideWorld ["🌍 Outside World & Drivers (Adapters)"]
        BrowserUI["🌐 Web Browser UI\\n(app.py / Jinja2)"]
        FastAPIRoutes["🔌 REST API Routes\\n(api/routes.py)"]
        MockTests["🧪 Pytest Test Suite\\n(tests/conftest.py)"]
    end

    subgraph DrivingPorts ["🚪 Driving (Inbound) Ports"]
        AskSeam["ask() Function Seam"]
        SyncSeam["sync_workspace() Function Seam"]
    end

    subgraph CoreDomain ["💎 Core Domain (Pure Business Rules - Zero External Dependencies)"]
        AgentGraph["🤖 LangGraph Answering Graph\\n(agent/graph.py)\\nState Machine, Decision Trees, Refusal Paths"]
        SyncLogic["🔄 Document Sync Logic\\n(sync.py)\\nChange rules, chunking rules, safety invariants"]
        DomainModels["📦 Domain Entities\\nAnswer, Source, Trace, SyncReport"]
    end

    subgraph DrivenPorts ["🔌 Driven (Outbound) Ports (agent/ports.py)"]
        PortSummarize["Port: Summarize"]
        PortClarify["Port: Clarify"]
        PortRewrite["Port: Rewrite"]
        PortRetrieve["Port: Retrieve"]
        PortGrade["Port: Grade"]
        PortReword["Port: Reword"]
        PortFetchParents["Port: FetchParents"]
        PortWriteAnswer["Port: WriteAnswer"]
    end

    subgraph OutboundAdapters ["⚙️ Real Production Adapters vs. Fast Test Adapters"]
        subgraph RealAdapters ["🏭 Production Adapters (ui/ports.py)"]
            ChatAdapter["OpenAI / Ollama Chat Adapter"]
            QdrantAdapter["Qdrant Hybrid Vector Store"]
            ParentFileAdapter["Local JSON Disk Files"]
            KeycloakAdapter["Keycloak OIDC Client"]
        end

        subgraph TestAdapters ["⚡ Ultra-Fast In-Memory Test Adapters"]
            FakeChat["FakeChatModel\\n(Pre-programmed script)"]
            FakeEncoders["FakeEncoders\\n(Instant dummy vectors)"]
            InMemoryDict["In-Memory Python Dict\\n(Zero disk access)"]
        end
    end

    %% Wiring
    BrowserUI --> AskSeam
    FastAPIRoutes --> AskSeam
    MockTests --> AskSeam
    AskSeam --> AgentGraph

    BrowserUI --> SyncSeam
    FastAPIRoutes --> SyncSeam
    MockTests --> SyncSeam
    SyncSeam --> SyncLogic

    AgentGraph --> DrivenPorts
    
    PortSummarize -.-> ChatAdapter
    PortClarify -.-> ChatAdapter
    PortRewrite -.-> ChatAdapter
    PortGrade -.-> ChatAdapter
    PortReword -.-> ChatAdapter
    PortWriteAnswer -.-> ChatAdapter
    PortRetrieve -.-> QdrantAdapter
    PortFetchParents -.-> ParentFileAdapter

    PortSummarize -.-> FakeChat
    PortClarify -.-> FakeChat
    PortRewrite -.-> FakeChat
    PortGrade -.-> FakeChat
    PortReword -.-> FakeChat
    PortWriteAnswer -.-> FakeChat
    PortRetrieve -.-> FakeEncoders
    PortFetchParents -.-> InMemoryDict

    classDef core fill:#e8f5e9,stroke:#2e7d32,stroke-width:3px;
    classDef ports fill:#fff9c4,stroke:#fbc02d,stroke-width:2px;
    classDef adapters fill:#ede7f6,stroke:#512da8,stroke-width:2px;
    class CoreDomain core;
    class DrivingPorts,DrivenPorts ports;
    class OutboundAdapters,OutsideWorld adapters;`
  },
  '8-1': {
    title: "SQLite Relational Entity-Relationship Diagram (ER)",
    type: 'er',
    chart: `erDiagram
    WORKSPACE ||--o{ DOCUMENT : "owns (cascades delete)"
    WORKSPACE ||--o{ SYNC_RUN : "tracks (cascades delete)"
    WORKSPACE ||--o{ CHAT_HISTORY : "stores (cascades delete)"
    SYNC_RUN ||--o{ SYNC_ITEM : "records (cascades delete)"
    DOCUMENT ||--o| SYNC_ITEM : "references (set null on delete)"

    WORKSPACE {
        text id PK "Unique ID"
        text name UK "Unique workspace name"
        text folder_path "Path on computer disk"
        integer legal_flag "1 = Legal mode, 0 = Normal"
        text created_at "ISO-8601 UTC timestamp"
    }

    DOCUMENT {
        text id PK "Unique ID"
        text workspace_id FK "Owner workspace"
        text file_name "e.g. employee_handbook.pdf"
        text file_type "pdf, docx, txt, etc."
        text content_hash "Fingerprint (sha256:digest:size)"
        integer page_count "Number of pages"
        text status "active | failed | skipped | removed"
        text last_synced_at "When it was ingested"
    }

    SYNC_RUN {
        text id PK "Unique sync session ID"
        text workspace_id FK "Workspace being synced"
        text started_at "Start time"
        text finished_at "End time"
        integer added "Count of new files"
        integer changed "Count of updated files"
        integer unchanged "Count of identical files"
        integer failed "Count of broken files"
        integer removed "Count of deleted files"
        integer skipped "Count of ignored files"
    }

    SYNC_ITEM {
        text id PK "Individual file sync record"
        text sync_run_id FK "Parent sync run"
        text document_id FK "Linked document"
        text file_name "Name of the file"
        text result "added | changed | unchanged | failed | removed | skipped"
        text reason "Explanation if skipped/failed"
    }

    CHAT_HISTORY {
        text user_id PK "User identifier ('local' or Keycloak sub)"
        text workspace_id PK, FK "Target workspace"
        text payload "Complete conversation in JSON format"
        text updated_at "Timestamp of last message"
    }`
  },
  '8-2': {
    title: "Parent-Child Text Storage Engine",
    type: 'flowchart',
    chart: `flowchart TD
    Doc["Original Document (PDF / DOCX)"] --> Split["Markdown Sections (H1 - H3 Headings)"]

    subgraph ParentStorage ["Parent Store (data/parents/{ws_id}/{id}.json)"]
        Parent["Parent Chunk (~2,000 - 4,000 characters)<br/>Full section context & article text"]
    end

    subgraph ChildStorage ["Qdrant Vector DB (ws_{ws_id}_children)"]
        C1["Child 1 (~500 chars)"]
        C2["Child 2 (~500 chars)"]
        C3["Child 3 (~500 chars)"]
    end

    Split --> Parent
    Parent -->|Windowed split with overlap| C1
    Parent -->|Windowed split with overlap| C2
    Parent -->|Windowed split with overlap| C3

    UserQ["User Question: 'What is the probation period?'"] --> Search["Vector Search in Qdrant"]
    Search -->|Matches Child 2| C2
    C2 -->|Look up parent_id| Parent
    Parent -->|Supplies full context| LLM["AI Answer Generator"]`
  },
  '8-3': {
    title: "OpenAPI 3.1 Frozen Contract Drift Verification",
    type: 'sequence',
    chart: `flowchart TD
    DocYaml["Frozen Spec: docs/phase2/openapi.yaml"]

    subgraph CI ["Automated Test Suite (tests/integration/contract.py)"]
        TestClient["Test API Request"] --> RealAPI["FastAPI App Route"]
        RealAPI --> LiveJSON["Live JSON Response"]
        LiveJSON --> Validator{"contract.py Validator"}
        DocYaml --> Validator
    end

    Validator -->|Matches Perfectly| Pass["✅ Build Passes"]
    Validator -->|Missing key / Wrong type / Extra field| Fail["❌ CI Build Fails Instantly"]`
  },
  '9-1': {
    title: "Startup Recovery Worker for Abandoned Ingestion Jobs",
    type: 'flowchart',
    chart: `flowchart TD
    A[Server Starts Up] --> B[Run recovery.recover_abandoned_runs]
    B --> C{Any Sync Jobs with finished_at = NULL?}
    C -- No --> D[Startup Continues]
    C -- Yes --> E[Tally up items already processed in database]
    E --> F[Stamp finished_at timestamp & Close Run]
    F --> G[Workspace Unlocked! User can sync again]
    G --> D
    D --> H[Start Web Server & Accept Traffic]`
  },
  '9-2': {
    title: "Single-Flight Model Loading & RAM Protection",
    type: 'sequence',
    chart: `sequenceDiagram
    autonumber
    actor Alice as User Alice
    actor Bob as User Bob
    participant Lock as Single-Flight Lock (_LOAD_LOCK)
    participant Memory as Server RAM (Model Cache)

    Alice->>Lock: Request 1: "Load AI Model"
    Note over Lock: Lock ACQUIRED by Alice
    Alice->>Memory: Loading 1.1 GB Model from disk (~23s)...
    
    Bob->>Lock: Request 2: "Load AI Model"
    Note over Lock: Bob WAITS at the door! (No 2nd copy loaded)
    
    Memory-->>Alice: Model Ready! (Stored in RAM Cache)
    Alice->>Lock: Releases Lock
    
    Lock-->>Bob: Lock Free! Check RAM Cache
    Bob->>Memory: Grabs cached model instantly (0.001s)`
  },
  '10-1': {
    title: "SHA-256 Difference Detection State Machine",
    type: 'state',
    chart: `stateDiagram-v2
    [*] --> CheckDisk: Scan Workspace Folder
    CheckDisk --> NEW: File on disk, but not in database
    CheckDisk --> CHANGED: File in database, but fingerprint or size changed
    CheckDisk --> UNCHANGED: Fingerprint and size match database exactly
    CheckDisk --> REMOVED: In database, but deleted from disk

    NEW --> ConvertAndIndex: Ingest completely
    CHANGED --> DeleteOldThenReindex: Wipe old passages, index new
    UNCHANGED --> DoNothing: Skip & keep current passages
    REMOVED --> DeletePassages: Remove passages from answers`
  },
  '10-2': {
    title: "The 4-Rung Format Conversion Ladder",
    type: 'flowchart',
    chart: `flowchart TD
    File[📄 Input Document] --> TypeCheck{File Type?}
    
    TypeCheck -->|PDF| PDFCheck{Is it locked?}
    PDFCheck -->|Password Protected| FailLock[❌ FAILED: Password Protected]
    PDFCheck -->|Readable| PyMuPDF[PyMuPDF4LLM: Extract Markdown]
    PyMuPDF --> TextLayerCheck{Has Text Layer?}
    TextLayerCheck -->|Yes| MarkdownOut[📝 Clean Markdown Output]
    TextLayerCheck -->|No: Scanned PDF| OCRGate{OCR Enabled & Page Count <= Cap?}
    OCRGate -->|Yes| Tesseract[👁️ Tesseract OCR per page] --> MarkdownOut
    OCRGate -->|No / Too Long| SkipOCR[⚠️ SKIPPED: Scanned image only]

    TypeCheck -->|Word .docx| DocxCheck{Valid ZIP + word/document.xml?}
    DocxCheck -->|Yes| MarkItDownDocx[MarkItDown: Convert to Markdown] --> MarkdownOut
    DocxCheck -->|No| FailDocx[❌ FAILED: Corrupted Word File]

    TypeCheck -->|PowerPoint .pptx| PptxCheck{Valid ZIP + ppt/presentation.xml?}
    PptxCheck -->|Yes| MarkItDownPptx[MarkItDown: Slides to Markdown]
    MarkItDownPptx --> SlideLabels[Convert HTML Slide Markers to # Slide N] --> MarkdownOut
    PptxCheck -->|No| FailPptx[❌ FAILED: Corrupted PPTX File]

    TypeCheck -->|TXT or MD| TextCheck{Valid UTF-8?}
    TextCheck -->|Yes| PassText[Direct Passthrough] --> MarkdownOut
    TextCheck -->|No| FailEnc[❌ FAILED: Invalid UTF-8 Encoding]`
  },
  '10-3': {
    title: "Dense Vector Embeddings & Mandatory E5 Prefixes",
    type: 'flowchart',
    chart: `flowchart LR
    subgraph Embeddings [Dense Vector Translation]
        Text1["'How to terminate a contract'"] -->|Add 'query: '| E5Model[intfloat/multilingual-e5-base]
        Text2["'Procedures for employee resignation'"] -->|Add 'passage: '| E5Model
        E5Model --> V1["Vector 1: [0.12, -0.84, ..., 0.45] (768 numbers)"]
        E5Model --> V2["Vector 2: [0.11, -0.82, ..., 0.43] (768 numbers)"]
        V1 <.->|High Cosine Similarity| V2
    end`
  },
  '11-1': {
    title: "LangGraph 9-Node Cyclic State Machine Flow",
    type: 'flowchart',
    chart: `flowchart TD
    classDef startNode fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,color:#01579b;
    classDef processNode fill:#ede7f6,stroke:#512da8,stroke-width:2px,color:#311b92;
    classDef decisionNode fill:#fff8e1,stroke:#f57f17,stroke-width:2px,color:#e65100;
    classDef endNode fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#1b5e20;
    classDef stopNode fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#b71c1c;

    Q([User Asks Question]):::startNode --> M[1. Summarize History<br/><i>Memory check</i>]:::processNode
    M --> R[2. Plan & Rewrite Query<br/><i>Split, translate, or detect confusion</i>]:::processNode
    
    R -->|Unclear Question| C([Ask Clarifying Question<br/><i>Pause & wait for user</i>]):::stopNode
    R -->|Clear Question| S[3. Hybrid Retrieval Engine<br/><i>Qdrant Dense + BM25 Sparse + RRF</i>]:::processNode
    
    S --> G{4. Relevance Grader<br/><i>Is this text useful?</i>}:::decisionNode
    
    G -->|Yes: Useful| P[5. Fetch Full Parent Sections<br/><i>Read whole article context</i>]:::processNode
    P --> A[6. Evidence Synthesis<br/><i>Write answer using ONLY cited text</i>]:::processNode
    A --> VERIFY{Faithfulness Check<br/><i>Supported by text?</i>}:::decisionNode
    
    VERIFY -->|Pass| FIN([Verified Answer + Source Cards]):::endNode
    VERIFY -->|Fail or NOT_COVERED| REF([Honest Refusal<br/><i>'I will not guess'</i>]):::stopNode
    
    G -->|No: Off-topic & Retries Left| RW[Reword Query<br/><i>Try new keywords</i>]:::processNode
    RW --> S
    
    G -->|No: Retries Spent| REF`
  },
  '11-2': {
    title: "Hybrid Search Relevance Grading & Reword Loop",
    type: 'flowchart',
    chart: `flowchart LR
    SearchPassages[Retrieved 500-char Chunks] --> Grader{"Relevance Grader<br/>(One word check)"}
    
    Grader -->|RELEVANT| Approved[Approved for Answering]
    Grader -->|OFF_TOPIC| RetryCheck{"Attempt count < 2?"}
    
    RetryCheck -->|Yes| Rewriter[Reword Prompt:<br/>New keywords & broader terms]
    Rewriter --> RetryingSearch[New Retrieval Pass]
    
    RetryCheck -->|No| RefuseTerminal["Honest Refusal:<br/>'I will not guess'"]`
  },
  '11-3': {
    title: "Hallucination Verification & Faithfulness Guardrail",
    type: 'flowchart',
    chart: `flowchart TD
    Ans[Draft Answer Generated] --> Judge[LLM-Judge Groundedness Evaluator]
    Passages[Sections Actually Read] --> Judge
    
    Judge --> Score{Score Claims vs Text}
    
    Score -->|Groundedness >= 0.90<br/>& No Unsupported Facts| Pass[Approved: Answer Released to User]
    Score -->|Contains Unsupported Facts<br/>or Hallucinations| Reject[Gate Rejection: Block Release / Trigger Refusal]`
  },
  '12-1': {
    title: "Frozen Golden Evaluation Benchmark Runner",
    type: 'flowchart',
    chart: `flowchart TD
    A[New Code or Prompt Change] --> B[Run 60-Question Exam: Golden Dataset]
    B --> C{Passes All Release Gates?}
    C -->|G1: >=90% Faithful Facts| D{Gate Check}
    C -->|G2: 100% Honest Refusals| D
    C -->|G3: 100% Real Citations| D
    C -->|G4, G5, G6: Fast & Stable| D
    D -->|YES: All Green| E[🚀 Release Approved to Users]
    D -->|NO: Even 1 Gate Fails| F[🛑 Release Blocked! Code Must Be Fixed]`
  },
  '12-2': {
    title: "The 3 Non-Negotiable Release Gates (G1, G2, G3)",
    type: 'flowchart',
    chart: `graph TD
    subgraph Operational Gates
        G4[⏱️ G4: Question Latency<br/>Target: Median < 20s<br/>Achieved: 8.3s]
        G5[📚 G5: Document Indexing<br/>Target: 200 pages < 10 mins<br/>Achieved: ~6.2 to 7.5 mins]
        G6[🎭 G6: Live Demo Rehearsals<br/>Target: >= 9 of 10 Clean Runs<br/>Safety: Recorded Backup Video]
    end`
  },
  '12-3': {
    title: "Locked Prompt Registry with Semantic Versioning",
    type: 'flowchart',
    chart: `graph LR
    subgraph Prompt Registry [prompts/ folder]
        P1[answer-writer/PROMPT.md<br/>Version: 0.1.0]
        P2[query-reword/PROMPT.md<br/>Version: 0.2.0]
        P3[relevance-grader/PROMPT.md<br/>Version: 0.1.0]
    end
    P1 -->|Loaded at Runtime| App[Sanad Core Engine]
    P2 -->|Loaded at Runtime| App
    P3 -->|Loaded at Runtime| App`
  },
  '13-1': {
    title: "Keycloak OpenID Connect OIDC Authorization Flow",
    type: 'sequence',
    chart: `sequenceDiagram
    autonumber
    actor User as 👤 User (Browser)
    participant Sanad as 🏢 Sanad App (Server)
    participant Keycloak as 🛡️ Keycloak (Identity Provider)
    participant DB as 💾 Sanad Database (SQLite)

    User->>Sanad: 1. Clicks "Sign in" (/auth/login)
    Sanad->>User: 2. Redirects to Keycloak with temporary security ticket (state & nonce)
    User->>Keycloak: 3. Types username & password
    Keycloak->>User: 4. Password valid! Sends user back with one-time code
    User->>Sanad: 5. Returns to Sanad (/auth/callback?code=...)
    Note over Sanad,Keycloak: Direct server-to-server connection (Back-Channel)
    Sanad->>Keycloak: 6. Trades one-time code for access token & user roles
    Sanad->>DB: 7. Saves user profile & active session hash
    Sanad->>User: 8. Gives secure session cookie & opens dashboard`
  },
  '13-2': {
    title: "4-Tier RBAC Role Hierarchy & Workspace Grants",
    type: 'architecture',
    chart: `graph TD
    subgraph Roles ["👑 The 3 Roles"]
        A["🔴 sanad-admin<br/>(System Administrator)"]
        C["🟡 sanad-curator<br/>(Content Manager)"]
        R["🟢 sanad-reader<br/>(Document Reader)"]
    end

    A -->|Includes all powers of| C
    C -->|Includes all powers of| R

    subgraph Powers ["⚡ What They Can Do"]
        A_powers["• Create, rename, delete workspaces<br/>• Give access grants to users<br/>• View security activity logs<br/>• Automatically sees ALL workspaces"]
        C_powers["• Upload documents<br/>• Delete documents<br/>• Run document Sync<br/>• (Only in workspaces granted to them)"]
        R_powers["• Ask questions in chat<br/>• Download source documents<br/>• Give answer feedback<br/>• (Only in workspaces granted to them)"]
    end

    A -.-> A_powers
    C -.-> C_powers
    R -.-> R_powers`
  },
  '14-1': {
    title: "Broken Object-Level Authorization (BOLA) Silent 404",
    type: 'flowchart',
    chart: `flowchart TD
    A[User Enters URL: /reports/secret-id] --> B{Does User Have Grant for this Workspace?}
    B -- YES --> C[200 OK: Show Report Detail]
    B -- NO --> D[404 Not Found: 'No Such Report']
    
    style D fill:#fbb,stroke:#d00,stroke-width:2px
    style C fill:#bfb,stroke:#090,stroke-width:2px`
  },
  '14-2': {
    title: "Upload Sanitization & Path Traversal Allowlist",
    type: 'flowchart',
    chart: `flowchart TD
    Upload[User Uploads File] --> CheckName[Check Filename for Bad Characters & Path Escapes]
    CheckName -- Contains ../ or Invalid Chars --> Error400[Reject 400 Bad Request]
    CheckName -- Clean Name --> CheckExt{Is Extension in Allowlist?}
    CheckExt -- NO .exe, .sh, etc. --> Error415[Reject 415 Unsupported Type]
    CheckExt -- YES .pdf, .docx, .txt --> TempWrite[Write to Hidden .part File]
    TempWrite --> AtomicSwap[Atomic os.replace to Final Folder]
    AtomicSwap --> Success[Saved Successfully 201]

    style Error400 fill:#fbb,stroke:#d00
    style Error415 fill:#fbb,stroke:#d00
    style Success fill:#bfb,stroke:#090`
  },
  '14-3': {
    title: "Moroccan Law 09-08 Personal Data Safeguards & Purge",
    type: 'flowchart',
    chart: `flowchart TD
    subgraph Moroccan Law 09-08 Safeguards
        Minimization[1. Data Minimization: Audit Logs Never Store Question Text]
        Expiry[2. Auto-Expiry: 30-Day Auto Sweep on Boot & Load]
        SelfDelete[3. Self-Service: User Can Delete All Chat History Anytime]
        AdminPurge[4. Admin Purge: Sign-Out Everywhere Wipes All History]
        RevokeClean[5. Revocation Clean: Losing Access Wipes Workspace Chat]
    end

    style Minimization fill:#e1f5fe,stroke:#0288d1
    style Expiry fill:#e1f5fe,stroke:#0288d1
    style SelfDelete fill:#e8f5e9,stroke:#388e3c
    style AdminPurge fill:#e8f5e9,stroke:#388e3c
    style RevokeClean fill:#e8f5e9,stroke:#388e3c`
  },
  '15-1': {
    title: "Core Application Stack (Python 3.12, uv, FastAPI)",
    type: 'flowchart',
    chart: `flowchart LR
    User([👤 User]) -->|1. Asks question| FastAPI[⚡ FastAPI Waiter]
    FastAPI -->|2. Hands off to| LangGraph[🔀 LangGraph Controller]
    LangGraph -->|3. Searches meaning| Qdrant[(🔍 Qdrant Vectors)]
    LangGraph -->|4. Reads full text| Disk[(📄 Files on Disk)]
    LangGraph -->|5. Logs audit history| SQLite[(🗄️ SQLite Database)]
    LangGraph -->|6. Sourced answer| FastAPI
    FastAPI -->|7. Shows answer with citations| User`
  },
  '15-2': {
    title: "Multi-Stage Docker Container Build Architecture",
    type: 'flowchart',
    chart: `flowchart TD
    subgraph Stage1["🏗️ Stage 1: Builder (Heavy)"]
        A[Python Base Image] --> B[Install uv tool]
        B --> C[Filter out GPU wheels]
        C --> D[Install CPU PyTorch & Packages]
        D --> E[Download & Bake AI Model Weights]
    end

    subgraph Stage2["🏠 Stage 2: Runtime (Lightweight & Clean)"]
        F[Fresh Minimal Python Image]
        G[Create unprivileged 'sanad' user]
    end

    E -.->|Copy ONLY finished packages & models| Stage2
    Stage2 --> H[📦 Final Production Container Image]`
  },
  '15-3': {
    title: "Railway Cloud Hosting with Persistent Volumes",
    type: 'sequence',
    chart: `sequenceDiagram
    autonumber
    participant D as 🐳 Docker Starts (as Root)
    participant E as 📜 docker-entrypoint.sh
    participant V as 💾 Disk Volume (/app/data)
    participant S as 👤 User 'sanad' (UID 10001)
    participant P as ⚡ Python app.py

    D->>E: Boot container
    Note over E: Check permissions safely
    E->>V: Fix file ownership to 'sanad'
    E->>S: Drop root privileges (setpriv)
    S->>V: Seed initial legal documents (race-safe)
    S->>P: Exec python app.py
    Note over P: Web server runs completely unprivileged!`
  },
  '16-1': {
    title: "Root Application Security & Architecture Gate",
    type: 'architecture',
    chart: `graph LR
    Browser[Web Browser] -->|HTTP Request| Gate[Security & Auth Gate]
    Gate -->|Valid Cookie?| RBAC[Role & Access Check]
    RBAC -->|Reader / Admin| Router[UI Routing & Screen Renderer]
    Router -->|Renders Jinja2| HTML[HTML Response + Arabic RTL Support]
    HTML -->|Delivered to| Browser`
  },
  '16-2': {
    title: "Sync Engine & Watchdog Background Lifecycles",
    type: 'flowchart',
    chart: `flowchart TB
    subgraph Client["User Browser (Desktop)"]
        UI["Web UI (HTML / CSS / JS)<br/>• French / English / Arabic (RTL)<br/>• Works without JavaScript"]
    end

    subgraph Server["Sanad Backend Application (FastAPI)"]
        direction TB
        App["app.py & ui/routing.py<br/>(Entrypoint & Route Dispatcher)"]
        
        subgraph Security["Security & Access Layer"]
            AuthGate["ui/auth_gate.py & ui/access_gate.py<br/>(Keycloak OIDC & RBAC)"]
            SecHeaders["ui/security_headers.py<br/>(CSP & Anti-Clickjacking)"]
        end

        subgraph Ingestion["Document Ingestion Engine"]
            Watcher["watcher.py<br/>(Folder Poller)"]
            Sync["sync.py<br/>(Sync Coordinator)"]
            Detect["change_detection.py<br/>(SHA-256 Hasher)"]
            Convert["conversion.py<br/>(PDF, DOCX, PPTX, OCR)"]
            Chunk["chunking.py<br/>(Parent/Child Splitter)"]
        end

        subgraph AgentGraph["Intelligent Answering Agent (LangGraph)"]
            Graph["agent/graph.py<br/>(9-Node State Machine)"]
            Query["agent/querying.py & agent/grading.py<br/>(Rewrite & Grade)"]
            Answer["agent/answering.py<br/>(Grounded Answer / Honest Refusal)"]
        end

        subgraph Storage["Storage & Persistence"]
            DB["db/repo.py & db/schema.sql<br/>(SQLite Database)"]
            VectorStore["vector_store.py<br/>(Qdrant Embedded Vectors)"]
            ParentStore["parent_store.py<br/>(Disk Parent Text Storage)"]
            Embed["embeddings.py<br/>(multilingual-e5-base)"]
        end
    end

    subgraph AuthServer["Identity Provider"]
        Keycloak["Keycloak Server<br/>(OIDC Realm)"]
    end

    UI <-->|HTTP / Cookie| App
    App --> Security
    Security <-->|OIDC Auth| Keycloak
    Security --> Ingestion
    Security --> AgentGraph
    
    Watcher -->|Trigger Change| Sync
    Sync --> Detect --> Convert --> Chunk --> Embed
    Embed --> VectorStore
    Chunk --> ParentStore
    Sync --> DB

    AgentGraph --> Query --> VectorStore
    AgentGraph --> ParentStore
    AgentGraph --> Answer --> UI
    AgentGraph --> DB`
  },
  '17-1': {
    title: "The Complete LangGraph Agent Reasoning Topology",
    type: 'flowchart',
    chart: `flowchart TD
    START([🚀 Start: User asks question]) --> SUMMARIZE[📝 Summarize: Recall past chat]
    SUMMARIZE --> REWRITE[✂️ Rewrite: Polish question & split into sub-searches]

    %% Branch 1: Is it clear?
    REWRITE -->|Question too vague| CLARIFY[❓ Clarify: Ask user 1 question]
    CLARIFY --> END_CLARIFY([🛑 Stop: Wait for user reply])

    %% Branch 2: Search
    REWRITE -->|Question is clear| RETRIEVE[🔎 Retrieve: Search child chunks]
    RETRIEVE --> GRADE[⚖️ Grade: Are these chunks relevant?]

    %% Branch 3: Grading outcome
    GRADE -->|✅ Yes, good passages| FETCH_PARENTS[📖 Fetch Parents: Read full sections]
    GRADE -->|❌ Off-topic & Retries left| REWORD[🔄 Reword: Try new search query]
    REWORD --> RETRIEVE
    GRADE -->|❌ Off-topic & Ceiling reached| REFUSE[⛔ Refuse: Honest failure]

    %% Branch 4: Parent reading check
    FETCH_PARENTS -->|Sections readable| ANSWER[✍️ Answer: Write answer with citations]
    FETCH_PARENTS -->|Zero sections readable| REFUSE

    ANSWER --> END_ANSWER([🏁 Final Answer with Sources])
    REFUSE --> END_REFUSE([🏁 Honest Refusal: No Guessing])`
  },
  '17-2': {
    title: "9 Assembly Workers & Immutable Prompt Recipes",
    type: 'flowchart',
    chart: `flowchart TD
    START([🚀 Start: User asks question]) --> SUMMARIZE[📝 Summarize: Recall past chat]
    SUMMARIZE --> REWRITE[✂️ Rewrite: Polish question & split into sub-searches]

    %% Branch 1: Is it clear?
    REWRITE -->|Question too vague| CLARIFY[❓ Clarify: Ask user 1 question]
    CLARIFY --> END_CLARIFY([🛑 Stop: Wait for user reply])

    %% Branch 2: Search
    REWRITE -->|Question is clear| RETRIEVE[🔎 Retrieve: Search child chunks]
    RETRIEVE --> GRADE[⚖️ Grade: Are these chunks relevant?]

    %% Branch 3: Grading outcome
    GRADE -->|✅ Yes, good passages| FETCH_PARENTS[📖 Fetch Parents: Read full sections]
    GRADE -->|❌ Off-topic & Retries left| REWORD[🔄 Reword: Try new search query]
    REWORD --> RETRIEVE
    GRADE -->|❌ Off-topic & Ceiling reached| REFUSE[⛔ Refuse: Honest failure]

    %% Branch 4: Parent reading check
    FETCH_PARENTS -->|Sections readable| ANSWER[✍️ Answer: Write answer with citations]
    FETCH_PARENTS -->|Zero sections readable| REFUSE

    ANSWER --> END_ANSWER([🏁 Final Answer with Sources])
    REFUSE --> END_REFUSE([🏁 Honest Refusal: No Guessing])`
  },
  '18-1': {
    title: "db/schema.sql Master Relational Entity-Relationship Diagram",
    type: 'er',
    chart: `erDiagram
    WORKSPACE ||--o{ DOCUMENT : "contains (CASCADE)"
    WORKSPACE ||--o{ SYNC_RUN : "has runs (CASCADE)"
    WORKSPACE ||--o{ EVAL_RUN : "has evaluations (CASCADE)"
    WORKSPACE ||--o{ ANSWER_FEEDBACK : "receives (CASCADE)"
    WORKSPACE ||--o{ WORKSPACE_GRANT : "grants access (CASCADE)"
    
    SYNC_RUN ||--o{ SYNC_ITEM : "lists items (CASCADE)"
    DOCUMENT ||--o{ SYNC_ITEM : "referenced in (SET NULL)"
    
    EVAL_RUN ||--o{ EVAL_RESULT : "per-question scores (CASCADE)"
    
    APP_USER ||--o{ USER_SESSION : "owns (CASCADE)"
    APP_USER ||--o{ WORKSPACE_GRANT : "granted to (CASCADE)"
    APP_USER ||--o{ ACTIVITY_EVENT : "logs (SET NULL)"

    WORKSPACE {
        string id PK
        string name UK
        string folder_path
        int legal_flag
        string created_at
    }

    DOCUMENT {
        string id PK
        string workspace_id FK
        string file_name
        string content_hash
        string status
    }

    SYNC_RUN {
        string id PK
        string workspace_id FK
        string started_at
        int added
        int changed
    }

    SYNC_ITEM {
        string id PK
        string sync_run_id FK
        string document_id FK
        string result
        string reason
    }`
  },
  '18-2': {
    title: "db/repo.py Strict Librarian Pattern Gateway",
    type: 'architecture',
    chart: `graph LR
    User[App Features / Screens] -->|Asks for data| Repo[db/repo.py <br/> <b>The Librarian</b>]
    Repo -->|Applies strict rules| SQLite[(db/schema.sql <br/> <b>The Filing Cabinet</b>)]
    SQLite -->|Returns clean data| Repo
    Repo -->|Hands back results| User
    
    style User fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    style Repo fill:#fff3e0,stroke:#f57c00,stroke-width:2px;
    style SQLite fill:#e8f5e9,stroke:#388e3c,stroke-width:2px;`
  },
  '19-1': {
    title: "Server-Rendered Jinja2 Templates & Asset Fingerprinting",
    type: 'flowchart',
    chart: `flowchart TD
    User([👤 User / Browser]) -->|Opens Website| Gate{"🚪 ui/access_gate.py<br/>(Is Staging Password On?)"}
    
    Gate -->|❌ Wrong or Missing| Lock["⛔ 401 Unauthorized<br/>(Ask for Password)"]
    Gate -->|✅ Pass or Local Dev| Router["🧭 FastAPI Web Server"]
    
    Router --> Static["🎨 ui/static/<br/>(sanad.css & sanad.js)"]
    Router --> CheckRTL["🔄 ui/rtl.py<br/>(Is this Arabic text?)"]
    Router --> ChatState["🧠 ui/conversation.py<br/>(Track Chat & Citations)"]
    
    CheckRTL -->|Sample Parent Text| Direction{"Majority Arabic?"}
    Direction -->|Yes| SetRTL["Flip Screen: dir='rtl' lang='ar'"]
    Direction -->|No| SetLTR["Normal Screen: dir='ltr' lang='en'"]
    
    SetRTL --> Templates["📄 ui/templates/<br/>(Jinja2 HTML Templates)"]
    SetLTR --> Templates
    ChatState --> Templates
    
    Templates -->|Bakes into one finished HTML page| Screen([🖥️ Finished Web Page on Screen])`
  },
  '19-2': {
    title: "Chat Session Memory & Sliding Window Buffer",
    type: 'flowchart',
    chart: `graph LR
    subgraph Memory Management
        Lock["🔒 Thread Lock"] --> Check["Double-Click Check"]
        Check -->|Single Task Only| Run["⚡ Active Query"]
    end

    subgraph Answer Variants
        Run --> Ans["✅ Answer<br/>(With Source Seals)"]
        Run --> Ref["🟨 Refusal<br/>(Honest 'I don't know')"]
        Run --> Clar["❓ Clarification<br/>('Did you mean X or Y?')"]
        Run --> Err["🟥 Error<br/>('Server broke')"]
    end`
  },
  '20-1': {
    title: "Automated Exam Proctor & Golden Evaluation Runner",
    type: 'flowchart',
    chart: `flowchart TD
    subgraph GoldenSet["📚 1. The Exam Paper (evaluation/golden/)"]
        Q_IN["40 In-Scope Questions\\n(Facts from Moroccan Labor Code)"]
        Q_OUT["20 Out-of-Scope Questions\\n(Near-miss trick questions to test honesty)"]
    end

    subgraph Runner["🏃 2. Taking the Exam (scripts/run_evaluation.py)"]
        LIVE_AI["Sanad RAG System\\n(Live Chat Model)"]
        JUDGE["AI Judge Scorer\\n(eval-judge prompt)"]
        REPORT["Dated Report Card\\n(JSON file in data/reports/)"]
        
        Q_IN --> LIVE_AI
        Q_OUT --> LIVE_AI
        LIVE_AI --> JUDGE
        JUDGE --> REPORT
    end

    subgraph Gate["🛡️ 3. The Bouncer (scripts/release_gate.py)"]
        G1{"G1: Groundedness\\n>= 90%?"}
        G2{"G2: Honest Refusals\\n100% (20/20)?"}
        G3{"G3: Citations\\n100% Sourced?"}
        PASS["✅ RELEASE PASS\\n(Code can ship!)"]
        FAIL["❌ RELEASE FAIL\\n(Release blocked & names failing IDs)"]

        REPORT --> G1
        G1 -- Yes --> G2
        G2 -- Yes --> G3
        G3 -- Yes --> PASS
        G1 -- No --> FAIL
        G2 -- No --> FAIL
        G3 -- No --> FAIL
    end`
  },
  '20-2': {
    title: "Testing Pyramid: Unit Tests vs. Release Gates",
    type: 'flowchart',
    chart: `graph LR
    subgraph UnitTests["🔬 Unit Tests (Isolated Lego Bricks)"]
        T1["test_chunking.py\\n(Does text cutter work?)"]
        T2["test_embeddings.py\\n(Does text-to-vector math work?)"]
        T3["test_access_gate.py\\n(Does password protection work?)"]
        T4["test_ui_contrast.py\\n(Are colors accessible?)"]
        T5["test_golden_set.py\\n(Did anyone tamper with the exam?)"]
    end`
  },
};
