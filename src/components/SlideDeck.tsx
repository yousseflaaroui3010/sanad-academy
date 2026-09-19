import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  Zap,
  Scale,
  CheckCircle2,
  Flame,
  LayoutGrid,
  Paintbrush,
  Volume2,
  HelpCircle,
  Lightbulb,
  Cpu,
  Bot,
  Terminal,
  Code2,
  AlertTriangle,
  ShieldCheck,
  Eye
} from 'lucide-react';
import type { Track, Lesson, SubLesson } from '../data/courseData';
import { AudioPlayer } from './AudioPlayer';
import { GeminiVisionExplainButton } from './GeminiVisionExplainButton';
import { SanadSlideChatbot } from './SanadSlideChatbot';
import { GeminiApiKeyModal } from './GeminiApiKeyModal';
import { getCodeKnowledge } from '../data/codeKnowledgeMap';
import { GitHubPullRequestMockup } from './artifacts/GitHubPullRequestMockup';
import { MoroccanLaborCodeViewer } from './artifacts/MoroccanLaborCodeViewer';
import { DeveloperTerminal } from './artifacts/DeveloperTerminal';
import { DatabaseAndVectorDashboard } from './artifacts/DatabaseAndVectorDashboard';
import { Rule5MotionExplainer } from './artwork/Rule5MotionExplainer';
import { FactoryConveyorArtwork } from './artwork/FactoryConveyorArtwork';
import { BankVaultArtwork } from './artwork/BankVaultArtwork';
import { LibraryCardCatalogArtwork } from './artwork/LibraryCardCatalogArtwork';
import { IngestionLab } from './sandbox/IngestionLab';
import { LangGraphDebugger } from './sandbox/LangGraphDebugger';
import { RrfToy } from './sandbox/RrfToy';
import { CodeDiffInspector } from './CodeDiffInspector';
import { LivingDiagram } from './LivingDiagram';
import { TradeOffSlider } from './TradeOffSlider';
import { MicroQuiz } from './MicroQuiz';
import { MermaidDiagram } from './MermaidDiagram';
import { MERMAID_DIAGRAMS } from '../data/mermaidLibrary';
import { SLIDE_VISION_SCRIPTS } from '../data/visionScriptsLibrary';
import { SLIDE_VISION_SCRIPTS_FR } from '../data/visionScriptsLibraryFr';
import {
  UI_TRANSLATIONS,
  getLocalizedSubLesson,
  getLocalizedTrack,
  getLocalizedLessonTitle,
} from '../data/translations';
import { playHapticClick, playSlideSwoosh, playSuccessChime } from '../utils/soundEffects';

interface SlideDeckProps {
  track: Track;
  lesson: Lesson;
  subLesson: SubLesson;
  onClose: () => void;
  onNextLesson?: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  initialLang?: 'en' | 'fr';
}

export const SlideDeck: React.FC<SlideDeckProps> = ({
  track,
  lesson,
  subLesson,
  onClose,
  onNextLesson,
  isCompleted,
  onToggleComplete,
  initialLang,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const [slide4Mode, setSlide4Mode] = useState<'diagram' | 'artifact'>('diagram');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>(() => {
    if (initialLang) return initialLang;
    try {
      return (localStorage.getItem('sanad_lang') as 'en' | 'fr') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    if (initialLang) {
      setLang(initialLang);
    }
  }, [initialLang]);

  const handleToggleLang = (newLang: 'en' | 'fr') => {
    setLang(newLang);
    try {
      localStorage.setItem('sanad_lang', newLang);
    } catch {}
    playHapticClick();
  };

  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
  const localizedSub = getLocalizedSubLesson(subLesson, lang);
  const localizedTrack = getLocalizedTrack(track, lang);
  const localizedLessonTitle = getLocalizedLessonTitle(lesson, lang);
  const codeItem = getCodeKnowledge(subLesson.id, lang);

  const [autoPlaySlide, setAutoPlaySlide] = useState(false);

  // Always reset to slide 0 (the beginning) when a new sub-lesson or chapter is loaded
  useEffect(() => {
    setCurrentSlide(0);
    setSlide4Mode('diagram');
    setAutoPlaySlide(false);
  }, [subLesson.id]);

  // Auto-advance to next slide when voiceover finishes
  const handleSlideAudioEnded = () => {
    if (currentSlide < slides.length - 1) {
      setAutoPlaySlide(true);
      setCurrentSlide((prev) => prev + 1);
      playSlideSwoosh();
    } else {
      setAutoPlaySlide(false);
      onToggleComplete();
      playSuccessChime();
    }
  };

  // Topic Artifact Matcher: Selects the exact relevant interactive artifact for this lesson
  const renderTopicArtifact = () => {
    const id = subLesson.id;

    if (id === '1-1' || id === '3-1') {
      return <GitHubPullRequestMockup />;
    }
    if (id === '2-1' || id === '15-1' || id === '16-1') {
      return <DeveloperTerminal />;
    }
    if (id === '4-1' || id === '8-2' || id === '10-2') {
      return <MoroccanLaborCodeViewer />;
    }
    if (id === '8-1' || id === '18-1') {
      return <DatabaseAndVectorDashboard />;
    }
    if (id === '11-1' || id === '11-3' || id === '17-1') {
      return <LangGraphDebugger />;
    }
    if (id === '1-2' || id === '10-1') {
      return <IngestionLab />;
    }
    if (id === '11-2') {
      return <RrfToy />;
    }
    if (id === '4-2') {
      return <MoroccanLaborCodeViewer />;
    }
    if (id === '5-1' || id === '14-1') {
      return <BankVaultArtwork />;
    }
    if (id === '1-3' || id === '9-1' || id === '18-2') {
      return <CodeDiffInspector lessonId={id} />;
    }

    // Default: Context-aware Living Diagram
    return <LivingDiagram lessonId={id} />;
  };

  const getArtifactMeta = () => {
    const id = subLesson.id;
    if (id === '1-1' || id === '3-1') return { tag: 'Real Artifact: Git PR', title: 'Rule 5 & GitHub Pull Request Review' };
    if (id === '2-1' || id === '15-1' || id === '16-1') return { tag: 'Real Artifact: CLI Terminal', title: 'Production CLI & Ingestion Terminal' };
    if (id === '4-1' || id === '8-2' || id === '10-2') return { tag: 'Real Artifact: Legal PDF', title: 'Moroccan Labor Code Bulletin Officiel Scan' };
    if (id === '8-1' || id === '18-1') return { tag: 'Real Artifact: Database GUI', title: 'TablePlus SQLite & Qdrant Cloud Explorer' };
    if (id === '11-1' || id === '11-3' || id === '17-1') return { tag: 'Interactive Engine', title: 'Live LangGraph State Machine Debugger' };
    if (id === '1-2' || id === '10-1') return { tag: 'Interactive Slicer', title: 'Live Parent-Child Chunking Slicer' };
    if (id === '11-2') return { tag: 'Interactive Formula', title: 'Reciprocal Rank Fusion (RRF) Formula Toy' };
    if (id === '4-2') return { tag: 'Audit Minigame', title: 'Spot the Hallucination Minigame' };
    if (id === '5-1' || id === '14-1') return { tag: 'Security Vault', title: 'Multi-Tenant BOLA Silent 404 Vault' };
    if (id === '1-3' || id === '9-1' || id === '18-2') return { tag: 'Code Architecture', title: 'Naive Approach vs. Sanad Resilient Code' };
    return { tag: 'Architecture Flow', title: `${subLesson.title} — System Flow` };
  };

  const artifactMeta = getArtifactMeta();

  // 7 Slides tailored directly to this sub-lesson's unique markdown content & code reality
  const slides = [
    // Slide 1: Mental Model & Clearer Metaphor
    {
      id: 'metaphor',
      tag: lang === 'fr' ? 'Modèle Mental' : 'Mental Model',
      icon: Paintbrush,
      title: localizedSub.metaphor.title,
      render: () => (
        <div className="w-full max-w-4xl mx-auto space-y-6 py-2">
          {subLesson.id === '1-1' ? (
            <Rule5MotionExplainer />
          ) : (subLesson.id === '10-1' || subLesson.id === '1-2') ? (
            <FactoryConveyorArtwork />
          ) : (subLesson.id === '5-1' || subLesson.id === '14-1') ? (
            <BankVaultArtwork />
          ) : (subLesson.id === '8-2' || subLesson.id === '1-3') ? (
            <LibraryCardCatalogArtwork />
          ) : (
            <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-4 py-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 text-4xl shadow-inner border border-blue-500/20"
              >
                {localizedSub.metaphor.emoji}
              </motion.div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                  {t.realWorldMetaphor}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
                  {localizedSub.metaphor.title}
                </h2>
                <p className="text-sm sm:text-base text-[#424245] leading-relaxed max-w-xl mx-auto">
                  "{localizedSub.metaphor.description}"
                </p>
              </div>
            </div>
          )}

          {/* Grounded 3-Pillar Metaphor Architecture Breakdown */}
          {codeItem && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 text-left">
              <div className="liquid-glass rounded-2xl p-4 space-y-1.5 border-blue-500/20">
                <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  <Eye size={14} />
                  <span>{t.physicalIntuition}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {codeItem.clearMetaphor.intuition}
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-4 space-y-1.5 border-emerald-500/20">
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                  <Code2 size={14} />
                  <span>{t.softwareMapping}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {codeItem.clearMetaphor.softwareMapping}
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-4 space-y-1.5 border-rose-500/20">
                <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle size={14} />
                  <span>{t.whyBreaksWithoutIt}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {codeItem.clearMetaphor.whyItBreaksWithoutIt}
                </p>
              </div>
            </div>
          )}
        </div>
      )
    },

    // Slide 2: The Situation Room & Real Project Pressure
    {
      id: 'situation',
      tag: lang === 'fr' ? 'Salle de Crise' : 'The Situation Room',
      icon: Flame,
      title: t.realCircumstanceTitle,
      render: () => (
        <div className="max-w-4xl mx-auto w-full py-3 space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-2 border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-600">
                <Flame size={18} />
                <h3 className="text-xs font-bold uppercase tracking-wider">{t.realCircumstance}</h3>
              </div>
              <p className="text-sm sm:text-base text-[#1d1d1f] leading-relaxed font-medium">
                {codeItem?.situationDetails.operationalContext || localizedSub.situation.context}
              </p>
            </div>

            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-2 border-rose-500/30">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle size={18} />
                <h3 className="text-xs font-bold uppercase tracking-wider">{t.failureMode}</h3>
              </div>
              <p className="text-sm sm:text-base text-[#1d1d1f] leading-relaxed font-medium">
                {codeItem?.situationDetails.disasterScenario || localizedSub.situation.pressure}
              </p>
            </div>
          </div>

          {/* Architectural Mitigation Requirement */}
          {codeItem && (
            <div className="liquid-glass rounded-2xl p-4 border-blue-500/30 flex items-start gap-3">
              <ShieldCheck size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                  {t.engineeringRequirement}
                </span>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {codeItem.situationDetails.engineeringMitigation}
                </p>
              </div>
            </div>
          )}
        </div>
      )
    },

    // Slide 3: The Engineering Solution & WHAT OUR CODE HOLDS
    {
      id: 'solution',
      tag: lang === 'fr' ? "Solution d'Ingénierie" : 'Engineering Solution',
      icon: Lightbulb,
      title: localizedSub.solution.title,
      render: () => (
        <div className="max-w-4xl mx-auto w-full space-y-4 py-2 text-left">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
              {t.howSanadSolved}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#1d1d1f]">
              {localizedSub.solution.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#424245] max-w-2xl mx-auto">
              {localizedSub.solution.explanation}
            </p>
          </div>

          {/* Codebase Reality: What Our Code Holds */}
          {codeItem && (
            <div className="rounded-2xl bg-[#14110f] border border-[#463b32] text-[#f2ede6] p-4 font-mono shadow-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-[#a69c90] border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-emerald-400" />
                  <span className="font-bold text-white">{codeItem.sourceFile}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-emerald-400">{codeItem.coreFunction}</span>
                </div>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70">Python 3.12</span>
              </div>
              <pre className="overflow-x-auto text-xs leading-relaxed text-emerald-300 py-1">
                <code>{codeItem.codeSnippet}</code>
              </pre>
              <p className="text-[11px] text-[#a69c90] font-sans border-t border-white/10 pt-2 leading-relaxed">
                💡 <strong>{t.howItWorksUnderHood}</strong> {codeItem.codeExplanation}
              </p>
            </div>
          )}

          {/* 3 Core Invariant Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {localizedSub.solution.keyPoints.map((point, idx) => (
              <div
                key={idx}
                className="liquid-glass rounded-2xl p-3.5 text-xs text-[#1d1d1f] font-medium leading-relaxed flex items-start gap-2 shadow-xs"
              >
                <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Slide 4: Topic-Specific Interactive Artifact / Live Simulation & Mermaid Model
    {
      id: 'artifact',
      tag: lang === 'fr' ? 'Architecture & Modèle' : 'Architecture & Model',
      icon: Cpu,
      title: artifactMeta.title,
      render: () => {
        const diag = MERMAID_DIAGRAMS[subLesson.id];

        return (
          <div className="max-w-4xl mx-auto w-full space-y-4 text-left">
            {diag && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 rounded-2xl bg-black/5 p-1 border border-black/5 text-xs font-semibold">
                  <button
                    onClick={() => {
                      setSlide4Mode('diagram');
                      playHapticClick();
                    }}
                    className={`px-3 py-1 rounded-xl transition ${
                      slide4Mode === 'diagram'
                        ? 'bg-white text-[#1d1d1f] shadow-xs'
                        : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                    }`}
                  >
                    📐 {t.specModel}
                  </button>
                  <button
                    onClick={() => {
                      setSlide4Mode('artifact');
                      playHapticClick();
                    }}
                    className={`px-3 py-1 rounded-xl transition ${
                      slide4Mode === 'artifact'
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                    }`}
                  >
                    🛠️ {t.interactiveArtifact}
                  </button>
                </div>
                <span className="text-[11px] font-mono text-[#86868b] hidden sm:inline truncate max-w-xs" title={localizedLessonTitle}>
                  {t.spec} {lesson.specNumber} • {localizedLessonTitle}
                </span>
              </div>
            )}

            {slide4Mode === 'diagram' && diag ? (
              <MermaidDiagram
                chart={diag.chart}
                title={diag.title}
                diagramType={diag.type as any}
              />
            ) : (
              renderTopicArtifact()
            )}

            {/* Architecture Data Flow Invariants */}
            {codeItem && (
              <div className="liquid-glass rounded-2xl p-4 border border-black/5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1d1d1f]">
                  <Cpu size={14} className="text-blue-600" />
                  <span>{t.productionDataFlowInvariants}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {codeItem.codeInvariants.map((inv, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-[#424245]">
                      <span className="text-blue-600 font-bold">0{idx + 1}.</span>
                      <span>{inv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }
    },

    // Slide 5: The Alternative Road (Trade-Off Reality & Rookie Pitfall)
    {
      id: 'alternative',
      tag: t.tradeOffReality,
      icon: Scale,
      title: localizedSub.alternative.title,
      render: () => (
        <div className="max-w-4xl mx-auto w-full space-y-4 py-2 text-left">
          {subLesson.tradeOff && (
            <TradeOffSlider tradeOff={subLesson.tradeOff} lang={lang} />
          )}

          {/* Junior Pitfall vs Senior Resolution Breakdown */}
          {codeItem && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="rounded-2xl bg-rose-50 border border-rose-200/80 p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle size={14} />
                  <span>{t.juniorTrap}</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
                  {codeItem.tradeOffInsight.juniorShortcut}
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 border border-emerald-200/80 p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} />
                  <span>{t.seniorResolution}</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  {codeItem.tradeOffInsight.seniorResolution}
                </p>
              </div>
            </div>
          )}

          <div className="liquid-glass-subtle rounded-3xl p-5 space-y-1.5 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
              {t.alternativeRoad}: {localizedSub.alternative.title}
            </span>
            <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
              {localizedSub.alternative.explanation}
            </p>
            <p className="text-xs text-rose-600 font-semibold pt-0.5">
              {t.downside} {localizedSub.alternative.downside}
            </p>
          </div>
        </div>
      )
    },

    // Slide 6: 1-Click Knowledge Check Micro-Quiz
    {
      id: 'quiz',
      tag: t.knowledgeCheck,
      icon: HelpCircle,
      title: t.chapterQuiz,
      render: () => (
        <div className="max-w-2xl mx-auto w-full py-4">
          {subLesson.miniQuiz ? (
            <MicroQuiz quiz={subLesson.miniQuiz} lang={lang} />
          ) : (
            <div className="text-center py-10 space-y-2 text-[#86868b]">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500" />
              <p className="text-base font-bold text-[#1d1d1f]">
                {t.coreConceptsMastered}
              </p>
              <p className="text-xs">
                {t.proceedToReviewRule}
              </p>
            </div>
          )}
        </div>
      )
    },

    // Slide 7: Non-Negotiable Invariant & Codebase Mastery
    {
      id: 'mastery',
      tag: t.chapterMastery,
      icon: Zap,
      title: t.ruleAndMastery,
      render: () => (
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-5 py-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
            <Zap size={32} />
          </div>

          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
              {t.ruleToRemember}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#1d1d1f] tracking-tight leading-snug">
              "{localizedSub.keyTakeaway}"
            </h2>
          </div>

          {/* Codebase Verification Checklist */}
          {codeItem && (
            <div className="w-full liquid-glass rounded-2xl p-4 border border-black/5 text-left space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] block">
                {t.codebaseChecklist}
              </span>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2 text-xs text-[#424245]">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{t.codeImplementation}</strong> {t.enforcedIn}{' '}
                    <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-emerald-700">
                      {codeItem.sourceFile}
                    </code>{' '}
                    {t.via} <code className="font-mono text-blue-700">{codeItem.coreFunction}</code>
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#424245]">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{t.runtimeInvariant}</strong> {codeItem.codeInvariants[0]}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#424245]">
                  <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{t.defenseProof}</strong> {codeItem.situationDetails.engineeringMitigation}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                onToggleComplete();
                playHapticClick();
              }}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold transition shadow-sm ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              <CheckCircle2 size={14} />
              <span>{isCompleted ? (lang === 'fr' ? 'Validé' : 'Completed') : t.markAsMastered}</span>
            </button>

            {onNextLesson && (
              <button
                onClick={() => {
                  setCurrentSlide(0);
                  onNextLesson();
                  playSlideSwoosh();
                }}
                className="flex items-center gap-1.5 rounded-full bg-black/5 hover:bg-black/10 px-5 py-2.5 text-xs font-semibold text-[#1d1d1f] transition"
              >
                <span>{t.nextChapter}</span>
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      )
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept typing in inputs or textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
        playSlideSwoosh();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
        playSlideSwoosh();
      } else if (e.key === 't' || e.key === 'T') {
        setIsDrawerOpen((prev) => !prev);
        playHapticClick();
      } else if (e.key === 'Escape') {
        if (isDrawerOpen) {
          setIsDrawerOpen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose, isDrawerOpen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const jumpToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setIsDrawerOpen(false);
    playSlideSwoosh();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f5f5f7] flex flex-col h-screen w-screen overflow-hidden">
      {/* 1. FIXED TOP KEYNOTE BAR (Always visible & docked at the very top!) */}
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
            title="Toggle Slide Filmstrip Navigator (Key: T)"
          >
            <LayoutGrid size={13} />
            <span className="hidden sm:inline">{t.navigator}</span>
            <span className="text-[10px] font-mono opacity-60">T</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#86868b]">
            <span className="hidden md:inline">{localizedTrack.shortName}</span>
            <span className="hidden md:inline">/</span>
            <span>{t.spec} {lesson.specNumber}</span>
            <span className="hidden sm:inline">/</span>
            <span className="text-[#1d1d1f] font-bold truncate max-w-[180px] sm:max-w-xs hidden sm:inline">
              {localizedSub.title}
            </span>
          </div>
        </div>

        {/* Center/Right: Audio, Language, Gemini Vision, Chatbot & Actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher: EN / FR */}
          <div className="flex items-center rounded-full bg-black/5 p-0.5 border border-black/5 text-xs font-semibold">
            <button
              onClick={() => handleToggleLang('en')}
              className={`px-2.5 py-0.5 rounded-full transition text-[11px] ${
                lang === 'en' ? 'bg-white text-[#1d1d1f] shadow-xs' : 'text-[#6e6e73]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleToggleLang('fr')}
              className={`px-2.5 py-0.5 rounded-full transition text-[11px] ${
                lang === 'fr' ? 'bg-blue-600 text-white shadow-xs' : 'text-[#6e6e73]'
              }`}
            >
              FR
            </button>
          </div>

          {/* Gemini Vision Slide Explainer Button */}
          <GeminiVisionExplainButton
            slideTitle={slides[currentSlide].title}
            lessonContext={`${t.spec} ${lesson.specNumber}: ${localizedSub.title}`}
            targetElementId="active-slide-canvas"
            onOpenChatbotWithContext={() => setIsChatbotOpen(true)}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
          />

          {/* AI Tutor Chatbot Trigger */}
          <button
            onClick={() => {
              setIsChatbotOpen(true);
              playSlideSwoosh();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1d1d1f] bg-white/80 hover:bg-white border border-black/10 shadow-xs transition"
            title="Open Sanad AI Tutor Chatbot"
          >
            <Bot size={13} className="text-purple-600" />
            <span className="hidden sm:inline">{t.aiTutor}</span>
          </button>

          {/* Collapsible Audio Pill with V shortcut */}
          <button
            onClick={() => setIsAudioOpen(!isAudioOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition border shadow-xs ${
              isAudioOpen
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white/80 text-[#1d1d1f] border-black/10 hover:bg-white'
            }`}
            title="Toggle Studio Audio Companion (Press V to Play/Pause)"
          >
            <Volume2 size={13} />
            <span className="hidden sm:inline">{t.studioVoiceover}</span>
            <span className="text-[10px] font-mono font-bold bg-black/5 px-1.5 py-0.2 rounded">V</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition"
            title={t.exitPresentation}
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Optional Dropped Audio Companion Drawer */}
      <AnimatePresence>
        {isAudioOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex-shrink-0 z-20 w-full bg-white/90 backdrop-blur-lg border-b border-black/5 px-4 sm:px-8 py-3 overflow-hidden shadow-sm"
          >
            <div className="max-w-3xl mx-auto">
              {(() => {
                const activeSlideId = slides[currentSlide]?.id || 'metaphor';
                const isFr = lang === 'fr';
                const visionData = isFr
                  ? SLIDE_VISION_SCRIPTS_FR[subLesson.id]?.[activeSlideId]
                  : SLIDE_VISION_SCRIPTS[subLesson.id]?.[activeSlideId];

                const slideAudioKey = visionData ? `${subLesson.id}_${activeSlideId}` : undefined;
                const activeScript = visionData ? visionData.spokenScript : subLesson.audioNarration.script;

                return (
                  <AudioPlayer
                    lessonId={subLesson.id}
                    slideAudioKey={slideAudioKey}
                    script={activeScript}
                    speaker={subLesson.audioNarration.speaker}
                    lang={lang}
                    onEnded={handleSlideAudioEnded}
                    autoPlay={autoPlaySlide}
                  />
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Drawer Filmstrip (Left Sliding Drawer) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            className="fixed top-14 bottom-14 left-4 z-40 w-72 liquid-glass rounded-3xl p-4 shadow-2xl border border-white/80 flex flex-col space-y-3 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/5">
              <span className="text-xs font-bold text-[#1d1d1f]">{t.slideNavigator}</span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-full text-[#86868b] hover:bg-black/5"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {slides.map((s, idx) => {
                const isCur = idx === currentSlide;
                const Icon = s.icon;

                return (
                  <div
                    key={s.id}
                    onClick={() => jumpToSlide(idx)}
                    className={`p-3 rounded-2xl border cursor-pointer transition text-left space-y-1 ${
                      isCur
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white/60 border-black/5 hover:bg-white text-[#1d1d1f]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isCur ? 'text-white/80' : 'text-blue-600'}`}>
                        Slide 0{idx + 1}
                      </span>
                      <Icon size={12} className={isCur ? 'text-white' : 'text-[#86868b]'} />
                    </div>
                    <div className="text-xs font-semibold truncate">{s.title}</div>
                    <div className={`text-[10px] ${isCur ? 'text-white/70' : 'text-[#86868b]'}`}>
                      {s.tag}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. SCROLLABLE SLIDE CANVAS (Fills whole screen, allows full vertical scrolling with ZERO top clipping!) */}
      <main
        id="active-slide-canvas"
        className="flex-1 w-full overflow-y-auto overflow-x-hidden px-4 sm:px-8 py-4"
      >
        <div className="w-full max-w-5xl mx-auto min-h-full flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full"
            >
              {slides[currentSlide].render()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Floating AI Tutor Chatbot Drawer */}
      <SanadSlideChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        lesson={lesson}
        subLesson={subLesson}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Gemini API Key Configuration Modal */}
      <GeminiApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      {/* 3. FIXED BOTTOM NAVIGATION BAR (Always visible & docked at the very bottom!) */}
      <footer className="flex-shrink-0 z-20 w-full bg-[#f5f5f7]/95 backdrop-blur-md border-t border-black/5 px-4 sm:px-8 py-2.5 flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={() => {
            setCurrentSlide((prev) => Math.max(0, prev - 1));
            playSlideSwoosh();
          }}
          disabled={currentSlide === 0}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
            currentSlide > 0
              ? 'bg-white text-[#1d1d1f] shadow-sm hover:bg-black/5 border border-black/5'
              : 'opacity-30 cursor-not-allowed text-[#86868b]'
          }`}
        >
          <ChevronLeft size={14} />
          <span>{t.previous}</span>
        </button>

        {/* Slide Dots & Quick Title Readout */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => jumpToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-6 bg-blue-600'
                    : 'w-2 bg-black/15 hover:bg-black/30'
                }`}
                title={`Jump to Slide ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-[#86868b] tabular-nums hidden sm:inline ml-1">
            {currentSlide + 1}/{slides.length} • {slides[currentSlide].tag} • <span className="text-blue-600 font-mono font-bold">V</span> {t.pressVForVoice}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
            playSlideSwoosh();
          }}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
            currentSlide < slides.length - 1
              ? 'bg-[#1d1d1f] text-white shadow-sm hover:bg-black'
              : 'opacity-30 cursor-not-allowed text-[#86868b]'
          }`}
        >
          <span>{t.nextSlide}</span>
          <ChevronRight size={14} />
        </button>
      </footer>
    </div>
  );
};
