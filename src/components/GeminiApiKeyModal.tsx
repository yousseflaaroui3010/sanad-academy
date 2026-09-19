import React, { useState, useEffect } from 'react';
import { Check, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { getGeminiApiKey, setGeminiApiKey } from '../services/geminiService';
import { playHapticClick, playSuccessChime } from '../utils/soundEffects';

interface GeminiApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GeminiApiKeyModal: React.FC<GeminiApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getGeminiApiKey());
      setIsSaved(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    setGeminiApiKey(apiKey.trim());
    setIsSaved(true);
    playSuccessChime();
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey('');
    setGeminiApiKey('');
    playHapticClick();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md liquid-glass rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1d1d1f]">Gemini Vision & Chatbot API</h3>
              <p className="text-[11px] text-[#86868b]">Multimodal Slide Analysis & Live AI Tutor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Input Field */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#1d1d1f] flex items-center justify-between">
            <span>Google Gemini API Key</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>Get Free Key</span>
              <ExternalLink size={10} />
            </a>
          </label>
          <div className="relative">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-2.5 text-xs text-[#1d1d1f] font-mono outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <p className="text-[11px] text-[#86868b] leading-relaxed">
            Your key is saved locally in your browser (<code className="font-mono text-[10px]">localStorage</code>) and used directly for client-side multimodal Vision requests.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-black/5">
          <button
            onClick={handleClear}
            className="text-xs text-[#86868b] hover:text-rose-600 font-medium"
          >
            Clear Key
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-full px-4 py-2 text-xs font-semibold text-[#6e6e73] hover:text-[#1d1d1f]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 text-xs font-semibold shadow-sm transition"
            >
              {isSaved ? <Check size={14} className="text-white" /> : <ShieldCheck size={14} />}
              <span>{isSaved ? 'Saved!' : 'Save Key'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
