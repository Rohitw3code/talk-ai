import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MessageSquare, Code, Cloud, Brain, Image, Zap, FileSearch, Bot, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import FeatureCard from './ui/FeatureCard';
import Typography from './ui/Typography';
import AnimatedBackground from './ui/AnimatedBackground';
import BackgroundPattern from './ui/BackgroundPattern';
import ModelSelector from './ui/ModelSelector';
import TypewriterText from './ui/TypewriterText';
import NeuralAnimation from './ui/NeuralAnimation';
import CircuitPattern from './ui/CircuitPattern';
import ParallaxStars from './ui/ParallaxStars';

const features = [
  {
    icon: Brain,
    title: "RAG Technology",
    description: "Retrieval-Augmented Generation for accurate, context-aware responses"
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description: "Advanced PDF processing with semantic search and vector embeddings"
  },
  {
    icon: MessageSquare,
    title: "Natural Conversations",
    description: "Engage in fluid, context-aware conversations with your documents"
  },
  {
    icon: Bot,
    title: "Multiple AI Models",
    description: "Choose from Claude, Gemini, GPT-4, Groq, and more advanced models"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized vector search and real-time AI responses"
  },
  {
    icon: Sparkles,
    title: "Smart Analysis",
    description: "Extract insights, summaries, and answers from your documents"
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
      <ParallaxStars />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 
          bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 
            blur-3xl opacity-30 dark:opacity-20" />
          <Typography
            variant="h1"
            size="4xl"
            weight="bold"
            color="primary"
            className="relative sm:text-5xl md:text-6xl mb-4 sm:mb-6 neon-glow leading-tight"
          >
            Transform Documents with <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              RAG-Powered AI
            </span>
          </Typography>
        </div>
        
        <Typography
          variant="p"
          size="lg"
          color="secondary"
          className="sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Upload PDF documents and engage in intelligent conversations powered by 
          <span className="text-primary font-semibold"> Retrieval-Augmented Generation</span>. 
          Get accurate, context-aware answers from your content with advanced AI models.
        </Typography>

        {/* Typing Animation */}
        <div className="mb-8 sm:mb-12">
          <Typography
            variant="p"
            size="xl"
            className="text-muted-foreground mb-2"
          >
            Experience AI-powered <TypewriterText />
          </Typography>
        </div>

        {/* RAG Explanation */}
        <div className="mb-8 sm:mb-12 max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 justify-center p-3 bg-primary/5 border border-primary/20 rounded-lg animate-fade-in">
              <Upload className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Upload PDF</span>
            </div>
            <div className="flex items-center gap-2 justify-center p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg animate-fade-in" 
              style={{ animationDelay: '0.2s' }}>
              <Brain className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 font-medium">Vector Processing</span>
            </div>
            <div className="flex items-center gap-2 justify-center p-3 bg-green-500/5 border border-green-500/20 rounded-lg animate-fade-in" 
              style={{ animationDelay: '0.4s' }}>
              <MessageSquare className="w-4 h-4 text-green-500" />
              <span className="text-green-500 font-medium">Intelligent Chat</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              icon={MessageSquare}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 
                hover:to-purple-600/90 relative group w-full sm:w-auto button-glow"
              onClick={() => navigate('/chat')}
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 
                blur opacity-30 group-hover:opacity-50 transition duration-200" />
              <span className="relative">Start RAG Chat</span>
            </Button>
            <Button 
              variant="secondary"
              className="border-2 border-primary/20 hover:border-primary/30 dark:bg-white/5 w-full sm:w-auto"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn About RAG
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
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                {...feature}
                className="card-hover card-tilt dark:bg-white/5 dark:hover:bg-white/10"
              />
            </div>
          ))}
        </div>

        {/* RAG Technology Explanation */}
        <div className="mt-16 sm:mt-20 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
            <Typography variant="h3" size="xl" weight="bold" color="primary" className="mb-4">
              What is RAG Technology?
            </Typography>
            <Typography variant="p" size="base" color="secondary" className="mb-6 leading-relaxed">
              <span className="font-semibold text-primary">Retrieval-Augmented Generation (RAG)</span> combines 
              the power of information retrieval with AI generation. When you upload a document, we:
            </Typography>
            
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div className="space-y-3">
                <div className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: '1s' }}>
                  <div className="p-1 bg-primary/20 rounded-full mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  <div>
                    <Typography variant="p" size="sm" weight="medium" color="primary">
                      Extract & Chunk Text
                    </Typography>
                    <Typography variant="p" size="xs" color="muted">
                      Break documents into optimal segments
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: '1.2s' }}>
                  <div className="p-1 bg-blue-500/20 rounded-full mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <Typography variant="p" size="sm" weight="medium" className="text-blue-600 dark:text-blue-400">
                      Create Vector Embeddings
                    </Typography>
                    <Typography variant="p" size="xs" color="muted">
                      Convert text to mathematical representations
                    </Typography>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: '1.4s' }}>
                  <div className="p-1 bg-green-500/20 rounded-full mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <div>
                    <Typography variant="p" size="sm" weight="medium" className="text-green-600 dark:text-green-400">
                      Semantic Search
                    </Typography>
                    <Typography variant="p" size="xs" color="muted">
                      Find relevant content for your questions
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: '1.6s' }}>
                  <div className="p-1 bg-purple-500/20 rounded-full mt-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  </div>
                  <div>
                    <Typography variant="p" size="sm" weight="medium" className="text-purple-600 dark:text-purple-400">
                      Generate Responses
                    </Typography>
                    <Typography variant="p" size="xs" color="muted">
                      AI creates accurate, contextual answers
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}