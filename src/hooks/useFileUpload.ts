import { useRef, useCallback } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface UseFileUploadProps {
  onFileSelect: (file: File) => void;
}

export function useFileUpload({ onFileSelect }: UseFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!file.type.match(/(image\/.*|application\/pdf|application\/msword|text\/.*)/)) {
      return 'Unsupported file type. Please upload an image, PDF, DOC, or TXT file.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size exceeds 10MB limit.';
    }
    return null;
  };

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      alert(error); // Simple error handling for mobile
      return;
    }

    onFileSelect(file);
    
    // Reset input value to allow selecting the same file again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onFileSelect]);

  return {
    inputRef,
    handleFileSelect
  };
}