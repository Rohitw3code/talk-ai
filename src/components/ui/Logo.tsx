import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <MessageCircle className="h-8 w-8 text-primary" />
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
      </div>
      <span className="text-xl font-bold text-foreground">TalkKAI</span>
    </div>
  );
}