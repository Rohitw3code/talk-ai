import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, StretchHorizontal, Loader2 } from 'lucide-react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { usePDFResize } from '../../../hooks/usePDFResize';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFPreviewProps {
  file: File;
}

export default function PDFPreview({ file }: PDFPreviewProps) {
  const [numPages, setNumPages] = React.useState<number>(0);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [scale, setScale] = React.useState<number>(1.0);
  const [fitToWidth, setFitToWidth] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const { width: windowWidth } = useWindowSize();
  const isMobile = windowWidth < 768;
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { pdfWidth, isResizing, handleResizeStart } = usePDFResize({
    minWidth: isMobile ? windowWidth - 16 : 300,
    maxWidth: isMobile ? windowWidth - 16 : 1200
  });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    if (fitToWidth && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const adjustedWidth = containerWidth - (isMobile ? 8 : 16);
      setScale(adjustedWidth / 595.276);
    }
  };

  const adjustScale = (delta: number) => {
    setFitToWidth(false);
    setScale(prev => Math.min(Math.max(0.3, prev + delta), 3.0));
  };

  const toggleFitToWidth = () => {
    setFitToWidth(!fitToWidth);
    if (!fitToWidth && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const adjustedWidth = containerWidth - (isMobile ? 8 : 16);
      setScale(adjustedWidth / 595.276);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Controls Header */}
      <div className="flex items-center justify-between p-2 sm:p-4 border-b border-foreground/10">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
            disabled={pageNumber <= 1}
            className="p-1.5 rounded-lg hover:bg-foreground/5 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm whitespace-nowrap">
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
            disabled={pageNumber >= numPages}
            className="p-1.5 rounded-lg hover:bg-foreground/5 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => adjustScale(-0.1)}
            className="p-1.5 rounded-lg hover:bg-foreground/5"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm whitespace-nowrap">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => adjustScale(0.1)}
            className="p-1.5 rounded-lg hover:bg-foreground/5"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFitToWidth}
            className={`p-1.5 rounded-lg hover:bg-foreground/5 ${fitToWidth ? 'text-primary' : ''}`}
            title={fitToWidth ? "Disable fit to width" : "Fit to width"}
          >
            <StretchHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-4 w-full relative"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading PDF...</p>
            </div>
          </div>
        )}

        <div
          className={`mx-auto ${fitToWidth ? 'w-full' : 'w-fit'}`}
          style={{ width: fitToWidth ? '100%' : `${pdfWidth}px` }}
        >
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={null}
            className="max-w-full"
          >
            <div className="relative">
              <Page
                pageNumber={pageNumber}
                scale={scale}
                className="shadow-lg rounded-lg"
                width={fitToWidth ? undefined : pdfWidth}
                loading={null}
              />
              {!fitToWidth && !isMobile && (
                <div
                  className="absolute top-0 right-0 bottom-0 w-4 cursor-col-resize hover:bg-primary/10"
                  onMouseDown={handleResizeStart}
                />
              )}
            </div>
          </Document>
        </div>
      </div>

      {isResizing && (
        <div className="fixed inset-0 z-50 cursor-col-resize" />
      )}
    </div>
  );
}
