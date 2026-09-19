import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Clock, MapPin } from 'lucide-react';
import type { SubLesson } from '../data/courseData';
import { UI_TRANSLATIONS, getLocalizedSubLesson } from '../data/translations';

interface JourneyTrackerProps {
  completedSubLessonIds: Set<string>;
  allSubLessons: { trackTitle: string; lessonTitle: string; subLesson: SubLesson }[];
  currentSubLessonId: string;
  onSelectSubLessonById: (id: string) => void;
  lang?: 'en' | 'fr';
}

export const JourneyTracker: React.FC<JourneyTrackerProps> = ({
  completedSubLessonIds,
  allSubLessons,
  currentSubLessonId,
  onSelectSubLessonById,
  lang = 'en'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  const currentIndex = allSubLessons.findIndex(item => item.subLesson.id === currentSubLessonId);
  const rawCurrentItem = allSubLessons[currentIndex] || allSubLessons[0];
  const currentSubLesson = getLocalizedSubLesson(rawCurrentItem.subLesson, lang);

  const nextItem = currentIndex < allSubLessons.length - 1 ? allSubLessons[currentIndex + 1] : null;
  const nextSubLesson = nextItem ? getLocalizedSubLesson(nextItem.subLesson, lang) : null;

  const total = allSubLessons.length;
  const completed = completedSubLessonIds.size;
  const remaining = Math.max(0, total - completed);
  const progressPercent = Math.round((completed / total) * 100);

  // Estimate remaining time (~2.5 min per remaining lesson)
  const remainingMinutes = remaining * 2.5;

  return (
    <div className="w-full">
      {/* Compact Liquid Glass Dynamic Island */}
      <div className="liquid-glass rounded-2xl p-3 sm:p-4 shadow-sm transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Journey State Indicators */}
          <div className="flex items-center gap-3">
            {/* Status dot */}
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <MapPin size={16} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#86868b]">
                <span>Track {rawCurrentItem.trackTitle.split(':')[0]}</span>
                <span>•</span>
                <span className="text-blue-600 font-semibold">{progressPercent}% {t.conquered}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#1d1d1f] truncate max-w-[280px] sm:max-w-md">
                {t.current} <span className="font-normal text-[#424245]">{currentSubLesson.title}</span>
              </h4>
            </div>
          </div>

          {/* Right: Next Up & Remaining Stats */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            {/* Next Up pill */}
            {nextSubLesson && nextItem && (
              <button
                onClick={() => onSelectSubLessonById(nextItem.subLesson.id)}
                className="hidden md:flex items-center gap-1.5 rounded-full bg-black/5 hover:bg-black/10 px-3 py-1 text-[11px] font-medium text-[#424245] transition"
                title="Jump to Next Lesson"
              >
                <span className="text-[#86868b]">{t.next}</span>
                <span className="truncate max-w-[140px] text-[#1d1d1f] font-semibold">{nextSubLesson.title.split(' ')[1] || nextSubLesson.title}</span>
                <ChevronRight size={12} />
              </button>
            )}

            {/* Quick Metrics Badge */}
            <div className="flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/60 px-3 py-1 text-[11px] font-semibold text-blue-700">
              <Clock size={12} />
              <span>~{Math.round(remainingMinutes)}m {t.left}</span>
            </div>

            {/* Expand History toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full bg-black/5 hover:bg-black/10 px-2.5 py-1 text-[11px] font-medium text-[#6e6e73] transition"
            >
              {isExpanded ? 'Hide' : `${completed}/${total} ${t.done}`}
            </button>
          </div>
        </div>

        {/* Micro segmented progress bar */}
        <div className="mt-3 flex items-center gap-1">
          {allSubLessons.map((item, idx) => {
            const isDone = completedSubLessonIds.has(item.subLesson.id);
            const isCurrent = item.subLesson.id === currentSubLessonId;
            const localized = getLocalizedSubLesson(item.subLesson, lang);

            return (
              <div
                key={item.subLesson.id}
                onClick={() => onSelectSubLessonById(item.subLesson.id)}
                className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all duration-300 ${
                  isDone
                    ? 'bg-blue-600'
                    : isCurrent
                    ? 'bg-blue-400 animate-pulse ring-2 ring-blue-400/30'
                    : 'bg-black/5 hover:bg-black/15'
                }`}
                title={`${idx + 1}. ${localized.title}`}
              />
            );
          })}
        </div>

        {/* Expandable History Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-black/5 mt-3 pt-3"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[#86868b] mb-2">
                <span>{t.learningTrail}</span>
                <span>{completed} {t.completedCount} • {remaining} {t.left}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {allSubLessons.map((item) => {
                  const isDone = completedSubLessonIds.has(item.subLesson.id);
                  const isCurrent = item.subLesson.id === currentSubLessonId;
                  const localized = getLocalizedSubLesson(item.subLesson, lang);

                  return (
                    <button
                      key={item.subLesson.id}
                      onClick={() => {
                        onSelectSubLessonById(item.subLesson.id);
                        setIsExpanded(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition ${
                        isCurrent
                          ? 'bg-blue-500/10 border border-blue-500/30 text-blue-900 font-semibold'
                          : isDone
                          ? 'bg-white/60 text-[#1d1d1f] hover:bg-white'
                          : 'bg-black/5 text-[#86868b] hover:bg-black/10'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
                      ) : (
                        <div className={`h-3 w-3 rounded-full border ${isCurrent ? 'border-blue-500 bg-blue-500' : 'border-[#86868b]'}`} />
                      )}
                      <span className="truncate">{localized.title}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
