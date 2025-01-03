import React from 'react';
import { useScrollToBottom } from '../../../hooks/useScrollToBottom';

interface ScrollableContainerProps {
  children: React.ReactNode;
  className?: string;
  dependencies: any[];
}

export default function ScrollableContainer({ 
  children, 
  className = '', 
  dependencies 
}: ScrollableContainerProps) {
  const { scrollRef, handleScroll } = useScrollToBottom({ dependencies });

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`h-full overflow-y-auto scrollbar-thin scrollbar-thumb-foreground/10 
        hover:scrollbar-thumb-foreground/20 scrollbar-track-transparent ${className}`}
    >
      {children}
    </div>
  );
}