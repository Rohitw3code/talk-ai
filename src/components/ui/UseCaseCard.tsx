import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

export default function UseCaseCard({ icon: Icon, title, description, gradient }: UseCaseCardProps) {
  return (
    <div className="group relative p-6 bg-background/50 backdrop-blur-sm border border-border rounded-xl 
      transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:translate-y-[-4px] card-tilt interactive-glow">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl opacity-0 
        group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 
          group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 transform">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-secondary-foreground transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
}