import React from 'react';
import { Menu, FileText } from 'lucide-react';

interface MobileHeaderProps {
  onMenuClick: () => void;
  onDocClick: () => void;
}

export default function MobileHeader({ onMenuClick, onDocClick }: MobileHeaderProps) {
  return (
    <div className="flex items-center gap-2 md:hidden">
      <button
        onClick={onMenuClick}
        className="p-1.5 hover:bg-foreground/5 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>
      <button
        onClick={onDocClick}
        className="p-1.5 hover:bg-foreground/5 rounded-lg transition-colors"
        aria-label="Toggle document preview"
      >
        <FileText className="w-5 h-5" />
      </button>
    </div>
  );
}