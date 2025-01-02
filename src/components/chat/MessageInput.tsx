import React from 'react';
import { Send } from 'lucide-react';
import MobileUploadButton from './upload/MobileUploadButton';

interface MessageInputProps {
  onFileSelect?: (file: File) => void;
}

export default function MessageInput({ onFileSelect }: MessageInputProps) {
  return (
    <div className="border-t border-foreground/10 p-4">
      <div className="relative">
        <textarea
          className="w-full rounded-lg border border-foreground/10 bg-card p-3 pr-24
            resize-none h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Type your message..."
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          {onFileSelect && <MobileUploadButton onFileSelect={onFileSelect} />}
          <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}