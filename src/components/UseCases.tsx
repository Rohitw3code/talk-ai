import React from 'react';
import { BookOpen, Brain, FileQuestion, FileSearch, FileText, GraduationCap } from 'lucide-react';
import UseCaseCard from './ui/UseCaseCard';

const useCases = [
  {
    icon: FileQuestion,
    title: "Interview Preparation",
    description: "Generate practice questions, mock scenarios, and detailed explanations for job interviews",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: GraduationCap,
    title: "Exam Preparation",
    description: "Create study guides, practice tests, and comprehensive summaries from your course materials",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: FileSearch,
    title: "Document Analysis",
    description: "Extract key insights, generate summaries, and identify important patterns in your documents",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: Brain,
    title: "Content Generation",
    description: "Transform your ideas into well-structured content with AI-powered writing assistance",
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: BookOpen,
    title: "Research Assistant",
    description: "Analyze research papers, extract methodologies, and generate literature reviews",
    gradient: "from-indigo-500/20 to-blue-500/20"
  },
  {
    icon: FileText,
    title: "Document Reconstruction",
    description: "Reorganize and restructure documents for better clarity and coherence",
    gradient: "from-pink-500/20 to-rose-500/20"
  }
];

export default function UseCases() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 neon-glow">Powerful Use Cases</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">Transform your documents into actionable insights</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={index} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}