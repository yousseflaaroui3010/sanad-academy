import React, { useState } from 'react';
import { Type, AlertCircle } from 'lucide-react';
import { playHapticClick } from '../../utils/soundEffects';

const SAMPLES = {
  en: "Under Article 184, the legal work week in Morocco is 44 hours.",
  fr: "Dans les activités non agricoles, la durée est fixée à 44 heures.",
  ar: "المادة 184 من مدونة الشغل تحدد مدة العمل في 44 ساعة أسبوعيا."
};

export const BpeTokenizerToy: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'fr' | 'ar'>('en');
  const [text, setText] = useState(SAMPLES.en);

  // Simulated Byte-Pair Encoding (BPE) token splitting
  const tokens = React.useMemo(() => {
    if (!text.trim()) return [];
    if (lang === 'ar') {
      // Arabic splits into smaller subwords due to prefix/suffix morphology in BPE
      return text.match(/[\u0600-\u06FF]{1,3}|\d+|[^\u0600-\u06FF\s]|\s+/g) || [text];
    }
    // English/French word & subword chunks
    return text.match(/\w+|[^\w\s]|\s+/g) || [text];
  }, [text, lang]);

  const charCount = text.length;
  const tokenCount = tokens.filter((t) => t.trim().length > 0).length;
  const ratio = (charCount / (tokenCount || 1)).toFixed(2);

  const colors = [
    'bg-blue-100 text-blue-900 border-blue-300',
    'bg-purple-100 text-purple-900 border-purple-300',
    'bg-emerald-100 text-emerald-900 border-emerald-300',
    'bg-amber-100 text-amber-900 border-amber-300',
    'bg-rose-100 text-rose-900 border-rose-300',
    'bg-cyan-100 text-cyan-900 border-cyan-300',
  ];

  const handleSelectSample = (l: 'en' | 'fr' | 'ar') => {
    setLang(l);
    setText(SAMPLES[l]);
    playHapticClick();
  };

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-[#07130e] text-emerald-300 p-6 sm:p-8 shadow-2xl overflow-hidden font-mono space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <Type size={16} className="text-emerald-400" />
            <span>Byte-Pair Encoding (BPE) Tokenization Science</span>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Why 500 characters does NOT mean 500 words or 500 tokens in multilingual AI
          </p>
        </div>

        {/* Language Sample Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handleSelectSample('en')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              lang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleSelectSample('fr')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              lang === 'fr' ? 'bg-purple-600 text-white shadow-xs' : 'text-gray-400 hover:text-white'
            }`}
          >
            French
          </button>
          <button
            onClick={() => handleSelectSample('ar')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              lang === 'ar' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-400 hover:text-white'
            }`}
          >
            Arabic (العربية)
          </button>
        </div>
      </div>

      {/* Metaphor Banner */}
      <div className="rounded-2xl bg-emerald-950/30 border border-emerald-800/40 p-3.5 text-xs text-emerald-200 leading-relaxed font-sans flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🧩</span>
        <div>
          <span className="font-bold text-white block mb-0.5">The Lego Brick Word Slicer:</span>
          AI neural networks cannot read alphabet letters or whole words directly. They break sentences into tiny numerical Lego bricks called subword tokens. In Arabic and French, special characters and verb roots get chopped into twice as many tokens as English!
        </div>
      </div>

      {/* Interactive Text Input */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-gray-300 font-sans">
          <span>Type or Edit Sentence:</span>
          <span className="text-emerald-400 font-mono">
            {charCount} characters • {tokenCount} tokens • {ratio} chars/token
          </span>
        </div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-emerald-400 font-sans"
        />
      </div>

      {/* Visual Token Chips Display */}
      <div className="rounded-2xl border border-white/10 bg-[#0e1f18] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
          <span className="text-gray-300 font-bold">Tokenized Output Array (BPE Subwords):</span>
          <span className="text-[10px] text-emerald-400 font-mono">Model: SentencePiece / E5 Vocab</span>
        </div>

        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
          {tokens.map((token, idx) => {
            const isWhitespace = token.trim().length === 0;
            if (isWhitespace) return <span key={idx} className="w-1.5" />;

            const colorClass = colors[idx % colors.length];

            return (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shadow-xs ${colorClass}`}
                title={`Token #${idx + 1}`}
              >
                {token}
              </span>
            );
          })}
        </div>
      </div>

      {/* Multilingual Context Window Warning */}
      <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-900/40 text-xs text-gray-300 font-sans flex items-start gap-2.5">
        <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-amber-300">Sanad Chunking Invariant:</strong> In Arabic legal corpora, Byte-Pair Encoding splits accented letters and morphemes aggressively. That's why Sanad uses 500-character children: it guarantees that even in Arabic, chunks stay strictly within Qdrant's optimal 250-token semantic embedding window!
        </p>
      </div>
    </div>
  );
};
