import React, { useState } from 'react';
import { COURSE_TRACKS } from '../data/courseData';
import type { Track, Lesson, SubLesson } from '../data/courseData';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock
} from 'lucide-react';
import { UI_TRANSLATIONS, getLocalizedSubLesson, getLocalizedTrack, getLocalizedLessonTitle } from '../data/translations';

interface SidebarProps {
  activeSubLessonId: string;
  onSelectSubLesson: (subLesson: SubLesson, lesson: Lesson, track: Track) => void;
  completedSubLessonIds: Set<string>;
  isOpen: boolean;
  onCloseMobile: () => void;
  lang?: 'en' | 'fr';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSubLessonId,
  onSelectSubLesson,
  completedSubLessonIds,
  isOpen,
  onCloseMobile,
  lang = 'en'
}) => {
  const [expandedTracks, setExpandedTracks] = useState<Set<string>>(new Set(['track-1']));
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set(['lesson-1']));
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const toggleTrack = (trackId: string) => {
    const next = new Set(expandedTracks);
    if (next.has(trackId)) {
      next.delete(trackId);
    } else {
      next.add(trackId);
    }
    setExpandedTracks(next);
  };

  const toggleLesson = (lessonId: string) => {
    const next = new Set(expandedLessons);
    if (next.has(lessonId)) {
      next.delete(lessonId);
    } else {
      next.add(lessonId);
    }
    setExpandedLessons(next);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-20 bottom-4 left-4 z-40 w-72 sm:w-80 liquid-glass rounded-3xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-[110%]'
        } flex flex-col shadow-xl shadow-black/5 overflow-hidden`}
      >
        {/* Header */}
        <div className="p-4 border-b border-black/5 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-tight text-[#1d1d1f]">
            {t.courseTracks}
          </span>
          <span className="text-[11px] font-medium text-[#86868b]">
            {t.tracksCount}
          </span>
        </div>

        {/* Scrollable Tracks & Lessons */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {COURSE_TRACKS.map((track) => {
            const isTrackExpanded = expandedTracks.has(track.id);
            const localizedTrack = getLocalizedTrack(track, lang);
            const trackCompletedCount = track.lessons
              .flatMap((l) => l.subLessons)
              .filter((s) => completedSubLessonIds.has(s.id)).length;
            const trackTotalCount = track.lessons.flatMap((l) => l.subLessons).length;

            return (
              <div
                key={track.id}
                className="rounded-2xl border border-black/5 bg-white/50 backdrop-blur-md overflow-hidden transition"
              >
                {/* Track Accordion Header */}
                <button
                  onClick={() => toggleTrack(track.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-white/80 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: track.color }}
                    />
                    <span className="text-xs font-semibold text-[#1d1d1f] truncate">
                      {localizedTrack.shortName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[11px] text-[#86868b] font-medium tabular-nums">
                      {trackCompletedCount}/{trackTotalCount}
                    </span>
                    {isTrackExpanded ? (
                      <ChevronDown size={14} className="text-[#86868b]" />
                    ) : (
                      <ChevronRight size={14} className="text-[#86868b]" />
                    )}
                  </div>
                </button>

                {/* Track Lessons */}
                {isTrackExpanded && (
                  <div className="px-2 pb-2 pt-1 space-y-1 border-t border-black/5">
                    {track.lessons.map((lesson) => {
                      const isLessonExpanded = expandedLessons.has(lesson.id);
                      const localizedLessonTitle = getLocalizedLessonTitle(lesson, lang);

                      return (
                        <div key={lesson.id} className="rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleLesson(lesson.id)}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 text-left hover:bg-black/5 rounded-lg transition"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold bg-black/5 text-[#6e6e73]">
                                {lesson.specNumber}
                              </span>
                              <span className="text-xs font-medium text-[#424245] truncate">
                                {localizedLessonTitle}
                              </span>
                            </div>
                            {isLessonExpanded ? (
                              <ChevronDown size={12} className="text-[#86868b]" />
                            ) : (
                              <ChevronRight size={12} className="text-[#86868b]" />
                            )}
                          </button>

                          {/* Sublessons */}
                          {isLessonExpanded && (
                            <div className="pl-4 pr-1 py-1 space-y-0.5">
                              {lesson.subLessons.map((subLesson) => {
                                const localizedSub = getLocalizedSubLesson(subLesson, lang);
                                const isActive = subLesson.id === activeSubLessonId;
                                const isCompleted = completedSubLessonIds.has(subLesson.id);

                                return (
                                  <button
                                    key={subLesson.id}
                                    onClick={() => {
                                      onSelectSubLesson(subLesson, lesson, track);
                                      onCloseMobile();
                                    }}
                                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition ${
                                      isActive
                                        ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20'
                                        : 'text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-white/70'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      {isCompleted ? (
                                        <CheckCircle2
                                          size={13}
                                          className={isActive ? 'text-white' : 'text-emerald-600'}
                                        />
                                      ) : (
                                        <Circle
                                          size={13}
                                          className={isActive ? 'text-white/60' : 'text-[#c7c7cc]'}
                                        />
                                      )}
                                      <span className="truncate">{localizedSub.title}</span>
                                    </div>
                                    <span
                                      className={`text-[10px] flex items-center gap-0.5 ml-1 flex-shrink-0 ${
                                        isActive ? 'text-white/80' : 'text-[#86868b]'
                                      }`}
                                    >
                                      <Clock size={10} />
                                      {subLesson.duration}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
