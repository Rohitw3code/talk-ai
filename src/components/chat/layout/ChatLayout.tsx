import React from 'react';

interface ChatLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
  input: React.ReactNode;
  className?: string;
}

export default function ChatLayout({ header, content, input, className = '' }: ChatLayoutProps) {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Fixed Header */}
      <div className="flex-none">{header}</div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-hidden">{content}</div>
      
      {/* Fixed Input */}
      <div className="flex-none">{input}</div>
    </div>
  );
}