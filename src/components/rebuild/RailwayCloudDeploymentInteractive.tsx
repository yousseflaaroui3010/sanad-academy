import React, { useState } from 'react';
import { Cloud, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const RailwayCloudDeploymentInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [missingEnv, setMissingEnv] = useState<boolean>(false);
  const [isProbing, setIsProbing] = useState<boolean>(false);
  const [probeResult, setProbeResult] = useState<{ status: string; latencyMs: number } | null>(null);

  const handleTestProbe = () => {
    setIsProbing(true);
    playHapticClick();
    setTimeout(() => {
      setIsProbing(false);
      setProbeResult({ status: '200 OK', latencyMs: 38 });
      playSuccessChime();
    }, 400);
  };

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Architecture Banner */}
      <div className="liquid-glass rounded-3xl p-5 border-blue-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <Cloud size={14} />
            <span>Railway Cloud Production Topology (PORT 8080)</span>
          </span>
          <span className="text-[10px] font-mono text-[#86868b]">
            Dockerfile & config.py
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
          The container runs under unprivileged user <code className="font-mono text-blue-700 font-bold">sanad:sanad</code> (UID 10001). Railway mounts persistent storage at <code className="font-mono text-blue-700 font-bold">/app/data</code>, ensuring SQLite WAL and Qdrant vector collections survive container restarts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Volume Persistence & Container Ports */}
        <div className="lg:col-span-6 space-y-3">
          <div className="liquid-glass rounded-2xl p-5 border-black/10 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block border-b border-black/5 pb-2">
              Persistent Storage Mount Topology
            </span>

            <div className="p-3.5 rounded-2xl bg-black/5 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-blue-700 font-bold">
                <span>/app/data (Railway Volume)</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">MOUNTED</span>
              </div>
              <div className="text-[11px] text-[#424245] space-y-1 pl-2 border-l-2 border-blue-400">
                <div>├── registry.sqlite3 (WAL + 3NF Tables)</div>
                <div>├── registry.sqlite3-wal (Write Buffer)</div>
                <div>├── qdrant_storage/ (ws_*_children collections)</div>
                <div>└── parents/ (1,000t parent section files)</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-950 space-y-1">
              <strong>The Dockerfile Rule:</strong> No <code>VOLUME</code> instruction in Dockerfile (Railway builder rejects it with build scheduling errors). Storage is mounted through Railway Volume settings.
            </div>
          </div>

          {/* Sub-50ms Healthcheck Probe Simulator */}
          <div className="liquid-glass rounded-2xl p-5 border-black/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block">
                Health Probe: /healthz
              </span>
              <button
                onClick={handleTestProbe}
                disabled={isProbing}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition active:scale-95"
              >
                <RefreshCw size={11} className={isProbing ? 'animate-spin' : ''} />
                <span>Ping Probe</span>
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-[#14110f] text-[#f2ede6] font-mono text-xs space-y-1">
              <div className="text-[10px] text-[#a69c90]">GET /healthz HTTP/1.1</div>
              {probeResult ? (
                <div className="text-emerald-300 text-[11px]">
                  HTTP/1.1 {probeResult.status} • latency: {probeResult.latencyMs}ms (SQLite write OK, Qdrant OK)
                </div>
              ) : (
                <div className="text-white/40 text-[11px]">Click "Ping Probe" to test endpoint response</div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Pydantic BaseSettings Fail-Fast Simulator */}
        <div className="lg:col-span-6 space-y-3">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-black/10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block border-b border-black/5 pb-2">
              Pydantic BaseSettings Fail-Fast Boot Invariant
            </span>
            <p className="text-xs text-[#424245] leading-relaxed">
              When the application boots, <code>config.Settings</code> reads environment variables immediately. A missing secret halts the process with exit code 1 on line 1, preventing corrupted runtime execution.
            </p>

            <div className="p-3.5 rounded-2xl bg-black/5 space-y-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                Simulate Missing Environment Variable:
              </span>
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-black/10 cursor-pointer">
                <span className="font-mono text-xs text-[#1d1d1f]">OIDC_CLIENT_SECRET</span>
                <input
                  type="checkbox"
                  checked={missingEnv}
                  onChange={(e) => {
                    setMissingEnv(e.target.checked);
                    playHapticClick();
                  }}
                />
              </label>
            </div>

            {/* Simulated Boot Outcome */}
            <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
              missingEnv
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                {missingEnv ? (
                  <>
                    <AlertTriangle size={14} className="text-rose-600" />
                    <span>Boot Halted: pydantic_core.ValidationError (Exit Code 1)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Configuration Validated: Server Listening on 0.0.0.0:$PORT</span>
                  </>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                {missingEnv
                  ? 'Field required: OIDC_CLIENT_SECRET missing from environment. Fail-fast prevents the application from starting in an insecure state.'
                  : 'All Pydantic settings verified: SQLite path, Qdrant path, Keycloak endpoints, and token hashes.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
