import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WelcomeMessage() {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1">
        <div className="bg-card p-4 rounded-lg">
          <p className="text-foreground">
            Hello! I'm your AI assistant. How can I help you today?
          </p>
        </div>
      </div>
    </div>
  );
}