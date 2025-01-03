import React from 'react';

interface SavedChatsListProps {
  chats: { id: string; name: string }[];
}

export default function SavedChatsList({ chats }: SavedChatsListProps) {
  return (
    <div className="border-t border-foreground/10 mt-6 pt-6">
      <div className="space-y-2">
        {chats.map(chat => (
          <div
            key={chat.id}
            className="p-3 rounded-lg bg-card/50 hover:bg-card/70 cursor-pointer 
              transition-colors border border-foreground/5 hover:border-foreground/10"
          >
            <span className="text-sm font-medium">{chat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}