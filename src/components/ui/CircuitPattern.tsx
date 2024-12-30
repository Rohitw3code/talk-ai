import React from 'react';

export default function CircuitPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full opacity-[0.03] dark:opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="circuit-pattern"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 25h50M25 0v50"
              className="stroke-primary/30"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
            <circle
              cx="25"
              cy="25"
              r="3"
              className="fill-primary/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>
    </div>
  );
}