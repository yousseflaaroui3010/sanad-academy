import React, { useState } from 'react';
import { Scan } from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../../utils/soundEffects';

export const FactoryConveyorArtwork: React.FC = () => {
  const [fileType, setFileType] = useState<'unchanged' | 'new'>('unchanged');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (type: 'unchanged' | 'new') => {
    setFileType(type);
    setIsScanning(true);
    playSlideSwoosh();
    setTimeout(() => {
      setIsScanning(false);
      playHapticClick();
    }, 1200);
  };

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-[#070e17] text-cyan-400 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6 relative">
      {/* Conveyor Gantry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            <Scan size={16} className="text-cyan-400 animate-pulse" />
            <span>High-Tech Factory Conveyor • SHA-256 Laser Scanner</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Pallets pass beneath a cryptographic laser scanner; unchanged files bypass in 1ms
          </p>
        </div>

        {/* Interactive Scenario Buttons */}
        <div className="flex items-center gap-1.5 bg-cyan-950/60 p-1 rounded-xl border border-cyan-800/40">
          <button
            onClick={() => handleScan('unchanged')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              fileType === 'unchanged'
                ? 'bg-amber-500 text-black shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Unchanged File (Bypass)
          </button>
          <button
            onClick={() => handleScan('new')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              fileType === 'new'
                ? 'bg-cyan-500 text-black shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            New Document (Index)
          </button>
        </div>
      </div>

      {/* Industrial Conveyor SVG Canvas */}
      <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-[#0a1526] via-[#08101e] to-[#040810] p-4 sm:p-6 overflow-hidden">
        <svg viewBox="0 0 600 200" className="w-full h-auto">
          {/* Conveyor Belt Roller Track */}
          <line x1="40" y1="140" x2="560" y2="140" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
          {[70, 130, 190, 250, 310, 370, 430, 490, 550].map((rx) => (
            <circle key={rx} cx={rx} cy="140" r="7" fill="#334155" stroke="#475569" strokeWidth="2" />
          ))}

          {/* Overhead Laser Scanner Gantry (Station Center) */}
          <g transform="translate(300, 30)">
            {/* Gantry Arch */}
            <path d="M -60 0 L 60 0 L 50 40 L -50 40 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <circle cx="0" cy="40" r="6" fill="#00ffff" />

            {/* Scanning Cyan Laser Cone */}
            <polygon
              points="-35,42 35,42 80,140 -80,140"
              fill="url(#cyanLaserGrad)"
              opacity={isScanning ? "0.75" : "0.35"}
              className="transition-opacity duration-300"
            />
            {/* Animated Scanning Laser Line */}
            <line
              x1="-70"
              y1={isScanning ? "110" : "85"}
              x2="70"
              y2={isScanning ? "110" : "85"}
              stroke="#00ffff"
              strokeWidth="2.5"
              className="animate-pulse"
            />
          </g>

          {/* Laser Gradient Def */}
          <defs>
            <linearGradient id="cyanLaserGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Document Pallet Box */}
          <g transform="translate(300, 115)">
            <rect x="-45" y="-22" width="90" height="44" rx="8" fill="#1e293b" stroke={fileType === 'unchanged' ? "#f59e0b" : "#06b6d4"} strokeWidth="2" />
            <text x="0" y="-4" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
              {fileType === 'unchanged' ? "code_travail.pdf" : "new_policy.docx"}
            </text>
            <text x="0" y="10" textAnchor="middle" fill={fileType === 'unchanged' ? "#fbbf24" : "#38bdf8"} fontSize="8">
              {fileType === 'unchanged' ? "SHA: 7e9f210..." : "SHA: a3b1c4d..."}
            </text>
          </g>

          {/* Diverter Routing Arrow */}
          <g transform="translate(480, 115)">
            {fileType === 'unchanged' ? (
              <g>
                <line x1="0" y1="0" x2="60" y2="0" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 4" />
                <text x="30" y="-10" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">
                  FAST BYPASS (1ms)
                </text>
              </g>
            ) : (
              <g>
                <path d="M 0 0 Q 30 0 40 45" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="4 4" />
                <text x="40" y="60" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">
                  DIVERT TO CHUNKING
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Real-Time Telemetry Readout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
        <div className="p-4 rounded-2xl bg-black/40 border border-cyan-900/40 space-y-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase font-mono">
            Laser Scanner Decision:
          </span>
          <p className="text-gray-200 font-medium">
            {fileType === 'unchanged'
              ? 'SHA-256 matches SQLite database record. Zero GPU or CPU embedding cycles spent. Ingestion finishes in 1.2 milliseconds.'
              : 'New hash detected! Diverter sends file to PyMuPDF format ladder and parent-child vector chunking.'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono">
            Production Invariant:
          </span>
          <p className="text-gray-300">
            "Never re-process an unchanged file. Content hashing cuts daily indexing overhead by 95% in enterprise corporate workspaces."
          </p>
        </div>
      </div>
    </div>
  );
};
