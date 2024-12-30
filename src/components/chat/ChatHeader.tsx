import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChatHeader() {
  const navigate = useNavigate();

  return (
    <div className="border-b border-foreground/10 p-4 flex items-center">
      <button 
        onClick={() => navigate('/')}
        className="p-2 hover:bg-foreground/5 rounded-lg mr-2"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-lg font-semibold">New Chat</h1>
    </div>
  );
}