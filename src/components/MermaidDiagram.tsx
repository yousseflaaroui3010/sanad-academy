import { useEffect, useState } from 'react';

// Renders a Mermaid diagram for the Defense Path. Mermaid is loaded on first use so the
// French course never downloads it.
let ready: Promise<typeof import('mermaid')['default']> | null = null;

function loadMermaid() {
  ready ??= import('mermaid').then(({ default: mermaid }) => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'strict',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
    });
    return mermaid;
  });
  return ready;
}

let counter = 0;

export function MermaidDiagram({ chart, title }: {
  chart: string;
  title?: string;
  diagramType?: string;
}) {
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    const id = `mermaid-${++counter}`;
    loadMermaid()
      .then((mermaid) => mermaid.render(id, chart.trim()))
      .then((result) => {
        if (alive) setSvg(result.svg);
      })
      .catch((error) => {
        console.warn('Mermaid render failed', error);
        document.getElementById(id)?.remove();
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [chart]);

  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4">
      {title && <figcaption className="mb-3 text-sm font-semibold text-slate-700">{title}</figcaption>}
      {failed ? (
        <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-slate-600">{chart}</pre>
      ) : svg ? (
        <div className="flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <p className="text-sm text-slate-500">Loading diagram…</p>
      )}
    </figure>
  );
}
