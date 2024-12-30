import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  icon: Icon,
  className = '',
  onClick
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-xl text-base font-semibold transform transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90 shadow-primary/25",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary/10 dark:text-secondary-foreground dark:hover:bg-secondary/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}