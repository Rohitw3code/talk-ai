import React from 'react';
import ScrollableContainer from './containers/ScrollableContainer';
import WelcomeMessage from './messages/WelcomeMessage';
import SavedChatsList from './messages/SavedChatsList';
import MessageItem from './messages/MessageItem';
import { Message } from '../../types/chat';

interface MessageListProps {
  messages?: Message[];
  savedChats?: { id: string; name: string }[];
}

export default function MessageList({ messages = [], savedChats = [] }: MessageListProps) {
  return (
    <div className="flex-1 min-h-0"> {/* Add min-h-0 to enable proper flex behavior */}
      <ScrollableContainer dependencies={[messages]} className="h-full p-4 space-y-4">
        {messages.length === 0 ? (
          <>
            <WelcomeMessage />
            {savedChats.length > 0 && <SavedChatsList chats={savedChats} />}
          </>
        ) : (
          <>
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
          </>
        )}
      </ScrollableContainer>
    </div>
  );
}