import React, { useState } from 'react';
import { Award, CheckCircle2, Printer, X, Shield } from 'lucide-react';

interface DefenseCertificateModalProps {
  onClose: () => void;
}

export const DefenseCertificateModal: React.FC<DefenseCertificateModalProps> = ({
  onClose
}) => {
  const [studentName, setStudentName] = useState('Distinguished AI Systems Architect');
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="liquid-glass rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-white/80 space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f] transition"
        >
          <X size={18} />
        </button>

        {/* Certificate Container with Print-Friendly Design */}
        <div id="printable-certificate" className="rounded-3xl border-2 border-blue-500/20 bg-gradient-to-b from-white via-[#fafafc] to-white p-6 sm:p-10 text-center space-y-6 shadow-inner relative overflow-hidden">
          {/* Subtle watermark seal */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Shield size={320} />
          </div>

          {/* Top Emblem */}
          <div className="flex flex-col items-center space-y-2">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Award size={32} />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-600 pt-1">
              Sanad Academic Board of Examination
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1d1d1f]">
              Certificate of Architectural Mastery
            </h2>
            <p className="text-xs text-[#86868b] max-w-md mx-auto">
              Awarded for successful defense and demonstration of zero-hallucination document retrieval architecture, LangGraph reasoning cycles, and enterprise compliance.
            </p>
          </div>

          {/* Recipient Input */}
          <div className="py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-1">
              This is certified to
            </span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="text-center font-bold text-lg sm:text-2xl text-[#1d1d1f] bg-transparent border-b border-blue-500/30 focus:border-blue-600 outline-none pb-1 w-full max-w-md mx-auto"
              title="Click to edit your name on the certificate"
            />
          </div>

          {/* Competency Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left pt-1">
            {[
              'Rule 5 Review Protocol',
              'Parent-Child Storage',
              '9-Node LangGraph Engine',
              'Moroccan Law 09-08'
            ].map((badge, i) => (
              <div
                key={i}
                className="rounded-xl bg-black/5 p-2 text-[10px] font-semibold text-[#424245] flex items-center gap-1.5"
              >
                <CheckCircle2 size={12} className="text-emerald-600 flex-shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-6 text-xs text-[#6e6e73]">
            <div>
              <div className="font-serif italic text-base text-[#1d1d1f] font-semibold mb-1">
                YL
              </div>
              <span className="font-bold text-[#1d1d1f] block text-[11px]">YL</span>
              <span className="text-[10px]">Systems Architect & Core Build Lead</span>
            </div>

            <div>
              <div className="font-serif italic text-base text-[#1d1d1f] font-semibold mb-1">
                MB
              </div>
              <span className="font-bold text-[#1d1d1f] block text-[11px]">MB</span>
              <span className="text-[10px]">Research Lead & Quality Guardian</span>
            </div>
          </div>

          <div className="text-[10px] text-[#86868b] pt-1">
            Issued on {currentDate} • Verified via Automated RAGAS Release Gates
          </div>
        </div>

        {/* Modal Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#86868b] hidden sm:inline">
            Click your name to customize before printing
          </span>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="rounded-full px-4 py-2 text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f] transition"
            >
              Close
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 text-xs font-semibold shadow-sm transition"
            >
              <Printer size={13} />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
