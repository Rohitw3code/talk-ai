import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, FileText, X, Loader } from 'lucide-react';
import Button from '../ui/Button';
import Typography from '../ui/Typography';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  disabled?: boolean;
  hasDocument?: boolean;
  uploading?: boolean;
  sidebarOpen?: boolean;
}

export default function ChatInput({ 
  onSendMessage, 
  disabled = false, 
  hasDocument = false, 
  uploading = false,
  sidebarOpen = false
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || attachedFiles.length > 0) && !disabled && !uploading) {
      onSendMessage(message.trim(), attachedFiles);
      setMessage('');
      setAttachedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type === 'application/pdf'
    );
    setAttachedFiles(prev => [...prev, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const getPlaceholder = () => {
    if (uploading) {
      return "Processing your document...";
    }
    if (attachedFiles.length > 0) {
      return "Ask about your uploaded files...";
    }
    if (hasDocument) {
      return "Ask questions about your document...";
    }
    return "Upload a document to start chatting...";
  };

  const isInputDisabled = disabled || uploading;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border">
      {/* Responsive container with proper sidebar spacing */}
      <div className={`transition-all duration-300 ${
        sidebarOpen 
          ? 'lg:ml-80 lg:mr-4' // Add margin when sidebar is open on desktop
          : 'lg:ml-4 lg:mr-4'   // Standard margin when sidebar is closed
      } mx-4 lg:mx-0`}>
        <div className="max-w-4xl mx-auto p-4">
          {/* File attachments preview */}
          {attachedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2 animate-slide-up">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-secondary/50 border border-border rounded-lg px-3 py-2">
                  <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground truncate max-w-[120px] sm:max-w-[200px]">
                    {file.name}
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-0.5 hover:bg-accent rounded-sm transition-colors"
                    aria-label="Remove file"
                    disabled={uploading}
                  >
                    <X className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload progress indicator */}
          {uploading && (
            <div className="mb-3 animate-slide-up">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <Loader className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin flex-shrink-0" />
                <div className="flex-1">
                  <Typography variant="p" size="sm" weight="medium" className="text-blue-700 dark:text-blue-400">
                    Processing your document...
                  </Typography>
                  <Typography variant="p" size="xs" className="text-blue-600 dark:text-blue-500">
                    Creating AI-ready text chunks for intelligent search
                  </Typography>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <div className={`flex items-end gap-3 bg-background border border-border rounded-2xl sm:rounded-3xl p-3 shadow-lg transition-all duration-200 ${
              isInputDisabled ? 'opacity-60' : 'hover:shadow-xl'
            }`}>
              {/* Attachment button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 p-2 hover:bg-accent rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Attach file"
                disabled={isInputDisabled}
              >
                <Paperclip className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isInputDisabled}
              />

              {/* Text input */}
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getPlaceholder()}
                  disabled={isInputDisabled}
                  className="w-full resize-none bg-transparent text-foreground placeholder-muted-foreground 
                    focus:outline-none text-base leading-relaxed max-h-[120px] min-h-[24px] py-2 disabled:cursor-not-allowed"
                  rows={1}
                />
              </div>

              {/* Send button */}
              <div className="flex-shrink-0">
                <Button
                  type="submit"
                  disabled={(!message.trim() && attachedFiles.length === 0) || isInputDisabled || (!hasDocument && attachedFiles.length === 0)}
                  className="p-2 min-w-0 h-auto bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all duration-200"
                  aria-label="Send message"
                >
                  {uploading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </form>

          {/* Status message */}
          <div className="text-center mt-2">
            {uploading ? (
              <Typography variant="p" size="xs" className="text-blue-600 dark:text-blue-400">
                🔄 Processing document - please wait...
              </Typography>
            ) : !hasDocument && attachedFiles.length === 0 ? (
              <Typography variant="p" size="xs" color="muted">
                📄 Upload a PDF document to start chatting with AI
              </Typography>
            ) : hasDocument ? (
              <Typography variant="p" size="xs" color="muted">
                💬 Ask questions about your document or upload additional files
              </Typography>
            ) : (
              <Typography variant="p" size="xs" color="muted">
                📄 PDF file ready to upload - click send to process
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}