import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModelSelector from './ModelSelector';
import MobileHeader from './MobileHeader';

interface ChatHeaderProps {
  onSave: () => void;
  onMenuClick?: () => void;
  onDocClick?: () => void;
}

export default function ChatHeader({ onSave, onMenuClick, onDocClick }: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-12 sm:h-14">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button 
              onClick={() => navigate('/')}
              className="hidden md:flex items-center justify-center p-1.5 hover:bg-foreground/5 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="hidden text-sm sm:text-base font-medium truncate">
              New Chat
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ModelSelector variant="compact" />
            <button
              onClick={onSave}
              className="p-1.5 sm:p-2 rounded-lg bg-primary/10 hover:bg-primary/20 
                text-primary transition-colors flex items-center gap-1.5 text-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}