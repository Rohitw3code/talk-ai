import { useState, useCallback } from 'react';

interface UsePDFResizeProps {
  minWidth?: number;
  maxWidth?: number;
}

export function usePDFResize({ minWidth = 300, maxWidth = 1200 }: UsePDFResizeProps = {}) {
  const [pdfWidth, setPDFWidth] = useState(600);
  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = pdfWidth;

    const handleResize = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.min(Math.max(startWidth + deltaX, minWidth), maxWidth);
      setPDFWidth(newWidth);
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [minWidth, maxWidth, pdfWidth]);

  return {
    pdfWidth,
    isResizing,
    handleResizeStart
  };
}