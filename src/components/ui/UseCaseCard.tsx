import React from 'react';
import { LucideIcon } from 'lucide-react';

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export default function UseCaseCard({ icon: Icon, title, description, gradient }: UseCaseCardProps) {
  return (
    <div className="group relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 
        group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative bg-card/50 dark:bg-card/30 backdrop-blur-sm p-8 rounded-2xl 
        border border-foreground/5 hover:border-primary/20 transition-colors duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold neon-glow">{title}</h3>
        </div>
        
        <p className="text-muted-foreground">{description}</p>
        
        <div className="mt-6 flex items-center text-primary">
          <span className="text-sm font-medium group-hover:underline">Learn more</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}