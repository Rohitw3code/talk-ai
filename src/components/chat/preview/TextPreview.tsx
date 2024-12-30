import React, { useState, useEffect } from 'react';

interface TextPreviewProps {
  file: File;
}

export default function TextPreview({ file }: TextPreviewProps) {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setContent(e.target?.result as string);
    };
    reader.readAsText(file);
  }, [file]);

  return (
    <div className="h-full p-4 overflow-auto">
      <pre className="whitespace-pre-wrap font-mono text-sm bg-card rounded-lg p-4">
        {content}
      </pre>
    </div>
  );
}