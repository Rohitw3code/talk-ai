import React from 'react';
import { BookOpen, Brain, FileQuestion, FileSearch, FileText, GraduationCap, Briefcase, Scale, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import UseCaseCard from './ui/UseCaseCard';
import Typography from './ui/Typography';
import Section from './ui/Section';

const useCases = [
  {
    icon: GraduationCap,
    title: "Academic Research & Study",
    description: "Analyze research papers, extract methodologies, generate literature reviews, and create comprehensive study guides from academic materials",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Briefcase,
    title: "Business Intelligence",
    description: "Extract insights from reports, analyze market research, summarize business documents, and generate executive briefings",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Scale,
    title: "Legal Document Analysis",
    description: "Review contracts, analyze legal documents, extract key clauses, identify risks, and ensure compliance with regulations",
    gradient: "from-purple-500/20 to-indigo-500/20"
  },
  {
    icon: FileQuestion,
    title: "Interview & Exam Preparation",
    description: "Generate practice questions, create mock scenarios, extract key concepts, and prepare comprehensive study materials",
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: TrendingUp,
    title: "Financial Analysis",
    description: "Analyze financial reports, extract key metrics, identify trends, and generate investment insights from financial documents",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Users,
    title: "HR & Training Materials",
    description: "Process employee handbooks, training manuals, policy documents, and create interactive learning experiences",
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    icon: Shield,
    title: "Compliance & Risk Management",
    description: "Review regulatory documents, ensure policy compliance, identify potential risks, and maintain audit trails",
    gradient: "from-indigo-500/20 to-purple-500/20"
  },
  {
    icon: Brain,
    title: "Technical Documentation",
    description: "Analyze technical manuals, extract procedures, understand complex systems, and create simplified explanations",
    gradient: "from-teal-500/20 to-cyan-500/20"
  },
  {
    icon: BookOpen,
    title: "Content Creation & Writing",
    description: "Transform research into articles, generate content outlines, extract quotes and references, and create structured content",
    gradient: "from-violet-500/20 to-purple-500/20"
  }
];

export default function UseCases() {
  return (
    <Section background="gradient">
      <div className="text-center mb-12 sm:mb-16">
        <Typography variant="h2" size="3xl" weight="bold" color="primary" className="sm:text-4xl mb-4 neon-glow">
          RAG-Powered Use Cases
        </Typography>
        <Typography variant="p" size="lg" color="muted" className="sm:text-xl max-w-3xl mx-auto">
          Transform your documents into actionable insights across industries and use cases with 
          intelligent RAG technology
        </Typography>
      </div>

      {/* Industry Statistics */}
      <div className="mb-12 sm:mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl card-tilt">
            <div className="p-3 bg-blue-500/20 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-500" />
            </div>
            <Typography variant="h4" size="xl" weight="bold" color="primary" className="mb-1">
              85%
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Faster Document Analysis
            </Typography>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl card-tilt">
            <div className="p-3 bg-green-500/20 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <Typography variant="h4" size="xl" weight="bold" color="primary" className="mb-1">
              95%
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Accuracy in Responses
            </Typography>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl card-tilt">
            <div className="p-3 bg-purple-500/20 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <Typography variant="h4" size="xl" weight="bold" color="primary" className="mb-1">
              50+
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Industries Supported
            </Typography>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl card-tilt">
            <div className="p-3 bg-orange-500/20 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-500" />
            </div>
            <Typography variant="h4" size="xl" weight="bold" color="primary" className="mb-1">
              1M+
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Documents Processed
            </Typography>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {useCases.map((useCase, index) => (
          <UseCaseCard key={index} {...useCase} />
        ))}
      </div>

      {/* RAG Benefits */}
      <div className="mt-12 sm:mt-16">
        <Typography variant="h3" size="xl" weight="bold" color="primary" className="text-center mb-8">
          Why RAG Technology?
        </Typography>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-background/50 border border-border rounded-xl card-tilt">
            <div className="p-3 bg-green-500/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-500" />
            </div>
            <Typography variant="h4" size="base" weight="semibold" color="primary" className="mb-2">
              Accurate Responses
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Grounded in your actual document content, reducing AI hallucinations
            </Typography>
          </div>
          
          <div className="text-center p-6 bg-background/50 border border-border rounded-xl card-tilt">
            <div className="p-3 bg-blue-500/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
            <Typography variant="h4" size="base" weight="semibold" color="primary" className="mb-2">
              Context Awareness
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Understands document structure and maintains conversational context
            </Typography>
          </div>
          
          <div className="text-center p-6 bg-background/50 border border-border rounded-xl card-tilt">
            <div className="p-3 bg-purple-500/20 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <Typography variant="h4" size="base" weight="semibold" color="primary" className="mb-2">
              Real-time Processing
            </Typography>
            <Typography variant="p" size="sm" color="muted">
              Instant document processing and lightning-fast response generation
            </Typography>
          </div>
        </div>
      </div>
    </Section>
  );
}