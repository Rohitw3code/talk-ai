import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex space-x-2 p-2">
      <div className="w-2 h-2 bg-primary/60 rounded-full animate-[bounce_1s_infinite_0ms]"></div>
      <div className="w-2 h-2 bg-primary/60 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
      <div className="w-2 h-2 bg-primary/60 rounded-full animate-[bounce_1s_infinite_400ms]"></div>
    </div>
  );
}