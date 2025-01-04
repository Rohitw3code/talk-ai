import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Loader2 } from 'lucide-react';
import { UploadResponse } from '../../../services/pdf/types';
import { getImageUrl, preloadImage } from '../../../services/image/imageService';

interface ImagePreviewProps {
  file: File;
  uploadResponse: UploadResponse;
}

export default function ImagePreview({ file, uploadResponse }: ImagePreviewProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        const url = getImageUrl(uploadResponse.filename);
        await preloadImage(url);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to load image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [uploadResponse.filename]);

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between p-2 sm:p-4 border-b border-foreground/10">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-1.5 rounded-lg hover:bg-foreground/5"
            title="Zoom out"
            disabled={isLoading}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm whitespace-nowrap">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => handleZoom(0.1)}
            className="p-1.5 rounded-lg hover:bg-foreground/5"
            title="Zoom in"
            disabled={isLoading}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleRotate}
          className="p-1.5 rounded-lg hover:bg-foreground/5"
          title="Rotate image"
          disabled={isLoading}
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* Image Container */}
      <div className="flex-1 overflow-auto p-4">
        <div className="h-full flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading image...</p>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={file.name}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}