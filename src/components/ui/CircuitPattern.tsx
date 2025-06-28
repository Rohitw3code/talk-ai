import React from 'react';

export default function CircuitPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 dark:opacity-5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-circuit" />
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-circuit" 
        style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-circuit" 
        style={{ animationDelay: '4s' }} />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent animate-circuit" 
        style={{ animationDelay: '6s' }} />
    </div>
  );
}