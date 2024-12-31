import React, { useState, useCallback } from 'react';
import { Save } from 'lucide-react';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import SaveChatDialog from '../components/chat/SaveChatDialog';
import MobileOverlay from '../components/chat/MobileOverlay';
import LeftPanel from '../components/chat/LeftPanel';
import { useWindowSize } from '../hooks/useWindowSize';

export default function Chat() {
  const { width: windowWidth } = useWindowSize();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDocPanel, setShowDocPanel] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [leftSectionWidth, setLeftSectionWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedChats, setSavedChats] = useState<{ id: string; name: string }[]>([]);

  const isMobile = windowWidth < 768;

  const handleSaveChat = useCallback((name: string) => {
    const newChat = {
      id: crypto.randomUUID(),
      name
    };
    setSavedChats(prev => [...prev, newChat]);
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) return;
    
    setIsResizing(true);

    const handleResize = (e: MouseEvent) => {
      const containerWidth = windowWidth;
      const minWidth = isSidebarCollapsed ? 300 : 400;
      const maxWidth = containerWidth - 400;
      const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
      const widthPercentage = (newWidth / containerWidth) * 100;
      setLeftSectionWidth(widthPercentage);
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [isMobile, isSidebarCollapsed, windowWidth]);

  const toggleDocPanel = useCallback(() => {
    setShowDocPanel(prev => !prev);
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(prev => !prev);
    if (isMobile) {
      setShowDocPanel(false);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <LeftPanel 
        showDocPanel={showDocPanel}
        showSidebar={showSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
        selectedFile={selectedFile}
        isResizing={isResizing}
        width={isMobile ? '100%' : `${leftSectionWidth}%`}
        onSidebarClose={() => setShowSidebar(false)}
        onSidebarCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onFileSelect={setSelectedFile}
        onResizeStart={handleResizeStart}
        isMobile={isMobile}
      />

      <div 
        className={`
          flex-1 flex flex-col bg-background
          transition-all duration-300 min-w-[320px] md:min-w-[400px]
          ${isSidebarCollapsed ? 'md:pl-4' : 'md:pl-6'}
          ${(showDocPanel || showSidebar) && isMobile ? 'hidden' : ''}
        `}
        style={{ width: isMobile ? '100%' : `${100 - leftSectionWidth}%` }}
      >
        <ChatHeader 
          onMenuClick={() => setShowSidebar(true)}
          onDocClick={() => setShowDocPanel(true)}
          onSave={() => setShowSaveDialog(true)}
        />
        
        {/* Mobile Save Button */}
        <button
          onClick={() => setShowSaveDialog(true)}
          className="fixed right-3 top-20 sm:hidden z-40 p-1.5 rounded-lg 
            bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex items-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          <span className="text-xs">Save</span>
        </button>

        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-3 sm:px-4">
          <MessageList savedChats={savedChats} />
          <MessageInput />
        </div>
      </div>

      <MobileOverlay 
        isVisible={isMobile && (showDocPanel || showSidebar)}
        onClose={() => {
          setShowDocPanel(false);
          setShowSidebar(false);
        }}
      />

      {showSaveDialog && (
        <SaveChatDialog
          onSave={handleSaveChat}
          onClose={() => setShowSaveDialog(false)}
        />
      )}

      {isResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}    </div>
  );
}