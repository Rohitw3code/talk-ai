import React from 'react';
import { MessageSquare } from 'lucide-react';

interface RecentChatsProps {
  isCollapsed?: boolean;
}

export default function RecentChats({ isCollapsed }: RecentChatsProps) {
  return (
    <div className="space-y-2">
      {!isCollapsed && (
        <div className="text-sm text-muted-foreground mb-2">Recent Chats</div>
      )}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="p-2 rounded-lg hover:bg-foreground/5 cursor-pointer flex items-center gap-2 group"
          title={isCollapsed ? `Chat Session ${i + 1}` : undefined}
        >
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          {!isCollapsed && (
            <span className="text-sm truncate">Chat Session {i + 1}</span>
          )}
        </div>
      ))}
    </div>
  );
}