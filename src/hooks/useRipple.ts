import { useEffect, useCallback } from 'react';

interface RippleStyle {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function useRipple() {
  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    const rect = button.getBoundingClientRect();
    
    const rippleStyle: RippleStyle = {
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${event.clientX - rect.left - radius}px`,
      top: `${event.clientY - rect.top - radius}px`
    };
    
    ripple.style.width = rippleStyle.width;
    ripple.style.height = rippleStyle.height;
    ripple.style.left = rippleStyle.left;
    ripple.style.top = rippleStyle.top;
    
    ripple.className = 'ripple-effect';
    
    const existingRipple = button.getElementsByClassName('ripple-effect')[0];
    if (existingRipple) {
      existingRipple.remove();
    }
    
    button.appendChild(ripple);
    
    const removeRipple = () => {
      ripple.remove();
    };
    
    ripple.addEventListener('animationend', removeRipple);
  }, []);

  return { createRipple };
}