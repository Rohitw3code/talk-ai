import { useCallback } from 'react';

interface ParallaxElement {
  element: HTMLElement;
  speed: number;
}

export const useParallax = () => {
  const handleScroll = useCallback((elements: ParallaxElement[]) => {
    const scrolled = window.pageYOffset;
    
    elements.forEach(({ element, speed }) => {
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, []);

  return { handleScroll };
};