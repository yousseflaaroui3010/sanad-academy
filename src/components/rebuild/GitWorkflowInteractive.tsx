import React, { useState } from 'react';
import { GitPullRequest, CheckCircle2, XCircle, AlertTriangle, Terminal } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const GitWorkflowInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [commitMessage, setCommitMessage] = useState('feat: ST-23 add RRF hybrid search fusion');
  const [checklist, setChecklist] = useState({
    storyNamed: true,
    testsGreen: true,
    demoScriptRuns: true,
    decisionsUpdated: true,
    noSecretsOrData: true,
  });

  const [ylReviewed, setYlReviewed] = useState(true);
  const [mbReviewed, setMbReviewed] = useState(true);

  // Conventional commit format regex: (feat|fix|chore|docs|refactor|test): ST-\d+ .+
  const isConventional = /^(feat|fix|chore|docs|refactor|test):\s+ST-\d+\s+.+$/i.test(commitMessage.trim());
  const hasAiAttribution = /\[AI\]|co-authored-by:\s*claude|assisted-by/i.test(commitMessage);
  const isCommitValid = isConventional && !hasAiAttribution;

  const allChecklistPassed = Object.values(checklist).every(Boolean);
  const canMerge = isCommitValid && allChecklistPassed && ylReviewed && mbReviewed;

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Banner */}
      <div className="liquid-glass rounded-3xl p-5 border-blue-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
            <GitPullRequest size={14} />
            <span>Branch Protection: master (Squash-Only Merges)</span>
          </span>
          <span className="text-[10px] font-mono text-[#86868b]">
            .github/pull_request_template.md
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
          Every merge to <code className="font-mono text-blue-700 font-bold">master</code> must be a squash merge whose commit title is validated against Conventional Commits. Attribution must reflect the student engineers only (zero AI tags).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Interactive Commit Linter & Checklist */}
        <div className="lg:col-span-6 space-y-3">
          {/* Commit Message Validator */}
          <div className="liquid-glass rounded-2xl p-4 border-black/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block">
              1. Conventional Commit Linter
            </span>
            <div className="space-y-1">
              <input
                type="text"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-black/5 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-[#1d1d1f]"
                placeholder="type: ST-nn description"
              />
              <div className="flex items-center justify-between text-[11px] pt-1">
                {isCommitValid ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Valid Conventional Commit</span>
                  </span>
                ) : hasAiAttribution ? (
                  <span className="text-rose-600 font-semibold flex items-center gap-1">
                    <XCircle size={12} />
                    <span>Rejected: AI attribution forbidden (Rule 4)</span>
                  </span>
                ) : (
                  <span className="text-amber-700 font-semibold flex items-center gap-1">
                    <AlertTriangle size={12} />
                    <span>Must match format: feat: ST-nn &lt;summary&gt;</span>
                  </span>
                )}
                <span className="text-[#86868b] font-mono text-[10px]">Squash commit title</span>
              </div>
            </div>
          </div>

          {/* PR Template 5-Point Checklist */}
          <div className="liquid-glass rounded-2xl p-4 border-black/10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block">
              2. Architecture §12.2 Verification Checklist
            </span>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center gap-2 p-2 rounded-xl bg-black/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.storyNamed}
                  onChange={(e) => setChecklist({ ...checklist, storyNamed: e.target.checked })}
                />
                <span className="text-[#424245]">1. Story/feature ID named and acceptance criteria checked</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-black/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.testsGreen}
                  onChange={(e) => setChecklist({ ...checklist, testsGreen: e.target.checked })}
                />
                <span className="text-[#424245]">2. Tests green locally; new logic carries new tests</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-black/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.demoScriptRuns}
                  onChange={(e) => setChecklist({ ...checklist, demoScriptRuns: e.target.checked })}
                />
                <span className="text-[#424245]">3. Demo script still runs (reviewer executes it)</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-black/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.decisionsUpdated}
                  onChange={(e) => setChecklist({ ...checklist, decisionsUpdated: e.target.checked })}
                />
                <span className="text-[#424245]">4. docs/journal/DECISIONS.md updated if an obstacle was met</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-xl bg-black/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.noSecretsOrData}
                  onChange={(e) => setChecklist({ ...checklist, noSecretsOrData: e.target.checked })}
                />
                <span className="text-[#424245]">5. No secrets, no data/ files, no generated stores in diff</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Two-Person Review Gate Status */}
        <div className="lg:col-span-6 space-y-3">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-black/10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block border-b border-black/5 pb-2">
              3. Rule 5 Review Split (Code Mechanics vs Quality/RAGAS)
            </span>

            <div className="space-y-2">
              <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                ylReviewed ? 'bg-blue-50/80 border-blue-300' : 'bg-black/5 border-black/5'
              }`}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={ylReviewed}
                    onChange={(e) => {
                      setYlReviewed(e.target.checked);
                      playHapticClick();
                    }}
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1d1d1f] block">YL Approval (Build & Systems Owner)</span>
                    <span className="text-[10px] text-[#6e6e73]">Code mechanics, database concurrency, performance</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase font-mono ${ylReviewed ? 'text-blue-700' : 'text-[#86868b]'}`}>
                  {ylReviewed ? 'APPROVED' : 'PENDING'}
                </span>
              </label>

              <label className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                mbReviewed ? 'bg-emerald-50/80 border-emerald-300' : 'bg-black/5 border-black/5'
              }`}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={mbReviewed}
                    onChange={(e) => {
                      setMbReviewed(e.target.checked);
                      playHapticClick();
                    }}
                  />
                  <div>
                    <span className="text-xs font-bold text-[#1d1d1f] block">MB Approval (Quality & Research Owner)</span>
                    <span className="text-[10px] text-[#6e6e73]">Acceptance criteria verification, demo script, RAGAS scores</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase font-mono ${mbReviewed ? 'text-emerald-700' : 'text-[#86868b]'}`}>
                  {mbReviewed ? 'APPROVED' : 'PENDING'}
                </span>
              </label>
            </div>

            {/* Merge Status Banner */}
            <div className={`p-3.5 rounded-2xl border transition-all text-xs space-y-1 ${
              canMerge
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                {canMerge ? (
                  <>
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Pull Request Ready to Squash-Merge</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={14} className="text-amber-700" />
                    <span>Merge Blocked by Branch Protection</span>
                  </>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                {canMerge
                  ? 'All 5 checklist gates passed. Conventional commit format verified. Both architectural signatures registered.'
                  : 'Requires valid commit title, 5 checked items, and mutual sign-off from both YL and MB.'}
              </p>
            </div>

            {/* Simulated Git CLI Command Output */}
            <div className="p-3 rounded-2xl bg-[#14110f] text-[#f2ede6] font-mono text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Terminal size={12} />
                <span>Verification Terminal</span>
              </div>
              <div className="text-white/60 pt-1">
                $ uv run ruff check . &amp;&amp; uv run pytest -q
              </div>
              <div className="text-emerald-300">
                1,377 passed in 7.42s (100% green)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
