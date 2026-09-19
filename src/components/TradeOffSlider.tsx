import React, { useState } from 'react';
import { Scale, Sparkles, AlertCircle } from 'lucide-react';
import type { TradeOffDilemma } from '../data/courseData';

interface TradeOffSliderProps {
  tradeOff: TradeOffDilemma;
  lang?: 'en' | 'fr';
}

export const TradeOffSlider: React.FC<TradeOffSliderProps> = ({ tradeOff, lang = 'en' }) => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  // Derive dynamic state
  const isLeft = sliderValue < 35;
  const isRight = sliderValue > 65;
  const isBalanced = !isLeft && !isRight;
  const isFr = lang === 'fr';

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Scale size={14} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-[#1d1d1f]">
              {isFr ? "Le Dilemme de l'Architecte :" : "The Architect's Dilemma:"} {tradeOff.title}
            </h3>
            <p className="text-[11px] text-[#86868b]">
              {isFr
                ? "Déplacez le curseur pour explorer le compromis d'ingénierie"
                : "Drag the slider to experience the real-world engineering compromise"}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
          {isFr ? 'Laboratoire de Compromis' : 'Trade-Off Lab'}
        </span>
      </div>

      {/* Slider Controls */}
      <div className="space-y-2 py-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className={`transition ${isLeft ? 'text-blue-600 font-bold' : 'text-[#86868b]'}`}>
            ← {tradeOff.metricA}
          </span>
          <span className={`text-[11px] px-2 py-0.5 rounded-full ${
            isBalanced ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-[#86868b]'
          }`}>
            {isBalanced
              ? (isFr ? 'Équilibre Optimal Sanad' : 'Balanced Golden Ratio')
              : isLeft
              ? (isFr ? `Privilégie ${tradeOff.metricA}` : `Favoring ${tradeOff.metricA}`)
              : (isFr ? `Privilégie ${tradeOff.metricB}` : `Favoring ${tradeOff.metricB}`)}
          </span>
          <span className={`transition ${isRight ? 'text-purple-600 font-bold' : 'text-[#86868b]'}`}>
            {tradeOff.metricB} →
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="w-full h-2 bg-black/5 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Dynamic Simulation Feedback */}
      <div className="rounded-2xl bg-white/60 p-4 border border-black/5 space-y-2">
        <div className="flex items-start gap-2 text-xs">
          <AlertCircle size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-[#424245] leading-relaxed">
            {isLeft && (
              <span>
                <strong>Maximum {tradeOff.metricA} :</strong>{' '}
                {isFr
                  ? 'Cycles de développement ultra-rapides sans friction, mais introduit des bugs cachés et des régressions silencieuses.'
                  : 'Blazing fast development cycles and zero friction, but introduces hidden bugs, silent regressions, and unverified edge cases.'}
              </span>
            )}
            {isRight && (
              <span>
                <strong>Maximum {tradeOff.metricB} :</strong>{' '}
                {isFr
                  ? 'Vérification absolue et sécurité blindée, mais ralentit la vélocité et consomme un temps de revue excessif.'
                  : 'Absolute verification and ironclad safety, but slows down sprint velocity and consumes heavy developer review time.'}
              </span>
            )}
            {isBalanced && (
              <span>
                <strong>{isFr ? 'Le Compromis Optimal Sanad :' : 'The Sanad Compromise:'}</strong> {tradeOff.description}
              </span>
            )}
          </p>
        </div>

        <div className="border-t border-black/5 pt-2 flex items-center gap-2 text-[11px] text-[#86868b]">
          <Sparkles size={12} className="text-amber-500" />
          <span>{isFr ? "Règle d'Architecture :" : 'Architectural Rule:'} {tradeOff.insight}</span>
        </div>
      </div>
    </div>
  );
};
