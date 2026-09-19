import React, { useState } from 'react';
import { GitCompare, CheckCircle2, ShieldAlert } from 'lucide-react';
import { playSuccessChime, playWarningThud } from '../../utils/soundEffects';

export const OpenApiDriftDiffing: React.FC = () => {
  const [driftScenario, setDriftScenario] = useState<'compatible' | 'breaking'>('compatible');

  const handleSelectScenario = (scen: 'compatible' | 'breaking') => {
    setDriftScenario(scen);
    if (scen === 'compatible') {
      playSuccessChime();
    } else {
      playWarningThud();
    }
  };

  return (
    <div className="rounded-3xl border border-indigo-500/30 bg-[#090a16] text-indigo-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
            <GitCompare size={16} className="text-indigo-400" />
            <span>OpenAPI 3.1 AST Contract Drift Diffing (CI Verification Science)</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            How GitHub Actions prevents accidental breaking changes to REST API endpoints
          </p>
        </div>

        {/* Scenario Toggle */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handleSelectScenario('compatible')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              driftScenario === 'compatible'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Compatible Addition (Pass)
          </button>
          <button
            onClick={() => handleSelectScenario('breaking')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              driftScenario === 'breaking'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Breaking Drift (Halt CI)
          </button>
        </div>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-indigo-950/40 border border-indigo-800/40 p-3.5 text-xs text-indigo-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🔌</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Wall Outlet Standard Metaphor:</span>
          If an electric company suddenly changes the three-pronged plug shape without telling anyone, millions of household refrigerators and lamps stop working instantly. Contract drift testing in CI ensures our API plug shapes never change unexpectedly!
        </div>
      </div>

      {/* AST Diff Window */}
      <div className="rounded-2xl border border-white/10 bg-[#121324] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <span className="font-mono font-bold text-gray-300">
            AST Schema Diff: <code className="text-indigo-400">openapi.json v1.0.0</code> vs <code className="text-cyan-300">FastAPI PR Diff</code>
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
            driftScenario === 'compatible'
              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
              : 'bg-rose-950 text-rose-400 border border-rose-800'
          }`}>
            {driftScenario === 'compatible' ? 'AST Diff: Clean Backward Compatible' : 'AST Diff: BREAKING DRIFT DETECTED'}
          </span>
        </div>

        {/* Diff Code Box */}
        <pre className="text-xs font-mono p-4 rounded-xl bg-black/40 leading-relaxed overflow-x-auto">
          {driftScenario === 'compatible' ? (
            <code>
              <span className="text-gray-500">  /api/v1/workspaces/&#123;id&#125;/sync:</span>{'\n'}
              <span className="text-gray-500">    post:</span>{'\n'}
              <span className="text-gray-500">      responses:</span>{'\n'}
              <span className="text-gray-500">        200:</span>{'\n'}
              <span className="text-emerald-400 bg-emerald-950/60">+         doc_version: integer (optional)</span>{'\n'}
              <span className="text-gray-500">          status: string</span>
            </code>
          ) : (
            <code>
              <span className="text-gray-500">  paths:</span>{'\n'}
              <span className="text-rose-400 bg-rose-950/60">-   /api/v1/workspaces/&#123;id&#125;/sync: [DELETED ENDPOINT]</span>{'\n'}
              <span className="text-rose-400 bg-rose-950/60">+   /api/v1/sync_workspace: [RENAMED UNILATERALLY]</span>{'\n'}
              <span className="text-rose-400 bg-rose-950/60">    CRITICAL: Breaking change! Existing clients and scripts will receive 404!</span>
            </code>
          )}
        </pre>
      </div>

      {/* CI Action Verdict */}
      <div className={`p-4 rounded-2xl border text-xs font-sans flex items-center justify-between ${
        driftScenario === 'compatible'
          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
      }`}>
        <div className="flex items-center gap-2">
          {driftScenario === 'compatible' ? (
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
          ) : (
            <ShieldAlert size={16} className="text-rose-400 flex-shrink-0" />
          )}
          <span>
            {driftScenario === 'compatible'
              ? 'CI Gate Passed: python scripts/verify_contract.py exits with code 0. Pull Request is merge-ready.'
              : 'CI Gate Failed: python scripts/verify_contract.py detected unauthorized endpoint renaming! Build halted with exit code 1.'}
          </span>
        </div>
      </div>
    </div>
  );
};
