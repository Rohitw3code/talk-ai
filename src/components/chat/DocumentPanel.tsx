import React, { useState } from 'react';
import { ChevronLeft, Loader2 } from 'lucide-react';
import DocumentPreview from './DocumentPreview';
import DocumentUpload from './DocumentUpload';
import ResizeHandle from './ResizeHandle';
import MobileCloseButton from './buttons/MobileCloseButton';
import CloseButton from './buttons/CloseButton';
import { useWindowSize } from '../../hooks/useWindowSize';
import type { UploadResponse } from '../../services/pdf/types';

interface DocumentPanelProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onResizeStart: (e: React.MouseEvent) => void;
  isResizing: boolean;
  onMinimize: () => void;
}

export default function DocumentPanel({
  selectedFile,
  onFileSelect,
  onResizeStart,
  isResizing,
  onMinimize
}: DocumentPanelProps) {
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null);

  const handleFileSelect = async (file: File, response: UploadResponse) => {
    try {
      setIsLoading(true);
      setError(null);
      setUploadResponse(response);
      onFileSelect(file);
    } catch (err) {
      setError('Failed to load document. Please try again.');
      onFileSelect(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex-1 flex border-r border-foreground/10 bg-background/95 backdrop-blur-sm relative
        transition-transform duration-300 ease-in-out"
      onClick={(e) => e.stopPropagation()}
      role="complementary"
      aria-label="Document panel"
    >
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading document...</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center p-4">
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg max-w-md text-center">
              <p>{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          </div>
        ) : selectedFile && uploadResponse ? (
          <div className="relative h-full">
            <DocumentPreview 
              file={selectedFile} 
              uploadResponse={uploadResponse}
              onClose={() => {
                onFileSelect(null);
                setUploadResponse(null);
              }} 
            />
            {isMobile && (
              <MobileCloseButton 
                onClick={() => {
                  onFileSelect(null);
                  setUploadResponse(null);
                }} 
              />
            )}
          </div>
        ) : (
          <>
            <DocumentUpload onFileSelect={handleFileSelect} />
            {!isMobile && (
              <CloseButton 
                onClick={() => {
                  onFileSelect(null);
                  setUploadResponse(null);
                }} 
              />
            )}
          </>
        )}
        
        {!isMobile && (
          <button
            onClick={onMinimize}
            className="absolute bottom-4 right-4 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 
              text-primary transition-colors"
            title="Minimize document panel"
            aria-label="Minimize document panel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {!isMobile && (
        <div
          onMouseDown={onResizeStart}
          className={`hidden md:block ${isResizing ? 'select-none cursor-col-resize' : ''}`}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize document panel"
        >
          <ResizeHandle />
        </div>
      )}

      {isMobile && isResizing && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          aria-hidden="true"
        />
      )}
    </div>
  );
}