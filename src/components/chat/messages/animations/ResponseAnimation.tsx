import React from 'react';
import ThinkingAnimation from './ThinkingAnimation';
import TypingIndicator from '../TypingIndicator';

interface ResponseAnimationProps {
  stage: 'thinking' | 'typing';
}

export default function ResponseAnimation({ stage }: ResponseAnimationProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {stage === 'thinking' ? (
        <>
          <ThinkingAnimation />
          <p className="text-sm text-muted-foreground">Analyzing your request...</p>
        </>
      ) : (
        <TypingIndicator />
      )}
    </div>
  );
}