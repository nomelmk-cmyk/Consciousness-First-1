import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, BookOpen, Sliders, Eye } from 'lucide-react';

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
  const [collapsedNodes, setCollapsedNodes] = useState([]);

  const learningPath = {
    1: { tab: 'cosmology', message: 'First, understand the eternal architecture of consciousness...' },
    2: { tab: 'dictionary', message: 'Now learn the new language for describing reality...' },
    3: { tab: 'simulator', message: 'Explore how consciousness parameters interact...' },
    4: { tab: 'experiential', message: 'Finally, apply these insights directly...' }
  };

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setAnimationPhase(p => (p + 0.02) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, [isAnimating]);

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
  }, []);

  useEffect(() => {
    const state = { distinctions, ideation, complexity, insights: insights.slice(-10) };
    localStorage.setItem('consciousnessModelState', JSON.stringify(state));
  }, [distinctions, ideation, complexity, insights]);

  const addInsight = (text) => {
    const newInsight = { text, timestamp: Date.now() };
    setInsights(prev => [...prev.slice(-9), newInsight]);
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (learningMode) {
          const step = Object.keys(learningPath).find(key => learningPath[Number(key)].tab === id);
          if (step) setCurrentStep(Number(step));
        }
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === id ? 'bg-violet-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const CosmologyView = () => {
    const flow = [
      { id: 'ONE', label: 'ONE', desc: 'Absolute/Void', y: 80 },
      { id: 'one', label: 'one', desc: 'Vortex/Focus', y: 180 },
      { id: 'Self', label: 'Self', desc: 'Self-Awareness', y: 280 },
      { id: 'one+', label: 'one+', desc: 'Enriched/Embodied', y: 380 },
      { id: 'ONE+', label: 'ONE+', desc: 'Value Fulfilled', y: 480 },
      { id: 'infinity', label: '∞', desc: 'Eternal Circuit', y: 580 }
    ];

    const handleCollapse = (nodeId) => {
      if (collapsedNodes.includes(nodeId)) return;
      setCollapsedNodes(prev => [...prev, nodeId]);
      const nodeIndex = flow.findIndex(n => n.id === nodeId);
      const boost = 100 - (nodeIndex * 15);
      setDistinctions(prev => Math.min(100, prev + boost));
      setIdeation(prev => Math.min(100, prev + boost * 0.7));
      addInsight(`Collapsed distinction at ${flow[nodeIndex].label}`);
    };

    return (
      <div className="relative h-[650px] bg-gradient-to-b from-indigo-950 to-black rounded-xl p-8 overflow-hidden">
        <div className="absolute top-4 right-4 flex gap-2 z-10">
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
          {flow.slice(0, -1).map((_, i) => (
            <line key={i} x1="50%" y1={flow[i].y} x2="50%" y2={flow[i+1].y} stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
          ))}
          <path d="M 50% 580 Q 80% 350 50% 80" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="2" fill="none" strokeDasharray="5,5" />

          {flow.map((node, i) => {
            const isCollapsed = collapsedNodes.includes(node.id);
            const radius = node.label === 'ONE' || node.label === 'ONE+' || node.label === '∞' ? 45 : 38;
            const opacity = 0.7 + 0.3 * Math.sin(animationPhase + i);
            return (
              <g key={node.id} className="cursor-pointer" onClick={() => handleCollapse(node.id)}>
                <circle cx="50%" cy={node.y} r={isCollapsed ? radius * 1.3 : radius} fill={`rgba(139, 92, 246, ${opacity * 0.2})`} stroke={`rgba(139, 92, 246, ${opacity})`} strokeWidth={isCollapsed ? 4 : 2} />
                <text x="50%" y={node.y} textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-violet-200">
                  {node.label}
                </text>
                <text x="50%" y={node.y + 70} textAnchor="middle" className="text-sm fill-gray-400">
                  {node.desc}
                </text>
                {isCollapsed && <text x="50%" y={node.y - 60} textAnchor="middle" className="text-sm fill-amber-300">Collapsed</text>}
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-300">
          <span className="text-violet-400 font-semibold">Click any node to collapse distinction</span>
        </div>
      </div>
    );
  };

  const DictionaryView = () => {
    const translations = [
      { old: 'Mass', new: 'Distinction Density' },
      { old: 'Energy', new: 'Rate of Distinction' },
      { old: 'Spacetime', new: 'Emergent Metric' },
      { old: 'Particle', new: 'Stable Vortex' },
      { old: 'Wave Function', new: 'Partial Distinction' },
      { old: 'Measurement', new: 'Distinction Completion' },
      { old: 'Entanglement', new: 'Field Coherence' },
      { old: 'Time', new: 'Memory Grammar' },
      { old: 'Causation', new: 'Depth Relation' },
      { old: 'Matter', new: 'Dense Aggregate' }
    ];

    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-violet-300 text-center">Grammar Translation</h3>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {translations.map((item, i) => (
            <div key={i} className="bg-gray-900 rounded-lg p-6 border border-gray-800 flex items-center justify-between">
              <span className="text-gray-500 line-through text-lg">{item.old}</span>
              <span className="text-gray-600 text-2xl">→</span>
              <span className="text-violet-400 font-bold text-xl">{item.new}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SimulatorView = () => {
    const coherence = Math.sqrt((distinctions * ideation / 100) * (Math.log(complexity + 1) / Math.log(2))) * 10;

    return (
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-violet-300 text-center">Consciousness Parameters</h3>
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <label className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Distinction Density</span>
              <span className="text-violet-400 font-bold">{distinctions}%</span>
            </label>
            <input type="range" min="0" max="100" value={distinctions} onChange={e => setDistinctions(Number(e.target.value))} className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Ideation Strength</span>
              <span className="text-violet-400 font-bold">{ideation}%</span>
            </label>
            <input type="range" min="0" max="100" value={ideation} onChange={e => setIdeation(Number(e.target.value))} className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-500" />
          </div>
          <div>
            <label className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Aggregate Complexity</span>
              <span className="text-violet-400 font-bold">{complexity}%</span>
            </label>
            <input type="range" min="0" max="100" value={complexity} onChange={e => setComplexity(Number(e.target.value))} className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-violet-500" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-violet-400">{coherence.toFixed(1)}%</div>
          <div className="text-gray-400 mt-2">Integration Coherence (Φ)</div>
        </div>
      </div>
    );
  };

  const ExperientialView = () => {
    return (
      <div className="space-y-8 text-center max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-violet-300">Direct Recognition</h3>
        <p className="text-gray-300 text-lg">
          These are invitations to look directly at the nature of experience — not beliefs to adopt.
        </p>
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
          <p className="text-xl text-gray-400 italic">
            "What is aware of this moment, before any distinction arises?"
          </p>
        </div>
        {insights.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-violet-300 font-bold text-xl">Recent Insights</h4>
            {insights.slice().reverse().map((insight, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg p-4 text-gray-300">
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
          <p className="text-gray-400 text-lg">Interactive exploration of consciousness as the ground of being</p>
          <button
            onClick={() => setLearningMode(!learningMode)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-medium ${learningMode ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            Learning Mode
          </button>
        </header>

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
      </div>
    </div>
  );
};

export default ConsciousnessModel;
