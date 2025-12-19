import React, { useState, useEffect, useMemo } from 'react';
import { Play, Pause, RotateCcw, BookOpen, Sliders, Eye, Download, Upload, Users, Brain, Lightbulb, X, Check, AlertCircle, Share2 } from 'lucide-react';

const ConsciousnessModel = () => {
  const [activeTab, setActiveTab] = useState('cosmology');
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [distinctions, setDistinctions] = useState(50);
  const [ideation, setIdeation] = useState(50);
  const [complexity, setComplexity] = useState(50);
  const [insights, setInsights] = useState([]);
  const [learningMode, setLearningMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [skepticMode, setSkepticMode] = useState(false);
  const [scenario, setScenario] = useState('default');
  const [eegData, setEegData] = useState(null);
  const [collaborativeData, setCollaborativeData] = useState(null);
  const [exportFormat, setExportFormat] = useState('json');

  const learningPath = {
    1: { tab: 'cosmology', message: 'First, understand the eternal architecture of consciousness...' },
    2: { tab: 'dictionary', message: 'Now learn the new language for describing reality...' },
    3: { tab: 'simulator', message: 'Explore how consciousness parameters interact...' },
    4: { tab: 'experiential', message: 'Finally, apply these insights directly...' }
  };

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setAnimationPhase(p => (p + 0.02) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Load saved state + simulate EEG
  useEffect(() => {
    const saved = localStorage.getItem('consciousnessModelState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setDistinctions(state.distinctions || 50);
        setIdeation(state.ideation || 50);
        setComplexity(state.complexity || 50);
        setInsights(state.insights || []);
      } catch (e) {}
    }

    const simulateEEG = () => {
      const alpha = 8 + Math.sin(Date.now() / 1000) * 2;
      const beta = 12 + Math.cos(Date.now() / 800) * 3;
      const theta = 4 + Math.sin(Date.now() / 1200) * 1.5;
      const gamma = 30 + Math.cos(Date.now() / 600) * 5;
      setEegData({
        alpha, beta, theta, gamma,
        coherence: (alpha + theta) / (beta + 1),
        meditationScore: Math.max(0, Math.min(100, alpha * 1.5 - beta * 0.5))
      });
    };

    const eegInterval = setInterval(simulateEEG, 500);
    return () => clearInterval(eegInterval);
  }, []);

  // Unified connection metrics (memoized for performance)
  const unifiedConnection = useMemo(() => {
    const vortexStability = distinctions * ideation / 100;
    const nestingDepth = Math.log(complexity + 1) / Math.log(2);
    const coherence = Math.sqrt(vortexStability * nestingDepth);
    return {
      phi: coherence * 100,
      structures: Math.floor(complexity / 10) + 1,
      observerCount: Math.floor(distinctions / 20) + 1
    };
  }, [distinctions, ideation, complexity]);

  // Auto-save state
  useEffect(() => {
    const state = {
      distinctions, ideation, complexity,
      insights: insights.slice(-10),
      timestamp: Date.now()
    };
    localStorage.setItem('consciousnessModelState', JSON.stringify(state));
  }, [distinctions, ideation, complexity, insights]);

  const addInsight = (text: string) => {
    const newInsight = {
      text,
      timestamp: Date.now(),
      params: { distinctions, ideation, complexity },
      scenario,
      unifiedMetrics: unifiedConnection
    };
    setInsights(prev => [...prev.slice(-9), newInsight]);
  };

  const TabButton = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (learningMode) {
          const step = Object.keys(learningPath).find(key => learningPath[Number(key)].tab === id);
          if (step) setCurrentStep(Number(step));
        }
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === id ? 'bg-violet-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
      role="tab"
      aria-selected={activeTab === id}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  // Cosmology View
  const CosmologyView = () => {
    const [collapsedNodes, setCollapsedNodes] = useState<string[]>([]);

    const flow = [
      { id: 'ONE', label: 'ONE', desc: 'Absolute/Void', y: 50 },
      { id: 'one', label: 'one', desc: 'Vortex/Focus', y: 150 },
      { id: 'Self', label: 'Self', desc: 'Self-Awareness', y: 250 },
      { id: 'one+', label: 'one+', desc: 'Enriched/Embodied', y: 350 },
      { id: 'ONE+', label: 'ONE+', desc: 'Value Fulfilled', y: 450 },
      { id: 'infinity', label: '∞', desc: 'Eternal Circuit', y: 550 }
    ];

    const handleCollapse = (nodeId: string) => {
      if (collapsedNodes.includes(nodeId)) return;
      setCollapsedNodes(prev => [...prev, nodeId]);
      const nodeIndex = flow.findIndex(n => n.id === nodeId);
      const boost = 100 - (nodeIndex * 15);
      setDistinctions(prev => Math.min(100, prev + boost));
      setIdeation(prev => Math.min(100, prev + boost * 0.7));
      addInsight(`Collapsed distinction at ${flow[nodeIndex].label}: Quantum-to-classical transition`);
    };

    return (
      <div className="relative h-[600px] bg-gradient-to-b from-indigo-950 to-black rounded-xl p-8 overflow-hidden">
        <div className="absolute top-4 right-4 flex gap-2">
          <button onClick={() => setIsAnimating(!isAnimating)} className="p-2 bg-gray-800 rounded-lg">
            {isAnimating ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={() => {
            setAnimationPhase(0);
            setCollapsedNodes([]);
          }} className="p-2 bg-gray-800 rounded-lg">
            <RotateCcw size={20} />
          </button>
        </div>

        <svg className="w-full h-full">
          {flow.slice(0, -1).map((node, i) => (
            <g key={i}>
              <line x1="50%" y1={node.y} x2="50%" y2={flow[i+1].y} stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
            </g>
          ))}
          <path d="M 50% 550 Q 80% 300 50% 50" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="2" fill="none" strokeDasharray="5,5" />

          {flow.map((node, i) => {
            const isCollapsed = collapsedNodes.includes(node.id);
            const radius = node.label.length > 3 ? 40 : 35;
            const opacity = 0.7 + 0.3 * Math.sin(animationPhase + i);
            return (
              <g key={i} className="cursor-pointer" onClick={() => handleCollapse(node.id)}>
                <circle cx="50%" cy={node.y} r={isCollapsed ? radius * 1.2 : radius} fill={`rgba(139, 92, 246, ${opacity * 0.2})`} stroke={`rgba(139, 92, 246, ${opacity})`} strokeWidth={isCollapsed ? 3 : 2} />
                <text x="50%" y={node.y} textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-violet-200">
                  {node.label}
                </text>
                <text x="50%" y={node.y + 60} textAnchor="middle" className="text-sm fill-gray-400">
                  {node.desc}
                </text>
                {isCollapsed && <text x="50%" y={node.y - 50} textAnchor="middle" className="text-xs fill-amber-300">Collapsed</text>}
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-300">
          <span className="text-violet-400 font-semibold">Click nodes to collapse distinctions</span>
        </div>
      </div>
    );
  };

  const DictionaryView = () => {
    const translations = [
      { old: 'Mass', new: 'Distinction Density', desc: 'Concentration of distinction-making' },
      { old: 'Energy', new: 'Rate of Distinction', desc: 'Speed of creating differences' },
      { old: 'Spacetime', new: 'Emergent Metric', desc: 'Geometry from distinction patterns' },
      { old: 'Particle', new: 'Stable Vortex', desc: 'Self-sustaining pattern' },
      { old: 'Wave Function', new: 'Partial Distinction', desc: 'Potential not yet collapsed' },
      { old: 'Measurement', new: 'Distinction Completion', desc: 'Observer completing pattern' },
      { old: 'Entanglement', new: 'Field Coherence', desc: 'Non-local correlation in ONE' },
      { old: 'Time', new: 'Memory Grammar', desc: 'Narrative on eternal NOW' },
      { old: 'Causation', new: 'Depth Relation', desc: 'Connection between simultaneous levels' },
      { old: 'Matter', new: 'Dense Aggregate', desc: 'Organized vortex clusters' }
    ];

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-violet-300">Grammar Translation</h3>
        <div className="grid gap-4">
          {translations.map((item, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-gray-500 line-through">{item.old}</span>
                <span className="text-gray-600">→</span>
                <span className="text-violet-400 font-semibold">{item.new}</span>
              </div>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SimulatorView = () => {
    const coherence = Math.sqrt((distinctions * ideation / 100) * (Math.log(complexity + 1) / Math.log(2))) * 10;

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-violet-300">Consciousness Parameters</h3>
        <div className="grid gap-6">
          <div>
            <label className="flex justify-between text-sm mb-2">
              <span>Distinction Density</span>
              <span className="text-violet-400">{distinctions}%</span>
            </label>
            <input type="range" min="0" max="100" value={distinctions} onChange={e => setDistinctions(Number(e.target.value))} className="w-full accent-violet-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm mb-2">
              <span>Ideation Strength</span>
              <span className="text-violet-400">{ideation}%</span>
            </label>
            <input type="range" min="0" max="100" value={ideation} onChange={e => setIdeation(Number(e.target.value))} className="w-full accent-violet-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm mb-2">
              <span>Aggregate Complexity</span>
              <span className="text-violet-400">{complexity}%</span>
            </label>
            <input type="range" min="0" max="100" value={complexity} onChange={e => setComplexity(Number(e.target.value))} className="w-full accent-violet-500" />
          </div>
        </div>
        <div className="text-center text-3xl font-bold text-violet-400">
          Coherence: {coherence.toFixed(1)}%
        </div>
      </div>
    );
  };

  const ExperientialView = () => {
    return (
      <div className="space-y-6 text-center">
        <h3 className="text-2xl font-bold text-violet-300">Direct Recognition</h3>
        <p className="text-gray-300 text-lg">
          These practices are invitations to look directly at the nature of experience.
        </p>
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <p className="text-gray-400 italic">
            "What is aware of this moment, prior to all distinctions?"
          </p>
        </div>
        {insights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-violet-300">Recent Insights</h4>
            {insights.slice().reverse().slice(0, 5).map((insight, i) => (
              <div key={i} className="text-sm text-gray-400">
                {insight.text}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Consciousness-First Reality
          </h1>
          <p className="text-gray-400 text-lg">Interactive exploration of consciousness as fundamental</p>
          <button
            onClick={() => setLearningMode(!learningMode)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${learningMode ? 'bg-amber-600' : 'bg-gray-800'}`}
          >
            <Brain size={18} />
            {learningMode ? 'Learning Mode ON' : 'Learning Mode'}
          </button>
        </header>

        {learningMode && (
          <div className="bg-amber-900/30 rounded-xl p-6 border border-amber-500/50">
            <h3 className="text-amber-300 font-bold">Step {currentStep}: {learningPath[currentStep].message}</h3>
          </div>
        )}

        <nav className="flex flex-wrap gap-3 justify-center">
          <TabButton id="cosmology" icon={RotateCcw} label="Cosmology" />
          <TabButton id="dictionary" icon={BookOpen} label="Dictionary" />
          <TabButton id="simulator" icon={Sliders} label="Simulator" />
          <TabButton id="experiential" icon={Eye} label="Practice" />
        </nav>

        <main className="bg-gray-950 rounded-2xl border border-gray-800 p-8">
          {activeTab === 'cosmology' && <CosmologyView />}
          {activeTab === 'dictionary' && <DictionaryView />}
          {activeTab === 'simulator' && <SimulatorView />}
          {activeTab === 'experiential' && <ExperientialView />}
        </main>

        <footer className="text-center text-sm text-gray-600">
          <p>All data stays local • State saved automatically • MIT Licensed</p>
        </footer>
      </div>
    </div>
  );
};

export default ConsciousnessModel;
