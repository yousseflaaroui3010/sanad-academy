import React, { useState } from 'react';
import {
  FileText,
  ZoomIn,
  ZoomOut,
  Highlighter,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

export const MoroccanLaborCodeViewer: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<'184' | '14'>('184');
  const [viewLayer, setViewLayer] = useState<'scan' | 'ocr' | 'chunks'>('scan');
  const [isHighlighted, setIsHighlighted] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);

  const articles = {
    '184': {
      number: 'Article 184',
      topic: 'Durée normale de travail (44h/semaine)',
      page: 'Page 28 (Bulletin Officiel n° 5210)',
      fullText:
        "Dans les activités non agricoles, la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine. La durée annuelle globale de travail peut être répartie sur l'année selon les besoins de l'entreprise à condition que la durée quotidienne de travail n'excède pas 10 heures, sous réserve des dérogations prévues par les articles 189, 190 et 192.\n\nDans les activités agricoles, la durée normale de travail est fixée à 2496 heures par an. Elle est répartie par périodes selon les nécessités des cultures suivant des modalités fixées par l'autorité gouvernementale compétente après avis des organisations professionnelles des employeurs et des syndicats des salariés les plus représentatifs.",
      highlightSnippet:
        "la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine.",
      ocrProblem:
        "Raw 2004 scans contain micro-faded characters ('2288' often misread as '2200' by cheap scrapers). Tesseract OCR with French/Arabic dictionaries guarantees exact numerical extraction.",
      parentChildBenefit:
        "If you only index the 44h snippet (child), the AI misses the 10-hour daily cap and Articles 189/190 exceptions. Sanad passes the entire 4,000-char parent article to the LLM."
    },
    '14': {
      number: 'Article 14',
      topic: "Période d'essai des cadres (3 mois x 2)",
      page: 'Page 8 (Bulletin Officiel n° 5210)',
      fullText:
        "La période d'essai est la période pendant laquelle chacune des parties peut rompre volontairement le contrat de travail sans préavis ni indemnité.\n\nToutefois, après au moins une semaine passée en période d'essai, la rupture de celle-ci ne peut intervenir qu'après notification d'un délai de prévenance.\n\nLa période d'essai pour les contrats à durée indéterminée est fixée à :\n- trois mois pour les cadres et assimilés, renouvelable une fois ;\n- un mois et demi pour les employés, renouvelable une fois ;\n- quinze jours pour les ouvriers, renouvelable une fois.",
      highlightSnippet:
        "trois mois pour les cadres et assimilés, renouvelable une fois ;",
      ocrProblem:
        "Bullet lists in scanned Moroccan law are separated by French em-dashes and indentations that naive single-line extractors flatten into illegible runs.",
      parentChildBenefit:
        "The child chunk catches 'cadres 3 mois', but the parent article contains the vital pre-notice rule ('délai de prévenance') preventing legal penalties for the client."
    }
  };

  const current = articles[activeArticle];

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(130, Math.max(80, prev + delta)));
    playHapticClick();
  };

  return (
    <div className="rounded-3xl border border-[#d0d7de] bg-[#f6f8fa] text-[#1f2328] shadow-sm overflow-hidden font-sans">
      {/* PDF Viewer Top Toolbar */}
      <div className="bg-[#2d333b] text-white px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-black/20 text-xs">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-red-400 flex-shrink-0" />
          <span className="font-semibold truncate max-w-[220px] sm:max-w-md font-mono">
            bulletin_officiel_5210_code_du_travail.pdf
          </span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-gray-300">
            {current.page}
          </span>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom */}
          <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg px-2 py-1">
            <button
              onClick={() => handleZoom(-10)}
              className="hover:text-blue-300 p-0.5"
              title="Zoom Out"
            >
              <ZoomOut size={13} />
            </button>
            <span className="text-[10px] tabular-nums font-mono px-1">{zoomLevel}%</span>
            <button
              onClick={() => handleZoom(10)}
              className="hover:text-blue-300 p-0.5"
              title="Zoom In"
            >
              <ZoomIn size={13} />
            </button>
          </div>

          {/* Highlighter Toggle */}
          <button
            onClick={() => {
              setIsHighlighted(!isHighlighted);
              playHapticClick();
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition ${
              isHighlighted ? 'bg-yellow-400 text-black' : 'bg-white/10 text-gray-300'
            }`}
            title="Toggle Yellow Neon Highlighter"
          >
            <Highlighter size={12} />
            <span className="hidden sm:inline">Highlight</span>
          </button>
        </div>
      </div>

      {/* Layer Mode Switcher Bar */}
      <div className="bg-white border-b border-[#d0d7de] px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Article Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[#656d76]">Inspect Statute:</span>
          {(['184', '14'] as const).map((artKey) => (
            <button
              key={artKey}
              onClick={() => {
                setActiveArticle(artKey);
                playHapticClick();
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                activeArticle === artKey
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-black/5 text-[#656d76] hover:bg-black/10'
              }`}
            >
              Article {artKey}
            </button>
          ))}
        </div>

        {/* View Layer Selector */}
        <div className="flex items-center rounded-full bg-black/5 p-1 text-xs self-start sm:self-auto border border-black/5">
          <button
            onClick={() => {
              setViewLayer('scan');
              playHapticClick();
            }}
            className={`px-3 py-1 rounded-full font-semibold transition ${
              viewLayer === 'scan' ? 'bg-white text-[#1f2328] shadow-xs' : 'text-[#656d76]'
            }`}
          >
            Parchment Scan
          </button>
          <button
            onClick={() => {
              setViewLayer('ocr');
              playHapticClick();
            }}
            className={`px-3 py-1 rounded-full font-semibold transition ${
              viewLayer === 'ocr' ? 'bg-white text-[#1f2328] shadow-xs' : 'text-[#656d76]'
            }`}
          >
            OCR Extracted Layer
          </button>
          <button
            onClick={() => {
              setViewLayer('chunks');
              playHapticClick();
            }}
            className={`px-3 py-1 rounded-full font-semibold transition ${
              viewLayer === 'chunks' ? 'bg-white text-blue-700 shadow-xs' : 'text-[#656d76]'
            }`}
          >
            Parent-Child Slices
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="p-4 sm:p-8 flex flex-col lg:flex-row gap-6 items-start">
        {/* Parchment Document Page Preview */}
        <div className="flex-1 w-full flex justify-center">
          <div
            className="w-full max-w-2xl bg-[#fdfbf7] rounded-2xl border border-[#e3ded2] p-6 sm:p-10 shadow-md text-[#2b2b2b] transition-all duration-300 relative overflow-hidden"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Authentic Moroccan Bulletin Header Stamp */}
            <div className="text-center border-b-2 border-[#2b2b2b] pb-4 mb-6 space-y-1">
              <span className="text-[10px] font-bold tracking-widest uppercase block font-serif text-[#5a5a5a]">
                ROYAUME DU MAROC — BULLETIN OFFICIEL
              </span>
              <h3 className="text-base sm:text-lg font-black font-serif tracking-tight">
                DAHIR N° 1-03-194 PORTANT CODE DU TRAVAIL
              </h3>
              <p className="text-[10px] text-[#5a5a5a] font-serif">
                Édition officielle du 11 septembre 2003 • N° 5210 • {current.page}
              </p>
            </div>

            {/* Document Content */}
            {viewLayer === 'scan' && (
              <div className="font-serif leading-relaxed text-xs sm:text-sm space-y-4 text-justify">
                <div className="font-bold uppercase tracking-wide text-xs border-b border-[#e3ded2] pb-1">
                  {current.number} — {current.topic}
                </div>

                <div className="space-y-3 whitespace-pre-line text-[#1f2328]">
                  {current.fullText.split(current.highlightSnippet).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span
                          className={`transition-all duration-300 ${
                            isHighlighted
                              ? 'bg-[#fff566] text-black font-semibold px-1 py-0.5 rounded shadow-xs'
                              : ''
                          }`}
                        >
                          {current.highlightSnippet}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="pt-6 border-t border-[#e3ded2] flex justify-between text-[10px] text-[#656d76] font-sans">
                  <span>Sceau Officiel de l'État</span>
                  <span>Authentifié par le Ministère de l'Emploi</span>
                </div>
              </div>
            )}

            {/* OCR Extracted Text Layer */}
            {viewLayer === 'ocr' && (
              <div className="font-mono text-xs space-y-3 text-[#1f2328] bg-white p-4 rounded-xl border border-[#d0d7de]">
                <div className="flex items-center justify-between text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  <span>✓ OCR Engine: Tesseract 5.4 (fra + ara)</span>
                  <span>Confidence: 99.4%</span>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {current.fullText}
                </pre>
              </div>
            )}

            {/* Parent-Child Slice View */}
            {viewLayer === 'chunks' && (
              <div className="space-y-3 font-sans text-xs">
                <div className="rounded-xl border border-purple-300 bg-purple-50/60 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-purple-800 uppercase block">
                    Parent Passage (~4,000 chars context stored on disk)
                  </span>
                  <p className="text-[#1f2328] leading-relaxed font-serif italic text-xs">
                    "{current.fullText}"
                  </p>
                </div>

                <div className="rounded-xl border border-blue-300 bg-blue-50/60 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block">
                    Child Chunk (500 chars indexed in Qdrant with 768-dim E5 Vector)
                  </span>
                  <p className="text-blue-900 font-bold bg-white p-2 rounded border border-blue-200">
                    "{current.highlightSnippet}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Why This Architecture Exists */}
        <div className="w-full lg:w-80 space-y-4 flex-shrink-0">
          <div className="liquid-glass rounded-2xl p-4 sm:p-5 space-y-3 border border-blue-500/20 shadow-xs">
            <div className="flex items-center gap-2 text-blue-700">
              <Sparkles size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Why OCR Ladder is Mandatory
              </h4>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              {current.ocrProblem}
            </p>
          </div>

          <div className="liquid-glass rounded-2xl p-4 sm:p-5 space-y-3 border border-emerald-500/20 shadow-xs">
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Why Parent-Child Beats Uniform RAG
              </h4>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              {current.parentChildBenefit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
