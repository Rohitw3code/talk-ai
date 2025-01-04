import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock 
              language={match[1]} 
              value={String(children).replace(/\n$/, '')} 
            />
          ) : (
            <code className="bg-foreground/10 rounded px-1.5 py-0.5 text-sm font-mono" {...props}>
              {children}
            </code>
          );
        },
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold my-4 text-foreground/90">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold my-3 text-foreground/90">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold my-2 text-foreground/90">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="my-2 leading-7 text-left text-foreground/80">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside my-2 text-left space-y-1 text-foreground/80">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside my-2 text-left space-y-1 text-foreground/80">{children}</ol>
        ),
        li: ({ children }) => <li className="my-1">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/50 pl-4 my-2 italic text-left text-foreground/70">
            {children}
          </blockquote>
        ),
        a: ({ children, href }) => (
          <a 
            href={href} 
            className="text-primary hover:underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-foreground/10 text-left">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-foreground/5">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-sm font-semibold text-foreground/90">{children}</th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 text-sm border-t border-foreground/10 text-foreground/80">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}