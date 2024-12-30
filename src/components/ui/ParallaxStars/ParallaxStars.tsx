import React, { useEffect, useRef } from 'react';
import { useParallax } from '../../../hooks/useParallax';
import './ParallaxStars.css';

export default function ParallaxStars() {
  const starsRef1 = useRef<HTMLDivElement>(null);
  const starsRef2 = useRef<HTMLDivElement>(null);
  const starsRef3 = useRef<HTMLDivElement>(null);

  const { handleScroll } = useParallax();

  useEffect(() => {
    const stars1 = starsRef1.current;
    const stars2 = starsRef2.current;
    const stars3 = starsRef3.current;

    if (stars1 && stars2 && stars3) {
      const onScroll = () => handleScroll([
        { element: stars1, speed: -0.3 },
        { element: stars2, speed: -0.5 },
        { element: stars3, speed: -0.7 }
      ]);

      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [handleScroll]);

  return (
    <div className="stars-container">
      <div ref={starsRef1} className="stars stars-1" />
      <div ref={starsRef2} className="stars stars-2" />
      <div ref={starsRef3} className="stars stars-3" />
    </div>
  );
}