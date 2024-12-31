import React from 'react';
import { X } from 'lucide-react';

interface MobileCloseButtonProps {
  onClick: () => void;
}

export default function MobileCloseButton({ onClick }: MobileCloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed top-20 right-3 z-50 p-2 rounded-lg bg-primary/10 
        hover:bg-primary/20 text-primary transition-colors"
      aria-label="Close document preview"
    >
      <X className="w-4 h-4" />
    </button>
  );
}