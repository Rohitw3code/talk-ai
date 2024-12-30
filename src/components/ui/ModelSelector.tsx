import React, { useState } from 'react';
import { Brain } from 'lucide-react';

const models = [
  { id: 'gpt4', name: 'GPT-4', color: 'from-green-500 to-emerald-700' },
  { id: 'claude', name: 'Claude 3', color: 'from-orange-500 to-red-700' },
  { id: 'gemini', name: 'Gemini', color: 'from-blue-500 to-indigo-700' },
  { id: 'groq', name: 'Groq', color: 'from-purple-500 to-pink-700' },
];

export default function ModelSelector() {
  const [selectedModel, setSelectedModel] = useState('gpt4');

  return (
    <div className="inline-flex p-1 bg-card/30 dark:bg-card/20 backdrop-blur-sm rounded-xl border border-foreground/5">
      {models.map((model) => (
        <button
          key={model.id}
          onClick={() => setSelectedModel(model.id)}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedModel === model.id
              ? `bg-background dark:bg-background/50 shadow-md bg-gradient-to-r ${model.color} text-white`
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Brain className="w-4 h-4 mr-2" />
          {model.name}
        </button>
      ))}
    </div>
  );
}