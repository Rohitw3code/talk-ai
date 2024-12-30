import React from 'react';

export default function ResizeHandle() {
  return (
    <div className="w-2 hover:w-3 h-full cursor-col-resize bg-foreground/5 hover:bg-primary/20 transition-all flex items-center justify-center group">
      <div className="w-0.5 h-8 bg-foreground/20 group-hover:bg-primary/50 rounded-full" />
    </div>
  );
}