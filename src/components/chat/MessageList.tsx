import React from 'react';
import { MessageSquare, Save } from 'lucide-react';

interface MessageListProps {
  savedChats: { id: string; name: string }[];
}

export default function MessageList({ savedChats }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Welcome Message */}
      <div className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1">
          <div className="bg-card p-4 rounded-lg">
            <p className="text-foreground">
              Hello! I'm your AI assistant. How can I help you today?
            </p>
          </div>
        </div>
      </div>

      {/* Saved Chats Section */}
      {savedChats.length > 0 && (
        <div className="border-t border-foreground/10 mt-6 pt-6">

          {/* <h3 className="text-sm font-medium text-foreground/70 mb-3 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Saved Chats
          </h3>
 */}
          
          <div className="space-y-2">
            {savedChats.map(chat => (
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
      )}
    </div>
  );
}