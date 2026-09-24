import { evidence } from '../data/evidence';

export function EvidenceBridge({ slide }: { slide: number }) {
  const item = evidence[slide];
  if (!item) return null;

  return (
    <section aria-label="Correspondance présentation, rapport et code" className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-bold">Les trois pièces à garder côte à côte</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
          <h3 className="text-sm font-bold text-blue-950">1 · La présentation</h3>
          <p className="mt-1 text-sm">{item.slide}</p>
          {item.diagram && <p className="mt-1 text-xs text-blue-900">Schéma correspondant : {item.diagram}</p>}
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <h3 className="text-sm font-bold">2 · Le rapport</h3>
          <p className="mt-1 text-sm">{item.report}</p>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <h3 className="text-sm font-bold text-emerald-950">3 · Le code de origin/main</h3>
        <ul className="mt-2 space-y-2">
          {item.code.map(({ where, meaning }) => (
            <li key={where} className="text-sm leading-relaxed"><code className="font-semibold text-emerald-950">{where}</code><span className="block text-slate-800">{meaning}</span></li>
          ))}
        </ul>
      </div>
      {item.nuance && <p className="mt-3 border-s-4 border-amber-500 ps-3 text-sm font-medium text-amber-950">Attention : {item.nuance}</p>}
    </section>
  );
}
