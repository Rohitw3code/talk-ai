import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
          }}
        />
      ))}
      
      {/* Nebula blobs */}
      <div className="absolute -left-4 top-1/4 w-64 h-64 bg-primary/5 dark:bg-primary/10 
        rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute right-4 top-1/3 w-64 h-64 bg-purple-300/10 dark:bg-purple-900/20 
        rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute left-1/3 bottom-1/3 w-64 h-64 bg-pink-200/10 dark:bg-pink-900/20 
        rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
    </div>
  );
}