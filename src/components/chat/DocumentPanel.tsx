import React from 'react';
import DocumentPreview from './DocumentPreview';
import DocumentUpload from './DocumentUpload';
import ResizeHandle from './ResizeHandle';
import MobileCloseButton from './buttons/MobileCloseButton';

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
  return (
    <div className="flex-1 flex border-r border-foreground/10 bg-background/95 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
      <div className="flex-1 overflow-hidden">
        {selectedFile ? (
          <>
            <DocumentPreview 
              file={selectedFile} 
              onClose={() => onFileSelect(null)} 
            />
            <MobileCloseButton onClick={() => onFileSelect(null)} />
          </>
        ) : (
          <DocumentUpload onFileSelect={onFileSelect} />
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