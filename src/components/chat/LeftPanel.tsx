import React from 'react';
import ChatSidebar from './ChatSidebar';
import DocumentPanel from './DocumentPanel';

interface LeftPanelProps {
  showDocPanel: boolean;
  showSidebar: boolean;
  isSidebarCollapsed: boolean;
  selectedFile: File | null;
  isResizing: boolean;
  width: string | number;
  onSidebarClose: () => void;
  onSidebarCollapse: () => void;
  onFileSelect: (file: File | null) => void;
  onResizeStart: (e: React.MouseEvent) => void;
  onMinimizeDocPanel: () => void;
  isMobile: boolean;
}

export default function LeftPanel({
  showDocPanel,
  showSidebar,
  isSidebarCollapsed,
  selectedFile,
  isResizing,
  width,
  onSidebarClose,
  onSidebarCollapse,
  onFileSelect,
  onResizeStart,
  onMinimizeDocPanel,
  isMobile
}: LeftPanelProps) {
  return (
    <>
      {/* Sidebar */}
      <div 
        className={`
          fixed md:relative inset-y-0 left-0 z-50
          flex h-full transition-all duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:transform-none bg-background
        `}
        style={{ width: isSidebarCollapsed ? '4rem' : '16rem' }}
      >
        <ChatSidebar 
          isOpen={showSidebar} 
          isCollapsed={isSidebarCollapsed}
          onClose={onSidebarClose}
          onToggleCollapse={onSidebarCollapse}
        />
      </div>

      {/* Document Panel */}
      {showDocPanel && (
        <div 
          className={`
            fixed md:relative inset-y-0 right-0 md:right-auto z-40
            flex h-full duration-300 ease-in-out
            md:transform-none bg-background
          `}
          style={{ 
            width: isMobile ? '100%' : `calc(${width} - ${isSidebarCollapsed ? '4rem' : '16rem'})`,
            left: isMobile ? 0 : 'auto'
          }}
        >
          <DocumentPanel 
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
            onResizeStart={onResizeStart}
            isResizing={isResizing}
            onMinimize={onMinimizeDocPanel}
          />
        </div>
      )}
    </>
  );
}