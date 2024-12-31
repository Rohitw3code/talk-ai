import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, StretchHorizontal } from 'lucide-react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFPreviewProps {
  file: File;
}

export default function PDFPreview({ file }: PDFPreviewProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [fitToWidth, setFitToWidth] = useState(true);
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 768;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const adjustScale = (delta: number) => {
    setFitToWidth(false);
    setScale(prev => Math.min(Math.max(0.3, prev + delta), 3.0));
  };

  const toggleFitToWidth = () => {
    setFitToWidth(!fitToWidth);
    if (!fitToWidth && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const targetWidth = containerWidth - (isMobile ? 16 : 32);
      setScale(targetWidth / 595.276);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 sm:p-4 border-b border-foreground/10">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
            disabled={pageNumber <= 1}
            className="p-1 rounded-lg hover:bg-foreground/5 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <span className="text-xs sm:text-sm whitespace-nowrap">
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
            disabled={pageNumber >= numPages}
            className="p-1 rounded-lg hover:bg-foreground/5 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => adjustScale(-0.1)}
            className="p-1 rounded-lg hover:bg-foreground/5"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <span className="text-xs sm:text-sm whitespace-nowrap">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => adjustScale(0.1)}
            className="p-1 rounded-lg hover:bg-foreground/5"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={toggleFitToWidth}
            className={`p-1 rounded-lg hover:bg-foreground/5 ${fitToWidth ? 'text-primary' : ''}`}
            title={fitToWidth ? "Disable fit to width" : "Fit to width"}
          >
            <StretchHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-4 w-full"
      >
        <div className={`flex justify-center ${fitToWidth ? 'w-full' : 'w-fit mx-auto'}`}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="max-w-full"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="shadow-lg rounded-lg"
              width={fitToWidth ? undefined : undefined}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}