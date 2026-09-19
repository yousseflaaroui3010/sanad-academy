import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Search,
  Database,
  FileText,
  Bot,
  Terminal
} from 'lucide-react';

interface LivingDiagramProps {
  lessonId: string;
}

export const LivingDiagram: React.FC<LivingDiagramProps> = ({ lessonId }) => {
  // 1. Specialized Visualizer: Parent-Child Chunking (Specs 8 & 10)
  if (lessonId === '8-1' || lessonId === '10-1') {
    return <ParentChildVisualizer />;
  }

  // 2. Specialized Visualizer: LangGraph 9-Node Cycle (Spec 11)
  if (lessonId === '11-1') {
    return <LangGraphNodeVisualizer />;
  }

  // 3. Specialized Visualizer: Two Pilots Rule 5 (Spec 1)
  if (lessonId === '1-1') {
    return <TwoPilotsVisualizer />;
  }

  // 4. Specialized Visualizer: Release Gate Bouncer (Specs 12 & 20)
  if (lessonId === '12-1' || lessonId === '20-1') {
    return <ReleaseGateVisualizer />;
  }

  // Default Universal Simulator: 5-Station RAG Execution Flow
  return <UniversalRAGSimulator />;
};

// -------------------------------------------------------------
// Visualizer A: Two-Pilots Review Protocol (Spec 1)
// -------------------------------------------------------------
function TwoPilotsVisualizer() {
  const [ylApproved, setYlApproved] = useState(true);
  const [mbApproved, setMbApproved] = useState(false);

  const canDeploy = ylApproved && mbApproved;

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
            Rule 5: Two-Pilots Cockpit Verification
          </h3>
          <p className="text-xs text-[#86868b]">
            Toggle architect and quality guardian approvals to see when a build can merge
          </p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
          canDeploy ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'
        }`}>
          {canDeploy ? 'Target Lock: Merge Allowed' : 'Blocked: Gate Locked'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
        {/* Pilot 1: YL */}
        <div className={`rounded-2xl p-4 border transition-all ${
          ylApproved ? 'bg-blue-500/10 border-blue-500/30' : 'bg-black/5 border-black/5'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#1d1d1f]">YL: Systems Architect</span>
            <button
              onClick={() => setYlApproved(!ylApproved)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                ylApproved ? 'bg-blue-600 text-white' : 'bg-black/10 text-[#424245]'
              }`}
            >
              {ylApproved ? 'Signed Off ✓' : 'Click to Sign'}
            </button>
          </div>
          <p className="text-xs text-[#6e6e73]">
            Reviews: SQLite schema migrations, LangGraph state machine safety, Docker builds.
          </p>
        </div>

        {/* Pilot 2: MB */}
        <div className={`rounded-2xl p-4 border transition-all ${
          mbApproved ? 'bg-purple-500/10 border-purple-500/30' : 'bg-black/5 border-black/5'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#1d1d1f]">MB: Quality Guardian</span>
            <button
              onClick={() => setMbApproved(!mbApproved)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                mbApproved ? 'bg-purple-600 text-white' : 'bg-black/10 text-[#424245]'
              }`}
            >
              {mbApproved ? 'Signed Off ✓' : 'Click to Sign'}
            </button>
          </div>
          <p className="text-xs text-[#6e6e73]">
            Reviews: RAGAS Golden Evaluation runs, Moroccan labor law citation checks, academic defense scripts.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-black/5 p-3.5 flex items-center justify-between text-xs">
        <span className="text-[#6e6e73]">
          {canDeploy
            ? 'Both pilots signed. Pull request safely merged into main branch.'
            : 'Rule 5 in effect: Zero cowboy commits permitted without dual verification.'}
        </span>
        <button
          onClick={() => { setYlApproved(true); setMbApproved(!mbApproved); }}
          className="text-blue-600 font-semibold hover:underline"
        >
          Toggle Scenario
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visualizer B: Parent-Child Chunking Explorer (Specs 8 & 10)
// -------------------------------------------------------------
function ParentChildVisualizer() {
  const [selectedChild, setSelectedChild] = useState<number>(0);

  const sampleArticle = {
    title: 'Article 184 — Moroccan Labor Code (Working Hours)',
    parentText:
      'Dans les activités non agricoles, la durée normale de travail des salariés est fixée à 2288 heures par an ou 44 heures par semaine. La durée annuelle globale de travail peut être répartie sur l\'année selon les besoins de l\'entreprise à condition que la durée quotidienne de travail n\'excède pas 10 heures, sous réserve des dérogations prévues par les articles 189, 190 et 192.',
    children: [
      { id: 0, text: 'durée normale de travail fixée à 2288 heures par an ou 44 heures par semaine', vector: '[0.124, -0.841, 0.455...]' },
      { id: 1, text: 'durée annuelle globale répartie selon besoins de l\'entreprise', vector: '[-0.231, 0.612, -0.198...]' },
      { id: 2, text: 'durée quotidienne de travail n\'excède pas 10 heures', vector: '[0.781, -0.012, 0.334...]' },
      { id: 3, text: 'sous réserve des dérogations prévues articles 189, 190, 192', vector: '[0.045, 0.912, -0.512...]' },
    ]
  };

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
            Parent-Child Storage Visualizer
          </h3>
          <p className="text-xs text-[#86868b]">
            Search the small thing (500 chars in Qdrant) ➡️ Read the big thing (4,000 chars on disk)
          </p>
        </div>
        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-full">
          Dual-Tier Storage
        </span>
      </div>

      {/* Parent Vault Container */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-50/30 p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-blue-900 flex items-center gap-1.5">
            <FileText size={14} className="text-blue-600" />
            Parent Passage (Stored on Disk at /data/parents/art_184.txt)
          </span>
          <span className="text-[#86868b] font-medium text-[11px]">~4,000 chars context window</span>
        </div>
        <p className="text-xs text-[#424245] leading-relaxed italic bg-white/70 p-3 rounded-xl border border-black/5">
          "{sampleArticle.parentText}"
        </p>
      </div>

      {/* Child Chunks (Qdrant Indexed) */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-[#1d1d1f] flex items-center gap-1.5">
          <Database size={13} className="text-purple-600" />
          Child Chunks in Qdrant (500 chars + 768-dim E5 Embeddings):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sampleArticle.children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`p-3 rounded-xl border text-left transition ${
                selectedChild === child.id
                  ? 'border-purple-500/50 bg-white shadow-sm ring-2 ring-purple-400/20'
                  : 'border-black/5 bg-white/50 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-[#86868b] font-medium mb-1">
                <span>Child #{child.id + 1}</span>
                <span className="font-mono text-purple-600">{child.vector}</span>
              </div>
              <p className="text-xs text-[#1d1d1f] font-medium">"{child.text}"</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visualizer C: LangGraph 9-Node Cyclic State Machine (Spec 11)
// -------------------------------------------------------------
function LangGraphNodeVisualizer() {
  const [selectedNode, setSelectedNode] = useState(0);

  const nodes = [
    { id: 0, name: 'split_query', role: 'Decomposes compound queries into atomic searches' },
    { id: 1, name: 'clarify_query', role: 'Prompts user if search lacks required parameters' },
    { id: 2, name: 'retrieve_docs', role: 'Hybrid semantic Qdrant + BM25 keyword search' },
    { id: 3, name: 'grade_relevance', role: 'Machine evaluates passage relevance (threshold 0.70)' },
    { id: 4, name: 'reword_query', role: 'Reformulates search terms if zero passages match (<3 loops)' },
    { id: 5, name: 'synthesize_answer', role: 'Drafts response strictly bound to retrieved passages' },
    { id: 6, name: 'format_citations', role: 'Python code builds clickable source cards from disk' },
    { id: 7, name: 'verify_faithfulness', role: 'Guardrail compares draft answer against source text' },
    { id: 8, name: 'refuse_uncovered', role: 'Emits standardized honest refusal (NOT_COVERED)' },
  ];

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
            LangGraph 9-Node Cyclic State Engine
          </h3>
          <p className="text-xs text-[#86868b]">
            Click any assembly worker to inspect its role in the cyclic reasoning pipeline
          </p>
        </div>
        <span className="text-[11px] font-bold text-purple-600 bg-purple-50 border border-purple-200/60 px-2.5 py-1 rounded-full">
          Cyclic StateGraph
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {nodes.map((n) => (
          <button
            key={n.id}
            onClick={() => setSelectedNode(n.id)}
            className={`p-2.5 rounded-xl border text-left transition ${
              selectedNode === n.id
                ? 'bg-blue-600 text-white shadow-sm font-semibold'
                : 'bg-white/50 border-black/5 text-[#424245] hover:bg-white'
            }`}
          >
            <div className="text-[10px] uppercase font-bold opacity-75">Node 0{n.id + 1}</div>
            <div className="text-xs font-mono font-medium truncate">{n.name}</div>
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-black/5 p-4 flex items-center gap-3">
        <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center flex-shrink-0">
          <Terminal size={15} />
        </div>
        <div>
          <span className="text-xs font-bold text-[#1d1d1f] font-mono">
            {nodes[selectedNode].name}():
          </span>
          <p className="text-xs text-[#6e6e73] mt-0.5">
            {nodes[selectedNode].role}
          </p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visualizer D: Release Gate Bouncer (Specs 12 & 20)
// -------------------------------------------------------------
function ReleaseGateVisualizer() {
  const [g1, setG1] = useState(94);
  const [g2, setG2] = useState(100);
  const [g3, setG3] = useState(100);

  const passes = g1 >= 90 && g2 === 100 && g3 === 100;

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
            The 3 Non-Negotiable Release Gates (G1, G2, G3)
          </h3>
          <p className="text-xs text-[#86868b]">
            Adjust evaluation scores to simulate CI/CD deployment approval or rejection
          </p>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
          passes ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-rose-50 text-rose-700 border border-rose-200/60'
        }`}>
          {passes ? 'CI Green: Deploy to Production' : 'CI Red: Build Rejected'}
        </span>
      </div>

      <div className="space-y-3 py-1">
        {/* Gate 1 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium text-[#1d1d1f]">
            <span>Gate 1: Answer Faithfulness (Standard: ≥ 90%)</span>
            <span className="font-bold tabular-nums text-blue-600">{g1}%</span>
          </div>
          <input
            type="range"
            min={70}
            max={100}
            value={g1}
            onChange={(e) => setG1(Number(e.target.value))}
            className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Gate 2 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium text-[#1d1d1f]">
            <span>Gate 2: Honest Refusals (Standard: = 100%)</span>
            <span className={`font-bold tabular-nums ${g2 === 100 ? 'text-emerald-600' : 'text-rose-600'}`}>{g2}%</span>
          </div>
          <input
            type="range"
            min={85}
            max={100}
            value={g2}
            onChange={(e) => setG2(Number(e.target.value))}
            className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Gate 3 */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-medium text-[#1d1d1f]">
            <span>Gate 3: Citation Integrity (Standard: = 100%)</span>
            <span className={`font-bold tabular-nums ${g3 === 100 ? 'text-emerald-600' : 'text-rose-600'}`}>{g3}%</span>
          </div>
          <input
            type="range"
            min={85}
            max={100}
            value={g3}
            onChange={(e) => setG3(Number(e.target.value))}
            className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="rounded-2xl bg-black/5 p-3 text-xs text-[#6e6e73]">
        {passes
          ? 'All 3 release gates cleared! Safe to package Docker image and tag release v1.0.0.'
          : 'Refusal or faithfulness threshold breached. scripts/release_gate.py exits with code 1.'}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Visualizer E: Universal 5-Station RAG Simulator
// -------------------------------------------------------------
function UniversalRAGSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const [simScenario, setSimScenario] = useState<'valid' | 'ambiguous' | 'out-of-scope'>('valid');

  const steps = [
    {
      id: 'input',
      title: '1. User Query',
      description: simScenario === 'valid'
        ? 'User: "What is the probation period for managers?"'
        : simScenario === 'ambiguous'
        ? 'User: "How long is probation?" (Missing role!)'
        : 'User: "How do I bake a chocolate cake?" (Out-of-Scope)',
      icon: Search,
    },
    {
      id: 'clarify',
      title: '2. Ambiguity Check',
      description: simScenario === 'ambiguous'
        ? '🛑 Ambiguity detected! Asking user: "Which employee category?"'
        : '✅ Specific query. Passing to hybrid search.',
      icon: Bot,
    },
    {
      id: 'search',
      title: '3. Hybrid Search',
      description: simScenario === 'out-of-scope'
        ? '⚠️ Retrieval score < 0.70 threshold across corpus.'
        : '🔍 Qdrant dense vectors + BM25 merged via RRF.',
      icon: Database,
    },
    {
      id: 'parent',
      title: '4. Parent Article',
      description: simScenario === 'out-of-scope'
        ? 'Zero matching passages in Moroccan Labor Code.'
        : 'Retrieved complete Article 14 (~4,000 chars) from disk.',
      icon: FileText,
    },
    {
      id: 'output',
      title: '5. Synthesis & Gate',
      description: simScenario === 'valid'
        ? '✅ Sourced Answer + Clickable Card (Article 14, Page 8).'
        : simScenario === 'ambiguous'
        ? '💬 Awaiting user clarification reply.'
        : '🛑 Gate 2: Honest Refusal emitted ("NOT_COVERED").',
      icon: simScenario === 'valid' ? CheckCircle2 : AlertTriangle,
    }
  ];

  return (
    <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
            Interactive Execution Simulator
          </h3>
          <p className="text-xs text-[#86868b]">
            Step through how the agent and parent-child retrieval react
          </p>
        </div>

        <div className="flex items-center rounded-xl bg-black/5 p-1">
          {(['valid', 'ambiguous', 'out-of-scope'] as const).map((scen) => (
            <button
              key={scen}
              onClick={() => { setSimScenario(scen); setActiveStep(0); }}
              className={`rounded-lg px-3 py-1 text-xs font-medium capitalize transition ${
                simScenario === scen
                  ? 'bg-white text-[#1d1d1f] shadow-sm font-semibold'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              {scen.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 py-2">
        {steps.map((step, idx) => {
          const isCurrent = idx === activeStep;
          const isPast = idx < activeStep;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              animate={{ scale: isCurrent ? 1.02 : 1 }}
              className={`rounded-2xl p-3.5 border transition-all duration-300 flex flex-col justify-between ${
                isCurrent
                  ? 'border-blue-500/40 bg-white shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20'
                  : isPast
                  ? 'border-emerald-500/30 bg-emerald-50/40'
                  : 'border-black/5 bg-white/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold text-[#86868b] uppercase">
                    Step {idx + 1}
                  </span>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black/5 text-[#86868b]'
                    }`}
                  >
                    <Icon size={12} />
                  </div>
                </div>
                <h4 className="text-xs font-semibold text-[#1d1d1f] line-clamp-1">{step.title}</h4>
              </div>

              <div className="mt-2 text-[11px] text-[#6e6e73] leading-relaxed min-h-[44px]">
                {step.description}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-black/5 pt-3">
        <div className="text-xs text-[#86868b]">
          Station {activeStep + 1} of {steps.length}: <span className="font-semibold text-[#1d1d1f]">{steps[activeStep].title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep(0)}
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/5 transition"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
          <button
            onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
            className="flex items-center gap-1.5 rounded-full bg-[#1d1d1f] text-white px-4 py-1.5 text-xs font-semibold shadow-sm hover:bg-black active:scale-95 transition"
          >
            <span>{activeStep === steps.length - 1 ? 'Start Over' : 'Next'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
