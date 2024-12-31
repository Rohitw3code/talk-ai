import React from 'react';
import { Save, Share } from 'lucide-react';

interface ActionButtonsProps {
  onSave: () => void;
}

export default function ActionButtons({ onSave }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onSave}
        className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 
          hover:bg-primary/20 text-primary transition-colors"
      >
        <Save className="w-4 h-4" />
        <span className="text-sm">Save</span>
      </button>
      
      <button className="p-2 hover:bg-foreground/5 rounded-lg text-muted-foreground 
        hover:text-foreground transition-colors"
      >
        <Share className="w-4 h-4" />
      </button>
    </div>
  );
}