import React, { useState } from 'react';
import { TESTING_PYRAMID_TIERS } from '../../data/rebuildStagesData';
import { Box, AlertTriangle, Layers, GitBranch, CheckCircle2 } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const DevOpsPipelineInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [activeTab, setActiveTab] = useState<'docker' | 'pyramid' | 'workflows'>('docker');
  const [activeTier, setActiveTier] = useState<number>(1);

  const selectedTier = TESTING_PYRAMID_TIERS.find((t) => t.tierNumber === activeTier) || TESTING_PYRAMID_TIERS[0];

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Tab Bar: Docker Multi-Stage vs 4-Tier Pyramid vs GitHub Workflows */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('docker');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'docker'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Box size={13} />
            <span>Multi-Stage Docker & PyTorch Pruning</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('pyramid');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'pyramid'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <Layers size={13} />
            <span>The 4-Tier Testing Pyramid</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('workflows');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'workflows'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <GitBranch size={13} />
            <span>CI/CD Workflows (gate.yml & eval.yml)</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#86868b] hidden sm:inline">
          Dockerfile & .github/workflows/
        </span>
      </div>

      {activeTab === 'docker' ? (
        /* 1. Multi-Stage Docker & PyTorch Size Comparison */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: The Naive 6GB CUDA Build Trap */}
            <div className="rounded-3xl p-5 bg-rose-50/70 border border-rose-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                  The Naive Single-Stage PyPI Build
                </span>
                <span className="text-xs font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  ~6.2 GB Image
                </span>
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                Installing sentence-transformers pulls default PyPI PyTorch with dozens of <code>nvidia-*</code> CUDA wheels designed for data center GPUs.
              </p>
              <div className="p-3 rounded-2xl bg-white border border-rose-200 space-y-1 text-xs text-rose-900">
                <div className="flex items-center gap-1.5 font-bold text-rose-700">
                  <AlertTriangle size={13} />
                  <span>Historical Failure (Dockerfile lines 22-25)</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  First build spent <strong>9,936 seconds (2h 46m)</strong> exporting layers and crashed on a builder-lease timeout on Railway.
                </p>
              </div>
            </div>

            {/* Right: The Astral uv Multi-Stage CPU Build */}
            <div className="rounded-3xl p-5 bg-emerald-50/70 border border-emerald-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Sanad Multi-Stage uv Build
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  450 MB Final Image
                </span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Builder stage filters out <code>nvidia-*</code> rows from <code>uv.lock</code> and installs CPU-only torch from <code>download.pytorch.org/whl/cpu</code>.
              </p>
              <div className="p-3 rounded-2xl bg-white border border-emerald-200 space-y-1 text-xs text-emerald-900">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <CheckCircle2 size={13} />
                  <span>Production Invariants</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Image size cut by <strong>92%</strong>; build time drops under <strong>120 seconds</strong>; runs safely under unprivileged user <code>sanad:sanad</code> (UID 10001).
                </p>
              </div>
            </div>
          </div>

          {/* Dockerfile Technical Rules Card */}
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-blue-500/20 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
              Load-Bearing Docker Invariants (Dockerfile)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs text-[#424245]">
              <div className="p-3 rounded-2xl bg-black/5 space-y-1">
                <strong className="text-[#1d1d1f] block">1. No VOLUME Instruction</strong>
                <p className="text-[11px] text-[#6e6e73]">Railway rejects Dockerfiles containing VOLUME instructions. Persistent storage is attached at /app/data via Railway Volumes.</p>
              </div>
              <div className="p-3 rounded-2xl bg-black/5 space-y-1">
                <strong className="text-[#1d1d1f] block">2. Seed Corpus Staging</strong>
                <p className="text-[11px] text-[#6e6e73]">Built-in corpus is staged at /app/seed-corpus so the Railway volume mount at /app/data does not hide pre-packaged documents.</p>
              </div>
              <div className="p-3 rounded-2xl bg-black/5 space-y-1">
                <strong className="text-[#1d1d1f] block">3. Non-Root UID 10001</strong>
                <p className="text-[11px] text-[#6e6e73]">Executes as unprivileged user sanad:sanad with read-only root filesystem permissions and zero sudo escalation capability.</p>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'pyramid' ? (
        /* 2. The 4-Tier Testing Pyramid */
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TESTING_PYRAMID_TIERS.map((tier) => (
              <button
                key={tier.tierNumber}
                onClick={() => {
                  setActiveTier(tier.tierNumber);
                  playHapticClick();
                }}
                className={`p-3 rounded-2xl border text-left transition ${
                  activeTier === tier.tierNumber
                    ? 'bg-blue-600 text-white shadow-xs border-blue-600'
                    : 'liquid-glass border-black/5 hover:border-black/15 text-[#1d1d1f]'
                }`}
              >
                <span className={`text-[10px] font-bold block uppercase tracking-wider ${
                  activeTier === tier.tierNumber ? 'text-blue-100' : 'text-[#86868b]'
                }`}>
                  Tier 0{tier.tierNumber}
                </span>
                <span className="text-xs font-extrabold truncate block">
                  {tier.name.split(':')[1] || tier.name}
                </span>
              </button>
            ))}
          </div>

          {/* Active Tier Inspector Card */}
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200/60 mr-2">
                  Tier {selectedTier.tierNumber}
                </span>
                <h3 className="text-base font-extrabold text-[#1d1d1f] inline">
                  {selectedTier.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#86868b]">
                <span>Count: <strong className="text-[#1d1d1f]">{selectedTier.testCount}</strong></span>
                <span>•</span>
                <span>Speed: <strong className="text-emerald-600">{selectedTier.speed}</strong></span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                Verification Scope & Test Strategy
              </span>
              <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                {selectedTier.scope}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-black/5 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">Tooling & Runner</span>
                <code className="text-[#1d1d1f] font-mono text-[11px] block">{selectedTier.tooling}</code>
              </div>
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1 text-xs text-blue-950">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">Pass Criteria Invariant</span>
                <span className="font-semibold text-[11px] block">{selectedTier.passCriteria}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 3. GitHub Actions Workflows (gate.yml & eval.yml) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-black/10 space-y-3">
            <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
              <span className="font-mono text-xs font-bold text-blue-600">.github/workflows/gate.yml</span>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                on: pull_request
              </span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              Automated branch guard. Runs on every pull request to <code>main</code>. Uses Astral uv with frozen lockfile caching.
            </p>
            <div className="space-y-1.5 font-mono text-[11px] text-[#1d1d1f] bg-black/5 p-3 rounded-2xl">
              <div>1. uv python install 3.12</div>
              <div>2. uv sync --frozen</div>
              <div>3. uv run ruff check .</div>
              <div>4. uv run pytest -q (1,377 tests)</div>
              <div>5. gitleaks/gitleaks-action@v2</div>
            </div>
          </div>

          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-black/10 space-y-3">
            <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
              <span className="font-mono text-xs font-bold text-purple-600">.github/workflows/eval.yml</span>
              <span className="text-[10px] font-mono uppercase font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                on: workflow_dispatch
              </span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              Manual-dispatch evaluation runner. Spends real model credits. Executes the 60-question golden benchmark and checks release gates G1-G3.
            </p>
            <div className="space-y-1.5 font-mono text-[11px] text-[#1d1d1f] bg-black/5 p-3 rounded-2xl">
              <div>1. inputs: workspace_id</div>
              <div>2. uv sync --frozen</div>
              <div>3. run_evaluation.py --workspace-id</div>
              <div>4. release_gate.py (Faithfulness &ge; 0.90)</div>
              <div>5. Halts deployment if refusal pass &lt; 100%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
