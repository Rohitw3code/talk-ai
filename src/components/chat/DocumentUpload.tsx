import React, { useCallback } from 'react';
import { Upload, File, FileText, Image as ImageIcon } from 'lucide-react';

const ACCEPTED_FILE_TYPES = '.png,.doc,.pdf,.txt';

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
}

export default function DocumentUpload({ onFileSelect }: DocumentUploadProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  return (
    <div 
      className="h-full flex flex-col items-center justify-center p-4 md:p-8 border-2 border-dashed border-foreground/10 rounded-lg m-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={(e) => e.stopPropagation()}
    >
      <Upload className="w-8 h-8 md:w-12 md:h-12 text-primary mb-4" />
      <h3 className="text-base md:text-lg font-semibold mb-2">Upload your document</h3>
      <p className="text-xs md:text-sm text-muted-foreground mb-4 text-center">
        Drag and drop or click to upload<br />
        Supported formats: PNG, DOC, PDF, TXT
      </p>
      <label className="relative">
        <input
          type="file"
          className="hidden"
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleFileInput}
        />
        <span className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer text-sm md:text-base">
          Choose File
        </span>
      </label>
    </div>
  );
}