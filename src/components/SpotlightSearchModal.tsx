import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Clock } from 'lucide-react';
import type { Track, Lesson, SubLesson } from '../data/courseData';
import { playHapticClick, playSlideSwoosh } from '../utils/soundEffects';

interface FlatLessonItem {
  track: Track;
  lesson: Lesson;
  subLesson: SubLesson;
}

interface SpotlightSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allSubLessons: FlatLessonItem[];
  onSelectLesson: (subLesson: SubLesson, lesson: Lesson, track: Track) => void;
}

export const SpotlightSearchModal: React.FC<SpotlightSearchModalProps> = ({
  isOpen,
  onClose,
  allSubLessons,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
      playSlideSwoosh();
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Filter lessons based on query
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Show default top recommendations
      return allSubLessons.slice(0, 7);
    }

    return allSubLessons.filter((item) => {
      const title = item.subLesson.title.toLowerCase();
      const metaTitle = item.subLesson.metaphor.title.toLowerCase();
      const metaDesc = item.subLesson.metaphor.description.toLowerCase();
      const solTitle = item.subLesson.solution.title.toLowerCase();
      const takeaway = item.subLesson.keyTakeaway.toLowerCase();
      const specNum = String(item.lesson.specNumber);

      return (
        title.includes(q) ||
        metaTitle.includes(q) ||
        metaDesc.includes(q) ||
        solTitle.includes(q) ||
        takeaway.includes(q) ||
        specNum === q ||
        item.track.shortName.toLowerCase().includes(q)
      );
    }).slice(0, 10);
  }, [query, allSubLessons]);

  // Keyboard navigation: Escape, ArrowDown, ArrowUp, Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
        playHapticClick();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        playHapticClick();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          const item = filtered[selectedIndex];
          onSelectLesson(item.subLesson, item.lesson, item.track);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, onSelectLesson]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Spotlight Window */}
      <div className="relative z-10 w-full max-w-2xl liquid-glass rounded-3xl border border-white/80 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-black/5 bg-white/70">
          <Search size={18} className="text-[#86868b] flex-shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search all 51 lessons, concepts, or code (e.g. BOLA, Article 184, E5, recovery.py)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1d1d1f] placeholder:text-[#86868b] outline-none font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5"
            >
              <X size={15} />
            </button>
          ) : (
            <span className="hidden sm:inline-block rounded-md bg-black/5 px-2 py-0.5 text-[10px] font-bold text-[#86868b]">
              ESC
            </span>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="px-5 py-2.5 bg-black/[0.02] border-b border-black/5 flex items-center gap-1.5 overflow-x-auto text-[11px] text-[#86868b]">
            <span className="font-semibold text-[#424245]">Popular:</span>
            {['Parent-Child', 'Rule 5', 'Article 184', 'BOLA 404', 'LangGraph 9-Node', 'E5 Prefix'].map((kw) => (
              <button
                key={kw}
                onClick={() => setQuery(kw)}
                className="rounded-full bg-white/80 hover:bg-white border border-black/5 px-2.5 py-0.5 text-[#1d1d1f] font-medium transition"
              >
                {kw}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.subLesson.id}
                  onClick={() => {
                    onSelectLesson(item.subLesson, item.lesson, item.track);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full p-3 rounded-2xl cursor-pointer text-left transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'hover:bg-black/5 text-[#1d1d1f]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl flex-shrink-0">
                      {item.subLesson.metaphor.emoji}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            isSelected ? 'text-white/80' : 'text-blue-600'
                          }`}
                        >
                          Spec {item.lesson.specNumber}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'text-white/60' : 'text-[#86868b]'}`}>
                          • {item.track.shortName}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold truncate">
                        {item.subLesson.title}
                      </h4>
                      <p
                        className={`text-[11px] truncate ${
                          isSelected ? 'text-white/80' : 'text-[#86868b]'
                        }`}
                      >
                        {item.subLesson.metaphor.title} — {item.subLesson.keyTakeaway}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] flex items-center gap-0.5 ${
                        isSelected ? 'text-white/80' : 'text-[#86868b]'
                      }`}
                    >
                      <Clock size={10} />
                      {item.subLesson.duration}
                    </span>
                    <ArrowRight
                      size={14}
                      className={isSelected ? 'text-white' : 'text-transparent'}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 space-y-2 text-[#86868b]">
              <BookOpen size={24} className="mx-auto text-black/20" />
              <p className="text-xs font-semibold">No matching lessons found for "{query}"</p>
              <p className="text-[11px]">Try searching by topic, statute, or architecture component</p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="p-3 border-t border-black/5 bg-black/[0.02] flex items-center justify-between text-[11px] text-[#86868b] px-5">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>ESC to close</span>
          </div>
          <span>{allSubLessons.length} micro-lessons indexed</span>
        </div>
      </div>
    </div>
  );
};
