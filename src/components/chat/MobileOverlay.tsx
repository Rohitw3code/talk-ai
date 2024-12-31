import React from 'react';

interface MobileOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MobileOverlay({ isVisible, onClose }: MobileOverlayProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}