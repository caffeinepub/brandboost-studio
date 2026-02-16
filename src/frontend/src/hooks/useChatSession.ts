import { useState, useEffect } from 'react';
import { useInternetIdentity } from './useInternetIdentity';
import { generateCannedReply } from '@/lib/chat/cannedReplies';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function useChatSession() {
  const { identity } = useInternetIdentity();
  const [messages, setMessages] = useState<Message[]>([]);

  const storageKey = identity ? `chat_${identity.getPrincipal().toString()}` : null;

  useEffect(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setMessages(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to load chat history', e);
        }
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (storageKey && messages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateCannedReply(content),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);
  };

  const clearMessages = () => {
    setMessages([]);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  const newChat = () => {
    clearMessages();
  };

  return {
    messages,
    sendMessage,
    clearMessages,
    newChat,
  };
}
