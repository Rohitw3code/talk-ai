import { useEffect, useRef, useState } from 'react';

interface UseScrollToBottomProps {
  dependencies: any[];
  threshold?: number;
}

export function useScrollToBottom({ dependencies, threshold = 100 }: UseScrollToBottomProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Handle scroll events to determine if we should auto-scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    
    setShouldAutoScroll(distanceFromBottom <= threshold);
  };

  // Scroll to bottom when dependencies change and auto-scroll is enabled
  useEffect(() => {
    if (shouldAutoScroll && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [...dependencies, shouldAutoScroll]);

  return { scrollRef, handleScroll };
}