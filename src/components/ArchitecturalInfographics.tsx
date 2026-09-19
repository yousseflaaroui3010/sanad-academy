import React, { useState } from 'react';
import { Layers, Sliders, Shield, Zap } from 'lucide-react';

interface InfographicProps {
  type: 'conversion-ladder' | 'hybrid-fusion' | 'bola-bouncer' | 'parent-child-lens';
}

export const ArchitecturalInfographics: React.FC<InfographicProps> = ({ type }) => {
  if (type === 'conversion-ladder') {
    return <ConversionLadderSVG />;
  }
  if (type === 'hybrid-fusion') {
    return <HybridFusionSVG />;
  }
  if (type === 'bola-bouncer') {
    return <BolaBouncerSVG />;
  }
  return <ParentChildLensSVG />;
};

// 1. Conversion Ladder SVG with Animated Scanning Pulse
function ConversionLadderSVG() {
  const [activeRung, setActiveRung] = useState<number>(0);

  const rungs = [
    { title: 'Rung 1: SHA-256 Hash Scanner', desc: 'Checks digital fingerprint; skips unchanged files', icon: '🔍' },
    { title: 'Rung 2: Format Parsers', desc: 'PyMuPDF, python-docx, python-pptx extraction', icon: '📄' },
    { title: 'Rung 3: OCR Fallback', desc: 'Tesseract OCR runs on scanned image-only pages', icon: '👁️' },
    { title: 'Rung 4: Parent-Child Splitter', desc: 'Produces 500-char children & 4,000-char parents', icon: '✂️' },
  ];

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <Layers size={14} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
              Animated Infographic: The 4-Rung Conversion Ladder
            </h3>
            <p className="text-[11px] text-[#86868b]">
              Click each rung to see how unstructured files become clean text
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-full">
          Infographic
        </span>
      </div>

      {/* SVG Ladder Diagram */}
      <div className="relative py-2 max-w-md mx-auto">
        <svg viewBox="0 0 360 220" className="w-full h-auto drop-shadow-sm">
          {/* Vertical Rails */}
          <line x1="60" y1="20" x2="60" y2="200" stroke="#0071e3" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
          <line x1="300" y1="20" x2="300" y2="200" stroke="#0071e3" strokeWidth="4" strokeLinecap="round" opacity="0.3" />

          {/* Rungs */}
          {[50, 95, 140, 185].map((y, idx) => {
            const isSelected = activeRung === idx;
            return (
              <g
                key={idx}
                className="cursor-pointer"
                onClick={() => setActiveRung(idx)}
              >
                {/* Horizontal Step */}
                <line
                  x1="60"
                  y1={y}
                  x2="300"
                  y2={y}
                  stroke={isSelected ? '#0071e3' : '#d2d2d7'}
                  strokeWidth={isSelected ? '6' : '3'}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />

                {/* Animated Scanner Node */}
                <circle
                  cx={180}
                  y={y}
                  r={isSelected ? '14' : '10'}
                  fill={isSelected ? '#0071e3' : '#ffffff'}
                  stroke={isSelected ? '#0071e3' : '#86868b'}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                <text
                  x={180}
                  y={y + 4}
                  textAnchor="middle"
                  fill={isSelected ? '#ffffff' : '#1d1d1f'}
                  fontSize="11"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  {idx + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Rung Detail Banner */}
      <div className="rounded-2xl bg-white/70 p-3.5 border border-black/5 flex items-center gap-3">
        <div className="text-2xl">{rungs[activeRung].icon}</div>
        <div>
          <span className="text-xs font-bold text-[#1d1d1f]">
            {rungs[activeRung].title}
          </span>
          <p className="text-xs text-[#6e6e73]">
            {rungs[activeRung].desc}
          </p>
        </div>
      </div>
    </div>
  );
}

// 2. Hybrid Search Fusion Chamber SVG
function HybridFusionSVG() {
  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
            <Sliders size={14} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
              Animated Infographic: Reciprocal Rank Fusion (RRF)
            </h3>
            <p className="text-[11px] text-[#86868b]">
              Dense Vector Semantics + Lexical BM25 fused into a single ranking
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200/60 px-2 py-0.5 rounded-full">
          RRF Formula
        </span>
      </div>

      {/* SVG Fusion Chamber */}
      <div className="py-2 max-w-lg mx-auto">
        <svg viewBox="0 0 400 160" className="w-full h-auto">
          {/* Dense Vector Stream */}
          <path
            d="M 50 30 Q 150 30 200 80"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <circle cx="50" cy="30" r="18" fill="#8b5cf6" opacity="0.15" />
          <text x="50" y="34" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold">Dense</text>

          {/* Lexical BM25 Stream */}
          <path
            d="M 50 130 Q 150 130 200 80"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          <circle cx="50" cy="130" r="18" fill="#06b6d4" opacity="0.15" />
          <text x="50" y="134" textAnchor="middle" fill="#06b6d4" fontSize="10" fontWeight="bold">BM25</text>

          {/* Fusion Chamber Core */}
          <circle cx="200" cy="80" r="26" fill="#0071e3" opacity="0.1" />
          <circle cx="200" cy="80" r="18" fill="#0071e3" />
          <text x="200" y="84" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">RRF</text>

          {/* Output Unified Stream */}
          <path
            d="M 200 80 L 350 80"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
          />
          <circle cx="350" cy="80" r="18" fill="#10b981" opacity="0.15" />
          <text x="350" y="84" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Top-K</text>
        </svg>
      </div>

      <div className="rounded-2xl bg-black/5 p-3 text-xs text-[#6e6e73] font-mono text-center">
        RRF Score = 1 / (60 + Dense_Rank) + 1 / (60 + BM25_Rank)
      </div>
    </div>
  );
}

// 3. BOLA Silent 404 Bouncer SVG
function BolaBouncerSVG() {
  const [hasPermission, setHasPermission] = useState(false);

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
            <Shield size={14} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
              Animated Infographic: OWASP BOLA Silent 404 Defense
            </h3>
            <p className="text-[11px] text-[#86868b]">
              Why returning 404 Not Found defeats ID enumeration attacks
            </p>
          </div>
        </div>
        <button
          onClick={() => setHasPermission(!hasPermission)}
          className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
            hasPermission
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
              : 'bg-rose-50 text-rose-700 border border-rose-200/60'
          }`}
        >
          {hasPermission ? 'User Has Grant: Open' : 'Unauthorized: Silent 404'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-white/70 border border-black/5 space-y-1">
          <span className="font-bold text-[#1d1d1f]">Traditional Naive API (403):</span>
          <p className="text-[#6e6e73]">
            Returns <code className="text-rose-600 font-bold font-mono">403 Forbidden</code>. Attacker learns the secret workspace exists and begins brute-forcing keys.
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 space-y-1">
          <span className="font-bold text-emerald-900">Sanad BOLA Defense (404):</span>
          <p className="text-emerald-800">
            Returns <code className="text-emerald-700 font-bold font-mono">404 Not Found</code>. Attacker gets zero confirmation of existence, terminating enumeration.
          </p>
        </div>
      </div>
    </div>
  );
}

// 4. Parent-Child Lens SVG
function ParentChildLensSVG() {
  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-black/5 pb-3">
        <div className="h-7 w-7 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
          <Zap size={14} />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
            Parent-Child Telescopic Lens
          </h3>
          <p className="text-[11px] text-[#86868b]">
            High precision at search time ➡️ Comprehensive context at synthesis time
          </p>
        </div>
      </div>
      <div className="text-xs text-[#6e6e73] leading-relaxed">
        Child chunks preserve dense mathematical similarity without dilution; parent chunks supply preceding definitions, subsequent exceptions, and article headings directly to the LLM prompt.
      </div>
    </div>
  );
}
