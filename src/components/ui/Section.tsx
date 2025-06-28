import React from 'react';

interface SectionProps {
  id?: string;
  background?: 'default' | 'gradient' | 'pattern';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

const backgroundClasses = {
  default: 'bg-background',
  gradient: 'bg-gradient-to-b from-background/50 to-background',
  pattern: 'relative bg-background'
};

const paddingClasses = {
  sm: 'py-12',
  md: 'py-16 sm:py-20',
  lg: 'py-16 sm:py-24',
  xl: 'py-20 sm:py-32'
};

export default function Section({
  id,
  background = 'default',
  padding = 'lg',
  className = '',
  children,
  ...props
}: SectionProps & React.HTMLAttributes<HTMLElement>) {
  const classes = `
    relative overflow-hidden
    ${backgroundClasses[background]}
    ${paddingClasses[padding]}
    ${className}
  `.trim();

  return (
    <section id={id} className={classes} {...props}>
      {background === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}