import { useCallback } from 'react';

interface ParallaxLayer {
  element: HTMLElement;
  speed: number;
}

export function useParallax() {
  const handleScroll = useCallback((layers: ParallaxLayer[]) => {
    const scrolled = window.scrollY;

    layers.forEach(({ element, speed }) => {
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }, []);

  return { handleScroll };
}