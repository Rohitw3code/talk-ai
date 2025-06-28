import React, { useState } from 'react';
import { Brain, Zap, Star, Sparkles, Bot, Cpu } from 'lucide-react';

const models = [
  { 
    name: 'Claude 3.5 Sonnet', 
    icon: Brain, 
    status: 'Available',
    description: 'Advanced reasoning & analysis',
    color: 'text-orange-500'
  },
  { 
    name: 'GPT-4 Turbo', 
    icon: Zap, 
    status: 'Available',
    description: 'Fast & versatile',
    color: 'text-green-500'
  },
  { 
    name: 'Gemini Pro', 
    icon: Star, 
    status: 'Available',
    description: 'Multimodal capabilities',
    color: 'text-blue-500'
  },
  { 
    name: 'Grok-2', 
    icon: Sparkles, 
    status: 'Available',
    description: 'Real-time insights',
    color: 'text-purple-500'
  },
  { 
    name: 'Llama 3.1', 
    icon: Bot, 
    status: 'Available',
    description: 'Open-source power',
    color: 'text-indigo-500'
  },
  { 
    name: 'Claude 3 Haiku', 
    icon: Cpu, 
    status: 'Available',
    description: 'Lightning fast',
    color: 'text-pink-500'
  },
];

export default function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-background/30 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Choose Your AI Model</h3>
          <p className="text-sm text-muted-foreground">Select the perfect AI model for your task</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {models.map((model, index) => (
            <button
              key={index}
              onClick={() => setSelectedModel(index)}
              className={`group relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedModel === index
                  ? 'border-primary bg-primary/10 shadow-lg scale-105'
                  : 'border-border bg-background/50 hover:border-primary/30 hover:bg-background/70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${selectedModel === index ? 'bg-primary/20' : 'bg-secondary/50'} transition-colors`}>
                  <model.icon className={`w-5 h-5 ${selectedModel === index ? 'text-primary' : model.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium text-sm ${selectedModel === index ? 'text-primary' : 'text-foreground'} truncate`}>
                      {model.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedModel === index && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>
              )}
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </button>
          ))}
        </div>
        
        {/* Selected model info */}
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-center gap-3">
            {(() => {
              const SelectedIcon = models[selectedModel].icon;
              return <SelectedIcon className={`w-6 h-6 ${models[selectedModel].color}`} />;
            })()}
            <div>
              <h4 className="font-semibold text-foreground">{models[selectedModel].name}</h4>
              <p className="text-sm text-muted-foreground">{models[selectedModel].description}</p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}