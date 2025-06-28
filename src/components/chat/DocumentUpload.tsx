import React, { useCallback, useState } from 'react';
import { Upload, X, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import Typography from '../ui/Typography';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  onClose: () => void;
  uploading: boolean;
  error: string | null;
}

export default function DocumentUpload({ onUpload, onClose, uploading, error }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type === 'application/pdf'
      );
      setSelectedFiles(files);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => 
        file.type === 'application/pdf'
      );
      setSelectedFiles(files);
    }
  }, []);

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      setUploadProgress(0);
      onUpload(selectedFiles);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Simulate upload progress
  React.useEffect(() => {
    if (uploading) {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setUploadProgress(0);
    }
  }, [uploading]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg bg-background border border-border shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <Typography variant="h3" size="lg" weight="semibold" color="primary">
              Upload Document
            </Typography>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            disabled={uploading}
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Upload Progress */}
          {uploading && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Loader className="w-6 h-6 text-primary animate-spin" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <Typography variant="h4" size="sm" weight="medium" color="primary">
                    Processing your document...
                  </Typography>
                  <Typography variant="p" size="xs" color="muted">
                    Extracting text and creating searchable chunks
                  </Typography>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <Typography variant="p" size="xs" color="muted" className="mt-1 text-center">
                {Math.round(uploadProgress)}% complete
              </Typography>
            </div>
          )}

          {/* Upload area */}
          {!uploading && (
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-border hover:border-primary/50 hover:bg-primary/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  dragActive ? 'bg-primary/20 scale-110' : 'bg-primary/10'
                }`}>
                  <Upload className={`w-8 h-8 transition-colors duration-300 ${
                    dragActive ? 'text-primary' : 'text-primary'
                  }`} />
                </div>
                
                <div>
                  <Typography variant="h4" size="base" weight="medium" color="primary" className="mb-2">
                    {dragActive ? 'Drop your PDF here!' : 'Drop PDF files here or click to browse'}
                  </Typography>
                  <Typography variant="p" size="sm" color="muted">
                    Maximum file size: 16MB per file
                  </Typography>
                </div>
              </div>
            </div>
          )}

          {/* Selected files */}
          {selectedFiles.length > 0 && !uploading && (
            <div className="mt-4 animate-fade-in">
              <Typography variant="h4" size="sm" weight="medium" color="primary" className="mb-2">
                Selected Files ({selectedFiles.length})
              </Typography>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/20 transition-colors">
                    <div className="p-1.5 bg-primary/10 rounded">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography variant="p" size="sm" weight="medium" color="primary" className="truncate">
                        {file.name}
                      </Typography>
                      <Typography variant="p" size="xs" color="muted">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                      </Typography>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-accent rounded transition-colors"
                      disabled={uploading}
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <Typography variant="p" size="sm" className="text-red-700 dark:text-red-400">
                  {error}
                </Typography>
              </div>
            </div>
          )}

          {/* Upload info */}
          {!uploading && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="p-1 bg-blue-100 dark:bg-blue-800/50 rounded">
                  <FileText className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
                <Typography variant="p" size="sm" className="text-blue-700 dark:text-blue-400">
                  Only PDF files are supported. Your document will be processed using advanced AI for intelligent search and chat capabilities.
                </Typography>
              </div>
            </div>
          )}

          {/* Upload stages info */}
          {uploading && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">File uploaded successfully</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Loader className="w-4 h-4 text-primary animate-spin" />
                <span className="text-muted-foreground">Extracting text content...</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-50">
                <div className="w-4 h-4 border-2 border-muted-foreground/30 rounded-full" />
                <span className="text-muted-foreground">Creating vector embeddings...</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-50">
                <div className="w-4 h-4 border-2 border-muted-foreground/30 rounded-full" />
                <span className="text-muted-foreground">Preparing for chat...</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!uploading && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={selectedFiles.length === 0 || uploading}
              className="min-w-[100px]"
            >
              Upload & Process
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}