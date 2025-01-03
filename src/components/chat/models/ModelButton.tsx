import React from 'react';
import { Brain } from 'lucide-react';
import { Model } from './types';

interface ModelButtonProps {
  model: Model;
  isSelected: boolean;
  onClick: () => void;
}

export function ModelButton({ model, isSelected, onClick }: ModelButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 text-left text-sm hover:bg-foreground/5 
        flex items-center gap-2 ${isSelected ? 'text-primary' : 'text-foreground'}`}
    >
      <Brain className="w-4 h-4" />
      <span className="truncate">{model.name}</span>
    </button>
  );
}