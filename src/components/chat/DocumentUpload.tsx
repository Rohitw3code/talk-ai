import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

const ACCEPTED_FILE_TYPES = '.png,.jpg,.jpeg,.pdf,.doc,.docx,.txt';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
}

export default function DocumentUpload({ onFileSelect }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (!file.type.match(/(image\/.*|application\/pdf|application\/msword|text\/.*)/)) {
      return 'Unsupported file type. Please upload an image, PDF, DOC, or TXT file.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 10MB limit.';
    }
    return null;
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onFileSelect(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, []);

  return (
    <div 
      className={`h-full flex flex-col items-center justify-center p-4 md:p-8 
        border-2 border-dashed rounded-lg m-4 transition-colors duration-200
        ${dragActive 
          ? 'border-primary bg-primary/5' 
          : 'border-foreground/10 hover:border-primary/50'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={(e) => e.stopPropagation()}
      role="button"
      tabIndex={0}
      aria-label="Upload document area"
    >
      <Upload className={`w-8 h-8 md:w-12 md:h-12 mb-4 transition-colors duration-200
        ${dragActive ? 'text-primary' : 'text-primary/80'}`} />
      
      <h3 className="text-base md:text-lg font-semibold mb-2">Upload your document</h3>
      
      <p className="text-xs md:text-sm text-muted-foreground mb-4 text-center">
        Drag and drop or click to upload<br />
        Supported formats: PNG, JPG, PDF, DOC, TXT
      </p>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
          <AlertCircle className="w-4 h-4" />
          <p>{error}</p>
        </div>
      )}

      <label className="relative">
        <input
          type="file"
          className="hidden"
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleFileInput}
          aria-label="Choose file"
        />
        <span className="inline-flex items-center justify-center min-w-[120px] min-h-[44px] px-6 py-2 
          rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 
          cursor-pointer text-sm md:text-base font-medium transition-colors">
          Choose File
        </span>
      </label>

      <p className="mt-4 text-xs text-muted-foreground">
        Maximum file size: 10MB
      </p>
    </div>
  );
}