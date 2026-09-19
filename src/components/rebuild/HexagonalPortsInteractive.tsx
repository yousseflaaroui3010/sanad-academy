import React, { useState } from 'react';
import { HEXAGONAL_PORTS_DATA } from '../../data/rebuildStagesData';
import type { HexagonalPortItem } from '../../data/rebuildStagesData';
import { Layers, AlertTriangle, Code2 } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const HexagonalPortsInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [selectedPort, setSelectedPort] = useState<HexagonalPortItem>(HEXAGONAL_PORTS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'ports' | 'pillars'>('ports');

  const pillars = [
    {
      number: 1,
      title: 'Pillar 1: Asynchronous Ingestion Pipeline',
      description: 'Document conversion ladder, Tesseract OCR fallback, SHA-256 4-state change detection, and single-flight mutex locking. Runs completely decoupled from HTTP request loops.',
      file: 'sync.py & conversion.py',
    },
    {
      number: 2,
      title: 'Pillar 2: Dual-Store Engine (SQLite WAL + Qdrant)',
      description: 'ACID relational metadata in SQLite with WAL mode + dense vector embeddings & sparse BM25 in Qdrant collections (ws_<id>_children). Search the small child, read the big parent.',
      file: 'db/schema.sql & vector_store.py',
    },
    {
      number: 3,
      title: 'Pillar 3: Cyclic State Machine Agent (LangGraph)',
      description: '9 deterministic worker nodes connected through an immutable SanadAgentState TypedDict. Features conditional routing, query rewriting, relevance grading, and loop limiters.',
      file: 'agent/graph.py & agent/state.py',
    },
    {
      number: 4,
      title: 'Pillar 4: Synchronous HTTP & OpenAPI 3.1 Interface',
      description: 'FastAPI web application, Jinja2 server-rendered screens, Keycloak OIDC authentication, AES-GCM encrypted session cookies, and automated OpenAPI contract drift testing.',
      file: 'app.py & ui/screen.py',
    },
  ];

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Toggle: 8 Explicit Ports vs 4 Architecture Pillars */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('ports');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'ports'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Code2 size={13} />
            <span>The 8 Explicit Ports (agent/ports.py)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('pillars');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'pillars'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Layers size={13} />
            <span>The 4 Invariant Architecture Pillars</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#86868b] hidden sm:inline">
          agent/ports.py: AgentPorts
        </span>
      </div>

      {activeTab === 'ports' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column: List of 8 Ports */}
          <div className="lg:col-span-5 space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {HEXAGONAL_PORTS_DATA.map((port) => {
              const isSelected = selectedPort.name === port.name;
              return (
                <div
                  key={port.name}
                  onClick={() => {
                    setSelectedPort(port);
                    playHapticClick();
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-500/40 shadow-sm ring-1 ring-blue-500/20'
                      : 'liquid-glass border-black/5 hover:border-black/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      port.{port.name}()
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-[#86868b] bg-black/5 px-2 py-0.5 rounded">
                      {port.storyOwner}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6e6e73] line-clamp-1">
                    {port.purpose}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Port Detail Card */}
          <div className="lg:col-span-7">
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-blue-500/30 space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-black/5 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600 block">
                      port.{selectedPort.name}
                    </span>
                    <h3 className="text-base font-extrabold text-[#1d1d1f]">
                      {selectedPort.purpose}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    {selectedPort.storyOwner}
                  </span>
                </div>

                {/* Type Signature in Code Box */}
                <div className="p-3 rounded-2xl bg-[#14110f] text-[#f2ede6] font-mono text-xs space-y-1">
                  <span className="text-[10px] text-[#a69c90] block">Type Annotation Protocol</span>
                  <code className="text-emerald-300 text-[11px] block overflow-x-auto py-1">
                    {selectedPort.name.toUpperCase()} = {selectedPort.typeSignature}
                  </code>
                </div>

                {/* Failure Prevented */}
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle size={13} />
                    <span>The Failure Mode It Prevents</span>
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed font-medium">
                    {selectedPort.failurePrevented}
                  </p>
                </div>
              </div>

              {/* The "No Defaults" Invariant Note */}
              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-950 space-y-1">
                <strong>The Architectural Law (agent/ports.py line 20):</strong> "THERE ARE NO DEFAULTS. A stub that answers plausibly is the most dangerous object in a project like this: wire it in as a default and the day someone forgets to pass real ports, Sanad invents an answer instead of failing loudly."
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* The 4 Invariant Architecture Pillars */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pil) => (
            <div key={pil.number} className="liquid-glass rounded-3xl p-5 sm:p-6 border-black/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60 inline-block">
                  Pillar 0{pil.number}
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#1d1d1f]">
                  {pil.title}
                </h3>
                <p className="text-xs text-[#424245] leading-relaxed">
                  {pil.description}
                </p>
              </div>
              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-[#86868b]">
                <span>Source:</span>
                <span className="text-blue-600 font-bold">{pil.file}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
