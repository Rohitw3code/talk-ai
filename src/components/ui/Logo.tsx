import React from 'react';
import { MessageSquareText } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-1.5">
      <div className="relative">
        <MessageSquareText className="h-6 w-6 text-primary" />
        <div className="absolute -inset-0.5 animate-pulse rounded-full bg-primary/20" />
      </div>
      <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400">
        Talk.AI
      </span>
    </div>
  );
}