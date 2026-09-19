import React, { useState } from 'react';
import { HnswGraphVisualizer } from './HnswGraphVisualizer';
import { Bm25SaturationToy } from './Bm25SaturationToy';
import { CosineMathVisualizer } from './CosineMathVisualizer';
import { SqliteWalVisualizer } from './SqliteWalVisualizer';
import { SingleFlightStressTester } from './SingleFlightStressTester';
import { BpeTokenizerToy } from './BpeTokenizerToy';
import { TemperatureVisualizer } from './TemperatureVisualizer';
import { ClaimDecompositionToy } from './ClaimDecompositionToy';
import { TimingAttackOscilloscope } from './TimingAttackOscilloscope';
import { Sha256AvalancheVisualizer } from './Sha256AvalancheVisualizer';
import { JwtCookieHardening } from './JwtCookieHardening';
import { CgroupsOomSimulator } from './CgroupsOomSimulator';
import { ZeroLockMigrationTimeline } from './ZeroLockMigrationTimeline';
import { OpenApiDriftDiffing } from './OpenApiDriftDiffing';
import { Network, Database, Brain, Sparkles, Shield, Server } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

export const HiddenScienceLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'s1' | 's2' | 's3' | 's4' | 's5'>('s1');

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-700">
          <Sparkles size={14} />
          <span>The Hidden Engineering Science (Under the Hood of Sanad)</span>
        </div>

        {/* 5 Hidden Science Sprints Switcher */}
        <div className="flex items-center rounded-2xl bg-black/5 p-1 border border-black/5 text-xs font-semibold self-start sm:self-auto overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('s1');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 's1' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#6e6e73]'
            }`}
          >
            <Network size={12} className="text-purple-600" />
            <span>S-1: Vectors</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('s2');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 's2' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#6e6e73]'
            }`}
          >
            <Database size={12} className="text-blue-600" />
            <span>S-2: Storage</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('s3');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 's3' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#6e6e73]'
            }`}
          >
            <Brain size={12} className="text-emerald-600" />
            <span>S-3: NLP</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('s4');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 's4' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#6e6e73]'
            }`}
          >
            <Shield size={12} className="text-rose-600" />
            <span>S-4: Crypto</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('s5');
              playHapticClick();
            }}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 whitespace-nowrap transition ${
              activeTab === 's5' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#6e6e73]'
            }`}
          >
            <Server size={12} className="text-indigo-600" />
            <span>S-5: OS & Cloud</span>
          </button>
        </div>
      </div>

      {/* SPRINT S-1: Vector Science */}
      {activeTab === 's1' && (
        <div className="space-y-6">
          <HnswGraphVisualizer />
          <Bm25SaturationToy />
          <CosineMathVisualizer />
        </div>
      )}

      {/* SPRINT S-2: Storage & Concurrency */}
      {activeTab === 's2' && (
        <div className="space-y-6">
          <SqliteWalVisualizer />
          <SingleFlightStressTester />
        </div>
      )}

      {/* SPRINT S-3: NLP & Metrics */}
      {activeTab === 's3' && (
        <div className="space-y-6">
          <BpeTokenizerToy />
          <TemperatureVisualizer />
          <ClaimDecompositionToy />
        </div>
      )}

      {/* SPRINT S-4: Cryptography & Zero-Trust */}
      {activeTab === 's4' && (
        <div className="space-y-6">
          <TimingAttackOscilloscope />
          <Sha256AvalancheVisualizer />
          <JwtCookieHardening />
        </div>
      )}

      {/* SPRINT S-5: Systems Engineering & Cloud */}
      {activeTab === 's5' && (
        <div className="space-y-6">
          <CgroupsOomSimulator />
          <ZeroLockMigrationTimeline />
          <OpenApiDriftDiffing />
        </div>
      )}
    </div>
  );
};
