import React from 'react';
import DocumentPreview from './DocumentPreview';
import DocumentUpload from './DocumentUpload';
import ResizeHandle from './ResizeHandle';
import MobileCloseButton from './buttons/MobileCloseButton';
import CloseButton from './buttons/CloseButton';
import { useWindowSize } from '../../hooks/useWindowSize';

interface DocumentPanelProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onResizeStart: (e: React.MouseEvent) => void;
  isResizing: boolean;
}

export default function DocumentPanel({
  selectedFile,
  onFileSelect,
  onResizeStart,
  isResizing
}: DocumentPanelProps) {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <div 
      className="flex-1 flex border-r border-foreground/10 bg-background/95 backdrop-blur-sm relative" 
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex-1 overflow-hidden">
        {selectedFile ? (
          <div className="relative h-full">
            <DocumentPreview file={selectedFile} onClose={() => onFileSelect(null)} />
            {isMobile && <MobileCloseButton onClick={() => onFileSelect(null)} />}
          </div>
        ) : (
          <>
            <DocumentUpload onFileSelect={onFileSelect} />
            {!isMobile && <CloseButton onClick={() => onFileSelect(null)} />}
          </>
        )}
      </div>
      
      <div
        onMouseDown={onResizeStart}
        className={`hidden md:block ${isResizing ? 'select-none cursor-col-resize' : ''}`}
      >
        <ResizeHandle />
      </div>
    </div>
  );
}