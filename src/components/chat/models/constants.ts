import { Model } from './types';

export const MODELS: Model[] = [
  {
    id: 'gemma2-9b-it',
    name: 'Gemma 2 9B',
    shortName: 'Gemma',
    type: 'groq',
    contextLength: 8192
  },
  {
    id: 'llama3-groq-70b-8192-tool-use-preview',
    name: 'LLaMA 3 70B Tool',
    shortName: 'LLaMA Tool',
    type: 'groq',
    contextLength: 8192
  },
  {
    id: 'llama-3.2-90b-vision-preview',
    name: 'LLaMA 3.2 90B Vision',
    shortName: 'LLaMA Vision',
    type: 'groq',
    contextLength: 8192
  }
];

export const DEFAULT_MODEL = MODELS[0].id;