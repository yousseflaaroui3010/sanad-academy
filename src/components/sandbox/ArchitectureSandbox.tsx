import React, { useState } from 'react';
import { IngestionLab } from './IngestionLab';
import { LangGraphDebugger } from './LangGraphDebugger';
import { RrfToy } from './RrfToy';
import { HiddenScienceLab } from '../science/HiddenScienceLab';
import { Layers, Terminal, Sliders, Sparkles, Atom } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

export const ArchitectureSandbox: React.FC = () => {
  const [activeLab, setActiveLab] = useState<'ingestion' | 'debugger' | 'rrf' | 'science'>('ingestion');

  return (
    <div className="max-w-4xl mx-auto py-2 sm:py-4 px-2 sm:px-4 space-y-5 animate-in fade-in duration-200">
      {/* Sandbox Header & Lab Segmented Control */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Sparkles size={14} />
              <span>Interactive R&D Lab</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f] mt-1">
              Live Architecture Sandbox
            </h1>
            <p className="text-xs sm:text-sm text-[#86868b] mt-1">
              Interact directly with Sanad's real-time chunking engines, LangGraph state debugger, and RRF rank fusion
            </p>
          </div>

          {/* Segmented Lab Picker */}
          <div className="flex items-center rounded-2xl bg-black/5 p-1 border border-black/5 self-start sm:self-auto shadow-inner">
            <button
              onClick={() => {
                setActiveLab('ingestion');
                playHapticClick();
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                activeLab === 'ingestion'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Layers size={13} />
              <span>Ingestion Lab</span>
            </button>

            <button
              onClick={() => {
                setActiveLab('debugger');
                playHapticClick();
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                activeLab === 'debugger'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Terminal size={13} />
              <span>LangGraph Console</span>
            </button>

            <button
              onClick={() => {
                setActiveLab('rrf');
                playHapticClick();
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                activeLab === 'rrf'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Sliders size={13} />
              <span>RRF Weighting</span>
            </button>

            <button
              onClick={() => {
                setActiveLab('science');
                playHapticClick();
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                activeLab === 'science'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <Atom size={13} className="text-purple-600" />
              <span>Hidden Science</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Lab Component */}
      {activeLab === 'ingestion' && <IngestionLab />}
      {activeLab === 'debugger' && <LangGraphDebugger />}
      {activeLab === 'rrf' && <RrfToy />}
      {activeLab === 'science' && <HiddenScienceLab />}
    </div>
  );
};
