import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DocPanelToggleProps {
  isExpanded: boolean;
  onClick: () => void;
}

export default function DocPanelToggle({ isExpanded, onClick }: DocPanelToggleProps) {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10
        p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary 
        transition-colors shadow-lg"
      title={isExpanded ? "Minimize document panel" : "Expand document panel"}
      aria-label={isExpanded ? "Minimize document panel" : "Expand document panel"}
    >
      {isExpanded ? (
        <ChevronRight className="w-4 h-4" />
      ) : (
        <ChevronLeft className="w-4 h-4" />
      )}
    </button>
  );
}