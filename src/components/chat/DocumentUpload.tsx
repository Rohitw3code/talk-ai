import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';
import { uploadPDF } from '../../services/pdf/uploadService';
import { UPLOAD_CONSTRAINTS } from '../../config/api.config';
import type { UploadProgress, UploadResponse } from '../../services/pdf/types';

interface DocumentUploadProps {
  onFileSelect: (file: File, uploadResponse: UploadResponse) => void;
}

export default function DocumentUpload({ onFileSelect }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setError(null);

      const response = await uploadPDF(file, {
        onProgress: (progress: UploadProgress) => {
          const percentage = (progress.loaded / progress.total) * 100;
          setUploadProgress(Math.round(percentage));
        }
      });

      onFileSelect(file, response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
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
    if (file) handleUpload(file);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  }, []);

  const allowedTypesText = UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS
    .map(ext => ext.toUpperCase())
    .join(', ');

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
      {isUploading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <div className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-2">Uploading file...</p>
            <div className="w-48 h-2 bg-foreground/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{uploadProgress}%</p>
          </div>
        </div>
      ) : (
        <>
          <Upload className={`w-8 h-8 md:w-12 md:h-12 mb-4 transition-colors duration-200
            ${dragActive ? 'text-primary' : 'text-primary/80'}`} />
          
          <h3 className="text-base md:text-lg font-semibold mb-2">Upload your document</h3>
          
          <p className="text-xs md:text-sm text-muted-foreground mb-4 text-center">
            Drag and drop or click to upload<br />
            {allowedTypesText} files
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
              accept={UPLOAD_CONSTRAINTS.ALLOWED_EXTENSIONS.join(',')}
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
        </>
      )}
    </div>
  );
}