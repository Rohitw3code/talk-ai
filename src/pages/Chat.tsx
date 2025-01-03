import React, { useState, useCallback, useRef } from 'react';
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
import { sendMessage } from '../services/chat/chatService';

export default function Chat() {
  const { width: windowWidth } = useWindowSize();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDocPanel, setShowDocPanel] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [leftSectionWidth, setLeftSectionWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedChats, setSavedChats] = useState<{ id: string; name: string }[]>([]);

  const isMobile = windowWidth < 768;

  const handleSendMessage = useCallback(async (content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await sendMessage(content, selectedFile?.name);
      
      if (response) {
        const reader = response.getReader();
        let aiResponse = '';
        
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: '',
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          // Convert the Uint8Array to string
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const content = line.slice(6);
              aiResponse += content;
              
              // Update the AI message with accumulated response
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessage.id 
                  ? { ...msg, content: aiResponse }
                  : msg
              ));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error appropriately
    }
  }, [selectedFile]);

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
            <MessageList messages={messages} savedChats={savedChats} />
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
          onSave={handleSaveChat}
          onClose={() => setShowSaveDialog(false)}
        />
      )}

      {isResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
}