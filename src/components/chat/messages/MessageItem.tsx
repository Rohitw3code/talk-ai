import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../../../types/chat';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  return (
    <div
      className={`flex gap-4 items-start ${
        message.sender === 'user' ? 'flex-row-reverse' : ''
      }`}
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        {message.sender === 'user' ? (
          <User className="w-4 h-4 text-primary" />
        ) : (
          <Bot className="w-4 h-4 text-primary" />
        )}
      </div>
      <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
        <div className={`inline-block bg-card p-4 rounded-lg ${
          message.sender === 'user' 
            ? 'bg-primary/10 text-foreground' 
            : 'bg-card text-foreground'
        }`}>
          <p className="text-sm sm:text-base">{message.content}</p>
          <span className="text-xs text-muted-foreground mt-2 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}