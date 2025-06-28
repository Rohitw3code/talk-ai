import React from 'react';
import { ArrowLeft, Settings, MoreVertical, Menu, FileText, Loader, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import Typography from '../ui/Typography';
import { Document } from '../../api/client';

interface ChatHeaderProps {
  onMenuClick?: () => void;
  currentDocument?: Document | null;
  uploading?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export default function ChatHeader({ 
  onMenuClick, 
  currentDocument, 
  uploading = false, 
  sidebarOpen = false,
  onSidebarToggle 
}: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Left side */}
        <div className="flex items-center space-x-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-accent rounded-lg transition-colors lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={onSidebarToggle}
            className="hidden lg:flex p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-5 h-5 text-foreground" />
            ) : (
              <PanelLeftOpen className="w-5 h-5 text-foreground" />
            )}
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-accent rounded-lg transition-colors sm:hidden"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          
          {/* Logo - hidden on mobile */}
          <div className="hidden sm:block">
            <Logo />
          </div>
        </div>

        {/* Center - Current document or upload status */}
        <div className="hidden sm:flex items-center justify-center flex-1 max-w-md mx-4">
          {uploading ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
              <Loader className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
              <Typography variant="span" size="sm" className="text-blue-700 dark:text-blue-400 font-medium">
                Processing document...
              </Typography>
            </div>
          ) : currentDocument ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full max-w-full">
              <FileText className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <Typography variant="span" size="sm" weight="medium" className="text-green-700 dark:text-green-400 truncate">
                {currentDocument.filename}
              </Typography>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
            </div>
          ) : (
            <Typography variant="h3" size="base" weight="medium" color="muted">
              AI Assistant
            </Typography>
          )}
        </div>

        {/* Mobile center - processing status only */}
        <div className="sm:hidden flex-1 flex justify-center">
          {uploading ? (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
              <Loader className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
              <Typography variant="span" size="sm" className="text-blue-700 dark:text-blue-400 font-medium">
                Processing...
              </Typography>
            </div>
          ) : null}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            className="p-2 hover:bg-accent rounded-lg transition-colors hidden sm:block"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-foreground" />
          </button>
          <button
            className="p-2 hover:bg-accent rounded-lg transition-colors sm:hidden"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}