import React from 'react';
import { Volume2, Menu, X, Sparkles, RotateCcw, Award, Search, BookOpen, FlaskConical } from 'lucide-react';
import { playHapticClick } from '../utils/soundEffects';
import { UI_TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  completedCount: number;
  totalSublessons: number;
  activeSpeaker: 'YL (Systems Architect)' | 'MB (Quality Guardian)';
  onToggleSpeaker: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onResetProgress: () => void;
  onOpenCertificate: () => void;
  onOpenSearch: () => void;
  currentTab: 'curriculum' | 'sandbox';
  onSelectTab: (tab: 'curriculum' | 'sandbox') => void;
  lang: 'en' | 'fr';
  onSelectLang: (lang: 'en' | 'fr') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  completedCount,
  totalSublessons,
  activeSpeaker,
  onToggleSpeaker,
  isSidebarOpen,
  onToggleSidebar,
  onResetProgress,
  onOpenCertificate,
  onOpenSearch,
  currentTab,
  onSelectTab,
  lang,
  onSelectLang,
}) => {
  const progressPercent = Math.round((completedCount / totalSublessons) * 100) || 0;
  const [isOnline, setIsOnline] = React.useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const t = UI_TRANSLATIONS[lang] || UI_TRANSLATIONS.en;

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3 transition-all duration-300">
      <div className="mx-auto max-w-7xl liquid-glass rounded-2xl sm:rounded-full px-4 sm:px-5 py-2.5 flex items-center justify-between shadow-sm">
        {/* Left: Brand & Mobile Menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onToggleSidebar();
              playHapticClick();
            }}
            className="p-1.5 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 transition lg:hidden"
            aria-label="Toggle curriculum"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div
            onClick={() => onSelectTab('curriculum')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-sm shadow-blue-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
                Sanad <span className="text-[#86868b] font-normal">Academy</span>
              </span>
            </div>
          </div>

          {/* Mode Switcher: Curriculum vs Sandbox */}
          <div className="hidden sm:flex items-center rounded-full bg-black/5 p-1 ml-3 border border-black/5">
            <button
              onClick={() => {
                onSelectTab('curriculum');
                playHapticClick();
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                currentTab === 'curriculum'
                  ? 'bg-white text-[#1d1d1f] shadow-xs'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <BookOpen size={12} />
              <span>{t.curriculum}</span>
            </button>
            <button
              onClick={() => {
                onSelectTab('sandbox');
                playHapticClick();
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                currentTab === 'sandbox'
                  ? 'bg-white text-[#1d1d1f] shadow-xs'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              <FlaskConical size={12} className="text-purple-600" />
              <span>{t.sandboxLab}</span>
            </button>
          </div>
        </div>

        {/* Center: Search & Progress */}
        <div className="flex items-center gap-3">
          {/* Spotlight Search Trigger (Cmd+K) */}
          <button
            onClick={() => {
              onOpenSearch();
              playHapticClick();
            }}
            className="flex items-center gap-2 rounded-full bg-black/5 hover:bg-black/10 px-3 py-1.5 text-xs text-[#6e6e73] hover:text-[#1d1d1f] border border-black/5 transition shadow-xs"
            title={t.searchSpecs}
          >
            <Search size={12} />
            <span className="hidden md:inline">{t.searchSpecs}</span>
            <span className="hidden sm:inline text-[10px] font-bold bg-black/5 px-1.5 py-0.5 rounded text-[#86868b]">
              ⌘K
            </span>
          </button>

          {/* Minimalist Progress Pill & Offline Badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-[#6e6e73]">
            {!isOnline && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 border border-amber-300 px-2 py-0.5 rounded-full">
                {t.offlineMode}
              </span>
            )}
            <span>{t.defenseReadiness}</span>
            <div className="h-1.5 w-20 rounded-full bg-black/5 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-[#1d1d1f] tabular-nums">{progressPercent}%</span>
          </div>
        </div>

        {/* Right: Actions (Language Switcher, Reset, Certificate & Voice) */}
        <div className="flex items-center gap-2">
          {/* Language Switcher: EN / FR */}
          <div className="flex items-center rounded-full bg-black/5 p-0.5 border border-black/5 text-xs font-semibold">
            <button
              onClick={() => {
                onSelectLang('en');
                playHapticClick();
              }}
              className={`px-2.5 py-1 rounded-full transition text-[11px] ${
                lang === 'en' ? 'bg-white text-[#1d1d1f] shadow-xs font-bold' : 'text-[#6e6e73]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                onSelectLang('fr');
                playHapticClick();
              }}
              className={`px-2.5 py-1 rounded-full transition text-[11px] ${
                lang === 'fr' ? 'bg-blue-600 text-white shadow-xs font-bold' : 'text-[#6e6e73]'
              }`}
            >
              FR
            </button>
          </div>

          {/* Certificate of Mastery Button */}
          <button
            onClick={() => {
              onOpenCertificate();
              playHapticClick();
            }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/60 transition"
            title={t.certificate}
          >
            <Award size={13} className="text-blue-600" />
            <span className="hidden sm:inline">{t.certificate}</span>
          </button>

          {/* Start Fresh Button */}
          <button
            onClick={() => {
              onResetProgress();
              playHapticClick();
            }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#86868b] hover:text-rose-600 hover:bg-rose-50 border border-black/5 transition"
            title={t.startFresh}
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">{t.startFresh}</span>
            <span className="sm:hidden">0%</span>
          </button>

          {/* Minimal Voice Selector with V shortcut */}
          <button
            onClick={() => {
              onToggleSpeaker();
              playHapticClick();
            }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[#424245] hover:text-[#1d1d1f] bg-black/5 hover:bg-black/10 transition"
            title={`${t.studioVoiceover} (Press V to Play/Pause)`}
          >
            <Volume2 className="h-3.5 w-3.5 text-blue-600" />
            <span>{activeSpeaker.startsWith('YL') ? 'YL' : 'MB'}</span>
            <span className="text-[9px] font-mono font-bold bg-black/5 px-1 py-0.2 rounded text-[#86868b]">V</span>
          </button>
        </div>
      </div>
    </header>
  );
};
