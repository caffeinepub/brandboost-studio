import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Plus, Trash2 } from 'lucide-react';
import { useChatSession } from '@/hooks/useChatSession';
import ChatMessageList from '@/components/chat/ChatMessageList';
import ChatComposer from '@/components/chat/ChatComposer';

export default function ChatPage() {
  const { messages, sendMessage, clearMessages, newChat } = useChatSession();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Marketing
          </h1>
          <p className="text-xl text-purple-400 mt-1">Busy AI</p>
          <p className="text-muted-foreground mt-2">Welcome to Chat</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={newChat} className="gap-2 border-primary/20 hover:bg-primary/5">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
          <Button variant="outline" onClick={clearMessages} className="gap-2 border-primary/20 hover:bg-primary/5">
            <Trash2 className="h-4 w-4" />
            Clear Chat
          </Button>
        </div>
      </div>

      <Card className="border-primary/20 bg-slate-950/50 backdrop-blur-sm shadow-xl">
        <CardContent className="p-0">
          <ChatMessageList messages={messages} />
          <div className="border-t border-primary/10 p-4">
            <ChatComposer onSend={sendMessage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
