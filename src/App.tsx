import React from 'react';
import { RotateCcw, BookOpen, Sliders, Eye } from 'lucide-react';

const ConsciousnessModel = () => {
  const [activeTab, setActiveTab] = React.useState('cosmology');

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === id ? 'bg-violet-600 text-white shadow-lg' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const CosmologyView = () => (
    <div className="h-[600px] bg-gradient-to-b from-indigo-950 to-black rounded-xl p-8 flex items-center justify-center">
      <div className="text-violet-300 text-2xl font-bold">Cosmology View – Eternal Circuit</div>
    </div>
  );

  const DictionaryView = () => (
    <div className="h-[600px] bg-gradient-to-b from-indigo-950 to-black rounded-xl p-8 flex items-center justify-center">
      <div className="text-violet-300 text-2xl font-bold">Dictionary View – Grammar Translation</div>
    </div>
  );

  const SimulatorView = () => (
    <div className="h-[600px] bg-gradient-to-b from-indigo-950 to-black rounded-xl p-8 flex items-center justify-center">
      <div className="text-violet-300 text-2xl font-bold">Simulator View – Parameters & Coherence</div>
    </div>
  );

  const ExperientialView = () => (
    <div className="h-[600px] bg-gradient-to-b from-indigo-950 to-black rounded-xl p-8 flex items-center justify-center">
      <div className="text-violet-300 text-2xl font-bold">Experiential View – Direct Practices</div>
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

        <footer className="text-center text-sm text-gray-600">
          <p>MIT Licensed • Built with love for direct recognition</p>
        </footer>
      </div>
    </div>
  );
};

export default ConsciousnessModel;
