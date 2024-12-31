import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Model, models } from './ModelConfig';

interface CompactSelectorProps {
  selectedModel: string;
  onModelSelect: (modelId: string) => void;
}

export default function CompactSelector({ selectedModel, onModelSelect }: CompactSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const currentModel = models.find(m => m.id === selectedModel)!;
  const Icon = currentModel.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 p-2 rounded-lg 
          bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="w-4 h-4 shrink-0" />
          <span className="text-sm truncate">{currentModel.shortName}</span>
        </div>
        <ChevronDown className="w-4 h-4 shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-card border border-foreground/10 
          rounded-lg shadow-lg py-1 z-50">
          {models.map((model) => {
            const ModelIcon = model.icon;
            return (
              <button
                key={model.id}
                onClick={() => {
                  onModelSelect(model.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-foreground/5 
                  flex items-center gap-2 ${selectedModel === model.id ? 'text-primary' : 'text-foreground'}`}
              >
                <ModelIcon className="w-4 h-4" />
                <span className="truncate">{model.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}