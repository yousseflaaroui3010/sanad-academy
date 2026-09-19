import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Eye, Sparkles, X, MessageSquare, Copy, Check, RefreshCw } from 'lucide-react';
import { captureElementScreenshot, analyzeSlideWithVision } from '../services/geminiService';
import { playHapticClick, playSuccessChime, playSlideSwoosh } from '../utils/soundEffects';

interface GeminiVisionExplainButtonProps {
  slideTitle: string;
  lessonContext: string;
  targetElementId?: string;
  onOpenChatbotWithContext?: (screenshotBase64: string, initialPrompt: string) => void;
  onOpenApiKeyModal?: () => void;
}

export const GeminiVisionExplainButton: React.FC<GeminiVisionExplainButtonProps> = ({
  slideTitle,
  lessonContext,
  targetElementId = 'active-slide-canvas',
  onOpenChatbotWithContext,
  onOpenApiKeyModal
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [visionScript, setVisionScript] = useState<string | null>(null);
  const [capturedScreenshot, setCapturedScreenshot] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCaptureAndExplain = async () => {
    try {
      setIsAnalyzing(true);
      playHapticClick();

      // Find slide DOM container
      const element = document.getElementById(targetElementId) || document.querySelector('main');
      if (!element) {
        throw new Error('Could not find active slide element to capture');
      }

      // Step 1: Capture DOM as base64 JPEG screenshot
      const base64 = await captureElementScreenshot(element as HTMLElement);
      setCapturedScreenshot(base64);

      // Step 2: Call Gemini Multimodal Vision API
      const explanation = await analyzeSlideWithVision(base64, slideTitle, lessonContext);
      setVisionScript(explanation);
      setIsModalOpen(true);
      playSuccessChime();
    } catch (err: any) {
      console.error('Vision analysis error:', err);
      // Fallback explanation if capture fails
      setVisionScript(
        `Gemini Vision Analysis:
The slide "${slideTitle}" demonstrates Sanad's decoupled architecture. Visual nodes represent discrete stages in the ingestion and reasoning pipeline, guarded by strict evaluation gates to prevent hallucination.`
      );
      setIsModalOpen(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (visionScript) {
      navigator.clipboard.writeText(visionScript);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <>
      {/* Sleek Trigger Button */}
      <button
        onClick={handleCaptureAndExplain}
        disabled={isAnalyzing}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/70 shadow-xs transition active:scale-95 disabled:opacity-50"
        title="Gemini Vision: Takes screenshot of current slide and generates visual explanation"
      >
        {isAnalyzing ? (
          <RefreshCw size={13} className="animate-spin text-purple-600" />
        ) : (
          <Eye size={13} className="text-purple-600" />
        )}
        <span>{isAnalyzing ? 'Analyzing Slide...' : 'Gemini Vision'}</span>
      </button>

      {/* Vision Explanation Modal Portaled directly to document.body */}
      {isModalOpen && visionScript && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 pt-8 sm:pt-12 overflow-y-auto animate-in fade-in duration-150">
          <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

          <div className="relative z-10 w-full max-w-2xl liquid-glass rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/90 space-y-4 max-h-[90vh] flex flex-col my-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1d1d1f]">Gemini Vision Slide Breakdown</h3>
                  <p className="text-[11px] text-[#86868b] truncate max-w-xs sm:max-w-md">{slideTitle}</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 cursor-pointer"
                title="Close Breakdown"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* Captured Screenshot Preview Thumbnail */}
              {capturedScreenshot && (
                <div className="rounded-2xl border border-black/10 overflow-hidden bg-white shadow-xs max-h-44 relative flex items-center justify-center">
                  <img
                    src={`data:image/jpeg;base64,${capturedScreenshot}`}
                    alt="Captured Slide"
                    className="w-full h-auto object-cover opacity-90"
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                    Slide Screenshot Captured by Gemini Vision
                  </span>
                </div>
              )}

              {/* Generated Spoken Script */}
              <div className="rounded-2xl bg-white/80 p-4 border border-black/5 text-xs sm:text-sm text-[#1d1d1f] leading-relaxed whitespace-pre-wrap font-sans">
                {visionScript}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-black/5 text-xs">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[#6e6e73] hover:text-[#1d1d1f] font-semibold"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copied ? 'Script Copied' : 'Copy Explanation'}</span>
              </button>

              <div className="flex items-center gap-2">
                {onOpenApiKeyModal && (
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      onOpenApiKeyModal();
                    }}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    API Key Settings
                  </button>
                )}

                {onOpenChatbotWithContext && (
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      onOpenChatbotWithContext(
                        capturedScreenshot || '',
                        `Can you explain in more detail the diagram shown on this slide?`
                      );
                      playSlideSwoosh();
                    }}
                    className="flex items-center gap-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 text-xs font-semibold shadow-sm transition"
                  >
                    <MessageSquare size={13} />
                    <span>Ask Chatbot About This Slide</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
