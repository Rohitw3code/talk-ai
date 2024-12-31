import React from 'react';
import { models } from './models/ModelConfig';
import CompactSelector from './models/CompactSelector';

interface ModelSelectorProps {
  variant?: 'default' | 'compact';
}

export default function ModelSelector({ variant = 'default' }: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = React.useState('gpt4');

  if (variant === 'compact') {
    return <CompactSelector selectedModel={selectedModel} onModelSelect={setSelectedModel} />;
  }

  return (
    <div className="space-y-1">
      <div className="px-2 text-xs font-medium text-muted-foreground mb-2">Model</div>
      <div className="space-y-1">
        {models.map((model) => {
          const Icon = model.icon;
          return (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`w-full p-2 rounded-lg flex items-center gap-2 text-sm transition-colors
                ${selectedModel === model.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'hover:bg-foreground/5 text-muted-foreground hover:text-foreground'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span className="truncate">{model.shortName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}