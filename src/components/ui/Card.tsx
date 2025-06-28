import React from 'react';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  tilt?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  default: 'bg-background border border-border',
  elevated: 'bg-background shadow-lg border border-border',
  outlined: 'bg-transparent border-2 border-border',
  glass: 'glass-effect'
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
};

export default function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  tilt = false,
  className = '',
  children,
  ...props
}: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  const classes = `
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${hover ? 'card-hover' : ''}
    ${tilt ? 'card-tilt' : ''}
    rounded-xl transition-all duration-300
    ${className}
  `.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}