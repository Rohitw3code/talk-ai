import React from 'react';

export default function ThinkingAnimation() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-[spin_3s_linear_infinite]" />
        {/* Middle ring */}
        <div className="absolute inset-1 border-4 border-t-primary/40 border-transparent rounded-full animate-[spin_2s_linear_infinite_reverse]" />
        {/* Inner ring */}
        <div className="absolute inset-2 border-4 border-l-primary/50 border-transparent rounded-full animate-[spin_1.5s_linear_infinite]" />
        {/* Center dot */}
        <div className="absolute inset-[38%] bg-primary/60 rounded-full animate-pulse" />
      </div>
    </div>
  );
}