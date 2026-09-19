import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  UserCheck,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Music2
} from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/translations';

interface AudioPlayerProps {
  lessonId: string;
  slideAudioKey?: string;
  script: string;
  speaker: 'YL (Systems Architect)' | 'MB (Quality Guardian)';
  lang?: 'en' | 'fr';
  onProgressUpdate?: (progressRatio: number, isPlaying: boolean) => void;
  onEnded?: () => void;
  autoPlay?: boolean;
}

const HIGHLIGHT_KEYWORDS = [
  'Rule 5',
  'SHA-256',
  'multilingual-e5-base',
  'Qdrant',
  'SQLite',
  'parent-child',
  'LangGraph',
  'NOT_COVERED',
  'WAL mode',
  'BOLA',
  '404 Not Found',
  'Keycloak',
  'Docker',
  'Railway',
  'G1',
  'G2',
  'G3',
  'RAGAS',
  'OpenAPI',
  'Law 09-08',
  'secrets.compare_digest',
  'E5',
  'BM25',
  'RRF',
  'StateGraph',
  'EvidenceCertificate',
  'Single-Flight',
  'recovery.py',
  'db/repo.py'
];

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  lessonId,
  slideAudioKey,
  script,
  speaker,
  lang = 'en',
  onProgressUpdate,
  onEnded,
  autoPlay = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const onProgressUpdateRef = useRef(onProgressUpdate);
  const onEndedRef = useRef(onEnded);

  useEffect(() => {
    onProgressUpdateRef.current = onProgressUpdate;
  }, [onProgressUpdate]);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  // Split script into sentences for interactive transcript review & click-to-seek
  const sentences = React.useMemo(() => {
    return script
      .split(/(?<=[.?!])\s+/)
      .filter((s) => s.trim().length > 0);
  }, [script]);

  // Determine audio source: specific slide walkthrough MP3 or full chapter MP3
  const [activeAudioSrc, setActiveAudioSrc] = useState(
    lang === 'fr' ? `/audio/fr/${lessonId}.mp3` : `/audio/${lessonId}.mp3`
  );

  useEffect(() => {
    const isFr = lang === 'fr';
    if (slideAudioKey) {
      setActiveAudioSrc(isFr ? `/audio/slides/fr/${slideAudioKey}.mp3` : `/audio/slides/${slideAudioKey}.mp3`);
    } else {
      setActiveAudioSrc(isFr ? `/audio/fr/${lessonId}.mp3` : `/audio/${lessonId}.mp3`);
    }
  }, [lessonId, slideAudioKey, lang]);

  // Reset audio state when lessonId, slideAudioKey, or language changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveSentenceIndex(0);
    if (onProgressUpdateRef.current) {
      onProgressUpdateRef.current(0, false);
    }
  }, [lessonId, slideAudioKey, lang]);

  // Auto-play when advancing slides if autoPlay is enabled
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [autoPlay, activeAudioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onProgressUpdateRef.current) {
        onProgressUpdateRef.current(currentTime / (duration || 1), false);
      }
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (onProgressUpdateRef.current) {
            onProgressUpdateRef.current(currentTime / (duration || 1), true);
          }
        })
        .catch((err) => {
          console.warn('Audio play error:', err);
        });
    }
  };

  // Keyboard shortcut: Press 'V' to Play/Pause voiceover
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setCurrentTime(cur);

    const ratio = Math.min(1, cur / dur);
    if (onProgressUpdateRef.current) {
      onProgressUpdateRef.current(ratio, isPlaying);
    }

    // Determine active sentence based on audio progress ratio
    const currentSentence = Math.min(
      sentences.length - 1,
      Math.floor(ratio * sentences.length)
    );
    setActiveSentenceIndex(currentSentence);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
      audioRef.current.playbackRate = speed;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setActiveSentenceIndex(sentences.length - 1);
    if (onProgressUpdateRef.current) {
      onProgressUpdateRef.current(1, false);
    }
    // Auto-advance callback when slide voiceover finishes
    if (onEndedRef.current) {
      onEndedRef.current();
    }
  };

  const seekToSentence = (index: number) => {
    if (!audioRef.current || !duration) return;
    const targetRatio = index / sentences.length;
    const targetTime = targetRatio * duration;
    audioRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
    setActiveSentenceIndex(index);
    if (!isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeekSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
      if (duration) {
        const ratio = val / duration;
        setActiveSentenceIndex(Math.min(sentences.length - 1, Math.floor(ratio * sentences.length)));
      }
    }
  };

  const handleSpeedCycle = () => {
    const nextSpeed = speed === 1 ? 1.25 : speed === 1.25 ? 1.5 : 1;
    setSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const resetPlay = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveSentenceIndex(0);
    if (onProgressUpdateRef.current) {
      onProgressUpdateRef.current(0, false);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const renderHighlightedSentence = (text: string, isCurrent: boolean) => {
    let parts: (string | React.ReactNode)[] = [text];

    HIGHLIGHT_KEYWORDS.forEach((kw) => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const split = part.split(new RegExp(`(${kw})`, 'gi'));
          split.forEach((seg, i) => {
            if (seg.toLowerCase() === kw.toLowerCase()) {
              newParts.push(
                <span
                  key={`${kw}-${i}`}
                  className="font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded border border-blue-200/50"
                >
                  {seg}
                </span>
              );
            } else {
              newParts.push(seg);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return (
      <span className={isCurrent ? 'bg-blue-100/70 font-medium px-1.5 py-0.5 rounded transition' : ''}>
        {parts}
      </span>
    );
  };

  return (
    <div className="liquid-glass rounded-3xl p-4 sm:p-5 shadow-sm space-y-3 transition-all duration-300">
      {/* Hidden HTML5 Native Audio Element */}
      <audio
        ref={audioRef}
        src={activeAudioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => {
          const fallback = lang === 'fr' ? `/audio/fr/${lessonId}.mp3` : `/audio/${lessonId}.mp3`;
          if (activeAudioSrc !== fallback) {
            setActiveAudioSrc(fallback);
          }
        }}
        preload="auto"
      />

      {/* Top Player Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Speaker Identity & Status */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 flex-shrink-0 shadow-sm">
            <Volume2 className={`h-5 w-5 ${isPlaying ? 'animate-pulse text-blue-600' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-tight text-[#1d1d1f]">
                {UI_TRANSLATIONS[lang]?.studioVoiceover || 'Studio Voiceover'}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-0.5 text-[10px] font-medium text-[#424245]">
                <UserCheck size={10} />
                {speaker.startsWith('YL')
                  ? (UI_TRANSLATIONS[lang]?.ylRole || 'YL (Systems Architect)')
                  : (UI_TRANSLATIONS[lang]?.mbRole || 'MB (Quality Guardian)')}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60 uppercase">
                <Music2 size={10} className="text-blue-600" />
                {lang === 'fr' ? 'FR • Neural' : 'EN • Neural'}
              </span>
            </div>
            <p className="text-[11px] text-[#86868b] tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)} • {isPlaying ? (lang === 'fr' ? 'Lecture audio en cours' : 'Playing studio audio') : (UI_TRANSLATIONS[lang]?.clickPlayToListen || 'Click play to listen')}
            </p>
          </div>
        </div>

        {/* Right: Controls & Transcript Toggle */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {/* Animated Waveform Bars */}
          <div className="flex items-center gap-1 h-5 px-2">
            {[40, 75, 30, 95, 60, 100, 45, 80].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-blue-500 transition-all duration-300"
                style={{
                  height: isPlaying ? `${h}%` : '25%',
                  opacity: isPlaying ? 0.9 : 0.25,
                }}
              />
            ))}
          </div>

          {/* Speed Toggle */}
          <button
            onClick={handleSpeedCycle}
            className="rounded-full bg-black/5 hover:bg-black/10 px-2.5 py-1 text-[11px] font-semibold text-[#424245] transition"
          >
            {speed}x
          </button>

          {/* Transcript Toggle */}
          <button
            onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
              isTranscriptOpen
                ? 'bg-blue-600 text-white'
                : 'bg-black/5 hover:bg-black/10 text-[#424245]'
            }`}
            title="Toggle Synchronized Transcript"
          >
            <FileText size={12} />
            <span className="hidden sm:inline">{UI_TRANSLATIONS[lang]?.transcript || 'Transcript'}</span>
            {isTranscriptOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {/* Reset / Rewind */}
          <button
            onClick={resetPlay}
            className="rounded-full p-2 text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 transition"
            title="Rewind to start"
          >
            <RotateCcw size={14} />
          </button>

          {/* Primary Play / Pause Button with V shortcut badge */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-1.5 h-9 px-3 rounded-full bg-blue-600 text-white shadow-sm shadow-blue-500/25 hover:bg-blue-500 active:scale-95 transition cursor-pointer"
            title="Play/Pause Voiceover (Keyboard Shortcut: V)"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            <span className="text-[10px] font-mono font-bold bg-white/20 px-1.5 py-0.2 rounded">V</span>
          </button>
        </div>
      </div>

      {/* Interactive Progress Scrubber Slider */}
      {duration > 0 && (
        <div className="pt-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeekSlider}
            className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
            title="Seek audio position"
          />
        </div>
      )}

      {/* Expandable Audio Transcript Drawer */}
      <AnimatePresence>
        {isTranscriptOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-black/5 pt-3 space-y-2.5"
          >
            <div className="flex items-center justify-between text-xs text-[#86868b]">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles size={13} className="text-blue-600" />
                Synchronized Transcript (Click any sentence to jump audio)
              </span>
              <span>Key Terms in Blue</span>
            </div>

            <div className="max-h-52 overflow-y-auto rounded-2xl bg-white/70 p-3.5 border border-black/5 text-xs text-[#424245] leading-relaxed space-y-2">
              {sentences.map((sentence, idx) => {
                const isCurrent = isPlaying && idx === activeSentenceIndex;

                return (
                  <p
                    key={idx}
                    onClick={() => seekToSentence(idx)}
                    className={`cursor-pointer p-1.5 rounded-xl transition ${
                      isCurrent
                        ? 'bg-blue-50/90 text-[#1d1d1f] font-medium border border-blue-200/60 shadow-xs'
                        : 'hover:bg-black/5'
                    }`}
                  >
                    <span className="text-[10px] text-[#86868b] mr-2 font-mono tabular-nums">
                      {idx + 1}.
                    </span>
                    {renderHighlightedSentence(sentence, isCurrent)}
                  </p>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
