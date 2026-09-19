import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Film,
  Crosshair,
  ShieldAlert,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { playHapticClick, playSlideSwoosh, playSuccessChime } from '../../utils/soundEffects';

export const Rule5MotionExplainer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 24; // 24-second cinematic explainer
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);

  // Scenes timeline:
  // 0 - 6s: Scene 1: The Solo Cowboy Trap (Red Alert)
  // 6 - 12s: Scene 2: The Twin-Seat Cockpit (Rule 5)
  // 12 - 18s: Scene 3: Mutual Target Lock (Dual Keylocks)
  // 18 - 24s: Scene 4: Precision Strike & Clean Master Merge
  const currentScene =
    currentTime < 6 ? 1 : currentTime < 12 ? 2 : currentTime < 18 ? 3 : 4;

  useEffect(() => {
    if (isPlaying) {
      const updateFrame = (timestamp: number) => {
        if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
        const delta = (timestamp - lastTimestampRef.current) / 1000;
        lastTimestampRef.current = timestamp;

        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= totalDuration) {
            setIsPlaying(false);
            playSuccessChime();
            return totalDuration;
          }
          return next;
        });

        animationFrameRef.current = requestAnimationFrame(updateFrame);
      };

      animationFrameRef.current = requestAnimationFrame(updateFrame);
    } else {
      lastTimestampRef.current = null;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (currentTime >= totalDuration) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
    playHapticClick();
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    playSlideSwoosh();
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const ms = Math.floor((secs % 1) * 10);
    return `00:${s < 10 ? '0' : ''}${s}.${ms}`;
  };

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-[#060a14] text-white shadow-2xl overflow-hidden font-mono space-y-4">
      {/* Video Top Bar */}
      <div className="bg-[#0c1322] px-4 sm:px-6 py-2.5 border-b border-cyan-900/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Film size={14} className="text-cyan-400" />
          <span className="font-bold text-cyan-300">
            Rule 5 Motion Explainer • 60 FPS Cinematic Simulation
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-gray-400">
          <span className="text-cyan-400 font-bold">
            SCENE 0{currentScene}: {
              currentScene === 1 ? 'THE SOLO PILOT TRAP' :
              currentScene === 2 ? 'TWIN-SEAT RULE 5' :
              currentScene === 3 ? 'MUTUAL TARGET LOCK' : 'PRECISION MERGE'
            }
          </span>
          <span className="tabular-nums font-mono">{formatTime(currentTime)} / 00:24.0</span>
        </div>
      </div>

      {/* Cinematic Screen Canvas */}
      <div className="relative aspect-[16/9] w-full bg-gradient-to-b from-[#080e1c] via-[#050912] to-[#020408] overflow-hidden flex items-center justify-center p-6">
        {/* Animated HUD Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff08_1px,transparent_1px),linear-gradient(to_bottom,#00ffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Dynamic Scene Choreography */}
        <AnimatePresence mode="wait">
          {/* SCENE 1: The Solo Danger (0s - 6s) */}
          {currentScene === 1 && (
            <motion.div
              key="scene1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center space-y-4 max-w-lg z-10"
            >
              <div className="h-16 w-16 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-500 text-rose-400 flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(244,63,94,0.4)]">
                <ShieldAlert size={36} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-950/60 px-2.5 py-0.5 rounded border border-rose-800">
                  CRITICAL HAZARD: SOLO FLIGHT
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  The Solo Cowboy Trap
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans pt-1">
                  When a single engineer flies alone, blind spots multiply. Without peer verification, ungrounded prompts slip through, hallucinating non-existent statutes in production.
                </p>
              </div>
            </motion.div>
          )}

          {/* SCENE 2: The Twin-Seat Rule 5 (6s - 12s) */}
          {currentScene === 2 && (
            <motion.div
              key="scene2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-2 gap-6 max-w-xl w-full z-10 text-center font-sans"
            >
              {/* Front Seat YL */}
              <div className="rounded-2xl bg-cyan-950/40 border border-cyan-500/40 p-5 space-y-2">
                <div className="h-12 w-12 mx-auto rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm font-mono">
                  YL
                </div>
                <h4 className="text-sm font-bold text-white">Pilot 1: Systems Architect</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Steers code architecture: SQLite schemas, LangGraph cycles, and Docker runtime.
                </p>
              </div>

              {/* Rear Seat MB */}
              <div className="rounded-2xl bg-purple-950/40 border border-purple-500/40 p-5 space-y-2">
                <div className="h-12 w-12 mx-auto rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm font-mono">
                  MB
                </div>
                <h4 className="text-sm font-bold text-white">Pilot 2: Quality Guardian</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Scans legal radar: Cites exact Moroccan Labor Code articles, runs RAGAS evals.
                </p>
              </div>
            </motion.div>
          )}

          {/* SCENE 3: Target Lock (12s - 18s) */}
          {currentScene === 3 && (
            <motion.div
              key="scene3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center space-y-5 max-w-md z-10"
            >
              <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping" />
                <div className="absolute inset-2 rounded-full border-2 border-emerald-400" />
                <Crosshair size={54} className="text-emerald-400 animate-pulse" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600">
                  TARGET ACQUIRED • DUAL KEYS ARMED
                </span>
                <h3 className="text-xl font-black text-white">
                  Mutual Verification Confirmed
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  Both pilots have turned their physical keys. Every citation verified against disk blocks.
                </p>
              </div>
            </motion.div>
          )}

          {/* SCENE 4: Precision Strike & Merge (18s - 24s) */}
          {currentScene === 4 && (
            <motion.div
              key="scene4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="text-center space-y-4 max-w-md z-10"
            >
              <div className="h-16 w-16 mx-auto rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                <ShieldCheck size={36} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-600">
                  MISSION ACCOMPLISHED
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Zero Hallucination Strike
                </h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Pull Request merged into main branch. Release Gates G1 (≥90%), G2 (100%), and G3 (100%) cleared with honors.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Progress Scrubber & Controls */}
      <div className="p-4 bg-[#0a0f1b] border-t border-cyan-900/40 space-y-3">
        {/* Timeline Scrubber */}
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={totalDuration}
            step={0.1}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          {/* Scene Markers */}
          <div className="grid grid-cols-4 text-[10px] text-gray-400 font-mono pt-1">
            <button onClick={() => handleSeek(0)} className="text-left hover:text-cyan-300">0s: Solo Trap</button>
            <button onClick={() => handleSeek(6)} className="text-left hover:text-cyan-300">6s: Rule 5 Cockpit</button>
            <button onClick={() => handleSeek(12)} className="text-left hover:text-cyan-300">12s: Dual Lock</button>
            <button onClick={() => handleSeek(18)} className="text-right hover:text-cyan-300">18s: Master Merge</button>
          </div>
        </div>

        {/* Video Control Buttons */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs shadow-md shadow-cyan-500/20 transition"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              <span>{isPlaying ? 'Pause' : currentTime >= totalDuration ? 'Replay' : 'Play Explainer'}</span>
            </button>

            <button
              onClick={() => handleSeek(0)}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300"
              title="Restart Video"
            >
              <RotateCcw size={14} />
            </button>
          </div>

          <div className="text-[11px] text-gray-400 font-sans flex items-center gap-2">
            <Zap size={13} className="text-cyan-400" />
            <span>Interactive HyperFrames-Style Motion Video</span>
          </div>
        </div>
      </div>
    </div>
  );
};
