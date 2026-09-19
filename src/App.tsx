import { useState, useEffect } from 'react';
import { COURSE_TRACKS } from './data/courseData';
import type { Track, Lesson, SubLesson } from './data/courseData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { JourneyTracker } from './components/JourneyTracker';
import { DefenseCertificateModal } from './components/DefenseCertificateModal';
import { SpotlightSearchModal } from './components/SpotlightSearchModal';
import { ArchitectureSandbox } from './components/sandbox/ArchitectureSandbox';

export function App() {
  const allSubLessonsWithParents = COURSE_TRACKS.flatMap((track) =>
    track.lessons.flatMap((lesson) =>
      lesson.subLessons.map((subLesson) => ({
        track,
        lesson,
        subLesson,
        trackTitle: track.title,
        lessonTitle: lesson.title,
      }))
    )
  );

  const [activeTrack, setActiveTrack] = useState<Track>(COURSE_TRACKS[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson>(COURSE_TRACKS[0].lessons[0]);
  const [activeSubLesson, setActiveSubLesson] = useState<SubLesson>(
    COURSE_TRACKS[0].lessons[0].subLessons[0]
  );

  const [completedSubLessonIds, setCompletedSubLessonIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('sanad_completed_lessons');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [activeSpeaker, setActiveSpeaker] = useState<
    'YL (Systems Architect)' | 'MB (Quality Guardian)'
  >('YL (Systems Architect)');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<'curriculum' | 'sandbox'>('curriculum');
  const [lang, setLang] = useState<'en' | 'fr'>(() => {
    try {
      return (localStorage.getItem('sanad_lang') as 'en' | 'fr') || 'en';
    } catch {
      return 'en';
    }
  });

  const handleSelectLang = (newLang: 'en' | 'fr') => {
    setLang(newLang);
    try {
      localStorage.setItem('sanad_lang', newLang);
    } catch (e) {
      console.error('Failed to save language', e);
    }
  };

  // Keyboard shortcut: Cmd+K / Ctrl+K to toggle Spotlight Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'sanad_completed_lessons',
        JSON.stringify(Array.from(completedSubLessonIds))
      );
    } catch (e) {
      console.error('Failed to save completion state', e);
    }
  }, [completedSubLessonIds]);

  const handleResetProgress = () => {
    if (window.confirm('Reset all progress back to 0% and start fresh from Lesson 1?')) {
      setCompletedSubLessonIds(new Set());
      try {
        localStorage.removeItem('sanad_completed_lessons');
      } catch (e) {
        console.error('Failed to clear progress', e);
      }
      setActiveTrack(COURSE_TRACKS[0]);
      setActiveLesson(COURSE_TRACKS[0].lessons[0]);
      setActiveSubLesson(COURSE_TRACKS[0].lessons[0].subLessons[0]);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  const handleToggleComplete = (subLessonId: string) => {
    setCompletedSubLessonIds((prev) => {
      const next = new Set(prev);
      if (next.has(subLessonId)) {
        next.delete(subLessonId);
      } else {
        next.add(subLessonId);
      }
      return next;
    });
  };

  const handleToggleSpeaker = () => {
    setActiveSpeaker((prev) =>
      prev.startsWith('YL') ? 'MB (Quality Guardian)' : 'YL (Systems Architect)'
    );
  };

  const handleSelectSubLesson = (subLesson: SubLesson, lesson: Lesson, track: Track) => {
    setActiveTrack(track);
    setActiveLesson(lesson);
    setActiveSubLesson(subLesson);
    setCurrentTab('curriculum');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleSelectSubLessonById = (id: string) => {
    const item = allSubLessonsWithParents.find((i) => i.subLesson.id === id);
    if (item) {
      handleSelectSubLesson(item.subLesson, item.lesson, item.track);
    }
  };

  const currentIndex = allSubLessonsWithParents.findIndex(
    (item) => item.subLesson.id === activeSubLesson.id
  );

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allSubLessonsWithParents.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) {
      const prevItem = allSubLessonsWithParents[currentIndex - 1];
      handleSelectSubLesson(prevItem.subLesson, prevItem.lesson, prevItem.track);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const nextItem = allSubLessonsWithParents[currentIndex + 1];
      handleSelectSubLesson(nextItem.subLesson, nextItem.lesson, nextItem.track);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex flex-col antialiased">
      {/* Top Floating Glass Navigation */}
      <Navbar
        completedCount={completedSubLessonIds.size}
        totalSublessons={allSubLessonsWithParents.length}
        activeSpeaker={activeSpeaker}
        onToggleSpeaker={handleToggleSpeaker}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onResetProgress={handleResetProgress}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onSelectLang={handleSelectLang}
      />

      {/* Spotlight Search Modal (Cmd+K / Ctrl+K) */}
      <SpotlightSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allSubLessons={allSubLessonsWithParents}
        onSelectLesson={handleSelectSubLesson}
      />

      {/* Printable Master Certificate Modal */}
      {isCertificateOpen && (
        <DefenseCertificateModal onClose={() => setIsCertificateOpen(false)} />
      )}

      {/* Main Workspace Layout */}
      {currentTab === 'sandbox' ? (
        <div className="flex-1 w-full px-4 sm:px-8 py-4">
          <ArchitectureSandbox />
        </div>
      ) : (
        <div className="flex-1 flex px-4 sm:px-8 py-4 max-w-7xl mx-auto w-full gap-8">
          {/* Apple-style Frosted Glass Sidebar */}
          <Sidebar
            activeSubLessonId={activeSubLesson.id}
            onSelectSubLesson={handleSelectSubLesson}
            completedSubLessonIds={completedSubLessonIds}
            isOpen={isSidebarOpen}
            onCloseMobile={() => setIsSidebarOpen(false)}
            lang={lang}
          />

          {/* Main Content Area (Roomy & Clean) */}
          <main className="flex-1 lg:pl-84 transition-all duration-300 space-y-6">
            {/* Dynamic Journey Tracker (History, Current, Remaining, Next) */}
            <div className="max-w-3xl mx-auto">
              <JourneyTracker
                completedSubLessonIds={completedSubLessonIds}
                allSubLessons={allSubLessonsWithParents}
                currentSubLessonId={activeSubLesson.id}
                onSelectSubLessonById={handleSelectSubLessonById}
                lang={lang}
              />
            </div>

            <LessonView
              track={activeTrack}
              lesson={activeLesson}
              subLesson={{
                ...activeSubLesson,
                audioNarration: {
                  ...activeSubLesson.audioNarration,
                  speaker: activeSpeaker,
                },
              }}
              isCompleted={completedSubLessonIds.has(activeSubLesson.id)}
              completedSubLessonIds={completedSubLessonIds}
              onToggleComplete={handleToggleComplete}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              onOpenCertificate={() => setIsCertificateOpen(true)}
              lang={lang}
            />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
