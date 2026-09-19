import React, { useState } from 'react';
import {
  Database,
  Table,
  Copy,
  Check,
  ShieldCheck,
  Server
} from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

interface WorkspaceRow {
  id: string;
  name: string;
  created_at: string;
  doc_count: number;
}

interface DocumentRow {
  id: string;
  workspace_id: string;
  filename: string;
  sha256: string;
  status: 'INDEXED' | 'PROCESSING' | 'FAILED';
  char_count: number;
}

interface ChunkRow {
  id: string;
  document_id: string;
  workspace_id: string;
  parent_id: string;
  article_ref: string;
  page_num: number;
  char_count: number;
  snippet: string;
}

const WORKSPACES: WorkspaceRow[] = [
  { id: 'ws_legal_hr', name: 'Legal & Moroccan Labor Code', created_at: '2026-08-14 09:12:00', doc_count: 14 },
  { id: 'ws_finance', name: 'Corporate Banking & Payroll', created_at: '2026-08-16 11:30:15', doc_count: 8 },
  { id: 'ws_compliance', name: 'Audit & Law 09-08 Policies', created_at: '2026-08-20 14:05:40', doc_count: 5 },
];

const DOCUMENTS: DocumentRow[] = [
  { id: 'doc_labor_01', workspace_id: 'ws_legal_hr', filename: 'code_du_travail_marocain.pdf', sha256: '7e9f210a4b...', status: 'INDEXED', char_count: 245800 },
  { id: 'doc_labor_02', workspace_id: 'ws_legal_hr', filename: 'bulletin_officiel_5210.pdf', sha256: '5ae07e22fd...', status: 'INDEXED', char_count: 184200 },
  { id: 'doc_labor_03', workspace_id: 'ws_legal_hr', filename: 'convention_collective_banques.pdf', sha256: 'c071ea894a...', status: 'INDEXED', char_count: 32450 },
  { id: 'doc_fin_01', workspace_id: 'ws_finance', filename: 'grille_salaires_2026.docx', sha256: 'a1227fd385...', status: 'INDEXED', char_count: 54120 },
];

const CHUNKS: ChunkRow[] = [
  { id: 'chk_104', document_id: 'doc_labor_01', workspace_id: 'ws_legal_hr', parent_id: 'parent_art_184', article_ref: 'Article 184', page_num: 28, char_count: 486, snippet: 'la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine...' },
  { id: 'chk_105', document_id: 'doc_labor_01', workspace_id: 'ws_legal_hr', parent_id: 'parent_art_184', article_ref: 'Article 184', page_num: 28, char_count: 492, snippet: 'La durée quotidienne de travail ne peut excéder 10 heures, sous réserve des dérogations prévues...' },
  { id: 'chk_106', document_id: 'doc_labor_01', workspace_id: 'ws_legal_hr', parent_id: 'parent_art_185', article_ref: 'Article 185', page_num: 29, char_count: 470, snippet: 'réduire la durée normale de travail pour une période n\'excédant pas 60 jours par an lors de crises...' },
  { id: 'chk_201', document_id: 'doc_labor_02', workspace_id: 'ws_legal_hr', parent_id: 'parent_art_14', article_ref: 'Article 14', page_num: 8, char_count: 480, snippet: 'La période d\'essai pour les cadres et assimilés est fixée à trois mois renouvelable une fois...' },
];

export const DatabaseAndVectorDashboard: React.FC = () => {
  const [engineMode, setEngineMode] = useState<'sqlite' | 'qdrant'>('sqlite');
  const [activeTable, setActiveTable] = useState<'workspaces' | 'documents' | 'chunks'>('chunks');
  const [selectedRowId, setSelectedRowId] = useState<string>('chk_104');
  const [selectedPointId, setSelectedPointId] = useState<string>('point_104');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-3xl border border-[#d0d7de] bg-[#f6f8fa] text-[#1f2328] shadow-sm overflow-hidden font-sans">
      {/* Top Navigation: Switch between SQLite TablePlus & Qdrant Cloud Web UI */}
      <div className="bg-[#21262d] text-white px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/20 text-xs">
        <div className="flex items-center gap-2">
          {engineMode === 'sqlite' ? (
            <Database size={16} className="text-blue-400 flex-shrink-0" />
          ) : (
            <Server size={16} className="text-purple-400 flex-shrink-0" />
          )}
          <span className="font-semibold font-mono truncate">
            {engineMode === 'sqlite'
              ? 'TablePlus — sanad.db (SQLite 3.45.1 • WAL Mode • PRAGMA foreign_keys = ON)'
              : 'Qdrant Web Console — localhost:6333 (Embedded Collection Explorer)'}
          </span>
        </div>

        {/* Engine Switcher */}
        <div className="flex items-center rounded-xl bg-white/10 p-1">
          <button
            onClick={() => {
              setEngineMode('sqlite');
              playSlideSwoosh();
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
              engineMode === 'sqlite'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Database size={12} />
            <span>SQLite (TablePlus)</span>
          </button>

          <button
            onClick={() => {
              setEngineMode('qdrant');
              playSlideSwoosh();
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
              engineMode === 'qdrant'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Server size={12} />
            <span>Qdrant (Vector UI)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: SQLite Relational Database (TablePlus Style) */}
      {engineMode === 'sqlite' && (
        <div className="flex flex-col md:flex-row min-h-[380px]">
          {/* Left Sidebar: Tables List */}
          <div className="w-full md:w-56 bg-[#f6f8fa] border-r border-[#d0d7de] p-3 space-y-3">
            <div className="text-[10px] font-bold text-[#656d76] uppercase tracking-wider px-2">
              Tables in sanad.db
            </div>

            <div className="space-y-1">
              {[
                { id: 'workspaces', label: 'workspaces', count: WORKSPACES.length },
                { id: 'documents', label: 'documents', count: DOCUMENTS.length },
                { id: 'chunks', label: 'chunks', count: CHUNKS.length },
              ].map((tbl) => (
                <button
                  key={tbl.id}
                  onClick={() => {
                    setActiveTable(tbl.id as any);
                    playHapticClick();
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                    activeTable === tbl.id
                      ? 'bg-white text-blue-700 font-bold shadow-xs border border-[#d0d7de]'
                      : 'text-[#424245] hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Table size={13} className={activeTable === tbl.id ? 'text-blue-600' : 'text-[#656d76]'} />
                    <span className="font-mono">{tbl.label}</span>
                  </div>
                  <span className="text-[10px] text-[#86868b] tabular-nums font-mono">{tbl.count}</span>
                </button>
              ))}
            </div>

            {/* Cascade Invariant Callout */}
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/60 text-[11px] text-blue-900 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[10px] uppercase">
                <ShieldCheck size={12} className="text-blue-600" />
                ON DELETE CASCADE
              </span>
              <p className="leading-tight text-[10px] text-blue-800">
                Deleting a workspace row in SQLite cascades automatically, purging documents and chunk records.
              </p>
            </div>
          </div>

          {/* Right Main Grid: SQL Query Bar & Table Rows */}
          <div className="flex-1 bg-white flex flex-col">
            {/* SQL Filter Bar */}
            <div className="p-3 border-b border-[#d0d7de] bg-[#fdfefe] flex items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-[#0969da] font-bold">SQL:</span>
                <span className="truncate text-[#1f2328]">
                  SELECT * FROM {activeTable} WHERE workspace_id = 'ws_legal_hr';
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-sans font-semibold">
                0.4ms
              </span>
            </div>

            {/* Table Rows Grid */}
            <div className="flex-1 overflow-x-auto overflow-y-auto max-h-72 p-1">
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b border-[#d0d7de] bg-[#f6f8fa] text-[11px] text-[#656d76]">
                    {activeTable === 'workspaces' && (
                      <>
                        <th className="p-2.5 font-semibold">id <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">name <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">created_at <span className="text-[9px] text-[#86868b] font-mono">TIMESTAMP</span></th>
                        <th className="p-2.5 font-semibold">doc_count <span className="text-[9px] text-[#86868b] font-mono">INT</span></th>
                      </>
                    )}
                    {activeTable === 'documents' && (
                      <>
                        <th className="p-2.5 font-semibold">id <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">workspace_id (FK) <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">filename <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">sha256 <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">status <span className="text-[9px] text-[#86868b] font-mono">ENUM</span></th>
                      </>
                    )}
                    {activeTable === 'chunks' && (
                      <>
                        <th className="p-2.5 font-semibold">id <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">article_ref <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">parent_id <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                        <th className="p-2.5 font-semibold">chars <span className="text-[9px] text-[#86868b] font-mono">INT</span></th>
                        <th className="p-2.5 font-semibold">snippet <span className="text-[9px] text-[#86868b] font-mono">TEXT</span></th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d0d7de]/50 font-mono text-[11px]">
                  {activeTable === 'workspaces' &&
                    WORKSPACES.map((w) => (
                      <tr
                        key={w.id}
                        onClick={() => setSelectedRowId(w.id)}
                        className={`hover:bg-blue-50/50 cursor-pointer ${
                          selectedRowId === w.id ? 'bg-blue-50/80 font-semibold' : ''
                        }`}
                      >
                        <td className="p-2.5 text-blue-700">{w.id}</td>
                        <td className="p-2.5 font-sans text-[#1f2328]">{w.name}</td>
                        <td className="p-2.5 text-[#656d76]">{w.created_at}</td>
                        <td className="p-2.5 tabular-nums text-emerald-700">{w.doc_count}</td>
                      </tr>
                    ))}

                  {activeTable === 'documents' &&
                    DOCUMENTS.map((d) => (
                      <tr
                        key={d.id}
                        onClick={() => setSelectedRowId(d.id)}
                        className={`hover:bg-blue-50/50 cursor-pointer ${
                          selectedRowId === d.id ? 'bg-blue-50/80 font-semibold' : ''
                        }`}
                      >
                        <td className="p-2.5 text-blue-700">{d.id}</td>
                        <td className="p-2.5 text-purple-700">{d.workspace_id}</td>
                        <td className="p-2.5 font-sans text-[#1f2328]">{d.filename}</td>
                        <td className="p-2.5 text-[#656d76]">{d.sha256}</td>
                        <td className="p-2.5">
                          <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-sans font-bold">
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}

                  {activeTable === 'chunks' &&
                    CHUNKS.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedRowId(c.id)}
                        className={`hover:bg-blue-50/50 cursor-pointer ${
                          selectedRowId === c.id ? 'bg-blue-50/80 font-semibold' : ''
                        }`}
                      >
                        <td className="p-2.5 text-blue-700">{c.id}</td>
                        <td className="p-2.5 text-indigo-700 font-sans font-bold">{c.article_ref}</td>
                        <td className="p-2.5 text-purple-700">{c.parent_id}</td>
                        <td className="p-2.5 tabular-nums text-emerald-700">{c.char_count}</td>
                        <td className="p-2.5 text-[#656d76] font-sans truncate max-w-xs">{c.snippet}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="p-2 bg-[#f6f8fa] border-t border-[#d0d7de] text-[11px] text-[#656d76] flex justify-between px-4">
              <span>Showing rows for {activeTable} in sanad.db</span>
              <span>Foreign Key Enforcement: ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Qdrant Vector Cloud Dashboard */}
      {engineMode === 'qdrant' && (
        <div className="p-4 sm:p-6 space-y-5 bg-[#12131a] text-gray-200 font-sans">
          {/* Collection Status Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#1e1f2b] border border-white/10 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Collection</span>
              <div className="font-mono font-bold text-sm text-purple-400">ws_legal_hr</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1e1f2b] border border-white/10 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Vector Points</span>
              <div className="font-mono font-bold text-sm text-emerald-400">64 Vectors</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1e1f2b] border border-white/10 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Dimension</span>
              <div className="font-mono font-bold text-sm text-blue-400">768-dim (E5-base)</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1e1f2b] border border-white/10 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Distance Metric</span>
              <div className="font-mono font-bold text-sm text-amber-400">Cosine</div>
            </div>
          </div>

          {/* Qdrant Point Payload Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Points List */}
            <div className="rounded-2xl bg-[#1a1b24] border border-white/10 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <span className="font-bold text-gray-300">Points in Collection</span>
                <span className="text-[10px] font-mono text-purple-400">filter: workspace_id == 'ws_legal_hr'</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {[
                  { id: 'point_104', ref: 'Article 184 (Work week 44h)', vec: '[0.0124, -0.0451, 0.0892 ...]' },
                  { id: 'point_105', ref: 'Article 184 (10h daily cap)', vec: '[-0.0312, 0.0612, 0.0441 ...]' },
                  { id: 'point_106', ref: 'Article 185 (Crisis work cut)', vec: '[0.0781, -0.0120, -0.0531 ...]' },
                  { id: 'point_201', ref: 'Article 14 (Cadre probation)', vec: '[0.0912, 0.0410, 0.0182 ...]' },
                ].map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPointId(p.id);
                      playHapticClick();
                    }}
                    className={`p-3 rounded-xl border cursor-pointer text-xs transition ${
                      selectedPointId === p.id
                        ? 'bg-purple-900/40 border-purple-500/60 shadow-xs'
                        : 'bg-[#222330] border-white/5 hover:bg-[#282938]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-purple-300">{p.id}</span>
                      <span className="font-mono text-[10px] text-gray-400">{p.vec}</span>
                    </div>
                    <p className="text-gray-300 font-medium">{p.ref}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* JSON Metadata Payload Viewer */}
            <div className="rounded-2xl bg-[#161720] border border-white/10 p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-gray-300 font-bold">Qdrant Vector Payload JSON</span>
                <button
                  onClick={() => handleCopy(JSON.stringify({
                    point_id: selectedPointId,
                    workspace_id: 'ws_legal_hr',
                    parent_id: selectedPointId === 'point_201' ? 'parent_art_14' : 'parent_art_184',
                    article_ref: selectedPointId === 'point_201' ? 'Article 14' : 'Article 184',
                    page_number: selectedPointId === 'point_201' ? 8 : 28,
                    prefix_enforced: 'passage: '
                  }, null, 2))}
                  className="text-purple-400 hover:text-purple-300 text-[11px] flex items-center gap-1"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="text-emerald-300 text-[11px] overflow-x-auto p-2 bg-black/30 rounded-xl leading-relaxed">
                <code>
                  {JSON.stringify(
                    {
                      point_id: selectedPointId,
                      vector_dim: 768,
                      prefix_enforced: 'passage: ',
                      payload: {
                        workspace_id: 'ws_legal_hr',
                        document_id: 'doc_labor_01',
                        parent_id: selectedPointId === 'point_201' ? 'parent_art_14' : 'parent_art_184',
                        article_ref: selectedPointId === 'point_201' ? 'Article 14' : 'Article 184',
                        page_number: selectedPointId === 'point_201' ? 8 : 28,
                        tenant_isolated: true
                      }
                    },
                    null,
                    2
                  )}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
