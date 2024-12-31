import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MessageSquare, Code, Cloud, Brain, Image, Zap } from 'lucide-react';
import Button from './ui/Button';
import FeatureCard from './ui/FeatureCard';
import AnimatedBackground from './ui/AnimatedBackground';
import BackgroundPattern from './ui/BackgroundPattern';
import ModelSelector from './ui/ModelSelector';
import TypewriterText from './ui/TypewriterText';
import NeuralAnimation from './ui/NeuralAnimation';
import CircuitPattern from './ui/CircuitPattern';
import TwinklingStars from './ui/TwinklingStars';

const features = [
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Engage in fluid, context-aware conversations with advanced AI"
  },
  {
    icon: Image,
    title: "Visual Understanding",
    description: "Discuss and analyze images with AI for deeper insights"
  },
  {
    icon: Code,
    title: "Code Assistant",
    description: "Get help with coding, debugging, and technical explanations"
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description: "Access your conversation history from any device"
  },
  {
    icon: Brain,
    title: "Multiple AI Models",
    description: "Choose from Claude, Gemini, GPT-4, and more"
  },
  {
    icon: Zap,
    title: "100% Free",
    description: "Access all features without any cost"
  }
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] 
        bg-cover bg-center opacity-10 dark:opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      
      <BackgroundPattern />
      <AnimatedBackground />
      <NeuralAnimation />
      <CircuitPattern />
      <TwinklingStars />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 
          bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 
            blur-3xl opacity-30 dark:opacity-20" />
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6 neon-glow leading-tight">
            Experience AI <br className="sm:hidden" />
            Conversations with <br className="hidden sm:block" />
            <TypewriterText />
          </h1>
        </div>
        
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Engage in natural conversations powered by advanced AI. Get answers, insights, 
          and assistance instantly.
        </p>

        <div className="flex flex-col items-center gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              icon={MessageSquare}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 
                hover:to-purple-600/90 relative group w-full sm:w-auto"
              onClick={() => navigate('/chat')}
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 
                blur opacity-30 group-hover:opacity-50 transition duration-200" />
              <span className="relative">Start Chatting</span>
            </Button>
            <Button 
              variant="secondary"
              className="border-2 border-primary/20 hover:border-primary/30 dark:bg-white/5 w-full sm:w-auto"
            >
              Try Demo
            </Button>
          </div>
          
          <div className="w-full overflow-x-auto pb-4 sm:pb-0">
            <div className="min-w-max sm:min-w-0">
              <ModelSelector />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              className="hover:translate-y-[-4px] dark:bg-white/5 dark:hover:bg-white/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
