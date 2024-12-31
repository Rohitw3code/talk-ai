import React from 'react';
import { PanelLeft, FileText } from 'lucide-react';

interface MobileControlsProps {
  onToggleSidebar: () => void;
  onToggleDocPanel: () => void;
}

export default function MobileControls({ onToggleSidebar, onToggleDocPanel }: MobileControlsProps) {
  return (
    <div className="fixed top-4 left-4 z-50 flex gap-2 md:hidden">
      <button 
        onClick={onToggleSidebar}
        className="p-2 rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Toggle navigation"
      >
        <PanelLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={onToggleDocPanel}
        className="p-2 rounded-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Toggle document preview"
      >
        <FileText className="w-5 h-5" />
      </button>
    </div>
  );
}