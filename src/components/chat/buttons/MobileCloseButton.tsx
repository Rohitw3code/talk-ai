import React from 'react';
import { X } from 'lucide-react';

interface MobileCloseButtonProps {
  onClick: () => void;
}

export default function MobileCloseButton({ onClick }: MobileCloseButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg 
        bg-foreground/10 hover:bg-foreground/20 text-foreground transition-colors"
      aria-label="Close document preview"
    >
      <X className="w-5 h-5" />
    </button>
  );
}