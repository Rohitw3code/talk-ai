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
      className="absolute top-4 right-4 p-2 rounded-lg bg-foreground/5 
        hover:bg-foreground/10 transition-colors"
      aria-label="Close document panel"
    >
      <X className="w-5 h-5" />
    </button>
  );
}