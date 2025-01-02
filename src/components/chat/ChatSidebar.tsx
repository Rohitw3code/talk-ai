import React from 'react';
import { MessageSquare, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import RecentChats from './RecentChats';
import SidebarSettings from './SidebarSettings';

interface ChatSidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
  isMobile: boolean;
}

export default function ChatSidebar({ 
  isOpen, 
  isCollapsed, 
  onClose, 
  onToggleCollapse,
  isMobile
}: ChatSidebarProps) {
  return (
    <>
      <div 
        className={`
          fixed inset-y-0 left-0 z-40 bg-background border-r border-foreground/10
          transition-all duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-16' : 'w-64'}
          md:relative md:translate-x-0
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-foreground/10 md:hidden">
          <h2 className="font-semibold">Navigation</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-foreground/5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Desktop Header with Collapse Button */}
        <div className="hidden md:flex items-center justify-between p-4 border-b border-foreground/10">
          {!isCollapsed && <h2 className="font-semibold">Navigation</h2>}
          <button 
            onClick={onToggleCollapse}
            className="p-2 hover:bg-foreground/5 rounded-lg ml-auto"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
          <button className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground 
            rounded-lg p-3 flex items-center justify-center gap-2 mb-4 ${isCollapsed ? 'px-2' : 'px-3'}`}
          >
            <MessageSquare className="w-4 h-4" />
            {!isCollapsed && <span>New Chat</span>}
          </button>

          {/* Only show ModelSelector on mobile */}
          {isMobile && !isCollapsed && (
            <div className="mb-4">
              <ModelSelector />
            </div>
          )}
          
          <div className="mt-4">
            <RecentChats isCollapsed={isCollapsed} />
          </div>
          
          {!isCollapsed && <SidebarSettings />}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}