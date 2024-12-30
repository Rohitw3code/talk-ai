interface RippleOptions {
  size?: number;
  duration?: number;
  color?: string;
}

export function createRipple(event: MouseEvent, options: RippleOptions = {}) {
  const {
    size = 40, // Reduced size
    duration = 800,
    color = 'rgba(255, 255, 255, 0.15)' // More subtle color
  } = options;

  // Create multiple ripples for wave effect
  for (let i = 0; i < 3; i++) {
    const ripple = document.createElement('div');
    
    ripple.style.position = 'fixed';
    ripple.style.left = `${event.clientX - size / 2}px`;
    ripple.style.top = `${event.clientY - size / 2}px`;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.borderRadius = '50%';
    ripple.style.border = '2px solid ' + color;
    ripple.style.backgroundColor = 'transparent';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = `waveRipple ${duration}ms ease-out ${i * 100}ms forwards`; // Staggered animation
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, duration + (i * 100));
  }
}