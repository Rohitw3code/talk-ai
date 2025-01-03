import { useState, useCallback } from 'react';
import { Message } from '../types/chat';
import { sendMessage } from '../services/chat/chatService';

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = useCallback(async (content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await sendMessage(content);
      
      if (response) {
        const reader = response.getReader();
        let aiResponse = '';
        
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: '',
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const content = line.slice(6);
              aiResponse += content;
              
              setMessages(prev => prev.map(msg => 
                msg.id === aiMessage.id 
                  ? { ...msg, content: aiResponse }
                  : msg
              ));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, []);

  return {
    messages,
    setMessages,
    handleSendMessage
  };
}