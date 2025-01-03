export interface Model {
  id: string;
  name: string;
  shortName: string;
}

export const models: Model[] = [
  { 
    id: 'gpt4',
    name: 'GPT-4',
    shortName: 'GPT-4'
  },
  {
    id: 'claude',
    name: 'Claude 3',
    shortName: 'Claude'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    shortName: 'Gemini'
  },
  {
    id: 'groq',
    name: 'Groq',
    shortName: 'Groq'
  }
];