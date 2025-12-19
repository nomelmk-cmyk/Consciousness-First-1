import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, Pause, RotateCcw, BookOpen, Sliders, Eye, Download, Upload, 
  Users, Brain, Lightbulb, X, Check, AlertCircle, Share2 
} from 'lucide-react';

const ConsciousnessModel = () => {
  const [activeTab, setActiveTab] = useState('cosmology');
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
  const [collapsedNodes, setCollapsedNodes] = useState<string[]>([]);

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
    const state = { distinctions, ideation, complexity, insights: insights.slice(-10) };
    localStorage.setItem('consciousnessModelState', JSON.stringify(state));
  }, [distinctions, ideation, complexity, insights]);

  const addInsight = (text: string) => {
    const newInsight = { text, timestamp: Date.now() };
    setInsights(prev => [...prev.slice(-9), newInsight]);
  };

  const TabButton = ({ id, icon: Icon, label }: { id: string; icon: React.ComponentType<any>; label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (learningMode) {
          const step = Object.keys(learning
