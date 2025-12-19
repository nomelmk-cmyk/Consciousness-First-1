import React, { useState, useEffect, useMemo } from 'react';
import { RotateCcw, BookOpen, Sliders, Eye } from 'lucide-react';

const ConsciousnessModel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cosmology' | 'dictionary' | 'simulator' | 'experiential'>('cosmology');
  const [isAnimating, setIsAnimating] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [distinctions, setDistinctions] = useState(50);
  const [ideation, setIdeation] = useState(50);
  const [complexity, setComplexity] = useState(50);
  const [insights, setInsights] = useState<Array<{ text: string; timestamp: number }>>([]);
  const [learningMode, setLearningMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [skepticMode, setSkepticMode] = useState(false);
  const [scenario, setScenario] = useState('default');
  const [eegData, setEegData] = useState<any>(null);

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

  useEffect(() => {
    const state = {
      distinctions, ideation, complexity,
      insights: insights.slice(-10)
    };
    localStorage.setItem('consciousnessModelState', JSON.stringify(state));
  }, [distinctions, ideation, complexity, insights]);

  const addInsight = (text: string) => {
    const newInsight = { text, timestamp: Date.now() };
    setInsights(prev => [...prev.slice(-9), newInsight]);
  };

  const TabButton = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === id ? 'bg-violet-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const CosmologyView = () => (
    <div className="h-[600px] bg-gradient-to-b from-indigo-950 to-black rounded-xl p-8 flex items-center justify-center text-violet-300 text-2xl font-bold">
      Cosmology View - Eternal Circuit Visualization
    </div>
  );

  const DictionaryView = () => (
    <div className="space-y-6 text-center text-violet-300 text-xl">
      Dictionary View - Grammar Translation Table
    </div>
  );

  const SimulatorView = () => (
    <div className="space-y-6 text-center text-violet-300 text-xl">
      Simulator - Adjust Parameters and See Emergent Reality
    </div>
  );

  const ExperientialView = () => (
    <div className="space-y-6 text-center text-violet-300 text-xl">
      Experiential Practices - Direct Recognition
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Consciousness-First Reality
          </h1>
          <p className="text-gray-400 text-lg">Interactive exploration of consciousness as fundamental</p>
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
