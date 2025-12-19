import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, BookOpen, Sliders, Eye } from 'lucide-react';

/* ---------- Types ---------- */

type TabId = 'cosmology' | 'dictionary' | 'simulator' | 'experiential';

interface Insight {
  text: string;
  timestamp: number;
}

interface TabButtonProps {
  id: TabId;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}

interface FlowNode {
  id: string;
  label: string;
  desc: string;
  y: number;
}

/* ---------- Component ---------- */

const ConsciousnessModel = () => {
  const [activeTab, setActiveTab] = useState<TabId>('cosmology');
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [animationPhase, setAnimationPhase] = useState<number>(0);

  const [distinctions, setDistinctions] = useState<number>(50);
  const [ideation, setIdeation] = useState<number>(50);
  const [complexity, setComplexity] = useState<number>(50);

  const [insights, setInsights] = useState<Insight[]>([]);
  const [collapsedNodes, setCollapsedNodes] = useState<string[]>([]);

  /* ---------- Effects ---------- */

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setAnimationPhase(p => (p + 0.02) % (Math.PI * 2));
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('consciousnessModelState');
    if (!saved) return;

    try {
      const state: Partial<{
        distinctions: number;
        ideation: number;
        complexity: number;
      }> = JSON.parse(saved);

      setDistinctions(state.distinctions ?? 50);
      setIdeation(state.ideation ?? 50);
      setComplexity(state.complexity ?? 50);
    } catch {
      /* ignore corrupted state */
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem(
      'consciousnessModelState',
      JSON.stringify({ distinctions, ideation, complexity })
    );
  }, [distinctions, ideation, complexity]);

  /* ---------- Helpers ---------- */

  const addInsight = (text: string) => {
    const newInsight: Insight = {
      text,
      timestamp: Date.now(),
    };

    setInsights(prev => [...prev.slice(-9), newInsight]);
  };

  /* ---------- Subcomponents ---------- */

  const TabButton = ({ id, icon: Icon, label }: TabButtonProps) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        activeTab === id
          ? 'bg-violet-600 text-white shadow-lg'
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
      }`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const CosmologyView = () => {
    const flow: FlowNode[] = [
      { id: 'ONE', label: 'ONE', desc: 'Absolute/Void', y: 80 },
      { id: 'one', label: 'one', desc: 'Vortex/Focus', y: 180 },
      { id: 'Self', label: 'Self', desc: 'Self-Awareness', y: 280 },
      { id: 'one+', label: 'one+', desc: 'Enriched/Embodied', y: 380 },
      { id: 'ONE+', label: 'ONE+', desc: 'Value Fulfilled', y: 480 },
      { id: 'infinity', label: '∞', desc: 'Eternal Circuit', y: 580 },
    ];

    const handleCollapse = (nodeId: string) => {
      if (collapsedNodes.includes(nodeId)) return;

      setCollapsedNodes(prev => [...prev, nodeId]);

      const nodeIndex = flow.findIndex(n => n.id === nodeId);
      if (nodeIndex < 0) return;

      const boost = 100 - nodeIndex * 15;

      setDistinctions(prev => Math.min(100, prev + boost));
      setIdeation(prev => Math.min(100, prev + boost * 0.7));

      addInsight(`Collapsed distinction at ${flow[nodeIndex].label}`);
    };

    return (
      <div className="relative h-[650px] bg-gradient-to-b from-indigo-950 to-black rounded-xl p-8 overflow-hidden">
        {/* controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => setIsAnimating(a => !a)}
            className="p-2 bg-gray-800 rounded-lg"
          >
            {isAnimating ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={() => {
              setAnimationPhase(0);
              setCollapsedNodes([]);
            }}
            className="p-2 bg-gray-800 rounded-lg"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        {/* svg */}
        <svg className="w-full h-full">
          {flow.slice(0, -1).map((_, i) => (
            <line
              key={i}
              x1="50%"
              y1={flow[i].y}
              x2="50%"
              y2={flow[i + 1].y}
              stroke="rgba(139,92,246,0.3)"
              strokeWidth={2}
              strokeDasharray="5,5"
            />
          ))}

          {flow.map((node, i) => {
            const isCollapsed = collapsedNodes.includes(node.id);
            const radius =
              node.label === 'ONE' || node.label === 'ONE+' || node.label === '∞'
                ? 45
                : 38;
            const opacity = 0.7 + 0.3 * Math.sin(animationPhase + i);

            return (
              <g key={node.id} onClick={() => handleCollapse(node.id)} className="cursor-pointer">
                <circle
                  cx="50%"
                  cy={node.y}
                  r={isCollapsed ? radius * 1.3 : radius}
                  fill={`rgba(139,92,246,${opacity * 0.2})`}
                  stroke={`rgba(139,92,246,${opacity})`}
                  strokeWidth={isCollapsed ? 4 : 2}
                />
                <text
                  x="50%"
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-2xl font-bold fill-violet-200"
                >
                  {node.label}
                </text>
                <text
                  x="50%"
                  y={node.y + 70}
                  textAnchor="middle"
                  className="text-sm fill-gray-400"
                >
                  {node.desc}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  /* ---------- Render ---------- */

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <nav className="flex flex-wrap gap-3 justify-center mb-6">
        <TabButton id="cosmology" icon={RotateCcw} label="Cosmology" />
        <TabButton id="dictionary" icon={BookOpen} label="Dictionary" />
        <TabButton id="simulator" icon={Sliders} label="Simulator" />
        <TabButton id="experiential" icon={Eye} label="Practice" />
      </nav>

      {activeTab === 'cosmology' && <CosmologyView />}
    </div>
  );
};

export default ConsciousnessModel;
