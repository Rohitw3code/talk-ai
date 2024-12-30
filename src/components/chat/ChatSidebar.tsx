import React from 'react';
import { MessageSquare } from 'lucide-react';
import RecentChats from './RecentChats';

export default function ChatSidebar() {
  return (
    <div className="w-64 border-r border-foreground/10 p-4 hidden md:block">
      <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg p-3 flex items-center justify-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4" />
        New Chat
      </button>
      <RecentChats />
    </div>
  );
}