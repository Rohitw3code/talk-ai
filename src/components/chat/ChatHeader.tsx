import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ModelSelector from './ModelSelector';
import MobileHeader from './MobileHeader';
import ActionButtons from './header/ActionButtons';

interface ChatHeaderProps {
  onMenuClick: () => void;
  onDocClick: () => void;
  onSave: () => void;
}

export default function ChatHeader({ onMenuClick, onDocClick, onSave }: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="border-b border-foreground/10 px-3 py-2.5 sm:p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <MobileHeader onMenuClick={onMenuClick} onDocClick={onDocClick} />
          <button 
            onClick={() => navigate('/')}
            className="hidden md:block p-1.5 sm:p-2 hover:bg-foreground/5 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <h1 className="text-base sm:text-lg font-medium sm:font-semibold truncate">
            New Chat
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ModelSelector variant="compact" />
          </div>
          <ActionButtons onSave={onSave} />
        </div>
      </div>
    </div>
  );
}