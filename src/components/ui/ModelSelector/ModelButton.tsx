import React from 'react';
import { Brain } from 'lucide-react';
import { useRipple } from '../../../hooks/useRipple';
import { Model } from './types';

interface ModelButtonProps {
  model: Model;
  isSelected: boolean;
  isAnimating: boolean;
  onClick: () => void;
}

export function ModelButton({ model, isSelected, isAnimating, onClick }: ModelButtonProps) {
  const { createRipple } = useRipple();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`model-button ${isSelected ? 'selected' : ''} ${isAnimating ? 'animating' : ''}`}
      style={{'--model-gradient': `${model.color}`} as React.CSSProperties}
    >
      <Brain className="model-icon" />
      <span className="model-name">{model.name}</span>
      {isSelected && <div className="model-glow" />}
    </button>
  );
}