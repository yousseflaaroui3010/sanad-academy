import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REBUILD_STAGES } from '../data/rebuildStagesData';
import { REBUILD_VOICEOVER_SCRIPTS } from '../data/rebuildVoiceoverScripts';
import { RequirementsMatrixInteractive } from './rebuild/RequirementsMatrixInteractive';
import { LegalPrecedentsInteractive } from './rebuild/LegalPrecedentsInteractive';
import { ScrumCockpitInteractive } from './rebuild/ScrumCockpitInteractive';
import { TechScoutingInteractive } from './rebuild/TechScoutingInteractive';
import { HexagonalPortsInteractive } from './rebuild/HexagonalPortsInteractive';
import { DataTopologyInteractive } from './rebuild/DataTopologyInteractive';
import { ProjectTreeInteractive } from './rebuild/ProjectTreeInteractive';
import { DevOpsPipelineInteractive } from './rebuild/DevOpsPipelineInteractive';
import { SplitScreenCodeStudio } from './rebuild/SplitScreenCodeStudio';
import { GitWorkflowInteractive } from './rebuild/GitWorkflowInteractive';
import { IncidentPostMortemInteractive } from './rebuild/IncidentPostMortemInteractive';
import { AdrDecisionBrowserInteractive } from './rebuild/AdrDecisionBrowserInteractive';
import { RailwayCloudDeploymentInteractive } from './rebuild/RailwayCloudDeploymentInteractive';
import { GoldenBenchmarkRunnerInteractive } from './rebuild/GoldenBenchmarkRunnerInteractive';
import { MonitoringTracingInteractive } from './rebuild/MonitoringTracingInteractive';
import { ReleaseReadinessDefenseInteractive } from './rebuild/ReleaseReadinessDefenseInteractive';
import { WorkedExampleFlowInteractive } from './rebuild/WorkedExampleFlowInteractive';
import { AudioPlayer } from './AudioPlayer';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  Flame,
  Scale,
  Minimize2,
  Volume2,
  LayoutGrid,
  X,
  Presentation,
} from 'lucide-react';
import { playHapticClick, playSlideSwoosh } from '../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
  onOpenCertificate?: () => void;
}

export const RebuildStagesView: React.FC<Props> = ({ lang = 'en', onOpenCertificate }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [isWorkedExampleOpen, setIsWorkedExampleOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'en' | 'fr'>(lang);
  const [autoPlayAudio] = useState(false);

  const stage = REBUILD_STAGES[currentStageIdx] || REBUILD_STAGES[0];
  const voiceover = REBUILD_VOICEOVER_SCRIPTS[stage.id] || REBUILD_VOICEOVER_SCRIPTS['stage-1'];
  const activeScript = activeLang === 'fr' ? voiceover.scriptFr : voiceover.scriptEn;

  useEffect(() => {
    setActiveLang(lang);
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentStageIdx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || (isFullscreen && e.key === ' ')) {
        e.preventDefault();
        if (currentStageIdx < REBUILD_STAGES.length - 1) {
          setCurrentStageIdx((prev) => prev + 1);
          playSlideSwoosh();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentStageIdx > 0) {
          setCurrentStageIdx((prev) => prev - 1);
          playSlideSwoosh();
        }
      } else if (e.key === 't' || e.key === 'T') {
        if (isFullscreen) {
          e.preventDefault();
          setIsDrawerOpen((prev) => !prev);
          playHapticClick();
        }
      } else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        setIsAudioOpen((prev) => !prev);
        playHapticClick();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
        } else if (isFullscreen) {
          setIsFullscreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStageIdx, isFullscreen, isDrawerOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    playHapticClick();
  };

  const handleAudioEnded = () => {
    if (autoPlayAudio && currentStageIdx < REBUILD_STAGES.length - 1) {
      setCurrentStageIdx((prev) => prev + 1);
      playSlideSwoosh();
    }
  };

  const renderInteractiveArtifact = () => {
    switch (stage.interactiveComponentId) {
      case 'requirements-matrix':
        return <RequirementsMatrixInteractive lang={activeLang} />;
      case 'legal-precedents':
        return <LegalPrecedentsInteractive lang={activeLang} />;
      case 'scrum-cockpit':
        return <ScrumCockpitInteractive lang={activeLang} />;
      case 'tech-scout':
        return <TechScoutingInteractive lang={activeLang} />;
      case 'hexagonal-ports':
        return <HexagonalPortsInteractive lang={activeLang} />;
      case 'data-topology':
        return <DataTopologyInteractive lang={activeLang} />;
      case 'project-tree':
        return <ProjectTreeInteractive lang={activeLang} />;
      case 'devops-pipeline':
        return <DevOpsPipelineInteractive lang={activeLang} />;
      case 'split-code':
        return <SplitScreenCodeStudio lang={activeLang} />;
      case 'git-workflow':
        return <GitWorkflowInteractive lang={activeLang} />;
      case 'incidents':
        return <IncidentPostMortemInteractive lang={activeLang} />;
      case 'adr-browser':
        return <AdrDecisionBrowserInteractive lang={activeLang} />;
      case 'cloud-deploy':
        return <RailwayCloudDeploymentInteractive lang={activeLang} />;
      case 'golden-benchmark':
        return <GoldenBenchmarkRunnerInteractive lang={activeLang} />;
      case 'monitoring-trace':
        return <MonitoringTracingInteractive lang={activeLang} />;
      case 'defense-readiness':
        return <ReleaseReadinessDefenseInteractive lang={activeLang} onOpenCertificate={onOpenCertificate} />;
      default:
        return null;
    }
  };

  // The Main Slide Content Block (Reused in standard page mode and Fullscreen Keynote mode)
  const renderStageCanvas = () => (
    <div className="space-y-7 w-full max-w-5xl mx-auto py-2">
      {/* Stage Header Info */}
      <div className="space-y-2 text-left">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#86868b]">
          <span className="text-blue-600 font-bold uppercase tracking-wider">
            {activeLang === 'fr' && stage.phaseFr ? stage.phaseFr : stage.phase}
          </span>
          <span>•</span>
          <span>{activeLang === 'fr' ? `Étape ${stage.stageNumber} sur 16` : `Stage ${stage.stageNumber} of 16`}</span>
          <span>•</span>
          <span className="font-mono text-purple-600 font-bold">Voice: {voiceover.speaker}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
          {activeLang === 'fr' && stage.titleFr ? stage.titleFr : stage.title}
        </h1>
        <p className="text-sm sm:text-base text-[#6e6e73] font-medium">
          {activeLang === 'fr' && stage.subtitleFr ? stage.subtitleFr : stage.subtitle}
        </p>
      </div>

      {/* Checkable Facts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
        {stage.checkableFacts.map((fact, idx) => (
          <div key={idx} className="liquid-glass rounded-2xl p-3.5 space-y-1 border-black/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block">
              {fact.label}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[#1d1d1f] block leading-tight">
              {fact.value}
            </span>
            <span className="text-[10px] font-mono text-blue-600 truncate block pt-0.5" title={fact.proofFileOrSource}>
              {fact.proofFileOrSource}
            </span>
          </div>
        ))}
      </div>

      {/* 📚 1. The Librarian Thread Analogy */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-4 border-blue-500/20 shadow-sm text-left">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            🏛️
          </div>
          <div className="space-y-1 flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              {activeLang === 'fr'
                ? "L'Analogie du Fil Conducteur de la Bibliothécaire (ISO 24495-1 Langage Clair)"
                : 'The Librarian Thread Analogy (ISO 24495-1 Plain Language)'}
            </span>
            <h2 className="text-base sm:text-xl font-bold text-[#1d1d1f]">
              {activeLang === 'fr'
                ? "Comment Expliquer cette Étape à un Enfant ou au Jury de Soutenance"
                : 'How to Explain This Stage to a Child or Academic Jury'}
            </h2>
            <p className="text-sm text-[#424245] leading-relaxed pt-1 font-medium">
              "{activeLang === 'fr' && stage.librarianAnalogyFr ? stage.librarianAnalogyFr.story : stage.librarianAnalogy.story}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-black/5">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Eye size={13} />
              <span>{activeLang === 'fr' ? 'Correspondance Logicielle Exacte' : 'Exact Software Mapping'}</span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              {activeLang === 'fr' && stage.librarianAnalogyFr ? stage.librarianAnalogyFr.mapping : stage.librarianAnalogy.mapping}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1">
            <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <Scale size={13} />
              <span>{activeLang === 'fr' ? "Où s'Arrête l'Analogie" : 'Where the Analogy Stops'}</span>
            </div>
            <p className="text-xs text-[#424245] leading-relaxed">
              {activeLang === 'fr' && stage.librarianAnalogyFr ? stage.librarianAnalogyFr.boundary : stage.librarianAnalogy.boundary}
            </p>
          </div>
        </div>
      </div>

      {/* 🚨 2. The Real Stakes & Core Problem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-2 border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-600">
            <Flame size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              {activeLang === 'fr' ? 'Contexte Réel & Enjeux de Terrain' : 'The Real Circumstances & Stakes'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
            {activeLang === 'fr' && stage.executiveContextFr ? stage.executiveContextFr : stage.executiveContext}
          </p>
        </div>

        <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-2 border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-600">
            <Scale size={16} />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              {activeLang === 'fr' ? 'Le Mode de Défaillance (Ce qui Échoue)' : 'The Failure Mode (What Blows Up)'}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
            {activeLang === 'fr' && stage.coreProblemFr ? stage.coreProblemFr : stage.coreProblem}
          </p>
        </div>
      </div>

      {/* 🛠️ 3. Specialized Interactive Laboratory Sandbox */}
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73] block">
            {activeLang === 'fr' ? `Bac à Sable d'Inspection Interactive (Étape ${stage.stageNumber})` : `Stage ${stage.stageNumber} Interactive Inspection Sandbox`}
          </span>
          <span className="text-[11px] font-mono text-[#86868b]">
            Live RAG_project_ENSA Invariants
          </span>
        </div>
        {renderInteractiveArtifact()}
      </div>

      {/* 📐 4. The Engineering Solution Architecture */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-3 border-emerald-500/20 text-left">
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck size={16} />
          <span>{activeLang === 'fr' ? "Architecture de la Solution d'Ingénierie" : 'The Engineering Solution Architecture'}</span>
        </div>
        <p className="text-sm text-[#424245] leading-relaxed">
          {activeLang === 'fr' && stage.solutionArchitectureFr ? stage.solutionArchitectureFr : stage.solutionArchitecture}
        </p>
      </div>
    </div>
  );

  // VIEW MODE 1: FULLSCREEN KEYNOTE SLIDE DECK MODE
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#f5f5f7] flex flex-col h-screen w-screen overflow-hidden">
        {/* Fixed Top Keynote Header */}
        <header className="flex-shrink-0 z-20 w-full bg-[#f5f5f7]/95 backdrop-blur-md border-b border-black/5 px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Filmstrip Navigator Button */}
            <button
              onClick={() => {
                setIsDrawerOpen(!isDrawerOpen);
                playHapticClick();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition border shadow-xs ${
                isDrawerOpen
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white/80 text-[#1d1d1f] border-black/10 hover:bg-white'
              }`}
              title="Toggle Stage Navigator (Key: T)"
            >
              <LayoutGrid size={13} />
              <span>Navigator</span>
              <span className="text-[10px] font-mono opacity-60">T</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#86868b]">
              <span>Stage {stage.stageNumber} of 16</span>
              <span>/</span>
              <span className="text-[#1d1d1f] font-bold truncate max-w-xs">{stage.title}</span>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center rounded-full bg-black/5 p-0.5 border border-black/5 text-xs font-semibold">
              <button
                onClick={() => setActiveLang('en')}
                className={`px-2.5 py-0.5 rounded-full transition text-[11px] ${
                  activeLang === 'en' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#6e6e73]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setActiveLang('fr')}
                className={`px-2.5 py-0.5 rounded-full transition text-[11px] ${
                  activeLang === 'fr' ? 'bg-blue-600 text-white shadow-xs' : 'text-[#6e6e73]'
                }`}
              >
                FR
              </button>
            </div>

            {/* Worked Example (R-09) Trigger */}
            <button
              onClick={() => setIsWorkedExampleOpen(!isWorkedExampleOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition border shadow-xs ${
                isWorkedExampleOpen
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white/80 text-[#1d1d1f] border-black/10 hover:bg-white'
              }`}
              title="Trace Worked Legal Example (Rule R-09)"
            >
              <Scale size={13} />
              <span className="hidden sm:inline">Worked Example (Art. 43)</span>
            </button>

            {/* Voiceover Button */}
            <button
              onClick={() => setIsAudioOpen(!isAudioOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition border shadow-xs ${
                isAudioOpen
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white/80 text-[#1d1d1f] border-black/10 hover:bg-white'
              }`}
              title="Toggle Studio Voiceover (Key: V)"
            >
              <Volume2 size={13} />
              <span className="hidden sm:inline">Voiceover</span>
              <span className="text-[10px] font-mono font-bold bg-black/5 px-1.5 rounded">V</span>
            </button>

            {/* Exit Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition"
              title="Exit Fullscreen (Esc)"
            >
              <Minimize2 size={16} />
            </button>
          </div>
        </header>

        {/* Collapsible Audio Voiceover Bar */}
        <AnimatePresence>
          {isAudioOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex-shrink-0 z-20 w-full bg-white/90 backdrop-blur-lg border-b border-black/5 px-4 sm:px-8 py-3 overflow-hidden shadow-sm"
            >
              <div className="max-w-3xl mx-auto">
                <AudioPlayer
                  lessonId={stage.id}
                  script={activeScript}
                  speaker={voiceover.speaker}
                  lang={activeLang}
                  onEnded={handleAudioEnded}
                  autoPlay={autoPlayAudio}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sliding Stage Navigator Filmstrip Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-12 bottom-12 z-30 w-80 bg-white/95 backdrop-blur-xl border-r border-black/10 shadow-2xl p-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                  16 Stages Navigator
                </span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-full hover:bg-black/5 text-[#86868b]"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="space-y-2 pt-3">
                {REBUILD_STAGES.map((s, idx) => {
                  const isCur = idx === currentStageIdx;
                  return (
                    <div
                      key={s.id}
                      onClick={() => {
                        setCurrentStageIdx(idx);
                        setIsDrawerOpen(false);
                        playSlideSwoosh();
                      }}
                      className={`p-3 rounded-2xl border text-left cursor-pointer transition ${
                        isCur
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'liquid-glass border-black/5 hover:border-black/15'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[10px] font-mono font-bold uppercase ${isCur ? 'text-blue-100' : 'text-[#86868b]'}`}>
                          Stage {s.stageNumber} • {s.phase}
                        </span>
                      </div>
                      <div className={`text-xs font-bold truncate ${isCur ? 'text-white' : 'text-[#1d1d1f]'}`}>
                        {s.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrollable Center Canvas (Zero Clipping Layout) */}
        <main
          id="rebuild-slide-canvas"
          className="flex-1 w-full overflow-y-auto overflow-x-hidden px-4 sm:px-8 py-4"
        >
          <div className="w-full max-w-5xl mx-auto min-h-full flex flex-col justify-center py-4">
            {isWorkedExampleOpen && (
              <div className="mb-6 animate-in fade-in duration-300">
                <WorkedExampleFlowInteractive lang={activeLang} />
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStageIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full"
              >
                {renderStageCanvas()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Fixed Bottom Navigation Bar */}
        <footer className="flex-shrink-0 z-20 w-full bg-[#f5f5f7]/95 backdrop-blur-md border-t border-black/5 px-4 sm:px-8 py-2.5 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentStageIdx > 0) {
                setCurrentStageIdx((prev) => prev - 1);
                playSlideSwoosh();
              }
            }}
            disabled={currentStageIdx === 0}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
              currentStageIdx > 0
                ? 'bg-white text-[#1d1d1f] shadow-sm hover:bg-black/5 border border-black/5'
                : 'opacity-30 cursor-not-allowed text-[#86868b]'
            }`}
          >
            <ChevronLeft size={14} />
            <span>Previous Stage</span>
          </button>

          {/* Stage Dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {REBUILD_STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStageIdx(idx);
                  playSlideSwoosh();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStageIdx
                    ? 'w-6 bg-blue-600'
                    : 'w-2 bg-black/20 hover:bg-black/40'
                }`}
                title={`Stage ${s.stageNumber}: ${s.title}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (currentStageIdx < REBUILD_STAGES.length - 1) {
                setCurrentStageIdx((prev) => prev + 1);
                playSlideSwoosh();
              }
            }}
            disabled={currentStageIdx === REBUILD_STAGES.length - 1}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
              currentStageIdx < REBUILD_STAGES.length - 1
                ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500'
                : 'opacity-40 cursor-not-allowed text-white bg-blue-400'
            }`}
          >
            <span>Next Stage</span>
            <ChevronRight size={14} />
          </button>
        </footer>
      </div>
    );
  }

  // VIEW MODE 2: STANDARD PAGE MODE WITH VOICE PLAYER & FULLSCREEN TRIGGER
  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-6 text-left">
      {/* Top Controls: Enter Fullscreen & Voiceover Trigger */}
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition active:scale-95"
            title="Launch Fullscreen Keynote Slides (Key: F)"
          >
            <Presentation size={13} />
            <span>Enter Fullscreen Keynote ⛶</span>
            <span className="text-[10px] font-mono opacity-70 bg-white/20 px-1 rounded">F</span>
          </button>

          <button
            onClick={() => setIsWorkedExampleOpen(!isWorkedExampleOpen)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition border shadow-xs ${
              isWorkedExampleOpen
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-[#1d1d1f] border-black/10 hover:bg-black/5'
            }`}
          >
            <Scale size={13} />
            <span>{isWorkedExampleOpen ? 'Hide Worked Example' : 'Worked Example (Art. 43)'}</span>
          </button>

          <button
            onClick={() => setIsAudioOpen(!isAudioOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition border shadow-xs ${
              isAudioOpen
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-[#1d1d1f] border-black/10 hover:bg-black/5'
            }`}
          >
            <Volume2 size={13} />
            <span>{isAudioOpen ? 'Hide Voiceover' : 'Studio Voiceover'}</span>
            <span className="text-[10px] font-mono font-bold bg-black/5 px-1.5 rounded">V</span>
          </button>
        </div>

        {/* Stage Progress Readout */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#86868b]">
          <span>Stage {currentStageIdx + 1} of 16</span>
        </div>
      </div>

      {/* Collapsible Worked Example (Rule R-09) */}
      <AnimatePresence>
        {isWorkedExampleOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <WorkedExampleFlowInteractive lang={activeLang} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsible Audio Voiceover Companion */}
      <AnimatePresence>
        {isAudioOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="rounded-3xl border border-black/10 p-4 bg-white/80 backdrop-blur-md shadow-xs"
          >
            <AudioPlayer
              lessonId={stage.id}
              script={activeScript}
              speaker={voiceover.speaker}
              lang={activeLang}
              onEnded={handleAudioEnded}
              autoPlay={autoPlayAudio}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Stage Canvas */}
      {renderStageCanvas()}

      {/* Bottom Stage Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-black/5">
        <button
          onClick={() => {
            if (currentStageIdx > 0) {
              setCurrentStageIdx((prev) => prev - 1);
              playSlideSwoosh();
            }
          }}
          disabled={currentStageIdx === 0}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
            currentStageIdx > 0
              ? 'text-[#424245] hover:text-[#1d1d1f] hover:bg-black/5'
              : 'opacity-30 cursor-not-allowed text-[#86868b]'
          }`}
        >
          <ChevronLeft size={14} />
          <span>Previous Stage</span>
        </button>

        <span className="text-xs font-bold text-[#86868b]">
          Stage {currentStageIdx + 1} of {REBUILD_STAGES.length}
        </span>

        <button
          onClick={() => {
            if (currentStageIdx < REBUILD_STAGES.length - 1) {
              setCurrentStageIdx((prev) => prev + 1);
              playSlideSwoosh();
            }
          }}
          disabled={currentStageIdx === REBUILD_STAGES.length - 1}
          className={`flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/25 transition active:scale-95 ${
            currentStageIdx === REBUILD_STAGES.length - 1
              ? 'opacity-40 cursor-not-allowed'
              : ''
          }`}
        >
          <span>Next Stage ({currentStageIdx + 2 <= REBUILD_STAGES.length ? `Stage ${currentStageIdx + 2}` : 'Complete'})</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};
