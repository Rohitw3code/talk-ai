import { useState } from 'react';

export function useFileHandling() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return {
    selectedFile,
    setSelectedFile
  };
}