import { useEffect } from 'react';
import { createRipple } from '../utils/rippleEffect';

export function useGlobalRipple() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      createRipple(event);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}