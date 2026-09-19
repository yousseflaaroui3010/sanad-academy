import React, { useState } from 'react';
import { Crosshair, Key, Lock, Unlock, Zap, RotateCcw } from 'lucide-react';
import { playHapticClick, playSuccessChime } from '../../utils/soundEffects';

export const FighterJetCockpitArtwork: React.FC = () => {
  const [ylArmed, setYlArmed] = useState(true);
  const [mbArmed, setMbArmed] = useState(true);

  const bothArmed = ylArmed && mbArmed;

  const toggleYl = () => {
    setYlArmed(!ylArmed);
    if (!ylArmed && mbArmed) playSuccessChime();
    else playHapticClick();
  };

  const toggleMb = () => {
    setMbArmed(!mbArmed);
    if (!mbArmed && ylArmed) playSuccessChime();
    else playHapticClick();
  };

  const resetAll = () => {
    setYlArmed(true);
    setMbArmed(true);
    playHapticClick();
  };

  return (
    <div className="rounded-3xl border border-blue-500/30 bg-[#070b14] text-cyan-400 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6 relative">
      {/* Cockpit Canopy Top Border Reflection */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Cockpit Header & HUD Telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <Crosshair size={15} className="animate-spin text-cyan-400" />
            <span>F-16 Twin-Seat Cockpit HUD • Rule 5 Protocol</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Both pilots must confirm target lock simultaneously before code strikes production
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-[11px] font-bold text-gray-400">
            ALT: <span className="text-cyan-300">32,000 FT</span> • MACH: <span className="text-cyan-300">1.8</span>
          </div>
          <button
            onClick={resetAll}
            className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/40 transition"
            title="Reset Cockpit"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Main HUD Visual Canopy Glass */}
      <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-[#0a1122]/90 via-[#070c18]/95 to-[#050811] p-6 sm:p-8 overflow-hidden">
        {/* Animated HUD Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        {/* Central HUD Horizon Arc */}
        <svg viewBox="0 0 600 240" className="w-full h-auto drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          {/* Pitch Ladder Marks */}
          <line x1="220" y1="120" x2="380" y2="120" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
          <line x1="260" y1="80" x2="340" y2="80" stroke="#06b6d4" strokeWidth="1.5" opacity="0.3" />
          <line x1="260" y1="160" x2="340" y2="160" stroke="#06b6d4" strokeWidth="1.5" opacity="0.3" />

          {/* Left Reticle: YL (Systems Architect) */}
          <g transform="translate(140, 120)">
            <circle cx="0" cy="0" r="45" fill="none" stroke={ylArmed ? "#06b6d4" : "#f43f5e"} strokeWidth="2" opacity="0.8" />
            <circle cx="0" cy="0" r="32" fill="none" stroke={ylArmed ? "#06b6d4" : "#f43f5e"} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="-55" y1="0" x2="55" y2="0" stroke={ylArmed ? "#06b6d4" : "#f43f5e"} strokeWidth="1.5" />
            <line x1="0" y1="-55" x2="0" y2="55" stroke={ylArmed ? "#06b6d4" : "#f43f5e"} strokeWidth="1.5" />
            <text x="0" y="-62" textAnchor="middle" fill={ylArmed ? "#38bdf8" : "#fb7185"} fontSize="11" fontWeight="bold">
              PILOT 1: YL
            </text>
            <text x="0" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">
              {ylArmed ? "[SYS ENGINE ARMED]" : "[DISARMED]"}
            </text>
          </g>

          {/* Right Reticle: MB (Quality Guardian) */}
          <g transform="translate(460, 120)">
            <circle cx="0" cy="0" r="45" fill="none" stroke={mbArmed ? "#a855f7" : "#f43f5e"} strokeWidth="2" opacity="0.8" />
            <circle cx="0" cy="0" r="32" fill="none" stroke={mbArmed ? "#a855f7" : "#f43f5e"} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="-55" y1="0" x2="55" y2="0" stroke={mbArmed ? "#a855f7" : "#f43f5e"} strokeWidth="1.5" />
            <line x1="0" y1="-55" x2="0" y2="55" stroke={mbArmed ? "#a855f7" : "#f43f5e"} strokeWidth="1.5" />
            <text x="0" y="-62" textAnchor="middle" fill={mbArmed ? "#c084fc" : "#fb7185"} fontSize="11" fontWeight="bold">
              PILOT 2: MB
            </text>
            <text x="0" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">
              {mbArmed ? "[RAG GATES ARMED]" : "[DISARMED]"}
            </text>
          </g>

          {/* Central Missile Launch / Merge Interlock Indicator */}
          <g transform="translate(300, 120)">
            <rect
              x="-60"
              y="-28"
              width="120"
              height="56"
              rx="12"
              fill={bothArmed ? "#052e16" : "#450a0a"}
              stroke={bothArmed ? "#10b981" : "#ef4444"}
              strokeWidth="2"
            />
            <text
              x="0"
              y="-5"
              textAnchor="middle"
              fill={bothArmed ? "#34d399" : "#f87171"}
              fontSize="11"
              fontWeight="bold"
            >
              {bothArmed ? "TARGET LOCK" : "GATE LOCKED"}
            </text>
            <text
              x="0"
              y="14"
              textAnchor="middle"
              fill={bothArmed ? "#a7f3d0" : "#fca5a5"}
              fontSize="9"
            >
              {bothArmed ? "RULE 5 CLEAR" : "DUAL SIGN REQ"}
            </text>
          </g>
        </svg>
      </div>

      {/* Dual Keylock Control Station Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left Pilot Keylock: YL */}
        <div className={`p-4 rounded-2xl border transition-all ${
          ylArmed
            ? 'bg-[#0a1628] border-cyan-500/40 shadow-md shadow-cyan-500/10'
            : 'bg-[#120b12] border-rose-500/30'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Key size={16} className={ylArmed ? 'text-cyan-400' : 'text-gray-500'} />
              <span className="text-xs font-bold text-gray-200">YL Keylock: Core Architect</span>
            </div>
            <button
              onClick={toggleYl}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition ${
                ylArmed
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {ylArmed ? <Unlock size={12} /> : <Lock size={12} />}
              <span>{ylArmed ? 'KEY TURNED' : 'KEY DISARMED'}</span>
            </button>
          </div>
          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
            Certifies: SQLite transaction cascades, LangGraph cycle bounds, and Docker CPU builds.
          </p>
        </div>

        {/* Right Pilot Keylock: MB */}
        <div className={`p-4 rounded-2xl border transition-all ${
          mbArmed
            ? 'bg-[#140a24] border-purple-500/40 shadow-md shadow-purple-500/10'
            : 'bg-[#120b12] border-rose-500/30'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Key size={16} className={mbArmed ? 'text-purple-400' : 'text-gray-500'} />
              <span className="text-xs font-bold text-gray-200">MB Keylock: Quality Guardian</span>
            </div>
            <button
              onClick={toggleMb}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition ${
                mbArmed
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {mbArmed ? <Unlock size={12} /> : <Lock size={12} />}
              <span>{mbArmed ? 'KEY TURNED' : 'KEY DISARMED'}</span>
            </button>
          </div>
          <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
            Certifies: RAGAS Golden Evaluation benchmark runs, Moroccan legal citations, and thesis defense scripts.
          </p>
        </div>
      </div>

      {/* Bottom Summary Invariant Banner */}
      <div className={`rounded-2xl p-3.5 border text-xs font-sans flex items-center justify-between transition ${
        bothArmed
          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
          : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
      }`}>
        <div className="flex items-center gap-2">
          <Zap size={14} className={bothArmed ? 'text-emerald-400' : 'text-rose-400'} />
          <span>
            {bothArmed
              ? 'Mission Interlock Authorized: Dual keylocks confirmed. Merge into master is green.'
              : 'Mission Abort (Rule 5 Enforced): Disarmed keylock blocks code from reaching master.'}
          </span>
        </div>
      </div>
    </div>
  );
};
