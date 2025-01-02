import { useState, useCallback } from 'react';

interface UseResizePanelProps {
  isMobile: boolean;
  isSidebarCollapsed: boolean;
  windowWidth: number;
}

export function useResizePanel({ isMobile, isSidebarCollapsed, windowWidth }: UseResizePanelProps) {
  const [leftSectionWidth, setLeftSectionWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) return;
    
    setIsResizing(true);

    const handleResize = (e: MouseEvent) => {
      const containerWidth = windowWidth;
      const minWidth = isSidebarCollapsed ? 300 : 400;
      const maxWidth = containerWidth - 400;
      const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
      const widthPercentage = (newWidth / containerWidth) * 100;
      setLeftSectionWidth(widthPercentage);
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  }, [isMobile, isSidebarCollapsed, windowWidth]);

  return {
    leftSectionWidth,
    isResizing,
    handleResizeStart
  };
}