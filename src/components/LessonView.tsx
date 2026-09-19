import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Track, Lesson, SubLesson } from '../data/courseData';
import { AudioPlayer } from './AudioPlayer';
import { LivingDiagram } from './LivingDiagram';
import { TradeOffSlider } from './TradeOffSlider';
import { MicroQuiz } from './MicroQuiz';
import { SlideDeck } from './SlideDeck';
import { ArchitecturalInfographics } from './ArchitecturalInfographics';
import { CodeDiffInspector } from './CodeDiffInspector';
import { AnimatedArchitecturePipeline } from './AnimatedArchitecturePipeline';
import { DefenseDrillSimulator } from './DefenseDrillSimulator';
import { GitHubPullRequestMockup } from './artifacts/GitHubPullRequestMockup';
import { MoroccanLaborCodeViewer } from './artifacts/MoroccanLaborCodeViewer';
import { DeveloperTerminal } from './artifacts/DeveloperTerminal';
import { DatabaseAndVectorDashboard } from './artifacts/DatabaseAndVectorDashboard';
import { Rule5MotionExplainer } from './artwork/Rule5MotionExplainer';
import { FactoryConveyorArtwork } from './artwork/FactoryConveyorArtwork';
import { BankVaultArtwork } from './artwork/BankVaultArtwork';
import { LibraryCardCatalogArtwork } from './artwork/LibraryCardCatalogArtwork';
import { MermaidDiagram } from './MermaidDiagram';
import { MERMAID_DIAGRAMS } from '../data/mermaidLibrary';
import { GeminiVisionExplainButton } from './GeminiVisionExplainButton';
import { SanadSlideChatbot } from './SanadSlideChatbot';
import { GeminiApiKeyModal } from './GeminiApiKeyModal';
import { UI_TRANSLATIONS, getLocalizedSubLesson, getLocalizedTrack } from '../data/translations';
import { getCodeKnowledge } from '../data/codeKnowledgeMap';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  Scale,
  Clock,
  Zap,
  Presentation,
  BookOpen,
  Bot,
  Terminal,
  Code2,
  AlertTriangle,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface LessonViewProps {
  track: Track;
  lesson: Lesson;
  subLesson: SubLesson;
  isCompleted: boolean;
  completedSubLessonIds: Set<string>;
  onToggleComplete: (subLessonId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  onOpenCertificate?: () => void;
  lang?: 'en' | 'fr';
}

export const LessonView: React.FC<LessonViewProps> = ({
  track,
  lesson,
  subLesson,
  isCompleted,
  completedSubLessonIds,
  onToggleComplete,
  onNext,
  onPrevious,
  hasPrevious,
  hasNext,
  onOpenCertificate,
  lang = 'en'
}) => {
  const [viewMode, setViewMode] = useState<'article' | 'slides'>('article');
  const [isSlideDeckFullscreen, setIsSlideDeckFullscreen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Always scroll to top of chapter when changing lessons
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [subLesson.id]);

  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;
  const localizedSub = getLocalizedSubLesson(subLesson, lang);
  const codeItem = getCodeKnowledge(subLesson.id, lang);

  const activeAudioSection = !isAudioPlaying
    ? null
    : audioProgress < 0.25
    ? 'metaphor'
    : audioProgress < 0.50
    ? 'situation'
    : audioProgress < 0.75
    ? 'solution'
    : 'alternative';

  const handleCompleteAndNext = () => {
    if (!isCompleted) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.75 },
      });
      onToggleComplete(subLesson.id);
    }
    if (hasNext) {
      onNext();
    }
  };

  // If in fullscreen presentation mode
  if (isSlideDeckFullscreen) {
    return (
      <SlideDeck
        track={track}
        lesson={lesson}
        subLesson={subLesson}
        onClose={() => setIsSlideDeckFullscreen(false)}
        onNextLesson={hasNext ? onNext : undefined}
        isCompleted={isCompleted}
        onToggleComplete={() => onToggleComplete(subLesson.id)}
        initialLang={lang}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-8">
      {/* View Mode Segmented Control & Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#86868b]">
            <span>{getLocalizedTrack(track, lang).shortName}</span>
            <span>/</span>
            <span>{t.spec} {lesson.specNumber}</span>
          </div>

          {/* Top Actions: Mode Switcher, Gemini Vision & Chatbot */}
          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            {/* Prominent View Mode Switcher */}
            <div className="flex items-center rounded-full bg-black/5 p-1 border border-black/5 shadow-inner">
              <button
                onClick={() => setViewMode('article')}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  viewMode === 'article'
                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                <BookOpen size={13} />
                <span>{t.interactiveLesson}</span>
              </button>
              <button
                onClick={() => setViewMode('slides')}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  viewMode === 'slides'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                <Presentation size={13} />
                <span>{t.keynoteSlides}</span>
              </button>
            </div>

            {/* Gemini Vision Slide Explainer */}
            <GeminiVisionExplainButton
              slideTitle={localizedSub.title}
              lessonContext={`Spec ${lesson.specNumber}: ${localizedSub.title}`}
              targetElementId="lesson-content-canvas"
              onOpenChatbotWithContext={() => setIsChatbotOpen(true)}
              onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            />

            {/* AI Tutor Chatbot Trigger */}
            <button
              onClick={() => setIsChatbotOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#1d1d1f] bg-white/80 hover:bg-white border border-black/10 shadow-xs transition"
              title="Open Sanad AI Tutor Chatbot"
            >
              <Bot size={13} className="text-purple-600" />
              <span className="hidden sm:inline">{t.aiTutor}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1d1d1f]">
            {localizedSub.title}
          </h1>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-medium text-[#6e6e73]">
              <Clock size={11} />
              {subLesson.duration} {t.microLesson}
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 text-[11px] font-semibold">
                <CheckCircle2 size={12} />
                {t.done}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: Presentation Slides */}
      {viewMode === 'slides' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#86868b]">
              {t.keynoteSlides}
            </span>
            <button
              onClick={() => setIsSlideDeckFullscreen(true)}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              {t.enterFullscreen}
            </button>
          </div>
          <div className="rounded-3xl border border-black/10 overflow-hidden shadow-lg">
            <SlideDeck
              track={track}
              lesson={lesson}
              subLesson={subLesson}
              onClose={() => setViewMode('article')}
              onNextLesson={hasNext ? onNext : undefined}
              isCompleted={isCompleted}
              onToggleComplete={() => onToggleComplete(subLesson.id)}
              initialLang={lang}
            />
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: Interactive Micro-Lesson with Animated Diagrams */
        <>
          {/* Studio Audio Companion */}
          <AudioPlayer
            lessonId={subLesson.id}
            script={subLesson.audioNarration.script}
            speaker={subLesson.audioNarration.speaker}
            lang={lang}
            onProgressUpdate={(ratio, playing) => {
              setAudioProgress(ratio);
              setIsAudioPlaying(playing);
            }}
          />

          {/* 🌟 DYNAMIC ARCHITECTURE LIFECYCLE PIPELINE */}
          <AnimatedArchitecturePipeline
            currentTrackId={track.id}
            currentSpecNumber={lesson.specNumber}
            completedSubLessonIds={completedSubLessonIds}
            lang={lang}
          />

          {/* 🧠 1. The Real-Life Metaphor */}
          <div className={`liquid-glass rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-500 space-y-4 ${
            activeAudioSection === 'metaphor' ? 'ring-2 ring-blue-500/50 shadow-md shadow-blue-500/15 bg-white' : ''
          }`}>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
                {subLesson.metaphor.emoji}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {t.realWorldMetaphor}
                  </span>
                  {activeAudioSection === 'metaphor' && (
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full animate-pulse">
                      {t.currentlySpeaking}
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-xl font-bold text-[#1d1d1f]">
                  {localizedSub.metaphor.title}
                </h2>
                <p className="text-sm text-[#424245] leading-relaxed pt-1">
                  "{localizedSub.metaphor.description}"
                </p>
              </div>
            </div>

            {/* Clear Grounded Metaphor 3-Pillar Breakdown */}
            {codeItem && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-black/5">
                <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-blue-700 text-[11px] font-bold uppercase tracking-wider">
                    <Eye size={13} />
                    <span>{t.physicalIntuition}</span>
                  </div>
                  <p className="text-xs text-[#424245] leading-relaxed">
                    {codeItem.clearMetaphor.intuition}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
                    <Code2 size={13} />
                    <span>{t.softwareMapping}</span>
                  </div>
                  <p className="text-xs text-[#424245] leading-relaxed">
                    {codeItem.clearMetaphor.softwareMapping}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/60 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
                    <AlertTriangle size={13} />
                    <span>{t.whyBreaksWithoutIt}</span>
                  </div>
                  <p className="text-xs text-[#424245] leading-relaxed">
                    {codeItem.clearMetaphor.whyItBreaksWithoutIt}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 🎨 Dedicated Visual Metaphor Artwork (Sprint 9) */}
          {subLesson.id === '1-1' && <Rule5MotionExplainer />}
          {(subLesson.id === '10-1' || subLesson.id === '1-2') && <FactoryConveyorArtwork />}
          {(subLesson.id === '5-1' || subLesson.id === '14-1') && <BankVaultArtwork />}
          {(subLesson.id === '8-2' || subLesson.id === '1-3') && <LibraryCardCatalogArtwork />}

          {/* 🚨 2. The Situation Room */}
          <div className={`space-y-3 transition-all duration-500 rounded-3xl p-1 ${
            activeAudioSection === 'situation' ? 'ring-2 ring-amber-500/50 shadow-md shadow-amber-500/15' : ''
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="liquid-glass rounded-3xl p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-600">
                  <Flame size={15} />
                  <h3 className="text-xs font-bold uppercase tracking-wider">{t.realCircumstance}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {codeItem?.situationDetails.operationalContext || localizedSub.situation.context}
                </p>
              </div>

              <div className="liquid-glass rounded-3xl p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-600">
                  <AlertTriangle size={15} />
                  <h3 className="text-xs font-bold uppercase tracking-wider">{t.failureMode}</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {codeItem?.situationDetails.disasterScenario || localizedSub.situation.pressure}
                </p>
              </div>
            </div>

            {codeItem && (
              <div className="liquid-glass rounded-2xl p-4 border-blue-500/30 flex items-start gap-3">
                <ShieldCheck size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#424245] leading-relaxed">
                  <strong className="text-blue-700">{t.engineeringMitigation}</strong> {codeItem.situationDetails.engineeringMitigation}
                </p>
              </div>
            )}
          </div>

          {/* 🌟 3. The Specialized Context-Aware Living Diagram */}
          <LivingDiagram lessonId={subLesson.id} />

          {/* ✨ 4. How Sanad Solved It */}
          <div className={`liquid-glass rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm transition-all duration-500 ${
            activeAudioSection === 'solution' ? 'ring-2 ring-emerald-500/50 shadow-md shadow-emerald-500/15 bg-white' : ''
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                {t.howSanadSolved}
              </span>
              {activeAudioSection === 'solution' && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full animate-pulse">
                  {t.currentlySpeaking}
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-xl font-bold text-[#1d1d1f]">
              {localizedSub.solution.title}
            </h3>
            <p className="text-sm text-[#424245] leading-relaxed">
              {localizedSub.solution.explanation}
            </p>

            {/* Codebase Reality: What Our Code Holds */}
            {codeItem && (
              <div className="rounded-2xl bg-[#14110f] border border-[#463b32] text-[#f2ede6] p-4 font-mono shadow-md space-y-2">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {localizedSub.solution.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-black/5 p-3 text-xs text-[#1d1d1f] leading-relaxed font-medium"
                >
                  <span className="text-emerald-600 font-bold mr-1">✓</span>
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* 📐 Authentic Mermaid Specification Diagram from the Markdown */}
          {MERMAID_DIAGRAMS[subLesson.id] && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#656d76] block">
                Technical Specification Model (Direct from Markdown Specs)
              </span>
              <MermaidDiagram
                chart={MERMAID_DIAGRAMS[subLesson.id].chart}
                title={MERMAID_DIAGRAMS[subLesson.id].title}
                diagramType={MERMAID_DIAGRAMS[subLesson.id].type as any}
              />
            </div>
          )}

          {/* 📊 Dedicated Animated SVG Infographics (Specs 10, 11, 14) */}
          {subLesson.id === '10-1' && <ArchitecturalInfographics type="conversion-ladder" />}
          {subLesson.id === '11-1' && <ArchitecturalInfographics type="hybrid-fusion" />}
          {subLesson.id === '14-1' && <ArchitecturalInfographics type="bola-bouncer" />}

          {/* 🐙 Real-World Engineering Artifact: GitHub Pull Request Mockup (Rule 5 & Specs 1, 3) */}
          {(subLesson.id === '1-1' || subLesson.id === '3-1') && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#656d76] block">
                Realistic Engineering Artifact: GitHub PR & Two-Person Review
              </span>
              <GitHubPullRequestMockup />
            </div>
          )}

          {/* 📜 Real-World Legal Document Artifact: Moroccan Labor Code Scan (Specs 4, 8, 10) */}
          {(subLesson.id === '4-1' || subLesson.id === '8-2' || subLesson.id === '10-2') && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#656d76] block">
                Official Document Scan: Bulletin Officiel n° 5210 (Code du Travail)
              </span>
              <MoroccanLaborCodeViewer />
            </div>
          )}

          {/* 💻 Real-World Developer Terminal Artifact: Ingestion CLI & Healthchecks (Specs 2, 9, 16) */}
          {(subLesson.id === '2-1' || subLesson.id === '9-1' || subLesson.id === '16-1') && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#656d76] block">
                Production Terminal: Ingestion Worker, Uvicorn & Health Probes
              </span>
              <DeveloperTerminal />
            </div>
          )}

          {/* 🗄️ Real-World Database & Vector Explorer: TablePlus SQLite & Qdrant Dashboard (Specs 8, 18) */}
          {(subLesson.id === '8-1' || subLesson.id === '18-1') && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#656d76] block">
                Database & Vector Cloud Dashboard: TablePlus SQLite & Qdrant Web UI
              </span>
              <DatabaseAndVectorDashboard />
            </div>
          )}

          {/* 💻 Code Architecture Inspector (Specs 1, 9, 18) */}
          {(subLesson.id === '1-3' || subLesson.id === '9-1' || subLesson.id === '18-1') && (
            <CodeDiffInspector lessonId={subLesson.id} />
          )}

          {/* 🎓 Academic Jury Defense Drill Simulator (Spec 12 & Spec 20) */}
          {(subLesson.id === '12-2' || subLesson.id === '20-2') && (
            <DefenseDrillSimulator onUnlockCertificate={onOpenCertificate} />
          )}

          {/* ⚖️ 5. The Architect's Dilemma (Trade-off Interactive Slider) */}
          {subLesson.tradeOff && (
            <TradeOffSlider tradeOff={subLesson.tradeOff} lang={lang} />
          )}

          {/* ⚖️ 6. The Alternative Road */}
          <div className="space-y-3">
            {codeItem && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
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

            <div className="liquid-glass-subtle rounded-3xl p-5 sm:p-6 space-y-2">
              <div className="flex items-center gap-2 text-[#86868b]">
                <Scale size={14} />
                <span className="text-xs font-bold uppercase tracking-wider text-[#6e6e73]">
                  {t.alternativeRoad}: {localizedSub.alternative.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed">
                {localizedSub.alternative.explanation}
              </p>
              <p className="text-xs text-rose-600 font-medium pt-1">
                {t.downside} {localizedSub.alternative.downside}
              </p>
            </div>
          </div>

          {/* ❓ 7. 1-Click Knowledge Check Micro-Quiz */}
          {subLesson.miniQuiz && (
            <MicroQuiz quiz={subLesson.miniQuiz} lang={lang} />
          )}

          {/* 🎯 8. Golden Rule & Codebase Mastery */}
          <div className="liquid-glass rounded-3xl p-6 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-xs">
                <Zap size={20} />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                  {t.ruleToRemember}
                </span>
                <p className="text-sm sm:text-base font-bold text-[#1d1d1f] pt-0.5">
                  "{localizedSub.keyTakeaway}"
                </p>
              </div>
            </div>

            {/* Codebase Enforcement Checklist */}
            {codeItem && (
              <div className="rounded-2xl bg-black/5 p-4 space-y-2 text-left border border-black/5">
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
          </div>

          {/* Clean Minimal Bottom Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-black/5">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
                hasPrevious
                  ? 'text-[#424245] hover:text-[#1d1d1f] hover:bg-black/5'
                  : 'opacity-30 cursor-not-allowed text-[#86868b]'
              }`}
            >
              <ArrowLeft size={14} />
              <span>{t.back}</span>
            </button>

            {/* Primary Clear Call to Action */}
            <button
              onClick={handleCompleteAndNext}
              className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-6 py-2.5 text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/25 transition"
            >
              <span>{isCompleted ? (hasNext ? t.continueNext : t.completed) : t.completeAndNext}</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Floating Sanad AI Tutor Chatbot Drawer */}
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
        </>
      )}
    </div>
  );
};
