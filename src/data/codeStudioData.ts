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
];
