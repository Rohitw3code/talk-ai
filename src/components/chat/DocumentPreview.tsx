import React from 'react';
import PDFPreview from './preview/PDFPreview';
import ImagePreview from './preview/ImagePreview';
import TextPreview from './preview/TextPreview';
import { UploadResponse } from '../../services/pdf/types';

interface DocumentPreviewProps {
  file: File;
  uploadResponse: UploadResponse;
  onClose: () => void;
}

export default function DocumentPreview({ file, uploadResponse, onClose }: DocumentPreviewProps) {
  const getPreviewComponent = () => {
    const fileType = file.type.toLowerCase();
    
    if (fileType === 'application/pdf') {
      return <PDFPreview file={file} />;
    }
    
    if (fileType === 'image/png') {
      return <ImagePreview file={file} uploadResponse={uploadResponse} />;
    }
    
    if (fileType === 'text/plain') {
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