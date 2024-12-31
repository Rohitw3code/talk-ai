import React from 'react';
import { File, FileText, Image as ImageIcon, X } from 'lucide-react';
import ImagePreview from './preview/ImagePreview';
import PDFPreview from './preview/PDFPreview';
import TextPreview from './preview/TextPreview';

interface DocumentPreviewProps {
  file: File;
  onClose: () => void;
}

export default function DocumentPreview({ file, onClose }: DocumentPreviewProps) {
  const getFileIcon = () => {
    const type = file.type;
    if (type.startsWith('image')) return ImageIcon;
    if (type.includes('pdf')) return File;
    return FileText;
  };

  const Icon = getFileIcon();

  const renderPreview = () => {
    if (file.type.startsWith('image')) {
      return <ImagePreview file={file} />;
    }
    if (file.type === 'application/pdf') {
      return <PDFPreview file={file} />;
    }
    if (file.type === 'text/plain') {
      return <TextPreview file={file} />;
    }
    return (
      <div className="h-full flex items-center justify-center">
        <div className="p-4 bg-card rounded-lg">
          <p className="text-sm text-muted-foreground">
            Preview not available for this file type
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-foreground/10">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          <span className="font-medium truncate">{file.name}</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-foreground/5 rounded-lg transition-colors group md:block"
          aria-label="Close preview"
        >
          <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
        </button>
      </div>
      {renderPreview()}
    </div>
  );
}