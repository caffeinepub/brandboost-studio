import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatComposerProps {
  onSend: (message: string) => void;
}

export default function ChatComposer({ onSend }: ChatComposerProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-card/80 border-primary/20 focus:border-primary/40 text-foreground"
      />
      <Button
        onClick={handleSend}
        disabled={!input.trim()}
        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg text-primary-foreground"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
