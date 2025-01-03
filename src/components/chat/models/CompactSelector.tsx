import React from 'react';
import { ChevronDown, Brain } from 'lucide-react';
import { MODELS } from './constants';
import { ModelButton } from './ModelButton';

interface CompactSelectorProps {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

export default function CompactSelector({ selectedModel, onModelSelect }: CompactSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentModel = MODELS.find(m => m.id === selectedModel) || MODELS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg 
          bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm"
      >
        <Brain className="w-3.5 h-3.5" />
        <span className="truncate max-w-[80px]">{currentModel.shortName}</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-1 w-48 bg-card border border-foreground/10 
            rounded-lg shadow-lg py-1 z-50">
            {MODELS.map((model) => (
              <ModelButton
                key={model.id}
                model={model}
                isSelected={selectedModel === model.id}
                onClick={() => {
                  onModelSelect(model.id);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}