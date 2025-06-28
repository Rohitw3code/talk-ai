import React, { useState } from 'react';
import { Plus, MessageSquare, Settings, HelpCircle, LogOut, X, FileText, Trash2, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import Typography from '../ui/Typography';
import Button from '../ui/Button';
import { Document, apiClient } from '../../api/client';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
  currentDocument: Document | null;
  onDocumentSelect: (document: Document) => void;
  onNewChat: () => void;
  uploading?: boolean;
  onDocumentDeleted?: () => void;
}

export default function ChatSidebar({ 
  isOpen, 
  onClose, 
  documents, 
  currentDocument, 
  onDocumentSelect,
  onNewChat,
  uploading = false,
  onDocumentDeleted
}: ChatSidebarProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const handleDeleteDocument = async (documentId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent document selection
    
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return;
    }

    setDeletingId(documentId);
    setDeleteError(null);

    try {
      const response = await apiClient.deleteDocument(documentId);
      
      if (response.success) {
        // If the deleted document was currently selected, clear it
        if (currentDocument?.id === documentId) {
          onNewChat();
        }
        
        // Notify parent to refresh documents list
        onDocumentDeleted?.();
      } else {
        setDeleteError(response.error || 'Failed to delete document');
      }
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Failed to delete document');
    } finally {
      setDeletingId(null);
    }
  };

  // Sort documents by upload time (most recent first)
  const sortedDocuments = [...documents].sort((a, b) => 
    new Date(b.upload_time).getTime() - new Date(a.upload_time).getTime()
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-80 bg-background/95 backdrop-blur-sm border-r border-border z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <Typography variant="h3" size="lg" weight="bold" color="primary">
                TalkKAI
              </Typography>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4 border-b border-border">
            <Button
              icon={Plus}
              className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
              variant="outline"
              onClick={onNewChat}
              disabled={uploading}
            >
              New Chat
            </Button>
          </div>

          {/* Upload Status */}
          {uploading && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="relative">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <Typography variant="p" size="sm" weight="medium" className="text-blue-700 dark:text-blue-400">
                    Processing Document...
                  </Typography>
                  <Typography variant="p" size="xs" className="text-blue-600 dark:text-blue-500">
                    Creating AI-ready chunks
                  </Typography>
                </div>
              </div>
            </div>
          )}

          {/* Delete Error */}
          {deleteError && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <Typography variant="p" size="xs" className="text-red-700 dark:text-red-400">
                  {deleteError}
                </Typography>
                <button
                  onClick={() => setDeleteError(null)}
                  className="ml-auto p-1 hover:bg-red-100 dark:hover:bg-red-800/50 rounded"
                >
                  <X className="w-3 h-3 text-red-500" />
                </button>
              </div>
            </div>
          )}

          {/* Documents */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Typography variant="h3" size="sm" weight="semibold" color="muted">
                  Recent Documents
                </Typography>
                <span className="px-2 py-1 bg-secondary/50 rounded-full text-xs text-muted-foreground">
                  {documents.length}
                </span>
              </div>
              
              {documents.length === 0 && !uploading ? (
                <div className="text-center py-8">
                  <div className="p-4 bg-secondary/30 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <Typography variant="p" size="sm" color="muted" className="mb-2">
                    No documents yet
                  </Typography>
                  <Typography variant="p" size="xs" color="muted">
                    Upload a PDF to start chatting
                  </Typography>
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedDocuments.map((document, index) => (
                    <div
                      key={document.id}
                      className={`relative group rounded-lg transition-all duration-200 ${
                        currentDocument?.id === document.id
                          ? 'bg-primary/10 border border-primary/20 shadow-sm'
                          : 'hover:bg-accent border border-transparent hover:border-border'
                      }`}
                    >
                      {/* Most recent indicator */}
                      {index === 0 && documents.length > 1 && (
                        <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-green-500 text-white text-xs rounded-full z-10">
                          Latest
                        </div>
                      )}
                      
                      <button
                        onClick={() => onDocumentSelect(document)}
                        className="w-full text-left p-3 rounded-lg"
                        disabled={deletingId === document.id}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative flex-shrink-0">
                            <div className={`p-2 rounded-lg ${
                              currentDocument?.id === document.id 
                                ? 'bg-primary/20' 
                                : 'bg-secondary/50 group-hover:bg-primary/10'
                            } transition-colors`}>
                              <FileText className={`w-4 h-4 ${
                                currentDocument?.id === document.id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                              } transition-colors`} />
                            </div>
                            {currentDocument?.id === document.id && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0 pr-8">
                            <Typography
                              variant="p"
                              size="sm"
                              weight="medium"
                              color={currentDocument?.id === document.id ? "primary" : "primary"}
                              className="truncate mb-1"
                            >
                              {document.filename}
                            </Typography>
                            
                            <div className="flex items-center gap-2 mb-1">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <Typography variant="p" size="xs" color="muted">
                                  {formatDate(document.upload_time)}
                                </Typography>
                              </div>
                              <div className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                              <Typography variant="p" size="xs" color="muted">
                                {document.chunk_count} chunks
                              </Typography>
                            </div>
                            
                            {document.size > 0 && (
                              <Typography variant="p" size="xs" color="muted">
                                {formatFileSize(document.size)}
                              </Typography>
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={(e) => handleDeleteDocument(document.id, e)}
                        disabled={deletingId === document.id}
                        className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md transition-all duration-200 disabled:opacity-50"
                        aria-label="Delete document"
                      >
                        {deletingId === document.id ? (
                          <div className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3 text-red-500 hover:text-red-600" />
                        )}
                      </button>
                      
                      {/* Active indicator */}
                      {currentDocument?.id === document.id && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-1 bg-background/80 backdrop-blur-sm">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
              <Settings className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <Typography variant="span" size="sm" color="secondary">
                Settings
              </Typography>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
              <HelpCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <Typography variant="span" size="sm" color="secondary">
                Help & Support
              </Typography>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}