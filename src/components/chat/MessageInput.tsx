import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, FileText } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'inherit';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-none border-t border-foreground/10 bg-background p-4">
      <div className="relative max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border border-foreground/10 bg-card p-3 pr-12 md:pr-24 
            resize-none min-h-[56px] max-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Type your message..."
          rows={1}
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button className="hidden md:block p-2 rounded-lg hover:bg-foreground/5 text-muted-foreground hover:text-foreground">
            <Image className="w-5 h-5" />
          </button>
          <button className="hidden md:block p-2 rounded-lg hover:bg-foreground/5 text-muted-foreground hover:text-foreground">
            <FileText className="w-5 h-5" />
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}