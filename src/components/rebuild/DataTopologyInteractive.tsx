import React, { useState } from 'react';
import { DATABASE_TABLES_DATA } from '../../data/rebuildStagesData';
import type { DatabaseTableDefinition } from '../../data/rebuildStagesData';
import { Database, Split, CheckCircle2, Layers } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const DataTopologyInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [selectedTable, setSelectedTable] = useState<DatabaseTableDefinition>(DATABASE_TABLES_DATA[0]);
  const [activeTab, setActiveTab] = useState<'parent-child' | 'sqlite-schema' | 'qdrant-topology'>('parent-child');

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Tab Bar: Parent-Child Chunking vs SQLite 3NF Schema vs Qdrant Topology */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('parent-child');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'parent-child'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Split size={13} />
            <span>Parent-Child Storage Topology</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('sqlite-schema');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'sqlite-schema'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Database size={13} />
            <span>SQLite 3NF Schema (db/schema.sql)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('qdrant-topology');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'qdrant-topology'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Layers size={13} />
            <span>Qdrant Vector Topology</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#86868b] hidden sm:inline">
          db/schema.sql & vector_store.py
        </span>
      </div>

      {activeTab === 'parent-child' ? (
        /* 1. Parent-Child Visual Slicer & Architecture Breakdown */
        <div className="space-y-4">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-blue-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Core Design Principle: "Search the small thing, read the big thing"
              </span>
              <span className="text-xs font-mono text-[#86868b]">chunking.py</span>
            </div>
            <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
              If an embedding vector represents 2,000 words, different legal articles blur together, ruining cosine similarity. If the LLM receives only a 150-word fragment, it misses exceptions and definitions stated two paragraphs earlier. Parent-Child chunking reconciles both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Small Child Chunks (Search Targets in Qdrant) */}
            <div className="rounded-3xl p-5 bg-blue-50/70 border border-blue-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Child Chunks (Qdrant Vector Store)
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  ~200 tokens (500 chars)
                </span>
              </div>
              <p className="text-xs text-blue-950 leading-relaxed">
                Indexed in Qdrant with dense 1024d vectors and sparse BM25. Point payload carries <code className="font-mono text-blue-800 font-bold">parent_id</code>.
              </p>
              <div className="p-3 rounded-2xl bg-white border border-blue-200 text-xs font-mono text-[#1d1d1f] space-y-1">
                <div className="text-[10px] text-[#86868b]">Point ID: uuid5("child_1")</div>
                <div className="text-emerald-700 font-semibold">"Article 53: Le montant de l'indemnité de licenciement est calculé..."</div>
                <div className="text-[10px] text-blue-600 pt-1">Payload: parent_id = "par_dahir_art53"</div>
              </div>
            </div>

            {/* Right: Big Parent Sections (Context for LLM Generation) */}
            <div className="rounded-3xl p-5 bg-emerald-50/70 border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Parent Section (SQLite / Disk Store)
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  ~1,000 tokens (full article)
                </span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Retrieved from SQLite by <code className="font-mono text-emerald-800 font-bold">parent_id</code> when a child hits. Injected in full into the synthesis prompt.
              </p>
              <div className="p-3 rounded-2xl bg-white border border-emerald-200 text-xs font-mono text-[#1d1d1f] space-y-1">
                <div className="text-[10px] text-[#86868b]">Parent Key: "par_dahir_art53"</div>
                <div className="text-[#424245] text-[11px] leading-relaxed">
                  Includes complete Chapter header, definition of continuous service, all four hourly tiers (96h, 144h, 192h, 240h), and exceptions for gross misconduct (Article 61).
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'sqlite-schema' ? (
        /* 2. SQLite 3NF Relational Schema Browser */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left: Table List */}
          <div className="lg:col-span-4 space-y-2">
            {DATABASE_TABLES_DATA.map((tbl) => (
              <div
                key={tbl.tableName}
                onClick={() => {
                  setSelectedTable(tbl);
                  playHapticClick();
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedTable.tableName === tbl.tableName
                    ? 'bg-white border-blue-500/40 shadow-sm ring-1 ring-blue-500/20'
                    : 'liquid-glass border-black/5 hover:border-black/15'
                }`}
              >
                <span className="font-mono text-xs font-bold text-blue-600 block">
                  {tbl.tableName}
                </span>
                <p className="text-[11px] text-[#6e6e73] truncate">
                  {tbl.purpose}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Selected Table Schema Details */}
          <div className="lg:col-span-8">
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-blue-500/30 space-y-4">
              <div className="border-b border-black/5 pb-2.5">
                <h3 className="font-mono text-base font-extrabold text-blue-700">
                  CREATE TABLE {selectedTable.tableName}
                </h3>
                <p className="text-xs text-[#424245] pt-1">
                  {selectedTable.purpose}
                </p>
              </div>

              {/* Columns */}
              <div className="p-3.5 rounded-2xl bg-[#14110f] text-[#f2ede6] font-mono text-xs space-y-1">
                <span className="text-[10px] text-[#a69c90] block border-b border-white/10 pb-1">
                  Columns & Constraints (PRAGMA foreign_keys = ON)
                </span>
                <div className="space-y-1 pt-1 text-[11px] text-emerald-300">
                  {selectedTable.columns.map((col, idx) => (
                    <div key={idx} className="truncate">
                      {col}
                    </div>
                  ))}
                </div>
              </div>

              {/* Invariants */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                  Relational Invariants
                </span>
                {selectedTable.invariants.map((inv, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#424245]">
                    <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{inv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 3. Qdrant Vector Topology Card */
        <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-4 border-black/10">
          <div className="border-b border-black/5 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Structural Multi-Tenant Isolation
            </span>
            <h3 className="text-lg font-extrabold text-[#1d1d1f]">
              Qdrant Collection: ws_&lt;workspace_id&gt;_children
            </h3>
            <p className="text-xs text-[#424245] pt-1 leading-relaxed">
              Isolation is structural, not a query filter someone has to remember to add. A tenant's query only searches their dedicated collection; chunks from other workspaces literally do not exist in the collection's HNSW graph.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-black/5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">Dimensions</span>
              <span className="text-base font-extrabold text-[#1d1d1f] font-mono">1024-d</span>
              <span className="text-[11px] text-[#6e6e73] block">multilingual-e5-base</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">Distance Metric</span>
              <span className="text-base font-extrabold text-[#1d1d1f] font-mono">Cosine</span>
              <span className="text-[11px] text-[#6e6e73] block">L2-normalized vectors</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">HNSW Graph</span>
              <span className="text-base font-extrabold text-[#1d1d1f] font-mono">M=16, ef=100</span>
              <span className="text-[11px] text-[#6e6e73] block">&lt;5ms retrieval latency</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
