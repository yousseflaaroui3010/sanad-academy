import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check, CheckCircle2, RefreshCw } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

interface TerminalTab {
  id: 'sync' | 'server' | 'curl';
  label: string;
  command: string;
}

export const DeveloperTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sync' | 'server' | 'curl'>('sync');
  const [isRunning, setIsRunning] = useState(false);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const tabs: TerminalTab[] = [
    { id: 'sync', label: '1. sync_worker.sh', command: 'uv run python sync.py --workspace legal-hr --detect-changes' },
    { id: 'server', label: '2. uvicorn app:app', command: 'uv run uvicorn app:app --host 0.0.0.0 --port 8000' },
    { id: 'curl', label: '3. curl healthcheck', command: 'curl -s http://localhost:8000/api/v1/health | jq .' }
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const syncLogs = [
    'sanad@production:~/sanad-core$ uv run python sync.py --workspace legal-hr --detect-changes',
    '[INFO] [0.001s] Connecting to SQLite relational store at /app/data/sanad.db (WAL mode active)',
    '[INFO] [0.012s] Scanning workspace directory: /data/workspaces/legal-hr/ (14 files found)',
    '[HASH] [0.024s] code_du_travail_marocain.pdf (SHA-256: 7e9f210a4...) -> UNCHANGED [1.2ms BYPASS]',
    '[HASH] [0.035s] bulletin_officiel_5210.pdf (SHA-256: 5ae07e22f...) -> UNCHANGED [1.1ms BYPASS]',
    '[HASH] [0.048s] convention_collective_cadres.pdf (SHA-256: c071ea89...) -> NEW [DIFF DETECTED]',
    '[CONVERT] [0.110s] Ingestion ladder executing PyMuPDF on convention_collective_cadres.pdf...',
    '[CONVERT] [0.245s] Extracted 32,450 characters across 8 pages. Structural tags preserved.',
    '[CHUNK] [0.312s] Parent-Child splitter generating chunks (parent: 4000 chars, child: 500 chars, overlap: 50)...',
    '[CHUNK] [0.380s] Created 8 parent section blocks and 64 child snippets.',
    '[STORE] [0.420s] Writing 8 parent text files to disk at /data/parents/ [OK]',
    '[EMBED] [0.490s] Single-flight mutex acquired. Loading intfloat/multilingual-e5-base on CPU...',
    '[EMBED] [0.780s] Embedding 64 child chunks with mandatory prefix: "passage: " [BATCH 64/64]',
    '[QDRANT] [1.120s] Connecting to embedded Qdrant collection: ws_legal_hr (Distance: Cosine)',
    '[QDRANT] [1.340s] Upserted 64 points with payload { parent_id, page_num, char_offset } [OK]',
    '[SQLITE] [1.410s] db/repo.py session committed: updated documents, sync_jobs, chunks tables.',
    '[SUCCESS] [1.450s] Sync completed in 1.45s! Unchanged: 13 | Indexed: 1 | Vectors: 64 | RAM: 342MB'
  ];

  const serverLogs = [
    'sanad@production:~/sanad-core$ uv run uvicorn app:app --host 0.0.0.0 --port 8000',
    'INFO:     Started server process [PID 24108]',
    'INFO:     Waiting for application startup lifespan...',
    '[LIFESPAN] [0.005s] Verifying SQLite schema at /app/data/sanad.db... PRAGMA foreign_keys = ON [OK]',
    '[LIFESPAN] [0.015s] Running recovery.py: scanning for stuck jobs... 0 orphaned jobs found [OK]',
    '[LIFESPAN] [0.080s] Pre-warming embedding model weights in background thread... [WARMED in 0.4s]',
    'INFO:     Application startup complete.',
    'INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)',
    'INFO:     127.0.0.1:49210 - "GET /api/v1/health HTTP/1.1" 200 OK [0.8ms]',
    'INFO:     127.0.0.1:49214 - "GET /api/v1/workspaces HTTP/1.1" 200 OK [1.2ms]',
    'INFO:     127.0.0.1:49220 - "POST /api/v1/workspaces/ws_hr/query HTTP/1.1" 200 OK [1,240ms]'
  ];

  const curlLogs = [
    'sanad@production:~/sanad-core$ curl -s http://localhost:8000/api/v1/health | jq .',
    '{',
    '  "status": "healthy",',
    '  "version": "1.0.0",',
    '  "uptime_seconds": 18420,',
    '  "database": {',
    '    "driver": "sqlite3",',
    '    "wal_mode": true,',
    '    "foreign_keys": "enabled"',
    '  },',
    '  "vector_store": {',
    '    "engine": "qdrant",',
    '    "status": "connected",',
    '    "collections_count": 6',
    '  },',
    '  "models": {',
    '    "embeddings": "intfloat/multilingual-e5-base",',
    '    "device": "cpu",',
    '    "single_flight_mutex": "unlocked"',
    '  },',
    '  "compliance": {',
    '    "moroccan_law_09_08": "enforced",',
    '    "data_controller": "YL"'
    ,
    '  }',
    '}'
  ];

  const getSourceLogs = () => {
    if (activeTab === 'sync') return syncLogs;
    if (activeTab === 'server') return serverLogs;
    return curlLogs;
  };

  const runSimulation = () => {
    setIsRunning(true);
    setLogLines([]);
    playHapticClick();

    const targetLogs = getSourceLogs();
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < targetLogs.length) {
        const nextLine = targetLogs[currentIdx];
        setLogLines((prev) => [...prev, nextLine]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 110);
  };

  useEffect(() => {
    runSimulation();
  }, [activeTab]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logLines]);

  const handleCopy = () => {
    navigator.clipboard.writeText(logLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-3xl border border-black/20 bg-[#12131a] text-gray-200 shadow-2xl overflow-hidden font-mono text-xs">
      {/* macOS Terminal Window Titlebar */}
      <div className="bg-[#1e1f2b] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Traffic Light Window Buttons */}
          <div className="flex items-center gap-1.5 mr-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          </div>
          <Terminal size={14} className="text-gray-400" />
          <span className="text-[11px] font-semibold text-gray-300">
            sanad@production: ~/sanad-core
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 px-2 py-1 text-[10px] text-gray-300 transition"
            title="Copy Output"
          >
            {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="flex items-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-1 text-[10px] font-semibold shadow-xs disabled:opacity-50 transition"
          >
            <RefreshCw size={10} className={isRunning ? 'animate-spin' : ''} />
            <span>{isRunning ? 'Streaming...' : 'Re-Run Command'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Tabs */}
      <div className="bg-[#181924] px-3 pt-2 flex items-center gap-1 border-b border-white/5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              playSlideSwoosh();
            }}
            className={`px-3 py-1.5 rounded-t-xl text-[11px] font-semibold transition border-t border-x ${
              activeTab === tab.id
                ? 'bg-[#12131a] text-white border-white/15'
                : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Terminal Command Prompt Bar */}
      <div className="bg-[#151621] px-4 py-2 border-b border-white/5 text-gray-400 flex items-center justify-between text-[11px]">
        <div className="truncate font-mono">
          <span className="text-emerald-400 font-bold">$ </span>
          <span className="text-gray-200">{currentTab.command}</span>
        </div>
        <span className="text-[10px] font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40 ml-2 flex-shrink-0">
          Bash 5.2
        </span>
      </div>

      {/* Terminal Console Output Screen */}
      <div className="p-4 sm:p-5 max-h-80 overflow-y-auto space-y-1 leading-relaxed text-[11px] sm:text-xs">
        {logLines.map((line, idx) => {
          let lineStyle = 'text-gray-300';
          if (line.includes('[SUCCESS]') || line.includes('200 OK') || line.includes('"status": "healthy"')) {
            lineStyle = 'text-emerald-400 font-bold';
          } else if (line.includes('[CONVERT]') || line.includes('[CHUNK]')) {
            lineStyle = 'text-cyan-300';
          } else if (line.includes('[EMBED]') || line.includes('[QDRANT]')) {
            lineStyle = 'text-purple-300';
          } else if (line.includes('[HASH]') && line.includes('UNCHANGED')) {
            lineStyle = 'text-amber-300';
          } else if (line.includes('sanad@production')) {
            lineStyle = 'text-blue-400 font-bold';
          }

          return (
            <div key={idx} className={`${lineStyle} break-all font-mono`}>
              {line}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer Invariant Callout */}
      <div className="p-3 bg-[#181924] border-t border-white/5 text-[11px] text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
          <span>
            {activeTab === 'sync'
              ? 'SHA-256 Difference Detection bypasses 13 unchanged documents in 1.2ms with zero vector compute.'
              : activeTab === 'server'
              ? 'Lifespan reconciles abandoned jobs and pre-warms E5 embedding weights before HTTP traffic.'
              : 'GET /api/v1/health verified by Railway platform liveness probe every 15 seconds.'}
          </span>
        </div>
      </div>
    </div>
  );
};
