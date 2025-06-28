import React from 'react';
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import Typography from '../ui/Typography';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex gap-3 sm:gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar for AI messages */}
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
      )}

      {/* Message content */}
      <div className={`flex-1 max-w-[85%] sm:max-w-[75%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-3 sm:p-4 rounded-2xl transition-all duration-200 ${
          isUser
            ? 'bg-primary text-primary-foreground ml-auto rounded-br-md hover:bg-primary/90'
            : 'bg-secondary/50 text-foreground rounded-bl-md hover:bg-secondary/70 border border-border/50'
        }`}>
          <Typography
            variant="p"
            size="sm"
            className={`leading-relaxed whitespace-pre-wrap break-words ${
              isUser ? 'text-primary-foreground' : 'text-foreground'
            }`}
          >
            {message.content}
          </Typography>
        </div>

        {/* Message actions (AI messages only) */}
        {!isUser && (
          <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={copyToClipboard}
              className="p-1.5 hover:bg-accent rounded-md transition-colors"
              aria-label="Copy message"
            >
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button
              className="p-1.5 hover:bg-accent rounded-md transition-colors"
              aria-label="Like message"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button
              className="p-1.5 hover:bg-accent rounded-md transition-colors"
              aria-label="Dislike message"
            >
              <ThumbsDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* Timestamp */}
        <Typography
          variant="span"
          size="xs"
          color="muted"
          className={`block mt-1 ${isUser ? 'text-right' : 'text-left'}`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </div>

      {/* Avatar for user messages */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}