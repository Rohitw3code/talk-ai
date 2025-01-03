import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { MODELS, DEFAULT_MODEL } from './models/constants';
import CompactSelector from './models/CompactSelector';
import { setSelectedModel, ModelError } from '../../services/model/modelService';
import { toast } from '../../utils/toast';

interface ModelSelectorProps {
  variant?: 'default' | 'compact';
}

export default function ModelSelector({ variant = 'default' }: ModelSelectorProps) {
  const [selectedModel, setSelectedModelState] = useState(DEFAULT_MODEL);
  const [isLoading, setIsLoading] = useState(false);

  const handleModelSelect = async (modelId: string) => {
    setIsLoading(true);
    try {
      const response = await setSelectedModel(modelId);
      setSelectedModelState(response.modelId);
      toast.success('Model updated successfully');
    } catch (error) {
      const message = error instanceof ModelError 
        ? error.message 
        : 'Failed to update model';
      toast.error(message);
      console.error('Model selection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <CompactSelector 
        selectedModel={selectedModel} 
        onModelSelect={handleModelSelect}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="space-y-1">
      <div className="px-2 text-xs font-medium text-muted-foreground mb-2">Model</div>
      <div className="space-y-1">
        {MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => handleModelSelect(model.id)}
            disabled={isLoading}
            className={`w-full p-2 rounded-lg flex items-center gap-2 text-sm transition-colors
              ${selectedModel === model.id 
                ? 'bg-primary/10 text-primary' 
                : 'hover:bg-foreground/5 text-muted-foreground hover:text-foreground'}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Brain className="w-4 h-4" />
            <span className="truncate">{model.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}