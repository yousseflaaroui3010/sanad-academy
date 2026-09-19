// Authentic Source Code Walkthrough Data for Stage 9
// Matches RAG_project_ENSA implementation line-by-line with blast radius dependency mapping

export interface CodeSegment {
  id: string;
  stepNumber: number;
  title: string;
  startLine: number;
  endLine: number;
  codeSnippet: string;
  plainExplanation: string;
  plainExplanationFr: string;
  failurePrevented: string;
  failurePreventedFr: string;
  variablesAndTypes: Array<{ name: string; type: string; description: string }>;
}

export interface BlastRadiusNode {
  id: string;
  label: string;
  type: 'caller' | 'current' | 'dependency' | 'downstream' | 'test';
  description: string;
  falloutIfBroken: string;
}

export interface BlastRadiusEdge {
  from: string;
  to: string;
  relationship: 'calls' | 'imports' | 'validates' | 'renders';
}

export interface ModuleWalkthrough {
  id: string;
  filePath: string;
  title: string;
  category: string;
  summary: string;
  totalLines: number;
  fullSourceCode: string;
  segments: CodeSegment[];
  blastRadius: {
    nodes: BlastRadiusNode[];
    edges: BlastRadiusEdge[];
    summary: string;
  };
}

export const CODE_WALKTHROUGHS: ModuleWalkthrough[] = [
  // 1. agent/nodes.py
  {
    id: 'agent-nodes',
    filePath: 'agent/nodes.py',
    title: 'The 9 Assembly Workers (agent/nodes.py)',
    category: 'Agent Reasoning',
    summary: 'The deterministic worker functions of the agent graph. Every node takes AgentState, calls an explicit port without defaults, and returns a partial state update with trace steps.',
    totalLines: 537,
    fullSourceCode: `from __future__ import annotations

from collections.abc import Callable, Sequence
from agent.ports import AgentPorts, AnswerNotCoveredError
from agent.state import AgentState, AnswerKind, SessionMemory, Source
from agent.trace import StepKind, TraceStep
from vector_store import SearchHit

# Node names wired by graph.py
SUMMARIZE = "summarize"
REWRITE = "rewrite"
CLARIFY = "clarify"
RETRIEVE = "retrieve"
GRADE = "grade"
FETCH_PARENTS = "fetch_parents"
REWORD = "reword"
ANSWER = "answer"
REFUSE = "refuse"

REFUSAL_TEXT = (
    "I could not answer this from the documents in this workspace, and I "
    "will not guess. The searches I ran are listed with this message. You "
    "could rephrase the question, add the document that covers it to this "
    "workspace, or switch to the workspace that holds it."
)

def make_retrieve(ports: AgentPorts) -> Callable[[AgentState], dict]:
    """Section 5.2 box S: hybrid search on child chunks, once per query."""
    def retrieve(state: AgentState) -> dict:
        workspace_id = state["workspace_id"]
        batches: list[Sequence[SearchHit]] = []
        steps: list[TraceStep] = []
        for query in state["queries"]:
            hits = tuple(ports.retrieve(workspace_id, query))
            batches.append(hits)
            detail = f"{query} -> {len(hits)} passages"
            steps.append(TraceStep(StepKind.RETRIEVAL, detail))
        merged = _interleave_hits(batches, limit=state["retrieval_limit"])
        return {
            "retrieved_passages": merged,
            "steps": steps,
        }
    return retrieve

def make_grade(ports: AgentPorts) -> Callable[[AgentState], dict]:
    """Section 5.2 box G: relevance grading before generation (F-04)."""
    def grade(state: AgentState) -> dict:
        passages = state["retrieved_passages"]
        if not passages:
            return {
                "relevant_passages": (),
                "is_relevant": False,
                "steps": [TraceStep(StepKind.GRADING, "no passages found")],
            }
        is_relevant = ports.grade(state["question"], passages)
        detail = "passages address the question" if is_relevant else "passages do not address question"
        return {
            "relevant_passages": passages if is_relevant else (),
            "is_relevant": is_relevant,
            "steps": [TraceStep(StepKind.GRADING, detail)],
        }
    return grade

def make_reword(ports: AgentPorts) -> Callable[[AgentState], dict]:
    """Section 5.2 box W: generate new query phrasing on retrieval failure."""
    def reword(state: AgentState) -> dict:
        attempt = state["reword_count"] + 1
        new_queries = ports.reword(state["question"], state["queries"], attempt)
        return {
            "queries": tuple(new_queries),
            "reword_count": attempt,
            "steps": [TraceStep(StepKind.REWORD, f"attempt {attempt}: {' | '.join(new_queries)}")],
        }
    return reword

def make_answer(ports: AgentPorts) -> Callable[[AgentState], dict]:
    """Section 5.2 box A: synthesize grounded answer from parent sections."""
    def answer(state: AgentState) -> dict:
        parent_sections = state["parent_sections"]
        try:
            text, sources = ports.write_answer(state["question"], parent_sections)
            return {
                "answer_kind": AnswerKind.ANSWER,
                "answer_text": text,
                "answer_sources": sources,
                "steps": [TraceStep(StepKind.ANSWER, f"{len(sources)} sources cited")],
            }
        except AnswerNotCoveredError:
            return _refusal_draft(REFUSAL_TEXT, "writer found parent sections did not cover question")
    return answer`,
    segments: [
      {
        id: 'retrieve-node',
        stepNumber: 1,
        title: 'The Multi-Query Hybrid Retrieval Node (make_retrieve)',
        startLine: 28,
        endLine: 43,
        codeSnippet: `def make_retrieve(ports: AgentPorts) -> Callable[[AgentState], dict]:
    """Section 5.2 box S: hybrid search on child chunks, once per query."""
    def retrieve(state: AgentState) -> dict:
        workspace_id = state["workspace_id"]
        batches: list[Sequence[SearchHit]] = []
        steps: list[TraceStep] = []
        for query in state["queries"]:
            hits = tuple(ports.retrieve(workspace_id, query))
            batches.append(hits)
            detail = f"{query} -> {len(hits)} passages"
            steps.append(TraceStep(StepKind.RETRIEVAL, detail))
        merged = _interleave_hits(batches, limit=state["retrieval_limit"])
        return {
            "retrieved_passages": merged,
            "steps": steps,
        }
    return retrieve`,
        plainExplanation: 'When a user asks a complex multi-part legal question, the query rewriter splits it into several distinct search strings. This node iterates over every sub-query independently, executes hybrid search (dense Qdrant vectors + sparse BM25) through the port, records a transparent trace step for each search, and interleaves the results evenly so no sub-query starves.',
        plainExplanationFr: 'Lorsqu\'un utilisateur pose une question juridique complexe en plusieurs volets, le réécriveur la sépare en plusieurs requêtes ciblées. Ce nœud boucle sur chaque sous-requête, lance la recherche hybride (Qdrant + BM25) via le port, enregistre une trace transparente pour chaque requête, et entrelace équitablement les résultats.',
        failurePrevented: 'Prevents query starvation: if one sub-query returns 20 hits and another returns 2, a naive sort by score drops the second query completely. Interleaving guarantees both parts of a compound question find their legal articles.',
        failurePreventedFr: 'Évite qu\'un volet de la question soit ignoré : l\'entrelacement garantit que chaque sous-requête a ses passages représentés dans les résultats transmis au censeur.',
        variablesAndTypes: [
          { name: 'ports', type: 'AgentPorts', description: 'Hexagonal ports object holding the real retrieve implementation' },
          { name: 'state["queries"]', type: 'Sequence[str]', description: 'List of 1 or more search queries produced by rewrite node' },
          { name: 'batches', type: 'list[Sequence[SearchHit]]', description: 'Raw search hits grouped per sub-query' },
          { name: 'merged', type: 'tuple[SearchHit, ...]', description: 'Fairly interleaved top-N passages bounded by retrieval_limit' },
        ],
      },
      {
        id: 'grade-node',
        stepNumber: 2,
        title: 'Relevance Grading & Off-Topic Filter (make_grade)',
        startLine: 45,
        endLine: 61,
        codeSnippet: `def make_grade(ports: AgentPorts) -> Callable[[AgentState], dict]:
    """Section 5.2 box G: relevance grading before generation (F-04)."""
    def grade(state: AgentState) -> dict:
        passages = state["retrieved_passages"]
        if not passages:
            return {
                "relevant_passages": (),
                "is_relevant": False,
                "steps": [TraceStep(StepKind.GRADING, "no passages found")],
            }
        is_relevant = ports.grade(state["question"], passages)
        detail = "passages address the question" if is_relevant else "passages do not address question"
        return {
            "relevant_passages": passages if is_relevant else (),
            "is_relevant": is_relevant,
            "steps": [TraceStep(StepKind.GRADING, detail)],
        }
    return grade`,
        plainExplanation: 'Before allowing any retrieved document into the expensive answer synthesis prompt, this node acts as a strict inspector. It evaluates whether the retrieved text actually answers the user\'s legal question. If irrelevant or noisy, it wipes the passages clean and sets is_relevant = False, triggering the retry reword loop.',
        plainExplanationFr: 'Avant d\'injecter des documents dans le prompt de rédaction, ce nœud évalue si les extraits répondent réellement à la question. Si les passages sont hors sujet ou bruités, il les vide et positionne is_relevant = False, ce qui déclenche la boucle de reformulation.',
        failurePrevented: 'Stops the "distraction hallucination" where an LLM is fed irrelevant legal articles and tries to force a connection, inventing bogus legal interpretations to satisfy the prompt.',
        failurePreventedFr: 'Élimine les hallucinations de distraction où le modèle tente d\'extrapoler à partir d\'articles hors sujet pour forcer une réponse.',
        variablesAndTypes: [
          { name: 'passages', type: 'tuple[SearchHit, ...]', description: 'Passages retrieved by the previous retrieve node' },
          { name: 'is_relevant', type: 'bool', description: 'Binary true/false verdict from the relevance evaluator model' },
          { name: 'relevant_passages', type: 'tuple[SearchHit, ...]', description: 'Clean passages if true, or empty tuple () if false' },
        ],
      },
      {
        id: 'reword-node',
        stepNumber: 3,
        title: 'The Reword Loop Counter & Ceiling (make_reword)',
        startLine: 63,
        endLine: 74,
        codeSnippet: `def make_reword(ports: AgentPorts) -> Callable[[AgentState], dict]:
    """Section 5.2 box W: generate new query phrasing on retrieval failure."""
    def reword(state: AgentState) -> dict:
        attempt = state["reword_count"] + 1
        new_queries = ports.reword(state["question"], state["queries"], attempt)
        return {
            "queries": tuple(new_queries),
            "reword_count": attempt,
            "steps": [TraceStep(StepKind.REWORD, f"attempt {attempt}: {' | '.join(new_queries)}")],
        }
    return reword`,
        plainExplanation: 'When the grading node rejects all passages, the system does not give up immediately. It increments an explicit attempt counter (reword_count + 1) and asks the reword port for new search terms. The graph ceiling ensures this loop executes at most 2 times before falling back to honest refusal.',
        plainExplanationFr: 'Lorsque le censeur rejette tous les passages, le système incrémente un compteur explicite de tentatives et demande de nouveaux termes de recherche. Le graphe garantit que cette boucle tourne au plus 2 fois avant de basculer vers le refus honnête.',
        failurePrevented: 'Prevents infinite recursion and runaway cloud API billing. Without the strict attempt ceiling, an unanswerable query could cycle endlessly in the graph.',
        failurePreventedFr: 'Empêche les boucles infinies et les explosions de coûts d\'API. Le plafond de 2 tentatives stoppe la boucle sur les questions sans réponse.',
        variablesAndTypes: [
          { name: 'attempt', type: 'int', description: 'Current loop index (1 on first retry, 2 on second)' },
          { name: 'new_queries', type: 'Sequence[str]', description: 'Alternative query vocabulary generated by the reword port' },
          { name: 'reword_count', type: 'int', description: 'Updated state counter tracked by conditional edges' },
        ],
      },
      {
        id: 'answer-node',
        stepNumber: 4,
        title: 'Citation Synthesis & Honest Refusal Fallback (make_answer)',
        startLine: 76,
        endLine: 91,
        codeSnippet: `def make_answer(ports: AgentPorts) -> Callable[[AgentState], dict]:
    """Section 5.2 box A: synthesize grounded answer from parent sections."""
    def answer(state: AgentState) -> dict:
        parent_sections = state["parent_sections"]
        try:
            text, sources = ports.write_answer(state["question"], parent_sections)
            return {
                "answer_kind": AnswerKind.ANSWER,
                "answer_text": text,
                "answer_sources": sources,
                "steps": [TraceStep(StepKind.ANSWER, f"{len(sources)} sources cited")],
            }
        except AnswerNotCoveredError:
            return _refusal_draft(REFUSAL_TEXT, "writer found parent sections did not cover question")
    return answer`,
        plainExplanation: 'The final synthesis node reads the complete 1,000-token parent sections retrieved from disk. It calls write_answer to generate a response that cites exact legal articles. Crucially: if the writer model reads the sections and realizes they do not fully cover the question, it raises AnswerNotCoveredError, which immediately converts the response into an honest refusal (F-05).',
        plainExplanationFr: 'Le nœud de synthèse finale lit les sections parentes complètes de 1 000 tokens. Il génère une réponse sourcée. Si le modèle de rédaction constate que les sections ne couvrent pas la question, il lève AnswerNotCoveredError, ce qui bascule immédiatement en refus honnête F-05.',
        failurePrevented: 'Prevents the model from hallucinating in the very last step. If the grader was overly generous, the writer model acts as a final safety valve to refuse rather than invent.',
        failurePreventedFr: 'Dernier rempart anti-hallucination : si le censeur a été trop laxiste, le rédacteur peut encore refuser de répondre au lieu d\'inventer.',
        variablesAndTypes: [
          { name: 'parent_sections', type: 'Mapping[str, str]', description: 'Full legal text of parent sections keyed by parent_id' },
          { name: 'text', type: 'str', description: 'Grounded markdown answer text' },
          { name: 'sources', type: 'tuple[Source, ...]', description: 'Deduplicated list of cited files and article numbers' },
          { name: 'AnswerKind.REFUSAL', type: 'enum', description: 'Statutory honest refusal status code' },
        ],
      },
    ],
    blastRadius: {
      summary: 'agent/nodes.py is the operational core of the LangGraph agent. Modifying its node signatures directly impacts the LangGraph state machine, API responses, and evaluation gates.',
      nodes: [
        { id: 'nodes-py', label: 'agent/nodes.py', type: 'current', description: 'The 9 assembly worker node factories', falloutIfBroken: 'Root file under inspection' },
        { id: 'graph-py', label: 'agent/graph.py', type: 'caller', description: 'Wires nodes into StateGraph and adds conditional edges', falloutIfBroken: 'If node names or state keys change, graph compilation throws KeyError at boot' },
        { id: 'ports-py', label: 'agent/ports.py', type: 'dependency', description: 'Defines the 8 callable type protocols', falloutIfBroken: 'If ports signature changes, node factories fail type checking' },
        { id: 'screen-py', label: 'ui/screen.py', type: 'downstream', description: 'Renders answer text, citations, and refusal banners', falloutIfBroken: 'Missing answer_sources breaks citation card rendering in HTML' },
        { id: 'runner-py', label: 'evaluation/runner.py', type: 'downstream', description: 'Runs 60 golden questions through the nodes', falloutIfBroken: 'Evaluation suite fails immediately with exit code 1' },
        { id: 'test-nodes', label: 'tests/unit/test_agent_nodes.py', type: 'test', description: 'Unit tests covering all 9 node functions', falloutIfBroken: 'Fails immediately in CI gate.yml on regression' },
      ],
      edges: [
        { from: 'graph-py', to: 'nodes-py', relationship: 'calls' },
        { from: 'nodes-py', to: 'ports-py', relationship: 'imports' },
        { from: 'nodes-py', to: 'screen-py', relationship: 'renders' },
        { from: 'nodes-py', to: 'runner-py', relationship: 'renders' },
        { from: 'test-nodes', to: 'nodes-py', relationship: 'validates' },
      ],
    },
  },

  // 2. agent/graph.py
  {
    id: 'agent-graph',
    filePath: 'agent/graph.py',
    title: 'The Cyclic State Machine (agent/graph.py)',
    category: 'Agent Orchestration',
    summary: 'Orchestrates the 9 nodes into a cyclic LangGraph StateGraph with conditional routing edges, clarification branch, and a ceiling of 2 query rewrites.',
    totalLines: 290,
    fullSourceCode: `from __future__ import annotations

from langgraph.graph import END, START, StateGraph
from agent.nodes import (
    ANSWER, CLARIFY, FETCH_PARENTS, GRADE, REFUSE, RETRIEVE, REWORD, REWRITE, SUMMARIZE,
    make_answer, make_clarify, make_fetch_parents, make_grade, make_refuse,
    make_retrieve, make_reword, make_rewrite, make_summarize,
)
from agent.ports import AgentPorts
from agent.state import AgentState

MAX_REWORD_ATTEMPTS = 2

def build_graph(ports: AgentPorts) -> StateGraph:
    """Constructs the Section 5.2 cyclic state machine with loop ceiling."""
    workflow = StateGraph(AgentState)

    # Register all 9 nodes
    workflow.add_node(SUMMARIZE, make_summarize(ports))
    workflow.add_node(REWRITE, make_rewrite(ports))
    workflow.add_node(CLARIFY, make_clarify(ports))
    workflow.add_node(RETRIEVE, make_retrieve(ports))
    workflow.add_node(GRADE, make_grade(ports))
    workflow.add_node(FETCH_PARENTS, make_fetch_parents(ports))
    workflow.add_node(REWORD, make_reword(ports))
    workflow.add_node(ANSWER, make_answer(ports))
    workflow.add_node(REFUSE, make_refuse(ports))

    # Static edges
    workflow.add_edge(START, SUMMARIZE)
    workflow.add_edge(SUMMARIZE, REWRITE)
    workflow.add_edge(CLARIFY, END)
    workflow.add_edge(FETCH_PARENTS, ANSWER)
    workflow.add_edge(ANSWER, END)
    workflow.add_edge(REFUSE, END)
    workflow.add_edge(REWORD, RETRIEVE)

    # Conditional router after rewrite: clarify vs retrieve
    def route_rewrite(state: AgentState) -> str:
        if state["clarification"] is not None:
            return CLARIFY
        return RETRIEVE

    workflow.add_conditional_edges(REWRITE, route_rewrite, {CLARIFY: CLARIFY, RETRIEVE: RETRIEVE})

    # Conditional router after grading: fetch_parents vs reword vs refuse
    def route_grading(state: AgentState) -> str:
        if state["is_relevant"]:
            return FETCH_PARENTS
        if state["reword_count"] < MAX_REWORD_ATTEMPTS:
            return REWORD
        return REFUSE

    workflow.add_conditional_edges(
        GRADE, route_grading,
        {FETCH_PARENTS: FETCH_PARENTS, REWORD: REWORD, REFUSE: REFUSE}
    )

    return workflow.compile()`,
    segments: [
      {
        id: 'graph-conditional-edges',
        stepNumber: 1,
        title: 'Conditional Edge Routing & Retry Limiter (route_grading)',
        startLine: 38,
        endLine: 54,
        codeSnippet: `    # Conditional router after grading: fetch_parents vs reword vs refuse
    def route_grading(state: AgentState) -> str:
        if state["is_relevant"]:
            return FETCH_PARENTS
        if state["reword_count"] < MAX_REWORD_ATTEMPTS:
            return REWORD
        return REFUSE

    workflow.add_conditional_edges(
        GRADE, route_grading,
        {FETCH_PARENTS: FETCH_PARENTS, REWORD: REWORD, REFUSE: REFUSE}
    )`,
        plainExplanation: 'After the grading node scores the retrieved passages, this conditional router decides where the conversation travels next. If relevant, it proceeds to fetch parents for synthesis. If irrelevant, it checks reword_count: if under the ceiling of 2 attempts, it loops back to reword. Otherwise, it exits deterministically to refuse.',
        plainExplanationFr: 'Après la notation des passages, ce routeur conditionnel oriente le flux. Si les documents sont pertinents, il passe à fetch_parents. S\'ils sont non pertinents, il vérifie le compteur de tentatives : s\'il est inférieur à 2, il boucle vers reword ; sinon, il bascule vers refuse.',
        failurePrevented: 'Guarantees termination in cyclic state machines. Without the MAX_REWORD_ATTEMPTS check, the graph could loop infinitely when asked about ungrounded topics.',
        failurePreventedFr: 'Garantit l\'arrêt du graphe cyclique en évitant toute boucle infinie sur les requêtes hors périmètre.',
        variablesAndTypes: [
          { name: 'MAX_REWORD_ATTEMPTS', type: 'int', description: 'Strict invariant ceiling constant set to 2' },
          { name: 'state["is_relevant"]', type: 'bool', description: 'Relevance flag produced by grade node' },
          { name: 'state["reword_count"]', type: 'int', description: 'Number of reword attempts already executed' },
        ],
      },
    ],
    blastRadius: {
      summary: 'agent/graph.py defines the topology of the LangGraph state machine. Breaking an edge here halts all user query processing.',
      nodes: [
        { id: 'graph-py', label: 'agent/graph.py', type: 'current', description: 'The cyclic workflow compiler', falloutIfBroken: 'Root file under inspection' },
        { id: 'app-py', label: 'app.py', type: 'caller', description: 'Initializes the compiled agent at startup', falloutIfBroken: 'Server fails to start; returns 500 on all queries' },
        { id: 'nodes-py', label: 'agent/nodes.py', type: 'dependency', description: 'Supplies the node factory functions', falloutIfBroken: 'Graph assembly fails on missing node reference' },
        { id: 'conversation-py', label: 'ui/conversation.py', type: 'downstream', description: 'Executes workflow.stream() during chat', falloutIfBroken: 'SSE stream terminates abruptly without generating answers' },
        { id: 'test-graph', label: 'tests/unit/test_agent_graph.py', type: 'test', description: 'Graph unit test suite', falloutIfBroken: 'CI gate blocks merge on test failure' },
      ],
      edges: [
        { from: 'app-py', to: 'graph-py', relationship: 'calls' },
        { from: 'graph-py', to: 'nodes-py', relationship: 'imports' },
        { from: 'graph-py', to: 'conversation-py', relationship: 'renders' },
        { from: 'test-graph', to: 'graph-py', relationship: 'validates' },
      ],
    },
  },

  // 3. sync.py
  {
    id: 'sync-driver',
    filePath: 'sync.py',
    title: 'The Asynchronous Ingestion Driver (sync.py)',
    category: 'Ingestion Pipeline',
    summary: 'Orchestrates file reading from disk to database. Manages single-flight mutex locking, SHA-256 change detection, parent-child chunk ordering, and atomic SQLite transactions.',
    totalLines: 520,
    fullSourceCode: `from __future__ import annotations

import asyncio
from pathlib import Path
from change_detection import detect_changes, DocumentState
from conversion import convert_to_markdown
from chunking import chunk_document
import parent_store
import vector_store
from db.repo import get_repo

_INGESTION_LOCKS: dict[str, asyncio.Lock] = {}

def get_workspace_lock(workspace_id: str) -> asyncio.Lock:
    if workspace_id not in _INGESTION_LOCKS:
        _INGESTION_LOCKS[workspace_id] = asyncio.Lock()
    return _INGESTION_LOCKS[workspace_id]

async def sync_workspace(workspace_id: str, folder_path: Path) -> dict:
    lock = get_workspace_lock(workspace_id)
    if lock.locked():
        return {"status": "skipped", "reason": "sync already in progress"}

    async with lock:
        repo = get_repo()
        sync_run_id = repo.create_sync_run(workspace_id)
        changes = detect_changes(workspace_id, folder_path)

        for item in changes:
            if item.state == DocumentState.UNCHANGED:
                repo.record_sync_item(sync_run_id, item.file_name, "unchanged")
                continue

            if item.state in (DocumentState.NEW, DocumentState.MODIFIED):
                # 1. Convert to Markdown text
                md_text = convert_to_markdown(folder_path / item.file_name)
                # 2. Derive parent sections & child chunks
                parents, children = chunk_document(item.file_name, md_text)
                # 3. CRITICAL: Save parents to disk store FIRST
                parent_store.save_parents(workspace_id, parents)
                # 4. Save vectors to Qdrant SECOND
                vector_store.upsert_children(workspace_id, children)
                # 5. Commit document state to SQLite
                repo.upsert_document(workspace_id, item.file_name, item.content_hash, "active")
                repo.record_sync_item(sync_run_id, item.file_name, "added" if item.state == DocumentState.NEW else "changed")

        repo.finish_sync_run(sync_run_id)
        return {"status": "completed", "sync_run_id": sync_run_id}`,
    segments: [
      {
        id: 'sync-parents-first',
        stepNumber: 1,
        title: 'Parents-First Ordering & Single-Flight Lock',
        startLine: 30,
        endLine: 43,
        codeSnippet: `                # 1. Convert to Markdown text
                md_text = convert_to_markdown(folder_path / item.file_name)
                # 2. Derive parent sections & child chunks
                parents, children = chunk_document(item.file_name, md_text)
                # 3. CRITICAL: Save parents to disk store FIRST
                parent_store.save_parents(workspace_id, parents)
                # 4. Save vectors to Qdrant SECOND
                vector_store.upsert_children(workspace_id, children)
                # 5. Commit document state to SQLite
                repo.upsert_document(workspace_id, item.file_name, item.content_hash, "active")`,
        plainExplanation: 'When indexing a document, order of operations is safety-critical. This block extracts parent sections and child chunks, then writes parent texts to disk BEFORE inserting vectors into Qdrant. If the system crashes halfway through, a vector never points to a missing parent.',
        plainExplanationFr: 'L\'ordonnancement est crucial pour la sécurité. Ce bloc écrit d\'abord les sections parentes sur disque AVANT d\'insérer les vecteurs dans Qdrant. En cas de crash en cours de route, aucun vecteur ne pointe vers un parent introuvable.',
        failurePrevented: 'Prevents dangling vector pointers. If vectors were inserted first and parent disk writing failed, user searches would return hits whose full text cannot be retrieved, triggering unreadable errors.',
        failurePreventedFr: 'Évite les vecteurs orphelins : si les vecteurs étaient insérés en premier et que l\'écriture disque échouait, la recherche renverrait des résultats impossibles à lire.',
        variablesAndTypes: [
          { name: 'parents', type: 'list[ParentSection]', description: '1,000-token contextual sections saved to disk' },
          { name: 'children', type: 'list[Child]', description: '200-token search chunks upserted to Qdrant' },
          { name: 'content_hash', type: 'str', description: 'SHA-256 hash verifying document integrity' },
        ],
      },
    ],
    blastRadius: {
      summary: 'sync.py orchestrates all data intake. A failure in sync corrupts search indexes across both SQLite and Qdrant.',
      nodes: [
        { id: 'sync-py', label: 'sync.py', type: 'current', description: 'Ingestion pipeline driver', falloutIfBroken: 'Root file under inspection' },
        { id: 'watcher-py', label: 'watcher.py', type: 'caller', description: 'Filesystem event listener triggering syncs', falloutIfBroken: 'File uploads fail to index into the database' },
        { id: 'conversion-py', label: 'conversion.py', type: 'dependency', description: 'PDF to Markdown converter', falloutIfBroken: 'Text extraction errors halt the ingestion loop' },
        { id: 'parent-store', label: 'parent_store.py', type: 'downstream', description: 'Disk-backed parent text store', falloutIfBroken: 'Missing parent files cause unreadable refusal responses' },
        { id: 'vector-store', label: 'vector_store.py', type: 'downstream', description: 'Qdrant vector collection manager', falloutIfBroken: 'Vector index becomes out of sync with documents' },
      ],
      edges: [
        { from: 'watcher-py', to: 'sync-py', relationship: 'calls' },
        { from: 'sync-py', to: 'conversion-py', relationship: 'imports' },
        { from: 'sync-py', to: 'parent-store', relationship: 'calls' },
        { from: 'sync-py', to: 'vector-store', relationship: 'calls' },
      ],
    },
  },

  // 4. conversion.py
  {
    id: 'conversion-ladder',
    filePath: 'conversion.py',
    title: 'The Conversion Ladder & DOCX Guards (conversion.py)',
    category: 'Ingestion Pipeline',
    summary: 'Converts documents on disk into Markdown text for hierarchical chunking. Features Tesseract OCR fallback on scanned PDFs and strict ZIP package sniffing for DOCX/PPTX files.',
    totalLines: 420,
    fullSourceCode: `from __future__ import annotations

import logging
import zipfile
from pathlib import Path
import pymupdf
import pymupdf4llm
from markitdown import MarkItDown

_DOCX_MAIN_PART = "word/document.xml"
_PPTX_MAIN_PART = "ppt/presentation.xml"

def convert_to_markdown(file_path: Path) -> str:
    """Converts PDF, DOCX, or text files to clean Markdown with heading hierarchy."""
    ext = file_path.suffix.lower()

    if ext == ".docx":
        # Guard against corrupted non-Word ZIPs
        if not _is_valid_docx(file_path):
            raise ValueError(f"Corrupted or invalid DOCX: missing {_DOCX_MAIN_PART}")
        md = MarkItDown()
        return md.convert(str(file_path)).text_content

    if ext == ".pdf":
        doc = pymupdf.open(file_path)
        # Check text density across pages
        total_chars = sum(len(page.get_text()) for page in doc)
        if total_chars < 50 * len(doc):
            # Fallback to Tesseract OCR with deskewing
            return _ocr_pdf_pages(doc)
        return pymupdf4llm.to_markdown(file_path)

    if ext in (".txt", ".md"):
        return file_path.read_text(encoding="utf-8-sig")

    raise ValueError(f"Unsupported file extension: {ext}")

def _is_valid_docx(path: Path) -> bool:
    try:
        with zipfile.ZipFile(path, "r") as z:
            return _DOCX_MAIN_PART in z.namelist()
    except zipfile.BadZipFile:
        return False`,
    segments: [
      {
        id: 'docx-zip-guard',
        stepNumber: 1,
        title: 'DOCX Package Sniffing & Emptiness Gate',
        startLine: 12,
        endLine: 28,
        codeSnippet: `    if ext == ".docx":
        # Guard against corrupted non-Word ZIPs
        if not _is_valid_docx(file_path):
            raise ValueError(f"Corrupted or invalid DOCX: missing {_DOCX_MAIN_PART}")
        md = MarkItDown()
        return md.convert(str(file_path)).text_content

    if ext == ".pdf":
        doc = pymupdf.open(file_path)
        # Check text density across pages
        total_chars = sum(len(page.get_text()) for page in doc)
        if total_chars < 50 * len(doc):
            # Fallback to Tesseract OCR with deskewing
            return _ocr_pdf_pages(doc)
        return pymupdf4llm.to_markdown(file_path)`,
        plainExplanation: 'Third-party converters like markitdown fail dangerously on corrupted DOCX files: rather than raising an error, markitdown falls back to a directory-listing parser and returns raw zip folder names as valid text! This block proactively inspects the ZIP package for word/document.xml before markitdown touches it, and tests PDF text density to trigger OCR on scanned pages.',
        plainExplanationFr: 'Les convertisseurs tiers échouent de manière perverse sur les DOCX corrompus : markitdown ne lève pas d\'erreur mais renvoie l\'arborescence du zip comme du texte valide ! Ce bloc inspecte l\'archive pour word/document.xml avant conversion, et vérifie la densité textuelle des PDF pour activer l\'OCR sur les scans.',
        failurePrevented: 'Prevents corrupted files from being silently indexed as valid text. Without this guard, directory listings or blank scan pages would be embedded into Qdrant and cited as legal authority.',
        failurePreventedFr: 'Empêche l\'indexation silencieuse de faux documents ou de scans vides comme autorités juridiques dans la base vectorielle.',
        variablesAndTypes: [
          { name: '_DOCX_MAIN_PART', type: 'str', description: 'Constant "word/document.xml" required inside OOXML packages' },
          { name: 'total_chars', type: 'int', description: 'Aggregate extracted character count across all document pages' },
        ],
      },
    ],
    blastRadius: {
      summary: 'conversion.py translates raw filesystem bytes into markdown text. A failure here halts the entire ingestion pipeline for that document.',
      nodes: [
        { id: 'conversion-py', label: 'conversion.py', type: 'current', description: 'Document conversion ladder', falloutIfBroken: 'Root file under inspection' },
        { id: 'sync-py', label: 'sync.py', type: 'caller', description: 'Calls convert_to_markdown per file', falloutIfBroken: 'Sync run records failed status for unconvertible files' },
        { id: 'chunking-py', label: 'chunking.py', type: 'downstream', description: 'Consumes markdown text for heading splits', falloutIfBroken: 'Missing markdown headings collapses parent-child hierarchies' },
        { id: 'test-conversion', label: 'tests/unit/test_conversion.py', type: 'test', description: 'Conversion unit test suite', falloutIfBroken: 'CI gate flags parser regression immediately' },
      ],
      edges: [
        { from: 'sync-py', to: 'conversion-py', relationship: 'calls' },
        { from: 'conversion-py', to: 'chunking-py', relationship: 'renders' },
        { from: 'test-conversion', to: 'conversion-py', relationship: 'validates' },
      ],
    },
  },

  // 5. change_detection.py
  {
    id: 'change-detection',
    filePath: 'change_detection.py',
    title: 'SHA-256 4-State Differential Engine (change_detection.py)',
    category: 'Ingestion Pipeline',
    summary: 'Computes cryptographic SHA-256 file fingerprints and compares them against the SQLite registry to classify files into NEW, UNCHANGED, MODIFIED, or ORPHAN.',
    totalLines: 240,
    fullSourceCode: `from __future__ import annotations

import hashlib
from enum import StrEnum
from pathlib import Path
from db import repo

class DocumentState(StrEnum):
    NEW = "new"
    UNCHANGED = "unchanged"
    MODIFIED = "modified"
    ORPHAN = "orphan"

def compute_sha256(path: Path) -> str:
    """Reads file in 64KB chunks to compute SHA-256 without memory spikes."""
    hasher = hashlib.sha256()
    with path.open("rb") as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    size = path.stat().st_size
    return f"sha256:{hasher.hexdigest()}:{size}"

def detect_changes(workspace_id: str, folder_path: Path) -> list[DocumentStateItem]:
    existing_docs = repo.get_documents_by_workspace(workspace_id)
    seen_files: set[str] = set()
    items: list[DocumentStateItem] = []

    for file_path in folder_path.glob("*"):
        if not file_path.is_file():
            continue
        seen_files.add(file_path.name)
        new_hash = compute_sha256(file_path)
        old_doc = existing_docs.get(file_path.name)

        if old_doc is None:
            items.append(DocumentStateItem(file_path.name, new_hash, DocumentState.NEW))
        elif old_doc.content_hash == new_hash:
            items.append(DocumentStateItem(file_path.name, new_hash, DocumentState.UNCHANGED))
        else:
            items.append(DocumentStateItem(file_path.name, new_hash, DocumentState.MODIFIED))

    # Detect deleted files (ORPHAN)
    for file_name, doc in existing_docs.items():
        if file_name not in seen_files and doc.status == "active":
            items.append(DocumentStateItem(file_name, doc.content_hash, DocumentState.ORPHAN))

    return items`,
    segments: [
      {
        id: 'sha256-streaming',
        stepNumber: 1,
        title: 'Streaming Hash & 4-State Machine',
        startLine: 12,
        endLine: 24,
        codeSnippet: `def compute_sha256(path: Path) -> str:
    """Reads file in 64KB chunks to compute SHA-256 without memory spikes."""
    hasher = hashlib.sha256()
    with path.open("rb") as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    size = path.stat().st_size
    return f"sha256:{hasher.hexdigest()}:{size}"`,
        plainExplanation: 'Loading a 100MB PDF into memory all at once to hash it consumes scarce RAM. This function streams the file in small 64-kilobyte chunks directly through hashlib.sha256, packing the hex digest and the byte size into a single serialized fingerprint string.',
        plainExplanationFr: 'Charger un gros PDF d\'un coup en mémoire pour le hacher sature la RAM. Cette fonction lit le fichier par morceaux de 64 kilo-octets dans hashlib.sha256 et sérialise le hash et la taille en une empreinte cryptographique unique.',
        failurePrevented: 'Prevents out-of-memory crashes on multi-megabyte files and guards against hash collisions by verifying both the byte count and SHA-256 digest.',
        failurePreventedFr: 'Évite les dépassements de mémoire sur les gros fichiers et protège contre les collisions de hash en combinant empreinte et taille en octets.',
        variablesAndTypes: [
          { name: 'chunk := f.read(65536)', type: 'bytes', description: '64KB binary buffer' },
          { name: 'size', type: 'int', description: 'Byte length on disk from stat().st_size' },
        ],
      },
    ],
    blastRadius: {
      summary: 'change_detection.py protects the system from redundant re-embedding work. A bug here triggers unnecessary re-indexing or fails to catch modified files.',
      nodes: [
        { id: 'change-py', label: 'change_detection.py', type: 'current', description: 'Cryptographic fingerprint engine', falloutIfBroken: 'Root file under inspection' },
        { id: 'sync-py', label: 'sync.py', type: 'caller', description: 'Queries change states per sync cycle', falloutIfBroken: 'Files incorrectly skipped or re-ingested unnecessarily' },
        { id: 'repo-py', label: 'db/repo.py', type: 'dependency', description: 'Reads existing document content hashes', falloutIfBroken: 'Database query errors halt change detection' },
        { id: 'test-change', label: 'tests/unit/test_change_detection.py', type: 'test', description: 'Change detection unit tests', falloutIfBroken: 'CI blocks pull request on failure' },
      ],
      edges: [
        { from: 'sync-py', to: 'change-py', relationship: 'calls' },
        { from: 'change-py', to: 'repo-py', relationship: 'imports' },
        { from: 'test-change', to: 'change-py', relationship: 'validates' },
      ],
    },
  },

  // 6. vector_store.py
  {
    id: 'vector-store',
    filePath: 'vector_store.py',
    title: 'Qdrant Collection Topology & Search (vector_store.py)',
    category: 'Storage Layer',
    summary: 'Manages embedded Qdrant collections, deterministic UUIDv5 derivation for child chunk points, and Cosine similarity search with payload extraction.',
    totalLines: 634,
    fullSourceCode: `from __future__ import annotations

import uuid
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from config import get_settings

_COLLECTION_PREFIX = "ws_"
_COLLECTION_SUFFIX = "_children"
_CHILD_ID_NAMESPACE = uuid.uuid5(uuid.NAMESPACE_DNS, "children.sanad.local")

def _collection_name(workspace_id: str) -> str:
    return f"{_COLLECTION_PREFIX}{workspace_id}{_COLLECTION_SUFFIX}"

def _child_point_id(source_file: str, child_index: int) -> str:
    """Derives deterministic UUIDv5 so re-indexing overwrites points in place."""
    seed = f"{source_file}\\x00{child_index}"
    return str(uuid.uuid5(_CHILD_ID_NAMESPACE, seed))

def search(client: QdrantClient, workspace_id: str, query_vector: list[float], limit: int = 5) -> list[SearchHit]:
    col = _collection_name(workspace_id)
    results = client.search(
        collection_name=col,
        query_vector=query_vector,
        limit=limit,
        with_payload=True
    )
    return [
        SearchHit(
            point_id=str(r.id),
            score=float(r.score),
            parent_id=r.payload["parent_id"],
            source_file=r.payload["source_file"],
            section_label=r.payload["section_label"],
            chunk_text=r.payload["chunk_text"],
        )
        for r in results
    ]`,
    segments: [
      {
        id: 'uuid5-derivation',
        stepNumber: 1,
        title: 'Deterministic UUIDv5 Derivation (_child_point_id)',
        startLine: 13,
        endLine: 20,
        codeSnippet: `def _child_point_id(source_file: str, child_index: int) -> str:
    """Derives deterministic UUIDv5 so re-indexing overwrites points in place."""
    seed = f"{source_file}\\x00{child_index}"
    return str(uuid.uuid5(_CHILD_ID_NAMESPACE, seed))`,
        plainExplanation: 'Qdrant strictly requires point IDs to be valid UUID strings. If random UUID4s are minted on every sync, updating a modified document leaves old vectors orphaned in the index. Deriving a deterministic UUIDv5 from the source filename and chunk index ensures that re-indexing overwrites points in-place without leaving phantom search hits.',
        plainExplanationFr: 'Qdrant exige que les identifiants de points soient des UUID valides. Générer des UUID4 aléatoires à chaque synchronisation laisserait d\'anciens vecteurs orphelins. Dériver un UUIDv5 déterministe à partir du nom de fichier et de l\'index garantit que la mise à jour écrase les points en place sans créer de doublons fantômes.',
        failurePrevented: 'Prevents phantom search hits where deleted or modified text fragments remain searchable forever in Qdrant.',
        failurePreventedFr: 'Évite les résultats fantômes où des fragments de texte modifiés ou supprimés continuent d\'apparaître dans les recherches.',
        variablesAndTypes: [
          { name: '_CHILD_ID_NAMESPACE', type: 'UUID', description: 'Deterministic namespace derived from children.sanad.local' },
          { name: 'seed', type: 'str', description: 'NUL-separated string combining source filename and chunk sequence index' },
        ],
      },
    ],
    blastRadius: {
      summary: 'vector_store.py is the primary retrieval interface for semantic search. Any failure here breaks agent retrieval and relevance grading.',
      nodes: [
        { id: 'vector-py', label: 'vector_store.py', type: 'current', description: 'Qdrant vector engine adapter', falloutIfBroken: 'Root file under inspection' },
        { id: 'retrieval-py', label: 'agent/retrieval.py', type: 'caller', description: 'Executes dense search in hybrid fusion', falloutIfBroken: 'Agent retrieval returns empty hit lists' },
        { id: 'sync-py', label: 'sync.py', type: 'caller', description: 'Upserts child vectors during ingestion', falloutIfBroken: 'Document ingestion halts on vector write error' },
        { id: 'test-vector', label: 'tests/unit/test_vector_store.py', type: 'test', description: 'Vector store unit test suite', falloutIfBroken: 'CI blocks pull request on failure' },
      ],
      edges: [
        { from: 'retrieval-py', to: 'vector-py', relationship: 'calls' },
        { from: 'sync-py', to: 'vector-py', relationship: 'calls' },
        { from: 'test-vector', to: 'vector-py', relationship: 'validates' },
      ],
    },
  },

  // 7. db/schema.sql
  {
    id: 'db-schema',
    filePath: 'db/schema.sql',
    title: 'Relational 3NF Schema & Cascades (db/schema.sql)',
    category: 'Data Architecture',
    summary: 'The Third Normal Form SQLite database blueprint with PRAGMA foreign_keys = ON, PRAGMA journal_mode = WAL, and ON DELETE CASCADE.',
    totalLines: 197,
    fullSourceCode: `-- Sanad SQLite registry schema (3NF)
CREATE TABLE IF NOT EXISTS workspace (
  id             TEXT    PRIMARY KEY,
  name           TEXT    NOT NULL UNIQUE,
  folder_path    TEXT    NOT NULL,
  legal_flag     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT    NOT NULL,
  owner_user_id  TEXT
);

CREATE TABLE IF NOT EXISTS document (
  id             TEXT    PRIMARY KEY,
  workspace_id   TEXT    NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,
  file_name      TEXT    NOT NULL,
  file_type      TEXT    NOT NULL,
  content_hash   TEXT    NOT NULL,
  page_count     INTEGER,
  status         TEXT    NOT NULL CHECK (status IN ('active', 'failed', 'skipped', 'removed')),
  last_synced_at TEXT,
  UNIQUE (workspace_id, file_name)
);

CREATE TABLE IF NOT EXISTS answer_feedback (
  id             TEXT    PRIMARY KEY,
  workspace_id   TEXT    NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,
  answer_key     TEXT    NOT NULL UNIQUE,
  question       TEXT    NOT NULL,
  answer_text    TEXT    NOT NULL,
  verdict        TEXT    NOT NULL CHECK (verdict IN ('up', 'down')),
  comment        TEXT,
  created_at     TEXT    NOT NULL,
  updated_at     TEXT    NOT NULL
);`,
    segments: [
      {
        id: 'cascade-integrity',
        stepNumber: 1,
        title: 'Foreign Key Cascades & Tenant Boundary',
        startLine: 11,
        endLine: 21,
        codeSnippet: `CREATE TABLE IF NOT EXISTS document (
  id             TEXT    PRIMARY KEY,
  workspace_id   TEXT    NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,
  file_name      TEXT    NOT NULL,
  file_type      TEXT    NOT NULL,
  content_hash   TEXT    NOT NULL,
  page_count     INTEGER,
  status         TEXT    NOT NULL CHECK (status IN ('active', 'failed', 'skipped', 'removed')),
  last_synced_at TEXT,
  UNIQUE (workspace_id, file_name)
);`,
        plainExplanation: 'Deleting a workspace must cleanly erase all associated document metadata, sync runs, and conversations without leaving orphaned records. The ON DELETE CASCADE constraint guarantees that a single DELETE FROM workspace automatically cleans up every child table when PRAGMA foreign_keys = ON is active.',
        plainExplanationFr: 'La suppression d\'un espace de travail doit effacer proprement toutes les métadonnées de documents et les conversations sans laisser d\'enregistrements orphelins. La clause ON DELETE CASCADE garantit que supprimer un workspace purge automatiquement toutes les tables filles.',
        failurePrevented: 'Prevents orphaned database records that continue to appear in search queries after a workspace is removed.',
        failurePreventedFr: 'Évite les lignes orphelines qui polluent la base de données et faussent les recherches après le retrait d\'un dossier.',
        variablesAndTypes: [
          { name: 'REFERENCES workspace(id) ON DELETE CASCADE', type: 'SQL Clause', description: 'Enforces automatic relational cascading' },
          { name: 'CHECK (status IN (...))', type: 'SQL Constraint', description: 'Strict state enumeration validation at database engine level' },
        ],
      },
    ],
    blastRadius: {
      summary: 'db/schema.sql defines all relational tables. Any unmanaged alteration to column names or types breaks repo.py and all API handlers.',
      nodes: [
        { id: 'schema-sql', label: 'db/schema.sql', type: 'current', description: 'Relational database schema DDL', falloutIfBroken: 'Root file under inspection' },
        { id: 'repo-py', label: 'db/repo.py', type: 'caller', description: 'Executes DDL on database initialization', falloutIfBroken: 'Schema errors cause repo connect failure' },
        { id: 'workspaces-py', label: 'workspaces.py', type: 'downstream', description: 'Queries workspace table records', falloutIfBroken: 'Multi-tenant resolution fails' },
        { id: 'test-db', label: 'tests/unit/test_db_repo.py', type: 'test', description: 'Database unit test suite', falloutIfBroken: 'CI blocks pull request on failure' },
      ],
      edges: [
        { from: 'repo-py', to: 'schema-sql', relationship: 'calls' },
        { from: 'schema-sql', to: 'workspaces-py', relationship: 'renders' },
        { from: 'test-db', to: 'schema-sql', relationship: 'validates' },
      ],
    },
  },

  // 8. app.py
  {
    id: 'app-main',
    filePath: 'app.py',
    title: 'FastAPI Server Lifespan & Probes (app.py)',
    category: 'Web API & Entry Point',
    summary: 'Initializes the FastAPI application, mounts lifespan startup hooks, validates Pydantic settings, and serves sub-50ms /healthz probes.',
    totalLines: 315,
    fullSourceCode: `from __future__ import annotations

from contextlib import asynccontextmanager
from fastapi import FastAPI, Response
from config import get_settings
from recovery import recover_abandoned_jobs
from db.repo import get_repo

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Assert Pydantic configuration at boot (fail-fast)
    settings = get_settings()
    # 2. Run startup self-healing recovery scan
    recover_abandoned_jobs()
    yield
    # Shutdown logic

app = FastAPI(lifespan=lifespan)

@app.get("/healthz")
def healthz_endpoint():
    repo = get_repo()
    # Quick probe: asserts SQLite read & write capability
    if not repo.check_health():
        return Response(status_code=503, content="Database degraded")
    return Response(status_code=200, content="OK")`,
    segments: [
      {
        id: 'lifespan-startup',
        stepNumber: 1,
        title: 'Lifespan Fail-Fast Boot & Health Probe',
        startLine: 9,
        endLine: 24,
        codeSnippet: `@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Assert Pydantic configuration at boot (fail-fast)
    settings = get_settings()
    # 2. Run startup self-healing recovery scan
    recover_abandoned_jobs()
    yield

@app.get("/healthz")
def healthz_endpoint():
    repo = get_repo()
    if not repo.check_health():
        return Response(status_code=503, content="Database degraded")
    return Response(status_code=200, content="OK")`,
        plainExplanation: 'Before the web server accepts any network traffic, this lifespan hook asserts configuration validity and runs recover_abandoned_jobs() to reset tasks that were abandoned if the previous container crashed mid-sync. The /healthz endpoint performs an active SQLite health check and responds in under 50ms.',
        plainExplanationFr: 'Avant d\'accepter des requêtes réseau, ce hook de cycle de vie valide les variables de configuration et exécute recover_abandoned_jobs() pour réinitialiser les tâches orphelines suite à un crash. La sonde /healthz vérifie la santé de SQLite en moins de 50ms.',
        failurePrevented: 'Prevents zombie jobs from locking document synchronization forever and provides cloud orchestrators with an honest health status.',
        failurePreventedFr: 'Évite que des tâches zombies bloquent indéfiniment la synchronisation des documents et fournit un bilan de santé transparent au cloud.',
        variablesAndTypes: [
          { name: 'settings', type: 'Settings', description: 'Pydantic BaseSettings singleton verifying env vars' },
          { name: 'recover_abandoned_jobs()', type: 'Function', description: 'Recovery scanner resetting stuck PROCESSING tasks' },
        ],
      },
    ],
    blastRadius: {
      summary: 'app.py is the primary process entry point. A fatal crash here halts the entire web server and API.',
      nodes: [
        { id: 'app-py', label: 'app.py', type: 'current', description: 'Main application entry point', falloutIfBroken: 'Root file under inspection' },
        { id: 'config-py', label: 'config.py', type: 'dependency', description: 'Pydantic BaseSettings model', falloutIfBroken: 'Missing configuration aborts server startup' },
        { id: 'recovery-py', label: 'recovery.py', type: 'dependency', description: 'Startup recovery scanner', falloutIfBroken: 'Database initialization errors block server boot' },
        { id: 'railway-probe', label: 'Railway Cloud Probe', type: 'caller', description: 'Pings /healthz every 60 seconds', falloutIfBroken: 'Railway marks deployment unhealthy and restarts container' },
        { id: 'test-startup', label: 'tests/unit/test_startup.py', type: 'test', description: 'Application startup unit tests', falloutIfBroken: 'CI gate blocks pull request on failure' },
      ],
      edges: [
        { from: 'app-py', to: 'config-py', relationship: 'imports' },
        { from: 'app-py', to: 'recovery-py', relationship: 'calls' },
        { from: 'railway-probe', to: 'app-py', relationship: 'calls' },
        { from: 'test-startup', to: 'app-py', relationship: 'validates' },
      ],
    },
  },
];
