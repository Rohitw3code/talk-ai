import React from 'react';
import PDFPreview from './preview/PDFPreview';
import ImagePreview from './preview/ImagePreview';
import TextPreview from './preview/TextPreview';

interface DocumentPreviewProps {
  file: File;
  onClose: () => void;
}

export default function DocumentPreview({ file, onClose }: DocumentPreviewProps) {
  const getPreviewComponent = () => {
    const fileType = file.type.toLowerCase();
    
    if (fileType.includes('pdf')) {
      return <PDFPreview file={file} />;
    }
    
    if (fileType.includes('image')) {
      return <ImagePreview file={file} />;
    }
    
    if (fileType.includes('text') || fileType === '') {
      return <TextPreview file={file} />;
    }
    
    return (
      <div className="h-full flex items-center justify-center p-4">
        <p className="text-muted-foreground">
          Preview not available for this file type
        </p>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
      {getPreviewComponent()}
    </div>
  );
}