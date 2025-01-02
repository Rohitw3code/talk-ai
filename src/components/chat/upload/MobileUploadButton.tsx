import React from 'react';
import { FileUp } from 'lucide-react';
import { useFileUpload } from '../../../hooks/useFileUpload';

interface MobileUploadButtonProps {
  onFileSelect: (file: File) => void;
}

export default function MobileUploadButton({ onFileSelect }: MobileUploadButtonProps) {
  const { handleFileSelect, inputRef } = useFileUpload({ onFileSelect });

  return (
    <div className="md:hidden">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt"
        onChange={handleFileSelect}
        aria-label="Upload document"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-foreground/5 
          text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Upload document"
      >
        <FileUp className="w-5 h-5" />
      </button>
    </div>
  );
}