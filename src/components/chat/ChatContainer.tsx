import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatSidebar from './ChatSidebar';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatWelcome from './ChatWelcome';
import DocumentUpload from './DocumentUpload';
import Typography from '../ui/Typography';
import { useUpload, useChat, useApi } from '../../hooks/useApi';
import { apiClient, Document } from '../../api/client';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  files?: File[];
}

export default function ChatContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { uploadFile, uploading, uploadError } = useUpload();
  const { messages, sendMessage, loading: chatLoading, error: chatError, clearMessages } = useChat(currentDocument?.id || null);
  const documentsApi = useApi<{ documents: Document[]; total: number }>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load documents on component mount
    documentsApi.execute(() => apiClient.listDocuments());
  }, []);

  // Auto-close sidebar on mobile, keep open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-close sidebar on mobile after document selection
  useEffect(() => {
    if (currentDocument && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [currentDocument]);

  const handleFileUpload = async (files: File[]) => {
    try {
      setShowUpload(false);
      setUploadSuccess(false);
      
      // For now, handle only the first PDF file
      const pdfFile = files.find(file => file.type === 'application/pdf');
      if (!pdfFile) {
        throw new Error('Please select a PDF file');
      }

      const result = await uploadFile(pdfFile);
      
      // Create document object
      const newDocument: Document = {
        id: result.document_id,
        filename: result.filename,
        upload_time: result.upload_time,
        size: 0, // Size not returned in upload response
        chunk_count: result.chunk_count,
      };

      setCurrentDocument(newDocument);
      clearMessages();
      setUploadSuccess(true);
      
      // Refresh documents list
      documentsApi.execute(() => apiClient.listDocuments());
      
      // Show success message with animation
      setTimeout(() => {
        setUploadSuccess(false);
      }, 4000);

    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSendMessage = async (content: string, files?: File[]) => {
    try {
      if (files && files.length > 0) {
        await handleFileUpload(files);
        return;
      }

      if (!currentDocument) {
        setShowUpload(true);
        return;
      }

      await sendMessage(content);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!currentDocument) {
      setShowUpload(true);
      return;
    }
    handleSendMessage(suggestion);
  };

  const handleDocumentSelect = (document: Document) => {
    setCurrentDocument(document);
    clearMessages();
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleNewChat = () => {
    setCurrentDocument(null);
    clearMessages();
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDocumentDeleted = () => {
    // Refresh documents list after deletion
    documentsApi.execute(() => apiClient.listDocuments());
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Upload Success Notification */}
      {uploadSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-down">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-green-100 dark:bg-green-800/50 rounded-full animate-bounce-in">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <Typography variant="p" size="sm" weight="medium" className="text-green-700 dark:text-green-400">
                  Document Ready!
                </Typography>
                <Typography variant="p" size="xs" className="text-green-600 dark:text-green-500">
                  You can now chat with your document
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Upload Modal */}
      {showUpload && (
        <DocumentUpload
          onUpload={handleFileUpload}
          onClose={() => setShowUpload(false)}
          uploading={uploading}
          error={uploadError}
        />
      )}

      {/* Sidebar */}
      <ChatSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        documents={documentsApi.data?.documents || []}
        currentDocument={currentDocument}
        onDocumentSelect={handleDocumentSelect}
        onNewChat={handleNewChat}
        uploading={uploading}
        onDocumentDeleted={handleDocumentDeleted}
      />

      {/* Main chat area with proper spacing */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-0' : ''
      }`}>
        {/* Header */}
        <ChatHeader 
          onMenuClick={() => setSidebarOpen(true)}
          currentDocument={currentDocument}
          uploading={uploading}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={handleSidebarToggle}
        />

        {/* Messages area with proper spacing to avoid sidebar overlap */}
        <div
          ref={messagesContainerRef}
          className={`flex-1 overflow-y-auto pt-16 pb-32 transition-all duration-300 ${
            sidebarOpen 
              ? 'lg:pl-8 lg:pr-8 px-4 sm:px-6' // More padding when sidebar is open
              : 'px-4 sm:px-6 lg:px-8'        // Standard padding when sidebar is closed
          }`}
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="max-w-4xl mx-auto">
            {messages.length === 0 ? (
              <ChatWelcome 
                onSuggestionClick={handleSuggestionClick} 
                onFileUpload={() => setShowUpload(true)}
                hasDocument={!!currentDocument}
                currentDocument={currentDocument}
              />
            ) : (
              <div className="py-6 space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="group animate-fade-in">
                    <ChatMessage message={message} />
                  </div>
                ))}
                
                {/* Loading indicator */}
                {chatLoading && (
                  <div className="flex gap-3 sm:gap-4 mb-6 animate-slide-up">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="flex-1 max-w-[85%] sm:max-w-[75%]">
                      <div className="bg-background/50 border border-border rounded-xl rounded-bl-sm p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                      <Typography variant="span" size="xs" color="muted" className="block mt-1">
                        AI is analyzing your document...
                      </Typography>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {chatError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 animate-fade-in">
                    <Typography variant="p" size="sm" className="text-red-700 dark:text-red-400">
                      Error: {chatError}
                    </Typography>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input area - positioned to avoid sidebar overlap */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={chatLoading || uploading}
          hasDocument={!!currentDocument}
          uploading={uploading}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  );
}