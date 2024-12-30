import React from 'react';

export default function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Neural network pattern */}
      <svg
        className="absolute w-full h-full opacity-[0.03] dark:opacity-[0.02] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="neural-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1.5" className="fill-foreground" />
            <path
              d="M1 1h18M1 1v18"
              className="stroke-foreground"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-pattern)" />
      </svg>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background pointer-events-none" />
    </div>
  );
}