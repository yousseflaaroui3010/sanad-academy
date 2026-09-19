import React, { useState } from 'react';
import { Code2, Check, Copy, AlertTriangle, ShieldCheck } from 'lucide-react';

interface CodeSnippet {
  title: string;
  naive: {
    label: string;
    code: string;
    flaw: string;
  };
  resilient: {
    label: string;
    code: string;
    benefit: string;
  };
}

const SNIPPETS: Record<string, CodeSnippet> = {
  '1-3': {
    title: 'Citation Generation',
    naive: {
      label: 'Naive Prompt-Based Citation',
      code: `# ❌ LLM hallucinates non-existent articles
prompt = f"""
Answer the user question: {query}
Also make up and cite the legal article number!
"""
response = llm.generate(prompt)
# Output: "Article 999 says workers get 100 days leave" (FAKE!)`,
      flaw: 'The LLM invents fake article citations ("Article 999") that do not exist in real law.'
    },
    resilient: {
      label: 'Sanad Code-Enforced Provenance',
      code: `# ✅ Python runtime attaches verified disk blocks
retrieved_parents = parent_store.get_by_ids(matching_ids)
# LLM writes body, but Python code constructs the citation card:
citations = [
    CitationCard(
        file=doc.filename,
        page=chunk.page_num,
        article_id=chunk.article_ref,
        snippet=chunk.text[:200]
    )
    for chunk in retrieved_parents
]`,
      benefit: 'The AI is forbidden from authoring citations. Python guarantees 100% citation veracity.'
    }
  },
  '9-1': {
    title: 'Model Loading & Concurrency',
    naive: {
      label: 'Naive Concurrent Load',
      code: `# ❌ Every request loads PyTorch weights
def get_embeddings(texts):
    model = AutoModel.from_pretrained("e5-base")
    return model.encode(texts)
# 10 concurrent requests = 10x 1.2GB RAM = Linux OOM Crash!`,
      flaw: 'Spikes RAM instantly on traffic burst, causing server out-of-memory crash.'
    },
    resilient: {
      label: 'Sanad Single-Flight Mutex',
      code: `# ✅ Single-Flight mutex protects memory
_model_lock = threading.Lock()
_cached_model = None

def get_embeddings(texts):
    global _cached_model
    if _cached_model is None:
        with _model_lock:
            if _cached_model is None:
                _cached_model = load_e5_model()
    return _cached_model.encode(texts)`,
      benefit: 'Thread-safe single-flight loading guarantees memory bounds even under heavy request bursts.'
    }
  },
  '18-1': {
    title: 'Database Concurrency & Transactions',
    naive: {
      label: 'Direct sqlite3.connect() Calls',
      code: `# ❌ Scattered direct connections
def save_document(doc):
    conn = sqlite3.connect("sanad.db")
    conn.execute("INSERT INTO docs VALUES (...)")
    conn.commit()
# Result: "OperationalError: database is locked"`,
      flaw: 'Uncoordinated writes lock SQLite database file and trigger crash exceptions.'
    },
    resilient: {
      label: 'Sanad db/repo.py Strict Gateway',
      code: `# ✅ Centralized Strict Librarian Pattern
@contextmanager
def session():
    conn = _connect_raw()
    conn.execute("PRAGMA busy_timeout = 10000;")
    conn.execute("BEGIN EXCLUSIVE;")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise`,
      benefit: 'Atomic rollback protection, 10s busy timeout, and enforced WAL mode eliminate lockouts.'
    }
  }
};

interface CodeDiffInspectorProps {
  lessonId: string;
}

export const CodeDiffInspector: React.FC<CodeDiffInspectorProps> = ({ lessonId }) => {
  const snippet = SNIPPETS[lessonId] || SNIPPETS['1-3'];
  const [activeTab, setActiveTab] = useState<'resilient' | 'naive'>('resilient');
  const [hasCopied, setHasCopied] = useState(false);

  const activeCode = activeTab === 'resilient' ? snippet.resilient.code : snippet.naive.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Code2 size={14} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
              Code Architecture Inspector: {snippet.title}
            </h3>
            <p className="text-[11px] text-[#86868b]">
              Compare naive single-shot code vs Sanad's production resilience
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-xl bg-black/5 p-1">
          <button
            onClick={() => setActiveTab('resilient')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              activeTab === 'resilient'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            Sanad Resilient
          </button>
          <button
            onClick={() => setActiveTab('naive')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              activeTab === 'naive'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            Naive Approach
          </button>
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="relative rounded-2xl bg-[#1e1e24] text-gray-100 p-4 font-mono text-xs overflow-x-auto shadow-inner">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition"
          title="Copy Code"
        >
          {hasCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        </button>
        <pre className="pr-10 leading-relaxed text-[11px] sm:text-xs">
          <code>{activeCode}</code>
        </pre>
      </div>

      {/* Annotation Box */}
      <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
        activeTab === 'resilient'
          ? 'bg-emerald-50/60 border-emerald-200/60 text-emerald-900'
          : 'bg-rose-50/60 border-rose-200/60 text-rose-900'
      }`}>
        <div className="flex items-center gap-1.5 font-bold mb-1">
          {activeTab === 'resilient' ? (
            <>
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Production Invariant:</span>
            </>
          ) : (
            <>
              <AlertTriangle size={14} className="text-rose-600" />
              <span>Production Failure:</span>
            </>
          )}
        </div>
        <p>
          {activeTab === 'resilient' ? snippet.resilient.benefit : snippet.naive.flaw}
        </p>
      </div>
    </div>
  );
};
