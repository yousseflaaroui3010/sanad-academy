import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Camera,
  Trash2,
  Key
} from 'lucide-react';
import { askSlideChatbot, captureElementScreenshot } from '../services/geminiService';
import type { ChatMessage } from '../services/geminiService';
import type { Lesson, SubLesson } from '../data/courseData';
import { playHapticClick } from '../utils/soundEffects';

interface SanadSlideChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson;
  subLesson: SubLesson;
  onOpenApiKeyModal?: () => void;
}

export const SanadSlideChatbot: React.FC<SanadSlideChatbotProps> = ({
  isOpen,
  onClose,
  lesson,
  subLesson,
  onOpenApiKeyModal
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your Sanad AI Tutor. I'm grounded in the 20 technical specifications and can inspect the active slide diagram to explain every architecture decision, formula, or code pattern.\n\nHow can I help you master Spec ${lesson.specNumber} (${subLesson.title})?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleCaptureCurrentSlide = async () => {
    try {
      playHapticClick();
      const element = document.getElementById('active-slide-canvas') || document.querySelector('main');
      if (element) {
        const base64 = await captureElementScreenshot(element as HTMLElement);
        setAttachedImage(base64);
      }
    } catch (e) {
      console.warn('Screenshot capture for chatbot failed:', e);
    }
  };

  const handleSend = async (questionToSend?: string) => {
    const q = (questionToSend || inputQuestion).trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);
    playHapticClick();

    try {
      const markdownContext = `
Specification: Spec ${lesson.specNumber} - ${lesson.title}
Sub-Lesson: ${subLesson.title}
Metaphor: ${subLesson.metaphor.title} - ${subLesson.metaphor.description}
Project Circumstance: ${subLesson.situation.context}
High-Stakes Pressure: ${subLesson.situation.pressure}
Engineering Solution: ${subLesson.solution.title} - ${subLesson.solution.explanation}
Key Invariants: ${subLesson.solution.keyPoints.join('; ')}
Alternative Road: ${subLesson.alternative.title} - ${subLesson.alternative.explanation} (Downside: ${subLesson.alternative.downside})
Rule to Remember: ${subLesson.keyTakeaway}
`;

      const responseText = await askSlideChatbot(
        q,
        attachedImage,
        {
          title: subLesson.title,
          specNumber: lesson.specNumber,
          markdownNotes: markdownContext
        },
        messages
      );

      const assistantMsg: ChatMessage = {
        id: `asst_${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: 'Now',
        citedArticle: `Spec ${lesson.specNumber}`
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: `Error communicating with Gemini: ${err.message || 'Please check your API key in settings.'}`,
        timestamp: 'Now'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setAttachedImage(null); // Clear one-time image attachment
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset',
        role: 'assistant',
        content: `Chat history cleared. Grounded in Spec ${lesson.specNumber} (${subLesson.title}). Ask me anything!`,
        timestamp: 'Just now'
      }
    ]);
    playHapticClick();
  };

  const quickPrompts = [
    `Explain the diagram on this slide in plain English`,
    `What happens if this component fails or crashes?`,
    `Why didn't Sanad use the naive alternative approach?`,
    `How does this comply with Moroccan Law 09-08?`
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
        <div className="fixed inset-0" onClick={onClose} />

        {/* Sliding Right Assistant Drawer */}
        <motion.div
          initial={{ x: 380, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 380, opacity: 0 }}
          className="relative z-10 w-full max-w-md h-full bg-[#f8fafc]/95 backdrop-blur-xl border-l border-[#e2e8f0] shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* Drawer Top Header */}
          <div className="p-4 bg-white/80 border-b border-[#e2e8f0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center shadow-xs">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-[#1d1d1f]">Sanad AI Tutor</h3>
                  <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                    Gemini Vision
                  </span>
                </div>
                <p className="text-[10px] text-[#86868b] truncate max-w-[200px]">
                  Spec {lesson.specNumber}: {subLesson.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {onOpenApiKeyModal && (
                <button
                  onClick={() => {
                    onOpenApiKeyModal();
                    playHapticClick();
                  }}
                  className="p-1.5 rounded-lg text-[#86868b] hover:text-blue-600 hover:bg-black/5"
                  title="Configure Gemini API Key"
                >
                  <Key size={14} />
                </button>
              )}
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5"
                title="Clear Chat History"
              >
                <Trash2 size={14} />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Conversation Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans">
            {messages.map((m) => {
              const isAssistant = m.role === 'assistant';

              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={12} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isAssistant
                        ? 'bg-white border border-[#e2e8f0] text-[#1f2328] shadow-xs'
                        : 'bg-blue-600 text-white shadow-xs font-medium'
                    }`}
                  >
                    {m.content}
                    {m.citedArticle && (
                      <div className="mt-2 pt-1.5 border-t border-black/5 text-[10px] font-bold text-blue-600">
                        Proven Source: {m.citedArticle}
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={12} />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-[#86868b] text-xs p-2">
                <Sparkles size={14} className="animate-spin text-purple-600" />
                <span>Sanad AI Tutor is inspecting specs & reasoning...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Quick Prompt Pills */}
          <div className="p-3 bg-white/60 border-t border-[#e2e8f0] space-y-1.5">
            <span className="text-[10px] font-semibold text-[#86868b] block">Suggested questions:</span>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  disabled={isLoading}
                  className="rounded-full bg-white hover:bg-black/5 border border-[#e2e8f0] px-2.5 py-1 text-[10px] text-[#424245] whitespace-nowrap transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Input Area */}
          <div className="p-3 bg-white border-t border-[#e2e8f0] space-y-2">
            {/* Attached Slide Image Indicator */}
            {attachedImage && (
              <div className="flex items-center justify-between text-[10px] bg-purple-50 text-purple-700 p-1.5 rounded-lg border border-purple-200">
                <span className="flex items-center gap-1 font-semibold">
                  <Camera size={11} />
                  Slide Screenshot Attached to Next Prompt
                </span>
                <button onClick={() => setAttachedImage(null)} className="hover:text-rose-600">
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={handleCaptureCurrentSlide}
                className={`p-2 rounded-xl border transition ${
                  attachedImage
                    ? 'bg-purple-100 border-purple-300 text-purple-700'
                    : 'bg-black/5 border-transparent text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
                title="Attach current slide screenshot for Gemini Vision"
              >
                <Camera size={15} />
              </button>

              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Ask about this slide or architecture..."
                className="flex-1 rounded-xl border border-[#d0d7de] bg-white px-3 py-2 text-xs text-[#1f2328] outline-none focus:border-blue-500 font-sans"
              />

              <button
                onClick={() => handleSend()}
                disabled={!inputQuestion.trim() || isLoading}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-30 transition shadow-xs"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
