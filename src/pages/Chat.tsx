import React, { useState, useCallback, useEffect } from 'react';
import { Save } from 'lucide-react';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import SaveChatDialog from '../components/chat/SaveChatDialog';
import MobileControls from '../components/chat/MobileControls';
import MobileOverlay from '../components/chat/MobileOverlay';
import LeftPanel from '../components/chat/LeftPanel';
import { useWindowSize } from '../hooks/useWindowSize';
import { Message } from '../types/chat';
import { sendMessage, getChatHistory } from '../services/chat/chatService';
import { useChatState } from '../hooks/useChatState';
import { useFileHandling } from '../hooks/useFileHandling';
import { useLayoutState } from '../hooks/useLayoutState';

export default function Chat() {
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 768;

  // Chat state management
  const { 
    messages, 
    setMessages,
    handleSendMessage 
  } = useChatState();

  // File handling
  const {
    selectedFile,
    setSelectedFile
  } = useFileHandling();

  // Layout state management
  const {
    showDocPanel,
    showSidebar,
    isSidebarCollapsed,
    leftSectionWidth,
    isResizing,
    showSaveDialog,
    setShowDocPanel,
    setShowSidebar,
    setIsSidebarCollapsed,
    handleResizeStart,
    setShowSaveDialog
  } = useLayoutState({ isMobile, windowWidth });

  // Load chat history
  useEffect(() => {
    async function loadChatHistory() {
      try {
        const history = await getChatHistory();
        if (history.length > 0) {
          const formattedMessages = history.map(chat => ({
            id: crypto.randomUUID(),
            content: chat.message,
            sender: 'user',
            timestamp: new Date(chat.timestamp)
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }

    loadChatHistory();
  }, [setMessages]);

  const toggleDocPanel = useCallback(() => {
    setShowDocPanel(prev => !prev);
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile, setShowDocPanel, setShowSidebar]);

  const toggleSidebar = useCallback(() => {
    setShowSidebar(prev => !prev);
    if (isMobile) {
      setShowDocPanel(false);
    }
  }, [isMobile, setShowDocPanel, setShowSidebar]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MobileControls 
        onToggleSidebar={toggleSidebar}
        onToggleDocPanel={toggleDocPanel}
      />

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
        onMinimizeDocPanel={() => setShowDocPanel(false)}
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
        <ChatHeader onSave={() => setShowSaveDialog(true)} />
        
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-3 sm:px-4 relative">
          <div className="absolute inset-0 flex flex-col">
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>

      <MobileOverlay 
        isVisible={isMobile && showSidebar}
        onClose={() => {
          setShowDocPanel(false);
          setShowSidebar(false);
        }}
      />

      {showSaveDialog && (
        <SaveChatDialog
          onSave={(name) => {
            // Handle save chat
            setShowSaveDialog(false);
          }}
          onClose={() => setShowSaveDialog(false)}
        />
      )}

      {isResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
}