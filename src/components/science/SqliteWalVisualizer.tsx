import React, { useState } from 'react';
import { Database, Play, RotateCcw, ShieldCheck } from 'lucide-react';
import { playHapticClick, playSlideSwoosh, playSuccessChime } from '../../utils/soundEffects';

export const SqliteWalVisualizer: React.FC = () => {
  const [walPages, setWalPages] = useState<number>(3); // 3 pages in WAL file
  const [isWriting, setIsWriting] = useState(false);
  const [isCheckpointing, setIsCheckpointing] = useState(false);

  const handleSimulateWrite = () => {
    setIsWriting(true);
    playSlideSwoosh();
    setTimeout(() => {
      setWalPages((prev) => prev + 1);
      setIsWriting(false);
      playHapticClick();
    }, 400);
  };

  const handleCheckpoint = () => {
    setIsCheckpointing(true);
    playHapticClick();
    setTimeout(() => {
      setWalPages(0);
      setIsCheckpointing(false);
      playSuccessChime();
    }, 700);
  };

  return (
    <div className="rounded-3xl border border-blue-500/30 bg-[#090d18] text-blue-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400">
            <Database size={16} className="text-blue-400" />
            <span>SQLite Write-Ahead Logging (WAL) Internals</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            How Sanad achieves non-blocking concurrent reads and writes on a single SQLite file
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateWrite}
            disabled={isWriting || isCheckpointing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition disabled:opacity-50"
          >
            <Play size={12} className={isWriting ? 'animate-spin' : ''} />
            <span>{isWriting ? 'Writing...' : 'Execute Write Query'}</span>
          </button>

          <button
            onClick={handleCheckpoint}
            disabled={walPages === 0 || isCheckpointing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition disabled:opacity-30"
          >
            <RotateCcw size={12} className={isCheckpointing ? 'animate-spin' : ''} />
            <span>{isCheckpointing ? 'Flushing...' : 'Run WAL Checkpoint'}</span>
          </button>
        </div>
      </div>

      {/* Metaphor Banner */}
      <div className="rounded-2xl bg-blue-950/40 border border-blue-800/40 p-3.5 text-xs text-blue-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">📝</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Waiter's Notepad Metaphor:</span>
          In old databases (rollback journal), every customer who orders dinner locks the kitchen door so nobody else can eat. In WAL mode, the waiter writes new orders on a fast pocket notepad (`-wal` file) while the chef cooks. Customers can read the menu simultaneously with zero waiting!
        </div>
      </div>

      {/* Visual Tri-File Architecture Canvas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* File 1: sanad.db */}
        <div className="p-4 rounded-2xl bg-[#11182c] border border-blue-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs border-b border-blue-900/40 pb-2">
            <span className="font-bold text-white font-mono">sanad.db</span>
            <span className="text-[10px] text-emerald-400 font-bold">Stable State</span>
          </div>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Main database file storing committed B-tree disk pages (4KB blocks).
          </p>
          <div className="text-[10px] text-gray-400 font-mono pt-1">
            Status: Non-blocking readers active
          </div>
        </div>

        {/* File 2: sanad.db-wal (Append Log) */}
        <div className="p-4 rounded-2xl bg-[#141d33] border border-cyan-500/40 space-y-2 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-xs border-b border-cyan-900/40 pb-2">
            <span className="font-bold text-cyan-300 font-mono">sanad.db-wal</span>
            <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950 px-1.5 py-0.5 rounded">
              Append Buffer
            </span>
          </div>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Writes append sequentially here without touching the main database file.
          </p>
          <div className="text-xs font-mono font-bold text-cyan-300 pt-1 flex items-center justify-between">
            <span>Pending Pages:</span>
            <span className="text-amber-400 tabular-nums">{walPages} pages</span>
          </div>
          {isWriting && (
            <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-400 animate-pulse pointer-events-none rounded-2xl" />
          )}
        </div>

        {/* File 3: sanad.db-shm (Shared Memory) */}
        <div className="p-4 rounded-2xl bg-[#11182c] border border-purple-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs border-b border-purple-900/40 pb-2">
            <span className="font-bold text-purple-300 font-mono">sanad.db-shm</span>
            <span className="text-[10px] text-purple-400 font-bold">Shared Memory</span>
          </div>
          <p className="text-xs text-gray-300 font-sans leading-relaxed">
            Memory-mapped index allowing readers to locate the newest page version in 0.1ms.
          </p>
          <div className="text-[10px] text-gray-400 font-mono pt-1">
            Index: PRAGMA foreign_keys = ON
          </div>
        </div>
      </div>

      {/* Checkpointing Telemetry & Invariant */}
      <div className="rounded-2xl bg-black/40 border border-blue-900/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
          <span className="text-gray-300">
            {walPages === 0
              ? 'WAL log is fully flushed. All database pages consolidated into sanad.db.'
              : `WAL file holds ${walPages} pending pages. Readers see newest state instantly through the -shm index.`}
          </span>
        </div>
        <div className="text-[11px] font-mono text-gray-400">
          Mode: <span className="text-cyan-400 font-bold">PRAGMA journal_mode = WAL</span>
        </div>
      </div>
    </div>
  );
};
