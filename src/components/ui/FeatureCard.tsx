import React, { useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ icon: Icon, title, description, className = '' }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`card-3d group bg-card/50 dark:bg-card/30 backdrop-blur-sm p-8 rounded-xl border border-foreground/5 
        shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="card-3d-content">
        <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 
          w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 
          transition-transform duration-300 relative">
          <Icon className="w-7 h-7 text-primary group-hover:text-primary/80 transition-colors relative z-10" />
          <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-xl blur-lg opacity-50 
            group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-foreground neon-glow">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}