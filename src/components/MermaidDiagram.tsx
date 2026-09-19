import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { GitGraph, Copy, Check, Sparkles } from 'lucide-react';
import { playHapticClick } from '../utils/soundEffects';

interface MermaidDiagramProps {
  chart: string;
  title?: string;
  diagramType?: 'sequence' | 'mindmap' | 'flowchart' | 'class' | 'er' | 'state' | 'architecture';
}

// Global initialization of Mermaid with Apple-style light theme
let isInitialized = false;
function initMermaid() {
  if (isInitialized || typeof window === 'undefined') return;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    themeVariables: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Plus Jakarta Sans", sans-serif',
      fontSize: '12px',
      primaryColor: '#f0f9ff',
      primaryTextColor: '#0f172a',
      primaryBorderColor: '#0284c7',
      lineColor: '#0284c7',
      secondaryColor: '#f8fafc',
      tertiaryColor: '#ffffff',
      mainBkg: '#ffffff',
      nodeBorder: '#0284c7',
      clusterBkg: '#f8fafc',
      titleColor: '#0f172a',
      edgeLabelBackground: '#ffffff'
    },
    securityLevel: 'loose',
  });
  isInitialized = true;
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  title,
  diagramType = 'architecture'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    initMermaid();

    let isMounted = true;
    const renderId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    if (!chart || !chart.trim()) {
      setSvgContent('');
      return;
    }

    mermaid
      .render(renderId, chart.trim())
      .then((result) => {
        if (isMounted) {
          setSvgContent(result.svg);
          setRenderError(null);
        }
      })
      .catch((err) => {
        console.warn('Mermaid render warning:', err);
        if (isMounted) {
          setRenderError('Visual diagram format loaded.');
          // Remove any stray error elements inserted by Mermaid into document.body
          const stray = document.getElementById(renderId);
          if (stray) stray.remove();
        }
      });

    return () => {
      isMounted = false;
    };
  }, [chart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart.trim());
    setCopied(true);
    playHapticClick();
    setTimeout(() => setCopied(false), 1500);
  };

  const getBadgeLabel = () => {
    switch (diagramType) {
      case 'sequence':
        return 'Sequence Flow ⚡';
      case 'mindmap':
        return 'Architecture Mindmap 🧠';
      case 'state':
        return 'Cyclic State Graph 🔄';
      case 'er':
        return 'Entity Relationship (ER) 🗄️';
      case 'flowchart':
        return 'Decision Flowchart 🗺️';
      default:
        return 'Specification Architecture 📐';
    }
  };

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-7 shadow-sm space-y-4 transition-all duration-300">
      {/* Diagram Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <GitGraph size={14} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#1d1d1f]">
              {title || 'Architectural Specification Diagram'}
            </h4>
            <p className="text-[11px] text-[#86868b]">
              Rendered natively from Sanad's write-locked engineering specifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
            {getBadgeLabel()}
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-full p-1.5 sm:px-2.5 sm:py-1 bg-black/5 hover:bg-black/10 text-[11px] font-semibold text-[#424245] transition"
            title="Copy Mermaid source syntax"
          >
            {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Mermaid Code'}</span>
          </button>
        </div>
      </div>

      {/* SVG Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto py-2 flex justify-center items-center min-h-[140px]"
      >
        {svgContent ? (
          <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto drop-shadow-xs"
          />
        ) : renderError ? (
          <div className="rounded-2xl bg-black/5 p-4 font-mono text-xs text-gray-700 w-full overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {chart}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#86868b] animate-pulse">
            <Sparkles size={14} className="text-blue-500" />
            <span>Rendering diagram...</span>
          </div>
        )}
      </div>
    </div>
  );
};
