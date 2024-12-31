import { LucideIcon, Brain, Sparkles, Zap, Bot } from 'lucide-react';

export interface Model {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  color: string;
}

export const models: Model[] = [
  { 
    id: 'gpt4',
    name: 'GPT-4',
    shortName: 'GPT-4',
    icon: Brain,
    color: 'from-green-500 to-emerald-700'
  },
  {
    id: 'claude',
    name: 'Claude 3',
    shortName: 'Claude',
    icon: Sparkles,
    color: 'from-orange-500 to-red-700'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    shortName: 'Gemini',
    icon: Zap,
    color: 'from-blue-500 to-indigo-700'
  },
  {
    id: 'groq',
    name: 'Groq',
    shortName: 'Groq',
    icon: Bot,
    color: 'from-purple-500 to-pink-700'
  }
];