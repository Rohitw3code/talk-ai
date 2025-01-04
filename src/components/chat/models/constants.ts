import { Model } from './types';

export const VISION_MODELS: Model[] = [
  {
    id: 'llama-3.2-90b-vision-preview',
    name: 'LLaMA 3.2 90B Vision',
    shortName: 'LLaMA Vision 90B',
    type: 'groq',
    contextLength: 8192
  },
  {
    id: 'llama-3.2-11b-vision-preview',
    name: 'LLaMA 3.2 11B Vision',
    shortName: 'LLaMA Vision 11B',
    type: 'groq',
    contextLength: 8192
  }
];

export const DEFAULT_MODELS: Model[] = [
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
  }
];

export const DEFAULT_MODEL = DEFAULT_MODELS[0].id;