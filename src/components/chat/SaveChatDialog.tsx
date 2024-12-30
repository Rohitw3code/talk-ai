import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

interface SaveChatDialogProps {
  onSave: (name: string) => void;
  onClose: () => void;
}

export default function SaveChatDialog({ onSave, onClose }: SaveChatDialogProps) {
  const [chatName, setChatName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatName.trim()) {
      onSave(chatName);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-foreground/10 rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Save Chat</h3>
          <button onClick={onClose} className="p-1 hover:bg-foreground/5 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="chatName" className="block text-sm font-medium text-foreground/70 mb-1">
              Chat Name
            </label>
            <input
              type="text"
              id="chatName"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-foreground/10 bg-background 
                focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Enter a name for this chat"
              autoFocus
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg hover:bg-foreground/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!chatName.trim()}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}