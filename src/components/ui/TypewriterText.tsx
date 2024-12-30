import React, { useState, useEffect } from 'react';

const phrases = [
  "Research Papers",
  "Class Notes",
  "Code Files",
  "Legal Documents",
  "Technical Manuals"
];

export default function TypewriterText() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200);

  useEffect(() => {
    let timer = setTimeout(() => {
      const current = phrases[currentPhrase];
      
      if (isDeleting) {
        setText(current.substring(0, text.length - 1));
        setDelta(100);
      } else {
        setText(current.substring(0, text.length + 1));
        setDelta(200);
      }

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 2000);
        setDelta(300);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setDelta(500);
      }
    }, delta);

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase, delta]);

  return (
    <span className="text-primary">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}