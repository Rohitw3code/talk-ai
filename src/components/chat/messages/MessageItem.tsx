import React from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { Message } from '../../../types/chat';
import MarkdownRenderer from './MarkdownRenderer';
import { useState } from 'react';

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <div className={`inline-block max-w-full rounded-lg relative group ${
          message.sender === 'user' 
            ? 'bg-primary/10 text-foreground/90 px-4 py-3' 
            : 'bg-card/50 backdrop-blur-sm text-foreground/90 p-4 shadow-sm'
        }`}>
          {message.sender === 'ai' && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 
                hover:bg-foreground/5 transition-all duration-200"
              title={copied ? "Copied!" : "Copy response"}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-foreground/70" />
              )}
            </button>
          )}
          <div className={`prose prose-sm max-w-none ${
            message.sender === 'user' ? 'text-right' : ''
          }`}>
            {message.sender === 'ai' ? (
              <MarkdownRenderer content={message.content} />
            ) : (
              <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            )}
          </div>
          <span className="text-xs text-foreground/50 mt-2 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}