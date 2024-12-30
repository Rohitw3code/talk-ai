import React from 'react';

interface ImagePreviewProps {
  file: File;
}

export default function ImagePreview({ file }: ImagePreviewProps) {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <img 
        src={URL.createObjectURL(file)} 
        alt={file.name}
        className="max-w-full max-h-full rounded-lg object-contain"
      />
    </div>
  );
}