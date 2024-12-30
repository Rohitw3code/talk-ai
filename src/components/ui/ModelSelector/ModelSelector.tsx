import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { models } from './models';
import { ModelButton } from './ModelButton';
import './ModelSelector.css';

export default function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState('gpt4');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleModelSelect = (modelId: string) => {
    if (selectedModel === modelId || isAnimating) return;
    
    setIsAnimating(true);
    setSelectedModel(modelId);
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="model-selector-container">
      {models.map((model) => (
        <ModelButton
          key={model.id}
          model={model}
          isSelected={selectedModel === model.id}
          isAnimating={isAnimating}
          onClick={() => handleModelSelect(model.id)}
        />
      ))}
    </div>
  );
}