import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  FileText,
  Database,
  Cpu,
  Lock,
  Layers,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { COURSE_TRACKS } from '../data/courseData';
import { playHapticClick, playSlideSwoosh } from '../utils/soundEffects';

interface AnimatedArchitecturePipelineProps {
  currentTrackId: string;
  currentSpecNumber: number;
  completedSubLessonIds: Set<string>;
  lang?: 'en' | 'fr';
}

export const AnimatedArchitecturePipeline: React.FC<AnimatedArchitecturePipelineProps> = ({
  currentTrackId,
  currentSpecNumber,
  completedSubLessonIds,
  lang = 'en'
}) => {
  // Map currentTrackId to station index (0 to 5)
  const trackIndexMap: Record<string, number> = {
    'track-1': 0,
    'track-2': 1,
    'track-3': 2,
    'track-4': 3,
    'track-5': 4,
    'track-6': 5,
  };

  const defaultStation = trackIndexMap[currentTrackId] ?? 0;
  const [activeStation, setActiveStation] = useState<number>(defaultStation);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);

  // Sync active station when track changes
  useEffect(() => {
    setActiveStation(defaultStation);
  }, [defaultStation]);

  const stationsData = [
    {
      id: 0,
      trackId: 'track-1',
      icon: ShieldCheck,
      color: '#3b82f6',
      title: lang === 'fr' ? '1. Gouvernance & Cadence Agile' : '1. Governance & Sprint Cadence',
      subtitle: lang === 'fr' ? 'Specs 1–3 : Règle 5 & Sprints' : 'Specs 1–3: Rule 5 Protocol',
      desc: lang === 'fr'
        ? 'Fondations opérationnelles : revue croisée obligatoire YL & MB, cadence des Sprints 0 à 6, et journaux de bord BUILD-STATE / DECISIONS.'
        : 'Operational foundations: mandatory two-person review law (Rule 5), Sprints 0–6 progression, and living flight recorders.',
      activeArtifact: lang === 'fr'
        ? 'Règle 5 en vigueur : aucun commit ne fusionne sans accord mutuel. Verrouillage strict des spécifications.'
        : 'Rule 5 enforced: zero cowboy merges. Immutable specification lock and pre-agreed descope ladder.',
    },
    {
      id: 1,
      trackId: 'track-2',
      icon: FileText,
      color: '#06d6a0',
      title: lang === 'fr' ? '2. Vision Produit & Ingestion' : '2. Product Purpose & Document Ingestion',
      subtitle: lang === 'fr' ? 'Specs 4–6 : Citations & OCR' : 'Specs 4–6: Hashing & OCR',
      desc: lang === 'fr'
        ? 'Règle d\'or du RAG : Ne jamais deviner, toujours prouver. Citations vérifiées par code (F-03), refus honnêtes (F-05) et interface trilingue RTL.'
        : 'Golden RAG invariant: Never guess, always prove. Code-enforced citations (F-03), honest refusals (F-05), and trilingual Arabic RTL.',
      activeArtifact: lang === 'fr'
        ? 'Inspection de documents réels : scan officiel du Code du travail marocain avec surlignage jaune néon des Articles 184 et 14.'
        : 'Real document inspection: official scanned Moroccan Labor Code with yellow neon highlighter over Articles 184 & 14.',
    },
    {
      id: 2,
      trackId: 'track-3',
      icon: Database,
      color: '#f59e0b',
      title: lang === 'fr' ? '3. Stockage & Concurrence' : '3. Persistence & Concurrency Engine',
      subtitle: lang === 'fr' ? 'Specs 7–9 : SQLite WAL & Découpage' : 'Specs 7–9: SQLite WAL & Parent-Child',
      desc: lang === 'fr'
        ? 'Architecture hexagonale à 8 ports, base relationnelle SQLite en mode WAL avec cascades atomiques, et stockage parent-enfant (500 car. vs 4 000 car.).'
        : 'Hexagonal ports-and-adapters architecture, SQLite WAL mode with foreign key cascades, and dual-tier parent-child storage.',
      activeArtifact: lang === 'fr'
        ? 'Résilience de production : Mutex Single-Flight contre les pics de RAM et réconciliation automatique des pannes (recovery.py).'
        : 'Production resilience: Single-Flight concurrency mutex protecting RAM and startup crash recovery worker (recovery.py).',
    },
    {
      id: 3,
      trackId: 'track-4',
      icon: Cpu,
      color: '#ec4899',
      title: lang === 'fr' ? '4. Cerveau IA & Raisonnement LangGraph' : '4. AI Brain & LangGraph Reasoning',
      subtitle: lang === 'fr' ? 'Specs 10–12 : 9 Nœuds & Portes' : 'Specs 10–12: 9 Nodes & Release Gates',
      desc: lang === 'fr'
        ? 'Machine à états cyclique à 9 ouvriers, recherche hybride fusionnée via RRF (vecteurs denses E5 + mots-clés BM25), et les 3 portes de sortie RAGAS.'
        : 'Bounded 9-node cyclic state machine, hybrid search fusion via RRF formula (E5 vectors + BM25), and the 3 non-negotiable release gates.',
      activeArtifact: lang === 'fr'
        ? 'Validation mathématique : Porte 1 (Fidélité ≥ 90%), Porte 2 (Refus = 100%), Porte 3 (Citations = 100%) sur 60 questions certifiées.'
        : 'Mathematical release criteria: Gate 1 (Faithfulness ≥90%), Gate 2 (Refusals = 100%), Gate 3 (Citations = 100%) on 60 frozen questions.',
    },
    {
      id: 4,
      trackId: 'track-5',
      icon: Lock,
      color: '#ef4444',
      title: lang === 'fr' ? '5. Sécurité Zero-Trust & Cloud' : '5. Zero-Trust Security & Cloud Ops',
      subtitle: lang === 'fr' ? 'Specs 13–15 : Keycloak & BOLA 404' : 'Specs 13–15: Keycloak & BOLA 404',
      desc: lang === 'fr'
        ? 'Fédération d\'identité Keycloak OIDC, RBAC à 4 rôles, défense BOLA avec réponses 404 silencieuses, conformité Loi 09-08 et conteneur CPU sur Railway.'
        : 'Keycloak OIDC federated identity, 4-tier RBAC, BOLA defense with silent 404s, Moroccan Law 09-08 compliance, and CPU container on Railway.',
      activeArtifact: lang === 'fr'
        ? 'Périmètre défensif : requêtes SQL 100% paramétrées, hachage constant secrets.compare_digest et conteneur Docker non-root sans privilège.'
        : 'Defensive perimeter: 100% parameterized SQL, constant-time compare_digest, and unprivileged non-root Docker execution.',
    },
    {
      id: 5,
      trackId: 'track-6',
      icon: Layers,
      color: '#8b5cf6',
      title: lang === 'fr' ? '6. Codebase & Pyramide de Tests' : '6. Codebase Architecture & Test Pyramid',
      subtitle: lang === 'fr' ? 'Specs 16–20 : 13 Modules & CI' : 'Specs 16–20: 13 Root Modules & CI Gates',
      desc: lang === 'fr'
        ? 'Catalogue exhaustif des 13 modules racines, bibliothécaire strict db/repo.py, templates Jinja2 sans JS, et proctor d\'examen automatique.'
        : 'File-by-file catalog of 13 root modules, db/repo.py strict librarian, No-JS Jinja2 templates, and automated exam proctor.',
      activeArtifact: lang === 'fr'
        ? 'Pyramide de tests : tests unitaires rapides sur ports isolés (<1s) combinés aux portes de validation de vérité générative en CI.'
        : 'Testing pyramid: sub-second unit tests on isolated ports combined with CI release gates verifying generative factual truth.',
    }
  ];

  // Calculate live progress for each station
  const stations = stationsData.map((st) => {
    const trackObj = COURSE_TRACKS.find((t) => t.id === st.trackId);
    const subLessons = trackObj ? trackObj.lessons.flatMap((l) => l.subLessons) : [];
    const totalCount = subLessons.length;
    const completedCount = subLessons.filter((s) => completedSubLessonIds.has(s.id)).length;
    const isCompleted = totalCount > 0 && completedCount === totalCount;
    const isCurrentTrack = st.trackId === currentTrackId;

    return {
      ...st,
      totalCount,
      completedCount,
      isCompleted,
      isCurrentTrack,
    };
  });

  // Auto-play animation through stations
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingAnimation) {
      interval = setInterval(() => {
        setActiveStation((prev) => {
          if (prev >= stations.length - 1) {
            setIsPlayingAnimation(false);
            return defaultStation;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAnimation, stations.length, defaultStation]);

  const handleStartPlay = () => {
    setActiveStation(0);
    setIsPlayingAnimation(true);
    playSlideSwoosh();
  };

  const activeData = stations[activeStation] || stations[0];

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-7 shadow-sm space-y-5 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm sm:text-base font-bold text-[#1d1d1f] tracking-tight">
              {lang === 'fr' ? 'Cycle de Vie Architectural en Direct' : 'Live Architecture Lifecycle Pipeline'}
            </h3>
          </div>
          <p className="text-xs text-[#86868b] mt-0.5">
            {lang === 'fr'
              ? 'Synchronisé en temps réel avec votre progression à travers les 6 piliers du système'
              : 'Synchronized live with your progress across the 6 architectural pillars of Sanad'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlayingAnimation(false);
              setActiveStation(defaultStation);
              playHapticClick();
            }}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition"
            title={lang === 'fr' ? 'Réinitialiser sur la station active' : 'Reset to current station'}
          >
            <RotateCcw size={14} />
          </button>

          <button
            onClick={handleStartPlay}
            disabled={isPlayingAnimation}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold shadow-xs transition ${
              isPlayingAnimation
                ? 'bg-blue-100 text-blue-800'
                : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-95'
            }`}
          >
            <Play size={12} className={isPlayingAnimation ? 'animate-spin' : ''} />
            <span>
              {isPlayingAnimation
                ? (lang === 'fr' ? 'Cycle en cours...' : 'Flowing...')
                : (lang === 'fr' ? 'Animer le Cycle' : 'Play Lifecycle Flow')}
            </span>
          </button>
        </div>
      </div>

      {/* SVG Pipeline Cable with Live Status Nodes */}
      <div className="relative py-2 overflow-x-auto">
        <div className="min-w-[660px]">
          {/* SVG Animated Bus Wire */}
          <svg viewBox="0 0 660 70" className="w-full h-16 drop-shadow-xs">
            {/* Background Rail */}
            <path
              d="M 50 35 L 610 35"
              fill="none"
              stroke="#e5e5ea"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Active Progress Cable */}
            <motion.path
              d={`M 50 35 L ${50 + activeStation * 112} 35`}
              fill="none"
              stroke="#0071e3"
              strokeWidth="5"
              strokeLinecap="round"
              className="transition-all duration-500"
            />

            {/* Moving Particle Packet */}
            {isPlayingAnimation && (
              <circle cx="50" cy="35" r="5" fill="#ffffff" stroke="#0071e3" strokeWidth="2.5">
                <animate
                  attributeName="cx"
                  from="50"
                  to="610"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Station Rings */}
            {stations.map((st, idx) => {
              const cx = 50 + idx * 112;
              const isSelected = idx === activeStation;

              return (
                <g
                  key={st.id}
                  className="cursor-pointer"
                  onClick={() => {
                    setActiveStation(idx);
                    playHapticClick();
                  }}
                >
                  <circle
                    cx={cx}
                    cy="35"
                    r={isSelected ? "17" : "13"}
                    fill={st.isCompleted ? "#10b981" : isSelected ? "#0071e3" : st.isCurrentTrack ? "#38bdf8" : "#ffffff"}
                    stroke={isSelected ? "#0071e3" : st.isCompleted ? "#10b981" : st.isCurrentTrack ? "#0284c7" : "#d2d2d7"}
                    strokeWidth={isSelected ? "3" : "2"}
                    className="transition-all duration-300"
                  />
                  {st.isCompleted ? (
                    <text x={cx} y="39" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">✓</text>
                  ) : (
                    <text
                      x={cx}
                      y="39"
                      textAnchor="middle"
                      fill={isSelected || st.isCurrentTrack ? "#ffffff" : "#6e6e73"}
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {idx + 1}
                    </text>
                  )}
                  {isSelected && (
                    <circle cx={cx} cy="35" r="23" fill="none" stroke="#0071e3" strokeWidth="2" opacity="0.4" className="animate-ping" />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Station Labels Row with Live Progress Indicators */}
          <div className="grid grid-cols-6 gap-2 pt-1 text-center">
            {stations.map((st, idx) => {
              const isSelected = idx === activeStation;
              const Icon = st.icon;

              return (
                <button
                  key={st.id}
                  onClick={() => {
                    setActiveStation(idx);
                    playHapticClick();
                  }}
                  className={`flex flex-col items-center p-2 rounded-2xl transition ${
                    isSelected
                      ? 'bg-blue-50/90 border border-blue-200 shadow-xs'
                      : st.isCurrentTrack
                      ? 'bg-white/80 border border-blue-100 shadow-2xs'
                      : 'hover:bg-black/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className="h-7 w-7 rounded-xl flex items-center justify-center mb-1 text-white shadow-2xs"
                    style={{ backgroundColor: st.color }}
                  >
                    <Icon size={14} />
                  </div>
                  <span className="text-[11px] font-bold text-[#1d1d1f] line-clamp-1">
                    {st.title.split('. ')[1]}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-[#86868b] mt-0.5">
                    {st.isCompleted ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 size={10} />
                        <span>{st.completedCount}/{st.totalCount}</span>
                      </span>
                    ) : (
                      <span>{st.completedCount}/{st.totalCount}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Station Detailed Card Grounded in Current Architecture */}
      <motion.div
        key={activeStation}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-black/5 bg-white/80 p-4 sm:p-5 shadow-xs space-y-2.5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: activeData.color }}
            />
            <h4 className="text-xs sm:text-sm font-bold text-[#1d1d1f]">
              {activeData.title} • <span className="text-[#6e6e73] font-medium">{activeData.subtitle}</span>
            </h4>
          </div>

          <div className="flex items-center gap-2">
            {activeData.isCompleted ? (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 size={12} />
                <span>{lang === 'fr' ? 'Pilier Maîtrisé ✓' : 'Pillar Mastered ✓'}</span>
              </span>
            ) : activeData.isCurrentTrack ? (
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 animate-pulse">
                {lang === 'fr' ? 'Station Active (En cours)' : 'Current Active Station'}
              </span>
            ) : (
              <span className="text-[11px] font-medium text-[#86868b] bg-black/5 px-2.5 py-0.5 rounded-full">
                {lang === 'fr' ? 'Station Système' : 'System Station'}
              </span>
            )}

            <span className="text-[11px] font-mono text-gray-500 tabular-nums">
              Spec {currentSpecNumber} • {activeData.completedCount} / {activeData.totalCount} {lang === 'fr' ? 'chapitres' : 'chapters'}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
          {activeData.desc}
        </p>

        <div className="rounded-xl bg-black/5 p-3 text-xs text-[#1d1d1f] font-medium flex items-start gap-2">
          <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{activeData.activeArtifact}</span>
        </div>
      </motion.div>
    </div>
  );
};
