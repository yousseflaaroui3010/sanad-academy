import React, { useState } from 'react';
import { PROJECT_FILE_INVENTORY } from '../../data/rebuildStagesData';
import type { FileInventoryItem } from '../../data/rebuildStagesData';
import { FileCode, Search, Terminal, CheckCircle2 } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

interface Props {
  lang?: 'en' | 'fr';
}

export const ProjectTreeInteractive: React.FC<Props> = ({ lang: _lang = 'en' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileInventoryItem>(PROJECT_FILE_INVENTORY[0]);

  const categories = ['All', 'Root Module', 'Agent Package', 'UI Package', 'Evaluation', 'Tests'];

  const filteredFiles = PROJECT_FILE_INVENTORY.filter((f) => {
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      f.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.keyFunctionsOrClasses.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full space-y-4 text-left">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b]" />
          <input
            type="text"
            placeholder="Search 28 modules & tests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-black/5 rounded-xl border border-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                playHapticClick();
              }}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-black/5 text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: File Explorer Tree */}
        <div className="lg:col-span-5 space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
          {filteredFiles.map((file) => {
            const isSelected = selectedFile.path === file.path;
            return (
              <div
                key={file.path}
                onClick={() => {
                  setSelectedFile(file);
                  playHapticClick();
                }}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-white border-blue-500/40 shadow-sm ring-1 ring-blue-500/20'
                    : 'liquid-glass border-black/5 hover:border-black/15'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileCode size={14} className={isSelected ? 'text-blue-600' : 'text-[#86868b]'} />
                  <span className="font-mono text-xs font-bold text-[#1d1d1f] truncate">
                    {file.path}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#86868b] bg-black/5 px-2 py-0.5 rounded flex-shrink-0">
                  {file.linesOfCode}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column: File Detail & Responsibilities Inspector */}
        <div className="lg:col-span-7">
          <div className="liquid-glass rounded-3xl p-5 sm:p-6 border-blue-500/30 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="border-b border-black/5 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 block mb-1">
                    {selectedFile.category}
                  </span>
                  <h3 className="font-mono text-base font-extrabold text-[#1d1d1f]">
                    {selectedFile.path}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#86868b] bg-black/5 px-2.5 py-1 rounded-xl">
                  {selectedFile.linesOfCode}
                </span>
              </div>

              {/* Purpose & Responsibility */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                  Architectural Responsibility
                </span>
                <p className="text-xs sm:text-sm text-[#424245] leading-relaxed">
                  {selectedFile.purpose}
                </p>
              </div>

              {/* Key Functions / Classes */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6e6e73] block">
                  Exported Classes & Functions
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {selectedFile.keyFunctionsOrClasses.map((item, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-[#14110f] text-emerald-300 font-mono text-[11px] truncate flex items-center gap-1.5">
                      <Terminal size={11} className="text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Test Connection Note */}
            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-950 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-blue-600 flex-shrink-0" />
              <span>Guarded by automated tests in <code>tests/unit/</code> and <code>tests/integration/</code>.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
