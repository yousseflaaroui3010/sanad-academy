import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  GitPullRequest,
  CheckCircle2,
  GitCommit,
  GitMerge,
  Check,
  X,
  FileCode,
  ShieldAlert
} from 'lucide-react';
import { playHapticClick, playSuccessChime, playWarningThud } from '../../utils/soundEffects';

export const GitHubPullRequestMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conversation' | 'commits' | 'checks' | 'files'>('conversation');
  const [mbApproved, setMbApproved] = useState(true);
  const [ciPassing, setCiPassing] = useState(true);
  const [isMerged, setIsMerged] = useState(false);

  const canMerge = mbApproved && ciPassing && !isMerged;

  const handleMerge = () => {
    if (!canMerge) {
      playWarningThud();
      return;
    }

    setIsMerged(true);
    playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  const handleReset = () => {
    setIsMerged(false);
    setMbApproved(true);
    setCiPassing(true);
    setActiveTab('conversation');
    playHapticClick();
  };

  return (
    <div className="rounded-3xl border border-[#d0d7de] bg-white text-[#1f2328] shadow-sm overflow-hidden font-sans">
      {/* GitHub Top Repository Breadcrumb Header */}
      <div className="bg-[#f6f8fa] border-b border-[#d0d7de] px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0969da]">
          <span className="hover:underline cursor-pointer">sanad-ai</span>
          <span className="text-[#656d76]">/</span>
          <span className="hover:underline cursor-pointer font-bold text-[#1f2328]">sanad-core</span>
          <span className="text-[11px] font-medium text-[#656d76] bg-white border border-[#d0d7de] px-2 py-0.5 rounded-full ml-1">
            Public
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isMerged && (
            <button
              onClick={handleReset}
              className="text-xs text-[#656d76] hover:text-[#0969da] hover:underline"
            >
              Reset PR Demo
            </button>
          )}
          <span className="text-xs text-[#656d76] font-mono">PR #42</span>
        </div>
      </div>

      {/* PR Title & Status Banner */}
      <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-[#d0d7de] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg sm:text-2xl font-bold text-[#1f2328] tracking-tight">
            feat(ingestion): SQLite schema, SHA-256 diff detection & parent-child chunking{' '}
            <span className="text-[#656d76] font-normal">#42</span>
          </h2>

          {/* PR State Badge */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {isMerged ? (
              <span className="flex items-center gap-1.5 rounded-full bg-[#8250df] text-white px-3 py-1 text-xs font-semibold shadow-xs">
                <GitMerge size={14} />
                Merged
              </span>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full bg-[#1a7f37] text-white px-3 py-1 text-xs font-semibold shadow-xs">
                <GitPullRequest size={14} />
                Open
              </span>
            )}
          </div>
        </div>

        {/* Branch Routing Pill */}
        <div className="flex items-center gap-2 text-xs text-[#656d76] flex-wrap">
          <span className="font-semibold text-[#1f2328]">YL-Architect</span> wants to merge 4 commits into{' '}
          <code className="bg-[#eff1f3] text-[#0969da] font-mono px-1.5 py-0.5 rounded border border-[#d0d7de]">
            main
          </code>{' '}
          from{' '}
          <code className="bg-[#eff1f3] text-[#0969da] font-mono px-1.5 py-0.5 rounded border border-[#d0d7de]">
            feature/sprint1-ingestion
          </code>
        </div>
      </div>

      {/* GitHub Navigation Tabs */}
      <div className="flex items-center gap-1 px-4 sm:px-6 bg-[#f6f8fa] border-b border-[#d0d7de] overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => { setActiveTab('conversation'); playHapticClick(); }}
          className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition ${
            activeTab === 'conversation'
              ? 'border-[#fd8c73] text-[#1f2328]'
              : 'border-transparent text-[#656d76] hover:text-[#1f2328]'
          }`}
        >
          <span>Conversation</span>
          <span className="rounded-full bg-black/10 px-1.5 py-0.2 text-[10px]">3</span>
        </button>

        <button
          onClick={() => { setActiveTab('commits'); playHapticClick(); }}
          className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition ${
            activeTab === 'commits'
              ? 'border-[#fd8c73] text-[#1f2328]'
              : 'border-transparent text-[#656d76] hover:text-[#1f2328]'
          }`}
        >
          <GitCommit size={13} />
          <span>Commits</span>
          <span className="rounded-full bg-black/10 px-1.5 py-0.2 text-[10px]">4</span>
        </button>

        <button
          onClick={() => { setActiveTab('checks'); playHapticClick(); }}
          className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition ${
            activeTab === 'checks'
              ? 'border-[#fd8c73] text-[#1f2328]'
              : 'border-transparent text-[#656d76] hover:text-[#1f2328]'
          }`}
        >
          <span>Checks</span>
          <span className="rounded-full bg-black/10 px-1.5 py-0.2 text-[10px]">3</span>
        </button>

        <button
          onClick={() => { setActiveTab('files'); playHapticClick(); }}
          className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition ${
            activeTab === 'files'
              ? 'border-[#fd8c73] text-[#1f2328]'
              : 'border-transparent text-[#656d76] hover:text-[#1f2328]'
          }`}
        >
          <FileCode size={13} />
          <span>Files changed</span>
          <span className="rounded-full bg-emerald-100 text-emerald-800 px-1.5 py-0.2 text-[10px] font-mono font-bold">+1,240</span>
        </button>
      </div>

      {/* Tab Content: Conversation */}
      {activeTab === 'conversation' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* PR Description Comment Card by YL */}
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
              YL
            </div>
            <div className="flex-1 rounded-2xl border border-[#d0d7de] overflow-hidden shadow-xs">
              <div className="bg-[#f6f8fa] border-b border-[#d0d7de] px-4 py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#1f2328]">YL-Architect</span>
                  <span className="text-[#656d76]">commented yesterday</span>
                  <span className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-semibold text-[#656d76] border border-[#d0d7de]">
                    Author
                  </span>
                </div>
              </div>
              <div className="p-4 text-xs sm:text-sm text-[#1f2328] space-y-2 leading-relaxed">
                <p className="font-semibold">Hey @MB-QualityGuardian — Sprint 1 ingestion engine is ready for peer review under Rule 5:</p>
                <ul className="list-disc pl-5 space-y-1 text-[#424245]">
                  <li>Implemented <code className="font-mono bg-[#eff1f3] px-1 rounded">db/schema.sql</code> with WAL mode and foreign key cascades.</li>
                  <li>Added SHA-256 difference detection in <code className="font-mono bg-[#eff1f3] px-1 rounded">change_detection.py</code> (skips unchanged files in 1ms).</li>
                  <li>Configured parent-child chunking: 500-character children with 50-char overlap, linked to 4,000-char parent blocks.</li>
                  <li>Targeting Moroccan Labor Code (<code className="font-mono bg-[#eff1f3] px-1 rounded">code_du_travail.pdf</code>). All 42 unit tests pass.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rule 5 Review Card by MB */}
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
              MB
            </div>
            <div className="flex-1 rounded-2xl border border-[#d0d7de] overflow-hidden shadow-xs">
              <div className="bg-[#f6f8fa] border-b border-[#d0d7de] px-4 py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#1f2328]">MB-QualityGuardian</span>
                  <span className="text-[#656d76]">reviewed 3 hours ago</span>
                  <span className="rounded bg-purple-50 text-purple-700 px-1.5 py-0.5 text-[10px] font-semibold border border-purple-200">
                    Rule 5 Reviewer
                  </span>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Approved</span>
                </div>
              </div>

              <div className="p-4 text-xs sm:text-sm text-[#1f2328] space-y-2">
                <p className="text-[#424245] leading-relaxed">
                  "I audited the parent-child overlap on Article 14 and Article 184. The 50-character overlap prevents boundary truncation on legal articles. Foreign key cascades verified. Rule 5 approval granted for master merge."
                </p>

                {/* Interactive Simulator: Toggle MB approval */}
                <div className="pt-2 border-t border-[#d0d7de] flex items-center justify-between text-xs">
                  <span className="text-[#656d76]">Interactive Rule 5 Review State:</span>
                  <button
                    onClick={() => {
                      setMbApproved(!mbApproved);
                      playHapticClick();
                    }}
                    className={`px-3 py-1 rounded-full font-semibold transition ${
                      mbApproved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {mbApproved ? 'Approved by @MB ✓' : 'Changes Requested by @MB 🛑'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub CI Checks Section */}
          <div className="rounded-2xl border border-[#d0d7de] p-4 bg-[#f6f8fa] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {ciPassing ? (
                  <CheckCircle2 size={18} className="text-emerald-600" />
                ) : (
                  <ShieldAlert size={18} className="text-rose-600" />
                )}
                <span className="text-xs sm:text-sm font-bold text-[#1f2328]">
                  {ciPassing ? 'All checks have passed' : '1 check has failed'}
                </span>
              </div>
              <button
                onClick={() => {
                  setCiPassing(!ciPassing);
                  playHapticClick();
                }}
                className="text-xs text-[#0969da] hover:underline"
              >
                Toggle CI State
              </button>
            </div>

            <div className="space-y-1.5 pl-6 text-xs text-[#424245]">
              <div className="flex items-center justify-between py-1 border-b border-[#d0d7de]/50">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-600 font-bold" />
                  <span className="font-mono">ci/pytest</span>
                  <span className="text-[#656d76]">— 42 unit tests passed in 1.4s</span>
                </div>
                <span className="text-[#656d76] font-medium">Details</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-[#d0d7de]/50">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-600 font-bold" />
                  <span className="font-mono">ci/gitleaks</span>
                  <span className="text-[#656d76]">— Zero secrets or credentials detected in commit diff</span>
                </div>
                <span className="text-[#656d76] font-medium">Details</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-600 font-bold" />
                  <span className="font-mono">ci/contract-drift</span>
                  <span className="text-[#656d76]">— OpenAPI 3.1 schema matches frozen baseline</span>
                </div>
                <span className="text-[#656d76] font-medium">Details</span>
              </div>
            </div>
          </div>

          {/* Big Green Merge Pull Request Section */}
          <div className="rounded-2xl border border-[#d0d7de] p-4 bg-white space-y-3">
            <div className="flex items-center gap-2">
              {canMerge ? (
                <CheckCircle2 size={20} className="text-emerald-600" />
              ) : (
                <X size={20} className="text-rose-600" />
              )}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1f2328]">
                  {isMerged
                    ? 'Pull request successfully merged and closed'
                    : canMerge
                    ? 'This branch has no conflicts with the base branch'
                    : 'Merging is blocked'}
                </h4>
                <p className="text-xs text-[#656d76]">
                  {isMerged
                    ? 'You are all set! The changes are now on main.'
                    : canMerge
                    ? 'Merging can be performed automatically. Rule 5 peer review sign-off confirmed.'
                    : !mbApproved
                    ? 'Rule 5 Block: Changes requested by @MB (Research Lead). Peer approval required.'
                    : 'CI checks failing. Fix broken tests before merging.'}
                </p>
              </div>
            </div>

            {!isMerged && (
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleMerge}
                  disabled={!canMerge}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${
                    canMerge
                      ? 'bg-[#1f883d] hover:bg-[#1a7f37] text-white cursor-pointer active:scale-95'
                      : 'bg-[#94d3a2] text-white opacity-60 cursor-not-allowed'
                  }`}
                >
                  <GitMerge size={14} />
                  <span>Merge pull request</span>
                </button>
                <span className="text-xs text-[#656d76] hidden sm:inline">
                  Squash and merge policy enforced
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Content: Commits */}
      {activeTab === 'commits' && (
        <div className="p-4 sm:p-6 space-y-3 text-xs">
          {[
            { hash: 'a3b1c4d', msg: 'feat: add SQLite schema.sql with ON DELETE CASCADE and WAL mode', author: 'YL-Architect', time: 'yesterday' },
            { hash: '7e9f210', msg: 'feat: implement SHA-256 difference detection state machine in change_detection.py', author: 'YL-Architect', time: 'yesterday' },
            { hash: '91cb842', msg: 'feat: parent-child chunking engine with 500-char children and 4000-char parents', author: 'YL-Architect', time: '18 hours ago' },
            { hash: 'c821a0f', msg: 'test: add unit tests for ingestion ladder and OCR fallback', author: 'YL-Architect', time: '5 hours ago' },
          ].map((c) => (
            <div key={c.hash} className="p-3 rounded-xl border border-[#d0d7de] bg-[#f6f8fa] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <GitCommit size={15} className="text-[#656d76]" />
                <span className="font-semibold text-[#1f2328]">{c.msg}</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[#656d76]">{c.author}</span>
                <code className="font-mono text-[#0969da] bg-white px-2 py-0.5 rounded border border-[#d0d7de]">{c.hash}</code>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Checks */}
      {activeTab === 'checks' && (
        <div className="p-4 sm:p-6 space-y-3 text-xs">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-900 space-y-2">
            <span className="font-bold block">GitHub Actions: Production Verification Workflow</span>
            <p>Runner: ubuntu-latest • Python: 3.12 • Package Manager: uv</p>
          </div>
          <div className="space-y-2 font-mono text-[11px] bg-[#1e1e24] text-gray-200 p-4 rounded-xl">
            <p className="text-emerald-400">✓ uv run pytest tests/unit/ -v (42 passed in 1.4s)</p>
            <p className="text-emerald-400">✓ uv run gitleaks detect --verbose (0 secrets found)</p>
            <p className="text-emerald-400">✓ uv run python scripts/verify_contract.py (OpenAPI 3.1 OK)</p>
          </div>
        </div>
      )}

      {/* Tab Content: Files Changed */}
      {activeTab === 'files' && (
        <div className="p-4 sm:p-6 space-y-4 text-xs font-mono">
          <div className="rounded-xl border border-[#d0d7de] overflow-hidden">
            <div className="bg-[#f6f8fa] px-3 py-2 border-b border-[#d0d7de] font-bold text-[#1f2328] flex justify-between">
              <span>db/schema.sql</span>
              <span className="text-emerald-700">+48 lines</span>
            </div>
            <div className="p-3 bg-white space-y-1 text-[11px]">
              <p className="text-[#656d76]">@@ -0,0 +1,48 @@</p>
              <p className="text-emerald-700 bg-emerald-50">+ PRAGMA foreign_keys = ON;</p>
              <p className="text-emerald-700 bg-emerald-50">+ PRAGMA journal_mode = WAL;</p>
              <p className="text-emerald-700 bg-emerald-50">+ CREATE TABLE workspaces (id TEXT PRIMARY KEY, name TEXT);</p>
              <p className="text-emerald-700 bg-emerald-50">+ CREATE TABLE documents (id TEXT PRIMARY KEY, workspace_id TEXT REFERENCES workspaces(id) ON DELETE CASCADE);</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
