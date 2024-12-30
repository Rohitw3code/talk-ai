import React, { useState, useCallback } from 'react';
import { Menu, X, Save } from 'lucide-react';
import DocumentUpload from '../components/chat/DocumentUpload';
import DocumentPreview from '../components/chat/DocumentPreview';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import ResizeHandle from '../components/chat/ResizeHandle';
import SaveChatDialog from '../components/chat/SaveChatDialog';

export default function Chat() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDocPanel, setShowDocPanel] = useState(true);
  const [docPanelWidth, setDocPanelWidth] = useState(50); // percentage
  const [isResizing, setIsResizing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedChats, setSavedChats] = useState<{ id: string; name: string }[]>([]);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const handleResize = (e: MouseEvent) => {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      setDocPanelWidth(Math.min(Math.max(newWidth, 20), 80)); // Limit between 20% and 80%
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, []);

  const handleSaveChat = (name: string) => {
    const newChat = {
      id: Date.now().toString(),
      name
    };
    setSavedChats(prev => [...prev, newChat]);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Document Panel */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-30 md:relative transition-all duration-300 bg-background
          border-r border-foreground/10 flex
          ${showDocPanel ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ width: `${docPanelWidth}%` }}
      >
        <div className="flex-1 overflow-hidden">
          {selectedFile ? (
            <DocumentPreview 
              file={selectedFile} 
              onClose={() => setSelectedFile(null)} 
            />
          ) : (
            <DocumentUpload onFileSelect={setSelectedFile} />
          )}
        </div>
        
        {/* Resize Handle */}
        <div
          onMouseDown={handleResizeStart}
          className={`${isResizing ? 'select-none cursor-col-resize' : ''}`}
        >
          <ResizeHandle />
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col relative">
        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setShowDocPanel(!showDocPanel)}
          className="md:hidden absolute left-4 top-4 z-40 p-2 rounded-lg bg-primary text-primary-foreground"
        >
          {showDocPanel ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <ChatHeader />
        
        {/* Save Button */}
        <button
          onClick={() => setShowSaveDialog(true)}
          className="absolute right-4 top-4 z-40 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 
            text-primary transition-colors flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span className="hidden sm:inline">Save Chat</span>
        </button>

        <MessageList savedChats={savedChats} />
        <MessageInput />
      </div>

      {/* Overlay for mobile when doc panel is open */}
      {showDocPanel && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setShowDocPanel(false)}
        />
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <SaveChatDialog
          onSave={handleSaveChat}
          onClose={() => setShowSaveDialog(false)}
        />
      )}

      {/* Overlay when resizing */}
      {isResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
}