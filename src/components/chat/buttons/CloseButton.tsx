import React from 'react';
import { X } from 'lucide-react';

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="absolute top-4 right-4 p-3 rounded-lg bg-foreground/5 
        hover:bg-foreground/10 transition-colors min-w-[44px] min-h-[44px]
        flex items-center justify-center"
      aria-label="Close document panel"
    >
      <X className="w-6 h-6" />
    </button>
  );
}