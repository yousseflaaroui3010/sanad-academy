import React, { useState } from 'react';
import { ShieldCheck, Activity, AlertTriangle } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../../utils/soundEffects';

export const TimingAttackOscilloscope: React.FC = () => {
  const secretPassword = 'sanad_legal_staging_2026';
  const [candidateGuess, setCandidateGuess] = useState('sanad_legal_wrong_pass');
  const [method, setMethod] = useState<'naive' | 'constant_time'>('naive');

  // Count matching leading characters
  let matchCount = 0;
  for (let i = 0; i < Math.min(candidateGuess.length, secretPassword.length); i++) {
    if (candidateGuess[i] === secretPassword[i]) {
      matchCount++;
    } else {
      break;
    }
  }

  // Naive == takes ~12ns per matching char (early exit)
  // secrets.compare_digest always takes ~48ns (constant bitwise XOR)
  const simulatedTimeNs = method === 'naive' ? 8 + matchCount * 6.5 : 48.0;

  return (
    <div className="rounded-3xl border border-rose-500/30 bg-[#0d070b] text-rose-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400">
            <Activity size={16} className="text-rose-400 animate-pulse" />
            <span>Side-Channel Timing Attack Oscilloscope (Cryptographic Science)</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            How standard equality checks (==) leak secret passwords nanosecond-by-nanosecond on early exit
          </p>
        </div>

        {/* Method Toggle */}
        <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              setMethod('naive');
              playHapticClick();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              method === 'naive'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Naive == (Early Exit)
          </button>
          <button
            onClick={() => {
              setMethod('constant_time');
              playSuccessChime();
            }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              method === 'constant_time'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            secrets.compare_digest
          </button>
        </div>
      </div>

      {/* Everyday Metaphor Banner */}
      <div className="rounded-2xl bg-rose-950/30 border border-rose-800/40 p-3.5 text-xs text-rose-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">⏱️</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Lockpicker with a Stethoscope:</span>
          When a bank safe dial clicks on the first correct number, a sharp lockpicker feels the tiny resistance. Standard string equality (==) exits immediately on the first wrong letter, responding faster when you guess wrong and slower when you guess right. <code className="font-mono text-emerald-300">secrets.compare_digest</code> always takes the exact same time!
        </div>
      </div>

      {/* Live Oscilloscope Waveform Canvas */}
      <div className="relative rounded-2xl border border-rose-500/20 bg-gradient-to-b from-[#180912] via-[#12070e] to-[#080407] p-4 sm:p-6 overflow-hidden">
        <svg viewBox="0 0 500 160" className="w-full h-auto">
          {/* Oscilloscope Grid */}
          <line x1="40" y1="20" x2="40" y2="130" stroke="#2a121d" strokeWidth="2" />
          <line x1="40" y1="130" x2="480" y2="130" stroke="#2a121d" strokeWidth="2" />
          <line x1="40" y1="75" x2="480" y2="75" stroke="#2a121d" strokeWidth="1" strokeDasharray="4 4" />

          {/* Oscilloscope Labels */}
          <text x="15" y="25" fill="#9f5a7a" fontSize="9">Time (ns)</text>
          <text x="440" y="145" fill="#9f5a7a" fontSize="9">Chars</text>

          {/* Baseline Waveform Signal */}
          <path
            d={
              method === 'naive'
                ? `M 40 130 L 120 130 L 140 ${130 - matchCount * 4.5} L 400 ${130 - matchCount * 4.5} L 420 130 L 480 130`
                : `M 40 130 L 120 130 L 140 60 L 400 60 L 420 130 L 480 130`
            }
            fill="none"
            stroke={method === 'naive' ? "#f43f5e" : "#10b981"}
            strokeWidth="3"
            className="transition-all duration-300"
          />

          {/* Telemetry Annotation */}
          <text
            x="270"
            y={method === 'naive' ? 120 - matchCount * 4.5 : 50}
            textAnchor="middle"
            fill={method === 'naive' ? "#fb7185" : "#34d399"}
            fontSize="10"
            fontWeight="bold"
          >
            {method === 'naive'
              ? `Execution Pulse: ${simulatedTimeNs.toFixed(1)} ns (Leaks ${matchCount} matching bytes!)`
              : `Constant-Time XOR: 48.0 ns (Zero Latency Leakage)`}
          </text>
        </svg>
      </div>

      {/* Interactive Guess Tester */}
      <div className="space-y-3 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-gray-200">
            Attacker Guess String: <span className="font-mono text-cyan-300">{candidateGuess}</span>
          </span>
          <span className="font-mono text-gray-400">
            Matched Prefix: <strong className="text-amber-400">{matchCount} chars</strong>
          </span>
        </div>

        <input
          type="text"
          value={candidateGuess}
          onChange={(e) => {
            setCandidateGuess(e.target.value);
            playHapticClick();
          }}
          className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white font-mono outline-none focus:border-rose-500"
        />

        {/* Preset Guess Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
          <span className="text-gray-400 font-sans">Test Payloads:</span>
          {[
            { label: '0 chars match', val: 'wrong_password_xyz' },
            { label: '5 chars match', val: 'sanad_wrong_guess' },
            { label: '11 chars match', val: 'sanad_legal_guess' },
            { label: 'Exact Secret (100%)', val: secretPassword },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setCandidateGuess(preset.val);
                playHapticClick();
              }}
              className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-0.5 text-gray-300 whitespace-nowrap transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Explanatory Invariant Footer */}
      <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-sans ${
        method === 'constant_time'
          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
          : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
      }`}>
        <div className="flex items-center gap-2 font-bold mb-1">
          {method === 'constant_time' ? (
            <>
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Sanad Production Security (secrets.compare_digest):</span>
            </>
          ) : (
            <>
              <AlertTriangle size={16} className="text-rose-400" />
              <span>Critical Side-Channel Vulnerability (== operator):</span>
            </>
          )}
        </div>
        <p>
          {method === 'constant_time'
            ? 'Bitwise XOR evaluates all characters from index 0 to N without early return. Attackers measuring HTTP latency observe zero correlation with password characters, defeating side-channel attacks.'
            : 'Early return leaks character correctness via response latency discrepancies (delta t). Over 1,000 HTTP requests, statistical averaging allows attackers to deduce staging passwords letter-by-letter.'}
        </p>
      </div>
    </div>
  );
};
