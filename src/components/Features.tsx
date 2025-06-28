import React from 'react';
import { Shield, Zap, Globe, Users, Code, Brain, FileSearch, MessageSquare, Upload, Bot, Sparkles, Database } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';
import Typography from './ui/Typography';
import Section from './ui/Section';

const features = [
  {
    icon: Brain,
    title: "RAG Architecture",
    description: "Advanced Retrieval-Augmented Generation for accurate, context-aware AI responses grounded in your documents"
  },
  {
    icon: FileSearch,
    title: "Intelligent Document Processing",
    description: "Automatic PDF text extraction, smart chunking, and vector embedding creation for optimal AI understanding"
  },
  {
    icon: Database,
    title: "Vector Search Engine",
    description: "FAISS-powered semantic search with OpenAI embeddings for lightning-fast content retrieval"
  },
  {
    icon: MessageSquare,
    title: "Natural Language Chat",
    description: "Engage in fluid conversations about your documents with context-aware AI responses"
  },
  {
    icon: Bot,
    title: "Multiple AI Models",
    description: "Choose from Claude 3.5 Sonnet, GPT-4 Turbo, Gemini Pro, Groq, and other cutting-edge models"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Optimized pipeline for fast document processing and instant AI response generation"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption, secure API handling, and privacy-first document processing"
  },
  {
    icon: Sparkles,
    title: "Smart Analysis",
    description: "Extract insights, generate summaries, answer questions, and analyze document content intelligently"
  },
  {
    icon: Globe,
    title: "Multi-Language Support",
    description: "Process and chat with documents in multiple languages with native-level understanding"
  }
];

export default function Features() {
  return (
    <Section id="features" background="gradient">
      <div className="text-center mb-12 sm:mb-16">
        <Typography variant="h2" size="3xl" weight="bold" color="primary" className="sm:text-4xl mb-4 neon-glow">
          Advanced RAG Features
        </Typography>
        <Typography variant="p" size="lg" color="muted" className="sm:text-xl max-w-3xl mx-auto">
          Discover the powerful capabilities that make our RAG-powered AI assistant the most advanced 
          document intelligence platform available
        </Typography>
      </div>

      {/* RAG Process Visualization */}
      <div className="mb-12 sm:mb-16">
        <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto">
          <Typography variant="h3" size="xl" weight="bold" color="primary" className="text-center mb-6">
            How RAG Technology Works
          </Typography>
          
          <div className="grid sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <Typography variant="h4" size="sm" weight="semibold" color="primary" className="mb-2">
                1. Upload
              </Typography>
              <Typography variant="p" size="xs" color="muted">
                Upload PDF documents for processing
              </Typography>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-blue-500/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Database className="w-8 h-8 text-blue-500" />
              </div>
              <Typography variant="h4" size="sm" weight="semibold" className="text-blue-600 dark:text-blue-400 mb-2">
                2. Vectorize
              </Typography>
              <Typography variant="p" size="xs" color="muted">
                Create semantic embeddings and store in vector database
              </Typography>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-green-500/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <FileSearch className="w-8 h-8 text-green-500" />
              </div>
              <Typography variant="h4" size="sm" weight="semibold" className="text-green-600 dark:text-green-400 mb-2">
                3. Retrieve
              </Typography>
              <Typography variant="p" size="xs" color="muted">
                Find relevant content using semantic search
              </Typography>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-purple-500/10 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Brain className="w-8 h-8 text-purple-500" />
              </div>
              <Typography variant="h4" size="sm" weight="semibold" className="text-purple-600 dark:text-purple-400 mb-2">
                4. Generate
              </Typography>
              <Typography variant="p" size="xs" color="muted">
                AI creates contextual responses using retrieved content
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
            className="card-hover card-tilt dark:bg-white/5 dark:hover:bg-white/10"
          />
        ))}
      </div>

      {/* Technical Specifications */}
      <div className="mt-12 sm:mt-16">
        <Typography variant="h3" size="xl" weight="bold" color="primary" className="text-center mb-8">
          Technical Specifications
        </Typography>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-background/50 border border-border rounded-lg card-tilt">
            <Typography variant="h4" size="lg" weight="bold" color="primary" className="mb-1">
              16MB
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Max PDF Size
            </Typography>
          </div>
          
          <div className="text-center p-4 bg-background/50 border border-border rounded-lg card-tilt">
            <Typography variant="h4" size="lg" weight="bold" color="primary" className="mb-1">
              1000
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Characters per Chunk
            </Typography>
          </div>
          
          <div className="text-center p-4 bg-background/50 border border-border rounded-lg card-tilt">
            <Typography variant="h4" size="lg" weight="bold" color="primary" className="mb-1">
              1536
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Embedding Dimensions
            </Typography>
          </div>
          
          <div className="text-center p-4 bg-background/50 border border-border rounded-lg card-tilt">
            <Typography variant="h4" size="lg" weight="bold" color="primary" className="mb-1">
              &lt;3s
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Average Response Time
            </Typography>
          </div>
        </div>
      </div>
    </Section>
  );
}